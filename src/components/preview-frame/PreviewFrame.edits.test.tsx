/**
 * AUDIT 33 P550 (ruling K-793) on PreviewFrame in "sample" mode:
 * - A-801: a multiple select keeps its whole selected set, not one index.
 * - A-802: Cmd / Ctrl editing keys and native beforeinput edits are refused; a contentEditable host that is
 *   changed anyway is put back. Copy and select-all still go through.
 * - A-803: one gesture is one report, grouped by its phases, never by a time window.
 * Each witness is the DOM state plus a child handler spy (React runs child handlers from its root).
 */
import * as React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PreviewFrame } from "./PreviewFrame";

afterEach(() => vi.restoreAllMocks());

const picked = (el: HTMLElement) => Array.from((el as HTMLSelectElement).selectedOptions, (o) => o.value);

/**
 * A multiple select starting with two of three options selected. Controlled, React's own capture-phase restore puts
 * the set back on `change` by itself; uncontrolled, only the frame can, so the A-801 witnesses run both ways.
 */
function Multi({ onChange, controlled }: { onChange: (v: string[]) => void; controlled: boolean }) {
  const [v, setV] = React.useState(["a", "c"]);
  return (
    <>
      <select
        aria-label="Multi"
        multiple
        {...(controlled ? { value: v } : { defaultValue: ["a", "c"] })}
        onChange={(e) => {
          const next = Array.from(e.target.selectedOptions, (o) => o.value);
          onChange(next);
          setV(next);
        }}
      >
        <option value="a">Alpha</option>
        <option value="b">Beta</option>
        <option value="c">Gamma</option>
      </select>
      <output data-testid="saved">{v.join(",")}</output>
    </>
  );
}

function renderMulti(controlled: boolean) {
  const onChange = vi.fn();
  const onBlocked = vi.fn();
  render(
    <PreviewFrame onBlockedInteract={onBlocked}>
      <Multi onChange={onChange} controlled={controlled} />
    </PreviewFrame>,
  );
  return { onChange, onBlocked, multi: screen.getByLabelText("Multi") as HTMLSelectElement };
}

/** What a browser does when it applies a change anyway: set the options, then fire input and change. */
function browserApplies(select: HTMLSelectElement, want: string[]) {
  Array.from(select.options).forEach((o) => (o.selected = want.includes(o.value)));
  fireEvent.input(select);
  expect(picked(select)).toEqual(["a", "c"]); // put back on the input, before any change handler could see it
  fireEvent.change(select);
}

const BOTH = [
  ["uncontrolled", false],
  ["controlled", true],
] as const;

describe("A-801: a multiple select keeps its whole selected set", () => {
  it.each(BOTH)("%s, a native-style option click: the press on the option is refused, and a change that lands anyway is put back", (_n, controlled) => {
    const { onChange, onBlocked, multi } = renderMulti(controlled);
    expect(picked(multi)).toEqual(["a", "c"]);
    const beta = screen.getByRole("option", { name: "Beta" });
    expect(fireEvent.mouseDown(beta)).toBe(false); // the press on an option is refused at the select
    fireEvent.click(beta);
    browserApplies(multi, ["b"]); // a list-box click selects only Beta
    expect(picked(multi)).toEqual(["a", "c"]);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent(/^a,c$/);
    expect(onBlocked).toHaveBeenCalledWith(multi);
  });

  it.each(BOTH)("%s, select-all (Cmd+A / Ctrl+A) is refused, and a select-all that lands anyway is put back", (_n, controlled) => {
    const { onChange, multi } = renderMulti(controlled);
    multi.focus();
    expect(fireEvent.keyDown(multi, { key: "a", metaKey: true })).toBe(false);
    expect(fireEvent.keyDown(multi, { key: "a", ctrlKey: true })).toBe(false);
    browserApplies(multi, ["a", "b", "c"]);
    expect(picked(multi)).toEqual(["a", "c"]);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent(/^a,c$/);
  });

  it.each(BOTH)("%s, selectOptions (two selected to start): the set is unchanged and onChange never runs", async (_n, controlled) => {
    const { onChange, onBlocked, multi } = renderMulti(controlled);
    await userEvent.setup().selectOptions(multi, "b");
    expect(picked(multi)).toEqual(["a", "c"]);
    expect(onChange).not.toHaveBeenCalled();
    expect(screen.getByTestId("saved")).toHaveTextContent(/^a,c$/);
    expect(onBlocked).toHaveBeenCalledTimes(1);
  });

  it("selectOptions (uncontrolled, two selected to start) and deselectOptions leave the set", async () => {
    render(
      <PreviewFrame>
        <select aria-label="Multi" multiple defaultValue={["a", "c"]}>
          <option value="a">Alpha</option>
          <option value="b">Beta</option>
          <option value="c">Gamma</option>
        </select>
      </PreviewFrame>,
    );
    const multi = screen.getByLabelText("Multi") as HTMLSelectElement;
    const user = userEvent.setup();
    await user.selectOptions(multi, ["b"]);
    expect(picked(multi)).toEqual(["a", "c"]);
    await user.deselectOptions(multi, "c");
    expect(picked(multi)).toEqual(["a", "c"]);
  });

  it("a single select still restores by index", async () => {
    render(
      <PreviewFrame>
        <select aria-label="Term" defaultValue="15">
          <option value="30">30</option>
          <option value="15">15</option>
        </select>
      </PreviewFrame>,
    );
    const term = screen.getByLabelText("Term") as HTMLSelectElement;
    await userEvent.setup().selectOptions(term, "30");
    expect(term.value).toBe("15");
  });
});

