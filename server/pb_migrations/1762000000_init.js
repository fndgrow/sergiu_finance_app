/// <reference path="../pb_data/types.d.ts" />
/* Casieria EHL — schema and access rules. Runs automatically on first start. */
migrate((app) => {
  var MEMBER = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var DIRECTOR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var OWN_OR_DIR = DIRECTOR + ' || (' + MEMBER + ' && by = @request.auth.id)';

  function t(name) { return { type: "text", name: name, max: 500 }; }
  function num(name) { return { type: "number", name: name }; }
  function created() { return { type: "autodate", name: "created", onCreate: true, onUpdate: false }; }
  function updated() { return { type: "autodate", name: "updated", onCreate: true, onUpdate: true }; }

  /* users: keyed by a numeric access code; email/password are random and never used directly */
  var users = new Collection({
    type: "auth",
    name: "utilizatori",
    listRule: DIRECTOR + ' || (id = @request.auth.id && @request.auth.status != "Inactiv")',
    viewRule: DIRECTOR + ' || (id = @request.auth.id && @request.auth.status != "Inactiv")',
    createRule: DIRECTOR,
    updateRule: DIRECTOR,
    deleteRule: DIRECTOR,
    authRule: 'status != "Inactiv"',
    fields: [
      { type: "text", name: "nume", required: true, max: 120 },
      { type: "select", name: "rol", values: ["Operator", "Director"], maxSelect: 1, required: true },
      { type: "text", name: "cod", required: true, min: 4, max: 8, pattern: "^[0-9]+$" },
      { type: "select", name: "status", values: ["Activ", "Inactiv"], maxSelect: 1, required: true },
      created(), updated()
    ],
    indexes: ["CREATE UNIQUE INDEX idx_utilizatori_cod ON utilizatori (cod)"],
    authToken: { duration: 31536000 },
    passwordAuth: { enabled: true, identityFields: ["email"] },
    oauth2: { enabled: false },
    otp: { enabled: false },
    mfa: { enabled: false }
  });
  app.save(users);
  var byField = { type: "relation", name: "by", collectionId: users.id, maxSelect: 1, cascadeDelete: false };

  function register(name, fields, rules) {
    var c = new Collection({
      type: "base",
      name: name,
      listRule: rules.list, viewRule: rules.view, createRule: rules.create, updateRule: rules.update, deleteRule: rules.del,
      fields: fields.concat([byField, created(), updated()])
    });
    app.save(c);
  }
  var std = { list: MEMBER, view: MEMBER, create: MEMBER, update: OWN_OR_DIR, del: DIRECTOR };
  var dirRead = { list: DIRECTOR, view: DIRECTOR, create: DIRECTOR, update: DIRECTOR, del: DIRECTOR };
  var ownRead = { list: OWN_OR_DIR, view: OWN_OR_DIR, create: MEMBER, update: OWN_OR_DIR, del: DIRECTOR };

  register("incasari", [t("data"), t("client"), t("proiect"), t("descriere"), t("valuta"), num("curs"), num("suma"), t("mod")], std);
  register("cheltuieli", [t("data"), num("suma"), t("categorie"), t("descriere"), t("client"), t("proiect"), t("platitDe"), t("mod")], std);
  register("iesiri", [t("data"), t("destinatie"), t("valuta"), num("curs"), num("suma"), t("persoana"), t("luna"), t("nota")], std);
  register("chirii", [t("dataInceput"), t("dataSfarsit"), t("locatia"), t("chirias"), t("valuta"), num("curs"), num("chirie"), num("gaj"), num("comunale"), num("avarii"), t("mod"), t("nota")], std);
  register("contracte", [t("client"), num("sumaContract"), num("deIncasatCash"), t("nota")], std);
  register("imprumuturi", [t("data"), t("persoana"), num("suma"), t("termen"), t("status"), t("nota")], std);
  register("proiecte", [t("nume"), t("client"), t("responsabili"), num("buget"), t("dataInceput"), t("termen"), t("status"), t("nota")], std);
  register("angajati", [t("nume"), t("dataInceput"), t("status")], std);
  /* salaries: history only for directors; timesheets visible to their author and directors */
  register("istoric", [t("angajat"), num("salariu"), t("dinData")], dirRead);
  register("pontaj", [t("luna"), t("angajat"), num("z1"), num("z2")], ownRead);

  /* audit trail: anyone signed in appends, directors read, nobody edits or deletes (superuser only) */
  var jurnal = new Collection({
    type: "base",
    name: "jurnal",
    listRule: DIRECTOR, viewRule: DIRECTOR, createRule: MEMBER, updateRule: null, deleteRule: null,
    fields: [t("act"), t("col"), t("ref"), t("nume"), { type: "json", name: "data", maxSize: 200000 }, byField, created()],
    indexes: ["CREATE INDEX idx_jurnal_created ON jurnal (created)"]
  });
  app.save(jurnal);

  /* one settings record */
  var config = new Collection({
    type: "base",
    name: "config",
    listRule: MEMBER, viewRule: MEMBER, createRule: DIRECTOR, updateRule: DIRECTOR, deleteRule: null,
    fields: [{ type: "json", name: "valute", maxSize: 20000 }, t("casier"), { type: "json", name: "categorii", maxSize: 20000 }, updated()]
  });
  app.save(config);

  /* failed login attempts, for rate limiting; written only by the server */
  var attempts = new Collection({
    type: "base",
    name: "login_attempts",
    listRule: null, viewRule: null, createRule: null, updateRule: null, deleteRule: null,
    fields: [t("ip"), created()],
    indexes: ["CREATE INDEX idx_login_attempts_ip ON login_attempts (ip, created)"]
  });
  app.save(attempts);
}, (app) => {
  ["login_attempts", "config", "jurnal", "pontaj", "istoric", "angajati", "proiecte", "imprumuturi", "contracte", "chirii", "iesiri", "cheltuieli", "incasari", "utilizatori"]
    .forEach(function (n) { try { app.delete(app.findCollectionByNameOrId(n)); } catch (e) {} });
});
