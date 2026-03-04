import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Home, LogOut } from "iconoir-react";
import { Button } from "../button/Button";
import { SlidePanel, SlidePanelHeader, SlidePanelBody, SlidePanelFooter, SlidePanelClose } from "./SlidePanel";

const ICON = { width: 20, height: 20, strokeWidth: 1.5 };

const meta = {
  title: "Layout/SlidePanel",
  component: SlidePanel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SlidePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

function SlidePanelDemo({ position = "right" }: { position?: "left" | "right" }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-8">
      <Button onClick={() => setOpen(true)}>
        Open {position} panel
      </Button>
      <SlidePanel isOpen={open} onClose={() => setOpen(false)} position={position}>
        <SlidePanelHeader>
          <span className="font-semibold">Menu</span>
          <SlidePanelClose className="p-1 rounded hover:bg-[var(--neutral-100)]">
            &times;
          </SlidePanelClose>
        </SlidePanelHeader>
        <SlidePanelBody>
          <nav className="py-2">
            <a href="#" className="flex items-center gap-3 px-5 py-3 hover:bg-[var(--neutral-50)] text-[var(--neutral-700)]">
              <Home {...ICON} />
              <span className="text-sm font-medium">Dashboard</span>
            </a>
          </nav>
        </SlidePanelBody>
        <SlidePanelFooter>
          <button className="flex items-center gap-3 w-full px-5 py-3 text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]">
            <LogOut {...ICON} />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        </SlidePanelFooter>
      </SlidePanel>
    </div>
  );
}

export const Right: Story = {
  render: () => <SlidePanelDemo position="right" />,
};

export const Left: Story = {
  render: () => <SlidePanelDemo position="left" />,
};
