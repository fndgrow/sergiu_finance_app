/// <reference path="../pb_data/types.d.ts" />
/* Money put in by a founder (a director) is confirmed with that founder's own access code; the server writes who
   confirmed it and when into "confirmat". */
migrate((app) => {
  var c = app.findCollectionByNameOrId("incasari");
  c.fields.add(new TextField({ name: "confirmat", max: 120 }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("incasari");
  c.fields.removeByName("confirmat");
  app.save(c);
});
