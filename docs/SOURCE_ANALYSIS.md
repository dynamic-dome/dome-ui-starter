# Source analysis

This starter combines patterns for React/Vite/Tailwind and vanilla JavaScript consumers.

## React/Vite/Tailwind reference pattern

Observed stack:

- Vite, React 18, TypeScript, Tailwind, Radix UI, CVA, `clsx`, `tailwind-merge`, Vitest.
- shadcn-style primitives under `src/components/ui/*`.
- Premium dark identity with HSL tokens, gold gradients, neon cyan/magenta accents, `panel`, `hairline`, `grid-bg`, `text-gold`, `text-neon` helper classes.
- Existing reusable components: `Button`, `Badge`, `Card`, `Section`, `Eyebrow`, `SectionHeading`, `Logo`, `Navbar`, `Hero`.

Design extraction:

- Keep the shadcn/Radix/CVA pattern because it already matches the app.
- Promote brand-only variants (`gold`, `outlineGold`, `neon`) into first-class library variants.
- Move all token definitions into `@dynamic-dome/tokens` so the website and future projects share one source.

## Vanilla JavaScript reference pattern

Observed miniapp/dashboard direction:

- Vanilla JS miniapp, no React/Vue framework.
- Shared CSS order: tokens -> base -> components -> motion -> legacy.
- A consumer-local `miniapp/css/tokens.css` may define its existing Mini App + Dashboard tokens.
- UX direction: simplified labels, restrained accent color, and motion only when
  something is active.

Design extraction:

- Do not force the miniapp into React.
- Provide `@dynamic-dome/tokens/miniapp.css` and CSS recipes that can be copied into the repo.
- Provide React equivalents only for new dashboards or future hybrid surfaces.
