/**
 * Test-only driver for the TrialStartModal byte-equality check (v2.39.0).
 *
 * Renders one corpus case with a given TrialStartModal implementation, drives
 * it to the case's state (clicks the confirm button when the case has an
 * outcome), and returns the dialog's outerHTML with Radix's generated ids
 * normalised (React's useId counter is global, so ids depend on test order).
 *
 * Used twice, by the same code path:
 *   - generate-v2.38.0-snapshot.test.tsx, with the v2.38.0 BUILD
 *     (dist/client.js at 19f04a9, read with `git show`);
 *   - TrialStartModal.legacy.test.tsx, with the current source.
 * Not exported from the package (tsup bundles only src/index.ts, src/client.ts
 * and src/email/index.ts).
 */
import * as React from "react";
import { expect } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";

export interface ModalCase {
  name: string;
  /** Extra props (labels, successAction). */
  props?: Record<string, unknown>;
  /** What onConfirm does. Absent: the confirm step is captured, nothing is clicked. */
  outcome?: { resolve: unknown } | { reject: string };
}

export const MODAL_CORPUS: ModalCase[] = [
  { name: "confirm step, default copy" },
  {
    name: "confirm step, custom copy",
    props: {
      title: "Try Rello free",
      description: "Rello works every lead Harvest Home finds.",
      confirmLabel: "Start 14-day free trial",
      cancelLabel: "Maybe later",
    },
  },
  { name: "started, no end date", outcome: { resolve: { status: "started" } } },
  { name: "started, end date", outcome: { resolve: { status: "started", trialEndsAt: "2099-06-15T12:00:00.000Z" } } },
  { name: "started, unreadable end date", outcome: { resolve: { status: "started", trialEndsAt: "not a date" } } },
  {
    name: "started, success action",
    props: { successAction: { label: "Open Pathfinder Pro intake", href: "/pfp/intake" } },
    outcome: { resolve: { status: "started", trialEndsAt: "2099-06-15T12:00:00.000Z" } },
  },
  {
    name: "already used, trial still running",
    outcome: { resolve: { status: "already-used", trialEndsAt: "2099-06-15T12:00:00.000Z" } },
  },
  {
    name: "already used, trial ended",
    outcome: { resolve: { status: "already-used", trialEndsAt: "2001-01-15T12:00:00.000Z" } },
  },
  { name: "already used, no end date", outcome: { resolve: { status: "already-used" } } },
  {
    name: "already used, custom upgrade label",
    props: { upgradeHref: "/settings?tab=credits", upgradeLabel: "Go to Credits & Billing" },
    outcome: { resolve: { status: "already-used" } },
  },
  { name: "error, rejected request", outcome: { reject: "network down" } },
  { name: "error, no message", outcome: { resolve: { status: "error" } } },
  { name: "error, blank message", outcome: { resolve: { status: "error", message: "   " } } },
  {
    name: "error, with message",
    outcome: { resolve: { status: "error", message: "Rello is down for maintenance." } },
  },
  {
    name: "error, custom cancel label",
    props: { cancelLabel: "Maybe later" },
    outcome: { resolve: { status: "error", message: "Rello is down for maintenance." } },
  },
  { name: "error, unreadable result", outcome: { resolve: { status: "no-such-status" } } },
];

function normalise(html: string): string {
  return html.replace(/radix-[^"\s]+/g, "radix-ID");
}

export async function driveModal(
  Modal: React.ComponentType<Record<string, unknown>>,
  c: ModalCase,
): Promise<string> {
  const onConfirm = () => {
    if (!c.outcome) return Promise.resolve({ status: "started" });
    if ("reject" in c.outcome) return Promise.reject(new Error(c.outcome.reject));
    return Promise.resolve(c.outcome.resolve);
  };
  try {
    render(
      React.createElement(Modal, {
        open: true,
        onClose: () => {},
        onConfirm,
        upgradeHref: "/upgrade",
        ...c.props,
      }),
    );
    if (c.outcome) {
      const label = typeof c.props?.confirmLabel === "string" ? c.props.confirmLabel : "Start trial";
      await act(async () => {
        fireEvent.click(screen.getByRole("button", { name: label }));
      });
      await waitFor(() => expect(screen.queryByText(/Starting your trial/)).toBeNull());
    }
    const dialog = screen.getByRole("dialog");
    return normalise(dialog.outerHTML);
  } finally {
    cleanup();
  }
}
