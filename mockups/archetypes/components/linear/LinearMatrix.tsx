import { FIRMS, CHECKED, costToFund } from "@/lib/data";
import Ticker from "./Ticker";
import MatrixRow from "./MatrixRow";

const th = "border-b border-line px-3 py-2 text-left font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted whitespace-nowrap";

// Design 1: The Linear Matrix. Thin grids, high contrast, sticky firm column, expandable diagnostics.
export default function LinearMatrix() {
  const rows = [...FIRMS].sort((a, b) => (costToFund(a) ?? 1e9) - (costToFund(b) ?? 1e9));
  return (
    <div className="bg-bg text-fg">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-3 py-3 sm:px-4">
          <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-accent font-mono text-[11px] font-bold text-black">PD</span>
            Prop Desk
          </a>
          <nav className="hidden gap-4 text-[13px] text-muted md:flex">
            {["Deals", "Rules", "Compare", "News", "Tools"].map((n) => <a key={n} href="#" className="hover:text-fg">{n}</a>)}
          </nav>
          <span className="ml-auto font-mono text-[11px] text-muted">Checked {CHECKED}</span>
        </div>
      </header>
      <Ticker />
      <main className="mx-auto max-w-7xl px-3 py-6 sm:px-4">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Deal matrix · 50K</h1>
            <p className="mt-1 text-[13px] text-muted">Lowest cost to get funded first: eval price after the code plus any activation fee. Tap a firm for its rule diagnostics; tap a code to copy it and open the firm.</p>
          </div>
          <div className="flex gap-1 rounded-md border border-line p-0.5 font-mono text-[11px]">
            {["50K", "100K", "150K"].map((s, i) => <span key={s} className={"rounded px-2 py-1 " + (i === 0 ? "bg-surface-2 text-fg" : "text-muted")}>{s}</span>)}
          </div>
        </div>
        <div className="overflow-x-auto rounded-lg border border-line bg-bg scrollbar-thin">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className={th + " sticky left-0 z-10 bg-bg"}>Firm</th>
                <th className={th}>Code</th>
                <th className={th}>50K eval</th>
                <th className={th}>Activation</th>
                <th className={th}>Cost to fund</th>
                <th className={th}>Drawdown</th>
                <th className={th}>Split</th>
                <th className={th}>Consistency</th>
                <th className={th}>Platforms</th>
                <th className={th}>Ends</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((f, i) => <MatrixRow key={f.slug} f={f} rank={i + 1} />)}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[12px] text-muted">Prices and rules are copied from each firm&apos;s own site on {CHECKED}. Codes marked affiliate earn Prop Desk a commission. Education, not financial advice.</p>
      </main>
    </div>
  );
}
