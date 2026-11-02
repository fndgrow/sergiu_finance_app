/// <reference path="../pb_data/types.d.ts" />
/* Automatic daily backup of the whole database at 03:00 server time, last 14 kept (pb_data/backups). */
migrate((app) => {
  var s = app.settings();
  s.backups.cron = "0 3 * * *";
  s.backups.cronMaxKeep = 14;
  app.save(s);
}, (app) => {
  var s = app.settings();
  s.backups.cron = "";
  app.save(s);
});
