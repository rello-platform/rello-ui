"use client";

import * as React from "react";
import { Input, type InputProps } from "../input/Input";
import { cn } from "../../lib/cn";
import { normalizeEmail } from "../../lib/formatted-input";
import { FORMATTED_FIELD_CLASS, useFieldId, useFormattedField } from "../formatted-input/useFormattedField";

export interface EmailInputProps extends Omit<InputProps, "value" | "defaultValue" | "type"> {
  value?: string | null;
  defaultValue?: string | null;
  /** Fires on every change: the trimmed, lowercased address, `null` when empty. */
  onValueChange?: (email: string | null) => void;
}

const NOT_SPACE = (c: string) => !/\s/.test(c);

/**
 * Email address, lowercased as you type; spaces are dropped (an address has
 * none). Emits the normalized address or `null`. It does not judge whether the
 * address exists; the spoke does. Label via `label` or `aria-label`; 44 px tall.
 */
const EmailInput = React.forwardRef<HTMLInputElement, EmailInputProps>(
  ({ value, defaultValue, onValueChange, onChange, onBlur, className, id, ...props }, ref) => {
    const field = useFormattedField<string>(
      {
        format: (raw) => raw.replace(/\s/g, "").toLowerCase(),
        parse: (shown) => normalizeEmail(shown) || null,
        toDisplay: (v) => normalizeEmail(v ?? ""),
        isSignificant: NOT_SPACE,
        formatOnBlur: normalizeEmail,
        value,
        defaultValue,
        onValueChange,
        onChange,
        onBlur,
      },
      ref,
    );
    return (
      <Input
        {...props}
        id={useFieldId(id)}
        ref={field.ref}
        type="email"
        inputMode="email"
        autoComplete={props.autoComplete ?? "email"}
        autoCapitalize="none"
        spellCheck={false}
        value={field.shown}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className={cn(FORMATTED_FIELD_CLASS, className)}
      />
    );
  },
);
EmailInput.displayName = "EmailInput";

export { EmailInput };
