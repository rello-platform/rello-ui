"use client";

import * as React from "react";
import { Input, type InputProps } from "../input/Input";
import { cn } from "../../lib/cn";
import { parseDecimal, sanitizeDecimal } from "../../lib/formatted-input";
import { FORMATTED_FIELD_CLASS, useFieldId, useFormattedField } from "../formatted-input/useFormattedField";

export interface PercentInputProps extends Omit<InputProps, "value" | "defaultValue" | "type" | "min" | "max" | "rightIcon"> {
  /** Percent as a number (`7.25` for 7.25%); `null` = empty. Omit for an uncontrolled field. */
  value?: number | null;
  defaultValue?: number | null;
  /** Fires on every change: the number when it is within [min, max], `null` otherwise. */
  onValueChange?: (percent: number | null) => void;
  /** Default 0. */
  min?: number;
  /** Default 100. */
  max?: number;
  /** Decimal places allowed. Default 3 (e.g. 6.875). */
  decimals?: number;
  /** Shown when the number is outside [min, max]. Default "Enter a number from {min} to {max}". */
  rangeMessage?: string;
}

const DIGIT_OR_POINT = (c: string) => /[\d.]/.test(c);

/**
 * Percentage typed as a plain number with a `%` sign beside it. Digits and one
 * point only; emits the number, or `null` when empty or outside [min, max]
 * (which also shows `rangeMessage`; a consumer `error` wins). Label via `label`
 * or `aria-label`; 44 px tall; decimal keypad.
 */
const PercentInput = React.forwardRef<HTMLInputElement, PercentInputProps>(
  (
    { value, defaultValue, onValueChange, onChange, onBlur, className, id, error, min = 0, max = 100, decimals = 3, rangeMessage, ...props },
    ref,
  ) => {
    const inRange = (n: number | null) => n === null || (n >= min && n <= max);
    const field = useFormattedField<number>(
      {
        format: (raw) => sanitizeDecimal(raw, decimals),
        parse: (shown) => {
          const n = parseDecimal(shown);
          return n !== null && inRange(n) ? n : null;
        },
        toDisplay: (v) => (v === null || !Number.isFinite(v) ? "" : String(v)),
        isSignificant: DIGIT_OR_POINT,
        value,
        defaultValue,
        onValueChange,
        onChange,
        onBlur,
      },
      ref,
    );
    const outOfRange = !inRange(parseDecimal(field.shown));
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
        error={error ?? (outOfRange ? (rangeMessage ?? `Enter a number from ${min} to ${max}`) : undefined)}
        rightIcon={
          <span data-percent-sign aria-hidden="true" className="text-sm text-[var(--neutral-500,#646F77)]">
            %
          </span>
        }
        className={cn(FORMATTED_FIELD_CLASS, className)}
      />
    );
  },
);
PercentInput.displayName = "PercentInput";

export { PercentInput };