const EDIT_COMBOS: Array<[string, string, { metaKey?: boolean; ctrlKey?: boolean }]> = [
  ["Cmd+Backspace", "{Meta>}{Backspace}{/Meta}", { metaKey: true }],
  ["Ctrl+Backspace", "{Control>}{Backspace}{/Control}", { ctrlKey: true }],
  ["Cmd+Z", "{Meta>}z{/Meta}", { metaKey: true }],
  ["Cmd+B", "{Meta>}b{/Meta}", { metaKey: true }],
];

/** The keys a child's onKeyDown heard, apart from a modifier pressed on its own (which the frame lets through). */
const heardKeys = (spy: ReturnType<typeof vi.fn>) =>
  spy.mock.calls.map(([e]) => (e as React.KeyboardEvent).key).filter((k) => k !== "Meta" && k !== "Control");

function Editable(props: { onKeyDown: (e: React.KeyboardEvent) => void; onInput: () => void }) {
  return (
    <div aria-label="Notes" role="textbox" contentEditable suppressContentEditableWarning onKeyDown={props.onKeyDown} onInput={props.onInput}>
      Sample note words
    </div>
  );
}

function Field(props: { onKeyDown: (e: React.KeyboardEvent) => void; onChange: () => void }) {
  const [v, setV] = React.useState("425000");
  return (
    <>
      <label>
        Loan amount
        <input
          value={v}
          onKeyDown={props.onKeyDown}
          onChange={(e) => {
            props.onChange();
            setV(e.target.value);
          }}
        />
      </label>
      <output data-testid="saved">{v}</output>
    </>
  );
}

