/// <reference path="../pb_data/types.d.ts" />
/* A clean install (17 November 2026, production server): the two fixed administrators and the settings exist from the
   start, so nobody's first code can make an anonymous "Director". Sergiu Cervoneac: own code 1234, Casa EHL 1111;
   Grigore Enachi: 4321 and 2222. No authenticator yet: each account is set up at its first sign-in.
   On a database that already has them (the test server) this changes nothing. */
migrate((app) => {
  var users = app.findCollectionByNameOrId("utilizatori");
  [["Sergiu Cervoneac", "1234", "1111"], ["Grigore Enachi", "4321", "2222"]].forEach(function (d) {
    var have = null;
    try { have = app.findFirstRecordByFilter("utilizatori", "nume = {:n}", { n: d[0] }); } catch (e) { have = null; }
    if (have) return;
    var r = new Record(users);
    r.set("nume", d[0]); r.set("rol", "Director"); r.set("cod", d[1]); r.set("codEHL", d[2]); r.set("status", "Activ");
    r.set("email", $security.randomStringWithAlphabet(12, "abcdefghijklmnopqrstuvwxyz") + "@casieria.local");
    r.setPassword($security.randomString(32)); /* never used: the sign-in is code + authenticator */
    app.save(r);
  });
  if (app.countRecords("config") === 0) {
    var cfg = new Record(app.findCollectionByNameOrId("config"));
    cfg.set("valute", [{ cod: "MDL", curs: 1 }, { cod: "EUR", curs: 20.22 }, { cod: "USD", curs: 17.5 }]);
    cfg.set("casier", "");
    cfg.set("categorii", ["Materiale", "Materiale / Fundația", "Materiale / Finisaje exterioare", "Materiale / Instalații sanitare și electrice",
      "Materiale / Acoperiș", "Materiale / Finisaje interioare", "Arhitectură", "Tâmplărie", "Combustibil", "Transport", "Servicii terțe",
      "Taxe și impozite", "Instrumente și unelte", "Reparații administrative", "Marketing", "Comision", "Consumabile",
      "Cheltuieli neplanificate", "Kit MgO", "Datorii"]);
    cfg.set("directori", ["Sergiu Cervoneac", "Grigore Enachi"]);
    app.save(cfg);
  }
}, (app) => {
  /* nothing to undo: the administrators and the settings stay */
});
