# Renders every converted GLB tile assembled into one scene — checks that the
# shared-origin tiles actually line up seam-free.
#   Blender -b -P scripts/hk-tiles/render_city.py -- <tiles_dir> <out.png> [aerial|street]
import glob
import os
import sys

import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1 :]
tiles_dir, out_png = argv[0], argv[1]
mode = argv[2] if len(argv) > 2 else "aerial"

bpy.ops.wm.read_factory_settings(use_empty=True)
for glb in sorted(glob.glob(os.path.join(tiles_dir, "*.glb"))):
    bpy.ops.import_scene.gltf(filepath=glb)

corners = []
for o in bpy.context.scene.objects:
    if o.type == "MESH":
        corners.extend(o.matrix_world @ Vector(c) for c in o.bound_box)
bmin = Vector(min(c[i] for c in corners) for i in range(3))
bmax = Vector(max(c[i] for c in corners) for i in range(3))
center = (bmin + bmax) / 2
size = (bmax - bmin).length

cam_data = bpy.data.cameras.new("cam")
cam = bpy.data.objects.new("cam", cam_data)
bpy.context.scene.collection.objects.link(cam)
bpy.context.scene.camera = cam

if mode == "street":
    cam.location = Vector((center.x + 30, bmin.y + 12, center.z + 30))
    look = Vector((center.x - 60, bmin.y + 6, center.z - 60))
else:
    cam.location = center + Vector((-size * 0.42, size * 0.55, size * 0.42))
    look = center
cam.rotation_euler = (look - cam.location).to_track_quat("-Z", "Y").to_euler()
cam_data.clip_end = size * 5

scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
scene.display.shading.light = "FLAT"
scene.display.shading.color_type = "TEXTURE"
scene.render.resolution_x = 1600
scene.render.resolution_y = 1100
scene.render.filepath = out_png
bpy.ops.render.render(write_still=True)
print(f"[render_city] wrote {out_png}")
