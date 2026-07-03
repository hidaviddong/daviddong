# daviddong.me

Personal site — a macOS-style desktop built with React + Vite + Tailwind.
Lives at **https://daviddong.me**.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (macOS/Aqua design tokens mapped into `@theme`)
- Backend: **Cloudflare Worker** (Hono) serving both the static SPA and
  `/api/*` routes, via `@cloudflare/vite-plugin`
- Project images served from **Cloudflare R2** at `https://assets.daviddong.me`

## Project layout

```
src/
├── data/            # content: projects.ts, profile.ts
├── features/
│   ├── desktop/     # desktop shell: MenuBar, Dock, icons, window manager, wallpaper
│   └── windows/     # window content components (About, Projects, Resume, ...)
├── components/macos # macOS UI component library
└── worker/          # Cloudflare Worker (Hono): serves SPA + /api/* routes
```

## Local development

```bash
bun install
bun dev            # vite dev — runs the Worker + React together (HMR),
                   # with local access to bindings (R2/D1/KV)
bun run build      # production build (vite build, no type-check)
bun run typecheck  # optional: full tsc -b type-check (app + node + worker)
bun run cf-typegen # regenerate worker-configuration.d.ts after editing bindings
```

> `build` intentionally runs only `vite build` (esbuild transpile, no type
> checking) so the deploy is not blocked by unused shadcn `components/ui/`
> files that pull in optional deps. Run `bun run typecheck` for types.
>
> The `/api/*` routes are handled in `src/worker/index.ts` (Hono). Everything
> else falls through to the static SPA via the `ASSETS` binding.

## Deployment

Deployed as a **Cloudflare Worker** (name `daviddong`). The custom domain
`daviddong.me` is bound to the Worker via a route in `wrangler.jsonc`.

### 🚀 Shipping — push to `master`

Git auto-deploy is enabled via **Cloudflare Workers Builds**. Pushing to
`master` builds and deploys to `daviddong.me` automatically.

Cloudflare build settings (dashboard → `daviddong` Worker → Settings → Builds):

- Production branch: `master`
- Build command:   `bun run build`
- Deploy command:  `npx wrangler deploy`
- Version command: `npx wrangler versions upload` (non-production branches
  upload a preview version without going live)

`bun run build` (via `@cloudflare/vite-plugin`) outputs:

- `dist/client/`   — the static SPA (bound to the Worker as `ASSETS`)
- `dist/daviddong/` — the bundled Worker + generated `wrangler.json`

### Manual deploy (fallback)

You can still deploy directly from your machine at any time:

```bash
bun run deploy     # = vite build && wrangler deploy
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
