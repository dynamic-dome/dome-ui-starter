# Consumer integration checklist

## Task 1 — Add the packages to a React consumer

1. Install `@dynamic-dome/ui` and `@dynamic-dome/tokens` from Verdaccio or workspace.
2. Import `@dynamic-dome/ui/styles.css` in `src/main.tsx`.
3. Replace local imports for `Button`, `Badge`, `Card`, `Logo`, `Section` with `@dynamic-dome/ui`.
4. Keep route-aware `Navbar` and asset-heavy `Hero` local in the first pass.
5. Run `pnpm lint && pnpm test && pnpm build`.

## Task 2 — Sync tokens into a vanilla consumer

1. Build `@dynamic-dome/tokens`.
2. Copy `packages/tokens/dist/miniapp-theme.css` to `miniapp/css/dome-tokens.css`.
3. Import it before `base.css` in `miniapp/index.html`.
4. Run the consumer's smoke tests and verify its supported navigation flows.
5. Replace duplicated token declarations only after a visual comparison in that consumer.

## Task 3 — Promote more components

After the first pass, promote these app-specific components into `@dynamic-dome/ui`:

- Route-agnostic `Navbar` with injected link component.
- `WorkshopTeaser` as `FeatureTeaser`.
- `StackCTA` as `EditorialCTA`.
- `WelcomeHero` as a reusable miniapp/onboarding primitive.
