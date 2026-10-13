import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS, categoryName, getProduct } from "@/lib/products";
import { formatBDT } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => { const p = getProduct(params.slug); if (!p) throw notFound(); return { slug: p.slug }; },
  head: ({ loaderData }) => {
    const p = loaderData ? getProduct(loaderData.slug) : undefined;
    const t = p ? `${p.name} — MR. MEN` : "Product — MR. MEN";
    return { meta: [{ title: t }, { name: "description", content: p?.description ?? "MR. MEN menswear" }, { property: "og:title", content: t }, { property: "og:description", content: p?.description ?? "" }, { property: "og:type", content: "product" }] };
  },
  component: PDP,
});

function PDP() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add, toggleWish, wishlist } = useStore();
  const [img, setImg] = useState(0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState(false);
  const related = PRODUCTS.filter((x) => x.category === p.category && x.slug !== p.slug).concat(PRODUCTS.filter((x) => x.category !== p.category)).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-8" key={slug}>
      <nav className="text-xs text-muted-foreground" aria-label="Breadcrumb"><Link to="/shop">Shop</Link> / <Link to="/shop" search={{ category: p.category }}>{categoryName(p.category)}</Link> / {p.name}</nav>
      <div className="mt-6 grid gap-10 md:grid-cols-2">
        <div className="flex flex-col-reverse gap-3 md:flex-row">
          <div className="flex gap-3 md:flex-col">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={cn("w-20 border-2", img === i ? "border-foreground" : "border-transparent")}>
                <img src={src} alt="" className="aspect-[4/5] w-full object-cover" />
              </button>
            ))}
          </div>
          <img src={p.images[img]} alt={`${p.name} in ${p.colour}`} className="aspect-[4/5] w-full flex-1 bg-stone object-cover" />
        </div>
        <div>
          {p.badge && <p className="eyebrow text-accent">{p.badge}</p>}
          <h1 className="mt-2 text-4xl md:text-5xl">{p.name}</h1>
          <p className="mt-3 text-xl font-semibold">{p.compareAt && <span className="mr-2 font-normal text-muted-foreground line-through">{formatBDT(p.compareAt)}</span>}{formatBDT(p.price)}</p>
          <p className="mt-1 text-sm text-muted-foreground">Colour: {p.colour}</p>
          <p className="mt-6 leading-relaxed">{p.description}</p>
          <fieldset className="mt-8">
            <legend className="eyebrow mb-3">Select size</legend>
            <div className="flex flex-wrap gap-2">
              {p.sizes.map((s) => (
                <button key={s} onClick={() => { setSize(s); setErr(false); }} aria-pressed={size === s} className={cn("h-11 min-w-12 border px-3 text-sm font-semibold", size === s ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground")}>{s}</button>
              ))}
            </div>
            {err && <p className="mt-2 text-sm text-destructive" role="alert">Please choose a size.</p>}
          </fieldset>
          <div className="mt-6 flex gap-3">
            <div className="flex items-center border">
              <button className="grid h-12 w-10 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center">{qty}</span>
              <button className="grid h-12 w-10 place-items-center" onClick={() => setQty(Math.min(10, qty + 1))} aria-label="Increase quantity"><Plus className="h-4 w-4" /></button>
            </div>
            <Button size="lg" className="h-12 flex-1 rounded-none" onClick={() => (size ? add(p.slug, size, qty) : setErr(true))}>Add to bag</Button>
            <Button size="lg" variant="outline" className="h-12 rounded-none" onClick={() => toggleWish(p.slug)} aria-label="Toggle wishlist" aria-pressed={wishlist.includes(p.slug)}>
              <Heart className={cn("h-4 w-4", wishlist.includes(p.slug) && "fill-foreground")} />
            </Button>
          </div>
          <ul className="mt-8 list-disc space-y-1 border-t pt-6 pl-5 text-sm text-muted-foreground">{p.details.map((d) => <li key={d}>{d}</li>)}</ul>
        </div>
      </div>
      <h2 className="mt-24 text-3xl">You may also like</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{related.map((r) => <ProductCard key={r.slug} product={r} />)}</div>
    </div>
  );
}
