import type { Meta, StoryObj } from "@storybook/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option-1">Option 1</SelectItem>
          <SelectItem value="option-2">Option 2</SelectItem>
          <SelectItem value="option-3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithGroups: Story = {
  render: () => (
    <div className="w-64">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Assign to agent" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Team A</SelectLabel>
            <SelectItem value="sarah">Sarah Johnson</SelectItem>
            <SelectItem value="mike">Mike Chen</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Team B</SelectLabel>
            <SelectItem value="emily">Emily Davis</SelectItem>
            <SelectItem value="david">David Wilson</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="w-48">
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Filter by..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Leads</SelectItem>
          <SelectItem value="hot">Hot</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="engaged">Engaged</SelectItem>
          <SelectItem value="warming">Warming</SelectItem>
          <SelectItem value="cold">Cold</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const PipelineFilter: Story = {
  name: "Pipeline Stage Filter",
  render: () => (
    <div className="w-56">
      <Select defaultValue="all">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Pipeline Stages</SelectItem>
          <SelectSeparator />
          <SelectItem value="hot">Hot</SelectItem>
          <SelectItem value="qualified">Qualified</SelectItem>
          <SelectItem value="engaged">Engaged</SelectItem>
          <SelectItem value="warming">Warming</SelectItem>
          <SelectItem value="cold">Cold</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <div className="w-56">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="archived" disabled>Archived (locked)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <div className="w-48">
        <p className="text-xs text-[var(--neutral-500)] mb-1.5">size="sm"</p>
        <Select>
          <SelectTrigger size="sm">
            <SelectValue placeholder="Small trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-48">
        <p className="text-xs text-[var(--neutral-500)] mb-1.5">size="md" (default)</p>
        <Select>
          <SelectTrigger size="md">
            <SelectValue placeholder="Medium trigger" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="a">Option A</SelectItem>
            <SelectItem value="b">Option B</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};
