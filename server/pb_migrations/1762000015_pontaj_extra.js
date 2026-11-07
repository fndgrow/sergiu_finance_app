/// <reference path="../pb_data/types.d.ts" />
/* A timesheet may carry an extra amount (a bonus for work beyond the ordinary); it is part of the month's salary. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("pontaj");
  c.fields.add(new NumberField({ name: "extra" }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("pontaj");
  c.fields.removeByName("extra");
  app.save(c);
});
