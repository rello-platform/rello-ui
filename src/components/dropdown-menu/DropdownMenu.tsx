"use client";

import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "../../lib/cn";
import { floatingSurfaceClasses, floatingTriggerClasses } from "../../lib/floating-surface";

/**
 * DropdownMenu (v2.44.0) — a menu of actions behind a button, on Radix DropdownMenu.
 *
 * Keyboard is Radix's: Enter / Space / ArrowDown open with focus on the first item; arrows move
 * (looping), Home / End jump, typing a letter jumps to the matching item, Escape closes and
 * focus returns to the trigger. The content uses Select's content surface (see
 * `lib/floating-surface.ts`) so the two look alike.
 *
 * Locked items: pass `disabledReason` (or `disabled`). The item is `aria-disabled`, its reason
 * is shown as text under the label and is the item's accessible description, and selecting it
 * does nothing. Following the WAI-ARIA menu pattern, a locked item stays focusable so a
 * keyboard or screen-reader user can reach it and hear why it is locked; that is why the lock
 * is enforced here rather than by Radix's own `disabled`, which removes the item from the
 * focus order.
 */

const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuGroup = DropdownMenuPrimitive.Group;
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

type DropdownMenuTriggerProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>;

const DropdownMenuTrigger = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Trigger>, DropdownMenuTriggerProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Trigger ref={ref} className={cn(floatingTriggerClasses, className)} {...props} />
  )
);
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

type DropdownMenuContentProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>;

const DropdownMenuContent = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Content>, DropdownMenuContentProps>(
  ({ className, sideOffset = 4, collisionPadding = 16, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={cn(
          floatingSurfaceClasses,
          "min-w-[8rem] p-1 overflow-y-auto",
          "max-h-[var(--radix-dropdown-menu-content-available-height,24rem)]",
          "max-w-[var(--radix-dropdown-menu-content-available-width,calc(100vw-2rem))]",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
);
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

type DropdownMenuItemProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  /**
   * Why this action is unavailable, shown under the label. Setting it locks the item:
   * `aria-disabled`, the reason as its accessible description, and selecting it does nothing.
   * An empty or whitespace-only string is treated as no reason.
   */
  disabledReason?: string;
};

const DropdownMenuItem = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Item>, DropdownMenuItemProps>(
  ({ className, children, disabled, disabledReason, onSelect, textValue, ...props }, ref) => {
    const reason = disabledReason?.trim() ? disabledReason.trim() : undefined;
    const locked = Boolean(disabled) || reason !== undefined;
    const baseId = React.useId();
    const labelId = `${baseId}-label`;
    const reasonId = `${baseId}-reason`;

    const handleSelect = React.useCallback(
      (event: Event) => {
        if (locked) {
          // Keep the menu open and never run the action.
          event.preventDefault();
          return;
        }
        onSelect?.(event);
      },
      [locked, onSelect]
    );

    return (
      <DropdownMenuPrimitive.Item
        ref={ref}
        {...props}
        // Radix's `disabled` would drop the item from the focus order; the lock is enforced in handleSelect.
        disabled={false}
        onSelect={handleSelect}
        textValue={textValue ?? (typeof children === "string" ? children : undefined)}
        aria-disabled={locked ? true : undefined}
        data-disabled={locked ? "" : undefined}
        aria-labelledby={reason ? labelId : props["aria-labelledby"]}
        aria-describedby={reason ? reasonId : props["aria-describedby"]}
        className={cn(
          "relative flex min-h-[44px] w-full cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none",
          "text-[var(--foreground,#2d3339)]",
          "focus:bg-[var(--neutral-100,#d1d5db)] data-[highlighted]:bg-[var(--neutral-100,#d1d5db)]",
          "data-[disabled]:cursor-not-allowed",
          reason && "flex-col items-start justify-center gap-0.5",
          className
        )}
      >
        {reason ? (
          <>
            <span id={labelId} className="flex items-center gap-2 opacity-60">
              {children}
            </span>
            <span id={reasonId} className="text-xs text-[var(--neutral-500,#646f77)]">
              {reason}
            </span>
          </>
        ) : (
          <span className={cn("flex items-center gap-2", locked && "opacity-60")}>{children}</span>
        )}
      </DropdownMenuPrimitive.Item>
    );
  }
);
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

type DropdownMenuLabelProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>;

const DropdownMenuLabel = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Label>, DropdownMenuLabelProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs text-[var(--neutral-500,#646f77)]", className)} {...props} />
  )
);
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

type DropdownMenuSeparatorProps = React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>;

const DropdownMenuSeparator = React.forwardRef<React.ElementRef<typeof DropdownMenuPrimitive.Separator>, DropdownMenuSeparatorProps>(
  ({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-[var(--neutral-100,#d1d5db)]", className)} {...props} />
  )
);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  type DropdownMenuContentProps,
  type DropdownMenuItemProps,
  type DropdownMenuLabelProps,
  type DropdownMenuSeparatorProps,
  type DropdownMenuTriggerProps,
};
