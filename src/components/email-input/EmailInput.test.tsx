import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmailInput } from "./EmailInput";

afterEach(() => cleanup());

describe("EmailInput (HI-05)", () => {
  it('"Dave@X.COM " emits "dave@x.com"', async () => {
    const onValueChange = vi.fn();
    render(<EmailInput label="Email" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "Dave@X.COM ");
    expect(onValueChange).toHaveBeenLastCalledWith("dave@x.com");
    await userEvent.tab();
    expect(input).toHaveValue("dave@x.com");
  });

  it("lowercases as you type", async () => {
    render(<EmailInput label="Email" />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "AB");
    expect(input).toHaveValue("ab");
  });

  it("an empty field emits null", async () => {
    const onValueChange = vi.fn();
    render(<EmailInput label="Email" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Email");
    await userEvent.type(input, "a");
    await userEvent.clear(input);
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("email type, email keypad, 44 px", () => {
    render(<EmailInput aria-label="Work email" />);
    const input = screen.getByLabelText("Work email");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("inputmode", "email");
    expect(input).toHaveAttribute("autocomplete", "email");
    expect(input.className).toContain("min-h-[44px]");
  });
});
