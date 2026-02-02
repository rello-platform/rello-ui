"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "iconoir-react";
import { cn } from "../../lib/cn";

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, ...props }, ref) => (
    <CheckboxPrimitive.Root ref={ref} className={cn(
      "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none",
      "border-[var(--neutral-300)] bg-white",
      "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
      "data-[state=checked]:bg-[var(--brand-primary)] data-[state=checked]:text-white data-[state=checked]:border-[var(--brand-primary)]",
      "disabled:cursor-not-allowed disabled:opacity-50", className
    )} {...props}>
      <CheckboxPrimitive.Indicator className="grid place-content-center text-current">
        <Check className="size-3.5" strokeWidth={2.5} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
