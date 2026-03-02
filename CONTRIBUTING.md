# Contributing to @rello/ui

## Design Principles

- **Minimal** — Only what's needed, nothing more
- **Warm** — Cool grays balanced with terracotta accents
- **Rounded** — Soft edges create approachability
- **Spacious** — Generous whitespace aids focus
- **Brandable** — Full white-label support via CSS custom properties

## File Structure

```
src/
  components/
    {kebab-case-name}/
      ComponentName.tsx          # Main component
      ComponentName.stories.tsx  # Storybook stories
      ComponentName.test.tsx     # Tests
      index.ts                   # Barrel export
  docs/
    *.mdx                        # Storybook doc pages
    helpers/                     # Helper components for docs
  lib/
    cn.ts                        # cn() utility (clsx + tailwind-merge)
  styles/
    design-tokens.css            # CSS custom property tokens
    index.css                    # Main CSS entry
  test/
    setup.ts                     # Test setup
  index.ts                       # Root barrel export
```

## Component Conventions

### 1. File naming
- **Directories**: `kebab-case` (e.g., `dropdown-menu/`)
- **Component files**: `PascalCase` (e.g., `DropdownMenu.tsx`)
- **Barrel exports**: Always `index.ts`

### 2. Component structure
```tsx
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const componentVariants = cva("base-classes", {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ },
});

export interface ComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof componentVariants> {
  // additional props
}

const Component = React.forwardRef<HTMLElement, ComponentProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <element
        ref={ref}
        className={cn(componentVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

export { Component, componentVariants };
```

### 3. Rules
1. Always start with `"use client"` directive
2. Use `React.forwardRef` with proper typing for DOM-wrapping components
3. Set `displayName` on every forwardRef component
4. Use **CVA** for components with 3+ variant dimensions; plain object maps for simpler variants
5. Accept `className` prop and merge via `cn()` — always last in the call
6. Style with Tailwind utilities referencing CSS variables: `bg-[var(--brand-primary)]`
7. **Never hardcode hex colors** — always use token variables
8. Export props interface alongside the component
9. Use **Radix UI** for accessible primitives where available
10. Icons: import directly from `iconoir-react`

### 4. Barrel exports
Every component directory has an `index.ts`:
```ts
export { Component, componentVariants, type ComponentProps } from "./Component";
```

Register in `src/components/index.ts` to be included in the package.

## Token System

All design tokens live as CSS custom properties in `src/styles/design-tokens.css`. Never create new tokens inline — add them to the token file.

### Token categories
- `--brand-*` — Customizable per tenant
- `--hot/qualified/engaged/warming/cold` — Pipeline stages (universal)
- `--success/warning/error/info` — Status colors (universal)
- `--neutral-50` to `--neutral-900` — Gray scale
- `--space-*` — Spacing scale
- `--radius-*` — Border radii
- `--shadow-*` — Elevation
- `--transition-*` — Timing
- `--z-*` — Z-index layers

## Storybook

Every component must have a `.stories.tsx` file that demonstrates:
- Default state
- All variants
- All sizes
- Interactive states (hover, focus, disabled, loading, error)
- Composition examples (how components work together)

### Story pattern
```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Component } from "./Component";

const meta = {
  title: "Components/Component",
  component: Component,
  tags: ["autodocs"],
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { /* ... */ } };
```

## Testing

- Use Vitest + Testing Library
- Test interactive behavior and accessibility
- Run with `npm test` or `npm run test:watch`

## Commands

| Command | Description |
|---------|-------------|
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build` | Build the package (ESM + types) |
| `npm run dev` | Watch mode build |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | TypeScript type check |
| `npm run build-storybook` | Build static Storybook site |
