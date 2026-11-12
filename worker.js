// Prop Desk click links (Nov 11, 2026). Only /go/* reaches this Worker (assets.run_worker_first);
// every other request is served straight from ./public. /go/<slug> 302s to the affiliate url in
// go-links.json (written by sandclock_go.py on each build) and logs one click to Analytics Engine.
import LINKS from './go-links.json';

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|lighthouse|headless/i;

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/go\/([a-z0-9-]+)\/?$/);
    const to = m && Object.prototype.hasOwnProperty.call(LINKS, m[1]) ? LINKS[m[1]] : null;
    if (!to) return env.ASSETS.fetch(req);
    const ua = req.headers.get('user-agent') || '';
    if (req.method === 'GET' && env.CLICKS && !BOT.test(ua)) {
      // ?from=<page path> is added to every /go/ link at build time (sandclock_go.py); Referer is the fallback.
      let from = url.searchParams.get('from') || '';
      if (!from.startsWith('/')) from = '';
      if (!from) try { const r = new URL(req.headers.get('referer') || ''); if (r.hostname.endsWith('propdesknews.com')) from = r.pathname; } catch (e) {}
      try {
        env.CLICKS.writeDataPoint({ indexes: [m[1]], blobs: [m[1], from.slice(0, 200), (req.cf && req.cf.country) || ''], doubles: [1] });
      } catch (e) {}
    }
    return new Response(null, { status: 302, headers: { Location: to, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
  },
};
