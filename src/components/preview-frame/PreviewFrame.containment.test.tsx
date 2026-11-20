/**
 * A-797 (AUDIT 33, ruling K-777): in "sample" mode a value-changing or submitting event must not reach the CHILD's
 * handlers at all, not merely have its default prevented. React dispatches every handler from listeners on its root,
 * so each witness here is React state or a child handler spy, never only the DOM.
 * The first two are the auditor's witnesses (evidence/audit33-537/audit33-preview.test.tsx).
 */
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PreviewFrame } from "./PreviewFrame";

afterEach(() => vi.restoreAllMocks());

/** Shows a piece of React state next to the control, so a test reads what the child's handler did. */
function Saved({ value }: { value: unknown }) {
  return <output data-testid="saved">{String(value)}</output>;
}

describe("A-797 auditor witnesses", () => {
  it("submit never reaches a child submit action", async () => {
    const submit = vi.fn();
    const user = userEvent.setup();
    render(
      <PreviewFrame>
        <form onSubmit={submit}>
          <button type="submit">Submit sample</button>
        </form>
      </PreviewFrame>,
    );
    await user.click(screen.getByText("Submit sample"));
    expect(submit).not.toHaveBeenCalled();
  });

  it("a checkbox click never changes React sample state", async () => {
    function State() {
      const [checked, setChecked] = React.useState(false);
      return (
        <>
          <input aria-label="Check" type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <Saved value={checked} />
        </>
      );
    }
    render(
      <PreviewFrame>
        <State />
      </PreviewFrame>,
    );
    await userEvent.setup().click(screen.getByLabelText("Check"));
    expect(screen.getByTestId("saved")).toHaveTextContent("false");
    expect(screen.getByLabelText("Check")).not.toBeChecked();
  });
});

