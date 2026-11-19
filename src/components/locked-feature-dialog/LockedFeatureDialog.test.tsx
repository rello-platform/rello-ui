import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LockedFeatureDialog, type LockedFeatureDialogProps } from "./LockedFeatureDialog";

const base: Omit<LockedFeatureDialogProps, "open" | "onClose"> = {
  eyebrow: "Eyebrow line",
  title: "Feature X is part of Plan Y",
  body: "One value sentence.",
  primary: { label: "Primary action", onClick: () => {} },
  learnMore: { label: "Learn more", href: "https://example.test/features/x" },
  seam: "seam-x",
};

/** An opener button + the dialog, the way a spoke mounts it. */
function Harness(props: Partial<LockedFeatureDialogProps> & { onCloseSpy?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const { onCloseSpy, ...rest } = props;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Locked menu item
      </button>
      <LockedFeatureDialog
        {...base}
        {...rest}
        open={open}
        onClose={() => {
          onCloseSpy?.();
          setOpen(false);
        }}
      />
    </>
  );
}

async function openFromOpener(user: ReturnType<typeof userEvent.setup>) {
  const opener = screen.getByRole("button", { name: "Locked menu item" });
  await user.click(opener);
  const dialog = screen.getByRole("dialog");
  await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
  return { opener, dialog };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe("LockedFeatureDialog — dialog contract", () => {
  it("renders nothing while closed", () => {
    render(<LockedFeatureDialog {...base} open={false} onClose={() => {}} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("is a modal dialog labelled by its title, with eyebrow, body and both actions", () => {
    render(<LockedFeatureDialog {...base} open onClose={() => {}} />);
    const dialog = screen.getByRole("dialog", { name: "Feature X is part of Plan Y" });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    const labelledBy = dialog.getAttribute("aria-labelledby");
    expect(labelledBy && document.getElementById(labelledBy)).toHaveTextContent("Feature X is part of Plan Y");
    expect(dialog).toHaveTextContent("Eyebrow line");
    expect(dialog).toHaveTextContent("One value sentence.");
    expect(screen.getByRole("button", { name: "Primary action" }).className).toMatch(/min-h-\[44px\]/);
    const learn = screen.getByRole("link", { name: "Learn more (opens in a new tab)" });
    expect(learn).toHaveAttribute("target", "_blank");
    expect(learn.getAttribute("rel")?.split(" ")).toContain("noopener");
    expect(screen.getByRole("button", { name: "Close" }).className).toMatch(/min-h-\[44px\]/);
  });

  it("no eyebrow → none rendered; closeLabel is a prop", () => {
    render(<LockedFeatureDialog {...base} eyebrow={undefined} closeLabel="Dismiss" open onClose={() => {}} />);
    expect(screen.getByRole("dialog")).not.toHaveTextContent("Eyebrow line");
    expect(screen.getByRole("button", { name: "Dismiss" })).toBeInTheDocument();
  });

  it("Escape closes it and returns focus to the opener", async () => {
    const user = userEvent.setup();
    const onCloseSpy = vi.fn();
    render(<Harness onCloseSpy={onCloseSpy} />);
    const { opener } = await openFromOpener(user);
    await user.keyboard("{Escape}");
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });

  it("the × button closes it and returns focus to the opener", async () => {
    const user = userEvent.setup();
    const onCloseSpy = vi.fn();
    render(<Harness onCloseSpy={onCloseSpy} />);
    const { opener } = await openFromOpener(user);
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });

  it("a backdrop press closes it and returns focus to the opener", async () => {
    const user = userEvent.setup();
    const onCloseSpy = vi.fn();
    render(<Harness onCloseSpy={onCloseSpy} />);
    const { opener } = await openFromOpener(user);
    const backdrop = screen.getByTestId("locked-feature-dialog-backdrop");
    fireEvent.pointerDown(backdrop);
    fireEvent.pointerUp(backdrop);
    fireEvent.click(backdrop);
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });

  it("keeps Tab focus inside the dialog both ways", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">outside before</button>
        <LockedFeatureDialog {...base} open onClose={() => {}} />
        <button type="button">outside after</button>
      </>,
    );
    const dialog = screen.getByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    for (let i = 0; i < 5; i += 1) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
    for (let i = 0; i < 5; i += 1) {
      await user.tab({ shift: true });
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it("removes its Escape listener when unmounted", async () => {
    const onClose = vi.fn();
    const { unmount } = render(<LockedFeatureDialog {...base} open onClose={onClose} />);
    await waitFor(() => expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true));
    unmount();
    act(() => {
      document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("LockedFeatureDialog — events (UPSELL_EVENTS)", () => {
  it("`shown` once per opening (not on re-render), `dismissed` on close, `shown` again on reopen", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    const { rerender } = render(<Harness onEvent={onEvent} />);
    await openFromOpener(user);
    rerender(<Harness onEvent={onEvent} title="Feature X is part of Plan Y" />);
    expect(onEvent.mock.calls).toEqual([["shown", "seam-x"]]);
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(onEvent.mock.calls).toEqual([
      ["shown", "seam-x"],
      ["dismissed", "seam-x"],
    ]);
    await openFromOpener(user);
    expect(onEvent.mock.calls.filter(([e]) => e === "shown")).toHaveLength(2);
  });

  it("`clicked` on the primary action and on Learn more; the primary's own handler runs", async () => {
    const user = userEvent.setup();
    const onEvent = vi.fn();
    const onPrimary = vi.fn();
    render(<LockedFeatureDialog {...base} primary={{ label: "Primary action", onClick: onPrimary }} open onClose={() => {}} onEvent={onEvent} />);
    await user.click(screen.getByRole("button", { name: "Primary action" }));
    const learn = screen.getByRole("link", { name: /Learn more/ });
    learn.addEventListener("click", (e) => e.preventDefault());
    await user.click(learn);
    expect(onPrimary).toHaveBeenCalledTimes(1);
    expect(onEvent.mock.calls.filter(([e]) => e === "clicked")).toEqual([
      ["clicked", "seam-x"],
      ["clicked", "seam-x"],
    ]);
  });
});
