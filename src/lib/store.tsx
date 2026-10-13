import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { getProduct } from "./products";

export type CartLine = { slug: string; size: string; qty: number };

type Store = {
  cart: CartLine[];
  wishlist: string[];
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  count: number;
  subtotal: number;
  add: (slug: string, size: string, qty?: number) => void;
  setQty: (slug: string, size: string, qty: number) => void;
  remove: (slug: string, size: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem("mrmen-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("mrmen-wish") || "[]"));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem("mrmen-cart", JSON.stringify(cart)); }, [cart, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem("mrmen-wish", JSON.stringify(wishlist)); }, [wishlist, loaded]);

  const value = useMemo<Store>(() => {
    const count = cart.reduce((s, l) => s + l.qty, 0);
    const subtotal = cart.reduce((s, l) => s + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);
    return {
      cart, wishlist, cartOpen, setCartOpen, count, subtotal,
      add: (slug, size, qty = 1) => {
        setCart((c) => {
          const i = c.findIndex((l) => l.slug === slug && l.size === size);
          if (i >= 0) return c.map((l, j) => (j === i ? { ...l, qty: Math.min(10, l.qty + qty) } : l));
          return [...c, { slug, size, qty }];
        });
        toast.success(`${getProduct(slug)?.name} added`, { description: `Size ${size} · Qty ${qty}`, action: { label: "View bag", onClick: () => setCartOpen(true) } });
      },
      setQty: (slug, size, qty) =>
        setCart((c) => c.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, Math.min(10, qty)) } : l))),
      remove: (slug, size) => {
        setCart((c) => c.filter((l) => !(l.slug === slug && l.size === size)));
        toast(`Removed from bag`);
      },
      clear: () => setCart([]),
      toggleWish: (slug) => {
        const has = wishlist.includes(slug);
        setWishlist((w) => (has ? w.filter((s) => s !== slug) : [...w, slug]));
        toast(has ? "Removed from wishlist" : "Saved to wishlist");
      },
    };
  }, [cart, wishlist, cartOpen]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore outside provider");
  return c;
}
