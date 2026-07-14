# Headless validation render of a converted GLB tile.
#   Blender -b -P scripts/hk-tiles/render_glb.py -- <in.glb> <out.png> [aerial|street]
import bpy
import sys
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1 :]
glb_path, out_png = argv[0], argv[1]
mode = argv[2] if len(argv) > 2 else "aerial"

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=glb_path)

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
    # Low oblique near the ground at the tile centre.
    cam.location = center + Vector((-60, 40, -60))
    look = Vector((center.x, bmin.y + 5, center.z))
else:
    cam.location = center + Vector((-size * 0.45, size * 0.5, size * 0.45))
    look = center
cam.rotation_euler = (look - cam.location).to_track_quat("-Z", "Y").to_euler()
cam_data.clip_end = size * 4

scene = bpy.context.scene
scene.render.engine = "BLENDER_WORKBENCH"
shading = scene.display.shading
shading.light = "FLAT"
shading.color_type = "TEXTURE"
scene.render.resolution_x = 1280
scene.render.resolution_y = 960
scene.render.filepath = out_png
bpy.ops.render.render(write_still=True)
print(f"[render_glb] wrote {out_png}")
