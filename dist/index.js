"use client";

// src/components/button/Button.tsx
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/button/Button.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var buttonVariants = cva(
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
        link: "text-[var(--brand-primary)] underline-offset-4 hover:underline"
      },
      size: {
        xs: "h-7 px-2 text-xs gap-1",
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-9 px-4 text-sm gap-2",
        lg: "h-10 px-5 text-base gap-2",
        xl: "h-12 px-6 text-base gap-2.5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);
var Button = React.forwardRef(
  ({ className, variant, size, asChild = false, loading = false, leftIcon, rightIcon, fullWidth = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;
    return /* @__PURE__ */ jsx(Comp, { ref, disabled: isDisabled, className: cn(buttonVariants({ variant, size }), fullWidth && "w-full", className), ...props, children: loading ? /* @__PURE__ */ jsx("span", { className: "size-4 border-2 border-current border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      leftIcon,
      children,
      rightIcon
    ] }) });
  }
);
Button.displayName = "Button";

// src/components/card/Card.tsx
import * as React2 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var Card = React2.forwardRef(
  ({ className, variant = "default", padding = "md", hoverable = false, clickable = false, ...props }, ref) => {
    const paddingStyles = { none: "", sm: "p-4", md: "p-5", lg: "p-6" };
    const variantStyles2 = {
      default: "bg-[var(--card-background)] border border-[var(--card-border)] shadow-sm",
      elevated: "bg-[var(--card-background)] shadow-md",
      outlined: "bg-transparent border border-[var(--neutral-200)]"
    };
    return /* @__PURE__ */ jsx2("div", { ref, className: cn("rounded-[var(--radius-lg)]", variantStyles2[variant], paddingStyles[padding], hoverable && "transition-shadow duration-200 hover:shadow-md", clickable && "cursor-pointer", className), ...props });
  }
);
Card.displayName = "Card";
var CardHeader = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("div", { ref, className: cn("flex flex-col gap-1.5 pb-4", className), ...props }));
CardHeader.displayName = "CardHeader";
var CardTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("h3", { ref, className: cn("text-lg font-semibold leading-none text-[var(--foreground)]", className), ...props }));
CardTitle.displayName = "CardTitle";
var CardDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("p", { ref, className: cn("text-sm text-[var(--neutral-500)]", className), ...props }));
CardDescription.displayName = "CardDescription";
var CardContent = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("div", { ref, className: cn("", className), ...props }));
CardContent.displayName = "CardContent";
var CardFooter = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx2("div", { ref, className: cn("flex items-center pt-4 border-t border-[var(--card-border)]", className), ...props }));
CardFooter.displayName = "CardFooter";

// src/components/input/Input.tsx
import * as React3 from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var Input = React3.forwardRef(
  ({ className, type = "text", label, error, hint, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");
    const inputElement = /* @__PURE__ */ jsxs2("div", { className: "relative", children: [
      leftIcon && /* @__PURE__ */ jsx3("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] pointer-events-none", children: leftIcon }),
      /* @__PURE__ */ jsx3(
        "input",
        {
          ref,
          id: inputId,
          type,
          "aria-invalid": !!error,
          className: cn(
            "h-9 w-full rounded-md border bg-white px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
            "border-[var(--neutral-200)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)]",
            "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--neutral-50)]",
            error && "border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            className
          ),
          ...props
        }
      ),
      rightIcon && /* @__PURE__ */ jsx3("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)] pointer-events-none", children: rightIcon })
    ] });
    if (!label && !error && !hint) return inputElement;
    return /* @__PURE__ */ jsxs2("div", { className: "w-full", children: [
      label && /* @__PURE__ */ jsx3("label", { htmlFor: inputId, className: "block text-sm font-medium text-[var(--neutral-700)] mb-1.5", children: label }),
      inputElement,
      (error || hint) && /* @__PURE__ */ jsx3("p", { className: cn("mt-1.5 text-xs", error ? "text-[var(--error)]" : "text-[var(--neutral-500)]"), children: error || hint })
    ] });
  }
);
Input.displayName = "Input";

// src/components/badge/Badge.tsx
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var badgeVariants = cva2("inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap", {
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
      CLOSED_LOST: "bg-[#F9FAFB] text-[#6B7280]"
    },
    size: { xs: "px-1.5 py-0.5 text-[10px]", sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-xs", lg: "px-3 py-1 text-sm" }
  },
  defaultVariants: { variant: "default", size: "md" }
});
function Badge({ className, variant, size, icon, dot = false, children, ...props }) {
  return /* @__PURE__ */ jsxs3("span", { className: cn(badgeVariants({ variant, size }), className), ...props, children: [
    dot && /* @__PURE__ */ jsx4("span", { className: "size-1.5 rounded-full bg-current" }),
    icon,
    children
  ] });
}

// src/components/select/Select.tsx
import * as React4 from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, NavArrowDown, NavArrowUp } from "iconoir-react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var Select = SelectPrimitive.Root;
var SelectGroup = SelectPrimitive.Group;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = React4.forwardRef(
  ({ className, size = "md", children, ...props }, ref) => /* @__PURE__ */ jsxs4(SelectPrimitive.Trigger, { ref, className: cn(
    "flex w-full items-center justify-between gap-2 rounded-md border bg-white px-3 text-sm shadow-xs transition-[color,box-shadow] outline-none",
    "border-[var(--neutral-200)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)]",
    "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
    "disabled:cursor-not-allowed disabled:opacity-50",
    size === "md" && "h-9 py-2",
    size === "sm" && "h-8 py-1.5 text-xs",
    className
  ), ...props, children: [
    children,
    /* @__PURE__ */ jsx5(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx5(NavArrowDown, { className: "size-4 opacity-50" }) })
  ] })
);
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = React4.forwardRef(
  ({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx5(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs4(SelectPrimitive.Content, { ref, className: cn(
    "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-white shadow-md border-[var(--neutral-200)]",
    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
    position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=top]:-translate-y-1",
    className
  ), position, ...props, children: [
    /* @__PURE__ */ jsx5(SelectScrollUpButton, {}),
    /* @__PURE__ */ jsx5(SelectPrimitive.Viewport, { className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"), children }),
    /* @__PURE__ */ jsx5(SelectScrollDownButton, {})
  ] }) })
);
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = React4.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx5(SelectPrimitive.Label, { ref, className: cn("px-2 py-1.5 text-xs text-[var(--neutral-500)]", className), ...props })
);
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = React4.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs4(SelectPrimitive.Item, { ref, className: cn(
    "relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none text-[var(--foreground)] focus:bg-[var(--neutral-100)] data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  ), ...props, children: [
    /* @__PURE__ */ jsx5("span", { className: "absolute right-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ jsx5(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx5(Check, { className: "size-4" }) }) }),
    /* @__PURE__ */ jsx5(SelectPrimitive.ItemText, { children })
  ] })
);
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = React4.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx5(SelectPrimitive.Separator, { ref, className: cn("-mx-1 my-1 h-px bg-[var(--neutral-100)]", className), ...props })
);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
var SelectScrollUpButton = React4.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx5(SelectPrimitive.ScrollUpButton, { ref, className: cn("flex cursor-default items-center justify-center py-1", className), ...props, children: /* @__PURE__ */ jsx5(NavArrowUp, { className: "size-4" }) })
);
var SelectScrollDownButton = React4.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx5(SelectPrimitive.ScrollDownButton, { ref, className: cn("flex cursor-default items-center justify-center py-1", className), ...props, children: /* @__PURE__ */ jsx5(NavArrowDown, { className: "size-4" }) })
);

// src/components/textarea/Textarea.tsx
import * as React5 from "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var Textarea = React5.forwardRef(({ className, label, error, hint, id, ...props }, ref) => {
  const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");
  const textareaElement = /* @__PURE__ */ jsx6("textarea", { ref, id: textareaId, "aria-invalid": !!error, className: cn(
    "min-h-[80px] w-full rounded-md border bg-white px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none resize-y",
    "border-[var(--neutral-200)] text-[var(--foreground)] placeholder:text-[var(--neutral-400)]",
    "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--neutral-50)]",
    error && "border-[var(--error)] focus-visible:border-[var(--error)] focus-visible:ring-[var(--error)]/20",
    className
  ), ...props });
  if (!label && !error && !hint) return textareaElement;
  return /* @__PURE__ */ jsxs5("div", { className: "w-full", children: [
    label && /* @__PURE__ */ jsx6("label", { htmlFor: textareaId, className: "block text-sm font-medium text-[var(--neutral-700)] mb-1.5", children: label }),
    textareaElement,
    (error || hint) && /* @__PURE__ */ jsx6("p", { className: cn("mt-1.5 text-xs", error ? "text-[var(--error)]" : "text-[var(--neutral-500)]"), children: error || hint })
  ] });
});
Textarea.displayName = "Textarea";

