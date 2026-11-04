/* TEST DATA ONLY. Casieria EHL: one year of plausible history (Nov 2025 .. 3 Nov 2026) for a small construction firm.
   Runs ON THE SERVER as root: node /root/casieria-seed.js
   Writes through the API exactly like the app (records + one jurnal entry per change), as the right author:
   director for money movements, each worker for his own cash expenses, the office clerk for incomes and timesheets.
   Keeps an independent ledger (till per currency, bank, per-person advances, salary accruals) and saves it to
   /root/casieria-seed-expected.json so the dashboard can be checked against it. Deterministic. */
const fs = require("fs");
const B = "http://127.0.0.1:8090";
const KEEP_DIRECTOR = "4ibcn283h5mx7yg";

/* ---------- tiny deterministic RNG ---------- */
let seed = 20261103;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const pick = a => a[Math.floor(rnd() * a.length)];
const between = (a, b) => Math.round(a + rnd() * (b - a));
const chance = p => rnd() < p;
const p2 = x => (x < 10 ? "0" : "") + x;
const r2 = x => Math.round(x * 100) / 100;

/* ---------- calendar ---------- */
const MONTHS = []; { let y = 2025, m = 11; for (let i = 0; i < 13; i++) { MONTHS.push([y, m]); m++; if (m > 12) { m = 1; y++; } } } /* Nov 2025 .. Nov 2026 */
const ym = i => MONTHS[i][0] + "-" + p2(MONTHS[i][1]);
const dim = i => new Date(MONTHS[i][0], MONTHS[i][1], 0).getDate();
const day = (i, d) => ym(i) + "-" + p2(Math.min(d, i === 12 ? 3 : dim(i)));
const workdays = () => 24; /* the firm's rule: 24 working days in every month */
const TODAY = "2026-11-03";
const EUR = [19.45, 19.5, 19.6, 19.55, 19.7, 19.8, 19.9, 19.85, 20.0, 20.1, 20.15, 20.2, 20.22];
const USD = [17.6, 17.5, 17.4, 17.3, 17.2, 17.1, 17.0, 17.1, 17.2, 17.3, 17.4, 17.5, 17.5];
const RON = 4.0;
const rate = (cur, i) => cur === "EUR" ? EUR[i] : cur === "USD" ? USD[i] : cur === "RON" ? RON : 1;

