"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Xmark } from "iconoir-react";
import { cn } from "../../lib/cn";
import {
  LockedActions,
  emitLockedEvent,
  type LockedLearnMore,
  type LockedOnEvent,
  type LockedPrimaryAction,
} from "../locked-feature-banner/actions";

export interface LockedFeatureDialogProps {
  /** Controlled open state. */
  open: boolean;
  /** Escape, the close button and a backdrop click all call this; the spoke sets `open` false. */
  onClose: () => void;
  /** Small line above the title. */
  eyebrow?: string;
  /** Dialog title; also its accessible name (aria-labelledby). */
  title: string;
  body: React.ReactNode;
  primary: LockedPrimaryAction;
  learnMore?: LockedLearnMore;
  /** Stable seam id the spoke binds to its telemetry namespace. */
  seam: string;
  /**
   * UPSELL_EVENTS: `shown` each time it opens, `clicked` on the primary button or "Learn more",
   * `dismissed` when closed by Escape, the close button or the backdrop.
   */
  onEvent?: LockedOnEvent;
  /** Accessible name of the close button. Defaults to "Close". */
  closeLabel?: string;
  className?: string;
}

/**
 * The locked-action modal (PFP GATEWAY D58–D60): opened from a locked menu item or quick action. role=dialog,
 * aria-modal, aria-labelledby the title; Escape, × and backdrop close; focus is trapped inside and returned to the
 * element that opened it. Carries no product words, prices or routes of its own.
 */
function LockedFeatureDialog({
  open,
  onClose,
  eyebrow,
  title,
  body,
  primary,
  learnMore,
  seam,
  onEvent,
  closeLabel = "Close",
  className,
}: LockedFeatureDialogProps) {
  const returnFocusRef = React.useRef<HTMLElement | null>(null);
  const onEventRef = React.useRef(onEvent);
  onEventRef.current = onEvent;
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  // `shown` once per opening: a re-render while open does not report it again.
  const shownForOpenRef = React.useRef(false);
  React.useEffect(() => {
    if (open && !shownForOpenRef.current) {
      shownForOpenRef.current = true;
      emitLockedEvent(onEventRef.current, "shown", seam, "LockedFeatureDialog");
    }
    if (!open) shownForOpenRef.current = false;
  }, [open, seam]);

  const dismiss = React.useCallback(() => {
    emitLockedEvent(onEventRef.current, "dismissed", seam, "LockedFeatureDialog");
    onCloseRef.current();
  }, [seam]);

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) dismiss();
      }}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          data-testid="locked-feature-dialog-backdrop"
          className="fixed inset-0"
          style={{
            zIndex: "var(--z-modal, 50)",
            backgroundColor: "color-mix(in srgb, var(--neutral-900, #2D3339) 50%, transparent)",
          }}
        />
        <DialogPrimitive.Content
          aria-modal="true"
          data-seam={seam}
          onOpenAutoFocus={() => {
            // Radix has not moved focus yet: this is the element that opened the dialog.
            const active = typeof document !== "undefined" ? document.activeElement : null;
            returnFocusRef.current = active instanceof HTMLElement && active !== document.body ? active : null;
          }}
          onCloseAutoFocus={(event) => {
            // With no <Dialog.Trigger>, Radix would return focus to a null trigger and drop it on <body>.
            event.preventDefault();
            const el = returnFocusRef.current;
            returnFocusRef.current = null;
            if (el && el.isConnected) el.focus();
          }}
          className={cn(
            "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%-2rem)] max-w-xl max-h-[calc(100dvh-2rem)] overflow-y-auto overflow-x-hidden rounded-2xl shadow-lg outline-none",
            className,
          )}
          style={{
            zIndex: "var(--z-modal, 50)",
            backgroundColor: "var(--card-background, #FFFFFF)",
            color: "var(--foreground, #2D3339)",
          }}
        >
          <div
            className="flex items-center justify-end px-2 py-1"
            style={{ backgroundColor: "var(--brand-primary, #3B5998)", color: "var(--brand-primary-foreground, #FFFFFF)" }}
          >
            <button
              type="button"
              aria-label={closeLabel}
              onClick={dismiss}
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary-foreground,#FFFFFF)]"
              style={{ color: "inherit", backgroundColor: "transparent" }}
            >
              <Xmark aria-hidden="true" width={22} height={22} />
            </button>
          </div>
          <div className="space-y-3 p-5 sm:p-6">
            {eyebrow ? (
              <p className="m-0 text-xs font-extrabold uppercase tracking-widest" style={{ color: "var(--brand-accent, #C9785D)" }}>
                {eyebrow}
              </p>
            ) : null}
            <DialogPrimitive.Title className="m-0 text-2xl font-bold leading-tight [overflow-wrap:anywhere]">{title}</DialogPrimitive.Title>
            <DialogPrimitive.Description asChild>
              <div className="text-base [overflow-wrap:anywhere]" style={{ color: "var(--neutral-700, #434B52)" }}>
                {body}
              </div>
            </DialogPrimitive.Description>
            <LockedActions
              primary={primary}
              learnMore={learnMore}
              seam={seam}
              onEvent={onEvent}
              source="LockedFeatureDialog"
              className="pt-2"
            />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export { LockedFeatureDialog };
