#!/bin/sh
# Uploads the converted tiles + manifest to R2 (key prefix hk-tiles/), where
# the /models/hk-tiles/* Worker route serves them in production.
#
# One-time bucket creation (skip if reusing an existing bucket — then also
# update bucket_name in wrangler.jsonc):
#   bunx wrangler r2 bucket create daviddong-assets
#
# Re-run this script whenever the tiles are regenerated (it overwrites keys).
set -eu
bucket="${HK_R2_BUCKET:-daviddong-assets}"
for f in public/models/hk-tiles/*.glb public/models/hk-tiles/manifest.json; do
  key="hk-tiles/$(basename "$f")"
  echo "put $bucket/$key"
  bunx wrangler r2 object put "$bucket/$key" --file="$f" --remote
done
echo "done — $(ls public/models/hk-tiles/*.glb | wc -l | tr -d ' ') tiles + manifest"
