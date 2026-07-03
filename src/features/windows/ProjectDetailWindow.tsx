import { Badge, Separator } from "@/components/macos"
import type { Project } from "@/data/projects"

interface ProjectDetailWindowProps {
  project: Project
}

export function ProjectDetailWindow({ project }: ProjectDetailWindowProps) {
  return (
    <div className="max-h-[460px] w-[420px] overflow-y-auto font-body text-body-md text-primary-ink">
      <div className="mb-1.5 flex items-center gap-2">
        <span className="font-chrome text-chrome-lg">{project.title}</span>
        <Badge tone={project.type === "个人" ? "primary" : "success"}>{project.type}</Badge>
        <span className="ml-auto font-mono2 text-body-xs text-secondary-ink">{project.date}</span>
      </div>

      {project.links && project.links.length > 0 && (
        <div className="mb-2 flex gap-3">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-body-sm text-link underline"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}

      <Separator />

      {project.sections.map((section, i) => (
        <div key={i} className="mt-3">
          {section.heading && (
            <h3 className="mb-1.5 mt-0 font-chrome text-chrome-md">{section.heading}</h3>
          )}
          {section.body && (
            <p className="mb-2.5 mt-0 whitespace-pre-line leading-normal">{section.body}</p>
          )}
          {section.images?.map((img, j) => (
            <figure key={j} className="mb-3 mt-0">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="block w-full rounded-aqua-md border border-gray-300t"
              />
              {img.caption && (
                <figcaption className="mt-1 text-center text-body-xs text-secondary-ink">
                  {img.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      ))}
    </div>
  )
}
