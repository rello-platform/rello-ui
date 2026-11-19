"use client";

import * as React from "react";
import { cn } from "../../lib/cn";

export type PreviewFrameMode = "sample" | "greyed";

export interface PreviewFrameProps {
  children: React.ReactNode;
  /**
   * "sample" (default): a sample-data preview of a locked page. It stays explorable (tabs, expanders and links work),
   * but its form controls are read-only, and trying to change one shows `blockedHint`.
   * "greyed": a dimmed, non-interactive picture (no names or numbers). Its content is hidden from assistive tech
   * and cannot take focus; the banner above it is the accessible text.
   */
  mode?: PreviewFrameMode;
  /** "sample" only: a small label over the preview (e.g. that the data is a sample). The frame is described by it. */
  sampleLabel?: string;
  /** "sample" only: the line shown when a viewer tries to change a value. */
  blockedHint?: string;
  /** "sample" only: called whenever a change is blocked, with the control the viewer tried to change. */
  onBlockedInteract?: (target: HTMLElement) => void;
  className?: string;
}

/** How long the blocked hint stays up. */
export const PREVIEW_BLOCKED_HINT_MS = 2600;

const TEXT_LIKE = new Set(["", "text", "search", "email", "url", "tel", "password", "number"]);
const NOT_A_VALUE = new Set(["button", "submit", "reset", "image", "hidden"]);
const FOCUSABLE = 'a[href], area[href], button, input, select, textarea, iframe, summary, [tabindex], [contenteditable=""], [contenteditable="true"]';

/** A control whose value a viewer could change. Buttons (tabs, expanders) are not. */
function valueControl(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null;
  if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return target;
  if (target instanceof HTMLInputElement) return NOT_A_VALUE.has(target.type) ? null : target;
  if (target.isContentEditable) return target;
  return null;
}
const isTextLike = (el: HTMLElement) =>
  el instanceof HTMLTextAreaElement || (el instanceof HTMLInputElement && TEXT_LIKE.has(el.type)) || el.isContentEditable;

/** Keys that only move around (never change a value) inside a text-like control. */
const NAV_KEYS = new Set(["Tab", "Shift", "Escape", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", "Alt", "Control", "Meta", "CapsLock"]);

/** Every value control under `root` read-only (and announced as such). Text-like ones keep focus and selection. */
function markReadOnly(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("input, textarea, select").forEach((el) => {
    if (el instanceof HTMLInputElement && NOT_A_VALUE.has(el.type)) return;
    if ((el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && !el.readOnly) el.readOnly = true;
    el.setAttribute("aria-readonly", "true");
  });
}

const PREV_TABINDEX = "data-preview-prev-tabindex";

/** Take every focusable element under `root` out of the tab order, remembering what it had. */
function unfocusable(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(FOCUSABLE).forEach((el) => {
    if (!el.hasAttribute(PREV_TABINDEX)) el.setAttribute(PREV_TABINDEX, el.getAttribute("tabindex") ?? "");
    el.setAttribute("tabindex", "-1");
  });
}

/** Undo `unfocusable` (the frame left "greyed"). */
function restoreFocusable(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>(`[${PREV_TABINDEX}]`).forEach((el) => {
    const prev = el.getAttribute(PREV_TABINDEX);
    if (prev === null || prev === "") el.removeAttribute("tabindex");
    else el.setAttribute("tabindex", prev);
    el.removeAttribute(PREV_TABINDEX);
  });
}

/**
 * Wraps a preview under a locked-feature banner (PFP GATEWAY D60 / K-747; Rello Home Insight uses "greyed").
 * Carries no words of its own: every string is a prop.
 */
function PreviewFrame({ children, mode = "sample", sampleLabel, blockedHint, onBlockedInteract, className }: PreviewFrameProps) {
  const labelId = React.useId();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [hintOn, setHintOn] = React.useState(false);
  const hintTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const onBlockedRef = React.useRef(onBlockedInteract);
  onBlockedRef.current = onBlockedInteract;

  // Keep controls read-only (sample) or out of reach (greyed), including content a tab switch renders later.
  React.useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const greyed = mode === "greyed";
    const apply = greyed ? () => unfocusable(root) : () => markReadOnly(root);
    if (greyed) root.setAttribute("inert", "");
    apply();
    const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(apply);
    observer?.observe(root, { childList: true, subtree: true });
    return () => {
      observer?.disconnect();
      if (greyed) {
        root.removeAttribute("inert");
        restoreFocusable(root);
      }
    };
  }, [mode]);

  React.useEffect(
    () => () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
    },
    [],
  );

  const block = (event: React.SyntheticEvent, target: HTMLElement) => {
    event.preventDefault();
    if (blockedHint) {
      setHintOn(true);
      if (hintTimer.current) clearTimeout(hintTimer.current);
      hintTimer.current = setTimeout(() => {
        hintTimer.current = null;
        setHintOn(false);
      }, PREVIEW_BLOCKED_HINT_MS);
    }
    try {
      onBlockedRef.current?.(target);
    } catch (err) {
      console.error("[PreviewFrame] onBlockedInteract threw", err);
    }
  };

  if (mode === "greyed") {
    return (
      <div data-mode="greyed" className={cn("relative w-full min-w-0 overflow-hidden", className)}>
        <div
          ref={contentRef}
          aria-hidden="true"
          className="pointer-events-none select-none"
          style={{ opacity: 0.45, filter: "grayscale(1)" }}
        >
          {children}
        </div>
      </div>
    );
  }

  const keyDown = (event: React.KeyboardEvent) => {
    const el = valueControl(event.target);
    if (!el || event.metaKey || event.ctrlKey) return; // copy / select-all stay
    if (isTextLike(el) && NAV_KEYS.has(event.key)) return;
    if (!isTextLike(el) && (event.key === "Tab" || event.key === "Shift" || event.key === "Escape")) return;
    block(event, el);
  };
  const editAttempt = (event: React.SyntheticEvent) => {
    const el = valueControl(event.target);
    if (el) block(event, el);
  };
  // Select / checkbox / radio / range etc. change on a pointer press: stop it there. Text fields keep their caret.
  const pointerAttempt = (event: React.SyntheticEvent) => {
    const el = valueControl(event.target);
    if (el && !isTextLike(el)) block(event, el);
  };

  return (
    <div
      role="group"
      data-mode="sample"
      aria-describedby={sampleLabel ? labelId : undefined}
      className={cn("relative w-full min-w-0", className)}
    >
      {sampleLabel ? (
        <p
          id={labelId}
          className="m-0 mb-2 text-[11px] font-bold uppercase tracking-widest"
          style={{ color: "var(--neutral-500, #646F77)" }}
        >
          {sampleLabel}
        </p>
      ) : null}
      <div
        ref={contentRef}
        className="min-w-0"
        onKeyDownCapture={keyDown}
        onBeforeInputCapture={editAttempt}
        onPasteCapture={editAttempt}
        onCutCapture={editAttempt}
        onDropCapture={editAttempt}
        onMouseDownCapture={pointerAttempt}
        onClickCapture={pointerAttempt}
        onSubmitCapture={(event) => block(event, event.target as HTMLElement)}
      >
        {children}
      </div>
      <p
        role="status"
        aria-live="polite"
        className={cn("m-0 mt-2 text-sm", hintOn && blockedHint ? "" : "sr-only")}
        style={{ color: "var(--neutral-700, #434B52)" }}
      >
        {hintOn && blockedHint ? blockedHint : ""}
      </p>
    </div>
  );
}

export { PreviewFrame };
