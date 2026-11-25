import { defineConfig } from "tsup";

/**
 * Two-entry build:
 *
 *   dist/index.js   — server-safe root entry. No "use client" banner.
 *                     Pure utilities, types, constants only.
 *
 *   dist/email.js   — `@rello-platform/ui/email`: the transactional email
 *                     shell. Pure, no banner (see the third entry below).
 *                     Also dist/email.cjs, for CommonJS apps (PreQual Pro).
 *
 *   dist/client.js  — client-only entry. "use client" banner at top
 *                     marks all exports as RSC client boundaries.
 *                     React components and SVG icon renderers live here.
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726 for
 * the reason this split exists. Before v2.0.0 everything was a single
 * bundle with a global "use client" banner, which caused server-context
 * imports of pure utilities to resolve to client-reference proxies and
 * crash at call time in production.
 */
/**
 * Inlined into dist/ rather than imported at runtime (v2.45.0, RALLYROO).
 * Visible copy reads PLATFORM_BRAND from @rello-platform/slugs. Consumers pin
 * slugs anywhere from v0.7.0 to v0.14.0 (PLATFORM_BRAND arrived in v0.14.0),
 * and PreQual Pro, which loads dist/email.cjs, has no slugs dependency at all.
 * Bundling means every consumer gets the brand this package was built with,
 * whatever slugs version it resolves; the source of truth is still slugs, so a
 * rename is a slugs release plus a rello-ui rebuild. Type-only imports from
 * slugs (PlatformSlug, AppSlug) are erased and unaffected.
 */
const BUNDLED = ["@rello-platform/slugs"];

export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: ["esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom", "next", "next/link"],
    noExternal: BUNDLED,
  },
  {
    entry: { client: "src/client.ts" },
    format: ["esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ["react", "react-dom", "next", "next/link"],
    noExternal: BUNDLED,
    banner: { js: '"use client";' },
  },
  {
    // dist/email.js — `@rello-platform/ui/email`, the shared transactional
    // email shell. Pure TypeScript like the root entry (no banner, no React);
    // its own entry so a server/Trigger task can render email without loading
    // the component library's root barrel. CommonJS as well, because PreQual
    // Pro is CommonJS Express and its builders are synchronous.
    entry: { email: "src/email/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ["react", "react-dom", "next", "next/link"],
    noExternal: BUNDLED,
  },
]);
