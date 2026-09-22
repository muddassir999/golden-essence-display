import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Gem,
  Crown,
  Star,
  ShieldCheck,
  Heart,
} from "lucide-react";

import iao from "@/assets/io.png";
import ab1 from "@/assets/ab1.png";
import ab2 from "@/assets/ab2.png";
import ab3 from "@/assets/ab4.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "Our Heritage — Al Misbah Perfumes",
      },
      {
        name: "description",
        content:
          "Discover the story, craftsmanship and fragrance philosophy behind Al Misbah Perfumes.",
      },
      {
        property: "og:title",
        content: "Our Heritage — Al Misbah Perfumes",
      },
      {
        property: "og:description",
        content: "The story, craftsmanship and vision behind Al Misbah Perfumes.",
      },
    ],
  }),

  component: About,
});

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: {
    opacity: 0,
    y: 35,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.15,
  },
  transition: {
    duration: 0.8,
    ease,
  },
};

/* ============================================================
   GOLD DIVIDER
============================================================ */

function GoldLine() {
  return (
    <div className="mt-6 flex items-center justify-center gap-3 sm:mt-7 sm:gap-4">
      <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/70 sm:w-16 lg:w-24" />

      <div className="relative flex h-3 w-3 items-center justify-center">
        <div className="absolute h-2 w-2 rotate-45 bg-[#d4af37]" />
        <div className="absolute h-3 w-3 rotate-45 border border-[#d4af37]/40" />
      </div>

      <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/70 sm:w-16 lg:w-24" />
    </div>
  );
}

/* ============================================================
   SECTION LABEL
============================================================ */

