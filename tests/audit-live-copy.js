/* End-to-end audit of the accounts between directors and collaborators, against a throwaway copy of the live database
   (real PocketBase, real hooks and rules, real app.js + SDK in jsdom). Nothing here touches the live service.
   Usage: node audit.js <repo> <users.json> <baseUrl>                                                                */
const fs = require("fs"), path = require("path");
const { JSDOM } = require("jsdom");
const [REPO, USERS, BASE] = process.argv.slice(2);
const users = JSON.parse(fs.readFileSync(USERS, "utf8")).filter(u => u.status !== "Inactiv");
const COLS = ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "angajati", "istoric", "pontaj", "grafic", "imprumuturi", "schimburi", "proiecte", "utilizatori", "jurnal", "config"];
let fails = 0, oks = 0, notes = [];
const ok = (c, m) => { if (c) { oks++; console.log("  ok   " + m); } else { fails++; console.log("  FAIL " + m); } };
const note = (m) => { notes.push(m); console.log("  NOTE " + m); };
const r2 = (v) => Math.round((Number(v) || 0) * 100) / 100;
const n = (v) => Number(v) || 0;
const same = (a, b) => String(a || "").trim() === String(b || "").trim();
const today = () => new Date().toISOString().slice(0, 10), curMonth = () => today().slice(0, 7);
const parseMoney = (s) => { const m = String(s).match(/-?[\d.]+,\d{2}/); return m ? Number(m[0].replace(/\./g, "").replace(",", ".")) : NaN; };
const near = (a, b, eps = 0.02) => Math.abs(a - b) <= eps;

/* ---------- REST ---------- */
async function api(method, url, token, body) {
  const r = await fetch(BASE + url, { method, headers: Object.assign({ "Content-Type": "application/json" }, token ? { Authorization: token } : {}), body: body ? JSON.stringify(body) : undefined });
  let j = null; try { j = await r.json(); } catch (e) {}
  return { status: r.status, body: j };
}
/* sign-in as the app does: the code names the account (a user's own code, or a director's EHL code for Casa EHL), then
   that account's authenticator code. The copy exposes each account's secret (users.json), so the codes are computed here;
   an account without an authenticator yet is enrolled on the copy by the audit itself (setup + confirm), as a first
   sign-in would. Waits out a 429 (every request of the audit comes from one IP). */
