"use client";

import * as React from "react";
import { Input, type InputProps } from "../input/Input";
import { cn } from "../../lib/cn";
import { formatCurrencyDisplay, parseDecimal, sanitizeDecimal } from "../../lib/formatted-input";
import { FORMATTED_FIELD_CLASS, useFieldId, useFormattedField } from "../formatted-input/useFormattedField";

export interface CurrencyInputProps extends Omit<InputProps, "value" | "defaultValue" | "type"> {
  /** Dollars; `null` = empty. Omit for an uncontrolled field. */
  value?: number | null;
  defaultValue?: number | null;
  /** Fires on every change: dollars (never negative, never NaN), `null` when empty. */
  onValueChange?: (dollars: number | null) => void;
  /** Allow cents (two decimals). Default true; false = whole dollars. */
  cents?: boolean;
}

const DIGIT_OR_POINT = (c: string) => /[\d.]/.test(c);

/** `1234.5` → "1234.5"; never exponent notation for the amounts this field holds. */
function dollarsToPlain(v: number, cents: boolean): string {
  if (!Number.isFinite(v) || v < 0) return "";
  const fixed = v.toFixed(cents ? 2 : 0);
  return cents ? fixed.replace(/\.?0+$/, "") : fixed;
}

/**
 * US dollar amount, grouped as you type: `$1,234.56`. Digits and one point only
 * (a minus sign is dropped: amounts here are never negative); at most two
 * decimals, or none with `cents={false}`. Emits a number or `null`. Label via
 * `label` or `aria-label`; 44 px tall; decimal keypad.
 */
const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ value, defaultValue, onValueChange, onChange, onBlur, className, id, cents = true, ...props }, ref) => {
    const decimals = cents ? 2 : 0;
    const field = useFormattedField<number>(
      {
        format: (raw) => formatCurrencyDisplay(sanitizeDecimal(raw, decimals)),
        parse: (shown) => parseDecimal(sanitizeDecimal(shown, decimals)),
        toDisplay: (v) => (v === null ? "" : formatCurrencyDisplay(dollarsToPlain(v, cents))),
        isSignificant: DIGIT_OR_POINT,
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
        type="text"
        inputMode="decimal"
        value={field.shown}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className={cn(FORMATTED_FIELD_CLASS, className)}
      />
    );
  },
);
CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
