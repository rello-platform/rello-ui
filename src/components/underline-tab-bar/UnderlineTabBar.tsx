"use client";

/**
 * Canonical underline tab bar — bold-on-active (icon + label heavier on the
 * active tab), `border-b-2` brand-primary on active, horizontal-scroll
 * overflow, ArrowLeft/Right/Home/End keyboard navigation, 44px minimum touch
 * targets, design-token fallbacks. URL state is caller responsibility — the
 * component is presentation-only.
 *
 * Overflow affordance: when the tab row overflows its container horizontally
 * (at ANY breakpoint), edge fade gradients + clickable scroll-chevron buttons
 * appear on whichever side(s) have hidden tabs, so a clipped tab is always
 * discoverable. Scroll state is detected internally via a `ResizeObserver` +
 * scroll listener on the scroll container; the affordances disappear when the
 * row fits. The chevrons scroll by ~one tab-width per click and are keyboard
 * focusable; the fades are `aria-hidden` + `pointer-events-none`. None of this
 * regresses the existing ArrowLeft/Right/Home/End roving-tabindex keyboard nav.
 *
 * Link-mode (per-tab `href`): tab renders as `<Link>` so middle-click +
 * right-click + cmd-click behave as native navigation. Button-mode (no
 * `href`): tab renders as `<button>` and invokes `onChange(id)` on click
 * (e.g. Settings hub's Sign Out tab triggers a fetch-and-redirect, not
 * navigation).
 */

import * as React from "react";
import Link from "next/link";
import clsx from "clsx";
import { NavArrowLeft, NavArrowRight } from "iconoir-react";

export interface UnderlineTab {
  /** Lowercase-hyphenated slug; typically written to ?tab= URL state by the
   *  caller. */
  id: string;
  label: string;
  /** Optional leading icon (e.g. iconoir-react component). */
  icon?: React.ReactNode;
  /** Optional badge count, e.g. Milo Review (N). Rendered only when > 0. */
  count?: number;
  /** Conditional gate — preferred over caller-side filtering. */
  hidden?: boolean;
  /** Optional disabled state (e.g. flag-off path). */
  disabled?: boolean;
  /** When provided, the tab renders as `<Link href={href} scroll={false}>`
   *  so right-click / middle-click / cmd-click open in a new tab. When absent,
   *  the tab renders as `<button>` and invokes `onChange(id)` on click. */
  href?: string;
  /** Pairs with `href`. When true, the rendered Link uses `replace` semantics
   *  (router.replace) — preserves the browser-history-skip pattern for tab
   *  surfaces that don't want each tab visit to push a history entry. */
  replace?: boolean;
}

export interface UnderlineTabBarProps {
  tabs: UnderlineTab[];
  activeTab: string;
  /** Caller wires URL state (router.replace) when tabs are button-mode, OR
   *  fires analytics side-effects on click in either mode. Optional because
   *  pure Link-mode consumers (e.g. nested-route hub tab bars) delegate
   *  navigation to next/link and omit this prop. */
  onChange?: (id: string) => void;
  /** Required for tablist a11y per WAI-ARIA tabs pattern. */
  ariaLabel: string;
  className?: string;
}

