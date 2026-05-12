#!/usr/bin/env bash
set -euo pipefail

REGISTRY="${REGISTRY:-http://localhost:4873}"

pnpm -r build

for pkg in packages/tokens packages/ui; do
  (
    cd "$pkg"
    npm publish --registry "$REGISTRY"
  )
done

echo "Published @dome/tokens and @dome/ui to $REGISTRY"
