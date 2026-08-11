import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import emailjs from "@emailjs/browser";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Al Misbah Perfumes — Mumbai Atelier" },
      {
        name: "description",
        content:
          "Visit our Mumbai boutique or write to us for bespoke oud blends, wholesale enquiries and fragrance consultations.",
      },
      { property: "og:title", content: "Contact Al Misbah Perfumes" },
      {
        property: "og:description",
        content: "Mumbai boutique, bespoke oud blends and fragrance consultations.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        "service_f8lg21c",    // EmailJS Service ID
        "template_tea3g0p",    // EmailJS Template ID
        form,
        "-FllaH_LYbOty2ckJ"      // EmailJS Public Key
      );

      setSent(true);
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-20 lg:py-28">
      <h1 className="text-center font-display text-5xl text-foreground lg:text-7xl">Contact Us</h1>
      <p className="mt-4 text-center text-xs tracking-[0.25em] text-muted-foreground uppercase sm:text-sm">
        We reply within one working day
      </p>
      <div className="rule-gold mx-auto mt-8 w-48" />

      <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-sm border border-border bg-card p-8 sm:p-10">
          {sent ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-gold text-2xl text-gold glow-gold">
                ✓
              </span>
              
              {/* Arabic & English Success Message */}
              <h2 className="mt-6 font-display text-4xl text-gold font-normal">شكراً</h2>
              <h3 className="mt-1 text-xs uppercase tracking-[0.3em] text-gold font-semibold">Thank You</h3>

              <p className="mt-4 max-w-sm text-base text-muted-foreground sm:text-lg">
                Your message has reached our atelier. A fragrance advisor will write back shortly.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="mt-8 rounded-sm border border-gold px-8 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-gold transition-all hover:bg-gilded hover:text-primary-foreground"
              >
                Send another
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {errorMessage && (
                <div className="rounded-sm bg-red-950/50 border border-red-500/50 p-3 text-sm text-red-200 text-center">
                  {errorMessage}
                </div>
              )}

              <div>
                <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Name
                </label>
                <input
                  id="name"
                  name="from_name"
                  required
                  className="w-full rounded-sm border border-input bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-gold"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Email
                </label>
                <input
                  id="email"
                  name="reply_to"
                  type="email"
                  required
                  className="w-full rounded-sm border border-input bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-gold"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-sm border border-input bg-background px-4 py-3.5 text-base text-foreground outline-none transition-colors focus:border-gold"
                  placeholder="Tell us which fragrance you are looking for…"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-sm bg-gilded py-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary-foreground transition-all duration-300 hover:opacity-95 hover:scale-[1.01] glow-gold disabled:opacity-50"
              >
                {loading ? "Sending Message..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        <div className="space-y-6">
          {[
            { icon: MapPin, title: "Boutique", lines: ["Shop 14, Mohammed Ali Road", "Bhendi Bazaar, Mumbai 400003"] },
            { icon: Phone, title: "Telephone", lines: ["+91 98200 45678", "+91 22 2345 6789"] },
            { icon: Mail, title: "Support", lines: ["care@almisbahperfumes.com", "wholesale@almisbahperfumes.com"] },
            { icon: Clock, title: "Hours", lines: ["Mon – Sat · 11:00 – 21:30", "Sunday · By appointment"] },
          ].map(({ icon: Icon, title, lines }) => (
            <div key={title} className="flex gap-4 rounded-sm border border-border bg-card p-6 sm:p-7">
              <Icon className="mt-1.5 h-6 w-6 shrink-0 text-gold" />
              <div className="min-w-0">
                <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">{title}</h2>
                {lines.map((l) => (
                  <p key={l} className="mt-2 text-base text-muted-foreground sm:text-lg">{l}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}