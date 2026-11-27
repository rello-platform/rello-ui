import { describe, expect, it } from "vitest";
import { APP_SLUGS, ENGINE_SLUGS, type PlatformSlug } from "@rello-platform/slugs";
import { RELLO_EMAIL_LOGO_SLUGS, renderRelloEmail, type RelloEmailAudience, type RelloEmailInput } from "./index";

/**
 * RALLYROO Level 2, U3: every address the shell itself puts in an email is on
 * hellorallyroo.com. The addresses are typed out here on purpose: a test that
 * read them from PLATFORM_BRAND would move with the code and pin nothing.
 */

const SLUGS: readonly PlatformSlug[] = [...APP_SLUGS, ...ENGINE_SLUGS];
const AUDIENCES: readonly RelloEmailAudience[] = ["consumer", "pro", "admin"];
const LOGO_PREFIX = "https://hellorallyroo.com/email/logos/";
const POWERED_BY_HREF = "https://hellorallyroo.com";
const POWERED_BY_TEXT = "Powered by Rallyroo (hellorallyroo.com)";

/** Only what the type requires: every default is the renderer's own. */
function defaults(app: PlatformSlug, audience: RelloEmailAudience): RelloEmailInput {
  return { audience, app, subject: "Your plan is ready", headline: "Your plan is ready.", paragraphs: ["It takes about 2 minutes."] };
}

const logoSrc = (html: string): string | null => html.match(/<img src="([^"]+)" width="96" height="96"/)?.[1] ?? null;
const poweredByAnchor = (html: string): { href: string; label: string } | null => {
  const m = html.match(/<a href="([^"]*)"[^>]*>(Powered by [^<]*)<\/a>/);
  return m ? { href: m[1], label: m[2] } : null;
};

describe("renderRelloEmail with default options: the shell's own addresses are on hellorallyroo.com", () => {
  it("(a) the header logo is served from hellorallyroo.com", () => {
    expect(logoSrc(renderRelloEmail(defaults("home-ready", "consumer")).html)).toBe(`${LOGO_PREFIX}home-ready.png`);
    expect(logoSrc(renderRelloEmail(defaults("rello", "admin")).html)).toBe(`${LOGO_PREFIX}rello.png`);
  });

  it("(a) every hosted logo, all eight, is served from hellorallyroo.com", () => {
    expect(RELLO_EMAIL_LOGO_SLUGS.size).toBe(8);
    for (const slug of RELLO_EMAIL_LOGO_SLUGS) {
      expect(logoSrc(renderRelloEmail(defaults(slug, "consumer")).html), slug).toBe(`${LOGO_PREFIX}${slug}.png`);
    }
  });

  it("(b) the Powered by link goes to https://hellorallyroo.com", () => {
    expect(poweredByAnchor(renderRelloEmail(defaults("home-ready", "consumer")).html)).toEqual({
      href: POWERED_BY_HREF,
      label: "Powered by Rallyroo",
    });
  });

  it("(c) the text footer's last line reads Powered by Rallyroo (hellorallyroo.com)", () => {
    const { text } = renderRelloEmail(defaults("home-ready", "consumer"));
    const lines = text.trimEnd().split("\n");
    expect(lines[lines.length - 1]).toBe(POWERED_BY_TEXT);
  });

  it("(d) no part of any render, for any app and audience, contains the old domain", () => {
    let renders = 0;
    for (const slug of SLUGS) {
      for (const audience of AUDIENCES) {
        const r = renderRelloEmail(defaults(slug, audience));
        for (const part of ["subject", "preheader", "html", "text"] as const) {
          expect(r[part].toLowerCase(), `${slug} ${audience} ${part}`).not.toContain("hellorello");
        }
        renders++;
      }
    }
    expect(renders).toBe(SLUGS.length * AUDIENCES.length);
    expect(renders).toBeGreaterThan(0);
  });
});
