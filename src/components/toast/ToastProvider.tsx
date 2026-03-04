"use client";

import * as React from "react";
import { Toast, type ToastData, type ToastVariant, type ToastPosition } from "./Toast";
import { cn } from "../../lib/cn";

/* ==========================================
   INTERNAL STATE
   ========================================== */

interface InternalToast extends ToastData {
  visible: boolean;
}

interface ToastContext {
  toast: (options: { variant?: ToastVariant; title: string; description?: string }) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
  info: (title: string, description?: string) => void;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = React.createContext<ToastContext | null>(null);

/* ==========================================
   TOASTER (renders toast list)
   ========================================== */

export interface ToasterProps {
  /** Position on screen (default "top-right") */
  position?: ToastPosition;
  /** Animation duration in ms (default 250) */
  duration?: number;
  /** Auto-dismiss time in ms (default 4000). Set 0 to disable. */
  autoDismiss?: number;
  /** Max visible toasts (default 5) */
  maxVisible?: number;
}

export function ToastProvider({
  children,
  position = "top-right",
  duration = 250,
  autoDismiss = 4000,
  maxVisible = 5,
}: React.PropsWithChildren<ToasterProps>) {
  const [toasts, setToasts] = React.useState<InternalToast[]>([]);
  const nextId = React.useRef(0);

  const removeToast = React.useCallback(
    (id: string) => {
      setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: false } : t)));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [duration],
  );

  // Auto-dismiss effect
  React.useEffect(() => {
    if (autoDismiss === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    toasts
      .filter((t) => t.visible)
      .forEach((t) => {
        const timer = setTimeout(() => removeToast(t.id), autoDismiss);
        timers.push(timer);
      });
    return () => timers.forEach(clearTimeout);
  }, [toasts, autoDismiss, removeToast]);

  const addToast = React.useCallback(
    (options: { variant?: ToastVariant; title: string; description?: string }) => {
      const id = `toast-${nextId.current++}`;
      const newToast: InternalToast = {
        id,
        variant: options.variant ?? "info",
        title: options.title,
        description: options.description,
        visible: false,
      };
      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Trim excess toasts
        if (updated.length > maxVisible) {
          return updated.slice(-maxVisible);
        }
        return updated;
      });
      // Trigger entrance animation
      requestAnimationFrame(() => {
        setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, visible: true } : t)));
      });
    },
    [maxVisible],
  );

  const ctx = React.useMemo<ToastContext>(
    () => ({
      toast: addToast,
      success: (title, description) => addToast({ variant: "success", title, description }),
      error: (title, description) => addToast({ variant: "error", title, description }),
      warning: (title, description) => addToast({ variant: "warning", title, description }),
      info: (title, description) => addToast({ variant: "info", title, description }),
      dismiss: removeToast,
      dismissAll: () => setToasts([]),
    }),
    [addToast, removeToast],
  );

  // Position classes
  const positionClasses = {
    "top-right": "top-3 right-3 items-end",
    "top-center": "top-3 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-3 right-3 items-end",
    "bottom-center": "bottom-3 left-1/2 -translate-x-1/2 items-center",
  };

  return (
    <ToastContext value={ctx}>
      {children}
      <div
        className={cn("fixed z-50 flex flex-col gap-2 pointer-events-none", positionClasses[position])}
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast
              toast={t}
              visible={t.visible}
              duration={duration}
              onDismiss={removeToast}
            />
          </div>
        ))}
      </div>
    </ToastContext>
  );
}

/* ==========================================
   HOOK
   ========================================== */

export function useToast(): ToastContext {
  const ctx = React.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}
