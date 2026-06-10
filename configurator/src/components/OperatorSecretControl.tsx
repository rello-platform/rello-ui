import { useEffect, useRef, useState } from "react";
import {
  getOperatorSecret,
  setOperatorSecret,
  clearOperatorSecret,
} from "../lib/operator-secret";

/**
 * Operator-secret control for the Configurator (SECURITY AUDIT PKG-H1).
 *
 * Every write endpoint now requires the operator secret. The operator enters it
 * once per browser session; it is held in sessionStorage (never baked into the
 * bundle) and attached to write requests by `src/lib/api.ts`. This control lets
 * the operator set / clear the secret and shows whether writes are unlocked.
 */
export function OperatorSecretControl() {
  const [hasSecret, setHasSecret] = useState<boolean>(() => Boolean(getOperatorSecret()));
  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  const open = () => {
    setValue("");
    setEditing(true);
  };

  const save = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setOperatorSecret(trimmed);
    setHasSecret(true);
    setValue("");
    setEditing(false);
  };

  const clear = () => {
    clearOperatorSecret();
    setHasSecret(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      save();
    } else if (e.key === "Escape") {
      e.preventDefault();
      setEditing(false);
      setValue("");
    }
  };

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <label htmlFor="operator-secret" className="sr-only">
          Operator secret
        </label>
        <input
          id="operator-secret"
          ref={inputRef}
          type="password"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Operator secret"
          aria-label="Operator secret"
          className="px-2 py-1.5 text-sm rounded-md border border-[var(--neutral-300, #d1d5db)] min-w-[180px] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary, #2563eb)]"
        />
        <button
          type="button"
          onClick={save}
          disabled={!value.trim()}
          className="px-2.5 py-1.5 text-sm rounded-md bg-[var(--brand-primary, #2563eb)] text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed min-h-[36px]"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setEditing(false);
            setValue("");
          }}
          className="px-2.5 py-1.5 text-sm rounded-md border border-[var(--neutral-300, #d1d5db)] text-[var(--neutral-600, #4b5563)] min-h-[36px]"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={hasSecret ? clear : open}
      aria-label={hasSecret ? "Writes unlocked — click to lock" : "Writes locked — click to unlock"}
      title={
        hasSecret
          ? "Operator secret set for this session. Click to clear."
          : "Set the operator secret to enable committing changes."
      }
      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded-md font-medium min-h-[36px] transition-colors ${
        hasSecret
          ? "bg-[var(--success, #16a34a)]/10 text-[var(--success, #16a34a)] hover:bg-[var(--success, #16a34a)]/20"
          : "bg-[var(--warning, #d97706)]/10 text-[var(--warning, #d97706)] hover:bg-[var(--warning, #d97706)]/20"
      }`}
    >
      <span aria-hidden="true">{hasSecret ? "🔓" : "🔒"}</span>
      {hasSecret ? "Writes unlocked" : "Unlock writes"}
    </button>
  );
}
