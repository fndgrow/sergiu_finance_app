/* Drive the REAL app (app.js + PocketBase SDK) in jsdom against the live server through an SSH tunnel,
   filling it with test data exactly the way a user would: every form, every outflow type, every category.
   Usage: node fill.js <project folder> http://127.0.0.1:18090 */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const APP = process.argv[2], URL_ = process.argv[3];

const html = fs.readFileSync(path.join(APP, "index.html"), "utf8")
  .replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "").replace(/<link[^>]*>/g, "");
const dom = new JSDOM(html, { url: "https://casieria.test/", runScripts: "outside-only", pretendToBeVisual: true });
const { window } = dom;
const errors = [];
window.addEventListener("error", e => errors.push("window error: " + (e.error && e.error.stack || e.message)));
window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
window.URL.createObjectURL = () => "blob:x"; window.URL.revokeObjectURL = () => {};
Object.defineProperty(window.navigator, "serviceWorker", { value: undefined });
window.fetch = (u, o) => globalThis.fetch(u, o);
window.Headers = globalThis.Headers; window.Request = globalThis.Request; window.Response = globalThis.Response;
window.PB_URL = URL_;
window.ExcelJS = undefined;
window.eval(fs.readFileSync(path.join(APP, "vendor/pocketbase.umd.js"), "utf8"));

const tick = (ms = 120) => new Promise(r => setTimeout(r, ms));
const $ = s => window.document.querySelector(s);
const $$ = s => Array.from(window.document.querySelectorAll(s));
const text = () => $("#app").textContent.replace(/\s+/g, " ").trim();
const click = el => { if (!el) throw new Error("click target missing"); el.dispatchEvent(new window.MouseEvent("click", { bubbles: true })); };
const submit = f => { if (!f) throw new Error("form missing"); f.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })); };
const log = (m) => console.log(m);
const ok = (cond, msg) => { if (!cond) { errors.push("CHECK FAILED: " + msg); log("  FAIL " + msg); } else log("  ok   " + msg); };
const setField = (k, v) => { const el = $('[data-k="' + k + '"]'); if (!el) throw new Error("no field " + k + " in " + ($("#sheet").textContent || "").slice(0, 80)); if (el.type === "checkbox") el.checked = !!v; else el.value = String(v); el.dispatchEvent(new window.Event("input", { bubbles: true })); el.dispatchEvent(new window.Event("change", { bubbles: true })); };
const pick = (k, v) => { const w = $('[data-multi="' + k + '"]'); if (!w) throw new Error("no multi " + k); for (const name of [].concat(v)) { const b = Array.from(w.querySelectorAll("[data-pick]")).find(x => x.dataset.pick === name); if (!b) throw new Error("no option " + name); click(b); } };
async function form(col, fields, label) {
  click($('[data-view="add"]')); await tick(60);
  click($('[data-form="' + col + '"]')); await tick(60);
  for (const [k, v] of fields) { setField(k, v); await tick(30); }
  const before = $$('[data-edit]').length;
  submit($("#recf")); await tick(700);
  const err = $("#sheet") && $("#sheet").querySelector(".err");
  ok(!$("#recf"), (label || col) + (err ? " :: " + err.textContent : ""));
  if ($("#recf")) click($("#closeSheet"));
}
async function login(cod, parola, parolaNoua) {
  $("#pinv").value = cod; submit($("#pinf")); await tick(800);
  if ($("#spf") && parolaNoua) { $("#spf").elements["p1"].value = parolaNoua; $("#spf").elements["p2"].value = parolaNoua; submit($("#spf")); await tick(800); }
  else if ($("#pwf") && parola) { $("#pwf").elements["p"].value = parola; submit($("#pwf")); await tick(800); }
  await tick(1500);
}

