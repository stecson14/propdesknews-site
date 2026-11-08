import { FIRMS, CHECKED, costToFund, money } from "@/lib/data";
import DeskTabs from "./DeskTabs";

// Design 3: The Gecko Desk. KPI tiles on top, three-tab metrics desk below.
export default function GeckoDesk() {
  const live = FIRMS.filter((f) => f.code);
  const cheapest = [...live].sort((a, b) => (costToFund(a) ?? 1e9) - (costToFund(b) ?? 1e9))[0];
  const tiles = [
    { k: "Firms tracked", v: "78", s: "futures, CFD, perps" },
    { k: "Live codes", v: String(live.length), s: "checked " + CHECKED },
    { k: "Lowest cost to fund", v: money(costToFund(cheapest)), s: cheapest.short + " · 50K" },
    { k: "Affiliate codes", v: String(live.filter((f) => f.aff).length), s: "labelled on every row" },
  ];
  return (
    <div className="bg-bg text-fg">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-3 py-3 sm:px-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
            Prop Desk
          </a>
          <nav className="hidden gap-4 text-[13px] text-muted md:flex">
            {["Desk", "Firms", "Payouts", "Rules", "News"].map((n) => <a key={n} href="#" className="hover:text-fg">{n}</a>)}
          </nav>
          <span className="ml-auto rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">Markets open</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {tiles.map((t) => (
            <div key={t.k} className="rounded-lg border border-line bg-surface p-3">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{t.k}</div>
              <div className="mt-1 text-2xl font-semibold tabular text-fg">{t.v}</div>
              <div className="text-[11.5px] text-muted">{t.s}</div>
            </div>
          ))}
        </div>
        <DeskTabs />
        <p className="mt-3 text-[12px] text-muted">Prices and rules from each firm&apos;s own site on {CHECKED}. The friction score counts payout hurdles from those rules; the sentiment meter is a placeholder until a data source is wired in. Education, not financial advice.</p>
      </main>
    </div>
  );
}
