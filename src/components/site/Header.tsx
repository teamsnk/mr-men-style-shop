import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { CATEGORIES } from "@/lib/products";
import { FREE_SHIPPING_THRESHOLD, formatBDT } from "@/lib/pricing";
import { useStore } from "@/lib/store";

export function Header() {
  const { count, setCartOpen, wishlist } = useStore();
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const iconBtn = "relative grid h-10 w-10 place-items-center transition hover:opacity-60";

  return (
    <>
      <div className="bg-primary py-2 text-center text-[0.7rem] font-semibold tracking-[0.2em] text-primary-foreground uppercase">
        Free shipping across Bangladesh on orders over {formatBDT(FREE_SHIPPING_THRESHOLD)}
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 md:px-8">
          <div className="flex items-center gap-1">
            <Sheet open={menu} onOpenChange={setMenu}>
              <SheetTrigger asChild>
                <button className={`${iconBtn} lg:hidden`} aria-label="Open menu"><Menu className="h-5 w-5" /></button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-background">
                <SheetHeader><SheetTitle className="font-display text-2xl">MR. MEN</SheetTitle></SheetHeader>
                <nav className="mt-4 flex flex-col px-4" aria-label="Mobile">
                  <Link to="/shop" onClick={() => setMenu(false)} className="border-b py-3 font-display text-xl">Shop all</Link>
                  {CATEGORIES.map((c) => (
                    <Link key={c.slug} to="/shop" search={{ category: c.slug }} onClick={() => setMenu(false)} className="border-b py-3 font-display text-xl">{c.name}</Link>
                  ))}
                  <Link to="/wishlist" onClick={() => setMenu(false)} className="py-3 text-sm">Wishlist</Link>
                  <Link to="/account" onClick={() => setMenu(false)} className="py-3 text-sm">Account</Link>
                </nav>
              </SheetContent>
            </Sheet>
            <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
              <Link to="/shop" className="eyebrow hover:opacity-60">Shop</Link>
              {CATEGORIES.slice(0, 5).map((c) => (
                <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="eyebrow hover:opacity-60">{c.name}</Link>
              ))}
            </nav>
          </div>
          <Link to="/" className="font-display text-2xl font-bold tracking-[0.12em] md:text-3xl" aria-label="MR. MEN home">MR. MEN</Link>
          <div className="flex items-center justify-end">
            <button className={iconBtn} onClick={() => setSearch(true)} aria-label="Search"><Search className="h-5 w-5" /></button>
            <Link to="/account" className={`${iconBtn} hidden sm:grid`} aria-label="Account"><User className="h-5 w-5" /></Link>
            <Link to="/wishlist" className={`${iconBtn} hidden sm:grid`} aria-label={`Wishlist, ${wishlist.length} items`}>
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />}
            </Link>
            <button className={iconBtn} onClick={() => setCartOpen(true)} aria-label={`Open bag, ${count} items`}>
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-0.5 top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[0.65rem] font-bold text-primary-foreground">{count}</span>
              )}
            </button>
          </div>
        </div>
      </header>
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent className="bg-background">
          <DialogTitle className="font-display text-2xl">Search MR. MEN</DialogTitle>
          <form onSubmit={(e) => { e.preventDefault(); setSearch(false); navigate({ to: "/shop", search: { q: q.trim() || undefined } }); }}>
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <input id="site-search" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try “panjabi” or “oxford”"
              className="w-full border-b border-input bg-transparent py-3 text-lg outline-none focus:border-foreground" />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
