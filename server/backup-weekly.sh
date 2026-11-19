#!/usr/bin/env bash
# Casieria EHL — weekly backup for the owner (cron: Friday 04:00 server time, plus a daily "expire" run).
#   The database (a consistent SQLite copy), the app (pb_public), hooks, migrations and the server scripts go into one
#   AES-256 zip (password: /opt/casieria/backup.pass — opens with 7-Zip / WinRAR), published under a random link on the
#   app's domain (nginx: /backup/<token>/…) for KEEP_DAYS days; the link is e-mailed to the owner (server/send-mail.py,
#   settings in /opt/casieria/mail.conf). Expired links and their archives are deleted from the server.
#   Secrets never go into the archive: ADMIN.txt, turnstile.secret, mail.conf, backup.pass.
#     bash backup-weekly.sh              make + publish + e-mail (cron)
#     bash backup-weekly.sh expire       only delete links older than KEEP_DAYS (daily cron)
#     bash backup-weekly.sh --no-mail    make + publish, print the link (a test)
set -euo pipefail
DIR="${DIR:-/opt/casieria}"
OUT="${OUT:-/var/lib/casieria-backups}"
KEEP_DAYS="${KEEP_DAYS:-3}"
conf() { awk -v k="$1" '$1==k":"{sub(/^[^:]*:[ \t]*/,""); print; exit}' "$DIR/mail.conf" 2>/dev/null || true; }
DOMAIN="$(conf domain)"; DOMAIN="${DOMAIN:-casaehl.com}"
log() { echo "$(date '+%Y-%m-%d %H:%M:%S') $*"; }

mkdir -p "$OUT"; chmod 755 "$OUT"
# links past their time: gone, archive included
EXPIRED=$(find "$OUT" -mindepth 1 -maxdepth 1 -type d -mmin +$((KEEP_DAYS * 1440)) | wc -l)
find "$OUT" -mindepth 1 -maxdepth 1 -type d -mmin +$((KEEP_DAYS * 1440)) -exec rm -rf {} +
[ "$EXPIRED" -gt 0 ] && log "expired: $EXPIRED archive(s) deleted"
[ "${1:-}" = "expire" ] && exit 0

[ -s "$DIR/backup.pass" ] || { log "no $DIR/backup.pass: the archive password is missing, nothing made"; exit 1; }
command -v 7z >/dev/null || { log "7z missing (apt-get install p7zip-full)"; exit 1; }
PASS="$(head -c 200 "$DIR/backup.pass" | tr -d '\r\n')"
STAMP="$(date +%Y-%m-%d_%H%M)"; NAME="casieria_$STAMP"
WORK="$(mktemp -d)"; trap 'rm -rf "$WORK"' EXIT
mkdir -p "$WORK/$NAME/pb_data"
# the database while the service runs: SQLite's online backup gives a consistent copy
python3 - "$DIR/pb_data" "$WORK/$NAME/pb_data" <<'PY'
import os, sqlite3, sys
src, dst = sys.argv[1], sys.argv[2]
for f in ("data.db", "auxiliary.db"):
    p = os.path.join(src, f)
    if os.path.exists(p):
        s = sqlite3.connect("file:%s?mode=ro" % p, uri=True); d = sqlite3.connect(os.path.join(dst, f)); s.backup(d); d.close(); s.close()
PY
cp -r "$DIR/pb_hooks" "$DIR/pb_migrations" "$DIR/pb_public" "$WORK/$NAME/"
for f in install.sh nginx-site.conf backup-weekly.sh send-mail.py backup-offsite.sh harden-ssh-firewall.sh; do [ -f "$DIR/$f" ] && cp "$DIR/$f" "$WORK/$NAME/"; done
cat > "$WORK/$NAME/RESTORE.txt" <<EOF
Casieria EHL — copie de rezervă din $STAMP (ora serverului, $(cat /etc/timezone 2>/dev/null || echo Europe/Chisinau)).

Conținut: pb_data/data.db (toate datele), pb_data/auxiliary.db (jurnalul cererilor), pb_public (aplicația), pb_hooks,
pb_migrations, scripturile serverului. Fără secrete (parola superutilizatorului, secretul Turnstile, setările de e-mail).

Restaurare pe un server nou (Ubuntu): bash deploy.sh root@IP din proiectul git, apoi pe server
  bash /opt/casieria/install.sh DOMENIU admin@casieria.local 'ParolaSuperutilizator'
  systemctl stop casieria; cp pb_data/data.db /opt/casieria/pb_data/data.db; chown casieria:casieria /opt/casieria/pb_data/data.db; systemctl start casieria
Restaurare pe serverul existent: la fel, doar pașii cu systemctl și cp (întâi o copie a bazei curente).
Codurile de intrare și autentificatoarele sunt în bază: după restaurare toată lumea intră ca înainte.
EOF
TOKEN="$(openssl rand -hex 32)"
mkdir -p "$OUT/$TOKEN"
( cd "$WORK" && 7z a -tzip -mem=AES256 -mx=5 -p"$PASS" "$OUT/$TOKEN/$NAME.zip" "$NAME" >/dev/null )
chmod 755 "$OUT/$TOKEN"; chmod 644 "$OUT/$TOKEN/$NAME.zip"
SIZE="$(du -h "$OUT/$TOKEN/$NAME.zip" | cut -f1)"
UNTIL="$(date -d "+$KEEP_DAYS days" '+%d.%m.%Y %H:%M')"
LINK="https://$DOMAIN/backup/$TOKEN/$NAME.zip"
log "made $NAME.zip ($SIZE), link valid until $UNTIL"
[ "${1:-}" = "--no-mail" ] && { echo "$LINK"; exit 0; }

# the one-time e-mail with the archive password (first run only), then the weekly link
if [ ! -f "$DIR/backup.pass.sent" ]; then
  python3 "$DIR/send-mail.py" "Casieria EHL — parola arhivelor de rezervă" "Aceasta este parola cu care se deschid arhivele de rezervă (fișierele .zip din e-mailurile de vineri; se deschid cu 7-Zip sau WinRAR):

$PASS

Păstrați-o în managerul de parole și ștergeți acest e-mail. Parola nu se mai trimite; ea stă doar pe server, în /opt/casieria/backup.pass." \
    && touch "$DIR/backup.pass.sent" && log "password e-mail sent once" || log "password e-mail NOT sent (mail.conf?)"
fi
python3 "$DIR/send-mail.py" "Casieria EHL — copia de rezervă din $(date '+%d.%m.%Y')" "Copia de rezervă a aplicației Casieria EHL (baza de date cu toate datele + aplicația) din $(date '+%d.%m.%Y %H:%M'):

$LINK

Mărime: $SIZE. Linkul funcționează până la $UNTIL; după aceea fișierul este șters de pe server. Arhiva este criptată: se deschide cu 7-Zip sau WinRAR și parola arhivelor (trimisă o singură dată, la prima copie). În arhivă, RESTORE.txt spune cum se restaurează." \
  && log "link e-mailed" || { log "e-mail FAILED (link: $LINK)"; exit 1; }
