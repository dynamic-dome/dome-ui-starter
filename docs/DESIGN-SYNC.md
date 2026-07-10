# Design-Sync: dome-ui-starter als Single Source of Truth

Stand: 2026-07-10

## Architektur

```
                    ┌─────────────────────────────┐
                    │  dome-ui-starter (DIESES     │
                    │  Repo) = SSoT für Tokens,    │
                    │  Komponenten, Assets         │
                    └──────┬───────┬───────┬───────┘
        npm publish        │       │       │  DesignSync-Tool
        (GitHub Packages)  │       │       │  (Claude Code Session)
                           ▼       │       ▼
              ┌────────────────┐   │   ┌──────────────────────────┐
              │ dome-dynamics  │   │   │ claude.ai/design-Projekt │
              │ (Website,      │   │   │ "DoMe Dynamics Design    │
              │ dynamic-dome   │   │   │ System" — Spielwiese für │
              │ .com)          │   │   │ neue Designs             │
              └────────────────┘   │   └──────────────────────────┘
                                   │ scripts/sync-miniapp-css.sh
                                   ▼
                      ┌──────────────────────────┐
                      │ DCO Miniapp + Dashboard  │
                      │ (vanilla JS, konsumiert  │
                      │ generiertes              │
                      │ miniapp/css/dome-tokens  │
                      │ .css)                    │
                      └──────────────────────────┘
```

## Die drei Sync-Kanäle

### 1. Website (`dome-dynamics`)

Konsumiert `@dynamic-dome/tokens` + `@dynamic-dome/ui` von GitHub Packages
(`npm.pkg.github.com`). Nach Token-/Komponenten-Änderung:

```bash
# Version in packages/{tokens,ui}/package.json bumpen, dann PRO PAKET:
cd packages/tokens && pnpm publish --no-git-checks
cd packages/ui && pnpm publish --no-git-checks
# Verifikation (kein "workspace:*" als Dep!):
npm view @dynamic-dome/ui@<version> dependencies
```

WICHTIG: `pnpm publish`, NIEMALS `npm publish` — `@dynamic-dome/ui` hat
`workspace:*` auf tokens, das nur pnpm beim Publish auflöst.
Publish braucht in `~/.npmrc` ein PAT mit `write:packages`-Scope.

### 2. DCO Miniapp/Dashboard (`~/dynamic_central_orchestrator`)

Vanilla JS — bekommt NUR das Token-CSS, keine React-Komponenten:

```bash
bash scripts/sync-miniapp-css.sh "C:/Users/domes/dynamic_central_orchestrator"
```

Erzeugt `miniapp/css/dome-tokens.css` (mit GENERIERT-Header). Die
HTML-Einstiege (miniapp/index.html, dashboard.html, dashboard_auth.html,
ops/ops.html) verlinken diese Datei statt des alten `tokens.css`.
Token-Änderungen im DCO-Repo selbst sind verboten — immer hier in
`packages/tokens/src/miniapp-theme.css` ändern und neu syncen.

### 3. Claude Design (claude.ai/design)

Projekt: **DoMe Dynamics Design System** (`ccdee95f-8079-473a-8d62-d491d077d9a2`).
Spiegelt Tokens (`tokens/*.css`), Komponenten (`components/**`) und
Guidelines. Sync läuft über das `DesignSync`-Tool in einer
Claude-Code-Session ("sync das Design-Projekt").

## Workflow: Neues Design in Claude Design entwerfen → hier einbauen

1. **Entwerfen:** Auf claude.ai/design im Projekt "DoMe Dynamics Design
   System" experimentieren. Die Tokens dort sind identisch mit diesem Repo —
   was dort gut aussieht, sieht auch live gut aus.
2. **Exportieren:** Claude Code sagen: "hol <Komponente> aus dem
   Design-Projekt" — die Session liest die Datei per DesignSync (`get_file`)
   und portiert sie:
   - **Website-Komponente (React):** nahezu direkt nach
     `packages/ui/src/...` (Props-API + `cn()`-Konvention angleichen,
     Story dazu).
   - **Miniapp-Element:** NICHT als React übernehmen — als CSS-Klassen-Rezept
     auf Token-Basis portieren (siehe
     `adapters/dynamic-central-orchestrator/MINIAPP_MIGRATION.md`).
3. **Ausrollen:** Tests grün halten, Version bumpen, publishen (Website)
   bzw. `sync-miniapp-css.sh` (DCO).
4. **Rückspiegeln:** Die finale Fassung zurück ins Design-Projekt schreiben,
   damit Spielwiese und Realität nicht driften.

## Invarianten

- Design-Änderungen entstehen NIE direkt im Website- oder DCO-Repo.
- `miniapp/css/dome-tokens.css` im DCO ist generiert — nie von Hand editieren.
- Das Claude-Design-Projekt ist Spielwiese + Vorschau, nicht die Quelle:
  kanonisch ist immer der Code in diesem Repo.
