#!/bin/bash
# Throwaway copy of the live Casieria database for an end-to-end audit. Touches only /tmp/pbaudit; the live service is read, never written.
set -e
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
cp -r pb_hooks pb_migrations /tmp/pbaudit/
cd /tmp/pbaudit
setsid nohup timeout 3600 /opt/casieria/pocketbase serve --dir /tmp/pbaudit/pb_data --hooksDir /tmp/pbaudit/pb_hooks --migrationsDir /tmp/pbaudit/pb_migrations --http 127.0.0.1:8097 > /tmp/pbaudit/out.log 2>&1 < /dev/null &
sleep 5
curl -s -o /dev/null -w "copy health %{http_code}\n" http://127.0.0.1:8097/api/health
curl -s -o /dev/null -w "live health %{http_code}\n" http://127.0.0.1:8090/api/health
python3 - <<'PY'
import sqlite3, json
c = sqlite3.connect("/tmp/pbaudit/pb_data/data.db")
u = [dict(id=i, nume=n, rol=r, cod=k, codEHL=e or "", status=s) for i, n, r, k, e, s in c.execute("SELECT id,nume,rol,cod,codEHL,status FROM utilizatori")]
json.dump(u, open("/tmp/pbaudit/users.json", "w"))
print("users:", [(x["nume"], x["rol"], x["status"]) for x in u])
PY
