import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Checkbox } from "../checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "./Popover";

/** The Audience tab's "+ Add filter" chip editor: a Checkbox list inside a popover. */
function StateFilter({
  showCloseButton,
  onOpenChange,
}: {
  showCloseButton?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [picked, setPicked] = React.useState<string[]>([]);
  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  return (
    <>
      <button type="button">Outside</button>
      <Popover onOpenChange={onOpenChange}>
        <PopoverTrigger>State</PopoverTrigger>
        <PopoverContent aria-label="State filter" showCloseButton={showCloseButton} closeLabel="Close state filter">
          {["Utah", "Idaho"].map((s) => (
            <label key={s} className="flex min-h-[44px] items-center gap-2">
              <Checkbox checked={picked.includes(s)} onCheckedChange={() => toggle(s)} aria-label={s} />
              {s}
            </label>
          ))}
        </PopoverContent>
      </Popover>
    </>
  );
}

const trigger = () => screen.getByRole("button", { name: "State" });

async function open(user: ReturnType<typeof userEvent.setup>) {
  await user.click(trigger());
  const dialog = await screen.findByRole("dialog", { name: "State filter" });
  await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  return dialog;
}

function bareVars(root: ParentNode): string[] {
  const out: string[] = [];
  root.querySelectorAll<HTMLElement>("[class]").forEach((el) => {
    const m = el.getAttribute("class")?.match(/var\(--[\w-]+\)/g);
    if (m) out.push(...m);
  });
  return out;
}

describe("Popover — trigger and content", () => {
  it("the trigger is a 44px dialog button, collapsed until opened", () => {
    render(<StateFilter />);
    expect(trigger()).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
    expect(trigger().className).toMatch(/min-h-\[44px\]/);
    expect(trigger().className).toMatch(/min-w-\[44px\]/);
  });

  it("opens a dialog named by aria-label, on the Select content surface, with fallbacks", async () => {
    const user = userEvent.setup();
    render(<StateFilter />);
    const dialog = await open(user);
    expect(trigger()).toHaveAttribute("aria-expanded", "true");
    for (const cls of ["z-50", "rounded-md", "border", "shadow-md"]) {
      expect(dialog.classList.contains(cls)).toBe(true);
    }
    expect(dialog.className).toContain("bg-[var(--card-background,#ffffff)]");
    expect(dialog.className).toContain("border-[var(--neutral-200,#bcc3ca)]");
    // This component's own elements only: the Checkbox children are the consumer's (and Checkbox's own classes are out of scope).
    const own = [trigger(), dialog, screen.getByRole("button", { name: "Close state filter" })];
    expect(own.flatMap((el) => el.className.match(/var\(--[\w-]+\)/g) ?? [])).toEqual([]);
    expect(bareVars(screen.getByRole("button", { name: "Close state filter" }))).toEqual([]);
  });

  it("caps its width and height to the space Radix measures inside the collision padding", async () => {
    const user = userEvent.setup();
    render(<StateFilter />);
    const dialog = await open(user);
    expect(dialog.className).toContain("max-w-[var(--radix-popover-content-available-width,calc(100vw-2rem))]");
    expect(dialog.className).toContain("max-h-[var(--radix-popover-content-available-height,24rem)]");
    expect(dialog.className).toContain("overflow-y-auto");
  });
});

describe("Popover — focus and dismissal", () => {
  it("moves focus into the content on open (the first control)", async () => {
    const user = userEvent.setup();
    render(<StateFilter showCloseButton={false} />);
    await open(user);
    expect(document.activeElement).toBe(screen.getByRole("checkbox", { name: "Utah" }));
  });

  it("Escape closes and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<StateFilter />);
    await open(user);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger()));
  });

  it("a click outside closes it", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<StateFilter onOpenChange={onOpenChange} />);
    await open(user);
    await user.click(screen.getByRole("button", { name: "Outside" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });

  it("working the controls inside does not close it", async () => {
    const user = userEvent.setup();
    render(<StateFilter />);
    await open(user);
    const utah = screen.getByRole("checkbox", { name: "Utah" });
    await user.click(utah);
    await user.click(screen.getByRole("checkbox", { name: "Idaho" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(utah).toHaveAttribute("data-state", "checked");
  });
});

describe("Popover — holds a Select", () => {
  it("choosing a Select option inside does not close the popover; Escape closes the Select first, then the popover", async () => {
    // Radix Select needs these in jsdom.
    const proto = Element.prototype as unknown as Record<string, unknown>;
    const saved = { h: proto.hasPointerCapture, r: proto.releasePointerCapture, s: proto.scrollIntoView };
    proto.hasPointerCapture = () => false;
    proto.releasePointerCapture = () => {};
    proto.scrollIntoView = () => {};
    try {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(
        <Popover>
          <PopoverTrigger>Status</PopoverTrigger>
          <PopoverContent aria-label="Status filter">
            <Select onValueChange={onValueChange}>
              <SelectTrigger aria-label="License status">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>,
      );
      await user.click(screen.getByRole("button", { name: "Status" }));
      await screen.findByRole("dialog", { name: "Status filter" });
      await user.click(screen.getByRole("combobox", { name: "License status" }));
      await user.click(await screen.findByRole("option", { name: "Active" }));
      expect(onValueChange).toHaveBeenCalledWith("active");
      expect(screen.getByRole("dialog", { name: "Status filter" })).toBeInTheDocument();

      // v2.44.1: Escape closes only the innermost layer. First the Select, then the Popover.
      await user.click(screen.getByRole("combobox", { name: "License status" }));
      await screen.findByRole("listbox");
      await user.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("listbox")).toBeNull());
      expect(screen.getByRole("dialog", { name: "Status filter" })).toBeInTheDocument();
      await user.keyboard("{Escape}");
      await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
      await waitFor(() => expect(document.activeElement).toBe(screen.getByRole("button", { name: "Status" })));
    } finally {
      proto.hasPointerCapture = saved.h;
      proto.releasePointerCapture = saved.r;
      proto.scrollIntoView = saved.s;
    }
  });
});