function SectionNumber({ number, label }: { number: string; label: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 sm:mb-6">
      <span className="font-display text-xl text-[#d4af37] sm:text-2xl">{number}</span>

      <div className="h-px w-8 bg-[#d4af37]/50 sm:w-14" />

      <span className="text-[7px] font-semibold uppercase tracking-[0.28em] text-zinc-400 sm:text-[8px] sm:tracking-[0.38em]">
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   IMAGE FRAME
============================================================ */

function ImageFrame({
  src,
  alt,
  number,
  label,
}: {
  src: string;
  alt: string;
  number: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease }}
      className="group relative mx-auto w-full max-w-[570px]"
    >
      {/* GOLD GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -inset-3
          rounded-[30px]
          bg-[#d4af37]/[0.07]
          blur-3xl
          transition-all
          duration-700
          group-hover:bg-[#d4af37]/[0.13]
          sm:-inset-5
        "
      />

      {/* CORNER DECORATION */}
      <div className="pointer-events-none absolute -right-2 -top-2 z-20 h-12 w-12 border-r border-t border-[#d4af37]/50 sm:-right-3 sm:-top-3 sm:h-20 sm:w-20" />

      <div className="pointer-events-none absolute -bottom-2 -left-2 z-20 h-12 w-12 border-b border-l border-[#d4af37]/50 sm:-bottom-3 sm:-left-3 sm:h-20 sm:w-20" />

      {/* FRAME */}
      <div
        className="
          relative
          rounded-[24px]
          border
          border-[#d4af37]/30
          bg-[#101010]
          p-1.5
          shadow-[0_25px_80px_rgba(0,0,0,0.55)]
          transition-all
          duration-500
          group-hover:border-[#d4af37]/60
          sm:rounded-[30px]
          sm:p-2
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-[20px]
            border
            border-white/[0.10]
            bg-[#181818]
            sm:rounded-[25px]
          "
        >
          {/* IMAGE */}
          <img
            src={src}
            alt={alt}
            loading="lazy"
            width={1024}
            height={1280}
            draggable={false}
            className="
              aspect-[4/5]
              w-full
              object-cover
              transition-transform
              duration-[1400ms]
              ease-out
              group-hover:scale-[1.045]
            "
          />

          {/* LIGHT OVERLAY - previously too dark */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/55
              via-black/5
              to-transparent
            "
          />

          {/* GOLD LIGHT */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_50%_15%,rgba(212,175,55,0.22),transparent_48%)]
              opacity-80
              transition-opacity
              duration-700
              group-hover:opacity-100
            "
          />

          {/* TOP BRAND */}
          <div className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-xl sm:right-5 sm:top-5 sm:px-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.9)]" />

            <span className="text-[7px] font-medium uppercase tracking-[0.28em] text-white sm:text-[8px]">
              Al Misbah
            </span>
          </div>

          {/* ARABIC WATERMARK */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.10]">
            <span className="font-display text-6xl text-[#d4af37] sm:text-8xl">المصباح</span>
          </div>

          {/* BOTTOM INFO */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 sm:bottom-5 sm:left-5 sm:right-5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d4af37]/60 bg-black/60 backdrop-blur-xl sm:h-12 sm:w-12">
                <span className="text-[7px] font-semibold tracking-[0.18em] text-[#f3e5ab] sm:text-[8px] sm:tracking-[0.2em]">
                  {number}
                </span>
              </div>

              <div className="min-w-0 rounded-full border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-xl sm:px-4">
                <span className="block truncate text-[6px] font-medium uppercase tracking-[0.18em] text-white sm:text-[8px] sm:tracking-[0.28em]">
                  {label}
                </span>
              </div>
            </div>

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/55 backdrop-blur-xl transition-all duration-500 group-hover:border-[#d4af37]/70 group-hover:bg-[#d4af37]/15 sm:h-12 sm:w-12">
              <ArrowUpRight className="h-4 w-4 text-[#d4af37] transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   ABOUT PAGE
============================================================ */

function About() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-[#080808] text-white selection:bg-[#d4af37] selection:text-black">
      {/* ======================================================
          BACKGROUND
      ====================================================== */}

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {/* LEFT GOLD LIGHT */}
        <div className="absolute -left-[20%] top-[5%] h-[400px] w-[400px] rounded-full bg-[#d4af37]/[0.045] blur-[120px] sm:h-[550px] sm:w-[550px]" />

        {/* RIGHT GOLD LIGHT */}
        <div className="absolute -right-[20%] top-[30%] h-[450px] w-[450px] rounded-full bg-[#d4af37]/[0.035] blur-[130px] sm:h-[650px] sm:w-[650px]" />

        {/* BOTTOM GOLD LIGHT */}
        <div className="absolute bottom-[-5%] left-[15%] h-[400px] w-[400px] rounded-full bg-[#d4af37]/[0.035] blur-[120px] sm:h-[550px] sm:w-[550px]" />

        {/* VERY SUBTLE GRID */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* ======================================================
          WRAPPER
      ====================================================== */}

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* ====================================================
            BACK HOME
        ==================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease }}
          className="pt-12 sm:pt-12 lg:pt-14"
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
      min-h-[42px]
      items-center
      gap-2.5
      rounded-full
      border
      border-white/[0.13]
      bg-[#111]/85
      px-4
      text-[8px]
      font-semibold
      uppercase
      tracking-[0.22em]
      text-zinc-300
      shadow-[0_10px_35px_rgba(0,0,0,0.35)]
      backdrop-blur-xl
      transition-all
      duration-300
      hover:border-[#d4af37]/50
      hover:bg-[#d4af37]/[0.08]
      hover:text-[#f3e5ab]
      active:scale-95
      sm:min-h-[44px]
      sm:px-5
      sm:text-[9px]
    "
          >
            <ArrowLeft className="h-4 w-4 text-zinc-300 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-[#d4af37]" />

            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* ====================================================
            HERO
        ==================================================== */}
        <header
          className="
    relative
    flex
    min-h-[500px]
    flex-col
    items-center
    justify-center
    text-center
    sm:min-h-[560px]
    lg:min-h-[600px]
    xl:min-h-[650px]
  "
        >
          {/* OUTER RING */}

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[230px]
              w-[230px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#d4af37]/[0.09]
              sm:h-[350px]
              sm:w-[350px]
              md:h-[460px]
              md:w-[460px]
              lg:h-[540px]
              lg:w-[540px]
            "
          />

          {/* INNER RING */}

          <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.2,
              delay: 0.1,
              ease,
            }}
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[165px]
              w-[165px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#d4af37]/[0.06]
              sm:h-[270px]
              sm:w-[270px]
              md:h-[360px]
              md:w-[360px]
              lg:h-[420px]
              lg:w-[420px]
            "
          />

          {/* HERO GLOW */}

          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/[0.055] blur-[80px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]" />

          {/* HERO CONTENT */}

          {/* HERO CONTENT */}

         <motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.9,
    ease,
  }}
  className="
    relative
    z-10
    w-full
    max-w-5xl
    px-2
    -translate-y-6
    sm:-translate-y-5
    md:translate-y-0
    lg:-translate-y-16
    xl:-translate-y-20
    2xl:-translate-y-20
  "
>
            {/* EYEBROW */}

            <div className="mb-4 flex items-center justify-center gap-3 sm:mb-5 sm:gap-4">
              <span className="h-px w-7 bg-[#d4af37]/70 sm:w-14 lg:w-20" />

              <div className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-[#d4af37]" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] sm:text-[9px] sm:tracking-[0.42em]">
                  The House of Fragrance
                </span>
              </div>

              <span className="h-px w-7 bg-[#d4af37]/70 sm:w-14 lg:w-20" />
            </div>

            {/* ARABIC */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease,
              }}
              dir="rtl"
              className="
                font-display
                text-5xl
                leading-none
                text-[#d4af37]
                drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]
                sm:text-6xl
                md:text-7xl
                lg:text-8xl
              "
            >
              المصباح
            </motion.p>

            {/* HEADING */}

            <h1
              className="
                mt-4
                font-display
                text-[40px]
                font-medium
                leading-[0.9]
                tracking-[-0.04em]
                sm:mt-5
                sm:text-[56px]
                md:text-7xl
                lg:text-[82px]
                xl:text-[96px]
              "
            >
              The House of
              <br />
              <span className="bg-gradient-to-r from-[#b77e18] via-[#f8e7a4] to-[#d4a83a] bg-clip-text text-transparent">
                Al Misbah
              </span>
            </h1>

            <GoldLine />

            {/* DESCRIPTION */}

            <p className="mx-auto mt-5 max-w-[590px] px-3 text-[12px] leading-6 text-zinc-300 sm:mt-6 sm:px-0 sm:text-base sm:leading-7 md:text-lg">
              A modern expression of oriental fragrance, crafted with passion, elegance and an
              appreciation for timeless scent.
            </p>

            {/* STATS */}

            <div className="mx-auto mt-7 grid max-w-[340px] grid-cols-3 border-y border-white/[0.10] py-3.5 sm:mt-8 sm:max-w-md sm:py-4">
              {[
                ["01", "Passion"],
                ["02", "Craft"],
                ["03", "Elegance"],
              ].map(([number, label], index) => (
                <div key={number} className="relative flex items-center justify-center">
                  <div className="text-center">
                    <p className="font-display text-xl text-[#d4af37] sm:text-2xl">{number}</p>

                    <p className="mt-1 text-[7px] uppercase tracking-[0.22em] text-zinc-400 sm:text-[8px] sm:tracking-[0.3em]">
                      {label}
                    </p>
                  </div>

                  {index < 2 && (
                    <div className="absolute right-0 h-8 w-px bg-white/[0.10] sm:h-10" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* SCROLL */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 1.5,
              duration: 0.8,
            }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[6px] uppercase tracking-[0.3em] text-zinc-300">Explore</span>

              <div className="h-7 w-px bg-gradient-to-b from-[#d4af37]/80 to-transparent sm:h-9" />
            </div>
          </motion.div>
        </header>

        {/* ====================================================
            QUOTE
        ==================================================== */}

        <motion.section
          {...fadeUp}
          className="relative border-y border-white/[0.09] bg-white/[0.012] py-10 sm:py-14 lg:py-16"
        >
          <div className="mx-auto max-w-5xl px-2 text-center">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.06] sm:mb-6 sm:h-14 sm:w-14">
              <Sparkles className="h-4 w-4 text-[#d4af37] sm:h-5 sm:w-5" />
            </div>

            <p className="font-display text-[25px] leading-[1.35] text-zinc-100 sm:text-3xl md:text-4xl lg:text-[42px]">
              &quot;A fragrance is more than a scent.
              <span className="text-[#d4af37]"> It becomes part of your story.</span>
              &quot;
            </p>
          </div>
        </motion.section>

        {/* ====================================================
            CONTENT
        ==================================================== */}

        <div className="mx-auto max-w-6xl space-y-16 py-12 sm:space-y-20 sm:py-16 lg:space-y-24 lg:py-20">
          {/* STORY */}

          <motion.section
            {...fadeUp}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14"
          >
            <div className="lg:col-span-6">
              <ImageFrame src={iao} alt="Our Story - Al Misbah" number="01" label="Our Story" />
            </div>

            <div className="lg:col-span-6">
              <SectionNumber number="01" label="Our Story" />

              <h2 className="font-display text-[44px] font-medium leading-[0.9] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[68px]">
                Our
                <br />
                <span className="bg-gradient-to-r from-[#b77e18] via-[#f0d77b] to-[#c99b31] bg-clip-text text-transparent">
                  Story
                </span>
              </h2>

              <div className="mt-6 h-px w-16 bg-[#d4af37]/60 sm:mt-7 sm:w-24" />

              <p className="mt-5 max-w-xl text-[14px] leading-7 text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
                Our journey began with a simple passion — bringing beautiful and memorable
                fragrances to everyone.
              </p>

              <p className="mt-3 max-w-xl text-[14px] leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                We combine traditional fragrance culture with a modern approach to create an
                experience that feels timeless, personal and unmistakably Al Misbah.
              </p>

              <div className="mt-6 flex items-center gap-3 sm:mt-7">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.06]">
                  <Sparkles className="h-4 w-4 text-[#d4af37]" />
                </div>

                <div>
                  <p className="text-[7px] uppercase tracking-[0.25em] text-zinc-500">
                    Established
                  </p>

                  <p className="mt-1 font-display text-lg text-[#d4af37]">Est. 2021</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* FRAGRANCES */}

          <motion.section
            {...fadeUp}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14"
          >
            <div className="order-2 lg:order-1 lg:col-span-6">
              <SectionNumber number="02" label="Collections & Notes" />

              <h2 className="font-display text-[44px] font-medium leading-[0.9] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[68px]">
                Our
                <br />
                <span className="bg-gradient-to-r from-[#b77e18] via-[#f0d77b] to-[#c99b31] bg-clip-text text-transparent">
                  Fragrances
                </span>
              </h2>

              <div className="mt-6 h-px w-16 bg-[#d4af37]/60 sm:mt-7 sm:w-24" />

              <p className="mt-5 max-w-xl text-[14px] leading-7 text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
                From the deep richness of Oud to the freshness of contemporary fragrances and the
                elegance of Floral scents, every collection is thoughtfully selected.
              </p>

              <div className="mt-6 flex max-w-xl flex-wrap gap-2 sm:mt-7 sm:gap-2.5">
                {["Oud", "Floral", "Fresh", "Woody", "Musk"].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/[0.12] bg-white/[0.035] px-4 py-2.5 text-[7px] uppercase tracking-[0.2em] text-zinc-300 transition-all duration-300 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/[0.08] hover:text-[#d4af37] sm:px-5 sm:py-3 sm:text-[8px]"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3 sm:mt-7">
                <Gem className="h-5 w-5 text-[#d4af37]" />

                <span className="text-[8px] uppercase tracking-[0.24em] text-zinc-400 sm:text-[9px]">
                  Fragrance for every personality
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <ImageFrame
                src={ab3}
                alt="Al Misbah Fragrance Collection"
                number="02"
                label="Our Fragrances"
              />
            </div>
          </motion.section>

          {/* PROMISE */}

          <motion.section
            {...fadeUp}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14"
          >
            <div className="lg:col-span-6">
              <ImageFrame
                src={ab1}
                alt="Al Misbah Quality and Craftsmanship"
                number="03"
                label="Quality & Craft"
              />
            </div>

            <div className="lg:col-span-6">
              <SectionNumber number="03" label="Quality & Craft" />

              <h2 className="font-display text-[44px] font-medium leading-[0.9] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[68px]">
                Our
                <br />
                <span className="bg-gradient-to-r from-[#b77e18] via-[#f0d77b] to-[#c99b31] bg-clip-text text-transparent">
                  Promise
                </span>
              </h2>

              <div className="mt-6 h-px w-16 bg-[#d4af37]/60 sm:mt-7 sm:w-24" />

              <p className="mt-5 max-w-xl text-[14px] leading-7 text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
                Quality comes first. We focus on selecting fragrances that offer a beautiful scent,
                lasting impression and premium feel — while keeping them accessible.
              </p>

              <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
                <div className="group/card rounded-[20px] border border-white/[0.10] bg-gradient-to-br from-white/[0.05] to-transparent p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/35 sm:rounded-[24px] sm:p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.06] sm:h-11 sm:w-11">
                    <Crown className="h-4 w-4 text-[#d4af37]" />
                  </div>

                  <p className="font-display text-lg text-white sm:text-xl">Quality</p>

                  <p className="mt-1.5 text-[9px] leading-5 text-zinc-400 sm:text-[10px]">
                    Carefully selected fragrances
                  </p>
                </div>

                <div className="group/card rounded-[20px] border border-white/[0.10] bg-gradient-to-br from-white/[0.05] to-transparent p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#d4af37]/35 sm:rounded-[24px] sm:p-5">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.06] sm:h-11 sm:w-11">
                    <Star className="h-4 w-4 text-[#d4af37]" />
                  </div>

                  <p className="font-display text-lg text-white sm:text-xl">Elegance</p>

                  <p className="mt-1.5 text-[9px] leading-5 text-zinc-400 sm:text-[10px]">
                    Made to leave an impression
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 sm:mt-7">
                <ShieldCheck className="h-5 w-5 text-[#d4af37]" />

                <span className="text-[8px] uppercase tracking-[0.24em] text-zinc-400 sm:text-[9px]">
                  Crafted with care
                </span>
              </div>
            </div>
          </motion.section>

          {/* VISION */}

          <motion.section
            {...fadeUp}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 xl:gap-14"
          >
            <div className="order-2 lg:order-1 lg:col-span-6">
              <SectionNumber number="04" label="Future Outlook" />

              <h2 className="font-display text-[44px] font-medium leading-[0.9] tracking-[-0.03em] sm:text-6xl md:text-7xl lg:text-[68px]">
                Our
                <br />
                <span className="bg-gradient-to-r from-[#b77e18] via-[#f0d77b] to-[#c99b31] bg-clip-text text-transparent">
                  Vision
                </span>
              </h2>

              <div className="mt-6 h-px w-16 bg-[#d4af37]/60 sm:mt-7 sm:w-24" />

              <p className="mt-5 max-w-xl text-[14px] leading-7 text-zinc-300 sm:mt-6 sm:text-lg sm:leading-8">
                Our vision is to become a trusted fragrance brand known for quality, elegance and
                authenticity.
              </p>

              <p className="mt-3 max-w-xl text-[14px] leading-7 text-zinc-300 sm:text-lg sm:leading-8">
                We want every fragrance you choose to become a part of your story — a signature that
                feels uniquely yours.
              </p>

              <div className="mt-7 flex items-center gap-3 sm:mt-8">
                <div className="h-px w-10 bg-[#d4af37]/60 sm:w-14" />

                <span className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#d4af37] sm:text-[8px] sm:tracking-[0.32em]">
                  Your story. Your signature.
                </span>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-6">
              <ImageFrame src={ab2} alt="Al Misbah Vision" number="04" label="Our Vision" />
            </div>
          </motion.section>
        </div>

        {/* ====================================================
            FINAL CTA
        ==================================================== */}

        <motion.section
          {...fadeUp}
          className="
            relative
            mx-auto
            mb-10
            max-w-5xl
            overflow-hidden
            rounded-[28px]
            border
            border-[#d4af37]/25
            bg-gradient-to-br
            from-[#1b170c]
            via-[#0d0d0d]
            to-[#101010]
            px-5
            py-12
            text-center
            shadow-[0_25px_90px_rgba(0,0,0,0.55)]
            sm:mb-14
            sm:rounded-[34px]
            sm:px-10
            sm:py-16
            lg:mb-16
            lg:px-16
            lg:py-20
          "
        >
          <div className="pointer-events-none absolute left-1/2 top-[-100px] h-[220px] w-[350px] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.13] blur-[90px] sm:h-[300px] sm:w-[550px]" />

          <div className="pointer-events-none absolute inset-2 rounded-[24px] border border-[#d4af37]/[0.08] sm:inset-3 sm:rounded-[30px]" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/[0.06] sm:mb-6 sm:h-14 sm:w-14">
              <Heart className="h-5 w-5 text-[#d4af37]" />
            </div>

            <p className="text-[7px] font-semibold uppercase tracking-[0.35em] text-[#d4af37] sm:text-[9px] sm:tracking-[0.45em]">
              The Al Misbah Philosophy
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl font-display text-[30px] leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-[58px]">
              Crafted to be remembered.
              <br />
              <span className="text-[#d4af37]">Chosen to become yours.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-[12px] leading-6 text-zinc-300 sm:text-base sm:leading-7">
              Discover a fragrance that speaks quietly, stays beautifully and becomes uniquely
              yours.
            </p>

            <Link
              to="/contact"
              className="
                group
                mt-8
                inline-flex
                min-h-[50px]
                w-full
                max-w-[320px]
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#d4af37]
                px-7
                py-3.5
                text-[8px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-black
                shadow-[0_12px_40px_rgba(212,175,55,0.16)]
                transition-all
                duration-300
                hover:scale-[1.025]
                hover:bg-[#f1da78]
                hover:shadow-[0_18px_55px_rgba(212,175,55,0.28)]
                active:scale-[0.98]
                sm:mt-9
                sm:min-h-[54px]
                sm:w-auto
                sm:max-w-none
                sm:px-10
                sm:text-[9px]
              "
            >
              <span>Speak With Our Perfumer</span>

              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.section>

        {/* ====================================================
            FOOTER
        ==================================================== */}

        <div className="pb-10 pt-2 text-center sm:pb-14">
          <div className="mx-auto mb-5 flex max-w-sm items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#d4af37]/40" />

            <div className="h-1.5 w-1.5 rotate-45 bg-[#d4af37]/80" />

            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#d4af37]/40" />
          </div>

          <p className="font-display text-2xl text-[#d4af37] sm:text-3xl">المصباح</p>

          <p className="mt-1.5 text-[7px] uppercase tracking-[0.35em] text-zinc-400 sm:text-[8px] sm:tracking-[0.45em]">
            The Essence of Royalty
          </p>
        </div>
      </div>
    </main>
  );
}
