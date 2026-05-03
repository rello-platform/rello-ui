# Rello UI (`@rello-platform/ui`)

Shared UI component library + design tokens. **Every spoke in the platform imports from here** — Button, Card, Input, Select, SurveyStepCard, Badge, Modal primitives, design tokens. Consumed via design-token CSS variables (`var(--brand-primary, ...)`) so per-app branding overrides cascade cleanly.

Cross-app role per `~/Library/Mobile Documents/com~apple~CloudDocs/ClearPath Utah Mortgage/Applications/~Application Docs/App Development Docs for Rello Platform/APP-OWNERSHIP-MATRIX.md` Appendix § Shared platform packages → `@rello-platform/ui`.

## Universal context

Universal-floor rules + trigger-routed pointers auto-load via `~/.claude/CLAUDE.md` (the slim router). This file carries only `@rello-platform/ui`-specific guidance. When in doubt about a cross-app boundary, read the App Ownership Matrix.

This is a **library, not an app.** No business logic lives here. Breaking changes have wide blast radius — every spoke imports from `@rello-platform/ui` (HomeReady, Home Stretch, Home Scout, OHH, MarketIntel, Drumbeat, Oven, PFP, Newsletter Studio, Rello CRM). Treat every export as a stability contract.

## Stack & commands

- **Framework / runtime:** React 19 + TypeScript 5 (peer deps: React 18 or 19, Tailwind 4); Node `>=22 <23`
- **Package manager:** npm
- **Dev:** `npm run dev` (tsup `--watch`)
- **Build:** `npm run build` (tsup ESM bundle → `dist/`)
- **Test:** `npm test` (Vitest run) / `npm run test:watch`
- **Typecheck:** `npm run typecheck` (`tsc --noEmit`)
- **Storybook:** `npm run storybook` (port 6006) / `npm run build-storybook`
- **Lint:** none configured at this time
- **Publish target:** `npm.pkg.github.com` (GitHub Packages registry, `@rello-platform/ui`).

## Database & schema changes

**No Prisma; this repo does not own a database.** Library only.

## Trigger.dev jobs (if any)

None. Library only.

## Repo-specific anti-patterns

- **No business logic.** Components must accept their data via props — no fetches, no Prisma, no env-var reads. The "is this user a platform admin?" decision is the spoke's job, not the component's.
- **Mobile-first; 44px minimum touch target on every interactive element.** Per universal Accessibility invariant.
- **Every CSS variable must have a fallback.** `var(--foreground, #111827)` not `var(--foreground)`. Tokens declared in `src/styles/design-tokens.css`; per-app overrides in `tokens/app-overrides.json`.
- **Color is never the sole indicator** — pair with text or icon. Per universal Accessibility invariant.
- **Breaking changes have wide blast radius.** Every spoke imports from this package via `github:rello-platform/rello-ui#<ref>`. Renaming/removing exports = breaking every spoke. Prefer additive changes; deprecate before delete with at least one minor version of overlap.
- **Storybook is the test-bed for new components.** Add a story before shipping a new component so spoke teams can preview without installing.

## Note on canonical case

Both `~/rello-ui` and `~/Rello-UI` resolve to the same APFS inode (case-insensitive filesystem). The canonical reference everywhere — APP-OWNERSHIP-MATRIX, slugs package, npm consumers — is `rello-ui` (lowercase, hyphenated). The local checkout directory may show with either case depending on how it was cloned.

## Cross-app pointers

- App Ownership Matrix (canonical): `~/Library/Mobile Documents/com~apple~CloudDocs/ClearPath Utah Mortgage/Applications/~Application Docs/App Development Docs for Rello Platform/APP-OWNERSHIP-MATRIX.md`
- Universal slim CLAUDE.md: `~/.claude/CLAUDE.md`
- Standards directory: `~/.claude/standards/`
- Knowledge-agent role docs: see slim CLAUDE.md "Trigger-routed pointers" section.
