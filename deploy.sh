#!/usr/bin/env bash
# Casieria EHL — upload the app and server files to the VPS and restart the service.
# Run from this folder in Git Bash:   bash deploy.sh root@1.2.3.4
# First time: afterwards run on the server  bash /opt/casieria/install.sh DOMAIN ADMIN_EMAIL 'ADMIN_PASSWORD'
set -euo pipefail

HOST="${1:-${CASIERIA_HOST:-}}"
DIR="${DIR:-/opt/casieria}"
[ -n "$HOST" ] || { echo "usage: bash deploy.sh user@host   (or set CASIERIA_HOST)"; exit 1; }

cd "$(dirname "$0")"
echo "== upload to $HOST:$DIR"
ssh "$HOST" "mkdir -p $DIR/pb_public/icons $DIR/pb_public/vendor $DIR/pb_hooks $DIR/pb_migrations"
scp -q index.html styles.css app.js app-config.js sw.js manifest.webmanifest "$HOST:$DIR/pb_public/"
scp -q icons/*.png "$HOST:$DIR/pb_public/icons/"
scp -q vendor/*.js "$HOST:$DIR/pb_public/vendor/"
scp -q server/pb_hooks/*.js "$HOST:$DIR/pb_hooks/"
scp -q server/pb_migrations/*.js "$HOST:$DIR/pb_migrations/"
scp -q server/install.sh server/nginx-site.conf "$HOST:$DIR/"

if ssh "$HOST" "systemctl is-enabled casieria >/dev/null 2>&1"; then
  echo "== restart service"
  ssh "$HOST" "systemctl restart casieria && sleep 1 && systemctl --no-pager --lines=3 status casieria"
else
  echo "== service not installed yet. On the server run:"
  echo "   bash $DIR/install.sh DOMAIN ADMIN_EMAIL 'ADMIN_PASSWORD'"
fi
echo "== done"
