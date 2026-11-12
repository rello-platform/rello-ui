import { APP_SLUGS, ENGINE_SLUGS, type PlatformSlug } from "@rello-platform/slugs";
import type { RelloEmailBrand, RelloEmailInput } from "../email";
import { BASELINE_AUDIENCES, baselineInput } from "./email-logo-baseline";

/**
 * The inputs behind src/email/fixtures/v2.40.0-before-spotlight.json: sha256 of the html and the text
 * of each case rendered by render-email.ts at v2.40.0 (706e854), before v2.41.0 added `spotlight`.
 * Every slug, every audience, with and without a brand, company, kicker, card and footer line. v2.41.0
 * must render each byte for byte as v2.40.0 did when `spotlight` is absent, null, or has nothing to show.
 */

export const V240_SLUGS: readonly PlatformSlug[] = [...APP_SLUGS, ...ENGINE_SLUGS];

const BRAND: RelloEmailBrand = { name: "Summit Peak", logoUrl: "https://cdn.example-mortgage.com/brand/logo.png", primary: "#1d4ed8" };

export interface V240Case {
  id: string;
  input: RelloEmailInput;
}

export function v240Cases(): V240Case[] {
  const out: V240Case[] = [];
  for (const slug of V240_SLUGS) {
    for (const audience of BASELINE_AUDIENCES) {
      const base = baselineInput(slug, audience);
      const variants: Record<string, RelloEmailInput> = {
        base,
        "no-company": { ...base, companyName: null },
        brand: { ...base, brand: BRAND },
        "brand-no-logo": { ...base, brand: { name: "Summit Peak", primary: "#b91c1c" } },
        "brand-no-company": { ...base, companyName: null, brand: BRAND },
        "brand-nameless": { ...base, companyName: null, brand: { name: "" } },
        "kicker-given": { ...base, kicker: "Custom kicker" },
        "powered-by-false": { ...base, footer: { ...base.footer, poweredBy: false } },
        "no-card": { ...base, card: null },
        "no-paragraphs-no-card": { ...base, paragraphs: [], card: null },
        minimal: { audience, app: slug, subject: "Hello", headline: "Hello there." },
      };
      for (const [name, input] of Object.entries(variants)) out.push({ id: `${slug}|${audience}|${name}`, input });
    }
  }
  return out;
}
