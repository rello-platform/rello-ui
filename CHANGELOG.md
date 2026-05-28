# Changelog

All notable changes to `@rello-platform/ui` are documented here.

This project adheres to [SemVer](https://semver.org/) and the change-class
guidance in `CLAUDE.md` § Publishing convention.

## v2.15.0 — 2026-05-28

**UnderlineTabBar — canonical hoist (RELLO II T4)**

Hoisted Rello CRM's `UnderlineTabBar` primitive into `@rello-platform/ui/client` per
RELLO II CONSOLIDATED-GATED-LOCKS-260526 Block D #3. Rello had 12 in-app consumers
(leads pipeline, settings hubs, conversations, today, team, daily-plan, brand-white-label,
PageHeader composite, HubTabBar wrapper) all importing from a single source file —
hoisting makes the primitive available to every other spoke + future RELLO II surfaces
without copy-paste.

```ts
import { UnderlineTabBar, type UnderlineTab } from "@rello-platform/ui/client";
```

Surface:

- **Button mode** (`onChange` driven) — caller wires URL state (`router.replace`) and/or
  analytics side-effects.
- **Link mode** (per-tab `href`) — tab renders as `<Link href={href} scroll={false}>` so
  middle-click + right-click + cmd-click open in a new tab natively. `onChange` still
  fires via the Link's `onClick` so analytics side-effects survive the migration.
- Bold-on-active (icon stroke + label weight heavier on active tab), `border-b-2`
  brand-primary on active, horizontal-scroll overflow with mobile fade gradient at scroll
  edges, ArrowLeft/Right/Home/End keyboard nav, 44px minimum touch targets, design-token
  fallbacks throughout (`var(--brand-primary, #2563eb)`, `var(--neutral-200, #e5e7eb)`, …).
- Optional `count` badge (rendered only when `> 0`), optional `hidden` / `disabled` per
  tab, optional `replace` (paired with `href` → `router.replace` semantics for tab
  surfaces that don't want each tab visit to push a history entry).
- WAI-ARIA tabs pattern (`role="tablist"` + `role="tab"` + `aria-selected` +
  `aria-controls={"tabpanel-" + id}`); `ariaLabel` required.

**Consumer note:** zero behavior change relative to the in-repo Rello copy this hoist
replaces. Mechanical refactor. The Rello pin bump to `#v2.15.0` lands in the same wave;
all 12 import sites swap from `@/components/ui/UnderlineTabBar` to
`@rello-platform/ui/client` and the local copy is deleted.

## v2.13.0 — 2026-05-21

**DashboardShell nav items migrate from `<button>` to `<Link>` for right-click "Open in new tab/window"**

Sidebar + mobile nav items now render as Next.js `<Link href={item.href}>` when `href` is present, instead of `<button onClick={...}>`. Right-click "Open in new tab/window", middle-click, Cmd-click, and Cmd-Shift-click all work browser-native — the multi-window MLO / RE-agent workflow no longer requires copy-pasting URLs.

```ts
// Type contract — href stays optional (backwards-compatible)
interface DashboardNavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;                 // when present → renders <Link>
  onClick?: () => void;
  ariaLabel?: string;
  variant?: "primary" | "accent" | "danger";
}
```

When `href` is absent, the item renders as a `<button>` and `onNavClick(item)` is the only handler — preserves the variant action-button pattern (`variant: "danger"` "Sign out", etc.).

**`onNavClick` semantics change:** Previously consumers passed `onNavClick={(item) => router.push(item.href)}` to do navigation. The `<Link>` now handles navigation itself. `onNavClick` still fires from the `<Link>` `onClick` handler (no `preventDefault`) and should be used for analytics-side-effects only. Consumers that currently use it for `router.push` should drop the push call — keeping it produces a benign double-navigation but is wasted work.

**Peer dependency:** `next` is added as an optional peer dependency (`>=14.0.0`). All Rello-ecosystem consumers are Next.js apps; non-Next consumers that import `DashboardShell` will fail at module-resolve time. `next/link` is marked external in the build so the consumer's own Next.js install provides it.

**Plus:** ~22 `var(--token)` sites in `DashboardShell.tsx` gained hex fallbacks per `~/.claude/CLAUDE.md` Design-system invariant — every CSS var now degrades gracefully when its token is missing.

**Migration:** Spokes that always pass `href` on every nav item need no code changes — bump `@rello-platform/ui` to `2.13.0` and right-click works. Spokes that omit `href` on some nav items (action buttons) continue to render those as `<button>` unchanged. Coordinated per-spoke sweep tracked in `RELLO II SPEC-RIGHT-CLICK-NAVIGATION-FULL-BUILD.md` Wave 2.

## v2.12.0 — 2026-05-19

**DashboardShell.footerCustom is now collapse-aware (render-prop form)**

`footerCustom` accepts a function in addition to a ReactNode:

```ts
footerCustom?:
  | React.ReactNode
  | ((state: { collapsed: boolean }) => React.ReactNode);
```

When passed as a function, the Sidebar invokes it with `{ collapsed: !hovered }` so consumers can swap shapes between the 60px collapsed icon-rail and the 190px hovered/expanded pill. MobileNav always invokes the function with `collapsed: false` (the slide panel is always full-width at 280px).

**Why:** Drumbeat is the only spoke with a collapsible icon-rail. The v2.11.0 raw-ReactNode form forced consumers to either render a full-width pill that wrapped text inside the 60px rail, or reach into rello-ui DOM internals via a `ResizeObserver` hack to derive collapsed state. The render-prop variant is the clean structural fix.

**Consumer note:** Backwards-compatible — passing a `ReactNode` continues to work unchanged. Migrate to the function form only when you need shape-swap on collapse (currently Drumbeat). New Storybook story `WithFooterCustomCollapseAware` demonstrates the icon-square ⇄ full-pill swap.

## v2.11.0 — 2026-05-18

**DashboardShell.footerCustom slot (raw-element rendering)**

Adds `footerCustom?: React.ReactNode` to `DashboardShell` for downstream apps that need to render footer-action elements outside the `variant` system (hardcoded brand colors, bespoke shapes). The slot renders unchanged at the very bottom of the sidebar — caller owns all styling.

Use case: cross-app "Return to Rello" pill, locked to HR's `#c05621` warm-orange visual. The existing nav-item `variant` props (`primary` / `accent` / `danger`) bind to per-app brand CSS variables, so they can't express the platform-wide visual lock; `footerCustom` lets the consumer pass a raw `<button>` with hardcoded color.

**Consumer note:** Additive — existing apps unaffected. New Storybook story `WithFooterCustomReturnToRello` demonstrates the canonical shape.

## v2.10.0 — 2026-05-17

**DashboardCardIllustration default is now viewport-responsive**

- Default size (when prop omitted): `clamp(48px, calc(40px + 3vw), 88px)`
  - 320px viewport → ~49px
  - 1024px viewport → ~71px
  - 1440px+ viewport → 88px (capped)
- Explicit `size={N}` (number) callers unaffected — explicit always wins.

**New prop on CardIllustration:** `sizeOverride?: string` — CSS-expression dimension override (used by DashboardCardIllustration to inject the clamp). Track + App variants unchanged.

**Why:** Fixed-pixel illustration sizes don't adapt to screen width. Kelly UX lock 2026-05-17: large on desktop, smaller on mobile. The clamp range matches the canonical pre-v2.9.0 88px on wide desktops while shrinking gracefully.

**Consumer note:** Rello cards passing explicit `size={56}` continue rendering at 56px. Paired Rello-side dispatch removes those explicit values so they inherit the responsive default.

## v2.9.0 — 2026-05-17

**Tuned — DashboardCardIllustration defaults (smaller + lighter)**

- `DashboardCardIllustration` defaults updated to match the canonical Rello dashboard chrome:
  - `size` default 88 → 56
  - `iconSize` default 48 → 28
  - `bgOpacity` default 0.14 → 0.08
- Cards passing explicit values continue to render at those values — explicit always wins.
- CardIllustration (the underlying primitive) defaults unchanged; only the Dashboard variant.
- TrackCardIllustration + AppCardIllustration unaffected.

**Why:** Rello dashboard cards that don't pass explicit size/iconSize/bgOpacity rendered larger + denser than the canonical lock established by the Hero cards + Welcome modal tiles (all use 56/28/0.08). Tuning the defaults normalizes the un-touched refit cards automatically without per-card edits.

**Consumer note:** No code change required at consumer side beyond pin bump. Cards that omit the props pick up the new defaults; cards that pass explicit values are unaffected.

## v2.8.1 — 2026-05-16

**Fix — `CardIllustration` icon centering**

- `src/components/card-illustration/CardIllustration.tsx` — wrap Layer 3
  icon in `<div className="relative flex items-center justify-center">`
  instead of `<div className="relative">`. The wrapper now flex-centers
  the SVG within itself, neutralizing the line-box descender that SVG's
  default `display: inline` introduces. Without this, the icon sat at the
  top of the wrapper (above the descender space), making it visually
  shift up by a few pixels inside the 88px bounding box.

**Why:** Visible-UI bug reported by Kelly 2026-05-16 against The Oven
dashboard after the v2.8.0 chrome refit landed — illustrations were
clearly not centered in their tinted-tile bounding boxes. Affects every
consumer of `CardIllustration`, `DashboardCardIllustration`,
`TrackCardIllustration`, and `AppCardIllustration` (all share the same
underlying primitive).

**Consumer note:** Patch-only fix, no API changes. Spokes on v2.8.0
(Rello, The Oven as of 2026-05-16) should bump pin to v2.8.1.

## v2.8.0 — 2026-05-15

**Additions — Dashboard Illustration Expansion (22 new icons + 22 new entries)**

- `src/icons/dashboard-icons.tsx` — 22 new icon function exports, in-style with the existing 4 (DawnIcon / SignalIcon / PulseIcon / AtlasIcon). 48×48 viewBox, 5-layer composition, single-accent theming. New icons: `MyPipelineIcon`, `ActionsIcon`, `BrainIcon`, `FlowIcon`, `DocsIcon`, `RateAlertIcon`, `PreQualIcon`, `LoanVolumeIcon`, `ClosingIcon`, `HRAssessmentsIcon`, `HSProgressIcon`, `OpenHouseIcon`, `MailboxIcon`, `FollowupIcon`, `AppGridIcon`, `FunnelIcon`, `TrophyIcon`, `TeamPipelineIcon`, `LeadPoolIcon`, `RoutingIcon`, `TeamActivityIcon`, `TeamDawnIcon`.
- `src/icons/index.ts` — 22 new names added to the dashboard-icons re-export.
- `src/components/card-illustration/dashboard-illustrations.tsx` — 22 new entries in `DASHBOARD_ILLUSTRATIONS`: `my-pipeline`, `actions`, `brain`, `flow`, `docs`, `rate-alert`, `pre-qual`, `loan-volume`, `closing`, `hr-assessments`, `hs-progress`, `open-house`, `mailbox`, `followup`, `app-grid`, `funnel`, `trophy`, `team-pipeline`, `lead-pool`, `routing`, `team-activity`, `team-dawn`. Each entry: codename (in "The X" pattern) + section + accent hex + pattern (cycled across the existing 6 primitives) + icon ref + optional `dark` flag.
- Cohesion: no consecutive entry shares pattern + accent-hue family. `team-dawn` is the sibling-variant of `before-9` for the Team Before 9 surface; same horizon-and-sun motif, distinguishable via smaller sun + two-figure silhouettes.

**Why:** Resolves `DISCOVERED-DASHBOARD-CARD-CHROME-DRIFT-2026-05-15.md`. Honors Kelly's stated unique-illustration-per-card visual contract. Additive surface only — no breaking changes.

**Consumer note:** All 22 new illustration keys are available immediately after pin bump. Rello consumer refit ships in a paired PR (see `BUILD-|-FEATURE-ADDS/DASHBOARD-CARD-CHROME-AND-VISUAL-INTEREST/` build spec).

## v2.4.0 — 2026-05-10

### Added — DRUMBEAT RELLO-UPSELL Phase 4 PR-1

- **`RelloUpsellNudge`** (`@rello-platform/ui/client`) — ghost-styled, never-modal,
  dismissible upgrade-to-Rello nudge primitive. Six-seam upgrade pattern shipped by
  `SPEC-DRUM-RELLO-UPSELL` §Component primitive decision. Props per §Desired State:
  `seam`, `headline`, `body`, `ctaLabel?`, `onClick`, `onDismiss`, `icon?`. No business
  logic — consumer wires entitlement read, embedded-mode suppression, telemetry, and
  session-scoped dismiss persistence at the Drumbeat-side `<RelloUpsellSeam>` wrapper.
  Sibling spokes (HH / SCOUT / OHH / PFP / NS / CO-MARKETING) adopt the same primitive
  per `feedback-per-app-rebuilds-inherit-platform-admin-rebuild-precedent`.

### Notes

- Component ships through `src/client.ts` only (carries `"use client"` semantics).
- Prop interface co-located in `src/components/rello-upsell-nudge/index.ts` per Rule E.
- ARIA: `role="region"`, `aria-label="Rello upgrade option"`; dismiss button
  `aria-label="Dismiss upgrade nudge"`; Escape-key dismisses while focus is inside.
- 44px-minimum touch target on both CTA and dismiss × controls.
- Composes existing `Button` primitive — no new third-party deps.

## v2.3.0 — 2026-05-09

### Added — DRUMBEAT Wave 0 hoisted shared primitives

- **`SessionRetryBanner`** (`@rello-platform/ui/client`) — session/network retry banner with
  parameterized headline + retry label. Hoisted from `~/The-Drumbeat/src/components/AppLayout.tsx`
  per `DISCOVERED-PLATFORM-TOAST-RETRY-PATTERN-HOIST-RELLO-UI-2026-05-08`.
- **`ErrorBanner`** (`@rello-platform/ui/client`) — two-mode error banner: retry-mode
  (when `onRetry` provided) + reason-mode (when `reason` provided + no `onRetry`). Covers
  Rello campaigns + lead-conversion canonical patterns.
- **`WizardShell`** (`@rello-platform/ui/client`) — multi-step wizard container composing
  `SegmentedProgress` + `Badge` + `Button`. Pure container; consumer holds form state +
  validation + autosave debounce.
- **`MultiFeedbackWidget`** (`@rello-platform/ui/client`) — N-option feedback widget with
  optional per-option correction-text gate. Extends the `WasThisHelpful` pattern.
- **`VoiceCorpusInput`** (`@rello-platform/ui/client`) — paste-or-upload writing-samples
  multi-entry input with min/max gating, word-count badges, and `.txt` upload support.

### Notes

- All five components ship through `src/client.ts` only (carry `"use client"` semantics).
- Prop interfaces co-located in each component's `index.ts` per Rule E type-discipline.
- Composes existing primitives (`Button`, `Badge`, `SegmentedProgress`, `Textarea`) — no
  new third-party deps.

## v2.2.0 — 2026-05-09

- DashboardShell a11y — aria-label sweep + 44px touch targets. `DashboardNavItem.ariaLabel?`
  added (additive, optional). Mobile hamburger sized to 44×44px. Active nav button gets
  `aria-current="page"`. Closes axe button-name violations on collapsed-sidebar icon-only
  buttons surfaced by RCAL Phase 5 /calendar live smoke 2026-05-09.

## v2.1.0 — 2026-04-?? (pre-CHANGELOG)

- `DialButton` extracted from softphone-aware dial flow
  (`DISCOVERED-PLATFORM-DIAL-BUTTON-EXTRACTION-20260507`).

## v2.0.x — 2026-04-?? (pre-CHANGELOG)

- Two-entry split (`src/index.ts` server-safe, `src/client.ts` client-only) per
  `DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726`.
