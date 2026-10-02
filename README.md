# Matt Hicks — Portfolio

Personal portfolio built with Next.js, shadcn/ui and Tailwind CSS.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

All text, links, experience and projects live in [`src/data/portfolio.ts`](src/data/portfolio.ts). Search for `TODO` to find placeholders.

- **Résumé:** drop a PDF at `public/resume.pdf`.
- **Colors:** `--brand` / `--brand-2` in `src/app/globals.css` (separate values for light and dark).
- **Sections:** `src/components/sections/`.

## Deploy

Push to GitHub and import the repo at https://vercel.com/new. No configuration needed.
