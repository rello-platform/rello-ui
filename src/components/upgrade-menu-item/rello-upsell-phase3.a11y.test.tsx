import { describe, it, expect } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe, toHaveNoViolations } from "jest-axe";
import { RelloUpsellNudge } from "../rello-upsell-nudge/RelloUpsellNudge";
import { TrialCountdownBanner } from "../trial-countdown-banner/TrialCountdownBanner";
import { TrialStartModal } from "../trial-start-modal/TrialStartModal";
import { UpgradeMenuItem } from "./UpgradeMenuItem";

expect.extend(toHaveNoViolations);

/** jest-axe scans of every RELLO UPSELL Phase 3 surface, in each state a user can reach. */
describe("RELLO UPSELL Phase 3 — axe", () => {
  it("nudge with tokens and an expanded detail panel", async () => {
    const { container } = render(
      <main>
        <RelloUpsellNudge
          seam="lead-ready-threshold"
          headline="This lead is ready."
          body="Marcus closed. {{monthlyPrice}}/mo after trial. {{roiCopy}}"
          monthlyPrice="$199"
          roiCopy="One closing covers it."
          details={<p>Rello pre-fills the intake.</p>}
          onClick={() => {}}
          onDismiss={() => {}}
        />
      </main>,
    );
    fireEvent.click(screen.getByRole("button", { name: "How it works" }));
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each([
    ["days", 5 * 86_400_000],
    ["urgent hours", 5 * 3_600_000],
  ])("trial banner (%s) with a CTA", async (_label, ms) => {
    const { container } = render(
      <main>
        <TrialCountdownBanner trialEndsAt={Date.now() + ms} ctaHref="/upgrade" />
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it("upgrade menu item inside a nav", async () => {
    const { container } = render(
      <nav aria-label="Primary">
        <UpgradeMenuItem href="/upgrade" isEntitled={false} isEmbed={false} active />
      </nav>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it.each([
    ["confirm", { status: "started" as const }],
    ["started", { status: "started" as const, trialEndsAt: "2026-11-22T18:00:00.000Z" }],
    ["already used", { status: "already-used" as const, trialEndsAt: "2026-10-01T18:00:00.000Z" }],
    ["error", { status: "error" as const, message: "Rello is down." }],
  ])("trial-start modal — %s state", async (label, result) => {
    const user = userEvent.setup();
    render(
      <TrialStartModal open onClose={() => {}} onConfirm={() => Promise.resolve(result)} upgradeHref="/upgrade" />,
    );
    const dialog = await screen.findByRole("dialog");
    if (label !== "confirm") {
      await user.click(screen.getByRole("button", { name: "Start trial" }));
      await waitFor(() => expect(screen.queryByRole("button", { name: "Starting your trial…" })).toBeNull());
    }
    expect(await axe(dialog)).toHaveNoViolations();
  });
});
