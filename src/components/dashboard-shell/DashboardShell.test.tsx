import * as React from "react";
import { afterEach, beforeAll, describe, it, expect } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { DashboardShell } from "./DashboardShell";

// Radix Avatar only mounts the <img> once its internal `new window.Image()` probe
// fires a `load` event (it attaches handlers via addEventListener, then sets .src).
// jsdom does not fire load events on Image objects, so we polyfill a minimal Image
// whose `src` setter dispatches a successful `load` on the next microtask.
beforeAll(() => {
  class LoadingImage {
    referrerPolicy = "";
    crossOrigin: string | null = null;
    private _src = "";
    private _listeners: Record<string, Array<() => void>> = {};
    addEventListener(type: string, cb: () => void): void {
      (this._listeners[type] ||= []).push(cb);
    }
    removeEventListener(type: string, cb: () => void): void {
      this._listeners[type] = (this._listeners[type] || []).filter((fn) => fn !== cb);
    }
    get src(): string {
      return this._src;
    }
    set src(value: string) {
      this._src = value;
      // Simulate a successful network load asynchronously.
      queueMicrotask(() => (this._listeners["load"] || []).forEach((fn) => fn()));
    }
  }
  (window as unknown as { Image: typeof LoadingImage }).Image = LoadingImage;
  (globalThis as unknown as { Image: typeof LoadingImage }).Image = LoadingImage;
});

afterEach(() => cleanup());

const baseProps = {
  logo: <span>Logo</span>,
  appTitle: "Test App",
  appSubtitle: "Subtitle",
  agentName: "Jane Doe",
  agentInitials: "JD",
  navGroups: [],
};

describe("DashboardShell header avatar", () => {
  it("renders the headshot <img> with src + alt when agentPhotoUrl is provided", async () => {
    const photo = "https://cdn.example.com/jane.jpg";
    render(<DashboardShell {...baseProps} agentPhotoUrl={photo} />);

    await waitFor(() => {
      const imgs = screen.getAllByAltText("Jane Doe");
      expect(imgs.length).toBeGreaterThan(0);
      imgs.forEach((img) => expect(img).toHaveAttribute("src", photo));
    });
  });

  it("renders initials and no avatar <img> when agentPhotoUrl is omitted", () => {
    render(<DashboardShell {...baseProps} />);

    // Initials render at both header render sites (desktop top-bar + mobile nav).
    expect(screen.getAllByText("JD").length).toBeGreaterThan(0);
    // No headshot image present.
    expect(screen.queryByAltText("Jane Doe")).toBeNull();
    expect(screen.queryByRole("img")).toBeNull();
  });
});
