# Codex / Claude Code tasks for applying this starter

## Task 1 — Add local packages to `dome-dynamics-showcase`

1. Install `@dome/ui` and `@dome/tokens` from Verdaccio or workspace.
2. Import `@dome/ui/styles.css` in `src/main.tsx`.
3. Replace local imports for `Button`, `Badge`, `Card`, `Logo`, `Section` with `@dome/ui`.
4. Keep route-aware `Navbar` and asset-heavy `Hero` local in the first pass.
5. Run `pnpm lint && pnpm test && pnpm build`.

## Task 2 — Sync tokens into `dynamic-central-orchestrator`

1. Build `@dome/tokens`.
2. Copy `packages/tokens/dist/miniapp-theme.css` to `miniapp/css/dome-tokens.css`.
3. Import it before `base.css` in `miniapp/index.html`.
4. Run miniapp smoke tests and verify Start / Inbox / Aktivität / Ergebnisse / Mehr.
5. Replace duplicated token declarations only after screenshots match.

## Task 3 — Promote more components

After the first pass, promote these app-specific components into `@dome/ui`:

- Route-agnostic `Navbar` with injected link component.
- `WorkshopTeaser` as `FeatureTeaser`.
- `StackCTA` as `EditorialCTA`.
- `WelcomeHero` as a reusable miniapp/onboarding primitive.
