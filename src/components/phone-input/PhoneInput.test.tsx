import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneInput } from "./PhoneInput";

afterEach(() => cleanup());

describe("PhoneInput (HI-05)", () => {
  it("typing 8015550123 shows (801) 555-0123 and emits +18015550123", async () => {
    const onValueChange = vi.fn();
    render(<PhoneInput label="Phone" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Phone");
    await userEvent.type(input, "8015550123");
    expect(input).toHaveValue("(801) 555-0123");
    expect(onValueChange).toHaveBeenLastCalledWith("+18015550123");
  });

  it('pasting "(801) 555-12a34" leaves digits only', async () => {
    const onValueChange = vi.fn();
    render(<PhoneInput label="Phone" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Phone");
    input.focus();
    await userEvent.paste("(801) 555-12a34");
    expect(input).toHaveValue("(801) 555-1234");
    expect(onValueChange).toHaveBeenLastCalledWith("+18015551234");
  });

  it("an incomplete number emits null", async () => {
    const onValueChange = vi.fn();
    render(<PhoneInput label="Phone" onValueChange={onValueChange} />);
    await userEvent.type(screen.getByLabelText("Phone"), "80155");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("shows a controlled E.164 value formatted", () => {
    render(<PhoneInput label="Phone" value="+18015550123" onValueChange={() => {}} />);
    expect(screen.getByLabelText("Phone")).toHaveValue("(801) 555-0123");
  });

  it("is a tel input with a numeric keypad, 44 px tall, and works with aria-label alone", () => {
    render(<PhoneInput aria-label="Mobile phone" />);
    const input = screen.getByLabelText("Mobile phone");
    expect(input).toHaveAttribute("type", "tel");
    expect(input).toHaveAttribute("inputmode", "tel");
    expect(input).toHaveAttribute("autocomplete", "tel-national");
    expect(input.className).toContain("min-h-[44px]");
  });
});
