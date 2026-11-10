/// <reference path="../pb_data/types.d.ts" />
/* A project is never deleted: it is finished or paused, its incomes and expenses stay on it. Nobody has the delete rule. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.deleteRule = null;
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.deleteRule = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  app.save(c);
});
