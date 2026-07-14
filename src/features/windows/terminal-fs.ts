// In-memory fake filesystem for Terminal.app. A module-level singleton so
// deletions survive closing/reopening the terminal window (until reload).
// Files can carry an `appId` linking them to a desktop app: `open` launches
// it, `rm` removes its icon from the desktop and dock.

import { profile } from "@/data/profile"
import { projects } from "@/data/projects"

export interface FsFile {
  type: "file"
  content: string
  appId?: string
}

export interface FsDir {
  type: "dir"
  children: Record<string, FsNode>
  appId?: string
}

export type FsNode = FsFile | FsDir

const d = (children: Record<string, FsNode>, appId?: string): FsDir => ({ type: "dir", children, appId })
const f = (content: string, appId?: string): FsFile => ({ type: "file", content, appId })

export const HOME = "/Users/david"

function seed(): FsDir {
  return d({
    Applications: d({
      "Tuner.app": f("Mach-O executable ppc", "tuner"),
      "Chords.app": f("Mach-O executable ppc", "chords"),
      "Snippets.app": f("Mach-O executable ppc", "snippets"),
      "Terminal.app": f("Mach-O executable ppc", "terminal"),
      "CausewayBay.app": f("Mach-O executable ppc", "cityviewer"),
    }),
    Users: d({
      david: d({
        Desktop: d({
          "About Me.txt": f(`${profile.about}\n\n${profile.tagline}`, "about"),
          Projects: d(
            Object.fromEntries(
              projects.map((p) => [`${p.id}.md`, f(`# ${p.title} (${p.date})\n\n${p.description}`)]),
            ),
            "projects",
          ),
          "Contact.txt": f(
            `Email   ${profile.links.email}\nGitHub  ${profile.links.github}\nWeChat  ${profile.links.wechat}`,
            "contact",
          ),
          "Resume.pdf": f("%PDF-1.7 (binary)", "resume"),
        }),
        Music: d({
          "riff-ideas.txt": f("Em  G  D  C  ×4，副歌抬到 Am，还没想好怎么收尾"),
          "practice-log.txt": f("周一：大横按 30 分钟，手指疼\n周二：还是疼\n周三：F 和弦按响了！！"),
        }),
        ".plan": f("1. build cool stuff\n2. play guitar\n3. goto 1"),
      }),
    }),
    etc: d({
      motd: f("Welcome to hidaviddongOS."),
    }),
    bin: d({
      zsh: f("Mach-O executable ppc"),
      ls: f("Mach-O executable ppc"),
      cat: f("Mach-O executable ppc"),
      rm: f("Mach-O executable ppc"),
    }),
  })
}

export const root: FsDir = seed()

// "~/x", "../x", "a/b", "/a/b" → normalized absolute path.
export function resolvePath(cwd: string, input: string): string {
  const raw = input === "~" ? HOME : input.startsWith("~/") ? HOME + input.slice(1) : input
  const base = raw.startsWith("/") ? [] : cwd.split("/").filter(Boolean)
  for (const part of raw.split("/")) {
    if (!part || part === ".") continue
    if (part === "..") base.pop()
    else base.push(part)
  }
  return "/" + base.join("/")
}

export function getNode(path: string): FsNode | null {
  let node: FsNode = root
  for (const part of path.split("/").filter(Boolean)) {
    if (node.type !== "dir" || !(part in node.children)) return null
    node = node.children[part]
  }
  return node
}

export function parentOf(path: string): { dir: FsDir; name: string } | null {
  const parts = path.split("/").filter(Boolean)
  const name = parts.pop()
  if (!name) return null
  const parent = getNode("/" + parts.join("/"))
  return parent?.type === "dir" ? { dir: parent, name } : null
}

// Removes a node and returns every appId that lived under it.
export function removeNode(path: string): { removed: boolean; appIds: string[] } {
  const p = parentOf(path)
  const node = p && p.dir.children[p.name]
  if (!p || !node) return { removed: false, appIds: [] }
  delete p.dir.children[p.name]
  return { removed: true, appIds: collectAppIds(node) }
}

export function collectAppIds(node: FsNode): string[] {
  const ids = node.appId ? [node.appId] : []
  if (node.type === "dir") {
    for (const child of Object.values(node.children)) ids.push(...collectAppIds(child))
  }
  return ids
}

// Every path in the tree, deepest first — fodder for the rm -rf / animation.
export function allPaths(): string[] {
  const out: string[] = []
  const walk = (node: FsNode, path: string) => {
    if (node.type === "dir") {
      for (const [name, child] of Object.entries(node.children)) walk(child, `${path}/${name}`)
    }
    if (path) out.push(path)
  }
  walk(root, "")
  return out
}

// Display path with ~ for the home directory (like zsh's %~).
export function prettyPath(path: string): string {
  if (path === HOME) return "~"
  return path.startsWith(HOME + "/") ? "~" + path.slice(HOME.length) : path
}
