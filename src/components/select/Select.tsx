"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, NavArrowDown, NavArrowUp } from "iconoir-react";
import { cn } from "../../lib/cn";

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { size?: "sm" | "md" }>(
  ({ className, size = "md", children, ...props }, ref) => (
    <SelectPrimitive.Trigger ref={ref} className={cn(
      "flex w-full items-center justify-between gap-2 rounded-md border bg-white px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none",
      "border-[var(--neutral-200)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)]",
      "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
      "disabled:cursor-not-allowed disabled:opacity-50",
      size === "md" && "h-9 py-2", size === "sm" && "h-8 py-1.5 text-xs", className
    )} {...props}>
      {children}
      <SelectPrimitive.Icon asChild><NavArrowDown className="size-4 opacity-50" /></SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>>(
  ({ className, children, position = "popper", ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content ref={ref} className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md border-[var(--neutral-200)]",
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1", className
      )} position={position} {...props}>
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className={cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>{children}</SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
);
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Label>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>>(
  ({ className, ...props }, ref) => <SelectPrimitive.Label ref={ref} className={cn("px-2 py-1.5 text-xs text-[var(--neutral-500)]", className)} {...props} />
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={cn(
      "relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none text-[var(--foreground)] focus:bg-[var(--neutral-100)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )} {...props}>
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator><Check className="size-4" /></SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
);
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Separator>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>>(
  ({ className, ...props }, ref) => <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-[var(--neutral-100)]", className)} {...props} />
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

const SelectScrollUpButton = React.forwardRef<React.ElementRef<typeof SelectPrimitive.ScrollUpButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>>(
  ({ className, ...props }, ref) => <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}><NavArrowUp className="size-4" /></SelectPrimitive.ScrollUpButton>
);
const SelectScrollDownButton = React.forwardRef<React.ElementRef<typeof SelectPrimitive.ScrollDownButton>, React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>>(
  ({ className, ...props }, ref) => <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}><NavArrowDown className="size-4" /></SelectPrimitive.ScrollDownButton>
);

export { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue };
