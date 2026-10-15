# rs-labs.in

The RS Labs website: React, TypeScript, Vite and Tailwind CSS. No backend.
Art direction and design tokens are in [DESIGN.md](DESIGN.md).

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # type-checks, then writes the static site to dist/
npm run preview    # serves dist/ locally
```

## Deploy

Pushing to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml),
which builds the site and publishes `dist/` to GitHub Pages. In the repo's
**Settings → Pages**, **Source** must be **GitHub Actions**.

`public/CNAME` keeps the custom domain (rs-labs.in) attached.

## Where things live

- `src/content.ts`: contact address, tagline, section list, contact topics
- `src/components/`: one file per sheet (section), plus `Sheet`, `Mark`, `Nav`
- `public/`: favicon, logos, social image (`og.png`), privacy page
