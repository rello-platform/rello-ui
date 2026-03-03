import { useState } from "react";

export function SpinnerDemo() {
  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Spinner — All Sizes & Variants</span>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Sizes</p>
          <div className="flex items-center gap-4">
            {[{ s: 12, b: 1.5, l: "xs" }, { s: 16, b: 2, l: "sm" }, { s: 24, b: 2, l: "md" }, { s: 32, b: 2, l: "lg" }, { s: 48, b: 3, l: "xl" }].map(({ s, b, l }) => (
              <div key={l} className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full border-[var(--neutral-300)]" style={{ width: s, height: s, borderWidth: b, borderTopColor: "var(--brand-primary)" }} />
                <span className="text-[9px] text-[var(--neutral-400)]">{l}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Button Loading States</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium flex items-center gap-2">
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving...
            </button>
            <button className="px-4 py-2 text-sm rounded-md bg-[var(--brand-accent)] text-white font-medium flex items-center gap-2">
              <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing...
            </button>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-2">Inline Loading</p>
          <div className="flex items-center justify-center gap-2 py-4 bg-white rounded-lg border border-[var(--neutral-100)]">
            <div className="size-4 border-2 border-[var(--neutral-300)] border-t-[var(--brand-primary)] rounded-full animate-spin" />
            <span className="text-sm text-[var(--neutral-500)]">Loading leads...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AlertBannerDemo() {
  const [dismissed, setDismissed] = useState<string[]>([]);
  const [dismissing, setDismissing] = useState<string | null>(null);
  const alerts = [
    { id: "info", type: "info", title: "New feature available", desc: "Newsletter Studio now supports A/B testing.", color: "var(--info)", bg: "var(--info-light)" },
    { id: "success", type: "success", title: "Contacts synced", desc: "127 contacts imported from your CRM.", color: "var(--success)", bg: "var(--success-light)" },
    { id: "warning", type: "warning", title: "Subscription expiring", desc: "Your plan expires in 7 days. Upgrade to continue.", color: "var(--warning)", bg: "var(--warning-light)" },
    { id: "error", type: "error", title: "Sync failed", desc: "Unable to connect to MLS. Please check your credentials.", color: "var(--error)", bg: "var(--error-light)" },
  ];

  const dismiss = (id: string) => {
    setDismissing(id);
    setTimeout(() => {
      setDismissed(p => [...p, id]);
      setDismissing(null);
    }, 200);
  };

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)] flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Alert / Banner — Click X to dismiss</span>
        {dismissed.length > 0 && <button onClick={() => { setDismissed([]); setDismissing(null); }} className="text-xs text-[var(--brand-primary)]">Reset all</button>}
      </div>
      <div className="p-4 space-y-2">
        {alerts.filter(a => !dismissed.includes(a.id)).map(alert => (
          <div
            key={alert.id}
            className="flex items-start gap-3 px-4 rounded-lg border overflow-hidden"
            style={{
              backgroundColor: alert.bg,
              borderColor: alert.color + "40",
              opacity: dismissing === alert.id ? 0 : 1,
              maxHeight: dismissing === alert.id ? 0 : 80,
              paddingTop: dismissing === alert.id ? 0 : 12,
              paddingBottom: dismissing === alert.id ? 0 : 12,
              transition: "opacity 200ms ease-out, max-height 200ms ease-out, padding 200ms ease-out",
            }}
          >
            <div className="size-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 shrink-0" style={{ backgroundColor: alert.color, color: "white" }}>
              {alert.type === "success" ? "✓" : alert.type === "error" ? "✕" : alert.type === "warning" ? "!" : "i"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: alert.color }}>{alert.title}</p>
              <p className="text-xs mt-0.5" style={{ color: alert.color, opacity: 0.8 }}>{alert.desc}</p>
            </div>
            <button onClick={() => dismiss(alert.id)} className="size-7 rounded-md flex items-center justify-center hover:bg-black/5 transition-colors shrink-0" style={{ color: alert.color }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ConfirmationDialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Confirmation Dialog — Destructive action pattern</span>
      </div>
      <div className="relative h-64">
        <div className="p-4">
          <button onClick={() => setOpen(true)} className="px-4 py-2 text-sm rounded-md bg-[var(--error)] text-white font-medium hover:opacity-90 transition-opacity">
            Delete Lead
          </button>
        </div>
        <div className="absolute inset-0 transition-opacity" style={{ backgroundColor: `rgba(0,0,0,${open ? 0.5 : 0})`, pointerEvents: open ? "auto" : "none", transitionDuration: "200ms" }} onClick={() => setOpen(false)} />
        <div className="absolute top-1/2 left-1/2 w-72 bg-white rounded-lg shadow-lg p-5" style={{
          transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.95)",
          opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none", transition: "all 200ms ease-out"
        }}>
          <div className="flex justify-center mb-3">
            <div className="size-12 rounded-full bg-[var(--error-light)] flex items-center justify-center text-lg text-[var(--error)]">⚠</div>
          </div>
          <h4 className="font-heading text-base font-semibold text-[var(--foreground)] text-center mb-1">Delete this lead?</h4>
          <p className="text-xs text-[var(--neutral-500)] text-center mb-4">This will permanently remove Sarah Johnson and all associated data. This action cannot be undone.</p>
          <div className="flex gap-2">
            <button onClick={() => setOpen(false)} className="flex-1 px-3 py-2 text-sm rounded-md border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]">Cancel</button>
            <button onClick={() => setOpen(false)} className="flex-1 px-3 py-2 text-sm rounded-md bg-[var(--error)] text-white font-medium hover:opacity-90">Delete Lead</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TooltipDemo() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">Tooltip — Hover over elements</span>
      </div>
      <div className="p-6 flex items-center justify-center gap-6">
        {[
          { id: "edit", icon: "✏", tip: "Edit lead details" },
          { id: "call", icon: "☎", tip: "Make a call" },
          { id: "email", icon: "✉", tip: "Send email" },
          { id: "delete", icon: "🗑", tip: "Delete lead" },
        ].map(item => (
          <div key={item.id} className="relative" onMouseEnter={() => setActive(item.id)} onMouseLeave={() => setActive(null)}>
            <button className="size-10 rounded-md border border-[var(--neutral-200)] bg-white flex items-center justify-center text-sm hover:bg-[var(--neutral-50)] transition-colors">
              {item.icon}
            </button>
            {active === item.id && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[var(--neutral-800)] text-white text-xs rounded-md whitespace-nowrap shadow-sm" style={{ animation: "tip-in 100ms ease-out" }}>
                <style>{`@keyframes tip-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                {item.tip}
                <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-[var(--neutral-800)]" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
