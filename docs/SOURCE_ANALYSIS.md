# Source analysis

This starter is based on two connected GitHub repos.

## `dynamic-dome/dome-dynamics-showcase`

Observed stack:

- Vite, React 18, TypeScript, Tailwind, Radix UI, CVA, `clsx`, `tailwind-merge`, Vitest.
- shadcn-style primitives under `src/components/ui/*`.
- Premium dark identity with HSL tokens, gold gradients, neon cyan/magenta accents, `panel`, `hairline`, `grid-bg`, `text-gold`, `text-neon` helper classes.
- Existing reusable components: `Button`, `Badge`, `Card`, `Section`, `Eyebrow`, `SectionHeading`, `Logo`, `Navbar`, `Hero`.

Design extraction:

- Keep the shadcn/Radix/CVA pattern because it already matches the app.
- Promote brand-only variants (`gold`, `outlineGold`, `neon`) into first-class library variants.
- Move all token definitions into `@dynamic-dome/tokens` so the website and future projects share one source.

## `dynamic-dome/dynamic-central-orchestrator`

Observed miniapp/dashboard direction:

- Vanilla JS miniapp, no React/Vue framework.
- Shared CSS order: tokens -> base -> components -> motion -> legacy.
- `miniapp/css/tokens.css` is the single source of truth for Mini App + Dashboard and uses the `Organic Obsidian Glow` token system.
- UX direction: five top-level tabs, Welcome Hero, simplified labels, cyan diet, motion only when something is active.

Design extraction:

- Do not force the miniapp into React.
- Provide `@dynamic-dome/tokens/miniapp.css` and CSS recipes that can be copied into the repo.
- Provide React equivalents only for new dashboards or future hybrid surfaces.
