"use client";

import * as React from "react";
import { Trash, Upload } from "iconoir-react";
import { Button } from "../button/Button";
import { Textarea } from "../textarea/Textarea";
import { Badge } from "../badge/Badge";
import { cn } from "../../lib/cn";

export interface VoiceCorpusSample {
  id: string;
  content: string;
  wordCount: number;
}

export interface VoiceCorpusInputProps extends React.HTMLAttributes<HTMLDivElement> {
  samples: ReadonlyArray<VoiceCorpusSample>;
  onAdd: (content: string) => void;
  onRemove: (id: string) => void;
  minSamples?: number;
  maxSamples?: number;
  acceptFileUpload?: boolean;
  acceptedFileTypes?: ReadonlyArray<string>;
  placeholder?: string;
  minWordsPerSample?: number;
}

function countWords(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function VoiceCorpusInput({
  samples,
  onAdd,
  onRemove,
  minSamples = 1,
  maxSamples = 10,
  acceptFileUpload = true,
  acceptedFileTypes = [".txt", ".docx"],
  placeholder = "Paste a writing sample (a recent email, blog post, social caption…)",
  minWordsPerSample = 25,
  className,
  ...props
}: VoiceCorpusInputProps) {
  const [draft, setDraft] = React.useState("");
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const draftWordCount = React.useMemo(() => countWords(draft), [draft]);
  const meetsMinimum = draftWordCount >= minWordsPerSample;
  const atMax = samples.length >= maxSamples;

  const handleAdd = React.useCallback(() => {
    if (!meetsMinimum || atMax) return;
    onAdd(draft.trim());
    setDraft("");
  }, [meetsMinimum, atMax, onAdd, draft]);

  const handleFileButtonClick = React.useCallback(() => {
    setUploadError(null);
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const lower = file.name.toLowerCase();
      const isTxt = lower.endsWith(".txt");
      const isDocx = lower.endsWith(".docx");

      if (file.size === 0) {
        setUploadError("Empty file — paste your sample directly or pick another file.");
        e.target.value = "";
        return;
      }

      if (isDocx) {
        setUploadError(".docx isn't supported yet — paste the text directly or upload a .txt file.");
        e.target.value = "";
        return;
      }

      if (!isTxt) {
        setUploadError("Use a .txt file or paste the text directly.");
        e.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const text = typeof reader.result === "string" ? reader.result : "";
        if (!text.trim()) {
          setUploadError("File appears to be empty.");
          return;
        }
        if (samples.length >= maxSamples) {
          setUploadError(`Already at the maximum of ${maxSamples} samples.`);
          return;
        }
        onAdd(text.trim());
        setUploadError(null);
      };
      reader.onerror = () => {
        setUploadError("Couldn't read the file. Try pasting the text directly.");
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [onAdd, samples.length, maxSamples],
  );

  const helperText = atMax
    ? `Maximum of ${maxSamples} samples reached.`
    : !meetsMinimum && draft.length > 0
      ? `${draftWordCount} / ${minWordsPerSample} words minimum`
      : `${draftWordCount} word${draftWordCount === 1 ? "" : "s"}`;

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      {samples.length > 0 && (
        <ul className="flex flex-col gap-2" aria-label="Writing samples">
          {samples.map((sample) => (
            <li
              key={sample.id}
              className="flex items-start gap-3 rounded-md border p-3"
              style={{
                borderColor: "var(--card-border, #e5e7eb)",
                backgroundColor: "var(--card-background, #ffffff)",
              }}
            >
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm whitespace-pre-wrap break-words"
                  style={{ color: "var(--foreground, #111827)" }}
                >
                  {sample.content}
                </p>
                <div className="mt-2">
                  <Badge variant="default" size="sm">
                    {sample.wordCount} word{sample.wordCount === 1 ? "" : "s"}
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => onRemove(sample.id)}
                aria-label="Remove sample"
              >
                <Trash width={16} height={16} />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {samples.length < minSamples && (
        <p
          className="text-xs"
          style={{ color: "var(--neutral-500, #6b7280)" }}
          aria-live="polite"
        >
          Add at least {minSamples} sample{minSamples === 1 ? "" : "s"} ({samples.length} of {minSamples}).
        </p>
      )}

      {!atMax && (
        <div className="flex flex-col gap-2">
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={placeholder}
            aria-label="New writing sample"
            disabled={atMax}
          />
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span
              className="text-xs"
              style={{ color: "var(--neutral-500, #6b7280)" }}
              aria-live="polite"
            >
              {helperText}
            </span>
            <div className="flex items-center gap-2">
              {acceptFileUpload && (
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={acceptedFileTypes.join(",")}
                    onChange={handleFileChange}
                    className="hidden"
                    aria-hidden="true"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleFileButtonClick}
                    leftIcon={<Upload width={14} height={14} />}
                    disabled={atMax}
                  >
                    Upload file
                  </Button>
                </>
              )}
              <Button
                variant="primary"
                size="sm"
                onClick={handleAdd}
                disabled={!meetsMinimum || atMax}
              >
                Add sample
              </Button>
            </div>
          </div>
          {uploadError && (
            <p
              className="text-xs"
              style={{ color: "var(--error, #dc2626)" }}
              role="alert"
            >
              {uploadError}
            </p>
          )}
        </div>
      )}

      {atMax && (
        <p
          className="text-xs"
          style={{ color: "var(--neutral-500, #6b7280)" }}
        >
          Maximum of {maxSamples} samples reached. Remove one to add another.
        </p>
      )}
    </div>
  );
}

export { VoiceCorpusInput, countWords };
