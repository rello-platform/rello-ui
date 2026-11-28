import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CurrencyInput } from "./CurrencyInput";

afterEach(() => cleanup());

describe("CurrencyInput (HI-05)", () => {
  it("groups thousands as you type and emits the number", async () => {
    const onValueChange = vi.fn();
    render(<CurrencyInput label="Monthly limit" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Monthly limit");
    await userEvent.type(input, "1234.5");
    expect(input).toHaveValue("$1,234.5");
    expect(onValueChange).toHaveBeenLastCalledWith(1234.5);
  });

  it("never goes negative and keeps at most two decimals", async () => {
    const onValueChange = vi.fn();
    render(<CurrencyInput label="Monthly limit" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Monthly limit");
    await userEvent.type(input, "-12.345");
    expect(input).toHaveValue("$12.34");
    expect(onValueChange).toHaveBeenLastCalledWith(12.34);
  });

  it("whole dollars only when cents={false}", async () => {
    render(<CurrencyInput label="Price" cents={false} />);
    const input = screen.getByLabelText("Price");
    await userEvent.type(input, "99.5");
    expect(input).toHaveValue("$995");
  });

  it("empty emits null, never 0 or NaN", async () => {
    const onValueChange = vi.fn();
    render(<CurrencyInput label="Monthly limit" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Monthly limit");
    await userEvent.type(input, "5");
    await userEvent.clear(input);
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("shows a controlled numeric value, including 0", () => {
    render(<CurrencyInput label="Cap" value={0} onValueChange={() => {}} />);
    expect(screen.getByLabelText("Cap")).toHaveValue("$0");
  });

  it("decimal keypad and 44 px", () => {
    render(<CurrencyInput aria-label="Amount" />);
    const input = screen.getByLabelText("Amount");
    expect(input).toHaveAttribute("inputmode", "decimal");
    expect(input.className).toContain("min-h-[44px]");
  });
});
