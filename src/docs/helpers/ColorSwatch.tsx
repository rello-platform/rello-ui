"use client";

import * as React from "react";

interface ColorSwatchProps {
  name: string;
  variable: string;
  hex: string;
}

export function ColorSwatch({ name, variable, hex }: ColorSwatchProps) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div
        className="size-10 rounded-lg border border-[var(--neutral-100)] shrink-0"
        style={{ backgroundColor: hex }}
      />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-[var(--foreground)]">{name}</div>
        <div className="text-xs text-[var(--muted-foreground)] font-mono">{variable}</div>
        <div className="text-xs text-[var(--muted-foreground)] font-mono">{hex}</div>
      </div>
    </div>
  );
}

interface ColorGroupProps {
  title: string;
  colors: ColorSwatchProps[];
}

export function ColorGroup({ title, colors }: ColorGroupProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 font-[Montserrat]">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((color) => (
          <ColorSwatch key={color.variable} {...color} />
        ))}
      </div>
    </div>
  );
}
