import { createFileRoute, Link } from "@tanstack/react-router";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Leaf,
  Sparkles,
  Gem,
  Wind,
  SlidersHorizontal,
  Truck,
  ShieldCheck,
  Headphones,
  Heart,
  ShoppingCart,
  Star,
  Crown,
  Check,
  CheckCircle2,
  X,
} from "lucide-react";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import { products } from "@/data/products";
import { useCart } from "@/context/cartContext";

/* =========================================================
   TYPES
========================================================= */

type Product = any;

type CartToast = {
  name: string;
  image?: string;
  price?: string;
  quantity: number;
};

/* =========================================================
   CONSTANTS
========================================================= */

const ATTAR_SERIES = ["floral", "sweet", "woody", "oud-oudh", "fresh", "traditional","musk"];

const ITEMS_PER_PAGE = 8;

/* =========================================================
   CATEGORY FILTERS
========================================================= */

const CATEGORY_FILTERS = [
  {
    label: "All Attars",
    value: "all",
    icon: Sparkles,
  },
  {
    label: "Floral",
    value: "floral",
    icon: Flower2,
  },
  {
    label: "Sweet",
    value: "sweet",
    icon: Sparkles,
  },
  {
    label: "Woody",
    value: "woody",
    icon: Leaf,
  },
  {
    label: "Oud",
    value: "oud-oudh",
    icon: Gem,
  },
  {
    label: "Fresh",
    value: "fresh",
    icon: Wind,
  },
  {
    label: "Traditional",
    value: "traditional",
    icon: Crown,
  },
  {
    label: "Musk",
    value: "musk",
    icon: Sparkles,
  },
];

/* =========================================================
   SORT OPTIONS
========================================================= */

const SORT_OPTIONS = [
  {
    label: "Featured",
    value: "featured",
  },
  {
    label: "Price: Low to High",
    value: "price-low",
  },
  {
    label: "Price: High to Low",
    value: "price-high",
  },
  {
    label: "Highest Rated",
    value: "rating",
  },
  {
    label: "Name: A to Z",
    value: "name",
  },
];

/* =========================================================
   HELPERS
========================================================= */

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

function normalizeSeries(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(normalizeSeries).join("-");
  }

  const series = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[_/]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  if (
    series === "oud" ||
    series === "oudh" ||
    series.includes("oud-oudh") ||
    (series.includes("oud") && series.includes("oudh"))
  ) {
    return "oud-oudh";
  }

  return series;
}

function productHasSeries(product: Product, category: string) {
  const series = product?.series;

  if (Array.isArray(series)) {
    return series.some((item) => normalizeSeries(item) === category);
  }

  return normalizeSeries(series) === category;
}

function getProductPrice(product: Product) {
  return getNumericValue(product?.price ?? product?.salePrice ?? product?.sellingPrice, 0);
}

function getProductMrp(product: Product, price: number) {
  const mrp = getNumericValue(product?.mrp ?? product?.originalPrice ?? product?.oldPrice, 0);

  return mrp > price ? mrp : 0;
}

function getProductDiscount(product: Product, price: number, mrp: number) {
  return getNumericValue(
    product?.discount ?? product?.discountPercentage,
    0,
  );
}
/* =========================================================
   CART TOAST
========================================================= */

