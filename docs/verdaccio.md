# Lokales Publishing mit Verdaccio

Verdaccio eignet sich, um `@dome/ui` lokal wie ein echtes npm-Paket zu testen.

```bash
pnpm add -g verdaccio
verdaccio
```

In einem zweiten Terminal:

```bash
npm set registry http://localhost:4873
npm adduser --registry http://localhost:4873
```

Package bauen und veröffentlichen:

```bash
pnpm --filter @dome/ui build
pnpm --filter @dome/ui publish --registry http://localhost:4873 --access public
```

In einem Zielprojekt installieren:

```bash
npm set registry http://localhost:4873
pnpm add @dome/ui
```

Nutzung:

```tsx
import { Button } from "@dome/ui";
import "@dome/ui/styles.css";

export function Example() {
  return <Button>Loslegen</Button>;
}
```
