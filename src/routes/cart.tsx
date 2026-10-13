import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CartLines, ShippingProgress } from "@/components/site/CartDrawer";
import { formatBDT, shippingFor } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Bag — MR. MEN" }, { name: "description", content: "Review the items in your MR. MEN bag." }, { property: "og:title", content: "Your Bag — MR. MEN" }, { property: "og:description", content: "Your MR. MEN shopping bag." }] }),
  component: Cart,
});

function Cart() {
  const { cart, subtotal } = useStore();
  const ship = shippingFor(subtotal);
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 md:px-8">
      <h1 className="text-4xl md:text-5xl">Your bag</h1>
      {cart.length === 0 ? (
        <div className="py-24 text-center"><p className="font-display text-2xl">Your bag is empty.</p><Button asChild className="mt-6 rounded-none"><Link to="/shop">Shop the collection</Link></Button></div>
      ) : (
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_320px]">
          <CartLines />
          <aside className="h-fit space-y-3 bg-stone p-6">
            <ShippingProgress />
            <div className="flex justify-between text-sm"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
            <div className="flex justify-between text-sm"><span>Shipping</span><span>{ship === 0 ? "Free" : formatBDT(ship)}</span></div>
            <div className="flex justify-between border-t pt-3 font-semibold"><span>Total</span><span>{formatBDT(subtotal + ship)}</span></div>
            <Button asChild size="lg" className="w-full rounded-none"><Link to="/checkout">Checkout</Link></Button>
          </aside>
        </div>
      )}
    </div>
  );
}
