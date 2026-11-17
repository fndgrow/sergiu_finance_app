/// <reference path="../pb_data/types.d.ts" />
/* Two-factor sign-in. Directors: login + password + authenticator code. Collaborators: their PIN + authenticator code.
   The secret, the last used step and the recovery-code hashes are hidden fields: the API never returns them and only the
   hooks write them. The two directors get their first login and password here (the owner's choice: login = first name,
   password = the old access code); the app asks them to set the authenticator up at the first sign-in, and they change
   the password from Setări afterwards. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  c.fields.add(new TextField({ name: "login", max: 40 }));
  c.fields.add(new BoolField({ name: "twoFA" }));
  c.fields.add(new TextField({ name: "totpSecret", max: 64, hidden: true }));
  c.fields.add(new NumberField({ name: "totpLast", hidden: true }));
  c.fields.add(new JSONField({ name: "recuperare", maxSize: 4000, hidden: true }));
  c.addIndex("idx_utilizatori_login", true, "login", "login != ''");
  /* the first passwords are the old access codes (4 digits, the owner's choice); passwords set from the app must have 8+ */
  try { c.fields.getByName("password").min = 4; } catch (e) { console.log("migration 0030: password min: " + e); }
  app.save(c);
  var first = { "sergiu cervoneac": "sergiu", "grigore enachi": "grigore" };
  try {
    app.findRecordsByFilter("utilizatori", "rol = 'Director'", "", 0, 0).forEach(function (r) {
      var lg = first[String(r.getString("nume") || "").trim().toLowerCase()];
      if (!lg || r.getString("login")) return;
      r.set("login", lg); r.setPassword(r.getString("cod")); r.set("parolaSetata", true);
      app.save(r);
    });
  } catch (e) { console.log("migration 0030: could not set the directors' logins: " + e); }
}, (app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  ["login", "twoFA", "totpSecret", "totpLast", "recuperare"].forEach(function (f) { c.fields.removeByName(f); });
  c.removeIndex("idx_utilizatori_login");
  app.save(c);
});
