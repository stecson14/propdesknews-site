import { FIRMS, WIRE, NEWS_RULES, CHECKED, costToFund, money } from "@/lib/data";
import CopyCode from "@/components/shared/CopyCode";

// Design 2: The Terminal Wire. Pure black, one reading column, text first.
const impact = (rule: string): { tag: string; tone: string } => {
  const r = rule.toLowerCase();
  if (/hard breach|not allowed on daily|be flat|must be out|no orders|restricted for a short|prohibited news/.test(r)) return { tag: "HIGH", tone: "text-warn border-warn/50" };
  if (/not stated|see firm/.test(r)) return { tag: "N/A", tone: "text-muted border-line" };
  if (/allowed|no rules against|no restrictions/.test(r)) return { tag: "LOW", tone: "text-accent border-accent/50" };
  return { tag: "MED", tone: "text-fg border-line" };
};

export default function TerminalWire() {
  const deals = [...FIRMS].filter((f) => f.code).sort((a, b) => (costToFund(a) ?? 1e9) - (costToFund(b) ?? 1e9));
  return (
    <div className="bg-bg text-fg">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-2xl items-baseline gap-4 px-4 py-3 font-mono text-[12px]">
          <span className="font-bold tracking-[0.2em] text-fg">PROP DESK</span>
          <span className="text-muted">WIRE</span>
          <span className="ml-auto text-muted">{CHECKED} · 50K</span>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-4 py-6 font-mono text-[13px] leading-6" style={{ maxWidth: "min(42rem, 100%)" }}>
        <section aria-labelledby="t-wire">
          <h1 id="t-wire" className="mb-3 border-b border-line pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Wire · last 14 items</h1>
          <ol className="divide-y divide-line">
            {WIRE.map((w, i) => (
              <li key={i} className="flex gap-3 py-2">
                <span className="w-12 shrink-0 text-muted tabular">{w.date.slice(5).replace("-", ".")}</span>
                <span className={"w-12 shrink-0 text-[10px] font-bold uppercase leading-6 " + ({ deal: "text-accent", rule: "text-warn", alert: "text-bad" } as const)[w.kind]}>{w.kind}</span>
                <a href={w.url} className="font-sans text-[14px] leading-6 text-fg hover:text-accent">{w.headline}</a>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8" aria-labelledby="t-news">
          <h2 id="t-news" className="mb-1 border-b border-line pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">News-trading restrictions · NFP, CPI, FOMC</h2>
          <p className="mb-3 font-sans text-[13px] text-muted">Impact rating is editorial: HIGH means the firm makes you flat or breaches you around Tier 1 data; LOW means it states no restriction.</p>
          <ul className="divide-y divide-line">
            {NEWS_RULES.map((n) => {
              const im = impact(n.rule);
              return (
                <li key={n.slug} className="flex gap-3 py-2">
                  <span className={"mt-1 h-fit w-11 shrink-0 border px-1 text-center text-[10px] font-bold leading-4 " + im.tone}>{im.tag}</span>
                  <div className="min-w-0">
                    <span className="font-bold text-fg">{n.firm}</span>
                    <span className="block font-sans text-[13.5px] leading-6 text-muted">{n.rule}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-8" aria-labelledby="t-matrix">
          <h2 id="t-matrix" className="mb-3 border-b border-line pb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted">Compact matrix · 50K · cost to fund</h2>
          <div className="overflow-x-auto scrollbar-thin">
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="text-left text-[10px] uppercase tracking-wider text-muted">
                  <th className="sticky left-0 z-10 bg-bg py-1 pr-3">Firm</th>
                  <th className="py-1 pr-3">Code</th>
                  <th className="py-1 pr-3 text-right">After</th>
                  <th className="py-1 pr-3 text-right">Activ.</th>
                  <th className="py-1 pr-3 text-right">To fund</th>
                  <th className="py-1 pr-3">DD</th>
                  <th className="py-1 pr-3">Split</th>
                  <th className="py-1 pr-3">Min payout</th>
                </tr>
              </thead>
              <tbody className="tabular">
                {deals.map((f) => (
                  <tr key={f.slug} className="border-t border-line">
                    <td className="sticky left-0 z-10 bg-bg py-1.5 pr-3 font-bold">{f.short}</td>
                    <td className="py-1.5 pr-3"><CopyCode code={f.code} href={f.url} aff={f.aff} /></td>
                    <td className="py-1.5 pr-3 text-right">{money(f.after50)}</td>
                    <td className="py-1.5 pr-3 text-right">{f.act50 ? money(f.act50) : "0"}</td>
                    <td className="py-1.5 pr-3 text-right font-bold text-accent">{money(costToFund(f))}</td>
                    <td className="py-1.5 pr-3 whitespace-nowrap">{f.drawdown}</td>
                    <td className="py-1.5 pr-3 whitespace-nowrap">{f.split}</td>
                    <td className="py-1.5 pr-3 whitespace-nowrap font-sans text-[12px] text-muted">{f.rules.payout.split(/[.;]/)[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 font-sans text-[12px] text-muted">Every figure is from the firm&apos;s own site on {CHECKED}. Affiliate codes earn Prop Desk a commission. Education, not financial advice.</p>
        </section>
      </main>
    </div>
  );
}
