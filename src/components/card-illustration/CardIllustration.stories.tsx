import type { Meta, StoryObj } from "@storybook/react";
import { CardIllustration } from "./CardIllustration";
import { TrackCardIllustration, TRACK_ILLUSTRATIONS } from "./track-illustrations";

const meta = {
  title: "Components/CardIllustration",
  component: CardIllustration,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof CardIllustration>;

export default meta;
type Story = StoryObj<typeof meta>;

/** All track selection illustrations */
export const TrackSelection: Story = {
  name: "Track Selection Cards",
  render: () => (
    <div className="flex gap-6">
      {["track-daily", "track-weekly", "track-self-paced"].map((key) => {
        const def = TRACK_ILLUSTRATIONS[key];
        return (
          <div key={key} className="flex flex-col items-center gap-2">
            <TrackCardIllustration illustrationKey={key} size={96} />
            <span className="text-xs font-medium text-[var(--neutral-600)]">{def?.codename}</span>
            <span className="text-[10px] text-[var(--neutral-400)]">{def?.section}</span>
          </div>
        );
      })}
    </div>
  ),
};

/** All daily track illustrations */
export const DailyTrackCards: Story = {
  name: "Daily Track Cards",
  render: () => {
    const dailyKeys = Object.keys(TRACK_ILLUSTRATIONS).filter((k) => k.startsWith("daily-"));
    return (
      <div className="grid grid-cols-4 gap-6">
        {dailyKeys.map((key) => {
          const def = TRACK_ILLUSTRATIONS[key];
          return (
            <div key={key} className="flex flex-col items-center gap-2">
              <TrackCardIllustration illustrationKey={key} />
              <span className="text-xs font-medium text-[var(--neutral-600)]">{def?.codename}</span>
              <span className="text-[10px] text-[var(--neutral-400)]">{key}</span>
            </div>
          );
        })}
      </div>
    );
  },
};

/** All weekly track illustrations */
export const WeeklyTrackCards: Story = {
  name: "Weekly Track Cards",
  render: () => {
    const weeklyKeys = Object.keys(TRACK_ILLUSTRATIONS).filter((k) => k.startsWith("weekly-"));
    return (
      <div className="grid grid-cols-3 gap-6">
        {weeklyKeys.map((key) => {
          const def = TRACK_ILLUSTRATIONS[key];
          return (
            <div key={key} className="flex flex-col items-center gap-2">
              <TrackCardIllustration illustrationKey={key} />
              <span className="text-xs font-medium text-[var(--neutral-600)]">{def?.codename}</span>
              <span className="text-[10px] text-[var(--neutral-400)]">{key}</span>
            </div>
          );
        })}
      </div>
    );
  },
};

/** Size variations */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      {[48, 64, 88, 120].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <TrackCardIllustration illustrationKey="daily-credit-score" size={size} iconSize={size * 0.55} />
          <span className="text-xs text-[var(--neutral-500)]">{size}px</span>
        </div>
      ))}
    </div>
  ),
};

/** Dark mode variant */
export const DarkMode: Story = {
  render: () => (
    <div className="flex gap-6">
      <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-white">
        <TrackCardIllustration illustrationKey="daily-streak" />
        <span className="text-xs text-[var(--neutral-500)]">Light</span>
      </div>
      <div className="flex flex-col items-center gap-2 p-6 rounded-xl bg-[#1a1a2e]">
        <TrackCardIllustration illustrationKey="daily-streak" dark />
        <span className="text-xs text-[#999]">Dark</span>
      </div>
    </div>
  ),
};

/** Complete registry overview */
export const FullRegistry: Story = {
  name: "Full Registry",
  render: () => (
    <div className="grid grid-cols-5 gap-4">
      {Object.entries(TRACK_ILLUSTRATIONS).map(([key, def]) => (
        <div key={key} className="flex flex-col items-center gap-1.5 p-3 rounded-lg bg-[var(--neutral-50)] border border-[var(--neutral-100)]">
          <TrackCardIllustration illustrationKey={key} size={72} iconSize={40} />
          <span className="text-[10px] font-semibold text-[var(--neutral-700)]">{def.codename}</span>
          <span className="text-[9px] text-[var(--neutral-400)] text-center leading-tight">{def.section}</span>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="size-2.5 rounded-full" style={{ backgroundColor: def.accent }} />
            <span className="text-[9px] text-[var(--neutral-400)] font-mono">{def.accent}</span>
          </div>
        </div>
      ))}
    </div>
  ),
};
