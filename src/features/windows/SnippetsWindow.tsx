import { snippetVideos } from "@/data/profile"

export function SnippetsWindow() {
  return (
    <div className="flex w-full flex-col gap-3">
      {snippetVideos.map((video) => (
        <iframe
          key={video}
          src={video}
          title="snippet"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          className="h-[202px] w-full rounded-aqua-md border-none bg-black"
        />
      ))}
    </div>
  )
}
