import { createHash } from "node:crypto";
import type { PlatformSlug } from "@rello-platform/slugs";
import type { RelloEmailAudience, RelloEmailInput } from "../email";

/**
 * Shared by src/email/logo-by-audience.test.ts and the one-off run that wrote
 * src/email/fixtures/v2.32.0-logo-baseline.json at tag v2.32.0. v2.33.0 changed
 * only which logo the header draws, so a render with its logo cut out must
 * hash the same as it did at v2.32.0.
 */

export const BASELINE_AUDIENCES: readonly RelloEmailAudience[] = ["consumer", "pro", "admin"];

/** Every field set, the kicker and footer reason left to their per-audience defaults. */
export function baselineInput(app: PlatformSlug, audience: RelloEmailAudience): RelloEmailInput {
  return {
    audience,
    app,
    companyName: "ClearPath Utah Mortgage",
    subject: "Your plan is ready, Sarah",
    preheader: "Tap to see where you stand.",
    headline: "Your plan is ready, Sarah.",
    detail: "4 minutes ago · from your page",
    badge: { label: "New", tone: "info" },
    paragraphs: ["I put together your plan.", "It takes about 2 minutes.\nNo password needed."],
    card: { title: "Your numbers", rows: [{ label: "Budget", value: "$450,000" }] },
    button: { label: "See my plan", url: "https://example.com/plan?a=1&b=2", note: "This link expires in 7 days." },
    secondaryLink: { label: "Talk to me", url: "https://example.com/talk" },
    signer: { name: "Kelly Sansom", title: "Loan Officer", nmls: "123456", phone: "801-555-0100", replyLine: "Reply any time." },
    footer: {
      companyName: "ClearPath Utah Mortgage",
      companyNmls: "999999",
      address: "10168 South 2505 East, Sandy, UT 84092",
      equalHousing: true,
      preferenceLink: { label: "Email preferences", url: "https://example.com/prefs" },
    },
  };
}

const LOGO_IMG =
  /<img src="https:\/\/hellorello\.app\/email\/logos\/[a-z-]+\.png" width="96" height="96" alt="[^"]*" style="display:block;margin:0 auto 12px;width:96px;height:96px;border:0;outline:none;text-decoration:none;">/g;
const LOGO_TEXT = /<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">[^<]*<\/div>/g;

/** The html with its one header logo (image or name text) replaced by a marker. Throws unless exactly one was cut. */
export function cutLogo(html: string): string {
  let cuts = 0;
  const out = html
    .replace(LOGO_IMG, () => {
      cuts++;
      return "[LOGO]";
    })
    .replace(LOGO_TEXT, () => {
      cuts++;
      return "[LOGO]";
    });
  if (cuts !== 1) throw new Error(`expected exactly one header logo, cut ${cuts}`);
  return out;
}

export function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}
