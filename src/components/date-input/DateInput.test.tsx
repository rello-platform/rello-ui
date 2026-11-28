import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DateInput } from "./DateInput";

afterEach(() => cleanup());

describe("DateInput (HI-05)", () => {
  it("formats MM/DD/YYYY as you type and emits the ISO date", async () => {
    const onValueChange = vi.fn();
    render(<DateInput label="Start date" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Start date");
    await userEvent.type(input, "12312026");
    expect(input).toHaveValue("12/31/2026");
    expect(onValueChange).toHaveBeenLastCalledWith("2026-12-31");
  });

  it("13/40/2026 emits null and shows the field's error", async () => {
    const onValueChange = vi.fn();
    render(<DateInput label="Start date" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Start date");
    await userEvent.type(input, "13402026");
    expect(input).toHaveValue("13/40/2026");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent(/MM\/DD\/YYYY/);
  });

  it("a partial date shows no error until blur", async () => {
    render(<DateInput label="Start date" />);
    const input = screen.getByLabelText("Start date");
    await userEvent.type(input, "123");
    expect(input).toHaveAttribute("aria-invalid", "false");
    await userEvent.tab();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("letters are dropped", async () => {
    render(<DateInput label="Start date" />);
    const input = screen.getByLabelText("Start date");
    await userEvent.type(input, "1a2b");
    expect(input).toHaveValue("12");
  });

  it("shows a controlled ISO value", () => {
    render(<DateInput label="Start date" value="2026-01-05" onValueChange={() => {}} />);
    expect(screen.getByLabelText("Start date")).toHaveValue("01/05/2026");
  });

  it("numeric keypad and 44 px", () => {
    render(<DateInput aria-label="Ends" />);
    const input = screen.getByLabelText("Ends");
    expect(input).toHaveAttribute("inputmode", "numeric");
    expect(input.className).toContain("min-h-[44px]");
  });
});
