import { createFileRoute, Link } from "@tanstack/react-router";

import {
  ArrowLeft,
  Check,
  Crown,
  Gem,
  Leaf,
  Sparkles,
  Heart,
  ShoppingCart,
  Star,
  Flower2, // <-- Add Flower2 here
} from "lucide-react";

import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/context/cartContext";

/* =========================================================
   TYPES
========================================================= */

type CategoryValue = "all" | "oud-oudh" | "signature-edp" | "woody-collection";

type CategoryConfig = {
  title: string;
  arabic: string;
  blurb: string;
  icon: typeof Sparkles;
};

/* =========================================================
   CATEGORY FILTERS
========================================================= */

const CATEGORY_FILTERS: {
  label: string;
  value: CategoryValue;
  icon: typeof Sparkles;
}[] = [
  {
    label: "All Perfumes",
    value: "all",
    icon: Sparkles,
  },
  {
    label: "Royal OUD Series",
    value: "oud-oudh",
    icon: Gem,
  },
  {
    label: "Signature EDP",
    value: "signature-edp",
    icon: Sparkles,
  },
  {
    label: "Woody Collection",
    value: "woody-collection",
    icon: Leaf,
  },
];

/* =========================================================
   CATEGORY CONTENT
========================================================= */

const CATEGORY_CONTENT: Record<CategoryValue, CategoryConfig> = {
  all: {
    title: "The Perfume Collection",
    arabic: "مجموعة العطور",
    blurb:
      "A refined collection of signature fragrances is being prepared for the House of Al Misbah.",
    icon: Sparkles,
  },

  "oud-oudh": {
    title: "Royal OUD Series",
    arabic: "العود الملكي",
    blurb:
      "Aged Cambodian and Hindi oud, distilled slowly and matured for a deep, smoke-rich and regal trail.",
    icon: Gem,
  },

  "signature-edp": {
    title: "Signature EDP",
    arabic: "التوقيع",
    blurb:
      "Our house eau de parfum compositions — modern, radiant and designed to leave a refined signature.",
    icon: Sparkles,
  },

  "woody-collection": {
    title: "Woody Collection",
    arabic: "العطور الخشبية",
    blurb:
      "Sandalwood, cedar and vetiver layered over warm resins for a grounded and sophisticated signature.",
    icon: Leaf,
  },
};

/* =========================================================
   FUTURE PRODUCT CARD SUPPORT
   ---------------------------------------------------------
   Products are NOT connected to PerfumeSeries yet.
   This card is kept ready for future perfume products.
========================================================= */

type Product = any;

function getNumericValue(value: unknown, fallback = 0) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const cleaned = value.replace(/[₹,\s]/g, "").trim();
    const parsed = Number(cleaned);

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function getProductPrice(product: Product) {
  return getNumericValue(product?.price ?? product?.salePrice ?? product?.sellingPrice, 0);
}

function getProductMrp(product: Product, price: number) {
  const mrp = getNumericValue(product?.mrp ?? product?.originalPrice ?? product?.oldPrice, 0);

  return mrp > price ? mrp : 0;
}

function getProductDiscount(product: Product, price: number, mrp: number) {
  if (mrp > price) {
    return Math.round(((mrp - price) / mrp) * 100);
  }

  return getNumericValue(product?.discount ?? product?.discountPercentage, 0);
}

function ProductRating({ rating, reviews }: { rating?: number; reviews?: number }) {
  if (rating === undefined) return null;

  const safeRating = Math.max(0, Math.min(5, rating));

  const fullStars = Math.floor(safeRating);
  const hasHalfStar = safeRating % 1 >= 0.5;

  return (
    <div className="mt-2.5 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          const full = index < fullStars;
          const half = index === fullStars && hasHalfStar;

          return (
            <span key={index} className="relative block h-3.5 w-3.5 sm:h-4 sm:w-4">
              <Star
                className="absolute inset-0 h-3.5 w-3.5 text-[#d4af37]/25 sm:h-4 sm:w-4"
                fill="#18150c"
              />

              {(full || half) && (
                <span className={`absolute inset-0 overflow-hidden ${half ? "w-1/2" : "w-full"}`}>
                  <Star className="h-3.5 w-3.5 text-[#f0c94b] sm:h-4 sm:w-4" fill="#f0c94b" />
                </span>
              )}
            </span>
          );
        })}
      </div>

      <span className="text-[10px] font-bold text-[#f5d76e] sm:text-[11px]">
        {safeRating.toFixed(1)}
      </span>

      {reviews !== undefined && (
        <span className="text-[9px] text-white/35 sm:text-[10px]">
          ({Number(reviews).toLocaleString("en-IN")}+)
        </span>
      )}
    </div>
  );
}

