import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

/**
 * v2.44.1. Radix pins its internals exactly, so two Radix primitives share one dismiss layer only
 * when their declared `@radix-ui/react-dismissable-layer` versions are the same. A second copy keeps
 * a second layer stack, and then one Escape inside a Select opened in a Popover closes both (measured
 * in Rello with react-popover 1.3.1 → dismissable-layer 1.2.1 beside Select's 1.1.11).
 *
 * A caret range on react-popover lets every consumer resolve the newest 1.x, so the pin must be exact,
 * and the pinned version must declare the same dismiss layer as Select, Dialog and DropdownMenu's menu.
 */
const root = process.cwd();
const pkg = (name: string) =>
  JSON.parse(readFileSync(join(root, "node_modules", name, "package.json"), "utf8")) as {
    version: string;
    dependencies?: Record<string, string>;
  };
const own = JSON.parse(readFileSync(join(root, "package.json"), "utf8")) as { dependencies: Record<string, string> };
const LAYER = "@radix-ui/react-dismissable-layer";

describe("Popover shares one Radix dismiss layer with Select, Dialog and DropdownMenu", () => {
  it("pins @radix-ui/react-popover to an exact version (no ^ or ~)", () => {
    expect(own.dependencies["@radix-ui/react-popover"]).toMatch(/^\d+\.\d+\.\d+$/);
    expect(pkg("@radix-ui/react-popover").version).toBe(own.dependencies["@radix-ui/react-popover"]);
  });

  it.each(["@radix-ui/react-select", "@radix-ui/react-dialog", "@radix-ui/react-menu"])(
    "the pinned Popover declares the same dismiss layer as %s",
    (other) => {
      const popoverLayer = pkg("@radix-ui/react-popover").dependencies?.[LAYER];
      expect(popoverLayer).toBeDefined();
      expect(pkg(other).dependencies?.[LAYER]).toBe(popoverLayer);
    }
  );
});
