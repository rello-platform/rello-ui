/**
 * Pure CVA variant definition for Badge.
 *
 * Kept in a dedicated file (no `"use client"` directive) so the
 * variant function + derived `BadgeVariant` type can be imported from
 * the server-safe root entry `@rello-platform/ui`. A server component
 * that needs to compute badge styling for static HTML (e.g. SSR'd
 * status pill) can call `badgeVariants({ variant: "success" })`
 * without hitting the client-reference-proxy bug.
 *
 * See DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726.
 */

import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[var(--neutral-100)] text-[var(--neutral-600)]",
        primary: "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]",
        accent: "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]",
        success: "bg-[var(--success-light)] text-[var(--success)]",
        warning: "bg-[var(--warning-light)] text-[var(--warning)]",
        error: "bg-[var(--error-light)] text-[var(--error)]",
        info: "bg-[var(--info-light)] text-[var(--info)]",
        hot: "bg-[var(--hot-light)] text-[var(--hot)]",
        qualified: "bg-[var(--qualified-light)] text-[var(--qualified)]",
        engaged: "bg-[var(--engaged-light)] text-[var(--engaged)]",
        warming: "bg-[var(--warming-light)] text-[var(--warming)]",
        cold: "bg-[var(--cold-light)] text-[var(--cold)]",
        // Pipeline stage variants
        LEAD: "bg-[#EFF6FF] text-[#3B82F6]",
        NURTURING: "bg-[#FFFBEB] text-[#F59E0B]",
        APPLICATION: "bg-[#F5F3FF] text-[#8B5CF6]",
        PROCESSING: "bg-[#EEF2FF] text-[#6366F1]",
        CLOSED_WON: "bg-[#ECFDF5] text-[#10B981]",
        CLOSED_LOST: "bg-[#F9FAFB] text-[#6B7280]",
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px]",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export type BadgeVariantProps = VariantProps<typeof badgeVariants>;
export type BadgeVariant = NonNullable<BadgeVariantProps["variant"]>;
