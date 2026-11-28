import { describe, expect, it } from "vitest";
import {
  digitsOnly,
  formatUsPhone,
  usPhoneToE164,
  formatDateDigits,
  parseUsDate,
  normalizeEmail,
  normalizeUrl,
  sanitizeDecimal,
  formatCurrencyDisplay,
  parseDecimal,
} from "./formatted-input";

// HI-05 pure helpers (root entry: server-safe, so a spoke's API route can
// re-check what the browser sent with the same rules).
describe("formatted-input helpers (HI-05)", () => {
  it("digitsOnly drops every non-digit", () => {
    expect(digitsOnly("(801) 555-12a34")).toBe("8015551234");
  });

  it("formatUsPhone formats as you type", () => {
    expect(formatUsPhone("")).toBe("");
    expect(formatUsPhone("8")).toBe("(8");
    expect(formatUsPhone("801")).toBe("(801");
    expect(formatUsPhone("8015")).toBe("(801) 5");
    expect(formatUsPhone("8015550")).toBe("(801) 555-0");
    expect(formatUsPhone("8015550123")).toBe("(801) 555-0123");
    expect(formatUsPhone("801555012399")).toBe("(801) 555-0123");
  });

  it("formatUsPhone drops a leading country code 1 from an 11-digit number", () => {
    expect(formatUsPhone("18015550123")).toBe("(801) 555-0123");
  });

  it("usPhoneToE164: 10 digits → +1…; anything else → null", () => {
    expect(usPhoneToE164("(801) 555-0123")).toBe("+18015550123");
    expect(usPhoneToE164("+1 801 555 0123")).toBe("+18015550123");
    expect(usPhoneToE164("801555012")).toBeNull();
    expect(usPhoneToE164("")).toBeNull();
  });

  it("formatDateDigits builds MM/DD/YYYY", () => {
    expect(formatDateDigits("1")).toBe("1");
    expect(formatDateDigits("12")).toBe("12");
    expect(formatDateDigits("123")).toBe("12/3");
    expect(formatDateDigits("12312026")).toBe("12/31/2026");
  });

  it("parseUsDate: a real date → ISO; an impossible or partial one → null", () => {
    expect(parseUsDate("12/31/2026")).toBe("2026-12-31");
    expect(parseUsDate("02/29/2028")).toBe("2028-02-29");
    expect(parseUsDate("02/29/2027")).toBeNull();
    expect(parseUsDate("13/40/2026")).toBeNull();
    expect(parseUsDate("00/10/2026")).toBeNull();
    expect(parseUsDate("12/31")).toBeNull();
  });

  it("normalizeEmail lowercases and trims", () => {
    expect(normalizeEmail(" Dave@X.COM ")).toBe("dave@x.com");
  });

  it("normalizeUrl adds https:// only when there is no scheme", () => {
    expect(normalizeUrl("example.com/Path")).toBe("https://example.com/Path");
    expect(normalizeUrl(" http://a.b ")).toBe("http://a.b");
    expect(normalizeUrl("https://a.b")).toBe("https://a.b");
    expect(normalizeUrl("   ")).toBe("");
  });

  it("sanitizeDecimal keeps digits and one point, capped decimals", () => {
    expect(sanitizeDecimal("7.25", 3)).toBe("7.25");
    expect(sanitizeDecimal("7..2.5x", 3)).toBe("7.25");
    expect(sanitizeDecimal("$1,234.567", 2)).toBe("1234.56");
    expect(sanitizeDecimal("-5", 2)).toBe("5");
    expect(sanitizeDecimal("12", 0)).toBe("12");
    expect(sanitizeDecimal("1.5", 0)).toBe("15");
  });

  it("formatCurrencyDisplay groups thousands and keeps a typed point", () => {
    expect(formatCurrencyDisplay("")).toBe("");
    expect(formatCurrencyDisplay("1234")).toBe("$1,234");
    expect(formatCurrencyDisplay("1234.")).toBe("$1,234.");
    expect(formatCurrencyDisplay("1234567.5")).toBe("$1,234,567.5");
    expect(formatCurrencyDisplay("0.99")).toBe("$0.99");
  });

  it("parseDecimal: a number or null, never NaN", () => {
    expect(parseDecimal("7.25")).toBe(7.25);
    expect(parseDecimal("")).toBeNull();
    expect(parseDecimal(".")).toBeNull();
    expect(parseDecimal("1234.")).toBe(1234);
  });
});
