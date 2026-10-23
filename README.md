# Sungkom Wongussapaiboon — Portfolio

Frontend portfolio built with **Next.js (App Router) + React + TypeScript + GSAP**, exported as a static site.

- `/` — hero, about, career path, stack, selected work, experience, services, contact
- `/works` — all 20 projects with category filter
- `/works/[slug]` — one sub-page per project

All content lives in [`lib/data.ts`](lib/data.ts). Edit it and every page updates.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

Deploy: pushes to `main` publish to GitHub Pages via `.github/workflows/deploy.yml`
(set Settings → Pages → Source = GitHub Actions). On Vercel, import the repo as-is.
