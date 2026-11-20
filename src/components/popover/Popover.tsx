"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Xmark } from "iconoir-react";
import { cn } from "../../lib/cn";
import { floatingSurfaceClasses, floatingTriggerClasses } from "../../lib/floating-surface";

/**
 * Popover (v2.44.0) — a small non-modal panel anchored to a trigger, on Radix Popover.
 * For editors that hold controls (a Checkbox list, a Select, an Input), e.g. a filter chip.
 *
 * Behaviour is Radix's: Escape and a click outside close it; on open focus moves to the first
 * focusable control inside; on close focus returns to the trigger. A Select or menu opened
 * from inside does not count as "outside".
 *
 * Name it: pass `aria-label` (or `aria-labelledby`) to PopoverContent, since it is announced as
 * a dialog. It keeps a 16px gutter from the viewport edge (`collisionPadding`) and caps its own
 * width and height to the room Radix measures inside that gutter, so it never runs off a 390px
 * screen.
 */

const Popover = PopoverPrimitive.Root;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Trigger>;

const PopoverTrigger = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Trigger>, PopoverTriggerProps>(
  ({ className, ...props }, ref) => (
    <PopoverPrimitive.Trigger ref={ref} className={cn(floatingTriggerClasses, className)} {...props} />
  )
);
PopoverTrigger.displayName = PopoverPrimitive.Trigger.displayName;

type PopoverContentProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
  /** Show an × close button in the top-right corner. Default true. */
  showCloseButton?: boolean;
  /** Accessible name of the close button. Default "Close". */
  closeLabel?: string;
};

const PopoverContent = React.forwardRef<React.ElementRef<typeof PopoverPrimitive.Content>, PopoverContentProps>(
  (
    { className, children, align = "start", sideOffset = 4, collisionPadding = 16, showCloseButton = true, closeLabel = "Close", ...props },
    ref
  ) => (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          floatingSurfaceClasses,
          "w-72 p-4 overflow-y-auto",
          "max-w-[var(--radix-popover-content-available-width,calc(100vw-2rem))]",
          "max-h-[var(--radix-popover-content-available-height,24rem)]",
          showCloseButton && "pr-12",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <PopoverPrimitive.Close
            aria-label={closeLabel}
            className={cn(
              "absolute top-0 right-0 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md outline-none",
              "text-[var(--neutral-500,#646f77)] hover:text-[var(--foreground,#2d3339)]",
              "focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3b5998)]/20"
            )}
          >
            <Xmark className="size-4" aria-hidden="true" />
          </PopoverPrimitive.Close>
        )}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger, type PopoverContentProps, type PopoverTriggerProps };