describe("A-802: Cmd / Ctrl editing keys are refused", () => {
  it.each(EDIT_COMBOS)("%s on contentEditable: no child handler, text unchanged, reported", async (_name, keys, mods) => {
    const onKeyDown = vi.fn();
    const onInput = vi.fn();
    const onBlocked = vi.fn();
    const user = userEvent.setup();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <Editable onKeyDown={onKeyDown} onInput={onInput} />
      </PreviewFrame>,
    );
    const box = screen.getByRole("textbox", { name: "Notes" });
    await user.click(box);
    await user.keyboard(keys);
    expect(heardKeys(onKeyDown)).toEqual([]);
    expect(onInput).not.toHaveBeenCalled();
    expect(box).toHaveTextContent(/^Sample note words$/);
    expect(onBlocked).toHaveBeenCalledWith(box);
    const key = keys.includes("Backspace") ? "Backspace" : keys.includes("z") ? "z" : "b";
    expect(fireEvent.keyDown(box, { key, ...mods })).toBe(false);
  });

  it.each(EDIT_COMBOS)("%s in a text field: no child handler, value unchanged, reported", async (_name, keys, mods) => {
    const onKeyDown = vi.fn();
    const onChange = vi.fn();
    const onBlocked = vi.fn();
    const user = userEvent.setup();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <Field onKeyDown={onKeyDown} onChange={onChange} />
      </PreviewFrame>,
    );
    const input = screen.getByLabelText("Loan amount");
    await user.click(input);
    await user.keyboard(keys);
    expect(heardKeys(onKeyDown)).toEqual([]);
    expect(onChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("425000");
    expect(screen.getByTestId("saved")).toHaveTextContent("425000");
    expect(onBlocked).toHaveBeenCalledWith(input);
    const key = keys.includes("Backspace") ? "Backspace" : keys.includes("z") ? "z" : "b";
    expect(fireEvent.keyDown(input, { key, ...mods })).toBe(false);
  });

  it("Cmd+X, Cmd+V, Cmd+Y, Cmd+I, Cmd+U, Cmd+Delete and Cmd+Enter are refused too", () => {
    const onBlocked = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <Editable onKeyDown={vi.fn()} onInput={vi.fn()} />
      </PreviewFrame>,
    );
    const box = screen.getByRole("textbox", { name: "Notes" });
    for (const key of ["x", "V", "y", "i", "u", "Delete", "Enter"]) {
      expect(fireEvent.keyDown(box, { key, metaKey: true })).toBe(false);
      expect(fireEvent.keyDown(box, { key, ctrlKey: true })).toBe(false);
    }
    expect(onBlocked).toHaveBeenCalledTimes(14);
  });

  it.each([
    ["Cmd+C", { key: "c", metaKey: true }],
    ["Ctrl+C", { key: "c", ctrlKey: true }],
    ["Cmd+A", { key: "a", metaKey: true }],
    ["Ctrl+A", { key: "a", ctrlKey: true }],
    ["Cmd+Shift+ArrowLeft", { key: "ArrowLeft", metaKey: true, shiftKey: true }],
    ["Cmd alone", { key: "Meta", metaKey: true }],
  ])("%s still goes through, on contentEditable and in a text field", (_name, init) => {
    const onKeyDown = vi.fn();
    const onBlocked = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <Editable onKeyDown={onKeyDown} onInput={vi.fn()} />
        <Field onKeyDown={onKeyDown} onChange={vi.fn()} />
      </PreviewFrame>,
    );
    expect(fireEvent.keyDown(screen.getByRole("textbox", { name: "Notes" }), init)).toBe(true);
    expect(fireEvent.keyDown(screen.getByLabelText("Loan amount"), init)).toBe(true);
    expect(onKeyDown).toHaveBeenCalledTimes(2);
    expect(onBlocked).not.toHaveBeenCalled();
  });

  it("copy is not refused: a copy event reaches the child", () => {
    const onCopy = vi.fn();
    render(
      <PreviewFrame>
        <div aria-label="Notes" role="textbox" contentEditable suppressContentEditableWarning onCopy={onCopy}>
          Sample
        </div>
      </PreviewFrame>,
    );
    expect(fireEvent.copy(screen.getByRole("textbox", { name: "Notes" }))).toBe(true);
    expect(onCopy).toHaveBeenCalledTimes(1);
  });

  it.each(["deleteHardLineBackward", "deleteWordBackward", "historyUndo", "formatBold", "insertFromPaste", "insertText", "deleteContentForward"])(
    "a native beforeinput (%s) on contentEditable is refused before it reaches the host",
    (inputType) => {
      const onBlocked = vi.fn();
      render(
        <PreviewFrame onBlockedInteract={onBlocked}>
          <div aria-label="Notes" role="textbox" contentEditable suppressContentEditableWarning>
            Sample <b>note</b>
          </div>
        </PreviewFrame>,
      );
      const box = screen.getByRole("textbox", { name: "Notes" });
      const heard = vi.fn();
      box.addEventListener("beforeinput", heard);
      const ev = new InputEvent("beforeinput", { inputType, bubbles: true, cancelable: true });
      expect(box.querySelector("b")!.dispatchEvent(ev)).toBe(false);
      expect(heard).not.toHaveBeenCalled();
      expect(onBlocked).toHaveBeenCalledWith(box); // reported as the host, not the <b> inside it
    },
  );

  it("an edit that lands anyway is put back from the host's snapshot, keeping React's own nodes", () => {
    const onInput = vi.fn();
    render(
      <PreviewFrame>
        <Editable onKeyDown={vi.fn()} onInput={onInput} />
      </PreviewFrame>,
    );
    const box = screen.getByRole("textbox", { name: "Notes" });
    const text = box.firstChild as Text;
    // A deleted word, then a bold wrap and an inserted line: the edits a missed key would have made.
    text.data = "Sample note ";
    fireEvent.input(box);
    expect(box.innerHTML).toBe("Sample note words");
    expect(box.firstChild).toBe(text);
    const bold = document.createElement("b");
    bold.append(text);
    box.replaceChildren(bold, document.createElement("br"));
    fireEvent.input(box);
    expect(box.innerHTML).toBe("Sample note words");
    expect(box.firstChild).toBe(text);
    expect(onInput).not.toHaveBeenCalled();
  });

  it("the snapshot follows the content as the viewer reaches it (focus), not only as it mounted", () => {
    function Notes() {
      const [n, setN] = React.useState(1);
      return (
        <>
          <button type="button" onClick={() => setN(2)}>
            Next
          </button>
          <div aria-label="Notes" role="textbox" contentEditable suppressContentEditableWarning>
            {`Note ${n}`}
          </div>
        </>
      );
    }
    render(
      <PreviewFrame>
        <Notes />
      </PreviewFrame>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Next" }));
    const box = screen.getByRole("textbox", { name: "Notes" });
    expect(box).toHaveTextContent("Note 2");
    fireEvent.focus(box);
    (box.firstChild as Text).data = "";
    fireEvent.input(box);
    expect(box).toHaveTextContent(/^Note 2$/);
  });
});

