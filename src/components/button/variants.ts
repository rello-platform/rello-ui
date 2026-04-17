/**
 * Pure CVA variant definition for Button.
 *
 * Kept in a dedicated file (no `"use client"` directive) so the
 * variant function can be imported from the server-safe root entry
 * `@rello-platform/ui`. A server component that wants to render a
 * non-interactive element with button styling (e.g. a link styled as
 * a button in an RSC page) can call
 * `buttonVariants({ variant: "primary" })` to get a className string
 * without hitting the client-reference-proxy bug.
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[var(--brand-primary)] text-white hover:opacity-90",
        secondary: "bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]",
        accent: "bg-[var(--brand-accent)] text-white hover:opacity-90",
        ghost: "bg-transparent text-[var(--neutral-500)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-700)]",
        danger: "bg-[var(--error)] text-white hover:opacity-90",
        outline: "border border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]",
        link: "text-[var(--brand-primary)] underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2 text-xs gap-1",
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-9 px-4 text-sm gap-2",
        lg: "h-10 px-5 text-base gap-2",
        xl: "h-12 px-6 text-base gap-2.5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
