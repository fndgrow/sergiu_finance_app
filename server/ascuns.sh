#!/usr/bin/env bash
# Casieria EHL — the hidden mode, from the server only (run as root on the server):
#   bash /opt/casieria/ascuns.sh status        is the hidden mode on? who has an alarm code?
#   bash /opt/casieria/ascuns.sh off           back to normal: every device shows the real data again within seconds
#   bash /opt/casieria/ascuns.sh on            switch the hidden mode on by hand (an alarm without a phone)
#   bash /opt/casieria/ascuns.sh reset-total   after a theft: every session closed, every authenticator cleared, a new
#                                              random access code for every account (directors: an EHL code too), the
#                                              hidden mode off; the new codes are printed here and, with --mail, also
#                                              sent to the owner's e-mail (mail.conf). The registers do not change.
# Nothing here deletes data. The app itself has no way to switch the hidden mode off: that is the point.
set -euo pipefail
DIR="${DIR:-/opt/casieria}"
CMD="${1:-status}"; MAIL="${2:-}"
[ "$(id -u)" = 0 ] || { echo "run as root"; exit 1; }
python3 - "$DIR" "$CMD" "$MAIL" <<'PY'
import sqlite3, sys, secrets, string, subprocess, datetime
d, cmd, mail = sys.argv[1], sys.argv[2], sys.argv[3]
c = sqlite3.connect(d + "/pb_data/data.db", timeout=10)
def flag(): return bool(c.execute("SELECT ascuns FROM config").fetchone()[0])
if cmd == "status":
    print("hidden mode:", "ON" if flag() else "off")
    for n, r, a in c.execute("SELECT nume, rol, alarmaSet FROM utilizatori ORDER BY nume"): print("  %-26s %-10s alarm code: %s" % (n, r, "set" if a else "-"))
elif cmd in ("off", "on"):
    c.execute("UPDATE config SET ascuns=?", (1 if cmd == "on" else 0,)); c.commit()
    print("hidden mode:", "ON" if flag() else "off", "— the apps follow within seconds (change poll) or at the next reload")
elif cmd == "reset-total":
    al = "23456789"; used = set()
    def mk():
        while True:
            x = "".join(secrets.choice(al) for _ in range(8))
            if x not in used: used.add(x); return x
    lines = []
    for uid, n, r in c.execute("SELECT id, nume, rol FROM utilizatori ORDER BY nume").fetchall():
        c1 = mk(); c2 = mk() if r == "Director" else ""
        tk = "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(50))
        c.execute("UPDATE utilizatori SET cod=?, codEHL=?, twoFA=0, totpSecret='', totpLast=0, recuperare='[]', twoFAEHL=0, totpSecretEHL='', totpLastEHL=0, recuperareEHL='[]', tokenKey=? WHERE id=?", (c1, c2, tk, uid))
        lines.append("%s (%s): cod %s%s" % (n, "administrator" if r == "Director" else "colaborator", c1, (", cod Casa EHL " + c2) if c2 else ""))
    c.execute("UPDATE config SET ascuns=0"); c.commit()
    body = ("Resetare de urgență făcută pe server la %s UTC. Toate sesiunile au fost închise și toate aplicațiile de autentificare anulate; fiecare o configurează din nou la prima intrare. Codurile noi (de schimbat apoi din Setări → Securitate):\n\n%s\n\nDatele din aplicație nu s-au schimbat." % (datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M"), "\n".join(lines)))
    print(body)
    if mail == "--mail":
        subprocess.run(["python3", d + "/send-mail.py", "CasaEHL: RESETARE DE URGENȚĂ — coduri noi", body], check=False)
else:
    print("usage: ascuns.sh status|off|on|reset-total [--mail]"); sys.exit(2)
PY
