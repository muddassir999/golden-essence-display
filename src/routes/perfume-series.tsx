import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/perfume-series")({
  head: () => {
    const title = "Perfume Collection — Al Misbah Perfumes";

    const description =
      "Explore the complete Perfume Collection of Al Misbah Perfumes, featuring elegant eau de parfum, royal oud fragrances and long-lasting signature scents.";

    return {
      meta: [
        {
          title,
        },
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:description",
          content: description,
        },
      ],
    };
  },

  component: PerfumeSeries,
});

function PerfumeSeries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;

  // =====================================================
  // PERFUME COLLECTION
  // =====================================================

  const PERFUME_SERIES = ["royal-oud"];

  // =====================================================
  // COMING SOON
  // =====================================================

  const COMING_SOON = true;

  // =====================================================
  // FILTER PRODUCTS
  // =====================================================

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSeries = PERFUME_SERIES.includes(product.series);

      const matchesSearch =
        query === "" || product.name.toLowerCase().includes(query);

      return matchesSeries && matchesSearch;
    });
  }, [searchQuery]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(filteredItems.length / itemsPerPage),
  );

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <motion.main
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        mx-auto
        w-full
        max-w-[1400px]
        overflow-x-hidden

        px-4
        py-10

        sm:px-6
        sm:py-14

        md:px-8
        md:py-16

        lg:px-10
        lg:py-20

        xl:px-12
        xl:py-24
      "
    >
      {/* =====================================================
          HEADER SECTION
      ===================================================== */}

      <div className="relative mb-8 sm:mb-12">
        {/* BACK TO HOME BUTTON */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
            mb-5
            flex
            justify-start

            lg:absolute
            lg:left-0
            lg:top-0
            lg:mb-0
          "
        >
          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-[#d4af37]/40

              bg-white

              px-3.5
              py-1.5

              text-[9px]
              font-medium
              uppercase
              tracking-[0.15em]

              text-black

              transition-all
              duration-300

              hover:border-[#d4af37]
              hover:bg-white
              hover:text-black
              hover:shadow-[0_0_15px_rgba(212,175,55,0.15)]

              sm:px-5
              sm:py-2.5
              sm:text-[11px]
              sm:tracking-[0.22em]
            "
          >
            <ArrowLeft
              className="
                h-3
                w-3
                shrink-0

                text-black

                transition-transform
                duration-300

                group-hover:-translate-x-1
                group-hover:text-black

                sm:h-4
                sm:w-4
              "
            />

            <span>Back to Home</span>
          </Link>
        </motion.div>

        {/* MAIN HEADER CONTENT */}

        <motion.header
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.65,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mt-2
            w-full
            text-center

            sm:mt-4

            lg:mt-6
            lg:pt-2
          "
        >
          {/* ARABIC */}

          <p
            className="
              font-display
              text-2xl
              leading-none
              text-gilded

              sm:text-3xl

              lg:text-[34px]
            "
          >
            عطور الملكية
          </p>

          {/* TITLE */}

          <h1
            className="
              mx-auto
              mt-3
              max-w-[900px]

              break-words

              font-display
              text-3xl
              leading-[1.12]

              text-foreground

              sm:mt-4
              sm:text-5xl

              md:text-6xl

              lg:text-[4rem]

              xl:text-[4.5rem]
            "
          >
            Perfume Collection
          </h1>

          {/* GOLD LINE */}

          <div
            className="
              rule-gold
              mx-auto
              mt-5
              w-20

              sm:mt-6
              sm:w-36

              lg:w-44
            "
          />

          {/* DESCRIPTION */}

          <p
            className="
              mx-auto
              mt-5
              max-w-[680px]

              text-xs
              leading-6

              text-muted-foreground

              sm:mt-6
              sm:text-sm
              sm:leading-7

              lg:text-[15px]
              lg:leading-7
            "
          >
            Explore the complete Perfume Collection of Al Misbah Perfumes,
            featuring elegant eau de parfum, royal oud fragrances and
            long-lasting signature scents.
          </p>
        </motion.header>
      </div>

      {/* =====================================================
          COMING SOON
          EXACT SAME DESIGN AS /series/$seriesName
      ===================================================== */}

      {COMING_SOON ? (
        <motion.section
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            mx-auto
            mt-12
            w-full
            max-w-[850px]

            sm:mt-16

            lg:mt-20
          "
        >
          <div
            className="
              relative
              overflow-hidden

              rounded-3xl

              border
              border-[#d4af37]/30

              bg-gradient-to-b
              from-[#16140f]
              via-[#0a0a0a]
              to-black

              px-6
              py-12

              text-center

              shadow-[0_25px_60px_rgba(0,0,0,0.7)]

              sm:px-12
              sm:py-16

              lg:px-16
              lg:py-20
            "
          >
            {/* TOP ACCENT BORDER LIGHT */}

            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-[2px]

                bg-gradient-to-r
                from-transparent
                via-[#d4af37]
                to-transparent
              "
            />

            {/* AMBIENT BACKGROUND GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/3

                h-72
                w-72

                -translate-x-1/2
                -translate-y-1/2

                rounded-full

                bg-[#d4af37]/[0.08]

                blur-[100px]
              "
            />

            {/* CLOCK ICON CONTAINER */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.5,
                delay: 0.4,
              }}
              className="
                relative
                mx-auto
                flex

                h-16
                w-16

                items-center
                justify-center

                rounded-2xl

                border
                border-[#d4af37]/40

                bg-gradient-to-br
                from-[#d4af37]/15
                to-black

                shadow-[0_0_30px_rgba(212,175,55,0.15)]

                sm:h-20
                sm:w-20
                sm:rounded-3xl
              "
            >
              <Clock3
                className="
                  h-7
                  w-7

                  text-[#d4af37]

                  sm:h-9
                  sm:w-9
                "
              />
            </motion.div>

            {/* BRAND SUBTITLE */}

            <p
              className="
                relative
                mt-6

                text-[10px]
                font-semibold
                uppercase
                tracking-[0.35em]

                text-[#d4af37]

                sm:text-xs
                sm:tracking-[0.45em]
              "
            >
              Al Misbah Perfumes
            </p>

            {/* MAIN HEADING */}

            <h2
              className="
                relative
                mt-3

                font-display
                text-3xl
                font-medium
                tracking-wide

                text-white

                sm:text-4xl
                md:text-5xl
              "
            >
              Coming Soon
            </h2>

            {/* GOLD DIVIDER */}

            <div
              className="
                relative
                mx-auto
                mt-5

                h-px
                w-20

                bg-gradient-to-r
                from-transparent
                via-[#d4af37]/70
                to-transparent

                sm:w-32
              "
            />

            {/* DESCRIPTIVE TEXT */}

            <p
              className="
                relative
                mx-auto
                mt-5

                max-w-[520px]

                text-xs
                leading-relaxed

                text-white/70

                sm:text-sm
                sm:leading-loose
              "
            >
              Our exclusive{" "}
              <span className="font-medium text-[#d4af37]">
                Perfume Collection
              </span>{" "}
              is currently being crafted to absolute perfection.
              <br className="hidden sm:block" />
              Prepare to experience a new dimension of luxury oriental
              fragrance.
            </p>

            {/* STATUS BADGE */}

            <div
              className="
                relative
                mx-auto
                mt-8

                inline-flex
                items-center
                gap-2.5

                rounded-full

                border
                border-[#d4af37]/25

                bg-[#d4af37]/[0.06]

                px-5
                py-2

                backdrop-blur-sm

                sm:mt-10
                sm:px-6
                sm:py-2.5
              "
            >
              <span
                className="
                  h-2
                  w-2

                  rounded-full

                  bg-[#d4af37]

                  shadow-[0_0_10px_rgba(212,175,55,0.9)]

                  animate-pulse
                "
              />

              <span
                className="
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.2em]

                  text-white/80

                  sm:text-[11px]
                "
              >
                In Production — Arriving Soon
              </span>
            </div>
          </div>
        </motion.section>
      ) : (
        /* =====================================================
           NORMAL PRODUCTS
           COMING SOON FALSE HONE PAR YE UI SHOW HOGA
        ===================================================== */

        <>
          {/* SEARCH */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.55,
              delay: 0.18,
            }}
            className="
              mx-auto
              mt-8
              w-full
              max-w-[620px]

              sm:mt-10

              lg:mt-12
            "
          >
            <div className="group relative w-full">
              <Search
                className="
                  pointer-events-none
                  absolute

                  left-4
                  top-1/2

                  z-10

                  h-4
                  w-4

                  -translate-y-1/2

                  text-[#d4af37]/70

                  transition-colors
                  duration-300

                  group-focus-within:text-[#d4af37]

                  sm:left-5
                  sm:h-[18px]
                  sm:w-[18px]
                "
              />

              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search fragrances..."
                aria-label="Search fragrances"
                className="
                  box-border
                  h-12
                  w-full

                  rounded-full

                  border
                  border-[#d4af37]/25

                  bg-[#0c0c0c]/90

                  pl-11
                  pr-5

                  text-xs
                  font-medium
                  tracking-wide

                  text-foreground

                  placeholder:text-muted-foreground/60

                  shadow-[0_8px_30px_rgba(0,0,0,0.20)]

                  outline-none

                  backdrop-blur-xl

                  transition-all
                  duration-300

                  hover:border-[#d4af37]/45

                  focus:border-[#d4af37]/80
                  focus:bg-[#101010]

                  focus:shadow-[0_0_25px_rgba(212,175,55,0.10)]

                  focus:ring-2
                  focus:ring-[#d4af37]/10

                  sm:h-13
                  sm:pl-12
                  sm:pr-6
                  sm:text-sm
                "
              />

              <div
                className="
                  pointer-events-none

                  absolute
                  inset-x-8
                  bottom-0

                  h-px

                  scale-x-0

                  bg-gradient-to-r
                  from-transparent
                  via-[#d4af37]
                  to-transparent

                  transition-transform
                  duration-500

                  group-focus-within:scale-x-100
                "
              />
            </div>
          </motion.div>

          {/* PRODUCTS */}

          {paginatedItems.length > 0 ? (
            <>
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},

                  show: {
                    transition: {
                      staggerChildren: 0.07,
                    },
                  },
                }}
                className="
                  mt-8

                  grid
                  w-full

                  grid-cols-2

                  items-stretch

                  gap-x-3
                  gap-y-6

                  sm:mt-10
                  sm:gap-x-5
                  sm:gap-y-8

                  md:grid-cols-3
                  md:gap-6

                  lg:mt-12
                  lg:grid-cols-4
                  lg:gap-7

                  xl:gap-8
                "
              >
                {paginatedItems.map((product) => (
                  <motion.div
                    key={product.id}
                    className="
                      flex
                      h-full
                      min-w-0
                      w-full
                      max-w-full
                      items-stretch
                    "
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 25,
                        scale: 0.98,
                      },

                      show: {
                        opacity: 1,
                        y: 0,
                        scale: 1,

                        transition: {
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        },
                      },
                    }}
                  >
                    <div className="flex h-full w-full flex-col">
                      <ProductCard product={product} />
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* PAGINATION */}

              {totalPages > 1 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 12,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="
                    mx-auto
                    mt-10

                    flex
                    w-fit
                    max-w-full

                    items-center
                    justify-center
                    gap-2

                    rounded-full

                    border
                    border-[#d4af37]/20

                    bg-black/20

                    p-1

                    backdrop-blur-md

                    sm:mt-14
                    sm:gap-3
                    sm:p-1.5
                  "
                >
                  {/* PREVIOUS */}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="
                      inline-flex
                      h-9
                      min-w-9

                      shrink-0

                      items-center
                      justify-center
                      gap-1

                      rounded-full

                      border
                      border-transparent

                      px-2.5

                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]

                      text-foreground

                      transition-all
                      duration-300

                      hover:border-[#d4af37]/40
                      hover:bg-[#d4af37]/10
                      hover:text-[#f5d76e]

                      disabled:cursor-not-allowed
                      disabled:opacity-30

                      sm:h-10
                      sm:min-w-10
                      sm:px-3
                      sm:text-xs
                    "
                  >
                    <ChevronLeft className="h-4 w-4" />

                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  {/* PAGE NUMBER */}

                  <div
                    className="
                      flex
                      h-9
                      min-w-[60px]

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#d4af37]/25

                      bg-[#d4af37]/5

                      px-3

                      text-[10px]
                      font-medium
                      tracking-[0.12em]

                      text-muted-foreground

                      sm:h-10
                      sm:min-w-[72px]
                      sm:px-4
                      sm:text-xs
                      sm:tracking-widest
                    "
                  >
                    <strong className="text-[#d4af37]">
                      {currentPage}
                    </strong>

                    <span className="mx-1.5 opacity-40">/</span>

                    <strong className="text-foreground">
                      {totalPages}
                    </strong>
                  </div>

                  {/* NEXT */}

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages),
                      )
                    }
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="
                      inline-flex
                      h-9
                      min-w-9

                      shrink-0

                      items-center
                      justify-center
                      gap-1

                      rounded-full

                      border
                      border-transparent

                      px-2.5

                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.1em]

                      text-foreground

                      transition-all
                      duration-300

                      hover:border-[#d4af37]/40
                      hover:bg-[#d4af37]/10
                      hover:text-[#f5d76e]

                      disabled:cursor-not-allowed
                      disabled:opacity-30

                      sm:h-10
                      sm:min-w-10
                      sm:px-3
                      sm:text-xs
                    "
                  >
                    <span className="hidden sm:inline">Next</span>

                    <ChevronRight className="h-4 w-4" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* NO PRODUCTS */

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.25,
              }}
              className="
                mt-12
                px-5
                text-center

                sm:mt-16
              "
            >
              <p
                className="
                  text-xs
                  leading-6

                  text-muted-foreground

                  sm:text-sm
                "
              >
                {searchQuery
                  ? "No fragrances match your search query in this collection."
                  : "No fragrances listed in this collection yet."}
              </p>
            </motion.div>
          )}
        </>
      )}
    </motion.main>
  );
}