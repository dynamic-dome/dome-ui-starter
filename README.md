# DoMe UI Starter

Ein startfertiges pnpm-Monorepo für eine eigene React-Komponentenbibliothek: `@dome/ui` mit TypeScript, Storybook, Vitest, Changesets, Verdaccio-Anleitung und CI.

## Enthalten

```txt
dome-ui-starter/
├─ packages/ui/          # Komponentenbibliothek @dome/ui
├─ apps/play/            # kleines Vite-Playground-Projekt
├─ .storybook/           # zentrale Storybook-Konfiguration
├─ .changeset/           # Changesets-Konfiguration
├─ .github/workflows/    # CI + Release-Workflow
└─ docs/                 # Checkliste und Verdaccio-Anleitung
```

## Voraussetzungen

- Node.js `>=22.13.0`
- pnpm `>=11`

Empfohlen:

```bash
corepack enable
corepack prepare pnpm@11.0.9 --activate
```

## Installation

```bash
pnpm install
```

## Entwicklung

Storybook starten:

```bash
pnpm storybook
```

Playground-App starten:

```bash
pnpm play
```

Library im Watch-Modus bauen:

```bash
pnpm dev
```

## Qualität

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:storybook
```

## Komponenten verwenden

In einer App:

```tsx
import { Button, Input, Modal, Stack, ThemeProvider } from "@dome/ui";
import "@dome/ui/styles.css";

export function App() {
  return (
    <ThemeProvider theme="light">
      <Stack gap="md">
        <Input label="Name" placeholder="Max Mustermann" />
        <Button>Speichern</Button>
      </Stack>
    </ThemeProvider>
  );
}
```

## Versionierung mit Changesets

Änderung beschreiben:

```bash
pnpm changeset
```

Versionen und Changelogs schreiben:

```bash
pnpm version-packages
```

Pakete bauen und veröffentlichen:

```bash
pnpm release
```

## Lokal veröffentlichen mit Verdaccio

Die vollständige Anleitung liegt in [`docs/verdaccio.md`](docs/verdaccio.md).

Kurzfassung:

```bash
pnpm add -g verdaccio
verdaccio
npm set registry http://localhost:4873
npm adduser --registry http://localhost:4873
pnpm --filter @dome/ui build
pnpm --filter @dome/ui publish --registry http://localhost:4873 --access public
```

## Nächste sinnvolle Schritte

- Design Tokens erweitern: Farben, Typografie, Breakpoints.
- Weitere Komponenten hinzufügen: `Textarea`, `Select`, `Toast`, `Badge`, `Card`.
- Storybook-Docs pro Komponente mit Do/Don't-Beispielen ergänzen.
- Nach dem ersten `pnpm install` die generierte `pnpm-lock.yaml` committen.
