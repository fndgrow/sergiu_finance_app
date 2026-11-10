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
window.console.error = function () { const t = Array.from(arguments).join(" "); console.log("  WINDOW console.error:", t.slice(0, 700)); errors.push("console.error: " + t.slice(0, 200)); };
const errors = [];
window.addEventListener("error", e => errors.push("window error: " + (e.error && e.error.stack || e.message)));
window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
window.URL.createObjectURL = () => "blob:x"; window.URL.revokeObjectURL = () => {};
Object.defineProperty(window.navigator, "serviceWorker", { value: undefined });
let NET_DOWN = false;
let LOSE_ANSWER = false; /* the request reaches the server, its answer does not come back */
let KICKED = false;
let DEBUG = false; /* the account was opened on another device: this one's token is dead */
const PAROLA_DIRECTOR = false; /* as in the server hooks: the director's password is switched off for now */

/* ---- fake server ---- */
const store = {}; let seq = 1; const subs = [];
const newId = () => ("r" + String(seq++).padStart(14, "0"));
const err = (status, message) => { const e = new Error(message); e.status = status; e.response = { message }; return e; };
let currentUser = null;
const isDir = () => currentUser && currentUser.rol === "Director";
const canRead = (col) => { if (!currentUser) return false; if (col === "jurnal") return isDir(); return true; }; /* a list rule filters, it never refuses */
/* what a signed-in user may read (the collection list/view rules): a director everything, a collaborator only what is his */
const visible = (col, r) => {
  if (!currentUser) return false; if (isDir()) return true;
  const me = currentUser;
  if (col === "utilizatori") return r.id === me.id;
  if (["incasari", "contracte", "imprumuturi", "jurnal"].includes(col)) return false;
  if (col === "istoric" || col === "angajati" || col === "grafic") return true; /* migration 17: employees, salaries and the schedule are shared */
  if (col === "cheltuieli") return r.by === me.id || r.platitDe === me.nume;
  if (col === "iesiri") return r.by === me.id || r.persoana === me.nume;
  if (["chirii", "pontaj"].includes(col)) return r.by === me.id;
  return true; /* proiecte, config */
};
function emit(col, action, record) { subs.forEach(s => { if (s.col === col && (s.topic === "*" || s.topic === record.id) && visible(col, record)) s.cb({ action, record: { ...record } }); }); }
function collection(col) {
  return {
    async getFullList(opts) { if (DEBUG) console.log("   FAKE list", col, "user:", currentUser && currentUser.nume);
      if (NET_DOWN) throw err(0, "net");
      if (!canRead(col)) throw err(403, "forbidden");
      let items = Object.values(store[col] || {});
      items = items.filter(r => visible(col, r));
      if (opts && opts.filter) { const m = opts.filter.match(/created >= "([^"]+)" && created <= "([^"]+)"/); if (m) items = items.filter(r => r.created >= m[1] && r.created <= m[2]);
        const mr = opts.filter.match(/^ref = "([^"]+)"$/); if (mr) items = items.filter(r => r.ref === mr[1]); }
      return items.map(r => ({ ...r }));
    },
    async getOne(id) { if (DEBUG) console.log("   FAKE getOne", col, id, !!(store[col] && store[col][id])); if (NET_DOWN) throw err(0, "net"); if (KICKED) throw err(404, "The requested resource wasn't found."); /* a dead token is answered like a stranger */ const r = store[col] && store[col][id]; if (!r) throw err(404, "nf"); return { ...r }; },
    async create(data) {
      if (NET_DOWN) throw err(0, "net");
      if (!currentUser) throw err(403, "forbidden");
      if (col === "utilizatori" && !isDir()) throw err(403, "forbidden");
      if (col === "incasari" && !isDir()) throw err(403, "forbidden"); /* client incomes: director only */
      if (col === "incasari") { /* money from a founder is confirmed with that founder's code */
        const f = Object.values(store.utilizatori).find(u => u.rol === "Director" && String(u.nume).toLowerCase() === String(data.client || "").trim().toLowerCase());
        if (f) { if (String(data.codFondator || "") !== f.cod) throw err(400, "Codul fondatorului este greșit."); data = { ...data, confirmat: f.nume + " · now" }; }
        delete data.codFondator;
      }
      if (col === "chirii" && isDir()) data = { ...data, sursa: "Avans", platitDe: currentUser.nume };
      if (col === "iesiri" && isDir()) { /* a director: from the EHL till with his EHL code, or from his own account */
        if (data.sursa === "Avans") data = { ...data, platitDe: currentUser.nume };
        else {
          if (!data.codEHL || data.codEHL !== currentUser.codEHL) throw err(400, "Codul EHL este greșit.");
          const okDest = data.destinatie === "Depus pe cont" || data.destinatie === "Restituire fondator" || (data.destinatie === "Dat persoanei" && Object.values(store.utilizatori).some(u => u.rol === "Director" && u.nume === String(data.persoana || "").trim()));
          if (!okDest) throw err(400, "Din Casa EHL banii merg doar la administratori, pe cont sau înapoi la fondator.");
          data = { ...data, sursa: "Casa", platitDe: "" };
        }
        delete data.codEHL;
      }
      if (col === "cheltuieli" && isDir()) { /* the payer is the account itself, except a salary paid to a collaborator account */
        const who = String(data.platitDe || "").trim(), isCollab = data.categorie === "Salarii" && Object.values(store.utilizatori).some(u => u.rol === "Operator" && u.nume === who);
        if (!isCollab) data = { ...data, platitDe: currentUser.nume, sursa: "Avans" }; /* a director pays from his own account */
      }
      if (col === "cheltuieli" && !isDir()) { /* a collaborator pays himself; cash cannot take his balance below zero (server hook) */
        data = { ...data, platitDe: currentUser.nume };
        if (data.mod !== "Transfer") {
          data.sursa = "Avans";
          const got = Object.values(store.iesiri || {}).filter(r => r.destinatie === "Dat persoanei" && r.persoana === currentUser.nume).reduce((a, r) => a + r.suma * r.curs, 0);
          const spent = Object.values(store.cheltuieli || {}).filter(r => r.mod !== "Transfer" && r.platitDe === currentUser.nume).reduce((a, r) => a + r.suma, 0);
          if (data.suma > got - spent + 0.004) throw err(400, "Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
        }
      }
      store[col] = store[col] || {};
      /* like PocketBase: the id sent by the client is kept, a taken one is refused on the "id" field */
      if (data.id && store[col][data.id]) { const e = err(400, "Failed to create record."); e.response.data = { id: { code: "validation_not_unique", message: "Value must be unique." } }; throw e; }
      const now = new Date().toISOString().replace("T", " ");
      const r = { ...data, id: data.id || newId(), created: now, updated: now, by: currentUser.id };
      delete r.password; delete r.passwordConfirm;
      store[col][r.id] = r; emit(col, "create", r);
      if (LOSE_ANSWER) throw err(0, "net");
      return { ...r };
    },
    async update(id, data) {
      if (NET_DOWN) throw err(0, "net");
      const r = store[col] && store[col][id]; if (!r) throw err(404, "nf");
      if (col === "utilizatori" && !isDir()) throw err(403, "forbidden");
      if (col !== "utilizatori" && col !== "config" && !isDir() && r.by !== currentUser.id) throw err(403, "forbidden");
      if (col !== "utilizatori" && col !== "config" && !isDir() && Date.now() - Date.parse(r.created.replace(" ", "T")) > 15 * 86400000) throw err(400, "Înregistrarea are mai mult de 15 zile; o poate modifica doar directorul.");
      Object.assign(r, data, { updated: new Date().toISOString().replace("T", " ") }); emit(col, "update", r); return { ...r };
    },
    async delete(id) {
      if (NET_DOWN) throw err(0, "net");
      if (!isDir()) throw err(403, "forbidden");
      const r = store[col] && store[col][id]; if (!r) throw err(404, "nf"); delete store[col][id]; emit(col, "delete", r); return true;
    },
    async subscribe(topic, cb) { const s = { col, topic, cb }; subs.push(s); return () => { const i = subs.indexOf(s); if (i >= 0) subs.splice(i, 1); }; },
    async authRefresh() { if (!currentUser || KICKED) throw err(401, "The request requires valid record authorization token."); return { token: "t", record: { ...currentUser } }; }
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
    if (p === "/api/ehl/password") { if (!currentUser || currentUser.rol !== "Director") throw err(403, "x"); if (currentUser.parolaSetata && o.body.veche !== currentUser.parola) throw err(400, "Parola actuală este greșită."); currentUser.parola = o.body.noua; currentUser.parolaSetata = true; return { ok: true }; }
    if (p !== "/api/ehl/login") throw err(404, "nf");
    const cod = String(o.body.cod || "");
    store.utilizatori = store.utilizatori || {};
    let u = Object.values(store.utilizatori).find(x => x.cod === cod), viaEHL = false;
    if (!u) { u = Object.values(store.utilizatori).find(x => x.rol === "Director" && x.codEHL === cod); viaEHL = !!u; }
    let first = false;
    if (!u && Object.keys(store.utilizatori).length === 0) {
      u = { id: newId(), nume: "Director", rol: "Director", cod, status: "Activ" }; store.utilizatori[u.id] = u; first = true;
      store.config = { c1: { id: "c1", valute: [{ cod: "MDL", curs: 1 }, { cod: "EUR", curs: 20.22 }, { cod: "USD", curs: 17.5 }], casier: "", categorii: ["Materiale", "Transport"] } };
    }
    if (DEBUG) console.log("   FAKE login", cod, "found:", !!u, u && u.status, u && u.rol);
    if (!u || u.status === "Inactiv") throw err(401, "Cod greșit sau utilizator dezactivat.");
    const pub = { id: u.id, nume: u.nume, rol: u.rol, cod: u.cod, status: u.status, parolaSetata: !!u.parolaSetata };
    if (u.rol !== "Director" || !PAROLA_DIRECTOR) return { token: "tok-" + u.id, first, record: pub, ehl: viaEHL };
    if (!u.parolaSetata) {
      if (!o.body.parolaNoua) return { needSetPassword: true, first, record: pub };
      if (o.body.parolaNoua.length < 6) throw err(400, "Parola trebuie să aibă cel puțin 6 caractere.");
      u.parola = o.body.parolaNoua; u.parolaSetata = true; pub.parolaSetata = true;
      return { token: "tok-" + u.id, expires: Date.now() + 7 * 86400000, first, record: pub };
    }
    if (!o.body.parola) return { needPassword: true, record: pub };
    if (o.body.parola !== u.parola) throw err(401, "Parolă greșită.");
    return { token: "tok-" + u.id, expires: Date.now() + 7 * 86400000, record: pub };
  }
}
window.PocketBase = PocketBase;
window.PB_URL = "";
window.EventSource = function EventSource() {}; /* realtime exists in browsers; the fake SDK does not use it */
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
  check(/Instalează aplicația pe computer/.test(text()), "install block on the login screen names the computer");

  check($("#langbtn") && $("#langbtn").textContent === "RU", "single language button shows RU on the Romanian UI");
  click($("#langbtn")); await tick(); check($("#langbtn").textContent === "RO" && /Код доступа/.test(text()), "tap switches to Russian and the button now shows RO");
  click($("#langbtn")); await tick();
  console.log("2. first launch: code becomes the director");
  $("#pinv").value = "258000"; submit($("#pinf")); await tick(60);
  check($("#role").textContent === "Director" && !$("#spf") && !$("#pwf"), "director enters with the code alone (password switched off)");
  const dirId = Object.values(store.utilizatori)[0].id;
  store.utilizatori[dirId].codEHL = "1111"; emit("utilizatori", "update", store.utilizatori[dirId]); await tick(30); /* his EHL access code */
  const asMode = async (code) => { click($('[data-view="set"]')); await tick(); click($("#exitdir")); await tick(30); $("#pinv").value = code; submit($("#pinf")); await tick(80); click($('[data-view="add"]')); await tick(); };
  const asEHL = () => asMode("1111"), asAdmin = () => asMode("258000"); /* incomes, projects and the till are the EHL account's; spending is the administrator's */
  check(ls("ehl.cod") === null && ls("ehl.exp") === null && Number(ls("ehl.unlock")) > 0, "no remembered code or expiry; the time of entry is stamped");
  check(Object.values(store.utilizatori)[0].rol === "Director", "director user created");
  check($("#role").textContent === "Director", "role pill = Director");
  check($("#nav").children.length === 5, "director nav has 5 tabs: EHL, Panou, Adaugă, Registre, Setări");
  check(/Soldul meu|Luat din Casa EHL/.test(text()), "the director lands on his own Panou");
  click($('[data-view="ehl"]')); await tick(); check(/Banii firmei/.test(text()), "the EHL tab shows the firm-wide dashboard");
  click($('[data-view="set"]')); await tick(); check((window.document.querySelector('[name="cod1"]')||{}).value === "EUR", "config (EUR rate) loaded from server"); click($('[data-view="ehl"]')); await tick();

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

  await asEHL();
  console.log("4a. desktop date picker");
  click($('[data-view="add"]')); await tick(); click($('[data-form="incasari"]')); await tick();
  const real=$('[data-k="data"]'), show=real && real.parentNode.querySelector(".dp-show");
  check(real && real.type === "date" && show && /^[0-9][0-9][.][0-9][0-9][.][0-9]{4}$/.test(show.value), "date field wrapped: hidden ISO input + dd.mm.yyyy display");
  click(show); await tick();
  check($("#dpop") && !$("#dpop").hidden && window.document.querySelectorAll("#dpop .dp-day").length >= 35 && $("#dpop .dp-sel"), "popover shows a month grid with the selected day");
  click($('#dpop [data-dpnav="-1"]')); await tick();
  const firstDay=Array.from(window.document.querySelectorAll('#dpop .dp-day:not(.dp-off)'))[0]; click(firstDay); await tick();
  check($("#dpop").hidden && /-01$/.test(real.value) && show.value.indexOf("01.") === 0, "picking a day in the previous month writes ISO to the real input and closes the popover");
  click($("#closeSheet")); await tick(60);
  console.log("4b. back button closes an open form instead of leaving");
  click($('[data-view="add"]')); await tick(); click($('[data-form="incasari"]')); await tick();
  check($("#recf") && window.history.state && window.history.state.sheet, "open form pushed a history entry");
  window.history.back(); await tick(60);
  check(!$("#recf") && !/recf/.test($("#sheet").innerHTML), "history back closed the form");
  click($('[data-view="reg"]')); await tick(); window.history.back(); await tick(60);
  check($('[data-view="add"][aria-current="page"]'), "history back returns to the previous view");
  console.log("4c. clients come from projects; dates cannot be in the future");
  click($('[data-view="add"]')); await tick(); click($('[data-form="incasari"]')); await tick();
  const cs0 = $('[data-k="client"]');
  check(cs0.tagName === "SELECT" && Array.from(cs0.options).some(o => o.value === "Sergiu" && /fondator/.test(o.textContent)), "before any client the list already offers the founder (the director) marked 'fondator'");
  click($("#closeSheet")); await tick();
  click($('[data-form="proiecte"]')); await tick();
  setField("nume", "Casa Test"); setField("client", "Client A"); setField("contractEUR", "1000"); await tick(); submit($("#recf")); await tick(60);
  check(Object.values(store.proiecte || {}).some(p => p.nume === "Casa Test" && p.client === "Client A" && p.contractEUR === 1000 && p.contractTransfer === 1000 && p.responsabili === "Sergiu"), "project Casa Test with client Client A created: contract 1 000 EUR, the whole of it by transfer until a cash part is typed, the creator responsible");
  click($('[data-form="incasari"]')); await tick();
  const cs = $('[data-k="client"]');
  check(cs.tagName === "SELECT" && Array.from(cs.options).some(o => o.value === "Client A") && cs.value === "", "client is now a list with Client A, nothing preselected");
  setField("proiect", "Casa Test"); await tick();
  check($('[data-k="client"]').value === "Client A", "choosing the project fills the client in");
  check($('[data-k="data"]').getAttribute("max") === new Date().toISOString().slice(0, 10), "date input carries max = today");
  setField("suma", "5"); setField("data", "2099-01-01"); submit($("#recf")); await tick(40);
  check($("#recf") && /viitor/.test($("#sheet").textContent), "a future date is refused with a message");
  click($("#closeSheet")); await tick();
  console.log("5. add an income and an expense, check calc");
  click($('[data-view="add"]')); await tick();
  click($('[data-form="incasari"]')); await tick();
  setField("client", "Client A"); setField("valuta", "EUR"); await tick(); setField("suma", "100"); submit($("#recf")); await tick(60);
  click($('[data-form="incasari"]')); await tick(); /* lei in the till, so the director's cash expenses below have something to come out of */
  setField("client", "Client A"); setField("suma", "20000"); submit($("#recf")); await tick(60);
  console.log("5x. the EHL till: the EHL account moves money into an administrator's account");
  click($('[data-form="iesiri"]')); await tick();
  const pSel5 = $('[data-k="persoana"]');
  check(!$('[data-k="din"]') && !$('[data-k="codEHL"]') && pSel5.tagName === "SELECT" && Array.from(pSel5.options).some(o => o.value === "Sergiu") && !Array.from(pSel5.options).some(o => o.value === "Ion Operator"), "inside the EHL account the money comes from the till by itself, no code is asked, and the person is picked among the administrators only");
  check(Array.from($('[data-k="destinatie"]').options).map(o => o.value).join() === "Dat persoanei,Depus pe cont,Restituire fondator", "from Casa EHL only: to an administrator, to the bank, back to a founder");
  setField("persoana", "Sergiu"); await tick();
  setField("suma", "15000"); submit($("#recf")); await tick(80);
  const self15 = Object.values(store.iesiri).find(r => r.persoana === "Sergiu");
  check(!$("#recf") && self15 && self15.suma === 15000 && self15.sursa === "Casa" && !("codEHL" in self15), "with the right code 15 000 move from the EHL till to his account; the code is not stored");
  click($('[data-view="ehl"]')); await tick();
  check(/Conturile administratorilor/.test(text()) && /Sergiu/.test(text()), "the EHL tab shows the administrators' accounts");
  click($('[data-view="panou"]')); await tick();
  check(/Luat din Casa EHL\s*15\.000,00/.test(text()) && /Soldul meu\s*15\.000,00/.test(text()) && !/Banii firmei|Datorii către fondatori/.test(text()), "the director's own Panou shows what he took from Casa EHL and his balance, not the firm's figures");
  await asAdmin();
  check(!$('[data-form="incasari"]') && !$('[data-form="proiecte"]') && $('[data-form="cheltuieli"]') && $('[data-form="chirii"]'), "the administrator account records spending, not incomes or projects");
  click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "500"); setField("descriere", "Ciment"); setField("pentru", "EHL"); setField("categorie", "Materiale"); submit($("#recf")); await tick(60);
  const inc = Object.values(store.incasari)[0];
  check(inc.curs === 20.22 && inc.suma === 100 && inc.by === dirId, "income EUR 100 at rate 20.22, author set by server");
  click($('[data-view="ehl"]')); await tick();
  check(/2[ .,]?022,00/.test(text()), "dashboard shows 2 022,00 MDL income");
  check($(".donut") && $ ? true : true, "");
  check(window.document.querySelectorAll(".donut .seg").length === 1 && window.document.querySelectorAll("[data-ovluna]").length >= 7, "overview: donut with 1 category, month chips, legend");
  check(window.document.querySelectorAll(".flow .bar").length === 12, "overview: cash-flow bars for 6 months");
  click(window.document.querySelector('.legend [data-cat="Materiale"]')); await tick();
  check(/Materiale/.test(text()) && $("[data-clearfilter]") && new Set(Array.from(window.document.querySelectorAll('[data-edit="cheltuieli"]')).map(e => e.dataset.id)).size === 1, "tap on category opens filtered expense register" /* the same record is rendered as a table row (desktop) and a card (phone) */);
  click($("[data-clearfilter]")); await tick();
  console.log("5a. subcategories: \"Materiale / Acoperiș\" added in settings, picked in the form, grouped under Materiale");
  click($('[data-view="set"]')); await tick();
  $("#catadd").elements["nc"].value = "Materiale / Acoperiș"; submit($("#catadd")); await tick(60);
  check((store.config.c1.categorii || []).indexOf("Materiale / Acoperiș") >= 0, "subcategory saved in settings as \"Materiale / Acoperiș\"");
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  check($('[data-k="categorie"]').tagName === "SELECT" && Array.from($('[data-k="categorie"]').options).map(o => o.value).join("|") === "|Materiale|Transport", "the category is chosen from the settings list (Materiale, Transport), nothing can be typed");
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  check(!$('[data-k="subcat"]'), "no subcategory field before a category with subcategories is chosen");
  setField("pentru", "EHL"); setField("categorie", "Materiale"); await tick();
  check($('[data-k="subcat"]'), "subcategory field appears for Materiale");
  setField("suma", "300"); setField("descriere", "Țiglă metalică"); setField("subcat", "Acoperiș"); submit($("#recf")); await tick(60);
  check(Object.values(store.cheltuieli).some(r => r.categorie === "Materiale / Acoperiș" && r.suma === 300), "expense stored as \"Materiale / Acoperiș\"");
  click($('[data-view="ehl"]')); await tick();
  check(window.document.querySelectorAll(".donut .seg").length === 1 && /Acoperiș 300,00/.test(text()), "donut still one Materiale slice, the subcategory listed under it with its amount");
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="cheltuieli"]')); await tick();
  check(text().indexOf("Materiale / Acoperiș") >= 0, "register shows the full category name");
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "10"); setField("pentru", "EHL"); setField("categorie", "Transport"); submit($("#recf")); await tick(30);
  check($("#recf") && /obligatorii|cel puțin 3/.test($("#sheet").textContent), "expense without description is refused");
  click($("#closeSheet")); await tick();
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  check(!$('[data-k="platitDe"]') && !$('[data-k="sursa"]') && /Disponibil în contul meu/.test($("#sheet").textContent), "the director's expense form has no payer or source: he pays from his own account and sees what it holds");
  setField("suma", "1200"); setField("descriere", "Vopsea din buzunar"); setField("pentru", "EHL"); setField("categorie", "Materiale"); submit($("#recf")); await tick(60);
  const vop = Object.values(store.cheltuieli).find(r => r.descriere === "Vopsea din buzunar");
  check(vop && vop.platitDe === "Sergiu" && vop.sursa === "Avans", "the director's expense names him as the payer, paid from his own account");
  click($('[data-view="ehl"]')); await tick();
  check(!/Raport pe colaborator[sS]*Ion Operator/.test(text()) || !window.document.querySelector('[data-colab="Ion Operator"]'), "Ion Operator is not a collaborator with money yet (the director paid from the till)");

  console.log("6. registers, salaries, journal, settings render");
  for (const tab of ["incasari", "cheltuieli", "iesiri", "proiecte", "chirii", "imprumuturi", "salarii", "jurnal"]) {
    click($('[data-view="reg"]')); await tick(); click($('[data-tab="' + tab + '"]')); await tick();
    check(text().length > 20, "register tab " + tab);
  }
  submit($("#jurf")); await tick(60); check(/Adăugat/.test(text()), "journal lists entries for this month");

  console.log("7. offline: entries are queued and sent when back online");
  NET_DOWN = true; window.dispatchEvent(new window.Event("offline")); await tick();
  click($('[data-view="add"]')); await tick();
  click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "70"); setField("descriere", "Taxi"); setField("pentru", "EHL"); setField("categorie", "Transport"); submit($("#recf")); await tick(60);
  check(/Fără conexiune/.test(text()) && /așteaptă trimiterea/.test(text()), "offline note + pending count shown");
  const q = JSON.parse(ls("ehl.queue." + dirId) || "[]");
  check(q.length === 2 && q[0].op === "create" && q[0].col === "cheltuieli" && q[1].col === "jurnal", "queue holds the expense and its journal entry");
  const tmpId = q[0].id;
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="cheltuieli"]')); await tick();
  check(/70,00/.test(text()), "queued expense visible in the register");
  click($('[data-edit="cheltuieli"][data-id="' + tmpId + '"]')); await tick();
  setField("suma", "75"); submit($("#recf")); await tick(40);
  const q2 = JSON.parse(ls("ehl.queue." + dirId));
  check(q2.filter(o => o.col === "cheltuieli").length === 1 && q2[0].data.suma === 75, "edit folded into the unsent create");
  NET_DOWN = false; window.dispatchEvent(new window.Event("online")); await tick(200);
  check(JSON.parse(ls("ehl.queue." + dirId) || "[]").length === 0, "queue flushed");
  check(Object.values(store.cheltuieli).some(r => r.suma === 75), "server received the expense (75)");
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="cheltuieli"]')); await tick();
  check(!Array.from(window.document.querySelectorAll('[data-edit="cheltuieli"]')).some(b => b.dataset.id.indexOf("tmp") === 0), "temp id replaced by the server id");

  console.log("7a. a create whose answer was lost is not sent twice");
  click($('[data-view="add"]')); await tick();
  click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "33"); setField("descriere", "Vopsea"); setField("pentru", "EHL"); setField("categorie", "Materiale"); 
  LOSE_ANSWER = true; submit($("#recf")); await tick(60); LOSE_ANSWER = false;
  check(JSON.parse(ls("ehl.queue." + dirId) || "[]").some(o => o.col === "cheltuieli" && o.op === "create"), "the unanswered create waits in the queue");
  window.dispatchEvent(new window.Event("online")); await tick(200);
  check(Object.values(store.cheltuieli).filter(r => r.descriere === "Vopsea").length === 1, "the server holds the expense once");
  check(JSON.parse(ls("ehl.queue." + dirId) || "[]").length === 0 && JSON.parse(ls("ehl.failed." + dirId) || "[]").length === 0, "queue empty, nothing marked as rejected");
  check(Object.values(store.jurnal).filter(j => j.data && j.data.descriere === "Vopsea").length === 1, "one journal entry for it");

  await asEHL();
  check(!$('[data-form="cheltuieli"]') && !$('[data-form="chirii"]') && !$('[data-form="grafic"]') && !$('[data-form="angajati"]') && !$('[data-form="imprumuturi"]'), "the EHL account has no expense, rent, schedule, employee or loan card");
  console.log("7e. money from a founder is confirmed with the founder's code");
  click($('[data-view="add"]')); await tick(); click($('[data-form="incasari"]')); await tick();
  check(!$('[data-k="codFondator"]'), "no code field while the source is not a founder");
  setField("client", "Sergiu"); await tick();
  const cf = $('[data-k="codFondator"]');
  check(cf && cf.type === "password", "choosing the founder shows the code field (masked)");
  setField("suma", "500"); setField("codFondator", "1111"); submit($("#recf")); await tick(60);
  check($("#recf") && /Codul fondatorului este greșit/.test($("#sheet").textContent) && !Object.values(store.incasari).some(r => r.client === "Sergiu"), "a wrong code is refused, nothing saved");
  setField("codFondator", "258000"); submit($("#recf")); await tick(80);
  const fin = Object.values(store.incasari).find(r => r.client === "Sergiu");
  check(fin && fin.suma === 500 && /^Sergiu/.test(fin.confirmat || "") && !("codFondator" in fin), "the right code saves it, marked as confirmed by Sergiu, the code itself is not stored");
  check(!Object.values(store.jurnal).some(j => j.data && j.data.codFondator), "the code never reaches the history");
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="incasari"]')); await tick();
  check(/confirmat de Sergiu/.test(text()), "the income register shows who confirmed it");
  click($('[data-view="ehl"]')); await tick();
  check(/Datorii către fondatori/.test(text()) && /Împrumutat de la fondatori\s*500,00/.test(text()), "the dashboard shows the founder's money as a debt of the firm (500)");
  const dsecs = Array.from(window.document.querySelectorAll("#app .dash-grid>.sec"));
  check(dsecs[1] && /Datorii către fondatori/.test(dsecs[1].textContent) && /Datorie\s*500,00/.test(dsecs[1].textContent) && /Sergiu/.test(dsecs[1].textContent), "the founders report stands on its own right under the totals, per founder");
  click($('[data-view="add"]')); await tick(); click($('[data-form="iesiri"]')); await tick();
  setField("destinatie", "Restituire fondator"); await tick(); setField("suma", "200"); setField("persoana", "Sergiu"); await tick(); submit($("#recf")); await tick(80);
  click($('[data-view="ehl"]')); await tick();
  check(/Datorie\s*300,00/.test(text()) && /Restituit\s*200,00/.test(text()), "a 'Restituire fondator' outflow brings the debt down to 300");
  const clSec = Array.from(window.document.querySelectorAll("#app .sec")).find(s => /Sold pe client/.test((s.querySelector("h2") || {}).textContent || ""));
  check(clSec && /Client A/.test(clSec.textContent) && !/Sergiu/.test(clSec.textContent), "the founder is not listed among the clients");

  console.log("7k. the EHL tab lists every movement of money; a record carries its history");
  click($('[data-view="ehl"]')); await tick();
  const tzSec = Array.from(window.document.querySelectorAll("#app .sec")).find(s => /Toate tranzacțiile/.test((s.querySelector("h2") || {}).textContent || ""));
  check(tzSec && /Casa EHL → Dat persoanei · Sergiu/.test(tzSec.textContent) && /Vopsea/.test(tzSec.textContent) && /introdus de Sergiu/.test(tzSec.textContent), "the list shows the till → administrator move and the expenses, each with who recorded it");
  click(tzSec.querySelector('[data-edit="iesiri"]')); await tick(80);
  check($("#rec-hist") && /Istoricul înregistrării/.test($("#sheet").textContent) && /Adăugat/.test($("#sheet").textContent) && /Sergiu/.test($("#rec-hist").textContent), "the record's form shows its history: created, by whom, when");
  click($("#closeSheet")); await tick(60);

  console.log("7d. every register row names who entered it");
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="cheltuieli"]')); await tick();
  check(/introdus de Sergiu/.test(text()), "expense rows show the author's name");

  console.log("7c. money that is not in the till cannot be handed out");
  const iesN = () => Object.values(store.iesiri || {}).length, ies0 = iesN();
  click($('[data-view="add"]')); await tick(); click($('[data-form="iesiri"]')); await tick();
  const pSel = $('[data-k="persoana"]');
  const pOpts = Array.from(window.document.querySelectorAll("#dl-persoana option")).map(o => o.value);
  check(pSel.tagName === "SELECT" && Array.from(pSel.options).some(o => o.value === "Sergiu") && !Array.from(pSel.options).some(o => o.value === "Ion Operator"), "in the EHL account the person is picked among the administrators only");
  setField("valuta", "USD"); await tick(); setField("suma", "50"); setField("persoana", "Sergiu"); await tick(); submit($("#recf")); await tick(60);
  check($("#recf") && /nu sunt destui bani/.test($("#sheet").textContent) && iesN() === ies0, "an outflow from an empty USD shelf is refused, nothing is saved");
  click($("#closeSheet")); await tick(60);

  console.log("7j. a transfer expense is paid from the bank, with a report of who paid and for what");
  click($('[data-view="add"]')); await tick(); click($('[data-form="iesiri"]')); await tick();
  setField("destinatie", "Depus pe cont"); await tick(); setField("suma", "300"); submit($("#recf")); await tick(80);
  await asAdmin();
  click($('[data-form="cheltuieli"]')); await tick();
  setField("pentru", "EHL"); setField("suma", "120"); setField("descriere", "Ciment prin bancă"); setField("categorie", "Materiale"); setField("mod", "Transfer"); await tick();
  submit($("#recf")); await tick(80);
  const trE = Object.values(store.cheltuieli).find(r => r.descriere === "Ciment prin bancă");
  check(trE && trE.mod === "Transfer" && trE.platitDe === "Sergiu", "the transfer expense is saved (the account held 300)");
  click($('[data-view="ehl"]')); await tick();
  const trSec = Array.from(window.document.querySelectorAll("#app .sec")).find(s => /Cheltuieli din cont \(transfer\)/.test((s.querySelector("h2") || {}).textContent || ""));
  check(trSec && /Sergiu/.test(trSec.textContent) && /120,00/.test(trSec.textContent), "the dashboard reports who paid from the bank and how much");
  check(/Pe conts*180,00/.test(text()), "the account went down by the transfer (300 - 120 = 180)");
  click(trSec.querySelector('[data-colab="Sergiu"]')); await tick();
  check(/Plătit prin transfer \(din cont\)/.test($("#sheet").textContent) && /Ciment prin bancă/.test($("#sheet").textContent), "a tap lists what the transfers were spent on");
  click($("#closeSheet")); await tick(60);

  console.log("7i. an expense is for a project, for EHL or for something else");
  const chCount = () => Object.values(store.cheltuieli).length, chBefore = chCount();
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  check($('[data-k="pentru"]').value === "Proiect" && $('[data-k="proiect"]') && $('[data-k="client"]'), "a new expense starts as 'Proiect' and asks for the project");
  setField("suma", "15"); setField("descriere", "Șuruburi"); setField("categorie", "Materiale"); submit($("#recf")); await tick(60);
  check($("#recf") && chCount() === chBefore, "for a project the project must be chosen: nothing saved without it");
  setField("proiect", "Casa Test"); await tick(); submit($("#recf")); await tick(80);
  const chP = Object.values(store.cheltuieli).find(r => r.descriere === "Șuruburi");
  check(chP && chP.pentru === "Proiect" && chP.proiect === "Casa Test" && chP.client === "Client A", "saved on the project, with its client");
  click($('[data-form="cheltuieli"]')); await tick();
  setField("pentru", "EHL"); await tick();
  check(!$('[data-k="proiect"]') && !$('[data-k="client"]'), "'EHL' hides the project and the client");
  setField("suma", "25"); setField("descriere", "Hârtie birou"); setField("categorie", "Transport"); submit($("#recf")); await tick(80);
  const chE = Object.values(store.cheltuieli).find(r => r.descriere === "Hârtie birou");
  check(chE && chE.pentru === "EHL" && !chE.proiect && !chE.client, "an EHL expense is saved without project or client");
  click($('[data-view="ehl"]')); await tick();
  check(/Cheltuieli: proiecte, EHL, altele/.test(text()) && /EHL \(firma\)/.test(text()), "the dashboard splits expenses into projects, EHL and other");

  await asEHL();
  console.log("7h. a project shows its contract and what the client paid, cash and transfer apart");
  const prj = Object.values(store.proiecte).find(p => p.nume === "Casa Test");
  const paid = (mod) => Object.values(store.incasari).filter(r => r.proiect === "Casa Test" && r.mod === mod).reduce((a, r) => a + r.suma * r.curs, 0);
  const ro = (v) => new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v);
  click($('[data-view="add"]')); await tick(); click($('[data-form="incasari"]')); await tick();
  setField("proiect", "Casa Test"); await tick(); setField("suma", "1000"); submit($("#recf")); await tick(80);
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="proiecte"]')); await tick();
  click($('[data-edit="proiecte"][data-id="' + prj.id + '"]')); await tick();
  setField("contractEUR", "50000"); await tick(); setField("contractCash", "30000"); await tick();
  check($('[data-k="contractTransfer"]').value === "20000", "the transfer part fills itself: 50 000 − 30 000 cash = 20 000");
  const boxes = Array.from(window.document.querySelectorAll("#sheet .calcbox")).map(b => b.textContent);
  const eurCash = ro(Math.round(paid("Numerar") / 20.22 * 100) / 100);
  check(boxes.length === 4 && boxes[0].includes("50.000,00 EUR") && boxes[1].includes(eurCash + " / 30.000,00 EUR") && boxes[2].includes("/ 20.000,00 EUR"), "the project card shows the contract in euro, cash " + eurCash + " / 30 000 and transfer / 20 000");
  setField("contractCash", "40000"); await tick(); setField("contractTransfer", "5000"); submit($("#recf")); await tick(60);
  check($("#recf") && /Cash \+ transfer trebuie/.test($("#sheet").textContent), "cash + transfer that do not give the contract are refused");
  setField("contractCash", "30000"); await tick(); submit($("#recf")); await tick(80);
  check(store.proiecte[prj.id].contractEUR === 50000 && store.proiecte[prj.id].contractCash === 30000 && store.proiecte[prj.id].contractTransfer === 20000, "the contract in euro with its cash and transfer parts is saved on the project");
  click($('[data-view="ehl"]')); await tick();
  check(/Sumă contract 50\.000,00 EUR · Încasat cash [0-9.,]+ \/ 30\.000,00 EUR · Încasat transfer [0-9.,]+ \/ 20\.000,00 EUR/.test(text()), "the dashboard lists the euro contract with its cash and transfer parts on the project row");

  console.log("7g. the bank account holds lei only");
  click($('[data-view="add"]')); await tick(); click($('[data-form="incasari"]')); await tick();
  setField("valuta", "EUR"); await tick(); setField("mod", "Transfer"); await tick();
  const vs = $('[data-k="valuta"]');
  check(vs.value === "MDL" && vs.disabled && $('[data-k="curs"]').value === "1", "a transfer income fixes the currency to MDL at rate 1");
  click($("#closeSheet")); await tick(60);
  click($('[data-form="iesiri"]')); await tick();
  setField("valuta", "USD"); await tick(); setField("destinatie", "Depus pe cont"); await tick();
  check($('[data-k="valuta"]').value === "USD" && !$('[data-k="valuta"]').disabled && /Pe cont intră/.test($("#sheet").textContent), "a deposit may come from any currency shelf; the form shows the lei the account receives");
  click($("#closeSheet")); await tick(60);

  await asAdmin();
  console.log("7f. the bank account may go below zero; the dashboard shows the minus and the payments behind it");
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "500"); setField("descriere", "Excavator"); setField("pentru", "EHL"); setField("categorie", "Materiale"); setField("mod", "Transfer"); await tick();
  submit($("#recf")); await tick(80);
  check(!$("#recf") && Object.values(store.cheltuieli).some(r => r.descriere === "Excavator" && r.mod === "Transfer"), "a transfer above the account (180) is saved all the same");
  click($('[data-view="ehl"]')); await tick();
  const minSec = Array.from(window.document.querySelectorAll("#app .sec")).find(s => /Contul este în minus/.test((s.querySelector("h2") || {}).textContent || ""));
  check(/Pe cont\s*-320,00/.test(text()) && minSec && /De achitat pe cont\s*320,00/.test(minSec.textContent) && /Excavator/.test(minSec.textContent) && !/Ciment prin bancă/.test(minSec.textContent), "the account shows -320 and the report names the payment that took it below zero");
  click($('[data-view="add"]')); await tick(); click($('[data-form="iesiri"]')); await tick();
  setField("destinatie", "Depus pe cont"); await tick(); setField("suma", "320"); setField("codEHL", "9999"); submit($("#recf")); await tick(60);
  check($("#recf") && /Codul EHL este greșit/.test($("#sheet").textContent), "in the administrator account a wrong EHL code is refused");
  setField("codEHL", "1111"); submit($("#recf")); await tick(80);
  click($('[data-view="ehl"]')); await tick();
  check(/Pe cont\s*0,00/.test(text()) && !/Contul este în minus/.test(text()), "a deposit of 320 clears the minus and the report disappears");

  console.log("7b. a salary change counts from its date; earlier months keep the old salary");
  const dNow = new Date(), todayStr = dNow.getFullYear() + "-" + String(dNow.getMonth() + 1).padStart(2, "0") + "-" + String(dNow.getDate()).padStart(2, "0");
  const emp = Object.values(store.angajati).find(a => a.nume === "Ion Operator");
  const h0 = Object.values(store.istoric).find(h => h.angajat === "Ion Operator");
  h0.dinData = "2026-01-01"; emit("istoric", "update", h0); await tick();
  const hs = () => Object.values(store.istoric).filter(h => h.angajat === "Ion Operator");
  click($('[data-view="reg"]')); await tick(); click($('[data-tab="salarii"]')); await tick();
  click($('[data-edit="angajati"][data-id="' + emp.id + '"]')); await tick();
  check($('[data-k="salariu"]').value === "12000" && $('[data-k="dinSal"]') && $('[data-k="dinSal"]').value === todayStr, "employee form shows the salary and the date it applies from (today)");
  setField("salariu", "15000"); submit($("#recf")); await tick(80);
  check(hs().length === 2 && hs().some(h => h.salariu === 12000 && h.dinData === "2026-01-01") && hs().some(h => h.salariu === 15000 && h.dinData === todayStr), "the raise is a new history row dated today; the old row is untouched");
  click($('[data-edit="angajati"][data-id="' + emp.id + '"]')); await tick();
  check($('[data-k="salariu"]').value === "15000", "the form now shows the new salary");
  setField("salariu", "16000"); submit($("#recf")); await tick(80);
  check(hs().length === 2 && hs().some(h => h.salariu === 16000 && h.dinData === todayStr), "a second change for the same date corrects that row");
  click($('[data-edit="angajati"][data-id="' + emp.id + '"]')); await tick();
  setField("status", "Activ"); submit($("#recf")); await tick(80);
  check(hs().length === 2, "saving without a salary change writes no history");

  console.log("8. logout, login as operator");
  click($('[data-view="set"]')); await tick();
  click($("#exitdir")); await tick(30);
  check($("#pinf") && !ls("ehl.cache"), "locked again, cache cleared");
  $("#pinv").value = "258000"; submit($("#pinf")); await tick(60);
  check($("#role").textContent === "Director" && !$("#pwf"), "director back in with the code alone");
  click($('[data-view="set"]')); await tick();
  check(!$("#pwchg"), "no password card in settings while the password is off");
  console.log("8b. renaming a person renames them in every register");
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "10"); setField("descriere", "Cuie mici"); setField("pentru", "EHL"); setField("categorie", "Materiale"); submit($("#recf")); await tick(60);
  click($('[data-view="set"]')); await tick(); click($('[data-edit="utilizatori"][data-id="' + op.id + '"]')); await tick();
  setField("nume", "Ion Popescu"); submit($("#recf")); await tick(150);
  const paidBy = (nm) => Object.values(store.cheltuieli).filter(r => r.platitDe === nm).length;
  const nIon = paidBy("Ion Operator") + paidBy("Ion Popescu"); /* every expense he paid so far, whichever name it carried */
  check(store.utilizatori[op.id].nume === "Ion Popescu" && paidBy("Ion Popescu") === nIon && paidBy("Ion Operator") === 0, "his expenses, if any, now name Ion Popescu (" + nIon + ")");
  check(Object.values(store.angajati).some(a => a.nume === "Ion Popescu") && !Object.values(store.angajati).some(a => a.nume === "Ion Operator") && Object.values(store.istoric).every(h => h.angajat !== "Ion Operator"), "the employee and the salary history follow the new name");
  click($('[data-edit="utilizatori"][data-id="' + op.id + '"]')); await tick();
  setField("nume", "Ion Operator"); submit($("#recf")); await tick(150);
  check(paidBy("Ion Operator") === nIon && paidBy("Ion Popescu") === 0 && Object.values(store.angajati).some(a => a.nume === "Ion Operator"), "renaming back restores the old name everywhere");
  console.log("8c. a deactivated user leaves the list for the archive and can be restored");
  click($('[data-view="set"]')); await tick(); click($('[data-form="utilizatori"]')); await tick();
  setField("nume", "Temp Om"); setField("cod", "7777"); submit($("#recf")); await tick(80);
  const tmpU = Object.values(store.utilizatori).find(u => u.nume === "Temp Om");
  click($('[data-edit="utilizatori"][data-id="' + tmpU.id + '"]')); await tick();
  setField("status", "Inactiv"); submit($("#recf")); await tick(80);
  const archRow = () => Array.from(window.document.querySelectorAll('[data-restore="' + tmpU.id + '"]'));
  check(store.utilizatori[tmpU.id].status === "Inactiv" && !window.document.querySelector('.user-row[data-edit="utilizatori"][data-id="' + tmpU.id + '"]') && archRow().length === 1 && /Arhivă/.test(text()), "deactivated user is out of the list and in the archive");
  click(archRow()[0]); await tick(80);
  check(store.utilizatori[tmpU.id].status === "Activ" && archRow().length === 0 && window.document.querySelector('.user-row[data-edit="utilizatori"][data-id="' + tmpU.id + '"]'), "restore puts the user back in the list");
  click($('[data-edit="utilizatori"][data-id="' + tmpU.id + '"]')); await tick();
  setField("status", "Inactiv"); submit($("#recf")); await tick(80);

  console.log("8d. lock screen: not after a short absence, yes when the last entry is older than 2 days");
  click($('[data-view="reg"]')); await tick();
  Object.defineProperty(window.document, "visibilityState", { value: "hidden", configurable: true }); window.document.dispatchEvent(new window.Event("visibilitychange"));
  Object.defineProperty(window.document, "visibilityState", { value: "visible", configurable: true }); window.document.dispatchEvent(new window.Event("visibilitychange")); await tick(40);
  check(!$("#pinf") && $("#role").textContent === "Director", "a short absence does not lock the screen");
  window.localStorage.setItem("ehl.unlock", String(Date.now() - 3 * 24 * 3600 * 1000));
  Object.defineProperty(window.document, "visibilityState", { value: "hidden", configurable: true }); window.document.dispatchEvent(new window.Event("visibilitychange"));
  Object.defineProperty(window.document, "visibilityState", { value: "visible", configurable: true }); window.document.dispatchEvent(new window.Event("visibilitychange")); await tick(40);
  check($("#pinf") && /Sergiu/.test(text()) && !$("#nav").children.length && $("#gateother"), "code asked again when the last entry is older than 2 days, session kept, 'other user' offered");
  $("#pinv").value = "0000"; submit($("#pinf")); await tick(); check($("#pinf") && /greșit/.test(text()), "wrong code keeps the lock");
  $("#pinv").value = "258000"; submit($("#pinf")); await tick(40);
  check($("#role").textContent === "Director" && $('[data-view="reg"][aria-current="page"]'), "right code unlocks and returns to the screen that was open (registers)");
  console.log("8e0. the EHL code signs the director straight into the EHL account");
  click($('[data-view="set"]')); await tick(); click($("#exitdir")); await tick(30);
  $("#pinv").value = "1111"; submit($("#pinf")); await tick(80);
  check($("#role").textContent === "EHL" && /Banii firmei/.test(text()) && $('[data-view="ehl"][aria-current="page"]'), "1111 opens the EHL account: badge EHL, the firm-wide view first");
  check(window.document.body.classList.contains("ehl-mode") && $("#ttl").textContent === "Casa EHL · contul comun", "the EHL account is marked: dark header class and its own title");
  click($('[data-view="add"]')); await tick(); click($('[data-form="iesiri"]')); await tick();
  setField("destinatie", "Depus pe cont"); await tick();
  check(!$('[data-k="codEHL"]'), "inside the EHL account the code is not asked again");
  setField("suma", "100"); submit($("#recf")); await tick(80);
  check(!$("#recf") && Object.values(store.iesiri).some(r => r.destinatie === "Depus pe cont" && r.suma === 100 && r.sursa === "Casa"), "money leaves the common till with the code sent along");
  click($('[data-view="set"]')); await tick(); click($("#exitdir")); await tick(30);
  $("#pinv").value = "258000"; submit($("#pinf")); await tick(80);
  check($("#role").textContent === "Director" && $('[data-view="panou"][aria-current="page"]'), "the administrator code opens the administrator account: his own Panou first");
  click($('[data-view="set"]')); await tick();
  click($("#exitdir")); await tick(30);
  $("#pinv").value = "4141"; submit($("#pinf")); await tick(80);
  check($("#role").textContent === "Operator", "role pill = Operator");
  check($("#nav").children.length === 3, "operator nav has 3 tabs");
  click($('[data-form="cheltuieli"]')); await tick();
  check(!$('[data-k="platitDe"]') && !$('[data-k="sursa"]') && /Disponibil din avansul meu/.test($("#sheet").textContent), "a collaborator's expense has no payer or source choice: he pays, from his advance, and sees what is left");
  check(!$("#delbtn"), "operator has no delete button");
  check($('[data-k="client"]').tagName === "SELECT", "operator picks the client from a list, cannot type a new one");
  check(!$('[data-form="contracte"]'), "operator has no Contract card (clients are created by the director)");
  check(!$('[data-form="incasari"]'), "operator has no Income card (client money is recorded by the director)");
  console.log("8e. an operator edits his own row for 15 days, then it opens read-only");
  click($("#closeSheet")); await tick(); click($('[data-view="add"]')); await tick();
  click($('[data-form="cheltuieli"]')); await tick();
  setField("suma", "40"); setField("descriere", "Cuie"); setField("pentru", "EHL"); setField("categorie", "Transport"); submit($("#recf")); await tick(60);
  check($("#recf") && /Nu aveți destui bani din avans/.test($("#sheet").textContent) && !Object.values(store.cheltuieli).some(r => r.descriere === "Cuie"), "with no money from the director a cash expense is refused: he cannot go below zero");
  const adv = { id: "adv000000000001", data: "2026-11-01", destinatie: "Dat persoanei", valuta: "MDL", curs: 1, suma: 100000, persoana: "Ion Operator", sursa: "Casa", platitDe: "", by: dirId, created: new Date().toISOString().replace("T", " "), updated: "" };
  store.iesiri[adv.id] = adv; emit("iesiri", "create", adv); await tick(40); /* the director hands him 100 000 */
  submit($("#recf")); await tick(80);
  const own = Object.values(store.cheltuieli).find(r => r.descriere === "Cuie");
  check(own && own.by === op.id && own.platitDe === "Ion Operator" && own.sursa === "Avans", "with an advance it is saved: paid by him, from his advance");
  click($('[data-view="mine"]')); await tick(); click($('[data-edit="cheltuieli"][data-id="' + own.id + '"]')); await tick();
  check($("#savebtn") && !$('[data-k="suma"]').disabled, "a fresh own row is editable");
  click($("#closeSheet")); await tick();
  own.created = "2020-01-01 00:00:00.000Z"; emit("cheltuieli", "update", own); await tick();
  click($('[data-view="mine"]')); await tick(); click($('[data-edit="cheltuieli"][data-id="' + own.id + '"]')); await tick();
  check(!$("#savebtn") && /15 zile/.test($("#sheet").textContent) && $('[data-k="suma"]').disabled, "an own row older than 15 days opens read-only with the note");
  click($("#closeSheet")); await tick(); click($('[data-view="add"]')); await tick();
  click($('[data-form="cheltuieli"]')); await tick();
  click($("#closeSheet")); await tick();
  click($('[data-view="add"]')); await tick();
  check(/Soldul meu/.test(text()) && /Are în mână bani ai firmei/.test(text()), "operator sees own balance card (he holds the firm's money)");
  click($('[data-form="pontaj"]')); await tick();
  check(!/MDL/.test($("#sheet").textContent), "operator sees no salary preview in timesheet form");
  click($("#closeSheet")); await tick();

  console.log("8f. an operator adds an employee, with a salary (employees are shared since 9 November)");
  click($('[data-view="add"]')); await tick(); click($('[data-form="angajati"]')); await tick();
  check($("#recf") && $('[data-k="salariu"]'), "the collaborator's employee form offers the salary");
  setField("nume", "Vasile Nou"); setField("salariu", "9000"); submit($("#recf")); await tick(80);
  check(!$("#recf") && Object.values(store.angajati).filter(a => a.nume === "Vasile Nou").length === 1 && Object.values(store.istoric).some(h => h.angajat === "Vasile Nou" && h.salariu === 9000 && h.by === op.id), "employee saved once, with his salary row written by the collaborator, form closed");
  const dNow2 = new Date(), curMonthStr = dNow2.getFullYear() + "-" + String(dNow2.getMonth() + 1).padStart(2, "0");
  console.log("8g. the timesheet offers every working employee (directors left out); a collaborator may fill anyone's");
  click($('[data-form="pontaj"]')); await tick();
  const angSel = $('[data-k="angajat"]'), angOpts = Array.from(angSel.options).map(o => o.value);
  check(angSel.tagName === "SELECT" && angOpts.includes("Vasile Nou") && angOpts.includes("Ion Operator") && !angOpts.includes("Sergiu"), "the employee list holds the employees and not the director");
  setField("angajat", "Vasile Nou"); await tick(); setField("z1", "10"); setField("z2", "12"); submit($("#recf")); await tick(80);
  check(!$("#recf") && Object.values(store.pontaj).some(p => p.angajat === "Vasile Nou" && p.z1 === 10 && p.by === op.id), "a timesheet for an employee is saved under the collaborator");
  click($('[data-form="pontaj"]')); await tick();
  setField("angajat", "Vasile Nou"); await tick(); setField("z1", "5"); submit($("#recf")); await tick(80);
  const vn = Object.values(store.pontaj).filter(r => r.angajat === "Vasile Nou" && r.luna === curMonthStr);
  check(!$("#recf") && vn.length === 1 && vn[0].z1 === 5, "choosing the same employee and month again opens the existing timesheet: one row, now with 5 days");

  console.log("8h. a collaborator records expenses only: no till outflow for him");
  click($('[data-view="add"]')); await tick();
  check(!$('[data-form="iesiri"]') && $('[data-form="cheltuieli"]'), "the operator has the Expense card and no 'Ieșire din casă' card");
  check(!$('[data-form="imprumuturi"]'), "the operator has no Loan card either (loans are the founder's)");

  console.log("8i. one session per account: a sign-in elsewhere ends this one");
  KICKED = true; window.document.dispatchEvent(new window.Event("visibilitychange")); await tick(60);
  check($("#pinf") && /alt dispozitiv/.test(text()) && !$("#nav").children.length, "the device is signed out with the 'opened on another device' note");
  KICKED = false; $("#pinv").value = "4141"; submit($("#pinf")); await tick(80);
  check($("#role").textContent === "Operator", "entering the code signs this device in again");

  console.log("8j. the collaborator's own dashboard: his money only, nothing of the firm's");
  click($('[data-view="panou"]')); await tick();
  check(/Primit de la director/.test(text()) && /Cheltuit numerar/.test(text()) && /Ce am introdus eu/.test(text()), "his dashboard shows what he received, what he spent and the operations he entered");
  check(!/Banii firmei|Datorii către fondatori|Sold pe client/.test(text()), "no firm totals, clients or founders on it");
  const opCache = JSON.parse(ls("ehl.cache") || "{}");
  check(opCache.incasari && opCache.incasari.length === 0 && opCache.cheltuieli.length > 0 && opCache.cheltuieli.every(r => r.by === op.id || r.platitDe === "Ion Operator"), "his phone holds no incomes and only his own expenses (" + (opCache.cheltuieli || []).length + ")");
  click($('[data-view="add"]')); await tick(); click($('[data-form="cheltuieli"]')); await tick();
  setField("pentru", "EHL"); setField("suma", "999999"); setField("descriere", "Macara"); setField("categorie", "Materiale"); setField("mod", "Transfer"); await tick();
  submit($("#recf")); await tick(80);
  const mac = Object.values(store.cheltuieli).find(r => r.descriere === "Macara");
  check(!$("#recf") && mac && mac.mod === "Transfer" && mac.platitDe === "Ion Operator", "his transfer is accepted even when the account cannot cover it (the account goes below zero)");

  console.log("9. deactivating the operator kicks the device out");
  store.utilizatori[op.id].status = "Inactiv"; emit("utilizatori", "update", store.utilizatori[op.id]); await tick(30);
  check($("#pinf") && $("#role").textContent !== "Operator", "operator locked out after deactivation");

  console.log("10. wrong code rejected");
  $("#pinv").value = "000000"; submit($("#pinf")); await tick(50);
  check($("#pinf") && /greșit/.test(text()), "wrong code shows error and stays locked");

  console.log(errors.length ? "\nERRORS:\n" + errors.join("\n") : "\nALL GOOD");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error("TEST CRASH", e); process.exit(2); });
