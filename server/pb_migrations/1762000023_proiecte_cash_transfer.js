/// <reference path="../pb_data/types.d.ts" />
/* The contract of a project (in euro) is split into what the client pays in cash and what by transfer. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.add(new NumberField({ name: "contractCash" }));
  c.fields.add(new NumberField({ name: "contractTransfer" }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.removeByName("contractCash");
  c.fields.removeByName("contractTransfer");
  app.save(c);
});
