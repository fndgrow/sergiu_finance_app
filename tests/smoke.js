/* Smoke test: load app.js in jsdom with an in-memory fake of the PocketBase JS SDK and server rules,
   walk through first launch, data entry, every view, offline queue, logout and operator login.
   Usage: node smoke.js <project folder> */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const APP = process.argv[2];
const html = fs.readFileSync(path.join(APP, "index.html"), "utf8")
  .replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "")
  .replace(/<link[^>]*>/g, "");
const dom = new JSDOM(html, { url: "https://casieria.test/", runScripts: "outside-only", pretendToBeVisual: true });
const { window } = dom;
const errors = [];
window.addEventListener("error", e => errors.push("window error: " + (e.error && e.error.stack || e.message)));
window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
window.URL.createObjectURL = () => "blob:x"; window.URL.revokeObjectURL = () => {};
Object.defineProperty(window.navigator, "serviceWorker", { value: undefined });
let NET_DOWN = false;

/* ---- fake server ---- */
const store = {}; let seq = 1; const subs = [];
const newId = () => ("r" + String(seq++).padStart(14, "0"));
const err = (status, message) => { const e = new Error(message); e.status = status; e.response = { message }; return e; };
let currentUser = null;
const isDir = () => currentUser && currentUser.rol === "Director";
const canRead = (col) => { if (!currentUser) return false; if (col === "istoric" || col === "jurnal") return isDir(); return true; };
function emit(col, action, record) { subs.forEach(s => { if (s.col === col && (s.topic === "*" || s.topic === record.id)) s.cb({ action, record: { ...record } }); }); }
function collection(col) {
  return {
    async getFullList(opts) {
      if (NET_DOWN) throw err(0, "net");
      if (!canRead(col)) throw err(403, "forbidden");
      let items = Object.values(store[col] || {});
      if (col === "utilizatori" && !isDir()) items = items.filter(u => u.id === currentUser.id);
      if (col === "pontaj" && !isDir()) items = items.filter(r => r.by === currentUser.id);
      if (opts && opts.filter) { const m = opts.filter.match(/created >= "([^"]+)" && created <= "([^"]+)"/); if (m) items = items.filter(r => r.created >= m[1] && r.created <= m[2]); }
      return items.map(r => ({ ...r }));
    },
    async getOne(id) { if (NET_DOWN) throw err(0, "net"); const r = store[col] && store[col][id]; if (!r) throw err(404, "nf"); return { ...r }; },
    async create(data) {
      if (NET_DOWN) throw err(0, "net");
      if (!currentUser) throw err(403, "forbidden");
      if (col === "utilizatori" && !isDir()) throw err(403, "forbidden");
      const now = new Date().toISOString().replace("T", " ");
      const r = { ...data, id: newId(), created: now, updated: now, by: currentUser.id };
      delete r.password; delete r.passwordConfirm;
      store[col] = store[col] || {}; store[col][r.id] = r; emit(col, "create", r); return { ...r };
    },
    async update(id, data) {
      if (NET_DOWN) throw err(0, "net");
      const r = store[col] && store[col][id]; if (!r) throw err(404, "nf");
      if (col === "utilizatori" && !isDir()) throw err(403, "forbidden");
      if (col !== "utilizatori" && col !== "config" && !isDir() && r.by !== currentUser.id) throw err(403, "forbidden");
      Object.assign(r, data, { updated: new Date().toISOString().replace("T", " ") }); emit(col, "update", r); return { ...r };
    },
    async delete(id) {
      if (NET_DOWN) throw err(0, "net");
      if (!isDir()) throw err(403, "forbidden");
      const r = store[col] && store[col][id]; if (!r) throw err(404, "nf"); delete store[col][id]; emit(col, "delete", r); return true;
    },
    async subscribe(topic, cb) { const s = { col, topic, cb }; subs.push(s); return () => { const i = subs.indexOf(s); if (i >= 0) subs.splice(i, 1); }; },
    async authRefresh() { if (!currentUser) throw err(401, "x"); return { token: "t", record: { ...currentUser } }; }
  };
}
class PocketBase {
  constructor(url) { this.baseUrl = url;
    this.authStore = { token: "", record: null, get model() { return this.record; }, get isValid() { return !!this.token; },
      save(t, r) { this.token = t; this.record = r; currentUser = r ? (store.utilizatori && store.utilizatori[r.id]) || r : null; }, clear() { this.token = ""; this.record = null; currentUser = null; } };
    this.realtime = { unsubscribe() { subs.length = 0; } };
  }
  autoCancellation() {}
  collection(c) { return collection(c); }
  async send(p, o) {
    if (NET_DOWN) throw err(0, "net");
    if (p !== "/api/ehl/login") throw err(404, "nf");
    const cod = String(o.body.cod || "");
    store.utilizatori = store.utilizatori || {};
    let u = Object.values(store.utilizatori).find(x => x.cod === cod);
    let first = false;
    if (!u && Object.keys(store.utilizatori).length === 0) {
      u = { id: newId(), nume: "Director", rol: "Director", cod, status: "Activ" }; store.utilizatori[u.id] = u; first = true;
      store.config = { c1: { id: "c1", valute: [{ cod: "MDL", curs: 1 }, { cod: "EUR", curs: 20.22 }, { cod: "USD", curs: 17.5 }], casier: "", categorii: ["Materiale", "Transport"] } };
    }
    if (!u || u.status === "Inactiv") throw err(401, "Cod greșit sau utilizator dezactivat.");
    return { token: "tok-" + u.id, first, record: { id: u.id, nume: u.nume, rol: u.rol, cod: u.cod, status: u.status } };
  }
}
window.PocketBase = PocketBase;
window.PB_URL = "";
window.ExcelJS = undefined;

