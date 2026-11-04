/// <reference path="../pb_data/types.d.ts" />
/* Money from clients is recorded by the director only (the client's rule); operators keep reading the list. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("incasari");
  c.createRule = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("incasari");
  c.createRule = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  app.save(c);
});
