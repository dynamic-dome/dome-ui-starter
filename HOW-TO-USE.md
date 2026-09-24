# HOW-TO-USE — dome-ui-starter

Wegweiser fuer User und Agents. Was ist das, was ist drin, wie startest du es.

## Was ist das

`@dynamic-dome/ui` + `@dynamic-dome/tokens` — eine zweiteilige Komponentenbibliothek
fuer DoMe-Oberflaechen. Sie enthält wiederverwendbare React-Komponenten und
framework-unabhängige CSS-Tokens. Die Workspace-Apps `apps/play` und `apps/duett`
nutzen die UI-Pakete intern; ein Backend und Nutzerdaten sind nicht enthalten.

## Struktur

```
packages/
├─ tokens/        @dynamic-dome/tokens — Design-Tokens (Website + Miniapp + Tailwind-Preset)
└─ ui/            @dynamic-dome/ui — React-Komponenten
   └─ src/
      ├─ primitives/   Button, Badge, Card, Input, Textarea, StatusPill, CommandCard
      ├─ layout/       AppShell, Section, Eyebrow, SectionHeading
      ├─ brand/        Logo, DoMeHero
      └─ miniapp/      MiniAppShell, BottomTabs, StatChip, QuickActionGrid, ActivityList

adapters/
├─ dome-dynamics-showcase/MIGRATION.md       Beispiel für eine React-Integration
└─ dynamic-central-orchestrator/MINIAPP_MIGRATION.md  Beispiel für eine Vanilla-Integration

apps/
├─ play/          Vite-Beispiel-App für @dynamic-dome/ui
└─ duett/         Vite-Beispiel-App für @dynamic-dome/ui

scripts/
├─ publish-local.sh                          Lokales Verdaccio-Publish
└─ sync-miniapp-css.sh                       Kopiert Miniapp-Tokens ins DCO-Repo

docs/
├─ SOURCE_ANALYSIS.md                        Was aus welchem Source-Repo kam
└─ CODEX_TASKS.md                            Geplante Verbesserungs-Tasks
```

## Erstinstall + Build

```bash
pnpm install
pnpm -r build
```

Browser-Storybook für eine visuelle Inspektion:

```bash
pnpm --filter @dynamic-dome/ui storybook
# → http://localhost:6006
```

Die Stories decken ausgewählte Varianten der Komponenten ab; sie ersetzen keine
Prüfung im Zielprodukt.

## Tests + Tooling

```bash
pnpm --filter @dynamic-dome/ui test     # vitest run
pnpm --filter @dynamic-dome/ui build    # tsup → dist/ (CJS + ESM + DTS)
```

Storybook nutzt Tailwind v3 mit dem `@dynamic-dome/tokens/tailwind-preset` als Preset
plus PostCSS + Autoprefixer. Tailwind v4 ist im pnpm-Store transitiv vorhanden,
wird aber durch das Direkt-Pin auf v3 ueberlagert (der Preset ist v3-Style).

## In einer React-App nutzen

```bash
cd ../dome-dynamics-showcase
pnpm add @dynamic-dome/ui @dynamic-dome/tokens
```

```tsx
import "@dynamic-dome/ui/styles.css";
import { Button, DoMeHero, Logo, SectionHeading } from "@dynamic-dome/ui";
```

Tailwind-Config der App:

```ts
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

## In der Vanilla-Miniapp nutzen (ohne React-Umbau)

Für eine Vanilla-JavaScript-Oberfläche kann die Token-Datei kopiert werden:

```bash
bash scripts/sync-miniapp-css.sh ../consumer-app
# → <zielprojekt>/miniapp/css/dome-tokens.css
```

Dann in `miniapp/index.html` vor `base.css` importieren:

```html
<link rel="stylesheet" href="/miniapp/css/dome-tokens.css">
<link rel="stylesheet" href="/miniapp/css/base.css">
<link rel="stylesheet" href="/miniapp/css/components.css">
<link rel="stylesheet" href="/miniapp/css/motion.css">
```

## Lokales Publish (Verdaccio)

```bash
verdaccio &
npm set registry http://localhost:4873
npm adduser --registry http://localhost:4873
pnpm release:local
```

Details: `docs/verdaccio.md`.

## Wo lebt was

- **Tokens:** `packages/tokens/src/{dome-theme.css,miniapp-theme.css,index.css,tailwind-preset.ts}`
- **Komponenten:** `packages/ui/src/{primitives,layout,brand,miniapp}/*.tsx`
- **Stories:** neben jeder Komponente als `*.stories.tsx`
- **Tests:** `packages/ui/src/primitives/Button.test.tsx` (mehr koennen folgen)
- **Storybook-Config:** `packages/ui/.storybook/{main.ts,preview.ts}`
- **Tailwind-Setup:** `packages/ui/{tailwind.config.ts,postcss.config.js}`
