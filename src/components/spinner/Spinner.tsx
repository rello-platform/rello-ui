"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface SpinnerProps { size?: "xs" | "sm" | "md" | "lg" | "xl"; className?: string; }

const sizeClasses = { xs: "size-3 border-[1.5px]", sm: "size-4 border-2", md: "size-6 border-2", lg: "size-8 border-2", xl: "size-12 border-3" };

function Spinner({ size = "md", className }: SpinnerProps) {
  return <div className={cn("animate-spin rounded-full border-[var(--neutral-300)] border-t-[var(--brand-primary)]", sizeClasses[size], className)} />;
}

function LoadingOverlay({ message }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        {message && <p className="text-sm font-medium text-[var(--neutral-600)]">{message}</p>}
      </div>
    </div>
  );
}

function InlineLoading({ message }: { message?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Spinner size="sm" />
      {message && <span className="text-sm text-[var(--neutral-500)]">{message}</span>}
    </div>
  );
}

function ButtonSpinner() { return <Spinner size="sm" className="border-white/30 border-t-white" />; }

function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Spinner size="lg" />
      <p className="mt-4 text-[var(--neutral-500)] font-medium">{message}</p>
    </div>
  );
}

function CardLoader({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Spinner size="md" />
      {message && <p className="mt-3 text-sm text-[var(--neutral-500)]">{message}</p>}
    </div>
  );
}

export { Spinner, LoadingOverlay, InlineLoading, ButtonSpinner, PageLoader, CardLoader };
