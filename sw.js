/* Casieria EHL — service worker.
   Bump CACHE whenever app files change, so phones pick up the new version. */
var CACHE = "casieria-ehl-v112";
var SHELL = [
  "./", "./index.html", "./styles.css", "./app.js", "./app-config.js", "./vendor/pocketbase.umd.js", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/icon-maskable-512.png", "./icons/apple-touch-icon.png"
];
var LIB_HOSTS = ["cdnjs.cloudflare.com", "cdn.jsdelivr.net", "fonts.googleapis.com", "fonts.gstatic.com"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  var sameOrigin = url.origin === self.location.origin;
  var isLib = LIB_HOSTS.indexOf(url.hostname) >= 0;
  if (!sameOrigin && !isLib) return;
  /* PocketBase API, realtime stream and admin UI are never cached */
  if (sameOrigin && (url.pathname.indexOf("/api/") === 0 || url.pathname.indexOf("/_/") === 0)) return;

  if (sameOrigin) {
    /* app shell: network first, so updates arrive; cache keeps it working offline */
    e.respondWith(fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    }).catch(function () {
      return caches.match(req).then(function (hit) { return hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined); });
    }));
    return;
  }
  /* libraries and fonts: cache first, they are versioned URLs */
  e.respondWith(caches.match(req).then(function (hit) {
    if (hit) return hit;
    return fetch(req).then(function (res) {
      if (res && (res.ok || res.type === "opaque")) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
      return res;
    });
  }));
});
