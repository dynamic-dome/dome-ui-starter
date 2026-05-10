import { useState } from "react";
import { Button, Input, Modal, Stack, ThemeProvider } from "@dome/ui";

export function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme} className="play-shell">
      <main className="play-card">
        <Stack gap="lg">
          <header>
            <p className="play-eyebrow">DoMe UI Starter</p>
            <h1>Komponenten schnell testen und weiterentwickeln.</h1>
            <p>
              Dieses Playground-Projekt konsumiert `@dome/ui` direkt aus dem Workspace und ist für
              schnelle Demos gedacht.
            </p>
          </header>

          <Stack direction="row" gap="sm" wrap>
            <Button onClick={() => setOpen(true)}>Modal öffnen</Button>
            <Button variant="secondary" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              Theme wechseln
            </Button>
            <Button variant="ghost">Ghost Action</Button>
          </Stack>

          <Input label="Projektname" placeholder="dynamic-dome.com" helpText="Beispiel für ein Formularfeld." />

          <Modal open={open} onOpenChange={setOpen} title="Willkommen in DoMe UI">
            <Stack gap="md">
              <p>
                Starte mit Button, Input, Modal, Stack und ThemeProvider. Ergänze danach weitere
                Komponenten in `packages/ui/src/components`.
              </p>
              <Button onClick={() => setOpen(false)}>Verstanden</Button>
            </Stack>
          </Modal>
        </Stack>
      </main>
    </ThemeProvider>
  );
}
