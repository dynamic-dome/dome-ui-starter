#!/usr/bin/env bash
set -euo pipefail

TARGET_REPO="${1:-../dynamic-central-orchestrator}"
TARGET="$TARGET_REPO/miniapp/css/dome-tokens.css"

pnpm --filter @dynamic-dome/tokens build
mkdir -p "$(dirname "$TARGET")"
{
  echo "/* GENERIERT aus dome-ui-starter (packages/tokens/src/miniapp-theme.css)."
  echo "   NICHT von Hand editieren — Aenderungen dort machen und"
  echo "   scripts/sync-miniapp-css.sh neu ausfuehren. */"
  cat packages/tokens/dist/miniapp-theme.css
} > "$TARGET"

echo "Copied miniapp tokens to $TARGET"
