"use client";

import * as React from "react";
import { cn } from "../../lib/cn";
import { Button } from "../button/Button";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 px-4 text-center", className)}>
      {icon && <div className="size-16 rounded-full bg-[var(--neutral-100)] flex items-center justify-center mb-4"><div className="text-[var(--neutral-400)]">{icon}</div></div>}
      <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">{title}</h3>
      {description && <p className="text-sm text-[var(--neutral-500)] max-w-sm mb-4">{description}</p>}
      {action && <Button onClick={action.onClick}>{action.label}</Button>}
    </div>
  );
}

export { EmptyState };
