import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-display text-3xl font-bold tracking-[0.12em]">MR. MEN</p>
          <p className="mt-3 text-sm opacity-70">Modern menswear, made in Bangladesh. Built to be worn hard and look sharp doing it.</p>
          <div className="mt-5 flex gap-3">
            {[{ I: Instagram, l: "Instagram", h: "https://instagram.com" }, { I: Facebook, l: "Facebook", h: "https://facebook.com" }, { I: Youtube, l: "YouTube", h: "https://youtube.com" }].map(({ I, l, h }) => (
              <a key={l} href={h} target="_blank" rel="noreferrer" aria-label={`MR. MEN on ${l}`} className="grid h-9 w-9 place-items-center border border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow mb-4 opacity-60">Shop</p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => <li key={c.slug}><Link to="/shop" search={{ category: c.slug }} className="hover:underline">{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 opacity-60">Help</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/policies/$slug" params={{ slug: "shipping" }} className="hover:underline">Shipping</Link></li>
            <li><Link to="/policies/$slug" params={{ slug: "returns" }} className="hover:underline">Returns & exchanges</Link></li>
            <li><Link to="/policies/$slug" params={{ slug: "privacy" }} className="hover:underline">Privacy policy</Link></li>
            <li><Link to="/policies/$slug" params={{ slug: "terms" }} className="hover:underline">Terms of service</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 opacity-60">Contact</p>
          <ul className="space-y-2 text-sm opacity-90">
            <li>Gulshan Avenue, Dhaka 1212</li>
            <li><a href="tel:+8801700000000" className="hover:underline">+880 1700-000000</a></li>
            <li><a href="mailto:hello@mrmen.com.bd" className="hover:underline">hello@mrmen.com.bd</a></li>
            <li>Sat–Thu, 10am–8pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-60">© {new Date().getFullYear()} MR. MEN. All rights reserved.</div>
    </footer>
  );
}
