"use client";
import { useEffect, useState, type ReactNode } from "react";

type Design = { id: "linear" | "terminal" | "gecko"; name: string; note: string; node: ReactNode };

// Master preview switcher: tabs across the top, the chosen design below. The choice sticks in the URL hash (#terminal) so a link opens on that design.
export default function ArchetypePreviewSwitcher({ designs }: { designs: Design[] }) {
  const [active, setActive] = useState<Design["id"]>(designs[0].id);
  useEffect(() => {
    const h = (location.hash || "").replace("#", "") as Design["id"];
    if (designs.some((d) => d.id === h)) setActive(h);
  }, [designs]);
  const pick = (id: Design["id"]) => {
    setActive(id);
    history.replaceState(null, "", "#" + id);
  };
  const current = designs.find((d) => d.id === active) || designs[0];
  return (
    <div data-theme={current.id} className="min-h-dvh bg-bg text-fg">
      <div className="sticky top-0 z-40 border-b border-line bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-2 sm:px-4">
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-muted sm:inline">Preview</span>
          <div role="tablist" aria-label="Design archetype" className="flex flex-1 gap-1 overflow-x-auto scrollbar-thin">
            {designs.map((d, i) => (
              <button
                key={d.id}
                role="tab"
                aria-selected={d.id === active}
                onClick={() => pick(d.id)}
                className={
                  "shrink-0 rounded-md border px-3 py-1.5 text-left text-xs transition-colors " +
                  (d.id === active ? "border-accent/60 bg-surface-2 text-fg" : "border-line bg-transparent text-muted hover:text-fg")
                }
              >
                <span className="font-semibold">{i + 1}. {d.name}</span>
                <span className="hidden sm:block text-[11px] text-muted">{d.note}</span>
              </button>
            ))}
          </div>
          <span className="hidden font-mono text-[11px] text-muted md:inline">Mockup · live data as of Nov 6, 2026 · not the live site</span>
        </div>
      </div>
      {/* All three stay mounted so switching is instant and nothing re-fetches; the inactive two are hidden. */}
      {designs.map((d) => (
        <section key={d.id} hidden={d.id !== active} aria-label={d.name}>
          {d.node}
        </section>
      ))}
    </div>
  );
}
