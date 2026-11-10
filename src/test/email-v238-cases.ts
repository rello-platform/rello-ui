import { APP_SLUGS, ENGINE_SLUGS, type PlatformSlug } from "@rello-platform/slugs";
import { RELLO_EMAIL_APP_NAMES, type RelloEmailBrand, type RelloEmailInput } from "../email";
import { baselineInput } from "./email-logo-baseline";

/**
 * The inputs behind src/email/fixtures/v2.38.0-before-consumer-kicker.json, the
 * golden hashes captured by rendering each one with render-email.ts at v2.38.0
 * (19f04a9), before v2.39.0 changed the consumer kicker and added the consumer
 * "Powered by Rello" footer line.
 *
 * Pro and admin cases: v2.39.0 must render each byte-for-byte as v2.38.0 did,
 * `footer.poweredBy` set or not (v2.38.0 had no such field and ignored it).
 *
 * Consumer "pinned" cases: the v2.38.0 default kicker passed explicitly and the
 * new line turned off. v2.39.0 must render those byte-for-byte as v2.38.0
 * rendered the same input, which proves the kicker and the one footer line are
 * the only consumer changes.
 */

export const V238_SLUGS: readonly PlatformSlug[] = [...APP_SLUGS, ...ENGINE_SLUGS];

const BRAND: RelloEmailBrand = { name: "Summit Peak", logoUrl: "https://cdn.example-mortgage.com/brand/logo.png", primary: "#1d4ed8" };
const COMPANY = "ClearPath Utah Mortgage";

/** The consumer kicker v2.38.0 wrote by default for baselineInput (company set). */
export function v238ConsumerKicker(app: PlatformSlug, branded: boolean): string {
  return `${branded ? "Rello" : RELLO_EMAIL_APP_NAMES[app]} · from ${COMPANY}`;
}

export interface V238Case {
  id: string;
  input: RelloEmailInput;
}

export function v238Cases(): V238Case[] {
  const out: V238Case[] = [];
  for (const slug of V238_SLUGS) {
    for (const audience of ["pro", "admin"] as const) {
      const base = baselineInput(slug, audience);
      const variants: Record<string, RelloEmailInput> = {
        base,
        "no-company": { ...base, companyName: null },
        brand: { ...base, brand: BRAND },
        "brand-no-company": { ...base, companyName: null, brand: BRAND },
        "brand-nameless": { ...base, companyName: null, brand: { name: "" } },
        "kicker-given": { ...base, kicker: "Custom kicker" },
        "powered-by-true": { ...base, footer: { ...base.footer, poweredBy: true } },
        "powered-by-false": { ...base, footer: { ...base.footer, poweredBy: false } },
        minimal: { audience, app: slug, subject: "Hello", headline: "Hello there." },
      };
      for (const [name, input] of Object.entries(variants)) out.push({ id: `${slug}|${audience}|${name}`, input });
    }
    const consumer = baselineInput(slug, "consumer");
    const off = { ...consumer.footer, poweredBy: false };
    out.push({
      id: `${slug}|consumer|pinned`,
      input: { ...consumer, kicker: v238ConsumerKicker(slug, false), footer: off },
    });
    out.push({
      id: `${slug}|consumer|pinned-brand`,
      input: { ...consumer, brand: BRAND, kicker: v238ConsumerKicker(slug, true), footer: off },
    });
  }
  return out;
}
