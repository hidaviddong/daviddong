#!/usr/bin/env bash
#
# Upload image assets to the Cloudflare R2 bucket that backs
# https://assets.daviddong.me
#
# Usage:
#   scripts/upload-assets.sh <local-dir> [key-prefix]
#
# Examples:
#   # Upload ./newpics/* under R2 key "projects/my-app/..."
#   scripts/upload-assets.sh ./newpics projects/my-app
#
#   # Upload a single folder, keeping its own name as the prefix
#   scripts/upload-assets.sh ./assets/projects projects
#
# The resulting public URL for a file uploaded as key
# "projects/my-app/hero.png" is:
#   https://assets.daviddong.me/projects/my-app/hero.png
# Reference it in src/data/projects.ts via: asset("projects/my-app/hero.png")

set -euo pipefail

BUCKET="daviddong-assets"

DIR="${1:-}"
PREFIX="${2:-}"

if [[ -z "$DIR" || ! -d "$DIR" ]]; then
  echo "Usage: scripts/upload-assets.sh <local-dir> [key-prefix]" >&2
  exit 1
fi

# Strip trailing slash from prefix.
PREFIX="${PREFIX%/}"

content_type() {
  case "${1,,}" in
    *.webp) echo "image/webp" ;;
    *.gif)  echo "image/gif" ;;
    *.png)  echo "image/png" ;;
    *.jpg | *.jpeg) echo "image/jpeg" ;;
    *.svg)  echo "image/svg+xml" ;;
    *.avif) echo "image/avif" ;;
    *.mp4)  echo "video/mp4" ;;
    *.webm) echo "video/webm" ;;
    *) echo "application/octet-stream" ;;
  esac
}

count=0
find "$DIR" -type f | sort | while read -r f; do
  rel="${f#"$DIR"/}"                      # path relative to DIR
  key="${PREFIX:+$PREFIX/}$rel"           # prepend prefix if given
  ct="$(content_type "$f")"
  if bunx wrangler r2 object put "$BUCKET/$key" \
       --file "$f" --content-type "$ct" --remote >/dev/null 2>&1; then
    echo "OK    $key"
  else
    echo "FAIL  $key" >&2
  fi
  count=$((count + 1))
done

echo "Done. Public base: https://assets.daviddong.me/"
