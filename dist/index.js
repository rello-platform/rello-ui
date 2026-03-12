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

// src/components/card-illustration/CardIllustration.tsx
import * as React15 from "react";
import { jsx as jsx21, jsxs as jsxs15 } from "react/jsx-runtime";
var CardIllustration = React15.forwardRef(
  ({
    className,
    accent,
    size = 88,
    radius = 18,
    bgOpacity = 0.14,
    pattern,
    patternOpacity = 0.12,
    icon,
    dark = false,
    style,
    ...props
  }, ref) => {
    const containerBg = dark ? `rgba(255, 255, 255, ${0.06})` : `${accent}${Math.round(bgOpacity * 255).toString(16).padStart(2, "0")}`;
    const pOpacity = dark ? Math.min(patternOpacity * 2.5, 0.2) : patternOpacity;
    return /* @__PURE__ */ jsxs15(
      "div",
      {
        ref,
        className: cn("relative flex items-center justify-center overflow-hidden shrink-0", className),
        style: {
          width: size,
          height: size,
          borderRadius: radius,
          backgroundColor: containerBg,
          ...style
        },
        ...props,
        children: [
          pattern && /* @__PURE__ */ jsx21(
            "svg",
            {
              className: "absolute inset-0 w-full h-full",
              viewBox: `0 0 ${size} ${size}`,
              style: { opacity: pOpacity },
              children: pattern
            }
          ),
          icon && /* @__PURE__ */ jsx21("div", { className: "relative", children: icon })
        ]
      }
    );
  }
);
CardIllustration.displayName = "CardIllustration";

