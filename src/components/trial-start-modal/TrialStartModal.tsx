"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";
import type { TrialStartEndsAt, TrialStartResult } from "./types";

export interface TrialStartModalProps {
  /** Controlled open state. */
  open: boolean;
  /** Called on Escape, outside click, "Not now", "Close" and "Done". The spoke sets `open` false. */
  onClose: () => void;
  /**
   * Starts the trial. The spoke wires this to Rello's
   * `POST /api/v1/billing/trial-start` and maps the response to a
   * `TrialStartResult` (see ./types). The modal never calls Rello itself.
   * Guarded: it is never called again while a call is in flight.
   */
  onConfirm: () => Promise<TrialStartResult>;
  /** Where "Upgrade to Rello" goes when the trial was already used (409). */
  upgradeHref: string;
  /** Label of the 409 upgrade link — defaults to "Upgrade to Rello". */
  upgradeLabel?: string;
  /** Dialog title and accessible name — defaults to "Start your 14-day free trial". */
  title?: string;
  /** Confirm-step copy (spoke-substituted, e.g. the lead's name). */
  description?: React.ReactNode;
  /** Confirm button — defaults to "Start trial". */
  confirmLabel?: string;
  /** Cancel button — defaults to "Not now". */
  cancelLabel?: string;
  /** Optional deep link shown after success, e.g. "Open Pathfinder Pro intake". */
  successAction?: { label: string; href: string; onClick?: () => void };
  /**
   * Every outcome, including one that lands after the modal unmounted (the
   * trial still started on Rello's side). The spoke refreshes entitlement
   * and fires its own telemetry here.
   */
  onResult?: (result: TrialStartResult) => void;
  className?: string;
}

type Phase =
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "started"; trialEndsAt?: TrialStartEndsAt }
  | { kind: "already-used"; trialEndsAt?: TrialStartEndsAt }
  | { kind: "error"; message?: string };

const DEFAULT_ERROR_HINT = "Check your connection and try again.";

/** A value that is none of the three outcomes is an error, never a success. */
function readResult(raw: unknown): TrialStartResult | null {
  if (!raw || typeof raw !== "object") return null;
  const status = (raw as { status?: unknown }).status;
  if (status === "started" || status === "already-used" || status === "error") return raw as TrialStartResult;
  return null;
}

