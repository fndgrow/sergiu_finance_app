/// <reference path="../pb_data/types.d.ts" />
/* Casieria EHL — server hooks.
   Handlers cannot share functions declared outside them (PocketBase JS VM rule), so helpers are inlined. */

var DATA_COLS = ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "schimburi", "proiecte", "angajati", "istoric", "pontaj", "jurnal"];

/* ---- the app files (pb_public) are always revalidated: without this header a phone may keep an old app.js
        in its HTTP cache for hours after a deploy. The API and the admin UI are left alone. ---- */
routerUse((e) => {
  var p = String(e.request.url.path || "");
  if (p.indexOf("/api/") !== 0 && p.indexOf("/_/") !== 0) e.response.header().set("Cache-Control", "no-cache");
  return e.next();
});

/* ---- login by access code: POST /api/ehl/login {cod} -> {token, record, first} ---- */
routerAdd("POST", "/api/ehl/login", (e) => {
  var body = e.requestInfo().body || {};
  var cod = String(body.cod || "").trim();
  if (!/^[0-9]{4,8}$/.test(cod)) throw new BadRequestError("Cod invalid.");

  var ip = e.realIP() || "unknown";
  var since = new Date(Date.now() - 15 * 60 * 1000).toISOString().replace("T", " ").slice(0, 19);
  var tries = $app.countRecords("login_attempts", $dbx.exp("ip = {:ip} AND created >= {:since}", { ip: ip, since: since }));
  if (tries >= 8) throw new ApiError(429, "Prea multe încercări. Așteptați 15 minute.", {});

  var rec = null;
  try { rec = $app.findFirstRecordByFilter("utilizatori", "cod = {:cod}", { cod: cod }); } catch (err) { rec = null; }
  /* a director's EHL code opens the EHL account (the common till, the firm-wide view) */
  var viaEHL = false;
  if (!rec) { try { rec = $app.findFirstRecordByFilter("utilizatori", "rol = 'Director' && codEHL = {:cod}", { cod: cod }); viaEHL = !!rec; } catch (err) { rec = null; } }

  var first = false;
  if (!rec && $app.countRecords("utilizatori") === 0) {
    /* first launch: the first code typed becomes the director */
    var col = $app.findCollectionByNameOrId("utilizatori");
    rec = new Record(col);
    rec.set("nume", "Director");
    rec.set("rol", "Director");
    rec.set("cod", cod);
    rec.set("status", "Activ");
    rec.set("email", $security.randomStringWithAlphabet(12, "abcdefghijklmnopqrstuvwxyz") + "@casieria.local");
    rec.setPassword($security.randomString(32));
    $app.save(rec);
    if ($app.countRecords("config") === 0) {
      var cfg = new Record($app.findCollectionByNameOrId("config"));
      cfg.set("valute", [{ cod: "MDL", curs: 1 }, { cod: "EUR", curs: 20.22 }, { cod: "USD", curs: 17.5 }]);
      cfg.set("casier", "");
      cfg.set("categorii", ["Materiale", "Transport", "Combustibil", "Unelte", "Birou", "Taxe", "Reparații", "Diverse"]);
      $app.save(cfg);
    }
    first = true;
  }

  var fail = function (msg) {
    var att = new Record($app.findCollectionByNameOrId("login_attempts"));
    att.set("ip", ip);
    $app.save(att);
    try {
      var old = new Date(Date.now() - 24 * 3600 * 1000).toISOString().replace("T", " ").slice(0, 19);
      $app.db().newQuery("DELETE FROM login_attempts WHERE created < {:old}").bind({ old: old }).execute();
    } catch (err) {}
    throw new UnauthorizedError(msg);
  };
  if (!rec || rec.getString("status") === "Inactiv") fail("Cod greșit sau utilizator dezactivat.");

  var pub = { id: rec.id, nume: rec.getString("nume"), rol: rec.getString("rol"), cod: rec.getString("cod"), codEHL: rec.getString("codEHL"), status: rec.getString("status"), parolaSetata: rec.getBool("parolaSetata") };

  /* operators: the code is enough, token for a year */
  if (rec.getString("rol") !== "Director") {
    /* one session per account: a new sign-in changes the token key, so the token of any other device stops working */
    rec.refreshTokenKey(); $app.save(rec);
    return e.json(200, { token: rec.newAuthToken(), first: first, record: pub });
  }

  /* directors: for now the code is enough for them too (the firm's decision). PAROLA_DIRECTOR = true brings back
     the password tied to the phone session, asked again every 7 days (the token simply expires). */
  var PAROLA_DIRECTOR = false;
  if (!PAROLA_DIRECTOR) {
    /* one session per account: a new sign-in changes the token key, so the token of any other device stops working.
       The EHL sign-in is an extra access and leaves the administrator session alone. */
    if (!viaEHL) { rec.refreshTokenKey(); $app.save(rec); }
    return e.json(200, { token: rec.newAuthToken(), first: first, record: pub, ehl: viaEHL });
  }
  var WEEK = 7 * 24 * 3600;
  var parola = String(body.parola || "");
  var noua = String(body.parolaNoua || "");
  if (!rec.getBool("parolaSetata")) {
    if (!noua) return e.json(200, { needSetPassword: true, first: first, record: pub });
    if (noua.length < 8) throw new BadRequestError("Parola trebuie să aibă cel puțin 8 caractere.");
    rec.setPassword(noua);
    rec.set("parolaSetata", true);
    $app.save(rec);
    pub.parolaSetata = true;
    return e.json(200, { token: rec.newStaticAuthToken(WEEK * 1000000000), expires: Date.now() + WEEK * 1000, first: first, record: pub });
  }
  if (!parola) return e.json(200, { needPassword: true, record: pub });
  if (!rec.validatePassword(parola)) fail("Parolă greșită.");
  rec.refreshTokenKey(); $app.save(rec);
  return e.json(200, { token: rec.newStaticAuthToken(WEEK * 1000000000), expires: Date.now() + WEEK * 1000, record: pub });
});

