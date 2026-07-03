import type { ComponentType } from "react"
import { AboutWindow } from "@/features/windows/AboutWindow"
import { ProjectsWindow } from "@/features/windows/ProjectsWindow"
import { ContactWindow } from "@/features/windows/ContactWindow"
import { ResumeWindow } from "@/features/windows/ResumeWindow"
import { TerminalWindow } from "@/features/windows/TerminalWindow"
import { SnippetsWindow } from "@/features/windows/SnippetsWindow"

// A single app / window definition shown on the desktop and dock.
export interface AppDef {
  id: string
  title: string
  icon: string
  label: string
  width: number
  Content: ComponentType<any>
}

export const APPS: Record<string, AppDef> = {
  about: {
    id: "about",
    title: "About Me.txt",
    icon: "📄",
    label: "About Me",
    width: 380,
    Content: AboutWindow,
  },
  projects: {
    id: "projects",
    title: "Projects",
    icon: "📁",
    label: "Projects",
    width: 420,
    Content: ProjectsWindow,
  },
  snippets: {
    id: "snippets",
    title: "Snippets.app",
    icon: "🎬",
    label: "Snippets",
    width: 390,
    Content: SnippetsWindow,
  },
  contact: {
    id: "contact",
    title: "Contact.txt",
    icon: "✉️",
    label: "Contact",
    width: 340,
    Content: ContactWindow,
  },
  resume: {
    id: "resume",
    title: "Resume.pdf",
    icon: "📋",
    label: "Resume",
    width: 470,
    Content: ResumeWindow,
  },
  terminal: {
    id: "terminal",
    title: "Terminal — zsh",
    icon: "⌨️",
    label: "Terminal",
    width: 384,
    Content: TerminalWindow,
  },
}

// Order used for the desktop icons and dock.
export const APP_ORDER = ["about", "projects", "snippets", "contact", "resume", "terminal"]
