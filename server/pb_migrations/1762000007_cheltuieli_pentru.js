/// <reference path="../pb_data/types.d.ts" />
/* What an expense is for: "Proiect" (a project is named), "EHL" (the firm itself) or "Altele". */
migrate((app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.add(new TextField({ name: "pentru", max: 20 }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.removeByName("pentru");
  app.save(c);
});
