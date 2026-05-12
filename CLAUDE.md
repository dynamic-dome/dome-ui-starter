# CLAUDE.md — dome-ui-starter

> Erste Pflichtlektuere: `HOW-TO-USE.md` im Root.

Projektspezifische Konventionen fuer Agent-Verhalten. Knapp gehalten, der
Wegweiser steht in `HOW-TO-USE.md`.

## Vorrangregel

`~/Desktop/SESSION-WORKFLOW.md` schlaegt diese CLAUDE.md. Globale
`~/.claude/CLAUDE.md` schlaegt projekt-spezifische Files. Explizite
User-Anweisungen in der laufenden Konversation schlagen alles.

## Build- und Test-Konventionen

- **pnpm:** das Repo ist gepinnt auf `pnpm@9.15.4`. Lokal kann pnpm 11 sein —
  `pnpm install` warnt dann, das ist OK. Nicht auf pnpm 11 hochpinnen, weil
  das ZIP-Setup explizit fuer 9 geschrieben wurde.
- **Test-Erfolgskriterien:** `pnpm --filter @dome/ui test` muss gruen bleiben.
  Aktuell 2/2 in `src/primitives/Button.test.tsx`. Neue Komponenten brauchen
  nicht zwingend Tests, aber bestehende Tests duerfen nicht regressen.
- **Build vor Storybook:** wenn Tokens veraendert wurden, `pnpm --filter
  @dome/tokens build` vor Storybook-Start — sonst zeigt das Preview leere
  CSS-Vars.

## Tailwind-Versions-Lock

Die Library ist **Tailwind v3** (gepinnt auf `^3.4.17` im UI-Paket). Der
`tailwind-preset.ts` aus `@dome/tokens` ist v3-Style (`Partial<Config>` mit
`darkMode: "class"`, `theme.extend`, `plugins`). Tailwind v4 ist im Store
transitiv vorhanden, wird aber durch das Direkt-Pin ueberlagert.

**Nicht auf v4 hochziehen** ohne den Preset zu portieren (v4 nutzt
`@theme`-Direktive in CSS statt JS-Config) — das waere ein groesserer
Eingriff in `packages/tokens/`.

## DoMeHero-API-Schluder

`DoMeHero` hat `title?: React.ReactNode`, was mit dem von
`React.HTMLAttributes<HTMLElement>` geerbten `title: string` kollidiert.
Loesung steht im Code: `extends Omit<React.HTMLAttributes<HTMLElement>, "title">`.
Wer den Hero clont oder eine aehnliche Komponente baut: gleiche Omit-Logik
verwenden.

## Storybook-Setup-Empfindlichkeiten

Drei Pakete sind explizit als devDeps in `packages/ui/package.json` deklariert,
weil pnpm sie sonst nicht symlinked:

- `storybook` (Top-Level seit SB8, liefert `storybook/internal/*`-Imports)
- `@storybook/react` (React-Renderer, separat von `react-vite`)
- `vite` ^6.3.5 (pinned, weil SB8.6 Peer-Range bei v7 bricht)

Nicht aus der package.json entfernen, auch wenn sie transitiv resolvable
scheinen.

## ZIP-Re-Import-Verhalten

Der ganze Inhalt unter `packages/`, `adapters/`, `scripts/`, `docs/SOURCE_ANALYSIS.md`,
`docs/CODEX_TASKS.md` stammt aus einem ChatGPT-generierten ZIP (2026-05-12).
Wenn ChatGPT ein neues ZIP liefert: nicht blind druebermergen — git diff
gegen den letzten Commit lesen, weil das ZIP eigene Toolchain-Annahmen mitbringt
(React-Version, pnpm-Version, Vite-Version).

## Test-DB-Regel (n/a hier, aber als Hinweis)

Globale Regel: keine Tests gegen Production-DBs. Gilt hier nicht, weil die
Library keine DB benutzt — Tests sind reines Vitest auf React-Komponenten,
keine Isolation noetig.