const crypto = require("crypto");
const b32dec = (s) => { let bits = 0, val = 0; const out = []; for (const ch of String(s).toUpperCase().replace(/[^A-Z2-7]/g, "")) { val = (val << 5) | "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".indexOf(ch); bits += 5; if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; val &= (1 << bits) - 1; } } return Buffer.from(out); };
const totpNow = (secret, shift) => { const step = Math.floor(Date.now() / 30000) + (shift || 0); const b = Buffer.alloc(8); b.writeUInt32BE(0, 0); b.writeUInt32BE(step >>> 0, 4); const h = crypto.createHmac("sha1", b32dec(secret)).update(b).digest(); const o = h[19] & 15; return String((h.readUInt32BE(o) & 0x7fffffff) % 1e6).padStart(6, "0"); };
const usedStep = {};
const accountOf = (codOrUser, ehl) => { /* which user and which of his accounts (own / Casa EHL) a code means */
  const u = typeof codOrUser === "object" ? codOrUser : users.find(x => x.cod === codOrUser || (x.rol === "Director" && x.codEHL === codOrUser));
  if (!u) throw new Error("no such user: " + codOrUser);
  const K = u.rol === "Director" && (ehl || (typeof codOrUser === "string" && codOrUser !== u.cod && codOrUser === u.codEHL)) ? "EHL" : "";
  return { u, K, cod: K ? u.codEHL : u.cod };
};
const nextCode = async (u, K) => { /* a fresh code for the account: never a step already used (the server refuses a replay),
  never more than one step ahead (the server accepts ±1): a third sign-in inside the same 30 s waits for the next step */
  let now = Math.floor(Date.now() / 30000);
  while ((usedStep[u.id + K] || 0) >= now + 1) { await new Promise(z => setTimeout(z, (now + 1) * 30000 - Date.now() + 200)); now = Math.floor(Date.now() / 30000); }
  const shift = (usedStep[u.id + K] || 0) >= now ? 1 : 0;
  usedStep[u.id + K] = now + shift; return totpNow(u["totpSecret" + K], shift);
};
async function enrol(u, K, token) { /* copy only: the account's first sign-in sets its authenticator up */
  const st = await api("POST", "/api/ehl/2fa/setup", token, { ehl: !!K });
  if (st.status !== 200 || !st.body.secret) throw new Error("2fa setup failed " + st.status + " " + JSON.stringify(st.body));
  u["totpSecret" + K] = st.body.secret; u["twoFA" + K] = false;
  const cf = await api("POST", "/api/ehl/2fa/confirm", token, { totp: await nextCode(u, K), ehl: !!K });
  if (cf.status !== 200) throw new Error("2fa confirm failed " + cf.status + " " + JSON.stringify(cf.body));
  u["twoFA" + K] = true; note((K ? "Casa EHL of " : "") + u.nume + ": authenticator enrolled on the copy (" + (cf.body.recuperare || []).length + " recovery codes)");
}
async function login(codOrUser, ehl) {
  const { u, K, cod } = accountOf(codOrUser, ehl);
  for (let i = 0; ; i++) {
    const body = { cod };
    if (u["twoFA" + K] && u["totpSecret" + K]) body.totp = await nextCode(u, K);
    const r = await api("POST", "/api/ehl/login", null, body);
    if (r.status === 200 && r.body.token && !r.body.needSetup) return r.body;
    if (r.status === 200 && r.body.needSetup && r.body.token) { await enrol(u, K, r.body.token); continue; }
    if (r.status === 200) throw new Error("login needs more: " + JSON.stringify(r.body));
    if (r.status === 429 && i < 24) { await new Promise(z => setTimeout(z, 5000)); continue; }
    throw new Error("login failed " + r.status + " " + JSON.stringify(r.body));
  }
}
async function dump(token) {
  const out = {};
  for (const col of COLS) {
    out[col] = []; let page = 1;
    for (;;) { const r = await api("GET", "/api/collections/" + col + "/records?perPage=500&page=" + page, token); if (r.status !== 200) { out[col] = null; break; } out[col].push(...r.body.items); if (page >= r.body.totalPages) break; page++; }
  }
  return out;
}

