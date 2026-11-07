/// <reference path="../pb_data/types.d.ts" />
/* Money leaves the till only through a director: collaborators record expenses, not till outflows. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("iesiri");
  c.createRule = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("iesiri");
  c.createRule = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  app.save(c);
});
