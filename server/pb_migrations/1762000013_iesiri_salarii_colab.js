/// <reference path="../pb_data/types.d.ts" />
/* A collaborator pays the salary of his employees from his advance (the "Achitat" box of a timesheet creates a
   "Salarii" outflow). The create rule opens to members again; the hook allows a collaborator nothing but "Salarii",
   within his advance. Directors unchanged. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("iesiri");
  c.createRule = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("iesiri");
  c.createRule = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  app.save(c);
});
