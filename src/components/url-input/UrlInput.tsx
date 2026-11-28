"use client";

import * as React from "react";
import { Input, type InputProps } from "../input/Input";
import { cn } from "../../lib/cn";
import { normalizeUrl } from "../../lib/formatted-input";
import { FORMATTED_FIELD_CLASS, useFieldId, useFormattedField } from "../formatted-input/useFormattedField";

export interface UrlInputProps extends Omit<InputProps, "value" | "defaultValue" | "type"> {
  value?: string | null;
  defaultValue?: string | null;
  /** Fires on every change: the URL with a scheme (`https://` added when none), `null` when empty. */
  onValueChange?: (url: string | null) => void;
}

const NOT_SPACE = (c: string) => !/\s/.test(c);

/**
 * Web address. Spaces are dropped as you type; on blur `https://` is added when
 * no scheme was typed (an `http://` the person typed is kept). Emits the URL or
 * `null`. Label via `label` or `aria-label`; 44 px tall.
 */
const UrlInput = React.forwardRef<HTMLInputElement, UrlInputProps>(
  ({ value, defaultValue, onValueChange, onChange, onBlur, className, id, ...props }, ref) => {
    const field = useFormattedField<string>(
      {
        format: (raw) => raw.replace(/\s/g, ""),
        parse: (shown) => normalizeUrl(shown) || null,
        toDisplay: (v) => v ?? "",
        isSignificant: NOT_SPACE,
        formatOnBlur: normalizeUrl,
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
        type="url"
        inputMode="url"
        autoComplete={props.autoComplete ?? "url"}
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
UrlInput.displayName = "UrlInput";

export { UrlInput };