/* ---------- API ---------- */
async function api(path, body, token, method) {
  const res = await fetch(B + path, { method: method || (body ? "POST" : "GET"), headers: { "Content-Type": "application/json", ...(token ? { Authorization: token } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(method || "POST" + " " + path + " -> " + res.status + " " + JSON.stringify(j).slice(0, 300));
  return j;
}
let count = 0;
async function add(col, data, who) {
  const rec = await api("/api/collections/" + col + "/records", data, who.token);
  await api("/api/collections/jurnal/records", { act: "add", col, ref: rec.id, nume: who.nume, data: { ...data, id: rec.id } }, who.token);
  count++; if (count % 50 === 0) process.stdout.write(".");
  return rec;
}
async function edit(col, id, patch, who) {
  const rec = await api("/api/collections/" + col + "/records/" + id, patch, who.token, "PATCH");
  const copy = {}; for (const k in rec) if (!["collectionId", "collectionName", "created", "updated", "by"].includes(k)) copy[k] = rec[k];
  await api("/api/collections/jurnal/records", { act: "edit", col, ref: id, nume: who.nume, data: copy }, who.token);
  return rec;
}
async function del(col, id, before, who) {
  await api("/api/collections/" + col + "/records/" + id, null, who.token, "DELETE");
  await api("/api/collections/jurnal/records", { act: "del", col, ref: id, nume: who.nume, data: before }, who.token);
}

/* ---------- the cast ---------- */
const CASHIER = "Enachi Grigore";
const USERS = [ /* operators; the director already exists */
  { nume: "Ion Popescu", cod: "4401", role: "maistru" },
  { nume: "Maria Rusu", cod: "4402", role: "office" },
  { nume: "Vasile Lungu", cod: "4403", role: "șef echipă" },
  { nume: "Andrei Cebotari", cod: "4404", role: "muncitor", leaves: 10 /* inactive from Sep 2026 (index 10) */ },
  { nume: CASHIER, cod: "4405", role: "casier" }
];
const EMPLOYEES = [ /* salary history: [fromDate, salary] */
  { nume: "Ion Popescu", start: "2025-11-01", sal: [["2025-11-01", 15000], ["2026-06-01", 17000]] },
  { nume: "Maria Rusu", start: "2025-11-01", sal: [["2025-11-01", 12000]] },
  { nume: "Vasile Lungu", start: "2025-11-01", sal: [["2025-11-01", 14000]] },
  { nume: "Andrei Cebotari", start: "2025-11-01", sal: [["2025-11-01", 11000]], until: 9 /* last month worked: Aug 2026 */ },
  { nume: CASHIER, start: "2025-11-01", sal: [["2025-11-01", 18000]] },
  { nume: "Dumitru Sava", start: "2026-03-01", sal: [["2026-03-01", 13000]], from: 4 /* first month: Mar 2026 */ }
];
const WORKERS = ["Ion Popescu", "Vasile Lungu", "Andrei Cebotari", "Dumitru Sava"]; /* get advances, pay cash on site */
const ADV = { "Ion Popescu": [20, 35], "Vasile Lungu": [15, 30], "Andrei Cebotari": [8, 15], "Dumitru Sava": [10, 20], "Maria Rusu": [3, 8] };
const PROJECTS = [
  { nume: "Vila Codru", client: "Oleg Munteanu", from: 0, to: 6, buget: 1300000, contract: 1850000, cash: 900000, resp: ["Ion Popescu"], status: "Finalizat" },
  { nume: "Hală Bubuieci", client: "SRL Agrotrans", from: 2, to: 12, buget: 1900000, contract: 2600000, cash: 600000, resp: ["Vasile Lungu", "Andrei Cebotari"], status: "Activ" },
  { nume: "Acoperiș Botanica", client: "Elena Moraru", from: 7, to: 9, buget: 260000, contract: 380000, cash: 380000, resp: ["Ion Popescu"], status: "Finalizat" },
  { nume: "Gard Ialoveni", client: "Tatiana Bivol", from: 5, to: 6, buget: 120000, contract: 160000, cash: 160000, resp: ["Vasile Lungu"], status: "Pauză", nota: "Clientul a oprit lucrările după avans" },
  { nume: "Teren sport Stăuceni", client: "Primăria Stăuceni", from: 9, to: 12, buget: 700000, contract: 980000, cash: 0, resp: ["Ion Popescu", "Vasile Lungu"], status: "Activ", nota: "Plată doar prin transfer, contract public" },
  { nume: "Fundație Cricova", client: "SRL Agrotrans", from: 10, to: 12, buget: 650000, contract: 920000, cash: 300000, resp: ["Vasile Lungu", "Dumitru Sava"], status: "Activ" }
];
/* payment schedule: month index, project, MDL value, mode, currency */
const PAY = [
  [0, "Vila Codru", 400000, "Numerar", "EUR", "Avans contract"], [0, "Vila Codru", 300000, "Transfer", "MDL", "Tranșa 1"],
  [2, "Vila Codru", 250000, "Numerar", "MDL", "Tranșa 2"], [3, "Vila Codru", 300000, "Transfer", "MDL", "Tranșa 3"],
  [4, "Vila Codru", 250000, "Numerar", "EUR", "Tranșa 4"], [5, "Vila Codru", 200000, "Transfer", "MDL", "Tranșa 5"], [6, "Vila Codru", 150000, "Transfer", "MDL", "Plata finală"],
  [2, "Hală Bubuieci", 500000, "Transfer", "MDL", "Avans contract"], [3, "Hală Bubuieci", 300000, "Transfer", "USD", "Tranșa 1"],
  [4, "Hală Bubuieci", 200000, "Numerar", "MDL", "Tranșa 2"], [5, "Hală Bubuieci", 400000, "Transfer", "MDL", "Tranșa 3"],
  [6, "Hală Bubuieci", 200000, "Numerar", "EUR", "Tranșa 4"], [7, "Hală Bubuieci", 300000, "Transfer", "MDL", "Tranșa 5"],
  [8, "Hală Bubuieci", 200000, "Numerar", "MDL", "Tranșa 6"], [9, "Hală Bubuieci", 300000, "Transfer", "MDL", "Tranșa 7"], [10, "Hală Bubuieci", 100000, "Transfer", "MDL", "Tranșa 8"],
  [7, "Acoperiș Botanica", 150000, "Numerar", "MDL", "Avans"], [8, "Acoperiș Botanica", 130000, "Numerar", "RON", "Tranșa 2 (lei românești)"], [9, "Acoperiș Botanica", 100000, "Numerar", "EUR", "Plata finală"],
  [5, "Gard Ialoveni", 64000, "Numerar", "MDL", "Avans 40%"],
  [9, "Teren sport Stăuceni", 300000, "Transfer", "MDL", "Avans contract"], [10, "Teren sport Stăuceni", 250000, "Transfer", "MDL", "Tranșa 1"], [11, "Teren sport Stăuceni", 200000, "Transfer", "MDL", "Tranșa 2"],
  [10, "Fundație Cricova", 200000, "Numerar", "EUR", "Avans contract"], [11, "Fundație Cricova", 250000, "Transfer", "MDL", "Tranșa 1"], [12, "Fundație Cricova", 100000, "Numerar", "MDL", "Tranșa 2"]
];
const EXP = {
  Materiale: [1500, 14000, ["Ciment M400, 40 saci", "Nisip 6 m³", "Armatură Ø12, 2 t", "Cărămidă 2 paleți", "Bloc Fortan 300 buc", "Plăci OSB 18 mm", "Vopsea fațadă 60 l", "Țiglă metalică", "Gresie și adeziv baie", "Ipsos, glet, bandă", "Cabluri, prize, doze", "Țevi PPR și fitinguri", "Polistiren 10 cm, 40 m²", "Cofraj, cuie, sârmă"]],
  Transport: [300, 2500, ["Camion nisip", "Transport cărămidă", "Taxi șantier", "Închiriere remorcă", "Transport muncitori Cricova", "Motostivuitor 2 ore"]],
  Combustibil: [500, 3000, ["Motorină Duster", "Benzină generator", "Motorină betonieră", "Motorină Sprinter"]],
  Unelte: [400, 4000, ["Discuri flex 10 buc", "Burghie SDS", "Mistrii, nivele", "Ciocan rotopercutor", "Mănuși, ochelari", "Prelungitor 50 m"]],
  Reparații: [500, 4000, ["Reparație betonieră", "Service Duster", "Reparație flex", "Anvelope Sprinter", "Lanț motofierăstrău"]],
  Diverse: [100, 1500, ["Mănuși, măști", "Detergent, saci", "Lacăt și lanț", "Bandă adezivă, markere"]],
  "Mâncare echipă": [150, 900, ["Prânz echipă", "Apă, pâine echipă", "Cafea, zahăr", "Pizza la turnare"]],
  "Chirie utilaje": [2000, 9000, ["Chirie excavator 2 zile", "Chirie schelă, lună", "Chirie compactor", "Chirie macara 1 zi"]]
};
const CATS_SITE = ["Materiale", "Materiale", "Materiale", "Transport", "Combustibil", "Unelte", "Reparații", "Diverse", "Mâncare echipă", "Chirie utilaje"];

/* ---------- independent ledger ---------- */
const L = { till: { MDL: 0, EUR: 0, USD: 0, RON: 0 }, bank: 0, person: {}, salaryAccrued: {}, salaryPaid: {}, incomeMDL: 0, expenseMDL: 0, contracts: {} };
const person = n => (L.person[n] = L.person[n] || { primit: 0, cheltuit: 0, proprii: 0 });

(async () => {
  console.log("node", process.version);
  const adm = fs.readFileSync("/opt/casieria/ADMIN.txt", "utf8");
  const E = (adm.match(/email:\s*(\S+)/) || [])[1], P = (adm.match(/password:\s*(\S+)/) || [])[1];
  const su = (await api("/api/collections/_superusers/auth-with-password", { identity: E, password: P })).token;

  /* --wipe: remove everything except the director (used to rerun after a failed attempt) */
  if (process.argv.includes("--wipe")) {
    for (const c of ["jurnal", "pontaj", "istoric", "angajati", "proiecte", "imprumuturi", "contracte", "chirii", "iesiri", "cheltuieli", "incasari", "login_attempts"]) {
      let n = 0;
      for (;;) { const j = await api("/api/collections/" + c + "/records?perPage=500&fields=id&skipTotal=1", null, su); if (!j.items.length) break;
        for (const r of j.items) { await api("/api/collections/" + c + "/records/" + r.id, null, su, "DELETE"); n++; } }
      if (n) console.log("wiped", n, c);
    }
    for (const u of (await api("/api/collections/utilizatori/records?perPage=100", null, su)).items) if (u.id !== KEEP_DIRECTOR) await api("/api/collections/utilizatori/records/" + u.id, null, su, "DELETE");
  }
  /* guard: only on a database that holds nothing but the director */
  for (const c of ["incasari", "cheltuieli", "iesiri", "jurnal"]) {
    const n = (await api("/api/collections/" + c + "/records?perPage=1&fields=id", null, su)).totalItems;
    if (n) throw new Error("collection " + c + " is not empty (" + n + "), refusing to seed on top of data");
  }
  const existing = (await api("/api/collections/utilizatori/records?perPage=50", null, su)).items;
  if (existing.length !== 1 || existing[0].id !== KEEP_DIRECTOR) throw new Error("expected exactly the director in utilizatori, found " + existing.map(u => u.nume).join(", "));

  /* director token (impersonation, 2 h), then operators by their codes */
  const dirAuth = await api("/api/collections/utilizatori/impersonate/" + KEEP_DIRECTOR, { duration: 7200 }, su);
  const DIR = { token: dirAuth.token, nume: dirAuth.record.nume };
  const WHO = { [DIR.nume]: DIR };
  console.log("seeding as director:", DIR.nume);

  /* 1. settings */
  const cfg = (await api("/api/collections/config/records?perPage=1", null, su)).items[0];
  await api("/api/collections/config/records/" + cfg.id, { valute: [{ cod: "MDL", curs: 1 }, { cod: "EUR", curs: 20.22 }, { cod: "USD", curs: 17.5 }, { cod: "RON", curs: 4.05 }], casier: CASHIER,
    categorii: ["Materiale", "Transport", "Combustibil", "Unelte", "Birou", "Taxe", "Reparații", "Diverse", "Mâncare echipă", "Chirie utilaje"] }, DIR.token, "PATCH");

  /* 2. users (as director, like Setări → Utilizatori) and employees with salary history */
  for (const u of USERS) {
    const pw = "x" + Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    await add("utilizatori", { nume: u.nume, rol: "Operator", cod: u.cod, status: "Activ", password: pw, passwordConfirm: pw }, DIR);
    const lg = await api("/api/ehl/login", { cod: u.cod });
    WHO[u.nume] = { token: lg.token, nume: u.nume, id: lg.record.id };
  }
  for (const e of EMPLOYEES) {
    const rec = await add("angajati", { nume: e.nume, dataInceput: e.start, status: "Activ" }, DIR);
    e.id = rec.id;
    for (const [d, s] of e.sal) await add("istoric", { angajat: e.nume, salariu: s, dinData: d }, DIR);
  }
  const MARIA = WHO["Maria Rusu"], CAS = WHO[CASHIER];

  /* 3. projects and contracts */
  for (const p of PROJECTS) {
    const rec = await add("proiecte", { nume: p.nume, client: p.client, responsabili: p.resp.join(", "), buget: p.buget, dataInceput: day(p.from, 3), termen: p.to >= 12 ? "2027-03-31" : day(p.to, 28), status: "Activ", nota: p.nota || "" }, DIR);
    p.id = rec.id;
    await add("contracte", { client: p.client, sumaContract: p.contract, deIncasatCash: p.cash, nota: "Contract " + p.nume }, DIR);
    L.contracts[p.nume] = { val: p.contract, cash: 0, tr: 0 };
  }

  /* 4. month by month */
  const owed = {}; /* salary still unpaid per employee */
  const loans = [];
  for (let i = 0; i <= 12; i++) {
    const last = i === 12 ? 3 : dim(i);
    const active = PROJECTS.filter(p => i >= p.from && i <= p.to);
    const empl = EMPLOYEES.filter(e => (e.from == null || i >= e.from) && (e.until == null || i <= e.until));

    /* incomes: Maria enters them from the bank statement / the director's note; one client name typed in lower case */
    for (const [m, pn, mdl, mode, cur, descr] of PAY.filter(x => x[0] === i)) {
      const p = PROJECTS.find(x => x.nume === pn), rt = rate(cur, i);
      const suma = cur === "MDL" ? mdl : Math.round(mdl / rt / 50) * 50;
      const client = (i === 8 && pn === "Hală Bubuieci") ? p.client.toLowerCase() : p.client;
      await add("incasari", { data: day(i, between(2, Math.min(26, last))), client, proiect: pn, descriere: descr, valuta: cur, curs: rt, suma, mod: mode }, DIR); /* client money: director only */
      const v = r2(suma * rt); L.incomeMDL = r2(L.incomeMDL + v);
      if (mode === "Numerar") { L.till[cur] = r2(L.till[cur] + suma); L.contracts[pn].cash = r2(L.contracts[pn].cash + v); } else { L.bank = r2(L.bank + v); L.contracts[pn].tr = r2(L.contracts[pn].tr + v); }
    }
    if (i === 12) { /* only the first three days of November 2026 */
      await add("cheltuieli", { data: day(12, 2), suma: 2400, categorie: "Combustibil", descriere: "Motorină Sprinter", client: "SRL Agrotrans", proiect: "Fundație Cricova", platitDe: "Vasile Lungu", mod: "Numerar", sursa: "Avans" }, WHO["Vasile Lungu"]);
      person("Vasile Lungu").cheltuit += 2400; L.expenseMDL = r2(L.expenseMDL + 2400);
      break;
    }

    /* the director tops up the cashier now and then: not an outflow */
    if (i % 4 === 1 && L.till.MDL > 60000) await add("iesiri", { data: day(i, 2), destinatie: "Dat persoanei", valuta: "MDL", curs: 1, suma: 30000, persoana: CASHIER, luna: "", nota: "Casierul ține casa" }, DIR);

    /* advances to the people on site, then their cash expenses */
    for (const who of WORKERS.concat(["Maria Rusu"])) {
      const e = EMPLOYEES.find(x => x.nume === who);
      if (e && ((e.from != null && i < e.from) || (e.until != null && i > e.until))) continue;
      const [a, b] = ADV[who], pr = person(who);
      if (chance(0.85)) {
        const want = between(a, b) * 1000;
        if (L.till.MDL >= want + 40000) {
          await add("iesiri", { data: day(i, between(1, 6)), destinatie: "Dat persoanei", valuta: "MDL", curs: 1, suma: want, persoana: who, luna: "", nota: "Avans cheltuieli șantier" }, DIR);
          L.till.MDL = r2(L.till.MDL - want); pr.primit = r2(pr.primit + want);
        } else {
          const rt = EUR[i], eur = Math.round(want / rt / 50) * 50;
          if (L.till.EUR >= eur + 500) {
            await add("iesiri", { data: day(i, between(1, 6)), destinatie: "Dat persoanei", valuta: "EUR", curs: rt, suma: eur, persoana: who, luna: "", nota: "Avans în euro (lipsă lei în casă)" }, DIR);
            L.till.EUR = r2(L.till.EUR - eur); pr.primit = r2(pr.primit + r2(eur * rt));
          }
        }
      }
      const mine = active.filter(p => p.resp.includes(who)); const projs = mine.length ? mine : active;
      const n = who === "Maria Rusu" ? between(1, 2) : between(3, 6);
      let ownThisMonth = 0;
      for (let k = 0; k < n; k++) {
        const cat = who === "Maria Rusu" ? pick(["Diverse", "Mâncare echipă", "Transport"]) : pick(CATS_SITE);
        const [lo, hi, descs] = EXP[cat]; let suma = between(lo, hi);
        const pr0 = pr.primit - pr.cheltuit;
        let sursa = "Avans";
        if (suma > pr0) { /* the advance is used up: pays from his own pocket, within reason */
          const cap = (who === "Dumitru Sava" ? 15000 : 4000) - ownThisMonth;
          if (cap <= 0) continue;
          suma = Math.min(suma, Math.max(0, pr0) + cap); if (suma < lo / 2) continue;
          sursa = "Proprii"; ownThisMonth += suma - Math.max(0, pr0);
        }
        const p = projs.length ? pick(projs) : null;
        /* Dumitru has no phone: the foreman Ion enters his receipts for him */
        await add("cheltuieli", { data: day(i, between(1, last)), suma, categorie: cat, descriere: pick(descs), client: p ? p.client : "", proiect: p ? p.nume : "", platitDe: who, mod: "Numerar", sursa }, WHO[who] || WHO["Ion Popescu"]);
        pr.cheltuit = r2(pr.cheltuit + suma); if (sursa === "Proprii") pr.proprii = r2(pr.proprii + suma); L.expenseMDL = r2(L.expenseMDL + suma);
      }
    }

    /* the cashier pays fuel from the till, and the firm pays big invoices and office costs by transfer */
    { const f = between(2000, 6000); if (L.till.MDL >= f) { await add("cheltuieli", { data: day(i, between(3, 12)), suma: f, categorie: "Combustibil", descriere: pick(EXP.Combustibil[2]), client: "", proiect: "", platitDe: CASHIER, mod: "Numerar", sursa: "Avans" }, CAS); L.till.MDL = r2(L.till.MDL - f); L.expenseMDL = r2(L.expenseMDL + f); } }
    if (chance(0.5)) { const t = between(300, 2500); if (L.till.MDL >= t) { await add("cheltuieli", { data: day(i, between(3, 20)), suma: t, categorie: "Taxe", descriere: pick(["Taxă autorizație", "Taxă locală", "Amendă parcare", "Taxă Cadastru"]), client: "", proiect: "", platitDe: CASHIER, mod: "Numerar", sursa: "Avans" }, CAS); L.till.MDL = r2(L.till.MDL - t); L.expenseMDL = r2(L.expenseMDL + t); } }
    for (const p of active) { if (chance(0.7)) { const v = between(20, 80) * 1000; if (L.bank >= v + 50000) { await add("cheltuieli", { data: day(i, between(5, 25)), suma: v, categorie: "Materiale", descriere: "Factură " + pick(["Supraten", "Dedeman", "Metal Grup", "Beton Service"]) + " nr. " + between(100, 999), client: p.client, proiect: p.nume, platitDe: CASHIER, mod: "Transfer", sursa: "" }, MARIA); L.bank = r2(L.bank - v); L.expenseMDL = r2(L.expenseMDL + v); } } }
    { const o = between(500, 2500); await add("cheltuieli", { data: day(i, between(2, 10)), suma: o, categorie: "Birou", descriere: pick(["Abonament internet", "Hârtie, toner", "Papetărie", "Program contabilitate", "Telefonie"]), client: "", proiect: "", platitDe: "Maria Rusu", mod: "Transfer", sursa: "" }, MARIA); L.bank = r2(L.bank - o); L.expenseMDL = r2(L.expenseMDL + o); }

    /* timesheets for this month (Maria keeps them), salaries for last month (the director pays cash) */
    const wd = workdays(i), accThis = {};
    for (const e of empl) {
      let z1 = between(10, 13), z2 = between(10, wd - 13);
      if (e.nume === "Maria Rusu" && i === 8) { z1 = 5; z2 = 0; } /* holiday in July */
      if (e.nume === "Dumitru Sava" && i === 4) { z1 = 0; z2 = 11; } /* hired mid-March */
      await add("pontaj", { luna: ym(i), angajat: e.nume, z1, z2 }, MARIA);
      const salAt = e.sal.filter(s => s[0] <= ym(i) + "-31").sort((a, b) => b[0] < a[0] ? -1 : 1)[0] || e.sal[0];
      const acc = r2((z1 + z2) * salAt[1] / wd);
      L.salaryAccrued[ym(i)] = r2((L.salaryAccrued[ym(i)] || 0) + acc);
      owed[e.nume] = r2((owed[e.nume] || 0) + acc); accThis[e.nume] = acc;
    }
    if (i > 0) {
      const tight = i === 1 || i === 5; /* December and April: cash is short, 70 % now, the rest next month */
      for (const e of EMPLOYEES) {
        /* what is owed for the months before this one (this month is paid next month) */
        const prevAcc = r2((owed[e.nume] || 0) - (accThis[e.nume] || 0)); if (prevAcc <= 0) continue;
        let pay = Math.round(prevAcc / 100) * 100; if (tight) pay = Math.round(prevAcc * 0.7 / 100) * 100;
        const lastMonth = ym(i - 1);
        if (pay <= 0) continue;
        const d = day(i, between(5, 10));
        if (L.till.MDL >= pay + 15000) { await add("iesiri", { data: d, destinatie: "Salarii", valuta: "MDL", curs: 1, suma: pay, persoana: e.nume, luna: lastMonth, nota: "Salariu " + lastMonth + (tight ? ", parțial" : "") }, DIR); L.till.MDL = r2(L.till.MDL - pay); }
        else { const rt = EUR[i], eur = Math.round(pay / rt / 10) * 10; if (L.till.EUR < eur) continue; await add("iesiri", { data: d, destinatie: "Salarii", valuta: "EUR", curs: rt, suma: eur, persoana: e.nume, luna: lastMonth, nota: "Salariu " + lastMonth + " în euro" }, DIR); L.till.EUR = r2(L.till.EUR - eur); pay = r2(eur * rt); }
        L.salaryPaid[lastMonth] = r2((L.salaryPaid[lastMonth] || 0) + pay);
        owed[e.nume] = r2(owed[e.nume] - pay);
      }
    }

    /* rent: workers' flat in EUR cash (deposit the first month, a broken window in June), warehouse by transfer */
    { const com = between(40, 90), avarii = i === 7 ? 120 : 0, gaj = i === 0 ? 350 : 0, tot = 350 + gaj + com + avarii;
      if (L.till.EUR >= tot) { await add("chirii", { dataInceput: day(i, 1), dataSfarsit: day(i, dim(i)), locatia: "Apartament muncitori, Ciocana", chirias: "Vasile Lungu", valuta: "EUR", curs: EUR[i], chirie: 350, gaj, comunale: com, avarii, mod: "Numerar", nota: avarii ? "Geam spart, reținut din gaj" : "" }, MARIA); L.till.EUR = r2(L.till.EUR - tot); } }
    if (i >= 2) { await add("chirii", { dataInceput: day(i, 1), dataSfarsit: day(i, dim(i)), locatia: "Depozit Stăuceni", chirias: "", valuta: "MDL", curs: 1, chirie: 6000, gaj: 0, comunale: 0, avarii: 0, mod: "Transfer", nota: "Depozit materiale" }, MARIA); L.bank = r2(L.bank - 6000); }

    /* bank deposits when the till is full; the RON from the Botanica client goes straight to the bank */
    if (L.till.MDL > 180000) { const dep = Math.floor((L.till.MDL - 120000) / 10000) * 10000; await add("iesiri", { data: day(i, between(20, 27)), destinatie: "Depus pe cont", valuta: "MDL", curs: 1, suma: dep, persoana: "", luna: "", nota: "Depunere " + pick(["MAIB", "Victoriabank", "moldindconbank"]) }, DIR); L.till.MDL = r2(L.till.MDL - dep); L.bank = r2(L.bank + dep); }
    if (i === 9 && L.till.RON > 0) { const v = L.till.RON; await add("iesiri", { data: day(i, 12), destinatie: "Depus pe cont", valuta: "RON", curs: RON, suma: v, persoana: "", luna: "", nota: "Depunere lei românești, schimb la bancă" }, DIR); L.till.RON = 0; L.bank = r2(L.bank + v * RON); }

    /* other outflows */
    if (i === 2) { await add("iesiri", { data: day(i, 14), destinatie: "Alte", valuta: "MDL", curs: 1, suma: 1200, persoana: "", luna: "", nota: "Notar, procură" }, DIR); L.till.MDL -= 1200; }
    if (i === 5) { await add("iesiri", { data: day(i, 9), destinatie: "Alte", valuta: "MDL", curs: 1, suma: 2000, persoana: "", luna: "", nota: "Donație biserica Cricova" }, DIR); L.till.MDL -= 2000; }

    /* loans, each with its cash outflow (the app's checkbox) */
    const loanDefs = [[3, "Vasile Lungu", 6000, "2026-05-01", "Nevoi personale"], [9, "Maria Rusu", 4000, "2026-10-20", ""], [11, "Dumitru Sava", 2500, "2026-12-15", "Reparație mașină"]];
    for (const [m, who, suma, termen, nota] of loanDefs.filter(x => x[0] === i)) {
      const d = day(i, between(10, 20));
      const rec = await add("imprumuturi", { data: d, persoana: who, suma, termen, status: "Neachitat", nota }, DIR);
      await add("iesiri", { data: d, destinatie: "Împrumut", valuta: "MDL", curs: 1, suma, persoana: who, nota: "Împrumut — " + who }, DIR);
      L.till.MDL = r2(L.till.MDL - suma); loans.push({ id: rec.id, who, suma, m });
    }
    /* Vasile repays in May: status Achitat, and the cash comes back as a separate income (the app's documented way) */
    if (i === 6) { const l = loans.find(x => x.who === "Vasile Lungu"); await edit("imprumuturi", l.id, { status: "Achitat" }, DIR);
      await add("incasari", { data: day(i, 20), client: "Vasile Lungu", proiect: "", descriere: "Restituire împrumut", valuta: "MDL", curs: 1, suma: 6000, mod: "Numerar" }, DIR); L.till.MDL = r2(L.till.MDL + 6000); L.incomeMDL = r2(L.incomeMDL + 6000); }

    /* Andrei leaves at the end of August: user deactivated, employee inactive; his advance stays unreported */
    if (i === 9) { const u = USERS.find(x => x.nume === "Andrei Cebotari"); await edit("utilizatori", WHO[u.nume].id, { status: "Inactiv" }, DIR);
      const e = EMPLOYEES.find(x => x.nume === u.nume); await edit("angajati", e.id, { status: "Inactiv" }, DIR); }
    /* finished projects are closed */
    for (const p of PROJECTS) if (p.to === i && p.status !== "Activ") await edit("proiecte", p.id, { status: p.status }, DIR);
    process.stdout.write(" " + ym(i));
  }

  /* 5. corrections that leave traces in the history: a wrong amount fixed, a duplicate removed, a worker fixes his own text */
  const ch = (await api("/api/collections/cheltuieli/records?perPage=3&sort=-data&filter=" + encodeURIComponent('platitDe="Ion Popescu" && mod="Numerar"'), null, DIR.token)).items;
  if (ch[0]) { const r = ch[0], nv = r.suma + 150; await edit("cheltuieli", r.id, { suma: nv }, DIR); person("Ion Popescu").cheltuit = r2(person("Ion Popescu").cheltuit + 150); L.expenseMDL = r2(L.expenseMDL + 150); }
  if (ch[1]) { const r = ch[1]; await edit("cheltuieli", r.id, { descriere: r.descriere + " (bon nr. " + between(1000, 9999) + ")" }, WHO["Ion Popescu"]); }
  if (ch[2]) { const r = ch[2]; const before = { ...r }; delete before.collectionId; delete before.collectionName;
    await del("cheltuieli", r.id, before, DIR); person("Ion Popescu").cheltuit = r2(person("Ion Popescu").cheltuit - r.suma); if (r.sursa === "Proprii") person("Ion Popescu").proprii = r2(person("Ion Popescu").proprii - r.suma); L.expenseMDL = r2(L.expenseMDL - r.suma); }

  /* expected totals for the dashboard */
  const ex = { till: L.till, bank: L.bank, incomeMDL: L.incomeMDL, expenseMDL: L.expenseMDL, salaryAccrued: L.salaryAccrued, salaryPaid: L.salaryPaid, contracts: L.contracts,
    persons: Object.fromEntries(Object.entries(L.person).map(([k, v]) => [k, { ...v, ramas: r2(v.primit - v.cheltuit) }])) };
  fs.writeFileSync("/root/casieria-seed-expected.json", JSON.stringify(ex, null, 1));
  console.log("\nseeded " + count + " records (+ journal). Expected ledger saved to /root/casieria-seed-expected.json");
  console.log("till:", JSON.stringify(L.till), "bank:", L.bank);
  for (const [k, v] of Object.entries(ex.persons)) console.log("  " + k.padEnd(18) + " primit " + v.primit + "  cheltuit " + v.cheltuit + "  proprii " + v.proprii + "  rămas " + v.ramas);
})().catch(e => { console.error("\nSEED FAILED:", e.message); process.exit(1); });
