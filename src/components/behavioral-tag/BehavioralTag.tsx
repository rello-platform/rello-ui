"use client";

import * as React from "react";
import { Badge, type BadgeProps } from "../badge";
import { cn } from "../../lib/cn";

export interface BehavioralTagProps extends BadgeProps {
  onRemove?: () => void;
}

function BehavioralTag({ onRemove, children, className, ...badgeProps }: BehavioralTagProps) {
  return (
    <Badge className={cn(onRemove && "pr-1", className)} {...badgeProps}>
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="inline-flex items-center justify-center size-3.5 rounded-full hover:bg-[rgba(0,0,0,0.12)] transition-colors duration-150"
          style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
          aria-label="Remove"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path
              d="M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </Badge>
  );
}

export { BehavioralTag };
