import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DialButton } from "./DialButton";

const meta = {
  title: "Components/DialButton",
  component: DialButton,
  tags: ["autodocs"],
  argTypes: {
    leadId: { control: "text" },
    phoneNumber: { control: "text" },
    phoneId: { control: "text" },
    entitled: {
      control: "select",
      options: [true, false, null, undefined],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof DialButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default (no onDial → tel: fallback)",
  args: {
    leadId: "lead_demo_1",
    phoneNumber: "+15555550123",
  },
};

export const WithSoftphone: Story = {
  name: "WithSoftphone (entitled=true → onDial path)",
  args: {
    leadId: "lead_demo_2",
    phoneNumber: "+15555550124",
    entitled: true,
    onDial: async (leadId, phoneOverride) => {
      action("onDial")({ leadId, phoneOverride });
    },
    onContactInitiated: (path) => action("onContactInitiated")(path),
  },
};

export const EntitlementChecking: Story = {
  name: "EntitlementChecking (entitled=null → tel: fallback, never inert)",
  args: {
    leadId: "lead_demo_3",
    phoneNumber: "+15555550125",
    entitled: null,
    onDial: async (leadId, phoneOverride) => {
      action("onDial")({ leadId, phoneOverride });
    },
    onContactInitiated: (path) => action("onContactInitiated")(path),
  },
};

export const EntitlementDenied: Story = {
  name: "EntitlementDenied (entitled=false → tel: fallback)",
  args: {
    leadId: "lead_demo_4",
    phoneNumber: "+15555550126",
    entitled: false,
    onDial: async (leadId, phoneOverride) => {
      action("onDial")({ leadId, phoneOverride });
    },
    onContactInitiated: (path) => action("onContactInitiated")(path),
  },
};

export const Disabled: Story = {
  name: "Disabled (no dispatch on click)",
  args: {
    leadId: "lead_demo_5",
    phoneNumber: "+15555550127",
    entitled: true,
    disabled: true,
    onDial: async (leadId, phoneOverride) => {
      action("onDial")({ leadId, phoneOverride });
    },
  },
};