describe("Popover — close button", () => {
  it("is shown by default, 44px, labelled, and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<StateFilter />);
    await open(user);
    const close = screen.getByRole("button", { name: "Close state filter" });
    expect(close.className).toMatch(/min-h-\[44px\]/);
    expect(close.className).toMatch(/min-w-\[44px\]/);
    await user.click(close);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger()));
  });

  it("is absent when showCloseButton is false", async () => {
    const user = userEvent.setup();
    render(<StateFilter showCloseButton={false} />);
    await open(user);
    expect(screen.queryByRole("button", { name: "Close state filter" })).toBeNull();
  });

  it("defaults its label to Close", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Filter">Body</PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("button", { name: "Close" })).toBeInTheDocument();
  });
});

describe("Popover — anchor", () => {
  it("renders an anchor element the content can position against", () => {
    render(
      <Popover>
        <PopoverAnchor data-testid="chip-row">
          <PopoverTrigger>Open</PopoverTrigger>
        </PopoverAnchor>
        <PopoverContent aria-label="Filter">Body</PopoverContent>
      </Popover>,
    );
    expect(screen.getByTestId("chip-row")).toContainElement(screen.getByRole("button", { name: "Open" }));
  });
});

/**
 * Collision padding, measured. jsdom has no layout, so we give Floating UI a 390px viewport and
 * real-looking rects: a trigger hard against the left edge, a 300px-wide popover. With a 16px
 * collision padding the shift middleware must place the popover's left edge at x >= 16; without
 * it, the popover sits at x = 0, touching the edge of a phone screen.
 */
describe("Popover — stays inside a 390px viewport", () => {
  const restore: Array<() => void> = [];
  afterEach(() => {
    while (restore.length) restore.pop()!();
  });

  function stub<T extends object>(obj: T, key: string, desc: PropertyDescriptor) {
    const prev = Object.getOwnPropertyDescriptor(obj, key);
    Object.defineProperty(obj, key, { configurable: true, ...desc });
    restore.push(() => {
      if (prev) Object.defineProperty(obj, key, prev);
      else delete (obj as Record<string, unknown>)[key];
    });
  }

  function rect(x: number, y: number, width: number, height: number): DOMRect {
    return { x, y, left: x, top: y, width, height, right: x + width, bottom: y + height, toJSON: () => ({}) } as DOMRect;
  }

  it("keeps a 16px gutter from the viewport edge", async () => {
    stub(document.documentElement, "clientWidth", { get: () => 390 });
    stub(document.documentElement, "clientHeight", { get: () => 844 });
    stub(window, "innerWidth", { value: 390, writable: true });
    stub(window, "innerHeight", { value: 844, writable: true });
    const original = HTMLElement.prototype.getBoundingClientRect;
    HTMLElement.prototype.getBoundingClientRect = function (this: HTMLElement) {
      if (this.getAttribute("aria-haspopup") === "dialog") return rect(0, 100, 44, 44);
      // Floating UI measures Radix's popper wrapper, not the dialog inside it.
      if (this.hasAttribute("data-radix-popper-content-wrapper")) return rect(0, 0, 300, 200);
      return original.call(this);
    };
    restore.push(() => {
      HTMLElement.prototype.getBoundingClientRect = original;
    });
    const isWrapper = (el: HTMLElement) => el.hasAttribute("data-radix-popper-content-wrapper");
    stub(HTMLElement.prototype, "offsetWidth", { get(this: HTMLElement) { return isWrapper(this) ? 300 : 0; } });
    stub(HTMLElement.prototype, "offsetHeight", { get(this: HTMLElement) { return isWrapper(this) ? 200 : 0; } });

    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent aria-label="Filter" align="center">
          <button type="button">First</button>
        </PopoverContent>
      </Popover>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog", { name: "Filter" });
    const wrapper = dialog.parentElement as HTMLElement;
    await waitFor(() => expect(wrapper.style.transform).toMatch(/translate\(/));
    // Unshifted, a centred 300px popover on a 44px trigger at x = 0 would start at x = -128.
    await waitFor(() => expect(wrapper.style.transform).not.toMatch(/translate\(0px, -200%\)/));
    const x = Number(/translate\((-?[\d.]+)px/.exec(wrapper.style.transform)?.[1]);
    expect(x).toBeGreaterThanOrEqual(16);
    expect(x + 300).toBeLessThanOrEqual(390 - 16);
  });
});
