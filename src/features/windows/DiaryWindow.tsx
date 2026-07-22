import { useEffect, useState } from "react"
import { Separator, Spinner } from "@/components/macos"
import { formatDiaryDate, type DiaryEntry } from "./diary-date"

export type { DiaryEntry }

interface DiaryWindowProps {
  onOpenEntry?: (entry: DiaryEntry) => void
}

export function DiaryWindow({ onOpenEntry }: DiaryWindowProps) {
  const [entries, setEntries] = useState<DiaryEntry[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch("/api/diary")
      .then((res) => res.json() as Promise<{ ok: boolean; entries: DiaryEntry[] }>)
      .then((data) => {
        if (cancelled) return
        if (!data.ok) throw new Error("bad response")
        setEntries(data.entries)
      })
      .catch(() => !cancelled && setError(true))
    return () => {
      cancelled = true
    }
  }, [])

  if (error) {
    return (
      <p className="m-0 py-6 text-center font-body text-body-sm text-secondary-ink">
        日记加载失败，稍后再试。
      </p>
    )
  }

  if (!entries) {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <p className="m-0 py-6 text-center font-body text-body-sm text-secondary-ink">
        还没有日记 — 上传第一篇 YYYY-MM-DD.md 吧。
      </p>
    )
  }

  return (
    <div className="max-h-[420px] w-full overflow-y-auto font-body">
      {entries.map((entry, i) => (
        <div key={entry.date}>
          <button
            onClick={() => onOpenEntry?.(entry)}
            className="flex w-full cursor-pointer items-center gap-3 rounded-aqua-md border-none bg-transparent px-1.5 py-2 text-left transition-colors hover:bg-window-alt"
          >
            <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-aqua-sm border border-gray-300t bg-window-alt">
              <span className="font-chrome text-chrome-md leading-none text-primary-ink">
                {Number(entry.date.slice(8, 10))}
              </span>
              <span className="mt-0.5 font-mono2 text-[9px] leading-none text-secondary-ink">
                {entry.date.slice(0, 7)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="block truncate font-chrome text-chrome-md text-link">
                {formatDiaryDate(entry.date)}
              </span>
              <span className="font-mono2 text-body-xs text-secondary-ink">
                {entry.date}.md · {(entry.size / 1024).toFixed(1)} KB
              </span>
            </div>
          </button>
          {i < entries.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  )
}
