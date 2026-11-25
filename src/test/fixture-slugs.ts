import { APP_SLUGS, ENGINE_SLUGS, type PlatformSlug } from "@rello-platform/slugs";

/**
 * Slugs that @rello-platform/slugs gained after the frozen email fixtures were
 * written. `tracking-engine` arrived in slugs v0.13.0; rello-ui moved to
 * v0.14.0 in v2.45.0. No fixture holds a hash for these, so the byte-for-byte
 * suites leave them out, and "the fixture covers every slug" still checks the
 * rest exactly. Their renders are covered by the live suites in
 * render-email.test.ts, which iterate every slug.
 */
export const SLUGS_ADDED_AFTER_FIXTURES: readonly PlatformSlug[] = ["tracking-engine"];

/** Every slug the frozen fixtures were rendered for. */
export const FIXTURE_SLUGS: readonly PlatformSlug[] = [...APP_SLUGS, ...ENGINE_SLUGS].filter(
  (s) => !SLUGS_ADDED_AFTER_FIXTURES.includes(s),
);
