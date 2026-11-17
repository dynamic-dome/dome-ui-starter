# DoMe UI

A starter component library for DoMe-branded React interfaces and shared CSS design tokens.
It includes the example workspace apps `apps/play` and `apps/duett`, while
the packages are intended for integration in other applications.
It does not include a deployed site, a backend, or user data.

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
cp packages/tokens/dist/miniapp-theme.css ../consumer-app/miniapp/css/dome-tokens.css
```

Then import it before `base.css` / `components.css`:

```html
<link rel="stylesheet" href="/miniapp/css/dome-tokens.css">
```

See the migration notes in `adapters/` for example integration patterns.

## Publish to local Verdaccio

```bash
verdaccio
npm set registry http://localhost:4873
npm adduser --registry http://localhost:4873
pnpm release:local
```

## Component philosophy

DoMe UI has two design modes:

1. **DoMe Website Theme**: dark editorial surface, brushed gold, neon cyan/magenta, Fraunces (Display) + Inter.
2. **DCO Miniapp Theme**: compact operational UI, Organic Obsidian Glow, cyan as action/status signal, quiet motion.

The React components and CSS exports share token names. The miniapp CSS is intended
as a gradual, opt-in migration aid for vanilla JavaScript interfaces.
