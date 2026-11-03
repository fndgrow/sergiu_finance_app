/* Drive the REAL app (app.js + PocketBase SDK) in jsdom against the live server through the SSH tunnel:
   boot with a stored director session -> lock screen -> code 1234 -> dashboard; compare the figures on screen with
   the independently recomputed ones (verify.json); then sign out and in as an operator by code.
   Usage: DIR_TOKEN=... node casieria-verify-ui.js <project folder> http://127.0.0.1:18090 <verify.json> */
const fs = require("fs"), path = require("path");
const APP = process.argv[2], URL_ = process.argv[3], EXP = JSON.parse(fs.readFileSync(process.argv[4], "utf8"));
const { JSDOM } = require(path.resolve(APP, "node_modules/jsdom"));
const html = fs.readFileSync(path.join(APP, "index.html"), "utf8").replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "").replace(/<link[^>]*>/g, "");
const dom = new JSDOM(html, { url: "https://casieria.test/", runScripts: "outside-only", pretendToBeVisual: true });
const { window } = dom; const errors = [];
window.addEventListener("error", e => errors.push("window error: " + (e.error && e.error.stack || e.message)));
window.matchMedia = () => ({ matches: false, addListener() {}, removeListener() {} });
window.scrollTo = () => {}; window.URL.createObjectURL = () => "blob:x"; window.URL.revokeObjectURL = () => {};
Object.defineProperty(window.navigator, "serviceWorker", { value: undefined });
window.fetch = (u, o) => globalThis.fetch(u, o); window.Headers = globalThis.Headers; window.Request = globalThis.Request; window.Response = globalThis.Response;
window.PB_URL = URL_; window.ExcelJS = undefined;
const tick = (ms = 100) => new Promise(r => setTimeout(r, ms));
const $ = s => window.document.querySelector(s), $$ = s => Array.from(window.document.querySelectorAll(s));
const text = () => $("#app").textContent.replace(/\s+/g, " ").trim();
const click = el => { if (!el) throw new Error("click target missing"); el.dispatchEvent(new window.MouseEvent("click", { bubbles: true })); };
const submit = f => f.dispatchEvent(new window.Event("submit", { bubbles: true, cancelable: true }));
const ok = (c, m) => { if (!c) { errors.push("CHECK FAILED: " + m); console.log("  FAIL " + m); } else console.log("  ok   " + m); };
const money = v => new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v || 0);
const has = (label, v) => ok(text().includes(v), label + " = " + v);
(async () => {
  /* a director session stored on this "phone" from a previous visit */
  window.localStorage.setItem("pocketbase_auth", JSON.stringify({ token: process.env.DIR_TOKEN, record: { id: "4ibcn283h5mx7yg", nume: "Director", rol: "Director", cod: "1234", status: "Activ", parolaSetata: true, collectionName: "utilizatori" } }));
  window.localStorage.setItem("ehl.cod", "1234"); window.localStorage.setItem("ehl.exp", String(Date.now() + 6 * 86400000));
  window.eval(fs.readFileSync(path.join(APP, "vendor/pocketbase.umd.js"), "utf8"));
  window.eval(fs.readFileSync(path.join(APP, "app.js"), "utf8"));
  await tick(300);
  console.log("== 1. start with a stored session: the lock screen");
  ok($("#pinf") && /Director/.test(text()) && !$("#nav").children.length, "code asked on start, name shown, nav hidden");
  $("#pinv").value = "9999"; submit($("#pinf")); await tick(); ok($("#pinf") && /greșit/.test(text()), "wrong code refused");
  $("#pinv").value = "1234"; submit($("#pinf")); await tick(4000);
  ok($("#role").textContent === "Director" && /Banii firmei/.test(text()), "right code opens the dashboard");
  console.log("== 2. dashboard figures vs independent recomputation");
  has("Banii firmei", money(EXP.totalFirma)); has("În casă", money(EXP.casaMDL)); has("Pe cont", money(EXP.bank));
  has("Încasări", money(EXP.incTotal)); has("Cheltuieli", money(EXP.cheltTotal));
  for (const v of Object.keys(EXP.till)) if (EXP.till[v]) has("shelf " + v, money(EXP.till[v]));
  for (const [p, x] of Object.entries(EXP.persons)) has("person " + p + " rămas", money(x.ramas));
  has("rest de justificat", money(EXP.colabRamas));
  has("contracts left", money(EXP.contrRamas)); has("contracts %", new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(EXP.contrPct) + "%");
  has("salaries rest", money(EXP.salRest)); has("loans open", money(EXP.imprRamas));
  const t = text(); ok(/Andrei Cebotari/.test(t) && /Dumitru Sava/.test(t), "collaborator report lists people without a login too");
  console.log("  salaries on screen: " + (t.match(/Câștigat.{0,160}/) || [""])[0] + " || " + (t.match(/Rest de achitat.{0,30}/) || [""])[0]);
  console.log("== 3. registers, salaries, journal open without errors");
  for (const tab of ["incasari", "cheltuieli", "iesiri", "proiecte", "chirii", "contracte", "imprumuturi", "salarii", "jurnal"]) {
    click($('[data-view="reg"]')); await tick(80); click($('[data-tab="' + tab + '"]')); await tick(150);
    if (tab === "jurnal") { submit($("#jurf")); await tick(1500); }
    ok(text().length > 40 && !/Nimic încă/.test(text()), "register " + tab + " renders with data");
  }
  ok(/Modificat/.test(text()) && /Șters/.test(text()) && /Adăugat/.test(text()), "journal shows add, edit and delete entries");
  click($('[data-view="reg"]')); await tick(80); click($('[data-tab="salarii"]')); await tick(150);
  const st = text(); ok(/Ion Popescu/.test(st) && /17\.000,00/.test(st), "salary list shows Ion's raised salary 17 000");
  console.log("== 4. collaborator detail sheet");
  click($('[data-view="panou"]')); await tick(200); click($('[data-colab="Dumitru Sava"]')); await tick(150);
  ok(/din banii proprii/.test($("#sheet").textContent) && /Firma îi datorează/.test($("#sheet").textContent), "Dumitru: company owes him, own-money total shown");
  click($("#closeSheet")); await tick(100);
  console.log("== 5. sign out, sign in as the foreman by code");
  click($('[data-view="set"]')); await tick(100); click($("#exitdir")); await tick(300);
  ok($("#pinf") && !window.localStorage.getItem("ehl.cod"), "signed out, remembered director code dropped");
  $("#pinv").value = "4401"; submit($("#pinf")); await tick(3500);
  ok($("#role").textContent === "Operator" && /Ion Popescu/.test(text()), "Ion Popescu is in as operator");
  ok(/Soldul meu/.test(text()) && text().includes(money(EXP.persons["Ion Popescu"].ramas)), "Ion sees his own balance " + money(EXP.persons["Ion Popescu"].ramas));
  click($('[data-view="mine"]')); await tick(200); ok(/Dumitru Sava/.test(text()) || $$('[data-edit]').length > 10, "Ale mele lists Ion's entries (incl. the ones he typed for Dumitru)");
  click($('[data-view="add"]')); await tick(150); click($('[data-form="cheltuieli"]')); await tick(100);
  const opts = Array.from($('[data-k="proiect"]').options || []).map(o => o.value).filter(Boolean);
  ok(opts.includes("Teren sport Stăuceni") && !opts.includes("Vila Codru") && !opts.includes("Hală Bubuieci"), "Ion's project list: only his active projects: " + opts.join(", "));
  click($("#closeSheet")); await tick(50);
  console.log("== 6. deactivated worker cannot sign in");
  click($('[data-view="add"]')); await tick(60); click($("#exitdir")); await tick(300);
  $("#pinv").value = "4404"; submit($("#pinf")); await tick(1500);
  ok($("#pinf") && /dezactivat|greșit/.test(text()), "Andrei (inactive) is refused");
  console.log(errors.length ? "\nERRORS:\n" + errors.join("\n") : "\nALL GOOD");
  process.exit(errors.length ? 1 : 0);
})().catch(e => { console.error("CRASH", e); process.exit(2); });
