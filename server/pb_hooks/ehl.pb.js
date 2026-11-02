/// <reference path="../pb_data/types.d.ts" />
/* Casieria EHL — server hooks.
   Handlers cannot share functions declared outside them (PocketBase JS VM rule), so helpers are inlined. */

var DATA_COLS = ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "jurnal"];

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

  if (!rec || rec.getString("status") === "Inactiv") {
    var att = new Record($app.findCollectionByNameOrId("login_attempts"));
    att.set("ip", ip);
    $app.save(att);
    try {
      var old = new Date(Date.now() - 24 * 3600 * 1000).toISOString().replace("T", " ").slice(0, 19);
      $app.db().newQuery("DELETE FROM login_attempts WHERE created < {:old}").bind({ old: old }).execute();
    } catch (err) {}
    throw new UnauthorizedError("Cod greșit sau utilizator dezactivat.");
  }

  var token = rec.newAuthToken();
  return e.json(200, {
    token: token,
    first: first,
    record: { id: rec.id, nume: rec.getString("nume"), rol: rec.getString("rol"), cod: rec.getString("cod"), status: rec.getString("status") }
  });
});

/* ---- every register row carries its author, set by the server, never by the client ---- */
onRecordCreateRequest((e) => {
  if (e.auth) e.record.set("by", e.auth.id);
  e.next();
}, "incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "jurnal");

onRecordUpdateRequest((e) => {
  /* the author never changes on edit */
  if (e.record.original) e.record.set("by", e.record.original().getString("by"));
  e.next();
}, "incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj");

/* ---- users: random credentials, numeric codes, no self-lockout ---- */
onRecordCreateRequest((e) => {
  var cod = String(e.record.getString("cod") || "").trim();
  if (!/^[0-9]{4,8}$/.test(cod)) throw new BadRequestError("Codul trebuie să aibă 4–8 cifre.");
  e.record.set("cod", cod);
  if (!e.record.getString("status")) e.record.set("status", "Activ");
  if (!e.record.getString("rol")) e.record.set("rol", "Operator");
  e.record.set("email", $security.randomStringWithAlphabet(12, "abcdefghijklmnopqrstuvwxyz") + "@casieria.local");
  e.record.setPassword($security.randomString(32));
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
  /* credentials stay server-owned */
  if (e.record.original) {
    e.record.set("email", e.record.original().getString("email"));
  }
  e.next();
}, "utilizatori");

onRecordDeleteRequest((e) => {
  if (e.auth && e.auth.id === e.record.id) throw new BadRequestError("Nu vă puteți șterge propriul cont.");
  e.next();
}, "utilizatori");
