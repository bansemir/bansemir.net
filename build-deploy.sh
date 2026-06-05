#!/usr/bin/env bash
# build-deploy.sh — builds the full bansemir.net production bundle into dist/deploy/
#
# Steps:
#   1. Lint gate:  ui5lint must report 0 findings (the README claims it — keep it true)
#   2. Static HTML: regenerate landing/case-study/legal pages from templates + content JSON
#   3. UI5 build:   ui5 build --all -> dist/app (+ cachebuster info)
#   4. Assemble:    dist/deploy/ = static pages + assets + legal + .htaccess + built app
#
# Usage:
#   ./build-deploy.sh           build the bundle
#   ./build-deploy.sh --serve   build, then preview on http://localhost:8090/
#
# Deploy: upload the CONTENTS of dist/deploy/ to IONOS via SFTP.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY="$ROOT/dist/deploy"

echo "==> [1/4] Lint gate (ui5lint)"
(cd "$ROOT/app" && npx ui5lint)

echo "==> [2/4] Regenerating static pages (build-html.js)"
node "$ROOT/app/scripts/build-html.js"

echo "==> [3/4] Building UI5 app (ui5 build + cachebuster)"
(cd "$ROOT/app" && npm run build)

echo "==> [4/4] Assembling dist/deploy/"
rm -rf "$DEPLOY"
mkdir -p "$DEPLOY"
cp "$ROOT/index.html" "$ROOT/robots.txt" "$ROOT/sitemap.xml" "$ROOT/.htaccess" "$DEPLOY/"
# assets/toolkit/ is a duplicate staging copy — the app ships its own tracked
# copy under app/webapp/assets/toolkit/ (deployed via the ui5 build below)
rsync -a --exclude '*.template.html' --exclude '/assets/toolkit/' \
    "$ROOT/de" "$ROOT/en" "$ROOT/case-study" "$ROOT/assets" "$ROOT/legal" \
    "$DEPLOY/"
rsync -a "$ROOT/dist/app/" "$DEPLOY/app/"

FILE_COUNT=$(find "$DEPLOY" -type f | wc -l | tr -d ' ')
echo ""
echo "Done: $DEPLOY ($FILE_COUNT files)"
echo "Deploy: upload the contents of dist/deploy/ to IONOS via SFTP."

if [[ "${1:-}" == "--serve" ]]; then
    echo ""
    echo "Preview: http://localhost:8090/  (Ctrl+C to stop)"
    python3 -m http.server 8090 --directory "$DEPLOY"
fi