// src/components/label/Label.tsx
import * as React6 from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { jsx as jsx7 } from "react/jsx-runtime";
var Label2 = React6.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx7(LabelPrimitive.Root, { ref, className: cn(
    "flex items-center gap-2 text-sm leading-none font-medium select-none text-[var(--neutral-700)]",
    "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    className
  ), ...props })
);
Label2.displayName = LabelPrimitive.Root.displayName;

// src/components/checkbox/Checkbox.tsx
import * as React7 from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check as Check2 } from "iconoir-react";
import { jsx as jsx8 } from "react/jsx-runtime";
var Checkbox = React7.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx8(CheckboxPrimitive.Root, { ref, className: cn(
    "peer size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none",
    "border-[var(--neutral-300)] bg-white",
    "focus-visible:border-[var(--brand-primary)] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]/20",
    "data-[state=checked]:bg-[var(--brand-primary)] data-[state=checked]:text-white data-[state=checked]:border-[var(--brand-primary)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className
  ), ...props, children: /* @__PURE__ */ jsx8(CheckboxPrimitive.Indicator, { className: "grid place-content-center text-current", children: /* @__PURE__ */ jsx8(Check2, { className: "size-3.5", strokeWidth: 2.5 }) }) })
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

// src/components/avatar/Avatar.tsx
import * as React8 from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { jsx as jsx9 } from "react/jsx-runtime";
var Avatar = React8.forwardRef(
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses2 = { xs: "size-6", sm: "size-8", md: "size-10", lg: "size-12", xl: "size-16" };
    return /* @__PURE__ */ jsx9(AvatarPrimitive.Root, { ref, className: cn("relative flex shrink-0 overflow-hidden rounded-full", sizeClasses2[size], className), ...props });
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;
var AvatarImage = React8.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx9(AvatarPrimitive.Image, { ref, className: cn("aspect-square size-full", className), ...props })
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
var AvatarFallback = React8.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx9(AvatarPrimitive.Fallback, { ref, className: cn("flex size-full items-center justify-center rounded-full bg-[var(--neutral-100)] text-[var(--neutral-600)] text-sm font-medium", className), ...props })
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// src/components/dialog/Dialog.tsx
import * as React9 from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Xmark } from "iconoir-react";
import { jsx as jsx10, jsxs as jsxs6 } from "react/jsx-runtime";
var Dialog = DialogPrimitive.Root;
var DialogTrigger = DialogPrimitive.Trigger;
var DialogPortal = DialogPrimitive.Portal;
var DialogClose = DialogPrimitive.Close;
var DialogOverlay = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx10(DialogPrimitive.Overlay, { ref, className: cn("fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className), ...props })
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React9.forwardRef(
  ({ className, children, showCloseButton = true, ...props }, ref) => /* @__PURE__ */ jsxs6(DialogPortal, { children: [
    /* @__PURE__ */ jsx10(DialogOverlay, {}),
    /* @__PURE__ */ jsxs6(DialogPrimitive.Content, { ref, className: cn(
      "fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 outline-none",
      "bg-[var(--card-background)] border-[var(--card-border)]",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      "max-w-[calc(100%-2rem)] sm:max-w-lg",
      className
    ), ...props, children: [
      children,
      showCloseButton && /* @__PURE__ */ jsxs6(DialogPrimitive.Close, { className: cn("absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4"), children: [
        /* @__PURE__ */ jsx10(Xmark, { className: "size-4" }),
        /* @__PURE__ */ jsx10("span", { className: "sr-only", children: "Close" })
      ] })
    ] })
  ] })
);
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx10("div", { className: cn("flex flex-col gap-2 text-center sm:text-left", className), ...props });
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx10("div", { className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className), ...props });
var DialogTitle = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx10(DialogPrimitive.Title, { ref, className: cn("text-lg leading-none font-semibold text-[var(--foreground)]", className), ...props })
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React9.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx10(DialogPrimitive.Description, { ref, className: cn("text-sm text-[var(--neutral-500)]", className), ...props })
);
DialogDescription.displayName = DialogPrimitive.Description.displayName;

// src/components/spinner/Spinner.tsx
import { jsx as jsx11, jsxs as jsxs7 } from "react/jsx-runtime";
var sizeClasses = { xs: "size-3 border-[1.5px]", sm: "size-4 border-2", md: "size-6 border-2", lg: "size-8 border-2", xl: "size-12 border-3" };
function Spinner({ size = "md", className }) {
  return /* @__PURE__ */ jsx11("div", { className: cn("animate-spin rounded-full border-[var(--neutral-300)] border-t-[var(--brand-primary)]", sizeClasses[size], className) });
}
function LoadingOverlay({ message }) {
  return /* @__PURE__ */ jsx11("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm", children: /* @__PURE__ */ jsxs7("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsx11(Spinner, { size: "lg" }),
    message && /* @__PURE__ */ jsx11("p", { className: "text-sm font-medium text-[var(--neutral-600)]", children: message })
  ] }) });
}
function InlineLoading({ message }) {
  return /* @__PURE__ */ jsxs7("div", { className: "flex items-center justify-center gap-2 py-8", children: [
    /* @__PURE__ */ jsx11(Spinner, { size: "sm" }),
    message && /* @__PURE__ */ jsx11("span", { className: "text-sm text-[var(--neutral-500)]", children: message })
  ] });
}
function ButtonSpinner() {
  return /* @__PURE__ */ jsx11(Spinner, { size: "sm", className: "border-white/30 border-t-white" });
}
function PageLoader({ message = "Loading..." }) {
  return /* @__PURE__ */ jsxs7("div", { className: "flex flex-col items-center justify-center min-h-[400px]", children: [
    /* @__PURE__ */ jsx11(Spinner, { size: "lg" }),
    /* @__PURE__ */ jsx11("p", { className: "mt-4 text-[var(--neutral-500)] font-medium", children: message })
  ] });
}
function CardLoader({ message }) {
  return /* @__PURE__ */ jsxs7("div", { className: "flex flex-col items-center justify-center py-12", children: [
    /* @__PURE__ */ jsx11(Spinner, { size: "md" }),
    message && /* @__PURE__ */ jsx11("p", { className: "mt-3 text-sm text-[var(--neutral-500)]", children: message })
  ] });
}

// src/components/empty-state/EmptyState.tsx
import { jsx as jsx12, jsxs as jsxs8 } from "react/jsx-runtime";
function EmptyState({ icon, title, description, action, className }) {
  return /* @__PURE__ */ jsxs8("div", { className: cn("flex flex-col items-center justify-center py-12 px-4 text-center", className), children: [
    icon && /* @__PURE__ */ jsx12("div", { className: "size-16 rounded-full bg-[var(--neutral-100)] flex items-center justify-center mb-4", children: /* @__PURE__ */ jsx12("div", { className: "text-[var(--neutral-400)]", children: icon }) }),
    /* @__PURE__ */ jsx12("h3", { className: "text-lg font-semibold text-[var(--foreground)] mb-1", children: title }),
    description && /* @__PURE__ */ jsx12("p", { className: "text-sm text-[var(--neutral-500)] max-w-sm mb-4", children: description }),
    action && /* @__PURE__ */ jsx12(Button, { onClick: action.onClick, children: action.label })
  ] });
}