(async () => {
  window.eval(fs.readFileSync(path.join(APP, "app.js"), "utf8"));
  await tick(800);
  ok($("#pinf"), "gate shown");

  log("== 1. test director logs in and sets a password");
  await login("770011", "Parola2026", "Parola2026");
  ok($("#role").textContent === "Director", "logged in as Director Test");
  await tick(1500);

  log("== 2. settings: cashier + a fourth currency");
  click($('[data-view="set"]')); await tick(80);
  $("#casf").elements["casier"].value = "Enachi Grigore"; submit($("#casf")); await tick(600); ok(/Salvat|Сохранено|/.test(text()), "cashier set");
  $("#valf").elements["newcod"].value = "RON"; $("#valf").elements["newcurs"].value = "4.05"; submit($("#valf")); await tick(600);
  click($('[data-view="set"]')); await tick(80); ok($$('[name^="cod"]').some(i => i.value === "RON"), "RON currency added");

  log("== 3. users and employees");
  await form("utilizatori", [["nume", "Ion Popescu"], ["rol", "Operator"], ["cod", "440011"], ["caAngajat", true], ["salariu", "15000"]], "operator Ion Popescu + employee 15000");
  await form("utilizatori", [["nume", "Maria Rusu"], ["rol", "Operator"], ["cod", "440022"], ["caAngajat", true], ["salariu", "12000"]], "operator Maria Rusu + employee 12000");
  await form("angajati", [["nume", "Vasile Lungu"], ["dataInceput", "2026-09-01"], ["salariu", "10000"]], "employee Vasile Lungu (no login)");
  await form("angajati", [["nume", "Enachi Grigore"], ["dataInceput", "2026-01-10"], ["salariu", "18000"]], "employee Enachi Grigore (cashier)");

  log("== 4. projects");
  click($('[data-view="add"]')); await tick(60); click($('[data-form="proiecte"]')); await tick(60);
  setField("nume", "Casa Durlești"); setField("client", "Vasile"); pick("responsabili", ["Ion Popescu"]); setField("buget", "500000"); setField("termen", "2027-03-31"); submit($("#recf")); await tick(700); ok(!$("#recf"), "project Casa Durlești");
  click($('[data-view="add"]')); await tick(60); click($('[data-form="proiecte"]')); await tick(60);
  setField("nume", "Depozit Stăuceni"); setField("client", "Casile popescu"); pick("responsabili", ["Maria Rusu", "Ion Popescu"]); setField("buget", "300000"); submit($("#recf")); await tick(700); ok(!$("#recf"), "project Depozit Stăuceni");
  click($('[data-view="add"]')); await tick(60); click($('[data-form="proiecte"]')); await tick(60);
  setField("nume", "Gard Ialoveni"); setField("client", "SRL Alfa"); setField("status", "Pauză"); submit($("#recf")); await tick(700); ok(!$("#recf"), "project Gard Ialoveni (paused)");

  log("== 5. contracts");
  await form("contracte", [["client", "Vasile"], ["sumaContract", "800000"], ["deIncasatCash", "300000"], ["nota", "Contract nr. 12"]], "contract Vasile 800 000");
  await form("contracte", [["client", "Casile popescu"], ["sumaContract", "1500000"], ["deIncasatCash", "875000"]], "contract Casile popescu 1 500 000");

  log("== 6. incomes in several currencies and modes");
  await form("incasari", [["client", "Vasile"], ["proiect", "Casa Durlești"], ["descriere", "Avans etapa 2"], ["valuta", "EUR"], ["suma", "5000"], ["mod", "Transfer"]], "income EUR 5000 transfer (Vasile)");
  await form("incasari", [["client", "SRL Alfa"], ["proiect", "Gard Ialoveni"], ["descriere", "Avans gard"], ["valuta", "MDL"], ["suma", "20000"], ["mod", "Numerar"]], "income MDL 20000 cash (SRL Alfa)");
  await form("incasari", [["client", "Casile popescu"], ["proiect", "Depozit Stăuceni"], ["valuta", "USD"], ["suma", "3000"], ["mod", "Transfer"]], "income USD 3000 transfer");
  await form("incasari", [["client", "Vasile"], ["proiect", "Casa Durlești"], ["valuta", "RON"], ["suma", "10000"], ["mod", "Numerar"]], "income RON 10000 cash");

  log("== 7. every cash outflow type");
  await form("iesiri", [["destinatie", "Dat persoanei"], ["valuta", "EUR"], ["suma", "1000"], ["persoana", "Ion Popescu"], ["nota", "Avans materiale"]], "outflow: advance EUR 1000 to Ion");
  await form("iesiri", [["destinatie", "Dat persoanei"], ["valuta", "MDL"], ["suma", "5000"], ["persoana", "Maria Rusu"]], "outflow: advance MDL 5000 to Maria");
  await form("iesiri", [["destinatie", "Dat persoanei"], ["valuta", "MDL"], ["suma", "30000"], ["persoana", "Enachi Grigore"], ["nota", "Casierul ține casa"]], "outflow: to cashier (not counted as outflow)");
  await form("iesiri", [["destinatie", "Depus pe cont"], ["valuta", "USD"], ["suma", "10000"], ["nota", "Depunere BCR"]], "outflow: deposit USD 10000 to bank");
  await form("iesiri", [["destinatie", "Salarii"], ["valuta", "MDL"], ["suma", "7000"], ["persoana", "Ion Popescu"], ["luna", "2026-10"]], "outflow: salary MDL 7000 Ion (Oct)");
  await form("iesiri", [["destinatie", "Salarii"], ["valuta", "MDL"], ["suma", "6000"], ["persoana", "Maria Rusu"], ["luna", "2026-10"]], "outflow: salary MDL 6000 Maria (Oct)");
  await form("iesiri", [["destinatie", "Alte"], ["valuta", "MDL"], ["suma", "500"], ["nota", "Taxă notar"]], "outflow: other MDL 500");

  log("== 8. expenses: every category, both modes, several payers");
  const cats = [["Materiale", 12000, "Ion Popescu", "Numerar", "Vasile", "Casa Durlești", "Ciment, nisip"],
    ["Transport", 1500, "Maria Rusu", "Numerar", "Casile popescu", "Depozit Stăuceni", "Camion"],
    ["Combustibil", 900, "Ion Popescu", "Transfer", "Vasile", "Casa Durlești", "Motorină"],
    ["Unelte", 3200, "Enachi Grigore", "Numerar", "", "", "Bormașină"],
    ["Birou", 400, "Enachi Grigore", "Numerar", "", "", "Hârtie, toner"],
    ["Taxe", 2500, "Enachi Grigore", "Transfer", "", "", "Taxă locală"],
    ["Reparații", 1800, "Maria Rusu", "Numerar", "Casile popescu", "Depozit Stăuceni", "Reparație pompă"],
    ["Diverse", 250, "Ion Popescu", "Numerar", "", "", "Apă, pâine"]];
  for (const [cat, suma, platit, mod, client, proiect, descr] of cats) {
    const f = [["suma", suma], ["categorie", cat], ["descriere", descr], ["platitDe", platit], ["mod", mod]];
    if (client) f.push(["client", client]); if (proiect) f.push(["proiect", proiect]);
    await form("cheltuieli", f, "expense " + cat + " " + suma + " by " + platit + " (" + mod + ")");
  }

  log("== 9. rents");
  await form("chirii", [["dataInceput", "2026-11-01"], ["dataSfarsit", "2026-11-30"], ["locatia", "Apartament Botanica"], ["chirias", "Ion Popescu"], ["valuta", "EUR"], ["chirie", "300"], ["gaj", "300"], ["comunale", "45"], ["mod", "Numerar"]], "rent EUR cash (Botanica)");
  await form("chirii", [["dataInceput", "2026-11-01"], ["locatia", "Cazare muncitori Stăuceni"], ["valuta", "MDL"], ["chirie", "4000"], ["avarii", "350"], ["mod", "Transfer"], ["nota", "Geam spart"]], "rent MDL transfer (Stăuceni)");

  log("== 10. loans");
  await form("imprumuturi", [["persoana", "Vasile Lungu"], ["suma", "8000"], ["termen", "2026-12-01"], ["status", "Neachitat"], ["dinCasa", true], ["nota", "Împrumut personal"]], "loan 8000 Vasile Lungu, from the till");
  await form("imprumuturi", [["persoana", "Maria Rusu"], ["suma", "2000"], ["termen", "2026-10-15"], ["status", "Achitat"]], "loan 2000 Maria (repaid)");
  await form("imprumuturi", [["persoana", "Ion Popescu"], ["suma", "1500"], ["termen", "2026-10-01"], ["status", "Neachitat"]], "loan 1500 Ion (overdue)");

  log("== 11. timesheets");
  await form("pontaj", [["luna", "2026-10"], ["angajat", "Ion Popescu"], ["z1", "12"], ["z2", "13"]], "timesheet Ion Oct 12+13");
  await form("pontaj", [["luna", "2026-10"], ["angajat", "Maria Rusu"], ["z1", "10"], ["z2", "11"]], "timesheet Maria Oct 10+11");
  await form("pontaj", [["luna", "2026-10"], ["angajat", "Vasile Lungu"], ["z1", "13"], ["z2", "13"]], "timesheet Vasile Oct 13+13");
  await form("pontaj", [["luna", "2026-11"], ["angajat", "Ion Popescu"], ["z1", "1"], ["z2", "0"]], "timesheet Ion Nov 1");

  log("== 12. edit and delete as director (journal records both)");
  click($('[data-view="reg"]')); await tick(80); click($('[data-tab="cheltuieli"]')); await tick(80);
  const rows = $$('[data-edit="cheltuieli"]'); ok(rows.length >= 8, "expense register lists " + rows.length + " rows");
  const diverse = rows.find(r => /Diverse/.test(r.textContent)); click(diverse); await tick(80);
  setField("suma", "275"); submit($("#recf")); await tick(700); ok(!$("#recf"), "edited Diverse 250 -> 275");
  click($('[data-view="reg"]')); await tick(80); click($('[data-tab="cheltuieli"]')); await tick(80);
  const birou = $$('[data-edit="cheltuieli"]').find(r => /Birou/.test(r.textContent)); click(birou); await tick(80);
  click($("#delbtn")); await tick(50); click($("#delbtn")); await tick(700); ok(!$("#recf"), "deleted Birou expense");

  log("== 13. dashboard and registers render");
  click($('[data-view="panou"]')); await tick(150);
  const t = text();
  ok(/Banii firmei/.test(t) && /Ion Popescu/.test(t) && /Casa Durlești/.test(t), "dashboard shows totals, collaborators, projects");
  log("  dashboard: " + t.slice(0, 420));
  for (const tab of ["incasari", "cheltuieli", "iesiri", "proiecte", "chirii", "contracte", "imprumuturi", "salarii", "jurnal"]) {
    click($('[data-view="reg"]')); await tick(80); click($('[data-tab="' + tab + '"]')); await tick(80);
    if (tab === "jurnal") { submit($("#jurf")); await tick(900); }
    ok(text().length > 40 && !/Nimic încă/.test(text()), "register " + tab + " has data");
  }
  const jt = text(); ok(/Modificat/.test(jt) && /Șters/.test(jt) && /Adăugat/.test(jt), "journal shows add, edit and delete entries");

  log("== 14. operator Ion logs in and works");
  click($('[data-view="set"]')); await tick(80); click($("#exitdir")); await tick(300);
  await login("440011");
  ok($("#role").textContent === "Operator", "Ion is Operator");
  await tick(1200);
  click($('[data-form="cheltuieli"]')); await tick(80);
  ok($('[data-k="platitDe"]').value === "Ion Popescu", "Plătit de prefilled with Ion");
  const projOpts = Array.from($('[data-k="proiect"]').options).map(o => o.value).filter(Boolean);
  ok(projOpts.includes("Casa Durlești") && projOpts.includes("Depozit Stăuceni") && !projOpts.includes("Gard Ialoveni"), "Ion sees only his active projects: " + projOpts.join(", "));
  click($("#closeSheet")); await tick(50);
  await form("cheltuieli", [["suma", "700"], ["categorie", "Materiale"], ["descriere", "Cuie, șuruburi"], ["client", "Vasile"], ["proiect", "Casa Durlești"], ["mod", "Numerar"]], "Ion adds expense 700");
  await form("incasari", [["client", "Vasile"], ["proiect", "Casa Durlești"], ["valuta", "MDL"], ["suma", "15000"], ["mod", "Numerar"]], "Ion records income 15000 cash");
  await form("pontaj", [["luna", "2026-11"], ["angajat", "Ion Popescu"], ["z1", "2"], ["z2", "0"]], "Ion adds his own timesheet");
  click($('[data-view="mine"]')); await tick(150);
  ok(/Cuie/.test(text()) && /15[ .]?000/.test(text()), "Ale mele lists Ion's entries");
  click($('[data-view="panou"]')); await tick(100); ok($("#pinf"), "operator sees the code gate instead of the dashboard");

  log("== 15. operator Maria logs in, then the test director returns with the password");
  click($('[data-view="add"]')); await tick(60); click($("#exitdir")); await tick(300);
  await login("440022"); ok($("#role").textContent === "Operator", "Maria is Operator"); await tick(800);
  await form("cheltuieli", [["suma", "320"], ["categorie", "Transport"], ["descriere", "Taxi șantier"], ["proiect", "Depozit Stăuceni"], ["mod", "Numerar"]], "Maria adds expense 320");
  click($('[data-view="add"]')); await tick(60); click($("#exitdir")); await tick(300);
  await login("770011", "Parola2026");
  ok($("#role").textContent === "Director", "director back with password");
  await tick(1200);
  click($('[data-view="panou"]')); await tick(150);
  log("  final dashboard: " + text().slice(0, 600));

  log(errors.length ? "\nERRORS:\n" + errors.join("\n") : "\nALL GOOD");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error("CRASH", e); process.exit(2); });
