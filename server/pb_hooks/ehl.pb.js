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

/* ---- sign-in = PIN + authenticator code, for everyone (17 November 2026):  POST /api/ehl/login {cod, totp}
        A director's own code opens his administrator account (token until 05:00 Chișinău); his EHL code opens Casa EHL,
        which has its own authenticator. A collaborator's PIN opens his account (token for two days).
        Before the authenticator of that account is set up, the code alone signs the person in and the answer carries
        needSetup, so the app walks him through the setup at once. {needTotp}: the code was right, now the authenticator
        code (or a recovery code, used once). Failed attempts count per IP (8 in 15 minutes) on top of the rate limits. ---- */
routerAdd("POST", "/api/ehl/login", (e) => {
  var T = require(__hooks + "/totp.js");
  var body = e.requestInfo().body || {};
  var cod = String(body.cod || "").trim(), totp = String(body.totp || "").trim();
  if (!/^[0-9]{4,8}$/.test(cod)) throw new BadRequestError("Cod invalid.");

  var ip = e.realIP() || "unknown";
  var since = new Date(Date.now() - 15 * 60 * 1000).toISOString().replace("T", " ").slice(0, 19);
  var tries = $app.countRecords("login_attempts", $dbx.exp("ip = {:ip} AND created >= {:since}", { ip: ip, since: since }));
  if (tries >= 8) throw new ApiError(429, "Prea multe încercări. Așteptați 15 minute.", {});
  var fail = function (msg) {
    var att = new Record($app.findCollectionByNameOrId("login_attempts"));
    att.set("ip", ip);
    $app.save(att);
    try { var old = new Date(Date.now() - 24 * 3600 * 1000).toISOString().replace("T", " ").slice(0, 19); $app.db().newQuery("DELETE FROM login_attempts WHERE created < {:old}").bind({ old: old }).execute(); } catch (err) {}
    throw new UnauthorizedError(msg);
  };
  /* the authenticator code (or a recovery code, used once) against the record's administrator or EHL authenticator */
  var checkSecond = function (rec, ehl) {
    var S = ehl ? "totpSecretEHL" : "totpSecret", L = ehl ? "totpLastEHL" : "totpLast", R = ehl ? "recuperareEHL" : "recuperare";
    var step = T.verify(rec.getString(S), totp, rec.getInt(L));
    if (step) { rec.set(L, step); return true; }
    var rc = String(totp || "").trim().toLowerCase();
    if (/^[a-z0-9]{4}-?[a-z0-9]{4}$/.test(rc)) {
      var hashes = []; try { hashes = JSON.parse(rec.getString(R) || "[]") || []; } catch (err) { hashes = []; }
      var h = T.hashCode(rc.replace("-", "").replace(/^(.{4})(.{4})$/, "$1-$2")), k = hashes.indexOf(h);
      if (k >= 0) { hashes.splice(k, 1); rec.set(R, hashes); return true; }
    }
    return false;
  };
  var pubOf = function (rec) { return { id: rec.id, nume: rec.getString("nume"), rol: rec.getString("rol"), cod: rec.getString("cod"), codEHL: rec.getString("codEHL"), status: rec.getString("status"), login: rec.getString("login"), twoFA: rec.getBool("twoFA"), twoFAEHL: rec.getBool("twoFAEHL") }; };
  var sessionOf = function (rec, seconds) { return { token: rec.newStaticAuthToken(seconds * 1000000000), expires: Date.now() + seconds * 1000 }; };

  /* ---- the code: a user's own code, or a director's EHL code (Casa EHL) ---- */
  var rec = null, viaEHL = false;
  try { rec = $app.findFirstRecordByFilter("utilizatori", "cod = {:cod}", { cod: cod }); } catch (err) { rec = null; }
  if (!rec) { try { rec = $app.findFirstRecordByFilter("utilizatori", "rol = 'Director' && codEHL = {:cod}", { cod: cod }); viaEHL = !!rec; } catch (err) { rec = null; } }
  var first = false;
  if (!rec && $app.countRecords("utilizatori") === 0) {
    /* first launch: the first code typed becomes the director */
    var col = $app.findCollectionByNameOrId("utilizatori");
    rec = new Record(col);
    rec.set("nume", "Director"); rec.set("rol", "Director"); rec.set("cod", cod); rec.set("status", "Activ");
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
  if (!rec || rec.getString("status") === "Inactiv") fail("Cod greșit sau utilizator dezactivat.");
  var isDirector = rec.getString("rol") === "Director", seconds = isDirector ? T.secondsUntilFive() : T.TWO_DAYS;
  if (rec.getBool(viaEHL ? "twoFAEHL" : "twoFA")) {
    /* the code names the account, the account's authenticator confirms */
    if (!totp) return e.json(200, { needTotp: true, nume: rec.getString("nume"), ehl: viaEHL });
    if (!checkSecond(rec, viaEHL)) fail("Codul din aplicația de autentificare este greșit.");
    if (!isDirector) rec.refreshTokenKey(); /* one session per collaborator account; a director keeps both accounts open on different devices */
    $app.save(rec);
    var so = sessionOf(rec, seconds);
    return e.json(200, { token: so.token, expires: so.expires, record: pubOf(rec), ehl: viaEHL });
  }
  /* no authenticator yet for this account: the code opens a short session whose only purpose is the setup */
  if (!isDirector) rec.refreshTokenKey();
  $app.save(rec);
  var ss = sessionOf(rec, seconds);
  return e.json(200, { token: ss.token, expires: ss.expires, first: first, record: pubOf(rec), needSetup: true, ehl: viaEHL });
});

/* ---- 2FA setup, step 1: the server hands back a fresh secret for the authenticator app of the account in use
        ({ehl: true} = the director's Casa EHL account). POST /api/ehl/2fa/setup {ehl?, totp?}
        Someone who already has 2FA on that account must give a current authenticator code to start over. ---- */
routerAdd("POST", "/api/ehl/2fa/setup", (e) => {
  var T = require(__hooks + "/totp.js");
  var body = e.requestInfo().body || {}, rec = e.auth;
  if (!rec) throw new ForbiddenError("Autentificare necesară.");
  var ehlA = !!body.ehl && rec.getString("rol") === "Director"; /* which of a director's two authenticators */
  var S = ehlA ? "totpSecretEHL" : "totpSecret", L = ehlA ? "totpLastEHL" : "totpLast", F = ehlA ? "twoFAEHL" : "twoFA", R = ehlA ? "recuperareEHL" : "recuperare";
  if (rec.getBool(F) && !T.verify(rec.getString(S), String(body.totp || ""), rec.getInt(L))) throw new BadRequestError("Codul din aplicația de autentificare este greșit.");
  var secret = T.newSecret();
  rec.set(S, secret); rec.set(L, 0); rec.set(F, false); rec.set(R, []);
  $app.save(rec);
  /* the entry's name in the authenticator app says which code it gives: Administrator EHL (a director's own account),
     Casa EHL (the common till), Colaborator EHL (a collaborator); the person's name is the account label */
  var account = rec.getString("nume");
  var issuer = ehlA ? "Casa EHL" : (rec.getString("rol") === "Director" ? "Administrator EHL" : "Colaborator EHL");
  return e.json(200, { secret: secret, uri: T.uri(issuer, account, secret), ehl: ehlA, issuer: issuer });
}, $apis.requireAuth("utilizatori"));

/* ---- 2FA setup, step 2: the first code from the app proves the secret landed; 2FA goes live and the recovery codes are
        shown once. POST /api/ehl/2fa/confirm {totp} ---- */
routerAdd("POST", "/api/ehl/2fa/confirm", (e) => {
  var T = require(__hooks + "/totp.js");
  var body = e.requestInfo().body || {}, rec = e.auth;
  if (!rec) throw new ForbiddenError("Autentificare necesară.");
  var ehlC = !!body.ehl && rec.getString("rol") === "Director";
  var S2 = ehlC ? "totpSecretEHL" : "totpSecret", L2 = ehlC ? "totpLastEHL" : "totpLast", F2 = ehlC ? "twoFAEHL" : "twoFA", R2 = ehlC ? "recuperareEHL" : "recuperare";
  if (!rec.getString(S2)) throw new BadRequestError("Mai întâi pasul de configurare.");
  var step = T.verify(rec.getString(S2), String(body.totp || ""), rec.getInt(L2));
  if (!step) throw new BadRequestError("Codul din aplicația de autentificare este greșit. Verificați ora telefonului.");
  var codes = T.newRecovery();
  rec.set(L2, step); rec.set(F2, true); rec.set(R2, codes.map(T.hashCode));
  $app.save(rec);
  return e.json(200, { ok: true, recuperare: codes });
}, $apis.requireAuth("utilizatori"));

/* ---- a director resets someone else's 2FA (a lost phone): the person signs in with his code / login + password and
        sets the authenticator up again. The director confirms with his own authenticator code.
        POST /api/ehl/2fa/reset {id, totp} ---- */
routerAdd("POST", "/api/ehl/2fa/reset", (e) => {
  var T = require(__hooks + "/totp.js");
  var body = e.requestInfo().body || {}, rec = e.auth;
  if (!rec || rec.getString("rol") !== "Director") throw new ForbiddenError("Doar directorul resetează autentificarea.");
  if (!T.verify(rec.getString("totpSecret"), String(body.totp || ""), rec.getInt("totpLast"))) throw new BadRequestError("Codul dumneavoastră din aplicația de autentificare este greșit.");
  var target = null; try { target = $app.findRecordById("utilizatori", String(body.id || "")); } catch (err) { target = null; }
  if (!target || target.id === rec.id) throw new BadRequestError("Alegeți alt utilizator.");
  target.set("twoFA", false); target.set("totpSecret", ""); target.set("totpLast", 0); target.set("recuperare", []);
  target.set("twoFAEHL", false); target.set("totpSecretEHL", ""); target.set("totpLastEHL", 0); target.set("recuperareEHL", []);
  target.refreshTokenKey(); /* his sessions end: he signs in and sets the authenticator up again */
  $app.save(target);
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
  /* never more than he holds in the currency given */
  var hs = new DynamicModel({ v: "" });
  $app.db().newQuery("SELECT CAST(" +
      "(SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
      " - (SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:x})" +
      " - (SELECT COALESCE(SUM(COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0)),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
      " + (SELECT COALESCE(SUM(sumaIn),0) FROM schimburi WHERE TRIM(persoana)={:n} AND valutaIn={:v} AND id<>{:x})" +
      " - (SELECT COALESCE(SUM(sumaDin),0) FROM schimburi WHERE TRIM(persoana)={:n} AND valutaDin={:v} AND id<>{:x})" +
      " - (CASE WHEN {:v}='MDL' THEN (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) ELSE 0 END)" +
      " AS TEXT) AS v").bind({ n: String(e.record.getString("persoana") || "").trim(), v: din, x: String(e.record.id || "") }).one(hs);
  if (e.record.getFloat("sumaDin") > parseFloat(hs.v || "0") + 0.004) throw new BadRequestError("Nu aveți atâta în valuta dată (" + din + ").");
  e.next();
}, "schimburi");
onRecordUpdateRequest((e) => {
  if (e.record.original) e.record.set("persoana", e.record.original().getString("persoana"));
  var din = String(e.record.getString("valutaDin") || "").trim(), inn = String(e.record.getString("valutaIn") || "").trim();
  if (!din || !inn || din === inn) throw new BadRequestError("Alegeți două valute diferite.");
  if (!(e.record.getFloat("sumaDin") > 0) || !(e.record.getFloat("sumaIn") > 0)) throw new BadRequestError("Suma dată și suma primită trebuie să fie mai mari ca zero.");
  /* never more than he holds in the currency given */
  var hs = new DynamicModel({ v: "" });
  $app.db().newQuery("SELECT CAST(" +
      "(SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
      " - (SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:x})" +
      " - (SELECT COALESCE(SUM(COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0)),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n} AND COALESCE(NULLIF(valuta,''),'MDL')={:v})" +
      " + (SELECT COALESCE(SUM(sumaIn),0) FROM schimburi WHERE TRIM(persoana)={:n} AND valutaIn={:v} AND id<>{:x})" +
      " - (SELECT COALESCE(SUM(sumaDin),0) FROM schimburi WHERE TRIM(persoana)={:n} AND valutaDin={:v} AND id<>{:x})" +
      " - (CASE WHEN {:v}='MDL' THEN (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) ELSE 0 END)" +
      " AS TEXT) AS v").bind({ n: String(e.record.getString("persoana") || "").trim(), v: din, x: String(e.record.id || "") }).one(hs);
  if (e.record.getFloat("sumaDin") > parseFloat(hs.v || "0") + 0.004) throw new BadRequestError("Nu aveți atâta în valuta dată (" + din + ").");
  e.next();
}, "schimburi");

/* ---- the history's author name is written by the server, never taken from the client ---- */
onRecordCreateRequest((e) => {
  if (e.auth) e.record.set("nume", String(e.auth.getString("nume") || ""));
  e.next();
}, "jurnal");

/* ---- an employee's salary is set by a director or by the user who created that employee ---- */
onRecordCreateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nmI = String(e.record.getString("angajat") || "").trim(), mine = 0;
    try { mine = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:me}", { n: nmI, me: e.auth.id })); } catch (err) { mine = 0; }
    if (!mine) throw new ForbiddenError("Salariul îl stabilește directorul sau cel care a creat angajatul.");
  }
  e.next();
}, "istoric");

