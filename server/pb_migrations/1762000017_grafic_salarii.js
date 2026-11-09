/// <reference path="../pb_data/types.d.ts" />
/* Employees and the work schedule are shared by every user; a schedule day carries what it was worked for; a salary is
   paid as an expense "Salarii" that names the employee and the month; a timesheet may pay the full monthly salary. */
migrate((app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var g = app.findCollectionByNameOrId("grafic");
  g.fields.add(new TextField({ name: "pentru", max: 20 }));
  g.fields.add(new TextField({ name: "proiect", max: 500 }));
  g.fields.add(new TextField({ name: "deCine", max: 120 }));
  g.listRule = MEM; g.viewRule = MEM;
  app.save(g);
  var a = app.findCollectionByNameOrId("angajati"); a.listRule = MEM; a.viewRule = MEM; app.save(a);
  var i = app.findCollectionByNameOrId("istoric"); i.listRule = MEM; i.viewRule = MEM; app.save(i);
  var c = app.findCollectionByNameOrId("cheltuieli");
  c.fields.add(new TextField({ name: "angajat", max: 500 }));
  c.fields.add(new TextField({ name: "luna", max: 7 }));
  c.listRule = DIR + ' || (' + MEM + ' && (by = @request.auth.id || platitDe = @request.auth.nume || categorie = "Salarii"))';
  c.viewRule = c.listRule;
  app.save(c);
  var p = app.findCollectionByNameOrId("pontaj");
  p.fields.add(new BoolField({ name: "complet" }));
  app.save(p);
}, (app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var g = app.findCollectionByNameOrId("grafic"); g.fields.removeByName("pentru"); g.fields.removeByName("proiect"); g.fields.removeByName("deCine"); g.listRule = DIR + ' || (' + MEM + ' && by = @request.auth.id)'; g.viewRule = g.listRule; app.save(g);
  var a = app.findCollectionByNameOrId("angajati"); a.listRule = DIR + ' || (' + MEM + ' && by = @request.auth.id)'; a.viewRule = a.listRule; app.save(a);
  var i = app.findCollectionByNameOrId("istoric"); i.listRule = DIR + ' || (' + MEM + ' && by = @request.auth.id)'; i.viewRule = i.listRule; app.save(i);
  var c = app.findCollectionByNameOrId("cheltuieli"); c.fields.removeByName("angajat"); c.fields.removeByName("luna"); c.listRule = DIR + ' || (' + MEM + ' && (by = @request.auth.id || platitDe = @request.auth.nume))'; c.viewRule = c.listRule; app.save(c);
  var p = app.findCollectionByNameOrId("pontaj"); p.fields.removeByName("complet"); app.save(p);
});
