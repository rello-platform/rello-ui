import { useState, useCallback } from "react";

interface PageTransitionDemoProps {
  params: { fadeOutDuration?: number; pauseDuration?: number };
}

const PAGES = [
  { name: "Dashboard", cards: ["Five Before 9", "The Pulse", "Morning Brew", "Today's Agenda"] },
  { name: "Pipeline", cards: ["Hot Leads", "Qualified", "Engaged", "Warming Up"] },
  { name: "Contacts", cards: ["Recent", "Favorites", "All Contacts", "Import"] },
];

export function PageTransitionDemo({ params }: PageTransitionDemoProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [phase, setPhase] = useState<"visible" | "fading" | "entering">("visible");
  const [pendingIdx, setPendingIdx] = useState(0);

  const fadeOut = params.fadeOutDuration ?? 150;
  const pause = params.pauseDuration ?? 50;

  const navigate = useCallback((idx: number) => {
    if (idx === activeIdx || phase !== "visible") return;
    setPendingIdx(idx);
    setPhase("fading");
    setTimeout(() => {
      setActiveIdx(idx);
      setTimeout(() => setPhase("entering"), pause);
    }, fadeOut);
    setTimeout(() => setPhase("visible"), fadeOut + pause + 500);
  }, [activeIdx, phase, fadeOut, pause]);

  const activePage = PAGES[activeIdx];

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Page Transition — Click nav items</span>
      </div>
      <div className="flex h-64">
        {/* Fake sidebar */}
        <div className="w-36 bg-white border-r border-[var(--neutral-100)] p-2">
          {PAGES.map((p, i) => (
            <button
              key={p.name}
              onClick={() => navigate(i)}
              className={`w-full px-3 py-2 text-left text-xs rounded-lg mb-1 transition-colors ${i === (phase === "fading" ? pendingIdx : activeIdx) ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-medium" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]"}`}
            >
              {p.name}
            </button>
          ))}
        </div>
        {/* Content area */}
        <div className="flex-1 p-4 overflow-hidden">
          <div
            style={{
              opacity: phase === "fading" ? 0 : 1,
              transition: phase === "fading" ? `opacity ${fadeOut}ms ease-in` : "none",
            }}
          >
            <p className="font-heading text-base font-semibold text-[var(--foreground)] mb-3">{activePage.name}</p>
            <div className="grid grid-cols-2 gap-2">
              {activePage.cards.map((card, i) => (
                <div
                  key={`${activeIdx}-${card}`}
                  className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 shadow-xs"
                  style={{
                    animation: phase === "entering" ? `stagger-up 350ms cubic-bezier(0,0,0.2,1) ${i * 75}ms both` : "none",
                  }}
                >
                  <style>{`@keyframes stagger-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                  <p className="text-xs font-medium text-[var(--foreground)]">{card}</p>
                  <div className="mt-2 h-1.5 bg-[var(--neutral-100)] rounded-full">
                    <div className="h-full bg-[var(--brand-primary)] rounded-full" style={{ width: `${30 + i * 15}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
