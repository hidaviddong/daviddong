import { useEffect, useState } from "react"
import { Separator, Spinner } from "@/components/macos"
import { diaryHeaders, formatDiaryDate } from "./diary-date"
import "./diary-markdown.css"

interface DiaryEntryWindowProps {
  date: string // YYYY-MM-DD
}

// Fetches diary/<date>.md from the Worker and renders it. marked is
// dynamically imported so the parser ships in its own chunk, fetched the
// first time an entry is opened (same motivation as the lazy apps).
export function DiaryEntryWindow({ date }: DiaryEntryWindowProps) {
  const [html, setHtml] = useState<string | null>(null)
  const [error, setError] = useState<"load" | "auth" | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([fetch(`/api/diary/${date}`, { headers: diaryHeaders() }), import("marked")])
      .then(async ([res, { marked }]) => {
        if (res.status === 401) {
          if (!cancelled) setError("auth")
          return
        }
        if (!res.ok) throw new Error(`http ${res.status}`)
        const md = await res.text()
        if (!cancelled) setHtml(marked.parse(md, { async: false, gfm: true, breaks: true }))
      })
      .catch(() => !cancelled && setError("load"))
    return () => {
      cancelled = true
    }
  }, [date])

  return (
    <div className="max-h-[460px] w-full overflow-y-auto font-body text-body-md text-primary-ink">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="font-chrome text-chrome-lg">{formatDiaryDate(date)}</span>
        <span className="font-mono2 text-body-xs text-secondary-ink">{date}.md</span>
      </div>
      <Separator />

      {error && (
        <p className="m-0 py-6 text-center text-body-sm text-secondary-ink">
          {error === "auth" ? "密码已失效，请回到 AI Diary 窗口重新解锁。" : "这篇日记加载失败。"}
        </p>
      )}
      {!error && html === null && (
        <div className="flex justify-center py-8">
          <Spinner />
        </div>
      )}
      {html !== null && (
        // Own content only: uploads are gated by ADMIN_TOKEN, so the raw
        // HTML render is trusted.
        <div className="diary-markdown mt-3" dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  )
}
