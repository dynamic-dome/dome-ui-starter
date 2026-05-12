# Migration: `dynamic-central-orchestrator` miniapp/dashboard -> shared DoMe tokens

The miniapp is intentionally vanilla JS. Do not rewrite it to React just to use `@dome/ui`.

Use `@dome/tokens` as the source of truth and migrate class recipes gradually.

## 1. Sync token CSS

From this workspace:

```bash
bash scripts/sync-miniapp-css.sh ../dynamic-central-orchestrator
```

This writes:

```txt
../dynamic-central-orchestrator/miniapp/css/dome-tokens.css
```

## 2. Import token CSS before current base/components

```diff
- <link rel="stylesheet" href="/miniapp/css/tokens.css?v=...">
+ <link rel="stylesheet" href="/miniapp/css/dome-tokens.css?v=...">
  <link rel="stylesheet" href="/miniapp/css/base.css?v=...">
  <link rel="stylesheet" href="/miniapp/css/components.css?v=...">
  <link rel="stylesheet" href="/miniapp/css/motion.css?v=...">
  <link rel="stylesheet" href="/miniapp/css/style.css?v=...">
```

The exported CSS keeps the legacy mapping (`--bg`, `--bg2`, `--accent`, `--radius`, etc.), so existing JS modules keep rendering.

## 3. Component recipes to consolidate

Current miniapp classes can be mapped to library recipes:

| Current class | Shared recipe / token intent |
|---|---|
| `.home-chip` | `StatChip` / status chip recipe |
| `.quick-action` | `QuickActionGrid` / `.dome-miniapp-action` |
| `.status-*` | `StatusPill` variants |
| `.card` | `.dome-miniapp-card` |
| `.tab` / `#tabs` | `BottomTabs` recipe |
| `.overlay` / `.confirm-sheet` | future `Sheet` primitive |

## 4. Keep the source order

The current design-system order is good:

```txt
tokens -> base -> components -> motion -> legacy
```

`dome-tokens.css` should replace the repo-local `tokens.css` only after visual comparison. Until then, import it first and keep `tokens.css` as fallback.

## 5. Future hybrid dashboard

If a future dashboard becomes React/Vite, use `@dome/ui` components directly. Until then, use `@dome/tokens/miniapp.css` plus vanilla class recipes.