// src/components/pagination/Pagination.tsx
import { NavArrowLeft, NavArrowRight } from "iconoir-react";
import { jsx as jsx13, jsxs as jsxs9 } from "react/jsx-runtime";
function Pagination({ page, totalPages, total, onPageChange, className, showTotal = true }) {
  if (totalPages <= 1) return null;
  const pages = [1];
  if (page > 3) pages.push("...");
  for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  if (page < totalPages - 2) pages.push("...");
  if (totalPages > 1 && !pages.includes(totalPages)) pages.push(totalPages);
  return /* @__PURE__ */ jsxs9("div", { className: cn("flex items-center justify-between gap-4 px-4 py-3 bg-white border-t border-[var(--neutral-100)]", className), children: [
    showTotal && /* @__PURE__ */ jsxs9("p", { className: "text-sm text-[var(--neutral-500)]", children: [
      "Showing page ",
      page,
      " of ",
      totalPages,
      " (",
      total,
      " total)"
    ] }),
    /* @__PURE__ */ jsxs9("div", { className: cn("flex items-center gap-1", !showTotal && "mx-auto"), children: [
      /* @__PURE__ */ jsx13("button", { onClick: () => onPageChange(page - 1), disabled: page === 1, className: cn("p-2 rounded-lg transition-colors", page === 1 ? "text-[var(--neutral-300)] cursor-not-allowed" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"), children: /* @__PURE__ */ jsx13(NavArrowLeft, { width: 16, height: 16 }) }),
      pages.map((p, i) => p === "..." ? /* @__PURE__ */ jsx13("span", { className: "px-2 text-[var(--neutral-400)]", children: "..." }, `ellipsis-${i}`) : /* @__PURE__ */ jsx13("button", { onClick: () => onPageChange(p), className: cn("min-w-[32px] h-8 px-2 rounded-lg text-sm font-medium transition-colors", p === page ? "bg-[var(--brand-primary)] text-white" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"), children: p }, p)),
      /* @__PURE__ */ jsx13("button", { onClick: () => onPageChange(page + 1), disabled: page === totalPages, className: cn("p-2 rounded-lg transition-colors", page === totalPages ? "text-[var(--neutral-300)] cursor-not-allowed" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"), children: /* @__PURE__ */ jsx13(NavArrowRight, { width: 16, height: 16 }) })
    ] })
  ] });
}

// src/components/table/Table.tsx
import { jsx as jsx14, jsxs as jsxs10 } from "react/jsx-runtime";
function Table({ columns, data, keyField, onRowClick, sortBy, sortOrder, onSort, isLoading, emptyMessage = "No data found", className }) {
  if (isLoading) {
    return /* @__PURE__ */ jsx14("div", { className: cn("bg-white rounded-xl border border-[var(--neutral-100)] overflow-hidden", className), children: /* @__PURE__ */ jsxs10("div", { className: "animate-pulse", children: [
      /* @__PURE__ */ jsx14("div", { className: "h-12 bg-[var(--neutral-50)] border-b border-[var(--neutral-100)]" }),
      [...Array(5)].map((_, i) => /* @__PURE__ */ jsx14("div", { className: "h-16 border-b border-[var(--neutral-100)] last:border-b-0", children: /* @__PURE__ */ jsx14("div", { className: "h-4 bg-[var(--neutral-100)] rounded m-4 w-3/4" }) }, i))
    ] }) });
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsx14("div", { className: cn("bg-white rounded-xl border border-[var(--neutral-100)] p-12 text-center", className), children: /* @__PURE__ */ jsx14("p", { className: "text-[var(--neutral-500)]", children: emptyMessage }) });
  }
  return /* @__PURE__ */ jsx14("div", { className: cn("bg-white rounded-xl border border-[var(--neutral-100)] overflow-hidden", className), children: /* @__PURE__ */ jsx14("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs10("table", { className: "w-full", children: [
    /* @__PURE__ */ jsx14("thead", { children: /* @__PURE__ */ jsx14("tr", { className: "bg-[var(--neutral-50)] border-b border-[var(--neutral-100)]", children: columns.map((column) => /* @__PURE__ */ jsx14("th", { className: cn("px-4 py-3 text-left text-xs font-semibold text-[var(--neutral-600)] uppercase tracking-wider", column.sortable && "cursor-pointer hover:bg-[var(--neutral-100)] select-none", column.className), onClick: () => column.sortable && onSort?.(column.key), children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center gap-1", children: [
      column.header,
      column.sortable && sortBy === column.key && /* @__PURE__ */ jsx14("span", { className: "text-[var(--brand-primary)]", children: sortOrder === "asc" ? "\u2191" : "\u2193" })
    ] }) }, column.key)) }) }),
    /* @__PURE__ */ jsx14("tbody", { className: "divide-y divide-[var(--neutral-100)]", children: data.map((item) => /* @__PURE__ */ jsx14("tr", { onClick: () => onRowClick?.(item), className: cn("hover:bg-[var(--neutral-50)] transition-colors", onRowClick && "cursor-pointer"), children: columns.map((column) => /* @__PURE__ */ jsx14("td", { className: cn("px-4 py-3 text-sm text-[var(--foreground)]", column.className), children: column.render ? column.render(item) : String(item[column.key] ?? "") }, column.key)) }, String(item[keyField]))) })
  ] }) }) });
}

// src/components/progress/Progress.tsx
import * as React10 from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { jsx as jsx15 } from "react/jsx-runtime";
var variantStyles = { default: "bg-[var(--brand-primary)]", success: "bg-[var(--success)]", warning: "bg-[var(--warning)]", error: "bg-[var(--error)]", hot: "bg-[var(--hot)]", cold: "bg-[var(--cold)]" };
var sizeStyles = { sm: "h-1.5", md: "h-2", lg: "h-3" };
var Progress = React10.forwardRef(
  ({ className, value, variant = "default", size = "md", ...props }, ref) => /* @__PURE__ */ jsx15(ProgressPrimitive.Root, { ref, className: cn("relative w-full overflow-hidden rounded-full bg-[var(--neutral-100)]", sizeStyles[size], className), ...props, children: /* @__PURE__ */ jsx15(ProgressPrimitive.Indicator, { className: cn("h-full w-full flex-1 transition-all duration-300 ease-in-out rounded-full", variantStyles[variant]), style: { transform: `translateX(-${100 - (value || 0)}%)` } }) })
);
Progress.displayName = ProgressPrimitive.Root.displayName;

// src/components/survey-step-card/SurveyStepCard.tsx
import * as React11 from "react";
import { jsx as jsx16, jsxs as jsxs11 } from "react/jsx-runtime";
function IllustrationBox({
  accent,
  illustration,
  pattern
}) {
  return /* @__PURE__ */ jsxs11(
    "div",
    {
      className: "relative flex items-center justify-center overflow-hidden shrink-0",
      style: { width: 88, height: 88, borderRadius: 18, backgroundColor: `${accent}14` },
      children: [
        pattern && /* @__PURE__ */ jsx16("svg", { className: "absolute inset-0 w-full h-full", viewBox: "0 0 88 88", style: { opacity: 0.07 }, children: pattern }),
        illustration && /* @__PURE__ */ jsx16("div", { className: "relative", children: illustration })
      ]
    }
  );
}
function BackButton({ onClick }) {
  return /* @__PURE__ */ jsxs11(
    "button",
    {
      type: "button",
      onClick,
      className: "flex items-center gap-1 text-xs text-[var(--neutral-400)] hover:text-[var(--neutral-600)] transition-colors mb-3 -ml-0.5",
      children: [
        /* @__PURE__ */ jsx16("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx16("path", { d: "M15 18l-6-6 6-6" }) }),
        /* @__PURE__ */ jsx16("span", { children: "Back" })
      ]
    }
  );
}
function GradientProgress({
  value,
  accent
}) {
  return /* @__PURE__ */ jsxs11("div", { children: [
    /* @__PURE__ */ jsx16("div", { className: "h-2 bg-[var(--neutral-100)] rounded-full overflow-hidden mb-2", children: /* @__PURE__ */ jsx16(
      "div",
      {
        className: "h-full rounded-full transition-all duration-500 ease-out",
        style: {
          width: `${value}%`,
          background: `linear-gradient(90deg, ${accent}66 0%, ${accent} 100%)`
        }
      }
    ) }),
    /* @__PURE__ */ jsxs11("p", { className: "text-xs text-[var(--neutral-400)] text-center", children: [
      Math.round(value),
      "% complete"
    ] })
  ] });
}
function OptionButton({
  option,
  isSelected,
  accent,
  onClick
}) {
  return /* @__PURE__ */ jsx16(
    "button",
    {
      type: "button",
      onClick,
      className: "py-3 px-4 text-left rounded-xl border-2 transition-all duration-150 text-sm font-medium",
      style: {
        borderColor: isSelected ? accent : "var(--neutral-200)",
        backgroundColor: isSelected ? `${accent}14` : "white",
        color: isSelected ? accent : "var(--neutral-700)"
      },
      children: option
    }
  );
}
var SurveyStepCard = React11.forwardRef(
  ({
    className,
    questions,
    step,
    onStepChange,
    selections = {},
    onSelect,
    autoAdvance = true,
    advanceDelay = 400,
    showProgress = true,
    showBack = true,
    footer,
    ...props
  }, ref) => {
    const [animating, setAnimating] = React11.useState(false);
    const q = questions[step];
    if (!q) return null;
    const progress = (step + (selections[q.key] ? 1 : 0)) / questions.length * 100;
    const handleSelect = (option) => {
      onSelect?.(q.key, option);
      if (autoAdvance && step < questions.length - 1) {
        setAnimating(true);
        setTimeout(() => {
          onStepChange?.(step + 1);
          setAnimating(false);
        }, advanceDelay);
      }
    };
    const handleBack = () => {
      if (step > 0) {
        setAnimating(true);
        setTimeout(() => {
          onStepChange?.(step - 1);
          setAnimating(false);
        }, 300);
      }
    };
    return /* @__PURE__ */ jsxs11(
      "div",
      {
        ref,
        className: cn(
          "w-full max-w-lg bg-white rounded-2xl shadow-md border border-[var(--neutral-100)] overflow-hidden",
          className
        ),
        style: {
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "all 300ms ease-out"
        },
        ...props,
        children: [
          (showProgress || showBack) && /* @__PURE__ */ jsxs11("div", { className: "px-6 pt-5", children: [
            showBack && step > 0 && /* @__PURE__ */ jsx16(BackButton, { onClick: handleBack }),
            showProgress && /* @__PURE__ */ jsx16(GradientProgress, { value: progress, accent: q.accent })
          ] }),
          /* @__PURE__ */ jsxs11("div", { className: "px-6 pt-4 pb-2 flex items-start gap-5", children: [
            (q.illustration || q.pattern) && /* @__PURE__ */ jsx16(IllustrationBox, { accent: q.accent, illustration: q.illustration, pattern: q.pattern }),
            /* @__PURE__ */ jsxs11("div", { className: "flex-1 pt-1", children: [
              /* @__PURE__ */ jsx16(
                "h3",
                {
                  className: "text-xl font-bold text-[var(--foreground)] mb-1",
                  style: { fontFamily: "var(--font-heading, 'Montserrat', sans-serif)" },
                  children: q.question
                }
              ),
              q.helper && /* @__PURE__ */ jsx16("p", { className: "text-sm text-[var(--neutral-500)]", children: q.helper })
            ] })
          ] }),
          /* @__PURE__ */ jsx16(
            "div",
            {
              className: "px-6 py-4",
              style: { display: "grid", gridTemplateColumns: `repeat(${q.columns ?? 2}, 1fr)`, gap: 10 },
              children: q.options.map((option) => /* @__PURE__ */ jsx16(
                OptionButton,
                {
                  option,
                  isSelected: selections[q.key] === option,
                  accent: q.accent,
                  onClick: () => handleSelect(option)
                },
                option
              ))
            }
          ),
          footer && /* @__PURE__ */ jsx16("div", { className: "px-6 pb-5", children: footer })
        ]
      }
    );
  }
);
SurveyStepCard.displayName = "SurveyStepCard";

// src/components/survey-step-card/patterns.tsx
import { Fragment as Fragment2, jsx as jsx17, jsxs as jsxs12 } from "react/jsx-runtime";
function ConcentricCircles({ accent }) {
  return /* @__PURE__ */ jsx17(Fragment2, { children: [14, 24, 34].map((r) => /* @__PURE__ */ jsx17("circle", { cx: "50%", cy: "50%", r, fill: "none", stroke: accent, strokeWidth: "0.8" }, r)) });
}
function DotGrid({ accent }) {
  return /* @__PURE__ */ jsx17(Fragment2, { children: Array.from({ length: 25 }).map((_, i) => /* @__PURE__ */ jsx17(
    "circle",
    {
      cx: 14 + i % 5 * 16,
      cy: 14 + Math.floor(i / 5) * 16,
      r: "1.8",
      fill: accent
    },
    i
  )) });
}
function OrbitalRings({ accent }) {
  return /* @__PURE__ */ jsxs12(Fragment2, { children: [
    /* @__PURE__ */ jsx17("circle", { cx: "50%", cy: "50%", r: "20", fill: "none", stroke: accent, strokeWidth: "0.7", strokeDasharray: "4 5" }),
    /* @__PURE__ */ jsx17("circle", { cx: "50%", cy: "50%", r: "30", fill: "none", stroke: accent, strokeWidth: "0.7", strokeDasharray: "3 6" }),
    /* @__PURE__ */ jsx17("circle", { cx: "68", cy: "22", r: "2", fill: accent, opacity: "0.4" })
  ] });
}
function CrossHatch({ accent }) {
  return /* @__PURE__ */ jsxs12(Fragment2, { children: [
    Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx17(
      "line",
      {
        x1: i * 14 - 10,
        y1: "0",
        x2: i * 14 + 40,
        y2: "88",
        stroke: accent,
        strokeWidth: "0.6"
      },
      `a${i}`
    )),
    Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ jsx17(
      "line",
      {
        x1: i * 14 + 10,
        y1: "0",
        x2: i * 14 - 40,
        y2: "88",
        stroke: accent,
        strokeWidth: "0.6"
      },
      `b${i}`
    ))
  ] });
}
function DiamondGrid({ accent }) {
  return /* @__PURE__ */ jsx17(Fragment2, { children: Array.from({ length: 9 }).map((_, i) => /* @__PURE__ */ jsx17(
    "rect",
    {
      x: 14 + i % 3 * 22,
      y: 14 + Math.floor(i / 3) * 22,
      width: "10",
      height: "10",
      fill: "none",
      stroke: accent,
      strokeWidth: "0.7",
      transform: `rotate(45 ${19 + i % 3 * 22} ${19 + Math.floor(i / 3) * 22})`
    },
    i
  )) });
}
function RadialBurst({ accent }) {
  return /* @__PURE__ */ jsx17(Fragment2, { children: Array.from({ length: 12 }).map((_, i) => {
    const angle = i * 30 * Math.PI / 180;
    return /* @__PURE__ */ jsx17(
      "line",
      {
        x1: "44",
        y1: "44",
        x2: 44 + Math.cos(angle) * 36,
        y2: 44 + Math.sin(angle) * 36,
        stroke: accent,
        strokeWidth: "0.6"
      },
      i
    );
  }) });
}
var PATTERNS = {
  "concentric-circles": ConcentricCircles,
  "dot-grid": DotGrid,
  "orbital-rings": OrbitalRings,
  "cross-hatch": CrossHatch,
  "diamond-grid": DiamondGrid,
  "radial-burst": RadialBurst
};

// src/components/toast/Toast.tsx
import * as React12 from "react";
import { jsx as jsx18, jsxs as jsxs13 } from "react/jsx-runtime";
var VARIANT_STYLES = {
  success: {
    bg: "bg-[var(--success)]",
    icon: /* @__PURE__ */ jsx18("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx18("path", { d: "M20 6L9 17l-5-5" }) })
  },
  warning: {
    bg: "bg-[var(--warning)]",
    icon: /* @__PURE__ */ jsxs13("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx18("path", { d: "M12 9v4" }),
      /* @__PURE__ */ jsx18("circle", { cx: "12", cy: "17", r: "0.5", fill: "currentColor" })
    ] })
  },
  error: {
    bg: "bg-[var(--error)]",
    icon: /* @__PURE__ */ jsx18("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx18("path", { d: "M18 6L6 18M6 6l12 12" }) })
  },
  info: {
    bg: "bg-[var(--info)]",
    icon: /* @__PURE__ */ jsxs13("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx18("circle", { cx: "12", cy: "8", r: "0.5", fill: "currentColor" }),
      /* @__PURE__ */ jsx18("path", { d: "M12 12v5" })
    ] })
  }
};
var Toast = React12.forwardRef(
  ({ className, toast, duration = 250, visible = true, onDismiss, ...props }, ref) => {
    const style = VARIANT_STYLES[toast.variant];
    return /* @__PURE__ */ jsxs13(
      "div",
      {
        ref,
        role: "alert",
        className: cn(
          "bg-[var(--card-background,white)] rounded-[var(--radius-lg,0.5rem)] shadow-lg border border-[var(--neutral-100)] flex items-center gap-3 px-4 py-3 min-w-[260px] max-w-[400px]",
          className
        ),
        style: {
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-8px)",
          transition: `all ${duration}ms ease-out`
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx18(
            "div",
            {
              className: cn(
                style.bg,
                "size-6 rounded-full flex items-center justify-center text-white shrink-0"
              ),
              children: style.icon
            }
          ),
          /* @__PURE__ */ jsxs13("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx18("p", { className: "text-sm font-medium text-[var(--foreground)]", children: toast.title }),
            toast.description && /* @__PURE__ */ jsx18("p", { className: "text-xs text-[var(--neutral-500)] mt-0.5", children: toast.description })
          ] }),
          onDismiss && /* @__PURE__ */ jsx18(
            "button",
            {
              type: "button",
              onClick: () => onDismiss(toast.id),
              className: "text-[var(--neutral-400)] hover:text-[var(--neutral-600)] transition-colors shrink-0 p-0.5",
              "aria-label": "Dismiss",
              children: /* @__PURE__ */ jsx18("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx18("path", { d: "M18 6L6 18M6 6l12 12" }) })
            }
          )
        ]
      }
    );
  }
);
Toast.displayName = "Toast";

