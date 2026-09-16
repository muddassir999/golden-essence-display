import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/attar-series")({
  head: () => {
    const title = "Attar Collection — Al Misbah Perfumes";

    const description =
      "Explore the complete Attar Collection of Al Misbah Perfumes, featuring traditional attars, concentrated perfume oils and floral fragrances.";

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

  component: AttarSeries,
});

const ATTAR_SERIES = [
  "traditional-al-musk",
  "concentrated-oil-series",
  "floral-attars",
];

function AttarSeries() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // =====================================================
  // ITEMS PER PAGE
  // =====================================================

  const itemsPerPage = 8;

  // =====================================================
  // FILTER ATTAR PRODUCTS
  // =====================================================

  const attarProducts = useMemo(() => {
    return products.filter((product) =>
      ATTAR_SERIES.includes(product.series)
    );
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return attarProducts;
    }

    return attarProducts.filter((product) => {
      const matchesName = product.name
        .toLowerCase()
        .includes(query);

      const matchesArabic = product.arabic
        .toLowerCase()
        .includes(query);

      const matchesNotes = product.notes
        .toLowerCase()
        .includes(query);

      return (
        matchesName ||
        matchesArabic ||
        matchesNotes
      );
    });
  }, [attarProducts, searchQuery]);

  // =====================================================
  // PAGINATION
  // =====================================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredItems.length / itemsPerPage
    )
  );

  const paginatedItems = useMemo(() => {
    const start =
      (currentPage - 1) * itemsPerPage;

    return filteredItems.slice(
      start,
      start + itemsPerPage
    );
  }, [
    filteredItems,
    currentPage,
    itemsPerPage,
  ]);

  // =====================================================
  // SEARCH CHANGE
  // =====================================================

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  // =====================================================
  // CLEAR SEARCH
  // =====================================================

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  // =====================================================
  // PAGE CHANGE
  // =====================================================

  const handlePageChange = (page: number) => {
    if (
      page < 1 ||
      page > totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

        {/* BACK TO HOME */}

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

            <span>
              Back to Home
            </span>
          </Link>
        </motion.div>

        {/* =====================================================
            MAIN HEADER
        ===================================================== */}

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
            مجموعة العطور
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
            Attar Collection
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
            Explore our complete collection of traditional attars,
            concentrated perfume oils and floral fragrances.
          </p>
        </motion.header>
      </div>

      {/* =====================================================
          SEARCH
      ===================================================== */}

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

          {/* SEARCH ICON */}

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

          {/* INPUT */}

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

          {/* GOLD FOCUS LINE */}

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

      {/* =====================================================
          RESULT COUNT
      ===================================================== */}

      <div
        className="
          mx-auto
          mt-6
          flex
          w-full
          max-w-[1400px]
          items-center
          justify-between
        "
      >
        <p
          className="
            text-[10px]
            uppercase
            tracking-[0.15em]
            text-white/45

            sm:text-xs
          "
        >
          {filteredItems.length}{" "}
          {filteredItems.length === 1
            ? "Product"
            : "Products"}
        </p>

        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.15em]
              text-[#d4af37]

              transition-colors
              duration-300

              hover:text-white

              sm:text-xs
            "
          >
            Clear Search
          </button>
        )}
      </div>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

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

          {/* =====================================================
              PAGINATION
              SHOW ONLY WHEN MORE THAN 8 PRODUCTS
          ===================================================== */}

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
                  handlePageChange(currentPage - 1)
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

                <span className="hidden sm:inline">
                  Prev
                </span>
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

                <span className="mx-1.5 opacity-40">
                  /
                </span>

                <strong className="text-foreground">
                  {totalPages}
                </strong>
              </div>

              {/* NEXT */}

              <button
                type="button"
                onClick={() =>
                  handlePageChange(currentPage + 1)
                }
                disabled={
                  currentPage === totalPages
                }
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
                <span className="hidden sm:inline">
                  Next
                </span>

                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}
        </>
      ) : (
        /* =====================================================
            NO PRODUCTS
        ===================================================== */

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
            rounded-2xl

            border
            border-[#d4af37]/20

            bg-black/20

            px-5
            py-16

            text-center

            sm:mt-16
            sm:py-20
          "
        >
          <p
            className="
              font-display
              text-2xl
              text-white

              sm:text-3xl
            "
          >
            No Fragrances Found
          </p>

          <p
            className="
              mx-auto
              mt-3
              max-w-md

              text-xs
              leading-6

              text-muted-foreground

              sm:text-sm
            "
          >
            {searchQuery
              ? "No fragrances match your search query in the Attar Collection."
              : "No fragrances are currently listed in the Attar Collection."}
          </p>

          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="
                mt-6

                rounded-full

                border
                border-[#d4af37]

                px-6
                py-2.5

                text-[10px]
                font-semibold
                uppercase
                tracking-[0.15em]

                text-[#d4af37]

                transition-all
                duration-300

                hover:bg-[#d4af37]
                hover:text-black
              "
            >
              Show All Attars
            </button>
          )}
        </motion.div>
      )}

      {/* =====================================================
          PAGE INFO
          SHOW ONLY WHEN PAGINATION EXISTS
      ===================================================== */}

      {totalPages > 1 && (
        <p
          className="
            mt-5
            text-center

            text-[10px]
            uppercase
            tracking-[0.15em]

            text-white/30

            sm:text-[11px]
          "
        >
          Page {currentPage} of {totalPages}
        </p>
      )}
    </motion.main>
  );
}
