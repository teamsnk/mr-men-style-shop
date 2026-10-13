import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, HeadContent, Scripts } from "@tanstack/react-router";
import type { ReactNode } from "react";
import appCss from "../styles.css?url";
import { StoreProvider } from "@/lib/store";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CartDrawer } from "@/components/site/CartDrawer";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="mx-auto max-w-md py-32 text-center">
      <h1 className="text-6xl">404</h1>
      <p className="mt-3 text-muted-foreground">This page doesn't exist.</p>
      <Link to="/" className="mt-6 inline-block underline">Back to MR. MEN</Link>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MR. MEN — Modern Menswear from Bangladesh" },
      { name: "description", content: "Premium men's clothing from Bangladesh." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "MR. MEN" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400;600;700&family=Manrope:wght@400;500;600;700&display=swap" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Header />
        <main><Outlet /></main>
        <Footer />
        <CartDrawer />
        <Toaster position="bottom-center" />
      </StoreProvider>
    </QueryClientProvider>
  );
}
