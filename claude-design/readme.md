# hidaviddong Design System

A retro-OS design system for **hidaviddong** — a personal engineering site/brand for a developer born in 1999 who wants the web to feel like the desktop computers of their childhood. The brief (from the project owner, translated): *"I want to build my own OS using shadcn/ui components. Retro. I was born in '99 and I want this site to feel a little retro — like going back in time, that classic operating-system feeling."*

**Direction pivot:** the system originally reskinned shadcn in a Windows 95/98 chrome language. The owner then said, in their words, that Microsoft "has no taste" and asked for an Apple-flavored retro direction instead. This version rebuilds the whole visual language around **Mac OS X's "Aqua" era (~10.0–10.4, 2001–2005)** — glossy gradients, rounded "lickable" buttons, soft blurred shadows, and the red/yellow/green traffic-light window controls — chosen (with the owner's confirmation) as the most widely recognized, beloved "classic Apple" look, and a plausible fit for someone who grew up around Macs in the 2000s.

There is no existing company brand, logo, or marketing site to source from. The one material provided was a folder of **shadcn/ui** component source files (`ui/*.tsx` — Button, Card, Dialog, Table, Sidebar, Command, etc., ~56 files, built on `@base-ui/react` + `class-variance-authority` + Tailwind). That codebase defines *which UI primitives exist* (the component inventory this system rebuilds) but carries no color tokens, fonts, or visual identity of its own — it's the unstyled shadcn scaffold, meant to be reskinned.

**Sources referenced:**
- Attached codebase: `ui/` (local, mounted folder) — a shadcn/ui component set (Button, Input, Select, Dialog, Table, Sidebar, Command, Carousel, Sonner, etc.). No `.css`, tokens, or brand file existed alongside it.
- No Figma file, logo, or existing website was provided.

Because no logo exists, **do not draw one**, and this system never reproduces Apple's real logo, wallpaper art, or any other Apple-owned asset — everything here is an original interpretation of the *Aqua visual language* (a UI style), not a copy of Apple's branding. Every place a mark would go uses the plain wordmark "hidaviddong" in the system font — see `assets/wordmark.card.html`. The generic "◆" glyph used where a menu icon sits (menu bar, Start-of-menu) is a deliberate placeholder, not an apple silhouette.

## Index

