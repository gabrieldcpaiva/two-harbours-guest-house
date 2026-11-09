# Two Harbours Guest House

A cinematic landing page for Two Harbours Guest House on Scalpay, Isle of Harris. Facts, guest quotes, rates and owner notes come from the sourced copy pass. Where a fact is still open, the page shows an owner note instead of an invented answer.

Book Direct goes to the house’s live availability page: <https://www.twoharbours.com/availability.php>. This page does not take payment.

## Run

Requires Node.js 22.23.4 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run images     # rebuild responsive AVIF/WebP from photos/originals
npm run build
npm run lint
npm run contrast
npm run verify     # dev server must already be running
```

Photographs are the owners’ images. Derivatives live in `public/images`.
