/// <reference path="../pb_data/types.d.ts" />
/* Change requests (21 November 2026). A register row may be corrected for 12 hours after it was written. Later its author
   asks for an approval — a collaborator from an administrator, an administrator from the other administrator — and once
   approved he may edit (an administrator also delete) that row for 24 hours. The request is his: he and the directors
   read it; the directors answer it (the hook keeps a director from answering his own). */
migrate((app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var OWN = DIR + ' || (' + MEM + ' && by = @request.auth.id)';
  var users = app.findCollectionByNameOrId("utilizatori");
  function t(name) { return { type: "text", name: name, max: 500 }; }
  var c = new Collection({
    type: "base", name: "cereri",
    listRule: OWN, viewRule: OWN, createRule: MEM, updateRule: DIR, deleteRule: DIR,
    fields: [t("col"), t("rid"), t("motiv"), t("status"), t("deNume"), t("aprobatDe"), t("aprobatLa"), t("rezumat"),
      { type: "relation", name: "by", collectionId: users.id, maxSelect: 1, cascadeDelete: false },
      { type: "autodate", name: "created", onCreate: true, onUpdate: false }, { type: "autodate", name: "updated", onCreate: true, onUpdate: true }]
  });
  app.save(c);
}, (app) => {
  try { app.delete(app.findCollectionByNameOrId("cereri")); } catch (e) {}
});