/* ---------- independent figures (the README formulas, written again here, not taken from app.js) ---------- */
function rates(D) { const o = { MDL: 1 }; ((D.config[0] || {}).valute || []).forEach(v => { o[v.cod] = n(v.curs) || 1; }); return o; }
function person(D, p) {
  const R = rates(D), dinAvans = (r) => r.sursa === "Avans" && String(r.platitDe || "").trim();
  const primit = D.iesiri.filter(r => r.destinatie === "Dat persoanei" && same(r.persoana, p)).reduce((a, r) => a + n(r.suma) * n(r.curs), 0);
  const chn = D.cheltuieli.filter(r => r.mod !== "Transfer" && same(r.platitDe, p)).reduce((a, r) => a + n(r.suma), 0);
  const dat = D.iesiri.filter(r => dinAvans(r) && same(r.platitDe, p)).reduce((a, r) => a + n(r.suma) * n(r.curs), 0);
  const chr = D.chirii.filter(r => dinAvans(r) && r.mod !== "Transfer" && same(r.platitDe, p)).reduce((a, r) => a + (n(r.chirie) + n(r.gaj) + n(r.comunale) + n(r.avarii)) * n(r.curs), 0);
  const sch = D.schimburi.filter(r => same(r.persoana, p)).reduce((a, r) => a + n(r.sumaIn) * (R[r.valutaIn] || 1) - n(r.sumaDin) * (R[r.valutaDin] || 1), 0);
  const val = {};
  Object.keys(R).forEach(v => {
    const got = D.iesiri.filter(r => r.destinatie === "Dat persoanei" && same(r.persoana, p) && (r.valuta || "MDL") === v).reduce((a, r) => a + n(r.suma), 0);
    const gave = D.iesiri.filter(r => dinAvans(r) && same(r.platitDe, p) && (r.valuta || "MDL") === v).reduce((a, r) => a + n(r.suma), 0);
    const rent = D.chirii.filter(r => dinAvans(r) && r.mod !== "Transfer" && same(r.platitDe, p) && (r.valuta || "MDL") === v).reduce((a, r) => a + n(r.chirie) + n(r.gaj) + n(r.comunale) + n(r.avarii), 0);
    const xin = D.schimburi.filter(r => same(r.persoana, p) && r.valutaIn === v).reduce((a, r) => a + n(r.sumaIn), 0), xout = D.schimburi.filter(r => same(r.persoana, p) && r.valutaDin === v).reduce((a, r) => a + n(r.sumaDin), 0);
    val[v] = r2(got - gave - rent + xin - xout - (v === "MDL" ? chn : 0));
  });
  return { primit: r2(primit), chn: r2(chn), dat: r2(dat), chr: r2(chr), sch: r2(sch), ramas: r2(primit - chn - dat - chr + sch), serverBal: r2(primit - chn - dat - chr), val };
}
function salaryPaid(D, emp, luna) {
  return r2(D.cheltuieli.filter(r => r.categorie === "Salarii" && r.luna === luna && same(r.angajat, emp)).reduce((a, r) => a + n(r.suma), 0)
    + D.iesiri.filter(r => r.destinatie === "Salarii" && r.luna === luna && same(r.persoana, emp)).reduce((a, r) => a + n(r.suma) * n(r.curs), 0));
}

