"use client";

import * as React from "react";
import { Input, type InputProps } from "../input/Input";
import { cn } from "../../lib/cn";
import { formatDateDigits, isoDateToUs, parseUsDate } from "../../lib/formatted-input";
import { FORMATTED_FIELD_CLASS, useFieldId, useFormattedField } from "../formatted-input/useFormattedField";

export interface DateInputProps extends Omit<InputProps, "value" | "defaultValue" | "type"> {
  /** ISO date (`2026-12-31`); `null` = empty. Omit for an uncontrolled field. */
  value?: string | null;
  defaultValue?: string | null;
  /** Fires on every change: the ISO date for a real calendar date, `null` otherwise. */
  onValueChange?: (isoDate: string | null) => void;
  /** Shown when the date is complete but impossible, or left incomplete. Default "Enter a real date as MM/DD/YYYY". */
  invalidMessage?: string;
}

/**
 * Date typed as `MM/DD/YYYY` (slashes added as you type; letters dropped). Emits
 * an ISO date, or `null` for an impossible or partial date, which also shows
 * `invalidMessage` (at once when all 8 digits are in, otherwise on blur). A
 * consumer `error` always wins. Label via `label` or `aria-label`; 44 px tall.
 */
const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    { value, defaultValue, onValueChange, onChange, onBlur, className, id, error, invalidMessage = "Enter a real date as MM/DD/YYYY", ...props },
    ref,
  ) => {
    const field = useFormattedField<string>(
      { format: formatDateDigits, parse: parseUsDate, toDisplay: isoDateToUs, value, defaultValue, onValueChange, onChange, onBlur },
      ref,
    );
    const complete = field.shown.length === 10;
    const invalid = field.shown !== "" && parseUsDate(field.shown) === null && (complete || field.blurred);
    return (
      <Input
        {...props}
        id={useFieldId(id)}
        ref={field.ref}
        type="text"
        inputMode="numeric"
        placeholder={props.placeholder ?? "MM/DD/YYYY"}
        maxLength={10}
        value={field.shown}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={error ?? (invalid ? invalidMessage : undefined)}
        className={cn(FORMATTED_FIELD_CLASS, className)}
      />
    );
  },
);
DateInput.displayName = "DateInput";

export { DateInput };
