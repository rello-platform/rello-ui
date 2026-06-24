import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { useState } from "react";
import { UnderlineTabBar, type UnderlineTab } from "./UnderlineTabBar";

const meta = {
  title: "Components/UnderlineTabBar",
  component: UnderlineTabBar,
  tags: ["autodocs"],
} satisfies Meta<typeof UnderlineTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseTabs: UnderlineTab[] = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity", count: 3 },
  { id: "tasks", label: "Tasks", count: 12 },
  { id: "notes", label: "Notes" },
  { id: "settings", label: "Settings", disabled: true },
];

export const ButtonMode: Story = {
  name: "Button mode (onChange driven)",
  args: {
    tabs: baseTabs,
    activeTab: "activity",
    ariaLabel: "Lead detail sections",
    onChange: (id) => action("onChange")(id),
  },
};

export const LinkMode: Story = {
  name: "Link mode (per-tab href → right-click / cmd-click open in new tab)",
  args: {
    tabs: [
      { id: "buys", label: "Buys", href: "/leads?tab=buys" },
      { id: "sells", label: "Sells", href: "/leads?tab=sells", count: 2 },
      { id: "closings", label: "Closings", href: "/leads?tab=closings" },
    ],
    activeTab: "sells",
    ariaLabel: "Lead pipeline tabs",
  },
};

export const Overflow: Story = {
  name: "Overflow (narrow container → scroll chevrons + edge fades)",
  parameters: {
    docs: {
      description: {
        story:
          "Reproduces the clipped-sub-tab finding: many tabs in a constrained-width " +
          "container overflow horizontally. Edge fade gradients + clickable scroll " +
          "chevrons appear on whichever side(s) have hidden tabs (at ALL breakpoints), " +
          "so a clipped tab like 'Trust / Escrow' is always discoverable. Resize the " +
          "container / canvas to watch the affordances appear and disappear.",
      },
    },
  },
  render: () => {
    const [active, setActive] = useState("buys");
    const tabs: UnderlineTab[] = [
      { id: "buys", label: "Buys" },
      { id: "sells", label: "Sells", count: 2 },
      { id: "closings", label: "Closings" },
      { id: "trust", label: "Trust / Escrow" },
      { id: "wire", label: "Wire Tracking", count: 1 },
      { id: "docs", label: "Documents" },
      { id: "disbursements", label: "Disbursements" },
      { id: "reconciliation", label: "Reconciliation" },
    ];
    return (
      <div
        style={{ maxWidth: 480, border: "1px dashed #cbd5e1", padding: 8 }}
      >
        <UnderlineTabBar
          tabs={tabs}
          activeTab={active}
          ariaLabel="Closings sub-sections"
          onChange={setActive}
        />
      </div>
    );
  },
  args: {
    tabs: baseTabs,
    activeTab: "buys",
    ariaLabel: "Closings sub-sections",
  },
};

export const Controlled: Story = {
  name: "Controlled (state in parent)",
  render: (args) => {
    const [active, setActive] = useState("overview");
    return (
      <UnderlineTabBar
        {...args}
        tabs={baseTabs}
        activeTab={active}
        ariaLabel="Lead detail sections"
        onChange={setActive}
      />
    );
  },
  args: {
    tabs: baseTabs,
    activeTab: "overview",
    ariaLabel: "Lead detail sections",
  },
};
