"use client";
import { useState } from "react";
import type { Firm } from "@/lib/data";
import { costToFund, money } from "@/lib/data";
import CopyCode from "@/components/shared/CopyCode";
import Pill from "@/components/shared/Pill";

const cell = "border-b border-line px-3 py-2.5 align-middle text-[13px] whitespace-nowrap";

// One matrix row plus its expandable rule-diagnostics panel (PipBack-style).
export default function MatrixRow({ f, rank }: { f: Firm; rank: number }) {
  const [open, setOpen] = useState(false);
  const cost = costToFund(f);
  const ends = f.ends ? new Date(f.ends).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : f.endsNote || "—";
  return (
    <>
      <tr className="group hover:bg-surface-2/60">
        <td className={cell + " sticky left-0 z-10 bg-bg group-hover:bg-surface-2 min-w-[168px]"}>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="flex w-full items-center gap-2 text-left">
            <span className={"inline-block h-4 w-4 shrink-0 text-center font-mono text-[10px] leading-4 text-muted transition-transform " + (open ? "rotate-90" : "")}>▸</span>
            <span className="font-mono text-[10px] text-muted">{rank}</span>
            <span className="font-semibold text-fg">{f.short}</span>
          </button>
        </td>
        <td className={cell}><CopyCode code={f.code} href={f.url} aff={f.aff} /></td>
        <td className={cell + " tabular"}>
          {f.list50 != null ? <><s className="text-muted">{money(f.list50)}</s> <span className="font-semibold">{money(f.after50)}</span></> : <span className="text-muted">—</span>}
          <span className="ml-1.5 font-mono text-[10px] text-accent">{f.save}</span>
        </td>
        <td className={cell + " tabular"}>{f.act50 ? money(f.act50) : <span className="text-accent">None</span>}</td>
        <td className={cell + " tabular font-semibold"}>{money(cost)}</td>
        <td className={cell}><Pill tone={/EOD|static/i.test(f.drawdown) ? "good" : "neutral"}>#{f.drawdown.replace(/\s+/g, "-")}</Pill></td>
        <td className={cell}>{f.split}</td>
        <td className={cell}><Pill tone={/none/i.test(f.consistency) ? "good" : "warn"}>{/none funded|none in pro/i.test(f.consistency) ? "#No-Consistency-Funded" : "#" + f.consistency.split(" ")[0] + "-Consistency"}</Pill></td>
        <td className={cell}>
          <span className="flex gap-1">
            {f.platforms.length ? f.platforms.map((p) => <Pill key={p}>{p}</Pill>) : <span className="text-muted">—</span>}
          </span>
        </td>
        <td className={cell + " text-muted"}>{ends}</td>
      </tr>
      {open && (
        <tr className="bg-surface">
          <td colSpan={10} className="border-b border-line px-3 py-3">
            <div className="grid gap-x-8 gap-y-3 text-[12.5px] leading-relaxed sm:grid-cols-2 lg:grid-cols-3">
              <Diag k="Payout" v={f.rules.payout} />
              <Diag k="Consistency" v={f.consistency} />
              <Diag k="Daily loss limit" v={f.dll} />
              <Diag k="Hedging" v={f.rules.hedging} />
              <Diag k="News" v={f.rules.news} />
              <Diag k="Bots" v={f.rules.bots} />
              <Diag k="Inactivity" v={f.rules.inactivity} />
              <Diag k="KYC" v={f.rules.kyc} />
              <Diag k="Accounts" v={f.rules.accounts} />
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3 text-[12px] text-muted">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">Deal</span>
              <span>{f.what}</span>
              {f.actNote && <span>· {f.actNote}</span>}
              {f.aff && <span className="text-warn">· Affiliate code: Prop Desk may earn a commission</span>}
              <a href={f.page} className="ml-auto text-accent hover:underline">Full rules →</a>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function Diag({ k, v }: { k: string; v: string }) {
  return (
    <div className="min-w-0">
      <div className="font-mono text-[10px] uppercase tracking-wider text-muted">{k}</div>
      <div className="text-fg/90">{v}</div>
    </div>
  );
}
