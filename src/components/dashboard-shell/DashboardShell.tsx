"use client";

import * as React from "react";
import { useState } from "react";
import { Menu } from "iconoir-react";
import { SlidePanel, SlidePanelHeader, SlidePanelBody } from "../slide-panel";
import { cn } from "../../lib/cn";

/* ─── Types ─── */

export interface DashboardNavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
  /**
   * Override for the rendered button's `aria-label`. Defaults to `label`.
   * Use when the visible `label` is hidden in the collapsed sidebar (icon-only)
   * and the icon alone does not convey the destination — falling back to
   * `label` ensures every nav button carries an accessible name even when
   * the visible text is not in the DOM.
   */
  ariaLabel?: string;
  /**
   * Visual variant for the rendered nav button. Defaults to undefined
   * (matches sibling nav items: transparent background, active-page highlight).
   * Use `primary` / `accent` / `danger` for prominent footer-action buttons
   * (e.g. "Return to Rello", "Sign out") that need visual differentiation
   * from regular nav items. Variant-styled items render with their background
   * color always applied (no active-page highlight) since they represent
   * actions, not pages within the app.
   *
   * Variant names mirror the shared `buttonVariants` palette in
   * `../button/variants.ts` so consumers can reason about visual hierarchy
   * consistently between <Button> and nav items.
   */
  variant?: "primary" | "accent" | "danger";
}

export interface DashboardNavGroup {
  label?: string | null;
  items: DashboardNavItem[];
  /**
   * When true, this group is pinned to the bottom of the sidebar. Multiple
   * pinned groups stack in source-order against the bottom of the rail.
   * Implementation uses flex column + `margin-top: auto` on the first
   * pinned group, so unpinned groups pack at the top and pinned groups
   * pack at the bottom regardless of how many nav items each contains.
   *
   * Use this for "Settings" / "Sign out" / "Return to Rello" footer slots
   * in consumer apps. Defaults to false (top-packed nav).
   */
  pinToBottom?: boolean;
}

export interface DashboardShellProps {
  /** Logo element (top-left, beside title) */
  logo: React.ReactNode;
  /** App title — renders in heading font at 30px */
  appTitle: string;
  /** Subtitle below the title */
  appSubtitle: string;
  /** Dynamic highlight paragraph (numbers auto-bolded if string) */
  highlightText?: React.ReactNode;

  /** Agent name shown in top-right card */
  agentName: string;
  /** Two-letter initials for the avatar circle */
  agentInitials: string;
  /** Role/title shown below agent name */
  agentSubtitle?: string;

  /** Sidebar navigation groups */
  navGroups: DashboardNavGroup[];
  /** Label of the currently active nav item */
  activeNavLabel?: string;
  /** Called when a nav item is clicked */
  onNavClick?: (item: DashboardNavItem) => void;

  /** Left 50% of main content area */
  heroContent?: React.ReactNode;
  /** Right 50% of main content area (omit for full-width hero) */
  rightCard?: React.ReactNode;

  /** Content below the hero row */
  children?: React.ReactNode;

  /** Content rendered inside the agent card (left-justified) — card expands to fill top bar */
  headerActions?: React.ReactNode;

  /** Content rendered to the left of the agent card in the top-right area */
  headerRightSlot?: React.ReactNode;

  /** Extra className for the header left area (logo + title) — useful for animations */
  headerClassName?: string;

  /**
   * Optional ReactNode rendered at the very bottom of the sidebar, below the
   * last pinned nav group. Use for footer-action elements that need bespoke
   * visual treatment outside the `variant` system (e.g. hardcoded brand colors,
   * raw <button> shapes). Renders unchanged — caller owns all styling.
   */
  footerCustom?: React.ReactNode;

  className?: string;
}

/* ─── Sidebar ─── */

