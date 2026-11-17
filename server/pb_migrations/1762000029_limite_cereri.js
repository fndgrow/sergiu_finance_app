/// <reference path="../pb_data/types.d.ts" />
/* Rate limits on: the superuser login and every collection auth endpoint were open to unlimited password guessing.
   The custom code login keeps its own limiter (8 tries / 15 min per IP). */
migrate((app) => {
  var s = app.settings();
  s.rateLimits.enabled = true;
  s.rateLimits.rules = [
    { label: "*:auth", maxRequests: 5, duration: 10 },
    { label: "*:authRefresh", maxRequests: 10, duration: 10 },
    { label: "/api/collections/_superusers", maxRequests: 5, duration: 60 },
    { label: "/api/ehl/login", maxRequests: 60, duration: 60 }, /* an office shares one IP; wrong codes are limited separately (8 / 15 min) */
    { label: "*:create", maxRequests: 120, duration: 5 },
    { label: "/api/batch", maxRequests: 3, duration: 1 },
    { label: "/api/", maxRequests: 600, duration: 10 }
  ];
  app.save(s);
}, (app) => {
  var s = app.settings();
  s.rateLimits.enabled = false;
  app.save(s);
});
