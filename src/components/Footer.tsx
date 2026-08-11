import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-5xl text-gilded">المصباح</p>
          <p className="mt-2 text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Al Misbah Perfumes
          </p>
          <p className="mt-5 max-w-sm text-xl leading-relaxed text-muted-foreground">
            Alcohol-free oriental fragrances, distilled from pure oud, Taif rose and botanical
            musk in the tradition of Arabian perfumery.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold uppercase tracking-[0.25em] text-gold">Quick Links</h3>
          <div className="mt-5 space-y-4 text-xl text-muted-foreground">
            <Link to="/" className="block transition-colors hover:text-gold">Home</Link>
            <Link to="/about" className="block transition-colors hover:text-gold">About Us</Link>
            <Link to="/contact" className="block transition-colors hover:text-gold">Contact Us</Link>
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold uppercase tracking-[0.25em] text-gold">Collections</h3>
          <div className="mt-5 space-y-4 text-xl text-muted-foreground">
            {[
              { slug: "royal-oud", label: "Royal OUD Series" },
              { slug: "signature-edp", label: "Signature EDP" },
              { slug: "woody-collection", label: "Woody Collection" },
              { slug: "traditional-al-musk", label: "Traditional Al-Musk" },
              { slug: "floral-attars", label: "Floral Attars" },
            ].map(({ slug, label }) => (
              <Link
                key={slug}
                to="/series/$seriesName"
                params={{ seriesName: slug }}
                className="block transition-colors hover:text-gold"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-base font-semibold uppercase tracking-[0.25em] text-gold">Visit Our Store</h3>
          <address className="mt-5 space-y-4 text-xl not-italic leading-relaxed text-muted-foreground">
            <p>Shop 14, Mohammed Ali Road,<br />Bhendi Bazaar, Mumbai 400003</p>
            <p>+91 98200 45678</p>
            <p>care@almisbahperfumes.com</p>
          </address>
        </div>
      </div>
      <div className="rule-gold" />
      <p className="px-5 py-6 text-center text-base tracking-[0.2em] text-muted-foreground">
        © {new Date().getFullYear()} AL MISBAH PERFUMES — ALL RIGHTS RESERVED
      </p>
    </footer>
  );
}