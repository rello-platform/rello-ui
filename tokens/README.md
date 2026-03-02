# Rello UI — Design Tokens for Figma

## Quick Start

1. Open the Figma file for `@rello/ui`
2. Install the **Tokens Studio for Figma** plugin (free tier works)
3. In the plugin, choose **Import** → **File**
4. Select `tokens/tokens.json` from this repo
5. The plugin creates Figma variables for every token

## Token Structure

| Group | What it contains | Customizable? |
|-------|-----------------|---------------|
| `brand` | Primary + accent colors | Yes (per tenant) |
| `pipeline` | Hot / Qualified / Engaged / Warming / Cold | No (universal) |
| `status` | Success / Warning / Error / Info | No (universal) |
| `neutral` | 10-step grayscale (50–900) | No (universal) |
| `semantic` | Background, foreground, card, muted aliases | No (derived) |
| `spacing` | 4px base scale (1–12) | No (universal) |
| `radius` | Border radius xs–full | No (universal) |
| `shadow` | Elevation scale xs–xl | No (universal) |
| `fontFamily` | Montserrat, Open Sans, Hind, Mina | No (universal) |
| `typography` | H1–H4, Body, Small, Label, Stat composites | No (universal) |

## White-Label Theming

Only 4 tokens change per tenant:

- `brand.primary` — Primary buttons, links, focus rings
- `brand.accent` — Secondary actions, highlights
- `brand.primary-light` — Computed 15% opacity variant
- `brand.accent-light` — Computed 15% opacity variant

Use the `$themes.json` file to set up theme switching in Tokens Studio. The `tenant-example` theme demonstrates overriding brand colors.

## Source of Truth

The canonical source for token values is `src/styles/design-tokens.css`. If tokens are updated in code, sync the changes to `tokens.json` to keep Figma in sync.
