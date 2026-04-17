import { defineConfig } from "tsup";

/**
 * Two-entry build:
 *
 *   dist/index.js   — server-safe root entry. No "use client" banner.
 *                     Pure utilities, types, constants only.
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
    external: ["react", "react-dom"],
  },
  {
    entry: { client: "src/client.ts" },
    format: ["esm"],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: false,
    external: ["react", "react-dom"],
    banner: { js: '"use client";' },
  },
]);
