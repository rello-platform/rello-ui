"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  clickable?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", padding = "md", hoverable = false, clickable = false, ...props }, ref) => {
    const paddingStyles = { none: "", sm: "p-4", md: "p-5", lg: "p-6" };
    const variantStyles = {
      default: "bg-[var(--card-background)] border border-[var(--card-border)] shadow-sm",
      elevated: "bg-[var(--card-background)] shadow-md",
      outlined: "bg-transparent border border-[var(--neutral-200)]",
    };
    return (
      <div ref={ref} className={cn("rounded-[var(--radius-lg)]", variantStyles[variant], paddingStyles[padding], hoverable && "transition-shadow duration-200 hover:shadow-md", clickable && "cursor-pointer", className)} {...props} />
    );
  }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col gap-1.5 pb-4", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none text-[var(--foreground)]", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-[var(--neutral-500)]", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center pt-4 border-t border-[var(--card-border)]", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
