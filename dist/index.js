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
      cold: "bg-[var(--cold-light)] text-[var(--cold)]"
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
export {
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
  Checkbox,
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
  EmptyState,
  InlineLoading,
  Input,
  Label2 as Label,
  LoadingOverlay,
  PageLoader,
  Pagination,
  Progress,
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
  Spinner,
  Table,
  Textarea,
  badgeVariants,
  buttonVariants,
  cn
};