describe("A-797 value controls: the child's handler never runs, React state never moves", () => {
  it("radio: clicking another option changes neither state nor the checked option", async () => {
    const onChange = vi.fn();
    function Radios() {
      const [v, setV] = React.useState("a");
      return (
        <fieldset>
          {["a", "b"].map((x) => (
            <label key={x}>
              {`Option ${x}`}
              <input
                type="radio"
                name="opt"
                value={x}
                checked={v === x}
                onChange={(e) => {
                  onChange(e.target.value);
                  setV(e.target.value);
                }}
              />
            </label>
          ))}
          <Saved value={v} />
        </fieldset>
      );
    }
    render(
      <PreviewFrame>
        <Radios />
      </PreviewFrame>,
    );
    await userEvent.setup().click(screen.getByLabelText("Option b"));
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent("a");
    // jsdom leaves a canceled radio group empty (browsers restore it); the frame puts it back after the click.
    await waitFor(() => expect(screen.getByLabelText("Option a")).toBeChecked());
    expect(screen.getByLabelText("Option b")).not.toBeChecked();
  });

  function ControlledSelect({ onChange }: { onChange: (v: string) => void }) {
    const [v, setV] = React.useState("30");
    return (
      <>
        <select
          aria-label="Term"
          value={v}
          onChange={(e) => {
            onChange(e.target.value);
            setV(e.target.value);
          }}
        >
          <option value="30">30</option>
          <option value="15">15</option>
        </select>
        <Saved value={v} />
      </>
    );
  }

  it("select, keyboard: arrow keys change neither state nor the shown option", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(
      <PreviewFrame>
        <ControlledSelect onChange={onChange} />
      </PreviewFrame>,
    );
    screen.getByLabelText("Term").focus();
    await user.keyboard("{ArrowDown}{ArrowDown}{End}");
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent("30");
    expect(screen.getByLabelText("Term")).toHaveValue("30");
  });

  it("select, selectOptions (a synthetic input + change): the child never hears it and the option is put back", async () => {
    const onChange = vi.fn();
    const onBlocked = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <ControlledSelect onChange={onChange} />
      </PreviewFrame>,
    );
    await userEvent.setup().selectOptions(screen.getByLabelText("Term"), "15");
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent("30");
    expect(screen.getByLabelText("Term")).toHaveValue("30");
    expect(onBlocked).toHaveBeenCalledTimes(1);
  });

  it("select, uncontrolled (the auditor's third case): selectOptions leaves the value", async () => {
    render(
      <PreviewFrame>
        <select aria-label="Term" defaultValue="30">
          <option value="30">30</option>
          <option value="15">15</option>
        </select>
      </PreviewFrame>,
    );
    await userEvent.setup().selectOptions(screen.getByLabelText("Term"), "15");
    expect(screen.getByLabelText("Term")).toHaveValue("30");
  });

  it("range: keys, a press and a synthetic input/change all leave state and value", async () => {
    const onChange = vi.fn();
    const onInput = vi.fn();
    function Range() {
      const [v, setV] = React.useState(20);
      return (
        <>
          <input
            aria-label="Down payment"
            type="range"
            min={0}
            max={100}
            value={v}
            onInput={onInput}
            onChange={(e) => {
              onChange(e.target.value);
              setV(Number(e.target.value));
            }}
          />
          <Saved value={v} />
        </>
      );
    }
    const user = userEvent.setup();
    render(
      <PreviewFrame>
        <Range />
      </PreviewFrame>,
    );
    const range = screen.getByLabelText("Down payment") as HTMLInputElement;
    await user.click(range);
    range.focus();
    await user.keyboard("{ArrowRight}{ArrowUp}{End}");
    range.value = "80";
    fireEvent.input(range);
    fireEvent.change(range);
    expect(onChange).not.toHaveBeenCalled();
    expect(onInput).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent("20");
    expect(range.value).toBe("20");
  });

  it("contentEditable: typing reaches no child handler and changes no text", async () => {
    const onInput = vi.fn();
    const onKeyDown = vi.fn();
    const user = userEvent.setup();
    render(
      <PreviewFrame>
        <div aria-label="Notes" role="textbox" contentEditable suppressContentEditableWarning onInput={onInput} onKeyDown={onKeyDown}>
          Sample note
        </div>
      </PreviewFrame>,
    );
    const box = screen.getByRole("textbox", { name: "Notes" });
    await user.click(box);
    await user.keyboard("abc");
    fireEvent.input(box);
    expect(onInput).not.toHaveBeenCalled();
    expect(onKeyDown).not.toHaveBeenCalled();
    expect(box).toHaveTextContent(/^Sample note$/);
  });
});

describe("A-797 text fields: paste, cut, drop and Enter-to-submit", () => {
  function Field(props: { onSubmit: () => void; onPaste: () => void; onCut: () => void; onDrop: () => void; onChange: () => void; onKeyDown: () => void }) {
    const [v, setV] = React.useState("425000");
    return (
      <form onSubmit={props.onSubmit}>
        <label>
          Loan amount
          <input
            value={v}
            onChange={(e) => {
              props.onChange();
              setV(e.target.value);
            }}
            onPaste={props.onPaste}
            onCut={props.onCut}
            onDrop={props.onDrop}
            onKeyDown={props.onKeyDown}
          />
        </label>
        <Saved value={v} />
      </form>
    );
  }
  const spies = () => ({ onSubmit: vi.fn(), onPaste: vi.fn(), onCut: vi.fn(), onDrop: vi.fn(), onChange: vi.fn(), onKeyDown: vi.fn() });

  it("paste, cut and drop reach no child handler and change nothing", async () => {
    const s = spies();
    const user = userEvent.setup();
    render(
      <PreviewFrame>
        <Field {...s} />
      </PreviewFrame>,
    );
    const input = screen.getByLabelText("Loan amount");
    await user.click(input);
    await user.paste("999");
    fireEvent.cut(input);
    fireEvent.drop(input);
    expect(s.onPaste).not.toHaveBeenCalled();
    expect(s.onCut).not.toHaveBeenCalled();
    expect(s.onDrop).not.toHaveBeenCalled();
    expect(s.onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent("425000");
    expect(input).toHaveValue("425000");
  });

  it("Enter in a text field submits nothing and reaches no child key handler", async () => {
    const s = spies();
    const onBlocked = vi.fn();
    const user = userEvent.setup();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <Field {...s} />
      </PreviewFrame>,
    );
    await user.type(screen.getByLabelText("Loan amount"), "{Enter}");
    expect(s.onSubmit).not.toHaveBeenCalled();
    expect(s.onKeyDown).not.toHaveBeenCalled();
    expect(onBlocked).toHaveBeenCalledTimes(1);
  });

  it("a reset button puts back nothing and its onReset never runs", async () => {
    const onReset = vi.fn();
    render(
      <PreviewFrame>
        <form onReset={onReset}>
          <label>
            Uncontrolled
            <input defaultValue="425000" />
          </label>
          <button type="reset">Reset</button>
        </form>
      </PreviewFrame>,
    );
    const input = screen.getByLabelText("Uncontrolled") as HTMLInputElement;
    input.value = "1";
    await userEvent.setup().click(screen.getByRole("button", { name: "Reset" }));
    expect(onReset).not.toHaveBeenCalled();
    expect(input.value).toBe("1");
  });
});

