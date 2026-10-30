import { describe, expect, it } from "vitest";
import { renderRelloEmail, resolveRelloEmailPalette, type RelloEmailInput } from "./index";

/**
 * `moreLinks`: links after the secondary link, for an email whose choices are
 * more than a button and one link. Open House Hub's showing-feedback email asks
 * three one-tap questions (KA amended 121).
 */

const BASE: RelloEmailInput = {
  audience: "consumer",
  app: "open-house-hub",
  subject: "s",
  headline: "h",
  button: { label: "Loved it", url: "https://example.com/f?r=loved" },
  secondaryLink: { label: "Interested", url: "https://example.com/f?r=interested" },
  showLinkFallback: false,
};

describe("moreLinks", () => {
  it("writes each link after the secondary link, in order, in the link color", () => {
    const r = renderRelloEmail({ ...BASE, moreLinks: [{ label: "Not for me", url: "https://example.com/f?r=no" }, { label: "Later", url: "https://example.com/f?r=later" }] });
    const link = resolveRelloEmailPalette("consumer", "open-house-hub").link;
    const [a, b, c] = ["r=interested", "r=no", "r=later"].map((k) => r.html.indexOf(k));
    expect(a).toBeGreaterThan(-1);
    expect(b).toBeGreaterThan(a);
    expect(c).toBeGreaterThan(b);
    expect(r.html).toContain(`<a href="https://example.com/f?r=no" style="color:${link};font-weight:600;text-decoration:none;">Not for me</a>`);
  });

  it("the text part carries every link", () => {
    const r = renderRelloEmail({ ...BASE, moreLinks: [{ label: "Not for me", url: "https://example.com/f?r=no" }] });
    expect(r.text).toContain("Loved it:\nhttps://example.com/f?r=loved");
    expect(r.text).toContain("Interested: https://example.com/f?r=interested");
    expect(r.text).toContain("Not for me: https://example.com/f?r=no");
  });

  it("drops a link with no label or an unsafe URL, and escapes the rest", () => {
    const r = renderRelloEmail({
      ...BASE,
      moreLinks: [
        { label: "Bad", url: "javascript:alert(1)" },
        { label: "", url: "https://example.com/empty" },
        { label: `A & <b>`, url: "https://example.com/f?a=1&b=2" },
      ],
    });
    expect(r.html).not.toContain("javascript:");
    expect(r.html).not.toContain("/empty");
    expect(r.html).toContain(`href="https://example.com/f?a=1&amp;b=2"`);
    expect(r.html).toContain("A &amp; &lt;b&gt;");
  });

  it("works with no button and no secondary link", () => {
    const r = renderRelloEmail({ ...BASE, button: null, secondaryLink: null, moreLinks: [{ label: "Only", url: "https://example.com/only" }] });
    expect(r.html).toContain(">Only</a>");
    expect(r.text).toContain("Only: https://example.com/only");
  });

  it("absent, null or empty renders exactly as without it", () => {
    const plain = renderRelloEmail(BASE);
    for (const moreLinks of [undefined, null, []]) expect(renderRelloEmail({ ...BASE, moreLinks })).toEqual(plain);
  });
});
