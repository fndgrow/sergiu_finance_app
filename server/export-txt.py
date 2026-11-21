#!/usr/bin/env python3
"""Casieria EHL — every transaction as plain text, one per line, in the order they were entered (21 November 2026).
   python3 export-txt.py /path/to/data.db /path/to/out.txt
   Part 1: the money registers (incasari, cheltuieli, iesiri, chirii, contracte, imprumuturi, schimburi) merged and sorted
           by the moment they were written — when, by whom, which register, the operation's date, the amount in its
           currency (and in lei when there is a rate), the description, every other field as camp=valoare, the id.
   Part 2: the journal — every add / change / delete, who did it and when, with the data as the server logged it.
   Part 3: the other registers (projects, employees, salaries, timesheets, schedule, requests, users' names, settings).
   Secrets are never written: of utilizatori only the name, role and status; of config no hashes. For reading and for
   putting data back by hand; the app does not import it. Needs only the Python standard library.
"""
import json, sqlite3, sys, datetime

MONEY = [  # (table, label, date column, amount function)
    ("incasari", "ÎNCASARE", "data"),
    ("cheltuieli", "CHELTUIALĂ", "data"),
    ("iesiri", "IEȘIRE", "data"),
    ("chirii", "CHIRIE", "dataInceput"),
    ("contracte", "CONTRACT", None),
    ("imprumuturi", "ÎMPRUMUT", "data"),
    ("schimburi", "SCHIMB VALUTAR", "data"),
]
OTHER = [
    ("proiecte", "Proiecte"), ("angajati", "Angajați"), ("istoric", "Salarii (istoric)"), ("pontaj", "Pontaj"),
    ("grafic", "Grafic"), ("cereri", "Cereri de modificare"), ("utilizatori", "Utilizatori (doar nume, rol, stare)"), ("config", "Setări"),
]
HIDE = {"utilizatori": None, "config": {"reactivareHash", "reactivareSet"}}
USER_COLS = ["nume", "rol", "status", "created"]
ACT = {"add": "ADĂUGAT", "mod": "MODIFICAT", "del": "ȘTERS", "edit": "MODIFICAT"}

def num(v):
    try: f = float(v)
    except Exception: return str(v or "")
    return ("%.2f" % f).rstrip("0").rstrip(".") if f != int(f) else "%.2f" % f

def ts(s):
    """'2026-11-21 10:03:56.415Z' (UTC) -> '21.11.2026 10:03 UTC'"""
    s = str(s or "")
    try:
        d = datetime.datetime.strptime(s[:19].replace("T", " "), "%Y-%m-%d %H:%M:%S")
        return d.strftime("%d.%m.%Y %H:%M") + " UTC"
    except Exception: return s

def day(s):
    s = str(s or "")
    try: return datetime.datetime.strptime(s[:10], "%Y-%m-%d").strftime("%d.%m.%Y")
    except Exception: return s

def val(v):
    if v is None: return ""
    if isinstance(v, (bytes, bytearray)): return ""
    if isinstance(v, float): return num(v)
    s = str(v)
    if s[:1] in "[{":
        try: return json.dumps(json.loads(s), ensure_ascii=False, separators=(",", ":"))
        except Exception: pass
    return s.replace("\n", " ").replace("\r", " ")

def amount(table, r):
    cur = (r.get("valuta") or "MDL") or "MDL"; rate = r.get("curs")
    if table == "chirii":
        s = sum(float(r.get(k) or 0) for k in ("chirie", "gaj", "comunale", "avarii"))
        txt = "%s %s (chirie %s, gaj %s, comunale %s, avarii %s)" % (num(s), cur, num(r.get("chirie") or 0), num(r.get("gaj") or 0), num(r.get("comunale") or 0), num(r.get("avarii") or 0))
    elif table == "schimburi":
        return "%s %s -> %s %s" % (num(r.get("sumaDin") or 0), r.get("valutaDin") or "", num(r.get("sumaIn") or 0), r.get("valutaIn") or "")
    elif table == "contracte":
        return "%s MDL (de încasat cash %s)" % (num(r.get("sumaContract") or 0), num(r.get("deIncasatCash") or 0))
    else:
        s = float(r.get("suma") or 0); txt = "%s %s" % (num(s), cur)
    try:
        if cur != "MDL" and rate and float(rate) > 0: txt += " (curs %s = %s MDL)" % (num(rate), num(s * float(rate)))
    except Exception: pass
    return txt

def who(table, r):
    if table == "incasari": return "client " + str(r.get("client") or "—")
    if table == "cheltuieli": return "plătit de %s (%s)" % (r.get("platitDe") or "—", r.get("sursa") or "casă")
    if table == "iesiri": return "%s → %s (%s%s)" % (r.get("sursa") or "—", r.get("persoana") or r.get("destinatie") or "—", r.get("destinatie") or "", (", din contul " + r["platitDe"]) if r.get("platitDe") else "")
    if table == "chirii": return "%s, chiriaș %s" % (r.get("locatia") or "—", r.get("chirias") or "—")
    if table == "contracte": return "client " + str(r.get("client") or "—")
    if table == "imprumuturi": return "%s (%s)" % (r.get("persoana") or "—", r.get("status") or "")
    if table == "schimburi": return str(r.get("persoana") or "—")
    return ""

