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

const EDITABLE_HOST = '[contenteditable=""], [contenteditable="true"], [contenteditable="plaintext-only"]';

/** Inside editable content (the property, or the attribute where a DOM doesn't compute the property). */
const isEditable = (el: HTMLElement) => el.isContentEditable === true || el.closest(EDITABLE_HOST) !== null;

/**
 * A control whose value a viewer could change. Buttons (tabs, expanders) are not. An option (a list-box select's
 * press lands on it) stands for its select; anything inside editable content stands for its editing host, so one
 * snapshot and one attempt cover the whole host.
 */
function valueControl(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof HTMLElement)) return null;
  if (target instanceof HTMLOptionElement || target instanceof HTMLOptGroupElement) return target.closest("select");
  if (target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement) return target;
  if (target instanceof HTMLInputElement) return NOT_A_VALUE.has(target.type) ? null : target;
  if (isEditable(target)) return target.closest<HTMLElement>(EDITABLE_HOST) ?? target;
  return null;
}
const isTextLike = (el: HTMLElement) =>
  el instanceof HTMLTextAreaElement || (el instanceof HTMLInputElement && TEXT_LIKE.has(el.type)) || isEditable(el);

/** Keys that only move around (never change a value) inside a text-like control. */
const NAV_KEYS = new Set(["Tab", "Shift", "Escape", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown", "Alt", "Control", "Meta", "CapsLock"]);

/** A modifier pressed on its own. */
const MODIFIER_ONLY = new Set(["Alt", "AltGraph", "Control", "Meta", "Shift", "CapsLock", "Fn", "OS", "Hyper", "Super"]);
/**
 * With Cmd / Ctrl held, keys that edit: delete a word or line, cut, paste, undo, redo, bold / italic / underline,
 * and Enter (which can submit or insert a line). Every other edit a browser makes still arrives as a native
 * `beforeinput`, which the frame refuses whatever its inputType (A-802).
 */
const MODIFIED_EDIT_KEYS = new Set(["Backspace", "Delete", "Enter", "x", "v", "z", "y", "b", "i", "u"]);
/** With Cmd / Ctrl held on a select, checkbox, radio or range: keys that move its value (select-all, arrows, Space). */
const MODIFIED_PICK_KEYS = new Set(["a", " ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End", "PageUp", "PageDown"]);

/**
 * A Cmd / Ctrl combination the frame lets through: copy, select-all and the caret / selection moves in a text-like
 * control, and the browser's own shortcuts (find, reload, zoom). Editing combinations are refused (A-802).
 */
function modifiedKeyAllowed(key: string, textLike: boolean): boolean {
  if (MODIFIER_ONLY.has(key)) return true;
  const k = key.length === 1 ? key.toLowerCase() : key;
  if (MODIFIED_EDIT_KEYS.has(k)) return false;
  return textLike || !MODIFIED_PICK_KEYS.has(k);
}

/** Every value control under `root` read-only (and announced as such). Text-like ones keep focus and selection. */
function markReadOnly(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("input, textarea, select").forEach((el) => {
    if (el instanceof HTMLInputElement && NOT_A_VALUE.has(el.type)) return;
    if ((el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && !el.readOnly) el.readOnly = true;
    el.setAttribute("aria-readonly", "true");
  });
}

/**
 * The nodes under an editing host as they were, by identity (A-802). Putting the same nodes back, rather than
 * rewriting innerHTML, leaves the nodes React rendered in place, so its later renders still find them.
 */
interface NodeSnapshot {
  node: Node;
  data?: string;
  children?: NodeSnapshot[];
}

function snapshotNodes(node: Node): NodeSnapshot {
  if (node instanceof CharacterData) return { node, data: node.data };
  return { node, children: Array.from(node.childNodes, snapshotNodes) };
}

function restoreNodes(snap: NodeSnapshot) {
  const { node } = snap;
  if (snap.data !== undefined) {
    if (node instanceof CharacterData && node.data !== snap.data) node.data = snap.data;
    return;
  }
  const kids = snap.children ?? [];
  const now = node.childNodes;
  if (now.length !== kids.length || kids.some((c, i) => now[i] !== c.node)) {
    (node as Element).replaceChildren(...kids.map((c) => c.node));
  }
  kids.forEach(restoreNodes);
}

/** A value control's state, so a blocked change can be put back (A-797, A-801, A-802). */
type ValueSnapshot =
  /** Each option's `selected`, so a multiple select gets its whole set back, not one index (A-801). */
  | { kind: "select"; selectedIndex: number; selected: boolean[] }
  | { kind: "field"; value: string; checked: boolean }
  /** A contentEditable host's nodes, the fallback for an edit that still lands (A-802). */
  | { kind: "editable"; nodes: NodeSnapshot };

function snapshotOf(el: HTMLElement): ValueSnapshot | null {
  if (el instanceof HTMLSelectElement) {
    return { kind: "select", selectedIndex: el.selectedIndex, selected: Array.from(el.options, (o) => o.selected) };
  }
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    return { kind: "field", value: el.value, checked: el instanceof HTMLInputElement ? el.checked : false };
  }
  if (isEditable(el)) return { kind: "editable", nodes: snapshotNodes(el) };
  return null;
}

function restoreSnapshot(el: HTMLElement, snap: ValueSnapshot) {
  if (snap.kind === "select") {
    if (!(el instanceof HTMLSelectElement)) return;
    if (!el.multiple) {
      if (el.selectedIndex !== snap.selectedIndex) el.selectedIndex = snap.selectedIndex;
      return;
    }
    // Every option back as it was (an option the sample added since is left unselected).
    Array.from(el.options).forEach((o, i) => {
      const want = snap.selected[i] === true;
      if (o.selected !== want) o.selected = want;
    });
    return;
  }
  if (snap.kind === "editable") {
    restoreNodes(snap.nodes);
    return;
  }
  if (el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio")) {
    if (el.checked !== snap.checked) el.checked = snap.checked;
    return;
  }
  if ((el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) && el.value !== snap.value) el.value = snap.value;
}

/** The radios sharing `el`'s group (same name, same form owner) under `root`. */
function radioGroup(root: HTMLElement, el: HTMLInputElement): HTMLInputElement[] {
  if (!el.name) return [el];
  return Array.from(root.querySelectorAll<HTMLInputElement>('input[type="radio"]')).filter((r) => r.name === el.name && r.form === el.form);
}

/**
 * One attempt is one gesture, grouped by its phases and never by a time window (A-803): a press (mousedown) and
 * its click, however long the press; one key and its beforeinput / input / change; a paste, cut or drop and what
 * follows it; an input and its change. A new press, key, paste, cut, drop, submit or reset always starts a new
 * attempt (a held key's auto-repeats excepted), and any press or key in the frame, refused or not, closes the one in
 * progress, so two quick clicks are two attempts.
 */
const STARTS_ATTEMPT = new Set(["mousedown", "keydown", "paste", "cut", "drop", "submit", "reset"]);
const PHASE_RANK: Record<string, number> = { click: 1, beforeinput: 2, input: 3, change: 4 };

interface Attempt {
  target: HTMLElement;
  phases: Set<string>;
  /** The latest phase seen (0: only what started it). */
  rank: number;
}

/** Whether a blocked event of `type` on `target` is a later phase of `attempt`. */
function continuesAttempt(attempt: Attempt | null, type: string, target: HTMLElement, repeat: boolean): boolean {
  if (!attempt || attempt.target !== target) return false;
  if (type === "keydown") return repeat && attempt.phases.has("keydown");
  if (STARTS_ATTEMPT.has(type)) return false;
  const rank = PHASE_RANK[type];
  if (rank === undefined) return false;
  // A press's click (a select's press can carry two: open, then pick). A later press anywhere in the frame has
  // already closed this attempt, so a separate click is never folded in.
  if (type === "click") return attempt.phases.has("mousedown");
  // React's polyfilled beforeinput and the native one can both arrive for one key or paste: either belongs to it.
  if (type === "beforeinput") {
    return attempt.rank <= rank && Array.from(attempt.phases).some((p) => STARTS_ATTEMPT.has(p));
  }
  return rank > attempt.rank;
}

/** What `block` needs of an event: a React synthetic one, or the native `beforeinput`. */
interface BlockableEvent {
  type: string;
  preventDefault(): void;
  stopPropagation(): void;
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
  const snapshots = React.useRef(new WeakMap<HTMLElement, ValueSnapshot>());
  const attempt = React.useRef<Attempt | null>(null);
  /** The radio that was checked in a group when it was pressed, and the timer that puts it back after a refusal. */
  const radioBefore = React.useRef<{ group: HTMLInputElement[]; checked: HTMLInputElement | null } | null>(null);
  const radioTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * Refuse one value-changing or submitting event (A-797). preventDefault cancels the browser's default, and
   * stopPropagation keeps the event from every child handler: React dispatches from listeners on its root, and a
   * stop in this capture handler stops the native event there, so React's bubble listener (which runs onChange,
   * onSubmit, onInput, onPaste…) never fires for it. A control whose value moved anyway (a synthetic `input` /
   * `change` such as a test library's selectOptions, or an edit no key check foresaw) is put back from its
   * snapshot, controlled or not. The hint and `onBlockedInteract` fire once per attempt (A-803).
   */
  const block = (event: BlockableEvent, target: HTMLElement) => {
    event.preventDefault();
    event.stopPropagation();
    // Only a change that has already happened is put back: an `input` / `change` that arrives without a press or a
    // key (a canceled click already reverts a checkbox or radio itself, and writing it here too would flip it twice).
    if (event.type === "input" || event.type === "change") {
      const snap = snapshots.current.get(target);
      if (snap) restoreSnapshot(target, snap);
    }
    // A refused radio click: browsers re-check the group's previous radio as they cancel; some DOMs (jsdom) leave the
    // group empty. After the click has finished, put the group back as it was pressed (a no-op where the DOM did).
    if (event.type === "click" && target instanceof HTMLInputElement && target.type === "radio") {
      const before = radioBefore.current;
      if (radioTimer.current) clearTimeout(radioTimer.current);
      radioTimer.current = setTimeout(() => {
        radioTimer.current = null;
        if (!before || !before.group.includes(target)) return;
        for (const r of before.group) {
          const want = r === before.checked;
          if (r.checked !== want) r.checked = want;
        }
      }, 0);
    }
    const repeat = "repeat" in event && (event as { repeat?: unknown }).repeat === true;
    const current = attempt.current;
    if (current && continuesAttempt(current, event.type, target, repeat)) {
      current.phases.add(event.type);
      current.rank = Math.max(current.rank, PHASE_RANK[event.type] ?? 0);
      return;
    }
    attempt.current = { target, phases: new Set([event.type]), rank: PHASE_RANK[event.type] ?? 0 };
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
  const blockRef = React.useRef(block);
  blockRef.current = block;

  // Keep controls read-only (sample) or out of reach (greyed), including content a tab switch renders later.
  React.useEffect(() => {
    const root = contentRef.current;
    if (!root) return;
    const greyed = mode === "greyed";
    const remember = () =>
      root.querySelectorAll<HTMLElement>(`input, textarea, select, ${EDITABLE_HOST}`).forEach((el) => {
        if (snapshots.current.has(el)) return;
        const snap = snapshotOf(el);
        if (snap) snapshots.current.set(el, snap);
      });
    const apply = greyed
      ? () => unfocusable(root)
      : () => {
          markReadOnly(root);
          remember();
        };
    // Every native `beforeinput` on a value control is an edit (whatever its inputType: a Cmd/Ctrl key, the context
    // menu's undo or paste, a spell-check fix). React has no handler for the native event (its onBeforeInput is a
    // polyfill of typed characters), so the frame refuses it here, before it reaches the control (A-802).
    const beforeInput = (event: Event) => {
      const el = valueControl(event.target);
      if (el) blockRef.current(event, el);
    };
    if (greyed) root.setAttribute("inert", "");
    else root.addEventListener("beforeinput", beforeInput, true);
    apply();
    const observer = typeof MutationObserver === "undefined" ? null : new MutationObserver(apply);
    observer?.observe(root, { childList: true, subtree: true });
    return () => {
      observer?.disconnect();
      root.removeEventListener("beforeinput", beforeInput, true);
      if (greyed) {
        root.removeAttribute("inert");
        restoreFocusable(root);
      }
    };
  }, [mode]);

  React.useEffect(
    () => () => {
      if (hintTimer.current) clearTimeout(hintTimer.current);
      if (radioTimer.current) clearTimeout(radioTimer.current);
    },
    [],
  );

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
    if (!event.repeat) attempt.current = null; // a new key is a new gesture (A-803)
    const el = valueControl(event.target);
    if (!el) return;
    if (event.metaKey || event.ctrlKey) {
      // Copy, select-all, caret moves and browser shortcuts stay; editing combinations are refused (A-802).
      if (!modifiedKeyAllowed(event.key, isTextLike(el))) block(event, el);
      return;
    }
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
  // The value a control holds as the viewer reaches it (focus or a press), so a refused change can be put back
  // even when the sample's own data moved it since mount.
  const remember = (event: React.SyntheticEvent) => {
    const el = valueControl(event.target);
    if (!el) return;
    const snap = snapshotOf(el);
    if (snap) snapshots.current.set(el, snap);
    const root = contentRef.current;
    if (root && el instanceof HTMLInputElement && el.type === "radio") {
      const group = radioGroup(root, el);
      radioBefore.current = { group, checked: group.find((r) => r.checked) ?? null };
    }
  };
  const pressAttempt = (event: React.SyntheticEvent) => {
    attempt.current = null; // a new press is a new gesture, wherever it lands (A-803)
    remember(event);
    pointerAttempt(event);
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
        onFocusCapture={remember}
        onPointerDownCapture={remember}
        onKeyDownCapture={keyDown}
        onBeforeInputCapture={editAttempt}
        onInputCapture={editAttempt}
        onChangeCapture={editAttempt}
        onPasteCapture={editAttempt}
        onCutCapture={editAttempt}
        onDropCapture={editAttempt}
        onMouseDownCapture={pressAttempt}
        onClickCapture={pointerAttempt}
        onSubmitCapture={(event) => block(event, event.target as HTMLElement)}
        onResetCapture={(event) => block(event, event.target as HTMLElement)}
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