describe("A-797: one attempt is reported once; exploring still works", () => {
  it("a checkbox click (mousedown + click) shows the hint and calls onBlockedInteract exactly once", async () => {
    const onBlocked = vi.fn();
    render(
      <PreviewFrame blockedHint="Blocked hint" onBlockedInteract={onBlocked}>
        <input aria-label="Check" type="checkbox" />
      </PreviewFrame>,
    );
    await userEvent.setup().click(screen.getByLabelText("Check"));
    expect(onBlocked).toHaveBeenCalledTimes(1);
    expect(onBlocked).toHaveBeenCalledWith(screen.getByLabelText("Check"));
    expect(screen.getByRole("status")).toHaveTextContent("Blocked hint");
  });

  it("tabs, an expander and a link inside a form still run their handlers; focus still moves into fields", async () => {
    const onLink = vi.fn((e: React.MouseEvent) => e.preventDefault());
    function Explore() {
      const [tab, setTab] = React.useState("a");
      const [open, setOpen] = React.useState(false);
      return (
        <form onSubmit={(e) => e.preventDefault()}>
          <button type="button" role="tab" aria-selected={tab === "a"} onClick={() => setTab("a")}>
            Tab A
          </button>
          <button type="button" role="tab" aria-selected={tab === "b"} onClick={() => setTab("b")}>
            Tab B
          </button>
          <button type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            More
          </button>
          <a href="#detail" onClick={onLink}>
            Detail
          </a>
          <label>
            Field
            <input defaultValue="1" />
          </label>
          <Saved value={`${tab}/${open}`} />
        </form>
      );
    }
    const user = userEvent.setup();
    render(
      <PreviewFrame>
        <Explore />
      </PreviewFrame>,
    );
    await user.click(screen.getByRole("tab", { name: "Tab B" }));
    await user.click(screen.getByRole("button", { name: "More" }));
    await user.click(screen.getByRole("link", { name: "Detail" }));
    expect(screen.getByTestId("saved")).toHaveTextContent("b/true");
    expect(onLink).toHaveBeenCalledTimes(1);
    await user.click(screen.getByLabelText("Field"));
    expect(document.activeElement).toBe(screen.getByLabelText("Field"));
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(screen.getByRole("link", { name: "Detail" }));
  });
});

describe("A-797 cleanup", () => {
  it("the radio put-back timer is cleared on unmount", () => {
    vi.useFakeTimers();
    try {
      const { unmount } = render(
        <PreviewFrame>
          <input aria-label="A" type="radio" name="g" defaultChecked />
          <input aria-label="B" type="radio" name="g" />
        </PreviewFrame>,
      );
      const b = screen.getByLabelText("B");
      fireEvent.pointerDown(b);
      fireEvent.click(b);
      expect(vi.getTimerCount()).toBeGreaterThan(0);
      unmount();
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });
});
