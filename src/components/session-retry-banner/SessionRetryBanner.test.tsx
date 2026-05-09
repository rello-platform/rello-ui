import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SessionRetryBanner } from "./SessionRetryBanner";

describe("SessionRetryBanner", () => {
  it("renders with default headline + provided message", () => {
    render(<SessionRetryBanner message="Connection issue" onRetry={() => {}} />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Couldn't load this section")).toBeInTheDocument();
    expect(screen.getByText("Connection issue")).toBeInTheDocument();
  });

  it("renders with custom headline when provided", () => {
    render(
      <SessionRetryBanner
        headline="Couldn't load your session"
        message="Connection issue"
        onRetry={() => {}}
      />,
    );
    expect(screen.getByText("Couldn't load your session")).toBeInTheDocument();
  });

  it("invokes onRetry when retry button clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<SessionRetryBanner message="x" onRetry={onRetry} />);
    await user.click(screen.getByRole("button", { name: /retry loading/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("returns null when visible=false", () => {
    const { container } = render(
      <SessionRetryBanner message="x" onRetry={() => {}} visible={false} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders identically when visible=undefined and visible=true", () => {
    const { container: a } = render(
      <SessionRetryBanner message="hi" onRetry={() => {}} />,
    );
    const { container: b } = render(
      <SessionRetryBanner message="hi" onRetry={() => {}} visible={true} />,
    );
    expect(a.innerHTML).toBe(b.innerHTML);
  });

  it("uses custom retryLabel when provided", () => {
    render(
      <SessionRetryBanner message="x" onRetry={() => {}} retryLabel="Reload" />,
    );
    expect(screen.getByRole("button", { name: /reload loading/i })).toHaveTextContent("Reload");
  });
});
