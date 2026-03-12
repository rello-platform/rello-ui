"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "../../lib/cn";

export interface SlidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  position?: "left" | "right";
  width?: string;
  children?: React.ReactNode;
  className?: string;
}

function SlidePanel({
  isOpen,
  onClose,
  position = "right",
  width = "280px",
  children,
  className,
}: SlidePanelProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed top-0 z-50 h-full bg-[var(--card-background)] shadow-xl flex flex-col",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=open]:duration-300 data-[state=closed]:duration-200",
            position === "right" && "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
            position === "left" && "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
            className
          )}
          style={{ width, maxWidth: "calc(100vw - 48px)" }}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

const SlidePanelHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between px-5 py-4 border-b border-[var(--card-border)]",
      className
    )}
    {...props}
  />
));
SlidePanelHeader.displayName = "SlidePanelHeader";

const SlidePanelBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-y-auto", className)}
    {...props}
  />
));
SlidePanelBody.displayName = "SlidePanelBody";

const SlidePanelFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("border-t border-[var(--card-border)] py-2", className)}
    {...props}
  />
));
SlidePanelFooter.displayName = "SlidePanelFooter";

const SlidePanelClose = DialogPrimitive.Close;

export { SlidePanel, SlidePanelHeader, SlidePanelBody, SlidePanelFooter, SlidePanelClose };
