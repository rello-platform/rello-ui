"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { badgeVariants, type BadgeVariantProps } from "./variants";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, BadgeVariantProps {
  icon?: React.ReactNode;
  dot?: boolean;
}

function Badge({ className, variant, size, icon, dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {icon}
      {children}
    </span>
  );
}

export { Badge };
export type { BadgeVariant } from "./variants";
