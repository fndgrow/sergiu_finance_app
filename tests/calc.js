/* Calculation regression test: a fixed set of records with totals worked out by hand
   (the rules of the "Evidență casierie EHL" workbook), checked against what the dashboard shows.
   Usage: node tests/calc.js .   (needs: npm install jsdom) */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");
const APP = process.argv[2] || ".";

const html = fs.readFileSync(path.join(APP, "index.html"), "utf8").replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "").replace(/<link[^>]*>/g, "");
const dom = new JSDOM(html, { url: "https://casieria.test/", runScripts: "outside-only", pretendToBeVisual: true });
const { window } = dom;
const errors = [];
window.addEventListener("error", e => errors.push("window error: " + (e.error && e.error.stack || e.message)));
window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
Object.defineProperty(window.navigator, "serviceWorker", { value: undefined });
window.EventSource = function () {};

/* ---- fixture (all rows by the director, today's rates: EUR 20, USD 18) ---- */
const DIR = { id: "dir000000000001", nume: "Director", rol: "Director", cod: "100000", status: "Activ", parolaSetata: true };
const D = "2026-11-02";
const store = {
  utilizatori: { [DIR.id]: DIR },
  config: { c1: { id: "c1", valute: [{ cod: "MDL", curs: 1 }, { cod: "EUR", curs: 20 }, { cod: "USD", curs: 18 }], casier: "Casier", categorii: ["Materiale", "Transport"] } },
  incasari: {
    i1: { id: "i1", data: D, client: "A", valuta: "MDL", curs: 1, suma: 100000, mod: "Numerar" },
    i2: { id: "i2", data: D, client: "A", valuta: "EUR", curs: 19.5, suma: 2000, mod: "Numerar" },   /* 39 000 MDL at row rate */
    i3: { id: "i3", data: D, client: "B", valuta: "USD", curs: 17, suma: 1000, mod: "Transfer" }    /* 17 000 MDL to the bank */
  },
  iesiri: {
    o1: { id: "o1", data: D, destinatie: "Dat persoanei", valuta: "EUR", curs: 20, suma: 500, persoana: "Ion" },   /* Ion advance 10 000 MDL, EUR shelf -500 */
    o2: { id: "o2", data: D, destinatie: "Dat persoanei", valuta: "MDL", curs: 1, suma: 5000, persoana: "Casier" }, /* cashier: not an outflow */
    o3: { id: "o3", data: D, destinatie: "Depus pe cont", valuta: "MDL", curs: 1, suma: 20000 },                    /* till -20 000, bank +20 000 */
    o4: { id: "o4", data: D, destinatie: "Salarii", valuta: "MDL", curs: 1, suma: 7000, persoana: "Ion", luna: "2026-10" },
    o5: { id: "o5", data: D, destinatie: "Alte", valuta: "MDL", curs: 1, suma: 300 }
  },
  cheltuieli: {
    c1: { id: "c1", data: D, suma: 4000, categorie: "Materiale", descriere: "ciment", platitDe: "Ion", mod: "Numerar", sursa: "Avans" },   /* from Ion's advance */
    c4: { id: "c4", data: D, suma: 7000, categorie: "Materiale", descriere: "placi din buzunar", platitDe: "Ion", mod: "Numerar", sursa: "Proprii" }, /* Ion paid 7 000 of his own: balance 10 000 - 11 000 = -1 000 */
    c2: { id: "c2", data: D, suma: 1500, categorie: "Transport", descriere: "camion", platitDe: "Casier", mod: "Numerar" }, /* from the MDL shelf */
    c3: { id: "c3", data: D, suma: 2500, categorie: "Materiale", descriere: "fier", platitDe: "Casier", mod: "Transfer" }  /* from the bank */
  },
  chirii: {
    r1: { id: "r1", dataInceput: D, locatia: "Apt", valuta: "EUR", curs: 20, chirie: 300, gaj: 100, comunale: 0, avarii: 0, mod: "Numerar" }, /* EUR shelf -400 = 8 000 MDL */
    r2: { id: "r2", dataInceput: D, locatia: "Depozit", valuta: "MDL", curs: 1, chirie: 3000, gaj: 0, comunale: 200, avarii: 0, mod: "Transfer" } /* bank -3 200 */
  },
  contracte: { k1: { id: "k1", client: "A", sumaContract: 200000, deIncasatCash: 150000 } },
  angajati: { a1: { id: "a1", nume: "Ion", dataInceput: "2026-01-01", status: "Activ" } },
  istoric: { h1: { id: "h1", angajat: "Ion", salariu: 12000, dinData: "2026-01-01" } },
  pontaj: { p1: { id: "p1", luna: "2026-10", angajat: "Ion", z1: 11, z2: 13 } }, /* the firm counts 24 working days in every month: 12000/24*24 = 12 000 */
  imprumuturi: { l1: { id: "l1", data: D, persoana: "Vasile", suma: 8000, termen: "2026-10-01", status: "Neachitat" }, l2: { id: "l2", data: D, persoana: "Vasile", suma: 2000, status: "Achitat" } },
  proiecte: {}, jurnal: {}
};
/* expected, by hand:
   MDL shelf: 100 000 - 20 000 (deposit) - 7 000 (salary) - 300 (other) - 1 500 (cashier cash expense) = 71 200
   EUR shelf: 2 000 - 500 (advance) - 400 (rent) = 1 100 EUR -> 22 000 MDL at today's 20
   USD shelf: 0 (the USD income was a transfer)
   till = 93 200; bank = 17 000 + 20 000 - 2 500 - 3 200 = 31 300
   Ion: received 10 000, spent 4 000 + 7 000 cash -> -1 000 (company owes him); company total = 93 200 + 31 300 - 1 000 = 123 500
   incomes total = 100 000 + 39 000 + 17 000 = 156 000; expenses = 15 000
   contract A: value 200 000, received 139 000 (cash 100 000 + 39 000), left 61 000, 69.5%
   salaries Oct: earned 12 000, paid 7 000, left 5 000; loans: 10 000 given, 2 000 back, 8 000 open, 1 overdue */
