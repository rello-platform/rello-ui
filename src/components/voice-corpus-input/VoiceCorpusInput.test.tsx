import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VoiceCorpusInput, countWords, type VoiceCorpusSample } from "./VoiceCorpusInput";

const SAMPLE: VoiceCorpusSample = {
  id: "s1",
  content: "A first sample body.",
  wordCount: 4,
};

describe("countWords", () => {
  it("returns 0 for empty / whitespace-only strings", () => {
    expect(countWords("")).toBe(0);
    expect(countWords("   \n  ")).toBe(0);
  });
  it("counts words on whitespace boundaries", () => {
    expect(countWords("one two three")).toBe(3);
    expect(countWords("  hello   world  ")).toBe(2);
  });
});

describe("VoiceCorpusInput", () => {
  it("renders empty state with paste textarea", () => {
    render(<VoiceCorpusInput samples={[]} onAdd={() => {}} onRemove={() => {}} />);
    expect(screen.getByLabelText("New writing sample")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add sample/i })).toBeDisabled();
  });

  it("Add button enables once min word count met; fires onAdd with trimmed text", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(
      <VoiceCorpusInput
        samples={[]}
        onAdd={onAdd}
        onRemove={() => {}}
        minWordsPerSample={3}
      />,
    );
    const ta = screen.getByLabelText("New writing sample");
    await user.type(ta, "  one two three  ");
    const addBtn = screen.getByRole("button", { name: /add sample/i });
    expect(addBtn).not.toBeDisabled();
    await user.click(addBtn);
    expect(onAdd).toHaveBeenCalledWith("one two three");
  });

  it("renders existing samples with word-count badge + remove button", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <VoiceCorpusInput samples={[SAMPLE]} onAdd={() => {}} onRemove={onRemove} />,
    );
    expect(screen.getByText(/A first sample body/)).toBeInTheDocument();
    expect(screen.getByText(/4 words/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /remove sample/i }));
    expect(onRemove).toHaveBeenCalledWith("s1");
  });

  it("disables Add when at maxSamples and renders max-reached message", () => {
    render(
      <VoiceCorpusInput
        samples={[SAMPLE]}
        onAdd={() => {}}
        onRemove={() => {}}
        maxSamples={1}
      />,
    );
    expect(screen.getByText(/Maximum of 1 samples reached/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("New writing sample")).toBeNull();
  });

  it("min-samples message shows when below minimum", () => {
    render(
      <VoiceCorpusInput
        samples={[]}
        onAdd={() => {}}
        onRemove={() => {}}
        minSamples={3}
      />,
    );
    expect(screen.getByText(/Add at least 3 samples \(0 of 3\)/)).toBeInTheDocument();
  });

  it("hides upload button when acceptFileUpload=false", () => {
    render(
      <VoiceCorpusInput
        samples={[]}
        onAdd={() => {}}
        onRemove={() => {}}
        acceptFileUpload={false}
      />,
    );
    expect(screen.queryByRole("button", { name: /upload file/i })).toBeNull();
  });
});