// src/components/toast/ToastProvider.tsx
import * as React13 from "react";
import { jsx as jsx19, jsxs as jsxs14 } from "react/jsx-runtime";
var ToastContext = React13.createContext(null);
function ToastProvider({
  children,
  position = "top-right",
  duration = 250,
  autoDismiss = 4e3,
  maxVisible = 5
}) {
  const [toasts, setToasts] = React13.useState([]);
  const nextId = React13.useRef(0);
  const removeToast = React13.useCallback(
    (id) => {
      setToasts((prev) => prev.map((t) => t.id === id ? { ...t, visible: false } : t));
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    },
    [duration]
  );
  React13.useEffect(() => {
    if (autoDismiss === 0) return;
    const timers = [];
    toasts.filter((t) => t.visible).forEach((t) => {
      const timer = setTimeout(() => removeToast(t.id), autoDismiss);
      timers.push(timer);
    });
    return () => timers.forEach(clearTimeout);
  }, [toasts, autoDismiss, removeToast]);
  const addToast = React13.useCallback(
    (options) => {
      const id = `toast-${nextId.current++}`;
      const newToast = {
        id,
        variant: options.variant ?? "info",
        title: options.title,
        description: options.description,
        visible: false
      };
      setToasts((prev) => {
        const updated = [...prev, newToast];
        if (updated.length > maxVisible) {
          return updated.slice(-maxVisible);
        }
        return updated;
      });
      requestAnimationFrame(() => {
        setToasts((prev) => prev.map((t) => t.id === id ? { ...t, visible: true } : t));
      });
    },
    [maxVisible]
  );
  const ctx = React13.useMemo(
    () => ({
      toast: addToast,
      success: (title, description) => addToast({ variant: "success", title, description }),
      error: (title, description) => addToast({ variant: "error", title, description }),
      warning: (title, description) => addToast({ variant: "warning", title, description }),
      info: (title, description) => addToast({ variant: "info", title, description }),
      dismiss: removeToast,
      dismissAll: () => setToasts([])
    }),
    [addToast, removeToast]
  );
  const positionClasses = {
    "top-right": "top-3 right-3 items-end",
    "top-center": "top-3 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-3 right-3 items-end",
    "bottom-center": "bottom-3 left-1/2 -translate-x-1/2 items-center"
  };
  return /* @__PURE__ */ jsxs14(ToastContext, { value: ctx, children: [
    children,
    /* @__PURE__ */ jsx19(
      "div",
      {
        className: cn("fixed z-50 flex flex-col gap-2 pointer-events-none", positionClasses[position]),
        "aria-live": "polite",
        children: toasts.map((t) => /* @__PURE__ */ jsx19("div", { className: "pointer-events-auto", children: /* @__PURE__ */ jsx19(
          Toast,
          {
            toast: t,
            visible: t.visible,
            duration,
            onDismiss: removeToast
          }
        ) }, t.id))
      }
    )
  ] });
}
function useToast() {
  const ctx = React13.useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

// src/components/skeleton/Skeleton.tsx
import * as React14 from "react";
import { jsx as jsx20 } from "react/jsx-runtime";
var Skeleton = React14.forwardRef(
  ({
    className,
    shimmerDuration = 1800,
    baseColor,
    highlightColor,
    width,
    height,
    radius,
    style,
    ...props
  }, ref) => {
    const base = baseColor ?? "var(--neutral-200, #E1E4E8)";
    const highlight = highlightColor ?? "var(--neutral-50, #FAFBFC)";
    return /* @__PURE__ */ jsx20(
      "div",
      {
        ref,
        className: cn("animate-[skeleton-shimmer_var(--skeleton-duration)_infinite_ease-in-out]", className),
        style: {
          width: width ?? "100%",
          height: height ?? "1rem",
          borderRadius: radius ?? "0.25rem",
          background: `linear-gradient(90deg, ${base} 25%, ${highlight} 50%, ${base} 75%)`,
          backgroundSize: "200% 100%",
          animationDuration: `${shimmerDuration}ms`,
          animationName: "skeleton-shimmer",
          ...style
        },
        ...props
      }
    );
  }
);
Skeleton.displayName = "Skeleton";
var SkeletonCircle = React14.forwardRef(
  ({ size = 40, ...props }, ref) => /* @__PURE__ */ jsx20(Skeleton, { ref, width: size, height: size, radius: "9999px", ...props })
);
SkeletonCircle.displayName = "SkeletonCircle";
var SkeletonText = React14.forwardRef(
  ({ lines = 3, lineHeight = 12, gap = 8, lastLineWidth = 60, className, ...props }, ref) => /* @__PURE__ */ jsx20("div", { ref, className: cn("flex flex-col", className), style: { gap }, children: Array.from({ length: lines }).map((_, i) => /* @__PURE__ */ jsx20(
    Skeleton,
    {
      height: lineHeight,
      width: i === lines - 1 ? `${lastLineWidth}%` : "100%",
      ...props
    },
    i
  )) })
);
SkeletonText.displayName = "SkeletonText";
var injected = false;
function SkeletonStyles() {
  React14.useEffect(() => {
    if (injected || typeof document === "undefined") return;
    injected = true;
    const style = document.createElement("style");
    style.textContent = `@keyframes skeleton-shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }`;
    document.head.appendChild(style);
    return () => {
    };
  }, []);
  return null;
}

// src/components/app-shell/AppShell.tsx
import * as React15 from "react";
import { jsx as jsx21, jsxs as jsxs15 } from "react/jsx-runtime";
var AppShell = React15.forwardRef(
  ({ className, header, children, ...props }, ref) => /* @__PURE__ */ jsxs15(
    "div",
    {
      ref,
      className: cn("min-h-screen flex flex-col bg-[var(--background)]", className),
      ...props,
      children: [
        header,
        /* @__PURE__ */ jsx21("div", { className: "flex-1 flex flex-col", children })
      ]
    }
  )
);
AppShell.displayName = "AppShell";

// src/components/app-header/AppHeader.tsx
import * as React16 from "react";
import { Fragment as Fragment3, jsx as jsx22, jsxs as jsxs16 } from "react/jsx-runtime";
var AppHeader = React16.forwardRef(
  ({ className, logo, title, leftSlot, rightSlot, children, ...props }, ref) => /* @__PURE__ */ jsx22(
    "header",
    {
      ref,
      className: cn(
        "sticky top-0 z-30 bg-[var(--card-background)] border-b border-[var(--card-border)] px-4 py-3",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxs16("div", { className: "flex items-center justify-between max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-3", children: [
          logo,
          title && /* @__PURE__ */ jsxs16(Fragment3, { children: [
            /* @__PURE__ */ jsx22("div", { className: "h-5 w-px bg-[var(--neutral-200)]" }),
            /* @__PURE__ */ jsx22("span", { className: "text-sm text-[var(--neutral-500)]", children: title })
          ] }),
          leftSlot
        ] }),
        /* @__PURE__ */ jsxs16("div", { className: "flex items-center gap-1", children: [
          rightSlot,
          children
        ] })
      ] })
    }
  )
);
AppHeader.displayName = "AppHeader";
var AppHeaderAction = React16.forwardRef(
  ({ className, dot = false, children, ...props }, ref) => /* @__PURE__ */ jsxs16(
    "button",
    {
      ref,
      className: cn(
        "relative p-2 rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-50)] hover:text-[var(--neutral-700)] transition-colors",
        className
      ),
      ...props,
      children: [
        children,
        dot && /* @__PURE__ */ jsx22("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--hot)] rounded-full" })
      ]
    }
  )
);
AppHeaderAction.displayName = "AppHeaderAction";
var AppHeaderDivider = React16.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx22(
  "div",
  {
    ref,
    className: cn("h-5 w-px bg-[var(--neutral-200)]", className),
    ...props
  }
));
AppHeaderDivider.displayName = "AppHeaderDivider";

