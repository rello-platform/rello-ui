import { createRequire } from "node:module";
import { describe, expect, it } from "vitest";
import { renderRelloEmail, type RelloEmailAudience, type RelloEmailBrand, type RelloEmailInput } from "./index";
import { baselineInput } from "../test/email-logo-baseline";
// The two shipped entry points (committed dist). A test against the source alone would not catch a dist
// that was not rebuilt from it.
import * as distEsm from "../../dist/email.js";

/**
 * TE-1222 (AUDIT 28 on rello-ui #28): the TEXT part's new first line is the brand's name. line() flattens
 * CR/LF and JS whitespace but keeps C0/C1 controls, so "Summit\u0085Realty\u0000Group" put NEL and NUL into
 * text line 1. U+0085 is a line break to a Unicode-aware reader. The name line now drops every C0/C1
 * control (U+0000-U+001F, U+007F-U+009F) after line()'s flattening, then collapses and trims; nothing
 * left means no name line. The HTML is untouched: its header still prints logoAlt exactly as before.
 */

const require_ = createRequire(import.meta.url);
const distCjs = require_("../../dist/email.cjs") as { renderRelloEmail: typeof renderRelloEmail };

const ENTRIES: ReadonlyArray<readonly [string, typeof renderRelloEmail]> = [
  ["source", renderRelloEmail],
  ["dist/email.js", (distEsm as { renderRelloEmail: typeof renderRelloEmail }).renderRelloEmail],
  ["dist/email.cjs", distCjs.renderRelloEmail],
];

const LOGO = "https://cdn.example-realty.com/brand/logo.png";
const CALLERS: ReadonlyArray<{ app: "open-house-hub" | "pathfinder-pro"; audience: RelloEmailAudience }> = [
  { app: "open-house-hub", audience: "consumer" },
  { app: "pathfinder-pro", audience: "pro" },
];

const make = (c: (typeof CALLERS)[number], brand: RelloEmailBrand): RelloEmailInput => ({ ...baselineInput(c.app, c.audience), brand });
const withLogo = (name: string): RelloEmailBrand => ({ name, logoUrl: LOGO, primary: "#7c3aed" });
const noLogo = (name: string): RelloEmailBrand => ({ name });

/** Python splitlines semantics: every character a Unicode-aware reader treats as a line end. */
const LINE_ENDS = new RegExp("\\r\\n|[\\n\\r\\v\\f\\x1c\\x1d\\x1e\\x85" + String.fromCharCode(0x2028, 0x2029) + "]");
// eslint-disable-next-line no-control-regex
const ANY_CONTROL = /[\u0000-\u001f\u007f-\u009f]/;

const CONTROL_NAMES: ReadonlyArray<readonly [string, string, string]> = [
  ["NUL + NEL (AUDIT 28's case)", "Summit\u0085Realty\u0000Group", "SummitRealtyGroup"],
  ["NUL alone", "A\u0000B", "AB"],
  ["NEL alone", "Summit\u0085Realty", "SummitRealty"],
  ["the whole C0/C1 range around words", "Name \u0001\u0002\u001f with\u007f\u0080\u009f controls", "Name with controls"],
  ["a control at each end", "\u0000Summit Realty\u0085", "Summit Realty"],
];

describe("TE-1222: the text name line carries no C0/C1 control character", () => {
  for (const [entry, render] of ENTRIES) {
    for (const c of CALLERS) {
      for (const [mk, label] of [[withLogo, "logo"], [noLogo, "no logo"]] as const) {
        for (const [what, name, expected] of CONTROL_NAMES) {
          it(`${entry} ${c.app} ${c.audience}, ${label}, ${what}: line 1 is "${expected}"`, () => {
            const r = render(make(c, mk(name)));
            const first = r.text.split("\n")[0];
            expect(first).toBe(expected);
            expect(first).not.toMatch(ANY_CONTROL);
            // Nothing in the new line reads as a line break to a Unicode-aware reader.
            expect(r.text.split(LINE_ENDS)[0]).toBe(expected);
          });
        }
      }
    }
  }

  it("a name that is only controls and spaces names nobody: no name line, the text opens with the kicker", () => {
    for (const [entry, render] of ENTRIES) {
      for (const c of CALLERS) {
        const nameless = render(make(c, noLogo("")));
        const r = render(make(c, noLogo("\u0000 \u0085\u001f\u007f \u009f")));
        expect(r.text, `${entry} ${c.app}`).toBe(nameless.text);
      }
    }
  });

  it("the HTML is unchanged: the header still prints the name as before, controls and all (out of scope here)", () => {
    for (const [entry, render] of ENTRIES) {
      for (const c of CALLERS) {
        const r = render(make(c, withLogo("Summit\u0085Realty\u0000Group")));
        expect(r.html, `${entry} ${c.app}`).toContain("Summit\u0085Realty\u0000Group");
      }
    }
  });

  it("ordinary names keep their line exactly: ampersand, quotes, emoji, Hebrew, Arabic and 12,000 characters", () => {
    const long = "Summit ".repeat(1714).trim();
    const names: ReadonlyArray<readonly [string, string]> = [
      ["Smith & Sons Realty", "Smith & Sons Realty"],
      ['The "Big" Star\'s Mortgage', 'The "Big" Star\'s Mortgage'],
      ["Sunrise \u{1F305} Homes", "Sunrise \u{1F305} Homes"],
      ["בית הזהב", "בית הזהב"],
      ["منزل النجمة", "منزل النجمة"],
      [long, long],
      ["Tabs\tand\r\nbreaks   collapse", "Tabs and breaks collapse"],
    ];
    for (const [entry, render] of ENTRIES) {
      for (const [name, expected] of names) {
        const r = render(make(CALLERS[0], withLogo(name)));
        expect(r.text.split("\n")[0], `${entry} ${name.slice(0, 20)}`).toBe(expected);
      }
    }
  });

  it("no brand and admin are untouched: no name line is added", () => {
    for (const [entry, render] of ENTRIES) {
      for (const c of CALLERS) {
        const plain = render({ ...baselineInput(c.app, c.audience), brand: null });
        const admin = render({ ...baselineInput(c.app, "admin"), brand: withLogo("Summit\u0085Realty") });
        expect(plain.text.split("\n")[0], `${entry} ${c.app} plain`).not.toContain("Summit");
        expect(admin.text, `${entry} ${c.app} admin`).not.toContain("Summit");
      }
    }
  });
});
