# daviddong.me

Personal site — a macOS-style desktop built with React + Vite + Tailwind.
Lives at **https://daviddong.me**.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (macOS/Aqua design tokens mapped into `@theme`)
- Deployed on **Cloudflare Pages** (auto-deploy from the `master` branch)
- Project images served from **Cloudflare R2** at `https://assets.daviddong.me`

## Project layout

```
src/
├── data/            # content: projects.ts, profile.ts
├── features/
│   ├── desktop/     # desktop shell: MenuBar, Dock, icons, window manager, wallpaper
│   └── windows/     # window content components (About, Projects, Resume, ...)
└── components/macos # macOS UI component library
```

## Local development

```bash
bun install
bun dev            # start dev server
bun run build      # production build -> ./dist  (vite build, no type-check)
bun run typecheck  # optional: full tsc -b type-check
```

> `build` intentionally runs only `vite build` (esbuild transpile, no type
> checking) so the deploy is not blocked by unused shadcn `components/ui/`
> files that pull in optional deps. Run `bun run typecheck` for types.

## Deployment

Cloudflare Pages (project name `daviddong`) auto-builds on push to `master`:

- Build command: `npm run build` (or `bun run build`)
- Output dir: `./dist` (declared in `wrangler.jsonc`)

Custom domain `daviddong.me` is attached to this Pages project.

To deploy manually without Git:

```bash
bun run build
bunx wrangler pages deploy dist --project-name daviddong --branch master
```

## Images (Cloudflare R2)

Project images are **not** bundled — they live in the R2 bucket
`daviddong-assets`, served via the custom domain `assets.daviddong.me`.

In `src/data/projects.ts`, images are referenced with the `asset()` helper:

```ts
asset("projects/my-app/hero.png")
// -> https://assets.daviddong.me/projects/my-app/hero.png
```

### Adding new images

Upload with the helper script, then reference the key in `projects.ts`:

```bash
# Upload ./newpics/* under the "projects/my-app" prefix
scripts/upload-assets.sh ./newpics projects/my-app
```

Or upload a single file directly:

```bash
bunx wrangler r2 object put daviddong-assets/projects/my-app/hero.png \
  --file ./hero.png --content-type image/png --remote
```

Override the asset base URL at build time with `VITE_ASSETS_BASE` if needed.
