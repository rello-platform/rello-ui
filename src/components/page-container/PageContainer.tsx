"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const pageContainerVariants = cva("mx-auto w-full", {
  variants: {
    maxWidth: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full",
    },
    padding: {
      sm: "px-3 py-4",
      md: "px-4 py-6",
      lg: "px-6 py-8",
    },
  },
  defaultVariants: { maxWidth: "xl", padding: "md" },
});

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  ({ className, maxWidth, padding, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(pageContainerVariants({ maxWidth, padding }), className)}
      {...props}
    />
  )
);
PageContainer.displayName = "PageContainer";

export { PageContainer };
