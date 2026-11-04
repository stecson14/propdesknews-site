/* Prop Desk site search: one overlay for firms, live codes, terms, tools, calculators, news and pages. */
(function () {
  if (window.__pds) return; window.__pds = 1;
  var CSS = '.pds{position:fixed;inset:0;z-index:1000;background:rgba(9,12,20,.72);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);display:flex;align-items:flex-start;justify-content:center;padding:6vh 12px 12px}' +
    '.pds[hidden]{display:none}' +
    '.pds-box{width:100%;max-width:680px;background:#1A2233;color:#E9E4D4;border:1px solid #33405A;border-radius:16px;box-shadow:0 30px 80px rgba(0,0,0,.55);overflow:hidden;font-family:"IBM Plex Sans",system-ui,sans-serif}' +
    '.pds-in{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid #2E3850}' +
    '.pds-in svg{flex:none;color:#D9A441}' +
    '.pds-in input{flex:1;min-width:0;background:transparent;border:0;outline:0;color:#E9E4D4;font:16px/1.3 "IBM Plex Sans",system-ui,sans-serif;padding:6px 0}' +
    '.pds-in input::placeholder{color:#7F869A}' +
    '.pds-x{flex:none;background:transparent;border:1px solid #33405A;color:#A3A8B5;border-radius:6px;padding:4px 8px;font:12px "IBM Plex Mono",ui-monospace,monospace;cursor:pointer}' +
    '.pds-x:hover{color:#E9E4D4;border-color:#D9A441}' +
    '.pds-hint{padding:10px 14px 4px;font:12px "IBM Plex Mono",ui-monospace,monospace;color:#A3A8B5;letter-spacing:.04em}' +
    '.pds-hint button{background:#121825;border:1px solid #2E3850;color:#C9C4B5;border-radius:999px;padding:3px 9px;margin:2px 4px 2px 0;font:inherit;cursor:pointer}' +
    '.pds-hint button:hover{border-color:#D9A441;color:#E9E4D4}' +
    '.pds-res{list-style:none;margin:0;padding:6px 8px 10px;max-height:min(62vh,560px);overflow:auto}' +
    '.pds-res li a{display:flex;align-items:center;gap:12px;padding:9px 10px;border-radius:10px;color:inherit;text-decoration:none}' +
    '.pds-res li[aria-selected="true"] a,.pds-res li a:hover{background:#121825}' +
    '.pds-res .k{flex:none;min-width:78px;text-align:center;font:600 10px "IBM Plex Mono",ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:4px 7px;background:#2A3245;color:#C9C4B5}' +
    '.pds-res .k-deal,.pds-res .k-cmp{background:#D9A441;color:#1A2233}.pds-res .k-firm{background:#3A3220;color:#E3B95C}.pds-res .k-term{background:#1F3A2B;color:#7CC79A}.pds-res .k-news{background:#3E2520;color:#E39A8A}' +
    '.pds-res .tx{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}' +
    '.pds-res .tx b{font-weight:600;font-size:15px;line-height:1.3;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.pds-res .tx small{font-size:12.5px;color:#A3A8B5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
    '.pds-res mark{background:transparent;color:#D9A441;font-weight:700}' +
    '.pds-res .go{display:inline;flex:none;width:auto;background:none;border:0;border-radius:0;padding:0;cursor:inherit;color:#7F869A;font:12px "IBM Plex Mono",ui-monospace,monospace}' +
    '.pds-res li[aria-selected="true"] .go{color:#D9A441}' +
    '.pds-foot{display:flex;justify-content:space-between;gap:10px;padding:8px 14px 10px;border-top:1px solid #2E3850;font:11px "IBM Plex Mono",ui-monospace,monospace;color:#7F869A}' +
    '@media (max-width:640px){.pds{padding:8px}.pds-res .k{min-width:0}.pds-res .tx b,.pds-res .tx small{white-space:normal}.pds-foot{display:none}}';
  var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);

  var KIND = { firm: 'Firm', deal: 'Live code', term: 'Term', tool: 'Tool', page: 'Page', news: 'News', cmp: 'Compare' };
  var SUGGEST = [
    { t: 'Live deals and codes', s: "Today's discounts with the fine print", u: '/#deals', k: 'page' },
    { t: 'Compare firms side by side', s: 'Two or three firms on one link', u: '/compare/', k: 'page' },
    { t: 'True cost of an eval', s: 'Eval plus resets plus activation, before you buy', u: '/tools/#truecost', k: 'page' },
    { t: "This week's red folders", s: 'High-impact news calendar in ET', u: '/calendar/', k: 'page' },
    { t: 'Find my firm', s: 'Four taps: market, size, drawdown, split', u: '/finder/', k: 'page' },
    { t: 'Drawdown Lab', s: 'Watch the three drawdown types move', u: '/drawdown/', k: 'page' },
    { t: 'Start here', s: 'How a prop firm eval works, in five steps', u: '/start/', k: 'page' },
    { t: 'Glossary', s: 'Fine print, decoded', u: '/glossary/', k: 'page' }
  ];
  var ov, inp, res, hint, idx = null, loading = false, active = -1, items = [], lastFocus = null;

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return String(s || '').toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9%$. ]+/g, ' ').replace(/\s+/g, ' ').trim(); }
  function slugOf(e) { var m = /^\/firms\/([^/]+)\//.exec(e.u || ''); return m ? m[1] : ''; }

  function build() {
    ov = document.createElement('div'); ov.className = 'pds'; ov.hidden = true;
    ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-modal', 'true'); ov.setAttribute('aria-label', 'Search Prop Desk');
    ov.innerHTML = '<div class="pds-box"><div class="pds-in">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>' +
      '<input type="search" placeholder="Search firms, codes, rules, tools…" autocomplete="off" autocorrect="off" spellcheck="false" aria-label="Search">' +
      '<button type="button" class="pds-x" aria-label="Close search">Esc</button></div>' +
      '<div class="pds-hint"></div><ol class="pds-res" role="listbox"></ol>' +
      '<div class="pds-foot"><span>↑↓ to move · ↵ to open · Esc to close</span><span>Press / anywhere to search</span></div></div>';
    document.body.appendChild(ov);
    inp = ov.querySelector('input'); res = ov.querySelector('.pds-res'); hint = ov.querySelector('.pds-hint');
    inp.addEventListener('input', function () { render(inp.value); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); go(); }
    });
    ov.querySelector('.pds-x').addEventListener('click', close);
    ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
    hint.addEventListener('click', function (e) { var b = e.target.closest('button[data-q]'); if (b) { inp.value = b.getAttribute('data-q'); render(inp.value); inp.focus(); } });
    res.addEventListener('mousemove', function (e) { var li = e.target.closest('li[data-i]'); if (li) setActive(+li.getAttribute('data-i')); });
  }
  function open() {
    if (!ov) build();
    lastFocus = document.activeElement;
    ov.hidden = false; document.body.style.overflow = 'hidden';
    inp.value = ''; render('');
    setTimeout(function () { inp.focus(); }, 0);
    load();
  }
  function close() {
    if (!ov || ov.hidden) return;
    ov.hidden = true; document.body.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function load() {
    if (idx || loading) return; loading = true;
    fetch('/search.json').then(function (r) { return r.json(); }).then(function (j) { idx = j; loading = false; render(inp.value); })
      .catch(function () { loading = false; hint.textContent = 'The search index did not load. Try the directory or the glossary.'; });
  }
  function firmFor(frag) {
    var q = norm(frag); if (!q || !idx) return null;
    var best = null, bs = 0;
    idx.forEach(function (e) {
      if (e.k !== 'firm') return;
      var t = norm(e.t), s = t === q ? 100 : t.indexOf(q) === 0 ? 90 : t.indexOf(q) >= 0 ? 70 : (' ' + t + ' ').indexOf(' ' + q.split(' ')[0] + ' ') >= 0 ? 60 : 0;
      if (s > bs) { bs = s; best = e; }
    });
    return bs >= 60 ? best : null;
  }
  function search(q) {
    var nq = norm(q);
    if (!nq) return SUGGEST.slice();
    var out = [];
    var parts = nq.split(/\s+(?:vs\.?|versus|v)\s+/);
    if (idx && parts.length >= 2 && parts.length <= 3) {
      var fs = parts.map(firmFor);
      if (fs.every(Boolean)) {
        var seen = {}; fs = fs.filter(function (f) { if (seen[f.u]) return false; seen[f.u] = 1; return true; });
        if (fs.length >= 2) out.push({ t: fs.map(function (f) { return f.t; }).join(' vs '), s: 'Side by side: price, split, drawdown, platforms and the live codes', u: '/compare/#' + fs.map(slugOf).join(','), k: 'cmp', sc: 1000 });
      }
    }
    if (!idx) return out;
    var toks = nq.split(' ');
    idx.forEach(function (e) {
      var t = norm(e.t), h = t + ' ' + norm(e.s) + ' ' + norm(e.x), sc = 0;
      if (t === nq) sc = 200; else if (t.indexOf(nq) === 0) sc = 150; else if (t.indexOf(nq) >= 0) sc = 120; else if (h.indexOf(nq) >= 0) sc = 90;
      else { if (!toks.every(function (k) { return h.indexOf(k) >= 0; })) return; sc = 60 + toks.filter(function (k) { return t.indexOf(k) >= 0; }).length * 10; }
      sc += { deal: 8, firm: 6, page: 5, term: 4, tool: 3, news: 0 }[e.k] || 0;
      out.push({ t: e.t, s: e.s, u: e.u, k: e.k, sc: sc });
    });
    out.sort(function (a, b) { return b.sc - a.sc || a.t.localeCompare(b.t); });
    return out.slice(0, 14);
  }
  function hl(t, q) {
    var nq = norm(q); if (!nq) return esc(t);
    var low = t.toLowerCase(), i = low.indexOf(nq), n = nq.length;
    if (i < 0) { var k = nq.split(' ')[0]; i = low.indexOf(k); n = k.length; if (i < 0) return esc(t); }
    return esc(t.slice(0, i)) + '<mark>' + esc(t.slice(i, i + n)) + '</mark>' + esc(t.slice(i + n));
  }
  function render(q) {
    items = search(q); active = items.length ? 0 : -1;
    var nq = norm(q);
    if (!nq) hint.innerHTML = 'Try: <button type="button" data-q="trailing drawdown">trailing drawdown</button><button type="button" data-q="Apex">Apex</button><button type="button" data-q="true cost">true cost</button><button type="button" data-q="NFP">NFP</button><button type="button" data-q="Apex vs Topstep">Apex vs Topstep</button>';
    else hint.textContent = items.length ? (items.length + ' result' + (items.length === 1 ? '' : 's')) : (idx ? 'Nothing matched. Try a firm name, a rule, a code or a tool.' : 'Loading the index…');
    res.innerHTML = items.map(function (e, i) {
      return '<li role="option" aria-selected="' + (i === active) + '" data-i="' + i + '"><a href="' + esc(e.u) + '">' +
        '<span class="k k-' + e.k + '">' + KIND[e.k] + '</span><span class="tx"><b>' + hl(e.t, q) + '</b>' + (e.s ? '<small>' + esc(e.s) + '</small>' : '') + '</span><span class="go">↵</span></a></li>';
    }).join('');
  }
  function setActive(i) {
    if (i < 0 || i >= items.length) return; active = i;
    var lis = res.children;
    for (var j = 0; j < lis.length; j++) lis[j].setAttribute('aria-selected', j === i ? 'true' : 'false');
  }
  function move(d) {
    if (!items.length) return;
    setActive((active + d + items.length) % items.length);
    var li = res.children[active]; if (li && li.scrollIntoView) li.scrollIntoView({ block: 'nearest' });
  }
  function go() {
    var e = items[active]; if (!e) return;
    close();
    var here = location.pathname + location.hash;
    location.href = e.u;
    if (e.u.indexOf('#') >= 0 && e.u.split('#')[0] === location.pathname) { var id = e.u.split('#')[1]; var el = document.getElementById(id); if (el) el.scrollIntoView({ block: 'start' }); }
    void here;
  }
  document.addEventListener('keydown', function (e) {
    var tag = (e.target && e.target.tagName || '').toLowerCase();
    var typing = tag === 'input' || tag === 'textarea' || tag === 'select' || (e.target && e.target.isContentEditable);
    if (e.key === 'Escape' && ov && !ov.hidden) { e.preventDefault(); close(); return; }
    if ((e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey)) { e.preventDefault(); if (ov && !ov.hidden) close(); else open(); return; }
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) { e.preventDefault(); open(); }
  });
  document.addEventListener('click', function (e) { var b = e.target.closest('.sb'); if (b) { e.preventDefault(); open(); } });
  window.pdsOpen = open;
})();
