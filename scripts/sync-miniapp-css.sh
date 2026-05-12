#!/usr/bin/env bash
set -euo pipefail

TARGET_REPO="${1:-../dynamic-central-orchestrator}"
TARGET="$TARGET_REPO/miniapp/css/dome-tokens.css"

pnpm --filter @dome/tokens build
mkdir -p "$(dirname "$TARGET")"
cp packages/tokens/dist/miniapp-theme.css "$TARGET"

echo "Copied miniapp tokens to $TARGET"
