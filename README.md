# Spatialdom

Single-page brand site for `spatialdom.xyz`, built with React, Vite, TypeScript, Tailwind CSS, and Framer Motion.

## Stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

The site is static and deploys to GitHub Pages from the built `dist/` output.

This repo includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml` that:

- builds the Vite app on pushes to `master`
- uploads `dist/`
- publishes that artifact to GitHub Pages

In the repository settings, set:

- `Settings > Pages > Source` to `GitHub Actions`

Do not publish from the repository root. The root `index.html` is the Vite source entry and points to `/src/main.tsx`, which GitHub Pages cannot serve as a browser module.

## Base path for GitHub Pages

The Vite base path is configurable through `VITE_BASE_PATH`.

- Custom domain deployment like `https://spatialdom.xyz/`: leave it unset. The default base is `/`.
- Repository-path deployment like `https://username.github.io/repo-name/`: set `VITE_BASE_PATH=/repo-name/` before building.

Examples:

Windows PowerShell:

```powershell
$env:VITE_BASE_PATH="/repo-name/"
npm run build
```

macOS / Linux:

```bash
VITE_BASE_PATH=/repo-name/ npm run build
```

## Custom domain

- Keep `public/CNAME` committed with the domain value.
- GitHub Pages will copy it into the deployed output automatically.
- If the custom domain changes, update `public/CNAME`.

## Project structure

```text
src/
  components/
    layout/
    ui/
  data/
  hooks/
  lib/
  sections/
  styles/
```

## Notes

- The site is intentionally single-page for now.
- Content lives in `src/data/siteContent.ts` for straightforward future expansion.
