# @dome/ui

DoMe UI ist eine kleine, typsichere React-Komponentenbibliothek mit CSS-Variablen statt Framework-Zwang.

## Installation

```bash
pnpm add @dome/ui
```

## Nutzung

```tsx
import { Button, ThemeProvider } from "@dome/ui";
import "@dome/ui/styles.css";

export function Example() {
  return (
    <ThemeProvider theme="light">
      <Button variant="primary">Loslegen</Button>
    </ThemeProvider>
  );
}
```

## Komponenten

- `Button`: Varianten `primary`, `secondary`, `ghost`, Größen `sm`, `md`, `lg`.
- `Input`: Label, Hilfetext, Fehlerzustand, A11y-Verknüpfung.
- `Modal`: einfacher Dialog mit Overlay, Escape-Schließen und Fokus-Restore.
- `Stack`: Layout-Helfer für vertikale und horizontale Abstände.
- `ThemeProvider`: Light, Dark und System Theme über CSS-Variablen.

## Styling

Importiere einmalig:

```ts
import "@dome/ui/styles.css";
```

Tokens liegen in `src/styles.css` und können in Apps überschrieben werden.
