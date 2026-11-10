/// <reference path="../pb_data/types.d.ts" />
/* Currency exchange: a person (administrator or collaborator) swaps money he holds from one currency to another.
   The record is his: he and the directors read it. */
migrate((app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var OWN = DIR + ' || (' + MEM + ' && by = @request.auth.id)';
  var users = app.findCollectionByNameOrId("utilizatori");
  function t(name) { return { type: "text", name: name, max: 500 }; }
  var c = new Collection({
    type: "base", name: "schimburi",
    listRule: OWN, viewRule: OWN, createRule: MEM, updateRule: OWN, deleteRule: DIR,
    fields: [t("data"), t("persoana"), t("valutaDin"), { type: "number", name: "sumaDin" }, t("valutaIn"), { type: "number", name: "sumaIn" }, t("nota"),
      { type: "relation", name: "by", collectionId: users.id, maxSelect: 1, cascadeDelete: false },
      { type: "autodate", name: "created", onCreate: true, onUpdate: false }, { type: "autodate", name: "updated", onCreate: true, onUpdate: true }]
  });
  app.save(c);
}, (app) => {
  try { app.delete(app.findCollectionByNameOrId("schimburi")); } catch (e) {}
});
