"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
}

const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, header, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("min-h-screen flex flex-col bg-[var(--background)]", className)}
      {...props}
    >
      {header}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
);
AppShell.displayName = "AppShell";

export { AppShell };
