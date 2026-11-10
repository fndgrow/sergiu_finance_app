/// <reference path="../pb_data/types.d.ts" />
/* The expense category "Arhitectură" joins the list in the settings (kept if the director already added it). */
function arhCats(cfg) {
  var cats = [];
  try { cats = JSON.parse(cfg.getString("categorii") || "[]"); } catch (e) { cats = []; }
  if (!Array.isArray(cats)) cats = [];
  return cats.map(function (c) { return String(c); });
}
migrate((app) => {
  /* an empty database (a fresh install) has no settings record yet: the first sign-in creates it with the defaults */
  var cfg = null;
  try { cfg = app.findFirstRecordByFilter("config", "id != ''"); } catch (e) { cfg = null; }
  if (!cfg) return;
  var cats = arhCats(cfg);
  var has = cats.some(function (c) { return c.trim().toLowerCase().replace("ă", "a") === "arhitectura"; });
  if (!has) { cats.push("Arhitectură"); cfg.set("categorii", cats); app.save(cfg); }
}, (app) => {
  var cfg = null;
  try { cfg = app.findFirstRecordByFilter("config", "id != ''"); } catch (e) { cfg = null; }
  if (!cfg) return;
  cfg.set("categorii", arhCats(cfg).filter(function (c) { return c.trim() !== "Arhitectură"; }));
  app.save(cfg);
});