/* ---------- the real app in jsdom, signed in with a code ---------- */
const SDK = fs.readFileSync(path.join(REPO, "vendor/pocketbase.umd.js"), "utf8"), APPJS = fs.readFileSync(path.join(REPO, "app.js"), "utf8");
async function openApp(cod, ehl) { /* cod may also be a user object; ehl = the director's Casa EHL account */
  const { u, K, cod: pin } = accountOf(cod, ehl);
  const html = fs.readFileSync(path.join(REPO, "index.html"), "utf8").replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "").replace(/<link[^>]*>/g, "");
  const dom = new JSDOM(html, { url: "https://casieria.test/", runScripts: "outside-only", pretendToBeVisual: true });
  const w = dom.window, errs = [];
  w.addEventListener("error", e => errs.push(String(e.error && e.error.stack || e.message)));
  w.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
  w.scrollTo = () => {};
  Object.defineProperty(w.navigator, "serviceWorker", { value: undefined });
  w.fetch = (u, o) => { u = String(u); if (!u.startsWith(BASE)) return Promise.resolve(new Response("", { status: 404 })); o = Object.assign({}, o); delete o.signal; return fetch(u, o); };
  w.PB_URL = BASE;
  w.eval(SDK); w.eval(APPJS);
  const tick = (ms) => new Promise(r => setTimeout(r, ms));
  await tick(400);
  const $ = (s) => w.document.querySelector(s);
  const fire = (el, ev) => el.dispatchEvent(new w.Event(ev, { bubbles: true, cancelable: true }));
  const code = async () => (u["twoFA" + K] && u["totpSecret" + K]) ? await nextCode(u, K) : "";
  $("#pinv").value = pin; fire($("#pinf"), "submit");
  for (let i = 0; i < 30 && !$("#totpf") && !$("[data-secret]") && $("#pinf"); i++) await tick(200);
  if ($("#totpf")) { $("#totpf").elements["totp"].value = await code(); fire($("#totpf"), "submit"); }
  for (let i = 0; i < 30 && ($("#totpf") || $("#pinf")) && !$("[data-secret]"); i++) await tick(200);
  if ($("[data-secret]")) { /* first sign-in of this account on the copy: the setup screen, as a person would see it */
    u["totpSecret" + K] = $("[data-secret]").getAttribute("data-secret"); u["twoFA" + K] = false;
    $("#suconf").elements["totp"].value = await nextCode(u, K); fire($("#suconf"), "submit");
    for (let i = 0; i < 30 && !$("#sudone"); i++) await tick(200);
    u["twoFA" + K] = true; note((K ? "Casa EHL of " : "") + u.nume + ": authenticator enrolled through the app's setup screen (" + w.document.querySelectorAll(".codes code").length + " recovery codes shown)");
    $("#sudone") && $("#sudone").dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  }
  for (let i = 0; i < 60 && ($("#pinf") || $("#fullf") || $("#totpf")); i++) await tick(200);
  await tick(2500);
  const click = (el) => el && el.dispatchEvent(new w.MouseEvent("click", { bubbles: true }));
  return { w, $, tick, click, errs, close: () => w.close() };
}
async function readPanou(A) {
  A.click(A.$('[data-view="panou"]')); await A.tick(600);
  const big = A.$(".tile.big"), out = { label: "", value: NaN, cur: {}, rows: [], emp: {} };
  if (big) {
    out.label = (big.querySelector(".k") || {}).textContent || ""; out.value = parseMoney((big.querySelector(".v") || {}).textContent);
    if (/datorează/i.test(out.label)) out.value = -out.value;
    big.querySelectorAll(".t-cur").forEach(c => { const m = c.textContent.match(/(-?[\d.]+,\d{2}) (MDL|EUR|USD)/); if (m) out.cur[m[2]] = parseMoney(m[1]); });
  }
  A.w.document.querySelectorAll(".sec").forEach(s => { const h = s.querySelector("h2"); if (h && /Bani primiți/.test(h.textContent)) s.querySelectorAll(".row").forEach(r => out.rows.push(r.textContent.replace(/\s+/g, " ").trim())); });
  const fold = A.$('[data-fold="ang"]'); if (fold && fold.getAttribute("aria-expanded") !== "true") { A.click(fold); await A.tick(500); }
  A.w.document.querySelectorAll(".sec-late .user-row").forEach(r => { const l = r.querySelector(".l"); if (!l) return; const name = l.childNodes[0].textContent.trim(); const m = l.textContent.match(/Plătit ([\d.]+,\d{2})/); out.emp[name] = m ? parseMoney(m[1]) : null; });
  return out;
}
async function readEHL(A) {
  A.click(A.$('[data-view="ehl"]')); await A.tick(800);
  const out = { people: {}, casa: {} };
  A.w.document.querySelectorAll("[data-colab]").forEach(b => { const v = parseMoney((b.querySelector(".r") || {}).textContent); if (!(b.getAttribute("data-colab") in out.people)) out.people[b.getAttribute("data-colab")] = v; });
  A.w.document.querySelectorAll(".tile").forEach(t => { if (/Casa EHL/.test((t.querySelector(".k") || {}).textContent || "")) t.querySelectorAll(".t-cur").forEach(c => { const m = c.textContent.match(/(-?[\d.]+,\d{2}) (MDL|EUR|USD)/); if (m) out.casa[m[2]] = parseMoney(m[1]); }); });
  return out;
}

