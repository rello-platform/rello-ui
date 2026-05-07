import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DialButton } from "./DialButton";

describe("DialButton", () => {
  it("renders an anchor with tel: href when no onDial provided", () => {
    render(<DialButton leadId="lead_1" phoneNumber="+15555550100" />);
    const link = screen.getByRole("link", { name: /call \+15555550100/i });
    expect(link).toHaveAttribute("href", "tel:+15555550100");
  });

  it("falls through to tel: when entitled=false even if onDial provided", async () => {
    const user = userEvent.setup();
    const onDial = vi.fn();
    const onContactInitiated = vi.fn();
    render(
      <DialButton
        leadId="lead_2"
        phoneNumber="+15555550101"
        onDial={onDial}
        entitled={false}
        onContactInitiated={onContactInitiated}
      />
    );
    const link = screen.getByRole("link");
    // Prevent jsdom navigation noise — verify it's the tel branch via the callback
    link.addEventListener("click", (e) => e.preventDefault(), { capture: true });
    await user.click(link);
    expect(onDial).not.toHaveBeenCalled();
    expect(onContactInitiated).toHaveBeenCalledWith("tel");
  });

  it("falls through to tel: when entitled=null (checking state)", async () => {
    const user = userEvent.setup();
    const onDial = vi.fn();
    const onContactInitiated = vi.fn();
    render(
      <DialButton
        leadId="lead_3"
        phoneNumber="+15555550102"
        onDial={onDial}
        entitled={null}
        onContactInitiated={onContactInitiated}
      />
    );
    const link = screen.getByRole("link");
    link.addEventListener("click", (e) => e.preventDefault(), { capture: true });
    await user.click(link);
    expect(onDial).not.toHaveBeenCalled();
    expect(onContactInitiated).toHaveBeenCalledWith("tel");
  });

  it("invokes onDial when entitled=true and prevents native tel: navigation", async () => {
    const user = userEvent.setup();
    const onDial = vi.fn().mockResolvedValue(undefined);
    const onContactInitiated = vi.fn();
    render(
      <DialButton
        leadId="lead_4"
        phoneNumber="+15555550103"
        phoneId="mobile-1"
        onDial={onDial}
        entitled={true}
        onContactInitiated={onContactInitiated}
      />
    );
    const link = screen.getByRole("link");
    await user.click(link);
    expect(onDial).toHaveBeenCalledWith("lead_4", {
      phoneId: "mobile-1",
      number: "+15555550103",
    });
    expect(onContactInitiated).toHaveBeenCalledWith("softphone");
  });

  it("does not dispatch when disabled", async () => {
    const user = userEvent.setup();
    const onDial = vi.fn();
    const onContactInitiated = vi.fn();
    render(
      <DialButton
        leadId="lead_5"
        phoneNumber="+15555550104"
        onDial={onDial}
        entitled={true}
        disabled
        onContactInitiated={onContactInitiated}
      />
    );
    const link = screen.getByRole("link");
    await user.click(link);
    expect(onDial).not.toHaveBeenCalled();
    expect(onContactInitiated).not.toHaveBeenCalled();
    expect(link).toHaveAttribute("aria-disabled", "true");
  });

  it("logs onDial async rejections without throwing", async () => {
    const user = userEvent.setup();
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const rejection = new Error("twilio down");
    const onDial = vi.fn().mockRejectedValue(rejection);
    render(
      <DialButton
        leadId="lead_6"
        phoneNumber="+15555550105"
        onDial={onDial}
        entitled={true}
      />
    );
    const link = screen.getByRole("link");
    await user.click(link);
    // Wait a microtask cycle so the rejection-handler runs
    await new Promise((r) => setTimeout(r, 0));
    expect(errSpy).toHaveBeenCalledWith(
      "[DialButton] onDial rejected",
      expect.objectContaining({ leadId: "lead_6", error: "twilio down" })
    );
    errSpy.mockRestore();
  });

  it("uses fallbackHref override when provided", () => {
    render(
      <DialButton
        leadId="lead_7"
        phoneNumber="+15555550106"
        fallbackHref="sip:agent@example.com"
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "sip:agent@example.com");
  });
});
