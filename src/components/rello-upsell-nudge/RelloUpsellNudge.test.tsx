import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { RelloUpsellNudge } from "./RelloUpsellNudge";

const baseProps = {
  seam: "pages-create-custom",
  headline: "Upgrade to Rello to create custom landing pages",
  body: "Custom landing-page authoring lives in Rello.",
  onClick: () => {},
  onDismiss: () => {},
};

describe("RelloUpsellNudge", () => {
  it("renders headline + body + default CTA label", () => {
    render(<RelloUpsellNudge {...baseProps} />);
    expect(screen.getByRole("region", { name: /rello upgrade option/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: baseProps.headline })).toBeInTheDocument();
    expect(screen.getByText(baseProps.body)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upgrade to Rello" })).toBeInTheDocument();
  });

  it("renders custom ctaLabel when provided", () => {
    render(<RelloUpsellNudge {...baseProps} ctaLabel="See plans" />);
    expect(screen.getByRole("button", { name: "See plans" })).toBeInTheDocument();
  });

  it("invokes onClick when CTA button clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<RelloUpsellNudge {...baseProps} onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Upgrade to Rello" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("invokes onDismiss when × button clicked", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<RelloUpsellNudge {...baseProps} onDismiss={onDismiss} />);
    await user.click(screen.getByRole("button", { name: /dismiss upgrade nudge/i }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("invokes onDismiss when Escape is pressed while focus is inside the nudge", async () => {
    const user = userEvent.setup();
    const onDismiss = vi.fn();
    render(<RelloUpsellNudge {...baseProps} onDismiss={onDismiss} />);
    const cta = screen.getByRole("button", { name: "Upgrade to Rello" });
    cta.focus();
    await user.keyboard("{Escape}");
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("exposes seam via data attribute for telemetry correlation", () => {
    render(<RelloUpsellNudge {...baseProps} seam="revenue-attribution" />);
    const region = screen.getByRole("region", { name: /rello upgrade option/i });
    expect(region).toHaveAttribute("data-seam", "revenue-attribution");
  });

  it("renders the optional icon when provided", () => {
    render(
      <RelloUpsellNudge
        {...baseProps}
        icon={<svg data-testid="upsell-icon" aria-hidden="true" />}
      />,
    );
    expect(screen.getByTestId("upsell-icon")).toBeInTheDocument();
  });

  it("dismiss button meets 44px minimum touch-target via inline class", () => {
    render(<RelloUpsellNudge {...baseProps} />);
    const dismiss = screen.getByRole("button", { name: /dismiss upgrade nudge/i });
    expect(dismiss.className).toMatch(/min-w-\[44px\]/);
    expect(dismiss.className).toMatch(/min-h-\[44px\]/);
  });

  it("CTA button meets 44px minimum touch-target via inline class", () => {
    render(<RelloUpsellNudge {...baseProps} />);
    const cta = screen.getByRole("button", { name: "Upgrade to Rello" });
    expect(cta.className).toMatch(/min-h-\[44px\]/);
  });
});
