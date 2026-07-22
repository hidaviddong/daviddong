import { useCallback, useEffect, useState } from "react"
import { Button, Input, Separator, Spinner } from "@/components/macos"
import {
  diaryHeaders,
  formatDiaryDate,
  getDiaryPassword,
  setDiaryPassword,
  type DiaryEntry,
} from "./diary-date"

export type { DiaryEntry }

interface DiaryWindowProps {
  onOpenEntry?: (entry: DiaryEntry) => void
}

type Phase = "loading" | "locked" | "ready" | "error"

export function DiaryWindow({ onOpenEntry }: DiaryWindowProps) {
  const [phase, setPhase] = useState<Phase>("loading")
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [input, setInput] = useState("")
  const [rejected, setRejected] = useState(false)

  const load = useCallback(async (pw: string) => {
    setPhase("loading")
    try {
      const res = await fetch("/api/diary", { headers: diaryHeaders(pw) })
      if (res.status === 401) {
        // Only flag "wrong password" for a real attempt — the silent first
        // try with an empty/stale stored value should just show the prompt.
        setRejected(pw !== "" && pw !== getDiaryPassword())
        setPhase("locked")
        return
      }
      const data = (await res.json()) as { ok: boolean; entries: DiaryEntry[] }
      if (!data.ok) throw new Error("bad response")
      setDiaryPassword(pw)
      setEntries(data.entries)
      setPhase("ready")
    } catch {
      setPhase("error")
    }
  }, [])

  // First try with whatever password is stored (empty in dev / first visit).
  useEffect(() => {
    load(getDiaryPassword())
  }, [load])

  if (phase === "loading") {
    return (
      <div className="flex justify-center py-8">
        <Spinner />
      </div>
    )
  }

  if (phase === "error") {
    return (
      <p className="m-0 py-6 text-center font-body text-body-sm text-secondary-ink">
        日记加载失败，稍后再试。
      </p>
    )
  }

  if (phase === "locked") {
    return (
      <form
        className="flex flex-col items-center gap-2.5 px-6 py-6 font-body"
        onSubmit={(e) => {
          e.preventDefault()
          if (input) load(input)
        }}
      >
        <span className="text-2xl" aria-hidden>
          🔒
        </span>
        <p className="m-0 text-body-sm text-secondary-ink">这是私人日记，输入密码查看。</p>
        <div className="w-full max-w-[220px]">
          <Input
            type="password"
            autoFocus
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setRejected(false)
            }}
            placeholder="密码"
            aria-label="日记密码"
          />
        </div>
        {rejected && <p className="m-0 text-body-xs text-secondary-ink">密码不对，再试一次。</p>}
        <Button type="submit" variant="primary" size="sm" disabled={!input}>
          解锁
        </Button>
      </form>
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
