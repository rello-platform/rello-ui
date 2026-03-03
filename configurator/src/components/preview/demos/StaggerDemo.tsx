import { useState, useCallback } from "react";

interface StaggerDemoProps {
  params: { duration?: number; staggerDelay?: number; distance?: number; easing?: string };
}

const CARDS = [
  { title: "Five Before 9", subtitle: "3 calls remaining", color: "var(--hot)" },
  { title: "The Pulse", subtitle: "4 active deals", color: "var(--brand-primary)" },
  { title: "Morning Brew", subtitle: "Market update ready", color: "var(--brand-accent)" },
  { title: "The Vault", subtitle: "127 contacts", color: "var(--success)" },
  { title: "Today's Agenda", subtitle: "6 items scheduled", color: "var(--info)" },
  { title: "The Scoreboard", subtitle: "GCI: $42,500", color: "var(--qualified)" },
];

export function StaggerDemo({ params }: StaggerDemoProps) {
  const [key, setKey] = useState(0);
  const [mounted, setMounted] = useState(true);
  const duration = params.duration ?? 500;
  const staggerDelay = params.staggerDelay ?? 150;
  const distance = params.distance ?? 20;
  const easing = params.easing ?? "cubic-bezier(0.0, 0.0, 0.2, 1)";

  const replay = useCallback(() => {
    setMounted(false);
    setTimeout(() => {
      setKey((k) => k + 1);
      setMounted(true);
    }, 50);
  }, []);

  return (
    <div className="relative bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Staggered Entrance Preview</span>
        <button
          onClick={replay}
          className="px-3 py-1.5 text-xs rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
        >
          Replay Animation
        </button>
      </div>
      <div className="p-4 grid grid-cols-3 gap-3" key={key}>
        {mounted && CARDS.map((card, i) => (
          <StaggerCard
            key={i}
            index={i}
            title={card.title}
            subtitle={card.subtitle}
            color={card.color}
            duration={duration}
            delay={i * staggerDelay}
            distance={distance}
            easing={easing}
          />
        ))}
      </div>
    </div>
  );
}

function StaggerCard({ index, title, subtitle, color, duration, delay, distance, easing }: {
  index: number; title: string; subtitle: string; color: string;
  duration: number; delay: number; distance: number; easing: string;
}) {
  return (
    <div
      className="bg-white rounded-lg border border-[var(--neutral-100)] p-3 shadow-xs"
      style={{
        animation: `stagger-in ${duration}ms ${easing} ${delay}ms both`,
      }}
    >
      <style>{`
        @keyframes stagger-in {
          from { opacity: 0; transform: translateY(${distance}px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="flex items-center gap-2 mb-2">
        <div className="size-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: color, opacity: 0.12 }}>
          <div className="size-4 rounded" style={{ backgroundColor: color, opacity: 0.6 }} />
        </div>
        <div>
          <p className="text-xs font-semibold text-[var(--foreground)]">{title}</p>
          <p className="text-[10px] text-[var(--neutral-500)]">{subtitle}</p>
        </div>
      </div>
      <div className="h-1.5 bg-[var(--neutral-100)] rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ backgroundColor: color, width: `${40 + index * 10}%` }} />
      </div>
    </div>
  );
}
