#!/bin/bash
# Throwaway copy of the live Casieria database for an end-to-end audit. Touches only /tmp/pbaudit; the live service is read, never written.
set -e
# optional first argument: a folder with pb_hooks/ and pb_migrations/ to test instead of the live ones (new code, live data)
SRC=${1:-/opt/casieria}
OLD=$(pgrep -f "pocketbase serve --dir /tmp/pbaudit" || true)
[ -n "$OLD" ] && kill $OLD || true
rm -rf /tmp/pbaudit && mkdir -p /tmp/pbaudit/pb_data
cd /opt/casieria
python3 - <<'PY'
import sqlite3
for f in ("data.db", "auxiliary.db"):
    try:
        s = sqlite3.connect("pb_data/" + f); d = sqlite3.connect("/tmp/pbaudit/pb_data/" + f); s.backup(d); d.close(); s.close(); print("copied", f)
    except Exception as e:
        print("skip", f, e)
PY
cp -r "$SRC/pb_hooks" "$SRC/pb_migrations" /tmp/pbaudit/
cd /tmp/pbaudit
setsid nohup timeout 3600 /opt/casieria/pocketbase serve --dir /tmp/pbaudit/pb_data --hooksDir /tmp/pbaudit/pb_hooks --migrationsDir /tmp/pbaudit/pb_migrations --http 127.0.0.1:8097 > /tmp/pbaudit/out.log 2>&1 < /dev/null &
sleep 5
curl -s -o /dev/null -w "copy health %{http_code}\n" http://127.0.0.1:8097/api/health
curl -s -o /dev/null -w "live health %{http_code}\n" http://127.0.0.1:8090/api/health
python3 - <<'PY'
import sqlite3, json
c = sqlite3.connect("/tmp/pbaudit/pb_data/data.db")
cols = [r[1] for r in c.execute("PRAGMA table_info(utilizatori)")]
extra = ", twoFA, totpSecret, twoFAEHL, totpSecretEHL" if "totpSecretEHL" in cols else ", 0, '', 0, ''"
u = [dict(id=i, nume=n, rol=r, cod=k, codEHL=e or "", status=s, twoFA=bool(t), totpSecret=ts or "", twoFAEHL=bool(te), totpSecretEHL=tse or "") for i, n, r, k, e, s, t, ts, te, tse in c.execute("SELECT id,nume,rol,cod,codEHL,status" + extra + " FROM utilizatori")]
json.dump(u, open("/tmp/pbaudit/users.json", "w"))
print("users:", [(x["nume"], x["rol"], x["status"]) for x in u])
PY
