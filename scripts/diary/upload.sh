#!/bin/sh
# Uploads one AI-diary markdown file to R2 (key prefix diary/), where the
# /api/diary/* routes in src/worker/index.ts serve it to Diary.app.
#
# Usage:
#   scripts/diary/upload.sh path/to/2026-01-01.md   # upload a specific file
#   scripts/diary/upload.sh                         # upload today's $DIARY_DIR/YYYY-MM-DD.md
#
# Env:
#   DIARY_DIR       folder holding the daily .md files (required for the
#                   no-argument form)
#   DIARY_R2_BUCKET override the bucket (default daviddong-assets)
set -eu

bucket="${DIARY_R2_BUCKET:-daviddong-assets}"

if [ "$#" -ge 1 ]; then
  # "$*" re-joins an unquoted path that the shell split on spaces
  # (e.g. .../Mobile Documents/... passed without quotes).
  f="$*"
elif [ -n "${DIARY_DIR:-}" ]; then
  f="$DIARY_DIR/$(date +%F).md"
else
  echo "usage: $0 path/to/YYYY-MM-DD.md" >&2
  echo "   or: DIARY_DIR=/path/to/folder $0   # uploads today's file" >&2
  exit 1
fi

base="$(basename "$f")"
case "$base" in
  [0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9].md) ;;
  *) echo "error: filename must be YYYY-MM-DD.md (got $base)" >&2; exit 1 ;;
esac
[ -f "$f" ] || { echo "error: no such file: $f" >&2; exit 1; }

echo "put $bucket/diary/$base"
bunx wrangler r2 object put "$bucket/diary/$base" \
  --file="$f" \
  --content-type "text/markdown; charset=utf-8" \
  --remote
echo "done — https://daviddong.me 打开 AI Diary 即可看到"
