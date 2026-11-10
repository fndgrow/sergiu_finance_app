/// <reference path="../pb_data/types.d.ts" />
/* Where a rent is paid from: "Casa" (the till: a director or the cashier recorded it) or "Avans" (a collaborator
   recorded it, so it comes out of the money the director gave him; "platitDe" names him). Set by the server. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("chirii");
  c.fields.add(new TextField({ name: "sursa", max: 20 }));
  c.fields.add(new TextField({ name: "platitDe", max: 500 }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("chirii");
  c.fields.removeByName("sursa");
  c.fields.removeByName("platitDe");
  app.save(c);
});
