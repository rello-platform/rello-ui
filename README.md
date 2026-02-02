# @rello/ui

Shared UI component library for Rello applications.

## Installation

```bash
npm install @rello/ui
```

## Setup

Import the styles in your app:

```css
@import "@rello/ui/styles";
```

## Usage

```tsx
import { Button, Card, Input, Badge } from "@rello/ui";

function MyComponent() {
  return (
    <Card>
      <Input label="Email" placeholder="Enter your email" />
      <Button variant="primary">Submit</Button>
      <Badge variant="success">Active</Badge>
    </Card>
  );
}
```

## Components

- **Button** - primary, secondary, accent, ghost, danger, outline, link
- **Card** - CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Input** - with label, error, hint, icons
- **Textarea** - multi-line input
- **Select** - Radix UI dropdown
- **Checkbox** - Radix UI checkbox
- **Label** - form label
- **Badge** - status badges with pipeline variants (hot, qualified, engaged, warming, cold)
- **Avatar** - with fallback
- **Dialog** - modal dialog
- **Spinner** - LoadingOverlay, PageLoader, CardLoader
- **EmptyState** - empty content placeholder
- **Pagination** - page navigation
- **Table** - data table with sorting
- **Progress** - progress bar

## Design Tokens

Brand colors, pipeline stages, and status colors are defined as CSS variables:

- `--brand-primary` / `--brand-accent`
- `--hot`, `--qualified`, `--engaged`, `--warming`, `--cold`
- `--success`, `--warning`, `--error`, `--info`
