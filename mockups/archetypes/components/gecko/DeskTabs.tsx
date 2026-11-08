"use client";
import { useMemo, useState } from "react";
import { FIRMS, costToFund, money, type Firm } from "@/lib/data";
import CopyCode from "@/components/shared/CopyCode";
import Pill from "@/components/shared/Pill";

type Tab = "deals" | "payout" | "risk";
type SortKey = "cost" | "after" | "pct" | "act" | "friction" | "name";

const pct = (f: Firm) => (f.list50 && f.after50 != null ? Math.round((1 - f.after50 / f.list50) * 100) : null);

export default function DeskTabs() {
  const [tab, setTab] = useState<Tab>("deals");
  const [sort, setSort] = useState<SortKey>("cost");
  const [dir, setDir] = useState<1 | -1>(1);
  const rows = useMemo(() => {
    const v = (f: Firm): number | string => {
      switch (sort) {
        case "cost": return costToFund(f) ?? 1e9;
        case "after": return f.after50 ?? 1e9;
        case "pct": return pct(f) ?? -1;
        case "act": return f.act50 ?? 0;
        case "friction": return f.friction;
        default: return f.short;
      }
    };
    return [...FIRMS].sort((a, b) => (v(a) < v(b) ? -1 : v(a) > v(b) ? 1 : 0) * dir);
  }, [sort, dir]);
  const sortBy = (k: SortKey) => { if (k === sort) setDir(dir === 1 ? -1 : 1); else { setSort(k); setDir(k === "pct" ? -1 : 1); } };
  const Th = ({ k, children, right }: { k?: SortKey; children: React.ReactNode; right?: boolean }) => (
    <th className={"border-b border-line px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted whitespace-nowrap " + (right ? "text-right" : "text-left")}>
      {k ? (
        <button type="button" onClick={() => sortBy(k)} aria-sort={k === sort ? (dir === 1 ? "ascending" : "descending") : undefined} className={"inline-flex items-center gap-1 hover:text-fg " + (k === sort ? "text-accent" : "")}>
          {children}<span className="text-[9px]">{k === sort ? (dir === 1 ? "▲" : "▼") : "↕"}</span>
        </button>
      ) : children}
    </th>
  );
  const td = "border-b border-line px-3 py-2.5 text-[13px] whitespace-nowrap";
  const tw = "border-b border-line px-3 py-2.5 text-[12.5px] whitespace-normal wrap-anywhere text-muted align-top";
  const first = (s: string, n = 90) => { const c = s.split(/\.\s|;\s|\.$/)[0].trim(); return c.length > n ? c.slice(0, n - 1).trimEnd() + "…" : c; };
  const tabs: { id: Tab; name: string }[] = [
    { id: "deals", name: "Flash Deals Matrix" },
    { id: "payout", name: "Payout & Sentiment Index" },
    { id: "risk", name: "Rule Risk Model" },
  ];
  return (
    <div className="mt-4 rounded-lg border border-line bg-surface">
      <div role="tablist" className="flex gap-1 overflow-x-auto border-b border-line p-1.5 scrollbar-thin">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)} className={"shrink-0 rounded-md px-3 py-1.5 text-[12.5px] font-medium " + (tab === t.id ? "bg-surface-2 text-fg ring-1 ring-accent/40" : "text-muted hover:text-fg")}>
            {t.name}
          </button>
        ))}
        <span className="ml-auto hidden self-center pr-2 font-mono text-[10px] text-muted sm:inline">50K · click a column to sort</span>
      </div>
      <div className="overflow-x-auto scrollbar-thin">
        {tab === "deals" && (
          <table className="w-full border-collapse">
            <thead><tr>
              <Th k="name"><span className="sticky left-0">Firm</span></Th><Th>Code</Th><Th k="after" right>After code</Th><Th k="pct" right>Saving</Th><Th k="act" right>Activation</Th><Th k="cost" right>Cost to fund</Th><Th>Billing</Th><Th>Ends</Th>
            </tr></thead>
            <tbody className="tabular">
              {rows.map((f) => (
                <tr key={f.slug} className="hover:bg-surface-2/70">
                  <td className={td + " sticky left-0 z-10 bg-surface font-semibold"}>{f.short}</td>
                  <td className={td}><CopyCode code={f.code} href={f.url} aff={f.aff} /></td>
                  <td className={td + " text-right"}>{f.list50 != null ? <><s className="text-muted">{money(f.list50)}</s> <span className="font-semibold text-accent">{money(f.after50)}</span></> : "—"}</td>
                  <td className={td + " text-right"}>{pct(f) != null ? <span className="text-accent">{pct(f)}%</span> : <span className="text-muted">{f.save}</span>}</td>
                  <td className={td + " text-right"}>{f.act50 ? money(f.act50) : <span className="text-muted">0</span>}</td>
                  <td className={td + " text-right font-semibold"}>{money(costToFund(f))}</td>
                  <td className={td}><Pill tone={/once|one-time/i.test(f.billing) ? "good" : "neutral"}>{f.billing}</Pill></td>
                  <td className={td + " text-muted"}>{f.ends ? new Date(f.ends).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : f.endsNote || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "payout" && (
          <table className="w-full border-collapse">
            <thead><tr>
              <Th k="name">Firm</Th><Th>Split</Th><Th>Min payout</Th><Th k="friction">Payout friction</Th><Th>Sentiment</Th><Th>Platforms</Th>
            </tr></thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.slug} className="hover:bg-surface-2/70">
                  <td className={td + " sticky left-0 z-10 bg-surface font-semibold"}>{f.short}</td>
                  <td className={td}>{f.split}</td>
                  <td className={tw + " min-w-[200px] max-w-[280px]"}>{first(f.rules.payout)}</td>
                  <td className={td}><Meter n={f.friction} max={4} label={["None", "Low", "Medium", "High", "Highest"][f.friction]} tone={f.friction <= 1 ? "accent" : f.friction === 2 ? "warn" : "bad"} /></td>
                  <td className={td}><Meter n={0} max={5} label="No data yet" tone="muted" /></td>
                  <td className={td}><span className="flex gap-1 whitespace-nowrap">{f.platforms.length ? f.platforms.map((p) => <Pill key={p}>{p}</Pill>) : "—"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tab === "risk" && (
          <table className="w-full border-collapse">
            <thead><tr>
              <Th k="name">Firm</Th><Th>Drawdown</Th><Th>Consistency</Th><Th>Hedging</Th><Th>News</Th><Th>Bots</Th><Th>Inactivity</Th>
            </tr></thead>
            <tbody>
              {rows.map((f) => (
                <tr key={f.slug} className="align-top hover:bg-surface-2/70">
                  <td className={td + " sticky left-0 z-10 bg-surface font-semibold"}>{f.short}</td>
                  <td className={td}>{f.drawdown}</td>
                  <td className={td}><Pill tone={/none/i.test(f.consistency) ? "good" : "warn"}>{f.consistency}</Pill></td>
                  <td className={tw + " min-w-[160px] max-w-[220px] text-[12px]"}><Flag v={f.rules.hedging} />{first(f.rules.hedging)}</td>
                  <td className={tw + " min-w-[180px] max-w-[260px] text-[12px]"}><Flag v={f.rules.news} />{first(f.rules.news)}</td>
                  <td className={tw + " min-w-[160px] max-w-[220px] text-[12px]"}><Flag v={f.rules.bots} />{first(f.rules.bots)}</td>
                  <td className={tw + " min-w-[150px] max-w-[220px] text-[12px]"}>{first(f.rules.inactivity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Meter({ n, max, label, tone }: { n: number; max: number; label: string; tone: "accent" | "warn" | "bad" | "muted" }) {
  const c = { accent: "bg-accent", warn: "bg-warn", bad: "bg-bad", muted: "bg-line" }[tone];
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap" aria-label={label}>
      <span className="flex gap-0.5">{Array.from({ length: max }, (_, i) => <span key={i} className={"h-2.5 w-2 rounded-[2px] " + (i < n ? c : "bg-line")} />)}</span>
      <span className="font-mono text-[10.5px] text-muted">{label}</span>
    </span>
  );
}

function Flag({ v }: { v: string }) {
  const r = v.toLowerCase();
  const bad = /prohibit|not allowed|not permitted|no hedging|no counter|hard breach|must be out|be flat/.test(r);
  const na = /not stated|see firm/.test(r);
  return <span className={"mr-1.5 inline-block h-2 w-2 rounded-full align-middle " + (na ? "bg-line" : bad ? "bg-bad" : "bg-accent")} aria-hidden="true" />;
}
