"use client";

import * as React from "react";
import { DragHandGesture } from "iconoir-react";
import { cn } from "../../lib/cn";

const ICON_SM = { width: 16, height: 16, strokeWidth: 1.5 };

export interface DragHintProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
}

function DragHint({
  message = "Drag sections to rearrange your dashboard",
  className,
  ...props
}: DragHintProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 text-xs text-[var(--neutral-400)] py-2",
        className
      )}
      {...props}
    >
      <DragHandGesture {...ICON_SM} />
      <span>{message}</span>
    </div>
  );
}

export { DragHint };
