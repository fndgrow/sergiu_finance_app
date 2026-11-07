/// <reference path="../pb_data/types.d.ts" />
/* A project carries the sum of its contract and the "adăugător" (extra work the client asked for on top of it),
   both in MDL; what the client paid in cash and by transfer is counted from the incomes that name the project. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.add(new NumberField({ name: "sumaContract" }));
  c.fields.add(new NumberField({ name: "adaugator" }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.removeByName("sumaContract");
  c.fields.removeByName("adaugator");
  app.save(c);
});
