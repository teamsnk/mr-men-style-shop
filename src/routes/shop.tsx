import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS, categoryName, type Category } from "@/lib/products";
import { cn } from "@/lib/utils";

type Search = { category?: Category; q?: string; sort?: "featured" | "price-asc" | "price-desc" | "new"; size?: string };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: CATEGORIES.some((c) => c.slug === s.category) ? (s.category as Category) : undefined,
    q: typeof s.q === "string" && s.q ? s.q : undefined,
    sort: ["featured", "price-asc", "price-desc", "new"].includes(s.sort as string) ? (s.sort as Search["sort"]) : undefined,
    size: typeof s.size === "string" && s.size ? s.size : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop Men's Clothing — MR. MEN" },
      { name: "description", content: "Browse MR. MEN shirts, tees, polos, trousers, panjabi and jackets. Prices in BDT." },
      { property: "og:title", content: "Shop — MR. MEN" },
      { property: "og:description", content: "The full MR. MEN collection." },
    ],
  }),
  component: Shop,
});

const SIZES = ["S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38"];

function Shop() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  let items = PRODUCTS.filter((p) => (!s.category || p.category === s.category) && (!s.size || p.sizes.includes(s.size)) &&
    (!s.q || `${p.name} ${p.colour} ${p.category}`.toLowerCase().includes(s.q.toLowerCase())));
  if (s.sort === "price-asc") items = [...items].sort((a, b) => a.price - b.price);
  if (s.sort === "price-desc") items = [...items].sort((a, b) => b.price - a.price);
  if (s.sort === "new") items = [...items].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
  const chip = (on: boolean) => cn("eyebrow whitespace-nowrap border px-3 py-2 text-[0.65rem] transition", on ? "bg-primary text-primary-foreground border-primary" : "hover:border-foreground");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl md:text-6xl">{s.category ? categoryName(s.category) : s.q ? `Results for “${s.q}”` : "The collection"}</h1>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Category">
        <Link to="/shop" search={(p) => ({ ...p, category: undefined })} className={chip(!s.category)}>All</Link>
        {CATEGORIES.map((c) => <Link key={c.slug} to="/shop" search={(p) => ({ ...p, category: c.slug })} className={chip(s.category === c.slug)}>{c.name}</Link>)}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y py-3">
        <label className="flex items-center gap-2 text-sm">Size
          <select value={s.size ?? ""} onChange={(e) => navigate({ search: (p) => ({ ...p, size: e.target.value || undefined }) })} className="border bg-card px-2 py-1.5">
            <option value="">Any</option>{SIZES.map((z) => <option key={z}>{z}</option>)}
          </select>
        </label>
        <p className="text-sm text-muted-foreground">{items.length} products</p>
        <label className="flex items-center gap-2 text-sm">Sort
          <select value={s.sort ?? "featured"} onChange={(e) => navigate({ search: (p) => ({ ...p, sort: e.target.value as Search["sort"] }) })} className="border bg-card px-2 py-1.5">
            <option value="featured">Featured</option><option value="new">Newest</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option>
          </select>
        </label>
      </div>
      {items.length === 0 ? (
        <div className="py-24 text-center"><p className="font-display text-2xl">Nothing matches those filters.</p><Link to="/shop" className="mt-4 inline-block underline">Clear all filters</Link></div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
      )}
    </div>
  );
}
