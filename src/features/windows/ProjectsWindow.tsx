import { Badge, Separator } from "@/components/macos"
import { sortedProjects, type Project } from "@/data/projects"

interface ProjectsWindowProps {
  onOpenProject?: (project: Project) => void
}

export function ProjectsWindow({ onOpenProject }: ProjectsWindowProps) {
  return (
    <div className="max-h-[420px] w-full overflow-y-auto font-body">
      {sortedProjects.map((project, i) => (
        <div key={project.id}>
          <button
            onClick={() => onOpenProject?.(project)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-aqua-md border-none bg-transparent px-1.5 py-2 text-left transition-colors hover:bg-window-alt"
          >
            <img
              src={project.cover}
              alt={project.title}
              className="h-10 w-16 shrink-0 rounded-aqua-sm border border-gray-300t object-cover"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="truncate font-chrome text-chrome-md text-link">
                  {project.title}
                </span>
                <Badge tone={project.type === "个人" ? "primary" : "success"}>
                  {project.type}
                </Badge>
              </div>
              <p className="mt-0.5 mb-0 truncate text-body-xs text-secondary-ink">
                {project.description}
              </p>
              <span className="font-mono2 text-body-xs text-secondary-ink">{project.date}</span>
            </div>
          </button>
          {i < sortedProjects.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
