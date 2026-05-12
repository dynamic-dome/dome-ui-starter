# Migration: `dome-dynamics-showcase` -> `@dome/ui`

The existing website/showcase already matches the library architecture: Vite + React + Tailwind + shadcn primitives + Radix + CVA.

## 1. Install the packages

When published locally:

```bash
pnpm add @dome/ui @dome/tokens
```

Or during monorepo development:

```bash
pnpm add @dome/ui@workspace:* @dome/tokens@workspace:*
```

## 2. Import shared styles once

```tsx
// src/main.tsx
import "@dome/ui/styles.css";
```

Keep local font-face declarations in the app because fonts live in `/public/fonts` of the website repo.

## 3. Tailwind config

Prefer the preset instead of duplicating token extensions:

```ts
import type { Config } from "tailwindcss";
import { domeTailwindPreset } from "@dome/tokens/tailwind-preset";

export default {
  presets: [domeTailwindPreset],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@dome/ui/dist/**/*.{js,mjs}",
  ],
} satisfies Config;
```

## 4. Replace imports gradually

```diff
- import { Button } from "@/components/ui/button";
- import { Card } from "@/components/ui/card";
- import { Section, SectionHeading } from "@/components/Section";
- import { Logo } from "@/components/Logo";
+ import { Button, Card, Section, SectionHeading, Logo } from "@dome/ui";
```

Recommended first migration batch:

- `src/components/ui/button.tsx` -> `@dome/ui/Button`
- `src/components/ui/badge.tsx` -> `@dome/ui/Badge`
- `src/components/ui/card.tsx` -> `@dome/ui/Card`
- `src/components/Section.tsx` -> `@dome/ui/Section`
- `src/components/Logo.tsx` -> `@dome/ui/Logo`

Keep route-aware components like `Navbar` in the app until the routing API is finalized. The library can later expose a route-agnostic `Navbar` with injected link components.

## 5. Keep app-specific assets local

The current `Hero` imports `brand-logo.webp` and `founder-emblem.jpg`; those should remain app assets. Use `DoMeHero` from `@dome/ui` and pass the visual block as `visual`.

```tsx
<DoMeHero
  lead="DoMe Dynamics ist meine Werkstatt ..."
  visual={<YourBrandVisual />}
/>
```