// src/icons/track-icons.tsx
import { jsx as jsx22, jsxs as jsxs16 } from "react/jsx-runtime";
function CreditScoreIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M10 32a14 14 0 0 1 28 0", stroke: accent, strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx22("path", { d: "M14 32a10 10 0 0 1 20 0", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("line", { x1: "24", y1: "32", x2: "32", y2: "20", stroke: accent, strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "32", r: "2.5", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx22("circle", { cx: "12", cy: "28", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "16", cy: "21", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "18", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "32", cy: "21", r: "1", fill: accent, opacity: "0.5" }),
    /* @__PURE__ */ jsx22("circle", { cx: "36", cy: "28", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("path", { d: "M35 14l1.5-1.5", stroke: accent, strokeWidth: "1", opacity: "0.4" }),
    /* @__PURE__ */ jsx22("circle", { cx: "37.5", cy: "11.5", r: "1", fill: accent, opacity: "0.3" })
  ] });
}
function SavingsIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M16 16h16v20a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4V16z", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("rect", { x: "14", y: "12", width: "20", height: "4", rx: "1", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx22("ellipse", { cx: "24", cy: "30", rx: "6", ry: "2", fill: accent, opacity: "0.12" }),
    /* @__PURE__ */ jsx22("ellipse", { cx: "24", cy: "27", rx: "6", ry: "2", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx22("ellipse", { cx: "24", cy: "33", rx: "6", ry: "2", fill: accent, opacity: "0.16" }),
    /* @__PURE__ */ jsx22("circle", { cx: "22", cy: "24", r: "2", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("circle", { cx: "26", cy: "22", r: "2", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M34 10l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4" }),
    /* @__PURE__ */ jsx22("circle", { cx: "37", cy: "7", r: "0.8", fill: accent, opacity: "0.25" })
  ] });
}
function DtiIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("line", { x1: "24", y1: "10", x2: "24", y2: "38", stroke: accent, strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx22("rect", { x: "18", y: "36", width: "12", height: "3", rx: "1.5", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("line", { x1: "10", y1: "18", x2: "38", y2: "16", stroke: accent, strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx22("path", { d: "M6 18a4 4 0 0 0 8 0", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx22("line", { x1: "10", y1: "18", x2: "6", y2: "18", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("line", { x1: "10", y1: "18", x2: "14", y2: "18", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M34 16a4 4 0 0 0 8 0", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx22("line", { x1: "38", y1: "16", x2: "34", y2: "16", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("line", { x1: "38", y1: "16", x2: "42", y2: "16", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "10", r: "2", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx22("circle", { cx: "10", cy: "22", r: "1", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx22("circle", { cx: "38", cy: "20", r: "1", fill: accent, opacity: "0.2" })
  ] });
}
function DreamHomeIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M24 8L8 22v18h32V22z", stroke: accent, strokeWidth: "2", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx22("rect", { x: "20", y: "28", width: "8", height: "12", rx: "1", stroke: accent, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 20c-1-3-5-3-5 0s5 6 5 6 5-3 5-6-4-3-5 0z", fill: accent, opacity: "0.25", stroke: accent, strokeWidth: "1" }),
    /* @__PURE__ */ jsx22("rect", { x: "12", y: "24", width: "5", height: "5", rx: "0.5", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx22("rect", { x: "31", y: "24", width: "5", height: "5", rx: "0.5", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx22("path", { d: "M34 8c0-2 2-2 2-4", stroke: accent, strokeWidth: "1", opacity: "0.3", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx22("rect", { x: "32", y: "10", width: "4", height: "8", rx: "0.5", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("circle", { cx: "38", cy: "6", r: "1", fill: accent, opacity: "0.3" })
  ] });
}
function MortgageTermsIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("rect", { x: "12", y: "6", width: "24", height: "36", rx: "2", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("path", { d: "M30 6v6h6", stroke: accent, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("line", { x1: "17", y1: "16", x2: "31", y2: "16", stroke: accent, strokeWidth: "1.5", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("line", { x1: "17", y1: "21", x2: "28", y2: "21", stroke: accent, strokeWidth: "1.5", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("line", { x1: "17", y1: "26", x2: "31", y2: "26", stroke: accent, strokeWidth: "1.5", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("line", { x1: "17", y1: "31", x2: "25", y2: "31", stroke: accent, strokeWidth: "1.5", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("rect", { x: "16", y: "14", width: "16", height: "5", rx: "1", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx22("path", { d: "M17 36l2 2 4-4", stroke: accent, strokeWidth: "1.5", opacity: "0.5" }),
    /* @__PURE__ */ jsx22("circle", { cx: "34", cy: "8", r: "1", fill: accent, opacity: "0.2" })
  ] });
}
function BudgetIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("rect", { x: "12", y: "6", width: "24", height: "36", rx: "3", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("rect", { x: "16", y: "10", width: "16", height: "8", rx: "1.5", fill: accent, opacity: 0.1 }),
    /* @__PURE__ */ jsx22("rect", { x: "16", y: "10", width: "16", height: "8", rx: "1.5", fill: "none", stroke: accent, strokeWidth: "1", opacity: 0.3 }),
    /* @__PURE__ */ jsx22("text", { x: "27", y: "17", fill: accent, opacity: "0.4", fontSize: "6", fontWeight: "600", textAnchor: "end", fontFamily: "monospace", children: "$1,250" }),
    [0, 1, 2].map(
      (row) => [0, 1, 2].map((col) => /* @__PURE__ */ jsx22("rect", { x: 17 + col * 5, y: 22 + row * 5, width: "3.5", height: "3.5", rx: "0.5", fill: accent, opacity: row === 2 && col === 2 ? 0.35 : 0.12 }, `${row}-${col}`))
    ),
    /* @__PURE__ */ jsx22("rect", { x: "17", y: "37", width: "14", height: "3", rx: "0.5", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx22("path", { d: "M36 8l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4" })
  ] });
}
function TimelineIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M12 40c0-6 12-6 12-12s-8-6-8-12 8-6 8-12", stroke: accent, strokeWidth: "2", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "28", r: "3", fill: accent, opacity: "0.2", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx22("circle", { cx: "16", cy: "16", r: "3", fill: accent, opacity: "0.2", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "4", r: "2", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx22("circle", { cx: "12", cy: "40", r: "2.5", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx22("line", { x1: "24", y1: "4", x2: "24", y2: "10", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 4h6l-3 3 3 3h-6", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "32", cy: "24", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "8", cy: "32", r: "1", fill: accent, opacity: "0.15" })
  ] });
}
function StreakIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M24 6c0 8-10 12-10 22a10 10 0 0 0 20 0c0-10-10-14-10-22z", fill: accent, opacity: "0.15", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 18c0 5-5 7-5 12a5 5 0 0 0 10 0c0-5-5-7-5-12z", fill: accent, opacity: "0.25" }),
    /* @__PURE__ */ jsx22("ellipse", { cx: "24", cy: "34", rx: "2.5", ry: "3", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx22("circle", { cx: "14", cy: "18", r: "1", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx22("circle", { cx: "34", cy: "16", r: "1", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx22("path", { d: "M32 10l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4" }),
    /* @__PURE__ */ jsx22("circle", { cx: "35", cy: "7", r: "0.8", fill: accent, opacity: "0.3" })
  ] });
}
function DailyExerciseIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("line", { x1: "6", y1: "32", x2: "42", y2: "32", stroke: accent, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "24", r: "8", fill: accent, opacity: "0.12", stroke: accent, strokeWidth: "2" }),
    [0, 45, 90, 135, 180].map((angle) => {
      const rad = angle * Math.PI / 180;
      return /* @__PURE__ */ jsx22(
        "line",
        {
          x1: 24 + Math.cos(rad) * 11,
          y1: 24 - Math.sin(rad) * 11,
          x2: 24 + Math.cos(rad) * 14,
          y2: 24 - Math.sin(rad) * 14,
          stroke: accent,
          strokeWidth: "1.5",
          strokeLinecap: "round",
          opacity: "0.3"
        },
        angle
      );
    }),
    /* @__PURE__ */ jsx22("path", { d: "M22 18l4-6-1 5h3l-4 6 1-5h-3z", fill: accent, opacity: "0.35" }),
    /* @__PURE__ */ jsx22("rect", { x: "10", y: "34", width: "28", height: "4", rx: "1", fill: accent, opacity: "0.06" }),
    /* @__PURE__ */ jsx22("circle", { cx: "36", cy: "14", r: "1", fill: accent, opacity: "0.25" })
  ] });
}
function WeeklyChallengeIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M16 10h16v12a8 8 0 0 1-16 0V10z", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("path", { d: "M16 14c-4 0-6 2-6 5s2 5 6 5", stroke: accent, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M32 14c4 0 6 2 6 5s-2 5-6 5", stroke: accent, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("line", { x1: "24", y1: "30", x2: "24", y2: "36", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("rect", { x: "18", y: "36", width: "12", height: "3", rx: "1.5", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 14l1.5 3 3.5.5-2.5 2.5.5 3.5L24 22l-3 1.5.5-3.5-2.5-2.5 3.5-.5z", fill: accent, opacity: "0.25" }),
    /* @__PURE__ */ jsx22("circle", { cx: "36", cy: "8", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M38 6l1.5-1.5", stroke: accent, strokeWidth: "1", opacity: "0.4" })
  ] });
}
function SelfPacedIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "24", r: "16", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "24", r: "12", stroke: accent, strokeWidth: "0.8", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "10", r: "1.5", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "38", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "10", cy: "24", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "38", cy: "24", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 14l3 10-3 2-3-2z", fill: accent, opacity: "0.35" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 34l3-10-3-2-3 2z", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "24", cy: "24", r: "2", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M36 10l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4" })
  ] });
}
function CelebrationIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M24 8l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z", fill: accent, opacity: "0.2", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx22("rect", { x: "8", y: "12", width: "3", height: "3", rx: "0.5", fill: accent, opacity: "0.25", transform: "rotate(15 9.5 13.5)" }),
    /* @__PURE__ */ jsx22("rect", { x: "36", y: "10", width: "3", height: "3", rx: "0.5", fill: accent, opacity: "0.2", transform: "rotate(-20 37.5 11.5)" }),
    /* @__PURE__ */ jsx22("rect", { x: "10", y: "30", width: "2.5", height: "2.5", rx: "0.5", fill: accent, opacity: "0.15", transform: "rotate(30 11.25 31.25)" }),
    /* @__PURE__ */ jsx22("rect", { x: "35", y: "32", width: "2.5", height: "2.5", rx: "0.5", fill: accent, opacity: "0.2", transform: "rotate(-10 36.25 33.25)" }),
    /* @__PURE__ */ jsx22("circle", { cx: "14", cy: "22", r: "1.2", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx22("circle", { cx: "34", cy: "24", r: "1.2", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx22("circle", { cx: "20", cy: "38", r: "1", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx22("circle", { cx: "30", cy: "40", r: "1", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx22("path", { d: "M12 8l-2-3", stroke: accent, strokeWidth: "1", opacity: "0.3", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx22("path", { d: "M38 8l2-3", stroke: accent, strokeWidth: "1", opacity: "0.3", strokeLinecap: "round" })
  ] });
}
function DownPaymentIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx22("ellipse", { cx: "24", cy: 36 - i * 4, rx: "10", ry: "3", fill: accent, opacity: 0.06 + i * 0.04, stroke: accent, strokeWidth: i === 4 ? "1.5" : "0.8" }, i)),
    /* @__PURE__ */ jsx22("text", { x: "24", y: "23", fill: accent, opacity: "0.35", fontSize: "8", fontWeight: "700", textAnchor: "middle", fontFamily: "sans-serif", children: "$" }),
    /* @__PURE__ */ jsx22("line", { x1: "14", y1: "36", x2: "14", y2: "20", stroke: accent, strokeWidth: "0.8", opacity: "0.15" }),
    /* @__PURE__ */ jsx22("line", { x1: "34", y1: "36", x2: "34", y2: "20", stroke: accent, strokeWidth: "0.8", opacity: "0.15" }),
    /* @__PURE__ */ jsx22("circle", { cx: "36", cy: "12", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx22("path", { d: "M34 10l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4" })
  ] });
}
function PreApprovalIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("path", { d: "M24 6L10 12v12c0 10 14 18 14 18s14-8 14-18V12z", fill: accent, opacity: "0.08", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 12L14 16v8c0 7 10 13 10 13s10-6 10-13V16z", fill: accent, opacity: "0.06" }),
    /* @__PURE__ */ jsx22("path", { d: "M18 24l4 4 8-8", stroke: accent, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", opacity: "0.5" }),
    /* @__PURE__ */ jsx22("circle", { cx: "36", cy: "8", r: "1", fill: accent, opacity: "0.25" }),
    /* @__PURE__ */ jsx22("path", { d: "M38 6l1-1", stroke: accent, strokeWidth: "1", opacity: "0.3" })
  ] });
}
function NeighborhoodIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs16("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx22("rect", { x: "4", y: "36", width: "40", height: "4", rx: "1", fill: accent, opacity: "0.06" }),
    /* @__PURE__ */ jsx22("path", { d: "M10 26L6 30v6h8v-6z", stroke: accent, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("rect", { x: "8", y: "32", width: "3", height: "4", rx: "0.5", fill: accent, opacity: "0.1" }),
    /* @__PURE__ */ jsx22("path", { d: "M24 14L16 22v14h16V22z", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx22("rect", { x: "21", y: "26", width: "6", height: "10", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("rect", { x: "18", y: "24", width: "4", height: "4", rx: "0.5", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx22("rect", { x: "26", y: "24", width: "4", height: "4", rx: "0.5", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx22("path", { d: "M38 22L34 26v10h8v-10z", stroke: accent, strokeWidth: "1.5", opacity: "0.3" }),
    /* @__PURE__ */ jsx22("rect", { x: "36", y: "30", width: "3", height: "6", rx: "0.5", fill: accent, opacity: "0.1" }),
    /* @__PURE__ */ jsx22("circle", { cx: "13", cy: "20", r: "3", fill: accent, opacity: "0.1" }),
    /* @__PURE__ */ jsx22("line", { x1: "13", y1: "23", x2: "13", y2: "26", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx22("circle", { cx: "40", cy: "14", r: "1", fill: accent, opacity: "0.2" })
  ] });
}
var TRACK_ICONS = {
  "credit-score": CreditScoreIcon,
  savings: SavingsIcon,
  dti: DtiIcon,
  "dream-home": DreamHomeIcon,
  "mortgage-terms": MortgageTermsIcon,
  budget: BudgetIcon,
  timeline: TimelineIcon,
  streak: StreakIcon,
  "daily-exercise": DailyExerciseIcon,
  "weekly-challenge": WeeklyChallengeIcon,
  "self-paced": SelfPacedIcon,
  celebration: CelebrationIcon,
  "down-payment": DownPaymentIcon,
  "pre-approval": PreApprovalIcon,
  neighborhood: NeighborhoodIcon
};

// src/icons/dashboard-icons.tsx
import { jsx as jsx23, jsxs as jsxs17 } from "react/jsx-runtime";
function DawnIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs17("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx23("line", { x1: "4", y1: "30", x2: "44", y2: "30", stroke: accent, strokeWidth: "1.5", opacity: "0.2" }),
    /* @__PURE__ */ jsx23("path", { d: "M14 30a10 10 0 0 1 20 0", fill: accent, opacity: "0.1" }),
    /* @__PURE__ */ jsx23("path", { d: "M14 30a10 10 0 0 1 20 0", stroke: accent, strokeWidth: "2", fill: "none" }),
    [0, 30, 60, 90, 120, 150].map((angle) => {
      const rad = angle * Math.PI / 180;
      return /* @__PURE__ */ jsx23(
        "line",
        {
          x1: 24 + Math.cos(rad) * 13,
          y1: 30 - Math.sin(rad) * 13,
          x2: 24 + Math.cos(rad) * 17,
          y2: 30 - Math.sin(rad) * 17,
          stroke: accent,
          strokeWidth: "1.5",
          strokeLinecap: "round",
          opacity: "0.3"
        },
        angle
      );
    }),
    /* @__PURE__ */ jsx23("rect", { x: "8", y: "34", width: "5", height: "5", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.25" }),
    /* @__PURE__ */ jsx23("path", { d: "M9.5 37l1.5 1.5 2.5-2.5", stroke: accent, strokeWidth: "1", opacity: "0.5", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx23("rect", { x: "16", y: "34", width: "5", height: "5", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.25" }),
    /* @__PURE__ */ jsx23("path", { d: "M17.5 37l1.5 1.5 2.5-2.5", stroke: accent, strokeWidth: "1", opacity: "0.5", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx23("rect", { x: "24", y: "34", width: "5", height: "5", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.15" }),
    /* @__PURE__ */ jsx23("rect", { x: "32", y: "34", width: "5", height: "5", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.1" }),
    /* @__PURE__ */ jsx23("circle", { cx: "38", cy: "14", r: "1.2", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx23("path", { d: "M36 12l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx23("path", { d: "M6 28c2-1 3 0 5-1", stroke: accent, strokeWidth: "0.8", opacity: "0.15", strokeLinecap: "round" })
  ] });
}
function SignalIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs17("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx23(
      "path",
      {
        d: "M10 10h20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H18l-6 5v-5h-2a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z",
        fill: accent,
        opacity: "0.1",
        stroke: accent,
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ jsx23("line", { x1: "15", y1: "16", x2: "27", y2: "16", stroke: accent, strokeWidth: "1.5", opacity: "0.25", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx23("line", { x1: "15", y1: "20", x2: "23", y2: "20", stroke: accent, strokeWidth: "1.5", opacity: "0.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx23(
      "path",
      {
        d: "M20 28h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2v3l-4-3h-10a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2z",
        fill: accent,
        fillOpacity: "0.06",
        stroke: accent,
        strokeWidth: "1.5",
        opacity: "0.3"
      }
    ),
    /* @__PURE__ */ jsx23("circle", { cx: "27", cy: "34", r: "1.2", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx23("circle", { cx: "31", cy: "34", r: "1.2", fill: accent, opacity: "0.25" }),
    /* @__PURE__ */ jsx23("circle", { cx: "35", cy: "34", r: "1.2", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx23("path", { d: "M36 8c2 0 3 1 3 3", stroke: accent, strokeWidth: "1", opacity: "0.2", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx23("path", { d: "M36 5c4 0 6 2 6 6", stroke: accent, strokeWidth: "1", opacity: "0.15", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx23("circle", { cx: "32", cy: "10", r: "2", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx23("circle", { cx: "40", cy: "4", r: "0.8", fill: accent, opacity: "0.25" })
  ] });
}
function PulseIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs17("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx23("path", { d: "M8 38L8 12", stroke: accent, strokeWidth: "1.5", opacity: "0.2" }),
    /* @__PURE__ */ jsx23("path", { d: "M8 38L42 38", stroke: accent, strokeWidth: "1.5", opacity: "0.2" }),
    /* @__PURE__ */ jsx23("line", { x1: "8", y1: "20", x2: "42", y2: "20", stroke: accent, strokeWidth: "0.5", opacity: "0.08" }),
    /* @__PURE__ */ jsx23("line", { x1: "8", y1: "28", x2: "42", y2: "28", stroke: accent, strokeWidth: "0.5", opacity: "0.08" }),
    /* @__PURE__ */ jsx23(
      "path",
      {
        d: "M8 32 L14 28 L20 30 L26 18 L32 22 L38 14 L42 16 L42 38 L8 38Z",
        fill: accent,
        opacity: "0.08"
      }
    ),
    /* @__PURE__ */ jsx23(
      "path",
      {
        d: "M8 32 L14 28 L20 30 L26 18 L32 22 L38 14 L42 16",
        stroke: accent,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        fill: "none"
      }
    ),
    /* @__PURE__ */ jsx23("path", { d: "M36 16l4-2", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.4" }),
    /* @__PURE__ */ jsx23("path", { d: "M40 14l0 3.5", stroke: accent, strokeWidth: "1", strokeLinecap: "round", opacity: "0.3" }),
    /* @__PURE__ */ jsx23("path", { d: "M40 14l-3 0", stroke: accent, strokeWidth: "1", strokeLinecap: "round", opacity: "0.3" }),
    /* @__PURE__ */ jsx23("circle", { cx: "14", cy: "28", r: "1.5", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx23("circle", { cx: "26", cy: "18", r: "2", fill: accent, opacity: "0.35" }),
    /* @__PURE__ */ jsx23("circle", { cx: "38", cy: "14", r: "2", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx23("path", { d: "M12 8l2 3 2-5 2 4 2-2", stroke: accent, strokeWidth: "1", opacity: "0.2", strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }),
    /* @__PURE__ */ jsx23("circle", { cx: "42", cy: "10", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx23("path", { d: "M40 8l2-2", stroke: accent, strokeWidth: "1", opacity: "0.35", strokeLinecap: "round" })
  ] });
}
function AtlasIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs17("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx23("path", { d: "M6 36c4-2 8 1 12-1s8-3 12-1 8 2 12-1", stroke: accent, strokeWidth: "0.8", opacity: "0.12", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx23("path", { d: "M6 40c4-2 8 1 12-1s8-3 12-1 8 2 12-1", stroke: accent, strokeWidth: "0.8", opacity: "0.08", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx23("path", { d: "M6 32c4-1 8 2 12 0s8-2 12 0 8 1 12-1", stroke: accent, strokeWidth: "0.8", opacity: "0.1", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx23(
      "path",
      {
        d: "M24 6c-6 0-10 4.5-10 10 0 8 10 18 10 18s10-10 10-18c0-5.5-4-10-10-10z",
        fill: accent,
        opacity: "0.1",
        stroke: accent,
        strokeWidth: "2"
      }
    ),
    /* @__PURE__ */ jsx23("circle", { cx: "24", cy: "16", r: "4", fill: accent, fillOpacity: "0.25", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx23("circle", { cx: "22", cy: "14", r: "1.5", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx23("ellipse", { cx: "24", cy: "38", rx: "12", ry: "3", stroke: accent, strokeWidth: "1", opacity: "0.15", strokeDasharray: "3 3", fill: "none" }),
    /* @__PURE__ */ jsx23("rect", { x: "12", y: "28", width: "3", height: "3", rx: "0.5", fill: accent, opacity: "0.12" }),
    /* @__PURE__ */ jsx23("rect", { x: "33", y: "26", width: "3", height: "3", rx: "0.5", fill: accent, opacity: "0.1" }),
    /* @__PURE__ */ jsx23("rect", { x: "16", y: "24", width: "2", height: "2", rx: "0.3", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx23("circle", { cx: "40", cy: "8", r: "3", stroke: accent, strokeWidth: "0.8", opacity: "0.2", fill: "none" }),
    /* @__PURE__ */ jsx23("line", { x1: "40", y1: "5.5", x2: "40", y2: "6.5", stroke: accent, strokeWidth: "0.8", opacity: "0.3" }),
    /* @__PURE__ */ jsx23("line", { x1: "40", y1: "9.5", x2: "40", y2: "10.5", stroke: accent, strokeWidth: "0.8", opacity: "0.15" }),
    /* @__PURE__ */ jsx23("circle", { cx: "8", cy: "10", r: "0.8", fill: accent, opacity: "0.2" })
  ] });
}
var DASHBOARD_ICONS = {
  dawn: DawnIcon,
  signal: SignalIcon,
  pulse: PulseIcon,
  atlas: AtlasIcon
};

// src/icons/app-icons.tsx
import { jsx as jsx24, jsxs as jsxs18 } from "react/jsx-runtime";
function AccountabilityTrackerIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("circle", { cx: "24", cy: "16", r: "10", stroke: accent, strokeWidth: "2", opacity: "0.3", fill: "none" }),
    /* @__PURE__ */ jsx24("circle", { cx: "24", cy: "16", r: "6", stroke: accent, strokeWidth: "1", opacity: "0.2", fill: "none" }),
    /* @__PURE__ */ jsx24("circle", { cx: "24", cy: "16", r: "2.5", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx24("line", { x1: "34", y1: "8", x2: "26", y2: "14", stroke: accent, strokeWidth: "1.5", opacity: "0.5", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("path", { d: "M34 8l-3 0.5 0.5-3", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx24("rect", { x: "10", y: "30", width: "4", height: "4", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.25" }),
    /* @__PURE__ */ jsx24("path", { d: "M11 32.5l1.5 1.5 2-2", stroke: accent, strokeWidth: "1", opacity: "0.5", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "18", y1: "32", x2: "34", y2: "32", stroke: accent, strokeWidth: "1.5", opacity: "0.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("rect", { x: "10", y: "37", width: "4", height: "4", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx24("path", { d: "M11 39.5l1.5 1.5 2-2", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "18", y1: "39", x2: "30", y2: "39", stroke: accent, strokeWidth: "1.5", opacity: "0.15", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "40", cy: "6", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx24("path", { d: "M38 4l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round" })
  ] });
}
function DrumbeatIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("ellipse", { cx: "24", cy: "32", rx: "14", ry: "5", fill: accent, opacity: "0.08", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx24("ellipse", { cx: "24", cy: "24", rx: "14", ry: "5", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx24("line", { x1: "10", y1: "24", x2: "10", y2: "32", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx24("line", { x1: "38", y1: "24", x2: "38", y2: "32", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx24("line", { x1: "16", y1: "8", x2: "22", y2: "20", stroke: accent, strokeWidth: "2", strokeLinecap: "round", opacity: "0.5" }),
    /* @__PURE__ */ jsx24("circle", { cx: "22", cy: "20", r: "1.5", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx24("line", { x1: "32", y1: "8", x2: "26", y2: "20", stroke: accent, strokeWidth: "2", strokeLinecap: "round", opacity: "0.5" }),
    /* @__PURE__ */ jsx24("circle", { cx: "26", cy: "20", r: "1.5", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx24("path", { d: "M40 18c2-1 3 0 3-2", stroke: accent, strokeWidth: "1", opacity: "0.2", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("path", { d: "M42 16c2-1 3 0 3-2", stroke: accent, strokeWidth: "1", opacity: "0.15", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("circle", { cx: "18", cy: "28", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx24("circle", { cx: "24", cy: "27", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx24("circle", { cx: "30", cy: "28", r: "1", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx24("circle", { cx: "8", cy: "10", r: "0.8", fill: accent, opacity: "0.25" })
  ] });
}
function HarvestHomeIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("path", { d: "M4 38c4-1 8 0 12-1s8-1 12 0 8-1 12 0 4 0 4 0", stroke: accent, strokeWidth: "0.8", opacity: "0.15", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("path", { d: "M28 16L20 22v14h16V22z", stroke: accent, strokeWidth: "2", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx24("rect", { x: "25", y: "28", width: "5", height: "8", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx24("rect", { x: "22", y: "24", width: "4", height: "4", rx: "0.5", fill: accent, opacity: "0.08" }),
    /* @__PURE__ */ jsx24("line", { x1: "12", y1: "38", x2: "12", y2: "26", stroke: accent, strokeWidth: "1.5", opacity: "0.4", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("path", { d: "M12 30c-4-1-5-5-2-7", stroke: accent, strokeWidth: "1.5", opacity: "0.3", fill: "none", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("path", { d: "M12 26c4-1 5-5 2-7", stroke: accent, strokeWidth: "1.5", opacity: "0.3", fill: "none", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("path", { d: "M12 34c-3 0-4-3-2-5", stroke: accent, strokeWidth: "1", opacity: "0.2", fill: "none", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "8", cy: "38", r: "1.5", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx24("circle", { cx: "16", cy: "38", r: "1", fill: accent, opacity: "0.1" }),
    /* @__PURE__ */ jsx24("circle", { cx: "40", cy: "36", r: "1", fill: accent, opacity: "0.1" }),
    /* @__PURE__ */ jsx24("circle", { cx: "40", cy: "10", r: "3", stroke: accent, strokeWidth: "1", opacity: "0.2", fill: accent, fillOpacity: "0.06" }),
    /* @__PURE__ */ jsx24("path", { d: "M40 5v-2M45 10h2M40 15v2", stroke: accent, strokeWidth: "0.8", opacity: "0.15", strokeLinecap: "round" })
  ] });
}
function OpenHouseHubIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("path", { d: "M8 20L24 8l16 12", stroke: accent, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx24("rect", { x: "12", y: "20", width: "24", height: "20", stroke: accent, strokeWidth: "1.5", fill: accent, fillOpacity: "0.05" }),
    /* @__PURE__ */ jsx24("path", { d: "M22 40V24h10v16", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx24("path", { d: "M22 24l-3 2v14h3", fill: accent, fillOpacity: "0.1", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx24("circle", { cx: "30", cy: "33", r: "1", fill: accent, opacity: "0.4" }),
    /* @__PURE__ */ jsx24("rect", { x: "20", y: "40", width: "14", height: "2", rx: "0.5", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx24("circle", { cx: "40", cy: "30", r: "2", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx24("path", { d: "M38 34v5", stroke: accent, strokeWidth: "1.5", opacity: "0.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "44", cy: "32", r: "1.5", fill: accent, opacity: "0.15" }),
    /* @__PURE__ */ jsx24("path", { d: "M42.5 35v4", stroke: accent, strokeWidth: "1", opacity: "0.15", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "27", y1: "28", x2: "34", y2: "26", stroke: accent, strokeWidth: "0.8", opacity: "0.12", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "27", y1: "32", x2: "35", y2: "32", stroke: accent, strokeWidth: "0.8", opacity: "0.1", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "6", cy: "12", r: "1", fill: accent, opacity: "0.25" })
  ] });
}
function HomeStretchIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("line", { x1: "34", y1: "8", x2: "34", y2: "40", stroke: accent, strokeWidth: "2" }),
    /* @__PURE__ */ jsx24("line", { x1: "40", y1: "8", x2: "40", y2: "40", stroke: accent, strokeWidth: "2", opacity: "0.4" }),
    [0, 1, 2, 3].map(
      (row) => [0, 1].map((col) => /* @__PURE__ */ jsx24(
        "rect",
        {
          x: 34 + col * 3,
          y: 8 + row * 3,
          width: "3",
          height: "3",
          fill: accent,
          opacity: (row + col) % 2 === 0 ? 0.3 : 0.08
        },
        `${row}-${col}`
      ))
    ),
    /* @__PURE__ */ jsx24("path", { d: "M6 38c6-2 12-4 18-6s8-2 10-4", stroke: accent, strokeWidth: "1.5", opacity: "0.2", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("path", { d: "M6 42c6-2 12-4 18-6s8-2 10-4", stroke: accent, strokeWidth: "0.8", opacity: "0.1", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("circle", { cx: "20", cy: "18", r: "3", fill: accent, opacity: "0.25", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx24("path", { d: "M20 21v8", stroke: accent, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
    /* @__PURE__ */ jsx24("path", { d: "M20 24l-4 3", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.3" }),
    /* @__PURE__ */ jsx24("path", { d: "M20 24l5 2", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.3" }),
    /* @__PURE__ */ jsx24("path", { d: "M20 29l-3 5", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.3" }),
    /* @__PURE__ */ jsx24("path", { d: "M20 29l4 4", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.3" }),
    /* @__PURE__ */ jsx24("line", { x1: "10", y1: "20", x2: "14", y2: "20", stroke: accent, strokeWidth: "1", opacity: "0.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "8", y1: "23", x2: "13", y2: "23", stroke: accent, strokeWidth: "1", opacity: "0.15", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "37", cy: "6", r: "1", fill: accent, opacity: "0.35" })
  ] });
}
function HomeReadyIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("circle", { cx: "18", cy: "16", r: "8", stroke: accent, strokeWidth: "2", fill: accent, fillOpacity: "0.06" }),
    /* @__PURE__ */ jsx24("circle", { cx: "18", cy: "16", r: "4", stroke: accent, strokeWidth: "1.5", opacity: "0.3", fill: "none" }),
    /* @__PURE__ */ jsx24("circle", { cx: "18", cy: "16", r: "1.5", fill: accent, opacity: "0.35" }),
    /* @__PURE__ */ jsx24("line", { x1: "26", y1: "16", x2: "40", y2: "16", stroke: accent, strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("path", { d: "M36 16v4", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.4" }),
    /* @__PURE__ */ jsx24("path", { d: "M40 16v5", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", opacity: "0.4" }),
    /* @__PURE__ */ jsx24("rect", { x: "10", y: "30", width: "28", height: "4", rx: "2", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx24("rect", { x: "10", y: "30", width: "22", height: "4", rx: "2", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx24("line", { x1: "18", y1: "30", x2: "18", y2: "34", stroke: accent, strokeWidth: "0.5", opacity: "0.15" }),
    /* @__PURE__ */ jsx24("line", { x1: "24", y1: "30", x2: "24", y2: "34", stroke: accent, strokeWidth: "0.5", opacity: "0.15" }),
    /* @__PURE__ */ jsx24("line", { x1: "30", y1: "30", x2: "30", y2: "34", stroke: accent, strokeWidth: "0.5", opacity: "0.15" }),
    /* @__PURE__ */ jsx24("text", { x: "24", y: "42", fill: accent, opacity: "0.3", fontSize: "5", fontWeight: "600", textAnchor: "middle", fontFamily: "sans-serif", children: "READY" }),
    /* @__PURE__ */ jsx24("circle", { cx: "42", cy: "10", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx24("path", { d: "M40 8l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round" })
  ] });
}
function NewsletterStudioIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("rect", { x: "14", y: "4", width: "20", height: "28", rx: "2", stroke: accent, strokeWidth: "2", fill: accent, fillOpacity: "0.04" }),
    /* @__PURE__ */ jsx24("rect", { x: "17", y: "8", width: "14", height: "3", rx: "1", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx24("line", { x1: "17", y1: "15", x2: "31", y2: "15", stroke: accent, strokeWidth: "1.5", opacity: "0.15", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "17", y1: "19", x2: "28", y2: "19", stroke: accent, strokeWidth: "1.5", opacity: "0.15", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "17", y1: "23", x2: "31", y2: "23", stroke: accent, strokeWidth: "1.5", opacity: "0.12", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "17", y1: "27", x2: "25", y2: "27", stroke: accent, strokeWidth: "1.5", opacity: "0.12", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("path", { d: "M8 34h32v10H8z", stroke: accent, strokeWidth: "1.5", fill: accent, fillOpacity: "0.06" }),
    /* @__PURE__ */ jsx24("path", { d: "M8 34l16 8 16-8", stroke: accent, strokeWidth: "1.5" }),
    /* @__PURE__ */ jsx24("line", { x1: "42", y1: "36", x2: "46", y2: "34", stroke: accent, strokeWidth: "1", opacity: "0.2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("line", { x1: "42", y1: "39", x2: "46", y2: "39", stroke: accent, strokeWidth: "1", opacity: "0.15", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "38", cy: "6", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx24("path", { d: "M36 4l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round" })
  ] });
}
function MarketIntelIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("rect", { x: "6", y: "28", width: "5", height: "12", rx: "1", fill: accent, fillOpacity: "0.12", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx24("rect", { x: "14", y: "22", width: "5", height: "18", rx: "1", fill: accent, fillOpacity: "0.16", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx24("rect", { x: "22", y: "18", width: "5", height: "22", rx: "1", fill: accent, fillOpacity: "0.2", stroke: accent, strokeWidth: "1", opacity: "0.25" }),
    /* @__PURE__ */ jsx24("rect", { x: "30", y: "14", width: "5", height: "26", rx: "1", fill: accent, fillOpacity: "0.12", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx24("line", { x1: "4", y1: "40", x2: "44", y2: "40", stroke: accent, strokeWidth: "1", opacity: "0.15" }),
    /* @__PURE__ */ jsx24("circle", { cx: "34", cy: "12", r: "7", stroke: accent, strokeWidth: "2", fill: accent, fillOpacity: "0.06" }),
    /* @__PURE__ */ jsx24("line", { x1: "39", y1: "17", x2: "44", y2: "22", stroke: accent, strokeWidth: "2", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("path", { d: "M29 14l3-3 3 2 2-3", stroke: accent, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", opacity: "0.4", fill: "none" }),
    /* @__PURE__ */ jsx24("circle", { cx: "30", cy: "6", r: "0.8", fill: accent, opacity: "0.25" }),
    /* @__PURE__ */ jsx24("circle", { cx: "8.5", cy: "26", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx24("circle", { cx: "24.5", cy: "16", r: "1", fill: accent, opacity: "0.35" })
  ] });
}
function OvenIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("rect", { x: "8", y: "14", width: "32", height: "28", rx: "3", stroke: accent, strokeWidth: "2", fill: accent, fillOpacity: "0.04" }),
    /* @__PURE__ */ jsx24("rect", { x: "14", y: "22", width: "20", height: "14", rx: "2", stroke: accent, strokeWidth: "1.5", fill: accent, fillOpacity: "0.08" }),
    /* @__PURE__ */ jsx24("rect", { x: "16", y: "24", width: "16", height: "10", rx: "1", fill: accent, opacity: "0.12" }),
    /* @__PURE__ */ jsx24("circle", { cx: "16", cy: "18", r: "2", stroke: accent, strokeWidth: "1", opacity: "0.3" }),
    /* @__PURE__ */ jsx24("line", { x1: "16", y1: "16", x2: "16", y2: "17.5", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "24", cy: "18", r: "2", stroke: accent, strokeWidth: "1", opacity: "0.25" }),
    /* @__PURE__ */ jsx24("circle", { cx: "32", cy: "18", r: "2", stroke: accent, strokeWidth: "1", opacity: "0.25" }),
    /* @__PURE__ */ jsx24("path", { d: "M18 12c0-2 2-2 2-4", stroke: accent, strokeWidth: "1", opacity: "0.3", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("path", { d: "M24 10c0-2 2-2 2-4", stroke: accent, strokeWidth: "1", opacity: "0.25", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("path", { d: "M30 12c0-2 2-2 2-4", stroke: accent, strokeWidth: "1", opacity: "0.2", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("path", { d: "M24 28c-0.8-2-3.5-2-3.5 0s3.5 4 3.5 4 3.5-2 3.5-4-2.7-2-3.5 0z", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx24("circle", { cx: "42", cy: "8", r: "1", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx24("path", { d: "M40 6l2-2", stroke: accent, strokeWidth: "1", opacity: "0.4", strokeLinecap: "round" })
  ] });
}
function LeadCaptureFormsIcon({ accent, size = 48, className }) {
  return /* @__PURE__ */ jsxs18("svg", { width: size, height: size, viewBox: "0 0 48 48", fill: "none", className, children: [
    /* @__PURE__ */ jsx24("rect", { x: "14", y: "8", width: "20", height: "32", rx: "2", stroke: accent, strokeWidth: "2", fill: accent, fillOpacity: "0.04" }),
    /* @__PURE__ */ jsx24("rect", { x: "20", y: "5", width: "8", height: "5", rx: "1.5", stroke: accent, strokeWidth: "1.5", fill: accent, fillOpacity: "0.1" }),
    /* @__PURE__ */ jsx24("rect", { x: "18", y: "16", width: "12", height: "3", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.25" }),
    /* @__PURE__ */ jsx24("rect", { x: "18", y: "22", width: "12", height: "3", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx24("rect", { x: "18", y: "28", width: "12", height: "3", rx: "1", stroke: accent, strokeWidth: "1", opacity: "0.2" }),
    /* @__PURE__ */ jsx24("rect", { x: "18", y: "34", width: "12", height: "3", rx: "1", fill: accent, opacity: "0.25" }),
    /* @__PURE__ */ jsx24("path", { d: "M38 16c2 1 4 2 4 5", stroke: accent, strokeWidth: "1", opacity: "0.2", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("path", { d: "M40 14c2 1 4 3 4 6", stroke: accent, strokeWidth: "1", opacity: "0.15", strokeLinecap: "round", fill: "none" }),
    /* @__PURE__ */ jsx24("circle", { cx: "44", cy: "12", r: "1.5", fill: accent, opacity: "0.3" }),
    /* @__PURE__ */ jsx24("circle", { cx: "42", cy: "26", r: "1", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx24("circle", { cx: "6", cy: "20", r: "1.5", fill: accent, opacity: "0.2" }),
    /* @__PURE__ */ jsx24("path", { d: "M6 20l8 0", stroke: accent, strokeWidth: "0.8", opacity: "0.15", strokeLinecap: "round" }),
    /* @__PURE__ */ jsx24("circle", { cx: "8", cy: "8", r: "0.8", fill: accent, opacity: "0.25" })
  ] });
}
var APP_ICONS = {
  "accountability-tracker": AccountabilityTrackerIcon,
  drumbeat: DrumbeatIcon,
  "harvest-home": HarvestHomeIcon,
  "open-house-hub": OpenHouseHubIcon,
  "home-stretch": HomeStretchIcon,
  "home-ready": HomeReadyIcon,
  "newsletter-studio": NewsletterStudioIcon,
  "market-intel": MarketIntelIcon,
  oven: OvenIcon,
  "lead-capture-forms": LeadCaptureFormsIcon
};

// src/components/card-illustration/track-illustrations.tsx
import { jsx as jsx25 } from "react/jsx-runtime";
var TRACK_ILLUSTRATIONS = {
  /* ---- Track Selection ---- */
  "track-daily": {
    codename: "The Sunrise",
    section: "Daily Exercises Track Card",
    accent: "#D4943A",
    pattern: ConcentricCircles,
    icon: DailyExerciseIcon
  },
  "track-weekly": {
    codename: "The Summit",
    section: "Weekly Challenges Track Card",
    accent: "#5A7EB5",
    pattern: OrbitalRings,
    icon: WeeklyChallengeIcon
  },
  "track-self-paced": {
    codename: "The Wanderer",
    section: "Self-Paced Track Card",
    accent: "#7A9E7E",
    pattern: DotGrid,
    icon: SelfPacedIcon
  },
  /* ---- Daily Track Cards ---- */
  "daily-credit-score": {
    codename: "The Gauge",
    section: "Credit Score Education",
    accent: "#5B9EA6",
    pattern: ConcentricCircles,
    icon: CreditScoreIcon
  },
  "daily-savings": {
    codename: "The Nest Egg",
    section: "Savings Goals & Tips",
    accent: "#5E8C6A",
    pattern: ConcentricCircles,
    icon: SavingsIcon
  },
  "daily-dti": {
    codename: "The Balancer",
    section: "Debt-to-Income Ratio",
    accent: "#6E6EA8",
    pattern: DotGrid,
    icon: DtiIcon
  },
  "daily-dream-home": {
    codename: "The Vision Board",
    section: "Dream Home Exploration",
    accent: "#C9785D",
    pattern: OrbitalRings,
    icon: DreamHomeIcon
  },
  "daily-mortgage-terms": {
    codename: "The Decoder",
    section: "Mortgage Terms & Concepts",
    accent: "#4A7B94",
    pattern: CrossHatch,
    icon: MortgageTermsIcon
  },
  "daily-budget": {
    codename: "The Ledger",
    section: "Budget & Affordability",
    accent: "#7B8EC2",
    pattern: DiamondGrid,
    icon: BudgetIcon
  },
  "daily-timeline": {
    codename: "The Roadmap",
    section: "Home Buying Timeline",
    accent: "#8B5E83",
    pattern: ConcentricCircles,
    icon: TimelineIcon
  },
  "daily-streak": {
    codename: "The Flame",
    section: "Streak & Motivation",
    accent: "#B85C38",
    pattern: RadialBurst,
    icon: StreakIcon
  },
  "daily-celebration": {
    codename: "The Confetti",
    section: "Milestone Celebration",
    accent: "#D4943A",
    pattern: RadialBurst,
    icon: CelebrationIcon
  },
  "daily-down-payment": {
    codename: "The Stack",
    section: "Down Payment Progress",
    accent: "#3D7A80",
    pattern: DotGrid,
    icon: DownPaymentIcon
  },
  "daily-pre-approval": {
    codename: "The Shield",
    section: "Pre-Approval Readiness",
    accent: "#5A7EB5",
    pattern: CrossHatch,
    icon: PreApprovalIcon
  },
  "daily-neighborhood": {
    codename: "The Village",
    section: "Neighborhood Exploration",
    accent: "#A67B8A",
    pattern: OrbitalRings,
    icon: NeighborhoodIcon
  },
  /* ---- Weekly Track Cards ---- */
  "weekly-credit-check": {
    codename: "The Compass Check",
    section: "Weekly Credit Review",
    accent: "#5B9EA6",
    pattern: ConcentricCircles,
    icon: CreditScoreIcon
  },
  "weekly-savings-goal": {
    codename: "The Milestone Jar",
    section: "Weekly Savings Target",
    accent: "#7A9E7E",
    pattern: ConcentricCircles,
    icon: SavingsIcon
  },
  "weekly-budget-review": {
    codename: "The Weekly Ledger",
    section: "Weekly Budget Review",
    accent: "#5A7EB5",
    pattern: DiamondGrid,
    icon: BudgetIcon
  },
  "weekly-research": {
    codename: "The Explorer",
    section: "Weekly Research Task",
    accent: "#8E7CC3",
    pattern: OrbitalRings,
    icon: NeighborhoodIcon
  },
  "weekly-challenge": {
    codename: "The Trophy Case",
    section: "Weekly Challenge Completion",
    accent: "#C27052",
    pattern: RadialBurst,
    icon: WeeklyChallengeIcon
  }
};
function TrackCardIllustration({
  illustrationKey,
  accentOverride,
  iconSize = 48,
  ...props
}) {
  const def = TRACK_ILLUSTRATIONS[illustrationKey];
  if (!def) return null;
  const accent = accentOverride ?? def.accent;
  const PatternComp = def.pattern;
  const IconComp = def.icon;
  return /* @__PURE__ */ jsx25(
    CardIllustration,
    {
      accent,
      pattern: /* @__PURE__ */ jsx25(PatternComp, { accent }),
      icon: /* @__PURE__ */ jsx25(IconComp, { accent, size: iconSize }),
      ...props
    }
  );
}

// src/components/card-illustration/dashboard-illustrations.tsx
import { jsx as jsx26 } from "react/jsx-runtime";
var DASHBOARD_ILLUSTRATIONS = {
  "before-9": {
    codename: "The Dawn",
    section: "Five Before 9 Action Card",
    accent: "#D4943A",
    pattern: RadialBurst,
    icon: DawnIcon,
    dark: true
  },
  conversations: {
    codename: "The Signal",
    section: "Conversations Inbox Card",
    accent: "#5B9EA6",
    pattern: ConcentricCircles,
    icon: SignalIcon
  },
  "market-intel": {
    codename: "The Pulse",
    section: "Market Intel TL;DR Card",
    accent: "#5A7EB5",
    pattern: OrbitalRings,
    icon: PulseIcon
  },
  "neighborhood-intel": {
    codename: "The Atlas",
    section: "Neighborhood Intel Card",
    accent: "#4A7B5E",
    pattern: DotGrid,
    icon: AtlasIcon
  }
};
function DashboardCardIllustration({
  illustrationKey,
  accentOverride,
  iconSize = 48,
  ...props
}) {
  const def = DASHBOARD_ILLUSTRATIONS[illustrationKey];
  if (!def) return null;
  const accent = accentOverride ?? def.accent;
  const PatternComp = def.pattern;
  const IconComp = def.icon;
  return /* @__PURE__ */ jsx26(
    CardIllustration,
    {
      accent,
      dark: def.dark,
      pattern: /* @__PURE__ */ jsx26(PatternComp, { accent }),
      icon: /* @__PURE__ */ jsx26(IconComp, { accent: def.dark ? "#fff" : accent, size: iconSize }),
      ...props
    }
  );
}

// src/components/card-illustration/app-illustrations.tsx
import { jsx as jsx27 } from "react/jsx-runtime";
var APP_ILLUSTRATIONS = {
  "accountability-tracker": {
    codename: "The Checkpoint",
    section: "Accountability Tracker \u2014 daily prospecting habits",
    accent: "#E07A2F",
    pattern: ConcentricCircles,
    icon: AccountabilityTrackerIcon
  },
  drumbeat: {
    codename: "The Rhythm",
    section: "The Drumbeat \u2014 automated prospecting sequences",
    accent: "#C74B3F",
    pattern: RadialBurst,
    icon: DrumbeatIcon
  },
  "harvest-home": {
    codename: "The Harvest",
    section: "Harvest Home \u2014 geographic farming campaigns",
    accent: "#6B8E4E",
    pattern: DotGrid,
    icon: HarvestHomeIcon
  },
  "open-house-hub": {
    codename: "The Welcome",
    section: "Open House Hub \u2014 open house sign-in capture",
    accent: "#D4943A",
    pattern: DiamondGrid,
    icon: OpenHouseHubIcon
  },
  "home-stretch": {
    codename: "The Finish Line",
    section: "The Home Stretch \u2014 buyer journey nurture",
    accent: "#5B9EA6",
    pattern: OrbitalRings,
    icon: HomeStretchIcon
  },
  "home-ready": {
    codename: "The Key",
    section: "Home Ready \u2014 buyer readiness assessments",
    accent: "#4A7B5E",
    pattern: ConcentricCircles,
    icon: HomeReadyIcon
  },
  "newsletter-studio": {
    codename: "The Press",
    section: "Newsletter Studio \u2014 email campaigns & newsletters",
    accent: "#7B5EA7",
    pattern: CrossHatch,
    icon: NewsletterStudioIcon
  },
  "market-intel": {
    codename: "The Lens",
    section: "Market Intel \u2014 local market trends & data",
    accent: "#5A7EB5",
    pattern: OrbitalRings,
    icon: MarketIntelIcon
  },
  oven: {
    codename: "The Hearth",
    section: "The Oven \u2014 client retention & homeowner engagement",
    accent: "#C75B39",
    pattern: RadialBurst,
    icon: OvenIcon
  },
  "lead-capture-forms": {
    codename: "The Funnel",
    section: "Lead Capture Forms \u2014 custom capture forms & funnels",
    accent: "#B8863B",
    pattern: DotGrid,
    icon: LeadCaptureFormsIcon
  }
};
function AppCardIllustration({
  illustrationKey,
  accentOverride,
  iconSize = 24,
  ...props
}) {
  const def = APP_ILLUSTRATIONS[illustrationKey];
  if (!def) return null;
  const accent = accentOverride ?? def.accent;
  const PatternComp = def.pattern;
  const IconComp = def.icon;
  return /* @__PURE__ */ jsx27(
    CardIllustration,
    {
      accent,
      pattern: /* @__PURE__ */ jsx27(PatternComp, { accent }),
      icon: /* @__PURE__ */ jsx27(IconComp, { accent, size: iconSize }),
      ...props
    }
  );
}

// src/components/app-shell/AppShell.tsx
import * as React16 from "react";
import { jsx as jsx28, jsxs as jsxs19 } from "react/jsx-runtime";
var AppShell = React16.forwardRef(
  ({ className, header, children, ...props }, ref) => /* @__PURE__ */ jsxs19(
    "div",
    {
      ref,
      className: cn("min-h-screen flex flex-col bg-[var(--background)]", className),
      ...props,
      children: [
        header,
        /* @__PURE__ */ jsx28("div", { className: "flex-1 flex flex-col", children })
      ]
    }
  )
);
AppShell.displayName = "AppShell";

// src/components/app-header/AppHeader.tsx
import * as React17 from "react";
import { Fragment as Fragment3, jsx as jsx29, jsxs as jsxs20 } from "react/jsx-runtime";
var AppHeader = React17.forwardRef(
  ({ className, logo, title, leftSlot, rightSlot, children, ...props }, ref) => /* @__PURE__ */ jsx29(
    "header",
    {
      ref,
      className: cn(
        "sticky top-0 z-30 bg-[var(--card-background)] border-b border-[var(--card-border)] px-4 py-3",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxs20("div", { className: "flex items-center justify-between max-w-7xl mx-auto", children: [
        /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-3", children: [
          logo,
          title && /* @__PURE__ */ jsxs20(Fragment3, { children: [
            /* @__PURE__ */ jsx29("div", { className: "h-5 w-px bg-[var(--neutral-200)]" }),
            /* @__PURE__ */ jsx29("span", { className: "text-sm text-[var(--neutral-500)]", children: title })
          ] }),
          leftSlot
        ] }),
        /* @__PURE__ */ jsxs20("div", { className: "flex items-center gap-1", children: [
          rightSlot,
          children
        ] })
      ] })
    }
  )
);
AppHeader.displayName = "AppHeader";
var AppHeaderAction = React17.forwardRef(
  ({ className, dot = false, children, ...props }, ref) => /* @__PURE__ */ jsxs20(
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
        dot && /* @__PURE__ */ jsx29("span", { className: "absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--hot)] rounded-full" })
      ]
    }
  )
);
AppHeaderAction.displayName = "AppHeaderAction";
var AppHeaderDivider = React17.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx29(
  "div",
  {
    ref,
    className: cn("h-5 w-px bg-[var(--neutral-200)]", className),
    ...props
  }
));
AppHeaderDivider.displayName = "AppHeaderDivider";

// src/components/slide-panel/SlidePanel.tsx
import * as React18 from "react";
import * as DialogPrimitive2 from "@radix-ui/react-dialog";
import { jsx as jsx30, jsxs as jsxs21 } from "react/jsx-runtime";
function SlidePanel({
  isOpen,
  onClose,
  position = "right",
  width = "280px",
  children,
  className
}) {
  return /* @__PURE__ */ jsx30(DialogPrimitive2.Root, { open: isOpen, onOpenChange: (open) => !open && onClose(), children: /* @__PURE__ */ jsxs21(DialogPrimitive2.Portal, { children: [
    /* @__PURE__ */ jsx30(
      DialogPrimitive2.Overlay,
      {
        className: "fixed inset-0 z-40 bg-black/30 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      }
    ),
    /* @__PURE__ */ jsx30(
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
        style: { width, maxWidth: "calc(100vw - 48px)" },
        children
      }
    )
  ] }) });
}
var SlidePanelHeader = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
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
var SlidePanelBody = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
  "div",
  {
    ref,
    className: cn("flex-1 overflow-y-auto", className),
    ...props
  }
));
SlidePanelBody.displayName = "SlidePanelBody";
var SlidePanelFooter = React18.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx30(
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
import * as React19 from "react";
import { cva as cva3 } from "class-variance-authority";
import { jsx as jsx31 } from "react/jsx-runtime";
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
var PageContainer = React19.forwardRef(
  ({ className, maxWidth, padding, ...props }, ref) => /* @__PURE__ */ jsx31(
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
import { jsx as jsx32, jsxs as jsxs22 } from "react/jsx-runtime";
function Sidebar({
  navGroups,
  activeNavLabel,
  onNavClick,
  hovered,
  onHover
}) {
  return /* @__PURE__ */ jsx32(
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
      children: /* @__PURE__ */ jsx32("div", { className: "py-2", children: navGroups.map((group, gi) => /* @__PURE__ */ jsxs22("div", { children: [
        group.label && hovered && /* @__PURE__ */ jsx32("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-400)] px-4 pt-3 pb-1", children: group.label }),
        group.items.map((item) => {
          const isActive = item.label === activeNavLabel;
          return /* @__PURE__ */ jsxs22(
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
                /* @__PURE__ */ jsx32("div", { className: "size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5", children: item.icon }),
                hovered && /* @__PURE__ */ jsx32("span", { className: "text-xs font-medium whitespace-nowrap", style: { fontFamily: "var(--font-app-subtitle, var(--font-body))" }, children: item.label })
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
  return /* @__PURE__ */ jsxs22(SlidePanel, { isOpen: open, onClose, position: "left", width: "280px", children: [
    /* @__PURE__ */ jsx32(SlidePanelHeader, { children: /* @__PURE__ */ jsx32("span", { className: "font-semibold text-[var(--neutral-900)]", children: "Menu" }) }),
    /* @__PURE__ */ jsxs22("div", { className: "flex items-center gap-3 px-5 py-4 border-b border-[var(--card-border)]", children: [
      /* @__PURE__ */ jsx32(
        "div",
        {
          className: "w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold",
          style: { background: "var(--brand-primary-light)", color: "var(--brand-primary)" },
          children: agentInitials
        }
      ),
      /* @__PURE__ */ jsxs22("div", { children: [
        /* @__PURE__ */ jsx32("div", { className: "font-medium text-sm text-[var(--neutral-900)]", children: agentName }),
        agentSubtitle && /* @__PURE__ */ jsx32("div", { className: "text-xs text-[var(--neutral-500)]", children: agentSubtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsx32(SlidePanelBody, { children: /* @__PURE__ */ jsx32("nav", { className: "py-2", children: navGroups.map((group, gi) => /* @__PURE__ */ jsxs22("div", { children: [
      group.label && /* @__PURE__ */ jsx32("p", { className: "text-[9px] font-semibold uppercase tracking-wider text-[var(--neutral-400)] px-5 pt-3 pb-1", children: group.label }),
      group.items.map((item) => {
        const isActive = item.label === activeNavLabel;
        return /* @__PURE__ */ jsxs22(
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
            style: { fontFamily: "var(--font-app-subtitle, var(--font-body))" },
            children: [
              /* @__PURE__ */ jsx32("div", { className: "size-5 flex items-center justify-center shrink-0 [&>svg]:w-5 [&>svg]:h-5", children: item.icon }),
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
  headerActions,
  headerRightSlot,
  headerClassName,
  className
}) {
  const [sidebarHovered, setSidebarHovered] = useState3(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState3(false);
  return /* @__PURE__ */ jsxs22(
    "div",
    {
      className: cn("min-h-screen", className),
      style: { backgroundColor: "var(--background)" },
      children: [
        /* @__PURE__ */ jsxs22("div", { className: "flex items-start justify-between px-4 md:px-6 pt-4 md:pt-6", children: [
          /* @__PURE__ */ jsxs22("div", { className: cn("flex items-start gap-3 md:gap-4 max-w-xl", headerClassName), children: [
            /* @__PURE__ */ jsx32(
              "button",
              {
                className: "md:hidden p-2 -ml-2 rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-50)]",
                onClick: () => setMobileMenuOpen(true),
                "aria-label": "Open menu",
                children: /* @__PURE__ */ jsx32(Menu, { width: 20, height: 20, strokeWidth: 1.5 })
              }
            ),
            /* @__PURE__ */ jsx32("div", { className: "shrink-0 hidden md:block", children: logo }),
            /* @__PURE__ */ jsxs22("div", { children: [
              /* @__PURE__ */ jsx32(
                "h1",
                {
                  className: "text-2xl md:text-3xl font-bold tracking-tight leading-tight",
                  style: { color: "var(--app-title-color, var(--foreground))", fontFamily: "var(--font-app-title, var(--font-heading))" },
                  children: appTitle
                }
              ),
              /* @__PURE__ */ jsx32(
                "p",
                {
                  className: "text-sm md:text-base font-bold",
                  style: { color: "var(--foreground)", fontFamily: "var(--font-app-subtitle, var(--font-body))" },
                  children: appSubtitle
                }
              ),
              highlightText && /* @__PURE__ */ jsx32(
                "p",
                {
                  className: "text-sm leading-relaxed mt-1.5 hidden md:block",
                  style: { color: "var(--neutral-600)", fontFamily: "var(--font-app-subtitle, var(--font-body))" },
                  children: highlightText
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs22("div", { className: "flex items-center gap-3 shrink-0", children: [
            headerRightSlot,
            /* @__PURE__ */ jsxs22(
              "div",
              {
                className: "rounded-xl px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-3 shrink-0",
                style: {
                  backgroundColor: "var(--card-background)",
                  border: "1px solid var(--card-border)"
                },
                children: [
                  /* @__PURE__ */ jsxs22("div", { className: "text-right hidden md:block", children: [
                    /* @__PURE__ */ jsx32("p", { className: "text-xs font-medium text-[var(--foreground)]", children: agentName }),
                    agentSubtitle && /* @__PURE__ */ jsx32("p", { className: "text-[10px] text-[var(--neutral-400)]", children: agentSubtitle })
                  ] }),
                  /* @__PURE__ */ jsx32(
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
          ] })
        ] }),
        headerActions && /* @__PURE__ */ jsx32("div", { className: "px-4 md:px-6 pt-3", children: headerActions }),
        /* @__PURE__ */ jsxs22("div", { className: "flex px-4 md:px-6 pt-4 pb-6 gap-4", style: { minHeight: 320 }, children: [
          /* @__PURE__ */ jsx32(
            Sidebar,
            {
              navGroups,
              activeNavLabel,
              onNavClick,
              hovered: sidebarHovered,
              onHover: setSidebarHovered
            }
          ),
          /* @__PURE__ */ jsxs22("div", { className: "flex-1 min-w-0 flex flex-col gap-4", children: [
            (heroContent || rightCard) && /* @__PURE__ */ jsxs22("div", { className: cn("flex flex-col lg:flex-row gap-4", !rightCard && "lg:flex-col"), children: [
              heroContent && /* @__PURE__ */ jsx32("div", { className: "flex-1 min-w-0", children: heroContent }),
              rightCard && /* @__PURE__ */ jsx32("div", { className: "flex-1 min-w-0", children: rightCard })
            ] }),
            children
          ] })
        ] }),
        /* @__PURE__ */ jsx32(
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
import { jsx as jsx33, jsxs as jsxs23 } from "react/jsx-runtime";
var STAGES = ["cold", "warming", "engaged", "qualified", "hot"];
var STAGE_LABELS = {
  cold: "Cold",
  warming: "Warming",
  engaged: "Engaged",
  qualified: "Qualified",
  hot: "Hot"
};
var STAGE_COLORS = {
  cold: "var(--cold)",
  warming: "var(--warming)",
  engaged: "var(--engaged)",
  qualified: "var(--qualified)",
  hot: "var(--hot)"
};
var GRADIENT = "linear-gradient(to right, var(--cold), var(--warming), var(--engaged), var(--qualified), var(--hot))";
function PipelineThermometer({
  title = "Lead Pipeline",
  data,
  stats,
  totalLabel = "Total Leads",
  className
}) {
  const total = STAGES.reduce((sum, stage) => sum + data[stage], 0);
  let highestActiveIndex = -1;
  for (let i = STAGES.length - 1; i >= 0; i--) {
    if (data[STAGES[i]] > 0) {
      highestActiveIndex = i;
      break;
    }
  }
  const fillPct = highestActiveIndex >= 0 ? (highestActiveIndex + 1) / STAGES.length * 100 : 0;
  return /* @__PURE__ */ jsxs23(
    "div",
    {
      className: cn("rounded-xl p-5", className),
      style: {
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--card-border)"
      },
      children: [
        /* @__PURE__ */ jsxs23("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ jsx33(
            "span",
            {
              className: "font-semibold text-sm",
              style: { color: "var(--foreground)" },
              children: title
            }
          ),
          /* @__PURE__ */ jsxs23(
            "span",
            {
              className: "text-xs font-medium px-2.5 py-1 rounded-md",
              style: {
                backgroundColor: "var(--brand-primary-light)",
                color: "var(--brand-primary)"
              },
              children: [
                total,
                " ",
                totalLabel
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx33("div", { className: "relative h-4 rounded-full overflow-hidden mb-3", style: { backgroundColor: "var(--neutral-200)" }, children: fillPct > 0 && /* @__PURE__ */ jsx33(
          "div",
          {
            className: "absolute inset-y-0 left-0 rounded-full transition-all duration-500 ease-in-out",
            style: {
              width: `${fillPct}%`,
              backgroundImage: GRADIENT,
              backgroundSize: `${100 / fillPct * 100}% 100%`
            }
          }
        ) }),
        /* @__PURE__ */ jsx33("div", { className: "flex mb-4", children: STAGES.map((stage, i) => {
          const isActive = i <= highestActiveIndex;
          return /* @__PURE__ */ jsxs23("div", { className: "flex-1 text-center", children: [
            /* @__PURE__ */ jsx33(
              "p",
              {
                className: "text-sm font-bold",
                style: {
                  color: isActive ? "var(--foreground)" : "var(--neutral-300)",
                  fontFamily: "var(--font-stat, var(--font-heading))"
                },
                children: data[stage]
              }
            ),
            /* @__PURE__ */ jsx33(
              "p",
              {
                className: "text-[10px] font-medium",
                style: {
                  color: isActive ? STAGE_COLORS[stage] : "var(--neutral-300)"
                },
                children: STAGE_LABELS[stage]
              }
            )
          ] }, stage);
        }) }),
        stats && stats.length > 0 && /* @__PURE__ */ jsx33(
          "div",
          {
            className: "flex items-center justify-around pt-4",
            style: { borderTop: "1px solid var(--card-border)" },
            children: stats.map((stat, index) => /* @__PURE__ */ jsxs23("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxs23("div", { className: "text-center", children: [
                /* @__PURE__ */ jsx33(
                  "div",
                  {
                    className: "text-lg font-bold",
                    style: {
                      color: "var(--brand-primary)",
                      fontFamily: "var(--font-stat, var(--font-heading))"
                    },
                    children: stat.value
                  }
                ),
                /* @__PURE__ */ jsx33(
                  "div",
                  {
                    className: "text-xs",
                    style: { color: "var(--neutral-500)" },
                    children: stat.label
                  }
                )
              ] }),
              index < stats.length - 1 && /* @__PURE__ */ jsx33(
                "div",
                {
                  className: "h-8 w-px",
                  style: { backgroundColor: "var(--neutral-200)" }
                }
              )
            ] }, index))
          }
        )
      ]
    }
  );
}

// src/components/category-section/CategorySection.tsx
import { useState as useState4 } from "react";
import { DragHandGesture, NavArrowDown as NavArrowDown2 } from "iconoir-react";

// src/components/category-section/AppCard.tsx
import { jsx as jsx34, jsxs as jsxs24 } from "react/jsx-runtime";
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
  accentColor,
  illustrationKey,
  onClick,
  className
}) {
  return /* @__PURE__ */ jsxs24(
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
        /* @__PURE__ */ jsxs24("div", { className: "flex items-center justify-between mb-3", children: [
          illustrationKey && APP_ILLUSTRATIONS[illustrationKey] ? /* @__PURE__ */ jsx34(
            AppCardIllustration,
            {
              illustrationKey,
              accentOverride: accentColor,
              size: 36,
              radius: 10,
              iconSize: 20
            }
          ) : accentColor ? /* @__PURE__ */ jsx34(
            CardIllustration,
            {
              accent: accentColor,
              size: 36,
              radius: 10,
              icon
            }
          ) : /* @__PURE__ */ jsx34(
            "div",
            {
              className: "w-8 h-8 rounded-md flex items-center justify-center text-[var(--neutral-600)]",
              style: { background: "var(--neutral-100)" },
              children: icon
            }
          ),
          /* @__PURE__ */ jsx34(Badge, { variant: statusVariant, children: status })
        ] }),
        /* @__PURE__ */ jsx34("h4", { className: "font-semibold text-sm text-[var(--neutral-900)] mb-2", children: title }),
        /* @__PURE__ */ jsxs24("div", { className: "flex items-baseline gap-1.5 mb-2", children: [
          /* @__PURE__ */ jsx34("span", { className: "stat-number text-2xl text-[var(--neutral-900)]", children: value }),
          /* @__PURE__ */ jsx34("span", { className: "text-xs text-[var(--neutral-500)]", children: valueLabel })
        ] }),
        /* @__PURE__ */ jsx34("p", { className: "text-xs text-[var(--neutral-500)] line-clamp-2", children: description }),
        subtext && /* @__PURE__ */ jsx34("p", { className: "text-xs text-[var(--brand-primary)] mt-2 font-medium", children: subtext })
      ]
    }
  );
}

// src/components/category-section/CategorySection.tsx
import { jsx as jsx35, jsxs as jsxs25 } from "react/jsx-runtime";
var ICON_SM = { width: 16, height: 16, strokeWidth: 1.5 };
var ICON_PROPS = { width: 20, height: 20, strokeWidth: 1.5 };
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
  return /* @__PURE__ */ jsxs25(
    "div",
    {
      "data-category": id,
      className: cn(
        "bg-[var(--card-background)] border border-[var(--card-border)] rounded-xl overflow-hidden",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs25(
          "button",
          {
            onClick: () => setIsExpanded(!isExpanded),
            className: "w-full flex items-center justify-between p-4 hover:bg-[var(--neutral-50)] transition-colors",
            children: [
              /* @__PURE__ */ jsxs25("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsx35("div", { className: "text-[var(--neutral-300)] hover:text-[var(--neutral-500)] cursor-grab active:cursor-grabbing transition-colors", children: /* @__PURE__ */ jsx35(DragHandGesture, { ...ICON_SM }) }),
                /* @__PURE__ */ jsx35(
                  "div",
                  {
                    className: "w-10 h-10 rounded-lg flex items-center justify-center",
                    style: { background: iconBg, color: iconColor },
                    children: icon
                  }
                ),
                /* @__PURE__ */ jsxs25("div", { className: "text-left", children: [
                  /* @__PURE__ */ jsx35("h3", { className: "font-semibold text-[var(--neutral-900)]", children: title }),
                  /* @__PURE__ */ jsx35("p", { className: "text-sm text-[var(--neutral-500)]", children: subtitle })
                ] })
              ] }),
              /* @__PURE__ */ jsx35(
                NavArrowDown2,
                {
                  ...ICON_PROPS,
                  className: cn(
                    "text-[var(--neutral-400)] transition-transform duration-200",
                    isExpanded && "rotate-180"
                  )
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx35(
          "div",
          {
            className: "grid transition-[grid-template-rows] duration-300 ease-in-out",
            style: { gridTemplateRows: isExpanded ? "1fr" : "0fr" },
            children: /* @__PURE__ */ jsx35("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsx35("div", { className: "px-4 pb-4", children: /* @__PURE__ */ jsx35("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: apps.map((app, index) => /* @__PURE__ */ jsx35(
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
                accentColor: app.accentColor ?? iconColor,
                illustrationKey: app.illustrationKey,
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
import { jsx as jsx36, jsxs as jsxs26 } from "react/jsx-runtime";
var ICON_PROPS2 = { width: 18, height: 18, strokeWidth: 1.5 };
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
  return /* @__PURE__ */ jsxs26(Card, { padding: "sm", className, children: [
    /* @__PURE__ */ jsxs26("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxs26("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsx36(
          "div",
          {
            className: "w-8 h-8 rounded-md flex items-center justify-center",
            style: { background: "var(--brand-accent-light)", color: "var(--brand-accent)" },
            children: /* @__PURE__ */ jsx36(Calendar, { ...ICON_PROPS2 })
          }
        ),
        /* @__PURE__ */ jsxs26("div", { children: [
          /* @__PURE__ */ jsx36("h4", { className: "font-semibold text-sm text-[var(--neutral-900)]", children: "Today's Schedule" }),
          /* @__PURE__ */ jsx36("p", { className: "text-xs text-[var(--neutral-500)]", children: displayDate })
        ] })
      ] }),
      onViewAll && /* @__PURE__ */ jsx36(
        "button",
        {
          onClick: onViewAll,
          className: "text-xs font-medium text-[var(--brand-primary)] hover:underline",
          children: "View All"
        }
      )
    ] }),
    /* @__PURE__ */ jsx36("div", { className: "space-y-0", children: items.map((item, index) => /* @__PURE__ */ jsxs26(
      "div",
      {
        className: "flex items-center gap-4 py-2 border-b border-[var(--card-border)] last:border-0",
        children: [
          /* @__PURE__ */ jsx36("span", { className: "text-xs font-medium text-[var(--neutral-400)] w-16", children: item.time }),
          /* @__PURE__ */ jsx36("span", { className: "text-sm text-[var(--neutral-700)]", children: item.event })
        ]
      },
      index
    )) }),
    items.length === 0 && /* @__PURE__ */ jsx36("p", { className: "text-sm text-[var(--neutral-400)] text-center py-4", children: "No events scheduled" })
  ] });
}

// src/components/drag-hint/DragHint.tsx
import { DragHandGesture as DragHandGesture2 } from "iconoir-react";
import { jsx as jsx37, jsxs as jsxs27 } from "react/jsx-runtime";
var ICON_SM2 = { width: 16, height: 16, strokeWidth: 1.5 };
function DragHint({
  message = "Drag sections to rearrange your dashboard",
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs27(
    "div",
    {
      className: cn(
        "flex items-center justify-center gap-2 text-xs text-[var(--neutral-400)] py-2",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsx37(DragHandGesture2, { ...ICON_SM2 }),
        /* @__PURE__ */ jsx37("span", { children: message })
      ]
    }
  );
}

// src/components/stat-card/StatCard.tsx
import { jsx as jsx38, jsxs as jsxs28 } from "react/jsx-runtime";
function StatCard({
  label,
  value,
  icon,
  color = "var(--brand-primary)",
  subtitle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx38(Card, { className, ...props, children: /* @__PURE__ */ jsxs28("div", { className: "flex items-start justify-between", children: [
    /* @__PURE__ */ jsxs28("div", { children: [
      /* @__PURE__ */ jsx38("p", { className: "text-sm text-[var(--neutral-500)]", children: label }),
      /* @__PURE__ */ jsx38("p", { className: "text-2xl font-bold stat-number", style: { color }, children: value }),
      subtitle && /* @__PURE__ */ jsx38("p", { className: "text-xs text-[var(--neutral-400)] mt-0.5", children: subtitle })
    ] }),
    icon && /* @__PURE__ */ jsx38(
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

// src/components/segmented-progress/SegmentedProgress.tsx
import { jsx as jsx39 } from "react/jsx-runtime";
var SIZE_MAP = {
  sm: "h-1.5",
  md: "h-2.5",
  lg: "h-3.5"
};
function SegmentedProgress({
  segments,
  total,
  size = "md",
  className,
  ...props
}) {
  if (total <= 0) return null;
  return /* @__PURE__ */ jsx39(
    "div",
    {
      className: cn("flex gap-1 w-full", className),
      role: "progressbar",
      "aria-valuemin": 0,
      "aria-valuemax": total,
      "aria-valuenow": segments.reduce((sum, s) => sum + s.value, 0),
      ...props,
      children: Array.from({ length: total }).map((_, i) => {
        let color = "var(--neutral-200)";
        let filled = 0;
        for (const seg of segments) {
          if (i < filled + seg.value) {
            color = seg.color;
            break;
          }
          filled += seg.value;
        }
        const isFilled = i < segments.reduce((sum, s) => sum + s.value, 0);
        return /* @__PURE__ */ jsx39(
          "div",
          {
            className: cn("flex-1 rounded-full transition-colors duration-300", SIZE_MAP[size]),
            style: {
              backgroundColor: isFilled ? color : "var(--neutral-200)"
            }
          },
          i
        );
      })
    }
  );
}

// src/components/hero-action-card/HeroActionCard.tsx
import { Phone, Check as Check3, SendDiagonal, Mail, Eye } from "iconoir-react";
import { jsx as jsx40, jsxs as jsxs29 } from "react/jsx-runtime";
var TEMP_COLORS = {
  hot: "var(--hot)",
  qualified: "var(--qualified)",
  engaged: "var(--engaged)",
  warming: "var(--warming)",
  cold: "var(--cold)",
  sphere: "var(--neutral-400)"
};
var TEMP_LABELS = {
  hot: "HOT",
  qualified: "QUALIFIED",
  engaged: "ENGAGED",
  warming: "WARM",
  cold: "COLD",
  sphere: "SPHERE"
};
var ACTION_ICONS = {
  call: Phone,
  text: SendDiagonal,
  email: Mail,
  review: Eye,
  send: SendDiagonal
};
function HeroActionCard({
  title,
  heading,
  subtitle,
  completedCount,
  totalCount,
  tasks,
  onTaskToggle,
  onTaskClick,
  onViewFullPlan,
  footerText = "View Full Action Plan",
  illustration,
  className
}) {
  const segments = [];
  let completedSoFar = 0;
  for (const task of tasks) {
    if (task.completed) {
      segments.push({ value: 1, color: "var(--success)" });
      completedSoFar++;
    }
  }
  const nextUncompleted = tasks.find((t) => !t.completed);
  if (nextUncompleted) {
    segments.push({ value: 1, color: TEMP_COLORS[nextUncompleted.temperature] });
  }
  return /* @__PURE__ */ jsxs29(
    "div",
    {
      className: cn("rounded-xl overflow-hidden", className),
      style: {
        backgroundColor: "var(--hero-card-background, var(--card-background))",
        border: "1px solid var(--hero-card-border, var(--card-border))"
      },
      children: [
        /* @__PURE__ */ jsxs29("div", { className: "px-5 pt-5 pb-3 relative", children: [
          /* @__PURE__ */ jsxs29("div", { className: "flex items-start justify-between mb-1", children: [
            /* @__PURE__ */ jsxs29("div", { children: [
              /* @__PURE__ */ jsx40(
                "p",
                {
                  className: "text-[11px] font-semibold uppercase tracking-wider mb-1",
                  style: { color: "var(--brand-primary)" },
                  children: title
                }
              ),
              /* @__PURE__ */ jsx40(
                "h2",
                {
                  className: "text-xl font-bold",
                  style: { color: "var(--hero-card-title, var(--foreground))" },
                  children: heading
                }
              ),
              subtitle && /* @__PURE__ */ jsx40(
                "p",
                {
                  className: "text-sm mt-0.5",
                  style: { color: "var(--hero-card-body-text, var(--neutral-500))" },
                  children: subtitle
                }
              ),
              /* @__PURE__ */ jsxs29("div", { className: "mt-1", children: [
                /* @__PURE__ */ jsxs29(
                  "span",
                  {
                    className: "text-2xl font-bold",
                    style: {
                      color: "var(--brand-primary)",
                      fontFamily: "var(--font-stat, var(--font-heading))"
                    },
                    children: [
                      completedCount,
                      "/",
                      totalCount
                    ]
                  }
                ),
                /* @__PURE__ */ jsx40(
                  "span",
                  {
                    className: "text-xs ml-1.5",
                    style: { color: "var(--hero-card-body-text, var(--neutral-500))" },
                    children: "completed"
                  }
                )
              ] })
            ] }),
            illustration && /* @__PURE__ */ jsx40("div", { className: "shrink-0 ml-3", children: illustration })
          ] }),
          /* @__PURE__ */ jsx40("div", { className: "mt-3", children: /* @__PURE__ */ jsx40(
            SegmentedProgress,
            {
              segments,
              total: totalCount,
              size: "md"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx40("div", { className: "px-5 pb-5 space-y-2 mt-2", children: tasks.map((task) => {
          const isCompleted = task.completed;
          const isNext = !isCompleted && task.id === nextUncompleted?.id;
          const ActionIcon = task.actionType ? ACTION_ICONS[task.actionType] : Phone;
          const tempColor = TEMP_COLORS[task.temperature];
          return /* @__PURE__ */ jsxs29(
            "div",
            {
              className: cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 transition-all cursor-pointer",
                isCompleted && "opacity-60"
              ),
              style: {
                backgroundColor: isNext ? `color-mix(in srgb, ${tempColor} 12%, var(--hero-card-background, var(--card-background)))` : `color-mix(in srgb, var(--neutral-500) 8%, var(--hero-card-background, var(--card-background)))`,
                border: isNext ? `1px solid color-mix(in srgb, ${tempColor} 30%, transparent)` : "1px solid transparent"
              },
              onClick: () => onTaskClick?.(task.id),
              children: [
                /* @__PURE__ */ jsx40(
                  "button",
                  {
                    className: cn(
                      "size-9 rounded-full flex items-center justify-center shrink-0 transition-colors"
                    ),
                    style: {
                      backgroundColor: isCompleted ? "color-mix(in srgb, var(--success) 20%, transparent)" : "color-mix(in srgb, var(--neutral-400) 15%, transparent)",
                      color: isCompleted ? "var(--success)" : "var(--hero-card-body-text, var(--neutral-500))"
                    },
                    onClick: (e) => {
                      e.stopPropagation();
                      onTaskToggle?.(task.id, !isCompleted);
                    },
                    "aria-label": isCompleted ? "Mark incomplete" : "Mark complete",
                    children: isCompleted ? /* @__PURE__ */ jsx40(Check3, { width: 18, height: 18, strokeWidth: 2 }) : /* @__PURE__ */ jsx40(ActionIcon, { width: 18, height: 18, strokeWidth: 1.5 })
                  }
                ),
                /* @__PURE__ */ jsxs29("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsx40(
                    "p",
                    {
                      className: cn("font-semibold text-sm", isCompleted && "line-through"),
                      style: { color: "var(--hero-card-title, var(--foreground))" },
                      children: task.contactName
                    }
                  ),
                  /* @__PURE__ */ jsx40(
                    "p",
                    {
                      className: "text-xs truncate",
                      style: { color: "var(--hero-card-body-text, var(--neutral-500))" },
                      children: task.contextLine
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx40(
                  "span",
                  {
                    className: "text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md shrink-0",
                    style: {
                      backgroundColor: `color-mix(in srgb, ${tempColor} 15%, transparent)`,
                      color: tempColor
                    },
                    children: TEMP_LABELS[task.temperature]
                  }
                )
              ]
            },
            task.id
          );
        }) }),
        onViewFullPlan && /* @__PURE__ */ jsx40(
          "div",
          {
            className: "px-5 py-3 text-center",
            style: {
              borderTop: "1px solid var(--hero-card-border, var(--card-border))"
            },
            children: /* @__PURE__ */ jsx40(
              "button",
              {
                onClick: onViewFullPlan,
                className: "text-xs font-medium transition-opacity hover:opacity-80",
                style: { color: "var(--brand-primary)" },
                children: footerText
              }
            )
          }
        )
      ]
    }
  );
}

// src/components/audio-player-card/AudioPlayerCard.tsx
import { useState as useState5, useRef as useRef2, useEffect as useEffect3, useCallback as useCallback2 } from "react";
import { Play, Pause } from "iconoir-react";
import { jsx as jsx41, jsxs as jsxs30 } from "react/jsx-runtime";
function formatTime(seconds) {
  if (!isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
function AudioPlayerCard({
  src,
  title,
  subtitle,
  icon,
  className
}) {
  const audioRef = useRef2(null);
  const [isPlaying, setIsPlaying] = useState5(false);
  const [currentTime, setCurrentTime] = useState5(0);
  const [duration, setDuration] = useState5(0);
  const progress = duration > 0 ? currentTime / duration * 100 : 0;
  const togglePlay = useCallback2(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);
  const handleSeek = useCallback2(
    (e) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = ratio * duration;
    },
    [duration]
  );
  useEffect3(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);
  return /* @__PURE__ */ jsxs30(
    "div",
    {
      className: cn("rounded-xl p-4", className),
      style: {
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--card-border)"
      },
      children: [
        /* @__PURE__ */ jsx41("audio", { ref: audioRef, src, preload: "metadata" }),
        /* @__PURE__ */ jsxs30("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx41(
            "button",
            {
              onClick: togglePlay,
              className: "size-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
              style: {
                backgroundColor: "var(--brand-primary)",
                color: "#FFFFFF"
              },
              "aria-label": isPlaying ? "Pause" : "Play",
              children: isPlaying ? /* @__PURE__ */ jsx41(Pause, { width: 18, height: 18, strokeWidth: 2 }) : /* @__PURE__ */ jsx41(Play, { width: 18, height: 18, strokeWidth: 2 })
            }
          ),
          /* @__PURE__ */ jsxs30("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs30("div", { className: "flex items-center gap-2 mb-1", children: [
              icon && /* @__PURE__ */ jsx41("span", { style: { color: "var(--brand-primary)" }, children: icon }),
              /* @__PURE__ */ jsx41(
                "p",
                {
                  className: "font-semibold text-sm truncate",
                  style: { color: "var(--foreground)" },
                  children: title
                }
              )
            ] }),
            subtitle && /* @__PURE__ */ jsx41(
              "p",
              {
                className: "text-xs truncate mb-2",
                style: { color: "var(--neutral-500)" },
                children: subtitle
              }
            ),
            /* @__PURE__ */ jsx41(
              "div",
              {
                className: "h-1.5 rounded-full cursor-pointer",
                style: { backgroundColor: "var(--neutral-200)" },
                onClick: handleSeek,
                children: /* @__PURE__ */ jsx41(
                  "div",
                  {
                    className: "h-full rounded-full transition-all duration-100",
                    style: {
                      width: `${progress}%`,
                      backgroundColor: "var(--brand-primary)"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs30("div", { className: "flex justify-between mt-1", children: [
              /* @__PURE__ */ jsx41(
                "span",
                {
                  className: "text-[10px]",
                  style: { color: "var(--neutral-400)" },
                  children: formatTime(currentTime)
                }
              ),
              /* @__PURE__ */ jsx41(
                "span",
                {
                  className: "text-[10px]",
                  style: { color: "var(--neutral-400)" },
                  children: formatTime(duration)
                }
              )
            ] })
          ] })
        ] })
      ]
    }
  );
}

// src/components/news-row/NewsRow.tsx
import { OpenNewWindow } from "iconoir-react";
import { jsx as jsx42, jsxs as jsxs31 } from "react/jsx-runtime";
var TAG_COLORS = {
  new: { bg: "var(--info-light)", text: "var(--info)" },
  sold: { bg: "var(--success-light)", text: "var(--success)" },
  price: { bg: "var(--warning-light)", text: "var(--warning)" },
  update: { bg: "var(--brand-primary-light)", text: "var(--brand-primary)" },
  alert: { bg: "var(--error-light)", text: "var(--error)" },
  report: { bg: "var(--brand-accent-light)", text: "var(--brand-accent)" }
};
var TAG_LABELS = {
  new: "NEW",
  sold: "SOLD",
  price: "PRICE",
  update: "UPDATE",
  alert: "ALERT",
  report: "REPORT"
};
function NewsRow({
  items,
  onItemClick,
  maxItems,
  className
}) {
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;
  return /* @__PURE__ */ jsx42("div", { className: cn("space-y-1", className), children: visibleItems.map((item) => {
    const tagStyle = TAG_COLORS[item.tag];
    return /* @__PURE__ */ jsxs31(
      "div",
      {
        className: cn(
          "flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors",
          (item.href || onItemClick) && "cursor-pointer hover:opacity-80"
        ),
        style: {
          backgroundColor: "color-mix(in srgb, var(--neutral-500) 5%, transparent)"
        },
        onClick: () => {
          if (onItemClick) {
            onItemClick(item);
          } else if (item.href) {
            window.open(item.href, "_blank", "noopener");
          }
        },
        children: [
          /* @__PURE__ */ jsx42(
            "span",
            {
              className: "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 mt-0.5",
              style: {
                backgroundColor: tagStyle.bg,
                color: tagStyle.text
              },
              children: TAG_LABELS[item.tag]
            }
          ),
          /* @__PURE__ */ jsxs31("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx42(
              "p",
              {
                className: "text-sm font-medium leading-tight",
                style: { color: "var(--foreground)" },
                children: item.headline
              }
            ),
            item.summary && /* @__PURE__ */ jsx42(
              "p",
              {
                className: "text-xs mt-0.5 line-clamp-2",
                style: { color: "var(--neutral-500)" },
                children: item.summary
              }
            )
          ] }),
          /* @__PURE__ */ jsxs31("div", { className: "flex items-center gap-1.5 shrink-0", children: [
            item.timestamp && /* @__PURE__ */ jsx42(
              "span",
              {
                className: "text-[10px]",
                style: { color: "var(--neutral-400)" },
                children: item.timestamp
              }
            ),
            item.href && /* @__PURE__ */ jsx42(
              OpenNewWindow,
              {
                width: 12,
                height: 12,
                strokeWidth: 1.5,
                style: { color: "var(--neutral-400)" }
              }
            )
          ] })
        ]
      },
      item.id
    );
  }) });
}

// src/components/mini-kanban/MiniKanban.tsx
import { jsx as jsx43, jsxs as jsxs32 } from "react/jsx-runtime";
function MiniKanban({
  columns,
  onItemClick,
  maxItemsPerColumn = 3,
  className
}) {
  return /* @__PURE__ */ jsx43("div", { className: cn("flex gap-2 overflow-x-auto", className), children: columns.map((col) => {
    const visibleItems = col.items.slice(0, maxItemsPerColumn);
    const hiddenCount = col.items.length - visibleItems.length;
    const displayCount = col.count ?? col.items.length;
    return /* @__PURE__ */ jsxs32(
      "div",
      {
        className: "flex-1 min-w-[140px] rounded-lg overflow-hidden",
        style: {
          backgroundColor: "color-mix(in srgb, var(--neutral-500) 6%, var(--card-background))",
          border: "1px solid var(--card-border)"
        },
        children: [
          /* @__PURE__ */ jsxs32(
            "div",
            {
              className: "px-3 py-2 flex items-center justify-between",
              style: {
                borderBottom: `2px solid ${col.color}`
              },
              children: [
                /* @__PURE__ */ jsx43(
                  "span",
                  {
                    className: "text-[11px] font-semibold uppercase tracking-wider truncate",
                    style: { color: "var(--foreground)" },
                    children: col.title
                  }
                ),
                /* @__PURE__ */ jsx43(
                  "span",
                  {
                    className: "text-[11px] font-bold ml-2 shrink-0",
                    style: { color: col.color },
                    children: displayCount
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxs32("div", { className: "p-1.5 space-y-1", children: [
            visibleItems.map((item) => /* @__PURE__ */ jsxs32(
              "div",
              {
                className: cn(
                  "rounded-md px-2.5 py-2 transition-colors",
                  onItemClick && "cursor-pointer hover:opacity-80"
                ),
                style: {
                  backgroundColor: "var(--card-background)",
                  borderLeft: item.color ? `3px solid ${item.color}` : void 0
                },
                onClick: () => onItemClick?.(item.id, col.id),
                children: [
                  /* @__PURE__ */ jsx43(
                    "p",
                    {
                      className: "text-xs font-medium truncate",
                      style: { color: "var(--foreground)" },
                      children: item.label
                    }
                  ),
                  item.subtitle && /* @__PURE__ */ jsx43(
                    "p",
                    {
                      className: "text-[10px] truncate mt-0.5",
                      style: { color: "var(--neutral-500)" },
                      children: item.subtitle
                    }
                  )
                ]
              },
              item.id
            )),
            visibleItems.length === 0 && /* @__PURE__ */ jsx43(
              "p",
              {
                className: "text-[10px] text-center py-3",
                style: { color: "var(--neutral-400)" },
                children: "No items"
              }
            ),
            hiddenCount > 0 && /* @__PURE__ */ jsxs32(
              "p",
              {
                className: "text-[10px] text-center py-1 font-medium",
                style: { color: "var(--brand-primary)" },
                children: [
                  "+",
                  hiddenCount,
                  " more"
                ]
              }
            )
          ] })
        ]
      },
      col.id
    );
  }) });
}

// src/components/conversion-score/ConversionScore.tsx
import * as React20 from "react";
import { jsx as jsx44, jsxs as jsxs33 } from "react/jsx-runtime";
var gradients = {
  hot: ["#E8915A", "#D9534F"],
  warm: ["#E8915A", "#D4A84B"],
  cold: ["#7BAFD4", "#5B8DB8"]
};
var temperatureColors = {
  hot: "#D9534F",
  warm: "#D4A84B",
  cold: "#5B8DB8"
};
var temperatureBadgeVariant = {
  hot: "hot",
  warm: "warming",
  cold: "cold"
};
var RING_SIZE = 96;
var STROKE_WIDTH = 6;
var RADIUS = (RING_SIZE - STROKE_WIDTH) / 2;
var CIRCUMFERENCE = 2 * Math.PI * RADIUS;
function ConversionScore({
  score,
  temperature,
  trend,
  label = "Conversion Score",
  className,
  ...props
}) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const offset = CIRCUMFERENCE - clampedScore / 100 * CIRCUMFERENCE;
  const [start, end] = gradients[temperature];
  const gradientId = React20.useId();
  return /* @__PURE__ */ jsxs33(Card, { className: cn("inline-flex flex-col items-center gap-3", className), ...props, children: [
    /* @__PURE__ */ jsxs33("div", { className: "relative", style: { width: RING_SIZE, height: RING_SIZE }, children: [
      /* @__PURE__ */ jsxs33("svg", { width: RING_SIZE, height: RING_SIZE, viewBox: `0 0 ${RING_SIZE} ${RING_SIZE}`, children: [
        /* @__PURE__ */ jsx44("defs", { children: /* @__PURE__ */ jsxs33("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsx44("stop", { offset: "0%", stopColor: start }),
          /* @__PURE__ */ jsx44("stop", { offset: "100%", stopColor: end })
        ] }) }),
        /* @__PURE__ */ jsx44(
          "circle",
          {
            cx: RING_SIZE / 2,
            cy: RING_SIZE / 2,
            r: RADIUS,
            fill: "none",
            stroke: "var(--neutral-100)",
            strokeWidth: STROKE_WIDTH
          }
        ),
        /* @__PURE__ */ jsx44(
          "circle",
          {
            cx: RING_SIZE / 2,
            cy: RING_SIZE / 2,
            r: RADIUS,
            fill: "none",
            stroke: `url(#${gradientId})`,
            strokeWidth: STROKE_WIDTH,
            strokeLinecap: "round",
            strokeDasharray: CIRCUMFERENCE,
            strokeDashoffset: offset,
            transform: `rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`,
            className: "transition-all duration-500 ease-out"
          }
        )
      ] }),
      /* @__PURE__ */ jsx44("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx44(
        "span",
        {
          className: "text-2xl font-bold",
          style: { fontFamily: "var(--font-stat)", color: temperatureColors[temperature] },
          children: clampedScore
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx44("p", { className: "text-xs text-[var(--neutral-500)]", children: label }),
    /* @__PURE__ */ jsx44(Badge, { variant: temperatureBadgeVariant[temperature], size: "sm", dot: true, children: temperature.charAt(0).toUpperCase() + temperature.slice(1) }),
    trend && /* @__PURE__ */ jsxs33("div", { className: "flex items-center gap-1 text-xs text-[var(--neutral-500)]", children: [
      /* @__PURE__ */ jsx44(
        "svg",
        {
          width: "12",
          height: "12",
          viewBox: "0 0 12 12",
          fill: "none",
          className: cn(
            trend.direction === "up" ? "text-[var(--success)]" : "text-[var(--error)]",
            trend.direction === "down" && "rotate-180"
          ),
          children: /* @__PURE__ */ jsx44(
            "path",
            {
              d: "M6 2.5V9.5M6 2.5L3 5.5M6 2.5L9 5.5",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      ),
      /* @__PURE__ */ jsx44("span", { children: trend.value })
    ] })
  ] });
}

// src/components/decision-explanation-card/DecisionExplanationCard.tsx
import * as React21 from "react";
import { jsx as jsx45, jsxs as jsxs34 } from "react/jsx-runtime";
var factorGradients = {
  hot: ["#E8915A", "#D9534F"],
  qualified: ["#D4A84B", "#E8915A"],
  engaged: ["#C4B84B", "#D4A84B"],
  warming: ["#7BB5C8", "#6A9FB5"],
  cold: ["#7BAFD4", "#5B8DB8"],
  success: ["#7BB59A", "#6B9080"]
};
function FactorBar({ label, weight, variant = "hot" }) {
  const gradientId = React21.useId();
  const [start, end] = factorGradients[variant];
  const clampedWeight = Math.max(0, Math.min(100, weight));
  return /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsx45("span", { className: "text-xs text-[var(--neutral-600)] w-24 shrink-0 truncate", children: label }),
    /* @__PURE__ */ jsx45("div", { className: "relative flex-1 h-2 rounded-full bg-[var(--neutral-100)] overflow-hidden", children: /* @__PURE__ */ jsxs34("svg", { className: "absolute inset-0 w-full h-full", preserveAspectRatio: "none", children: [
      /* @__PURE__ */ jsx45("defs", { children: /* @__PURE__ */ jsxs34("linearGradient", { id: gradientId, x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        /* @__PURE__ */ jsx45("stop", { offset: "0%", stopColor: start }),
        /* @__PURE__ */ jsx45("stop", { offset: "100%", stopColor: end })
      ] }) }),
      /* @__PURE__ */ jsx45(
        "rect",
        {
          x: "0",
          y: "0",
          width: `${clampedWeight}%`,
          height: "100%",
          rx: "4",
          fill: `url(#${gradientId})`,
          className: "transition-all duration-300 ease-out"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs34("span", { className: "text-xs font-medium text-[var(--neutral-500)] w-8 text-right shrink-0", children: [
      clampedWeight,
      "%"
    ] })
  ] });
}
function DecisionExplanationCard({
  title,
  subtitle,
  explanation,
  factors,
  confidence,
  illustration,
  showMiloBadge = true,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxs34(Card, { className: cn("flex flex-col gap-4", className), ...props, children: [
    /* @__PURE__ */ jsxs34("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxs34("div", { className: "flex flex-col gap-1.5 min-w-0", children: [
        /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx45("h3", { className: "text-lg font-semibold leading-none text-[var(--foreground)] truncate", children: title }),
          showMiloBadge && /* @__PURE__ */ jsx45(Badge, { variant: "primary", size: "xs", children: "Milo" })
        ] }),
        subtitle && /* @__PURE__ */ jsx45("p", { className: "text-sm text-[var(--neutral-500)]", children: subtitle })
      ] }),
      illustration && /* @__PURE__ */ jsx45("div", { className: "shrink-0 ml-4", children: illustration })
    ] }),
    /* @__PURE__ */ jsx45("p", { className: "text-sm text-[var(--neutral-700)]", style: { fontFamily: "var(--font-body)" }, children: explanation }),
    factors.length > 0 && /* @__PURE__ */ jsx45("div", { className: "flex flex-col gap-2.5", children: factors.map((factor) => /* @__PURE__ */ jsx45(FactorBar, { ...factor }, factor.label)) }),
    confidence && /* @__PURE__ */ jsxs34("div", { className: "flex items-center justify-between pt-4 border-t border-[var(--card-border)]", children: [
      /* @__PURE__ */ jsx45("span", { className: "text-xs text-[var(--neutral-500)]", children: "Confidence" }),
      /* @__PURE__ */ jsxs34("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx45("span", { className: "text-xs font-medium text-[var(--neutral-700)]", children: confidence.level }),
        /* @__PURE__ */ jsxs34("span", { className: "text-xs text-[var(--neutral-400)]", children: [
          (confidence.score * 100).toFixed(0),
          "%"
        ] })
      ] })
    ] })
  ] });
}

// src/components/behavioral-tag/BehavioralTag.tsx
import { jsx as jsx46, jsxs as jsxs35 } from "react/jsx-runtime";
function BehavioralTag({ onRemove, children, className, ...badgeProps }) {
  return /* @__PURE__ */ jsxs35(Badge, { className: cn(onRemove && "pr-1", className), ...badgeProps, children: [
    children,
    onRemove && /* @__PURE__ */ jsx46(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.stopPropagation();
          onRemove();
        },
        className: "inline-flex items-center justify-center size-3.5 rounded-full hover:bg-[rgba(0,0,0,0.12)] transition-colors duration-150",
        style: { backgroundColor: "rgba(0,0,0,0.08)" },
        "aria-label": "Remove",
        children: /* @__PURE__ */ jsx46("svg", { width: "8", height: "8", viewBox: "0 0 8 8", fill: "none", children: /* @__PURE__ */ jsx46(
          "path",
          {
            d: "M1.5 1.5L6.5 6.5M6.5 1.5L1.5 6.5",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }
        ) })
      }
    )
  ] });
}

// src/components/was-this-helpful/WasThisHelpful.tsx
import * as React22 from "react";
import { jsx as jsx47, jsxs as jsxs36 } from "react/jsx-runtime";
function ThumbsUpIcon({ className }) {
  return /* @__PURE__ */ jsxs36("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", strokeWidth: "1.5", className, children: [
    /* @__PURE__ */ jsx47(
      "path",
      {
        d: "M16.472 20H4.1a.6.6 0 0 1-.6-.6V9.6a.6.6 0 0 1 .6-.6h2.768a2 2 0 0 0 1.715-.971l2.71-4.517a1.631 1.631 0 0 1 2.961.974v3.014a.6.6 0 0 0 .6.6h3.404c1.263 0 2.164 1.222 1.771 2.402l-1.904 5.711c-.26.782-.985 1.308-1.803 1.308Z",
        stroke: "currentColor",
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsx47("path", { d: "M7 20V9", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function ThumbsDownIcon({ className }) {
  return /* @__PURE__ */ jsxs36("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", strokeWidth: "1.5", className, children: [
    /* @__PURE__ */ jsx47(
      "path",
      {
        d: "M7.528 4H19.9a.6.6 0 0 1 .6.6v9.8a.6.6 0 0 1-.6.6h-2.768a2 2 0 0 0-1.715.971l-2.71 4.517a1.631 1.631 0 0 1-2.961-.974v-3.014a.6.6 0 0 0-.6-.6H5.742c-1.263 0-2.164-1.222-1.771-2.402l1.904-5.711C6.135 6.005 6.86 5.479 7.678 5.479",
        stroke: "currentColor",
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsx47("path", { d: "M17 4v11", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}
function CheckIcon() {
  return /* @__PURE__ */ jsx47("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", strokeWidth: "2", children: /* @__PURE__ */ jsx47("path", { d: "M5 13l4 4L19 7", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" }) });
}
function WasThisHelpful({
  onFeedback,
  label = "Was this helpful?",
  variant = "default",
  className,
  ...props
}) {
  const [state, setState] = React22.useState("idle");
  const handleFeedback = (helpful) => {
    setState(helpful ? "selected-yes" : "selected-no");
    onFeedback(helpful);
    setTimeout(() => setState("thanked"), 1200);
  };
  const isCompact = variant === "compact";
  if (state === "thanked") {
    return /* @__PURE__ */ jsxs36(
      "div",
      {
        className: cn(
          "flex items-center gap-1.5 text-[var(--success)]",
          variant === "inline" && "border-t border-[var(--card-border)] mt-4 pt-3",
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsx47(CheckIcon, {}),
          /* @__PURE__ */ jsx47("span", { className: "text-sm font-medium", children: "Thanks for your feedback!" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxs36(
    "div",
    {
      className: cn(
        "flex items-center gap-2",
        variant === "inline" && "border-t border-[var(--card-border)] mt-4 pt-3",
        className
      ),
      ...props,
      children: [
        !isCompact && /* @__PURE__ */ jsx47("span", { className: "text-sm text-[var(--neutral-500)] mr-1", children: label }),
        /* @__PURE__ */ jsxs36(
          "button",
          {
            type: "button",
            onClick: () => handleFeedback(true),
            disabled: state !== "idle",
            className: cn(
              "inline-flex items-center justify-center gap-1.5 rounded-md border text-sm font-medium transition-all duration-200",
              isCompact ? "size-8" : "h-8 px-3",
              state === "idle" && "border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]",
              state === "selected-yes" && "bg-[var(--success-light)] border-[var(--success)] text-[var(--success)]",
              state === "selected-no" && "opacity-[0.35] border-[var(--neutral-200)] bg-white text-[var(--neutral-700)]"
            ),
            "aria-label": isCompact ? "Helpful" : void 0,
            children: [
              /* @__PURE__ */ jsx47(ThumbsUpIcon, {}),
              !isCompact && "Yes"
            ]
          }
        ),
        /* @__PURE__ */ jsxs36(
          "button",
          {
            type: "button",
            onClick: () => handleFeedback(false),
            disabled: state !== "idle",
            className: cn(
              "inline-flex items-center justify-center gap-1.5 rounded-md border text-sm font-medium transition-all duration-200",
              isCompact ? "size-8" : "h-8 px-3",
              state === "idle" && "border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]",
              state === "selected-no" && "bg-[var(--error-light)] border-[var(--error)] text-[var(--error)]",
              state === "selected-yes" && "opacity-[0.35] border-[var(--neutral-200)] bg-white text-[var(--neutral-700)]"
            ),
            "aria-label": isCompact ? "Not helpful" : void 0,
            children: [
              /* @__PURE__ */ jsx47(ThumbsDownIcon, {}),
              !isCompact && "No"
            ]
          }
        )
      ]
    }
  );
}
export {
  APP_ICONS,
  APP_ILLUSTRATIONS,
  AccountabilityTrackerIcon,
  AppCard,
  AppCardIllustration,
  AppHeader,
  AppHeaderAction,
  AppHeaderDivider,
  AppShell,
  AtlasIcon,
  AudioPlayerCard,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  BehavioralTag,
  BudgetIcon,
  Button,
  ButtonSpinner,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardIllustration,
  CardLoader,
  CardTitle,
  CategorySection,
  CelebrationIcon,
  Checkbox,
  ConcentricCircles,
  ConversionScore,
  CreditScoreIcon,
  CrossHatch,
  DASHBOARD_ICONS,
  DASHBOARD_ILLUSTRATIONS,
  DailyExerciseIcon,
  DashboardCardIllustration,
  DashboardShell,
  DawnIcon,
  DecisionExplanationCard,
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
  DownPaymentIcon,
  DragHint,
  DreamHomeIcon,
  DrumbeatIcon,
  DtiIcon,
  EmptyState,
  HarvestHomeIcon,
  HeroActionCard,
  HomeReadyIcon,
  HomeStretchIcon,
  InlineLoading,
  Input,
  Label2 as Label,
  LeadCaptureFormsIcon,
  LoadingOverlay,
  MarketIntelIcon,
  MiniKanban,
  MortgageTermsIcon,
  NeighborhoodIcon,
  NewsRow,
  NewsletterStudioIcon,
  OpenHouseHubIcon,
  OrbitalRings,
  OvenIcon,
  PATTERNS,
  PageContainer,
  PageLoader,
  Pagination,
  PipelineThermometer,
  PreApprovalIcon,
  Progress,
  PulseIcon,
  RadialBurst,
  STAGES,
  STAGE_COLORS,
  STAGE_LABELS,
  SavingsIcon,
  SegmentedProgress,
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
  SelfPacedIcon,
  SignalIcon,
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
  StreakIcon,
  SurveyStepCard,
  TRACK_ICONS,
  TRACK_ILLUSTRATIONS,
  Table,
  Textarea,
  TimelineIcon,
  Toast,
  ToastProvider,
  TodaySchedule,
  TrackCardIllustration,
  WasThisHelpful,
  WeeklyChallengeIcon,
  badgeVariants,
  buttonVariants,
  cn,
  useToast
};
//# sourceMappingURL=index.js.map