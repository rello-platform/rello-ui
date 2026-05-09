import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { VoiceCorpusInput, type VoiceCorpusSample, countWords } from "./VoiceCorpusInput";

function Controlled(props: Omit<React.ComponentProps<typeof VoiceCorpusInput>, "samples" | "onAdd" | "onRemove">) {
  const [samples, setSamples] = React.useState<ReadonlyArray<VoiceCorpusSample>>([]);
  return (
    <div className="max-w-xl">
      <VoiceCorpusInput
        {...props}
        samples={samples}
        onAdd={(content) =>
          setSamples((prev) => [
            ...prev,
            { id: `s${Date.now()}`, content, wordCount: countWords(content) },
          ])
        }
        onRemove={(id) => setSamples((prev) => prev.filter((s) => s.id !== id))}
      />
    </div>
  );
}

const meta = {
  title: "Components/VoiceCorpusInput",
  component: VoiceCorpusInput,
  tags: ["autodocs"],
} satisfies Meta<typeof VoiceCorpusInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    samples: [],
    onAdd: () => {},
    onRemove: () => {},
  },
  render: (args) => <Controlled {...args} />,
};

export const PrefilledOneSample: Story = {
  args: {
    samples: [
      {
        id: "s1",
        content:
          "Quick note from this morning's open house — turnout was strong, mostly young professionals scoping the neighborhood. Two interested parties already asked about offer process timelines.",
        wordCount: 27,
      },
    ],
    onAdd: () => {},
    onRemove: () => {},
  },
  render: (args) => <Controlled {...args} />,
};

export const MaxSamplesReached: Story = {
  args: {
    samples: Array.from({ length: 3 }).map((_, i) => ({
      id: `s${i}`,
      content: `Sample ${i + 1} body text for the wizard preview.`,
      wordCount: 8,
    })),
    maxSamples: 3,
    onAdd: () => {},
    onRemove: () => {},
  },
  render: (args) => <Controlled {...args} />,
};

export const NoFileUpload: Story = {
  args: {
    samples: [],
    acceptFileUpload: false,
    onAdd: () => {},
    onRemove: () => {},
  },
  render: (args) => <Controlled {...args} />,
};
