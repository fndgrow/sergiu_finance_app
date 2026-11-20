/// <reference path="../pb_data/types.d.ts" />
/* Access codes of any kind (20 November 2026): letters, digits, signs — 4 to 64 characters, no spaces at the ends;
   the hooks keep every code unique across cod and codEHL, and each person changes his own from Setări → Securitate
   (/api/ehl/cod, confirmed with the current code and the authenticator). Before: 4–8 digits. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  var f = c.fields.getByName("cod"); f.min = 4; f.max = 64; f.pattern = "";
  var g = c.fields.getByName("codEHL"); g.max = 64;
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  var f = c.fields.getByName("cod"); f.min = 4; f.max = 8; f.pattern = "^[0-9]+$";
  var g = c.fields.getByName("codEHL"); g.max = 8;
  app.save(c);
});
