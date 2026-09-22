import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Droplets, Crown, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import hero1 from "@/assets/hero1 (1).png";
import hero2 from "@/assets/hero1 (2).png";
import catPerfume from "@/assets/cat-perfume.jpg";
import catAttar from "@/assets/cat-attar.png";
import hero10 from "@/assets/hero10.png";
import hero from "@/assets/hero29.png";
import index from "@/assets/hero33.png";
import vfx from "@/assets/video.mp4";

import { ProductCard } from "@/components/ProductCard";
import { bestSellers } from "@/data/products";
import attar from "@/assets/good.png";
import origin from "@/assets/o1.jpeg";
import origin2 from "@/assets/o2.jpeg";
import origin3 from "@/assets/o3.jpeg";
import origin4 from "@/assets/o4.jpeg";
import origin5 from "@/assets/o5.jpeg";
import origin6 from "@/assets/o6.jpeg";
import origin8 from "@/assets/o8.jpeg";
import origin9 from "@/assets/o9.jpeg";
import iu from "@/assets/iu.png";
import iou from "@/assets/iuo.jpeg";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Al Misbah Perfumes — The Essence of Royalty",
      },
      {
        name: "description",
        content:
          "Luxury alcohol-free oriental perfumes and attars. Royal oud, Taif rose and pure botanical musk, handcrafted in Mumbai since 1958.",
      },
      {
        property: "og:title",
        content: "Al Misbah Perfumes — The Essence of Royalty",
      },
      {
        property: "og:description",
        content:
          "Luxury alcohol-free oriental perfumes and attars, handcrafted in Mumbai since 1958.",
      },
    ],
  }),

  component: Index,
});

const heroSlides = [
  {
    image: origin6,
    arabic: "المصباح للعطور",
    title: "The Essence of",
    highlight: "Royalty",
    description:
      "Alcohol-free oriental perfumes and hand-distilled attars,Taif rose and pure botanical musk — in the Arabian tradition since 2021.",
    button: "Explore Collection",
    series: "signature-edp",
  },
  {
    image: origin8,
    arabic: "عطور شرقية فاخرة",
    title: "Discover the",
    highlight: "Oud",
    description:
      "Experience the deep and captivating character of aged oud, carefully crafted for those who appreciate timeless Arabian perfumery.",
    button: "Discover Oud",
    series: "royal-oud",
  },
  {
    image: iou,
    arabic: "ورد الطائف",
    title: "The Beauty of",
    highlight: "Taif Rose",
    description: "A luxurious floral composition inspired by the legendary Taif rose",
    button: "Explore Rose",
    series: "attar-series",
  },
];

