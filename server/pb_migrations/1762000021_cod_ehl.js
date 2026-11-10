/// <reference path="../pb_data/types.d.ts" />
/* The EHL access code of a director: taking money out of the common EHL till needs it (the till is the directors'
   supreme account; each director has his own code for it). Empty for operators. */
migrate((app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  c.fields.add(new TextField({ name: "codEHL", max: 8 }));
  app.save(c);
}, (app) => {
  var c = app.findCollectionByNameOrId("utilizatori");
  c.fields.removeByName("codEHL");
  app.save(c);
});
