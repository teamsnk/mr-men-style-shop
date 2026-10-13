import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/site/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "Wishlist — MR. MEN" }, { name: "description", content: "Pieces you've saved at MR. MEN." }, { property: "og:title", content: "Wishlist — MR. MEN" }, { property: "og:description", content: "Your saved pieces." }] }),
  component: Wish,
});

function Wish() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.slug));
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <h1 className="text-4xl md:text-5xl">Wishlist</h1>
      {items.length === 0 ? <p className="py-20 text-center text-muted-foreground">Nothing saved yet. <Link to="/shop" className="underline">Browse the collection</Link></p> :
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.slug} product={p} />)}</div>}
    </div>
  );
}
