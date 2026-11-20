import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { MoreHoriz } from "iconoir-react";
import { Button } from "../button";
import { Card } from "../card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./DropdownMenu";
import { DarkTokens } from "../popover/story-dark-tokens";

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

/** A saved-audience card with its "⋯" menu: Load, Rename, and a Delete locked with its reason. */
function CohortCard({ open }: { open?: boolean }) {
  return (
    <Card className="flex w-full max-w-sm items-start justify-between gap-2 p-4">
      <div className="min-w-0">
        <p className="truncate font-semibold text-[var(--foreground,#2d3339)]">Utah top producers</p>
        <p className="text-sm text-[var(--neutral-500,#646f77)]">1,284 agents</p>
      </div>
      <DropdownMenu defaultOpen={open}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" aria-label="More for Utah top producers" className="min-h-[44px] min-w-[44px]">
            <MoreHoriz className="size-5" aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Utah top producers</DropdownMenuLabel>
          <DropdownMenuItem onSelect={() => {}}>Load</DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>Rename</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => {}} disabledReason="Used by 2 live campaigns">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
}

/** Closed. Click the ⋯, or focus it and press Enter / Space / ArrowDown. */
export const Default: Story = {
  render: () => <CohortCard />,
};

/** Open, with a locked item: aria-disabled, its reason in text, still reachable by keyboard. */
export const OpenWithLockedItem: Story = {
  render: () => (
    <div style={{ minHeight: 280 }}>
      <CohortCard open />
    </div>
  ),
};

/** The same menu under a dark token set: every colour is a token, so it follows. */
export const Dark: Story = {
  render: () => (
    <DarkTokens>
      <div style={{ minHeight: 280 }}>
        <CohortCard open />
      </div>
    </DarkTokens>
  ),
};

/** A bare trigger (no asChild): the trigger itself is a 44px target. */
export const BareTrigger: Story = {
  render: () => {
    const [last, setLast] = React.useState("nothing yet");
    return (
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger aria-label="Sort people" className="border border-[var(--neutral-200,#bcc3ca)] px-3 text-sm">
            Sort
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {["Most engaged", "Name", "Years licensed"].map((s) => (
              <DropdownMenuItem key={s} onSelect={() => setLast(s)}>
                {s}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <span aria-live="polite" className="text-sm text-[var(--neutral-500,#646f77)]">
          Chose: {last}
        </span>
      </div>
    );
  },
};