/* ---------- checks ---------- */
function invariants(D) {
  const byId = {}; D.utilizatori.forEach(u => { byId[u.id] = u; });
  const author = (r) => byId[r.by] || {};
  const names = new Set(D.utilizatori.map(u => u.nume.trim())), emps = new Set(D.angajati.map(a => a.nume.trim()));
  let bad = D.iesiri.filter(r => r.sursa === "Avans" && !same(r.platitDe, author(r).nume));
  ok(!bad.length, "every outflow from a person's own account names its author as payer (" + D.iesiri.filter(r => r.sursa === "Avans").length + " rows)" + (bad.length ? ": " + bad.map(r => r.id).join(",") : ""));
  bad = D.iesiri.filter(r => r.sursa === "Casa" && author(r).rol !== "Director");
  ok(!bad.length, "every outflow from Casa EHL was made by a director (" + D.iesiri.filter(r => r.sursa === "Casa").length + " rows)");
  bad = D.iesiri.filter(r => r.sursa === "Casa" && !["Depus pe cont", "Restituire fondator", "Dat persoanei"].includes(r.destinatie) || (r.sursa === "Casa" && r.destinatie === "Dat persoanei" && !D.utilizatori.some(u => u.rol === "Director" && same(u.nume, r.persoana))));
  ok(!bad.length, "Casa EHL money went only to administrators, the bank or back to a founder");
  bad = D.cheltuieli.filter(r => r.mod !== "Transfer" && !same(r.platitDe, author(r).nume));
  ok(!bad.length, "every cash expense (salaries included) is paid by the account that recorded it (" + D.cheltuieli.length + " rows)" + (bad.length ? ": " + bad.map(r => r.descriere + " by " + author(r).nume + " payer " + r.platitDe).join("; ") : ""));
  bad = D.chirii.filter(r => r.sursa === "Avans" && !same(r.platitDe, author(r).nume));
  ok(!bad.length, "every rent from a person's own account names its author as payer");
  bad = D.iesiri.filter(r => r.destinatie === "Dat persoanei" && !names.has(String(r.persoana || "").trim()));
  ok(!bad.length, "every sum handed to a person goes to an existing user" + (bad.length ? ": " + bad.map(r => r.persoana).join(", ") : ""));
  bad = D.grafic.filter(r => n(r.ore) > 0 && !emps.has(String(r.angajat).trim())).concat(D.istoric.filter(r => !emps.has(String(r.angajat).trim())));
  ok(!bad.length, "every schedule day and salary row belongs to an existing employee");
  const start = {}; D.angajati.forEach(a => { start[a.nume.trim()] = a.dataInceput; });
  bad = D.grafic.filter(r => n(r.ore) > 0 && start[String(r.angajat).trim()] && r.data < start[String(r.angajat).trim()]);
  ok(!bad.length, "no schedule day before the employee's start date");
  bad = D.angajati.filter(a => D.istoric.some(h => same(h.angajat, a.nume)) && !D.istoric.some(h => same(h.angajat, a.nume) && h.dinData <= (a.dataInceput || "9999")));
  ok(!bad.length, "every employee's first salary counts from his start date or earlier" + (bad.length ? ": " + bad.map(a => a.nume).join(", ") : ""));
}
function visibility(D, V, u) {
  const me = u, exp = {
    incasari: () => false, contracte: () => false, imprumuturi: () => false, jurnal: () => false,
    cheltuieli: (r) => r.by === me.id || same(r.platitDe, me.nume) || r.categorie === "Salarii",
    iesiri: (r) => r.by === me.id || same(r.persoana, me.nume),
    chirii: (r) => r.by === me.id, pontaj: (r) => r.by === me.id, schimburi: (r) => r.by === me.id,
    utilizatori: (r) => r.id === me.id
  };
  for (const col of COLS) {
    if (V[col] === null) { ok(["jurnal"].includes(col), me.nume + ": " + col + " refused as a whole"); continue; }
    const want = new Set(D[col].filter(exp[col] || (() => true)).map(r => r.id)), got = new Set(V[col].map(r => r.id));
    const extra = [...got].filter(i => !want.has(i)), missing = [...want].filter(i => !got.has(i));
    ok(!extra.length && !missing.length, me.nume + " reads " + col + ": " + got.size + " of " + D[col].length + (extra.length ? ", " + extra.length + " he should NOT see" : "") + (missing.length ? ", " + missing.length + " he should see but does not" : ""));
  }
}
async function uiCheck(D, u, cod, label) {
  const A = await openApp(cod);
  ok(!A.$("#pinf"), label + ": signs in with the code");
  const P = await readPanou(A), want = person(D, u.nume);
  if (!isNaN(P.value) || want.ramas) ok(near(P.value, want.ramas), label + ": \"Soldul meu\" shows " + P.value + " — independent " + want.ramas); else ok(true, label + ": no money yet, no balance tile");
  Object.keys(want.val).forEach(v => { if (v in P.cur) ok(near(P.cur[v], want.val[v]), label + ": balance in " + v + " shows " + P.cur[v] + " — independent " + want.val[v]); else if (want.val[v]) ok(false, label + ": no line for " + v + " though he holds " + want.val[v]); });
  if (u.rol !== "Director" && P.rows.length) ok(P.rows.every(t => / · de la /.test(t)), label + ": each sum received names its sender (" + P.rows.length + " rows)");
  Object.keys(P.emp).forEach(e => { const w = salaryPaid(D, e, curMonth()); ok(near(P.emp[e], w), label + ": employee " + e + " shows paid " + P.emp[e] + " this month — independent " + w); });
  ok(!A.errs.length, label + ": no script errors" + (A.errs.length ? ": " + A.errs[0].slice(0, 200) : ""));
  A.close();
  return P;
}
async function ehlCheck(D, u) {
  const A = await openApp(u, true);
  const E = await readEHL(A);
  Object.keys(E.people).forEach(p => { const w = person(D, p); ok(near(E.people[p], w.ramas), "EHL: account of " + p + " shows " + E.people[p] + " — independent " + w.ramas); });
  Object.keys(E.casa).forEach(v => ok(E.casa[v] >= -0.004, "EHL: Casa EHL in " + v + " is " + E.casa[v] + " (never below zero)"));
  ok(!A.errs.length, "EHL: no script errors" + (A.errs.length ? ": " + A.errs[0].slice(0, 200) : ""));
  A.close();
  return E;
}

