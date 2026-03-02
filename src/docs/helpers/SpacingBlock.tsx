"use client";

import * as React from "react";

interface SpacingItemProps {
  token: string;
  value: string;
}

export function SpacingItem({ token, value }: SpacingItemProps) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-24 text-xs font-mono text-[var(--muted-foreground)]">{token}</div>
      <div className="w-12 text-xs text-right text-[var(--muted-foreground)]">{value}</div>
      <div
        className="h-4 rounded bg-[var(--brand-primary)]"
        style={{ width: value }}
      />
    </div>
  );
}

interface RadiusItemProps {
  token: string;
  value: string;
}

export function RadiusItem({ token, value }: RadiusItemProps) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-24 text-xs font-mono text-[var(--muted-foreground)]">{token}</div>
      <div className="w-12 text-xs text-right text-[var(--muted-foreground)]">{value}</div>
      <div
        className="size-12 border-2 border-[var(--brand-primary)] bg-[var(--brand-primary-light)]"
        style={{ borderRadius: value }}
      />
    </div>
  );
}

interface ShadowItemProps {
  token: string;
  value: string;
}

export function ShadowItem({ token, value }: ShadowItemProps) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-24 text-xs font-mono text-[var(--muted-foreground)]">{token}</div>
      <div
        className="size-16 rounded-lg bg-white"
        style={{ boxShadow: value }}
      />
    </div>
  );
}
