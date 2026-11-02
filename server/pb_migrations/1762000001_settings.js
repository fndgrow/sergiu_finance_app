/// <reference path="../pb_data/types.d.ts" />
/* Behind nginx every request arrives from 127.0.0.1; the real client address is in X-Real-IP.
   The login rate limit counts attempts per that address, so PocketBase must trust the header. */
migrate((app) => {
  var s = app.settings();
  s.trustedProxy.headers = ["X-Real-IP"];
  s.trustedProxy.useLeftmostIP = false;
  s.meta.appName = "Casieria EHL";
  s.meta.hideControls = true;
  app.save(s);
}, (app) => {
  var s = app.settings();
  s.trustedProxy.headers = [];
  app.save(s);
});