// src/components/slide-panel/SlidePanel.tsx
import * as React17 from "react";
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import { jsx as jsx23, jsxs as jsxs17 } from "react/jsx-runtime";
function SlidePanel({
  isOpen,
  onClose,
  position = "right",
  width = "280px",
  children,
  className
}) {
  return /* @__PURE__ */ jsx23(DialogPrimitive2.Root, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxs17(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ jsx23(
      DialogPrimitive2.Overlay,
      {
        className: "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      }
    ),
    /* @__PURE__ */ jsx23(
      DialogPrimitive2.Content,
      {
        className: cn(
          "fixed top-0 z-50 h-full bg-[var(--card-background)] shadow-xl flex flex-col",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:duration-300 data-[state=closed]:duration-200",
          position === "right" && "right-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          position === "left" && "left-0 data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
          className
        ),
        style: { width },
        children
      }
    )
  ] }) });
}
var SlidePanelHeader = React17.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn(
      "flex items-center justify-between px-5 py-4 border-b border-[var(--card-border)]",
      className
    ),
    ...props
  }
));
SlidePanelHeader.displayName = "SlidePanelHeader";
var SlidePanelBody = React17.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn("flex-1 overflow-y-auto", className),
    ...props
  }
));
SlidePanelBody.displayName = "SlidePanelBody";
var SlidePanelFooter = React17.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx23(
  "div",
  {
    ref,
    className: cn("border-t border-[var(--card-border)] py-2", className),
    ...props
  }
));
SlidePanelFooter.displayName = "SlidePanelFooter";
var SlidePanelClose = DialogPrimitive2.Close;

