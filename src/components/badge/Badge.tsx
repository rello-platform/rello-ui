"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const badgeVariants = cva("inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap", {
  variants: {
    variant: {
      default: "bg-[var(--neutral-100)] text-[var(--neutral-600)]",
      primary: "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]",
      accent: "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]",
      success: "bg-[var(--success-light)] text-[var(--success)]",
      warning: "bg-[var(--warning-light)] text-[var(--warning)]",
      error: "bg-[var(--error-light)] text-[var(--error)]",
      info: "bg-[var(--info-light)] text-[var(--info)]",
      hot: "bg-[var(--hot-light)] text-[var(--hot)]",
      qualified: "bg-[var(--qualified-light)] text-[var(--qualified)]",
      engaged: "bg-[var(--engaged-light)] text-[var(--engaged)]",
      warming: "bg-[var(--warming-light)] text-[var(--warming)]",
      cold: "bg-[var(--cold-light)] text-[var(--cold)]",
    },
    size: { xs: "px-1.5 py-0.5 text-[10px]", sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-xs", lg: "px-3 py-1 text-sm" },
  },
  defaultVariants: { variant: "default", size: "md" },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
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

export { Badge, badgeVariants };
