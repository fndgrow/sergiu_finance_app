/// <reference path="../pb_data/types.d.ts" />
/* An expense may be in MDL, EUR or USD (20 November 2026): the currency and the rate of the day are kept on the row
   (old rows have neither and count as lei at 1). Totals, categories, projects and the payer's balance use the lei value
   (suma × curs); the payer's holdings per currency subtract the expense in its own currency. Salary rows stay in lei. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.add(new TextField({ name: "valuta" }));
  c.fields.add(new NumberField({ name: "curs" }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.removeByName("valuta");
  c.fields.removeByName("curs");
  app.save(c);
});
