/**
 * v2.39.0 — the "unknown" trial-start outcome (Platform KA 875, GD-541).
 *
 * A spoke whose request may or may not have started the trial (the response
 * was lost, a gateway 5xx, Rello said it could not tell) returns
 * { status: "unknown" }. The modal must say so honestly — "We couldn't confirm
 * whether your trial started." — and never "We couldn't start your trial.",
 * and its action is "Check my plan", which calls onConfirm again so the spoke
 * can read the plan before any new start request.
 */
import * as React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TrialStartModal, type TrialStartModalProps } from "./TrialStartModal";
import type { TrialStartResult } from "./types";

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => {
    resolve = res;
  });
  return { promise, resolve };
}

const baseProps: TrialStartModalProps = {
  open: true,
  onClose: () => {},
  onConfirm: () => Promise.resolve({ status: "unknown" }),
  upgradeHref: "/upgrade",
};

afterEach(() => {
  vi.restoreAllMocks();
});

async function reachUnknown(props: Partial<TrialStartModalProps> = {}) {
  const user = userEvent.setup();
  render(<TrialStartModal {...baseProps} {...props} />);
  await user.click(screen.getByRole("button", { name: "Start trial" }));
  await screen.findByRole("button", { name: "Check my plan" });
  return user;
}

describe("TrialStartModal — unknown outcome", () => {
  it("says it could not confirm, with the spoke's message, and never says it couldn't start", async () => {
    await reachUnknown({
      onConfirm: () => Promise.resolve({ status: "unknown", message: "We lost the connection before Rello answered." }),
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent(
      "We couldn't confirm whether your trial started. We lost the connection before Rello answered.",
    );
    expect(screen.getByRole("dialog")).not.toHaveTextContent("couldn't start");
    expect(screen.queryByRole("button", { name: "Try again" })).toBeNull();
    expect(screen.queryByText("Your Rello trial has started.")).toBeNull();
  });

  it("uses a default line when the message is missing or blank", async () => {
    await reachUnknown({ onConfirm: () => Promise.resolve({ status: "unknown", message: "   " }) });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "We couldn't confirm whether your trial started. Check your plan to see whether it did.",
    );
    expect(screen.getByRole("dialog")).not.toHaveTextContent("couldn't start");
  });

  it("offers Check my plan and the cancel button, both 44px", async () => {
    await reachUnknown({ cancelLabel: "Maybe later" });
    expect(screen.getByRole("button", { name: "Check my plan" }).className).toMatch(/min-h-\[44px\]/);
    expect(screen.getByRole("button", { name: "Maybe later" }).className).toMatch(/min-h-\[44px\]/);
  });

  it("is never read as an error: onResult gets the unknown result as sent", async () => {
    const onResult = vi.fn();
    await reachUnknown({ onConfirm: () => Promise.resolve({ status: "unknown", message: "m" }), onResult });
    expect(onResult).toHaveBeenCalledTimes(1);
    expect(onResult).toHaveBeenCalledWith({ status: "unknown", message: "m" });
  });

  it("Check my plan calls onConfirm again, once, and shows what the spoke found", async () => {
    const onConfirm = vi
      .fn<() => Promise<TrialStartResult>>()
      .mockResolvedValueOnce({ status: "unknown" })
      .mockResolvedValueOnce({ status: "started", trialEndsAt: "2099-06-15T12:00:00.000Z" });
    const user = await reachUnknown({ onConfirm });
    await user.click(screen.getByRole("button", { name: "Check my plan" }));
    expect(await screen.findByText("Your Rello trial has started.")).toBeInTheDocument();
    expect(onConfirm).toHaveBeenCalledTimes(2);
  });

  it("Check my plan can land unknown again", async () => {
    const onConfirm = vi.fn<() => Promise<TrialStartResult>>().mockResolvedValue({ status: "unknown" });
    const user = await reachUnknown({ onConfirm });
    await user.click(screen.getByRole("button", { name: "Check my plan" }));
    await waitFor(() => expect(onConfirm).toHaveBeenCalledTimes(2));
    expect(await screen.findByRole("button", { name: "Check my plan" })).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("We couldn't confirm whether your trial started.");
  });

  it("two Check my plan clicks before a re-render call onConfirm once", async () => {
    const d = deferred<TrialStartResult>();
    const onConfirm = vi
      .fn<() => Promise<TrialStartResult>>()
      .mockResolvedValueOnce({ status: "unknown" })
      .mockReturnValueOnce(d.promise);
    await reachUnknown({ onConfirm });
    const check = screen.getByRole("button", { name: "Check my plan" });
    act(() => {
      fireEvent.click(check);
      fireEvent.click(check);
    });
    expect(onConfirm).toHaveBeenCalledTimes(2);
    await act(async () => {
      d.resolve({ status: "started" });
    });
    expect(await screen.findByText("Your Rello trial has started.")).toBeInTheDocument();
    expect(onConfirm).toHaveBeenCalledTimes(2);
  });

  it("control: an error still starts fresh when closed and reopened (unchanged from v2.38.0)", async () => {
    const user = userEvent.setup();
    function Harness() {
      const [open, setOpen] = React.useState(true);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <TrialStartModal
            {...baseProps}
            onConfirm={() => Promise.resolve({ status: "error", message: "Rello is down." })}
            open={open}
            onClose={() => setOpen(false)}
          />
        </>
      );
    }
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Start trial" }));
    await screen.findByRole("button", { name: "Try again" });
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("button", { name: "Start trial" })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("keeps the unknown state when closed and reopened, so the next action is still Check my plan", async () => {
    const user = userEvent.setup();
    function Harness() {
      const [open, setOpen] = React.useState(true);
      return (
        <>
          <button type="button" onClick={() => setOpen(true)}>
            Open
          </button>
          <TrialStartModal {...baseProps} open={open} onClose={() => setOpen(false)} />
        </>
      );
    }
    render(<Harness />);
    await user.click(screen.getByRole("button", { name: "Start trial" }));
    await screen.findByRole("button", { name: "Check my plan" });
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(await screen.findByRole("button", { name: "Check my plan" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Start trial" })).toBeNull();
  });
});
