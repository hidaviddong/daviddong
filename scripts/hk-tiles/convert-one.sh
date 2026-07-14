#!/bin/sh
# Worker for the batch conversion: convert-one.sh <path/to/tile.obj>
# Logs to $HK_LOG_DIR (or /tmp) and prints OK/FAIL per tile.
set -u
obj="$1"
name=$(basename "$obj" .obj)
out_dir="public/models/hk-tiles"
log_dir="${HK_LOG_DIR:-/tmp}"
/Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/hk-tiles/convert_tile.py -- \
  "$obj" "$out_dir/$name.glb" "$out_dir/$name.meta.json" "${HK_MAX_TEX:-2048}" "${HK_TARGET_TRIS:-300000}" \
  > "$log_dir/convert-$name.log" 2>&1
if [ $? -eq 0 ] && [ -f "$out_dir/$name.glb" ]; then
  echo "OK $name"
else
  echo "FAIL $name"
  exit 1
fi
