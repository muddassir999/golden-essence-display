import { createFileRoute, Link } from "@tanstack/react-router";
import { Droplets, Crown, Truck } from "lucide-react";
import hero from "@/assets/hero.jpg";
import catPerfume from "@/assets/cat-perfume.jpg";
import catAttar from "@/assets/cat-attar.jpg";
import { ProductCard } from "@/components/ProductCard";
import { bestSellers } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Al Misbah Perfumes — The Essence of Royalty" },
      {
        name: "description",
        content:
          "Luxury alcohol-free oriental perfumes and attars. Royal oud, Taif rose and pure botanical extracts, handcrafted in Mumbai since 1958.",
      },
      { property: "og:title", content: "Al Misbah Perfumes — The Essence of Royalty" },
      {
        property: "og:description",
        content:
          "Luxury alcohol-free oriental perfumes and attars, handcrafted in Mumbai since 1958.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <img
          src={hero}
          alt="Crystal oud perfume bottle with golden smoke"
          width={1920}
          height={1088}
          className="
            absolute inset-0
            h-full w-full
            object-cover
            object-[65%_center]
            brightness-130
            contrast-90
            saturate-90
          "
        />

        <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 py-24">
          <p className="font-['Amiri'] text-3xl text-gilded">المصباح للعطور</p>
          <h1 className="mt-5 max-w-2xl font-display text-6xl leading-[1.05] text-foreground lg:text-8xl">
            The Essence of <span className="text-gilded">Royalty</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed tracking-wide text-muted-foreground lg:text-2xl">
            Alcohol-free oriental perfumes and hand-distilled attars, composed from aged oud, Taif
            rose and pure botanical musk — in the Arabian tradition since 2021.
          </p>
          <Link
            to="/series/$seriesName"
            params={{ seriesName: "royal-oud" }}
            className="mt-10 inline-block rounded-sm bg-gilded px-12 py-4 text-sm font-medium uppercase tracking-[0.25em] text-primary-foreground transition-all duration-300 hover:glow-gold"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      <section className="border-y border-border bg-card/40">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-3">
          {[
            {
              icon: Droplets,
              title: "100% Alcohol-Free",
              copy: "Pure perfume oils, gentle on skin",
            },
            { icon: Crown, title: "Royal Craftsmanship", copy: "Hand-blended in small batches" },
            { icon: Truck, title: "Express Shipping", copy: "Dispatched across India in 48 hours" },
          ].map(({ icon: Icon, title, copy }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="h-9 w-9 shrink-0 text-gold" />
              <div className="min-w-0">
                <h2 className="text-lg font-semibold uppercase tracking-[0.2em] text-foreground">
                  {title}
                </h2>
                <p className="mt-1 text-xl text-muted-foreground">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24">
        <h2 className="text-center font-display text-6xl text-foreground">Our Two Houses</h2>
        <div className="rule-gold mx-auto mt-6 w-40" />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {[
            {
              slug: "royal-oud",
              img: catPerfume,
              arabic: "العطور",
              label: "Perfume Series",
              copy: "Eau de parfum in crystal flacons — radiant, modern, long-lasting.",
            },
            {
              slug: "traditional-al-musk",
              img: catAttar,
              arabic: "العطر",
              label: "Attar Series",
              copy: "Concentrated oils in the classical Arabian method — intimate and enduring.",
            },
          ].map((c) => (
            <Link
              key={c.slug}
              to="/series/$seriesName"
              params={{ seriesName: c.slug }}
              className="group relative isolate block overflow-hidden rounded-sm border border-border transition-all duration-500 hover:border-gold hover:glow-gold"
            >
              <div className="h-[32rem] w-full overflow-hidden">
                <img
                  src={c.img}
                  alt={c.label}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 p-10 z-10">
                <p className="font-['Amiri'] text-4xl text-gilded">{c.arabic}</p>
                <h3 className="mt-2 font-display text-5xl text-foreground">{c.label}</h3>
                <p className="mt-3 max-w-md text-xl text-muted-foreground">{c.copy}</p>
                <span className="mt-6 inline-block text-base font-medium uppercase tracking-[0.25em] text-gold transition-transform duration-300 group-hover:translate-x-1">
                  Discover →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28">
        <h2 className="text-center font-display text-5xl text-foreground">Best Sellers</h2>
        <div className="rule-gold mx-auto mt-6 w-40" />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <div
              key={p.id}
              className="relative isolate overflow-hidden rounded-sm transform-gpu will-change-transform"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
