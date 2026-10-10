# Rose & Saveurs

One-page showcase and ordering site for the Rose & Saveurs pâtisserie (Algiers). Visitors build a basket and send the order through WhatsApp. Vite + React + TypeScript (strict) + Tailwind CSS 4. No backend, router, analytics or remote assets.

## Run

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

## Logo and photos

Originals live **outside** `public/`:

- `source-assets/brand/logo.jpg` — the logo (solid aubergine background).
- `source-assets/photos/` — photos, HEIC or JPG, named `IMG_xxxx`.

Then run:

```bash
npm run assets
```

It converts HEIC, applies EXIF rotation, writes AVIF + WebP at 480/800/1200 px to `public/photos/`, writes the logo variants to `public/brand/`, removes stale outputs, and regenerates `src/data/photo-manifest.json` and `brand-manifest.json`. It is safe to re-run whenever files change, and it also works when the folders are empty (the site shows arch-and-pattern placeholders and an inline lockup instead). It prints the aubergine and gold sampled from the logo next to the target values. `IMG_9854*` (the collage) and any file with "screenshot" in its name are skipped. Commit the generated `public/photos` and `public/brand` so Netlify does not need the originals.

To use a photo, add it to `PHOTOS` in `src/data/photos.ts` with its alt text and focal point (`focus` x/y in %, optional `zoom`), then reference its key from `src/data/menu.ts` or the gallery list. The four photos that contain the Christmas props (IMG_8924, 8943, 9441, 9477) are zoomed to push the props out of frame: check them visually and adjust `focus`/`zoom`, or drop the photo, if a prop still shows.

## Edit things

| What | Where |
| --- | --- |
| Phone, WhatsApp, address, hours, zones, links, fee note | `src/data/site.ts` (only place) |
| Menu items, prices, variants, availability | `src/data/menu.ts` — set `price` to a number of DA; add an item by adding one entry |
| Arabic / Darija strings | `src/data/i18n.ts` |
| FAQ | `src/data/faq.ts` |
| Testimonials (section hidden while empty) | `src/data/testimonials.ts` |
| WhatsApp message templates and language | `src/lib/whatsapp.ts` (`MESSAGE_LANG = 'fr' \| 'en'`) |
| Colours, fonts, motion | `src/index.css` |
| Logo (swap for a transparent SVG later) | `src/components/Logo.tsx` |

Prices display as `1 200 DA`. While a price is `null` the card shows "Price soon" and the basket shows "Total confirmed on WhatsApp".

## Deploy on Netlify

Connect the repository. `netlify.toml` already sets the build command (`npm run build`), publish directory (`dist`) and long-cache headers for hashed assets, photos and logo variants. Nothing else to configure.

## Dependencies

`react`, `react-dom`, `vite`, `@vitejs/plugin-react`, `typescript`, `tailwindcss` + `@tailwindcss/vite` (the requested stack), `@fontsource/fraunces`, `@fontsource/jost`, `@fontsource/aref-ruqaa` (self-hosted fonts), `sharp` (image optimisation), plus:

- `heic-convert` (dev) — `sharp`'s prebuilt binaries cannot decode HEIC, and 18 of the photos are iPhone HEIC files.
- `@types/react`, `@types/react-dom`, `@types/node` (dev) — types only.
