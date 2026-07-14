# Builds the stylised Hong Kong urban taxi (Toyota Crown Comfort vibes: red
# body, silver roof, rooftop TAXI sign) and exports it for the CityViewer.
#
#   /Applications/Blender.app/Contents/MacOS/Blender -b -P scripts/build_hk_taxi.py -- \
#     <out.glb> [render_dir]
#
# Authoring conventions the runtime relies on:
#   - real-world metres, ground at z=0, car centred at origin, front = -Y
#     (which the glTF exporter turns into three.js +Z, the drive code's nose)
#   - wheels are separate objects named WheelFL/WheelFR/WheelRL/WheelRR with
#     origins at wheel centres, so the runtime can spin and steer them
import math
import sys

import bmesh
import bpy
from mathutils import Vector

argv = sys.argv[sys.argv.index("--") + 1 :]
out_glb = argv[0]
render_dir = argv[1] if len(argv) > 1 else None

bpy.ops.wm.read_factory_settings(use_empty=True)


def srgb(hexcolor):
    r = ((hexcolor >> 16) & 0xFF) / 255
    g = ((hexcolor >> 8) & 0xFF) / 255
    b = (hexcolor & 0xFF) / 255
    return tuple(c**2.2 for c in (r, g, b))


def make_mat(name, hexcolor, metallic=0.0, rough=0.5, emit=0.0):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    bsdf = m.node_tree.nodes["Principled BSDF"]
    color = (*srgb(hexcolor), 1.0)
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = rough
    if emit and "Emission Color" in bsdf.inputs:
        bsdf.inputs["Emission Color"].default_value = color
        bsdf.inputs["Emission Strength"].default_value = emit
    m.diffuse_color = color  # Workbench/viewport fallback
    return m


MAT_RED = make_mat("taxi-red", 0xC81422, metallic=0.15, rough=0.32)
MAT_SILVER = make_mat("roof-silver", 0xD9DDE2, metallic=0.55, rough=0.38)
MAT_GLASS = make_mat("glass", 0x10161C, metallic=0.6, rough=0.12)
MAT_CHROME = make_mat("chrome", 0xC7CCD2, metallic=0.8, rough=0.28)
MAT_RUBBER = make_mat("rubber", 0x16181A, rough=0.9)
MAT_HUB = make_mat("hubcap", 0xB6BBC1, metallic=0.7, rough=0.35)
MAT_DARK = make_mat("trim-dark", 0x1E2126, rough=0.6)
MAT_SIGN = make_mat("sign-white", 0xF4F2EA, rough=0.4, emit=0.25)
MAT_TEXT = make_mat("sign-red", 0xB01018, rough=0.4)
MAT_HEAD = make_mat("headlight", 0xE9E9D2, rough=0.25, emit=0.6)
MAT_TAIL = make_mat("taillight", 0x99101A, rough=0.3, emit=0.4)


def finish_object(obj, mat, bevel=0.0):
    obj.data.materials.append(mat)
    if bevel > 0:
        bpy.context.view_layer.objects.active = obj
        mod = obj.modifiers.new("bev", "BEVEL")
        mod.width = bevel
        mod.segments = 2
        bpy.ops.object.modifier_apply(modifier="bev")


def hexa(name, bottom, top, mat, bevel=0.03):
    """Box from 4 bottom + 4 top corners, each (x, y, z); order fl, fr, rr, rl."""
    mesh = bpy.data.meshes.new(name)
    faces = [(0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)]
    mesh.from_pydata([*bottom, *top], [], faces)
    bm = bmesh.new()
    bm.from_mesh(mesh)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.scene.collection.objects.link(obj)
    finish_object(obj, mat, bevel)
    return obj


def slab(name, x0, x1, y0, y1, z0, z1, mat, bevel=0.03):
    return hexa(
        name,
        [(x0, y0, z0), (x1, y0, z0), (x1, y1, z0), (x0, y1, z0)],
        [(x0, y0, z1), (x1, y0, z1), (x1, y1, z1), (x0, y1, z1)],
        mat,
        bevel,
    )


# --- body: three-box sedan, front = -Y ------------------------------------
# Hood (slight rake on the leading edge).
hexa(
    "Hood",
    [(-0.80, -2.30, 0.34), (0.80, -2.30, 0.34), (0.82, -1.00, 0.34), (-0.82, -1.00, 0.34)],
    [(-0.78, -2.20, 0.78), (0.78, -2.20, 0.78), (0.82, -1.00, 0.80), (-0.82, -1.00, 0.80)],
    MAT_RED,
    bevel=0.045,
)
# Main body up to the beltline.
slab("Body", -0.85, 0.85, -1.10, 1.42, 0.32, 0.86, MAT_RED, bevel=0.045)
# Boot with a raked tail.
hexa(
    "Boot",
    [(-0.82, 1.32, 0.34), (0.82, 1.32, 0.34), (0.80, 2.32, 0.34), (-0.80, 2.32, 0.34)],
    [(-0.82, 1.32, 0.80), (0.82, 1.32, 0.80), (0.78, 2.24, 0.76), (-0.78, 2.24, 0.76)],
    MAT_RED,
    bevel=0.045,
)
# Glasshouse: raked windscreen and rear glass, tumblehome at the top.
hexa(
    "Cabin",
    [(-0.80, -1.02, 0.86), (0.80, -1.02, 0.86), (0.80, 1.36, 0.86), (-0.80, 1.36, 0.86)],
    [(-0.70, -0.68, 1.44), (0.70, -0.68, 1.44), (0.70, 1.10, 1.44), (-0.70, 1.10, 1.44)],
    MAT_GLASS,
    bevel=0.02,
)
slab("Roof", -0.72, 0.72, -0.74, 1.16, 1.44, 1.52, MAT_SILVER, bevel=0.025)

