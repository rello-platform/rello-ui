import * as React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrialStartModal, type TrialStartModalProps } from "./TrialStartModal";
import type { TrialStartResult } from "./types";

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

const baseProps: TrialStartModalProps = {
  open: true,
  onClose: () => {},
  onConfirm: () => Promise.resolve({ status: "started" }),
  upgradeHref: "/upgrade",
};

function confirmButton() {
  return screen.getByRole("button", { name: "Start trial" });
}

afterEach(() => {
  vi.restoreAllMocks();
});

/** An opener button + the modal, the way a spoke mounts it. */
function Harness(props: Partial<TrialStartModalProps> & { onCloseSpy?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const { onCloseSpy, ...rest } = props;
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Start your 14-day free trial
      </button>
      <TrialStartModal
        {...baseProps}
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

describe("TrialStartModal — dialog contract", () => {
  it("renders nothing while closed", () => {
    render(<TrialStartModal {...baseProps} open={false} />);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("is a labelled modal dialog", () => {
    render(<TrialStartModal {...baseProps} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Start your 14-day free trial");
    expect(confirmButton().className).toMatch(/min-h-\[44px\]/);
    expect(screen.getByRole("button", { name: "Not now" }).className).toMatch(/min-h-\[44px\]/);
  });

  it("closes on Escape and returns focus to the button that opened it", async () => {
    const user = userEvent.setup();
    const onCloseSpy = vi.fn();
    render(<Harness onCloseSpy={onCloseSpy} />);
    const opener = screen.getByRole("button", { name: "Start your 14-day free trial" });
    await user.click(opener);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true));
    await user.keyboard("{Escape}");
    expect(onCloseSpy).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await waitFor(() => expect(document.activeElement).toBe(opener));
  });

  it("keeps Tab focus inside the dialog", async () => {
    const user = userEvent.setup();
    render(
      <>
        <button type="button">outside before</button>
        <TrialStartModal {...baseProps} />
        <button type="button">outside after</button>
      </>,
    );
    const dialog = screen.getByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    for (let i = 0; i < 6; i += 1) {
      await user.tab();
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
    for (let i = 0; i < 6; i += 1) {
      await user.tab({ shift: true });
      expect(dialog.contains(document.activeElement)).toBe(true);
    }
  });

  it("pulls focus back inside when something outside takes it", async () => {
    render(
      <>
        <button type="button">outside</button>
        <TrialStartModal {...baseProps} />
      </>,
    );
    const dialog = screen.getByRole("dialog");
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    act(() => {
      screen.getByRole("button", { name: "outside", hidden: true }).focus();
    });
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("calls onClose from the cancel button and does not call onConfirm", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    const onConfirm = vi.fn(() => Promise.resolve({ status: "started" } as TrialStartResult));
    render(<TrialStartModal {...baseProps} onClose={onClose} onConfirm={onConfirm} />);
    await user.click(screen.getByRole("button", { name: "Not now" }));
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("removes its Escape listener when closed or unmounted", async () => {
    const onClose = vi.fn();
    const { rerender, unmount } = render(<TrialStartModal {...baseProps} onClose={onClose} />);
    rerender(<TrialStartModal {...baseProps} onClose={onClose} open={false} />);
    fireEvent.keyDown(document, { key: "Escape" });
    unmount();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).not.toHaveBeenCalled();
  });
});

describe("TrialStartModal — states", () => {
  it("shows a pending state, then success, and reports the result", async () => {
    const user = userEvent.setup();
    const d = deferred<TrialStartResult>();
    const onResult = vi.fn();
    render(<TrialStartModal {...baseProps} onConfirm={() => d.promise} onResult={onResult} />);
    await user.click(confirmButton());
    const pending = screen.getByRole("button", { name: "Starting your trial…" });
    expect(pending).toBeDisabled();
    expect(pending).toHaveAttribute("aria-busy", "true");
    await act(async () => {
      d.resolve({ status: "started", trialEndsAt: "2026-11-22T18:00:00.000Z" });
    });
    expect(await screen.findByText("Your Rello trial has started.")).toBeInTheDocument();
    expect(screen.getByText("It runs until November 22, 2026.")).toBeInTheDocument();
    expect(onResult).toHaveBeenCalledWith({ status: "started", trialEndsAt: "2026-11-22T18:00:00.000Z" });
    expect(screen.queryByRole("button", { name: "Start trial" })).toBeNull();
  });

  it("renders the success action link when given", async () => {
    const user = userEvent.setup();
    render(
      <TrialStartModal
        {...baseProps}
        successAction={{ label: "Open Pathfinder Pro intake", href: "https://pfp.example/intake/1" }}
      />,
    );
    await user.click(confirmButton());
    const link = await screen.findByRole("link", { name: "Open Pathfinder Pro intake" });
    expect(link).toHaveAttribute("href", "https://pfp.example/intake/1");
    expect(link.className).toMatch(/min-h-\[44px\]/);
  });

  it("omits the end-date sentence on success when the date is missing or unreadable", async () => {
    const user = userEvent.setup();
    render(
      <TrialStartModal
        {...baseProps}
        onConfirm={() => Promise.resolve({ status: "started", trialEndsAt: "garbage" })}
      />,
    );
    await user.click(confirmButton());
    expect(await screen.findByText("Your Rello trial has started.")).toBeInTheDocument();
    expect(screen.queryByText(/runs until/)).toBeNull();
    expect(screen.getByRole("dialog").textContent).not.toMatch(/Invalid Date|NaN/);
  });

  it("409 already used: shows the existing end date and the upgrade link", async () => {
    const user = userEvent.setup();
    const onResult = vi.fn();
    render(
      <TrialStartModal
        {...baseProps}
        upgradeHref="/billing/upgrade?source=homeready"
        onConfirm={() => Promise.resolve({ status: "already-used", trialEndsAt: "2026-10-01T18:00:00.000Z" })}
        onResult={onResult}
      />,
    );
    await user.click(confirmButton());
    expect(await screen.findByText("You've already used your Rello trial.")).toBeInTheDocument();
    expect(screen.getByText("Your trial ended on October 1, 2026.")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: "Upgrade to Rello" });
    expect(link).toHaveAttribute("href", "/billing/upgrade?source=homeready");
    expect(link.className).toMatch(/min-h-\[44px\]/);
    expect(screen.queryByRole("button", { name: "Start trial" })).toBeNull();
    expect(onResult).toHaveBeenCalledWith({ status: "already-used", trialEndsAt: "2026-10-01T18:00:00.000Z" });
  });

  it("409 with a trial still running says when it runs until", async () => {
    const user = userEvent.setup();
    const future = new Date(Date.now() + 5 * 24 * 3600_000);
    future.setHours(12, 0, 0, 0);
    const expected = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(future);
    render(
      <TrialStartModal
        {...baseProps}
        onConfirm={() => Promise.resolve({ status: "already-used", trialEndsAt: future })}
      />,
    );
    await user.click(confirmButton());
    expect(await screen.findByText(`Your trial runs until ${expected}.`)).toBeInTheDocument();
  });

  it("409 with no end date omits the date sentence but keeps the upgrade link", async () => {
    const user = userEvent.setup();
    render(<TrialStartModal {...baseProps} onConfirm={() => Promise.resolve({ status: "already-used" })} />);
    await user.click(confirmButton());
    expect(await screen.findByText("You've already used your Rello trial.")).toBeInTheDocument();
    expect(screen.queryByText(/ended on|runs until/)).toBeNull();
    expect(screen.getByRole("link", { name: "Upgrade to Rello" })).toBeInTheDocument();
  });

  it("a rejected request shows an alert with retry, and retry can succeed", async () => {
    const user = userEvent.setup();
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onConfirm = vi
      .fn<() => Promise<TrialStartResult>>()
      .mockRejectedValueOnce(new Error("network down"))
      .mockResolvedValueOnce({ status: "started" });
    render(<TrialStartModal {...baseProps} onConfirm={onConfirm} />);
    await user.click(confirmButton());
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("We couldn't start your trial. Check your connection and try again.");
    expect(console.error).toHaveBeenCalled();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(await screen.findByText("Your Rello trial has started.")).toBeInTheDocument();
    expect(onConfirm).toHaveBeenCalledTimes(2);
  });

  it("an error result shows its message with retry", async () => {
    const user = userEvent.setup();
    render(
      <TrialStartModal
        {...baseProps}
        onConfirm={() => Promise.resolve({ status: "error", message: "Rello is down for maintenance." })}
      />,
    );
    await user.click(confirmButton());
    expect(await screen.findByRole("alert")).toHaveTextContent("We couldn't start your trial. Rello is down for maintenance.");
    expect(screen.getByRole("button", { name: "Try again" }).className).toMatch(/min-h-\[44px\]/);
  });

  it("an unreadable result is an error, never a success", async () => {
    const user = userEvent.setup();
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onResult = vi.fn();
    render(
      <TrialStartModal
        {...baseProps}
        onConfirm={() => Promise.resolve(undefined as unknown as TrialStartResult)}
        onResult={onResult}
      />,
    );
    await user.click(confirmButton());
    expect(await screen.findByRole("alert")).toBeInTheDocument();
    expect(screen.queryByText("Your Rello trial has started.")).toBeNull();
    expect(onResult).toHaveBeenCalledWith(expect.objectContaining({ status: "error" }));
  });

  it("an onConfirm that throws synchronously is an error state, not a crash", async () => {
    const user = userEvent.setup();
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(
      <TrialStartModal
        {...baseProps}
        onConfirm={() => {
          throw new Error("boom");
        }}
      />,
    );
    await user.click(confirmButton());
    expect(await screen.findByRole("alert")).toBeInTheDocument();
  });
});

describe("TrialStartModal — double submit", () => {
  it("calls onConfirm once when confirm fires twice before React re-renders", async () => {
    const d = deferred<TrialStartResult>();
    const onConfirm = vi.fn(() => d.promise);
    render(<TrialStartModal {...baseProps} onConfirm={onConfirm} />);
    const button = confirmButton();
    // Both clicks land in one batch, so the button is still enabled for the
    // second one: only the ref guard stands between this and two trial-starts.
    act(() => {
      button.click();
      button.click();
    });
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await act(async () => {
      d.resolve({ status: "started" });
    });
    expect(await screen.findByText("Your Rello trial has started.")).toBeInTheDocument();
  });

  it("releases the guard after an error so the user can retry", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const onConfirm = vi
      .fn<() => Promise<TrialStartResult>>()
      .mockRejectedValueOnce(new Error("timeout"))
      .mockResolvedValueOnce({ status: "started" });
    render(<TrialStartModal {...baseProps} onConfirm={onConfirm} />);
    await act(async () => {
      confirmButton().click();
    });
    const retry = await screen.findByRole("button", { name: "Try again" });
    await act(async () => {
      retry.click();
    });
    expect(onConfirm).toHaveBeenCalledTimes(2);
    expect(await screen.findByText("Your Rello trial has started.")).toBeInTheDocument();
  });

  it("keeps the pending state (and the request) when closed and reopened mid-request", async () => {
    const d = deferred<TrialStartResult>();
    const onConfirm = vi.fn(() => d.promise);
    const { rerender } = render(<TrialStartModal {...baseProps} onConfirm={onConfirm} />);
    await act(async () => {
      confirmButton().click();
    });
    rerender(<TrialStartModal {...baseProps} onConfirm={onConfirm} open={false} />);
    rerender(<TrialStartModal {...baseProps} onConfirm={onConfirm} open />);
    expect(screen.getByRole("button", { name: "Starting your trial…" })).toBeDisabled();
    expect(screen.queryByRole("button", { name: "Start trial" })).toBeNull();
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await act(async () => {
      d.resolve({ status: "started" });
    });
  });
});

describe("TrialStartModal — unmount", () => {
  it("unmounting mid-request sets no state, logs nothing, and still reports the outcome", async () => {
    const d = deferred<TrialStartResult>();
    const onResult = vi.fn();
    const errors = vi.spyOn(console, "error").mockImplementation(() => {});
    const { unmount } = render(<TrialStartModal {...baseProps} onConfirm={() => d.promise} onResult={onResult} />);
    await act(async () => {
      confirmButton().click();
    });
    unmount();
    await act(async () => {
      d.resolve({ status: "started" });
    });
    // The trial did start on Rello's side: the spoke still hears it.
    expect(onResult).toHaveBeenCalledWith({ status: "started" });
    expect(errors).not.toHaveBeenCalled();
  });
});