/* ---- a salary row keeps its employee on edit; a non-director edits only for employees he created ---- */
onRecordUpdateRequest((e) => {
  if (e.record.original) e.record.set("angajat", e.record.original().getString("angajat"));
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nmU = String(e.record.getString("angajat") || "").trim(), mineU = 0;
    try { mineU = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:me}", { n: nmU, me: e.auth.id })); } catch (err) { mineU = 0; }
    if (!mineU) throw new ForbiddenError("Salariul îl stabilește directorul sau cel care a creat angajatul.");
  }
  e.next();
}, "istoric");

/* ---- a timesheet row keeps its employee and month on edit; a bonus or the "whole month" mark for an employee one did not
        create is a director's call ---- */
onRecordCreateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director" && (e.record.getFloat("extra") > 0 || e.record.getBool("complet"))) {
    var nmP = String(e.record.getString("angajat") || "").trim(), mineP = 0;
    try { mineP = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:me}", { n: nmP, me: e.auth.id })); } catch (err) { mineP = 0; }
    if (!mineP) throw new ForbiddenError("Bonusul și bifa „luna întreagă” le pune directorul sau cel care a creat angajatul.");
  }
  e.next();
}, "pontaj");
onRecordUpdateRequest((e) => {
  if (e.record.original) { e.record.set("angajat", e.record.original().getString("angajat")); e.record.set("luna", e.record.original().getString("luna")); }
  if (e.auth && e.auth.getString("rol") !== "Director" && (e.record.getFloat("extra") > 0 || e.record.getBool("complet"))) {
    var nmP2 = String(e.record.getString("angajat") || "").trim(), mineP2 = 0;
    try { mineP2 = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:me}", { n: nmP2, me: e.auth.id })); } catch (err) { mineP2 = 0; }
    if (!mineP2) throw new ForbiddenError("Bonusul și bifa „luna întreagă” le pune directorul sau cel care a creat angajatul.");
  }
  e.next();
}, "pontaj");

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
  if (e.record.original) { e.record.set("deCine", e.record.original().getString("deCine")); e.record.set("angajat", e.record.original().getString("angajat")); e.record.set("data", e.record.original().getString("data")); } /* a day is unticked and ticked again, never moved */
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
  if (e.record.original) { e.record.set("login", e.record.original().getString("login")); e.record.set("twoFA", e.record.original().getBool("twoFA")); e.record.set("twoFAEHL", e.record.original().getBool("twoFAEHL")); } /* set by the 2FA routes only */
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
      /* a director chooses: from the common EHL till ("Casa") or from his own account ("Avans", his name); the cashier only from the till */
      var want = String(e.record.getString("sursa") || "");
      if (want === "Avans" && !(cas && me.toLowerCase() === cas)) {
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
        /* the till holds what came in cash, per currency; it never goes below zero */
        var vC = String(e.record.getString("valuta") || "MDL") || "MDL", hc = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma),0) FROM incasari WHERE [[mod]]<>'Transfer' AND COALESCE(NULLIF(valuta,''),'MDL')={:v}) - (SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE sursa='Casa' AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:x}) AS TEXT) AS v").bind({ v: vC, x: String(e.record.id || "") }).one(hc);
        if (e.record.getFloat("suma") > parseFloat(hc.v || "0") + 0.004) throw new BadRequestError("În Casa EHL nu sunt destui bani în " + vC + ".");
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
  /* the source, the destination, the person, the currency and the month never change on edit: a wrong row is deleted and
     written again. The sum may be corrected, and is checked again against the till or the payer's account. */
  if (e.record.original) {
    var o = e.record.original();
    ["sursa", "platitDe", "destinatie", "persoana", "valuta", "luna"].forEach(function (k) { e.record.set(k, o.getString(k)); });
    var was = o.getFloat("suma") * (o.getFloat("curs") || 1), now = e.record.getFloat("suma") * (e.record.getFloat("curs") || 1);
    if (now > was + 0.004) {
      if (o.getString("sursa") === "Casa") {
        var vU = String(o.getString("valuta") || "MDL") || "MDL", hu = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma),0) FROM incasari WHERE [[mod]]<>'Transfer' AND COALESCE(NULLIF(valuta,''),'MDL')={:v}) - (SELECT COALESCE(SUM(suma),0) FROM iesiri WHERE sursa='Casa' AND COALESCE(NULLIF(valuta,''),'MDL')={:v} AND id<>{:x}) AS TEXT) AS v").bind({ v: vU, x: String(e.record.id || "") }).one(hu);
        if (e.record.getFloat("suma") > parseFloat(hu.v || "0") + 0.004) throw new BadRequestError("În Casa EHL nu sunt destui bani în " + vU + ".");
      } else if (o.getString("sursa") === "Avans" && o.getString("destinatie") !== "Salarii") {
        var hv = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n} AND id<>{:x}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: String(o.getString("platitDe") || "").trim(), x: String(e.record.id || "") }).one(hv);
        if (now > parseFloat(hv.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani în contul dumneavoastră.");
      }
    }
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
  /* a salary payment stays a salary payment for the same employee and month, and no other expense turns into one */
  if (e.record.original) {
    var oc = e.record.original(), wasSal = oc.getString("categorie") === "Salarii", isSal = e.record.getString("categorie") === "Salarii";
    if (wasSal !== isSal) throw new BadRequestError("O plată de salariu nu se transformă în altă cheltuială și invers: ștergeți rândul și introduceți-l din nou.");
    if (wasSal) { e.record.set("angajat", oc.getString("angajat")); e.record.set("luna", oc.getString("luna")); e.record.set("mod", oc.getString("mod")); }
  }
  /* the payer and the source never change on edit, for a director too; a director's cash correction is checked like a creation */
  if (e.auth && e.auth.getString("rol") === "Director" && e.record.original) {
    e.record.set("platitDe", e.record.original().getString("platitDe"));
    e.record.set("sursa", e.record.original().getString("sursa"));
    if (e.record.getString("mod") !== "Transfer" && e.record.getString("categorie") !== "Salarii" && e.record.getString("sursa") === "Avans") {
      var backD = e.record.original().getString("mod") !== "Transfer" ? e.record.original().getFloat("suma") : 0, needD = e.record.getFloat("suma");
      if (needD > backD) {
        var rd = new DynamicModel({ v: "" });
        $app.db().newQuery("SELECT CAST((SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n} AND id<>{:x}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM((COALESCE(chirie,0)+COALESCE(gaj,0)+COALESCE(comunale,0)+COALESCE(avarii,0))*curs),0) FROM chirii WHERE sursa='Avans' AND [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) AS TEXT) AS v").bind({ n: String(e.record.getString("platitDe") || "").trim(), x: String(e.record.id || "") }).one(rd);
        if (needD > parseFloat(rd.v || "0") + 0.004) throw new BadRequestError("Nu aveți destui bani în contul dumneavoastră. Luați mai întâi din Casa EHL.");
      }
    }
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
