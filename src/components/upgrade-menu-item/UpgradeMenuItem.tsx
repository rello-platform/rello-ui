"use client";

import * as React from "react";
import Link from "next/link";
import { Sparks } from "iconoir-react";
import { cn } from "../../lib/cn";

export interface UpgradeMenuItemProps {
  /** The spoke's own upgrade page, e.g. "/upgrade". */
  href: string;
  /**
   * Tenant already has Rello. Renders nothing. Required, so the spoke must
   * decide; when its entitlement read fails it passes `true` (the platform's
   * fail-open-as-suppress rule: never show an upgrade to a paying customer).
   */
  isEntitled: boolean;
  /** Rendered inside Rello's chrome (`x-rello-embed`). Renders nothing. */
  isEmbed: boolean;
  /** Label — defaults to "Upgrade". */
  label?: string;
  /** Fires on click (`menu-item.clicked`). */
  onClick?: () => void;
  /** Fires once per mount, the first time the item is visible (`menu-item.shown`). */
  onShown?: () => void;
  /** The spoke is on the upgrade page now: sets `aria-current="page"`. */
  active?: boolean;
  /** Hide the leading icon. */
  hideIcon?: boolean;
  className?: string;
}

/**
 * Always-on "Upgrade" item for a spoke's primary nav (ANSWERS Q-CS-11),
 * right-aligned beside the avatar menu by the spoke. No earned-attention,
 * 14-day or dismiss rules: only entitled and embed mode hide it. The spoke
 * also leaves it out of lead-facing routes.
 */
function UpgradeMenuItem({
  href,
  isEntitled,
  isEmbed,
  label = "Upgrade",
  onClick,
  onShown,
  active = false,
  hideIcon = false,
  className,
}: UpgradeMenuItemProps) {
  const visible = !isEntitled && !isEmbed;

  const onShownRef = React.useRef(onShown);
  onShownRef.current = onShown;
  const shownRef = React.useRef(false);
  React.useEffect(() => {
    if (visible && !shownRef.current) {
      shownRef.current = true;
      onShownRef.current?.();
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      data-active={active ? "true" : undefined}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] px-3 rounded-md text-sm font-medium transition-colors",
        "hover:bg-[var(--brand-primary-light,rgba(59,89,152,0.15))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)] focus-visible:ring-offset-2",
        className,
      )}
      style={{ color: "var(--brand-primary, #3B5998)" }}
    >
      {hideIcon ? null : <Sparks width={16} height={16} aria-hidden="true" />}
      <span>{label}</span>
    </Link>
  );
}

export { UpgradeMenuItem };
