# Rello UI (`@rello-platform/ui`)

Shared UI component library + design tokens. **Every spoke in the platform imports from here** — Button, Card, Input, Select, SurveyStepCard, Badge, Modal primitives, design tokens. Consumed via design-token CSS variables (`var(--brand-primary, ...)`) so per-app branding overrides cascade cleanly.

Cross-app role per `~/Library/Mobile Documents/com~apple~CloudDocs/ClearPath Utah Mortgage/Applications/~Application Docs/App Development Docs for Rello Platform/APP-OWNERSHIP-MATRIX.md` Appendix § Shared platform packages → `@rello-platform/ui`.

## Universal context

Universal-floor rules + trigger-routed pointers auto-load via `~/.claude/CLAUDE.md` (the slim router). This file carries only `@rello-platform/ui`-specific guidance. When in doubt about a cross-app boundary, read the App Ownership Matrix.

This is a **library, not an app.** No business logic lives here. Breaking changes have wide blast radius — every spoke imports from `@rello-platform/ui` (HomeReady, Home Stretch, Home Scout, OHH, MarketIntel, Drumbeat, Oven, PFP, Newsletter Studio, Rello CRM). Treat every export as a stability contract.

## Stack & commands

- **Framework / runtime:** React 19 + TypeScript 5 (peer deps: React 18 or 19, Tailwind 4); Node `>=22 <23`
- **Bundler:** tsup (ESM only, dual entry — see § Two-entry split)
- **Package manager:** npm
- **Dev:** `npm run dev` (tsup `--watch`)
- **Build:** `npm run build` (tsup ESM bundle → `dist/`)
- **Test:** `npm test` (Vitest run) / `npm run test:watch`
- **Typecheck:** `npm run typecheck` (`tsc --noEmit`)
- **Storybook:** `npm run storybook` (port 6006) / `npm run build-storybook`
- **Lint:** none configured at this time
- **Publish target:** `npm.pkg.github.com` (GitHub Packages registry, `@rello-platform/ui`).
- **Configurator (sibling app, not the library):** `cd configurator && npm run dev` — Vite app at `~/Rello-UI/configurator/` for editing `tokens/app-overrides.json` and `specs/app-layouts.json` via UI. See § app-layouts.json + Configurator workflow.

## Two-entry split (LEAD ARCHITECTURAL CALLOUT)

`tsup.config.ts` emits **two** dist entries from `src/index.ts` and `src/client.ts`:

| Entry | Source | Banner | What it carries | Consumers |
|---|---|---|---|---|
| `@rello-platform/ui` (root) | `src/index.ts` | NONE | Pure functions, types, CVA class-builders, data constants. NO React components. | RSC server components, Next API route handlers, Node scripts, build-time code |
| `@rello-platform/ui/client` | `src/client.ts` | `"use client";` (tsup-injected) | Re-exports `./components` + `./icons`. Every React component + SVG icon renderer. | Client components, browser-only code |

**Why this split exists** — locked architectural invariant per `DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726`. Before v2.0.0 every export was bundled into a single `dist/index.js` with a global `"use client"` banner. Server components that imported pure utilities (catalog functions, `cn`, stage constants) got React-Server-Components client-reference proxies and crashed at call time in production with `TypeError: t is not a function`. The split is the structural fix; it is **non-negotiable**.

**Authoring rule when adding new exports:**

- New pure function / type / data constant / CVA variants → export from `src/index.ts` (root entry). Server-safe by construction.
- New React component / SVG renderer → live under `src/components/<name>/` (or `src/icons/`), export via `src/components/index.ts`, **and** the new export auto-flows through `src/client.ts` (which re-exports `./components`). Do NOT add components to `src/index.ts`.
- A pure function that's only ever consumed alongside a component MAY still belong in `src/index.ts` — server-safety is the test, not "is it adjacent to a component."

**Tests of either entry's bundle should exercise the absence/presence of the `"use client"` banner** — that's the load-bearing invariant.

## Per-app theming convention

