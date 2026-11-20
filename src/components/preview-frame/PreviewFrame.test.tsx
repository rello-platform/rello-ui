import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PREVIEW_BLOCKED_HINT_MS, PreviewFrame } from "./PreviewFrame";

/** A small cockpit stand-in: tabs that switch, an expander, and form controls holding sample values. */
function Cockpit() {
  const [tab, setTab] = React.useState<"a" | "b">("a");
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  return (
    <form onSubmit={() => {}}>
      <div role="tablist">
        <button type="button" role="tab" aria-selected={tab === "a"} onClick={() => setTab("a")}>
          Tab A
        </button>
        <button type="button" role="tab" aria-selected={tab === "b"} onClick={() => setTab("b")}>
          Tab B
        </button>
      </div>
      {tab === "a" ? (
        <label>
          Loan amount
          <input name="amount" defaultValue="425000" />
        </label>
      ) : (
        <label>
          Notes
          <textarea name="notes" defaultValue="Sample note" />
        </label>
      )}
      <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        More details
      </button>
      {open ? <p>Expanded details</p> : null}
      <label>
        Escrow
        <input type="checkbox" name="escrow" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
      </label>
      <label>
        Term
        <select name="term" defaultValue="30">
          <option value="30">30</option>
          <option value="15">15</option>
        </select>
      </label>
      <button type="submit">Price it</button>
    </form>
  );
}

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("PreviewFrame — sample (default)", () => {
  it("shows the sample label and is described by it", () => {
    render(
      <PreviewFrame sampleLabel="Sample label">
        <Cockpit />
      </PreviewFrame>,
    );
    const frame = screen.getByRole("group");
    expect(frame).toHaveAttribute("data-mode", "sample");
    const id = frame.getAttribute("aria-describedby");
    expect(id && document.getElementById(id)).toHaveTextContent("Sample label");
  });

  it("without sampleLabel: no label and no aria-describedby", () => {
    render(
      <PreviewFrame>
        <Cockpit />
      </PreviewFrame>,
    );
    expect(screen.getByRole("group")).not.toHaveAttribute("aria-describedby");
  });

  it("stays explorable: tabs switch and expanders open", async () => {
    const user = userEvent.setup();
    render(
      <PreviewFrame blockedHint="Blocked hint">
        <Cockpit />
      </PreviewFrame>,
    );
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    expect(screen.getByLabelText("Notes")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "More details" }));
    expect(screen.getByText("Expanded details")).toBeInTheDocument();
    expect(screen.queryByText("Blocked hint")).toBeNull();
  });

  it("form controls are read-only, including ones a tab switch renders later", async () => {
    const user = userEvent.setup();
    render(
      <PreviewFrame>
        <Cockpit />
      </PreviewFrame>,
    );
    const amount = screen.getByLabelText("Loan amount") as HTMLInputElement;
    expect(amount.readOnly).toBe(true);
    expect(amount).toHaveAttribute("aria-readonly", "true");
    expect(screen.getByLabelText("Term")).toHaveAttribute("aria-readonly", "true");
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    await waitFor(() => expect((screen.getByLabelText("Notes") as HTMLTextAreaElement).readOnly).toBe(true));
  });

  it("typing in a field changes nothing, shows the blocked hint and reports the field", async () => {
    const user = userEvent.setup();
    const onBlocked = vi.fn();
    render(
      <PreviewFrame blockedHint="Blocked hint" onBlockedInteract={onBlocked}>
        <Cockpit />
      </PreviewFrame>,
    );
    const amount = screen.getByLabelText("Loan amount") as HTMLInputElement;
    await user.click(amount);
    await user.keyboard("9");
    expect(amount.value).toBe("425000");
    const status = screen.getByRole("status");
    expect(status).toHaveAttribute("aria-live", "polite");
    expect(status).toHaveTextContent("Blocked hint");
    expect(onBlocked).toHaveBeenCalledWith(amount);
  });

  it("moving the caret is not a change: no hint", async () => {
    const user = userEvent.setup();
    const onBlocked = vi.fn();
    render(
      <PreviewFrame blockedHint="Blocked hint" onBlockedInteract={onBlocked}>
        <Cockpit />
      </PreviewFrame>,
    );
    await user.click(screen.getByLabelText("Loan amount"));
    await user.keyboard("{ArrowLeft}{Home}{End}");
    expect(onBlocked).not.toHaveBeenCalled();
  });

  it("a checkbox does not toggle, a select does not change, paste is refused, and the form does not submit", async () => {
    const user = userEvent.setup();
    const onBlocked = vi.fn();
    render(
      <PreviewFrame blockedHint="Blocked hint" onBlockedInteract={onBlocked}>
        <Cockpit />
      </PreviewFrame>,
    );
    const box = screen.getByLabelText("Escrow") as HTMLInputElement;
    await user.click(box);
    expect(box.checked).toBe(false);
    const term = screen.getByLabelText("Term") as HTMLSelectElement;
    term.focus();
    fireEvent.keyDown(term, { key: "ArrowDown" });
    expect(term.value).toBe("30");
    fireEvent.paste(screen.getByLabelText("Loan amount"));
    // A-797: the submit never reaches the form at all (not merely default-prevented): no listener on it runs.
    const submit = vi.fn();
    screen.getByRole("button", { name: "Price it" }).closest("form")!.addEventListener("submit", submit);
    await user.click(screen.getByRole("button", { name: "Price it" }));
    expect(submit).not.toHaveBeenCalled();
    expect(onBlocked.mock.calls.length).toBeGreaterThanOrEqual(4);
  });

  it("the hint goes away after PREVIEW_BLOCKED_HINT_MS, and its timer is cleared on unmount", async () => {
    vi.useFakeTimers();
    const { unmount } = render(
      <PreviewFrame blockedHint="Blocked hint">
        <Cockpit />
      </PreviewFrame>,
    );
    fireEvent.keyDown(screen.getByLabelText("Loan amount"), { key: "9" });
    expect(screen.getByRole("status")).toHaveTextContent("Blocked hint");
    act(() => {
      vi.advanceTimersByTime(PREVIEW_BLOCKED_HINT_MS);
    });
    expect(screen.getByRole("status")).toHaveTextContent("");
    fireEvent.keyDown(screen.getByLabelText("Loan amount"), { key: "9" });
    expect(vi.getTimerCount()).toBeGreaterThan(0);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it("no blockedHint: the change is still refused and reported, with no text", () => {
    const onBlocked = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <Cockpit />
      </PreviewFrame>,
    );
    fireEvent.keyDown(screen.getByLabelText("Loan amount"), { key: "9" });
    expect(onBlocked).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("status")).toHaveTextContent("");
  });
});