function CartToastNotification({
  toast,
  onClose,
}: {
  toast: CartToast | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.97,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="
            fixed
            bottom-4
            left-1/2
            z-[999999]
            w-[calc(100%-20px)]
            max-w-[390px]
            -translate-x-1/2

            sm:bottom-6
            sm:left-auto
            sm:right-6
            sm:w-[390px]
            sm:translate-x-0
          "
        >
          <div
            className="
              relative
              overflow-hidden

              rounded-[22px]

              border
              border-[#d4af37]/25

              bg-[#0b0b09]/95

              shadow-[0_25px_80px_rgba(0,0,0,.8)]

              backdrop-blur-2xl
            "
          >
            <div
              className="
                absolute
                left-0
                right-0
                top-0
                h-px

                bg-gradient-to-r
                from-transparent
                via-[#f5d76e]
                to-transparent
              "
            />

            <div className="p-4">
              <div className="flex items-start gap-3">
                <div
                  className="
                    relative
                    h-[68px]
                    w-[68px]
                    shrink-0

                    overflow-hidden
                    rounded-[15px]

                    border
                    border-[#d4af37]/30

                    bg-[#11110d]
                  "
                >
                  <div
                    className="
                      absolute
                      inset-0

                      bg-[radial-gradient(circle,rgba(212,175,55,.18),transparent_70%)]
                    "
                  />

                  {toast.image ? (
                    <img
                      src={toast.image}
                      alt={toast.name}
                      className="
                        relative
                        z-10
                        h-full
                        w-full
                        object-contain
                        p-1.5
                      "
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ShoppingCart className="h-6 w-6 text-[#d4af37]" />
                    </div>
                  )}

                  <div
                    className="
                      absolute
                      bottom-0
                      right-0
                      z-20

                      flex
                      h-5
                      w-5
                      items-center
                      justify-center

                      rounded-full

                      bg-[#d4af37]
                    "
                  >
                    <Check className="h-3 w-3 text-black" strokeWidth={3} />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#d4af37]" />

                    <p
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[.18em]
                        text-[#d4af37]
                      "
                    >
                      Added To Your Bag
                    </p>
                  </div>

                  <p
                    className="
                      mt-2
                      truncate

                      font-display
                      text-[17px]
                      text-white
                    "
                  >
                    {toast.name}
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    {toast.price && (
                      <span className="text-[13px] font-semibold text-[#f5d76e]">
                        ₹{getNumericValue(toast.price).toLocaleString("en-IN")}
                      </span>
                    )}

                    <span className="h-1 w-1 rounded-full bg-white/20" />

                    <span
                      className="
                        rounded-full
                        bg-white/[.06]

                        px-2
                        py-1

                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[.1em]

                        text-white/45
                      "
                    >
                      Qty {toast.quantity}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-white/10

                    text-white/35

                    transition-all

                    hover:border-[#d4af37]/40
                    hover:text-[#d4af37]
                  "
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="my-4 h-px bg-white/[.07]" />

              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center

                    rounded-full

                    border
                    border-[#d4af37]/20

                    bg-[#d4af37]/[.06]
                  "
                >
                  <CheckCircle2 className="h-4 w-4 text-[#d4af37]" />
                </div>

                <div>
                  <p className="text-[10px] text-white/70">
                    Your fragrance has been added to your collection.
                  </p>

                  <p
                    className="
                      mt-1
                      text-[7px]
                      uppercase
                      tracking-[.16em]
                      text-white/25
                    "
                  >
                    Ready for checkout
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="
                    h-10

                    rounded-full

                    border
                    border-white/10

                    bg-white/[.025]

                    text-[8px]
                    font-bold
                    uppercase
                    tracking-[.08em]

                    text-white/60

                    transition-all

                    hover:bg-white/[.06]
                    hover:text-white
                  "
                >
                  Continue Shopping
                </button>

                <Link
                  to="/cart"
                  onClick={onClose}
                  className="
                    flex
                    h-10
                    items-center
                    justify-center
                    gap-2

                    rounded-full

                    bg-gradient-to-r
                    from-[#a97a1c]
                    via-[#f5d76e]
                    to-[#b88627]

                    text-[8px]
                    font-black
                    uppercase
                    tracking-[.08em]

                    text-[#100d05]
                  "
                >
                  View Cart
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 4.5,
                ease: "linear",
              }}
              className="
                h-[2px]
                origin-left

                bg-gradient-to-r
                from-transparent
                via-[#d4af37]
                to-transparent
              "
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =========================================================
   PRODUCT RATING
========================================================= */

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

/* =========================================================
   PREMIUM PRODUCT CARD — SERIES STYLE
========================================================= */

function AttarPageProductCard({
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

  /* =======================================================
     OUT OF STOCK
  ======================================================= */

  const isOutOfStock = (product?.stock ?? 0) <= 0;

  const currentCartItem = cart.find((item) => String(item?.product?.id) === String(productId));

  const currentQuantity = currentCartItem?.quantity ?? 0;

  const isInCart = currentQuantity > 0;

  const name = product?.name ?? product?.title ?? "Premium Attar";

  const image = product?.image ?? product?.images?.[0] ?? "/images/placeholder.webp";

  const price = getProductPrice(product) || 300;

  const mrp = getProductMrp(product, price);

  const discount = getProductDiscount(product, price, mrp);

  const rating = getNumericValue(product?.rating, 4.8);

  const reviews = getNumericValue(product?.reviews ?? product?.reviewCount, 1200);

  const notes = String(product?.notes ?? "").trim();

  const noteParts = notes
    .split(/[•·|,]/)
    .map((item) => item.trim())
    .filter(Boolean);

  const featureNames =
    noteParts.length > 0 ? noteParts.slice(0, 3) : ["Premium Quality", "Long Lasting", "Luxury"];

  const featureIcons = [Flower2, Leaf, Sparkles];

  const badgeText =
    product?.badge ??
    product?.tag ??
    ["BEST SELLER", "POPULAR CHOICE", "LUXURY FRAGRANCE", "ICONIC SCENT"][index % 4];

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = () => {
    if (!productId || isOutOfStock) {
      return;
    }

    onAddToCart(product);

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

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
      {/* Ambient hover glow */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-[#f5d76e]/[0.07] via-transparent to-[#d4af37]/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Top gold line */}
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

        {/* Image glass */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.06] via-transparent to-black/35" />

        {/* =================================================
            OUT OF STOCK OVERLAY
        ================================================= */}

        {isOutOfStock && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-[1px]">
            <span
              className="
                rounded-full
                border border-red-400/40
                bg-black/90
                px-4 py-2
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-red-400
                shadow-[0_0_25px_rgba(239,68,68,0.2)]
                sm:px-5
                sm:py-2.5
                sm:text-[10px]
              "
            >
              Out of Stock
            </span>
          </div>
        )}

        {/* Discount */}
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

        {/* Premium badge */}
        <div className="absolute right-3 top-3 z-30 flex h-12 w-12 flex-col items-center justify-center rounded-xl border border-[#d4af37]/60 bg-black/80 px-1 shadow-[0_8px_25px_rgba(0,0,0,0.5)] backdrop-blur-md sm:right-4 sm:top-4 sm:h-14 sm:w-14 sm:rounded-2xl">
          <Crown className="mb-1 h-3.5 w-3.5 text-[#f5d76e] sm:h-4 sm:w-4" />

          <span className="max-w-[42px] text-center text-[5px] font-bold uppercase leading-tight tracking-[0.04em] text-white/80 sm:max-w-[48px] sm:text-[6px]">
            {badgeText}
          </span>
        </div>

        {/* Wishlist */}
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

        {/* Bottom image accent */}
        <div className="absolute bottom-0 left-1/2 z-30 h-[2px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6">
        {/* Name */}
       <h3
  className="
    font-display lining-nums font-medium leading-[1.08]
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

        {/* Notes */}
        <p className="mt-2 line-clamp-2 min-h-[30px] text-[9px] font-medium uppercase leading-[1.5] tracking-[0.12em] text-[#d4af37]/70 sm:text-[10px] sm:tracking-[0.16em]">
          {notes || "Premium Luxury Fragrance"}
        </p>

        {/* Rating */}
        <ProductRating rating={rating} reviews={reviews} />

        {/* Features */}
        <div
  className="
    -ml-1
    mt-3
    flex
    w-full
    min-w-0
    items-center
    justify-start
    gap-1
    overflow-hidden

    sm:-ml-2
    sm:mt-4
    sm:gap-2
  "
>
  {featureNames.map((feature, featureIndex) => {
    const Icon =
      featureIcons[featureIndex % featureIcons.length] ?? Flower2;

    return (
      <div
        key={`${feature}-${featureIndex}`}
        title={feature}
        className="
          flex
          shrink
          min-w-0
          items-center
          justify-center
          gap-0.5
          rounded-full
          border
          border-[#d4af37]/20
          bg-white/[0.035]
          px-1.5
          py-1.5
          transition-all
          duration-300
          hover:border-[#d4af37]/50
          hover:bg-[#d4af37]/[0.06]

          sm:gap-1
          sm:px-2.5
          sm:py-2
        "
      >
        <Icon
          className="
            h-2.5
            w-2.5
            shrink-0
            text-[#d4af37]

            sm:h-3
            sm:w-3
          "
        />

        <span
          className="
            whitespace-nowrap
            text-[7.5px]
            font-semibold
            leading-none
            tracking-normal
            text-white/75

            sm:text-[9px]
            sm:tracking-[0.01em]
          "
        >
          {feature}
        </span>
      </div>
    );
  })}
</div>
 
        
        {/* Price */}
        <div className="mt-4 border-t border-[#d4af37]/10 pt-3.5 sm:mt-5 sm:pt-4">
          <div className="flex items-end justify-between gap-2">
            <div className="flex min-w-0 items-baseline gap-2">
              {mrp > price && (
                <span
                  className="
                    shrink-0
                    text-[14px]
                    font-medium
                    text-white/40
                    line-through
                    sm:text-[12px]
                    lg:text-[15px]
                  "
                >
                  ₹{mrp.toLocaleString("en-IN")}
                </span>
              )}

              <span
                className="
                  truncate
                  text-[17px]
                  font-extrabold
                  leading-none
                  tracking-[-0.02em]
                  text-[#f4c84f]
                  sm:text-[21px]
                  lg:text-[24px]
                "
              >
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
            <div className="mt-2 flex items-center gap-1.5 text-[7px] font-semibold uppercase tracking-[0.12em] text-white/30 sm:text-[8px]">
              <Sparkles className="h-2.5 w-2.5 text-[#d4af37] sm:h-3 sm:w-3" />
              Special Luxury Price
            </div>
          )}

          {/* Trust */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[7px] uppercase tracking-[0.08em] text-white/25 sm:text-[8px]">
            <ShieldCheck className="h-3 w-3 shrink-0 text-[#d4af37]/65" />
            <span>Premium Oriental Fragrance</span>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-disabled={isOutOfStock}
            className={`
              group/cart relative mt-3.5 flex min-h-[45px] w-full
              items-center justify-center gap-2 overflow-hidden
              rounded-full border px-3
              text-[9px] font-extrabold uppercase tracking-[0.1em]
              transition-all duration-300
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#d4af37]
              sm:mt-4 sm:min-h-[48px] sm:text-[10px]

              ${
                isOutOfStock
                  ? `
                    cursor-not-allowed
                    border-red-500/30
                    bg-zinc-800
                    text-red-400
                    opacity-90
                  `
                  : added || isInCart
                    ? `
                      border-[#d4af37]
                      bg-[#17140c]
                      text-[#f5d76e]
                      shadow-[0_0_25px_rgba(212,175,55,0.10)]
                    `
                    : `
                      border-[#d4af37]/80
                      bg-gradient-to-r
                      from-[#b98319]
                      via-[#f5d76e]
                      to-[#b98319]
                      text-black
                      shadow-[0_8px_25px_rgba(212,175,55,0.18)]
                      hover:brightness-110
                      hover:shadow-[0_10px_30px_rgba(212,175,55,0.28)]
                      active:scale-[0.97]
                    `
              }
            `}
          >
            {!isOutOfStock && !added && !isInCart && (
              <span className="pointer-events-none absolute inset-y-0 -left-14 w-8 skew-x-[-20deg] bg-white/40 transition-all duration-700 group-hover/cart:left-[120%]" />
            )}

            {isOutOfStock ? (
              <>
                <X className="h-4 w-4" />
                <span>Out of Stock</span>
              </>
            ) : added ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added</span>
              </>
            ) : isInCart ? (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>In Cart</span>

                <span className="rounded-full bg-[#d4af37]/15 px-2 py-0.5 text-[7px]">
                  {currentQuantity}
                </span>

                <ArrowRight className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add to Cart</span>

                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cart:translate-x-1" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom line */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 z-40 h-[2px] w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#f5d76e] to-transparent opacity-0 shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all duration-500 group-hover:w-3/4 group-hover:opacity-100" />
    </motion.article>
  );
}

/* =========================================================
   MAIN ATTAR SERIES
========================================================= */

function AttarSeries() {
  const { addToCart, cart } = useCart();

  const [currentPage, setCurrentPage] = useState(1);

  const [activeCategory, setActiveCategory] = useState("all");

  const [sortBy, setSortBy] = useState("featured");

  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement | null>(null);

  const [toast, setToast] = useState<CartToast | null>(null);

  const toastTimer = useRef<number | null>(null);

  /* =======================================================
     ATTAR PRODUCTS
  ======================================================= */

  const attarProducts = useMemo(() => {
    return (products as Product[]).filter((product) => {
      const series = product?.series;

      if (Array.isArray(series)) {
        return series.some((item) => ATTAR_SERIES.includes(normalizeSeries(item)));
      }

      return ATTAR_SERIES.includes(normalizeSeries(series));
    });
  }, []);

  /* =======================================================
     FILTER + SORT
  ======================================================= */

  const filteredItems = useMemo(() => {
    const result =
      activeCategory === "all"
        ? [...attarProducts]
        : attarProducts.filter((product) => productHasSeries(product, activeCategory));

    switch (sortBy) {
      case "price-low":
        return result.sort((a, b) => getProductPrice(a) - getProductPrice(b));

      case "price-high":
        return result.sort((a, b) => getProductPrice(b) - getProductPrice(a));

      case "rating":
        return result.sort((a, b) => getNumericValue(b?.rating, 0) - getNumericValue(a?.rating, 0));

      case "name":
        return result.sort((a, b) =>
          String(a?.name ?? a?.title ?? "").localeCompare(
            String(b?.name ?? b?.title ?? ""),
            undefined,
            {
              sensitivity: "base",
            },
          ),
        );

      default:
        return result;
    }
  }, [attarProducts, activeCategory, sortBy]);

  /* =======================================================
     PAGINATION
  ======================================================= */

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  useEffect(() => {
    if (currentPage > 1) {
      window.setTimeout(() => {
        const productSection = document.getElementById("attar-products");

        if (productSection) {
          productSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 60);
    }
  }, [currentPage]);

  /* =======================================================
     ADD TO CART
  ======================================================= */

  const handleAddToCart = (product: Product) => {
    try {
      /* OUT OF STOCK PROTECTION */
      if ((product?.stock ?? 0) <= 0) {
        return;
      }

      const productId = product?.id ?? product?.name ?? product?.title;

      const existingItem = cart.find((item) => String(item?.product?.id) === String(productId));

      const currentQuantity = existingItem?.quantity ?? 0;

      const nextQuantity = currentQuantity + 1;

      const productPrice = String(
        product?.price ?? product?.salePrice ?? product?.sellingPrice ?? "",
      );

      const productName = product?.name ?? product?.title ?? "Premium Attar";

      const productImage = product?.image ?? product?.images?.[0] ?? "";

      addToCart({
        id: productId,
        name: productName,
        price: productPrice,
        notes: product?.notes ?? "",
        image: productImage,
      });

      setToast({
        name: productName,
        image: productImage,
        price: productPrice,
        quantity: nextQuantity,
      });

      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }

      toastTimer.current = window.setTimeout(() => {
        setToast(null);
      }, 4500);
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        window.clearTimeout(toastTimer.current);
      }
    };
  }, []);

  /* =======================================================
     CLOSE SORT
  ======================================================= */

  useEffect(() => {
    if (!sortOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (sortRef.current && !sortRef.current.contains(target)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [sortOpen]);

  /* =======================================================
     CATEGORY
  ======================================================= */

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
    setSortOpen(false);

    // Category change should take the user directly to the
    // filtered Attar product cards instead of the hero section.
    window.setTimeout(() => {
      const productSection = document.getElementById("attar-products");

      if (productSection) {
        productSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 60);
  };

  /* =======================================================
     SORT
  ======================================================= */

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
    setSortOpen(false);

    // Keep sorting UX consistent: return to the product cards.
    window.setTimeout(() => {
      const productSection = document.getElementById("attar-products");

      if (productSection) {
        productSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 60);
  };

  /* =======================================================
     PAGE
  ======================================================= */

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <CartToastNotification toast={toast} onClose={() => setToast(null)} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="
          relative
          min-h-screen
          w-full
          overflow-x-hidden

          bg-[#030303]

          text-white
        "
      >
        {/* GLOBAL BACKGROUND */}

        <div
          className="
            pointer-events-none
            fixed
            inset-0
            z-0
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              left-1/2
              top-[-150px]

              h-[700px]
              w-[1000px]

              -translate-x-1/2

              rounded-full

              bg-[#d4af37]/[.035]

              blur-[200px]
            "
          />

          <div
            className="
              absolute
              bottom-[-250px]
              left-[-250px]

              h-[600px]
              w-[600px]

              rounded-full

              bg-[#d4af37]/[.018]

              blur-[180px]
            "
          />

          <div
            className="
              absolute
              right-[-250px]
              top-[900px]

              h-[600px]
              w-[600px]

              rounded-full

              bg-[#d4af37]/[.018]

              blur-[180px]
            "
          />

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

        {/* MAIN CONTAINER */}

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

            xl:px-14
          "
        >
          {/* BACK */}

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
    lg:mt-8
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
      border-white/20
      bg-white
      px-3.5
      py-2.5
      text-[7px]
      font-semibold
      uppercase
      tracking-[0.2em]
      text-black
      backdrop-blur-md
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
      "
    />

    Back to Home
  </Link>
</motion.div>

          {/* =========================================================
    PREMIUM COMPACT HERO
========================================================= */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
    group/hero
    relative

    min-h-[400px]

    overflow-hidden

    rounded-[24px]

    border
    border-[#d4af37]/15

    bg-[#050505]

    shadow-[0_30px_100px_rgba(0,0,0,.70)]

    sm:min-h-[440px]
    sm:rounded-[28px]

    md:min-h-[470px]

    lg:min-h-[510px]

    xl:min-h-[540px]
  "
          >
            {/* =======================================================
      HERO IMAGE
  ======================================================= */}

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

      group-hover/hero:scale-[1.06]
    "
              style={{
                backgroundImage: "url('/images/attar-hero.webp')",
              }}
            />

            {/* =======================================================
      DARK CINEMATIC OVERLAY
  ======================================================= */}

            <div
              className="
      absolute
      inset-0

      bg-[linear-gradient(90deg,rgba(0,0,0,.98)_0%,rgba(0,0,0,.88)_35%,rgba(0,0,0,.52)_67%,rgba(0,0,0,.80)_100%)]
    "
            />

            <div
              className="
      absolute
      inset-0

      bg-gradient-to-t
      from-[#020202]
      via-transparent
      to-black/25
    "
            />

            {/* =======================================================
      GOLD LIGHT
  ======================================================= */}

            <div
              className="
      pointer-events-none

      absolute
      left-1/2
      top-[-280px]

      h-[600px]
      w-[900px]

      -translate-x-1/2

      rounded-full

      bg-[#d4af37]/[.065]

      blur-[150px]

      transition-all
      duration-[1800ms]

      group-hover/hero:bg-[#d4af37]/[.10]
    "
            />

            {/* =======================================================
      HERO CONTENT
  ======================================================= */}

            <div
              className="
      relative
      z-10

      flex
      min-h-[400px]

      flex-col
      items-center
      justify-center

      px-5
      py-8

      text-center

      sm:min-h-[440px]
      sm:px-8
      sm:py-10

      md:min-h-[470px]

      lg:min-h-[510px]
      lg:px-10

      xl:min-h-[540px]
    "
            >
              {/* =====================================================
        HOUSE OF AL MISBAH
    ===================================================== */}

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
                  delay: 0.1,
                }}
                className="
        flex
        items-center
        gap-2

        sm:gap-3
      "
              >
                <span
                  className="
          h-px
          w-6

          bg-gradient-to-r
          from-transparent
          to-[#d4af37]

          sm:w-8
        "
                />

                <p
                  className="
          text-[6px]
          font-bold
          uppercase
          tracking-[.32em]

          text-[#d4af37]

          sm:text-[8px]
          sm:tracking-[.38em]
        "
                >
                  The House Of Al Misbah
                </p>

                <span
                  className="
          h-px
          w-6

          bg-gradient-to-l
          from-transparent
          to-[#d4af37]

          sm:w-8
        "
                />
              </motion.div>

              {/* =====================================================
        ARABIC TITLE
    ===================================================== */}

              <p
                className="
        mt-2.5

        font-display

        text-[22px]

        text-[#d4af37]

        drop-shadow-[0_5px_25px_rgba(212,175,55,.18)]

        sm:mt-3
        sm:text-3xl

        md:text-4xl

        lg:text-[46px]
      "
              >
                مجموعة العطور
              </p>

              {/* =====================================================
        PURE ATTARS / MUMBAI ATELIER
    ===================================================== */}

              <div
                className="
        mt-2

        flex
        items-center
        justify-center
        gap-2

        text-[5px]
        font-bold
        uppercase
        tracking-[.25em]

        text-white/60

        sm:mt-2.5
        sm:gap-3
        sm:text-[7px]
        sm:tracking-[.30em]
      "
              >
                <span>PURE ATTARS</span>

                <span className="text-[#d4af37]">◆</span>

                <span>MUMBAI ATELIER</span>
              </div>

              {/* =====================================================
        MAIN TITLE
    ===================================================== */}

              <h1
                className="
        mt-3

        max-w-[900px]

        font-display

        text-[38px]
        font-medium
        leading-[.86]

        text-[#f5d76e]

        drop-shadow-[0_8px_35px_rgba(212,175,55,.18)]

        sm:mt-4
        sm:text-5xl

        md:text-6xl

        lg:text-[5.6rem]

        xl:text-[6.4rem]
      "
              >
                The Attar
                <br />
                <span className="text-white/[.94]">Collection</span>
              </h1>

              {/* =====================================================
        ORNAMENT
    ===================================================== */}

              <div
                className="
        mt-4

        flex
        items-center
        gap-2

        sm:mt-5
        sm:gap-3
      "
              >
                <span
                  className="
          h-px
          w-8

          bg-gradient-to-r
          from-transparent
          to-[#d4af37]

          sm:w-10
        "
                />

                <span
                  className="
          h-1.5
          w-1.5

          rotate-45

          border
          border-[#d4af37]

          shadow-[0_0_14px_rgba(212,175,55,.35)]
        "
                />

                <span
                  className="
          h-px
          w-8

          bg-gradient-to-l
          from-transparent
          to-[#d4af37]

          sm:w-10
        "
                />
              </div>

              {/* =====================================================
        DESCRIPTION
    ===================================================== */}

              <p
                className="
        mt-3

        max-w-[600px]

        text-[7.5px]
        leading-4

        text-white/45

        sm:mt-4
        sm:text-[11px]
        sm:leading-5

        md:text-xs
        md:leading-6
      "
              >
                Discover concentrated fragrance oils crafted around timeless Indian perfumery
                traditions — floral, woody, sweet, fresh and oud.
              </p>

              {/* =====================================================
        TAGLINE
    ===================================================== */}

              <p
                className="
        mt-2

        font-display
        text-[12px]
        italic

        text-[#f5d76e]/90

        sm:mt-2.5
        sm:text-sm

        md:text-base
      "
              >
                More than fragrance.
                <span className="text-white/40"> An expression of you.</span>
              </p>

              {/* =====================================================
        BENEFITS
    ===================================================== */}

              <div
                className="
        mt-3

        flex
        flex-wrap
        items-center
        justify-center
        gap-1.5

        sm:mt-4
        sm:gap-2
      "
              >
                {["Concentrated Oils", "Alcohol Free", "Long Lasting"].map((item) => (
                  <span
                    key={item}
                    className="
            inline-flex
            items-center
            gap-1

            rounded-full

            border
            border-white/10

            bg-black/25

            px-2.5
            py-1

            text-[4.5px]
            font-semibold
            uppercase
            tracking-[.08em]

            text-white/45

            backdrop-blur-xl

            sm:px-3
            sm:py-1.5
            sm:text-[6px]
            sm:tracking-[.10em]
          "
                  >
                    <Check
                      className="
              h-2
              w-2

              text-[#d4af37]

              sm:h-2.5
              sm:w-2.5
            "
                    />

                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* =======================================================
      TOP LEFT CORNER
  ======================================================= */}

            <div
              className="
      pointer-events-none

      absolute
      left-4
      top-4

      h-12
      w-12

      border-l
      border-t
      border-[#d4af37]/30

      sm:left-6
      sm:top-6
      sm:h-14
      sm:w-14
    "
            />

            {/* =======================================================
      BOTTOM RIGHT CORNER
  ======================================================= */}

            <div
              className="
      pointer-events-none

      absolute
      bottom-4
      right-4

      h-12
      w-12

      border-b
      border-r
      border-[#d4af37]/30

      sm:bottom-6
      sm:right-6
      sm:h-14
      sm:w-14
    "
            />
          </motion.section>

          {/* FILTER BAR */}

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

              {/* SORT */}

              <div ref={sortRef} className="relative shrink-0">
                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  type="button"
                  onClick={() => setSortOpen((value) => !value)}
                  aria-expanded={sortOpen}
                  aria-haspopup="menu"
                  className="
                    inline-flex
                    h-10
                    shrink-0

                    items-center
                    gap-1.5

                    rounded-full

                    border
                    border-white/[.08]

                    bg-white/[.025]

                    px-4

                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[.09em]

                    text-white/50

                    backdrop-blur-xl

                    transition-all
                    duration-300

                    hover:border-[#d4af37]/40
                    hover:bg-[#d4af37]/[.05]
                    hover:text-[#f5d76e]

                    sm:h-11
                    sm:px-5
                    sm:text-[8px]
                  "
                >
                  <SlidersHorizontal
                    className="
                      h-3.5
                      w-3.5

                      text-[#d4af37]
                    "
                  />
                  Sort
                  <ChevronDown
                    className={`
                      h-3.5
                      w-3.5

                      text-[#d4af37]

                      transition-transform

                      ${sortOpen ? "rotate-180" : ""}
                    `}
                  />
                </motion.button>

                <AnimatePresence>
                  {sortOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.96,
                      }}
                      className="
                        fixed

                        right-4
                        top-[100px]

                        z-[99999]

                        w-[235px]

                        overflow-hidden

                        rounded-[22px]

                        border
                        border-[#d4af37]/20

                        bg-[#0b0b0a]/[.98]

                        p-1.5

                        shadow-[0_25px_80px_rgba(0,0,0,.65)]

                        backdrop-blur-3xl

                        sm:right-8
                        sm:top-[105px]

                        lg:right-10
                      "
                      role="menu"
                    >
                      <div
                        className="
                          flex
                          items-center
                          justify-between

                          px-3
                          pb-2
                          pt-2
                        "
                      >
                        <span
                          className="
                            text-[7px]
                            font-bold
                            uppercase
                            tracking-[.20em]

                            text-white/25
                          "
                        >
                          Sort Collection
                        </span>

                        <span
                          className="
                            h-1.5
                            w-1.5

                            rounded-full

                            bg-[#d4af37]

                            shadow-[0_0_10px_rgba(212,175,55,.7)]
                          "
                        />
                      </div>

                      <div className="mb-1 h-px bg-white/[.06]" />

                      {SORT_OPTIONS.map((option) => {
                        const active = sortBy === option.value;

                        return (
                          <button
                            key={option.value}
                            type="button"
                            role="menuitem"
                            onClick={() => handleSortChange(option.value)}
                            className={`
                                flex
                                w-full

                                items-center
                                justify-between

                                rounded-[14px]

                                px-3
                                py-3

                                text-left

                                text-[7px]
                                font-semibold
                                uppercase
                                tracking-[.08em]

                                transition-all

                                ${
                                  active
                                    ? "bg-[#d4af37]/[.09] text-[#f5d76e]"
                                    : "text-white/45 hover:bg-white/[.04] hover:text-white"
                                }
                              `}
                          >
                            <span className="flex items-center gap-2.5">
                              <span
                                className={`
                                    flex
                                    h-6
                                    w-6

                                    items-center
                                    justify-center

                                    rounded-full

                                    border

                                    ${
                                      active
                                        ? "border-[#d4af37]/30 bg-[#d4af37]/[.10]"
                                        : "border-white/[.06] bg-white/[.025]"
                                    }
                                  `}
                              >
                                {option.value === "price-low" && (
                                  <span className="text-[9px]">₹↓</span>
                                )}

                                {option.value === "price-high" && (
                                  <span className="text-[9px]">₹↑</span>
                                )}

                                {option.value === "rating" && (
                                  <Star
                                    className="h-3 w-3"
                                    fill={active ? "currentColor" : "none"}
                                  />
                                )}

                                {option.value === "name" && <span className="text-[8px]">AZ</span>}

                                {option.value === "featured" && <Sparkles className="h-3 w-3" />}
                              </span>

                              {option.label}
                            </span>

                            {active && (
                              <span
                                className="
                                    flex
                                    h-5
                                    w-5

                                    items-center
                                    justify-center

                                    rounded-full

                                    bg-[#d4af37]/15
                                  "
                              >
                                <Check
                                  className="
                                      h-3
                                      w-3
                                      text-[#d4af37]
                                    "
                                />
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* COLLECTION HEADER */}

          <div
            className="
              mt-8

              flex
              items-end
              justify-between

              border-b
              border-white/[.07]

              pb-4

              sm:mt-10
              sm:pb-5
            "
          >
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-1
                    w-1

                    rounded-full

                    bg-[#d4af37]

                    shadow-[0_0_12px_#d4af37]
                  "
                />

                <p
                  className="
                    text-[7px]
                    font-bold
                    uppercase
                    tracking-[.28em]

                    text-[#d4af37]
                  "
                >
                  Curated Selection
                </p>
              </div>

              <p
                className="
                  mt-2

                  text-[8px]

                  text-white/60

                  sm:text-[9px]
                "
              >
                {filteredItems.length} {filteredItems.length === 1 ? "fragrance" : "fragrances"} in
                this collection
              </p>
            </div>

            <div className="text-right">
              <p
                className="
                  hidden

                  text-[7px]
                  uppercase
                  tracking-[.18em]

                  text-white/20

                  sm:block
                "
              >
                Showing
              </p>

              <p
                className="
                  mt-1

                  text-[8px]

                  text-[#d4af37]/75
                "
              >
                {paginatedItems.length}
                {" / "}
                {filteredItems.length}
              </p>
            </div>
          </div>

          {/* PRODUCT GRID / CATEGORY DESTINATION */}

          <div id="attar-products" className="scroll-mt-24">
            {paginatedItems.length > 0 ? (
              <>
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.06,
                      },
                    },
                  }}
                  className="
                  mt-5

                  grid
                  w-full

                  grid-cols-2

                  gap-3

                  sm:mt-6
                  sm:gap-4

                  lg:grid-cols-4
                  lg:gap-5

                  xl:gap-6
                "
                >
                  {paginatedItems.map((product) => (
                    <motion.div
                      key={product.id ?? product.name}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 25,
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.6,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                      className="flex min-w-0 w-full"
                    >
                      <AttarPageProductCard product={product} onAddToCart={handleAddToCart} />
                    </motion.div>
                  ))}
                </motion.div>

                {/* PAGINATION */}

                {totalPages > 1 && (
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
                      duration: 0.5,
                    }}
                    className="
                    mx-auto
                    mt-12

                    flex
                    w-fit
                    items-center
                    gap-1.5

                    rounded-full

                    border
                    border-[#d4af37]/15

                    bg-[#080808]/85

                    p-1.5

                    shadow-[0_15px_55px_rgba(0,0,0,.50)]

                    backdrop-blur-xl
                  "
                  >
                    {/* PREVIOUS */}

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="
                      inline-flex
                      h-9
                      min-w-9

                      items-center
                      justify-center

                      rounded-full

                      px-3

                      text-[8px]
                      font-semibold
                      uppercase

                      text-white/45

                      transition-all

                      hover:bg-[#d4af37]/10
                      hover:text-[#d4af37]

                      disabled:cursor-not-allowed
                      disabled:opacity-20

                      sm:h-10
                      sm:min-w-10
                    "
                    >
                      <ChevronLeft className="h-4 w-4" />

                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    {/* PAGE */}

                    <div
                      className="
                      flex
                      h-9
                      min-w-[76px]

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-[#d4af37]/20

                      bg-[#d4af37]/[.04]

                      px-4

                      text-[9px]
                      tracking-widest

                      sm:h-10
                    "
                    >
                      <strong className="text-[#d4af37]">{currentPage}</strong>

                      <span className="mx-2 text-white/20">/</span>

                      <strong className="text-white/60">{totalPages}</strong>
                    </div>

                    {/* NEXT */}

                    <button
                      type="button"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="
                      inline-flex
                      h-9
                      min-w-9

                      items-center
                      justify-center

                      rounded-full

                      px-3

                      text-[8px]
                      font-semibold
                      uppercase

                      text-white/45

                      transition-all

                      hover:bg-[#d4af37]/10
                      hover:text-[#d4af37]

                      disabled:cursor-not-allowed
                      disabled:opacity-20

                      sm:h-10
                      sm:min-w-10
                    "
                    >
                      <span className="hidden sm:inline">Next</span>

                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </motion.div>
                )}
              </>
            ) : (
              /* EMPTY */

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                mt-8

                rounded-[28px]

                border
                border-[#d4af37]/15

                bg-[#080808]

                px-5
                py-24

                text-center
              "
              >
                <div
                  className="
                  mx-auto

                  flex
                  h-16
                  w-16

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-[#d4af37]/20

                  bg-[#d4af37]/[.04]
                "
                >
                  <Sparkles
                    className="
                    h-7
                    w-7

                    text-[#d4af37]/70
                  "
                  />
                </div>

                <h2
                  className="
                  mt-6

                  font-display
                  text-3xl

                  text-[#f5d76e]
                "
                >
                  No Fragrances Found
                </h2>

                <p
                  className="
                  mx-auto
                  mt-3

                  max-w-md

                  text-xs
                  leading-6

                  text-white/40
                "
                >
                  No fragrances are currently listed in this Attar category.
                </p>

                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className="
                  mt-7

                  rounded-full

                  border
                  border-[#d4af37]

                  px-7
                  py-2.5

                  text-[8px]
                  font-bold
                  uppercase
                  tracking-[.18em]

                  text-[#d4af37]

                  transition-all

                  hover:bg-[#d4af37]
                  hover:text-black
                "
                >
                  Show All Attars
                </button>
              </motion.div>
            )}
          </div>

          {/* PREMIUM BENEFITS */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
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
              mt-16

              overflow-hidden

              rounded-[28px]

              border
              border-[#d4af37]/12

              bg-[#080808]/90

              shadow-[0_25px_80px_rgba(0,0,0,.40)]
            "
          >
            <div
              className="
                grid
                grid-cols-2

                lg:grid-cols-4
              "
            >
              {[
                {
                  icon: Truck,
                  title: "Free Shipping",
                  text: "On Orders Above ₹4999",
                },
                {
                  icon: ShieldCheck,
                  title: "Secure Payments",
                  text: "100% Safe & Trusted",
                },
                {
                  icon: Gem,
                  title: "Premium Quality",
                  text: "Long Lasting Fragrance",
                },
                {
                  icon: Headphones,
                  title: "Customer Care",
                  text: "We're Always Here",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className={`
                        group
                        relative

                        flex
                        min-h-[145px]

                        flex-col
                        items-center
                        justify-center

                        px-3

                        text-center

                        transition-colors

                        hover:bg-[#d4af37]/[.025]

                        sm:min-h-[160px]

                        lg:min-h-[175px]

                        ${
                          index === 0 || index === 1
                            ? "border-b border-[#d4af37]/10 lg:border-b-0"
                            : ""
                        }

                        ${index % 2 === 1 ? "border-l border-[#d4af37]/10" : ""}

                        ${index > 0 ? "lg:border-l lg:border-[#d4af37]/10" : ""}
                      `}
                  >
                    <div
                      className="
                          flex
                          h-12
                          w-12

                          items-center
                          justify-center

                          rounded-full

                          border
                          border-[#d4af37]/15

                          bg-[#d4af37]/[.035]

                          transition-all
                          duration-300

                          group-hover:scale-110
                          group-hover:border-[#d4af37]/40
                          group-hover:bg-[#d4af37]/[.07]
                          group-hover:shadow-[0_0_30px_rgba(212,175,55,.10)]
                        "
                    >
                      <Icon
                        className="
                            h-5
                            w-5

                            text-[#d4af37]

                            sm:h-6
                            sm:w-6
                          "
                        strokeWidth={1.4}
                      />
                    </div>

                    <p
                      className="
                          mt-4

                          text-[7px]
                          font-bold
                          uppercase
                          tracking-[.13em]

                          text-[#f5d76e]

                          sm:text-[8px]
                        "
                    >
                      {item.title}
                    </p>

                    <p
                      className="
    mt-1.5
    max-w-[260px]

    text-[11px]
    font-medium
    leading-5

    text-white/80

    sm:text-[12px]
    sm:leading-5

    md:text-[13px]
    md:leading-6
  "
                    >
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* FOOTER ORNAMENT */}

          <div
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
          </div>
        </div>
      </motion.main>
    </>
  );
}

/* =========================================================
   ROUTE
========================================================= */

export const Route = createFileRoute("/attar-series")({
  head: () => {
    const title = "Attar Collection — Al Misbah Fragrances";

    const description =
      "Explore the premium Attar Collection by Al Misbah Fragrances, featuring floral, sweet, woody, oud, fresh and traditional concentrated perfume oils.";

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
