#!/usr/bin/env bash
# Casieria EHL — weekly backup for the owner (cron: Friday 04:00 server time, plus a daily "expire" run).
#   The database (a consistent SQLite copy), an Excel workbook of every register, a plain-text file with every transaction in
#   the order it was entered plus the journal of changes (export-txt.py, 21 November 2026), the app (pb_public), hooks, migrations,
#   the server scripts, restore.sh and CITESTE-MA.txt (what is inside, how to read the data, how to move to a new server) go into one
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
for f in install.sh nginx-site.conf backup-weekly.sh send-mail.py export-xlsx.py export-txt.py restore.sh backup-offsite.sh harden-ssh-firewall.sh; do [ -f "$DIR/$f" ] && cp "$DIR/$f" "$WORK/$NAME/"; done
# every register as Excel, from the copy just taken (python3-openpyxl); a missing module is reported, the archive is still made
XLSX="Casieria_EHL_date_$STAMP.xlsx"
python3 "$DIR/export-xlsx.py" "$WORK/$NAME/pb_data/data.db" "$WORK/$NAME/$XLSX" >/dev/null || { log "Excel export failed (python3-openpyxl?)"; XLSX="(Excel lipsă la această copie: exportul a eșuat, vezi backup-weekly.log)"; }
# every transaction as plain text, in the order it was entered, with the journal of changes (standard library only)
TXT="Casieria_EHL_tranzactii_$STAMP.txt"
python3 "$DIR/export-txt.py" "$WORK/$NAME/pb_data/data.db" "$WORK/$NAME/$TXT" >/dev/null || { log "text export failed"; TXT="(fișierul text lipsește la această copie: exportul a eșuat, vezi backup-weekly.log)"; }
SHOWN="$(date '+%d.%m.%Y %H:%M')"
cat > "$WORK/$NAME/CITESTE-MA.txt" <<EOF
CASA EHL — COPIE DE REZERVĂ din $SHOWN (ora Chișinăului)
==========================================================

CE ESTE ÎN ARHIVĂ
  $XLSX
      toate datele aplicației în Excel, câte o foaie pe registru: Încasări, Cheltuieli, Ieșiri, Chirii, Contracte,
      Împrumuturi, Schimburi valutare, Proiecte, Angajați, Salarii, Pontaj, Grafic, Utilizatori (doar nume/rol/stare),
      Jurnal, Setări; prima foaie „Cuprins” spune câte rânduri are fiecare. Se deschide cu Excel, LibreOffice sau
      Google Sheets. Este pentru citit și arhivat; aplicația nu importă din el.
  $TXT
      TOATE TRANZACȚIILE ÎN TEXT SIMPLU, câte una pe rând, în ordinea în care au fost introduse: când și de cine a fost
      introdusă, registrul, data operației, suma în valuta ei (și în lei), descrierea, toate celelalte câmpuri
      (câmp=valoare) și id-ul. Apoi jurnalul modificărilor (adăugat / modificat / șters, de cine, când, cu datele rândului)
      și celelalte registre. Se deschide cu orice editor de text (Notepad); după el datele se pot reintroduce manual.
  pb_data/data.db
      BAZA DE DATE COMPLETĂ (SQLite): date, utilizatori, coduri de intrare, autentificatoare, jurnal. Din ea se
      restaurează aplicația. Se poate deschide și cu „DB Browser for SQLite” (sqlitebrowser.org); tabelele poartă
      aceleași nume ca registrele.
  pb_data/auxiliary.db        jurnalul tehnic al cererilor (nu e nevoie de el la restaurare).
  pb_public/                  aplicația însăși (ce se deschide pe telefon), inclusiv app-config.js cu cheia publică Turnstile.
  pb_hooks/, pb_migrations/   logica serverului și schema bazei de date.
  install.sh, nginx-site.conf, backup-weekly.sh, send-mail.py, export-xlsx.py, export-txt.py   scripturile serverului.
  restore.sh                  instalarea pe un server nou cu aceste date, dintr-o singură comandă (mai jos).
  NU sunt în arhivă, fiind secrete: parola superutilizatorului PocketBase, secretul Turnstile, setările de e-mail,
  parola arhivelor. Toate se refac în câteva minute (vezi mai jos).

CUM CITESC DATELE
  Deschideți fișierul .xlsx. Fiecare foaie = un registru; coloanele au numele câmpurilor din aplicație; „by” este contul
  care a înregistrat rândul, „created/updated” când. Sumele sunt în valuta din coloana „valuta” (lipsă = MDL), cu cursul
  din „curs” față de MDL la data înregistrării.

