/// <reference path="../pb_data/types.d.ts" />
/* A collaborator may set a salary for the employees he created (the hook checks the employee is his) and reads
   the salary rows he wrote; directors read and write everything. */
migrate((app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var c = app.findCollectionByNameOrId("istoric");
  c.listRule = DIR + ' || (' + MEM + ' && by = @request.auth.id)';
  c.viewRule = c.listRule;
  c.createRule = MEM;
  c.updateRule = DIR + ' || (' + MEM + ' && by = @request.auth.id)';
  app.save(c);
}, (app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var c = app.findCollectionByNameOrId("istoric");
  c.listRule = DIR; c.viewRule = DIR; c.createRule = DIR; c.updateRule = DIR;
  app.save(c);
});
