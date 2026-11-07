# Prop Desk layout archetypes (mockups)

Three design archetypes for the propdesknews.com main layout, built on the live
deals and rules data as of Nov 6, 2026. Not the live site.

- Design 1 "The Linear Matrix": ticker, sticky firm column, expandable rows with
  rule diagnostics, one-click promo codes.
- Design 2 "The Terminal Wire": single-column wire, impact tags on news-trading
  rules, compact matrix.
- Design 3 "The Gecko Desk": KPI tiles, tab switcher (deals, payout and
  sentiment, rule risk), sortable columns, meters.

`components/ArchetypePreviewSwitcher.tsx` toggles all three (and their palettes)
live on the demo page. Hash `#linear`, `#terminal`, `#gecko` deep-links a design.

Placeholders: the payout friction score counts stated hurdles (min payout, caps,
days, buffer), and the sentiment meter shows "No data yet" until a source exists.
Platforms come from our own records.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```
