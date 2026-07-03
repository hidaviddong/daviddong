import { Separator } from "@/components/macos"
import { profile } from "@/data/profile"

const CONTACTS = [
  { label: "Email", value: profile.links.email, href: `mailto:${profile.links.email}` },
  { label: "GitHub", value: "hidaviddong", href: profile.links.github },
  { label: "Website", value: "daviddong.me", href: profile.links.website },
  { label: "WeChat", value: profile.links.wechat },
]

export function ContactWindow() {
  return (
    <div className="flex w-[300px] flex-col gap-2 font-body text-body-md text-primary-ink">
      <p className="m-0 text-secondary-ink">随时联系我 👋</p>
      <Separator />
      {CONTACTS.map((c) => (
        <div key={c.label} className="flex items-baseline gap-2">
          <span className="min-w-[64px] text-secondary-ink">{c.label}</span>
          {c.href ? (
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="text-link underline"
            >
              {c.value}
            </a>
          ) : (
            <span>{c.value}</span>
          )}
        </div>
      ))}
    </div>
  )
}
