import { useEffect, useRef, useState } from "react"
import { useDesktopServices } from "@/features/desktop/DesktopServices"
import {
  HOME,
  root,
  getNode,
  resolvePath,
  removeNode,
  allPaths,
  collectAppIds,
  prettyPath,
} from "./terminal-fs"

interface Line {
  text: string
  kind: "cmd" | "out" | "err"
}

const COMMANDS = [
  "help", "ls", "cd", "pwd", "cat", "open", "rm", "mkdir", "touch",
  "echo", "clear", "whoami", "date", "uname", "history", "neofetch", "sudo", "exit",
]

const USER = "david"
const HOST = "hidaviddong"

function tokenize(raw: string): string[] {
  const out: string[] = []
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g
  let m
  while ((m = re.exec(raw))) out.push(m[1] ?? m[2] ?? m[3])
  return out
}

// Resolve an argument to an existing path; bare filenames fall back to
// ~/Desktop and /Applications (case-insensitive) so `open tuner.app` or
// `rm Resume.pdf` just work without cd-ing around first.
function findTarget(cwd: string, arg: string): string | null {
  const direct = resolvePath(cwd, arg)
  if (getNode(direct)) return direct
  if (arg.includes("/")) return null
  for (const dir of [`${HOME}/Desktop`, "/Applications"]) {
    const parent = getNode(dir)
    if (parent?.type !== "dir") continue
    const hit = Object.keys(parent.children).find((n) => n.toLowerCase() === arg.toLowerCase())
    if (hit) return `${dir}/${hit}`
  }
  return null
}

const NEOFETCH = String.raw`
         ,MMMM.       ${USER}@${HOST}
       .MMMMMM        -----------------
       MMMMM,         OS: hidaviddongOS X 10.4 "Aqua"
.MMMMMMMMMMMMMMM.     Host: daviddong.me (est. 1999)
MMMMMMMMMMMMMMMMM     Shell: zsh 5.9
MMMMMMMMMMMMMMMM      Resolution: ${typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "?"}
MMMMMMMMMMMMMMMMM     Uptime: since 1999
 MMMMMMMMMMMMMMMMM    Packages: 4 (/Applications)
  MMMMMMMMMMMMMMM
    'MMMMMMMMM'`

