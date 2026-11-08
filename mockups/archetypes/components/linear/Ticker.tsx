import { WIRE } from "@/lib/data";

// Promo/status alert ticker. Pure CSS marquee (duplicated track), no JS.
export default function Ticker() {
  const items = WIRE.slice(0, 8);
  const tone = { deal: "text-accent", rule: "text-warn", alert: "text-bad" } as const;
  const row = (k: string) => (
    <span key={k} className="flex shrink-0 items-center gap-6 pr-6">
      {items.map((w, i) => (
        <a key={k + i} href={w.url} className="flex items-center gap-2 whitespace-nowrap text-[12.5px] text-muted hover:text-fg">
          <span className={"font-mono text-[10px] uppercase tracking-wider " + tone[w.kind]}>{w.kind}</span>
          <span className="font-mono text-[10px] text-muted/70">{w.date.slice(5).replace("-", "/")}</span>
          <span>{w.headline}</span>
        </a>
      ))}
    </span>
  );
  return (
    <div className="border-b border-line bg-surface" aria-label="Latest alerts">
      <div className="mx-auto flex max-w-7xl items-center">
        <span className="shrink-0 border-r border-line px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">Live</span>
        <div className="flex overflow-hidden py-2">
          <div className="ticker-track flex">{row("a")}{row("b")}</div>
        </div>
      </div>
    </div>
  );
}
