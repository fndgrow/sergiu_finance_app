/* Recompute every dashboard figure from the raw records with the README formulas (independently of app.js),
   compare with the generator's ledger, and save a JSON of expected on-screen values. Runs on the server. */
const fs = require("fs"); const B = "http://127.0.0.1:8090";
async function api(p, body, tok, m) { const r = await fetch(B + p, { method: m || (body ? "POST" : "GET"), headers: { "Content-Type": "application/json", ...(tok ? { Authorization: tok } : {}) }, body: body ? JSON.stringify(body) : undefined }); const j = await r.json(); if (!r.ok) throw new Error(p + " " + r.status + " " + JSON.stringify(j).slice(0, 200)); return j; }
async function all(c, tok) { const out = []; for (let page = 1; ; page++) { const j = await api("/api/collections/" + c + "/records?perPage=500&page=" + page + "&skipTotal=1", null, tok); out.push(...j.items); if (j.items.length < 500) return out; } }
const r2 = x => Math.round(x * 100) / 100, n = v => { const x = parseFloat(v); return isFinite(x) ? x : 0; };
const same = (a, b) => String(a || "").trim().toLowerCase() === String(b || "").trim().toLowerCase();
const sum = (arr, f) => r2(arr.reduce((a, r) => a + (f(r) || 0), 0));
(async () => {
  const adm = fs.readFileSync("/opt/casieria/ADMIN.txt", "utf8");
  const su = (await api("/api/collections/_superusers/auth-with-password", { identity: adm.match(/email:\s*(\S+)/)[1], password: adm.match(/password:\s*(\S+)/)[1] })).token;
  const dir = await api("/api/collections/utilizatori/impersonate/4ibcn283h5mx7yg", { duration: 3600 }, su);
  const T = dir.token, S = {};
  for (const c of ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "utilizatori", "config", "jurnal"]) S[c] = await all(c, T);
  const cfg = S.config[0], cashier = (cfg.casier || "").trim(), rateAzi = cod => (cfg.valute.find(v => v.cod === cod) || { curs: 1 }).curs;
  const vals = cfg.valute.map(v => v.cod);
  const chTot = r => n(r.chirie) + n(r.gaj) + n(r.comunale) + n(r.avarii);
  const out = { counts: Object.fromEntries(Object.entries(S).map(([k, v]) => [k, v.length])) };
  out.till = {}; out.casaMDL = 0;
  for (const v of vals) {
    const intrat = sum(S.incasari, r => r.mod === "Numerar" && r.valuta === v ? n(r.suma) : 0);
    const ies = sum(S.iesiri, r => r.valuta === v && ["Depus pe cont", "Salarii", "Împrumut", "Alte"].includes(r.destinatie) ? n(r.suma) : 0)
      + sum(S.iesiri, r => r.valuta === v && r.destinatie === "Dat persoanei" && !(cashier && same(r.persoana, cashier)) ? n(r.suma) : 0)
      + sum(S.chirii, r => r.mod === "Numerar" && r.valuta === v ? chTot(r) : 0)
      + (v === "MDL" ? sum(S.cheltuieli, r => r.mod === "Numerar" && cashier && same(r.platitDe, cashier) ? n(r.suma) : 0) : 0);
    out.till[v] = r2(intrat - ies); out.casaMDL = r2(out.casaMDL + out.till[v] * rateAzi(v));
  }
  out.bank = r2(sum(S.incasari, r => r.mod === "Transfer" ? n(r.suma) * n(r.curs) : 0) + sum(S.iesiri, r => r.destinatie === "Depus pe cont" ? n(r.suma) * n(r.curs) : 0)
    - sum(S.cheltuieli, r => r.mod === "Transfer" ? n(r.suma) : 0) - sum(S.chirii, r => r.mod === "Transfer" ? chTot(r) * n(r.curs) : 0));
  out.incTotal = sum(S.incasari, r => n(r.suma) * n(r.curs)); out.cheltTotal = sum(S.cheltuieli, r => n(r.suma));
  const names = [...new Set(S.iesiri.filter(r => r.destinatie === "Dat persoanei").map(r => r.persoana.trim()).concat(S.cheltuieli.filter(r => r.mod === "Numerar").map(r => r.platitDe.trim())))].filter(p => !(cashier && same(p, cashier)));
  out.persons = {}; let colab = 0;
  for (const p of names) { const primit = sum(S.iesiri, r => r.destinatie === "Dat persoanei" && same(r.persoana, p) ? n(r.suma) * n(r.curs) : 0), chelt = sum(S.cheltuieli, r => r.mod === "Numerar" && same(r.platitDe, p) ? n(r.suma) : 0), prop = sum(S.cheltuieli, r => r.mod === "Numerar" && r.sursa === "Proprii" && same(r.platitDe, p) ? n(r.suma) : 0); out.persons[p] = { primit, cheltuit: chelt, proprii: prop, ramas: r2(primit - chelt) }; colab = r2(colab + primit - chelt); }
  out.colabRamas = colab; out.totalFirma = r2(out.casaMDL + out.bank + colab);
  out.contracts = S.contracte.map(k => { const cash = sum(S.incasari, r => same(r.client, k.client) && r.mod === "Numerar" ? n(r.suma) * n(r.curs) : 0), tr = sum(S.incasari, r => same(r.client, k.client) && r.mod === "Transfer" ? n(r.suma) * n(r.curs) : 0); return { client: k.client, nota: k.nota, val: n(k.sumaContract), incCash: cash, incTr: tr, ramas: r2(n(k.sumaContract) - cash - tr) }; });
  out.contrVal = sum(out.contracts, x => x.val); out.contrInc = sum(out.contracts, x => x.incCash + x.incTr); out.contrRamas = r2(out.contrVal - out.contrInc); out.contrPct = out.contrVal ? r2(out.contrInc / out.contrVal * 100) : 0;
  const wd = ym => { const y = +ym.slice(0, 4), m = +ym.slice(5, 7), d = new Date(y, m, 0).getDate(); let c = 0; for (let i = 1; i <= d; i++) if (new Date(y, m - 1, i).getDay() !== 0) c++; return c; };
  const salAt = (a, date) => { let best = null; for (const h of S.istoric) if (same(h.angajat, a) && h.dinData <= date && (!best || h.dinData > best.dinData)) best = h; if (!best) for (const h of S.istoric) if (same(h.angajat, a) && (!best || h.dinData < best.dinData)) best = h; return best ? n(best.salariu) : 0; };
  const monthEnd = ym => ym + "-" + String(new Date(+ym.slice(0, 4), +ym.slice(5, 7), 0).getDate()).padStart(2, "0");
  const pont = S.pontaj.map(p => { const w = wd(p.luna), s = salAt(p.angajat, monthEnd(p.luna)); return { luna: p.luna, total: r2((n(p.z1) + n(p.z2)) * (w ? s / w : 0)) }; });
  const luni = [...new Set(pont.map(p => p.luna).concat(S.iesiri.filter(r => r.destinatie === "Salarii").map(r => r.luna)))].sort();
  out.salLuni = luni.map(l => ({ luna: l, castigat: sum(pont, p => p.luna === l ? p.total : 0), platit: sum(S.iesiri, r => r.destinatie === "Salarii" && r.luna === l ? n(r.suma) * n(r.curs) : 0) })).map(m => ({ ...m, rest: r2(m.castigat - m.platit) }));
  out.salCastigat = sum(out.salLuni, m => m.castigat); out.salPlatit = sum(out.salLuni, m => m.platit); out.salRest = r2(out.salCastigat - out.salPlatit);
  out.imprTotal = sum(S.imprumuturi, r => n(r.suma)); out.imprRestituit = sum(S.imprumuturi, r => r.status === "Achitat" ? n(r.suma) : 0); out.imprRamas = r2(out.imprTotal - out.imprRestituit);
  out.imprRestante = S.imprumuturi.filter(r => r.status !== "Achitat" && r.termen && r.termen < "2026-11-03").length;
  out.clients = [...new Set(S.incasari.map(r => r.client.trim().toLowerCase()))].length; out.clientsRaw = [...new Set(S.incasari.map(r => r.client.trim()))];
  out.proiecte = S.proiecte.map(p => ({ nume: p.nume, status: p.status, buget: n(p.buget), chelt: sum(S.cheltuieli, r => same(r.proiect, p.nume) ? n(r.suma) : 0), inc: sum(S.incasari, r => same(r.proiect, p.nume) ? n(r.suma) * n(r.curs) : 0) }));
  out.checks = [];
  for (const v of vals) if (out.till[v] < 0) out.checks.push("NEGATIVE SHELF " + v + " " + out.till[v]);
  if (out.bank < 0) out.checks.push("NEGATIVE BANK");
  const bad = S.cheltuieli.filter(r => String(r.descriere || "").trim().length < 3); if (bad.length) out.checks.push("expenses without description: " + bad.length);
  const noSrc = S.cheltuieli.filter(r => r.mod === "Numerar" && !r.sursa); if (noSrc.length) out.checks.push("cash expenses without sursa: " + noSrc.length);
  const byAuthor = {}; for (const c of ["incasari", "cheltuieli", "iesiri", "chirii", "pontaj"]) for (const r of S[c]) { const u = S.utilizatori.find(x => x.id === r.by); const k = u ? u.nume : "?"; byAuthor[k] = (byAuthor[k] || 0) + 1; } out.byAuthor = byAuthor;
  out.jurnalActs = S.jurnal.reduce((a, j) => (a[j.act] = (a[j.act] || 0) + 1, a), {});
  out.users = S.utilizatori.map(u => u.nume + " " + u.rol + " " + u.cod + " " + u.status);
  const ex = JSON.parse(fs.readFileSync("/root/casieria-seed-expected.json", "utf8")); const diffs = [];
  for (const v of vals) if (Math.abs((ex.till[v] || 0) - out.till[v]) > 0.01) diffs.push("till " + v + ": generator " + ex.till[v] + " vs records " + out.till[v]);
  if (Math.abs(ex.bank - out.bank) > 0.01) diffs.push("bank: " + ex.bank + " vs " + out.bank);
  if (Math.abs(ex.incomeMDL - out.incTotal) > 0.01) diffs.push("incomes: " + ex.incomeMDL + " vs " + out.incTotal);
  if (Math.abs(ex.expenseMDL - out.cheltTotal) > 0.01) diffs.push("expenses: " + ex.expenseMDL + " vs " + out.cheltTotal);
  for (const [p, v] of Object.entries(ex.persons)) { const o = out.persons[p]; if (!o || Math.abs(o.ramas - v.ramas) > 0.01 || Math.abs(o.proprii - v.proprii) > 0.01) diffs.push("person " + p + ": generator " + JSON.stringify(v) + " vs records " + JSON.stringify(o)); }
  for (const m of out.salLuni) { const a = ex.salaryAccrued[m.luna] || 0, p = ex.salaryPaid[m.luna] || 0; if (Math.abs(a - m.castigat) > 0.01 || Math.abs(p - m.platit) > 0.01) diffs.push("salary " + m.luna + ": generator " + a + "/" + p + " vs records " + m.castigat + "/" + m.platit); }
  out.generatorDiffs = diffs;
  fs.writeFileSync("/root/casieria-verify.json", JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out));
})().catch(e => { console.error("VERIFY FAILED", e); process.exit(1); });
