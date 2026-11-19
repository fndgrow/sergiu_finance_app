#!/usr/bin/env python3
"""Casieria EHL — every register of the application as one Excel workbook, straight from a copy of the database.
   python3 export-xlsx.py /path/to/data.db /path/to/out.xlsx
   One sheet per collection (Romanian sheet names), the fields as columns (technical columns id/by/created/updated last),
   JSON fields written as text, a first sheet "Cuprins" with the row counts. Secrets are never exported: of utilizatori
   only the name, role and status. Needs python3-openpyxl (apt). For reading and archiving; the app does not import it.
"""
import json, sqlite3, sys, datetime
try:
    from openpyxl import Workbook
    from openpyxl.styles import Font, Alignment, PatternFill
    from openpyxl.utils import get_column_letter
except ImportError:
    print("python3-openpyxl is missing (apt-get install -y python3-openpyxl)", file=sys.stderr); sys.exit(1)

SHEETS = [  # (table, sheet name, note)
    ("incasari", "Încasări", "banii intrați de la clienți și fondatori"),
    ("cheltuieli", "Cheltuieli", "cheltuieli și plăți de salarii (categoria Salarii)"),
    ("iesiri", "Ieșiri", "bani dați mai departe: din Casa EHL sau din contul unei persoane"),
    ("chirii", "Chirii", ""),
    ("contracte", "Contracte", ""),
    ("imprumuturi", "Împrumuturi", ""),
    ("schimburi", "Schimburi valutare", ""),
    ("proiecte", "Proiecte", "contract (EUR, cash/transfer), adițional, status"),
    ("angajati", "Angajați", ""),
    ("istoric", "Salarii (istoric)", "salariul fiecărui angajat și de când se aplică"),
    ("pontaj", "Pontaj", "zilele lucrate pe lună (z1…z31), bonus, achitat"),
    ("grafic", "Grafic", "zilele planificate pe proiecte"),
    ("utilizatori", "Utilizatori", "doar numele, rolul și starea (fără coduri sau chei)"),
    ("jurnal", "Jurnal", "cine a introdus / schimbat ce și când"),
    ("config", "Setări", "valute și cursuri, lista de categorii, administratorii"),
]
TECH = ["id", "by", "created", "updated"]
USER_COLS = ["nume", "rol", "status"]

def cell_value(v):
    if v is None: return ""
    if isinstance(v, (bytes, bytearray)): return ""
    s = v if isinstance(v, str) else v
    if isinstance(s, str) and s[:1] in "[{":
        try: return json.dumps(json.loads(s), ensure_ascii=False)
        except Exception: return s
    return s

def main():
    if len(sys.argv) < 3:
        print("usage: export-xlsx.py data.db out.xlsx", file=sys.stderr); return 2
    db, out = sys.argv[1], sys.argv[2]
    c = sqlite3.connect("file:%s?mode=ro" % db, uri=True)
    tables = {r[0] for r in c.execute("SELECT name FROM sqlite_master WHERE type='table'")}
    wb = Workbook(); toc = wb.active; toc.title = "Cuprins"
    head_font, head_fill = Font(bold=True), PatternFill("solid", fgColor="E8EEF4")
    toc.append(["Casieria EHL — toate datele aplicației, export din " + datetime.datetime.now().strftime("%d.%m.%Y %H:%M")])
    toc["A1"].font = Font(bold=True, size=13)
    toc.append(["Fiecare foaie este un registru din aplicație; coloanele poartă numele câmpurilor din aplicație; id, by, created, updated sunt coloane tehnice (by = contul care a înregistrat rândul)."])
    toc.append(["Fișierul este pentru citit și arhivat; aplicația se restaurează din pb_data/data.db (vezi CITESTE-MA.txt)."])
    toc.append([]); toc.append(["Foaie", "Rânduri", "Ce conține"])
    for cell in toc[5]: cell.font = head_font; cell.fill = head_fill
    for table, title, note in SHEETS:
        if table not in tables: continue
        allcols = [r[1] for r in c.execute("PRAGMA table_info(%s)" % table)]
        if table == "utilizatori": cols = [k for k in USER_COLS if k in allcols]
        else: cols = [k for k in allcols if k not in TECH] + [k for k in TECH if k in allcols]
        ws = wb.create_sheet(title[:31]); ws.append(cols)
        for cell in ws[1]: cell.font = head_font; cell.fill = head_fill; cell.alignment = Alignment(vertical="top")
        n = 0
        # newest first: by the row's own date or month where there is one (the table's columns, not the exported ones)
        if table == "utilizatori": order = "ORDER BY nume"
        elif "data" in allcols: order = "ORDER BY data DESC, created DESC"
        elif "luna" in allcols: order = "ORDER BY luna DESC, created DESC"
        elif "created" in allcols: order = "ORDER BY created DESC"
        else: order = ""
        for row in c.execute("SELECT %s FROM %s %s" % (", ".join('"%s"' % k for k in cols), table, order)):
            ws.append([cell_value(v) for v in row]); n += 1
        for i, k in enumerate(cols, 1):
            width = max([len(str(k))] + [len(str(ws.cell(row=r, column=i).value or "")) for r in range(2, min(ws.max_row, 200) + 1)])
            ws.column_dimensions[get_column_letter(i)].width = min(max(width + 2, 8), 60)
        ws.freeze_panes = "A2"; ws.auto_filter.ref = ws.dimensions
        toc.append([title, n, note])
    toc.column_dimensions["A"].width = 24; toc.column_dimensions["B"].width = 10; toc.column_dimensions["C"].width = 70
    now = datetime.datetime.now().replace(microsecond=0)
    wb.properties.creator = "Casieria EHL"; wb.properties.created = now; wb.properties.modified = now
    wb.save(out); fix_core_dates(out); print("wrote " + out); return 0

def fix_core_dates(path):
    """openpyxl 3.1.2 on Python 3.12 writes '2026-11-19T09:47:34+00:00Z' into docProps/core.xml (offset AND Z):
       Excel then refuses the whole file as 'not a valid format'. Rewrite the zip with the dates as '…Z'."""
    import re, zipfile, shutil, os
    tmp = path + ".tmp"
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED) as zout:
        for item in zin.infolist():
            data = zin.read(item.filename)
            if item.filename == "docProps/core.xml":
                data = re.sub(rb"([0-9]{2}:[0-9]{2}:[0-9]{2})(\.[0-9]+)?\+00:00Z", rb"\1Z", data)
            zout.writestr(item, data)
    shutil.move(tmp, path)

if __name__ == "__main__":
    sys.exit(main())
