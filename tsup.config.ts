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
export default defineConfig([
  {
    entry: { index: "src/index.ts" },
    format: ["esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    external: ["react", "react-dom", "next", "next/link"],
  },
  {
    entry: { client: "src/client.ts" },
    format: ["esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ["react", "react-dom", "next", "next/link"],
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
  },
]);
