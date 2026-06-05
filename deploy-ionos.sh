#!/usr/bin/env bash
# deploy-ionos.sh — uploads dist/deploy/ to IONOS webhosting via SFTP (lftp mirror)
#
# Credentials: .env in the repo root (gitignored), see .env.example:
#   IONOS_SFTP_HOST, IONOS_SFTP_USER, IONOS_SFTP_PASSWORD,
#   IONOS_SFTP_PORT, IONOS_SFTP_TARGET_DIR
#
# Usage:
#   ./deploy-ionos.sh             confirm, upload changed files, verify live site
#   ./deploy-ionos.sh --dry-run   show what would be uploaded, change nothing
#   ./deploy-ionos.sh --build     run ./build-deploy.sh first, then deploy
#   ./deploy-ionos.sh --delete    also remove remote files that no longer exist locally
#   ./deploy-ionos.sh --yes       skip the confirmation prompt
#
# Notes:
#   - lftp mirror only transfers files that differ (size/date) — incremental by default.
#   - Local permissions are normalized to 644/755 before upload; lftp mirrors them.
#     (Lesson from the first deploy: JSON files uploaded as 600 caused 403s.)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEPLOY="$ROOT/dist/deploy"
DOMAIN="${IONOS_DOMAIN:-bansemir.net}"

DRY_RUN=0; ASSUME_YES=0; DO_BUILD=0; DO_DELETE=0
for arg in "$@"; do
    case "$arg" in
        --dry-run) DRY_RUN=1 ;;
        --yes)     ASSUME_YES=1 ;;
        --build)   DO_BUILD=1 ;;
        --delete)  DO_DELETE=1 ;;
        *) echo "Unknown option: $arg (see header of this script)"; exit 1 ;;
    esac
done

command -v lftp >/dev/null || { echo "ERROR: lftp not found. Install with: brew install lftp"; exit 1; }

[[ -f "$ROOT/.env" ]] || { echo "ERROR: $ROOT/.env missing. Copy .env.example and fill in the IONOS credentials."; exit 1; }
set -a; source "$ROOT/.env"; set +a
for var in IONOS_SFTP_HOST IONOS_SFTP_USER IONOS_SFTP_PASSWORD IONOS_SFTP_TARGET_DIR; do
    [[ -n "${!var:-}" ]] || { echo "ERROR: $var is not set in .env"; exit 1; }
done
IONOS_SFTP_PORT="${IONOS_SFTP_PORT:-22}"

if [[ $DO_BUILD -eq 1 ]]; then
    "$ROOT/build-deploy.sh"
fi

[[ -d "$DEPLOY" ]] || { echo "ERROR: $DEPLOY missing. Run ./build-deploy.sh first (or use --build)."; exit 1; }

# Staleness hint: any source newer than the assembled bundle?
if find "$ROOT/app/webapp" "$ROOT/de" "$ROOT/en" "$ROOT/case-study" "$ROOT/index.html" "$ROOT/.htaccess" \
        -newer "$DEPLOY/index.html" -print -quit 2>/dev/null | grep -q .; then
    echo "WARNING: sources changed after the last build — consider --build (or ./build-deploy.sh) first."
fi

# Normalize permissions BEFORE upload (lftp mirrors local perms; 600 JSONs caused 403s once)
find "$DEPLOY" -type f -exec chmod 644 {} +
find "$DEPLOY" -type d -exec chmod 755 {} +

FILE_COUNT=$(find "$DEPLOY" -type f | wc -l | tr -d ' ')
MIRROR_OPTS="--verbose"
[[ $DRY_RUN  -eq 1 ]] && MIRROR_OPTS="$MIRROR_OPTS --dry-run"
[[ $DO_DELETE -eq 1 ]] && MIRROR_OPTS="$MIRROR_OPTS --delete"

echo "Source : $DEPLOY ($FILE_COUNT files)"
echo "Target : sftp://$IONOS_SFTP_USER@$IONOS_SFTP_HOST:$IONOS_SFTP_PORT$IONOS_SFTP_TARGET_DIR"
[[ $DRY_RUN  -eq 1 ]] && echo "Mode   : DRY RUN — nothing will be uploaded"
[[ $DO_DELETE -eq 1 ]] && echo "Mode   : --delete — remote files missing locally WILL BE REMOVED"

if [[ $DRY_RUN -eq 0 && $ASSUME_YES -eq 0 ]]; then
    read -r -p "Deploy to LIVE https://$DOMAIN/ ? [y/N] " answer
    [[ "$answer" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

LFTP_PASSWORD="$IONOS_SFTP_PASSWORD" lftp -u "$IONOS_SFTP_USER" --env-password \
    -p "$IONOS_SFTP_PORT" "sftp://$IONOS_SFTP_HOST" <<EOF
set sftp:auto-confirm yes
mirror -R $MIRROR_OPTS "$DEPLOY" "$IONOS_SFTP_TARGET_DIR"
bye
EOF

[[ $DRY_RUN -eq 1 ]] && { echo "Dry run complete — nothing uploaded."; exit 0; }

echo ""
echo "==> Verifying live site (https://$DOMAIN)"
check() { # label, url, grep-pattern ('' = just expect 200)
    local label="$1" url="$2" pattern="${3:-}"
    local body code
    code=$(curl -s -o /tmp/deploy-check.$$ -w '%{http_code}' --max-time 15 "$url" || echo 000)
    body=$(cat /tmp/deploy-check.$$ 2>/dev/null); rm -f /tmp/deploy-check.$$
    if [[ "$code" == "200" && ( -z "$pattern" || "$body" == *"$pattern"* ) ]]; then
        echo "  OK   $label"
    else
        echo "  WARN $label (HTTP $code$( [[ -n "$pattern" ]] && echo ", pattern '$pattern' $( [[ "$body" == *"$pattern"* ]] && echo found || echo missing)" ))"
    fi
}
check "landing page /de/"                  "https://$DOMAIN/de/"                       "favicon.png"
check "UI5 app bootstrap (sap_horizon)"    "https://$DOMAIN/app/"                      "sap_horizon"
check "app JSON model readable (perms)"    "https://$DOMAIN/app/model/projects.json"   ""
check "case study (corrected narrative)"   "https://$DOMAIN/case-study/"               ""
if curl -sI --max-time 15 "https://$DOMAIN/de/" | grep -qi "content-security-policy"; then
    echo "  OK   security headers (.htaccess active)"
else
    echo "  WARN security headers missing — .htaccess may not be uploaded/active yet"
fi
echo ""
echo "Deployment finished: https://$DOMAIN/"
