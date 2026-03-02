"use client";

import * as React from "react";

interface TypeSampleProps {
  label: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: string;
  sampleText?: string;
}

export function TypeSample({
  label,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  sampleText = "The quick brown fox jumps over the lazy dog",
}: TypeSampleProps) {
  return (
    <div className="py-4 border-b border-[var(--neutral-100)]">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-xs font-semibold text-[var(--brand-primary)] uppercase tracking-wider font-[Hind]">
          {label}
        </span>
        <span className="text-xs text-[var(--muted-foreground)] font-mono">
          {fontFamily} / {fontSize} / {fontWeight} / {lineHeight}
        </span>
      </div>
      <div style={{ fontFamily, fontSize, fontWeight, lineHeight }}>
        {sampleText}
      </div>
    </div>
  );
}

interface FontFamilySampleProps {
  name: string;
  fontFamily: string;
  role: string;
  weights: number[];
}

export function FontFamilySample({ name, fontFamily, role, weights }: FontFamilySampleProps) {
  return (
    <div className="mb-8 p-5 rounded-xl border border-[var(--neutral-100)] bg-white">
      <div className="flex items-baseline gap-3 mb-1">
        <h4 className="text-base font-semibold text-[var(--foreground)]" style={{ fontFamily }}>
          {name}
        </h4>
        <span className="text-xs text-[var(--muted-foreground)] font-[Hind]">{role}</span>
      </div>
      <div className="text-xs text-[var(--muted-foreground)] font-mono mb-4">
        Weights: {weights.join(", ")}
      </div>
      <div style={{ fontFamily }}>
        {weights.map((weight) => (
          <div key={weight} className="mb-2" style={{ fontWeight: weight, fontSize: "20px" }}>
            {weight} — The quick brown fox jumps over the lazy dog
          </div>
        ))}
      </div>
    </div>
  );
}
