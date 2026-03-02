import { useState } from "react";

interface DrawerDemoProps {
  params: { duration?: number; width?: number; scrimOpacity?: number; easing?: string };
}

export function DrawerDemo({ params }: DrawerDemoProps) {
  const [open, setOpen] = useState(false);
  const duration = params.duration ?? 300;
  const width = params.width ?? 480;
  const scrimOpacity = params.scrimOpacity ?? 0.35;
  const easing = params.easing ?? "cubic-bezier(0.4, 0.0, 0.2, 1)";

  return (
    <div className="relative h-96 bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      {/* Fake page content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading text-lg font-semibold text-[var(--foreground)]">Lead Pipeline</h3>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Open Drawer
          </button>
        </div>
        <div className="space-y-2">
          {["Sarah Johnson — Hot", "Mike Chen — Qualified", "Emily Davis — Engaged", "David Wilson — Warming"].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border border-[var(--neutral-100)] cursor-pointer hover:bg-[var(--neutral-50)]" onClick={() => setOpen(true)}>
              <span className="text-sm text-[var(--foreground)]">{item}</span>
              <span className="text-xs text-[var(--neutral-400)]">Click for detail</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scrim */}
      <div
        className="absolute inset-0 transition-opacity"
        style={{
          backgroundColor: `rgba(0,0,0,${open ? scrimOpacity : 0})`,
          pointerEvents: open ? "auto" : "none",
          transitionDuration: `${duration}ms`,
        }}
        onClick={() => setOpen(false)}
      />

      {/* Drawer */}
      <div
        className="absolute top-0 right-0 h-full bg-white border-l border-[var(--neutral-200)] shadow-xl"
        style={{
          width: Math.min(width, 320),
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: `transform ${duration}ms ${easing}`,
        }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading text-base font-semibold text-[var(--foreground)]">Lead Detail</h4>
            <button onClick={() => setOpen(false)} className="text-[var(--neutral-400)] hover:text-[var(--neutral-600)] text-lg">&times;</button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[var(--neutral-500)]">Name</p>
              <p className="text-sm font-medium text-[var(--foreground)]">Sarah Johnson</p>
            </div>
            <div>
              <p className="text-xs text-[var(--neutral-500)]">Status</p>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-[var(--hot-light)] text-[var(--hot)]">
                <span className="size-1.5 rounded-full bg-current" /> Hot
              </span>
            </div>
            <div>
              <p className="text-xs text-[var(--neutral-500)]">Score</p>
              <p className="font-stat text-2xl font-bold text-[var(--brand-primary)]">92</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