function PerfumePageProductCard({
  product,
  index = 0,
  onAddToCart,
}: {
  product: Product;
  index?: number;
  onAddToCart: (product: Product) => void;
}) {
  const { cart } = useCart();

  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const productId = product?.id ?? product?.name ?? product?.title;

  const currentCartItem = cart.find((item) => String(item?.product?.id) === String(productId));

  const currentQuantity = currentCartItem?.quantity ?? 0;

  const isInCart = currentQuantity > 0;

  const name = product?.name ?? product?.title ?? "Premium Perfume";

  const image = product?.image ?? product?.images?.[0] ?? "/images/placeholder.webp";

  const price = getProductPrice(product) || 999;

  const mrp = getProductMrp(product, price);

  const discount = getProductDiscount(product, price, mrp);

  const rating = getNumericValue(product?.rating, 4.8);

  const reviews = getNumericValue(product?.reviews ?? product?.reviewCount, 1200);

  const notes = String(product?.notes ?? "").trim();

  const noteParts = notes
    .split(/[•|,]/)
    .map((item) => item.trim())
    .filter(Boolean);

  const featureNames =
    noteParts.length > 0 ? noteParts.slice(0, 3) : ["Premium Quality", "Long Lasting", "Luxury"];

  const featureIcons = [Flower2, Leaf, Sparkles];

  const badgeText =
    product?.badge ??
    product?.tag ??
    ["BEST SELLER", "POPULAR CHOICE", "LUXURY FRAGRANCE", "ICONIC SCENT"][index % 4];

  const handleAddToCart = () => {
    if (!productId) return;

    onAddToCart(product);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  // Kept ready for future perfume-product integration.
  void isInCart;
  void added;

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group relative flex h-full min-w-0 flex-col overflow-hidden
        rounded-[18px] border border-[#d4af37]/20
        bg-gradient-to-b from-[#11100d] via-[#080807] to-[#030303]
        shadow-[0_12px_40px_rgba(0,0,0,0.55)]
        transition-all duration-500
        hover:-translate-y-1
        hover:border-[#d4af37]/60
        hover:shadow-[0_25px_70px_rgba(212,175,55,0.12)]
        sm:rounded-[22px]
        lg:rounded-[26px]
      "
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#f5d76e]/[0.07] via-transparent to-[#d4af37]/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="pointer-events-none absolute left-1/2 top-0 z-30 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f7df7d] to-transparent shadow-[0_0_14px_rgba(212,175,55,0.8)] transition-all duration-500 group-hover:w-2/3" />

      {/* IMAGE */}
      <div
        className="
          relative z-10 aspect-square w-full shrink-0 overflow-hidden
          border-b border-[#d4af37]/15
          bg-[radial-gradient(circle_at_center,#1b160c_0%,#0b0906_42%,#030303_100%)]
        "
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[45px] transition-all duration-700 group-hover:h-[55%] group-hover:w-[55%] group-hover:bg-[#d4af37]/15 sm:blur-[60px]" />

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-full bg-[#f5d76e]/[0.06] blur-[35px]" />

        {image ? (
          <motion.img
            src={image}
            alt={name}
            loading="lazy"
            decoding="async"
            whileHover={{
              scale: 1.045,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative z-10 block h-full w-full
              object-contain object-center
              drop-shadow-[0_20px_28px_rgba(0,0,0,0.85)]
            "
          />
        ) : (
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <ShoppingCart className="h-10 w-10 text-[#d4af37]/50 sm:h-14 sm:w-14" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.06] via-transparent to-black/35" />

        {discount > 0 && (
          <div className="absolute left-3 top-3 z-30 flex h-11 w-11 flex-col items-center justify-center rounded-xl border border-[#d4af37]/70 bg-black/80 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md sm:left-4 sm:top-4 sm:h-14 sm:w-14 sm:rounded-2xl">
            <span className="font-display text-[13px] font-bold leading-none text-[#f7df7d] sm:text-[17px]">
              {discount}%
            </span>
            <span className="mt-1 text-[5px] font-bold uppercase tracking-[0.15em] text-white/65 sm:text-[7px]">
              OFF
            </span>
          </div>
        )}

        <div className="absolute right-3 top-3 z-30 flex h-12 w-12 flex-col items-center justify-center rounded-xl border border-[#d4af37]/60 bg-black/80 px-1 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md sm:right-4 sm:top-4 sm:h-14 sm:w-14 sm:rounded-2xl">
          <Crown className="mb-1 h-3.5 w-3.5 text-[#f5d76e] sm:h-4 sm:w-4" />
          <span className="max-w-[42px] text-center text-[5px] font-bold uppercase leading-tight tracking-[0.04em] text-white/80 sm:max-w-[48px] sm:text-[6px]">
            {badgeText}
          </span>
        </div>

        <button
          type="button"
          aria-label={liked ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          onClick={() => setLiked((value) => !value)}
          className="
            absolute bottom-3 right-3 z-30
            flex h-9 w-9 items-center justify-center
            rounded-full border border-[#d4af37]/40
            bg-black/75 backdrop-blur-md
            shadow-[0_8px_20px_rgba(0,0,0,0.5)]
            transition-all duration-300
            hover:border-[#d4af37]
            hover:bg-[#d4af37]/10
            active:scale-90
            sm:h-10 sm:w-10
          "
        >
          <Heart
            className={`h-4 w-4 transition-all ${
              liked ? "fill-[#d4af37] text-[#d4af37]" : "text-[#f5d76e]"
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-1/2 z-30 h-[2px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6">
        <h3
          className="
            font-display font-medium leading-[1.08]
            tracking-[-0.02em] text-[#f8f1df]
            text-[18px]
            sm:text-[21px]
            lg:text-[25px]
            transition-colors duration-300
            group-hover:text-[#f5d76e]
          "
        >
          {name}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-[30px] text-[9px] font-medium uppercase leading-[1.5] tracking-[0.12em] text-[#d4af37]/70 sm:text-[10px] sm:tracking-[0.16em]">
          {notes || "Premium Luxury Fragrance"}
        </p>

        <ProductRating rating={rating} reviews={reviews} />

        <div className="mt-3 grid grid-cols-3 gap-1.5 sm:mt-4 sm:gap-2">
          {featureNames.map((feature, featureIndex) => {
            const Icon = featureIcons[featureIndex % featureIcons.length] ?? Flower2;
            return (
              <div
                key={`${feature}-${featureIndex}`}
                title={feature}
                className="
                    flex min-w-0 items-center justify-center gap-1
                    rounded-full border border-[#d4af37]/20
                    bg-white/[0.025]
                    px-1.5 py-2
                    text-center
                    text-[6.5px] font-semibold uppercase
                    tracking-[0.02em] text-white/55
                    transition-all
                    hover:border-[#d4af37]/50
                    hover:bg-[#d4af37]/[0.05]
                    sm:text-[8px]
                  "
              >
                <Icon className="h-2.5 w-2.5 shrink-0 text-[#d4af37] sm:h-3 sm:w-3" />
                <span className="truncate">{feature}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 border-t border-[#d4af37]/10 pt-3.5 sm:mt-5 sm:pt-4">
          <div className="flex items-end justify-between gap-2">
            <div className="flex min-w-0 items-baseline gap-2">
              {mrp > price && (
                <span className="shrink-0 text-[14px] font-medium text-white/40 line-through sm:text-[12px] lg:text-[15px]">
                  ₹{mrp.toLocaleString("en-IN")}
                </span>
              )}

              <span className="truncate text-[17px] font-extrabold leading-none tracking-[-0.02em] text-[#f4c84f] sm:text-[21px] lg:text-[24px]">
                ₹{price.toLocaleString("en-IN")}
              </span>
            </div>

            {discount > 0 && (
              <span className="shrink-0 rounded-full border border-[#d4af37]/35 bg-[#d4af37]/[0.05] px-2 py-1 text-[6px] font-bold uppercase tracking-wider text-[#f5d76e] sm:px-2.5 sm:text-[8px]">
                {discount}% OFF
              </span>
            )}
          </div>

          {discount > 0 && (
            <div className="mt-2 text-[7px] font-semibold uppercase tracking-[0.12em] text-white/30 sm:text-[8px]">
              Limited luxury offer
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="
            mt-4 flex h-11 w-full items-center justify-center gap-2
            rounded-full
            bg-gradient-to-r from-[#a97a1c] via-[#f5d76e] to-[#b88627]
            text-[8px] font-black uppercase tracking-[0.12em]
            text-[#100d05]
            transition-all duration-300
            hover:shadow-[0_10px_35px_rgba(212,175,55,0.22)]
            active:scale-[0.98]
            sm:h-12 sm:text-[9px]
          "
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add To Cart
        </button>
      </div>
    </motion.article>
  );
}

/* Keep the future card in this file without rendering it yet.
   PerfumeSeries currently has NO product/category data. */
void PerfumePageProductCard;

/* =========================================================
   COMING SOON SECTION
========================================================= */

function ComingSoonSection({ category }: { category: CategoryValue }) {
  const content = CATEGORY_CONTENT[category] ?? CATEGORY_CONTENT.all;

  const Icon = content.icon;

  return (
    <motion.section
      key={category}
      initial={{
        opacity: 0,
        y: 35,
        scale: 0.985,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group/coming
        relative
        mt-7
        min-h-[560px]
        overflow-hidden
        rounded-[32px]
        border
        border-[#d4af37]/20
        bg-[#060606]
        shadow-[0_40px_140px_rgba(0,0,0,.72)]
        sm:min-h-[620px]
        lg:min-h-[680px]
      "
    >
      {/* =================================================
          PREMIUM BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_50%_42%,rgba(212,175,55,.11),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(212,175,55,.045),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(212,175,55,.045),transparent_30%)]
        "
      />

      {/* CENTER GLOW */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.42, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[360px]
          w-[360px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#d4af37]/[.05]
          blur-[100px]
          sm:h-[500px]
          sm:w-[500px]
          sm:blur-[130px]
        "
      />

      {/* TOP GLOW */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[-240px]
          h-[500px]
          w-[800px]
          -translate-x-1/2
          rounded-full
          bg-[#d4af37]/[.04]
          blur-[150px]
        "
      />

      {/* =================================================
          LUXURY DOT TEXTURE
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[.025]
          bg-[radial-gradient(rgba(255,255,255,.8)_0.5px,transparent_.5px)]
          [background-size:10px_10px]
        "
      />

      {/* =================================================
          INNER FRAME
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-3
          rounded-[27px]
          border
          border-white/[.035]
          sm:inset-4
          sm:rounded-[28px]
        "
      />

      {/* =================================================
          TOP GOLD LINE
      ================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-px
          w-[55%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#f5d76e]
          to-transparent
          shadow-[0_0_25px_rgba(245,215,110,.55)]
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[560px]
          flex-col
          items-center
          justify-center
          px-5
          py-16
          text-center
          sm:min-h-[620px]
          sm:px-10
          lg:min-h-[680px]
        "
      >
        {/* =================================================
            HOUSE LABEL
        ================================================= */}

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
            delay: 0.1,
            duration: 0.6,
          }}
          className="
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-7
              bg-gradient-to-r
              from-transparent
              to-[#d4af37]
              sm:w-10
            "
          />

          <span
            className="
              font-display
              text-[9px]
              font-semibold
              uppercase
              tracking-[.32em]
              text-[#d4af37]
              sm:text-[10px]
            "
          >
            The House Of Al Misbah
          </span>

          <span
            className="
              h-px
              w-7
              bg-gradient-to-l
              from-transparent
              to-[#d4af37]
              sm:w-10
            "
          />
        </motion.div>

        {/* =================================================
            PREMIUM ICON
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.7,
            rotate: -8,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-8
            flex
            h-[92px]
            w-[92px]
            items-center
            justify-center
            rounded-full
            border
            border-[#d4af37]/30
            bg-[radial-gradient(circle,rgba(212,175,55,.12),rgba(212,175,55,.025)_55%,transparent_70%)]
            shadow-[0_0_70px_rgba(212,175,55,.12)]
            sm:h-[110px]
            sm:w-[110px]
          "
        >
          {/* OUTER ROTATING RING */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-[-8px]
              rounded-full
              border
              border-dashed
              border-[#d4af37]/20
            "
          />

          {/* SECOND RING */}

          <div
            className="
              absolute
              inset-3
              rounded-full
              border
              border-[#d4af37]/12
            "
          />

          {/* THIRD RING */}

          <div
            className="
              absolute
              inset-6
              rounded-full
              border
              border-[#d4af37]/12
            "
          />

          {/* ICON */}

          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Icon
              className="
                relative
                z-10
                h-8
                w-8
                text-[#f5d76e]
                drop-shadow-[0_0_18px_rgba(245,215,110,.5)]
                sm:h-9
                sm:w-9
              "
              strokeWidth={1.15}
            />
          </motion.div>
        </motion.div>

        {/* =================================================
            ARABIC
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="
            mt-7
            font-display
            text-[25px]
            font-medium
            text-[#d4af37]
            drop-shadow-[0_5px_30px_rgba(212,175,55,.25)]
            sm:text-[32px]
            md:text-[36px]
          "
        >
          {content.arabic}
        </motion.p>

        {/* =================================================
            CATEGORY TITLE
        ================================================= */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.38,
            duration: 0.7,
          }}
          className="
            mt-2
            max-w-[950px]
            font-display
            text-[34px]
            font-medium
            leading-[.95]
            tracking-[-.025em]
            text-white
            drop-shadow-[0_4px_25px_rgba(255,255,255,.08)]
            sm:text-5xl
            md:text-6xl
            lg:text-[68px]
          "
        >
          {content.title}
        </motion.h2>

        {/* =================================================
            ORNAMENT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0.5,
          }}
          animate={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            delay: 0.46,
            duration: 0.7,
          }}
          className="
            mt-7
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-12
              bg-gradient-to-r
              from-transparent
              to-[#d4af37]
              sm:w-16
            "
          />

          <span
            className="
              h-2
              w-2
              rotate-45
              border
              border-[#d4af37]
              bg-[#d4af37]/10
              shadow-[0_0_18px_rgba(212,175,55,.5)]
            "
          />

          <span
            className="
              h-px
              w-12
              bg-gradient-to-l
              from-transparent
              to-[#d4af37]
              sm:w-16
            "
          />
        </motion.div>

        {/* =================================================
            COMING SOON BADGE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 15,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: 0.55,
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            mt-8
            overflow-hidden
            rounded-full
            border
            border-[#d4af37]/50
            bg-gradient-to-b
            from-[#d4af37]/[.14]
            to-[#d4af37]/[.04]
            px-7
            py-3
            shadow-[0_0_45px_rgba(212,175,55,.12)]
            sm:px-9
            sm:py-3.5
          "
        >
          {/* SHINE */}

          <motion.div
            animate={{
              x: ["-150%", "150%"],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-y-0
              w-1/3
              bg-gradient-to-r
              from-transparent
              via-white/10
              to-transparent
              skew-x-[-20deg]
            "
          />

          <div
            className="
              relative
              z-10
              flex
              items-center
              gap-3
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#f5d76e]
                shadow-[0_0_14px_rgba(245,215,110,1)]
                animate-pulse
              "
            />

            <span
              className="
                text-[11px]
                font-black
                uppercase
                tracking-[.35em]
                text-[#f5d76e]
                sm:text-xs
              "
            >
              Coming Soon
            </span>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#f5d76e]
                shadow-[0_0_14px_rgba(245,215,110,1)]
                animate-pulse
              "
            />
          </div>
        </motion.div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.68,
            duration: 0.7,
          }}
          className="
            mt-7
            max-w-[650px]
            text-[11px]
            font-medium
            leading-6
            text-white/65
            sm:text-sm
            sm:leading-7
            md:text-base
          "
        >
          {content.blurb}
        </motion.p>

        {/* =================================================
            NEXT CHAPTER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.85,
            duration: 0.8,
          }}
          className="
            mt-7
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              h-px
              w-8
              bg-white/20
              sm:w-12
            "
          />

          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <Crown
              className="
                h-3.5
                w-3.5
                text-[#d4af37]
              "
              strokeWidth={1.3}
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[.22em]
                text-white/60
                sm:text-[9px]
              "
            >
              A New Fragrance Chapter Is Coming
            </span>
          </div>

          <span
            className="
              h-px
              w-8
              bg-white/20
              sm:w-12
            "
          />
        </motion.div>

        {/* =================================================
            MINI DETAILS
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.95,
            duration: 0.7,
          }}
          className="
            mt-6
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
          "
        >
          {["Crafted With Patience", "Luxury In Every Note", "Made For You"].map((item) => (
            <span
              key={item}
              className="
                inline-flex
                items-center
                gap-1.5
                rounded-full
                border
                border-[#d4af37]/15
                bg-[#d4af37]/[.035]
                px-3
                py-1.5
                text-[7px]
                font-semibold
                uppercase
                tracking-[.12em]
                text-white/55
                backdrop-blur-xl
                sm:text-[8px]
              "
            >
              <Check
                className="
                  h-2.5
                  w-2.5
                  text-[#d4af37]
                "
              />

              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* =================================================
          CORNER DETAILS
      ================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          left-5
          top-5
          h-16
          w-16
          border-l
          border-t
          border-[#d4af37]/35
          sm:left-7
          sm:top-7
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-5
          top-5
          h-16
          w-16
          border-r
          border-t
          border-[#d4af37]/35
          sm:right-7
          sm:top-7
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          left-5
          h-16
          w-16
          border-b
          border-l
          border-[#d4af37]/25
          sm:bottom-7
          sm:left-7
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-5
          right-5
          h-16
          w-16
          border-b
          border-r
          border-[#d4af37]/35
          sm:bottom-7
          sm:right-7
        "
      />

      {/* =================================================
          BOTTOM GOLD LINE
      ================================================= */}

      <div
        className="
          absolute
          bottom-0
          left-1/2
          h-px
          w-[45%]
          -translate-x-1/2
          bg-gradient-to-r
          from-transparent
          via-[#d4af37]/70
          to-transparent
          shadow-[0_0_18px_rgba(212,175,55,.35)]
        "
      />
    </motion.section>
  );
}
/* =========================================================
   MAIN PAGE
========================================================= */

function PerfumeSeries() {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("all");

  const handleCategoryChange = (category: CategoryValue) => {
    setActiveCategory(category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const activeContent = CATEGORY_CONTENT[activeCategory];

  return (
    <motion.main
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.8,
      }}
      className="
        relative

        min-h-screen
        w-full

        overflow-x-hidden

        bg-[#030303]

        text-white
      "
    >
      {/* =================================================
          GLOBAL BACKGROUND
      ================================================= */}

      <div
        className="
          pointer-events-none

          fixed
          inset-0
          z-0

          overflow-hidden
        "
      >
        {/* TOP GOLD GLOW */}

        <div
          className="
            absolute
            left-1/2
            top-[-180px]

            h-[700px]
            w-[1000px]

            -translate-x-1/2

            rounded-full

            bg-[#d4af37]/[.035]

            blur-[200px]
          "
        />

        {/* LEFT GLOW */}

        <div
          className="
            absolute
            bottom-[-300px]
            left-[-280px]

            h-[650px]
            w-[650px]

            rounded-full

            bg-[#d4af37]/[.018]

            blur-[190px]
          "
        />

        {/* RIGHT GLOW */}

        <div
          className="
            absolute
            right-[-280px]
            top-[850px]

            h-[650px]
            w-[650px]

            rounded-full

            bg-[#d4af37]/[.018]

            blur-[190px]
          "
        />

        {/* DOT TEXTURE */}

        <div
          className="
            absolute
            inset-0

            opacity-[.018]

            bg-[radial-gradient(rgba(255,255,255,.8)_0.5px,transparent_.5px)]

            [background-size:9px_9px]
          "
        />
      </div>

      {/* =================================================
          MAIN CONTAINER
      ================================================= */}

      <div
        className="
          relative
          z-10

          mx-auto
          w-full
          max-w-[1580px]

          px-3
          pb-20
          pt-5

          sm:px-5
          sm:pb-24

          md:px-8

          lg:px-10
          lg:pb-28
          lg:pt-8

          xl:px-14
        "
      >
        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mb-5

            sm:mb-7

            lg:mb-9
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
              border-white/10

              bg-white/[0.035]

              px-3.5
              py-2.5

              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]

              text-zinc-300

              backdrop-blur-md

              transition-all
              duration-300

              hover:border-[#d4af37]/40
              hover:bg-[#d4af37]/5
              hover:text-[#f3e5ab]

              active:scale-[0.97]

              sm:px-5
              sm:text-[9px]
            "
          >
            <ArrowLeft
              className="
                h-3.5
                w-3.5

                transition-transform
                duration-300

                group-hover:-translate-x-1
              "
            />
            Back to Home
          </Link>
        </motion.div>

        {/* =================================================
            HERO
        ================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            group/hero

            relative

            min-h-[500px]

            overflow-hidden

            rounded-[30px]

            border
            border-[#d4af37]/15

            bg-[#050505]

            shadow-[0_40px_130px_rgba(0,0,0,.75)]

            sm:min-h-[560px]

            md:min-h-[600px]

            lg:min-h-[640px]

            xl:min-h-[670px]
          "
        >
          {/* HERO IMAGE */}

          <div
            className="
              absolute
              inset-0

              scale-[1.025]

              bg-cover
              bg-center
              bg-no-repeat

              opacity-55

              transition-transform
              duration-[2400ms]

              group-hover/hero:scale-[1.065]
            "
            style={{
              backgroundImage: "url('/images/attar-hero.webp')",
            }}
          />

          {/* DARK OVERLAY */}

          <div
            className="
              absolute
              inset-0

              bg-[linear-gradient(90deg,rgba(0,0,0,.98)_0%,rgba(0,0,0,.88)_32%,rgba(0,0,0,.52)_67%,rgba(0,0,0,.80)_100%)]
            "
          />

          <div
            className="
              absolute
              inset-0

              bg-gradient-to-t
              from-[#020202]
              via-transparent
              to-black/30
            "
          />

          {/* GOLD LIGHT */}

          <div
            className="
              pointer-events-none

              absolute
              left-1/2
              top-[-300px]

              h-[700px]
              w-[1100px]

              -translate-x-1/2

              rounded-full

              bg-[#d4af37]/[.075]

              blur-[170px]

              transition-all
              duration-[1800ms]

              group-hover/hero:bg-[#d4af37]/[.12]
            "
          />

          {/* HERO CONTENT */}

          <div
            className="
              relative
              z-10

              flex
              min-h-[500px]

              flex-col
              items-center
              justify-center

              px-5
              py-16

              text-center

              sm:min-h-[560px]
              sm:px-10

              md:min-h-[600px]

              lg:min-h-[640px]

              xl:min-h-[670px]
            "
          >
            {/* HOUSE */}

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
                delay: 0.15,
              }}
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8

                  bg-gradient-to-r
                  from-transparent
                  to-[#d4af37]
                "
              />

              <p
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[.38em]

                  text-[#d4af37]

                  sm:text-[8px]
                "
              >
                The House Of Al Misbah
              </p>

              <span
                className="
                  h-px
                  w-8

                  bg-gradient-to-l
                  from-transparent
                  to-[#d4af37]
                "
              />
            </motion.div>

            {/* ARABIC */}

            <motion.p
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
                duration: 0.6,
              }}
              className="
                mt-5

                font-display

                text-[28px]

                text-[#d4af37]

                drop-shadow-[0_5px_30px_rgba(212,175,55,.20)]

                sm:text-4xl
                md:text-5xl
                lg:text-[54px]
              "
            >
              مجموعة العطور
            </motion.p>

            {/* SMALL LABEL */}

            <div
              className="
                mt-5

                flex
                items-center
                justify-center
                gap-3

                text-[6px]
                font-bold
                uppercase
                tracking-[.32em]

                text-white/65

                sm:text-[8px]
              "
            >
              <span>PURE FRAGRANCES</span>

              <span className="text-[#d4af37]">◆</span>

              <span>MUMBAI ATELIER</span>
            </div>

            {/* MAIN TITLE */}

            <motion.h1
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
              className="
                mt-6

                max-w-[1100px]

                font-display

                text-[47px]
                font-medium
                leading-[.86]

                text-[#f5d76e]

                drop-shadow-[0_8px_40px_rgba(212,175,55,.20)]

                sm:text-6xl
                md:text-7xl
                lg:text-[6.8rem]
                xl:text-[7.6rem]
              "
            >
              The Perfume
              <br />
              <span className="text-white/[.94]">Collection</span>
            </motion.h1>

            {/* ORNAMENT */}

            <div
              className="
                mt-8

                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-12

                  bg-gradient-to-r
                  from-transparent
                  to-[#d4af37]
                "
              />

              <span
                className="
                  h-2
                  w-2

                  rotate-45

                  border
                  border-[#d4af37]

                  shadow-[0_0_18px_rgba(212,175,55,.4)]
                "
              />

              <span
                className="
                  h-px
                  w-12

                  bg-gradient-to-l
                  from-transparent
                  to-[#d4af37]
                "
              />
            </div>

            {/* DESCRIPTION */}

            <p
              className="
                mt-7

                max-w-[690px]

                text-[9px]
                leading-5

                text-white/50

                sm:text-xs
                sm:leading-6

                md:text-sm
                md:leading-7
              "
            >
              A new chapter of refined fragrances is being prepared by the House of Al Misbah —
              Royal OUD, Signature EDP and Woody Collection.
            </p>

            {/* QUOTE */}

            <p
              className="
                mt-4

                font-display
                text-[15px]
                italic

                text-[#f5d76e]/90

                sm:text-base
                md:text-lg
              "
            >
              More than fragrance.
              <span className="text-white/45"> An expression of you.</span>
            </p>

            {/* SMALL STATUS */}

            <div
              className="
                mt-7

                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#d4af37]/20

                bg-black/30

                px-4
                py-2

                backdrop-blur-xl
              "
            >
              <Crown
                className="
                  h-3
                  w-3

                  text-[#d4af37]
                "
                strokeWidth={1.3}
              />

              <span
                className="
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-[.25em]

                  text-white/45

                  sm:text-[7px]
                "
              >
                The Collection Is In Preparation
              </span>
            </div>
          </div>

          {/* CORNER TOP */}

          <div
            className="
              pointer-events-none

              absolute
              left-5
              top-5

              h-16
              w-16

              border-l
              border-t
              border-[#d4af37]/35

              sm:left-7
              sm:top-7
            "
          />

          {/* CORNER BOTTOM */}

          <div
            className="
              pointer-events-none

              absolute
              bottom-5
              right-5

              h-16
              w-16

              border-b
              border-r
              border-[#d4af37]/35

              sm:bottom-7
              sm:right-7
            "
          />
        </motion.section>

        {/* =================================================
            CATEGORY FILTER
        ================================================= */}

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
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-8
            w-full

            overflow-x-auto

            pb-2

            scrollbar-none

            sm:mt-10
          "
        >
          <div
            className="
              flex
              min-w-max

              items-center
              justify-start

              gap-2

              md:justify-center

              lg:gap-2.5
            "
          >
            {CATEGORY_FILTERS.map((category) => {
              const Icon = category.icon;

              const active = activeCategory === category.value;

              return (
                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  key={category.value}
                  type="button"
                  onClick={() => handleCategoryChange(category.value)}
                  className={`
                    inline-flex
                    h-10
                    shrink-0

                    items-center
                    gap-1.5

                    rounded-full

                    border

                    px-4

                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[.09em]

                    transition-all
                    duration-300

                    sm:h-11
                    sm:px-5
                    sm:text-[8px]

                    ${
                      active
                        ? "border-[#d4af37] bg-gradient-to-b from-[#fff0ad] via-[#f2d15e] to-[#c39420] text-black shadow-[0_10px_35px_rgba(212,175,55,.20)]"
                        : "border-white/[.08] bg-white/[.025] text-white/45 hover:border-[#d4af37]/40 hover:bg-[#d4af37]/[.05] hover:text-[#f5d76e]"
                    }
                  `}
                >
                  <Icon
                    className={`
                      h-3.5
                      w-3.5

                      sm:h-4
                      sm:w-4

                      ${active ? "text-black" : "text-[#d4af37]"}
                    `}
                  />

                  {category.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* =================================================
            CURRENT CATEGORY STATUS
        ================================================= */}

        <motion.div
          key={`status-${activeCategory}`}
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            mt-8

            flex
            flex-col
            items-center
            justify-center

            text-center

            sm:mt-10
          "
        >
          <div
            className="
              flex
              items-center
              gap-2
            "
          >
            <span
              className="
                h-1
                w-1

                rounded-full

                bg-[#d4af37]

                shadow-[0_0_12px_#d4af37]
              "
            />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[.3em]

                text-[#d4af37]
              "
            >
              {activeCategory === "all" ? "The Collection" : "Upcoming Collection"}
            </span>

            <span
              className="
                h-1
                w-1

                rounded-full

                bg-[#d4af37]

                shadow-[0_0_12px_#d4af37]
              "
            />
          </div>

          <p
            className="
    mt-2

    text-[9px]
    font-medium
    text-white/70

    sm:text-[10px]
  "
          >
            {activeContent.title}
          </p>
        </motion.div>

        {/* =================================================
            COMING SOON
        ================================================= */}

        <ComingSoonSection category={activeCategory} />

        {/* =================================================
            FOOTER ORNAMENT
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="
            mt-14

            flex
            items-center
            justify-center
            gap-3

            text-[#d4af37]/50

            sm:mt-16
            sm:gap-4
          "
        >
          <div
            className="
              h-px
              w-8

              bg-gradient-to-r
              from-transparent
              to-[#d4af37]/40

              sm:w-24
            "
          />

          <div
            className="
              h-1.5
              w-1.5

              rotate-45

              border
              border-[#d4af37]/70
            "
          />

          <span
            className="
    font-display
    text-[10px]
    uppercase
    tracking-[.28em]
    text-[#d4af37]
    font-medium

    sm:text-[11px]
  "
          >
            Al Misbah Fragrances
          </span>
          <div
            className="
              h-1.5
              w-1.5

              rotate-45

              border
              border-[#d4af37]/70
            "
          />

          <div
            className="
              h-px
              w-8

              bg-gradient-to-l
              from-transparent
              to-[#d4af37]/40

              sm:w-24
            "
          />
        </motion.div>
      </div>
    </motion.main>
  );
}

/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/perfume-series")({
  head: () => {
    const title = "Perfume Collection — Coming Soon | Al Misbah Perfumes";

    const description =
      "The Al Misbah Perfume Collection is coming soon, featuring Royal OUD, Signature EDP and Woody Collection fragrances.";

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
