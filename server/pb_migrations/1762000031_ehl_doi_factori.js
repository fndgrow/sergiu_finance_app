/// <reference path="../pb_data/types.d.ts" />
/* A director's two accounts, two authenticators: his own administrator account and the Casa EHL account each have their own
   secret, last-used step, recovery codes and "set up" flag. Same login and password; the code asked depends on the account. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  c.fields.add(new BoolField({ name: "twoFAEHL" }));
  c.fields.add(new TextField({ name: "totpSecretEHL", max: 64, hidden: true }));
  c.fields.add(new NumberField({ name: "totpLastEHL", hidden: true }));
  c.fields.add(new JSONField({ name: "recuperareEHL", maxSize: 4000, hidden: true }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  ["twoFAEHL", "totpSecretEHL", "totpLastEHL", "recuperareEHL"].forEach(function (f) { c.fields.removeByName(f); });
  app.save(c);
});
