/**
 * @rello-platform/ui/client
 *
 * Client-only entry. Every React component and SVG icon renderer in the
 * library lives here. Importing from this subpath marks the binding as a
 * React Server Components client boundary (tsup emits `"use client"` at
 * the top of this entry's dist bundle).
 *
 * Consumers:
 *   import { Button, Dialog } from "@rello-platform/ui/client";
 *
 * Server-safe utilities, types, constants, and pure helpers live in the
 * root entry `@rello-platform/ui` — NOT here. See src/index.ts.
 *
 * Why this split exists:
 *   Before v2.0.0 every export was bundled into a single dist/index.js
 *   with a global `"use client"` banner. Server components that imported
 *   pure utilities (catalog functions, cn, stage constants) got
 *   client-reference proxies and crashed at call time in production with
 *   `TypeError: t is not a function`. See audit doc
 *   DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726 for the
 *   full write-up.
 */

export * from "./components";
export * from "./icons";
export { cn } from "./lib/cn";
