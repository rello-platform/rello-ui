import { useState, useEffect, useCallback } from "react";

interface ToastDemoProps {
  params: { duration?: number; autoDismiss?: number; position?: string };
}

interface Toast {
  id: number;
  type: "success" | "warning" | "error" | "info";
  title: string;
  visible: boolean;
}

const TOAST_EXAMPLES: Array<{ type: Toast["type"]; title: string }> = [
  { type: "success", title: "Lead saved successfully" },
  { type: "info", title: "New lead assigned to your pipeline" },
  { type: "warning", title: "3 leads need follow-up today" },
  { type: "error", title: "Failed to sync with MLS" },
];

const TYPE_STYLES: Record<string, { bg: string; icon: string }> = {
  success: { bg: "bg-[var(--success)]", icon: "\u2713" },
  warning: { bg: "bg-[var(--warning)]", icon: "!" },
  error: { bg: "bg-[var(--error)]", icon: "\u2717" },
  info: { bg: "bg-[var(--info)]", icon: "i" },
};

export function ToastDemo({ params }: ToastDemoProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [nextId, setNextId] = useState(0);
  const duration = params.duration ?? 250;
  const autoDismiss = params.autoDismiss ?? 4000;
  const position = params.position ?? "top-right";

  const addToast = useCallback(() => {
    const example = TOAST_EXAMPLES[nextId % TOAST_EXAMPLES.length];
    const id = nextId;
    setNextId((n) => n + 1);
    setToasts((prev) => [...prev, { id, ...example, visible: false }]);
    // Trigger entrance
    setTimeout(() => setToasts((prev) => prev.map((t) => t.id === id ? { ...t, visible: true } : t)), 16);
  }, [nextId]);

  // Auto-dismiss
  useEffect(() => {
    if (toasts.length === 0) return;
    const latest = toasts[toasts.length - 1];
    if (!latest.visible) return;
    const timer = setTimeout(() => {
      setToasts((prev) => prev.map((t) => t.id === latest.id ? { ...t, visible: false } : t));
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== latest.id)), duration);
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, [toasts, autoDismiss, duration]);

  const posClass = position.includes("top") ? "top-3" : "bottom-3";
  const alignClass = position.includes("right") ? "right-3 items-end" : "left-1/2 -translate-x-1/2 items-center";

  return (
    <div className="relative h-64 bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={addToast}
            className="px-4 py-2 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 transition-opacity"
          >
            Fire Toast
          </button>
          <span className="text-xs text-[var(--neutral-500)]">Click to trigger toast notifications</span>
        </div>
        <p className="text-sm text-[var(--neutral-400)]">Toasts appear at: <span className="font-medium text-[var(--neutral-600)]">{position}</span></p>
      </div>

      {/* Toast container */}
      <div className={`absolute ${posClass} ${alignClass} flex flex-col gap-2 z-10`}>
        {toasts.map((toast) => {
          const style = TYPE_STYLES[toast.type];
          return (
            <div
              key={toast.id}
              className="bg-white rounded-lg shadow-lg border border-[var(--neutral-100)] flex items-center gap-3 px-4 py-3 min-w-[260px]"
              style={{
                opacity: toast.visible ? 1 : 0,
                transform: toast.visible ? "translateY(0)" : "translateY(-8px)",
                transition: `all ${duration}ms ease-out`,
              }}
            >
              <div className={`${style.bg} size-6 rounded-full flex items-center justify-center text-white text-xs font-bold`}>
                {style.icon}
              </div>
              <span className="text-sm text-[var(--foreground)] flex-1">{toast.title}</span>
              <button
                onClick={() => {
                  setToasts((prev) => prev.map((t) => t.id === toast.id ? { ...t, visible: false } : t));
                  setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== toast.id)), duration);
                }}
                className="text-[var(--neutral-400)] hover:text-[var(--neutral-600)] text-sm"
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
