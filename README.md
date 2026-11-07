# Two Harbours Guest House

A first working, static-friendly marketing website for Two Harbours Boutique Guest House on Scalpay. The existing property website is the factual brief; Flowy Inns is the voice/layout reference. Reviews, awards, ratings and invented statistics are deliberately absent.

## Run

Requires **Node.js 22.23.4 or newer** and npm 9.6.5+.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The dev server binds to `0.0.0.0` for preview environments.

## Build and check

```sh
npm run build          # static site in dist/
npm run preview        # serve the production build locally
npm run check          # Astro/TypeScript diagnostics
npm run test:site      # built HTML, local links, alt text, placeholders, no review/award copy
npm run contrast       # design-system WCAG AA contrast pairs
npm run placeholders   # regenerate docs/PLACEHOLDERS.md
npm run images         # report source image dimensions/sizes
npm run test:browser   # responsive, axe, keyboard, links and form checks (server must be running)
```

`test:browser` uses Playwright with the bundled `@sparticuz/chromium` binary. On a normal workstation you can instead run `npx playwright install chromium` and set `CHROMIUM_PATH` to that executable. Set `BASE_URL` to test another server, e.g. `BASE_URL=http://localhost:4321 npm run test:browser`.

## Deploy

The output is plain static files. Deploy the **`dist/` directory** to any static host (Netlify, Vercel, Cloudflare Pages, S3/CloudFront, nginx, etc.):

1. Set the host’s Node version to 22.23.4+.
2. Build command: `npm ci && npm run build`.
3. Publish directory: `dist`.
4. Point the domain at the host and enable HTTPS.
5. Configure clean URLs/trailing slashes to match Astro’s directory output (`/rooms/` → `dist/rooms/index.html`).
6. Replace the legal drafts and fill the placeholders before public launch.

The canonical domain, sitemap and robots file currently use `https://www.twoharbours.com`. Change `site` in `astro.config.mjs`, `public/sitemap.xml` and `public/robots.txt` together if deploying elsewhere.

## Edit the copy

Almost all property copy, rooms, rates, policies, contact details and placeholders live in **`src/data/site.json`**. Page structure is in `src/pages/*.astro`; shared design tokens are at the top of `src/styles/global.css`. Photographs are in `src/assets/images/` and are converted to responsive AVIF/WebP at build time.

The enquiry form is intentionally honest and static: it validates in the browser and prepares a `mailto:` for the guest’s own email app. It does **not** send, store, check availability or take payment. The primary booking action links to the existing live availability page. If the owner later wants server-side form delivery, add a form endpoint and update the privacy notice first.

## Deliverables

- Working Astro project and passing static build.
- [Placeholder register](docs/PLACEHOLDERS.md).
- [Design decisions](docs/DESIGN-NOTES.md).
- [Verification report](docs/VERIFICATION.md).
- [Image sources and replacement notes](docs/IMAGE-SOURCES.md).

## Source of facts

Property facts were taken from the existing Two Harbours pages listed in `src/data/site.json` under `source`. Where the brief is silent, the site shows a visible square-bracket placeholder instead of inventing an answer.
