# MR. MEN — Storefront

Premium menswear storefront for MR. MEN (Bangladesh). Built with React, TypeScript, TanStack Start, Tailwind CSS v4 and shadcn/ui.

## Run locally
```bash
bun install   # or npm install
bun run dev   # http://localhost:8080
bunx vitest run
```

## Deploy via GitHub
1. In Lovable, connect GitHub (Settings → GitHub) to sync this repo.
2. Build: `bun run build`. Deploy to any host supporting the build output (Cloudflare Pages/Workers, Netlify, Vercel).

### Static hosting notes
- The app uses server rendering by default. For pure static hosting, enable prerendering in `vite.config.ts` (`tanstackStart.prerender`) and list static pages (`/`, `/shop`, `/cart`, `/wishlist`, `/checkout`, `/account`, each `/product/<slug>` and `/policies/<slug>`).
- Configure your host to fall back to the app for unknown routes.

## Demo data & limitations
- Products live in `src/lib/products.ts`; replace with a real catalogue/API later.
- Bag and wishlist are stored in the browser (localStorage).
- **Checkout is a demo.** No payment or order processing is connected.
