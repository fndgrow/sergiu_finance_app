/// <reference path="../pb_data/types.d.ts" />
/* Salary advances (21 November 2026): money given to an employee during the month on account of his salary. It is a
   "Salarii" expense of that month like any salary payment (so it is deducted from what he is still due, and covers his
   schedule days in date order), marked `avans` so the screens can show it apart: "Avansuri 2 000 · Rest 8 000". */
migrate((app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.add(new BoolField({ name: "avans" }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.removeByName("avans");
  app.save(c);
});
