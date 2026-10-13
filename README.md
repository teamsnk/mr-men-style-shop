# MR. MEN — Storefront

Premium menswear storefront for MR. MEN (Bangladesh). Built with React, TypeScript, TanStack Start, Tailwind CSS v4 and shadcn/ui.

## Run locally
```bash
bun install   # or npm install
bun run dev   # http://localhost:8080
bunx vitest run
```

## Deploy to GitHub Pages (mrmen.snkbp.com)
Every page is prerendered to static HTML at build time (see `vite.config.ts`).

1. Sync the project to GitHub from Lovable.
2. In the GitHub repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   (If it is set to "Deploy from a branch", GitHub serves this README through Jekyll instead of the store.)
3. Push to `main`. `.github/workflows/deploy-pages.yml` builds, then publishes `dist/client` with the `CNAME`.

Local static build: `LOVABLE_SANDBOX=1 bun run build` → static site in `dist/client/`.

### Static hosting notes
- New products need no config change: product pages are read from `src/lib/products.ts` at build time.
- Bag and wishlist work client-side; there is no server code.
- Unknown URLs fall back to `404.html`.

## Demo data & limitations
- Products live in `src/lib/products.ts`; replace with a real catalogue/API later.
- Bag and wishlist are stored in the browser (localStorage).
- **Checkout is a demo.** No payment or order processing is connected.
