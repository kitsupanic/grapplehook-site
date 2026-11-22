# Grapplehook website

Static SvelteKit site (Svelte 5, `adapter-static`, fully prerendered) for [grapplehook.app](https://grapplehook.app). The app lives in [kitsupanic/Grapplehook](https://github.com/kitsupanic/Grapplehook).

```sh
pnpm install
pnpm dev        # http://localhost:4630
pnpm check      # svelte-check + the release.ts self-check
pnpm build      # writes build/
pnpm preview
```

## Release data

`src/lib/release.ts` reads the latest GitHub release of `kitsupanic/Grapplehook` and matches its installers by extension (`.dmg`, `.exe`, `.AppImage`). It runs twice:

- at build time, so the prerendered page already links the current files;
- in the browser, so a new release shows up without redeploying.

If GitHub can't be reached, every Download button falls back to the releases page. Nothing needs bumping per release.

The visitor's platform is picked by a small script in `src/app.html` before first paint (`html[data-os]`). Phones, tablets and ChromeOS see all three platforms.

## Deploy to Cloudflare Workers

Served as static assets; `wrangler.jsonc` holds the Worker name, the `build` folder and the custom domains (the `grapplehook.app` and `kitsupanic.com` zones must be on the same Cloudflare account).

`grapplehook.app` is the address. Two Redirect Rules, set in the Cloudflare dashboard rather than here, send the others to it with a 301 that keeps the path and query:

- `kitsupanic.com` zone: host `grapplehook.kitsupanic.com`.
- `grapplehook.app` zone: host `www.grapplehook.app`.

- From Cloudflare (Workers Builds, connected to this repository): build command `pnpm build`, deploy command `pnpm exec wrangler deploy`.
- By hand: `pnpm build && pnpm exec wrangler deploy`.

`wrangler` is pinned in `devDependencies`, so every deploy uses the same version.

## Assets

- `static/fonts/`: Barlow Condensed 700/800 (SIL OFL 1.1, see `OFL.txt`), the app's display face.
- `static/demo.svg`: the app-at-work animation from the Grapplehook README.
- `static/favicon.png`, `static/apple-touch-icon.png`: resized from the app icon.
- `static/og.png`: link preview, a capture of this page's first viewport. Recapture it if the hero changes.
