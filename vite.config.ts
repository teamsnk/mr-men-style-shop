// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readFileSync } from "node:fs";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Every page is identical for all visitors (bag/wishlist live in the browser),
// so all routes are prerendered to static HTML for static hosts like GitHub Pages.
const productSlugs = [...readFileSync("src/lib/products.ts", "utf8").matchAll(/slug: "([a-z0-9-]+)", name:/g)].map((m) => m[1]);
const staticPaths = [
  "/", "/shop", "/cart", "/checkout", "/wishlist", "/account",
  ...["shipping", "returns", "privacy", "terms"].map((s) => `/policies/${s}`),
  ...productSlugs.map((s) => `/product/${s}`),
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    pages: staticPaths.map((path) => ({ path })),
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});