describe("A-803: one gesture is one report, by its phases, never by a time window", () => {
  function renderCheck() {
    const onBlocked = vi.fn();
    const onChange = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <input aria-label="Check" type="checkbox" onChange={onChange} />
      </PreviewFrame>,
    );
    return { onBlocked, onChange, box: screen.getByLabelText("Check") as HTMLInputElement };
  }

  it("a long press then its click: 1 (850 ms, and a whole minute)", () => {
    let now = 10_000;
    vi.spyOn(Date, "now").mockImplementation(() => now);
    vi.spyOn(performance, "now").mockImplementation(() => now);
    const { onBlocked, onChange, box } = renderCheck();
    fireEvent.pointerDown(box);
    fireEvent.mouseDown(box);
    now += 850;
    fireEvent.mouseUp(box);
    fireEvent.click(box);
    expect(onBlocked).toHaveBeenCalledTimes(1);
    fireEvent.pointerDown(box);
    fireEvent.mouseDown(box);
    now += 60_000;
    fireEvent.mouseUp(box);
    fireEvent.click(box);
    expect(onBlocked).toHaveBeenCalledTimes(2);
    expect(box.checked).toBe(false);
    expect(onChange).not.toHaveBeenCalled();
  });

  it("two separate quick clicks: 2 (user-event, and at the very same instant)", async () => {
    const first = renderCheck();
    const user = userEvent.setup();
    await user.click(first.box);
    await user.click(first.box);
    expect(first.onBlocked).toHaveBeenCalledTimes(2);
    expect(first.box.checked).toBe(false);
  });

  it("two separate clicks with the clock frozen: 2", () => {
    vi.spyOn(Date, "now").mockImplementation(() => 5_000);
    vi.spyOn(performance, "now").mockImplementation(() => 5_000);
    const { onBlocked, box } = renderCheck();
    for (let i = 0; i < 2; i++) {
      fireEvent.mouseDown(box);
      fireEvent.mouseUp(box);
      fireEvent.click(box);
    }
    expect(onBlocked).toHaveBeenCalledTimes(2);
  });

  it("an input and its change: 1, however far apart; a second input + change: 2", () => {
    let now = 1_000;
    vi.spyOn(Date, "now").mockImplementation(() => now);
    vi.spyOn(performance, "now").mockImplementation(() => now);
    const onBlocked = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <input aria-label="Range" type="range" defaultValue="20" />
      </PreviewFrame>,
    );
    const range = screen.getByLabelText("Range");
    fireEvent.input(range);
    now += 5_000;
    fireEvent.change(range);
    expect(onBlocked).toHaveBeenCalledTimes(1);
    fireEvent.input(range);
    fireEvent.change(range);
    expect(onBlocked).toHaveBeenCalledTimes(2);
  });

  it("one key and its input / change: 1; a held key's repeats: still 1; the next key: 2", () => {
    const onBlocked = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <label>
          Loan amount
          <input defaultValue="425000" />
        </label>
      </PreviewFrame>,
    );
    const input = screen.getByLabelText("Loan amount");
    fireEvent.keyDown(input, { key: "9" });
    fireEvent.input(input);
    fireEvent.change(input);
    fireEvent.keyDown(input, { key: "9", repeat: true });
    fireEvent.keyDown(input, { key: "9", repeat: true });
    expect(onBlocked).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(input, { key: "8" });
    expect(onBlocked).toHaveBeenCalledTimes(2);
  });

  it("a click on the control, then a click on its label: 2", async () => {
    const onBlocked = vi.fn();
    render(
      <PreviewFrame onBlockedInteract={onBlocked}>
        <label>
          Escrow
          <input type="checkbox" />
        </label>
      </PreviewFrame>,
    );
    const user = userEvent.setup();
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByText("Escrow"));
    expect(onBlocked).toHaveBeenCalledTimes(2);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });
});