function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  const toggleMute = () => {
    if (!videoRef.current) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentHero = heroSlides[currentSlide] ?? heroSlides[0]!;

  // Load the heavy video only when the video section is close to the viewport.
  // This prevents the MP4 from competing with the hero, products and first-screen content.
  useEffect(() => {
    const section = videoSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-transition w-full overflow-x-hidden">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section
        className="
    relative
    isolate
    min-h-[440px]
    w-full
    overflow-hidden

    sm:min-h-[450px]
    md:min-h-[480px]
    lg:min-h-[510px]
    xl:min-h-[535px]
    2xl:min-h-[560px]
  "
      >
        {/* =====================================================
      HERO IMAGES
  ===================================================== */}
        {heroSlides.map((slide, index) => (
          <img
            key={index}
            src={slide.image}
            alt={`${slide.title} ${slide.highlight}`}
            width={1920}
            height={1088}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : "lazy"}
            decoding="async"
            className={`
        absolute
        inset-0
        z-0

        h-full
        w-full

        object-cover

        /* =========================
           MOBILE IMAGE
        ========================= */

        object-[68%_center]

        brightness-[1.18]
        contrast-[0.98]
        saturate-[1.05]

        transition-opacity
        duration-1000
        ease-in-out

        ${currentSlide === index ? "opacity-100" : "pointer-events-none opacity-0"}

        /* =========================
           TABLET
        ========================= */

        sm:object-[68%_center]
        sm:brightness-[1.12]

        /* =========================
           DESKTOP
        ========================= */

        md:object-[68%_center]
        md:brightness-[1.08]

        lg:object-[65%_center]

        xl:object-[62%_center]

        2xl:object-center
      `}
          />
        ))}

        {/* =====================================================
      LEFT OVERLAY
  ===================================================== */}
        <div
          className="
      pointer-events-none
      absolute
      inset-y-0
      left-0
      z-[1]

      /* MOBILE */
      w-[58%]

      bg-gradient-to-r
      from-black/60
      via-black/25
      to-transparent

      /* TABLET */
      sm:w-full
      sm:from-black/65
      sm:via-black/38
      sm:to-transparent

      /* MEDIUM */
      md:w-[73%]
      md:from-black/70
      md:via-black/42
      md:to-transparent

      /* DESKTOP */
      lg:w-[63%]
      lg:from-background
      lg:via-background/78
      lg:to-transparent

      xl:w-[58%]

      2xl:w-[53%]
    "
        />

        {/* =====================================================
      BOTTOM OVERLAY
  ===================================================== */}
        <div
          className="
      pointer-events-none
      absolute
      inset-0
      z-[1]

      bg-gradient-to-t
      from-black/40
      via-transparent
      to-transparent

      sm:from-black/45
      md:from-black/50
    "
        />

        {/* =====================================================
      RIGHT OVERLAY
  ===================================================== */}
        <div
          className="
      pointer-events-none
      absolute
      inset-y-0
      right-0
      z-[1]
      hidden

      bg-gradient-to-l
      from-black/15
      to-transparent

      lg:block
      lg:w-[20%]

      xl:w-[18%]
    "
        />

        {/* =====================================================
      HERO CONTENT
  ===================================================== */}
        <div
          className="
      relative
      z-10
      mx-auto
      flex
      min-h-[440px]
      w-full
      max-w-[1440px]
      items-center

      px-5
      py-8
      pb-20

      sm:min-h-[450px]
      sm:px-16
      sm:py-9

      md:min-h-[480px]
      md:px-20
      md:py-10

      lg:min-h-[510px]
      lg:px-24
      lg:py-11

      xl:min-h-[535px]
      xl:px-28
      xl:py-12

      2xl:min-h-[560px]
      2xl:px-32
    "
        >
          <div
            className="
        w-full
        max-w-[270px]

        sm:max-w-[460px]
        md:max-w-[500px]
        lg:max-w-[540px]
        xl:max-w-[570px]
      "
          >
            {/* =====================================================
          ARABIC
      ===================================================== */}
            <motion.p
              key={`arabic-${currentSlide}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="
          font-['Amiri']
          text-[12px]
          leading-4
          text-gilded

          sm:text-base
          md:text-lg
          lg:text-xl
          xl:text-[22px]
        "
            >
              {currentHero.arabic}
            </motion.p>

            {/* =====================================================
          TITLE
      ===================================================== */}
            <motion.h1
              key={`title-${currentSlide}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
          mt-1
          max-w-[270px]

          font-display
          font-medium
          leading-[1.05]
          tracking-tight
          text-white

          text-[clamp(1.45rem,6vw,1.9rem)]

          sm:mt-2
          sm:max-w-[460px]
          sm:text-[clamp(2rem,3.6vw,3.2rem)]

          md:text-[clamp(2.25rem,3.4vw,3.5rem)]

          lg:mt-2.5
          lg:max-w-[540px]
          lg:text-[clamp(2.4rem,3.1vw,3.7rem)]

          xl:text-[3.85rem]
        "
            >
              {currentHero.title} <span className="text-gilded">{currentHero.highlight}</span>
            </motion.h1>

            {/* =====================================================
          DESCRIPTION
      ===================================================== */}
            <motion.p
              key={`description-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.08,
              }}
              className="
          mt-2
          max-w-[230px]

          text-[10px]
          leading-[1.45]
          text-white/90

          sm:mt-3.5
          sm:max-w-[450px]
          sm:text-[12px]

          md:max-w-[480px]
          md:text-[13px]
          md:leading-5

          lg:mt-4
          lg:max-w-[510px]
          lg:text-[14px]

          xl:mt-4
          xl:max-w-[550px]
          xl:text-[15px]
          xl:leading-6
        "
            >
              {currentHero.description}
            </motion.p>

            {/* =====================================================
          BUTTON
      ===================================================== */}
            <motion.div
              key={`button-${currentSlide}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.16,
              }}
              className="
          mt-3

          sm:mt-5
          md:mt-6
          lg:mt-6
          xl:mt-7
        "
            >
          {currentHero.series === "attar-series" ? (
  <Link
    to="/attar-series"
    className="inline-flex min-h-[34px] items-center justify-center rounded-sm bg-gilded px-3 py-1.5 whitespace-nowrap text-[8.5px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_25px_rgba(212,175,55,0.30)] sm:min-h-[40px] sm:px-6 sm:text-[10px] md:min-h-[42px] md:px-7 lg:min-h-[44px] lg:px-8 xl:min-h-[46px] xl:px-9 xl:text-[11px]"
  >
    View Collection
  </Link>
) : (
  <Link
    to="/series/$seriesName"
    params={{ seriesName: currentHero.series }}
    className="inline-flex min-h-[34px] items-center justify-center rounded-sm bg-gilded px-3 py-1.5 whitespace-nowrap text-[8.5px] font-semibold uppercase tracking-[0.1em] text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_8px_25px_rgba(212,175,55,0.30)] sm:min-h-[40px] sm:px-6 sm:text-[10px] md:min-h-[42px] md:px-7 lg:min-h-[44px] lg:px-8 xl:min-h-[46px] xl:px-9 xl:text-[11px]"
  >
    View Collection
  </Link>
)}
            </motion.div>
          </div>
        </div>

        {/* =====================================================
      MOBILE CONTROLS
  ===================================================== */}
        <div
          className="
      absolute
      bottom-8
      left-0
      z-30

      flex
      w-full
      items-center
      justify-center
      gap-10

      sm:hidden
    "
        >
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
        group
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full

        border
        border-white/25

        bg-black/40
        text-white/90

        shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        backdrop-blur-md

        transition-all
        duration-300

        active:scale-90
      "
          >
            <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={1.7} />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="
        group
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full

        border
        border-white/25

        bg-black/40
        text-white/90

        shadow-[0_4px_20px_rgba(0,0,0,0.35)]
        backdrop-blur-md

        transition-all
        duration-300

        active:scale-90
      "
          >
            <ChevronRight className="h-[18px] w-[18px]" strokeWidth={1.7} />
          </button>
        </div>

        {/* =====================================================
      DESKTOP PREVIOUS
  ===================================================== */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous slide"
          className="
      group
      absolute
      left-4
      top-1/2
      z-30

      hidden
      -translate-y-1/2

      items-center
      justify-center

      rounded-full
      border
      border-white/20

      bg-black/35
      text-white/80

      shadow-[0_4px_20px_rgba(0,0,0,0.35)]
      backdrop-blur-md

      transition-all
      duration-300

      hover:border-gilded/70
      hover:bg-gilded
      hover:text-black

      active:scale-90

      sm:flex
      sm:left-5
      sm:h-10
      sm:w-10

      md:left-6
      md:h-11
      md:w-11

      lg:left-7
      lg:h-11
      lg:w-11

      xl:left-8
      xl:h-12
      xl:w-12
    "
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.7} />
        </button>

        {/* =====================================================
      DESKTOP NEXT
  ===================================================== */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next slide"
          className="
      group
      absolute
      right-4
      top-1/2
      z-30

      hidden
      -translate-y-1/2

      items-center
      justify-center

      rounded-full
      border
      border-white/20

      bg-black/35
      text-white/80

      shadow-[0_4px_20px_rgba(0,0,0,0.35)]
      backdrop-blur-md

      transition-all
      duration-300

      hover:border-gilded/70
      hover:bg-gilded
      hover:text-black

      active:scale-90

      sm:flex
      sm:right-5
      sm:h-10
      sm:w-10

      md:right-6
      md:h-11
      md:w-11

      lg:right-7
      lg:h-11
      lg:w-11

      xl:right-8
      xl:h-12
      xl:w-12
    "
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.7} />
        </button>

        {/* =====================================================
      SLIDER DOTS
  ===================================================== */}
        <div
          className="
      absolute
      bottom-2.5
      left-1/2
      z-30

      flex
      -translate-x-1/2
      items-center
      gap-1.5

      sm:bottom-4
      sm:gap-2
    "
        >
          {heroSlides.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`
          h-1.5
          rounded-full
          transition-all
          duration-300

          ${currentSlide === index ? "w-6 bg-gilded sm:w-7" : "w-1.5 bg-white/45 hover:bg-white"}
        `}
            />
          ))}
        </div>
      </section>
      {/* =========================================================
          OUR TWO HOUSES
      ========================================================= */}
      <section
        className="
    relative
    w-full
    border-y
    border-gold/30
    bg-[#2c1e14]
    py-10
    text-white
    sm:py-12
    lg:py-14
    xl:py-16
  "
      >
        {/* LUXURIOUS GOLDEN GLOW BACKGROUND */}
        <div
          className="
      pointer-events-none
      absolute
      inset-0
      bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)]
    "
        />

        <div
          className="
      relative
      z-10
      mx-auto
      w-full
      max-w-[1440px]
      px-5
      sm:px-8
      md:px-10
      lg:px-12
      xl:px-16
      2xl:px-20
    "
        >
          {/* HEADING */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <p
              className="
          mb-0
          font-['Amiri']
          text-lg
          tracking-wider
          text-gilded
          sm:text-xl
          lg:text-[24px]
        "
            >
              التراث والعرافة
            </p>

            <h2
              className="
          font-display
          text-[clamp(1.8rem,4vw,3rem)]
          tracking-wide
          text-white
        "
            >
              Our Two Houses
            </h2>

            <div
              className="
          rule-gold
          mx-auto
          mt-3
          h-px
          w-16
          sm:w-20
          lg:w-24
        "
            />
          </motion.div>

          {/* CARDS */}
          <div
            className="
        mt-7
        grid
        grid-cols-1
        gap-5

        sm:mt-8
        sm:gap-6

        lg:grid-cols-2
        lg:gap-8
      "
          >
            {[
              {
                slug: "attar-series",
                img: catAttar,
                arabic: "عطور المسك",
                label: "Attar Series",
                copy: "Discover our complete collection of traditional attars, concentrated oils and floral fragrances.",
              },
              {
                slug: "perfume-series",
                img: catPerfume,
                arabic: "عطور الملكية",
                label: "Perfume Series",
                copy: "Eau de parfum in crystal flacons — radiant, modern, long-lasting.",
              },
            ].map((c, index) => (
              <motion.div
                key={c.slug}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="min-w-0"
              >
                <Link
                  to={c.slug === "attar-series" ? "/attar-series" : "/perfume-series"}
                  className="
    group
    flex
    h-full
    flex-col
    overflow-hidden
    rounded-lg
    border
    border-gold/30
    bg-[#211711]
    transition-all
    duration-500
    hover:-translate-y-1.5
    hover:border-gold
    hover:shadow-[0_25px_50px_rgba(212,175,55,0.22)]
  "
                >
                  {/* IMAGE */}
                  <div
                    className="
                relative
                aspect-[16/9]
                w-full
                overflow-hidden
                bg-black

                sm:aspect-[16/8.5]

                lg:aspect-[16/8]
                xl:aspect-[16/7.8]
              "
                  >
                    <img
                      src={c.img}
                      alt={c.label}
                      loading="lazy"
                      decoding="async"
                      className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
                    />

                    <div
                      className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#211711]
                  via-transparent
                  to-transparent
                  opacity-90
                "
                    />
                  </div>

                  {/* CONTENT */}
                  <div
                    className="
                flex
                flex-1
                flex-col
                items-center
                justify-center
                bg-[#211711]
                px-4
                py-5
                text-center

                sm:px-6
                sm:py-6

                lg:px-7
                lg:py-7
              "
                  >
                    <p
                      className="
                  font-['Amiri']
                  text-lg
                  text-gilded

                  sm:text-xl
                  lg:text-[24px]
                "
                    >
                      {c.arabic}
                    </p>

                    <h3
                      className="
                  mt-0.5
                  font-display
                  text-xl
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-gilded

                  sm:text-[24px]
                  lg:text-[28px]
                "
                    >
                      {c.label}
                    </h3>

                    <p
                      className="
                  mx-auto
                  mt-2
                  max-w-xl
                  text-xs
                  leading-5
                  text-gray-300

                  sm:text-sm
                  sm:leading-5
                "
                    >
                      {c.copy}
                    </p>

                    <div
                      className="
                  mt-3
                  inline-flex
                  items-center
                  gap-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-gilded
                  transition-transform
                  duration-300
                  group-hover:translate-x-2
                "
                    >
                      <span>Discover Collection</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* =========================================================
          BEST SELLERS
      ========================================================= */}
<section
  className="
    relative
    z-0
    isolate
    w-full
    bg-background
    py-14
    sm:py-16
    lg:py-20
    xl:py-24
  "
>
  <div
    className="
      mx-auto
      w-full
      max-w-[1600px]
      px-4
      sm:px-6
      md:px-8
      lg:px-10
      xl:px-12
      2xl:px-16
    "
  >
    {/* =========================================================
        HEADER
    ========================================================= */}

    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
        mx-auto
        max-w-3xl
        text-center
      "
    >
      <p
        className="
          font-['Amiri']
          text-xl
          text-gilded
          sm:text-2xl
          lg:text-[26px]
        "
      >
        الأكثر مبيعًا
      </p>

      <h2
        className="
          mt-1
          font-display
          text-[clamp(2rem,4vw,3.5rem)]
          text-foreground
        "
      >
        Best Sellers
      </h2>

      <div
        className="
          rule-gold
          mx-auto
          mt-4
          h-px
          w-20
          sm:w-24
          lg:w-28
        "
      />
    </motion.div>

    {/* =========================================================
        MOBILE PRODUCTS
    ========================================================= */}

    <div
      className="
        mt-9
        -mx-1
        w-[calc(100%+8px)]
        overflow-x-auto
        overflow-y-hidden
        px-1
        pt-5
        pb-8
        snap-x
        snap-mandatory
        overscroll-x-contain
        scrollbar-hide
        sm:hidden
      "
      style={{
        WebkitOverflowScrolling: "touch",
        scrollBehavior: "smooth",
        scrollSnapType: "x mandatory",
      }}
    >
      <div
        className="
          flex
          w-max
          items-stretch
          gap-4
          pr-5
        "
      >
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="
              relative
              z-10
              w-[82vw]
              max-w-[82vw]
              shrink-0
              snap-start
            "
          >
            <ProductCard
              product={product}
            />
          </div>
        ))}
      </div>
    </div>

    {/* =========================================================
        DESKTOP PRODUCTS
    ========================================================= */}

    <div
      className="
        relative
        z-0
        mt-12

        hidden

        items-start
        gap-6

        sm:grid
        sm:grid-cols-2

        lg:grid-cols-4

        xl:gap-8
      "
    >
      {bestSellers.map(
        (product, index) => (
          <motion.div
            key={product.id}
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.15,
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
            }}
            className="
              relative
              z-10

              mx-auto

              min-w-0
              w-full

              lg:max-w-[350px]
              xl:max-w-[370px]
              2xl:max-w-[390px]
            "
          >
            <ProductCard
              product={product}
            />
          </motion.div>
        ),
      )}
    </div>
  </div>
