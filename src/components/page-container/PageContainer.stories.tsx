import type { Meta, StoryObj } from "@storybook/react";
import { PageContainer } from "./PageContainer";
import { Card } from "../card/Card";

const meta = {
  title: "Layout/PageContainer",
  component: PageContainer,
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    padding: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
} satisfies Meta<typeof PageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <PageContainer {...args}>
      <Card>
        <p className="text-sm text-[var(--neutral-600)]">
          Content inside a PageContainer with maxWidth="{args.maxWidth || "xl"}" and padding="{args.padding || "md"}".
        </p>
      </Card>
    </PageContainer>
  ),
  args: { maxWidth: "xl", padding: "md" },
};

export const AllWidths: Story = {
  render: () => (
    <div className="space-y-4 bg-[var(--neutral-50)] py-4">
      {(["sm", "md", "lg", "xl", "full"] as const).map((w) => (
        <PageContainer key={w} maxWidth={w}>
          <Card>
            <p className="text-sm text-center text-[var(--neutral-600)]">maxWidth="{w}"</p>
          </Card>
        </PageContainer>
      ))}
    </div>
  ),
};