// src/components/page-container/PageContainer.tsx
import * as React18 from "react";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx24 } from "react/jsx-runtime";
var pageContainerVariants = cva3("mx-auto w-full", {
  variants: {
    maxWidth: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-full"
    },
    padding: {
      sm: "px-3 py-4",
      md: "px-4 py-6",
      lg: "px-6 py-8"
    }
  },
  defaultVariants: { maxWidth: "xl", padding: "md" }
});
var PageContainer = React18.forwardRef(
  ({ className, maxWidth, padding, ...props }, ref) => /* @__PURE__ */ jsx24(
    "main",
    {
      ref,
      className: cn(pageContainerVariants({ maxWidth, padding }), className),
      ...props
    }
  )
);
PageContainer.displayName = "PageContainer";

// src/components/dashboard-shell/DashboardShell.tsx
import { useState as useState3 } from "react";
import { Menu } from "iconoir-react";
import { jsx as jsx25, jsxs as jsxs18 } from "react/jsx-runtime";
function Sidebar({
  navGroups,
  activeNavLabel,
  onNavClick,
  hovered,
  onHover
}) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      className: "rounded-xl flex-shrink-0 overflow-hidden transition-all duration-300 hidden md:block",
      style: {
        width: hovered ? 190 : 60,
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--card-border)"
      },
      onMouseEnter: () => onHover(true),
      onMouseLeave: () => onHover(false),
      children: /* @__PURE__ */ jsx25("div", { className: "py-2", children: navGroups.map((group, gi) => /* @__PURE__ */ jsxs18("div", { children: [
        group.label && hovered && /* @__PURE__ */ jsx25("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-400)] px-4 pt-3 pb-1", children: group.label }),
        group.items.map((item) => {
          const isActive = item.label === activeNavLabel;
          return /* @__PURE__ */ jsxs18(
            "button",
            {
              onClick: () => onNavClick?.(item),
              className: "w-full flex items-center gap-2.5 py-2.5 transition-colors",
              style: {
                paddingLeft: hovered ? 14 : 16,
                paddingRight: 14,
                backgroundColor: isActive ? "var(--brand-primary)" : "transparent",
                color: isActive ? "#fff" : "var(--neutral-600)",
                borderRadius: isActive ? 10 : 0,
                margin: isActive ? "2px 6px" : "0",
                width: isActive ? "calc(100% - 12px)" : "100%"
              },
              children: [
                /* @__PURE__ */ jsx25("div", { className: "size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5", children: item.icon }),
                hovered && /* @__PURE__ */ jsx25("span", { className: "text-xs font-medium whitespace-nowrap", children: item.label })
              ]
            },
            item.label
          );
        })
      ] }, gi)) })
    }
  );
}
function MobileNav({
  open,
  onClose,
  navGroups,
  activeNavLabel,
  onNavClick,
  agentName,
  agentInitials,
  agentSubtitle
}) {
  return /* @__PURE__ */ jsxs18(SlidePanel, { isOpen: open, onClose, position: "left", width: "280px", children: [
    /* @__PURE__ */ jsx25(SlidePanelHeader, { children: /* @__PURE__ */ jsx25("span", { className: "font-semibold text-[var(--neutral-900)]", children: "Menu" }) }),
    /* @__PURE__ */ jsxs18("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-[var(--card-border)]", children: [
      /* @__PURE__ */ jsx25(
        "div",
        {
          className: "w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold",
          style: { background: "var(--brand-primary-light)", color: "var(--brand-primary)" },
          children: agentInitials
        }
      ),
      /* @__PURE__ */ jsxs18("div", { children: [
        /* @__PURE__ */ jsx25("div", { className: "font-medium text-sm text-[var(--neutral-900)]", children: agentName }),
        agentSubtitle && /* @__PURE__ */ jsx25("div", { className: "text-xs text-[var(--neutral-500)]", children: agentSubtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsx25(SlidePanelBody, { children: /* @__PURE__ */ jsx25("nav", { className: "py-2", children: navGroups.map((group, gi) => /* @__PURE__ */ jsxs18("div", { children: [
      group.label && /* @__PURE__ */ jsx25("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-400)] px-5 pt-3 pb-1", children: group.label }),
      group.items.map((item) => {
        const isActive = item.label === activeNavLabel;
        return /* @__PURE__ */ jsxs18(
          "button",
          {
            onClick: () => {
              onNavClick?.(item);
              onClose();
            },
            className: cn(
              "flex items-center gap-3 w-full px-5 py-2.5 text-sm transition-colors",
              isActive ? "bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-semibold" : "text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]"
            ),
            children: [
              /* @__PURE__ */ jsx25("div", { className: "size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5", children: item.icon }),
              item.label
            ]
          },
          item.label
        );
      })
    ] }, gi)) }) })
  ] });
}
function DashboardShell({
  logo,
  appTitle,
  appSubtitle,
  highlightText,
  agentName,
  agentInitials,
  agentSubtitle,
  navGroups,
  activeNavLabel,
  onNavClick,
  heroContent,
  rightCard,
  children,
  className
}) {
  const [sidebarHovered, setSidebarHovered] = useState3(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState3(false);
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      className: cn("min-h-screen", className),
      style: { backgroundColor: "var(--background)" },
      children: [
        /* @__PURE__ */ jsxs18("div", { className: "flex items-start justify-between px-4 md:px-6 pt-4 md:pt-6", children: [
          /* @__PURE__ */ jsxs18("div", { className: "flex items-start gap-3 md:gap-4 max-w-xl", children: [
            /* @__PURE__ */ jsx25(
              "button",
              {
                className: "md:hidden p-2 -ml-2 rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-50)]",
                onClick: () => setMobileMenuOpen(true),
                "aria-label": "Open menu",
                children: /* @__PURE__ */ jsx25(Menu, { width: 20, height: 20, strokeWidth: 1.5 })
              }
            ),
            /* @__PURE__ */ jsx25("div", { className: "shrink-0 hidden md:block", children: logo }),
            /* @__PURE__ */ jsxs18("div", { children: [
              /* @__PURE__ */ jsx25(
                "h1",
                {
                  className: "text-2xl md:text-3xl font-bold tracking-tight leading-tight",
                  style: { color: "var(--app-title-color, var(--foreground))", fontFamily: "var(--font-app-title, var(--font-heading))" },
                  children: appTitle
                }
              ),
              /* @__PURE__ */ jsx25(
                "p",
                {
                  className: "text-sm md:text-base",
                  style: { color: "var(--app-subtitle-color, var(--neutral-500))", fontFamily: "var(--font-app-subtitle, var(--font-body))" },
                  children: appSubtitle
                }
              ),
              highlightText && /* @__PURE__ */ jsx25("p", { className: "text-sm leading-relaxed mt-1.5 text-[var(--neutral-600)] hidden md:block", children: highlightText })
            ] })
          ] }),
          /* @__PURE__ */ jsxs18(
            "div",
            {
              className: "rounded-xl px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-3 shrink-0",
              style: {
                backgroundColor: "var(--card-background)",
                border: "1px solid var(--card-border)"
              },
              children: [
                /* @__PURE__ */ jsxs18("div", { className: "text-right hidden md:block", children: [
                  /* @__PURE__ */ jsx25("p", { className: "text-xs font-medium text-[var(--foreground)]", children: agentName }),
                  agentSubtitle && /* @__PURE__ */ jsx25("p", { className: "text-[10px] text-[var(--neutral-400)]", children: agentSubtitle })
                ] }),
                /* @__PURE__ */ jsx25(
                  "div",
                  {
                    className: "size-9 rounded-full flex items-center justify-center text-xs font-semibold",
                    style: {
                      backgroundColor: "var(--brand-primary-light)",
                      color: "var(--brand-primary)"
                    },
                    children: agentInitials
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs18("div", { className: "flex px-4 md:px-6 pt-4 pb-6 gap-4", style: { minHeight: 320 }, children: [
          /* @__PURE__ */ jsx25(
            Sidebar,
            {
              navGroups,
              activeNavLabel,
              onNavClick,
              hovered: sidebarHovered,
              onHover: setSidebarHovered
            }
          ),
          /* @__PURE__ */ jsxs18("div", { className: "flex-1 min-w-0 flex flex-col gap-4", children: [
            (heroContent || rightCard) && /* @__PURE__ */ jsxs18("div", { className: cn("flex flex-col lg:flex-row gap-4", !rightCard && "lg:flex-col"), children: [
              heroContent && /* @__PURE__ */ jsx25("div", { className: "flex-1 min-w-0", children: heroContent }),
              rightCard && /* @__PURE__ */ jsx25("div", { className: "flex-1 min-w-0", children: rightCard })
            ] }),
            children
          ] })
        ] }),
        /* @__PURE__ */ jsx25(
          MobileNav,
          {
            open: mobileMenuOpen,
            onClose: () => setMobileMenuOpen(false),
            navGroups,
            activeNavLabel,
            onNavClick,
            agentName,
            agentInitials,
            agentSubtitle
          }
        )
      ]
    }
  );
}

// src/components/pipeline-thermometer/PipelineThermometer.tsx
import { GraphUp } from "iconoir-react";
import { jsx as jsx26, jsxs as jsxs19 } from "react/jsx-runtime";
var ICON_PROPS = { width: 20, height: 20, strokeWidth: 1.5 };
var STAGES = ["LEAD", "NURTURING", "APPLICATION", "PROCESSING", "CLOSED_WON", "CLOSED_LOST"];
var STAGE_LABELS = {
  LEAD: "Lead",
  NURTURING: "Nurturing",
  APPLICATION: "Application",
  PROCESSING: "Processing",
  CLOSED_WON: "Closed Won",
  CLOSED_LOST: "Closed Lost"
};
var STAGE_COLORS = {
  LEAD: "#3B82F6",
  NURTURING: "#F59E0B",
  APPLICATION: "#8B5CF6",
  PROCESSING: "#6366F1",
  CLOSED_WON: "#10B981",
  CLOSED_LOST: "#6B7280"
};
function PipelineThermometer({
  title = "Lead Pipeline",
  data,
  stats,
  totalLabel = "Total Leads",
  className
}) {
  const total = STAGES.reduce((sum, stage) => sum + data[stage], 0);
  return /* @__PURE__ */ jsxs19(Card, { className, children: [
    /* @__PURE__ */ jsxs19("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs19("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx26(
          "div",
          {
            className: "w-8 h-8 rounded-md flex items-center justify-center",
            style: { background: "var(--brand-primary-light)", color: "var(--brand-primary)" },
            children: /* @__PURE__ */ jsx26(GraphUp, { ...ICON_PROPS })
          }
        ),
        /* @__PURE__ */ jsx26("span", { className: "font-semibold text-[var(--neutral-900)]", children: title })
      ] }),
      /* @__PURE__ */ jsxs19(Badge, { variant: "default", children: [
        total,
        " ",
        totalLabel
      ] })
    ] }),
    /* @__PURE__ */ jsx26("div", { className: "flex h-3 rounded-full overflow-hidden bg-[var(--neutral-100)] mb-4", children: STAGES.map((stage) => {
      const width = total > 0 ? data[stage] / total * 100 : 0;
      if (width === 0) return null;
      return /* @__PURE__ */ jsx26(
        "div",
        {
          className: "transition-all duration-300",
          style: { width: `${width}%`, backgroundColor: STAGE_COLORS[stage] }
        },
        stage
      );
    }) }),
    /* @__PURE__ */ jsx26("div", { className: "grid grid-cols-6 gap-2 mb-4", children: STAGES.map((stage) => /* @__PURE__ */ jsxs19(
      "div",
      {
        className: "flex items-center gap-2 p-2 rounded-md bg-[var(--neutral-50)]",
        children: [
          /* @__PURE__ */ jsx26(
            "div",
            {
              className: "w-2 h-2 rounded-full flex-shrink-0",
              style: { backgroundColor: STAGE_COLORS[stage] }
            }
          ),
          /* @__PURE__ */ jsxs19("div", { children: [
            /* @__PURE__ */ jsx26("div", { className: "stat-number text-lg text-[var(--neutral-900)]", children: data[stage] }),
            /* @__PURE__ */ jsx26("div", { className: "text-[10px] text-[var(--neutral-500)]", children: STAGE_LABELS[stage] })
          ] })
        ]
      },
      stage
    )) }),
    stats && stats.length > 0 && /* @__PURE__ */ jsx26("div", { className: "flex items-center justify-around pt-4 border-t border-[var(--card-border)]", children: stats.map((stat, index) => /* @__PURE__ */ jsxs19("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxs19("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx26("div", { className: "stat-number text-lg text-[var(--brand-primary)]", children: stat.value }),
        /* @__PURE__ */ jsx26("div", { className: "text-xs text-[var(--neutral-500)]", children: stat.label })
      ] }),
      index < stats.length - 1 && /* @__PURE__ */ jsx26("div", { className: "h-8 w-px bg-[var(--neutral-100)]" })
    ] }, index)) })
  ] });
}

// src/components/category-section/CategorySection.tsx
import { useState as useState4 } from "react";
import { DragHandGesture, NavArrowDown as NavArrowDown2 } from "iconoir-react";

// src/components/category-section/AppCard.tsx
import { jsx as jsx27, jsxs as jsxs20 } from "react/jsx-runtime";
function AppCard({
  icon,
  title,
  status,
  statusVariant,
  value,
  valueLabel,
  description,
  subtext,
  large = false,
  onClick,
  className
}) {
  return /* @__PURE__ */ jsxs20(
    "button",
    {
      onClick,
      className: cn(
        "bg-[var(--card-background)] border border-[var(--card-border)] rounded-lg p-4 text-left transition-all",
        "hover:shadow-md hover:border-[var(--neutral-200)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)]",
        large && "col-span-2",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsx27(
            "div",
            {
              className: "w-8 h-8 rounded-md flex items-center justify-center text-[var(--neutral-600)]",
              style: { background: "var(--neutral-100)" },
              children: icon
            }
          ),
          /* @__PURE__ */ jsx27(Badge, { variant: statusVariant, children: status })
        ] }),
        /* @__PURE__ */ jsx27("h4", { className: "font-semibold text-sm text-[var(--neutral-900)] mb-2", children: title }),
        /* @__PURE__ */ jsxs20("div", { className: "flex items-baseline gap-1.5 mb-2", children: [
          /* @__PURE__ */ jsx27("span", { className: "stat-number text-2xl text-[var(--neutral-900)]", children: value }),
          /* @__PURE__ */ jsx27("span", { className: "text-xs text-[var(--neutral-500)]", children: valueLabel })
        ] }),
        /* @__PURE__ */ jsx27("p", { className: "text-xs text-[var(--neutral-500)] line-clamp-2", children: description }),
        subtext && /* @__PURE__ */ jsx27("p", { className: "text-xs text-[var(--brand-primary)] mt-2 font-medium", children: subtext })
      ]
    }
  );
}

