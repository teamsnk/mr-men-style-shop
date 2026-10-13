import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getProduct } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD, formatBDT } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export function CartLines({ compact = false }: { compact?: boolean }) {
  const { cart, setQty, remove } = useStore();
  return (
    <ul className="divide-y">
      {cart.map((l) => {
        const p = getProduct(l.slug);
        if (!p) return null;
        return (
          <li key={l.slug + l.size} className="flex gap-4 py-4">
            <img src={p.images[0]} alt={p.name} className={compact ? "h-24 w-20 object-cover bg-stone" : "h-32 w-26 object-cover bg-stone"} loading="lazy" />
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex justify-between gap-2">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <button onClick={() => remove(l.slug, l.size)} aria-label={`Remove ${p.name}`} className="shrink-0 hover:opacity-60"><X className="h-4 w-4" /></button>
              </div>
              <p className="text-xs text-muted-foreground">{p.colour} · Size {l.size}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center border">
                  <button className="grid h-8 w-8 place-items-center disabled:opacity-30" disabled={l.qty <= 1} onClick={() => setQty(l.slug, l.size, l.qty - 1)} aria-label="Decrease quantity"><Minus className="h-3 w-3" /></button>
                  <span className="w-8 text-center text-sm" aria-live="polite">{l.qty}</span>
                  <button className="grid h-8 w-8 place-items-center disabled:opacity-30" disabled={l.qty >= 10} onClick={() => setQty(l.slug, l.size, l.qty + 1)} aria-label="Increase quantity"><Plus className="h-3 w-3" /></button>
                </div>
                <p className="text-sm font-semibold">{formatBDT(p.price * l.qty)}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function ShippingProgress() {
  const { subtotal } = useStore();
  const left = FREE_SHIPPING_THRESHOLD - subtotal;
  return (
    <div className="bg-stone p-3 text-xs">
      {left > 0 ? <>You're <strong>{formatBDT(left)}</strong> away from free shipping.</> : <>You've unlocked <strong>free shipping</strong>.</>}
      <div className="mt-2 h-1 bg-background"><div className="h-1 bg-primary transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} /></div>
    </div>
  );
}

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, subtotal, count } = useStore();
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader><SheetTitle className="font-display text-2xl">Your bag ({count})</SheetTitle></SheetHeader>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-display text-2xl">Your bag is empty</p>
            <p className="text-sm text-muted-foreground">Start with the essentials — they never go out of style.</p>
            <Button asChild onClick={() => setCartOpen(false)}><Link to="/shop">Shop the collection</Link></Button>
          </div>
        ) : (
          <>
            <div className="px-4"><ShippingProgress /></div>
            <div className="flex-1 overflow-y-auto px-4"><CartLines compact /></div>
            <div className="space-y-3 border-t p-4">
              <div className="flex justify-between text-sm font-semibold"><span>Subtotal</span><span>{formatBDT(subtotal)}</span></div>
              <p className="text-xs text-muted-foreground">Shipping calculated at checkout.</p>
              <Button asChild className="w-full" size="lg" onClick={() => setCartOpen(false)}><Link to="/checkout">Checkout</Link></Button>
              <Button asChild variant="outline" className="w-full" onClick={() => setCartOpen(false)}><Link to="/cart">View full bag</Link></Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
