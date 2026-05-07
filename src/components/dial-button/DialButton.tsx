"use client";

import * as React from "react";
import { Button } from "../button";

export type DialPath = "softphone" | "tel";

export interface DialButtonProps {
  /** Lead the call belongs to. Passed to onDial. */
  leadId: string;
  /** E.164 or display-formatted phone number. Powers tel: fallback href. */
  phoneNumber: string;
  /** Optional phoneId for multi-phone leads. Defaults to "primary". */
  phoneId?: string;
  /**
   * Consumer-injected dial dispatcher. When present AND `entitled === true`,
   * click is intercepted and onDial is invoked instead of native tel: navigation.
   * When undefined / null / entitled !== true, the click falls through to the
   * native <a href="tel:..."> behavior.
   *
   * Rello-side consumers wire `useSoftphone().makeCall` here.
   * HH-side / non-Rello consumers leave undefined → tel: fallback.
   *
   * Per Rello-UI anti-pattern (no business logic): this component does NOT
   * fetch entitlement state, does NOT import useSoftphone, does NOT read env.
   * All dispatch + entitlement state is consumer-injected.
   */
  onDial?: (
    leadId: string,
    phoneOverride: { phoneId: string; number: string }
  ) => Promise<void> | void;
  /**
   * Tri-state entitlement signal. `true` → onDial path (if onDial provided).
   * `false` / `null` / `undefined` → tel: fallback. `null` is the
   * "checking" state consumers may pass while their entitlement read is
   * in-flight; it behaves identically to false (tel: fallback) so the button
   * is never inert.
   */
  entitled?: boolean | null;
  /** Override the tel: href if consumer wants a custom URI scheme. */
  fallbackHref?: string;
  /** Fires post-dispatch with which path was taken. Both branches call it. */
  onContactInitiated?: (path: DialPath) => void;
  /** Button label. Default "Call". */
  children?: React.ReactNode;
  /** Defaults to `Call ${phoneNumber}`. */
  ariaLabel?: string;
  /** Disable the button entirely (e.g., DNC scrubbed). */
  disabled?: boolean;
  /** Pass-through className for layout. */
  className?: string;
}

export const DialButton = React.forwardRef<HTMLAnchorElement, DialButtonProps>(
  function DialButton(
    {
      leadId,
      phoneNumber,
      phoneId = "primary",
      onDial,
      entitled,
      fallbackHref,
      onContactInitiated,
      children,
      ariaLabel,
      disabled,
      className,
    },
    ref
  ) {
    const href = fallbackHref ?? `tel:${phoneNumber}`;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault();
        return;
      }

      if (onDial && entitled === true) {
        e.preventDefault();
        try {
          const result = onDial(leadId, { phoneId, number: phoneNumber });
          if (result && typeof (result as Promise<void>).catch === "function") {
            (result as Promise<void>).catch((err) => {
              console.error("[DialButton] onDial rejected", {
                leadId,
                phoneId,
                error: err instanceof Error ? err.message : String(err),
              });
            });
          }
          onContactInitiated?.("softphone");
        } catch (err) {
          console.error("[DialButton] onDial threw synchronously", {
            leadId,
            phoneId,
            error: err instanceof Error ? err.message : String(err),
          });
        }
        return;
      }

      onContactInitiated?.("tel");
    };

    return (
      <a
        ref={ref}
        href={href}
        onClick={handleClick}
        aria-label={ariaLabel ?? `Call ${phoneNumber}`}
        aria-disabled={disabled || undefined}
        className={className}
      >
        <Button variant="primary" disabled={disabled}>
          {children ?? "Call"}
        </Button>
      </a>
    );
  }
);
