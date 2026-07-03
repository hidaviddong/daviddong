import { Badge, Separator } from "@/components/macos"
import { profile } from "@/data/profile"

export function AboutWindow() {
  return (
    <div className="flex w-full flex-col gap-2.5 font-body text-body-md text-primary-ink">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-aqua-md bg-gray-200t font-chrome text-[22px] shadow-[var(--bevel-raised)]">
          D
        </div>
        <div>
          <div className="font-chrome text-chrome-md">{profile.handle}</div>
          <Badge tone="terminal">est. {profile.bornYear}</Badge>
        </div>
      </div>
      <Separator />
      <p className="m-0 leading-normal">{profile.about}</p>
      <Separator />
      <div className="flex flex-col gap-1">
        <InfoRow label="Location" value={profile.location} />
        <InfoRow label="Languages" value={profile.languages} />
        <InfoRow label="Visa" value={profile.visa} />
      </div>
      <p className="m-0 text-secondary-ink">Double-click the icons to explore.</p>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-body-sm">
      <span className="min-w-[72px] text-secondary-ink">{label}</span>
      <span>{value}</span>
    </div>
  )
}