const EXPECT = { till: "93.200,00", bank: "31.300,00", total: "123.500,00", inc: "156.000,00", exp: "15.000,00", ionHand: "-1.000,00", eur: "1.100,00", eurMdl: "22.000,00", contrLeft: "61.000,00", pct: "69,5%", salLeft: "5.000,00", loanOpen: "8.000,00" };

const err = (s, m) => { const e = new Error(m); e.status = s; e.response = { message: m }; return e; };
let currentUser = null;
function col(c) { return {
  async getFullList() { return Object.values(store[c] || {}).map(r => ({ ...r, by: DIR.id, created: D + " 10:00:00.000Z" })); },
  async getOne(id) { const r = store[c] && store[c][id]; if (!r) throw err(404, "nf"); return { ...r }; },
  async create() { throw err(400, "read-only test"); }, async update() { throw err(400, "read-only test"); }, async delete() { throw err(400, "ro"); },
  async subscribe() { return () => {}; }, async authRefresh() { return { token: "t", record: DIR }; }
}; }
window.PocketBase = class { constructor() { this.authStore = { token: "", record: null, get isValid() { return !!this.token; }, save(t, r) { this.token = t; this.record = r; currentUser = r; }, clear() { this.token = ""; this.record = null; } }; this.realtime = { unsubscribe() {} }; }
  autoCancellation() {} collection(c) { return col(c); }
  async send(p, o) { if (o.body.cod !== DIR.cod) throw err(401, "x"); if (!o.body.parola) return { needPassword: true, record: DIR }; return { token: "tok", expires: Date.now() + 7e8, record: DIR }; } };
window.PB_URL = ""; window.ExcelJS = undefined;

const tick = (ms = 30) => new Promise(r => setTimeout(r, ms));
const $ = s => window.document.querySelector(s);
const txt = () => $("#app").textContent.replace(/\s+/g, " ");
const has = (label, v) => { const ok = txt().includes(v); console.log((ok ? "  ok   " : "  FAIL ") + label + " = " + v); if (!ok) errors.push(label); };
(async () => {
  window.eval(fs.readFileSync(path.join(APP, "app.js"), "utf8"));
  await tick(50);
  $("#pinv").value = DIR.cod; $("#pinf").dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })); await tick(60);
  $("#pwf").elements["p"].value = "secret12"; $("#pwf").dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true })); await tick(200);
  const t = txt();
  console.log("dashboard loaded:", /Banii firmei/.test(t));
  has("till (În casă)", EXPECT.till); has("bank (Pe cont)", EXPECT.bank); has("company total", EXPECT.total);
  has("incomes", EXPECT.inc); has("expenses", EXPECT.exp); has("EUR shelf", EXPECT.eur); has("EUR shelf in MDL", EXPECT.eurMdl);
  has("Ion balance (company owes)", EXPECT.ionHand); has("Ion own-money total", "din banii proprii 7.000,00"); has("contract left", EXPECT.contrLeft); has("contract %", EXPECT.pct);
  has("salary left Oct", EXPECT.salLeft); has("loans open", EXPECT.loanOpen);
  /* the overview donut for this month: Materiale 13 500 (90,0%) + Transport 1 500 (10,0%) */
  has("overview Materiale share", "90,0%"); has("overview Transport share", "10,0%");
  console.log(errors.length ? "\nERRORS: " + errors.join("; ") : "\nALL GOOD");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error("CRASH", e); process.exit(2); });
