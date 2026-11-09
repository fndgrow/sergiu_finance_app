/// <reference path="../pb_data/types.d.ts" />
/* The settings carry the names of the active directors, so every user's app can keep them out of the employees it
   schedules and pays. The hooks refresh the list whenever a user changes. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("config");
  c.fields.add(new JSONField({ name: "directori", maxSize: 20000 }));
  app.save(c);
  var names = [];
  try { app.findRecordsByFilter("utilizatori", "rol = 'Director' && status != 'Inactiv'", "", 0, 0).forEach(function (r) { names.push(r.getString("nume")); }); } catch (e) {}
  try { var cfg = app.findFirstRecordByFilter("config", "id != ''"); cfg.set("directori", names); app.save(cfg); } catch (e) {}
}, (app) => {
  var c = app.findCollectionByNameOrId("config");
  c.fields.removeByName("directori");
  app.save(c);
});
