import { useState } from "react";

interface DialogDemoProps {
  params: { duration?: number; scrimOpacity?: number };
}

export function DialogDemo({ params }: DialogDemoProps) {
  const [open, setOpen] = useState(false);
  const duration = params.duration ?? 200;
  const scrimOpacity = params.scrimOpacity ?? 0.5;

  return (
    <div className="relative h-80 bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setOpen(true)} className="px-4 py-2 text-sm rounded-md bg-[var(--error)] text-white font-medium hover:opacity-90 transition-opacity">
            Delete Lead
          </button>
          <button onClick={() => setOpen(true)} className="px-4 py-2 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity">
            Add Contact
          </button>
        </div>
        <p className="text-xs text-[var(--neutral-400)]">Click a button to trigger the dialog</p>
      </div>

      {/* Scrim */}
      <div
        className="absolute inset-0 transition-opacity"
        style={{ backgroundColor: `rgba(0,0,0,${open ? scrimOpacity : 0})`, pointerEvents: open ? "auto" : "none", transitionDuration: `${duration}ms` }}
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div
        className="absolute top-1/2 left-1/2 w-80 bg-white rounded-lg border border-[var(--neutral-200)] shadow-lg p-5"
        style={{
          transform: open ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.95)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: `all ${duration}ms ease-out`,
        }}
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-heading text-base font-semibold text-[var(--foreground)]">Delete Lead</h4>
          <button onClick={() => setOpen(false)} className="text-[var(--neutral-400)] hover:text-[var(--neutral-600)] text-lg leading-none">&times;</button>
        </div>
        <p className="text-sm text-[var(--neutral-500)] mb-4">Are you sure you want to delete this lead? This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm rounded-md text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] transition-colors">Cancel</button>
          <button onClick={() => setOpen(false)} className="px-3 py-1.5 text-sm rounded-md bg-[var(--error)] text-white font-medium hover:opacity-90 transition-opacity">Delete</button>
        </div>
      </div>
    </div>
  );
}
