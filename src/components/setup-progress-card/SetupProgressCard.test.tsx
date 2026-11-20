import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SetupProgressCard, type SetupProgressCardProps, type SetupProgressStep } from "./SetupProgressCard";

const steps: SetupProgressStep[] = [
  { id: "one", label: "Step one", where: "Place one", rule: "Done when one is saved.", done: true, href: "/one" },
  { id: "two", label: "Step two", where: "Place two", rule: "Done when two is saved.", done: false, href: "/two" },
  { id: "three", label: "Step three", where: "Place three", rule: "Done when three is saved.", done: false, href: "/three" },
];
const base: SetupProgressCardProps = { title: "Card title", steps };

describe("SetupProgressCard — content", () => {
  it("is a section titled by its heading, with 'N of M done' announced politely and a progress bar", () => {
    render(<SetupProgressCard {...base} />);
    const card = screen.getByRole("region", { name: "Card title" });
    expect(within(card).getByRole("heading", { name: "Card title" })).toBeInTheDocument();
    const progress = within(card).getByText("1 of 3 done");
    expect(progress).toHaveAttribute("aria-live", "polite");
    const bar = within(card).getByRole("progressbar", { name: "Card title" });
    expect(bar).toHaveAttribute("aria-valuenow", "1");
    expect(bar).toHaveAttribute("aria-valuemin", "0");
    expect(bar).toHaveAttribute("aria-valuemax", "3");
  });

  it("each step is a link to where its data is saved, with where and rule under it", () => {
    render(<SetupProgressCard {...base} />);
    for (const s of steps) {
      const link = screen.getByRole("link", { name: s.label });
      expect(link).toHaveAttribute("href", s.href);
      expect(link.className).toMatch(/min-h-\[44px\]/);
      expect(screen.getByText(s.where)).toBeInTheDocument();
      expect(screen.getByText(s.rule)).toBeInTheDocument();
    }
  });

  it("compact: the steps without the where/rule lines", () => {
    render(<SetupProgressCard {...base} compact />);
    expect(screen.getByRole("link", { name: "Step two" })).toBeInTheDocument();
    expect(screen.queryByText("Place two")).toBeNull();
    expect(screen.queryByText("Done when two is saved.")).toBeNull();
    expect(screen.getByRole("region")).toHaveAttribute("data-compact", "true");
  });

  it("each mark is a status image: 'done' / 'not done' by default, or the labels passed", () => {
    const { rerender } = render(<SetupProgressCard {...base} />);
    expect(screen.getAllByRole("img", { name: "done" })).toHaveLength(1);
    expect(screen.getAllByRole("img", { name: "not done" })).toHaveLength(2);
    rerender(<SetupProgressCard {...base} doneLabel="finished" notDoneLabel="to do" progressText={(n, m) => `${n}/${m}`} />);
    expect(screen.getAllByRole("img", { name: "finished" })).toHaveLength(1);
    expect(screen.getAllByRole("img", { name: "to do" })).toHaveLength(2);
    expect(screen.getByText("1/3")).toBeInTheDocument();
  });

  it("only a literal true counts as done (a bad value from the spoke is not done)", () => {
    const odd = [...steps.slice(0, 2), { ...steps[2], done: "true" as unknown as boolean }];
    render(<SetupProgressCard {...base} steps={odd} />);
    expect(screen.getByText("1 of 3 done")).toBeInTheDocument();
  });
});

describe("SetupProgressCard — hideWhenComplete", () => {
  const allDone = steps.map((s) => ({ ...s, done: true }));

  it("default: renders nothing once every step is done", () => {
    const { container } = render(<SetupProgressCard {...base} steps={allDone} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("false: still shows the finished card", () => {
    render(<SetupProgressCard {...base} steps={allDone} hideWhenComplete={false} />);
    expect(screen.getByText("3 of 3 done")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "3");
  });

  it("no steps: nothing by default; '0 of 0 done' with a zero bar when kept", () => {
    const { container, rerender } = render(<SetupProgressCard {...base} steps={[]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<SetupProgressCard {...base} steps={[]} hideWhenComplete={false} />);
    expect(screen.getByText("0 of 0 done")).toBeInTheDocument();
  });
});

describe("SetupProgressCard — the check is never a control (K-750)", () => {
  it("no checkbox, switch or button anywhere; the only interactive elements are the step links", () => {
    render(<SetupProgressCard {...base} />);
    expect(screen.queryAllByRole("checkbox")).toHaveLength(0);
    expect(screen.queryAllByRole("switch")).toHaveLength(0);
    expect(screen.queryAllByRole("button")).toHaveLength(0);
    const card = screen.getByRole("region");
    const interactive = card.querySelectorAll("a[href], button, input, select, textarea, [tabindex], [onclick]");
    expect([...interactive].every((el) => el.tagName === "A")).toBe(true);
    expect(interactive).toHaveLength(steps.length);
  });

  it("each mark is a plain, unfocusable span outside the link, and clicking it changes nothing", async () => {
    const user = userEvent.setup();
    render(<SetupProgressCard {...base} />);
    const marks = screen.getAllByRole("img", { name: /done/ });
    for (const m of marks) {
      expect(m.tagName).toBe("SPAN");
      expect(m).not.toHaveAttribute("tabindex");
      expect(m.closest("a, button, label")).toBeNull();
    }
    await user.click(screen.getAllByRole("img", { name: "not done" })[0]);
    expect(screen.getByText("1 of 3 done")).toBeInTheDocument();
    expect(screen.getAllByRole("img", { name: "not done" })).toHaveLength(2);
  });

  it("has no toggle / onCheck prop (a compile error, not just unused)", () => {
    // @ts-expect-error — done comes from saved data only (K-750); there is no onCheck.
    render(<SetupProgressCard {...base} onCheck={() => {}} />);
    // @ts-expect-error — and no onToggle.
    render(<SetupProgressCard {...base} onToggle={() => {}} />);
    expect(screen.getAllByRole("region")).toHaveLength(2);
  });
});