const tick = (ms = 15) => new Promise(r => setTimeout(r, ms));
const $ = s => window.document.querySelector(s);
const text = () => $("#app").textContent.replace(/\s+/g, " ").trim();
const click = el => el.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
const submit = f => f.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
const check = (cond, msg) => { if (!cond) { errors.push("CHECK FAILED: " + msg); console.log("  FAIL " + msg); } else console.log("  ok   " + msg); };
const setField = (k, v) => { const el = window.document.querySelector('[data-k="' + k + '"]'); if (!el) throw new Error("no field " + k); if (el.type === "checkbox") el.checked = v; else el.value = v; el.dispatchEvent(new window.Event("input", { bubbles: true })); el.dispatchEvent(new window.Event("change", { bubbles: true })); };
const ls = (k) => window.localStorage.getItem(k);

(async () => {
  window.eval(fs.readFileSync(path.join(APP, "app.js"), "utf8"));
  await tick(30);
  console.log("1. gate shown");
  check($("#pinf") && $("#pinv"), "code form present");
  check(!$("#nav").children.length, "nav hidden while locked");

  console.log("2. first launch: code becomes the director");
  $("#pinv").value = "258000"; submit($("#pinf")); await tick(60);
  const dirId = Object.values(store.utilizatori)[0].id;
  check(Object.values(store.utilizatori)[0].rol === "Director", "director user created");
  check($("#role").textContent === "Director", "role pill = Director");
  check($("#nav").children.length === 4, "director nav has 4 tabs");
  check(/Banii firmei/.test(text()), "dashboard rendered");
  click($('[data-view="set"]')); await tick(); check((window.document.querySelector('[name="cod1"]')||{}).value === "EUR", "config (EUR rate) loaded from server"); click($('[data-view="panou"]')); await tick();

  console.log("3. add a user (operator) with employee + salary");
  click($('[data-view="set"]')); await tick();
  click($('[data-form="utilizatori"]')); await tick();
  setField("nume", "Ion Operator"); setField("cod", "4141"); setField("caAngajat", true); await tick(); setField("salariu", "12000");
  submit($("#recf")); await tick(80);
  const op = Object.values(store.utilizatori).find(u => u.nume === "Ion Operator");
  check(op && op.cod === "4141" && !("password" in op), "user created, password stripped by server");
  check(Object.values(store.angajati || {}).some(a => a.nume === "Ion Operator"), "employee created");
  check(Object.values(store.istoric || {}).some(h => h.salariu === 12000), "salary history created");
  check(Object.values(store.jurnal || {}).length >= 3, "journal entries written (" + Object.values(store.jurnal || {}).length + ")");

  console.log("4. rename director (self) keeps session; self-demote refused");
  click($('[data-view="set"]')); await tick();
  click($('[data-edit="utilizatori"][data-id="' + dirId + '"]')); await tick();
  setField("nume", "Sergiu"); submit($("#recf")); await tick(60);
  check(store.utilizatori[dirId].nume === "Sergiu" && $("#role").textContent === "Director", "renamed, still director");
  click($('[data-edit="utilizatori"][data-id="' + dirId + '"]')); await tick();
  setField("rol", "Operator"); submit($("#recf")); await tick(40);
  check(/propriul cont/.test($("#sheet").textContent || ""), "self-demotion blocked with message");
  click($("#closeSheet")); await tick();

  console.log("5. add an income and an expense, check calc");
  click($('[data-view="add"]')); await tick();
  click($('[data-form="incasari"]')); await tick();
  setField("client", "Client A"); setField("valuta", "EUR"); await tick(); setField("suma", "100"); submit($("#recf")); await tick(60);
  click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "500"); setField("categorie", "Materiale"); setField("platitDe", "Ion Operator"); submit($("#recf")); await tick(60);
  const inc = Object.values(store.incasari)[0];
  check(inc.curs === 20.22 && inc.suma === 100 && inc.by === dirId, "income EUR 100 at rate 20.22, author set by server");
  click($('[data-view="panou"]')); await tick();
  check(/2[ .,]?022,00/.test(text()), "dashboard shows 2 022,00 MDL income");
  check(/Ion Operator/.test(text()), "collaborator report lists Ion Operator");

  console.log("6. registers, salaries, journal, settings render");
  for (const tab of ["incasari", "cheltuieli", "iesiri", "proiecte", "chirii", "contracte", "imprumuturi", "salarii", "jurnal"]) {
    click($('[data-view="reg"]')); await tick(); click($('[data-tab="' + tab + '"]')); await tick();
    check(text().length > 20, "register tab " + tab);
  }
  submit($("#jurf")); await tick(60); check(/Adăugat/.test(text()), "journal lists entries for this month");

  console.log("7. offline: entries are queued and sent when back online");
  NET_DOWN = true; window.dispatchEvent(new window.Event("offline")); await tick();
  click($('[data-view="add"]')); await tick();
  click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "70"); setField("categorie", "Transport"); setField("platitDe", "Sergiu"); submit($("#recf")); await tick(60);
  check(/Fără conexiune/.test(text()) && /așteaptă trimiterea/.test(text()), "offline note + pending count shown");
  const q = JSON.parse(ls("ehl.queue") || "[]");
  check(q.length === 2 && q[0].op === "create" && q[0].col === "cheltuieli" && q[1].col === "jurnal", "queue holds the expense and its journal entry");
  const tmpId = q[0].id;
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="cheltuieli"]')); await tick();
  check(/70,00/.test(text()), "queued expense visible in the register");
  click($('[data-edit="cheltuieli"][data-id="' + tmpId + '"]')); await tick();
  setField("suma", "75"); submit($("#recf")); await tick(40);
  const q2 = JSON.parse(ls("ehl.queue"));
  check(q2.filter(o => o.col === "cheltuieli").length === 1 && q2[0].data.suma === 75, "edit folded into the unsent create");
  NET_DOWN = false; window.dispatchEvent(new window.Event("online")); await tick(200);
  check(JSON.parse(ls("ehl.queue") || "[]").length === 0, "queue flushed");
  check(Object.values(store.cheltuieli).some(r => r.suma === 75), "server received the expense (75)");
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="cheltuieli"]')); await tick();
  check(!Array.from(window.document.querySelectorAll('[data-edit="cheltuieli"]')).some(b => b.dataset.id.indexOf("tmp") === 0), "temp id replaced by the server id");

  console.log("8. logout, login as operator");
  click($('[data-view="set"]')); await tick();
  click($("#exitdir")); await tick(30);
  check($("#pinf") && !ls("ehl.cache"), "locked again, cache cleared");
  $("#pinv").value = "4141"; submit($("#pinf")); await tick(80);
  check($("#role").textContent === "Operator", "role pill = Operator");
  check($("#nav").children.length === 3, "operator nav has 3 tabs");
  click($('[data-form="cheltuieli"]')); await tick();
  check(window.document.querySelector('[data-k="platitDe"]').value === "Ion Operator", "Plătit de defaults to operator name");
  check(!$("#delbtn"), "operator has no delete button");
  click($("#closeSheet")); await tick();
  click($('[data-form="pontaj"]')); await tick();
  check(!/MDL/.test($("#sheet").textContent), "operator sees no salary preview in timesheet form");
  click($("#closeSheet")); await tick();

  console.log("9. deactivating the operator kicks the device out");
  store.utilizatori[op.id].status = "Inactiv"; emit("utilizatori", "update", store.utilizatori[op.id]); await tick(30);
  check($("#pinf") && $("#role").textContent !== "Operator", "operator locked out after deactivation");

  console.log("10. wrong code rejected");
  $("#pinv").value = "000000"; submit($("#pinf")); await tick(50);
  check($("#pinf") && /greșit/.test(text()), "wrong code shows error and stays locked");

  console.log(errors.length ? "\nERRORS:\n" + errors.join("\n") : "\nALL GOOD");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error("TEST CRASH", e); process.exit(2); });
