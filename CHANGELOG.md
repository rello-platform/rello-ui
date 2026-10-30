# Changelog

All notable changes to `@rello-platform/ui` are documented here.

This project adheres to [SemVer](https://semver.org/) and the change-class
guidance in `CLAUDE.md` § Publishing convention.

## v2.34.0 — 2026-10-29

**Added: consumer and pro email can carry the sender's brand (`brand` input)**

`renderRelloEmail` takes an optional `brand: { name, logoUrl?, primary? }`
(`RelloEmailBrand`). On `consumer` and `pro` mail it replaces the sending app's logo,
name and colors with the agent's or tenant's. KA ruling 2026-10-29 (prompt 097), on
Kelly's report: *"Home Scout CTA emails should NOT have home scout branding. They need
to have the branding of the tenant or agent."* Widened to `pro` by KA amended 121
(2026-10-30), Kelly: *"Open House Hub, like Home Scout should not tout itself as an app
but instead feature the tenant or agent."*

- Header: the brand logo when `logoUrl` is a clean https URL whose path ends .png,
  .jpg, .jpeg or .gif (no credentials, whitespace or control characters), drawn with
  a `width="200"` attribute only (no height, so Outlook scales it in proportion) and
  `alt` = the brand name; CSS caps it at 200×64 (`max-width`, `max-height`,
  `height:auto`). Otherwise the brand name is the header text; an empty name shows
  nothing.
- The app's name and hosted logo appear nowhere: not in the header, logo, alt text or
  default kicker. A given `kicker` is written as given; the default kicker reads
  "Rello · from <company>" (or "Rello").
- Header band, button, links and signer initials use `brand.primary` when it is a
  `#rgb`/`#rrggbb` hex, darkened until white text on it reaches 3:1 and links 4.5:1.
  Otherwise the neutral default (the `defaults` tokens, as Rello reads them), never the
  sending app's color. Badge, detail text and card use the neutral default as well, so
  no app color shows under a brand.
- Nothing is gated: a brand with no usable logo, color or name still renders the whole
  email.
- `admin` mail ignores `brand`.
- `resolveRelloEmailBrand({ agentName, business, tenant })` is the one brand rule every
  app uses (KA amended 121): the agent's business wins as a whole, with a missing logo
  or color left missing, never taken from the tenant; otherwise the tenant. A business
  whose name is the leading words of the tenant's (or the reverse) is the tenant.
- Without `brand` (absent, undefined or null) every render is byte-identical to v2.33.0:
  `src/email/consumer-brand.test.ts` hashes every platform slug × {consumer, pro,
  admin} against `src/email/fixtures/v2.33.0-no-brand-<audience>.json` (written at
  b320298d), compares one full home-scout render per audience character for character,
  and re-checks the v2.32.0 logo-cut baseline.
- New exports: `resolveRelloEmailBrand` and types `RelloEmailBrand`,
  `RelloEmailBrandLevelInput`, `ResolvedRelloEmailBrand`. No component, token or CSS
  change.

## v2.33.0 — 2026-10-29

**Changed: `pro` email draws the sending app's logo**

`renderRelloEmail` with `audience: "pro"` now draws the sending app's logo
(`relloEmailLogoUrl(app)`), as `consumer` already did. Only `admin` mail keeps
the Rello logo and palette. KA ruling 2026-10-29, on Kelly's report about Market
Intel's agent-facing emails: *"those dont include the Market intel logo or are the
correct colors for the app in rello ui."* Every app's email carries that app's logo,
whoever receives it. This also changes Harvest Home and The Drumbeat, whose emails are
`pro`.

- An app with no hosted logo (`pathfinder-pro`, `the-oven`, the engines…) shows its
  name as text in the header on `pro` mail, as on `consumer` mail. An unknown app
  still falls back to Rello.
- Nothing else in the output changes. `src/email/logo-by-audience.test.ts` renders
  every platform slug × {consumer, pro, admin}. With the header logo cut out, each
  render hashes the same as at v2.32.0 (`src/email/fixtures/v2.32.0-logo-baseline.json`),
  and the text part is identical.
- No export, type or signature change. No component, token or CSS change.

## v2.32.0 — 2026-10-28

**New: `@rello-platform/ui/email` — the shared transactional email shell**

A new pure-TypeScript subpath entry (`dist/email.js`, no `"use client"` banner, no
React/DOM/env) with one renderer, `renderRelloEmail(input) → { subject, preheader,
html, text }`, for the Rello-family transactional emails (sign-in links, invites,
notices, alerts). Layout is Kelly's "option A" (2026-10-28): the app logo, 96 px and
centered on the app's color, the kicker "<App> · from <Company>", the headline, then
body paragraphs, an optional info card, one button (+ the full link under it), an
optional secondary link, the signer and the footer. Three audiences: `consumer` (the
app's logo, the app's colors), `pro` (Rello logo, the app's colors) and `admin`
(Rello logo, Rello's colors).

- Every text value is HTML-escaped inside the renderer; button/link URLs must be
  absolute http(s) with no whitespace, control character or U+2028/U+2029 inside,
  or the button/link is dropped (so the plain-text part cannot gain a second link
  line); empty fields are omitted.
- App-slug and badge-tone lookups read own keys only, so an inherited name such as
  `constructor` or `__proto__` falls back like any unknown value.
- Colors are each app's own rello-ui colors (Kelly 2026-10-29: "I don't like the
  black. Each app has its own colors in Rello ui that should match."), read at render
  time from `tokens/app-overrides.json` — `apps.<key>.<field>`, else
  `defaults.<field>`; no hex is copied into the renderer. Header band and button =
  `primary`; badge = a tint of `accent`; detail line, card labels, notes and footer =
  `secondaryText`; info card = `rowBackground` + `cardBorder`. Slugs whose JSON key
  differs are mapped explicitly (`RELLO_EMAIL_TOKEN_KEY_FOR_SLUG`): `home-stretch` →
  `the-homestretch`, `home-scout` → `the-home-scout`; a slug with no block
  (`prequal-pro`, `the-oven`, the engines) gets `defaults`; the `conversations` block is
  not a platform slug and is unused. Admin mail uses Rello's colors (no more
  `#111827`). Readability is enforced in the renderer: white header text ≥ 3:1 (a
  primary under that is darkened — none is today), links, badge, secondary text and
  signer initials ≥ 4.5:1 (links are darkened for the-drumbeat, open-house-hub,
  newsletter-studio, market-intel and harvest-home). `resolveRelloEmailPalette()` and
  `relloEmailContrast()` are exported.
- **Removed before release (no consumer uses `/email` yet):** the `brandColor` input
  (the tenant color no longer drives the header or button), `resolveRelloEmailColor()`,
  `RELLO_EMAIL_DEFAULT_BRAND_COLOR` and `RELLO_EMAIL_ADMIN_COLOR`. `badge.tone` is still
  accepted but no longer picks a color (deprecated); the label carries the meaning.
- App names come from a `Record<PlatformSlug, string>`, so a new slug in
  `@rello-platform/slugs` fails the typecheck until it is named. Logos are PNGs at
  `https://hellorello.app/email/logos/<slug>.png` (served by Rello); apps without one
  get the app name as text.
- It renders only: no sending, no consent logic, no compliance footer rules.

Also: `@rello-platform/slugs` v0.7.0 → v0.8.0 (adds `prequal-pro`).

## v2.28.0 — 2026-06-24

**Fix: `UnderlineTabBar` — overflowing tab rows were silently clipped at desktop widths (no scroll affordance)**

The two scroll-edge fade gradients were classed `sm:hidden` — they only rendered
below the `sm` breakpoint (<640px). The scroll container is `overflow-x-auto
no-scrollbar`, so at desktop widths (≥640px) an overflowing tab row had ZERO visual
affordance: no fade, no scrollbar, no arrow. Tabs hidden off the right edge (e.g.
Closings' "Trust / Escrow" sub-tab clipped at ~1073px) were reachable by scroll/keyboard
but undiscoverable.

Fix (presentation-only, additive — no public API change): the component now detects
its own scroll state via a `ref` on the scroll container + a `scroll` listener and a
`ResizeObserver` (cleaned up on unmount), computing `canScrollLeft` / `canScrollRight`.
Edge fade gradients now render at ALL breakpoints, gated on the scroll-state booleans
instead of `sm:hidden`. Clickable scroll-chevron buttons (left/right, `aria-label`
"Scroll tabs left/right", 44px min touch target, focus-visible outline) appear on
whichever side has hidden tabs and scroll by ~one tab-width per click. The existing
ArrowLeft/Right/Home/End roving-tabindex keyboard nav is unchanged. `UnderlineTab` /
`UnderlineTabBarProps` are byte-for-byte identical — minor (additive behavior), not major.

Added `UnderlineTabBar.test.tsx` (6 tests asserting the affordance appears on overflow,
hides when the row fits, appears on both edges mid-scroll, scrolls on chevron click,
updates on scroll, and keyboard nav still cycles) + an `Overflow` Storybook story.

## v2.20.1 — 2026-06-22

**Fix: "Five Before 9" (`before-9`) dashboard illustration rendered washed-out / broken on light cards**

The `before-9` entry in `DASHBOARD_ILLUSTRATIONS` was the only illustration flagged
`dark: true`. The dark branch in `CardIllustration` renders the icon white (`#fff`)
inside a near-invisible white-tinted container (`rgba(255,255,255,0.06)`) — correct
only on a dark card surface. Every Rello dashboard hero-card surface is LIGHT
(`var(--hero-card-background, var(--card-background))`), so on `/mlo` the Dawn
illustration showed as a faded/ghosted ("broken") graphic while its siblings
(`conversations`, `market-intel`, `neighborhood-intel` — all light) rendered crisp
accent-colored icons in accent-tinted tiles.

Fix: drop the `dark: true` flag from `before-9` so it renders the accent (`#D4943A`)
Dawn icon in an accent-tinted container, consistent with every other dashboard card.
The `DawnIcon` SVG and `RadialBurst` pattern were already valid vectors — the defect
was purely in the dark-mode rendering branch being applied on a light surface.
(Finding 13B / smoke BUG-09.) No API/export surface change; patch-level.

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
