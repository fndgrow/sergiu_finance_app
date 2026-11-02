/* Seed one year of plausible history for a small construction firm (test data only).
   Writes through the API as the given director (same records + journal entries the app would create).
   Usage: node tests/seed-year.js http://127.0.0.1:18090 770011 Parola2026 */
const [,, BASE, COD, PAROLA] = process.argv;
if (!BASE || !COD || !PAROLA) { console.log("usage: node tests/seed-year.js <base url> <director code> <password>"); process.exit(1); }
let seed = 20261102; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const pick = (a) => a[Math.floor(rnd() * a.length)];
const between = (a, b) => Math.round(a + rnd() * (b - a));
const p2 = (x) => (x < 10 ? "0" : "") + x;
const ym = (y, m) => y + "-" + p2(m);
const day = (y, m, d) => ym(y, m) + "-" + p2(d);
const dim = (y, m) => new Date(y, m, 0).getDate();
const workdays = (y, m) => { let c = 0; for (let i = 1; i <= dim(y, m); i++) if (new Date(y, m - 1, i).getDay() !== 0) c++; return c; };

let TOKEN = "", NUME = "";
async function api(path, body, method) {
  const res = await fetch(BASE + path, { method: method || (body ? "POST" : "GET"), headers: { "Content-Type": "application/json", ...(TOKEN ? { Authorization: TOKEN } : {}) }, body: body ? JSON.stringify(body) : undefined });
  const j = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(path + " -> " + res.status + " " + JSON.stringify(j).slice(0, 200));
  return j;
}
let count = 0;
async function add(col, data, label) {
  const rec = await api("/api/collections/" + col + "/records", data);
  const copy = { ...data, id: rec.id };
  await api("/api/collections/jurnal/records", { act: "add", col, ref: rec.id, nume: NUME, data: copy });
  count++; if (count % 25 === 0) process.stdout.write(".");
  return rec;
}

const EUR = 20.22, USD = 17.5;
const people = ["Ion Popescu", "Maria Rusu", "Vasile Lungu"];
const cashier = "Enachi Grigore";
const months = []; { let y = 2025, m = 11; for (let i = 0; i < 12; i++) { months.push([y, m]); m++; if (m > 12) { m = 1; y++; } } } /* Nov 2025 .. Oct 2026 */
const projects = [
  { nume: "Vila Codru", client: "Andrei Ceban", from: 0, to: 6, contract: 1850000, cash: 900000, resp: ["Ion Popescu"] },
  { nume: "Hală Bubuieci", client: "SRL Agrotrans", from: 2, to: 10, contract: 2600000, cash: 600000, resp: ["Maria Rusu", "Vasile Lungu"] },
  { nume: "Reparație acoperiș Botanica", client: "Elena Moraru", from: 7, to: 9, contract: 380000, cash: 380000, resp: ["Ion Popescu"] },
  { nume: "Fundație Cricova", client: "SRL Agrotrans", from: 9, to: 12, contract: 920000, cash: 300000, resp: ["Vasile Lungu"] }
];
const expenses = {
  Materiale: ["Ciment M400, 40 saci", "Nisip 6 m³", "Armatură Ø12", "Cărămidă 2 paleți", "Bloc Fortan 300 buc", "Plăci OSB", "Vopsea fațadă", "Țiglă metalică", "Gresie baie", "Ipsos, glet", "Cabluri, prize", "Țevi PPR"],
  Transport: ["Camion nisip", "Transport cărămidă", "Taxi șantier", "Închiriere remorcă", "Transport muncitori"],
  Combustibil: ["Motorină Duster", "Benzină generator", "Motorină betonieră", "Motorină Sprinter"],
  Unelte: ["Discuri flex", "Burghie SDS", "Mistrii, nivele", "Cofraj metalic", "Schelă, chirie"],
  Birou: ["Hârtie, toner", "Abonament internet", "Papetărie", "Ștampilă"],
  Taxe: ["Taxă autorizație", "Taxă locală", "Amendă parcare", "Taxă Cadastru"],
  Reparații: ["Reparație betonieră", "Service Duster", "Reparație flex", "Anvelope"],
  Diverse: ["Apă, pâine echipă", "Mănuși, măști", "Prânz echipă", "Detergent"]
};
const cats = Object.keys(expenses);
let till = 0; /* MDL cash on hand, so the story never deposits or pays out money the till does not have */

