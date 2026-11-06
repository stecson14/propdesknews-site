/* Prop Desk app shell: bottom tab bar state, the More sheet, install-as-an-app, offline banner,
   service worker registration. Loaded on every page after search.js. */
(function () {
  if (window.__pdapp) return; window.__pdapp = 1;
  var path = location.pathname;
  var tab = path === '/' || path === '/index.html' ? 'deals'
          : path.indexOf('/finder/') === 0 ? 'finder'
          : path.indexOf('/firms/') === 0 ? 'firms'
          : path.indexOf('/news/') === 0 ? 'news'
          : path.indexOf('/compare/') === 0 ? 'compare'
          : path.indexOf('/tools/') === 0 ? 'tools' : '';
  var bar = document.querySelector('.tabbar');
  var sheet = document.getElementById('moresheet');
  var more = bar && bar.querySelector('[data-tab="more"]');
  var moreLit = !tab || tab === 'compare' || tab === 'tools';   // phone: these pages live in the More sheet
  if (bar) {
    bar.querySelectorAll('[data-tab]').forEach(function (a) {
      if (a.dataset.tab === tab) { a.classList.add('on'); a.setAttribute('aria-current', 'page'); }
    });
    if (moreLit && more) more.classList.add('on');
  }
  // Top "Menu" dropdown on phones: visible on landing, in the top nav, so first-time visitors
  // see every section before they discover the bottom bar. The nav is not sticky, so it scrolls away with the page.
  var tmBtn = null, tm = null;
  function closeTop() { if (!tm || tm.hidden) return; tm.hidden = true; tmBtn.setAttribute('aria-expanded', 'false'); }
  function openTop() { if (!tm) return; closeMore(); tm.hidden = false; tmBtn.setAttribute('aria-expanded', 'true'); }
  (function buildTop() {
    var nav = document.querySelector('.sitenav .in'); if (!nav || !bar) return;
    var css = document.createElement('style');
    css.textContent = '@media (max-width:760px){.sitenav{position:relative;z-index:30}' +
      '.tm-btn{display:inline-flex;align-items:center;gap:6px;padding:7px 11px;border-radius:999px;border:1px solid #3A3A3A;background:#1D1D1D;color:#FFFFFF;font:500 12.5px Inter,system-ui,sans-serif;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
      '.tm-btn svg{width:14px;height:14px;transition:transform .18s}.tm-btn[aria-expanded="true"]{background:#F2C14E;border-color:#F2C14E;color:#171717}.tm-btn[aria-expanded="true"] svg{transform:rotate(180deg)}' +
      '.tm{position:absolute;left:0;right:0;top:100%;z-index:9;background:#171717;border-bottom:1px solid #2E2E2E;box-shadow:0 22px 40px -16px rgba(0,0,0,.75);padding:10px 12px 14px;display:grid;grid-template-columns:1fr 1fr;gap:8px}' +
      '.tm[hidden]{display:none}.tm a,.tm button{display:flex;align-items:center;gap:9px;min-height:44px;padding:9px 12px;border-radius:10px;border:1px solid #2E2E2E;background:#0A0A0A;color:#FFFFFF;font:500 13px Inter,system-ui,sans-serif;text-decoration:none;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
      '.tm svg{width:18px;height:18px;flex:none;color:#9B9B9B}.tm .on{border-color:#F2C14E;color:#F2C14E}.tm .on svg{color:#F2C14E}}' +
      '@media (min-width:761px){.tm-btn,.tm{display:none!important}}';
    document.head.appendChild(css);
    var items = [['/', 'Deals', 'deals'], ['/finder/', 'Find my firm', 'finder'], ['/firms/', 'Directory', 'firms'], ['/news/', 'News', 'news'],
                 ['/compare/', 'Compare', 'compare'], ['/tools/', 'Tools', 'tools'], ['/glossary/', 'Glossary', ''], ['/drawdown/', 'Drawdown Lab', ''],
                 ['/start/', 'Start here', ''], ['/calendar/', 'Calendar', '']];
    tm = document.createElement('div'); tm.className = 'tm'; tm.id = 'topmenu'; tm.hidden = true; tm.setAttribute('aria-label', 'Site menu');
    items.forEach(function (it) {
      var a = document.createElement('a'); a.href = it[0]; a.textContent = it[1];
      var src = it[2] && bar.querySelector('[data-tab="' + it[2] + '"] svg');
      if (src) a.insertBefore(src.cloneNode(true), a.firstChild);
      if ((it[2] && it[2] === tab) || (!it[2] && path.indexOf(it[0]) === 0)) { a.classList.add('on'); a.setAttribute('aria-current', 'page'); }
      tm.appendChild(a);
    });
    var sb = document.createElement('button'); sb.type = 'button'; sb.textContent = 'Search the site';
    sb.addEventListener('click', function () { closeTop(); if (window.pdsOpen) window.pdsOpen(); });
    tm.appendChild(sb);
    tmBtn = document.createElement('button'); tmBtn.type = 'button'; tmBtn.className = 'tm-btn';
    tmBtn.setAttribute('aria-expanded', 'false'); tmBtn.setAttribute('aria-controls', 'topmenu');
    tmBtn.innerHTML = 'Menu <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    tmBtn.addEventListener('click', function () { tm.hidden ? openTop() : closeTop(); });
    var after = nav.querySelector('.sb');
    if (after && after.nextSibling) nav.insertBefore(tmBtn, after.nextSibling); else nav.appendChild(tmBtn);
    nav.parentNode.appendChild(tm);   // .sitenav is the positioning box
    document.addEventListener('click', function (e) { if (!tm.hidden && !tm.contains(e.target) && e.target !== tmBtn && !tmBtn.contains(e.target)) closeTop(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeTop(); });
  })();
  function openMore() { if (!sheet) return; closeTop(); sheet.hidden = false; more.setAttribute('aria-expanded', 'true'); more.classList.add('on'); }
  function closeMore() { if (!sheet) return; sheet.hidden = true; more.setAttribute('aria-expanded', 'false'); if (!moreLit) more.classList.remove('on'); }
  if (more && sheet) {
    more.addEventListener('click', function () { sheet.hidden ? openMore() : closeMore(); });
    sheet.addEventListener('click', function (e) { if (e.target === sheet) closeMore(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) closeMore(); });
    var s = sheet.querySelector('[data-search]');
    if (s) s.addEventListener('click', function () { closeMore(); if (window.pdsOpen) window.pdsOpen(); });
  }
  if (bar) {
    var ds = bar.querySelector('[data-search]');
    if (ds) ds.addEventListener('click', function () { if (window.pdsOpen) window.pdsOpen(); });
    // Desktop dock: the same bar, floating, shown only while the top nav is scrolled out of view.
    var top = document.querySelector('.sitenav');
    var desk = window.matchMedia ? matchMedia('(min-width: 761px)') : null;
    if (top && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        var away = !es[0].isIntersecting;
        if (away) closeTop();
        bar.classList.toggle('show', away && (!desk || desk.matches));
      }, { threshold: 0 }).observe(top);
    } else {
      bar.classList.add('show');
    }
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
        b.setAttribute('style', 'position:fixed;left:0;right:0;top:0;z-index:1001;background:#8A3B2E;color:#fff;font:500 12.5px Inter,system-ui,sans-serif;padding:8px 12px;text-align:center');
        document.body.appendChild(b);
      }
    } else if (b) b.remove();
  }
  window.addEventListener('online', net); window.addEventListener('offline', net); net();

  if (('serviceWorker' in navigator) && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('/sw.js').catch(function () {});
  }
})();
