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
apt-get install -y -qq unzip curl nginx certbot python3-certbot-nginx p7zip-full python3-openpyxl >/dev/null
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
X11Forwarding no
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

# the owner's weekly backup (Friday 04:00 server time) and the daily clean-up of expired links; the archive password is
# made once and stays on the server; the e-mail settings go into mail.conf (see README §17a) — without them the archive
# is still made and the run logs the link
mkdir -p /var/lib/casieria-backups; chmod 755 /var/lib/casieria-backups
[ -s "$DIR/backup.pass" ] || { umask 077; openssl rand -base64 24 | tr -d '/+=' | cut -c1-24 > "$DIR/backup.pass"; umask 022; echo "== archive password made: $DIR/backup.pass"; }
[ -f "$DIR/mail.conf" ] || { umask 077; printf 'smtp_host: smtp.gmail.com\nsmtp_port: 587\nsmtp_user: \nsmtp_pass: \nfrom: \nfrom_name: CasaEHL BackUP\nto: \ndomain: %s\n' "$DOMAIN" > "$DIR/mail.conf"; umask 022; echo "== fill in $DIR/mail.conf (Gmail app password) for the backup e-mails"; }
cat > /etc/cron.d/casieria-backup <<EOF
# Casieria EHL: the owner's weekly backup (Friday 04:00) and the daily removal of links older than 3 days
0 4 * * 5 root $DIR/backup-weekly.sh >> $DIR/backup-weekly.log 2>&1
30 4 * * * root $DIR/backup-weekly.sh expire >> $DIR/backup-weekly.log 2>&1
EOF
chmod 644 /etc/cron.d/casieria-backup
# the human check at sign-in (Cloudflare Turnstile): TURNSTILE_SECRET=… install.sh writes the secret where only the service reads it;
# the matching site key goes into app-config.js (window.TURNSTILE_SITE_KEY). Without the file the sign-in asks for no box.
if [ -n "${TURNSTILE_SECRET:-}" ]; then
  umask 077; printf '%s\n' "$TURNSTILE_SECRET" > "$DIR/pb_data/turnstile.secret"; umask 022
  echo "== Turnstile secret stored in $DIR/pb_data/turnstile.secret"
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

# server-wide nginx bits (idempotent): no version banner; the visitor's address from Cloudflare when the proxy is on
echo 'server_tokens off;' > /etc/nginx/conf.d/casieria-hardening.conf
CF=/etc/nginx/conf.d/cloudflare-realip.conf
if V4=$(curl -fsS --max-time 10 https://www.cloudflare.com/ips-v4) && V6=$(curl -fsS --max-time 10 https://www.cloudflare.com/ips-v6) && [ -n "$V4" ]; then
  { echo "# Cloudflare's ranges (rerun install.sh to refresh); only these may say who the visitor is"; for r in $V4 $V6; do echo "set_real_ip_from $r;"; done; echo "real_ip_header CF-Connecting-IP;"; } > "$CF.tmp"
  nginx -t -c /etc/nginx/nginx.conf >/dev/null 2>&1 && mv "$CF.tmp" "$CF" || rm -f "$CF.tmp"
fi
SITE=/etc/nginx/sites-available/casieria
if [ ! -f "$SITE" ]; then
  sed "s/__DOMAIN__/$DOMAIN/g; s/__PORT__/$PORT/g" "$DIR/nginx-site.conf" > "$SITE"
  ln -sf "$SITE" /etc/nginx/sites-enabled/casieria
  nginx -t
  systemctl reload nginx
  echo "== nginx site installed for $DOMAIN (http)"
fi

if command -v certbot >/dev/null 2>&1; then
  # the certificate: the domain, plus www.DOMAIN when it points here too; an internal address (...@....local) is not sent
  # to Let's Encrypt: the certificate is then registered without an e-mail (renewal is automatic either way)
  MYIP="$(curl -fsS4 --max-time 5 https://api.ipify.org 2>/dev/null || true)"
  CERT_D=(-d "$DOMAIN")
  if [ -n "$MYIP" ] && getent ahostsv4 "www.$DOMAIN" 2>/dev/null | awk '{print $1}' | grep -qx "$MYIP"; then CERT_D+=(-d "www.$DOMAIN"); fi
  case "$ADMIN_EMAIL" in *@*.local|"") CERT_MAIL=(--register-unsafely-without-email) ;; *) CERT_MAIL=(-m "$ADMIN_EMAIL") ;; esac
  if ! certbot certificates 2>/dev/null | grep -q "Domains:.*\b$DOMAIN\b"; then
    certbot --nginx "${CERT_D[@]}" --non-interactive --agree-tos "${CERT_MAIL[@]}" --redirect || echo "!! certbot failed: check that $DOMAIN points to this server (Cloudflare: DNS only, grey cloud), then rerun install.sh"
  else
    echo "== certificate for $DOMAIN already present"
  fi
fi
nginx -t && systemctl reload nginx
echo
echo "== done. Open https://$DOMAIN"
echo "   logs: tail -f $DIR/std.log   service: systemctl status casieria"