export function UnderlineTabBar({
  tabs,
  activeTab,
  onChange,
  ariaLabel,
  className,
}: UnderlineTabBarProps) {
  const visibleTabs = tabs.filter((t) => !t.hidden);
  const activeIndex = Math.max(
    0,
    visibleTabs.findIndex((t) => t.id === activeTab),
  );

  // --- Overflow affordance: detect when the tab row is horizontally
  // scrollable, so edge fades + scroll chevrons appear only when tabs are
  // actually clipped (at ALL breakpoints — the previous mobile-only `sm:hidden`
  // fade left desktop overflow with zero affordance). Presentation-only.
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const updateScrollState = React.useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth, scrollWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    // -1 guard absorbs sub-pixel rounding so a fitting row reports "no overflow".
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Initial measure (after layout) + on scroll + on resize of the container
    // or its content (tabs added/removed, font load, container width change).
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });

    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(() => updateScrollState());
      observer.observe(el);
      // Observe the inner content too so added/removed tabs retrigger measure.
      if (el.firstElementChild) observer.observe(el.firstElementChild);
    }

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      observer?.disconnect();
    };
  }, [updateScrollState, visibleTabs.length]);

  function scrollByDirection(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    // Scroll by ~one tab-width: first child's width is a good proxy; fall back
    // to ~80% of the viewport so the gesture always makes visible progress.
    const firstTab = el.querySelector<HTMLElement>('[role="tab"]');
    const step = firstTab?.offsetWidth
      ? firstTab.offsetWidth + 24
      : Math.max(120, Math.round(el.clientWidth * 0.8));
    el.scrollBy({
      left: direction === "left" ? -step : step,
      behavior: "smooth",
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (visibleTabs.length === 0) return;
    let nextIndex = activeIndex;
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        nextIndex = (activeIndex + 1) % visibleTabs.length;
        break;
      case "ArrowLeft":
        e.preventDefault();
        nextIndex =
          (activeIndex - 1 + visibleTabs.length) % visibleTabs.length;
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        e.preventDefault();
        nextIndex = visibleTabs.length - 1;
        break;
      default:
        return;
    }
    let target = visibleTabs[nextIndex];
    // Skip disabled tabs in rotation (single pass; if all disabled, no-op).
    let safety = visibleTabs.length;
    while (target && target.disabled && safety > 0) {
      nextIndex = (nextIndex + 1) % visibleTabs.length;
      target = visibleTabs[nextIndex];
      safety -= 1;
    }
    if (target && !target.disabled) onChange?.(target.id);
  }

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      className={clsx(
        "relative border-b",
        "border-[var(--neutral-200,#e5e7eb)]",
        className,
      )}
    >
      {/* Left edge: fade + clickable scroll chevron — shown only when there are
          tabs hidden off the left edge (at ALL breakpoints). */}
      {canScrollLeft && (
        <>
          <div
            aria-hidden
            className="absolute left-0 top-0 bottom-px w-8 bg-gradient-to-r from-[var(--background,#ffffff)] to-transparent pointer-events-none z-10"
          />
          <button
            type="button"
            aria-label="Scroll tabs left"
            onClick={() => scrollByDirection("left")}
            className="absolute left-0 top-0 bottom-px z-20 inline-flex items-center justify-center w-9 min-h-[44px] text-[var(--neutral-500,#6b7280)] hover:text-[var(--neutral-900,#111827)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary,#2563eb)]"
          >
            <NavArrowLeft aria-hidden width={20} height={20} />
          </button>
        </>
      )}
      {/* Right edge: fade + clickable scroll chevron — shown only when there are
          tabs hidden off the right edge (the original bug: 'Trust / Escrow'
          clipped at ~1073px with no affordance). */}
      {canScrollRight && (
        <>
          <div
            aria-hidden
            className="absolute right-0 top-0 bottom-px w-8 bg-gradient-to-l from-[var(--background,#ffffff)] to-transparent pointer-events-none z-10"
          />
          <button
            type="button"
            aria-label="Scroll tabs right"
            onClick={() => scrollByDirection("right")}
            className="absolute right-0 top-0 bottom-px z-20 inline-flex items-center justify-center w-9 min-h-[44px] text-[var(--neutral-500,#6b7280)] hover:text-[var(--neutral-900,#111827)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary,#2563eb)]"
          >
            <NavArrowRight aria-hidden width={20} height={20} />
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-4 md:gap-6 -mb-px overflow-x-auto no-scrollbar px-1 -mx-1"
      >
        {visibleTabs.map((tab) => {
          const isActive = tab.id === activeTab;
          const tabClassName = clsx(
            "inline-flex items-center gap-2",
            "pb-3 pt-3 px-1",
            "text-xs sm:text-sm",
            "border-b-2 transition-colors",
            "whitespace-nowrap flex-shrink-0",
            "min-h-[44px]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary,#2563eb)]",
            isActive
              ? "border-[var(--brand-primary,#2563eb)] text-[var(--neutral-900,#111827)] font-semibold"
              : "border-transparent text-[var(--neutral-500,#6b7280)] hover:text-[var(--neutral-700,#374151)] font-medium",
            tab.disabled && "opacity-40 cursor-not-allowed pointer-events-none",
          );
          const inner = (
            <>
              {tab.icon && (
                <span
                  aria-hidden
                  className={clsx(
                    "inline-flex shrink-0",
                    isActive && "[&>svg]:stroke-[2]",
                  )}
                >
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && tab.count > 0 && (
                <span
                  className={clsx(
                    "inline-flex items-center justify-center",
                    "rounded-full px-1.5 min-w-[20px] h-5 text-[10px]",
                    isActive
                      ? "bg-[var(--brand-primary,#2563eb)] text-white"
                      : "bg-[var(--neutral-100,#f3f4f6)] text-[var(--neutral-700,#374151)]",
                  )}
                  aria-label={`${tab.count} pending`}
                >
                  {tab.count}
                </span>
              )}
            </>
          );

          // Link branch: right-click / middle-click / cmd-click → native new-tab open.
          // `onChange` still fires via the Link's onClick so analytics side-effects
          // survive (URL-write side-effect is dropped; <Link> handles navigation natively).
          if (tab.href && !tab.disabled) {
            return (
              <Link
                key={tab.id}
                href={tab.href}
                scroll={false}
                replace={tab.replace ?? false}
                role="tab"
                id={`tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => onChange?.(tab.id)}
                onKeyDown={handleKeyDown}
                className={tabClassName}
              >
                {inner}
              </Link>
            );
          }

          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && onChange?.(tab.id)}
              onKeyDown={handleKeyDown}
              className={tabClassName}
            >
              {inner}
            </button>
          );
        })}
      </div>
    </div>
  );
}
