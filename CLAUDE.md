# RS Labs website (rs-labs.in)

RS Labs' company website: "From idea to enterprise". Vite + React +
TypeScript + Tailwind, served by GitHub Pages from this public repo
(`myadashivakumar/RS-labs`).

- **Deploy:** Pages Source must stay **GitHub Actions**
  (`.github/workflows/deploy.yml` builds `dist/`). "Deploy from a branch"
  serves raw source and the site goes blank.
- **Domain:** rs-labs.in at GoDaddy (4 GitHub A records for `@`, `www`
  CNAME). The subdomain `filoka.rs-labs.in` is a CNAME to Cloudflare Pages
  for the Filoka web app (repo `kosha-react`); don't remove it.
- **Products** stay behind blurred "Coming soon" cards until `PRODUCTS_LIVE`
  in `src/content.ts` is set to true.
- **Style:** a company site, not a product site: minimal, light, enterprise.
  No invented stats, testimonials or client logos.
- Business email (@rs-labs.in) is deferred until products are ready.
- Check: `npm run build`.
