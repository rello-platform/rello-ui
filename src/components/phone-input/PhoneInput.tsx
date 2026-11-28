"use client";

import * as React from "react";
import { Input, type InputProps } from "../input/Input";
import { cn } from "../../lib/cn";
import { formatUsPhone, usPhoneToE164 } from "../../lib/formatted-input";
import { FORMATTED_FIELD_CLASS, useFieldId, useFormattedField } from "../formatted-input/useFormattedField";

export interface PhoneInputProps extends Omit<InputProps, "value" | "defaultValue" | "type"> {
  /** E.164 (`+18015550123`) or any US digits; `null` = empty. Omit for an uncontrolled field. */
  value?: string | null;
  defaultValue?: string | null;
  /** Fires on every change: E.164 for a complete US number, `null` otherwise. */
  onValueChange?: (e164: string | null) => void;
}

/**
 * US phone number, formatted as you type: `(801) 555-0123`. Letters and symbols
 * are dropped (typed or pasted); a leading country code 1 is accepted. Emits
 * E.164. Label via `label` or `aria-label`; 44 px tall; numeric phone keypad.
 */
const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, defaultValue, onValueChange, onChange, onBlur, className, id, ...props }, ref) => {
    const field = useFormattedField<string>(
      {
        format: formatUsPhone,
        parse: usPhoneToE164,
        toDisplay: (v) => formatUsPhone(v ?? ""),
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
        type="tel"
        inputMode="tel"
        autoComplete={props.autoComplete ?? "tel-national"}
        value={field.shown}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className={cn(FORMATTED_FIELD_CLASS, className)}
      />
    );
  },
);
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
