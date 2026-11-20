import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";

/**
 * The Audience tab's saved-cohort "⋯" menu, the way a spoke mounts it:
 * Load / Rename / Delete, with Delete locked and its reason shown as text.
 */
function CohortMenu({
  onLoad = () => {},
  onRename = () => {},
  onDelete = () => {},
  deleteReason = "Only the owner can delete this audience",
}: {
  onLoad?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  deleteReason?: string;
}) {
  return (
    <>
      <button type="button">Before</button>
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="More for Utah top producers">⋯</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Utah top producers</DropdownMenuLabel>
          <DropdownMenuItem onSelect={onLoad}>Load</DropdownMenuItem>
          <DropdownMenuItem onSelect={onRename}>Rename</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={onDelete} disabledReason={deleteReason}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

const trigger = () => screen.getByRole("button", { name: "More for Utah top producers" });

async function openWithKeyboard(user: ReturnType<typeof userEvent.setup>) {
  trigger().focus();
  await user.keyboard("{Enter}");
  const menu = await screen.findByRole("menu");
  await waitFor(() => expect(menu.contains(document.activeElement)).toBe(true));
  return menu;
}

/** Every `var(--x)` in a rendered class list must carry a fallback: `var(--x, …)`. */
function bareVars(root: ParentNode): string[] {
  const out: string[] = [];
  root.querySelectorAll<HTMLElement>("[class]").forEach((el) => {
    const m = el.getAttribute("class")?.match(/var\(--[\w-]+\)/g);
    if (m) out.push(...m);
  });
  return out;
}

describe("DropdownMenu — trigger", () => {
  it("is a 44px menu button, collapsed until opened", () => {
    render(<CohortMenu />);
    const t = trigger();
    expect(t).toHaveAttribute("aria-haspopup", "menu");
    expect(t).toHaveAttribute("aria-expanded", "false");
    expect(t.className).toMatch(/min-h-\[44px\]/);
    expect(t.className).toMatch(/min-w-\[44px\]/);
  });

  it("opens on click as a menu of menuitems, with label and separator", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    const t = trigger(); // captured: an open (modal) menu hides the rest of the page from the a11y tree
    await user.click(t);
    // Radix names the menu by its trigger (aria-labelledby).
    const menu = await screen.findByRole("menu", { name: "More for Utah top producers" });
    expect(t).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("menuitem").map((i) => i.textContent)).toEqual([
      "Load",
      "Rename",
      "DeleteOnly the owner can delete this audience",
    ]);
    expect(menu).toHaveTextContent("Utah top producers");
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});

describe("DropdownMenu — surface matches Select content", () => {
  it("uses the Select content surface classes, with the card tokens and fallbacks", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    await user.click(trigger());
    const menu = await screen.findByRole("menu");
    for (const cls of ["z-50", "min-w-[8rem]", "rounded-md", "border", "shadow-md", "p-1"]) {
      expect(menu.classList.contains(cls)).toBe(true);
    }
    expect(menu.className).toContain("bg-[var(--card-background,#ffffff)]");
    expect(menu.className).toContain("border-[var(--neutral-200,#bcc3ca)]");
    expect(menu.className).toContain("text-[var(--foreground,#2d3339)]");
  });

  it("every CSS variable on the trigger and in the open menu has a fallback", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    expect(bareVars(document.body)).toEqual([]);
    await user.click(trigger());
    await screen.findByRole("menu");
    expect(bareVars(document.body)).toEqual([]);
  });

  it("every item is at least 44px tall", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    await user.click(trigger());
    await screen.findByRole("menu");
    for (const item of screen.getAllByRole("menuitem")) {
      expect(item.className).toMatch(/min-h-\[44px\]/);
    }
  });
});

describe("DropdownMenu — keyboard", () => {
  it("Enter opens with focus on the first item; arrows, End, Home move it", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    await openWithKeyboard(user);
    const [load, rename, del] = screen.getAllByRole("menuitem");
    expect(document.activeElement).toBe(load);
    await user.keyboard("{ArrowDown}");
    expect(document.activeElement).toBe(rename);
    await user.keyboard("{End}");
    expect(document.activeElement).toBe(del);
    await user.keyboard("{Home}");
    expect(document.activeElement).toBe(load);
    await user.keyboard("{ArrowUp}");
    expect(document.activeElement).toBe(load); // Radix default: no loop at the ends
    await user.keyboard("{End}{ArrowDown}");
    expect(document.activeElement).toBe(del);
  });

  it("typeahead moves focus to the matching item", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    await openWithKeyboard(user);
    await user.keyboard("r");
    expect(document.activeElement).toHaveTextContent("Rename");
  });

  it("Escape closes the menu and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    await openWithKeyboard(user);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger()));
    expect(trigger()).toHaveAttribute("aria-expanded", "false");
  });

  it("choosing an item calls onSelect once, closes, and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    const onRename = vi.fn();
    render(<CohortMenu onRename={onRename} />);
    await openWithKeyboard(user);
    await user.keyboard("{ArrowDown}{Enter}");
    expect(onRename).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("menu")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(trigger()));
  });
});

describe("DropdownMenu — locked item with a reason", () => {
  it("is aria-disabled, shows its reason as text, and names it as the description", async () => {
    const user = userEvent.setup();
    render(<CohortMenu />);
    await user.click(trigger());
    await screen.findByRole("menu");
    const del = screen.getByRole("menuitem", { name: "Delete" });
    expect(del).toHaveAttribute("aria-disabled", "true");
    expect(del).toHaveAttribute("data-disabled");
    expect(del).toHaveAccessibleDescription("Only the owner can delete this audience");
    expect(screen.getByText("Only the owner can delete this audience")).toBeVisible();
    // The enabled items carry no aria-disabled.
    expect(screen.getByRole("menuitem", { name: "Load" })).not.toHaveAttribute("aria-disabled");
  });

  it("a click never fires onSelect and leaves the menu open", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<CohortMenu onDelete={onDelete} />);
    await user.click(trigger());
    await screen.findByRole("menu");
    await user.click(screen.getByRole("menuitem", { name: "Delete" }));
    expect(onDelete).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("stays reachable by keyboard (so its reason can be read) but Enter and Space never fire onSelect", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<CohortMenu onDelete={onDelete} />);
    await openWithKeyboard(user);
    await user.keyboard("{End}");
    const del = screen.getByRole("menuitem", { name: "Delete" });
    expect(document.activeElement).toBe(del);
    await user.keyboard("{Enter}");
    await user.keyboard(" ");
    expect(onDelete).not.toHaveBeenCalled();
    expect(screen.getByRole("menu")).toBeInTheDocument();
  });

  it("an item with no reason behaves normally", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    render(<CohortMenu onDelete={onDelete} deleteReason="" />);
    await user.click(trigger());
    await screen.findByRole("menu");
    const del = screen.getByRole("menuitem", { name: "Delete" });
    expect(del).not.toHaveAttribute("aria-disabled");
    await user.click(del);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("plain `disabled` (no reason) is also inert and aria-disabled", async () => {
    const user = userEvent.setup();
    const onArchive = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger aria-label="Open">⋯</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onArchive} disabled>
            Archive
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole("button", { name: "Open" }));
    const item = await screen.findByRole("menuitem", { name: "Archive" });
    expect(item).toHaveAttribute("aria-disabled", "true");
    await user.click(item);
    expect(onArchive).not.toHaveBeenCalled();
  });
});
