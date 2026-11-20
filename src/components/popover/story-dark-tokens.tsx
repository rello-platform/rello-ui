import * as React from "react";

/**
 * Story-only helper (not exported from the package): applies an example dark token set to
 * :root while the story is mounted, so portalled content (menus, popovers, Selects) is dark too.
 * The library ships no dark palette; a spoke supplies its own. This only shows that DropdownMenu
 * and Popover take every colour from tokens.
 */
const DARK = `:root{
  --background:#1f2428; --foreground:#f3f4f6; --card-background:#2d3339; --card-border:#4b5563;
  --neutral-50:#1f2428; --neutral-100:#3f474e; --neutral-200:#4b5563; --neutral-300:#646f77;
  --neutral-400:#98a1aa; --neutral-500:#b0b7bf; --neutral-900:#f3f4f6; --brand-primary:#8ea6d8;
}
html,body,.sb-show-main,#storybook-root{background:var(--background,#1f2428) !important;color:var(--foreground,#f3f4f6);}`;

export function DarkTokens({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{DARK}</style>
      {children}
    </>
  );
}
