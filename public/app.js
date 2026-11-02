/* Prop Desk app shell: bottom tab bar state, the More sheet, install-as-an-app, offline banner,
   service worker registration. Loaded on every page after search.js. */
(function () {
  if (window.__pdapp) return; window.__pdapp = 1;
  var path = location.pathname;
  var tab = path === '/' || path === '/index.html' ? 'deals'
          : path.indexOf('/finder/') === 0 ? 'finder'
          : path.indexOf('/firms/') === 0 ? 'firms'
          : path.indexOf('/news/') === 0 ? 'news' : '';
  var bar = document.querySelector('.tabbar');
  var sheet = document.getElementById('moresheet');
  var more = bar && bar.querySelector('[data-tab="more"]');
  if (bar) {
    bar.querySelectorAll('[data-tab]').forEach(function (a) {
      if (a.dataset.tab === tab) { a.classList.add('on'); a.setAttribute('aria-current', 'page'); }
    });
    if (!tab && more) more.classList.add('on');
  }
  function openMore() { if (!sheet) return; sheet.hidden = false; more.setAttribute('aria-expanded', 'true'); more.classList.add('on'); }
  function closeMore() { if (!sheet) return; sheet.hidden = true; more.setAttribute('aria-expanded', 'false'); if (tab) more.classList.remove('on'); }
  if (more && sheet) {
    more.addEventListener('click', function () { sheet.hidden ? openMore() : closeMore(); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) closeMore(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) closeMore(); });
    var s = sheet.querySelector('[data-search]');
    if (s) s.addEventListener('click', function () { closeMore(); if (window.pdsOpen) window.pdsOpen(); });
  }

  // Install as an app. Android/desktop Chrome fire beforeinstallprompt; iOS needs Share > Add to Home Screen.
  var inst = document.getElementById('pd-install'), ios = document.getElementById('pd-ios');
  var standalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  var deferred = null;
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    if (!standalone && inst) inst.hidden = false;
  });
  if (inst) inst.addEventListener('click', function () {
    if (!deferred) return;
    deferred.prompt();
    deferred.userChoice.then(function () { deferred = null; inst.hidden = true; });
  });
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS && !standalone && ios) ios.hidden = false;
  window.addEventListener('appinstalled', function () { if (inst) inst.hidden = true; if (ios) ios.hidden = true; });

  // Offline banner: the service worker serves the last copy seen, so say so.
  function net() {
    var b = document.getElementById('pd-off');
    if (!navigator.onLine) {
      if (!b) {
        b = document.createElement('div'); b.id = 'pd-off'; b.setAttribute('role', 'status');
        b.textContent = "You're offline. This is the copy from your last visit; deals and rules may have changed since.";
        b.setAttribute('style', 'position:fixed;left:0;right:0;top:0;z-index:1001;background:#8A3B2E;color:#fff;font:500 12.5px "IBM Plex Mono",monospace;padding:8px 12px;text-align:center');
        document.body.appendChild(b);
      }
    } else if (b) b.remove();
  }
  window.addEventListener('online', net); window.addEventListener('offline', net); net();

  if (('serviceWorker' in navigator) && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  }
})();
