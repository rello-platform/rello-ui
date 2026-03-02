import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button/Button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./Card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "elevated", "outlined"],
    },
    padding: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    hoverable: { control: "boolean" },
    clickable: { control: "boolean" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description with supporting text.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-600)]">
          This is the card content area. It can contain any elements.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button size="sm">Save</Button>
      </CardFooter>
    </Card>
  ),
  args: {
    variant: "default",
    padding: "md",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["default", "elevated", "outlined"] as const).map((variant) => (
        <Card key={variant} variant={variant} className="w-64">
          <CardHeader>
            <CardTitle className="text-base capitalize">{variant}</CardTitle>
            <CardDescription>variant="{variant}"</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--neutral-500)]">Card content goes here.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const AllPaddings: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(["none", "sm", "md", "lg"] as const).map((padding) => (
        <Card key={padding} padding={padding} className="w-56">
          <div className="bg-[var(--brand-primary-light)] p-2 rounded text-center text-sm">
            padding="{padding}"
          </div>
        </Card>
      ))}
    </div>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card hoverable className="w-80">
      <CardHeader>
        <CardTitle>Hoverable Card</CardTitle>
        <CardDescription>Hover to see shadow elevation change.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-500)]">This card transitions its shadow on hover.</p>
      </CardContent>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card hoverable clickable className="w-80" onClick={() => alert("Card clicked!")}>
      <CardHeader>
        <CardTitle>Clickable Card</CardTitle>
        <CardDescription>Click to trigger an action.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-500)]">Shows pointer cursor on hover.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooterActions: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-[var(--neutral-600)]">
          This action cannot be undone. Please review before confirming.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="ghost" size="sm">Cancel</Button>
        <Button variant="danger" size="sm">Delete</Button>
      </CardFooter>
    </Card>
  ),
};
