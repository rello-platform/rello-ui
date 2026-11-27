import { describe, expect, it } from "vitest";
import { APP_SLUGS, ENGINE_SLUGS, type PlatformSlug } from "@rello-platform/slugs";
import { renderRelloEmail, type RelloEmailAudience, type RelloEmailInput } from "./index";
import { asLegacyBrand } from "../test/legacy-brand";

/**
 * RH-380. asLegacyBrand lets the frozen recordings be compared with today's
 * renders by mapping the shell's own three addresses back. It must map ONLY
 * those: if it also rewrote a caller's own address, a frozen comparison could
 * not tell that caller content had moved to another host.
 *
 * Each case renders the same email twice: the caller's own content on the new
 * host, and on the old one. The old-host render is what a recording would hold.
 * The old-host render's input has no new-host text, so every new-host string in
 * it is the shell's; the rest of the new-host render's are the caller's. After
 * mapping, exactly the caller's must be left and the comparison must differ.
 *
 * This file is in src/email so that tsc checks it: tsconfig excludes
 * src/test/**, where a misspelled input field passes and renders nothing.
 */

const NEW = { url: "https://hellorallyroo.com", domain: "hellorallyroo.com" };
const OLD = { url: "https://hellorello.app", domain: "hellorello.app" };
type Host = typeof NEW;
type Part = "html" | "text";

const count = (value: string, piece: string): number => value.split(piece).length - 1;

const base = (extra: Partial<RelloEmailInput>): RelloEmailInput => ({
  audience: "consumer",
  app: "home-ready",
  subject: "Your plan is ready",
  headline: "Your plan is ready.",
  ...extra,
});

/** [what the caller supplied, the input, the part it shows in, the string that must survive] */
const CASES: [name: string, input: (h: Host) => RelloEmailInput, part: Part, survives: string][] = [
  ["a button linking to the site root", (h) => base({ button: { label: "Open", url: h.url } }), "html", `href="${NEW.url}"`],
  ["a second link to the site root (html)", (h) => base({ secondaryLink: { label: "About us", url: h.url } }), "html", `href="${NEW.url}"`],
  ["a second link to the site root (text)", (h) => base({ secondaryLink: { label: "About us", url: h.url } }), "text", `About us: ${NEW.url}`],
  ["one of the extra links to the site root", (h) => base({ moreLinks: [{ label: "Our story", url: h.url }] }), "html", `href="${NEW.url}"`],
  [
    "a preference link in the footer row, beside the Powered by link",
    (h) => base({ footer: { preferenceLink: { label: "Email preferences", url: h.url } } }),
    "html",
    `<a href="${NEW.url}" style=`,
  ],
  [
    "a preference link that ends the footer row (poweredBy off)",
    (h) => base({ footer: { poweredBy: false, preferenceLink: { label: "Email preferences", url: h.url } } }),
    "html",
    `<a href="${NEW.url}" style=`,
  ],
  ["body text naming the domain in brackets (html)", (h) => base({ paragraphs: [`Visit our site (${h.domain}) today.`] }), "html", `(${NEW.domain})`],
  ["body text naming the domain in brackets (text)", (h) => base({ paragraphs: [`Visit our site (${h.domain}) today.`] }), "text", `(${NEW.domain})`],
  [
    "a body line worded like the shell's footer line, with no footer block",
    (h) => base({ paragraphs: [`Powered by Rallyroo (${h.domain})`], footer: { poweredBy: false } }),
    "text",
    `(${NEW.domain})`,
  ],
  [
    "a body line worded like the shell's footer line, above the real footer",
    (h) => base({ paragraphs: [`Powered by Rallyroo (${h.domain})`, "Thanks."] }),
    "text",
    `(${NEW.domain})\n`,
  ],
  [
    "a brand logo on the hub's logo path (not a hosted file)",
    (h) => base({ brand: { name: "Summit Peak", logoUrl: `${h.url}/email/logos/not-a-hosted-file.png` } }),
    "html",
    `${NEW.url}/email/logos/not-a-hosted-file.png`,
  ],
  [
    "a brand logo with a hosted file's name",
    (h) => base({ brand: { name: "Summit Peak", logoUrl: `${h.url}/email/logos/rello.png` } }),
    "html",
    `${NEW.url}/email/logos/rello.png`,
  ],
  [
    "body text that spells out the shell's own logo tag",
    (h) => base({ paragraphs: [`<img src="${h.url}/email/logos/rello.png" width="96" height="96" alt="x">`] }),
    "html",
    `${NEW.url}/email/logos/rello.png`,
  ],
  ["body text holding the bare URL", (h) => base({ paragraphs: [`Read more at ${h.url}`] }), "html", NEW.url],
];

describe("asLegacyBrand leaves the caller's own addresses alone (RH-380)", () => {
  it.each(CASES)("%s", (_name, input, part, survives) => {
    const rawNew = renderRelloEmail(input(NEW))[part];
    const rawOld = renderRelloEmail(input(OLD))[part];
    const callers = count(rawNew, NEW.domain) - count(rawOld, NEW.domain);
    expect(callers, "the caller's content must show in this part, or the case tests nothing").toBeGreaterThan(0);

    const now = asLegacyBrand(rawNew);
    const recorded = asLegacyBrand(rawOld);
    expect(now).toContain(survives);
    expect(count(now, NEW.domain)).toBe(callers);
    expect(now).not.toBe(recorded);
  });
});

describe("asLegacyBrand still maps every address the shell writes", () => {
  const SLUGS: readonly PlatformSlug[] = [...APP_SLUGS, ...ENGINE_SLUGS];
  const AUDIENCES: readonly RelloEmailAudience[] = ["consumer", "pro", "admin"];
  const FOOTERS: [string, Partial<RelloEmailInput>][] = [
    ["no other footer facts", {}],
    [
      "a full footer",
      {
        companyName: "Summit Peak Mortgage",
        footer: { reason: "You asked for this.", preferenceLink: { label: "Email preferences", url: "https://example.com/p" } },
        signer: { name: "Sam Lee" },
      },
    ],
  ];

  it.each(FOOTERS)("every app and audience, %s: nothing of the new host is left", (_name, extra) => {
    let logos = 0;
    let poweredBy = 0;
    for (const app of SLUGS) {
      for (const audience of AUDIENCES) {
        const r = renderRelloEmail(base({ app, audience, ...extra }));
        const html = asLegacyBrand(r.html);
        const text = asLegacyBrand(r.text);
        expect(html, `${app} ${audience} html`).not.toContain(NEW.domain);
        expect(text, `${app} ${audience} text`).not.toContain(NEW.domain);
        if (html.includes(`<img src="${OLD.url}/email/logos/`)) logos++;
        if (audience === "consumer") {
          expect(html, app).toContain(`<a href="${OLD.url}" style=`);
          expect(text.endsWith(`Powered by Rello (${OLD.domain})\n`), app).toBe(true);
          poweredBy++;
        }
      }
    }
    expect(poweredBy).toBe(SLUGS.length);
    expect(logos).toBeGreaterThan(SLUGS.length);
  });
});
