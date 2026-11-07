/// <reference path="../pb_data/types.d.ts" />
/* Casieria EHL — server hooks.
   Handlers cannot share functions declared outside them (PocketBase JS VM rule), so helpers are inlined. */

var DATA_COLS = ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "jurnal"];

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

  var pub = { id: rec.id, nume: rec.getString("nume"), rol: rec.getString("rol"), cod: rec.getString("cod"), status: rec.getString("status"), parolaSetata: rec.getBool("parolaSetata") };

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
    /* one session per account: a new sign-in changes the token key, so the token of any other device stops working */
    rec.refreshTokenKey(); $app.save(rec);
    return e.json(200, { token: rec.newAuthToken(), first: first, record: pub });
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

/* ---- every register row carries its author, set by the server, never by the client ---- */
onRecordCreateRequest((e) => {
  if (e.auth) e.record.set("by", e.auth.id);
  e.next();
}, "incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "grafic", "jurnal");

onRecordUpdateRequest((e) => {
  /* the author never changes on edit */
  if (e.record.original) e.record.set("by", e.record.original().getString("by"));
  /* an operator may correct his own rows for 15 days; afterwards only the director */
  if (e.auth && e.auth.getString("rol") !== "Director" && e.record.original) {
    var createdMs = Date.parse(String(e.record.original().getString("created")).replace(" ", "T"));
    if (createdMs && Date.now() - createdMs > 15 * 24 * 3600 * 1000) throw new BadRequestError("Înregistrarea are mai mult de 15 zile; o poate modifica doar directorul.");
  }
  e.next();
}, "incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "grafic");

/* ---- the work schedule: hours 0–24; an operator fills it only for the employees he created, a director for anyone ---- */
onRecordCreateRequest((e) => {
  var h = e.record.getFloat("ore");
  if (h < 0 || h > 24) throw new BadRequestError("Orele trebuie să fie între 0 și 24.");
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nm = String(e.record.getString("angajat") || "").trim();
    var ok = false;
    if (nm) { try { ok = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:u}", { n: nm, u: e.auth.id })) > 0; } catch (err) { ok = false; } }
    if (!ok) throw new BadRequestError("Graficul se face doar pentru angajații creați de dumneavoastră.");
  }
  e.next();
}, "grafic");
onRecordUpdateRequest((e) => {
  var h = e.record.getFloat("ore");
  if (h < 0 || h > 24) throw new BadRequestError("Orele trebuie să fie între 0 și 24.");
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nm = String(e.record.getString("angajat") || "").trim();
    var ok = false;
    if (nm) { try { ok = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:u}", { n: nm, u: e.auth.id })) > 0; } catch (err) { ok = false; } }
    if (!ok) throw new BadRequestError("Graficul se face doar pentru angajații creați de dumneavoastră.");
  }
  e.next();
}, "grafic");

/* ---- users: random credentials, numeric codes, no self-lockout ---- */
onRecordCreateRequest((e) => {
  var cod = String(e.record.getString("cod") || "").trim();
  if (!/^[0-9]{4,8}$/.test(cod)) throw new BadRequestError("Codul trebuie să aibă 4–8 cifre.");
  e.record.set("cod", cod);
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
      e.record.set("sursa", "Casa"); e.record.set("platitDe", "");
    } else {
      /* a collaborator takes money out of his advance only to pay a salary (the "Achitat" box of a timesheet),
         and never more than the advance still holds */
      if (e.record.getString("destinatie") !== "Salarii") throw new BadRequestError("Colaboratorul înregistrează din avans doar plăți de salariu (bifa Achitat din pontaj).");
      var res = new DynamicModel({ v: 0 });
      $app.db().newQuery("SELECT (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) AS v").bind({ n: me }).one(res);
      if (e.record.getFloat("suma") * (e.record.getFloat("curs") || 1) > res.v + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
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

/* ---- an operator fills timesheets only for the employees he created himself; a director for anyone ---- */
onRecordCreateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nm = String(e.record.getString("angajat") || "").trim();
    var ok = false;
    if (nm) { try { ok = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:u}", { n: nm, u: e.auth.id })) > 0; } catch (err) { ok = false; } }
    if (!ok) throw new BadRequestError("Pontajul se face doar pentru angajații creați de dumneavoastră.");
  }
  e.next();
}, "pontaj");
onRecordUpdateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nm = String(e.record.getString("angajat") || "").trim();
    var ok = false;
    if (nm) { try { ok = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:u}", { n: nm, u: e.auth.id })) > 0; } catch (err) { ok = false; } }
    if (!ok) throw new BadRequestError("Pontajul se face doar pentru angajații creați de dumneavoastră.");
  }
  e.next();
}, "pontaj");

/* ---- an operator sets a salary only for the employees he created himself; a director for anyone ---- */
onRecordCreateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nm = String(e.record.getString("angajat") || "").trim();
    var ok = false;
    if (nm) { try { ok = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:u}", { n: nm, u: e.auth.id })) > 0; } catch (err) { ok = false; } }
    if (!ok) throw new BadRequestError("Salariul se stabilește doar pentru angajații creați de dumneavoastră.");
  }
  e.next();
}, "istoric");
onRecordUpdateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var nm = String(e.record.getString("angajat") || "").trim();
    var ok = false;
    if (nm) { try { ok = $app.countRecords("angajati", $dbx.exp("TRIM(nume) = {:n} AND by = {:u}", { n: nm, u: e.auth.id })) > 0; } catch (err) { ok = false; } }
    if (!ok) throw new BadRequestError("Salariul se stabilește doar pentru angajații creați de dumneavoastră.");
  }
  e.next();
}, "istoric");

