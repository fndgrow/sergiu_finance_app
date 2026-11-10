/// <reference path="../pb_data/types.d.ts" />
/* A project's contract may be split over currencies: sumaContract (MDL) plus contractEUR and contractUSD. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.add(new NumberField({ name: "contractEUR" }));
  c.fields.add(new NumberField({ name: "contractUSD" }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.removeByName("contractEUR");
  c.fields.removeByName("contractUSD");
  app.save(c);
});