</section>
      {/* =========================================================
          VIDEO ADVERTISEMENT
      ========================================================= */}
      <section ref={videoSectionRef} className="relative w-full overflow-hidden bg-[#1a1a1a] py-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
      relative
      mx-auto
      h-[260px]
      w-[94%]
      overflow-hidden
      bg-black

      sm:h-[320px]
      sm:w-[92%]

      md:h-[380px]
      md:w-[90%]

      lg:h-[400px]
      lg:w-[88%]

      xl:h-[450px]
      xl:w-[86%]

      2xl:h-[500px]
      2xl:w-[84%]
    "
        >
          {/* VIDEO */}
          <video
            ref={videoRef}
            className="
        absolute
        inset-0
        h-full
        w-full
        object-cover
      "
            autoPlay
            loop
            muted
            playsInline
            preload="none"
          >
            {shouldLoadVideo && <source src={vfx} type="video/mp4" />}
          </video>

          {/* SOUND ON / OFF BUTTON */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
            className="
        absolute
        bottom-4
        right-4
        z-20
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        border-white/30
        bg-black/50
        text-white
        backdrop-blur-md
        shadow-lg
        transition-all
        duration-300
        hover:scale-105
        hover:bg-black/70
        active:scale-95
      "
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H3v6h3l5 4V5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-6 6m0-6 6 6" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5 6 9H3v6h3l5 4V5Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 6a9 9 0 0 1 0 12" />
              </svg>
            )}
          </button>
        </motion.div>
      </section>
      {/* =========================================================
          SERVICES
      ========================================================= */}

      <section
        className="
          w-full
          border-y
          border-border
          bg-[#faf9f5]
          py-14

          sm:py-16
          lg:py-20
          xl:py-24
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
            px-5

            sm:px-8
            md:px-10
            lg:px-12
            xl:px-16
            2xl:px-20
          "
        >
          {/* HEADER */}

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <p
              className="
                font-['Amiri']
                text-xl
                text-amber-700

                sm:text-2xl
                lg:text-[26px]
              "
            >
              خدماتنا
            </p>

            <h2
              className="
                mt-1
                font-display
                text-[clamp(2rem,4vw,3.5rem)]
                font-semibold
                text-gray-900
              "
            >
              Our Services
            </h2>

            <div
              className="
                rule-gold
                mx-auto
                mt-4
                h-px
                w-20

                sm:w-24
                lg:w-28
              "
            />

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                text-sm
                leading-6
                text-gray-600

                sm:text-base
                sm:leading-7
              "
            >
              Discover our world of luxury fragrances, crafted with care and delivered with an
              exceptional experience.
            </p>
          </motion.div>

          {/* SERVICE CARDS */}

          <div
            className="
              mt-9
              grid
              grid-cols-1
              gap-5

              md:grid-cols-3

              lg:mt-12
              lg:gap-6

              xl:gap-8
            "
          >
            {[
              {
                icon: Droplets,
                title: "Premium Perfumes",
                arabic: "العطور الفاخرة",
                copy: "Explore our collection of luxurious oriental perfumes crafted with premium fragrance oils and timeless Arabian notes.",
              },
              {
                icon: Crown,
                title: "Custom Fragrances",
                arabic: "عطور مخصصة",
                copy: "Create a fragrance experience that is uniquely yours with carefully selected oud, rose, musk and botanical extracts.",
              },
              {
                icon: Truck,
                title: "Fast & Secure Delivery",
                arabic: "التوصيل السريع",
                copy: "Enjoy safe and reliable delivery of your favourite fragrances, carefully packaged and dispatched across India.",
              },
            ].map(({ icon: Icon, title, arabic, copy }, index) => (
              <motion.div
                key={title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="
                  group
                  flex
                  min-h-[250px]
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  rounded-sm
                  border
                  border-gray-200
                  bg-white
                  p-6
                  text-center

                  transition-all
                  duration-500

                  hover:-translate-y-1.5
                  hover:border-amber-600
                  hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]

                  sm:min-h-[270px]
                  sm:p-7

                  lg:min-h-[290px]
                  lg:p-8

                  xl:min-h-[310px]
                  xl:p-9
                "
              >
                {/* ICON */}

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-amber-600/30
                    bg-amber-50

                    transition-all
                    duration-500

                    group-hover:scale-110
                    group-hover:bg-amber-600

                    sm:h-16
                    sm:w-16

                    lg:h-[68px]
                    lg:w-[68px]
                  "
                >
                  <Icon
                    className="
                      h-6
                      w-6
                      text-amber-700

                      transition-colors
                      duration-500

                      group-hover:text-white

                      sm:h-7
                      sm:w-7
                    "
                  />
                </div>

                {/* ARABIC */}

                <p
                  className="
                    mt-3
                    font-['Amiri']
                    text-xl
                    font-semibold
                    text-amber-700

                    sm:text-2xl
                    lg:text-[26px]
                  "
                >
                  {arabic}
                </p>

                {/* TITLE */}

                <h3
                  className="
                    mt-1
                    font-display
                    text-xl
                    font-semibold
                    text-gray-900

                    sm:text-2xl
                    lg:text-[26px]
                  "
                >
                  {title}
                </h3>

                {/* DESCRIPTION */}

                <p
                  className="
                    mx-auto
                    mt-3
                    max-w-md
                    text-sm
                    leading-6
                    text-gray-600

                    sm:text-[15px]
                    sm:leading-6
                  "
                >
                  {copy}
                </p>

                {/* GOLD LINE */}

                <div
                  className="
                    mx-auto
                    mt-4
                    h-px
                    w-10
                    bg-amber-600

                    transition-all
                    duration-500

                    group-hover:w-20
                  "
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
