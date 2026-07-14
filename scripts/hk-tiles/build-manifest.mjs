// Merges per-tile .meta.json files (written by convert_tile.py) into the
// manifest.json the CityViewer runtime streams tiles from.
//   node scripts/hk-tiles/build-manifest.mjs
import { readdir, readFile, writeFile } from "node:fs/promises"

const dir = new URL("../../public/models/hk-tiles/", import.meta.url)
const files = (await readdir(dir)).filter((f) => f.endsWith(".meta.json")).sort()

const tiles = []
for (const f of files) {
  const m = JSON.parse(await readFile(new URL(f, dir), "utf8"))
  tiles.push({ name: m.tile, url: m.glb, min: m.bboxThreeMin, max: m.bboxThreeMax })
}

const min = [Infinity, Infinity, Infinity]
const max = [-Infinity, -Infinity, -Infinity]
for (const t of tiles) {
  for (let i = 0; i < 3; i++) {
    min[i] = Math.min(min[i], t.min[i])
    max[i] = Math.max(max[i], t.max[i])
  }
}

const manifest = { generated: new Date().toISOString(), min, max, tiles }
await writeFile(new URL("manifest.json", dir), JSON.stringify(manifest, null, 2))
console.log(`[build-manifest] ${tiles.length} tiles, sheet ${Math.round(max[0] - min[0])}m x ${Math.round(max[2] - min[2])}m`)
