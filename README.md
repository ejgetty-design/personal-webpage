# Emma Getty — Personal Site

Two-page personal site hosted on Vercel.

## Structure

```
.
├── index.html       # About page (/)
├── work.html        # My Work page (/work)
├── IMG_2479.png     # Headshot referenced by index.html
├── vercel.json      # Clean URL config
└── README.md
```

Each HTML page is fully self-contained — its own CSS, fonts loaded from Google Fonts, all SVGs inline. No build step. Edit, push, deploy.

## Local preview

Open either `index.html` or `work.html` directly in a browser. Or run:

```bash
npx serve .
```

## Deploy

Connected to Vercel via GitHub. Pushing to `main` triggers a deployment automatically.

Manual deploy from CLI:

```bash
npx vercel --prod
```

## Routing

`vercel.json` sets `cleanUrls: true`, so:

- `/` → `index.html`
- `/work` → `work.html`

Internal links in the nav reference `/` and `/work` directly.

## Updating the headshot

Replace `IMG_2479.png` in the repo root. The image is referenced from `index.html` as `IMG_2479.png` (relative path, no leading slash needed).

## Notes

- Both pages use Source Serif 4 + Inter from Google Fonts
- Background topographic texture is inline SVG (no external assets)
- Color palette and accents defined as CSS custom properties at the top of each file's `<style>` block
- Pages share design tokens but stay self-contained for simplicity. If updating the palette, update both files.
