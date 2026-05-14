# DoMe UI

A small component library extracted from the existing DoMe/Dynamic Dome surfaces:

- `dome-dynamics-showcase`: React + Vite + Tailwind + shadcn/Radix primitives.
- `dynamic-central-orchestrator`: vanilla Telegram Mini App + dashboard tokens (`Organic Obsidian Glow`).

This starter is intentionally split into two packages:

```txt
packages/tokens  framework-agnostic design tokens, CSS variables, Tailwind preset
packages/ui      React components for the website/showcase and future projects
```

## Install locally

```bash
pnpm install
pnpm -r build
```

## Use in a React app

```tsx
// src/main.tsx
import "@dynamic-dome/ui/styles.css";
```

```tsx
import { Button, DoMeHero, Logo, SectionHeading } from "@dynamic-dome/ui";
```

Update Tailwind:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import { domeTailwindPreset } from "@dynamic-dome/tokens/tailwind-preset";

export default {
  presets: [domeTailwindPreset],
  content: [
    "./src/**/*.{ts,tsx}",
    "./node_modules/@dynamic-dome/ui/dist/**/*.{js,mjs}",
  ],
} satisfies Config;
```

## Use in the vanilla miniapp

The miniapp should keep its vanilla JS architecture. Use the token package as a shared CSS source:

```bash
pnpm --filter @dynamic-dome/tokens build
cp packages/tokens/dist/miniapp-theme.css ../dynamic-central-orchestrator/miniapp/css/dome-tokens.css
```

Then import it before `base.css` / `components.css`:

```html
<link rel="stylesheet" href="/miniapp/css/dome-tokens.css">
```

See `adapters/dynamic-central-orchestrator/MINIAPP_MIGRATION.md` and `adapters/dome-dynamics-showcase/MIGRATION.md`.

## Publish to local Verdaccio

```bash
verdaccio
npm set registry http://localhost:4873
npm adduser --registry http://localhost:4873
pnpm release:local
```

## Component philosophy

DoMe UI has two design modes:

1. **DoMe Website Theme**: dark editorial surface, brushed gold, neon cyan/magenta, Space Grotesk + Inter.
2. **DCO Miniapp Theme**: compact operational UI, Organic Obsidian Glow, cyan as action/status signal, quiet motion.

The React components use the same token names as the current website. The miniapp package exports compatible CSS variables and class recipes so the vanilla app can migrate gradually instead of being rewritten in React.
