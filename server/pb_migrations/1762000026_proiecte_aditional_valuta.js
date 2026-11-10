/// <reference path="../pb_data/types.d.ts" />
/* The extra the client agreed beyond the contract ("Adițional", column adaugator) may be in EUR, MDL or USD. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.add(new TextField({ name: "adaugatorValuta", max: 10 }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("proiecte");
  c.fields.removeByName("adaugatorValuta");
  app.save(c);
});