/* ---- director changes own password: POST /api/ehl/password {veche, noua} ---- */
routerAdd("POST", "/api/ehl/password", (e) => {
  var body = e.requestInfo().body || {};
  var rec = e.auth;
  if (!rec || rec.getString("rol") !== "Director") throw new ForbiddenError("Doar directorul are parolă.");
  var veche = String(body.veche || ""), noua = String(body.noua || "");
  if (noua.length < 8) throw new BadRequestError("Parola nouă trebuie să aibă cel puțin 8 caractere.");
  if (rec.getBool("parolaSetata") && !rec.validatePassword(veche)) throw new BadRequestError("Parola actuală este greșită.");
  rec.setPassword(noua);
  rec.set("parolaSetata", true);
  $app.save(rec);
  /* a password change invalidates every token of the user, so hand back a fresh one for this phone */
  var WEEK = 7 * 24 * 3600;
  return e.json(200, { ok: true, token: rec.newStaticAuthToken(WEEK * 1000000000), expires: Date.now() + WEEK * 1000 });
}, $apis.requireAuth("utilizatori"));

/* ---- the director wipes everything for a fresh start: every register, the schedule, the journal and every account
        that is not a director's. The settings and the director accounts stay. Confirmed with the director's own code.
        POST /api/ehl/reset {cod} ---- */
routerAdd("POST", "/api/ehl/reset", (e) => {
  var body = e.requestInfo().body || {}, rec = e.auth;
  if (!rec || rec.getString("rol") !== "Director") throw new ForbiddenError("Doar directorul poate șterge datele.");
  if (String(body.cod || "").trim() === "" || String(body.cod || "").trim() !== rec.getString("cod")) throw new BadRequestError("Codul de acces este greșit.");
  var cols = ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "schimburi", "proiecte", "angajati", "istoric", "pontaj", "grafic", "jurnal"];
  $app.runInTransaction(function (tx) {
    cols.forEach(function (c) { tx.db().newQuery("DELETE FROM {{" + c + "}}").execute(); });
    tx.db().newQuery("DELETE FROM {{utilizatori}} WHERE rol != 'Director'").execute();
  });
  return e.json(200, { ok: true });
}, $apis.requireAuth("utilizatori"));

/* ---- a person is renamed everywhere at once (director only): users, employees and every row that carries the name,
        whoever wrote it; the journal's author names too. The update hooks keep payer/person fields from the original on
        purpose, so the rename is done here, in SQL, in one transaction.   POST /api/ehl/rename {vechi, nou} ---- */
routerAdd("POST", "/api/ehl/rename", (e) => {
  var body = e.requestInfo().body || {}, rec = e.auth;
  if (!rec || rec.getString("rol") !== "Director") throw new ForbiddenError("Doar directorul poate redenumi.");
  var vechi = String(body.vechi || "").trim(), nou = String(body.nou || "").trim();
  if (!vechi || !nou) throw new BadRequestError("Lipsește numele vechi sau cel nou.");
  if (vechi !== nou) {
    var where = [["utilizatori", "nume"], ["angajati", "nume"], ["cheltuieli", "platitDe"], ["iesiri", "persoana"], ["iesiri", "platitDe"],
      ["imprumuturi", "persoana"], ["chirii", "chirias"], ["chirii", "platitDe"], ["pontaj", "angajat"], ["istoric", "angajat"],
      ["grafic", "angajat"], ["schimburi", "persoana"], ["jurnal", "nume"], ["incasari", "client"]];
    $app.runInTransaction(function (tx) {
      where.forEach(function (w) {
        tx.db().newQuery("UPDATE {{" + w[0] + "}} SET [[" + w[1] + "]] = {:nou} WHERE TRIM([[" + w[1] + "]]) = {:vechi}").bind({ nou: nou, vechi: vechi }).execute();
      });
      /* the responsible of a project is a comma list */
      tx.db().newQuery("UPDATE {{proiecte}} SET [[responsabili]] = REPLACE([[responsabili]], {:vechi}, {:nou}) WHERE [[responsabili]] LIKE {:like}").bind({ vechi: vechi, nou: nou, like: "%" + vechi + "%" }).execute();
    });
  }
  /* the directors' names in the settings follow (a director may correct his own name) */
  var names = [];
  try { $app.findRecordsByFilter("utilizatori", "rol = 'Director' && status != 'Inactiv'", "", 0, 0).forEach(function (r) { names.push(r.getString("nume")); }); } catch (err) {}
  try { var cfg = $app.findFirstRecordByFilter("config", "id != ''"); cfg.set("directori", names); $app.save(cfg); } catch (err) {}
  return e.json(200, { ok: true });
}, $apis.requireAuth("utilizatori"));