CUM MUT APLICAȚIA PE UN SERVER NOU, CU ACESTE DATE
  Trebuie: un VPS cu Ubuntu 22.04/24.04 curat (4 GB RAM ajung), acces root prin SSH, domeniul în Cloudflare.
  1. DNS: în Cloudflare, înregistrarea A a domeniului (ex. casaehl.com) → IP-ul serverului nou, deocamdată „DNS only”
     (norul gri), altfel certificatul HTTPS nu se poate emite.
  2. Urcați arhiva pe server:   scp casieria_$STAMP.zip root@IP_NOU:/root/
  3. Intrați pe server (ssh root@IP_NOU) și rulați:
       apt-get update && apt-get install -y p7zip-full
       cd /root && 7z x casieria_$STAMP.zip            # cere parola arhivelor
       cd casieria_$STAMP && bash restore.sh casaehl.com
     restore.sh copiază aplicația în /opt/casieria, rulează install.sh (PocketBase, serviciul izolat, nginx, certificatul
     HTTPS, firewall, fail2ban, actualizări automate), pune baza de date din arhivă la loc, creează un superutilizator
     nou și pornește serviciul. Durează 2–4 minute. Parola superutilizatorului rămâne în /opt/casieria/ADMIN.txt.
  4. Verificare: https://casaehl.com se deschide; Sergiu și Grigore intră cu codurile lor și cu codul din aplicația de
     autentificare, exact ca înainte — totul este în baza restaurată. Colaboratorii la fel.
  5. După aceea, pe serverul nou:
     - Cloudflare: norul portocaliu la loc, SSL/TLS „Full (strict)”.
     - Turnstile (bifa „Sunt om”): Cloudflare → Turnstile → widgetul casaehl.com → Secret Key →
         printf '%s\n' 'SECRETUL' > /opt/casieria/pb_data/turnstile.secret
         chown casieria:casieria /opt/casieria/pb_data/turnstile.secret && chmod 600 /opt/casieria/pb_data/turnstile.secret
       Fără acest fișier serverul nu verifică bifa (intrarea merge, dar fără protecția anti-robot).
     - E-mailurile de vineri: completați /opt/casieria/mail.conf (install.sh îl creează gol): smtp_user și from = contul
       Gmail care trimite, smtp_pass = parola de aplicație Google a acelui cont, to = adresa care primește,
       from_name: CasaEHL BackUP. Parola arhivelor noi: /opt/casieria/backup.pass (install.sh a generat una nouă; la
       prima copie vă vine pe e-mail).
  Dacă aveți și proiectul din git (github.com/fndgrow/sergiu_finance_app), README.md §17a descrie același drum cu deploy.sh.

CUM PUN DOAR DATELE LA LOC PE SERVERUL EXISTENT (de exemplu după o greșeală)
  Pe server, ca root, din dosarul dezarhivat:
       systemctl stop casieria
       cp /opt/casieria/pb_data/data.db /opt/casieria/pb_data/data.db.inainte_$STAMP
       cp pb_data/data.db /opt/casieria/pb_data/data.db && chown casieria:casieria /opt/casieria/pb_data/data.db
       rm -f /opt/casieria/pb_data/data.db-wal /opt/casieria/pb_data/data.db-shm
       systemctl start casieria
  Atenție: tot ce s-a introdus în aplicație după $SHOWN se pierde (rămâne în fișierul .inainte_$STAMP).
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
  python3 "$DIR/send-mail.py" "CasaEHL BackUP — parola arhivelor" "Aceasta este parola cu care se deschid arhivele de rezervă (fișierele .zip din e-mailurile de vineri; se deschid cu 7-Zip sau WinRAR, pe Linux cu 7z):

$PASS

Păstrați-o în managerul de parole și ștergeți acest e-mail. Parola nu se mai trimite; ea stă doar pe server, în /opt/casieria/backup.pass." \
    && touch "$DIR/backup.pass.sent" && log "password e-mail sent once" || log "password e-mail NOT sent (mail.conf?)"
fi
python3 "$DIR/send-mail.py" "CasaEHL BackUP — $(date '+%d.%m.%Y')" "Copia de rezervă Casa EHL din $SHOWN:

$LINK

Mărime: $SIZE. Linkul funcționează până la $UNTIL; după aceea fișierul este șters de pe server.

Arhiva este criptată: se deschide cu 7-Zip sau WinRAR (pe Linux: 7z x fișier.zip) cu parola arhivelor, trimisă o singură dată, la prima copie. Înăuntru:
  - $XLSX — toate datele, câte o foaie Excel pe registru;
  - $TXT — toate tranzacțiile în text simplu, una pe rând, în ordinea introducerii, cu jurnalul modificărilor;
  - pb_data/data.db — baza de date completă, din care se restaurează aplicația;
  - CITESTE-MA.txt — ce este în arhivă, cum se citesc datele, cum se mută aplicația pe alt server (restore.sh, o singură comandă) și cum se pun datele la loc pe serverul actual." \
  && log "link e-mailed" || { log "e-mail FAILED (link: $LINK)"; exit 1; }
