#!/bin/sh
# Worker for the batch conversion: convert-one.sh <path/to/tile.obj>
# Logs to $HK_LOG_DIR (or /tmp) and prints OK/FAIL per tile.
#
# Two stages:
#   1. Blender: OBJ -> Draco GLB with 4096px WebP textures (convert_tile.py)
#   2. gltf-transform: WebP -> KTX2/UASTC GPU textures (needs `toktx` from
#      KTX-Software on PATH; see https://github.com/KhronosGroup/KTX-Software)
#
# UASTC keeps the texture compressed on the GPU (~1 byte/texel vs 4 for
# WebP-decoded RGBA), so 4096px tiles cost about the same VRAM as the old
# uncompressed 2048px ones while looking far sharper.
set -u
obj="$1"
name=$(basename "$obj" .obj)
out_dir="public/models/hk-tiles"
log_dir="${HK_LOG_DIR:-/tmp}"
export PATH="$HOME/.local/ktx/bin:$PATH"

# Stale output must not fake success — Blender needs --python-exit-code to
# propagate script exceptions into its exit status.
rm -f "$out_dir/$name.glb"
/Applications/Blender.app/Contents/MacOS/Blender -b --python-exit-code 1 -P scripts/hk-tiles/convert_tile.py -- \
  "$obj" "$out_dir/$name.glb" "$out_dir/$name.meta.json" "${HK_MAX_TEX:-4096}" "${HK_TARGET_TRIS:-600000}" \
  > "$log_dir/convert-$name.log" 2>&1
if [ $? -ne 0 ] || [ ! -f "$out_dir/$name.glb" ]; then
  echo "FAIL $name (blender)"
  exit 1
fi

# UASTC level 2 + RDO + zstd is the sweet spot: visually clean on
# photogrammetry, ~1 bpp on disk. Draco is re-applied afterwards because
# gltf-transform decodes the mesh while rewriting textures.
bunx @gltf-transform/cli uastc "$out_dir/$name.glb" "$out_dir/$name.glb" \
  --level "${HK_UASTC_LEVEL:-2}" --rdo --zstd 18 --jobs "${HK_UASTC_JOBS:-8}" \
  >> "$log_dir/convert-$name.log" 2>&1 \
&& bunx @gltf-transform/cli draco "$out_dir/$name.glb" "$out_dir/$name.glb" \
  >> "$log_dir/convert-$name.log" 2>&1
if [ $? -ne 0 ]; then
  echo "FAIL $name (ktx2)"
  exit 1
fi

# Refresh glbBytes in the sidecar meta now that post-processing changed the file.
python3 - "$out_dir/$name.glb" "$out_dir/$name.meta.json" <<'EOF' >> "$log_dir/convert-$name.log" 2>&1
import json, os, sys
glb, meta_path = sys.argv[1], sys.argv[2]
with open(meta_path) as f:
    meta = json.load(f)
meta["glbBytes"] = os.path.getsize(glb)
with open(meta_path, "w") as f:
    json.dump(meta, f, indent=2)
EOF

echo "OK $name"
