/// <reference path="../pb_data/types.d.ts" />
/* A loan may be handed out in MDL, EUR or USD: the currency and the rate of the day are kept on the record
   (old records have neither and count as lei at 1). */
migrate((app) => {
  var c = app.findCollectionByNameOrId("imprumuturi");
  c.fields.add(new TextField({ name: "valuta" }));
  c.fields.add(new NumberField({ name: "curs" }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("imprumuturi");
  c.fields.removeByName("valuta");
  c.fields.removeByName("curs");
  app.save(c);
});