// src/components/category-section/CategorySection.tsx
import { jsx as jsx28, jsxs as jsxs21 } from "react/jsx-runtime";
var ICON_SM = { width: 16, height: 16, strokeWidth: 1.5 };
var ICON_PROPS2 = { width: 20, height: 20, strokeWidth: 1.5 };
function CategorySection({
  id,
  title,
  subtitle,
  icon,
  iconBg,
  iconColor,
  apps,
  defaultExpanded = false,
  onAppClick,
  className
}) {
  const [isExpanded, setIsExpanded] = useState4(defaultExpanded);
  return /* @__PURE__ */ jsxs21(
    "div",
    {
      "data-category": id,
      className: cn(
        "bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs21(
          "button",
          {
            onClick: () => setIsExpanded(!isExpanded),
            className: "w-full flex items-center justify-between p-4 hover:bg-[var(--neutral-50)] transition-colors",
            children: [
              /* @__PURE__ */ jsxs21("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx28("div", { className: "text-[var(--neutral-300)] hover:text-[var(--neutral-500)] cursor-grab active:cursor-grabbing transition-colors", children: /* @__PURE__ */ jsx28(DragHandGesture, { ...ICON_SM }) }),
                /* @__PURE__ */ jsx28(
                  "div",
                  {
                    className: "w-10 h-10 rounded-lg flex items-center justify-center",
                    style: { background: iconBg, color: iconColor },
                    children: icon
                  }
                ),
                /* @__PURE__ */ jsxs21("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx28("h3", { className: "font-semibold text-[var(--neutral-900)]", children: title }),
                  /* @__PURE__ */ jsx28("p", { className: "text-sm text-[var(--neutral-500)]", children: subtitle })
                ] })
              ] }),
              /* @__PURE__ */ jsx28(
                NavArrowDown2,
                {
                  ...ICON_PROPS2,
                  className: cn(
                    "text-[var(--neutral-400)] transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx28(
          "div",
          {
            className: "grid transition-[grid-template-rows] duration-300 ease-in-out",
            style: { gridTemplateRows: isExpanded ? "1fr" : "0fr" },
            children: /* @__PURE__ */ jsx28("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx28("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsx28("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: apps.map((app, index) => /* @__PURE__ */ jsx28(
              AppCard,
              {
                icon: app.icon,
                title: app.title,
                status: app.status,
                statusVariant: app.statusVariant,
                value: app.value,
                valueLabel: app.valueLabel,
                description: app.description,
                subtext: app.subtext,
                large: app.large,
                onClick: () => onAppClick?.(app)
              },
              index
            )) }) }) })
          }
        )
      ]
    }
  );
}

