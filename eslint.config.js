// ESLint flat config — deliberately ONE rule (RALLYROO Phase 3, 2026-11-25).
//
// rello-ui has no general lint setup (CLAUDE.md § Stack: "Lint: none configured").
// This config exists only to run `no-legacy-brand-in-visible-text`, which keeps
// the old product name — and any hand-typed copy of the new one — out of text a
// person can see. Visible copy reads `PLATFORM_BRAND.name` from
// `@rello-platform/slugs`, so a future rename is one slugs release.
//
// It runs as part of `npm test`, which the pre-push hook and publish.yml already
// run, so no new hook step exists (HOW-KNOWLEDGE-AGENTS-WORK.md §31).
//
// Adding other rules here is a separate decision: do not grow this file as a
// side effect of a copy change.
import tsParser from "@typescript-eslint/parser";
import platformRules from "@rello-platform/eslint-plugin-platform-rules";

export default [
  {
    files: ["src/**/*.{ts,tsx,js,jsx,mjs,cjs}"],
    ignores: ["**/*.d.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module", ecmaFeatures: { jsx: true } },
    },
    linterOptions: {
      // Source carries eslint-disable comments for rules this one-rule config
      // does not load (written for consumers' configs). They are not ours to judge here.
      reportUnusedDisableDirectives: "off",
      noInlineConfig: true,
    },
    plugins: { "@rello-platform/platform-rules": platformRules },
    rules: {
      "@rello-platform/platform-rules/no-legacy-brand-in-visible-text": ["error", { allow: [] }],
    },
  },
];
