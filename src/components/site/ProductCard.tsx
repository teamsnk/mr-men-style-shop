import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatBDT } from "@/lib/pricing";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(product.slug);
  return (
    <article className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        <Link to="/product/$slug" params={{ slug: product.slug }} aria-label={product.name}>
          <img src={product.images[0]} alt={`${product.name} in ${product.colour}`} loading="lazy" width={768} height={960}
            className="img-zoom h-full w-full object-cover group-hover:scale-105" />
        </Link>
        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 bg-background px-2 py-1 text-[0.6rem]">{product.badge}</span>
        )}
        <button onClick={() => toggleWish(product.slug)} aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 transition hover:bg-background">
          <Heart className={cn("h-4 w-4", wished && "fill-foreground")} />
        </button>
        <div className="absolute inset-x-0 bottom-0 translate-y-0 bg-background/95 p-3 transition md:translate-y-full md:group-hover:translate-y-0 md:group-focus-within:translate-y-0">
          <p className="eyebrow mb-2 text-[0.6rem] text-muted-foreground">Quick add</p>
          <div className="flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <button key={s} onClick={() => add(product.slug, s)} aria-label={`Add ${product.name} size ${s} to bag`}
                className="min-w-9 border border-input px-2 py-1.5 text-xs font-semibold transition hover:bg-primary hover:text-primary-foreground">
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="block truncate text-sm font-semibold hover:underline">
            {product.name}
          </Link>
          <p className="text-xs text-muted-foreground">{product.colour}</p>
        </div>
        <p className="shrink-0 text-sm font-semibold">
          {product.compareAt && <span className="mr-1.5 font-normal text-muted-foreground line-through">{formatBDT(product.compareAt)}</span>}
          {formatBDT(product.price)}
        </p>
      </div>
    </article>
  );
}