- `styles.css` — the single entry point; imports every token file below. Link this one file.
- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/effects.css` — design tokens.
- `guidelines/*.card.html` — foundation specimens (colors, type, spacing, surface/shadow system) shown in the Design System tab.
- `assets/` — wordmark card (no real logo file exists).
- `components/forms/` — Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Slider.
- `components/feedback/` — Alert, Badge, Progress, Spinner, Skeleton, Toast.
- `components/overlays/` — Tooltip, Popover, DropdownMenu, WindowFrame, Dialog.
- `components/navigation/` — Tabs, Breadcrumb, Accordion.
- `components/data-display/` — Card, Table, Avatar, Kbd, Separator, Toggle, ToggleGroup.
- `ui_kits/portfolio-os/` — a full click-through recreation of the flagship product: a personal desktop-as-portfolio ("hidaviddong OS") with a global menu bar, a floating Dock, desktop icons, and draggable windows (About, Projects, Blog, Contact, Resume, and a Terminal easter egg).

### Components (29 built)
Button, Input, Textarea, Label, Checkbox, RadioGroup, Switch, Select, Slider, Alert, Badge, Progress, Spinner, Skeleton, Toast, Tooltip, Popover, DropdownMenu, WindowFrame, Dialog, Tabs, Breadcrumb, Accordion, Card, Table, Avatar, Kbd, Separator, Toggle (+ToggleGroup).

### Intentional additions
- **WindowFrame** — not a shadcn primitive by name, but every other component in this system (Dialog, the desktop windows) is built on it; it's the single most important piece of chrome in an OS-flavored system, so it's promoted to a first-class component rather than buried inside Dialog. It now carries the traffic-light window controls.

### Not yet built (remaining shadcn inventory)
The source `ui/` folder defines ~56 components total. This pass covered the 29 most load-bearing ones for a personal site. **Not yet reskinned:** AlertDialog (covered by Dialog), AspectRatio, Attachment, Bubble, ButtonGroup, Calendar, Carousel, Chart, Collapsible, Combobox, Command, ContextMenu (covered by DropdownMenu), Direction, Drawer (covered by Dialog), Empty, Field, HoverCard (covered by Tooltip/Popover), InputGroup, InputOTP, Item, Marker, Menubar, MessageScroller, Message, NativeSelect, NavigationMenu, Pagination, Resizable, ScrollArea, Sheet (covered by Dialog), Sidebar, Table Pagination. **Flag to the user:** tell me which of these your actual site needs and I'll build them next — happy to keep going.

## Content Fundamentals

**Voice:** first-person, quiet, a little wry — like a `readme.txt` left on a desktop, not marketing copy. Lowercase is used freely in body copy for an unpolished, diary-like feel ("i wrote this at 2am, dock bouncing quietly in the corner"); UI chrome (menus, buttons, titlebars) stays in the Title Case conventions of real system chrome ("File Edit View Window Help").
**Casing:** two registers on purpose — system chrome is capitalized/formal, body/blog copy is casual and often lowercase.
**Pronouns:** "I" for the person, direct "you" when giving instructions ("Double-click the icons to explore").
**Emoji:** not used as UI decoration in running text — glyphs come from simple UI characters (▶ ✕ ✓) or real file-type/app emoji used only as *desktop and Dock icons* (📄📁📰✉️📋⌨️🗑️), never inline in body copy.
**Vibe:** nostalgic, a little deadpan, technical without being cold — "some things you never forget," not "revolutionize your workflow."
**File-name-as-copy:** headings/labels borrow real filesystem conventions — `About Me.txt`, `Blog.app`, `Resume.pdf`, `Trash` — treating the site itself as a filesystem/desktop.

## Visual Foundations

**Colors:** base palette is Aqua-era "platinum" gray — cool, neutral grays (`--gray-0` through `--gray-900`), never the warm beige of a Windows box. Accent is a glossy Aqua blue (`--accent-500`) used for primary buttons, links, checked states, and focus. The single most important color detail is the **traffic-light window controls** (`--traffic-red/yellow/green`) — every window's close/minimize/zoom, always in that order, always those three hues. A CRT-terminal green (`--terminal-green` on `--terminal-bg`) is scoped *only* to the Terminal.app easter-egg window — it is not a global accent. Semantic feedback colors use Apple's system red/orange/green, not saturated primary red/yellow/green.
**Type:** Aqua's whole premise was retiring bitmap system fonts for smooth anti-aliased type, so unlike a Windows-95 pass, **there is no separate pixel/display font on purpose.** One system-font stack (`--font-ui`, `-apple-system` first) does chrome, buttons, and body copy alike — exactly how real Mac apps work. Monaco (`--font-mono`) is reserved for code and the Terminal.app window — it's a real Mac OS X system font, so on any Apple device it renders as authentic Monaco with zero download.
**No original font files were provided.** Lucida Grande / San Francisco aren't licensed for web embedding, so the stack falls back to `-apple-system, BlinkMacSystemFont` (renders as real San Francisco on Apple hardware) then Figtree (a Google Fonts substitute) for everyone else. **Flagging to the user:** if you have specific font files in mind, send them and I'll swap the stack.
**Spacing:** a tight 2px-rooted scale (`--space-1: 2px` … `--space-12: 96px`). Chrome elements use fixed pixel measures (`--titlebar-height: 28px`, `--menubar-height: 24px` — now the *global* top menu bar, not per-window) instead of scaling with content.
**Backgrounds:** flat/gradient color only, no photography or illustration. The desktop uses a simple two-stop blue gradient (`--surface-desktop`) as an honest placeholder — **real Aqua desktop wallpaper art was never provided and is not copied**; swap the two `--surface-desktop-from/to` stops for a real photo background if the owner supplies one. Windows/panels are flat near-white/gray. The one deliberately-added translucency: the global menu bar and Dock use `backdrop-filter: blur()` over the desktop — this is authentically Aqua (both were translucent from Mac OS X 10.0 onward), not decoration for its own sake.
**Animation:** Aqua *does* animate, unlike a hard-snap Windows chrome — gentle opacity/shadow fades on press, a smoothly-rotating Finder disclosure triangle, an animated progress-bar fill (`--duration-fast`/`--duration-normal` + `--ease-standard`, a standard material-style ease, not a linear snap).
**Hover states:** Dock icons lift and scale up slightly on hover (with a name tooltip above); menu/dropdown rows get a flat Aqua-blue fill swap.
**Press states:** buttons dim slightly (opacity), they do not shift position or invert — a real Aqua button darkens, it doesn't "push."
**Borders & surface language:** no hard 3D bevels. `--bevel-raised` is a soft drop shadow plus an inner top gloss highlight (the "lickable" look); `--bevel-sunken`/`--bevel-field` are soft inset shadows for pressed/sunken states. Floating chrome (windows, menus, tooltips, the Dock) uses genuinely blurred soft shadows (`--shadow-window`, `--shadow-menu`, `--shadow-dock`) — never a hard offset shadow.
**Corners:** generously rounded. `--radius-pill` (fully round) drives buttons, switches, and badges; `--radius-lg` (10px) rounds window/card corners; `--radius-md`/`--radius-sm` cover inputs and menus. Nothing in this system is a sharp rectangle.
**Cards/windows:** `Card` and `WindowFrame` share the same soft-shadow, rounded-corner surface — `WindowFrame` adds the gradient platinum titlebar and traffic lights; `Card` is the same surface without a titlebar, for content groupings that aren't full windows.
**Transparency/blur:** used deliberately in three places — the menu bar, the Dock, and floating menus/popovers/toasts (all frosted-glass `backdrop-filter: blur(20px)` panels). Not used anywhere else.
**Imagery:** no imagery source was provided. Avatar renders any photo crisp (no pixelation, unlike the earlier Windows pass) — Aqua-era Macs had much better displays than a Win95 box.
**Focus states:** a soft Aqua-blue glow ring (`--focus-ring`), not a dotted line — this is Aqua's signature focus treatment.

## Iconography

No icon font, SVG icon set, or icon files were provided in the source codebase — shadcn's own `ui/` folder ships no icons. This system uses:
1. **Plain UI glyphs** for chrome (▶ disclosure triangle, ✕ close, ✓ check, ▾ dropdown caret) — simple characters, no icon font dependency.
2. **Standard emoji**, used only as *desktop/Dock/file icons* (📄 📁 📰 ✉️ 📋 ⌨️ 🗑️) standing in for what would be real bitmap app icons on an actual OS. These never appear inline in body copy.
3. **The traffic-light dots** (`--traffic-red/yellow/green`) are drawn as plain CSS circles, not an icon asset — see `WindowFrame`.

If real icon assets (custom app icons, a `.icns`-style set) become available, swap them in for the Dock/desktop emoji directly in `ui_kits/portfolio-os/Desktop.jsx` and `Dock.jsx`. This system never reproduces Apple's own icon designs (Finder, Trash, etc.) — the emoji stand-ins are intentionally generic.

## Caveats & open questions
- **No brand assets exist yet** — no logo, no photo, no wallpaper art, no existing site to match pixel-for-pixel. Everything visual here is an original Aqua-*style* interpretation, never a copy of Apple's actual branding or artwork.
- **Fonts fall back to Google Fonts** (Figtree, IBM Plex Mono) behind the real `-apple-system`/Monaco system-font stack — flag if you have specific font files in mind.
- **27 of ~56 shadcn components remain unbuilt** (see list above) — tell me which your actual pages need most and I'll prioritize those next.
- The `ui_kits/portfolio-os` desktop is a first pass at "what your homepage could be" — tell me if you want a different flagship product, or want the Windows-95 version kept around as a Tweak/alternate theme rather than fully replaced.
