"""Send per-firm alert emails through Kit after the daily build.
Usage: python3 alerts_send.py /home/user/propdesknews-site/public [--send]
Without --send it only prints what it would send (dry run). With --send it needs KIT_API_KEY and the flag file
alerts/alerts-send.on (in the repo it runs from GitHub Actions, .github/workflows/email-alerts.yml), and creates one Kit broadcast per firm and alert type, sent now, to that firm's tag.

What counts as new (compared with alerts-state.json):
- rules: a /news/ item tagged rules, updates or closures for that firm (only firm-confirmed items reach /news/).
- deals: a /news/ item tagged sales, or a new code in the firm page's code box.
First run with no state file only records what is live today and sends nothing, so subscribers never get a backlog.
Items older than 3 days are recorded, never sent."""
import os, re, sys, json, html, glob, hashlib, datetime, time, urllib.request, urllib.error

here = os.path.dirname(os.path.abspath(__file__))
pub = sys.argv[1] if len(sys.argv) > 1 and not sys.argv[1].startswith('--') else '/home/user/propdesknews-site/public'
SEND = '--send' in sys.argv
MARK = '--mark-seen' in sys.argv   # record everything live now as seen, send nothing (use before switching sending back on)
NOCHANGE = re.compile(r'^(no (other )?changes?\b|no change to)', re.I)
SITE = 'https://propdesknews.com'
state_p = os.path.join(here, 'alerts-state.json')
tags = json.load(open(os.path.join(here, 'alerts-tags.json'))).get('firms', {}) if os.path.exists(os.path.join(here, 'alerts-tags.json')) else {}
first_run = not os.path.exists(state_p)
state = json.load(open(state_p)) if not first_run else {'seen': {}}
seen = state['seen']
today = datetime.date.today()
MONTHS = {m: i for i, m in enumerate(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], 1)}


def key(*parts):
    return hashlib.sha1('|'.join(parts).encode()).hexdigest()[:16]


def txt(h):
    return html.unescape(re.sub(r'<[^>]+>', '', h)).strip()


names, pending = {}, {}   # pending[(slug, kind)] = [item, ...]


def add(slug, kind, k, item, day):
    if k in seen:
        return
    seen[k] = today.isoformat()
    if first_run or (today - day).days > 3:
        return
    pending.setdefault((slug, kind), []).append(item)


# 1) news items
news = open(os.path.join(pub, 'news', 'index.html'), encoding='utf-8').read()
for sec in re.findall(r'<section class="day"><h2>(.*?)</h2>(.*?)</section>', news, re.S):
    m = re.match(r'([A-Z][a-z]{2}) (\d{1,2}), (\d{4})', txt(sec[0]))
    if not m:
        continue
    day = datetime.date(int(m.group(3)), MONTHS[m.group(1)], int(m.group(2)))
    for art in re.findall(r'<article class="item"(.*?)</article>', sec[1], re.S):
        cm = re.search(r'data-cat="([^"]*)"', art)
        cats = cm.group(1).split() if cm else []
        firms = (re.search(r'data-firms="([^"]*)"', art).group(1).split()) if re.search(r'data-firms="([^"]*)"', art) else []
        ps = [p for p in re.findall(r'<p(?: (?!class="(?:src|r3h)")[^>]*)?>(.*?)</p>', art, re.S)]
        change = txt(ps[0]) if ps else ''
        # Nov 13 fix: daily 'No other change' check rows are not news; an empty text is never sent
        if not change or NOCHANGE.match(change):
            continue
        src = re.search(r'<p class="src">Source: <a href="([^"]+)"', art)
        story = re.search(r'class="perma" href="([^"]+)"', art)
        item = {'text': change, 'source': src.group(1) if src else '', 'story': SITE + story.group(1) if story else SITE + '/news/', 'date': day.isoformat()}
        for f in firms:
            kinds = set()
            # Nov 13 fix: a sale item (countdown moved, code swapped) is a deals alert only, never a 'rule change'
            if 'sales' in cats:
                kinds.add('deals')
            elif set(cats) & {'rules', 'updates', 'closures'}:
                kinds.add('rules')
            for kd in kinds:
                add(f, kd, key('news', f, kd, change), item, day)

