/// <reference path="../pb_data/types.d.ts" />
/* Loans are given by a director (founder) only; collaborators do not record them. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("imprumuturi");
  c.createRule = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("imprumuturi");
  c.createRule = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  app.save(c);
});
