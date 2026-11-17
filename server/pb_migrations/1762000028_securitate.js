/// <reference path="../pb_data/types.d.ts" />
/* Security (17 November 2026 review):
   1. The default PocketBase "users" auth collection was open for sign-up. A stranger could register there and, because the
      rules only checked "signed in and not Inactiv", read employees, salaries, the schedule and projects. It is locked.
   2. Every rule now requires the signed-in record to come from "utilizatori".
   3. Projects (EHL only) and the legacy contracts are created by directors only. */
migrate((app) => {
  var AUTH = '@request.auth.collectionName = "utilizatori"';
  var DIR = AUTH + ' && @request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "schimburi", "proiecte", "angajati", "istoric", "pontaj", "grafic", "jurnal", "config", "utilizatori"].forEach(function (name) {
    var c; try { c = app.findCollectionByNameOrId(name); } catch (e) { return; }
    ["listRule", "viewRule", "createRule", "updateRule", "deleteRule"].forEach(function (k) {
      var r = c[k];
      if (r === null || r === undefined || r === "") return; /* locked rules stay locked; none of ours is public */
      r = r.split('@request.auth.id != ""').join(AUTH).split('@request.auth.rol = "Director"').join(AUTH + ' && @request.auth.rol = "Director"');
      if (r.indexOf(AUTH) < 0) r = AUTH + " && (" + r + ")";
      c[k] = r;
    });
    if (name === "proiecte" || name === "contracte") c.createRule = DIR;
    app.save(c);
  });
  try {
    var u = app.findCollectionByNameOrId("users");
    u.listRule = null; u.viewRule = null; u.createRule = null; u.updateRule = null; u.deleteRule = null;
    app.save(u);
    try { u.passwordAuth.enabled = false; app.save(u); } catch (e) {}
  } catch (e) {}
}, (app) => {
  /* no automatic way back: the old rules let strangers in */
});