# 2) code boxes on firm pages
for p in glob.glob(os.path.join(pub, 'firms', '*', 'index.html')):
    slug = os.path.basename(os.path.dirname(p))
    s = open(p, encoding='utf-8').read()
    h1 = re.search(r'<h1>(.*?)</h1>', s, re.S)
    names[slug] = txt(h1.group(1)) if h1 else slug
    m = re.search(r'<div class="act[^"]*" id="act" data-act><div class="act-l"><code>([^<]+)</code><span><b>(.*?)</b><small>(.*?)</small>', s, re.S)
    if not m:
        continue
    code, what, small = txt(m.group(1)), txt(m.group(2)), txt(m.group(3))
    aff = 'affiliate' in small.lower()
    # Nov 13 fix: key on the code only, so rewording the deal line never reads as a 'new code'
    add(slug, 'deals', key('code2', slug, code.upper()),
        {'code': code, 'text': what, 'aff': aff, 'story': '%s/firms/%s/promo-code/' % (SITE, slug), 'date': today.isoformat()}, today)


def body(slug, kind, items):
    n = html.escape(names.get(slug, slug))
    rows = []
    for it in items:
        if it.get('code'):
            rows.append('<p><b>%s</b>: %s</p><p>Code: <b>%s</b>%s</p><p><a href="%s">See the code and the fine print on Prop Desk</a></p>'
                        % (n, html.escape(it['text']), html.escape(it['code']),
                           ' <small>(Prop Desk affiliate code. We earn a commission if you buy.)</small>' if it['aff'] else '',
                           it['story']))
        else:
            src = ' <a href="%s">Source on %s&#x27;s site</a>.' % (html.escape(it['source']), n) if it['source'] else ''
            rows.append('<p>%s</p><p><a href="%s">Read it on Prop Desk</a>.%s</p>' % (html.escape(it['text']), it['story'], src))
    what = 'rule changes' if kind == 'rules' else 'new codes and sales'
    return ('\n'.join(rows) +
            '<p style="color:#777;font-size:13px">You get this because you asked for %s alerts on %s at propdesknews.com. '
            'Trade the market, not the fine print.</p>' % (what, n))


def subject(slug, kind, items):
    n = names.get(slug, slug)
    if kind == 'rules':
        return '%s: rule change confirmed' % n if len(items) == 1 else '%s: %d rule changes confirmed' % (n, len(items))
    c = next((it['code'] for it in items if it.get('code')), '')
    return '%s: new code %s' % (n, c) if c else '%s: new sale' % n


if MARK:
    first_run = True
    pending.clear()
jobs = [(s, k, its) for (s, k), its in sorted(pending.items()) if s in tags]
dropped = len(pending) - len(jobs)
print('alerts: %s; %d emails to send%s' % ('recorded %d items as seen, nothing sent' % len(seen) if first_run else 'checked',
                                           len(jobs), ', %d firms without tags skipped' % dropped if dropped else ''))
for s, k, its in jobs:
    print('  %-30s %-5s %s' % (s, k, subject(s, k, its)))

if SEND and jobs:
    if not os.path.exists(os.path.join(here, 'alerts-send.on')):
        sys.exit('alerts: not sent, alerts-send.on is off (state not saved)')
    KEY = os.environ.get('KIT_API_KEY', '').strip()
    if not KEY:
        sys.exit('alerts: not sent, KIT_API_KEY missing (state not saved)')
    now = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')
    # Kit refuses more than ~5 broadcasts sent at once (Nov 11), so each one is scheduled 15 minutes after the last.
    for _i, (s, k, its) in enumerate(jobs):
        now = (datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=15 * _i)).strftime('%Y-%m-%dT%H:%M:%SZ')
        b = {'subject': subject(s, k, its), 'content': body(s, k, its), 'description': 'alert %s %s' % (s, k),
             'public': False, 'send_at': now, 'preview_text': its[0]['text'][:120],
             'subscriber_filter': [{'all': [{'type': 'tag', 'ids': [tags[s][k]]}], 'any': None, 'none': None}]}
        req = urllib.request.Request('https://api.kit.com/v4/broadcasts', method='POST', data=json.dumps(b).encode(),
                                     headers={'X-Kit-Api-Key': KEY, 'Content-Type': 'application/json', 'Accept': 'application/json'})
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                print('  sent', s, k, json.loads(r.read()).get('broadcast', {}).get('id'))
        except urllib.error.HTTPError as e:
            sys.exit('alerts: Kit error %s on %s %s: %s (state not saved)' % (e.code, s, k, e.read()[:300]))
        time.sleep(0.5)

if MARK and SEND:
    sys.exit('alerts: use --mark-seen on its own')
if first_run or SEND or not jobs:
    # keep 120 days of keys
    cut = (today - datetime.timedelta(days=120)).isoformat()
    state['seen'] = {k: v for k, v in seen.items() if v >= cut}
    json.dump(state, open(state_p, 'w'), indent=0, sort_keys=True)