function toDate(value: TrialStartEndsAt): Date | null {
  if (value === null || value === undefined || value === "") return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isFinite(d.getTime()) ? d : null;
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

const PRIMARY_CLASS =
  "inline-flex items-center justify-center gap-2 min-h-[44px] px-5 rounded-md text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] focus-visible:ring-offset-2";
const PRIMARY_STYLE: React.CSSProperties = {
  backgroundColor: "var(--brand-primary, #3B5998)",
  color: "var(--brand-primary-foreground, #FFFFFF)",
};
const SECONDARY_CLASS =
  "inline-flex items-center justify-center min-h-[44px] px-5 rounded-md text-sm font-medium border transition-colors hover:bg-[var(--neutral-50,#FAFBFC)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] focus-visible:ring-offset-2";
const SECONDARY_STYLE: React.CSSProperties = {
  borderColor: "var(--card-border, #D1D5DB)",
  color: "var(--neutral-700, #434B52)",
  backgroundColor: "transparent",
};

/**
 * Confirm-to-start modal for a Rello trial (ANSWERS Q-CS-7): explicit
 * confirmation, no auto-enroll. States: confirm → pending → started |
 * already used (409, with the existing end date and an upgrade link) |
 * error with retry.
 */
function TrialStartModal({
  open,
  onClose,
  onConfirm,
  upgradeHref,
  upgradeLabel = "Upgrade to Rello",
  title = "Start your 14-day free trial",
  description = "You'll have full Rello free for 14 days.",
  confirmLabel = "Start trial",
  cancelLabel = "Not now",
  successAction,
  onResult,
  className,
}: TrialStartModalProps) {
  const [phase, setPhase] = React.useState<Phase>({ kind: "idle" });

  // Double-submit guard. A ref, not state: two confirms in one batch both see
  // the pre-render state, and a disabled button only stops the second click
  // after React has re-rendered.
  const inFlightRef = React.useRef(false);
  const mountedRef = React.useRef(false);
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const onConfirmRef = React.useRef(onConfirm);
  onConfirmRef.current = onConfirm;
  const onResultRef = React.useRef(onResult);
  onResultRef.current = onResult;

  React.useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reopening after an error starts fresh; a pending request, a started
  // trial or a 409 is kept so the user cannot fire a second start.
  const wasOpenRef = React.useRef(open);
  React.useEffect(() => {
    if (open && !wasOpenRef.current && !inFlightRef.current) {
      setPhase((p) => (p.kind === "error" ? { kind: "idle" } : p));
    }
    wasOpenRef.current = open;
  }, [open]);

  const submit = async () => {
    if (inFlightRef.current) return;
    inFlightRef.current = true;
    setPhase({ kind: "pending" });

    let result: TrialStartResult;
    try {
      const raw: unknown = await onConfirmRef.current();
      const read = readResult(raw);
      if (read) {
        result = read;
      } else {
        console.error("[TrialStartModal] onConfirm resolved with an unreadable trial-start result; showing the error state", {
          received: raw === null ? "null" : typeof raw,
        });
        result = { status: "error" };
      }
    } catch (err) {
      console.error("[TrialStartModal] trial start failed", err);
      result = { status: "error" };
    } finally {
      inFlightRef.current = false;
    }

    try {
      onResultRef.current?.(result);
    } catch (err) {
      console.error("[TrialStartModal] onResult threw", { status: result.status, err });
    }

    if (!mountedRef.current) return;
    if (result.status === "started") setPhase({ kind: "started", trialEndsAt: result.trialEndsAt });
    else if (result.status === "already-used") setPhase({ kind: "already-used", trialEndsAt: result.trialEndsAt });
    else {
      const message = typeof result.message === "string" && result.message.trim() !== "" ? result.message.trim() : undefined;
      setPhase({ kind: "error", message });
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) onClose();
  };

  const body = (() => {
    switch (phase.kind) {
      case "started": {
        const end = toDate(phase.trialEndsAt);
        return (
          <>
            <DialogPrimitive.Description asChild>
              <div className="space-y-1">
                <p className="text-sm font-medium">Your Rello trial has started.</p>
                {end ? <p className="text-sm">It runs until {DATE_FORMAT.format(end)}.</p> : null}
              </div>
            </DialogPrimitive.Description>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" className={SECONDARY_CLASS} style={SECONDARY_STYLE} onClick={onClose}>
                Done
              </button>
              {successAction ? (
                <a href={successAction.href} onClick={successAction.onClick} className={PRIMARY_CLASS} style={PRIMARY_STYLE}>
                  {successAction.label}
                </a>
              ) : null}
            </div>
          </>
        );
      }
      case "already-used": {
        const end = toDate(phase.trialEndsAt);
        const ended = end ? end.getTime() <= Date.now() : false;
        return (
          <>
            <DialogPrimitive.Description asChild>
              <div className="space-y-1">
                <p className="text-sm font-medium">You&apos;ve already used your Rello trial.</p>
                {end ? (
                  <p className="text-sm">
                    {ended ? "Your trial ended on" : "Your trial runs until"} {DATE_FORMAT.format(end)}.
                  </p>
                ) : null}
              </div>
            </DialogPrimitive.Description>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" className={SECONDARY_CLASS} style={SECONDARY_STYLE} onClick={onClose}>
                Close
              </button>
              <a href={upgradeHref} className={PRIMARY_CLASS} style={PRIMARY_STYLE}>
                {upgradeLabel}
              </a>
            </div>
          </>
        );
      }
      case "error":
        return (
          <>
            <DialogPrimitive.Description asChild>
              <p role="alert" className="text-sm" style={{ color: "var(--error, #C9605D)" }}>
                We couldn&apos;t start your trial. {phase.message ?? DEFAULT_ERROR_HINT}
              </p>
            </DialogPrimitive.Description>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" className={SECONDARY_CLASS} style={SECONDARY_STYLE} onClick={onClose}>
                {cancelLabel}
              </button>
              <button type="button" className={PRIMARY_CLASS} style={PRIMARY_STYLE} onClick={submit}>
                Try again
              </button>
            </div>
          </>
        );
      default: {
        const pending = phase.kind === "pending";
        return (
          <>
            <DialogPrimitive.Description asChild>
              <div className="text-sm" style={{ color: "var(--neutral-700, #434B52)" }}>
                {description}
              </div>
            </DialogPrimitive.Description>
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" className={SECONDARY_CLASS} style={SECONDARY_STYLE} onClick={onClose}>
                {cancelLabel}
              </button>
              <button
                type="button"
                className={PRIMARY_CLASS}
                style={PRIMARY_STYLE}
                onClick={submit}
                disabled={pending}
                aria-busy={pending ? "true" : undefined}
              >
                {pending ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                    />
                    Starting your trial…
                  </>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </>
        );
      }
    }
  })();

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0"
          style={{
            zIndex: "var(--z-modal, 50)",
            backgroundColor: "color-mix(in srgb, var(--neutral-900, #2D3339) 50%, transparent)",
          }}
        />
        <DialogPrimitive.Content
          aria-modal="true"
          aria-label={title}
          onOpenAutoFocus={() => {
            // Radix has not moved focus yet: this is the element that opened us.
            const active = typeof document !== "undefined" ? document.activeElement : null;
            returnFocusRef.current = active instanceof HTMLElement && active !== document.body ? active : null;
          }}
          onCloseAutoFocus={(event) => {
            // With no <Dialog.Trigger>, Radix would focus a null trigger and
            // drop focus on <body>. Return it to the opener instead.
            event.preventDefault();
            const el = returnFocusRef.current;
            returnFocusRef.current = null;
            if (el && el.isConnected) el.focus();
          }}
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-lg border p-6 shadow-lg outline-none space-y-4",
            className,
          )}
          style={{
            zIndex: "var(--z-modal, 50)",
            backgroundColor: "var(--card-background, #FFFFFF)",
            borderColor: "var(--card-border, #D1D5DB)",
            color: "var(--foreground, #2D3339)",
          }}
        >
          <DialogPrimitive.Title className="text-lg font-semibold leading-tight">{title}</DialogPrimitive.Title>
          {body}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { TrialStartModal };
