import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "Account — MR. MEN" }, { name: "description", content: "MR. MEN customer accounts." }, { property: "og:title", content: "Account — MR. MEN" }, { property: "og:description", content: "Customer accounts." }] }),
  component: () => (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <h1 className="text-4xl">Your account</h1>
      <p className="mt-4 text-muted-foreground">Customer sign-in isn't available yet. Your bag and wishlist are saved on this device in the meantime.</p>
      <Link to="/wishlist" className="mt-6 inline-block underline">View wishlist</Link>
    </div>
  ),
});
