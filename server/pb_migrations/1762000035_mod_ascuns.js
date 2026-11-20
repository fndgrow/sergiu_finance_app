/// <reference path="../pb_data/types.d.ts" />
/* The hidden mode (20 November 2026). A person's alarm code opens his own account like his access code, but puts the whole
   application into hidden mode: every register answers empty to everyone, new rows are acknowledged but not stored, and
   nothing on the server changes. The reactivation code, typed on the sign-in screen, brings everything back. Only hashes
   are kept; `alarmaSet` / `reactivareSet` tell the app whether a code exists. `ascuns` itself is hidden from the API. */
migrate((app) => {
  var u = app.findCollectionByNameOrId("utilizatori");
  u.fields.add(new TextField({ name: "alarmaHash", max: 64, hidden: true }));
  u.fields.add(new BoolField({ name: "alarmaSet" }));
  app.save(u);
  var c = app.findCollectionByNameOrId("config");
  c.fields.add(new TextField({ name: "reactivareHash", max: 64, hidden: true }));
  c.fields.add(new BoolField({ name: "reactivareSet" }));
  c.fields.add(new BoolField({ name: "ascuns", hidden: true }));
  app.save(c);
}, (app) => {
  var u = app.findCollectionByNameOrId("utilizatori");
  ["alarmaHash", "alarmaSet"].forEach(function (f) { u.fields.removeByName(f); });
  app.save(u);
  var c = app.findCollectionByNameOrId("config");
  ["reactivareHash", "reactivareSet", "ascuns"].forEach(function (f) { c.fields.removeByName(f); });
  app.save(c);
});
