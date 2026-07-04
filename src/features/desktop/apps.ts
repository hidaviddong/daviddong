import { lazy, type ComponentType, type CSSProperties } from "react"
import { ProjectsWindow } from "@/features/windows/ProjectsWindow"
import { ContactWindow } from "@/features/windows/ContactWindow"
import { ResumeWindow } from "@/features/windows/ResumeWindow"
import { TerminalWindow } from "@/features/windows/TerminalWindow"
import { SnippetsWindow } from "@/features/windows/SnippetsWindow"

// Tuner and Chords pull in heavy deps (Tone.js, pitchy, chords-db), so they
// are code-split: `import()` makes Vite emit a separate chunk per window,
// fetched only when the app is first opened. `lazy()` expects a default
// export, hence the `.then()` mapping for named exports.
const TunerWindow = lazy(() =>
  import("@/features/windows/TunerWindow").then((m) => ({ default: m.TunerWindow })),
)
const ChordsWindow = lazy(() =>
  import("@/features/windows/ChordsWindow").then((m) => ({ default: m.ChordsWindow })),
)
import {
  DocumentIcon,
  FolderIcon,
  MovieIcon,
  MailIcon,
  PdfIcon,
  TerminalIcon,
  TunerIcon,
  ChordIcon,
  type IconProps,
} from "./icons"

// A single app / window definition shown on the desktop and dock.
export interface AppDef {
  id: string
  title: string
  Icon: ComponentType<IconProps>
  label: string
  width: number
  // Fixed default height (windows without one hug their content).
  height?: number
  // Overrides for the window content area, e.g. edge-to-edge chrome.
  contentStyle?: CSSProperties
  Content: ComponentType
}

export const APPS: Record<string, AppDef> = {
  projects: {
    id: "projects",
    title: "Projects",
    Icon: FolderIcon,
    label: "Projects",
    width: 420,
    Content: ProjectsWindow,
  },
  snippets: {
    id: "snippets",
    title: "Snippets.app",
    Icon: MovieIcon,
    label: "Snippets",
    width: 390,
    Content: SnippetsWindow,
  },
  contact: {
    id: "contact",
    title: "Contact.txt",
    Icon: MailIcon,
    label: "Contact",
    width: 340,
    Content: ContactWindow,
  },
  resume: {
    id: "resume",
    title: "Resume.pdf",
    Icon: PdfIcon,
    label: "Resume",
    width: 470,
    Content: ResumeWindow,
  },
  terminal: {
    id: "terminal",
    title: "Terminal — zsh",
    Icon: TerminalIcon,
    label: "Terminal",
    width: 480,
    height: 360,
    contentStyle: { padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" },
    Content: TerminalWindow,
  },
  tuner: {
    id: "tuner",
    title: "Tuner.app",
    Icon: TunerIcon,
    label: "Tuner",
    width: 400,
    Content: TunerWindow,
  },
  chords: {
    id: "chords",
    title: "Chords.app",
    Icon: ChordIcon,
    label: "Chords",
    width: 480,
    Content: ChordsWindow,
  },
}

// Order used for the desktop icons and dock.
export const APP_ORDER = [
  "projects",
  "snippets",
  "contact",
  "resume",
  "terminal",
  "tuner",
  "chords",
]
