import { useState } from "react";
import { CloseIcon } from "../icons/CloseIcon";

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

      {/* Floating Drawer — card style with rounded corners and gap from edges */}
      <div
        className="absolute bg-white shadow-xl"
        style={{
          width: Math.min(width, 310),
          top: 12,
          right: 12,
          bottom: 12,
          borderRadius: "var(--radius-xl, 16px)",
          transform: open ? "translateX(0)" : `translateX(calc(100% + 24px))`,
          opacity: open ? 1 : 0,
          transition: `transform ${duration}ms ${easing}, opacity ${duration * 0.6}ms ${easing}`,
        }}
      >
        <div className="p-5 h-full flex flex-col">
          {/* Header with custom close icon */}
          <div className="flex items-center justify-between mb-5">
            <h4 className="font-heading text-base font-semibold text-[var(--foreground)]">Lead Detail</h4>
            <button
              onClick={() => setOpen(false)}
              className="size-8 rounded-lg flex items-center justify-center text-[var(--neutral-400)] hover:text-[var(--neutral-600)] hover:bg-[var(--neutral-100)] transition-colors"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4 flex-1">
            <div>
              <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Name</p>
              <p className="text-sm font-medium text-[var(--foreground)]">Sarah Johnson</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Pipeline Stage</p>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-[var(--hot-light)] text-[var(--hot)] font-medium">
                <span className="size-1.5 rounded-full bg-current" /> Hot
              </span>
            </div>
            <div>
              <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Lead Score</p>
              <p className="font-stat text-3xl font-bold text-[var(--brand-primary)]">92</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Last Contact</p>
              <p className="text-sm text-[var(--neutral-600)]">2 hours ago — phone call, 3 min</p>
            </div>
            <div>
              <p className="text-[10px] text-[var(--neutral-400)] uppercase tracking-wider mb-1">Interest</p>
              <p className="text-sm text-[var(--neutral-600)]">South Jordan, $400K–$500K</p>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex gap-2 pt-4 border-t border-[var(--neutral-100)]">
            <button className="flex-1 px-3 py-2 text-sm rounded-lg border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] transition-colors">
              Call
            </button>
            <button className="flex-1 px-3 py-2 text-sm rounded-lg bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity">
              Send Email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