export function TerminalWindow() {
  const services = useDesktopServices()
  const [lines, setLines] = useState<Line[]>([
    {
      text: `Last login: ${new Date().toDateString()} on ttys000`,
      kind: "out",
    },
  ])
  const [input, setInput] = useState("")
  const [cwd, setCwd] = useState(HOME)
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  // True while the rm -rf / animation runs; input is disabled.
  const [dying, setDying] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => {
    inputRef.current?.focus()
    const t = timers.current
    return () => t.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines])

  const promptBase = cwd === HOME ? "~" : (cwd.split("/").filter(Boolean).pop() ?? "/")
  const prompt = `${USER}@${HOST} ${promptBase} %`

  function print(text: string, kind: Line["kind"] = "out") {
    setLines((l) => [...l, ...text.split("\n").map((t) => ({ text: t, kind }))])
  }

  // The grand finale: spew rm lines, strip the desktop bare, then panic.
  function doom() {
    setDying(true)
    const paths = allPaths()
    const appAt = new Map(paths.map((p) => [p, getNode(p)?.appId]))
    let i = 0
    const tick = window.setInterval(() => {
      const batch = paths.slice(i, i + 4)
      if (batch.length === 0) {
        window.clearInterval(tick)
        root.children = {}
        print("removed '/'")
        timers.current.push(window.setTimeout(() => services?.crash(), 900))
        return
      }
      batch.forEach((p) => {
        print(`removed '${p}'`)
        const appId = appAt.get(p)
        if (appId && appId !== "terminal") services?.removeApp(appId)
      })
      i += 4
    }, 60)
    timers.current.push(tick)
  }

  function exec(raw: string) {
    setLines((l) => [...l, { text: `${prompt} ${raw}`, kind: "cmd" }])
    const trimmed = raw.trim()
    if (!trimmed) return
    setHistory((h) => [...h, trimmed])
    setHistIdx(-1)

    const tokens = tokenize(trimmed)
    const cmd = tokens[0]
    const flags = tokens.slice(1).filter((t) => t.startsWith("-"))
    const args = tokens.slice(1).filter((t) => !t.startsWith("-"))
    // Single-path commands: unquoted names with spaces ("About Me.txt") work.
    const joined = args.join(" ")

    switch (cmd) {
      case "help":
        print(
          [
            "ls  cd  pwd  cat  open  rm  mkdir  touch",
            "echo  clear  whoami  date  uname  history  neofetch  exit",
          ].join("\n"),
        )
        break

      case "ls": {
        const path = joined ? findTarget(cwd, joined) : cwd
        const node = path ? getNode(path) : null
        if (!node) {
          print(`ls: ${joined}: No such file or directory`, "err")
          break
        }
        if (node.type === "file") {
          print(joined)
          break
        }
        const names = Object.keys(node.children)
          .filter((n) => flags.some((f) => f.includes("a")) || !n.startsWith("."))
          .sort()
          .map((n) => (node.children[n].type === "dir" ? `${n}/` : n))
        if (flags.some((f) => f.includes("l"))) {
          names.forEach((n) =>
            print(`${n.endsWith("/") ? "drwxr-xr-x" : "-rw-r--r--"}  ${USER}  staff  ${n}`),
          )
        } else {
          print(names.join("   ") || "")
        }
        break
      }

      case "cd": {
        const path = resolvePath(cwd, joined || "~")
        const node = getNode(path)
        if (!node) print(`cd: no such file or directory: ${joined}`, "err")
        else if (node.type !== "dir") print(`cd: not a directory: ${joined}`, "err")
        else setCwd(path)
        break
      }

      case "pwd":
        print(cwd)
        break

      case "cat": {
        if (!joined) {
          print("usage: cat <file>", "err")
          break
        }
        const path = findTarget(cwd, joined)
        const node = path ? getNode(path) : null
        if (!node) print(`cat: ${joined}: No such file or directory`, "err")
        else if (node.type === "dir") print(`cat: ${joined}: Is a directory`, "err")
        else print(node.content)
        break
      }

      case "open": {
        if (!joined) {
          print("usage: open <file | app>", "err")
          break
        }
        const path = findTarget(cwd, joined)
        const node = path ? getNode(path) : null
        if (!node) {
          print(`open: ${joined}: No such file or directory`, "err")
        } else if (node.appId) {
          services?.openApp(node.appId)
        } else {
          print(`open: no application knows how to open ${joined}`, "err")
        }
        break
      }

      case "rm": {
        const recursive = flags.some((f) => f.includes("r"))
        if (!joined) {
          print("usage: rm [-rf] <path>", "err")
          break
        }
        if (resolvePath(cwd, joined) === "/") {
          if (recursive) doom()
          else print("rm: /: is a directory", "err")
          break
        }
        const path = findTarget(cwd, joined)
        const node = path ? getNode(path) : null
        if (!path || !node) {
          print(`rm: ${joined}: No such file or directory`, "err")
          break
        }
        if (node.type === "dir" && !recursive) {
          print(`rm: ${prettyPath(path)}: is a directory`, "err")
          break
        }
        const wasTerminal = collectAppIds(node).includes("terminal")
        const { appIds } = removeNode(path)
        appIds.filter((id) => id !== "terminal").forEach((id) => services?.removeApp(id))
        if (wasTerminal) {
          timers.current.push(
            window.setTimeout(() => {
              services?.removeApp("terminal")
              services?.closeWindow("terminal")
            }, 600),
          )
        }
        break
      }

      case "mkdir": {
        if (!joined) {
          print("usage: mkdir <dir>", "err")
          break
        }
        const path = resolvePath(cwd, joined)
        const parts = path.split("/").filter(Boolean)
        const name = parts.pop()!
        const parent = getNode("/" + parts.join("/"))
        if (parent?.type !== "dir") print(`mkdir: ${joined}: No such file or directory`, "err")
        else if (parent.children[name]) print(`mkdir: ${joined}: File exists`, "err")
        else parent.children[name] = { type: "dir", children: {} }
        break
      }

      case "touch": {
        if (!joined) {
          print("usage: touch <file>", "err")
          break
        }
        const path = resolvePath(cwd, joined)
        const parts = path.split("/").filter(Boolean)
        const name = parts.pop()!
        const parent = getNode("/" + parts.join("/"))
        if (parent?.type !== "dir") print(`touch: ${joined}: No such file or directory`, "err")
        else parent.children[name] ??= { type: "file", content: "" }
        break
      }

      case "echo":
        print(joined)
        break

      case "clear":
        setLines([])
        break

      case "whoami":
        print(USER)
        break

      case "date":
        print(new Date().toString())
        break

      case "uname":
        print(
          flags.some((f) => f.includes("a"))
            ? `Darwin ${HOST}.local 8.11.0 Darwin Kernel Version 8.11.0 Power Macintosh`
            : "Darwin",
        )
        break

      case "history":
        history.forEach((h, i) => print(`  ${i + 1}  ${h}`))
        break

      case "neofetch":
        print(NEOFETCH.replace(/^\n/, ""))
        break

      case "sudo":
        print(`${USER} is not in the sudoers file. This incident will be reported.`, "err")
        break

      case "exit":
        services?.closeWindow("terminal")
        break

      default:
        print(`zsh: command not found: ${cmd}`, "err")
    }
  }

  // Tab-complete the last token: command names first, then paths in cwd.
  function complete() {
    const parts = input.split(" ")
    const last = parts[parts.length - 1]
    if (parts.length === 1) {
      const hits = COMMANDS.filter((c) => c.startsWith(last))
      if (hits.length === 1) setInput(`${hits[0]} `)
      else if (hits.length > 1 && last) print(hits.join("   "))
      return
    }
    const slash = last.lastIndexOf("/")
    const dirPart = slash >= 0 ? last.slice(0, slash + 1) : ""
    const namePart = slash >= 0 ? last.slice(slash + 1) : last
    const dirNode = getNode(resolvePath(cwd, dirPart || "."))
    if (dirNode?.type !== "dir") return
    const hits = Object.keys(dirNode.children).filter((n) => n.startsWith(namePart))
    if (hits.length === 1) {
      const isDir = dirNode.children[hits[0]].type === "dir"
      parts[parts.length - 1] = dirPart + hits[0] + (isDir ? "/" : "")
      setInput(parts.join(" "))
    } else if (hits.length > 1) {
      print(hits.join("   "))
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      exec(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const idx = histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1)
      if (history[idx] !== undefined) {
        setHistIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx === -1) return
      const idx = histIdx + 1
      if (idx >= history.length) {
        setHistIdx(-1)
        setInput("")
      } else {
        setHistIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      complete()
    } else if (e.key === "c" && e.ctrlKey) {
      setLines((l) => [...l, { text: `${prompt} ${input}^C`, kind: "cmd" }])
      setInput("")
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div
      ref={scrollRef}
      onMouseUp={() => {
        if (!window.getSelection()?.toString()) inputRef.current?.focus()
      }}
      className="box-border min-h-0 w-full flex-1 cursor-text overflow-y-auto bg-[var(--terminal-bg)] p-3 font-mono2 text-[13px] leading-[1.6]"
      style={{ colorScheme: "dark" }}
    >
      {lines.map((l, i) => (
        <div
          key={i}
          className={
            l.kind === "cmd"
              ? "whitespace-pre-wrap text-terminal-green"
              : l.kind === "err"
                ? "whitespace-pre-wrap text-[#ff6b6b]"
                : "whitespace-pre-wrap text-white/75"
          }
        >
          {l.text || " "}
        </div>
      ))}
      {!dying && (
        <div className="flex items-center gap-1.5">
          <span className="whitespace-nowrap text-terminal-green">{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            className="min-w-0 flex-1 border-none bg-transparent p-0 font-mono2 text-[13px] text-white/90 caret-terminal-green outline-none"
          />
        </div>
      )}
    </div>
  )
}
