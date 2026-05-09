import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MultiFeedbackWidget, type MultiFeedbackOption } from "./MultiFeedbackWidget";

const SIMPLE: ReadonlyArray<MultiFeedbackOption> = [
  { key: "yes", label: "Yes" },
  { key: "no", label: "No" },
];

const WITH_CORRECTION: ReadonlyArray<MultiFeedbackOption> = [
  { key: "spot-on", label: "Spot on" },
  { key: "off", label: "Off", requiresCorrectionText: true },
];

describe("MultiFeedbackWidget", () => {
  it("renders all options with the prompt", () => {
    render(
      <MultiFeedbackWidget
        prompt="How does this sound?"
        options={SIMPLE}
        onSelect={() => {}}
      />,
    );
    expect(screen.getByText("How does this sound?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Yes" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "No" })).toBeInTheDocument();
  });

  it("fires onSelect immediately for non-correction options", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MultiFeedbackWidget options={SIMPLE} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Yes" }));
    expect(onSelect).toHaveBeenCalledWith("yes");
    expect(screen.getByText("Thanks for your feedback!")).toBeInTheDocument();
  });

  it("expands textarea + Cancel/Submit for correction-text options", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MultiFeedbackWidget options={WITH_CORRECTION} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Off" }));
    expect(screen.getByLabelText("Correction text")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("Cancel returns to idle state without firing onSelect", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MultiFeedbackWidget options={WITH_CORRECTION} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Off" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onSelect).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Off" })).toBeInTheDocument();
  });

  it("Submit fires onSelect with key and text", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MultiFeedbackWidget options={WITH_CORRECTION} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Off" }));
    await user.type(screen.getByLabelText("Correction text"), "too formal");
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSelect).toHaveBeenCalledWith("off", "too formal");
  });

  it("Submit with empty text fires onSelect(key, '')", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MultiFeedbackWidget options={WITH_CORRECTION} onSelect={onSelect} />);
    await user.click(screen.getByRole("button", { name: "Off" }));
    await user.click(screen.getByRole("button", { name: "Submit" }));
    expect(onSelect).toHaveBeenCalledWith("off", "");
  });

  it("disabled blocks all option clicks", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<MultiFeedbackWidget options={SIMPLE} onSelect={onSelect} disabled />);
    await user.click(screen.getByRole("button", { name: "Yes" }));
    expect(onSelect).not.toHaveBeenCalled();
  });
});
