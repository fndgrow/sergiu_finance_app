#!/usr/bin/env bash
# Casieria EHL — one-time server setup on Ubuntu (run as root after deploy.sh).
#   bash /opt/casieria/install.sh casa.example.com admin@example.com 'StrongAdminPassword'
# PocketBase listens on 127.0.0.1:8090 only; nginx publishes it on the domain with a Let's Encrypt certificate.
# On a fresh, dedicated server it also installs nginx + certbot, a firewall (ssh/http/https only), fail2ban,
# automatic security updates, and switches ssh to keys only (only when root already has an authorized key, so the
# current way in keeps working). Set HARDEN=0 to skip those server-wide steps on a shared machine.
# Touches: /opt/casieria, the casieria service and nginx site; with HARDEN=1 also ufw, fail2ban, sshd, unattended-upgrades.
set -euo pipefail

DOMAIN="${1:?usage: install.sh DOMAIN ADMIN_EMAIL [ADMIN_PASSWORD]}"
ADMIN_EMAIL="${2:?usage: install.sh DOMAIN ADMIN_EMAIL [ADMIN_PASSWORD]}"
ADMIN_PASS="${3:-}"
PB_VERSION="${PB_VERSION:-0.40.6}"
DIR="${DIR:-/opt/casieria}"
PORT="${PORT:-8090}"
SKIP_NGINX="${SKIP_NGINX:-0}"

HARDEN="${HARDEN:-1}"

echo "== Casieria EHL: PocketBase $PB_VERSION in $DIR, port $PORT, domain $DOMAIN"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq unzip curl nginx certbot python3-certbot-nginx >/dev/null
if [ "$HARDEN" = "1" ]; then
  echo "== server hardening (HARDEN=1): firewall, fail2ban, automatic security updates, ssh keys only"
  apt-get install -y -qq ufw fail2ban unattended-upgrades >/dev/null
  ufw default deny incoming >/dev/null; ufw default allow outgoing >/dev/null
  ufw allow 22/tcp >/dev/null; ufw allow 80/tcp >/dev/null; ufw allow 443/tcp >/dev/null
  ufw --force enable >/dev/null; ufw status | head -1
  systemctl enable --now fail2ban >/dev/null 2>&1 || true
  dpkg-reconfigure -f noninteractive unattended-upgrades >/dev/null 2>&1 || true
  if [ -s /root/.ssh/authorized_keys ]; then
    cat > /etc/ssh/sshd_config.d/00-casieria-hardening.conf <<'SSHD'
# keys only; root stays reachable with its key
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin prohibit-password
MaxAuthTries 4
SSHD
    sshd -t && systemctl reload ssh && echo "   ssh: keys only (root key kept)" || { rm -f /etc/ssh/sshd_config.d/00-casieria-hardening.conf; echo "   ssh config refused, left unchanged"; }
  else
    echo "   ssh: no authorized key for root yet, password login left on (add a key, then rerun)"
  fi
fi
mkdir -p "$DIR/pb_data" "$DIR/pb_public" "$DIR/pb_hooks" "$DIR/pb_migrations"
cd "$DIR"

if [ ! -x ./pocketbase ] || ! ./pocketbase --version 2>/dev/null | grep -q "$PB_VERSION"; then
  curl -fsSL -o pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip"
  unzip -o -q pb.zip pocketbase
  rm -f pb.zip
  chmod +x pocketbase
fi

# schema (idempotent)
./pocketbase migrate up --dir="$DIR/pb_data" --migrationsDir="$DIR/pb_migrations" --hooksDir="$DIR/pb_hooks" >/dev/null

if [ -n "$ADMIN_PASS" ]; then
  ./pocketbase superuser upsert "$ADMIN_EMAIL" "$ADMIN_PASS" --dir="$DIR/pb_data" >/dev/null 2>&1 \
    || ./pocketbase superuser create "$ADMIN_EMAIL" "$ADMIN_PASS" --dir="$DIR/pb_data" >/dev/null
  echo "== superuser $ADMIN_EMAIL ready (admin UI: https://$DOMAIN/_/)"
fi

# the service runs as its own user: it can write only pb_data and its log
id casieria >/dev/null 2>&1 || useradd --system --home "$DIR" --shell /usr/sbin/nologin casieria
mkdir -p "$DIR/pb_data"; touch "$DIR/std.log"; chown -R casieria:casieria "$DIR/pb_data" "$DIR/std.log"; chmod -R a+rX "$DIR/pb_public" "$DIR/pb_hooks" "$DIR/pb_migrations"
cat > /etc/systemd/system/casieria.service <<EOF
[Unit]
Description=Casieria EHL (PocketBase)
After=network.target

[Service]
Type=simple
User=casieria
Group=casieria
LimitNOFILE=4096
Restart=always
RestartSec=5s
WorkingDirectory=$DIR
StandardOutput=append:$DIR/std.log
StandardError=append:$DIR/std.log
ExecStart=$DIR/pocketbase serve --http=127.0.0.1:$PORT --dir=$DIR/pb_data --publicDir=$DIR/pb_public --hooksDir=$DIR/pb_hooks --migrationsDir=$DIR/pb_migrations
NoNewPrivileges=yes
PrivateTmp=yes
ProtectHome=yes
ProtectSystem=strict
ReadWritePaths=$DIR/pb_data $DIR/std.log
ProtectKernelTunables=yes
ProtectControlGroups=yes
RestrictSUIDSGID=yes

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable casieria >/dev/null
systemctl restart casieria
sleep 2
curl -fsS "http://127.0.0.1:$PORT/api/health" >/dev/null && echo "== PocketBase answers on 127.0.0.1:$PORT" || { echo "!! PocketBase did not start, see $DIR/std.log"; tail -20 "$DIR/std.log"; exit 1; }

if [ "$SKIP_NGINX" = "1" ]; then echo "== nginx step skipped"; exit 0; fi

SITE=/etc/nginx/sites-available/casieria
if [ ! -f "$SITE" ]; then
  sed "s/__DOMAIN__/$DOMAIN/g; s/__PORT__/$PORT/g" "$DIR/nginx-site.conf" > "$SITE"
  ln -sf "$SITE" /etc/nginx/sites-enabled/casieria
  nginx -t
  systemctl reload nginx
  echo "== nginx site installed for $DOMAIN (http)"
fi

if command -v certbot >/dev/null 2>&1; then
  if ! certbot certificates 2>/dev/null | grep -q "Domains:.*\b$DOMAIN\b"; then
    certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$ADMIN_EMAIL" --redirect || echo "!! certbot failed: check that $DOMAIN points to this server, then rerun install.sh"
  else
    echo "== certificate for $DOMAIN already present"
  fi
fi
nginx -t && systemctl reload nginx
echo
echo "== done. Open https://$DOMAIN"
echo "   logs: tail -f $DIR/std.log   service: systemctl status casieria"
