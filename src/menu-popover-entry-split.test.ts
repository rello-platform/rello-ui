import { describe, expect, it } from "vitest";
import * as root from "./index";
import * as client from "./client";

/**
 * Two-entry split (CLAUDE.md, DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726):
 * DropdownMenu and Popover are React components, so they reach consumers only through
 * `@rello-platform/ui/client`. The root entry must never carry them.
 */
const NAMES = [
  "DropdownMenu",
  "DropdownMenuTrigger",
  "DropdownMenuContent",
  "DropdownMenuItem",
  "DropdownMenuSeparator",
  "DropdownMenuLabel",
  "DropdownMenuGroup",
  "Popover",
  "PopoverTrigger",
  "PopoverContent",
  "PopoverAnchor",
  "PopoverClose",
] as const;

describe("DropdownMenu + Popover entry split", () => {
  it.each(NAMES)("%s is exported from the client entry", (name) => {
    expect((client as Record<string, unknown>)[name]).toBeDefined();
  });

  it.each(NAMES)("%s is NOT exported from the root entry", (name) => {
    expect(name in root).toBe(false);
  });
});