/* ---- a collaborator's expense: he is the payer. Cash comes out of the money the director gave him and cannot take
        his balance below zero; a transfer is paid by the firm's account, which may go below zero. The cashier pays from the till. ---- */
onRecordCreateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director") {
    var me = String(e.auth.getString("nume") || "").trim();
    var cas = "";
    try { cas = String($app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim(); } catch (err) { cas = ""; }
    if (!(cas && cas === me)) {
      e.record.set("platitDe", me);
      if (e.record.getString("mod") !== "Transfer") {
        e.record.set("sursa", "Avans");
        var res = new DynamicModel({ v: 0 });
        $app.db().newQuery("SELECT (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) AS v").bind({ n: me }).one(res);
        if (e.record.getFloat("suma") > res.v + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
      }
    }
  }
  e.next();
}, "cheltuieli");
onRecordUpdateRequest((e) => {
  if (e.auth && e.auth.getString("rol") !== "Director" && e.record.original) {
    var me = String(e.auth.getString("nume") || "").trim();
    var cas = "";
    try { cas = String($app.findFirstRecordByFilter("config", "id != ''").getString("casier") || "").trim(); } catch (err) { cas = ""; }
    if (!(cas && cas === me)) {
      e.record.set("platitDe", e.record.original().getString("platitDe"));
      if (e.record.getString("mod") !== "Transfer") {
        e.record.set("sursa", "Avans");
        var res = new DynamicModel({ v: 0 });
        $app.db().newQuery("SELECT (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE destinatie='Dat persoanei' AND TRIM(persoana)={:n}) - (SELECT COALESCE(SUM(suma),0) FROM cheltuieli WHERE [[mod]]<>'Transfer' AND TRIM(platitDe)={:n}) - (SELECT COALESCE(SUM(suma*curs),0) FROM iesiri WHERE sursa='Avans' AND TRIM(platitDe)={:n}) AS v").bind({ n: me }).one(res);
        var back = e.record.original().getString("mod") !== "Transfer" ? e.record.original().getFloat("suma") : 0;
        var need = e.record.getFloat("suma");
        if (need > back && need > res.v + back + 0.004) throw new BadRequestError("Nu aveți destui bani din avans. Cereți mai întâi bani de la director.");
      }
    }
  }
  e.next();
}, "cheltuieli");

/* ---- an expense must say what the money was spent on ---- */
onRecordCreateRequest((e) => {
  if (String(e.record.getString("descriere") || "").trim().length < 3) throw new BadRequestError("Scrieți pe ce s-au cheltuit banii (descrierea este obligatorie).");
  e.next();
}, "cheltuieli");
onRecordUpdateRequest((e) => {
  if (String(e.record.getString("descriere") || "").trim().length < 3) throw new BadRequestError("Scrieți pe ce s-au cheltuit banii (descrierea este obligatorie).");
  e.next();
}, "cheltuieli");
