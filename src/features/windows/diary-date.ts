// Shared bits for Diary.app windows (kept out of the .tsx files so Fast
// Refresh keeps working there).

export interface DiaryEntry {
  date: string // YYYY-MM-DD
  size: number
}

const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]

// "2026-01-01" → "2026年1月1日 · 周四". Parsed as local midnight so the
// weekday doesn't shift across timezones.
export function formatDiaryDate(date: string) {
  const [y, m, d] = date.split("-").map(Number)
  const weekday = WEEKDAYS[new Date(y, m - 1, d).getDay()]
  return `${y}年${m}月${d}日 · ${weekday}`
}
