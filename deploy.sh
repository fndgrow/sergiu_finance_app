#!/usr/bin/env bash
# Casieria EHL — upload the app and server files to the VPS and restart the service.
# Run from this folder in Git Bash:   bash deploy.sh root@1.2.3.4        (or: CASIERIA_HOST=root@1.2.3.4 bash deploy.sh)
# First time on a new server, afterwards run there:  bash /opt/casieria/install.sh DOMAIN ADMIN_EMAIL 'ADMIN_PASSWORD'
# Files are sent exactly as git stores them (LF), whatever the Windows checkout holds.
set -euo pipefail

HOST="${1:-${CASIERIA_HOST:-}}"
DIR="${DIR:-/opt/casieria}"
[ -n "$HOST" ] || { echo "usage: bash deploy.sh user@host   (or set CASIERIA_HOST)"; exit 1; }
cd "$(dirname "$0")"

STAGE="$(mktemp -d)"; trap 'rm -rf "$STAGE"' EXIT
mkdir -p "$STAGE/pb_public/icons" "$STAGE/pb_public/vendor" "$STAGE/pb_hooks" "$STAGE/pb_migrations" "$STAGE/server"
for f in index.html styles.css app.js app-config.js sw.js manifest.json robots.txt; do tr -d '\r' < "$f" > "$STAGE/pb_public/$f"; done
cp icons/*.png "$STAGE/pb_public/icons/"
for f in vendor/*.js; do tr -d '\r' < "$f" > "$STAGE/pb_public/vendor/$(basename "$f")"; done   # as git stores them (LF)
for f in server/pb_hooks/*.js; do tr -d '\r' < "$f" > "$STAGE/pb_hooks/$(basename "$f")"; done
for f in server/pb_migrations/*.js; do tr -d '\r' < "$f" > "$STAGE/pb_migrations/$(basename "$f")"; done
for f in server/install.sh server/nginx-site.conf server/harden-ssh-firewall.sh server/backup-offsite.sh server/backup-weekly.sh server/send-mail.py server/export-xlsx.py server/restore.sh server/ascuns.sh; do tr -d '\r' < "$f" > "$STAGE/server/$(basename "$f")"; done

echo "== upload to $HOST:$DIR"
ssh "$HOST" "mkdir -p $DIR/pb_public/icons $DIR/pb_public/vendor $DIR/pb_hooks $DIR/pb_migrations"
scp -q "$STAGE"/pb_public/*.* "$HOST:$DIR/pb_public/"
scp -q "$STAGE"/pb_public/icons/*.png "$HOST:$DIR/pb_public/icons/"
scp -q "$STAGE"/pb_public/vendor/*.js "$HOST:$DIR/pb_public/vendor/"
scp -q "$STAGE"/pb_hooks/*.js "$HOST:$DIR/pb_hooks/"
scp -q "$STAGE"/pb_migrations/*.js "$HOST:$DIR/pb_migrations/"
scp -q "$STAGE"/server/* "$HOST:$DIR/"
# the service user only needs to read these; pb_data stays its own
ssh "$HOST" "chmod -R a+rX $DIR/pb_public $DIR/pb_hooks $DIR/pb_migrations; chmod 700 $DIR/*.sh $DIR/*.py 2>/dev/null || true; chgrp casieria $DIR/send-mail.py $DIR/mail.conf 2>/dev/null && chmod 750 $DIR/send-mail.py && chmod 640 $DIR/mail.conf || true"   # the service sends the hidden-mode e-mails itself

if ssh "$HOST" "systemctl is-enabled casieria >/dev/null 2>&1"; then
  echo "== restart service (new migrations apply on start)"
  ssh "$HOST" "systemctl restart casieria && sleep 2 && curl -fsS http://127.0.0.1:8090/api/health >/dev/null && echo '   service healthy' || { echo '!! service not healthy'; tail -20 $DIR/std.log; exit 1; }"
else
  echo "== service not installed yet. On the server run:"
  echo "   bash $DIR/install.sh DOMAIN ADMIN_EMAIL 'ADMIN_PASSWORD'"
fi
echo "== done"
