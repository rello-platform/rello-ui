# Changelog

All notable changes to `@rello-platform/ui` are documented here.

This project adheres to [SemVer](https://semver.org/) and the change-class
guidance in `CLAUDE.md` § Publishing convention.

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
