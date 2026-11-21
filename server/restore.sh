#!/usr/bin/env bash
# Casieria EHL — put the application back on a fresh Ubuntu server from a weekly backup folder (the extracted archive).
# Run as root, inside the extracted folder:   bash restore.sh DOMAIN [ADMIN_EMAIL] [ADMIN_PASSWORD]
#   1. copies the app, hooks, migrations and server scripts from this folder to /opt/casieria
#   2. runs install.sh (PocketBase, the sandboxed service, nginx, the HTTPS certificate, firewall/fail2ban/updates)
#   3. puts the database from this folder in place, sets the superuser password, starts the service
# A server that already holds a database is refused: for a data-only restore follow CITESTE-MA.txt.
set -euo pipefail
DOMAIN="${1:?usage: bash restore.sh DOMAIN [ADMIN_EMAIL] [ADMIN_PASSWORD]}"
EMAIL="${2:-admin@casieria.local}"
PASS="${3:-}"
HERE="$(cd "$(dirname "$0")" && pwd)"
DIR="${DIR:-/opt/casieria}"
[ "$(id -u)" = 0 ] || { echo "run as root"; exit 1; }
[ -f "$HERE/pb_data/data.db" ] && [ -d "$HERE/pb_public" ] && [ -f "$HERE/install.sh" ] || { echo "not a backup folder: $HERE"; exit 1; }
[ -f "$DIR/pb_data/data.db" ] && { echo "!! $DIR/pb_data/data.db already exists here. For a data-only restore see CITESTE-MA.txt. Stopping."; exit 1; }
[ -n "$PASS" ] || PASS="$(openssl rand -base64 30 | tr -d '/+=' | cut -c1-28)"

echo "== files to $DIR"
mkdir -p "$DIR"
cp -r "$HERE/pb_public" "$HERE/pb_hooks" "$HERE/pb_migrations" "$DIR/"
for f in install.sh nginx-site.conf backup-weekly.sh send-mail.py export-xlsx.py export-txt.py backup-offsite.sh harden-ssh-firewall.sh restore.sh; do [ -f "$HERE/$f" ] && cp "$HERE/$f" "$DIR/$f"; done
chmod 700 "$DIR"/*.sh "$DIR"/*.py 2>/dev/null || true
chmod -R a+rX "$DIR/pb_public" "$DIR/pb_hooks" "$DIR/pb_migrations"
umask 077; printf 'admin UI: only from the server (ssh -L 8090:127.0.0.1:8090, then http://127.0.0.1:8090/_/)\nemail: %s\npassword: %s\n' "$EMAIL" "$PASS" > "$DIR/ADMIN.txt"; umask 022

echo "== install.sh"
HARDEN="${HARDEN:-1}" bash "$DIR/install.sh" "$DOMAIN" "$EMAIL" "$PASS"

echo "== the database from the backup"
systemctl stop casieria
cp "$HERE/pb_data/data.db" "$DIR/pb_data/data.db"
[ -f "$HERE/pb_data/auxiliary.db" ] && cp "$HERE/pb_data/auxiliary.db" "$DIR/pb_data/auxiliary.db"
rm -f "$DIR/pb_data/data.db-wal" "$DIR/pb_data/data.db-shm" "$DIR/pb_data/auxiliary.db-wal" "$DIR/pb_data/auxiliary.db-shm"
"$DIR/pocketbase" superuser upsert "$EMAIL" "$PASS" --dir="$DIR/pb_data" >/dev/null   # the old server's superuser is replaced
chown -R casieria:casieria "$DIR/pb_data"
systemctl start casieria; sleep 3
curl -fsS http://127.0.0.1:8090/api/health >/dev/null && echo "== service up with the restored data" || { echo "!! service not healthy:"; tail -20 "$DIR/std.log"; exit 1; }
echo
echo "== done: https://$DOMAIN"
echo "   superuser password: $DIR/ADMIN.txt (root only)"
echo "   still to do by hand: Cloudflare orange cloud (SSL Full strict); the Turnstile secret → $DIR/pb_data/turnstile.secret"
echo "   (owner casieria, mode 600); the e-mail settings → $DIR/mail.conf, so the Friday backup e-mails come again."
