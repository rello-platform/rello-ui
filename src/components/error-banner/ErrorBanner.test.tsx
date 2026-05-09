import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorBanner } from "./ErrorBanner";

describe("ErrorBanner", () => {
  it("renders retry-mode when onRetry is provided", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorBanner message="Network failure" onRetry={onRetry} />);
    expect(screen.getByText("Couldn't load this content")).toBeInTheDocument();
    expect(screen.getByText("Network failure")).toBeInTheDocument();
    const btn = screen.getByRole("button", { name: /retry loading/i });
    await user.click(btn);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("renders reason-mode when reason is provided + no onRetry (no button)", () => {
    render(
      <ErrorBanner
        headline="Lead conversion data unavailable"
        reason="At least 7 days of activity required"
      />,
    );
    expect(screen.getByText("Lead conversion data unavailable")).toBeInTheDocument();
    expect(screen.getByText("At least 7 days of activity required")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("retry-mode wins when both onRetry and reason are passed", () => {
    render(
      <ErrorBanner
        message="primary message"
        reason="secondary reason"
        onRetry={() => {}}
      />,
    );
    expect(screen.getByText("primary message")).toBeInTheDocument();
    expect(screen.queryByText("secondary reason")).toBeNull();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("renders fallback no-action mode when neither onRetry nor reason nor message is passed", () => {
    render(<ErrorBanner headline="Something went wrong" />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("uses custom retryLabel in retry-mode", () => {
    render(
      <ErrorBanner message="x" onRetry={() => {}} retryLabel="Reload" />,
    );
    expect(screen.getByRole("button", { name: /reload loading/i })).toHaveTextContent("Reload");
  });
});
