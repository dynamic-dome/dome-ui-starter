# HOW-TO-USE — dome-ui-starter

Wegweiser fuer User und Agents. Was ist das, was ist drin, wie startest du es.

## Was ist das

`@dynamic-dome/ui` + `@dynamic-dome/tokens` — eine zweiteilige Komponentenbibliothek fuer die
DoMe-Welt. Extrahiert aus zwei Source-Repos:

- **`dome-dynamics-showcase`** (React + Vite + Tailwind + shadcn/Radix/CVA)
  liefert Sprache, Tokens und Komponenten fuer die Website.
- **`dynamic_central_orchestrator`** (Vanilla-JS-Miniapp + Dashboard) liefert
  das Mini-App-Token-System "Organic Obsidian Glow".

Zwei Theme-Welten, ein gemeinsames Token-Paket, eine React-Library mit beiden
Anwendungsbereichen abgedeckt.

## Struktur

```
packages/
├─ tokens/        @dynamic-dome/tokens — Design-Tokens (Website + Miniapp + Tailwind-Preset)
└─ ui/            @dynamic-dome/ui — 17 React-Komponenten
   └─ src/
      ├─ primitives/   Button, Badge, Card, Input, Textarea, StatusPill, CommandCard
      ├─ layout/       AppShell, Section, Eyebrow, SectionHeading
      ├─ brand/        Logo, DoMeHero
      └─ miniapp/      MiniAppShell, BottomTabs, StatChip, QuickActionGrid, ActivityList

adapters/
├─ dome-dynamics-showcase/MIGRATION.md       Wie die Website auf @dynamic-dome/ui umziehen kann
└─ dynamic-central-orchestrator/MINIAPP_MIGRATION.md  Wie die Miniapp dome-tokens.css zieht

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

Browser-Storybook fuer visuelle Inspektion aller 17 Komponenten:

```bash
pnpm --filter @dynamic-dome/ui storybook
# → http://localhost:6006
```

22 Stories sind enthalten (Button-Varianten, alle StatusPill-Status, alle
Miniapp-Komponenten, AppShell + DoMeHero + Logo).

## Tests + Tooling

```bash
pnpm --filter @dynamic-dome/ui test     # vitest run (2/2 grün)
pnpm --filter @dynamic-dome/ui build    # tsup → dist/ (CJS + ESM + DTS, ~27 KB ESM)
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

Die DCO-Miniapp soll bewusst Vanilla bleiben. Token-Datei kopieren:

```bash
bash scripts/sync-miniapp-css.sh ~/dynamic_central_orchestrator
# → dynamic_central_orchestrator/miniapp/css/dome-tokens.css
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

Details: `docs/verdaccio.md` (falls geplant).

## Bekannte Reibung

- **`apps/duett` + `apps/play` Tests:** Vitest fehlt in deren `devDependencies`.
  Sind Reste vom initialen Setup, brauchen Aufraeumen oder eigene Vitest-Dep.
- **Toolchain-Regression vom ZIP-Import:** Root-`package.json` hat kein ESLint,
  kein Prettier, kein Vite mehr — alles im UI-Paket lokal. Bei groesserer
  Toolchain-Saeuberung in einer eigenen Session angehen.
- **Storybook 9 verfuegbar:** Aktuell auf 8.6.18 fixiert (Vite-6-Pin im UI-Paket).
  Upgrade waere `npx storybook@latest upgrade` + Codemods.
- **Storybook-Vite-Peer-Mismatch nicht ganz weg:** Vite 6 ist explizit gepinnt,
  Vite 7 liegt transitiv noch im Store (durch andere Konsumenten). Funktioniert
  trotzdem, weil `packages/ui/node_modules/vite` auf v6 zeigt.

## Wo lebt was

- **Tokens:** `packages/tokens/src/{dome-theme.css,miniapp-theme.css,index.css,tailwind-preset.ts}`
- **Komponenten:** `packages/ui/src/{primitives,layout,brand,miniapp}/*.tsx`
- **Stories:** neben jeder Komponente als `*.stories.tsx`
- **Tests:** `packages/ui/src/primitives/Button.test.tsx` (mehr koennen folgen)
- **Storybook-Config:** `packages/ui/.storybook/{main.ts,preview.ts}`
- **Tailwind-Setup:** `packages/ui/{tailwind.config.ts,postcss.config.js}`

## Session-Spuren

Volldetail siehe `.agent-memory/session-summary.md`.
Wiki-Eintraege ueber Sessions an diesem Projekt:
`~/wiki/wiki/queries/*session*dome-ui*`.