(async () => {
  const lg = await api("/api/ehl/login", { cod: COD, parola: PAROLA });
  if (!lg.token) throw new Error("login did not return a token: " + JSON.stringify(lg));
  TOKEN = lg.token; NUME = lg.record.nume;
  console.log("seeding as " + NUME);

  /* projects and contracts */
  for (const p of projects) {
    const [y, m] = months[Math.min(p.from, 11)];
    await add("proiecte", { nume: p.nume, client: p.client, responsabili: p.resp.join(", "), buget: Math.round(p.contract * 0.72), dataInceput: day(y, m, 3), termen: p.to >= 12 ? "2027-02-28" : day(months[Math.min(p.to, 11)][0], months[Math.min(p.to, 11)][1], 28), status: p.to < 11 ? "Finalizat" : "Activ", nota: "" });
    await add("contracte", { client: p.client, sumaContract: p.contract, deIncasatCash: p.cash, nota: "Contract " + p.nume });
  }
  /* one old rent + the loans */
  await add("imprumuturi", { data: day(2026, 2, 14), persoana: "Vasile Lungu", suma: 6000, termen: day(2026, 5, 1), status: "Achitat", nota: "Avans personal" });
  await add("imprumuturi", { data: day(2026, 8, 20), persoana: "Maria Rusu", suma: 4000, termen: day(2026, 10, 20), status: "Neachitat", nota: "" });

  for (let i = 0; i < 12; i++) {
    const [y, m] = months[i];
    const active = projects.filter(p => i >= p.from && i <= p.to);
    /* incomes: each active project pays 1-2 instalments, part cash, part transfer, sometimes in EUR */
    for (const p of active) {
      const n = i === p.from ? 2 : (rnd() < 0.7 ? 1 : 2);
      for (let k = 0; k < n; k++) {
        const eur = rnd() < 0.3;
        const mdl = between(60000, 220000);
        const cash = rnd() < 0.6;
        await add("incasari", eur
          ? { data: day(y, m, between(2, 26)), client: p.client, proiect: p.nume, descriere: "Tranșa " + (k + 1), valuta: "EUR", curs: EUR, suma: Math.round(mdl / EUR / 100) * 100, mod: cash ? "Numerar" : "Transfer" }
          : { data: day(y, m, between(2, 26)), client: p.client, proiect: p.nume, descriere: "Tranșa " + (k + 1), valuta: "MDL", curs: 1, suma: Math.round(mdl / 1000) * 1000, mod: cash ? "Numerar" : "Transfer" });
        if (!eur && cash) till += Math.round(mdl / 1000) * 1000;
      }
    }
    /* advances to the people on site, then their expenses (mostly from the advance, now and then from their own pocket) */
    for (const who of people) {
      if (rnd() < 0.85 && till > 60000) { const adv = between(8, 30) * 1000; till -= adv; await add("iesiri", { data: day(y, m, between(1, 8)), destinatie: "Dat persoanei", valuta: "MDL", curs: 1, suma: adv, persoana: who, luna: "", nota: "Avans cheltuieli șantier" }); }
      const nExp = between(3, 6);
      for (let k = 0; k < nExp; k++) {
        const cat = pick(cats), pr = active.length ? pick(active) : null;
        const suma = cat === "Materiale" ? between(1500, 14000) : cat === "Taxe" ? between(300, 2500) : between(150, 3000);
        await add("cheltuieli", { data: day(y, m, between(1, dim(y, m))), suma, categorie: cat, descriere: pick(expenses[cat]), client: pr ? pr.client : "", proiect: pr ? pr.nume : "", platitDe: who, mod: "Numerar", sursa: rnd() < 0.12 ? "Proprii" : "Avans" });
      }
    }
    /* the cashier pays some bills from the till and by transfer */
    { const f = between(2000, 9000); till -= f; await add("cheltuieli", { data: day(y, m, between(3, 12)), suma: f, categorie: "Combustibil", descriere: pick(expenses.Combustibil), client: "", proiect: "", platitDe: cashier, mod: "Numerar", sursa: "Avans" }); }
    await add("cheltuieli", { data: day(y, m, between(5, 20)), suma: between(1500, 12000), categorie: pick(["Taxe", "Birou", "Unelte"]), descriere: "Factură lunară", client: "", proiect: "", platitDe: cashier, mod: "Transfer", sursa: "" });
    /* salaries for last month, timesheets for this month */
    for (const who of people.concat([cashier])) {
      const wd = workdays(y, m), z1 = between(9, 13), z2 = between(10, wd - 13);
      await add("pontaj", { luna: ym(y, m), angajat: who, z1, z2 });
      { const sal = who === cashier ? 18000 : between(9, 15) * 1000; till -= sal; await add("iesiri", { data: day(y, m, between(5, 10)), destinatie: "Salarii", valuta: "MDL", curs: 1, suma: sal, persoana: who, luna: ym(i === 0 ? y : months[i - 1][0], i === 0 ? m : months[i - 1][1]), nota: "Salariu" }); }
    }
    /* rent for the workers' flat, a bank deposit, now and then a USD exchange */
    await add("chirii", { dataInceput: day(y, m, 1), dataSfarsit: day(y, m, dim(y, m)), locatia: "Apartament muncitori, Ciocana", chirias: "Vasile Lungu", valuta: "EUR", curs: EUR, chirie: 350, gaj: i === 0 ? 350 : 0, comunale: between(40, 90), avarii: 0, mod: "Numerar", nota: "" });
    if (till > 150000) { const dep = Math.min(between(40, 120) * 1000, Math.floor((till - 100000) / 1000) * 1000); if (dep > 0) { till -= dep; await add("iesiri", { data: day(y, m, between(20, 27)), destinatie: "Depus pe cont", valuta: "MDL", curs: 1, suma: dep, persoana: "", luna: "", nota: "Depunere " + pick(["MAIB", "Victoriabank"]) }); } }
    if (rnd() < 0.3) await add("iesiri", { data: day(y, m, between(10, 20)), destinatie: "Alte", valuta: "MDL", curs: 1, suma: between(300, 2500), persoana: "", luna: "", nota: pick(["Notar", "Curier", "Donație", "Taxă bancară"]) });
    process.stdout.write(" " + ym(y, m));
  }
  console.log("\nseeded " + count + " records (+ journal entries)");
})().catch(e => { console.error("\nSEED FAILED:", e.message); process.exit(1); });
