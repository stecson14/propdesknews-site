// Crisp badge pill: #EOD-Drawdown style tags. tone picks the accent.
export default function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "accent" }) {
  const t = {
    neutral: "border-line text-muted",
    good: "border-accent/40 text-accent",
    accent: "border-accent/40 bg-accent/10 text-accent",
    warn: "border-warn/40 text-warn",
    bad: "border-bad/40 text-bad",
  }[tone];
  return <span className={"inline-flex items-center whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10.5px] leading-4 " + t}>{children}</span>;
}
