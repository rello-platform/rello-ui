import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Plus } from "iconoir-react";
import { Checkbox } from "../checkbox";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Popover, PopoverAnchor, PopoverContent, PopoverTrigger } from "./Popover";
import { DarkTokens } from "./story-dark-tokens";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const STATES = ["Utah", "Idaho", "Nevada", "Arizona"];

/** A filter chip editor: a Checkbox list and a Select, the shape of the Audience "+ Add filter" editors. */
function FilterEditor({ open }: { open?: boolean }) {
  const [picked, setPicked] = React.useState<string[]>(["Utah"]);
  const toggle = (s: string) => setPicked((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  return (
    <div className="flex flex-wrap items-center justify-end gap-2" style={{ minHeight: 420 }}>
      <Popover defaultOpen={open}>
        <PopoverTrigger className="self-start border border-[var(--neutral-200,#bcc3ca)] bg-[var(--card-background,#ffffff)] px-3 text-sm text-[var(--foreground,#2d3339)]">
          <Plus className="size-4" aria-hidden="true" />
          Add filter
        </PopoverTrigger>
        <PopoverContent aria-label="State and status filter" closeLabel="Close filter">
          <fieldset className="grid gap-1">
            <legend className="mb-1 text-xs text-[var(--neutral-500,#646f77)]">State</legend>
            {STATES.map((s) => (
              <label key={s} className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm">
                <Checkbox checked={picked.includes(s)} onCheckedChange={() => toggle(s)} aria-label={s} />
                {s}
              </label>
            ))}
          </fieldset>
          <div className="mt-3 grid gap-1.5">
            <Label htmlFor="story-status">License status</Label>
            <Select defaultValue="active">
              <SelectTrigger id="story-status" className="min-h-[44px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="any">Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

/** Closed. The trigger sits at the right edge, so at 390px the content shifts to stay on screen. */
export const Default: Story = {
  render: () => <FilterEditor />,
};

/** Open, holding a Checkbox list and a Select. Escape or a click outside closes it. */
export const OpenWithControls: Story = {
  render: () => <FilterEditor open />,
};

/** The same editor under a dark token set. */
export const Dark: Story = {
  render: () => (
    <DarkTokens>
      <FilterEditor open />
    </DarkTokens>
  ),
};

/** Anchored to a whole chip row rather than the trigger, with no close button. */
export const AnchoredNoCloseButton: Story = {
  render: () => (
    <Popover>
      <PopoverAnchor className="flex flex-wrap gap-2 rounded-md border border-dashed border-[var(--neutral-200,#bcc3ca)] p-2">
        <span className="inline-flex min-h-[44px] items-center rounded-md px-3 text-sm">State: Utah</span>
        <PopoverTrigger className="border border-[var(--neutral-200,#bcc3ca)] px-3 text-sm">City</PopoverTrigger>
      </PopoverAnchor>
      <PopoverContent aria-label="City filter" showCloseButton={false}>
        <p className="text-sm">Type a city in the full editor.</p>
      </PopoverContent>
    </Popover>
  ),
};