// src/components/today-schedule/TodaySchedule.tsx
import { Calendar } from "iconoir-react";
import { jsx as jsx29, jsxs as jsxs22 } from "react/jsx-runtime";
var ICON_PROPS3 = { width: 18, height: 18, strokeWidth: 1.5 };
function TodaySchedule({
  date,
  items,
  onViewAll,
  className
}) {
  const displayDate = date || (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  });
  return /* @__PURE__ */ jsxs22(Card, { padding: "sm", className, children: [
    /* @__PURE__ */ jsxs22("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs22("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx29(
          "div",
          {
            className: "w-8 h-8 rounded-md flex items-center justify-center",
            style: { background: "var(--brand-accent-light)", color: "var(--brand-accent)" },
            children: /* @__PURE__ */ jsx29(Calendar, { ...ICON_PROPS3 })
          }
        ),
        /* @__PURE__ */ jsxs22("div", { children: [
          /* @__PURE__ */ jsx29("h4", { className: "font-semibold text-sm text-[var(--neutral-900)]", children: "Today's Schedule" }),
          /* @__PURE__ */ jsx29("p", { className: "text-xs text-[var(--neutral-500)]", children: displayDate })
        ] })
      ] }),
      onViewAll && /* @__PURE__ */ jsx29(
        "button",
        {
          onClick: onViewAll,
          className: "text-xs font-medium text-[var(--brand-primary)] hover:underline",
          children: "View All"
        }
      )
    ] }),
    /* @__PURE__ */ jsx29("div", { className: "space-y-0", children: items.map((item, index) => /* @__PURE__ */ jsxs22(
      "div",
      {
        className: "flex items-center gap-4 py-2 border-b border-[var(--card-border)] last:border-0",
        children: [
          /* @__PURE__ */ jsx29("span", { className: "text-xs font-medium text-[var(--neutral-400)] w-16", children: item.time }),
          /* @__PURE__ */ jsx29("span", { className: "text-sm text-[var(--neutral-700)]", children: item.event })
        ]
      },
      index
    )) }),
    items.length === 0 && /* @__PURE__ */ jsx29("p", { className: "text-sm text-[var(--neutral-400)] text-center py-4", children: "No events scheduled" })
  ] });
}

// src/components/drag-hint/DragHint.tsx
import { DragHandGesture as DragHandGesture2 } from "iconoir-react";
import { jsx as jsx30, jsxs as jsxs23 } from "react/jsx-runtime";
var ICON_SM2 = { width: 16, height: 16, strokeWidth: 1.5 };
function DragHint({
  message = "Drag sections to rearrange your dashboard",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs23(
    "div",
    {
      className: cn(
        "flex items-center justify-center gap-2 text-xs text-[var(--neutral-400)] py-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx30(DragHandGesture2, { ...ICON_SM2 }),
        /* @__PURE__ */ jsx30("span", { children: message })
      ]
    }
  );
}

// src/components/stat-card/StatCard.tsx
import { jsx as jsx31, jsxs as jsxs24 } from "react/jsx-runtime";
function StatCard({
  label,
  value,
  icon,
  color = "var(--brand-primary)",
  subtitle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx31(Card, { className, ...props, children: /* @__PURE__ */ jsxs24("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs24("div", { children: [
      /* @__PURE__ */ jsx31("p", { className: "text-sm text-[var(--neutral-500)]", children: label }),
      /* @__PURE__ */ jsx31("p", { className: "text-2xl font-bold stat-number", style: { color }, children: value }),
      subtitle && /* @__PURE__ */ jsx31("p", { className: "text-xs text-[var(--neutral-400)] mt-0.5", children: subtitle })
    ] }),
    icon && /* @__PURE__ */ jsx31(
      "div",
      {
        className: "w-10 h-10 rounded-lg flex items-center justify-center",
        style: {
          background: `${color}15`,
          color
        },
        children: icon
      }
    )
  ] }) });
}
export {
  AppCard,
  AppHeader,
  AppHeaderAction,
  AppHeaderDivider,
  AppShell,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  ButtonSpinner,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardLoader,
  CardTitle,
  CategorySection,
  Checkbox,
  ConcentricCircles,
  CrossHatch,
  DashboardShell,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DiamondGrid,
  DotGrid,
  DragHint,
  EmptyState,
  InlineLoading,
  Input,
  Label2 as Label,
  LoadingOverlay,
  OrbitalRings,
  PATTERNS,
  PageContainer,
  PageLoader,
  Pagination,
  PipelineThermometer,
  Progress,
  RadialBurst,
  STAGES,
  STAGE_COLORS,
  STAGE_LABELS,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Skeleton,
  SkeletonCircle,
  SkeletonStyles,
  SkeletonText,
  SlidePanel,
  SlidePanelBody,
  SlidePanelClose,
  SlidePanelFooter,
  SlidePanelHeader,
  Spinner,
  StatCard,
  SurveyStepCard,
  Table,
  Textarea,
  Toast,
  ToastProvider,
  TodaySchedule,
  badgeVariants,
  buttonVariants,
  cn,
  useToast
};
//# sourceMappingURL=index.js.map