import type { ComponentType } from "react"
import { AboutWindow } from "@/features/windows/AboutWindow"
import { ProjectsWindow } from "@/features/windows/ProjectsWindow"
import { ContactWindow } from "@/features/windows/ContactWindow"
import { ResumeWindow } from "@/features/windows/ResumeWindow"
import { TerminalWindow } from "@/features/windows/TerminalWindow"
import { SnippetsWindow } from "@/features/windows/SnippetsWindow"
import {
  DocumentIcon,
  FolderIcon,
  MovieIcon,
  MailIcon,
  PdfIcon,
  TerminalIcon,
  type IconProps,
} from "./icons"

// A single app / window definition shown on the desktop and dock.
export interface AppDef {
  id: string
  title: string
  Icon: ComponentType<IconProps>
  label: string
  width: number
  Content: ComponentType
}

export const APPS: Record<string, AppDef> = {
  about: {
    id: "about",
    title: "About Me.txt",
    Icon: DocumentIcon,
    label: "About Me",
    width: 380,
    Content: AboutWindow,
  },
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
    width: 384,
    Content: TerminalWindow,
  },
}

// Order used for the desktop icons and dock.
export const APP_ORDER = ["about", "projects", "snippets", "contact", "resume", "terminal"]
