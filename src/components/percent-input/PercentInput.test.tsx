import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PercentInput } from "./PercentInput";

afterEach(() => cleanup());

describe("PercentInput (HI-05)", () => {
  it('"7.25" emits 7.25', async () => {
    const onValueChange = vi.fn();
    render(<PercentInput label="Rate" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Rate");
    await userEvent.type(input, "7.25");
    expect(input).toHaveValue("7.25");
    expect(onValueChange).toHaveBeenLastCalledWith(7.25);
  });

  it("drops letters and a second point", async () => {
    render(<PercentInput label="Rate" />);
    const input = screen.getByLabelText("Rate");
    await userEvent.type(input, "6.a5.1");
    expect(input).toHaveValue("6.51");
  });

  it("a value above max emits null and shows the error", async () => {
    const onValueChange = vi.fn();
    render(<PercentInput label="Rate" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Rate");
    await userEvent.type(input, "101");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("100");
  });

  it("shows a % sign the screen reader does not read twice", () => {
    const { container } = render(<PercentInput label="Rate" />);
    const sign = container.querySelector("[data-percent-sign]");
    expect(sign).toHaveTextContent("%");
    expect(sign).toHaveAttribute("aria-hidden", "true");
  });

  it("shows a controlled value", () => {
    render(<PercentInput label="Rate" value={6.875} onValueChange={() => {}} />);
    expect(screen.getByLabelText("Rate")).toHaveValue("6.875");
  });

  it("decimal keypad and 44 px", () => {
    render(<PercentInput aria-label="Down payment" />);
    const input = screen.getByLabelText("Down payment");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input.className).toContain("min-h-[44px]");
  });
});
