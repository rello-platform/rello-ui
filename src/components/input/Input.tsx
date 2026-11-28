"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    // The error or hint line is tied to the input so assistive tech reads it with the
    // field; an error is also announced when it appears (role="alert").
    const messageId = inputId && (error || hint) ? `${inputId}-message` : undefined;
    const describedBy = [props["aria-describedby"], messageId].filter(Boolean).join(" ") || undefined;
    const inputElement = (
      <div className="relative">
        {leftIcon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400,#98A1AA)] pointer-events-none">{leftIcon}</span>}
        <input
          ref={ref} id={inputId} type={type} aria-invalid={!!error}
          className={cn(
            "h-9 w-full rounded-md border bg-white px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
            "border-[var(--neutral-200,#BCC3CA)] text-[var(--foreground,#2D3339)] placeholder:text-[var(--neutral-400,#98A1AA)]",
            "focus-visible:border-[var(--brand-primary,#3B5998)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3B5998)]/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--neutral-50,#FAFBFC)]",
            error && "border-[var(--error,#C9605D)] focus-visible:border-[var(--error,#C9605D)] focus-visible:ring-[var(--error,#C9605D)]/20",
            leftIcon && "pl-10", rightIcon && "pr-10", className
          )}
          {...props}
          aria-describedby={describedBy}
        />
        {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400,#98A1AA)] pointer-events-none">{rightIcon}</span>}
      </div>
    );
    if (!label && !error && !hint) return inputElement;
    return (
      <div className="w-full">
        {label && <label htmlFor={inputId} className="block text-sm font-medium text-[var(--neutral-700,#434B52)] mb-1.5">{label}</label>}
        {inputElement}
        {(error || hint) && (
          <p
            id={messageId}
            role={error ? "alert" : undefined}
            className={cn("mt-1.5 text-xs", error ? "text-[var(--error,#C9605D)]" : "text-[var(--neutral-500,#646F77)]")}
          >
            {error || hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
