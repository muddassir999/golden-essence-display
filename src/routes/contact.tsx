import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, ArrowLeft, ArrowUpRight, Sparkles, Crown } from "lucide-react";
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

const ease = [0.22, 1, 0.36, 1] as const;

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
          message,
        },
        {
          publicKey: "N745b2lD2KdTs1qzu",
        },
      );

      setSent(true);
      form.reset();
    } catch (error) {
      console.error("Error sending email:", error);

      setErrorMessage("Failed to send your message. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  const contactDetails = [
    {
      icon: Phone,
      number: "01",
      title: "Telephone Enquiries",
      lines: ["+91 93723 79191", "+91 96199 77601"],
    },
    {
      icon: Mail,
      number: "02",
      title: "Direct Support",
      lines: ["almisbahfragrances@gmail.com"],
    },
  ];

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white selection:bg-[#d4af37] selection:text-black">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.055] blur-[150px]" />

        <div className="absolute -left-[180px] top-[35%] h-[380px] w-[380px] rounded-full bg-[#d4af37]/[0.025] blur-[140px]" />

        <div className="absolute -bottom-[180px] -right-[120px] h-[420px] w-[420px] rounded-full bg-[#d4af37]/[0.025] blur-[150px]" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* Center glow */}
        <div className="absolute left-1/2 top-[42%] h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.018] blur-[160px]" />
      </div>

      {/* =========================================================
          PAGE CONTAINER
      ========================================================= */}

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-8 pt-4 sm:px-7 sm:pb-10 sm:pt-6 lg:px-10 lg:pb-12 xl:px-14">
        {/* =======================================================
            BACK HOME
        ======================================================= */}

        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease,
          }}
          className="
    relative
    z-50
    mb-3
    -mt-2
    pt-4

    sm:mb-1
    sm:mt-0
    sm:pt-7

    lg:pt-8
  "
        >
          <Link
            to="/"
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="
      group
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-white
      bg-white
      px-3.5
      py-2.5
      text-[7px]
      font-semibold
      uppercase
      tracking-[0.2em]
      text-black
      shadow-[0_8px_30px_rgba(0,0,0,0.4)]
      backdrop-blur-xl
      transition-all
      duration-300
      hover:border-white
      hover:bg-white
      hover:text-black
      active:scale-[0.97]
      sm:px-5
      sm:text-[9px]
    "
          >
            <ArrowLeft
              className="
        h-3.5
        w-3.5
        text-black
        transition-transform
        duration-300
        group-hover:-translate-x-1
        sm:h-3.5
        sm:w-3.5
      "
            />

            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* =======================================================
            HERO
        ======================================================= */}

        <header
          className="
    relative
    mx-auto
    max-w-5xl

    translate-y-1
    pb-9
    pt-7
    text-center

    sm:translate-y-2
    sm:pb-12
    sm:pt-9

    lg:-translate-y-16
    lg:pb-14
    lg:pt-12

    xl:-translate-y-20
  "
        >
          {/* Decorative rings */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/[0.045] sm:h-[330px] sm:w-[330px] lg:h-[430px] lg:w-[430px]" />

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[145px] w-[145px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4af37]/[0.03] sm:h-[245px] sm:w-[245px] lg:h-[320px] lg:w-[320px]" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease,
            }}
            className="relative"
          >
            {/* Eyebrow */}

            <div className="mb-4 flex items-center justify-center gap-2.5 sm:mb-5 sm:gap-3">
              <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#d4af37]/70 sm:w-12" />

              <div className="flex items-center gap-1.5 sm:gap-2">
                <Sparkles className="h-2.5 w-2.5 text-[#d4af37] sm:h-3 sm:w-3" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.35em] text-[#d4af37] sm:text-[9px] sm:tracking-[0.4em]">
                  The House of Fragrance
                </span>
              </div>

              <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#d4af37]/70 sm:w-12" />
            </div>

            {/* Arabic */}

            <motion.p
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease,
              }}
              dir="rtl"
              className="font-display text-4xl leading-none text-[#d4af37] sm:text-5xl md:text-6xl"
            >
              اتصل بنا
            </motion.p>

            {/* Main title */}

            <h1
              className="
                mt-3
                font-display
                text-[48px]
                font-medium
                leading-[0.88]
                tracking-[-0.045em]
                text-white

                sm:text-6xl
                md:text-7xl
                lg:text-[88px]
                xl:text-[96px]
              "
            >
              Let&apos;s
              <br />
              <span className="bg-gradient-to-r from-[#a87916] via-[#f7e7a9] to-[#c69a2e] bg-clip-text text-transparent">
                Connect
              </span>
            </h1>

            {/* Divider */}

            <div className="mt-5 flex items-center justify-center gap-3 sm:mt-6">
              <div className="h-px w-9 bg-gradient-to-r from-transparent to-[#d4af37]/70 sm:w-16" />

              <div className="h-1.5 w-1.5 rotate-45 bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.5)]" />

              <div className="h-px w-9 bg-gradient-to-l from-transparent to-[#d4af37]/70 sm:w-16" />
            </div>

            {/* Subtitle */}

            <p className="mx-auto mt-5 max-w-xl px-2 text-[14px] leading-6 text-zinc-300 sm:mt-6 sm:px-0 sm:text-lg sm:leading-8">
              Whether you are searching for your signature scent, exploring a bespoke blend, or
              simply want to speak with us — we would love to hear from you.
            </p>
          </motion.div>

          {/* Bottom label */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.9,
              duration: 0.8,
            }}
            className="mt-6 flex items-center justify-center gap-2.5 sm:mt-7 sm:gap-3"
          >
            <span className="h-px w-5 bg-white/10 sm:w-8" />

            <span className="text-[7px] uppercase tracking-[0.3em] text-zinc-300 sm:text-[9px] sm:tracking-[0.35em]">
              Your fragrance journey begins here
            </span>

            <span className="h-px w-5 bg-white/10 sm:w-8" />
          </motion.div>
        </header>

        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}

        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(290px,0.65fr)] lg:gap-7 xl:gap-9">
          {/* =====================================================
              FORM
          ===================================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[22px]
              border
              border-white/[0.08]
              bg-[#0b0b0c]/95
              shadow-[0_25px_90px_rgba(0,0,0,0.5)]
              backdrop-blur-2xl

              sm:rounded-[28px]
            "
          >
            <div className="absolute left-[8%] right-[8%] top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-80" />

            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#d4af37]/[0.045] blur-[90px]" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-[#d4af37]/[0.02] blur-[90px]" />

            {sent ? (
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
                  duration: 0.6,
                  ease,
                }}
                className="flex min-h-[460px] flex-col items-center justify-center px-6 py-14 text-center sm:min-h-[520px] sm:px-10"
              >
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#d4af37]/20 blur-2xl" />

                  <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/[0.08] sm:h-20 sm:w-20">
                    <span className="font-display text-3xl text-[#d4af37]">✓</span>
                  </div>
                </div>

                <h2 className="mt-7 font-display text-4xl text-[#d4af37] sm:text-5xl">شكراً</h2>

                <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-[#f3e5ab] sm:text-[11px] sm:tracking-[0.35em]">
                  Message Received
                </p>

                <div className="mx-auto mt-5 h-px w-16 bg-[#d4af37]/40" />

                <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400 sm:text-lg">
                  Your message has safely reached Al Misbah Fragrances. A fragrance advisor will get
                  back to you shortly.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setErrorMessage("");
                  }}
                  className="
                    group
                    mt-8
                    inline-flex
                    items-center
                    gap-3
                    rounded-full
                    border
                    border-[#d4af37]/50
                    px-6
                    py-3.5
                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#d4af37]
                    transition-all
                    duration-300

                    hover:bg-[#d4af37]
                    hover:text-black
                    hover:shadow-[0_10px_35px_rgba(212,175,55,0.25)]

                    sm:px-7
                    sm:text-[9px]
                  "
                >
                  Send Another Message
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="relative p-5 sm:p-8 md:p-9 lg:p-10 xl:p-11">
                <div className="mb-7 sm:mb-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.07]">
                      <Sparkles className="h-4 w-4 text-[#d4af37]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] sm:text-[10px] sm:tracking-[0.35em]">
                        Private Enquiry
                      </p>

                      <p className="mt-1 font-display text-xl leading-tight text-white sm:text-2xl">
                        Tell us what you&apos;re looking for
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 h-px w-full bg-gradient-to-r from-[#d4af37]/30 via-white/[0.06] to-transparent" />
                </div>

                {errorMessage && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mb-6 rounded-xl border border-red-500/25 bg-red-950/20 p-3.5 text-center text-xs leading-relaxed text-red-200 sm:p-4 sm:text-sm"
                  >
                    {errorMessage}
                  </motion.div>
                )}

                <div className="group/field">
                  <label
                    htmlFor="name"
                    className="
    mb-2.5
    flex
    items-center
    gap-2
    text-[9px]
    font-semibold
    uppercase
    tracking-[0.22em]
    text-white
    opacity-100
    transition-colors
    group-focus-within/field:text-[#d4af37]
    sm:text-[10px]
    sm:tracking-[0.25em]
  "
                  >
                    <span className="h-px w-4 shrink-0 bg-[#d4af37]/70" />
                    <span className="text-white">Your Name</span>
                  </label>

                  <input
                    id="name"
                    name="from_name"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300

                      placeholder:text-zinc-600

                      hover:border-white/[0.15]

                      focus:border-[#d4af37]/60
                      focus:bg-[#d4af37]/[0.025]
                      focus:ring-1
                      focus:ring-[#d4af37]/20

                      sm:py-4
                      sm:text-base
                    "
                  />
                </div>

                <div className="group/field mt-5 sm:mt-6">
                  <label
                    htmlFor="email"
                    className="
    mb-2.5
    flex
    items-center
    gap-2
    text-[9px]
    font-semibold
    uppercase
    tracking-[0.22em]
    text-white
    opacity-100
    transition-colors
    group-focus-within/field:text-[#d4af37]
    sm:text-[10px]
    sm:tracking-[0.25em]
  "
                  >
                    <span className="h-px w-4 shrink-0 bg-[#d4af37]/70" />
                    <span className="text-white">Email Address</span>
                  </label>

                  <input
                    id="email"
                    name="reply_to"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300

                      placeholder:text-zinc-600

                      hover:border-white/[0.15]

                      focus:border-[#d4af37]/60
                      focus:bg-[#d4af37]/[0.025]
                      focus:ring-1
                      focus:ring-[#d4af37]/20

                      sm:py-4
                      sm:text-base
                    "
                  />
                </div>

                <div className="group/field mt-5 sm:mt-6">
                  <label
  htmlFor="message"
  className="
    mb-2.5
    flex
    items-center
    gap-2
    text-[9px]
    font-semibold
    uppercase
    tracking-[0.22em]
    text-white
    opacity-100
    transition-colors
    group-focus-within/field:text-[#d4af37]
    sm:text-[10px]
    sm:tracking-[0.25em]
  "
>
  <span className="h-px w-4 shrink-0 bg-[#d4af37]/70" />
  <span className="text-white">Your Message</span>
</label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about the fragrance, notes or bespoke blend you are looking for..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-4
                      py-3.5
                      text-sm
                      leading-6
                      text-white
                      outline-none
                      transition-all
                      duration-300

                      placeholder:text-zinc-600

                      hover:border-white/[0.15]

                      focus:border-[#d4af37]/60
                      focus:bg-[#d4af37]/[0.025]
                      focus:ring-1
                      focus:ring-[#d4af37]/20

                      sm:py-4
                      sm:text-base
                      sm:leading-7
                    "
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    group
                    relative
                    mt-6
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    overflow-hidden
                    rounded-xl
                    bg-gradient-to-r
                    from-[#a87916]
                    via-[#d4af37]
                    to-[#f3e5ab]
                    py-3.5
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.27em]
                    text-black
                    shadow-[0_10px_35px_rgba(212,175,55,0.16)]
                    transition-all
                    duration-500

                    hover:-translate-y-0.5
                    hover:shadow-[0_15px_45px_rgba(212,175,55,0.28)]

                    disabled:cursor-not-allowed
                    disabled:opacity-50

                    sm:mt-7
                    sm:py-4
                    sm:text-[10px]
                  "
                >
                  <span className="relative z-10">
                    {loading ? "Sending Message..." : "Send Message"}
                  </span>

                  {!loading && (
                    <ArrowUpRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  )}

                  <div className="absolute inset-y-0 -left-[80%] w-[45%] rotate-12 bg-white/30 blur-xl transition-all duration-700 group-hover:left-[130%]" />
                </button>

                <p className="mt-4 text-center text-[8px] uppercase tracking-[0.16em] text-zinc-300 sm:mt-5 sm:text-[9px]">
                  Your enquiry is handled with complete discretion.
                </p>
              </form>
            )}
          </motion.section>

          {/* =====================================================
              RIGHT SIDE
          ===================================================== */}

          <aside className="flex flex-col gap-4 sm:gap-5">
            {contactDetails.map(({ icon: Icon, number, title, lines }, index) => (
              <motion.div
                key={title}
                initial={{
                  opacity: 0,
                  x: 25,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + index * 0.12,
                  ease,
                }}
                className="
                    group
                    relative
                    overflow-hidden
                    rounded-[20px]
                    border
                    border-white/[0.08]
                    bg-[#0c0c0d]/90
                    p-5
                    shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                    backdrop-blur-xl
                    transition-all
                    duration-500

                    hover:-translate-y-1
                    hover:border-[#d4af37]/30
                    hover:shadow-[0_25px_70px_rgba(212,175,55,0.08)]

                    sm:rounded-[22px]
                    sm:p-6
                  "
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-[#d4af37]/[0.055] blur-3xl transition-all duration-500 group-hover:bg-[#d4af37]/[0.1]" />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#d4af37]/25 bg-[#d4af37]/[0.07] transition-all duration-500 group-hover:border-[#d4af37]/60 group-hover:bg-[#d4af37]/[0.12] sm:h-12 sm:w-12">
                    <Icon className="h-4.5 w-4.5 text-[#d4af37] sm:h-5 sm:w-5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#d4af37]/70">
                        {number}
                      </span>

                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d4af37]" />
                    </div>

                    <h2 className="mt-1 text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400 sm:text-[10px] sm:tracking-[0.2em]">
                      {title}
                    </h2>

                    <div className="mt-3 space-y-1.5">
                      {lines.map((line) => (
                        <p
                          key={line}
                          className="break-words text-sm font-medium leading-6 text-white sm:text-[15px]"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* PHILOSOPHY */}

            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.55,
                ease,
              }}
              className="
                relative
                overflow-hidden
                rounded-[20px]
                border
                border-[#d4af37]/20
                bg-gradient-to-br
                from-[#17140b]
                via-[#0d0d0d]
                to-[#090909]
                p-5
                shadow-[0_25px_70px_rgba(0,0,0,0.4)]

                sm:rounded-[22px]
                sm:p-7
              "
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#d4af37]/10 blur-[70px]" />

              <div className="relative">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.07] sm:h-11 sm:w-11">
                  <Crown className="h-4 w-4 text-[#d4af37]" />
                </div>

                <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] sm:text-[10px] sm:tracking-[0.35em]">
                  The Al Misbah Philosophy
                </p>

                <h3 className="mt-3 font-display text-2xl leading-tight text-white sm:text-3xl">
                  Every scent tells
                  <br />
                  <span className="text-[#d4af37]">a story.</span>
                </h3>

                <div className="my-5 h-px w-full bg-gradient-to-r from-[#d4af37]/30 via-white/[0.06] to-transparent" />

                <p className="text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">
                  Carefully selected fragrances, timeless oriental craftsmanship and a personal
                  touch — created for those who appreciate the art of scent.
                </p>
              </div>
            </motion.div>

            {/* SIGNATURE */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
                duration: 0.7,
              }}
              className="flex items-center justify-center gap-3 py-2 sm:py-3"
            >
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/35 to-[#d4af37]/60" />

              <div className="shrink-0 text-center">
                <p className="font-display text-xl text-[#d4af37]">المصباح</p>

                <p className="mt-1 text-[7px] uppercase tracking-[0.3em] text-zinc-300 sm:text-[8px] sm:tracking-[0.35em]">
                  The Essence of Royalty
                </p>
              </div>

              <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/35 to-[#d4af37]/60" />
            </motion.div>
          </aside>
        </div>

        {/* =======================================================
            FOOTER
        ======================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
            duration: 0.8,
          }}
          className="mx-auto mt-10 max-w-6xl border-t border-white/[0.20] py-6 text-center sm:mt-14 sm:py-7"
        >
          <p className="text-[7px] uppercase tracking-[0.3em] text-zinc-300 sm:text-[9px] sm:tracking-[0.35em]">
            Al Misbah Fragrances · Mumbai Atelier · Crafted With Intention
          </p>
        </motion.div>
      </div>
    </main>
  );
}
