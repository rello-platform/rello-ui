import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PreviewFrame } from "./PreviewFrame";

function SampleCockpit() {
  const [tab, setTab] = React.useState<"a" | "b">("a");
  const field = { minHeight: 44, width: "100%", boxSizing: "border-box" as const, padding: "0 12px" };
  return (
    <div style={{ border: "1px solid #D1D5DB", borderRadius: 12, padding: 16, background: "#fff" }}>
      <div role="tablist" style={{ display: "flex", gap: 8 }}>
        <button type="button" role="tab" aria-selected={tab === "a"} style={{ minHeight: 44 }} onClick={() => setTab("a")}>Tab A</button>
        <button type="button" role="tab" aria-selected={tab === "b"} style={{ minHeight: 44 }} onClick={() => setTab("b")}>Tab B</button>
      </div>
      {tab === "a" ? (
        <label style={{ display: "block", marginTop: 12 }}>Sample field<input defaultValue="425,000" style={field} /></label>
      ) : (
        <label style={{ display: "block", marginTop: 12 }}>Sample select<select defaultValue="30" style={field}><option value="30">30</option><option value="15">15</option></select></label>
      )}
    </div>
  );
}

const meta = {
  title: "Components/Locked/PreviewFrame",
  component: PreviewFrame,
  tags: ["autodocs"],
  // Block flow, as on a real page (the global "centered" layout shrink-wraps a full-width banner).
  parameters: { layout: "padded" },
  args: { children: <SampleCockpit /> },
} satisfies Meta<typeof PreviewFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Tabs switch; typing in the field shows the hint instead of changing it. */
export const Sample: Story = { args: { sampleLabel: "Sample label", blockedHint: "Hint shown when a value is changed" } };
/** Dimmed, hidden from assistive tech, nothing focusable. */
export const Greyed: Story = { args: { mode: "greyed" } };

/**
 * A-797: a sample's own handlers never run for a change or a submit. The checkbox's React state, the submit counter
 * and the select's state all stay put; the tabs still switch.
 */
function ControlledSample() {
  const [checked, setChecked] = React.useState(false);
  const [submits, setSubmits] = React.useState(0);
  const [term, setTerm] = React.useState("30");
  const [tab, setTab] = React.useState("a");
  const box = { minHeight: 44, minWidth: 44 };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmits((n) => n + 1);
      }}
      style={{ display: "grid", gap: 12, border: "1px solid #D1D5DB", borderRadius: 12, padding: 16, background: "#fff" }}
    >
      <div role="tablist" style={{ display: "flex", gap: 8 }}>
        <button type="button" role="tab" aria-selected={tab === "a"} style={box} onClick={() => setTab("a")}>Tab A</button>
        <button type="button" role="tab" aria-selected={tab === "b"} style={box} onClick={() => setTab("b")}>Tab B</button>
      </div>
      <label>
        <input aria-label="Check" type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} style={box} /> Check
      </label>
      <label>
        Term
        <select aria-label="Term" value={term} onChange={(e) => setTerm(e.target.value)} style={box}>
          <option value="30">30</option>
          <option value="15">15</option>
        </select>
      </label>
      <button type="submit" style={box}>Submit sample</button>
      <output id="state">{JSON.stringify({ checked, submits, term, tab })}</output>
    </form>
  );
}

export const BlockedChanges: Story = {
  args: { sampleLabel: "Sample label", blockedHint: "Hint shown when a value is changed", children: <ControlledSample /> },
};
