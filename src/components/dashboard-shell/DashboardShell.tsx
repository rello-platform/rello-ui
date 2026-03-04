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
}

export interface DashboardNavGroup {
  label?: string | null;
  items: DashboardNavItem[];
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

  className?: string;
}

/* ─── Sidebar ─── */

function Sidebar({
  navGroups,
  activeNavLabel,
  onNavClick,
  hovered,
  onHover,
}: {
  navGroups: DashboardNavGroup[];
  activeNavLabel?: string;
  onNavClick?: (item: DashboardNavItem) => void;
  hovered: boolean;
  onHover: (h: boolean) => void;
}) {
  return (
    <div
      className="rounded-xl flex-shrink-0 overflow-hidden transition-all duration-300 hidden md:block"
      style={{
        width: hovered ? 190 : 60,
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--card-border)",
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="py-2">
        {navGroups.map((group, gi) => (
          <div key={gi}>
            {group.label && hovered && (
              <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-400)] px-4 pt-3 pb-1">
                {group.label}
              </p>
            )}
            {group.items.map((item) => {
              const isActive = item.label === activeNavLabel;
              return (
                <button
                  key={item.label}
                  onClick={() => onNavClick?.(item)}
                  className="w-full flex items-center gap-2.5 py-2.5 transition-colors"
                  style={{
                    paddingLeft: hovered ? 14 : 16,
                    paddingRight: 14,
                    backgroundColor: isActive ? "var(--brand-primary)" : "transparent",
                    color: isActive ? "#fff" : "var(--neutral-600)",
                    borderRadius: isActive ? 10 : 0,
                    margin: isActive ? "2px 6px" : "0",
                    width: isActive ? "calc(100% - 12px)" : "100%",
                  }}
                >
                  <div className="size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                    {item.icon}
                  </div>
                  {hovered && (
                    <span className="text-xs font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
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
}: {
  open: boolean;
  onClose: () => void;
  navGroups: DashboardNavGroup[];
  activeNavLabel?: string;
  onNavClick?: (item: DashboardNavItem) => void;
  agentName: string;
  agentInitials: string;
  agentSubtitle?: string;
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
          style={{ background: "var(--brand-primary-light)", color: "var(--brand-primary)" }}
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
        <nav className="py-2">
          {navGroups.map((group, gi) => (
            <div key={gi}>
              {group.label && (
                <p className="text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-400)] px-5 pt-3 pb-1">
                  {group.label}
                </p>
              )}
              {group.items.map((item) => {
                const isActive = item.label === activeNavLabel;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      onNavClick?.(item);
                      onClose();
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full px-5 py-2.5 text-sm transition-colors",
                      isActive
                        ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-semibold"
                        : "text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]"
                    )}
                  >
                    <div className="size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5">
                      {item.icon}
                    </div>
                    {item.label}
                  </button>
                );
              })}
            </div>
          ))}
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
        <div className="flex items-start gap-3 md:gap-4 max-w-xl">
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -ml-2 rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-50)]"
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
              className="text-sm md:text-base"
              style={{ color: "var(--app-subtitle-color, var(--neutral-500))", fontFamily: "var(--font-app-subtitle, var(--font-body))" }}
            >
              {appSubtitle}
            </p>
            {highlightText && (
              <p className="text-sm leading-relaxed mt-1.5 text-[var(--neutral-600)] hidden md:block">
                {highlightText}
              </p>
            )}
          </div>
        </div>

        {/* Right: Agent card */}
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
              <p className="text-[10px] text-[var(--neutral-400)]">{agentSubtitle}</p>
            )}
          </div>
          <div
            className="size-9 rounded-full flex items-center justify-center text-xs font-semibold"
            style={{
              backgroundColor: "var(--brand-primary-light)",
              color: "var(--brand-primary)",
            }}
          >
            {agentInitials}
          </div>
        </div>
      </div>

      {/* === MAIN AREA: Sidebar + Content === */}
      <div className="flex px-4 md:px-6 pt-4 pb-6 gap-4" style={{ minHeight: 320 }}>
        {/* Desktop sidebar */}
        <Sidebar
          navGroups={navGroups}
          activeNavLabel={activeNavLabel}
          onNavClick={onNavClick}
          hovered={sidebarHovered}
          onHover={setSidebarHovered}
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
      />
    </div>
  );
}

export { DashboardShell };
