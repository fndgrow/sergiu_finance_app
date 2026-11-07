/// <reference path="../pb_data/types.d.ts" />
/* The work schedule: one row per employee and day with the hours worked (8 hours = one timesheet day).
   A collaborator writes and reads his own rows (the hook limits him to the employees he created); directors all. */
migrate((app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var users = app.findCollectionByNameOrId("utilizatori");
  var c = new Collection({
    type: "base",
    name: "grafic",
    listRule: DIR + ' || (' + MEM + ' && by = @request.auth.id)',
    viewRule: DIR + ' || (' + MEM + ' && by = @request.auth.id)',
    createRule: MEM,
    updateRule: DIR + ' || (' + MEM + ' && by = @request.auth.id)',
    deleteRule: DIR,
    fields: [
      { type: "text", name: "angajat", max: 500 },
      { type: "text", name: "data", max: 10 },
      { type: "number", name: "ore" },
      { type: "relation", name: "by", collectionId: users.id, maxSelect: 1, cascadeDelete: false },
      { type: "autodate", name: "created", onCreate: true, onUpdate: false },
      { type: "autodate", name: "updated", onCreate: true, onUpdate: true }
    ],
    indexes: ["CREATE INDEX idx_grafic_zi ON grafic (angajat, data)"]
  });
  app.save(c);
}, (app) => {
  try { app.delete(app.findCollectionByNameOrId("grafic")); } catch (e) {}
});