function Sidebar({
  navGroups,
  activeNavLabel,
  onNavClick,
  hovered,
  onHover,
  footerCustom,
}: {
  navGroups: DashboardNavGroup[];
  activeNavLabel?: string;
  onNavClick?: (item: DashboardNavItem) => void;
  hovered: boolean;
  onHover: (h: boolean) => void;
  footerCustom?: React.ReactNode;
}) {
  // Find the FIRST pinToBottom group — that index gets `margin-top: auto`,
  // which pushes it (and every subsequent group) to the bottom of the
  // flex column. Pinned groups stack in source order against the bottom.
  const firstPinnedIdx = navGroups.findIndex((g) => g.pinToBottom === true);

  return (
    <div
      className="rounded-xl flex-shrink-0 overflow-hidden transition-all duration-300 hidden md:flex flex-col"
      style={{
        width: hovered ? 190 : 60,
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--card-border)",
        minHeight: "100%",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="py-2 flex flex-col flex-1 min-h-0">
        {navGroups.map((group, gi) => (
          <div
            key={gi}
            style={gi === firstPinnedIdx ? { marginTop: "auto" } : undefined}
          >
            {group.label && hovered && (
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-600)] px-4 pt-3 pb-1">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const variant = item.variant;
              const isActive = variant === undefined && item.label === activeNavLabel;
              const variantBg = variant
                ? {
                    primary: "var(--brand-primary)",
                    accent: "var(--brand-accent)",
                    danger: "var(--error)",
                  }[variant]
                : undefined;
              const isProminent = isActive || variant !== undefined;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavClick?.(item)}
                  aria-label={item.ariaLabel ?? item.label}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "w-full flex items-center gap-2.5 py-2.5 min-h-[44px] transition-colors",
                    variant && "hover:opacity-90"
                  )}
                  style={{
                    paddingLeft: hovered ? 14 : 16,
                    paddingRight: 14,
                    backgroundColor: variantBg ?? (isActive ? "var(--brand-primary)" : "transparent"),
                    color: isProminent ? "#fff" : "var(--neutral-600)",
                    borderRadius: isProminent ? 10 : 0,
                    margin: isProminent ? "2px 6px" : "0",
                    width: isProminent ? "calc(100% - 12px)" : "100%",
                  }}
                >
                  <div className="size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                    {item.icon}
                  </div>
                  {hovered && (
                    <span className="text-xs font-medium whitespace-nowrap" style={{ fontFamily: "var(--font-app-subtitle, var(--font-body))" }}>
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
        {footerCustom}
      </div>
    </div>
  );
}

/* ─── Mobile nav (SlidePanel) ─── */

function MobileNav({
  open,
  onClose,
  navGroups,
  activeNavLabel,
  onNavClick,
  agentName,
  agentInitials,
  agentSubtitle,
  footerCustom,
}: {
  open: boolean;
  onClose: () => void;
  navGroups: DashboardNavGroup[];
  activeNavLabel?: string;
  onNavClick?: (item: DashboardNavItem) => void;
  agentName: string;
  agentInitials: string;
  agentSubtitle?: string;
  footerCustom?: React.ReactNode;
}) {
  return (
    <SlidePanel isOpen={open} onClose={onClose} position="left" width="280px">
      <SlidePanelHeader>
        <span className="font-semibold text-[var(--neutral-900)]">Menu</span>
      </SlidePanelHeader>

      {/* Profile */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--card-border)]">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold"
          style={{ background: "var(--brand-primary-light)", color: "var(--neutral-900, #111827)" }}
        >
          {agentInitials}
        </div>
        <div>
          <div className="font-medium text-sm text-[var(--neutral-900)]">{agentName}</div>
          {agentSubtitle && (
            <div className="text-xs text-[var(--neutral-500)]">{agentSubtitle}</div>
          )}
        </div>
      </div>

      <SlidePanelBody>
        <nav className="py-2 flex flex-col min-h-full">
          {navGroups.map((group, gi) => {
            const firstPinnedIdx = navGroups.findIndex((g) => g.pinToBottom === true);
            return (
            <div key={gi} style={gi === firstPinnedIdx ? { marginTop: "auto" } : undefined}>
              {group.label && (
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-600)] px-5 pt-3 pb-1">
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const variant = item.variant;
                const isActive = variant === undefined && item.label === activeNavLabel;
                const variantClass = variant
                  ? {
                      primary: "bg-[var(--brand-primary)] text-white hover:opacity-90",
                      accent: "bg-[var(--brand-accent)] text-white hover:opacity-90",
                      danger: "bg-[var(--error)] text-white hover:opacity-90",
                    }[variant]
                  : null;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onNavClick?.(item);
                      onClose();
                    }}
                    aria-label={item.ariaLabel ?? item.label}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 w-full px-5 py-2.5 min-h-[44px] text-sm transition-colors",
                      variantClass ??
                        (isActive
                          ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-semibold"
                          : "text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]")
                    )}
                    style={{ fontFamily: "var(--font-app-subtitle, var(--font-body))" }}
                  >
                    <div className="size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                      {item.icon}
                    </div>
                    {item.label}
                  </button>
                );
              })}
            </div>
            );
          })}
          {footerCustom}
        </nav>
      </SlidePanelBody>
    </SlidePanel>
  );
}

