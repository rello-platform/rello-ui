"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/cn";
import { buttonVariants, type ButtonVariantProps } from "./variants";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, fullWidth = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp ref={ref} disabled={isDisabled} className={cn(buttonVariants({ variant, size }), fullWidth && "w-full", className)} {...props}>
        {loading ? (
          <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button };
