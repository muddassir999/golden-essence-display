import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, ArrowLeft, Sparkles } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      {
        title: "Contact Al Misbah Fragrances — Mumbai Atelier",
      },
      {
        name: "description",
        content:
          "Get in touch with Al Misbah Fragrances for fragrance enquiries, bespoke oud blends, wholesale enquiries and consultations.",
      },
      {
        property: "og:title",
        content: "Contact Al Misbah Fragrances",
      },
      {
        property: "og:description",
        content:
          "Get in touch with Al Misbah Fragrances for fragrance enquiries, bespoke oud blends and consultations.",
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

    const formData = new FormData(form);

    const name = formData.get("from_name") as string;
    const email = formData.get("reply_to") as string;
    const message = formData.get("message") as string;

    try {
      await emailjs.send(
        "service_slytxtp",
        "template_xvhijph",
        {
          from_name: name,
          reply_to: email,
          message: message,
        },
        {
          publicKey: "N745b2lD2KdTs1qzu",
        },
      );

      setSent(true);
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);

      setErrorMessage(
        "Failed to send your message. Please try again or contact us directly.",
      );
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: Phone,
      title: "Telephone Enquiries",
      lines: ["+91 93723 79191", "+91 96199 77601"],
    },
    {
      icon: Mail,
      title: "Direct Support",
      lines: ["almisbahfragrances@gmail.com"],
    },
  ];

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#070707] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Ambient Gold Glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-[#d4af37]/5 blur-[140px]" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16 md:px-12 md:py-20 lg:py-24">
        {/* HEADER */}
        <div className="relative mb-12 sm:mb-16">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="mb-6 flex justify-start lg:absolute lg:left-0 lg:top-0 lg:mb-0"
          >
            <Link
              to="/"
              className="group inline-flex items-center gap-2.5 rounded-full border border-[#d4af37]/40 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black shadow-lg transition-all duration-300 hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.25em]"
            >
              <ArrowLeft className="h-3.5 w-3.5 shrink-0 text-black transition-transform duration-300 group-hover:-translate-x-1" />

              <span>Back to Home</span>
            </Link>
          </motion.div>

          {/* Main Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-center lg:pt-3"
          >
            {/* Badge */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
              }}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-3 py-1"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />

              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#d4af37]">
                Get in Touch
              </span>
            </motion.div>

            {/* Arabic */}
            <p
              dir="rtl"
              className="mb-2 font-display text-2xl font-normal text-[#d4af37] sm:text-3xl md:text-4xl"
            >
              اتصل بنا
            </p>

            {/* Title */}
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Contact{" "}
              <span className="bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37] bg-clip-text text-transparent">
                Us
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-3 max-w-lg text-[11px] uppercase tracking-[0.2em] text-zinc-400 sm:mt-4 sm:text-xs sm:tracking-[0.25em]">
              Connect with Al Misbah Fragrances for bespoke blends & enquiries
            </p>

            {/* Divider */}
            <div className="mx-auto mt-6 h-[1px] w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
          </motion.header>
        </div>

        {/* CONTENT */}
        <div className="grid items-start gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 xl:gap-14">
          {/* CONTACT FORM */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative w-full rounded-2xl border border-[#d4af37]/20 bg-[#111111]/90 p-6 shadow-2xl backdrop-blur-md transition-all duration-500 hover:border-[#d4af37]/50 hover:shadow-[0_15px_50px_rgba(212,175,55,0.12)] sm:p-8 md:p-10"
          >
            {/* Top Accent */}
            <div className="absolute left-8 right-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-60" />

            {sent ? (
              /* SUCCESS MESSAGE */
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.5,
                }}
                className="flex min-h-[360px] flex-col items-center justify-center px-2 text-center"
              >
                {/* Success Icon */}
                <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-[#d4af37] bg-[#d4af37]/10 text-2xl text-[#d4af37] shadow-[0_0_25px_rgba(212,175,55,0.3)]">
                  ✓
                </div>

                {/* Arabic */}
                <h2 className="mt-5 font-display text-3xl font-normal text-[#d4af37] sm:text-4xl">
                  شكراً
                </h2>

                {/* English */}
                <h3 className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-[#f3e5ab]">
                  Thank You
                </h3>

                {/* Message */}
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Your message has safely reached Al Misbah Fragrances. A
                  fragrance advisor will get back to you shortly.
                </p>

                {/* Send Again */}
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setErrorMessage("");
                  }}
                  className="mt-8 rounded-full border border-[#d4af37] bg-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              /* FORM */
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                {/* Error */}
                {errorMessage && (
                  <div className="rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-center text-xs leading-relaxed text-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2.5 block text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]"
                  >
                    Your Name
                  </label>

                  <input
                    id="name"
                    name="from_name"
                    required
                    autoComplete="name"
                    className="w-full rounded-xl border border-zinc-800 bg-[#18181b] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-[#d4af37] focus:bg-black focus:ring-1 focus:ring-[#d4af37]/50 sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2.5 block text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]"
                  >
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="reply_to"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-xl border border-zinc-800 bg-[#18181b] px-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-[#d4af37] focus:bg-black focus:ring-1 focus:ring-[#d4af37]/50 sm:text-base"
                    placeholder="you@example.com"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2.5 block text-sm font-bold uppercase tracking-[0.2em] text-[#d4af37]"
                  >
                    Your Message / Custom Requirement
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-zinc-800 bg-[#18181b] px-4 py-3.5 text-sm leading-relaxed text-white placeholder-zinc-500 outline-none transition-all duration-300 focus:border-[#d4af37] focus:bg-black focus:ring-1 focus:ring-[#d4af37]/50 sm:text-base"
                    placeholder="Tell us which fragrance notes or bespoke oud blend you are looking for…"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-gradient-to-r from-[#bf9b30] via-[#d4af37] to-[#f3e5ab] py-4 text-xs font-bold uppercase tracking-[0.25em] text-black shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all duration-300 hover:scale-[1.01] hover:opacity-95 hover:shadow-[0_6px_25px_rgba(212,175,55,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Sending Message..." : "Send Message"}
                </button>
              </form>
            )}
          </motion.div>

          {/* CONTACT DETAILS */}
          <div className="flex flex-col gap-5">
            {contactDetails.map(
              ({ icon: Icon, title, lines }, index) => (
                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    x: 20,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + index * 0.1,
                  }}
                  className="group flex w-full gap-4 rounded-2xl border border-zinc-800/80 bg-[#111111]/80 p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/60 hover:bg-[#161619] hover:shadow-[0_10px_35px_rgba(212,175,55,0.12)] sm:gap-5 sm:p-6"
                >
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 transition-all duration-500 group-hover:scale-105 group-hover:border-[#d4af37] group-hover:bg-[#d4af37]/20">
                    <Icon className="h-5 w-5 text-[#d4af37]" />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                      {title}
                    </h2>

                    <div className="mt-2 space-y-0.5">
                      {lines.map((line) => (
                        <p
                          key={line}
                          className="break-words text-sm font-medium text-zinc-200 sm:text-base"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ),
            )}

            {/* ATELIER NOTE */}
            <motion.div
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
              }}
              className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#161619] to-[#0f0f11] p-6 text-center shadow-lg"
            >
              <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                Experience Pure Luxury
              </h3>

              <p className="text-xs leading-relaxed text-zinc-400">
                Every fragrance from Al Misbah Fragrances is crafted with
                carefully selected ingredients, carrying forward the rich
                tradition of artisanal perfumery.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}