// Prop Desk click links (Nov 11, 2026). Only /go/* reaches this Worker (assets.run_worker_first);
// every other request is served straight from ./public. /go/<slug> 302s to the affiliate url in
// go-links.json (written by sandclock_go.py on each build) and logs one click to Analytics Engine.
import LINKS from './go-links.json';

const BOT = /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|lighthouse|headless/i;
const SRC = { youtube: 'youtube', yt: 'youtube', instagram: 'instagram', ig: 'instagram', x: 'x', twitter: 'x', pinterest: 'pinterest',
  tiktok: 'tiktok', reddit: 'reddit', email: 'email', discord: 'discord', quora: 'quora', test: 'test' };

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
      // ?placement=<button> (Nov 12): which button on the page, e.g. challenges_row. Letters, digits, _ and - only.
      const place = (url.searchParams.get('placement') || '').replace(/[^a-z0-9_-]/gi, '').slice(0, 40);
      // Off-site source (Nov 13): ?src=<name> on links we post elsewhere (youtube, instagram, x), since apps often
      // send no Referer; otherwise the Referer's host when the click did not come from our own pages.
      // Only names in SRC are stored from the tag; any other value is logged as "other".
      let src = (url.searchParams.get('src') || '').toLowerCase().trim();
      if (src) src = Object.prototype.hasOwnProperty.call(SRC, src) ? SRC[src] : 'other';
      if (!src && !from) try { const r = new URL(req.headers.get('referer') || ''); if (!r.hostname.endsWith('propdesknews.com')) src = r.hostname.toLowerCase().replace(/^www\./, '').slice(0, 60); } catch (e) {}
      try {
        env.CLICKS.writeDataPoint({ indexes: [m[1]], blobs: [m[1], from.slice(0, 200), (req.cf && req.cf.country) || '', place, src], doubles: [1] });
      } catch (e) {}
    }
    return new Response(null, { status: 302, headers: { Location: to, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow' } });
  },
};