CSS variables declared at `:root` in `src/styles/design-tokens.css` (74 tokens, brand + neutral + status + spacing + shadow + transition + z-index). Per-app overrides live in `tokens/app-overrides.json` (consumed by the spoke's app-root provider, which generates the per-tenant `:root` overrides at SSR time). Defaults + per-app diffs apply to:

- **Brand:** `--brand-primary`, `--brand-accent`, `--brand-primary-light`, `--brand-accent-light`
- **Page:** `--background` (defaults to `var(--neutral-50)`), `--foreground` (defaults to `var(--neutral-900)`)
- **Card:** `--card-background`, `--card-border`
- **Text scale:** `--primary-text`, `--secondary-text`, `--tertiary-text`, `--muted`, `--muted-foreground`
- **Row:** `--row-background`, `--row-border`
- **Hero card:** `--hero-card-background`, `--hero-card-border`, `--hero-card-title`, `--hero-card-body-text`
- **App-shell text:** `--app-title-color`, `--app-subtitle-color`

**Fallback discipline (NON-NEGOTIABLE per universal CLAUDE.md):** every CSS variable reference MUST include a fallback value. `var(--foreground, #111827)` is correct; `var(--foreground)` is forbidden — a missing token must never collapse to `unset` and produce invisible / unreadable UI.

**Pipeline + status tokens are universal (NOT per-tenant overridable):** `--hot`, `--qualified`, `--engaged`, `--warming`, `--cold`, `--success`, `--warning`, `--error`, `--info`. Spokes inherit; tenants do not override pipeline semantics.

Override entry-point: each app's root layout reads `tokens/app-overrides.json`'s `apps[<app-slug>]` block and emits a `:root` style tag whose declarations win over `design-tokens.css` defaults. Adding a new app override = add a block under `apps` keyed by the canonical slug from `@rello-platform/slugs` and re-build the consuming spoke.

## Components inventory

`src/components/` holds 46 component directories (as of v2.1.0). One component per directory; each follows the convention codified in `CONTRIBUTING.md`:

```
src/components/<kebab-case-name>/
  ComponentName.tsx          # Main component ("use client" implicit via client.ts banner)
  ComponentName.stories.tsx  # Storybook story
  ComponentName.test.tsx     # Vitest tests
  variants.ts                # CVA variants if 3+ variant dimensions
  index.ts                   # Barrel export — { Component, componentVariants, type ComponentProps }
```

`src/icons/` holds SVG icon renderers (`app-icons.tsx`, `dashboard-icons.tsx`, `track-icons.tsx`).

**How to find a component:** `ls src/components/` (kebab-case directory name) or `grep -r "export.*Component<X>" src/`.

**How to add a component:**
1. Create `src/components/<kebab-case>/Component.tsx` per the CONTRIBUTING.md skeleton (`React.forwardRef`, `displayName`, CVA, `cn()` className-last).
2. Add `Component.stories.tsx` demonstrating all variants + states (Storybook is the test-bed; spoke teams preview without installing).
3. Add `Component.test.tsx` (Vitest + @testing-library/react).
4. Add `index.ts` barrel — `export { Component, componentVariants, type ComponentProps } from "./Component";`
5. Register in `src/components/index.ts` to flow through `src/client.ts`.
6. **If the component carries pure helpers** (slug builders, role mappers, data constants) → export those helpers from `src/index.ts` (root, server-safe), NOT from `src/client.ts`. See § Two-entry split.

**Renaming or removing a component:** falls under Rule J (pre-delete verification) + Rule K (rewrite-not-delete). See § Class-Level Rules applicability.

## app-layouts.json + Configurator workflow

`specs/app-layouts.json` is the per-app dashboard-shell layout registry — sidebar nav structure, hero area, card arrangement per app slug. Spokes read this at build/render time to compose their app-shell. `tokens/app-overrides.json` is the matching per-app brand-color override registry.

**Both files are Configurator-edited, not hand-edited.** The Configurator is a sibling Vite app at `~/Rello-UI/configurator/` (`@rello/configurator`, `private: true`, not published) that provides a UI for editing both files with live preview against the actual library components.

**Run:** `cd configurator && npm run dev` (concurrent Vite + tsx server). Edit via UI; save persists to disk.

**Direct edits drift.** Per `DISCOVERED-DRUM-RELLO-UI-APP-LAYOUTS-DRUMBEAT-BLOCK-DRIFT-2026-05-08`, the Drumbeat block in `specs/app-layouts.json` (lines 39–65) drifted from current Drumbeat reality because someone hand-edited; the Configurator preview would have caught the mismatch. **If you find yourself opening `app-layouts.json` or `app-overrides.json` in an editor: stop, run the Configurator instead.**

**Reconciliation when a consumer-app spec evolves:** consumer-app changes its layout (new sidebar item, hero re-arrangement) → run Configurator → save → bump Rello-UI minor (per § Publishing) → spokes update pin SHA in coordinated sweep (per § Version-pin canonical form).

## Publishing convention

1. **Version bump (SemVer):** edit `package.json` `version` per the change class:
   - **Major** — breaking export removed/renamed, prop signature changed, two-entry split semantics changed.
   - **Minor** — new component added, new export added, additive prop on existing component.
   - **Patch** — bug fix, internal refactor with no surface change, doc-only change.
2. **Build:** `npm run build` regenerates `dist/` cleanly. Verify no warnings beyond known noise.
3. **Commit:** message `chore(release): v<version> — <one-line summary>`.
4. **Tag:** `git tag v<version>` (annotated tag for GitHub Releases UX + human reference).
5. **Push:** `git push origin main && git push origin v<version>`. CI `publish.yml` workflow handles the GitHub Packages publish.
6. **Coordinated consumer sweep** — see § Version-pin canonical form. Tag is for humans; spokes pin by commit-SHA, not tag.

**Releases that touch multiple components or change two-entry semantics** require a checklist in the PR body listing every component touched + a per-spoke smoke-test plan (which spoke proves the change loads cleanly).

## Version-pin canonical form for consumers

**LOCKED FORM (corrected 2026-05-09 per platform precedent):**

```jsonc
"@rello-platform/ui": "github:rello-platform/rello-ui#v<X.Y.Z>"
```

**Tag form `#v<X.Y.Z>` is canonical.** Platform precedent across `@rello-platform/*` deps in
every spoke shows tag form is the dominant convention (5 of 7 deps in `~/The-Drumbeat/package.json`
as of 2026-05-09: `api-client#v2.11.0`, `permissions#v0.18.0`, `sentry-init#v0.1.0`,
`slugs#v0.4.0`, `eslint-config#v0.7.0`). Per `feedback-verify-platform-precedent-before-workstream-override`,
platform-wide convention binds when a workstream doc contradicts. The `dep-pin-check.sh` script
accepts both `#v<X.Y.Z>` (semver tag) and `#<40-char-hex-sha>` (full commit SHA) — tag form is
preferred for tagged releases; full-SHA form remains acceptable for pre-release / mid-flight pins
that have not yet been tagged.

Per `feedback-npm-github-tag-stale-resolve`: when bumping a tag-form dep, use the explicit-ref
form `npm install <pkg>@github:org/repo#v<X.Y.Z>` to force re-resolve (bare `npm install` may
report "up to date" against a stale lockfile-cached SHA). This is the operational discipline,
NOT a reason to switch the pin form to raw SHA.

**Pre-2026-05-09 history:** an earlier version of this section locked SHA-form as the only
canonical form. That guidance was inconsistent with platform precedent (5-of-7 sibling deps
already used tag form). Corrected as part of v2.3.0 ship — DRUMBEAT Wave 0 normalized
Drumbeat's `@rello-platform/ui` pin from raw SHA to `#v2.3.0` tag form.

**Spoke update sweep when Rello-UI ships a new version:**

1. Confirm the new tag (e.g. `v2.3.0`) is published — `git ls-remote origin "refs/tags/v<X.Y.Z>"`
   returns a SHA, and the GitHub Packages publish workflow is green (`gh run list --workflow=publish.yml`).
2. For each spoke (`~/The-Drumbeat`, `~/Harvest-Home`, `~/Newsletter-Studio`, `~/Rello`,
   `~/Open-House-Hub`, plus any spoke not yet listed): edit `package.json` `@rello-platform/ui`
   value to `github:rello-platform/rello-ui#v<X.Y.Z>`, run `npm install <pkg>@github:rello-platform/rello-ui#v<X.Y.Z>`
   (explicit-ref form to force re-resolve), run `npm run build` / `npx next build` /
   the spoke's typecheck-equivalent, commit `chore(deps): bump @rello-platform/ui to v<X.Y.Z>`,
   push to that spoke's main.
3. **Coordinated wave** — sweep all spokes in the same Build-KA fan-out wave; do not ship
   Rello-UI v2.X to one spoke and v2.Y to another for any duration.

**Drift detection:** run `for repo in ~/The-Drumbeat ~/Harvest-Home ~/Newsletter-Studio ~/Rello ~/Open-House-Hub; do grep '"@rello-platform/ui"' $repo/package.json; done` — every line must show the same `#v<X.Y.Z>` (or matching SHA for in-flight bumps). Mixed forms or different versions = wave incomplete.

## Build verification axes

Rello-UI is a **library, not a Railway-deployed service**. The platform's universal three-axis build verification (`tsc + next build + Railway deploy-watch` per `feedback-build-verification-third-axis-railway-deploy-watch`) substitutes the third axis with **consumer-install verification**:

1. **`npx tsc --noEmit`** — zero new errors. Strict TypeScript; every component exports a typed prop interface that consumers import.
2. **`npm run build`** — `dist/` regenerates cleanly. Both entries (`dist/index.js`, `dist/client.js`) emit; only `dist/client.js` carries the `"use client"` banner. No regression vs prior `dist/`.
3. **Consumer-install verification (Rello-UI's third axis):** in a temp worktree of any sibling spoke (e.g. `~/The-Drumbeat-rui-test/`), update the spoke's `package.json` to pin `github:rello-platform/rello-ui#<NEW-SHA>` (the SHA your push will produce — known after `git push` SHA-match). Run `npm install`. Confirm clean resolve, no peer-dep warnings beyond known noise. If the spoke's `next build` is also reasonable to run (Drumbeat is a good candidate — uses many Rello-UI components), run it. Any consumer-install regression → halt.

`tsc` and `build` are local; consumer-install is the structural substitute for "did this actually deploy."

## Pre-commit / hook discipline

- **Husky pre-commit:** `bash scripts/check-floating-refs.sh` (Phase 0 durability gate per `PERMISSIONS-CANONICALIZATION.md` Locks #1 + #4).
- **NEVER skip hooks** unless Kelly has explicitly authorized in-session. Per universal CLAUDE.md: `--no-verify`, `--no-gpg-sign`, etc. are forbidden by default. If the hook fails, fix the underlying issue and create a NEW commit (never `--amend` after a hook failure — the commit didn't happen, so amend would modify the previous commit).
- **No `console.log` in source** per `feedback_cli_stdout_not_console_log` (CLI scripts use `process.stdout.write`; library source uses `console.error` / `console.warn` for genuine error paths only). Pre-commit blocks on `console.log`.
- **CI workflows:** `.github/workflows/ci.yml` (typecheck + build + test), `.github/workflows/dep-pin-check.yml` (dependency pin discipline), `.github/workflows/publish.yml` (GitHub Packages publish on tag push).

## Class-Level Rules applicability

Platform Class-Level Rules (A–L) auto-bind via universal CLAUDE.md. Rules most load-bearing for Rello-UI work:

- **Rule E (Pages import API response types, don't redeclare):** the Rello-UI flavor is *consumers import the typed prop interface from the component's `index.ts`, never redeclare locally*. Renaming a prop becomes a compile error in every spoke, not a silent NaN. Every `forwardRef` export ships its props interface alongside the component (per CONTRIBUTING.md rule #8).
- **Rule J (Pre-delete verification):** before retiring or renaming any export, grep across the consumer set:
  ```bash
  for repo in ~/The-Drumbeat ~/Harvest-Home ~/Newsletter-Studio ~/Rello ~/Open-House-Hub ~/HomeReady ~/TheHomeStretch ~/The-Home-Scout ~/MarketIntel ~/PathfinderPro ~/The-Oven; do
    echo "=== $repo ==="
    grep -rn 'from "@rello-platform/ui' $repo/src 2>/dev/null | grep '<ExportName>'
  done
  ```
  Cite `feedback-pre-delete-verification-checks-all-dependency-classes` — verify all 6 dependency classes (re-exports, cross-repo callers, type aliases, runtime string refs, Storybook story refs, Configurator references). Halt-and-ask if any caller surfaces.
- **Rule K (Rewrite-not-delete for renames):** when renaming `<OldName>` → `<NewName>`, default to **adding the new export AND keeping a back-compat alias**:
  ```ts
  export { NewName } from "./NewName";
  /** @deprecated use NewName — alias retired in v<X+1>.0.0 */
  export { NewName as OldName } from "./NewName";
  ```
  OR coordinate a same-wave bump across all consumers (every spoke updates the import name in the same Build-KA fan-out wave, then a follow-up Rello-UI release removes the alias). Bare-delete forbidden.

## What this repo does NOT do

- **No API calls.** Components accept their data via props; the spoke fetches.
- **No Prisma.** No database models, no queries, no migrations.
- **No business logic.** "Is this user a platform admin?" / "is this lead hot?" / "should we show this CTA?" are spoke decisions. Components render what they're told.
- **No env-var consumption.** Configuration enters via props, not `process.env.*`. The spoke owns env reads.
- **No Tailwind config.** Consumers own their `tailwind.config.*`; Rello-UI uses CSS variables (`design-tokens.css`) referenced from Tailwind utility classes (`bg-[var(--brand-primary)]`). Adding a Tailwind plugin or theme override here = scope violation.
- **No database access, no server-runtime requirements.** The root entry (`src/index.ts`) is pure utilities; the client entry (`src/client.ts`) is browser components. Neither requires a Node runtime feature beyond what tsup/ESM provides.
- **No fetch / no service-to-service calls.** If a component needs server data, the spoke fetches in a parent component and passes via props.

## Trigger-routed pointers

- Adding a new component → CONTRIBUTING.md "Component Conventions" section + § Components inventory above.
- Adding a Storybook story → CONTRIBUTING.md "Storybook" section. (No `STORYBOOK.md` at repo root; Storybook config lives at `.storybook/` and per-component `*.stories.tsx`.)
- Bumping a minor version → § Publishing convention + § Version-pin canonical form (coordinated SHA bump across all spokes).
- Consumer reports drift in app shell layout → § app-layouts.json + Configurator workflow.
- Consumer reports drift in brand colors → `tokens/app-overrides.json` via Configurator (NOT direct edit).
- Retiring or renaming a component → § Class-Level Rules J + K.
- Adding new pure utility / type / constant → `src/index.ts` (root entry), NOT `src/client.ts`. See § Two-entry split.
- Editing `package.json` `peerDependencies` → § Stack & commands; verify Tailwind 4 + React 18/19 compat across spokes before bump.

## Memory inheritance

Auto-loaded per universal CLAUDE.md. Most load-bearing for Rello-UI work:

- `feedback-npm-github-tag-stale-resolve` — explicit-ref form (`<pkg>@github:org/repo#v<X.Y.Z>`) for GitHub-tag deps to force lockfile re-resolve when bumping versions; this repo's spokes pin via tag form per § Version-pin canonical form.
- `feedback-two-machine-home-paths` — `~/` not hardcoded `/Users/<name>/` in any path reference (CLAUDE.md, scripts, docs).
- `feedback-discovered-gh-repo-existence-check-must-verify-canonical-org-first` — **Rello-UI carve-out:** this repo is at `rello-platform/rello-ui`, NOT `kellydavidsansom/Rello-UI`. Verified 2026-05-08 via `git remote -v`, `gh repo view`, and `package.json` `repository.url`. The general "canonical-org is `kellydavidsansom`" rule does NOT apply to shared platform packages published to `npm.pkg.github.com` under the `@rello-platform/*` scope — those live under `rello-platform`. Cross-reference `feedback-rello-platform-package-publishes-to-github-packages`.
- `feedback-pre-delete-verification-checks-all-dependency-classes` — Rule J applicability; grep all 11 spoke dirs before any export delete.
- `feedback-rello-platform-package-publishes-to-github-packages` — `publishConfig.registry: https://npm.pkg.github.com`; this repo is canonical precedent.
- `feedback_cli_stdout_not_console_log` — pre-commit blocks `console.log` in source.
- `feedback_no_regressions` — additive changes preferred; read full context before refactor.

## Repo identity

Both `~/rello-ui` and `~/Rello-UI` resolve to the same APFS inode (case-insensitive filesystem). The canonical reference everywhere — APP-OWNERSHIP-MATRIX, slugs package, npm consumers, GitHub repo URL — is `rello-ui` (lowercase, hyphenated). Local checkout directory may show with either case depending on how it was cloned.

GitHub canonical: `https://github.com/rello-platform/rello-ui` (NOT `kellydavidsansom/Rello-UI`). Verify via `git remote -v` if uncertain.

## Cross-app pointers

- App Ownership Matrix (canonical): `~/Library/Mobile Documents/com~apple~CloudDocs/ClearPath Utah Mortgage/Applications/~Application Docs/App Development Docs for Rello Platform/APP-OWNERSHIP-MATRIX.md`
- Universal slim CLAUDE.md: `~/.claude/CLAUDE.md`
- Standards directory: `~/.claude/standards/`
- Platform Class-Level Rules: `~/Library/Mobile Documents/com~apple~CloudDocs/ClearPath Utah Mortgage/Applications/~Application Docs/PLATFORM-CLASS-LEVEL-RULES.md`
- Knowledge-agent role docs: see slim CLAUDE.md "Trigger-routed pointers" section.
- DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726 — two-entry split origin (read before changing tsup.config.ts).
- DISCOVERED-DRUM-RELLO-UI-APP-LAYOUTS-DRUMBEAT-BLOCK-DRIFT-2026-05-08 — Configurator workflow origin (read before hand-editing `specs/app-layouts.json`).
