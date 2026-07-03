import { Button } from "@/components/macos"

const RESUME_URL = "/resume.pdf"

export function ResumeWindow() {
  return (
    <div className="flex w-[440px] flex-col gap-2.5">
      <div className="flex items-center gap-2">
        <span className="font-body text-body-sm text-secondary-ink">Resume — David Dong</span>
        <a href={RESUME_URL} download className="ml-auto">
          <Button variant="primary">下载 PDF</Button>
        </a>
        <a href={RESUME_URL} target="_blank" rel="noreferrer">
          <Button>新标签打开</Button>
        </a>
      </div>
      <iframe
        title="Resume"
        src={`${RESUME_URL}#toolbar=0`}
        className="h-[460px] w-full rounded-aqua-md border border-gray-300t bg-white"
      />
    </div>
  )
}
