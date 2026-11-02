/// <reference path="../pb_data/types.d.ts" />
/* Expenses paid in cash carry where the money came from: "Avans" (the advance the company gave)
   or "Proprii" (the employee's own money, which the company owes back). */
migrate((app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.add(new TextField({ name: "sursa", max: 20 }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.removeByName("sursa");
  app.save(c);
});