describe("PreviewFrame — greyed", () => {
  it("dims the content, shows no label, hides it from assistive tech and makes it inert", () => {
    const { container } = render(
      <PreviewFrame mode="greyed" sampleLabel="Sample label" blockedHint="Blocked hint">
        <Cockpit />
      </PreviewFrame>,
    );
    expect(screen.queryByText("Sample label")).toBeNull();
    expect(screen.queryByRole("group")).toBeNull();
    const frame = container.querySelector('[data-mode="greyed"]') as HTMLElement;
    const content = frame.firstElementChild as HTMLElement;
    expect(content).toHaveAttribute("aria-hidden", "true");
    expect(content).toHaveAttribute("inert");
    expect(content.style.opacity).toBe("0.45");
    expect(content.className).toMatch(/pointer-events-none/);
    // Nothing inside reaches assistive tech.
    expect(screen.queryByRole("tab")).toBeNull();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("nothing inside can take focus: every focusable has tabindex -1, and Tab skips the content", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <>
        <button type="button">before</button>
        <PreviewFrame mode="greyed">
          <Cockpit />
        </PreviewFrame>
        <button type="button">after</button>
      </>,
    );
    const content = container.querySelector('[data-mode="greyed"]')!.firstElementChild as HTMLElement;
    const focusables = content.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea, [tabindex]");
    expect(focusables.length).toBeGreaterThan(5);
    for (const el of focusables) expect(el.tabIndex).toBe(-1);
    screen.getByRole("button", { name: "before" }).focus();
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole("button", { name: "after" }));
  });

  it("switching back to sample restores the tab order", () => {
    const { container, rerender } = render(
      <PreviewFrame mode="greyed">
        <Cockpit />
      </PreviewFrame>,
    );
    rerender(
      <PreviewFrame mode="sample">
        <Cockpit />
      </PreviewFrame>,
    );
    const tab = screen.getByRole("tab", { name: "Tab A" });
    expect(tab).not.toHaveAttribute("tabindex");
    expect(container.querySelector("[inert]")).toBeNull();
  });
});