(async () => {
  const dirs = users.filter(u => u.rol === "Director");
  if (!users.some(u => u.rol === "Operator")) {
    const te = (await login(dirs[0], true)).token; /* collaborators are created from Casa EHL only */
    const r = await api("POST", "/api/collections/utilizatori/records", te, { nume: "Audit Colab", cod: "7777", status: "Activ", ehlCod: dirs[0].codEHL });
    if (r.status === 200) { users.push({ id: r.body.id, nume: "Audit Colab", rol: "Operator", cod: "7777", codEHL: "", status: "Activ", twoFA: false, totpSecret: "" }); note("no collaborator on the copy: made 'Audit Colab' (PIN 7777) from Casa EHL"); }
    else note("could not make a collaborator on the copy: " + r.status + " " + JSON.stringify(r.body));
  }
  const colabs = users.filter(u => u.rol === "Operator");
  const D0 = await dump((await login(dirs[0].cod)).token);
  console.log("\n1. The data itself (copy of the live database, " + D0.iesiri.length + " outflows, " + D0.cheltuieli.length + " expenses, " + D0.schimburi.length + " exchanges)");
  invariants(D0);
  users.forEach(u => { const p = person(D0, u.nume); console.log("     " + u.nume.padEnd(20) + " received " + p.primit + " · handed on " + p.dat + " · spent cash " + p.chn + " · rents " + p.chr + " · exchanges " + p.sch + " → balance " + p.ramas + " " + JSON.stringify(p.val));
    if (!near(p.serverBal, p.ramas)) note(u.nume + ": the server's balance check (" + p.serverBal + ") ignores exchanges, the app shows " + p.ramas);
    if (u.rol === "Operator" && p.ramas < -0.004) note(u.nume + " is below zero (" + p.ramas + ")"); });

  console.log("\n2. What the server lets each collaborator read");
  for (const u of colabs) visibility(D0, await dump((await login(u.cod)).token), u);
  for (const u of dirs) { const V = await dump((await login(u.cod)).token); ok(COLS.every(c => V[c] && V[c].length === D0[c].length), u.nume + " (director) reads everything"); }

  console.log("\n3. The real app, each account, against the independent figures");
  for (const u of dirs) await uiCheck(D0, u, u, u.nume + " (administrator)");
  for (const u of colabs) await uiCheck(D0, u, u.cod, u.nume + " (collaborator)");
  await ehlCheck(D0, dirs[0]);

  console.log("\n4. A scenario on the copy: administrator → collaborator → spending → exchange → salary");
  if (!colabs.length) { console.log("  (no collaborator account on this copy: the scenario is skipped)"); console.log("\n" + oks + " ok, " + fails + " failed" + (notes.length ? ", " + notes.length + " notes" : "")); process.exit(fails ? 1 : 0); }
  const S = dirs[0], C = colabs[0], R0 = rates(D0), before = { s: person(D0, S.nume), c: person(D0, C.nume) };
  const emp = (D0.angajati.find(a => a.status !== "Inactiv" && !users.some(u => same(u.nume, a.nume))) || {}).nume;
  let ts = (await login(S.cod)).token, r;
  if (before.s.ramas < 1100) { /* an empty copy: the till is fed by a project income (EHL account), then hands the administrator cash */
    const te = (await login(S, true)).token;
    r = await api("POST", "/api/collections/proiecte/records", te, { nume: "Audit Proiect", client: "Audit Client", contractEUR: 1000, contractCash: 1000, contractTransfer: 0, status: "Activ" });
    ok(r.status === 200, "Casa EHL opens a project (" + (r.body && r.body.message || r.status) + ")");
    r = await api("POST", "/api/collections/incasari/records", te, { data: today(), client: "Audit Client", proiect: "Audit Proiect", suma: 5000, valuta: "MDL", curs: 1, mod: "Numerar" });
    ok(r.status === 200, "Casa EHL records a 5 000 MDL cash income on it (" + (r.body && r.body.message || r.status) + ")");
    r = await api("POST", "/api/collections/iesiri/records", te, { data: today(), destinatie: "Dat persoanei", persoana: S.nume, valuta: "MDL", curs: 1, suma: 3000, sursa: "Casa", codEHL: S.codEHL });
    ok(r.status === 200 && r.body.sursa === "Casa", "Casa EHL hands 3 000 MDL to " + S.nume + " (" + (r.body && r.body.message || r.status) + ")");
    r = await api("POST", "/api/collections/iesiri/records", te, { data: today(), destinatie: "Dat persoanei", persoana: C.nume, valuta: "MDL", curs: 1, suma: 10, sursa: "Casa", codEHL: S.codEHL });
    ok(r.status === 400, "…but not to a collaborator (" + (r.body && r.body.message) + ")");
    r = await api("POST", "/api/collections/iesiri/records", te, { data: today(), destinatie: "Dat persoanei", persoana: S.nume, valuta: "MDL", curs: 1, suma: 10, sursa: "Casa", codEHL: "0000" });
    ok(r.status === 400, "…and not with a wrong EHL code (" + (r.body && r.body.message) + ")");
    r = await api("POST", "/api/collections/iesiri/records", te, { data: today(), destinatie: "Dat persoanei", persoana: S.nume, valuta: "MDL", curs: 1, suma: 2500, sursa: "Casa", codEHL: S.codEHL });
    ok(r.status === 400, "…and never more than the till holds (" + (r.body && r.body.message) + ")");
    const Dm = await dump(ts); before.s = person(Dm, S.nume); before.c = person(Dm, C.nume);
    ok(near(before.s.ramas, 3000), S.nume + " now holds 3 000 MDL by the independent figures (" + before.s.ramas + ")");
  }
  r = await api("POST", "/api/collections/iesiri/records", ts, { data: today(), destinatie: "Dat persoanei", persoana: C.nume, valuta: "MDL", curs: 1, suma: 1000, sursa: "Avans", nota: "audit" });
  ok(r.status === 200 && same(r.body.platitDe, S.nume) && r.body.sursa === "Avans", S.nume + " hands 1 000 MDL to " + C.nume + " from his own account (payer " + (r.body && r.body.platitDe) + ")");
  if (emp) { r = await api("POST", "/api/collections/cheltuieli/records", ts, { data: today(), suma: 100, categorie: "Salarii", descriere: "audit salariu", pentru: "EHL", mod: "Numerar", angajat: emp, luna: curMonth(), platitDe: C.nume });
    ok(r.status === 200 && same(r.body.platitDe, S.nume), S.nume + " pays 100 MDL salary to " + emp + ": it stays on his account even if the form names someone else (payer " + (r.body && r.body.platitDe) + ")"); }
  let tc = (await login(C.cod)).token;
  r = await api("POST", "/api/collections/cheltuieli/records", tc, { data: today(), suma: 300, categorie: "Materiale", descriere: "audit materiale", pentru: "EHL", mod: "Numerar" });
  ok(r.status === 200 && same(r.body.platitDe, C.nume), C.nume + " spends 300 MDL cash: paid from his account");
  r = await api("POST", "/api/collections/cheltuieli/records", tc, { data: today(), suma: 99999999, categorie: "Materiale", descriere: "audit prea mult", pentru: "EHL", mod: "Numerar" });
  ok(r.status === 400, C.nume + " cannot spend more cash than he holds (" + (r.body && r.body.message) + ")");
  r = await api("POST", "/api/collections/schimburi/records", tc, { data: today(), valutaDin: "MDL", sumaDin: 200, valutaIn: "EUR", sumaIn: 10, persoana: S.nume });
  ok(r.status === 200 && same(r.body.persoana, C.nume), C.nume + " exchanges 200 MDL → 10 EUR, recorded in his own name even when another name is sent");
  r = await api("GET", "/api/collections/incasari/records", tc); ok(r.status === 200 && r.body.totalItems === 0, C.nume + " still reads no firm incomes");
  r = await api("POST", "/api/collections/iesiri/records", tc, { data: today(), destinatie: "Dat persoanei", persoana: S.nume, valuta: "MDL", curs: 1, suma: 10 });
  ok(r.status >= 400, C.nume + " cannot hand money out of the till (" + (r.body && r.body.message) + ")");

  const D1 = await dump((await login(S.cod)).token), after = { s: person(D1, S.nume), c: person(D1, C.nume) };
  ok(near(after.s.ramas, before.s.ramas - 1000 - (emp ? 100 : 0)), S.nume + ": balance " + before.s.ramas + " → " + after.s.ramas + " (−1 000 handed on" + (emp ? ", −100 salary" : "") + ")");
  ok(near(after.c.val.MDL, before.c.val.MDL + 1000 - 300 - 200) && near(after.c.val.EUR, before.c.val.EUR + 10), C.nume + ": MDL " + before.c.val.MDL + " → " + after.c.val.MDL + ", EUR " + before.c.val.EUR + " → " + after.c.val.EUR);
  ok(near(after.c.ramas, before.c.ramas + 1000 - 300 + (10 * (R0.EUR || 1) - 200)), C.nume + ": lei balance " + before.c.ramas + " → " + after.c.ramas + " (+1 000 −300, exchange at today's rate)");
  await uiCheck(D1, S, S, S.nume + " after the scenario");
  const PC = await uiCheck(D1, C, C.cod, C.nume + " after the scenario");
  ok(PC.rows.some(t => /de la/.test(t) && /1\.000,00/.test(t) && t.includes(S.nume)), C.nume + " sees the 1 000 MDL as coming from " + S.nume);
  await ehlCheck(D1, dirs[0]);

  console.log("\n" + oks + " ok, " + fails + " failed" + (notes.length ? ", " + notes.length + " notes" : ""));
  process.exit(fails ? 1 : 0);
})().catch(e => { console.error("AUDIT CRASH", e); process.exit(2); });
