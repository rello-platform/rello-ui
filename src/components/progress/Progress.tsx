"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/cn";

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "success" | "warning" | "error" | "hot" | "cold";
  size?: "sm" | "md" | "lg";
}

const variantStyles = { default: "bg-[var(--brand-primary)]", success: "bg-[var(--success)]", warning: "bg-[var(--warning)]", error: "bg-[var(--error)]", hot: "bg-[var(--hot)]", cold: "bg-[var(--cold)]" };
const sizeStyles = { sm: "h-1.5", md: "h-2", lg: "h-3" };

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, variant = "default", size = "md", ...props }, ref) => (
    <ProgressPrimitive.Root ref={ref} className={cn("relative w-full overflow-hidden rounded-full bg-[var(--neutral-100)]", sizeStyles[size], className)} {...props}>
      <ProgressPrimitive.Indicator className={cn("h-full w-full flex-1 transition-all duration-300 ease-in-out rounded-full", variantStyles[variant])} style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
    </ProgressPrimitive.Root>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
