/* Prop Desk service worker. Network-first for everything on this origin, so an online visitor
   never sees a stale deal or rule. Offline, the last copy seen is served (the page shows an
   "offline" banner), or /offline/ for pages never visited. VER is stamped by build_site.py so
   each publish starts a fresh cache. */
var V = 'pd-20261113-0500';
var OFF = '/offline/';
self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(V).then(function (c) { return c.addAll([OFF]); }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k !== V; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin !== self.location.origin) return;          // fonts, TradingView, firm sites: untouched
  if (u.pathname.indexOf('/og/') === 0) return;
  if (u.pathname.indexOf('/go/') === 0) return;            // our click links: straight to the network, never cached            // share cards are for other apps, not the cache
  e.respondWith(fetch(r).then(function (res) {
    if (res && res.ok && res.type === 'basic') {
      var copy = res.clone();
      caches.open(V).then(function (c) { c.put(r, copy); });
    }
    return res;
  }).catch(function () {
    return caches.match(r, { ignoreSearch: r.mode === 'navigate' }).then(function (m) {
      if (m) return m;
      if (r.mode === 'navigate') return caches.match(OFF);
      return Response.error();
    });
  }));
});
