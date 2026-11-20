/**
 * The floating surface shared by DropdownMenu and Popover (v2.44.0).
 *
 * The same shape as Select's content (`src/components/select/Select.tsx`): z-50, rounded-md,
 * one border, shadow-md, so a menu, a popover and an open Select look like one family. Unlike
 * Select's content, every colour here is a token WITH a fallback, and the background is
 * `--card-background` rather than a literal white, so a dark token set turns all three dark.
 *
 * Internal: not exported from either entry. A pure string, so it is server-safe regardless.
 */
export const floatingSurfaceClasses =
  "relative z-50 rounded-md border shadow-md outline-none " +
  "bg-[var(--card-background,#ffffff)] border-[var(--neutral-200,#bcc3ca)] text-[var(--foreground,#2d3339)] " +
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0";

/** A 44px square-minimum hit area for any trigger, with the library's focus ring. */
export const floatingTriggerClasses =
  "inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-md outline-none " +
  "focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3b5998)]/20 " +
  "disabled:cursor-not-allowed disabled:opacity-50";
