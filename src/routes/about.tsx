import { createFileRoute, Link } from "@tanstack/react-router";
import catAttar from "@/assets/cat-attar.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Heritage — Al Misbah Perfumes" },
      {
        name: "description",
        content:
          "The story of Al Misbah: three generations of oriental perfumery, pure oud distillation and alcohol-free botanical craftsmanship.",
      },
      { property: "og:title", content: "Our Heritage — Al Misbah Perfumes" },
      {
        property: "og:description",
        content: "Three generations of oriental perfumery and pure oud distillation.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-20 lg:py-28">
      <p className="text-center font-display text-5xl text-gilded sm:text-6xl">المصباح</p>
      <h1 className="mt-4 text-center font-display text-6xl text-foreground sm:text-7xl lg:text-8xl">
        The House of Al Misbah
      </h1>
      <div className="rule-gold mx-auto mt-8 w-56" />

      <img
        src={catAttar}
        alt="Traditional attar oil vials with oud wood"
        loading="lazy"
        width={1024}
        height={1280}
        className="mt-14 h-[22rem] w-full rounded-sm border border-border object-cover sm:h-[30rem]"
      />

      <div className="mt-16 space-y-16 text-lg leading-[2.1] text-muted-foreground sm:text-xl sm:leading-[2.2]">
        <section>
          <h2 className="mb-5 font-display text-4xl text-gold sm:text-5xl">A Lamp Lit in 1958</h2>
          <p>
            Al Misbah — "the lamp" — began as a modest attar counter on Mohammed Ali Road, where
            our grandfather traded oud chips carried across the Arabian Sea. What began as a single
            wooden cabinet of oils has become a house devoted to the slow art of oriental
            perfumery. Every formula we sell today still passes through the hands of the family.
          </p>
        </section>

        <div className="rule-gold" />

        <section>
          <h2 className="mb-5 font-display text-4xl text-gold sm:text-5xl">Heritage of Oriental Perfumery</h2>
          <p>
            Arabian perfumery is not built on speed. Agarwood is buried, aged and coaxed over
            months before a single drop of dehn al oud emerges. Taif roses are gathered before
            sunrise, when the oil is heaviest in the petal. We keep those rhythms — copper stills,
            long maceration, and blending by nose rather than by machine.
          </p>
        </section>

        <div className="rule-gold" />

        <section>
          <h2 className="mb-5 font-display text-4xl text-gold sm:text-5xl">Pure Botanical & Oud Extracts</h2>
          <p>
            Our attars are entirely alcohol-free — pure perfume oil, wearable close to the skin and
            gentle for daily use. We source Mysore sandalwood, Cambodian and Hindi oud, jasmine
            sambac and white musk from growers we have bought from for decades, and we refuse
            synthetic fillers wherever a natural extract will serve.
          </p>
        </section>

        <div className="rule-gold" />

        <section>
          <h2 className="mb-5 font-display text-4xl text-gold sm:text-5xl">Our Commitment</h2>
          <p>
            Each bottle is filled, sealed and inspected by hand in Mumbai. If a batch does not
            match the reference sample kept in our vault, it never leaves the atelier. That is the
            whole of our promise: honest materials, patient craft, and a fragrance that lasts as
            long as the memory it makes.
          </p>
        </section>
      </div>

      <div className="mt-20 text-center">
        <Link
          to="/contact"
          className="inline-block rounded-sm bg-gilded px-14 py-5 text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:opacity-95 hover:scale-[1.02] glow-gold"
        >
          Speak With Our Perfumer
        </Link>
      </div>
    </div>
  );
}