import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, seriesMap } from "@/data/products";

export const Route = createFileRoute("/series/$seriesName")({
  head: ({ params }) => {
    const info = seriesMap[params.seriesName];
    const title = info ? `${info.title} — Al Misbah Perfumes` : "Collection — Al Misbah Perfumes";
    const description = info?.blurb ?? "Explore the luxury oriental fragrance collections of Al Misbah Perfumes.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SeriesPage,
});

function SeriesPage() {
  const { seriesName } = Route.useParams();
  const info = seriesMap[seriesName];
  const items = products.filter((p) => p.series === seriesName);

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 lg:py-24">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <div className="mt-10 text-center">
        {/* Increased Arabic title font size */}
        <p className="font-display text-3xl text-gilded">{info?.arabic ?? "المصباح"}</p>
        
        {/* Increased main heading font size */}
        <h1 className="mt-3 font-display text-6xl text-foreground lg:text-7xl">
          {info?.title ?? "Collection Not Found"}
        </h1>
        
        <div className="rule-gold mx-auto mt-6 w-40" />
        
        {/* Increased description font size */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {info?.blurb ?? "This collection is not part of our current catalogue. Explore our other series from the menu above."}
        </p>
      </div>

      {items.length > 0 ? (
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="mt-20 text-center text-sm text-muted-foreground">
          No fragrances listed in this collection yet.
        </p>
      )}
    </div>
  );
}