# --- rooftop TAXI sign ------------------------------------------------------
slab("Sign", -0.17, 0.17, -0.42, -0.10, 1.52, 1.66, MAT_SIGN, bevel=0.015)


def sign_text(name, y, flip):
    bpy.ops.object.text_add(location=(0, y, 1.588))
    txt = bpy.context.active_object
    txt.name = name
    txt.data.body = "TAXI"
    txt.data.size = 0.082
    txt.data.extrude = 0.004
    txt.data.align_x = "CENTER"
    txt.data.align_y = "CENTER"
    txt.rotation_euler = (math.pi / 2, 0, math.pi if flip else 0)
    bpy.ops.object.convert(target="MESH")
    txt = bpy.context.active_object
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    txt.data.materials.append(MAT_TEXT)
    return txt


sign_text("SignTextFront", -0.425, flip=False)
sign_text("SignTextRear", -0.095, flip=True)

# --- details ----------------------------------------------------------------
slab("BumperF", -0.86, 0.86, -2.42, -2.26, 0.30, 0.50, MAT_CHROME, bevel=0.03)
slab("BumperR", -0.86, 0.86, 2.26, 2.42, 0.30, 0.50, MAT_CHROME, bevel=0.03)
slab("Grille", -0.55, 0.55, -2.325, -2.28, 0.52, 0.70, MAT_DARK, bevel=0.01)
slab("HeadlightL", -0.76, -0.52, -2.33, -2.29, 0.54, 0.70, MAT_HEAD, bevel=0.01)
slab("HeadlightR", 0.52, 0.76, -2.33, -2.29, 0.54, 0.70, MAT_HEAD, bevel=0.01)
slab("TaillightL", -0.78, -0.54, 2.29, 2.335, 0.50, 0.66, MAT_TAIL, bevel=0.01)
slab("TaillightR", 0.54, 0.78, 2.29, 2.335, 0.50, 0.66, MAT_TAIL, bevel=0.01)
slab("MirrorL", -0.92, -0.82, -0.96, -0.86, 0.96, 1.06, MAT_DARK, bevel=0.012)
slab("MirrorR", 0.82, 0.92, -0.96, -0.86, 0.96, 1.06, MAT_DARK, bevel=0.012)

# --- wheels (named for the runtime; origins at wheel centres) ---------------
WHEEL_R = 0.31
WHEEL_W = 0.19


def wheel(name, x, y):
    bpy.ops.mesh.primitive_cylinder_add(radius=WHEEL_R, depth=WHEEL_W, vertices=24, location=(x, y, WHEEL_R))
    w = bpy.context.active_object
    w.name = name
    w.rotation_euler = (0, math.pi / 2, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    w.data.materials.append(MAT_RUBBER)

    side = 1 if x > 0 else -1
    bpy.ops.mesh.primitive_cylinder_add(
        radius=0.16, depth=0.02, vertices=18, location=(x + side * (WHEEL_W / 2), y, WHEEL_R)
    )
    hub = bpy.context.active_object
    hub.rotation_euler = (0, math.pi / 2, 0)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    hub.data.materials.append(MAT_HUB)

    bpy.ops.object.select_all(action="DESELECT")
    hub.select_set(True)
    w.select_set(True)
    bpy.context.view_layer.objects.active = w  # join keeps w's name + origin
    bpy.ops.object.join()
    return w


wheel("WheelFL", -0.72, -1.39)
wheel("WheelFR", 0.72, -1.39)
wheel("WheelRL", -0.72, 1.39)
wheel("WheelRR", 0.72, 1.39)

# --- export -----------------------------------------------------------------
desired = dict(filepath=out_glb, export_format="GLB", export_apply=True)
supported = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
bpy.ops.export_scene.gltf(**{k: v for k, v in desired.items() if k in supported})
print(f"[build_hk_taxi] wrote {out_glb}")

# --- validation renders ------------------------------------------------------
if render_dir:
    sun = bpy.data.objects.new("sun", bpy.data.lights.new("sun", "SUN"))
    sun.data.energy = 3.5
    sun.rotation_euler = (math.radians(50), 0, math.radians(35))
    bpy.context.scene.collection.objects.link(sun)

    world = bpy.data.worlds.new("world")
    world.use_nodes = True
    bg = world.node_tree.nodes["Background"]
    bg.inputs[0].default_value = (0.82, 0.85, 0.88, 1)
    bg.inputs[1].default_value = 1.0
    bpy.context.scene.world = world

    cam_data = bpy.data.cameras.new("cam")
    cam = bpy.data.objects.new("cam", cam_data)
    bpy.context.scene.collection.objects.link(cam)
    bpy.context.scene.camera = cam

    scene = bpy.context.scene
    for engine in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE", "BLENDER_WORKBENCH"):
        try:
            scene.render.engine = engine
            break
        except TypeError:
            continue
    scene.render.resolution_x = 1100
    scene.render.resolution_y = 800

    look = Vector((0, 0.1, 0.62))
    for label, loc in (("front", Vector((-4.4, -5.2, 2.3))), ("rear", Vector((4.2, 5.6, 2.2)))):
        cam.location = loc
        cam.rotation_euler = (look - loc).to_track_quat("-Z", "Y").to_euler()
        scene.render.filepath = f"{render_dir}/taxi-{label}.png"
        bpy.ops.render.render(write_still=True)
        print(f"[build_hk_taxi] rendered {scene.render.filepath}")
