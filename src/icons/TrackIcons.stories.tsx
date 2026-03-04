import type { Meta, StoryObj } from "@storybook/react";
import { TRACK_ICONS, type TrackIconProps } from "./track-icons";

const meta = {
  title: "Icons/Track Icons",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** All 15 custom track icons at default accent color */
export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-5 gap-6">
      {Object.entries(TRACK_ICONS).map(([key, Icon]) => (
        <div key={key} className="flex flex-col items-center gap-2">
          <div
            className="flex items-center justify-center overflow-hidden"
            style={{ width: 88, height: 88, borderRadius: 18, backgroundColor: "#5B9EA614" }}
          >
            <Icon accent="#5B9EA6" />
          </div>
          <span className="text-xs text-[var(--neutral-500)] text-center">{key}</span>
        </div>
      ))}
    </div>
  ),
};

/** Icons in different accent colors — matching the 20-color palette */
export const AccentVariations: Story = {
  render: () => {
    const colors = [
      { name: "Teal", hex: "#5B9EA6" },
      { name: "Coral Rose", hex: "#C9785D" },
      { name: "Amber Gold", hex: "#D4943A" },
      { name: "Slate Blue", hex: "#5A7EB5" },
      { name: "Forest", hex: "#5E8C6A" },
      { name: "Plum", hex: "#8B5E83" },
    ];
    const icons = ["credit-score", "savings", "streak", "dream-home", "celebration", "pre-approval"] as const;

    return (
      <div className="flex flex-col gap-6">
        {colors.map(({ name, hex }) => (
          <div key={name} className="flex items-center gap-4">
            <span className="text-xs text-[var(--neutral-500)] w-20">{name}</span>
            <div className="flex gap-3">
              {icons.map((key) => {
                const Icon = TRACK_ICONS[key];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-center"
                    style={{ width: 64, height: 64, borderRadius: 14, backgroundColor: `${hex}14` }}
                  >
                    <Icon accent={hex} size={36} />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

/** Icons at different sizes */
export const Sizes: Story = {
  render: () => {
    const Icon = TRACK_ICONS["streak"];
    const sizes = [24, 32, 48, 64];

    return (
      <div className="flex items-end gap-6">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col items-center gap-2">
            <Icon accent="#C9785D" size={size} />
            <span className="text-xs text-[var(--neutral-500)]">{size}px</span>
          </div>
        ))}
      </div>
    );
  },
};
