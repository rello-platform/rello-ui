"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, label, error, hint, id, ...props }, ref) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const textareaElement = (
    <textarea ref={ref} id={textareaId} aria-invalid={!!error} className={cn(
      "min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none resize-y",
      "border-[var(--neutral-200)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)]",
      "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
      "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--neutral-50)]",
      error && "border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20", className
    )} {...props} />
  );
  if (!label && !error && !hint) return textareaElement;
  return (
    <div className="w-full">
      {label && <label htmlFor={textareaId} className="block text-sm font-medium text-[var(--neutral-700)] mb-1.5">{label}</label>}
      {textareaElement}
      {(error || hint) && <p className={cn("mt-1.5 text-xs", error ? "text-[var(--error)]" : "text-[var(--neutral-500)]")}>{error || hint}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
