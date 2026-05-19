import type { Meta, StoryObj } from "@storybook/react";
import {
  Home,
  Archery,
  Mail,
  FastArrowRight,
  Settings,
  Group,
  GraphUp,
} from "iconoir-react";
import { DashboardShell } from "./DashboardShell";
import { Card } from "../card";

const ICON = { width: 20, height: 20, strokeWidth: 1.5 };

const meta = {
  title: "Dashboard/DashboardShell",
  component: DashboardShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof DashboardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNavGroups = [
  {
    items: [
      { icon: <Home {...ICON} />, label: "Dashboard" },
      { icon: <Archery {...ICON} />, label: "Pipeline" },
      { icon: <Group {...ICON} />, label: "Contacts" },
      { icon: <Mail {...ICON} />, label: "Communications" },
    ],
  },
  {
    label: "Tools",
    items: [
      { icon: <GraphUp {...ICON} />, label: "Reports" },
      { icon: <Settings {...ICON} />, label: "Settings" },
    ],
  },
];

export const Default: Story = {
  args: {
    logo: (
      <div className="size-16 rounded-2xl flex items-center justify-center bg-[var(--brand-accent-light)]">
        <span className="text-xl font-bold text-[var(--brand-accent)]">R</span>
      </div>
    ),
    appTitle: "Rello",
    appSubtitle: "Your real estate command center",
    highlightText: "You have 12 hot leads and 3 pending closings this week.",
    agentName: "Kelly Sansom",
    agentInitials: "KS",
    agentSubtitle: "MLO",
    navGroups: sampleNavGroups,
    activeNavLabel: "Dashboard",
    heroContent: (
      <Card padding="md" className="h-full">
        <h3 className="font-semibold text-sm mb-2">Pipeline Overview</h3>
        <p className="text-xs text-[var(--neutral-500)]">Hero content area — pipeline thermometer, stats, etc.</p>
      </Card>
    ),
    rightCard: (
      <Card padding="md" className="h-full">
        <h3 className="font-semibold text-sm mb-2">Milo&apos;s Daily Brief</h3>
        <p className="text-xs text-[var(--neutral-500)]">Right card area — AI assistant, daily brief, etc.</p>
      </Card>
    ),
    children: (
      <div className="space-y-3">
        <Card padding="md">
          <h3 className="font-semibold text-sm mb-2">Category Section</h3>
          <p className="text-xs text-[var(--neutral-500)]">Content below the hero row.</p>
        </Card>
        <Card padding="md">
          <h3 className="font-semibold text-sm mb-2">Another Section</h3>
          <p className="text-xs text-[var(--neutral-500)]">More dashboard content.</p>
        </Card>
      </div>
    ),
  },
};

export const NoRightCard: Story = {
  args: {
    ...Default.args,
    rightCard: undefined,
  },
};

export const WithFooterCustomReturnToRello: Story = {
  args: {
    ...Default.args,
    footerCustom: (
      <button
        type="button"
        onClick={() => { window.location.href = "/mlo"; }}
        className="flex items-center justify-center gap-2 w-full px-3 py-3 mx-3 mb-3 mt-auto rounded-lg text-sm font-semibold text-white transition-colors min-h-[44px]"
        style={{ backgroundColor: "#c05621" }}
      >
        ← Return to Rello
      </button>
    ),
  },
};

/**
 * Render-prop footerCustom (v2.12.0+) — receives `{ collapsed }` reflecting
 * the live Sidebar hover state. Use when the consumer app has a collapsible
 * icon-rail (currently only Drumbeat across the platform) and needs to swap
 * between an icon-only shape and a full-width pill.
 *
 * Collapsed rail (60px) → 44px-square orange icon button.
 * Hovered / expanded (190px) → full-width HR-locked pill with label.
 */
export const WithFooterCustomCollapseAware: Story = {
  args: {
    ...Default.args,
    footerCustom: ({ collapsed }: { collapsed: boolean }) =>
      collapsed ? (
        <button
          type="button"
          aria-label="Return to Rello"
          title="Return to Rello"
          onClick={() => { window.location.href = "/mlo"; }}
          className="flex items-center justify-center mx-auto mb-3 rounded-lg text-white transition-colors size-11"
          style={{ backgroundColor: "#c05621" }}
        >
          <FastArrowRight {...ICON} className="rotate-180" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => { window.location.href = "/mlo"; }}
          className="flex items-center justify-center gap-2 w-[calc(100%-24px)] px-3 py-3 mx-3 mb-3 rounded-lg text-sm font-semibold text-white transition-colors min-h-[44px]"
          style={{ backgroundColor: "#c05621" }}
        >
          <FastArrowRight {...ICON} className="rotate-180" aria-hidden="true" />
          Return to Rello
        </button>
      ),
  },
};