/* ─── DashboardShell ─── */

function DashboardShell({
  logo,
  appTitle,
  appSubtitle,
  highlightText,
  agentName,
  agentInitials,
  agentSubtitle,
  navGroups,
  activeNavLabel,
  onNavClick,
  heroContent,
  rightCard,
  children,
  headerActions,
  headerRightSlot,
  headerClassName,
  footerCustom,
  className,
}: DashboardShellProps) {
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className={cn("min-h-screen", className)}
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* === TOP ROW: Logo + Title on left, Agent card on right === */}
      <div className="flex items-start justify-between px-4 md:px-6 pt-4 md:pt-6">
        {/* Left: Logo + Title + Subtitle + Highlight */}
        <div className={cn("flex items-start gap-3 md:gap-4 max-w-xl", headerClassName)}>
          {/* Mobile hamburger */}
          <button
            className="md:hidden -ml-2 rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-50)] inline-flex items-center justify-center min-h-[44px] min-w-[44px]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu width={20} height={20} strokeWidth={1.5} />
          </button>

          {/* Logo */}
          <div className="shrink-0 hidden md:block">{logo}</div>

          <div>
            <h1
              className="text-2xl md:text-3xl font-bold tracking-tight leading-tight"
              style={{ color: "var(--app-title-color, var(--foreground))", fontFamily: "var(--font-app-title, var(--font-heading))" }}
            >
              {appTitle}
            </h1>
            <p
              className="text-sm md:text-base font-bold"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-app-subtitle, var(--font-body))" }}
            >
              {appSubtitle}
            </p>
            {highlightText && (
              <p
                className="text-sm leading-relaxed mt-1.5 hidden md:block"
                style={{ color: "var(--neutral-600)", fontFamily: "var(--font-app-subtitle, var(--font-body))" }}
              >
                {highlightText}
              </p>
            )}
          </div>
        </div>

        {/* Right: Optional slot + Agent card */}
        <div className="flex items-center gap-3 shrink-0">
          {headerRightSlot}
        <div
          className="rounded-xl px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-3 shrink-0"
          style={{
            backgroundColor: "var(--card-background)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div className="text-right hidden md:block">
            <p className="text-xs font-medium text-[var(--foreground)]">{agentName}</p>
            {agentSubtitle && (
              <p className="text-[10px] text-[var(--neutral-600)]">{agentSubtitle}</p>
            )}
          </div>
          <div
            className="size-9 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              backgroundColor: "var(--brand-primary-light)",
              color: "var(--neutral-900, #111827)",
            }}
          >
            {agentInitials}
          </div>
        </div>
        </div>
      </div>

      {/* === HEADER ACTIONS BAR (below title, full width) === */}
      {headerActions && (
        <div className="px-4 md:px-6 pt-3">
          {headerActions}
        </div>
      )}

      {/* === MAIN AREA: Sidebar + Content === */}
      <div className="flex px-4 md:px-6 pt-4 pb-6 gap-4" style={{ minHeight: 320 }}>
        {/* Desktop sidebar */}
        <Sidebar
          navGroups={navGroups}
          activeNavLabel={activeNavLabel}
          onNavClick={onNavClick}
          hovered={sidebarHovered}
          onHover={setSidebarHovered}
          footerCustom={footerCustom}
        />

        {/* Content area */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          {/* Hero row: 50/50 split (or full width if no rightCard) */}
          {(heroContent || rightCard) && (
            <div className={cn("flex flex-col lg:flex-row gap-4", !rightCard && "lg:flex-col")}>
              {heroContent && <div className="flex-1 min-w-0">{heroContent}</div>}
              {rightCard && <div className="flex-1 min-w-0">{rightCard}</div>}
            </div>
          )}

          {/* Below hero */}
          {children}
        </div>
      </div>

      {/* Mobile nav */}
      <MobileNav
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navGroups={navGroups}
        activeNavLabel={activeNavLabel}
        onNavClick={onNavClick}
        agentName={agentName}
        agentInitials={agentInitials}
        agentSubtitle={agentSubtitle}
        footerCustom={footerCustom}
      />
    </div>
  );
}

export { DashboardShell };
