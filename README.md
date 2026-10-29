# AscendIQ website

Marketing site for AscendIQ — an LLM-powered ISO 27001 compliance automation platform (policy generation, automated evidence collection, continuous monitoring).

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, TypeScript. Fully static — no server runtime needed.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | **All page copy** — sections, stats, phases, connectors, tabs, comparison table, FAQ. Edit this to change text. |
| `src/app/page.tsx` | Page assembly, section order |
| `src/components/Hero.tsx` | Hero with the sources → controls diagram |
| `src/components/Tabs.tsx` | Capabilities tabs with the product previews |
| `src/components/Header.tsx` | Top bar, main nav, sticky numbered section nav |
| `src/components/Footer.tsx` | Footer |
| `src/app/globals.css` | Brand tokens (`--navy`, `--blue`, `--cyan`), utilities (`btn`, `card`, `eyebrow`, `num`) |
| `public/brand/` | Logo lockups and icon (SVG) |

## Brand

Navy `#0A2540` · Blue `#2563EB` · Cyan `#06B6D4` · Inter (wordmark and body) · JetBrains Mono (control IDs, labels).

## Deploy

Push to `main` and import the repo in Vercel; defaults work. Set the real domain in `metadataBase` in `src/app/layout.tsx`.

## To do

- Wire the readiness-call form to a real endpoint (currently `mailto:`)
- Replace the LinkedIn placeholder link with the real profile
- Privacy policy and terms pages
