# Design sync

## Architektur

```
                    ┌─────────────────────────────┐
                    │  dome-ui-starter (DIESES     │
                    │  Repo) = SSoT für Tokens,    │
                    │  Komponenten                  │
                    └──────┬───────┬───────┬───────┘
        package publish    │       │       │  External design tooling
        (configured registry)      │       │  (optional)
                           ▼       │       ▼
              ┌────────────────┐   │   ┌──────────────────────────┐
              │ Consumer app   │   │   │ Design workspace          │
              └────────────────┘   │   └──────────────────────────┘
                                   │ scripts/sync-miniapp-css.sh
                                   ▼
                      ┌──────────────────────────┐
                      │ Vanilla consumer app     │
                      │ (vanilla JS, konsumiert  │
                      │ generiertes              │
                      │ miniapp/css/dome-tokens  │
                      │ .css)                    │
                      └──────────────────────────┘
```

## Die drei Sync-Kanäle

### 1. React consumer

Consumes `@dynamic-dome/tokens` + `@dynamic-dome/ui` from the configured package
registry. After a versioned change:

```bash
# Version in packages/{tokens,ui}/package.json bumpen, dann PRO PAKET:
cd packages/tokens && pnpm publish --no-git-checks
cd packages/ui && pnpm publish --no-git-checks
# Verify the published dependency metadata:
npm view @dynamic-dome/ui@<version> dependencies
```

For manual package publishing, use `pnpm publish`: it resolves the UI package's
`workspace:*` token dependency during publishing. The local Verdaccio helper
`scripts/publish-local.sh` is a separate, existing path and invokes `npm publish`
for each package. Never put tokens, credentials, or user-specific registry
configuration in this repository.

### Release automation blocker (not changed)

The checked-in CI and release workflows are not currently aligned with the root
package scripts: CI invokes `pnpm lint` and `pnpm typecheck`, and the release
workflow invokes `pnpm release`; none of those root scripts exists. This is a
pre-existing automation issue. No workflow or publishing behavior was changed in
this documentation-only update; resolve and verify the release path in a separate
decision before relying on CI or automated publishing.

### 2. Vanilla consumer

Vanilla JS — bekommt NUR das Token-CSS, keine React-Komponenten:

```bash
bash scripts/sync-miniapp-css.sh ../consumer-app
```

The script produces `miniapp/css/dome-tokens.css` with a generated-file header.
Import it before the consumer's existing CSS layers.
Treat the copied file as generated output: change the source here in
`packages/tokens/src/miniapp-theme.css`, then sync again.

### 3. Optional design workspace

An external design workspace may mirror tokens, components, and guidelines. It is
not a source of truth and must not contain private project identifiers or credentials.

## Workflow: Neues Design in Claude Design entwerfen → hier einbauen

1. **Entwerfen:** In einem geeigneten Design-Werkzeug experimentieren.
2. **Exportieren:** Komponenten in das passende Paket portieren:
   - **Website-Komponente (React):** nahezu direkt nach
     `packages/ui/src/...` (Props-API + `cn()`-Konvention angleichen,
     Story dazu).
   - **Vanilla-Element:** NICHT als React übernehmen — als CSS-Klassen-Rezept
     auf Token-Basis portieren.
3. **Ausrollen:** Tests ausführen, Version erhöhen und veröffentlichen (React)
   beziehungsweise `sync-miniapp-css.sh` nutzen (Vanilla).
4. **Rückspiegeln:** Die finale Fassung bei Bedarf zurück ins Design-Werkzeug
   übernehmen, damit Entwurf und Code nicht driften.

## Invarianten

- Änderungsquellen sollten nicht zwischen mehreren Consumer-Repositories driften.
- Die kopierte `miniapp/css/dome-tokens.css` ist generiert und wird nicht von Hand editiert.
- Ein Design-Arbeitsbereich ist Vorschau, nicht die Quelle: kanonisch ist der Code in diesem Repo.
