/// <reference path="../pb_data/types.d.ts" />
/* Where an outflow is paid from: "Casa" (the till: a director or the cashier recorded it) or "Avans" (a collaborator
   recorded it, so it comes out of the money the director gave him; "platitDe" names that collaborator).
   Both are set by the server from the author's role. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("iesiri");
  c.fields.add(new TextField({ name: "sursa", max: 20 }));
  c.fields.add(new TextField({ name: "platitDe", max: 500 }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("iesiri");
  c.fields.removeByName("sursa");
  c.fields.removeByName("platitDe");
  app.save(c);
});
