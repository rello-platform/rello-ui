"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

/* ==========================================
   TYPES
   ========================================== */

export type ToastVariant = "success" | "warning" | "error" | "info";
export type ToastPosition = "top-right" | "top-center" | "bottom-right" | "bottom-center";

export interface ToastData {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
}

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  toast: ToastData;
  /** Animation duration in ms (default 250) */
  duration?: number;
  /** Whether the toast is visible (controls enter/exit animation) */
  visible?: boolean;
  /** Called when the dismiss button is clicked */
  onDismiss?: (id: string) => void;
}

/* ==========================================
   VARIANT STYLES
   ========================================== */

const VARIANT_STYLES: Record<ToastVariant, { bg: string; icon: React.ReactNode }> = {
  success: {
    bg: "bg-[var(--success)]",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  },
  warning: {
    bg: "bg-[var(--warning)]",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4" />
        <circle cx="12" cy="17" r="0.5" fill="currentColor" />
      </svg>
    ),
  },
  error: {
    bg: "bg-[var(--error)]",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 6L6 18M6 6l12 12" />
      </svg>
    ),
  },
  info: {
    bg: "bg-[var(--info)]",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="0.5" fill="currentColor" />
        <path d="M12 12v5" />
      </svg>
    ),
  },
};

/* ==========================================
   TOAST ITEM
   ========================================== */

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, toast, duration = 250, visible = true, onDismiss, ...props }, ref) => {
    const style = VARIANT_STYLES[toast.variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          "bg-[var(--card-background,white)] rounded-[var(--radius-lg,0.5rem)] shadow-lg border border-[var(--neutral-100)] flex items-center gap-3 px-4 py-3 min-w-[260px] max-w-[400px]",
          className,
        )}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
          transition: `all ${duration}ms ease-out`,
        }}
        {...props}
      >
        <div
          className={cn(
            style.bg,
            "size-6 rounded-full flex items-center justify-center text-white shrink-0",
          )}
        >
          {style.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--foreground)]">{toast.title}</p>
          {toast.description && (
            <p className="text-xs text-[var(--neutral-500)] mt-0.5">{toast.description}</p>
          )}
        </div>
        {onDismiss && (
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="text-[var(--neutral-400)] hover:text-[var(--neutral-600)] transition-colors shrink-0 p-0.5"
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
Toast.displayName = "Toast";

export { Toast };
