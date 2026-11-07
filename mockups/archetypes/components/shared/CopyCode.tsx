"use client";
import { useEffect, useState } from "react";

// 1-click promo target: copies the code, shows a COPIED toast, then opens the firm in a new tab.
export default function CopyCode({ code, href, aff, className = "", label }: { code: string; href: string; aff?: boolean; className?: string; label?: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1600);
    return () => clearTimeout(t);
  }, [done]);
  if (!code) {
    return (
      <a href={href} target="_blank" rel="noopener" className={"inline-flex items-center justify-center rounded-md border border-line px-2.5 py-1.5 font-mono text-xs text-muted hover:text-fg " + className}>
        No code · site →
      </a>
    );
  }
  const go = async () => {
    try { await navigator.clipboard.writeText(code); } catch { /* clipboard blocked: the code is still visible on the button */ }
    setDone(true);
    window.open(href, "_blank", "noopener");
  };
  return (
    <span className={"relative inline-flex " + className}>
      <button
        type="button"
        onClick={go}
        aria-label={`Copy code ${code} and open the firm`}
        className="inline-flex items-center gap-2 rounded-md border border-accent/50 bg-accent/10 px-2.5 py-1.5 font-mono text-xs font-semibold text-fg hover:bg-accent/20"
      >
        <span className="tabular">{label || code}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
      </button>
      {done && (
        <span role="status" className="toast absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-accent px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black">
          Copied
        </span>
      )}
      {aff && <span className="sr-only">Affiliate code: Prop Desk may earn a commission</span>}
    </span>
  );
}
