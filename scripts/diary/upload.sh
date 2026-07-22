#!/bin/sh
# Uploads one AI-diary markdown file to R2 (key prefix diary/), where the
# /api/diary/* routes in src/worker/index.ts serve it to Diary.app.
#
# Usage:
#   scripts/diary/upload.sh path/to/2026-01-01.md   # upload a specific file
#   scripts/diary/upload.sh                         # upload today's $DIARY_DIR/YYYY-MM-DD.md
#
# Env:
#   DIARY_DIR       folder holding the daily .md files (default ~/diary)
#   DIARY_R2_BUCKET override the bucket (default daviddong-assets)
set -eu

bucket="${DIARY_R2_BUCKET:-daviddong-assets}"

if [ "$#" -ge 1 ]; then
  f="$1"
else
  f="${DIARY_DIR:-$HOME/diary}/$(date +%F).md"
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
