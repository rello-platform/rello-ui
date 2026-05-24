import type { Meta, StoryObj } from "@storybook/react";
import type { BillingUsageSummary } from "@rello-platform/billing-client";
import { SpendPanel } from "./SpendPanel";

const meta = {
  title: "Billing/SpendPanel",
  component: SpendPanel,
  tags: ["autodocs"],
} satisfies Meta<typeof SpendPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const period = {
  year: 2026,
  month: 5,
  label: "May 2026",
  start: "2026-05-01T00:00:00.000Z",
  end: "2026-05-31T23:59:59.999Z",
};

const populated: BillingUsageSummary = {
  appSlug: "open-house-hub",
  appName: "Open House Hub",
  period,
  totalRevenueCents: 4231,
  totalRevenueKnown: true,
  recordCount: 6,
  rows: [
    {
      appSlug: "open-house-hub",
      appName: "Open House Hub",
      metric: "emails_sent",
      metricName: "Emails sent",
      unit: "email",
      service: "mailgun",
      quantity: 320,
      revenueCents: 2560,
      revenueKnown: true,
    },
    {
      appSlug: "open-house-hub",
      appName: "Open House Hub",
      metric: "sms_sent",
      metricName: "SMS sent",
      unit: "message",
      service: "twilio",
      quantity: 84,
      revenueCents: 1671,
      revenueKnown: true,
    },
  ],
  allotments: [
    {
      metric: "emails_sent",
      metricName: "Emails sent",
      included: 500,
      used: 320,
      remaining: 180,
      overageCents: null,
    },
    {
      metric: "sms_sent",
      metricName: "SMS sent",
      included: 50,
      used: 84,
      remaining: 0,
      overageCents: 680,
    },
  ],
  portalAvailable: true,
};

const allotmentOnly: BillingUsageSummary = {
  ...populated,
  totalRevenueCents: 0,
  totalRevenueKnown: false,
  recordCount: 0,
  rows: [],
  portalAvailable: false,
};

const zeroState: BillingUsageSummary = {
  appSlug: "open-house-hub",
  appName: "Open House Hub",
  period,
  totalRevenueCents: 0,
  totalRevenueKnown: false,
  recordCount: 0,
  rows: [],
  allotments: [],
  portalAvailable: false,
};

export const Populated: Story = {
  args: { data: populated, onManageBilling: () => alert("Open billing portal") },
};

export const AllotmentOnly: Story = {
  args: { data: allotmentOnly },
};

export const ZeroState: Story = {
  args: { data: zeroState },
};
