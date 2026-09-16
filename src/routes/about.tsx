import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import me from "@/assets/WhatsApp Image 2026-09-07 at 19.23.39.jpeg";
import ed from "@/assets/WhatsApp Image 2026-09-07 at 19.24.52.jpeg";
import eg from "@/assets/WhatsApp Image 2026-09-07 at 19.24.28.jpeg";
import po from "@/assets/WhatsApp Image 2026-09-07 at 19.24.05.jpeg";
import ko from "@/assets/cat-attar.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title: "Our Heritage — Al Misbah Perfumes",
      },
      {
        name: "description",
        content:
          "The story of Al Misbah: three generations of oriental perfumery, pure oud distillation and alcohol-free botanical craftsmanship.",
      },
      {
        property: "og:title",
        content: "Our Heritage — Al Misbah Perfumes",
      },
      {
        property: "og:description",
        content:
          "Three generations of oriental perfumery and pure oud distillation.",
      },
    ],
  }),

  component: About,
});

function About() {
  return (
    <main className="w-full overflow-x-hidden bg-[#070707] text-white selection:bg-[#d4af37] selection:text-black">
      {/* ================================
          MAIN CONTAINER
      ================================= */}
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:px-8 md:py-16 lg:px-12 lg:py-20">
        
        {/* ================================
            BACK TO HOME
        ================================= */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 sm:mb-12"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2.5 rounded-full border border-[#d4af37]/40 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black shadow-lg transition-all duration-300  hover:text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] sm:px-6 sm:py-3 sm:text-xs sm:tracking-[0.25em]"
          >
            <ArrowLeft className="h-3 w-3 shrink-0 text-black transition-transform duration-300 group-hover:-translate-x-1.5 sm:h-4 sm:w-4" />
            <span className="whitespace-nowrap">Back to Home</span>
          </Link>
        </motion.div>

        {/* ================================
            PAGE INTRO
        ================================= */}
        <motion.header
          initial={{ opacity: 0, y: 30, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full text-center"
        >
          {/* Arabic Logo */}
          <p className="font-display text-3xl leading-none text-[#d4af37] sm:text-4xl md:text-5xl lg:text-[54px]">
            المصباح
          </p>

          {/* Main Heading */}
          <h1 className="mt-3 font-display text-3xl font-medium leading-[1.12] tracking-tight text-white sm:mt-4 sm:text-5xl md:text-6xl lg:text-[68px]">
            The House of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#d4af37]">Al Misbah</span>
          </h1>

          {/* Gold Rule */}
          <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent sm:mt-6 sm:w-32 lg:w-40" />
        </motion.header>

        {/* ================================
            HERITAGE SECTIONS
        ================================= */}
        <div className="mx-auto mt-14 w-full max-w-6xl space-y-16 sm:mt-20 sm:space-y-24 lg:mt-28 lg:space-y-32">
          
          {/* SECTION 1: Image Left / Text Right */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#111] shadow-[0_0_25px_rgba(212,175,55,0.15)] lg:col-span-7">
              <img
                src={ko}
                alt="Our Story - Al Misbah history"
                loading="lazy"
                width={1000}
                height={700}
                className="h-[300px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 sm:h-[380px] lg:h-[460px]"
              />
            </div>
            <div className="space-y-4 lg:col-span-5 lg:space-y-6">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Est. 2021
              </span>
              <h2 className="font-display text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-[38px]">
                Our Story
              </h2>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-8 lg:text-[17px] lg:leading-[1.85]">
                Our journey began with a simple passion — bringing beautiful and memorable fragrances to everyone. We combine traditional fragrance culture with a modern approach to create a unique experience.
              </p>
            </div>
          </motion.section>

          {/* SECTION 2: Text First on Mobile, Image Right on Desktop */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="space-y-4 lg:col-span-5 lg:space-y-6 lg:order-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Collections & Notes
              </span>
              <h2 className="font-display text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-[38px]">
                Our Fragrances
              </h2>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-8 lg:text-[17px] lg:leading-[1.85]">
                From the deep richness of Oud to the freshness of Fresh fragrances and the elegance of Floral scents, our collection is carefully selected for different personalities and occasions.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#111] shadow-[0_0_25px_rgba(212,175,55,0.15)] lg:col-span-7 lg:order-2">
              <img
                src={ed}
                alt="Heritage of Oriental Perfumery"
                loading="lazy"
                width={1000}
                height={700}
                className="h-[300px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 sm:h-[380px] lg:h-[460px]"
              />
            </div>
          </motion.section>

          {/* SECTION 3: Image Left / Text Right */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#111] shadow-[0_0_25px_rgba(212,175,55,0.15)] lg:col-span-7">
              <img
                src={eg}
                alt="Pure Botanical & Oud Extracts"
                loading="lazy"
                width={1000}
                height={700}
                className="h-[300px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 sm:h-[380px] lg:h-[460px]"
              />
            </div>
            <div className="space-y-4 lg:col-span-5 lg:space-y-6">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Quality & Craft
              </span>
              <h2 className="font-display text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-[38px]">
                Our Promise
              </h2>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-8 lg:text-[17px] lg:leading-[1.85]">
                Quality comes first. We focus on selecting fragrances that offer a beautiful scent, lasting impression, and premium feel — while keeping them accessible.
              </p>
            </div>
          </motion.section>

          {/* SECTION 4: Text First on Mobile, Image Right on Desktop */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
          >
            <div className="space-y-4 lg:col-span-5 lg:space-y-6 lg:order-1">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
                Future Outlook
              </span>
              <h2 className="font-display text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-[38px]">
                Our Vision
              </h2>
              <p className="text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-8 lg:text-[17px] lg:leading-[1.85]">
                Our vision is to become a trusted fragrance brand known for quality, elegance, and authenticity. We want every fragrance you choose to become a part of your story.
              </p>
            </div>
            <div className="overflow-hidden rounded-xl border-2 border-[#d4af37] bg-[#111] shadow-[0_0_25px_rgba(212,175,55,0.15)] lg:col-span-7 lg:order-2">
              <img
                src={po}
                alt="Our Commitment"
                loading="lazy"
                width={1000}
                height={700}
                className="h-[300px] w-full object-cover object-center transition-transform duration-700 hover:scale-105 sm:h-[380px] lg:h-[460px]"
              />
            </div>
          </motion.section>

        </div>

        {/* ================================
            CTA SECTION
        ================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 w-full text-center sm:mt-24 lg:mt-32"
        >
          <Link
            to="/contact"
            className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#bf9b30] via-[#d4af37] to-[#f3e5ab] px-8 py-4 text-xs font-bold uppercase tracking-[0.25em] text-black shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.02] hover:opacity-95 hover:shadow-[0_6px_25px_rgba(212,175,55,0.5)] sm:w-auto sm:px-10 sm:text-sm"
          >
            Speak With Our Perfumer
          </Link>
        </motion.div>
      </div>
    </main>
  );
}