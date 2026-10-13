import { createFileRoute, notFound } from "@tanstack/react-router";

const POLICIES: Record<string, { title: string; body: string[] }> = {
  shipping: { title: "Shipping", body: ["We deliver across Bangladesh. Dhaka: 1–2 working days. Outside Dhaka: 3–5 working days.", "Orders over ৳3,000 ship free; otherwise a flat ৳120 fee applies."] },
  returns: { title: "Returns & exchanges", body: ["Unworn items with tags can be exchanged within 7 days of delivery.", "Sale items are exchange-only."] },
  privacy: { title: "Privacy policy", body: ["We only collect information needed to fulfil your order and never sell your data.", "This demo storefront stores your bag and wishlist only in your browser."] },
  terms: { title: "Terms of service", body: ["Prices are listed in Bangladeshi Taka (৳) and include VAT where applicable.", "This site is currently a demo; no orders are processed."] },
};

export const Route = createFileRoute("/policies/$slug")({
  loader: ({ params }) => { if (!POLICIES[params.slug]) throw notFound(); return { slug: params.slug }; },
  head: ({ loaderData }) => {
    const t = `${loaderData ? POLICIES[loaderData.slug].title : "Policy"} — MR. MEN`;
    return { meta: [{ title: t }, { name: "description", content: `MR. MEN ${t}` }, { property: "og:title", content: t }, { property: "og:description", content: "Store policies." }] };
  },
  component: Policy,
});

function Policy() {
  const { slug } = Route.useLoaderData();
  const p = POLICIES[slug];
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl md:text-5xl">{p.title}</h1>
      {p.body.map((b) => <p key={b} className="mt-5 leading-relaxed text-muted-foreground">{b}</p>)}
    </div>
  );
}