def desc(table, r):
    for k in ("descriere", "nota", "nume"):
        if r.get(k): return str(r[k])
    if table == "cheltuieli": return str(r.get("categorie") or "")
    return ""

SHOWN = {"id", "by", "created", "updated", "suma", "valuta", "curs", "descriere", "nota", "data", "dataInceput", "sumaDin", "sumaIn", "valutaDin", "valutaIn"}

def main():
    if len(sys.argv) < 3:
        print("usage: export-txt.py data.db out.txt", file=sys.stderr); return 2
    db, out = sys.argv[1], sys.argv[2]
    c = sqlite3.connect("file:%s?mode=ro" % db, uri=True); c.row_factory = sqlite3.Row
    tables = {r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'")}
    names = {}
    if "utilizatori" in tables:
        for r in c.execute("SELECT id, nume FROM utilizatori"): names[r["id"]] = r["nume"]
    byname = lambda i: names.get(i, i or "—")
    now = datetime.datetime.now().strftime("%d.%m.%Y %H:%M")
    L = []
    L.append("CASA EHL — TOATE TRANZACȚIILE, ÎN ORDINEA ÎN CARE AU FOST INTRODUSE   (export %s, ora serverului)" % now)
    L.append("=" * 110)
    L.append("Fiecare rând este o tranzacție existentă acum în aplicație. Ordinea este cea a introducerii (coloana «introdus»);")
    L.append("«data» este data operației aleasă în formular. Sumele sunt în valuta lor; la altă valută decât MDL se arată și cursul")
    L.append("și echivalentul în lei. După descriere vin toate celelalte câmpuri, câmp=valoare, exact cum sunt în baza de date,")
    L.append("ca să se poată reintroduce manual. Orele sunt UTC (ora Chișinăului = UTC+2 iarna, +3 vara).")
    L.append("Partea a 2-a este jurnalul: ce s-a adăugat, modificat sau șters, de cine și când (inclusiv rândurile care nu mai există).")
    L.append("Partea a 3-a: celelalte registre (proiecte, angajați, salarii, pontaj, grafic, cereri, utilizatori, setări).")
    L.append("")
    rows = []
    for table, label, dcol in MONEY:
        if table not in tables: continue
        for r in c.execute("SELECT * FROM %s" % table):
            rows.append((str(r["created"] or ""), table, label, dcol, dict(r)))
    rows.sort(key=lambda x: x[0])
    L.append("PARTEA 1 — TRANZACȚIILE (%d rânduri)" % len(rows))
    L.append("-" * 110)
    for i, (created, table, label, dcol, r) in enumerate(rows, 1):
        rest = "; ".join("%s=%s" % (k, val(r[k])) for k in r.keys() if k not in SHOWN and val(r[k]) not in ("", "0", "false", "False"))
        L.append("#%d | introdus %s de %s | %s | data %s | %s | %s | %s%s | id=%s" % (
            i, ts(created), byname(r.get("by")), label, day(r.get(dcol)) if dcol else "—", amount(table, r), desc(table, r), who(table, r),
            (" | " + rest) if rest else "", r.get("id")))
    L.append("")
    if "jurnal" in tables:
        jr = list(c.execute("SELECT * FROM jurnal ORDER BY created"))
        L.append("PARTEA 2 — JURNALUL MODIFICĂRILOR (%d înregistrări; «ȘTERS» păstrează rândul întreg, așa cum era)" % len(jr))
        L.append("-" * 110)
        for r in jr:
            L.append("%s | %s | %s | de %s | rând %s | %s" % (ts(r["created"]), ACT.get(r["act"], str(r["act"]).upper()), r["col"], r["nume"] or byname(r["by"]), r["ref"] or "—", val(r["data"])))
        L.append("")
    L.append("PARTEA 3 — CELELALTE REGISTRE")
    L.append("-" * 110)
    for table, title in OTHER:
        if table not in tables: continue
        cols = [x[1] for x in c.execute("PRAGMA table_info(%s)" % table)]
        if table == "utilizatori": cols = [k for k in USER_COLS if k in cols]
        hide = HIDE.get(table) or set()
        order = "ORDER BY created" if "created" in cols else ""
        items = list(c.execute("SELECT %s FROM %s %s" % (", ".join('"%s"' % k for k in cols), table, order)))
        L.append("%s (%d)" % (title, len(items)))
        for r in items:
            parts = []
            for k in cols:
                if k in hide: continue
                v = val(r[k])
                if v == "" or k == "updated": continue
                if k == "created": v = ts(v)
                elif k == "by": v = byname(v)
                parts.append("%s=%s" % (k, v))
            L.append("  " + "; ".join(parts))
        L.append("")
    with open(out, "w", encoding="utf-8", newline="\n") as f: f.write("\n".join(L) + "\n")
    print("wrote %s (%d transactions)" % (out, len(rows))); return 0

if __name__ == "__main__":
    sys.exit(main())
