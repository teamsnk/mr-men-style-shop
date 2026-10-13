import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { formatBDT, shippingFor } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout (Demo) — MR. MEN" }, { name: "description", content: "Demo checkout for the MR. MEN storefront." }, { property: "og:title", content: "Checkout — MR. MEN" }, { property: "og:description", content: "Demo checkout." }, { name: "robots", content: "noindex" }] }),
  component: Checkout,
});

function Checkout() {
  const { subtotal, cart, clear } = useStore();
  const [done, setDone] = useState(false);
  const ship = shippingFor(subtotal);
  if (done) return <div className="mx-auto max-w-lg px-4 py-24 text-center"><h1 className="text-4xl">Demo complete</h1><p className="mt-4 text-muted-foreground">This was a demonstration. No order was placed and no payment was taken.</p><Button asChild className="mt-8 rounded-none"><Link to="/shop">Keep browsing</Link></Button></div>;
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div role="note" className="border border-accent bg-stone p-4 text-sm"><strong>Demo checkout.</strong> Payments and order processing are not connected yet. Nothing you enter is sent anywhere.</div>
      <h1 className="mt-8 text-4xl">Checkout</h1>
      {cart.length === 0 ? <p className="mt-6">Your bag is empty. <Link to="/shop" className="underline">Shop now</Link></p> : (
        <form className="mt-6 space-y-4" onSubmit={(e) => { e.preventDefault(); clear(); setDone(true); }}>
          {[["name", "Full name", "text"], ["phone", "Phone (01XXXXXXXXX)", "tel"], ["address", "Delivery address", "text"], ["city", "City", "text"]].map(([id, l, t]) => (
            <div key={id}><label htmlFor={id} className="text-sm font-medium">{l}</label><input id={id} type={t} required className="mt-1 h-11 w-full border border-input bg-card px-3 outline-none focus:border-foreground" /></div>
          ))}
          <div className="space-y-1 border-t pt-4 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>{ship === 0 ? "Free" : formatBDT(ship)}</span></div>
            <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatBDT(subtotal + ship)}</span></div>
          </div>
          <Button type="submit" size="lg" className="w-full rounded-none">Place demo order</Button>
        </form>
      )}
    </div>
  );
}
