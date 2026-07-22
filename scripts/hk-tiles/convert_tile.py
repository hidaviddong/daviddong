# Converts one HK photogrammetry OBJ tile into a web-ready GLB.
#
# Run headless:
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/hk-tiles/convert_tile.py -- \
#     <in.obj> <out.glb> <out.meta.json> <max_texture_px> <target_triangles>
#
# The source tiles (Lands Department 3D photo-realistic model, sheet 11-SW-15B)
# are 3ds Max OBJ exports: z-up, vertices in HK1980 grid metres minus 800000,
# ~0.5-1M triangles and 8192px JPEG atlases per tile — ~200MB each. Output is
# a Draco-compressed GLB whose textures keep their source format (JPEG/PNG,
# 4096px by default) — an intermediate that convert-one.sh immediately
# recompresses to KTX2/UASTC GPU textures (toktx reads JPEG/PNG, not WebP).

import bpy
import json
import os
import sys
import time
from mathutils import Vector


def log(msg):
    print(f"[convert_tile] {msg}", flush=True)


def main():
    argv = sys.argv[sys.argv.index("--") + 1 :]
    obj_path, out_glb, out_meta = argv[0], argv[1], argv[2]
    max_tex = int(argv[3])
    target_tris = int(argv[4])

    t0 = time.time()
    bpy.ops.wm.read_factory_settings(use_empty=True)

    # Source files are z-up (3ds Max convention: big X/Y grid coords, small Z
    # heights), so import with an identity axis mapping into z-up Blender.
    bpy.ops.wm.obj_import(filepath=obj_path, forward_axis="Y", up_axis="Z")

    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    if not meshes:
        raise RuntimeError(f"no meshes imported from {obj_path}")

    bpy.ops.object.select_all(action="DESELECT")
    for o in meshes:
        o.select_set(True)
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1:
        bpy.ops.object.join()
    obj = bpy.context.view_layer.objects.active

    mesh = obj.data
    mesh.calc_loop_triangles()
    tris_in = len(mesh.loop_triangles)

    ratio = min(1.0, target_tris / max(tris_in, 1))
    if ratio < 0.98:
        log(f"decimating {tris_in} tris by {ratio:.3f}")
        mod = obj.modifiers.new("dec", "DECIMATE")
        mod.ratio = ratio
        bpy.ops.object.modifier_apply(modifier="dec")

    mesh = obj.data
    mesh.calc_loop_triangles()
    tris_out = len(mesh.loop_triangles)

    for img in bpy.data.images:
        w, h = img.size
        if max(w, h) > max_tex:
            f = max_tex / max(w, h)
            img.scale(max(1, round(w * f)), max(1, round(h * f)))
    log(f"scaled {len(bpy.data.images)} images to <= {max_tex}px")

    # World-space bbox in Blender coords (z-up). The glTF exporter maps
    # Blender (x, y, z) -> glTF/three (x, z, -y).
    corners = [obj.matrix_world @ Vector(c) for c in obj.bound_box]
    bmin = [min(c[i] for c in corners) for i in range(3)]
    bmax = [max(c[i] for c in corners) for i in range(3)]
    three_min = [bmin[0], bmin[2], -bmax[1]]
    three_max = [bmax[0], bmax[2], -bmin[1]]

    desired = dict(
        filepath=out_glb,
        export_format="GLB",
        export_image_format="AUTO",  # keep JPEG/PNG; toktx can't read WebP
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_yup=True,
        export_apply=True,
        export_normals=False,  # photogrammetry renders unlit; drop if unsupported
        export_skins=False,
        export_animations=False,
        export_morph=False,
    )
    supported = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
    kwargs = {k: v for k, v in desired.items() if k in supported}
    dropped = sorted(set(desired) - set(kwargs))
    if dropped:
        log(f"exporter does not support: {dropped}")
    bpy.ops.export_scene.gltf(**kwargs)

    meta = {
        "tile": os.path.splitext(os.path.basename(obj_path))[0],
        "glb": os.path.basename(out_glb),
        "trisIn": tris_in,
        "trisOut": tris_out,
        "bboxThreeMin": three_min,
        "bboxThreeMax": three_max,
        "glbBytes": os.path.getsize(out_glb),
        "seconds": round(time.time() - t0, 1),
    }
    with open(out_meta, "w") as f:
        json.dump(meta, f, indent=2)
    log(f"done: {meta}")


main()
