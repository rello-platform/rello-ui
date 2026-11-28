import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UrlInput } from "./UrlInput";

afterEach(() => cleanup());

describe("UrlInput (HI-05)", () => {
  it("adds https:// on blur when there is no scheme", async () => {
    const onValueChange = vi.fn();
    render(<UrlInput label="Website" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Website");
    await userEvent.type(input, "example.com/About");
    await userEvent.tab();
    expect(input).toHaveValue("https://example.com/About");
    expect(onValueChange).toHaveBeenLastCalledWith("https://example.com/About");
  });

  it("keeps an http:// scheme the person typed", async () => {
    render(<UrlInput label="Website" />);
    const input = screen.getByLabelText("Website");
    await userEvent.type(input, "http://a.b");
    await userEvent.tab();
    expect(input).toHaveValue("http://a.b");
  });

  it("an empty field emits null and is not given a scheme", async () => {
    const onValueChange = vi.fn();
    render(<UrlInput label="Website" onValueChange={onValueChange} />);
    const input = screen.getByLabelText("Website");
    // A url input sanitizes surrounding whitespace itself (a lone space fires no
    // change), so the empty path is: type, clear, leave the field.
    await userEvent.type(input, "a");
    await userEvent.clear(input);
    await userEvent.tab();
    expect(input).toHaveValue("");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("url type, url keypad, 44 px", () => {
    render(<UrlInput aria-label="Site" />);
    const input = screen.getByLabelText("Site");
    expect(input).toHaveAttribute("type", "url");
    expect(input).toHaveAttribute("inputmode", "url");
    expect(input.className).toContain("min-h-[44px]");
  });
});