/* ---- every register row carries its author, set by the server, never by the client ---- */
onRecordCreateRequest((e) => {
  if (e.auth) e.record.set("by", e.auth.id);
  e.next();
}, "incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "schimburi", "proiecte", "angajati", "istoric", "pontaj", "grafic", "jurnal");

onRecordUpdateRequest((e) => {
  /* the author never changes on edit */
  if (e.record.original) e.record.set("by", e.record.original().getString("by"));
  /* an operator may correct his own rows for 15 days; afterwards only the director (employee cards excepted) */
  if (e.auth && e.auth.getString("rol") !== "Director" && e.record.original && e.record.collection().name !== "angajati") {
    var createdMs = Date.parse(String(e.record.original().getString("created")).replace(" ", "T"));
    if (createdMs && Date.now() - createdMs > 15 * 24 * 3600 * 1000) throw new BadRequestError("Înregistrarea are mai mult de 15 zile; o poate modifica doar directorul.");
  }
  e.next();
}, "incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "schimburi", "proiecte", "angajati", "istoric", "pontaj", "grafic");

/* ---- a project is never deleted (the rule is locked too): finish it or pause it, its money stays on it ---- */
onRecordDeleteRequest((e) => {
  throw new BadRequestError("Proiectele nu se șterg. Puneți-l pe Finalizat sau Pauză.");
}, "proiecte");

/* ---- currency exchange: a person swaps money he holds from one currency to another; the record is always his.
   (each handler runs in its own VM context, so the check is written out in both) ---- */
onRecordCreateRequest((e) => {
  if (!e.auth) throw new ForbiddenError("Autentificare necesară.");
  e.record.set("persoana", String(e.auth.getString("nume") || "").trim());
  var din = String(e.record.getString("valutaDin") || "").trim(), inn = String(e.record.getString("valutaIn") || "").trim();
  if (!din || !inn || din === inn) throw new BadRequestError("Alegeți două valute diferite.");
  if (!(e.record.getFloat("sumaDin") > 0) || !(e.record.getFloat("sumaIn") > 0)) throw new BadRequestError("Suma dată și suma primită trebuie să fie mai mari ca zero.");
  e.next();
}, "schimburi");
onRecordUpdateRequest((e) => {
  if (e.record.original) e.record.set("persoana", e.record.original().getString("persoana"));
  var din = String(e.record.getString("valutaDin") || "").trim(), inn = String(e.record.getString("valutaIn") || "").trim();
  if (!din || !inn || din === inn) throw new BadRequestError("Alegeți două valute diferite.");
  if (!(e.record.getFloat("sumaDin") > 0) || !(e.record.getFloat("sumaIn") > 0)) throw new BadRequestError("Suma dată și suma primită trebuie să fie mai mari ca zero.");
  e.next();
}, "schimburi");

/* ---- an employee's start date cannot move past a schedule day already ticked for him ---- */
onRecordUpdateRequest((e) => {
  var st = String(e.record.getString("dataInceput") || ""), nmA = String((e.record.original ? e.record.original() : e.record).getString("nume") || "").trim(), first = "";
  if (st) {
    try { var resA = new DynamicModel({ d: "" }); $app.db().newQuery("SELECT COALESCE(MIN(data),'') AS d FROM grafic WHERE TRIM(angajat) = {:n} AND ore > 0").bind({ n: nmA }).one(resA); first = String(resA.d || ""); } catch (err) { first = ""; }
    if (first && st > first) throw new BadRequestError("În grafic sunt zile bifate din " + first + ". Data începerii nu poate fi după ele: debifați întâi acele zile sau alegeți o dată mai devreme.");
  }
  e.next();
}, "angajati");

/* ---- the work schedule: a full day (8) or a half day (4); any user, any active employee; a day is changed by its
        author only (collection rule). The month is paid as one sum by whoever pays, so a day is closed for everyone
        once a salary payment for that employee is dated on that day or later. ---- */
onRecordCreateRequest((e) => {
  var h = e.record.getFloat("ore");
  if (h !== 0 && h !== 4 && h !== 8) throw new BadRequestError("Ziua se bifează întreagă (8 ore) sau jumătate (4 ore).");
  /* today and back only; the server clock is UTC-based, so one day of slack covers the evening hours in Moldova */
  if (String(e.record.getString("data") || "") > new Date(Date.now() + 86400000).toISOString().slice(0, 10)) throw new BadRequestError("Zilele viitoare nu se bifează: doar azi și înapoi.");
  /* one row per employee and day: a day booked by one collaborator cannot be booked again by another */
  var nm = String(e.record.getString("angajat") || "").trim(), zi = String(e.record.getString("data") || "");
  var dup = 0; try { dup = $app.countRecords("grafic", $dbx.exp("TRIM(angajat) = {:n} AND data = {:d}", { n: nm, d: zi })); } catch (err) { dup = 0; }
  if (dup > 0) throw new BadRequestError("Ziua este deja bifată de alt utilizator.");
  /* the author's name is written by the server, so everyone can read who booked the day */
  if (e.auth) e.record.set("deCine", String(e.auth.getString("nume") || ""));
  /* not before the employee's first day */
  var nmS = String(e.record.getString("angajat") || "").trim(), ziS = String(e.record.getString("data") || ""), startS = "";
  try { startS = String($app.findFirstRecordByFilter("angajati", "nume = {:n}", { n: nmS }).getString("dataInceput") || ""); } catch (err) { startS = ""; }
  if (startS && ziS && ziS < startS) throw new BadRequestError("Angajatul lucrează de la " + startS + "; zilele dinainte nu se bifează.");
  e.next();
}, "grafic");
onRecordUpdateRequest((e) => {
  var h = e.record.getFloat("ore");
  if (h !== 0 && h !== 4 && h !== 8) throw new BadRequestError("Ziua se bifează întreagă (8 ore) sau jumătate (4 ore).");
  /* today and back only; the server clock is UTC-based, so one day of slack covers the evening hours in Moldova */
  if (String(e.record.getString("data") || "") > new Date(Date.now() + 86400000).toISOString().slice(0, 10)) throw new BadRequestError("Zilele viitoare nu se bifează: doar azi și înapoi.");
  if (e.record.original) e.record.set("deCine", e.record.original().getString("deCine"));
  /* not before the employee's first day */
  var nmS = String(e.record.getString("angajat") || "").trim(), ziS = String(e.record.getString("data") || ""), startS = "";
  try { startS = String($app.findFirstRecordByFilter("angajati", "nume = {:n}", { n: nmS }).getString("dataInceput") || ""); } catch (err) { startS = ""; }
  if (startS && ziS && ziS < startS) throw new BadRequestError("Angajatul lucrează de la " + startS + "; zilele dinainte nu se bifează.");
  e.next();
}, "grafic");
onRecordDeleteRequest((e) => {
  e.next();
}, "grafic");

/* a salary payment is an expense like any other: its author (or a director) may correct or delete it; the schedule
   days it covered simply become unpaid again (see salCover on the client). */

/* ---- users: random credentials, numeric codes, no self-lockout ---- */
onRecordCreateRequest((e) => {
  /* only the EHL account makes users, and it makes collaborators: the body carries the signed-in director's EHL code as proof */
  var body = e.requestInfo().body || {}, who = e.auth;
  if (!who || who.getString("rol") !== "Director" || !who.getString("codEHL") || String(body.ehlCod || "").trim() !== who.getString("codEHL")) {
    throw new BadRequestError("Colaboratorii se creează doar din contul EHL.");
  }
  e.record.set("rol", "Operator");
  e.record.set("codEHL", "");
  var cod = String(e.record.getString("cod") || "").trim();
  if (!/^[0-9]{4,8}$/.test(cod)) throw new BadRequestError("Codul trebuie să aibă 4–8 cifre.");
  e.record.set("cod", cod);
  var codEHL = String(e.record.getString("codEHL") || "").trim();
  if (codEHL && !/^[0-9]{4,8}$/.test(codEHL)) throw new BadRequestError("Codul EHL trebuie să aibă 4–8 cifre.");
  e.record.set("codEHL", codEHL);
  if (!e.record.getString("status")) e.record.set("status", "Activ");
  if (!e.record.getString("rol")) e.record.set("rol", "Operator");
  e.record.set("email", $security.randomStringWithAlphabet(12, "abcdefghijklmnopqrstuvwxyz") + "@casieria.local");
  e.record.setPassword($security.randomString(32));
  e.record.set("parolaSetata", false);
  e.next();
}, "utilizatori");

onRecordUpdateRequest((e) => {
  var cod = String(e.record.getString("cod") || "").trim();
  if (!/^[0-9]{4,8}$/.test(cod)) throw new BadRequestError("Codul trebuie să aibă 4–8 cifre.");
  e.record.set("cod", cod);
  var codEHL = String(e.record.getString("codEHL") || "").trim();
  if (codEHL && !/^[0-9]{4,8}$/.test(codEHL)) throw new BadRequestError("Codul EHL trebuie să aibă 4–8 cifre.");
  e.record.set("codEHL", codEHL);
  /* the administrators are fixed (Sergiu and Grigore): nobody is promoted or demoted */
  if (e.record.original && e.record.getString("rol") !== e.record.original().getString("rol")) {
    throw new BadRequestError("Rolul nu se schimbă: administratorii sunt Sergiu și Grigore.");
  }
  if (e.auth && e.auth.id === e.record.id) {
    if (e.record.getString("status") === "Inactiv" || e.record.getString("rol") !== "Director") {
      throw new BadRequestError("Nu vă puteți dezactiva sau retrograda propriul cont.");
    }
  }
  /* credentials stay server-owned; a director demoted to operator loses the password requirement */
  if (e.record.original) {
    e.record.set("email", e.record.original().getString("email"));
    e.record.set("parolaSetata", e.record.getString("rol") === "Director" ? e.record.original().getBool("parolaSetata") : false);
  }
  e.next();
}, "utilizatori");

onRecordDeleteRequest((e) => {
  if (e.auth && e.auth.id === e.record.id) throw new BadRequestError("Nu vă puteți șterge propriul cont.");
  e.next();
}, "utilizatori");

/* ---- the directors' names are kept in the settings (readable by everyone), so a collaborator's app can leave them out
        of the employees it schedules and pays; refreshed after every change to the users ---- */
onRecordAfterCreateSuccess((e) => {
  var names = [];
  try { $app.findRecordsByFilter("utilizatori", "rol = 'Director' && status != 'Inactiv'", "", 0, 0).forEach(function (r) { names.push(r.getString("nume")); }); } catch (err) {}
  try { var cfg = $app.findFirstRecordByFilter("config", "id != ''"); cfg.set("directori", names); $app.save(cfg); } catch (err) {}
  e.next();
}, "utilizatori");
onRecordAfterUpdateSuccess((e) => {
  var names = [];
  try { $app.findRecordsByFilter("utilizatori", "rol = 'Director' && status != 'Inactiv'", "", 0, 0).forEach(function (r) { names.push(r.getString("nume")); }); } catch (err) {}
  try { var cfg = $app.findFirstRecordByFilter("config", "id != ''"); cfg.set("directori", names); $app.save(cfg); } catch (err) {}
  e.next();
}, "utilizatori");
onRecordAfterDeleteSuccess((e) => {
  var names = [];
  try { $app.findRecordsByFilter("utilizatori", "rol = 'Director' && status != 'Inactiv'", "", 0, 0).forEach(function (r) { names.push(r.getString("nume")); }); } catch (err) {}
  try { var cfg = $app.findFirstRecordByFilter("config", "id != ''"); cfg.set("directori", names); $app.save(cfg); } catch (err) {}
  e.next();
}, "utilizatori");

/* ---- money from a founder (an income whose client is a director) is confirmed with that founder's access code;
        the server records who confirmed it and when ---- */
onRecordCreateRequest((e) => {
  var client = String(e.record.getString("client") || "").trim();
  var f = null;
  if (client) { try { f = $app.findFirstRecordByFilter("utilizatori", "rol = 'Director' && nume = {:n}", { n: client }); } catch (err) { f = null; } }
  if (f) {
    var cod = String((e.requestInfo().body || {}).codFondator || "").trim();
    if (cod !== f.getString("cod")) throw new BadRequestError("Codul fondatorului este greșit.");
    e.record.set("confirmat", f.getString("nume") + " · " + new Date().toISOString().slice(0, 16).replace("T", " "));
  } else {
    e.record.set("confirmat", "");
  }
  /* an income on a project cannot exceed its contract + additional, in euro at the settings' rates */
  var pj = String(e.record.getString("proiect") || "").trim();
  if (pj) {
    var pr = null; try { pr = $app.findFirstRecordByFilter("proiecte", "nume = {:n}", { n: pj }); } catch (err) { pr = null; }
    if (pr && pr.getFloat("contractEUR") > 0) {
      var rates = { MDL: 1 };
      try { JSON.parse($app.findFirstRecordByFilter("config", "id != ''").getString("valute") || "[]").forEach(function (v) { rates[String(v.cod)] = Number(v.curs) || 1; }); } catch (err) {}
      var rEur = rates.EUR || 1;
      var toEur = function (val, suma, curs) { return String(val || "MDL") === "EUR" ? Number(suma) : Number(suma) * (Number(curs) || 1) / rEur; };
      var av = String(pr.getString("adaugatorValuta") || "EUR");
      var lim = pr.getFloat("contractEUR") + pr.getFloat("adaugator") * (av === "MDL" ? 1 : (rates[av] || 1)) / rEur;
      var got = 0, gotCash = 0, gotTr = 0;
      try { $app.findRecordsByFilter("incasari", "proiect = {:n} && id != {:id}", "", 0, 0, { n: pj, id: String(e.record.id || "") }).forEach(function (r) { var v = toEur(r.getString("valuta"), r.getFloat("suma"), r.getFloat("curs")); got += v; if (r.getString("mod") === "Transfer") gotTr += v; else gotCash += v; }); } catch (err) {}
      var left = Math.round((lim - got) * 100) / 100, now = toEur(e.record.getString("valuta"), e.record.getFloat("suma"), e.record.getFloat("curs"));
      if (now > left + 0.005) throw new BadRequestError("Suma depășește contractul proiectului. Mai pot fi încasați " + Math.max(0, left).toFixed(2) + " EUR.");
      /* and within its part: cash incomes against the cash part, transfers against the transfer part; the additional fits either, once */
      var cCash = pr.getFloat("contractCash"), cTr = pr.getFloat("contractTransfer"), adit = lim - pr.getFloat("contractEUR");
      if (cCash + cTr > 0) {
        var isTr = e.record.getString("mod") === "Transfer";
        var cPart = isTr ? cTr : cCash, cOther = isTr ? cCash : cTr, paidMode = isTr ? gotTr : gotCash, paidOther = isTr ? gotCash : gotTr;
        var extra = Math.max(0, adit - Math.max(0, paidOther - cOther)), leftP = Math.round((cPart + extra - paidMode) * 100) / 100;
        if (now > leftP + 0.005) throw new BadRequestError((isTr ? "Prin transfer" : "Cash") + " pe acest proiect mai pot fi încasați " + Math.max(0, leftP).toFixed(2) + " EUR.");
      }
    }
  }
  e.next();
}, "incasari");
onRecordUpdateRequest((e) => {
  var client = String(e.record.getString("client") || "").trim();
  var f = null;
  if (client) { try { f = $app.findFirstRecordByFilter("utilizatori", "rol = 'Director' && nume = {:n}", { n: client }); } catch (err) { f = null; } }
  if (f) {
    var cod = String((e.requestInfo().body || {}).codFondator || "").trim();
    if (cod !== f.getString("cod")) throw new BadRequestError("Codul fondatorului este greșit.");
    e.record.set("confirmat", f.getString("nume") + " · " + new Date().toISOString().slice(0, 16).replace("T", " "));
  } else {
    e.record.set("confirmat", "");
  }
  /* an income on a project cannot exceed its contract + additional, in euro at the settings' rates */
  var pj = String(e.record.getString("proiect") || "").trim();
  if (pj) {
    var pr = null; try { pr = $app.findFirstRecordByFilter("proiecte", "nume = {:n}", { n: pj }); } catch (err) { pr = null; }
    if (pr && pr.getFloat("contractEUR") > 0) {
      var rates = { MDL: 1 };
      try { JSON.parse($app.findFirstRecordByFilter("config", "id != ''").getString("valute") || "[]").forEach(function (v) { rates[String(v.cod)] = Number(v.curs) || 1; }); } catch (err) {}
      var rEur = rates.EUR || 1;
      var toEur = function (val, suma, curs) { return String(val || "MDL") === "EUR" ? Number(suma) : Number(suma) * (Number(curs) || 1) / rEur; };
      var av = String(pr.getString("adaugatorValuta") || "EUR");
      var lim = pr.getFloat("contractEUR") + pr.getFloat("adaugator") * (av === "MDL" ? 1 : (rates[av] || 1)) / rEur;
      var got = 0, gotCash = 0, gotTr = 0;
      try { $app.findRecordsByFilter("incasari", "proiect = {:n} && id != {:id}", "", 0, 0, { n: pj, id: String(e.record.id || "") }).forEach(function (r) { var v = toEur(r.getString("valuta"), r.getFloat("suma"), r.getFloat("curs")); got += v; if (r.getString("mod") === "Transfer") gotTr += v; else gotCash += v; }); } catch (err) {}
      var left = Math.round((lim - got) * 100) / 100, now = toEur(e.record.getString("valuta"), e.record.getFloat("suma"), e.record.getFloat("curs"));
      if (now > left + 0.005) throw new BadRequestError("Suma depășește contractul proiectului. Mai pot fi încasați " + Math.max(0, left).toFixed(2) + " EUR.");
      /* and within its part: cash incomes against the cash part, transfers against the transfer part; the additional fits either, once */
      var cCash = pr.getFloat("contractCash"), cTr = pr.getFloat("contractTransfer"), adit = lim - pr.getFloat("contractEUR");
      if (cCash + cTr > 0) {
        var isTr = e.record.getString("mod") === "Transfer";
        var cPart = isTr ? cTr : cCash, cOther = isTr ? cCash : cTr, paidMode = isTr ? gotTr : gotCash, paidOther = isTr ? gotCash : gotTr;
        var extra = Math.max(0, adit - Math.max(0, paidOther - cOther)), leftP = Math.round((cPart + extra - paidMode) * 100) / 100;
        if (now > leftP + 0.005) throw new BadRequestError((isTr ? "Prin transfer" : "Cash") + " pe acest proiect mai pot fi încasați " + Math.max(0, leftP).toFixed(2) + " EUR.");
      }
    }
  }
  e.next();
}, "incasari");

/* ---- where an outflow is paid from: a director's (or the cashier's) comes from the till ("Casa"); a collaborator's
        comes out of the money the director gave him ("Avans", platitDe = his name). Set here, never by the client. ---- */
onRecordCreateRequest((e) => {
  if (e.auth) {
    var me = String(e.auth.getString("nume") || "").trim();
    var cas = "";
    try { cas = String($app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim().toLowerCase(); } catch (err) { cas = ""; }
    if (e.auth.getString("rol") === "Director" || (cas && me.toLowerCase() === cas)) {
      /* a collaborator's own salary (a director paying an operator account) comes out of that collaborator's advance */
      var want = String(e.record.getString("sursa") || ""), who = String(e.record.getString("platitDe") || "").trim(), isCollab = false;
      if (want === "Avans" && who && e.record.getString("destinatie") === "Salarii") {
        try { isCollab = $app.countRecords("utilizatori", $dbx.exp("rol = 'Operator' AND TRIM(nume) = {:n}", { n: who })) > 0; } catch (err) { isCollab = false; }
      }
      if (isCollab) { e.record.set("sursa", "Avans"); e.record.set("platitDe", who); }
      /* a director chooses: from the common EHL till ("Casa") or from his own account ("Avans", his name); the cashier only from the till */
      else if (want === "Avans" && !(cas && me.toLowerCase() === cas)) {
        e.record.set("sursa", "Avans"); e.record.set("platitDe", me);
        var resD = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: me }).one(resD);
        if (e.record.getFloat("suma") * (e.record.getFloat("curs") || 1) > parseFloat(resD.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani în contul dumneavoastră. Luați mai întâi din Casa EHL.");
      }
      else {
        /* money leaves the common EHL till: the director's own EHL code is required */
        if (e.auth.getString("rol") === "Director" && !(cas && me.toLowerCase() === cas)) {
          var ce = String((e.requestInfo().body || {}).codEHL || "").trim();
          if (!ce || ce !== String(e.auth.getString("codEHL") || "")) throw new BadRequestError("Codul EHL este greșit.");
          /* out of the common till the money reaches only an administrator, the bank or a founder it is owed to */
          var dest = e.record.getString("destinatie"), okDest = dest === "Depus pe cont" || dest === "Restituire fondator";
          if (dest === "Dat persoanei") { try { okDest = $app.countRecords("utilizatori", $dbx.exp("rol = 'Director' AND TRIM(nume) = {:n}", { n: String(e.record.getString("persoana") || "").trim() })) > 0; } catch (err) { okDest = false; } }
          if (!okDest) throw new BadRequestError("Din Casa EHL banii merg doar la administratori, pe cont sau înapoi la fondator.");
        }
        e.record.set("sursa", "Casa"); e.record.set("platitDe", "");
      }
    } else {
      /* a collaborator takes money out of his advance only to pay a salary (the "Achitat" box of a timesheet),
         and never more than the advance still holds */
      if (e.record.getString("destinatie") !== "Salarii") throw new BadRequestError("Colaboratorul înregistrează din avans doar plăți de salariu (bifa Achitat din pontaj).");
      var res = new DynamicModel({ v: "" });
      $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: me }).one(res);
      if (e.record.getFloat("suma") * (e.record.getFloat("curs") || 1) > parseFloat(res.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
      e.record.set("sursa", "Avans"); e.record.set("platitDe", me);
    }
  }
  e.next();
}, "iesiri");
onRecordUpdateRequest((e) => {
  /* the source never changes on edit */
  if (e.record.original) {
    e.record.set("sursa", e.record.original().getString("sursa"));
    e.record.set("platitDe", e.record.original().getString("platitDe"));
  }
  e.next();
}, "iesiri");

/* ---- a collaborator's expense: he is the payer. Cash comes out of the money the director gave him and cannot take
        his balance below zero; a transfer is paid by the firm's account, which may go below zero. The cashier pays from the till. ---- */
onRecordCreateRequest((e) => {
  /* the payer is the account that records the expense — salaries included, even when the employee is a collaborator
     with an account of his own: his salary is his money, not an advance of the firm's. */
  if (e.auth && e.auth.getString("rol") === "Director") {
    {
      /* a director pays from his own account (money he took from the EHL till); only the cashier pays from the till */
      var meD = String(e.auth.getString("nume") || "").trim(), casD = "";
      try { casD = String($app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim(); } catch (err) { casD = ""; }
      e.record.set("platitDe", meD); e.record.set("sursa", (casD && casD === meD) ? "" : "Avans");
      if (!(casD && casD === meD) && e.record.getString("mod") !== "Transfer" && e.record.getString("categorie") !== "Salarii") {
        var resE = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: meD }).one(resE);
        if (e.record.getFloat("suma") > parseFloat(resE.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani în contul dumneavoastră. Luați mai întâi din Casa EHL.");
      }
    }
  }
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var me = String(e.auth.getString("nume") || "").trim();
    var cas = "";
    try { cas = String($app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim(); } catch (err) { cas = ""; }
    if (!(cas && cas === me)) {
      e.record.set("platitDe", me);
      if (e.record.getString("mod") !== "Transfer") {
        e.record.set("sursa", "Avans");
        if (e.record.getString("categorie") === "Salarii") { e.next(); return; } /* a salary may take the advance below zero (the firm's rule) */
        var res = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: me }).one(res);
        if (e.record.getFloat("suma") > parseFloat(res.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
      }
    }
  }
  e.next();
}, "cheltuieli");
onRecordUpdateRequest((e) => {
  /* the payer and the source never change on edit, for a director too */
  if (e.auth && e.auth.getString("rol") === "Director" && e.record.original) {
    e.record.set("platitDe", e.record.original().getString("platitDe"));
    e.record.set("sursa", e.record.original().getString("sursa"));
  }
  if (e.auth && e.auth.getString("rol") !== "Director" && e.record.original) {
    var me = String(e.auth.getString("nume") || "").trim();
    var cas = "";
    try { cas = String($app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim(); } catch (err) { cas = ""; }
    if (!(cas && cas === me)) {
      e.record.set("platitDe", e.record.original().getString("platitDe"));
      if (e.record.getString("mod") !== "Transfer") {
        e.record.set("sursa", "Avans");
        if (e.record.getString("categorie") === "Salarii") { e.next(); return; } /* a salary may take the advance below zero (the firm's rule) */
        var res = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: me }).one(res);
        var back = e.record.original().getString("mod") !== "Transfer" ? e.record.original().getFloat("suma") : 0;
        var need = e.record.getFloat("suma");
        if (need > back && need > parseFloat(res.v || "0") + back + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
      }
    }
  }
  e.next();
}, "cheltuieli");

/* ---- a rent is paid by the account that records it: a director or the cashier from the till ("Casa"); a collaborator
        from the money the director gave him ("Avans", never more than it holds); a transfer from the firm's account ---- */
onRecordCreateRequest((e) => {
  if (e.auth) {
    var me = String(e.auth.getString("nume") || "").trim();
    var cas = "";
    try { cas = String($app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim(); } catch (err) { cas = ""; }
    if (cas && cas === me) { e.record.set("sursa", "Casa"); e.record.set("platitDe", ""); }
    else if (e.auth.getString("rol") === "Director") {
      e.record.set("sursa", "Avans"); e.record.set("platitDe", me); /* from his own account, within what it holds */
      if (e.record.getString("mod") !== "Transfer") {
        var resR = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: me }).one(resR);
        var needR = (e.record.getFloat("chirie") + e.record.getFloat("gaj") + e.record.getFloat("comunale") + e.record.getFloat("avarii")) * (e.record.getFloat("curs") || 1);
        if (needR > parseFloat(resR.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani în contul dumneavoastră. Luați mai întâi din Casa EHL.");
      }
    }
    else {
      e.record.set("sursa", "Avans"); e.record.set("platitDe", me);
      if (e.record.getString("mod") !== "Transfer") {
        var res = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: me }).one(res);
        var need = (e.record.getFloat("chirie") + e.record.getFloat("gaj") + e.record.getFloat("comunale") + e.record.getFloat("avarii")) * (e.record.getFloat("curs") || 1);
        if (need > parseFloat(res.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
      }
    }
  }
  e.next();
}, "chirii");
onRecordUpdateRequest((e) => {
  if (e.record.original) {
    e.record.set("sursa", e.record.original().getString("sursa"));
    e.record.set("platitDe", e.record.original().getString("platitDe"));
    /* a collaborator raising a cash rent paid from his advance may not go past what he holds */
    if (e.auth && e.auth.getString("rol") !== "Director" && e.record.getString("sursa") === "Avans" && e.record.getString("mod") !== "Transfer") {
      var me2 = String(e.auth.getString("nume") || "").trim(), o = e.record.original();
      var tot = function (r) { return (r.getFloat("chirie") + r.getFloat("gaj") + r.getFloat("comunale") + r.getFloat("avarii")) * (r.getFloat("curs") || 1); };
      var back = o.getString("mod") !== "Transfer" ? tot(o) : 0, need = tot(e.record);
      if (need > back) {
        var res2 = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: me2 }).one(res2);
        if (need > parseFloat(res2.v || "0") + back + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
      }
    }
  }
  e.next();
}, "chirii");

/* ---- an expense must say what the money was spent on ---- */
onRecordCreateRequest((e) => {
  if (String(e.record.getString("descriere") || "").trim().length < 3) throw new BadRequestError("Scrieți pe ce s-au cheltuit banii (descrierea este obligatorie).");
  e.next();
}, "cheltuieli");
onRecordUpdateRequest((e) => {
  if (String(e.record.getString("descriere") || "").trim().length < 3) throw new BadRequestError("Scrieți pe ce s-au cheltuit banii (descrierea este obligatorie).");
  e.next();
}, "cheltuieli");
