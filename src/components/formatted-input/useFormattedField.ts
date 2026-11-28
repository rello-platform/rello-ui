"use client";

import * as React from "react";
import { caretAfterFormat } from "../../lib/formatted-input";

/**
 * Shared state for the as-you-type inputs (HI-05). Internal: not exported from
 * the package. Each field supplies three pure rules:
 *   - `format(raw)`: what the box shows after any keystroke or paste;
 *   - `parse(shown)`: the value the consumer receives (`null` when there is none);
 *   - `toDisplay(value)`: what the box shows for a value the consumer passed in.
 *
 * The caret stays after the same significant character it followed before the
 * re-format, so inserting a separator or dropping a letter never throws the
 * cursor to the end. Deleting a separator deletes the significant character in
 * front of it, so Backspace never sticks on a ")" or a "/".
 */
export interface FormattedFieldRules<V> {
  format: (raw: string) => string;
  parse: (shown: string) => V | null;
  toDisplay: (value: V | null) => string;
  isSignificant?: (c: string) => boolean;
}

export interface FormattedFieldOptions<V> extends FormattedFieldRules<V> {
  /** Controlled value. `undefined` = uncontrolled; `null` = an empty field. */
  value?: V | null;
  defaultValue?: V | null;
  onValueChange?: (value: V | null) => void;
  /** The consumer's own onChange / onBlur still run (after ours). */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  /** Optional re-format on blur (e.g. adding https://). */
  formatOnBlur?: (shown: string) => string;
}

const DIGIT = (c: string) => /\d/.test(c);

export function useFormattedField<V>(opts: FormattedFieldOptions<V>, forwardedRef: React.ForwardedRef<HTMLInputElement>) {
  const { format, parse, toDisplay, value, defaultValue, onValueChange, onChange, onBlur, formatOnBlur } = opts;
  const isSignificant = opts.isSignificant ?? DIGIT;

  const [shown, setShown] = React.useState<string>(() =>
    value !== undefined ? toDisplay(value) : defaultValue !== undefined ? toDisplay(defaultValue) : "",
  );
  const [blurred, setBlurred] = React.useState(false);
  const innerRef = React.useRef<HTMLInputElement | null>(null);
  const pendingCaret = React.useRef<number | null>(null);
  // The last value we emitted, so a controlled `value` that merely echoes it
  // does not re-format the box under the person's cursor.
  const lastEmitted = React.useRef<V | null | undefined>(value);

  const setRefs = React.useCallback(
    (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === "function") forwardedRef(node);
      else if (forwardedRef) forwardedRef.current = node;
    },
    [forwardedRef],
  );

  React.useEffect(() => {
    if (value === undefined) return;
    if (Object.is(value, lastEmitted.current)) return;
    lastEmitted.current = value;
    setShown(toDisplay(value));
    // toDisplay is a pure rule supplied per field; this re-runs only on a new value.
  }, [value]);

  React.useLayoutEffect(() => {
    const node = innerRef.current;
    // `selectionStart` is null on input types without a selection API (email):
    // there the browser keeps the caret itself, and setSelectionRange would throw.
    if (node && pendingCaret.current !== null && document.activeElement === node && node.selectionStart !== null) {
      const at = Math.min(pendingCaret.current, node.value.length);
      node.setSelectionRange(at, at);
    }
    pendingCaret.current = null;
  }, [shown]);

  const emit = (next: string) => {
    const parsed = parse(next);
    lastEmitted.current = parsed;
    onValueChange?.(parsed);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    let raw = e.target.value;
    let caret = e.target.selectionStart ?? raw.length;
    const sigCount = (s: string) => [...s].filter(isSignificant).length;
    // A separator was deleted and nothing else changed: delete the significant
    // character before the caret instead.
    if (raw.length < shown.length && sigCount(raw) === sigCount(shown) && caret > 0) {
      let i = caret - 1;
      while (i >= 0 && !isSignificant(raw[i])) i -= 1;
      if (i >= 0) {
        raw = raw.slice(0, i) + raw.slice(i + 1);
        caret = i;
      }
    }
    const next = format(raw);
    pendingCaret.current = caretAfterFormat(raw, caret, next, isSignificant);
    setShown(next);
    setBlurred(false);
    emit(next);
    onChange?.(e);
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    setBlurred(true);
    if (formatOnBlur) {
      const next = formatOnBlur(shown);
      if (next !== shown) {
        setShown(next);
        emit(next);
      }
    }
    onBlur?.(e);
  };

  return { shown, blurred, ref: setRefs, onChange: handleChange, onBlur: handleBlur };
}

/** A stable id for the field: the caller's id, else one React generates. */
export function useFieldId(id: string | undefined): string {
  const generated = React.useId();
  return id ?? `field-${generated.replace(/:/g, "")}`;
}

/** Classes every formatted field adds to `Input`: a 44 px touch target. */
export const FORMATTED_FIELD_CLASS = "h-11 min-h-[44px]";
