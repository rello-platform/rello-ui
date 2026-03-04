"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AppHeaderProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  title?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  ({ className, logo, title, leftSlot, rightSlot, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        "sticky top-0 z-30 bg-[var(--card-background)] border-b border-[var(--card-border)] px-4 py-3",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {logo}
          {title && (
            <>
              <div className="h-5 w-px bg-[var(--neutral-200)]" />
              <span className="text-sm text-[var(--neutral-500)]">{title}</span>
            </>
          )}
          {leftSlot}
        </div>
        <div className="flex items-center gap-1">
          {rightSlot}
          {children}
        </div>
      </div>
    </header>
  )
);
AppHeader.displayName = "AppHeader";

export interface AppHeaderActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  dot?: boolean;
}

const AppHeaderAction = React.forwardRef<HTMLButtonElement, AppHeaderActionProps>(
  ({ className, dot = false, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "relative p-2 rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-50)] hover:text-[var(--neutral-700)] transition-colors",
        className
      )}
      {...props}
    >
      {children}
      {dot && (
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--hot)] rounded-full" />
      )}
    </button>
  )
);
AppHeaderAction.displayName = "AppHeaderAction";

const AppHeaderDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-5 w-px bg-[var(--neutral-200)]", className)}
    {...props}
  />
));
AppHeaderDivider.displayName = "AppHeaderDivider";

export { AppHeader, AppHeaderAction, AppHeaderDivider };
