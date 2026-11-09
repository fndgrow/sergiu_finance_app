/// <reference path="../pb_data/types.d.ts" />
/* Nobody changes another user's rows, the director included: a row is updated or deleted only by its author
   (operators also only within 15 days, see the hook). Users and settings stay the director's. */
migrate((app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "grafic"].forEach(function (name) {
    var c = app.findCollectionByNameOrId(name);
    c.updateRule = MEM + ' && by = @request.auth.id';
    c.deleteRule = DIR + ' && by = @request.auth.id';
    app.save(c);
  });
}, (app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  ["incasari", "cheltuieli", "iesiri", "chirii", "contracte", "imprumuturi", "proiecte", "angajati", "istoric", "pontaj", "grafic"].forEach(function (name) {
    var c = app.findCollectionByNameOrId(name);
    c.updateRule = DIR + ' || (' + MEM + ' && by = @request.auth.id)';
    c.deleteRule = DIR;
    app.save(c);
  });
});
