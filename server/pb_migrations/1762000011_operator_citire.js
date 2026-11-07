/// <reference path="../pb_data/types.d.ts" />
/* A collaborator reads only what is his: the expenses he entered or paid, the money given to him, his own rents and
   employees. Incomes, contracts and loans are the directors'. Projects stay readable (the expense form needs them). */
migrate((app) => {
  var DIR = '@request.auth.rol = "Director" && @request.auth.status != "Inactiv"';
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  var set = function (name, rule) { var c = app.findCollectionByNameOrId(name); c.listRule = rule; c.viewRule = rule; app.save(c); };
  set("incasari", DIR);
  set("contracte", DIR);
  set("imprumuturi", DIR);
  set("cheltuieli", DIR + ' || (' + MEM + ' && (by = @request.auth.id || platitDe = @request.auth.nume))');
  set("iesiri", DIR + ' || (' + MEM + ' && (by = @request.auth.id || persoana = @request.auth.nume))');
  set("chirii", DIR + ' || (' + MEM + ' && by = @request.auth.id)');
  set("angajati", DIR + ' || (' + MEM + ' && by = @request.auth.id)');
}, (app) => {
  var MEM = '@request.auth.id != "" && @request.auth.status != "Inactiv"';
  ["incasari", "contracte", "imprumuturi", "cheltuieli", "iesiri", "chirii", "angajati"].forEach(function (name) {
    var c = app.findCollectionByNameOrId(name); c.listRule = MEM; c.viewRule = MEM; app.save(c);
  });
});
