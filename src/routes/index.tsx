import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { RotateCcw, ShieldCheck, Truck, Scissors } from "lucide-react";
import hero from "@/assets/hero.jpg";
import editorial from "@/assets/editorial.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/site/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MR. MEN — Modern Menswear from Bangladesh" },
      { name: "description", content: "Shirts, polos, panjabi, trousers and jackets. Premium men's clothing made in Bangladesh, priced in BDT." },
      { property: "og:title", content: "MR. MEN — Modern Menswear" },
      { property: "og:description", content: "Premium men's clothing made in Bangladesh." },
    ],
  }),
  component: Home,
});

function Home() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  return (
    <>
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden bg-primary">
        <img src={hero} alt="Man in ivory linen shirt and black trousers" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-90" />
        <div className="relative mx-auto flex h-full max-w-7xl items-end px-4 pb-16 md:items-center md:px-8">
          <div className="fade-up max-w-lg text-primary-foreground">
            <p className="eyebrow">Autumn / Winter 2026</p>
            <h1 className="mt-4 text-5xl leading-[0.95] md:text-7xl">Dressed with intent.</h1>
            <p className="mt-5 max-w-sm opacity-85">Clean lines, honest fabrics, sharp tailoring. The new MR. MEN collection is here.</p>
            <Button asChild size="lg" variant="secondary" className="mt-8 rounded-none px-8"><Link to="/shop">Shop the collection</Link></Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-3xl md:text-4xl">Shop by category</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} to="/shop" search={{ category: c.slug }} className="group">
              <div className="aspect-[4/5] overflow-hidden bg-stone"><img src={c.image} alt={c.name} loading="lazy" className="img-zoom h-full w-full object-cover group-hover:scale-105" /></div>
              <p className="eyebrow mt-3">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      <Grid title="New arrivals" items={PRODUCTS.filter((p) => p.isNew).slice(0, 8)} />

      <section className="bg-stone">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:px-8">
          <img src={editorial} alt="Man in black panjabi seated on stone steps" loading="lazy" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
          <div>
            <p className="eyebrow text-muted-foreground">The Festive Edit</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Tradition, tailored.</h2>
            <p className="mt-5 max-w-md text-muted-foreground">Our panjabi are cut from fine cotton and cotton-linen, finished with tonal buttons and a modern mandarin collar. Heritage dressing, without the fuss.</p>
            <Button asChild size="lg" className="mt-8 rounded-none px-8"><Link to="/shop" search={{ category: "panjabi" }}>Shop panjabi</Link></Button>
          </div>
        </div>
      </section>

      <Grid title="Best sellers" items={PRODUCTS.filter((p) => p.bestseller).slice(0, 4)} />

      <section className="border-y">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {[{ I: Truck, t: "Nationwide delivery", d: "Dhaka 1–2 days" }, { I: RotateCcw, t: "7-day exchange", d: "Easy size swaps" }, { I: Scissors, t: "Made in Bangladesh", d: "Ethically produced" }, { I: ShieldCheck, t: "Quality promise", d: "Built to last" }].map(({ I, t, d }) => (
            <div key={t} className="flex items-center gap-3"><I className="h-6 w-6 shrink-0" /><div><p className="text-sm font-semibold">{t}</p><p className="text-xs text-muted-foreground">{d}</p></div></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-4 pt-20 text-center">
        <h2 className="text-3xl md:text-4xl">Join the MR. MEN list</h2>
        <p className="mt-3 text-muted-foreground">New drops, style notes and early access. No spam.</p>
        <form noValidate className="mt-6 flex flex-col gap-2 sm:flex-row" onSubmit={(e) => {
          e.preventDefault();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) { setErr("Please enter a valid email address."); return; }
          setErr(""); setEmail(""); toast.success("You're on the list", { description: "Demo only — no email was sent." });
        }}>
          <label htmlFor="nl" className="sr-only">Email address</label>
          <input id="nl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!err} aria-describedby="nl-err" placeholder="you@example.com" className="h-12 flex-1 border border-input bg-card px-4 outline-none focus:border-foreground" />
          <Button type="submit" size="lg" className="h-12 rounded-none px-8">Subscribe</Button>
        </form>
        <p id="nl-err" className="mt-2 text-sm text-destructive" role="alert">{err}</p>
      </section>
    </>
  );
}

function Grid({ title, items }: { title: string; items: typeof PRODUCTS }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
      <div className="flex items-end justify-between"><h2 className="text-3xl md:text-4xl">{title}</h2><Link to="/shop" className="eyebrow underline">View all</Link></div>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
    </section>
  );
}
