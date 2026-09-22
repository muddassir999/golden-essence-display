import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  ChevronLeft,
  ChevronRight,
  Clock3,
  ShoppingBag,
  ShoppingCart,
  Check,
  Heart,
  Sparkles,
  Crown,
  Flower2,
  Leaf,
  Star,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { products, seriesMap } from "@/data/products";
import { useCart } from "@/context/cartContext";

export const Route = createFileRoute("/series/$seriesName")({
  head: ({ params }) => {
    const info = seriesMap[params.seriesName];

    const title = info ? `${info.title} — Al Misbah Perfumes` : "Collection — Al Misbah Perfumes";

    const description =
      info?.blurb ?? "Explore the luxury oriental fragrance collections of Al Misbah Perfumes.";

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

  component: SeriesPage,
});

/* ================================================================
   TYPES
================================================================ */

type SeriesProduct = {
  id?: string | number;
  name: string;
  price: string;
  notes?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
  mrp?: string;
  badge?: string;
  category?: string;

  /* ================= STOCK ================= */
  stock?: number;
};

type CartNotification = {
  name: string;
  image?: string | undefined; // Allow explicit undefined
  quantity: number;
};

/* ================================================================
   CONSTANTS
================================================================ */

const GOLD = "#d4af37";
const GOLD_LIGHT = "#f5d76e";

const defaultBadges = ["BEST SELLER", "POPULAR CHOICE", "LUXURY FRAGRANCE", "ICONIC SCENT"];

/* ================================================================
   ADD TO CART NOTIFICATION
================================================================ */

function AddToCartNotification({
  notification,
  onClose,
}: {
  notification: CartNotification | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.97 }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed left-1/2 top-3 z-[9999] w-[calc(100%-24px)] max-w-[440px] -translate-x-1/2 sm:top-5 sm:w-[calc(100%-32px)]"
        >
          <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/40 bg-[#090908]/95 shadow-[0_25px_70px_rgba(0,0,0,0.75)] backdrop-blur-xl">
            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5d76e] to-transparent" />

            <div className="flex items-center gap-3 p-3 sm:gap-4 sm:p-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#d4af37]/35 bg-[#15120b] sm:h-16 sm:w-16">
                {notification.image ? (
                  <img
                    src={notification.image}
                    alt={notification.name}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-[#d4af37]" />
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1 pr-5">
                <div className="flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  <Check className="h-3 w-3" />
                  Added to Cart
                </div>

                <p className="mt-1 truncate font-display text-[15px] font-medium text-[#f8f1df] sm:text-[17px]">
                  {notification.name}
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-wider text-white/40">
                  Quantity: <span className="text-[#f5d76e]">{notification.quantity}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close notification"
                className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 2.8, ease: "linear" }}
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#b98319] via-[#f5d76e] to-[#d4af37]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   STAR RATING
================================================================ */

function ProductRating({ rating, reviews }: { rating?: number; reviews?: number }) {
  if (rating === undefined) return null;

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

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
        {rating.toFixed(1)}
      </span>

      {reviews !== undefined && (
        <span className="text-[9px] text-white/35 sm:text-[10px]">
          ({reviews.toLocaleString("en-IN")}+)
        </span>
      )}
    </div>
  );
}

/* ================================================================
   PRODUCT CARD
================================================================ */

function SeriesProductCard({
  product,
  index,
  onAdded,
}: {
  product: SeriesProduct;
  index: number;
  onAdded: (notification: CartNotification) => void;
}) {
  const { addToCart, cart } = useCart();

  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const productId = product.id ?? product.name;

  /* ================================================================
     STOCK STATUS
  ================================================================= */

  const isOutOfStock = (product.stock ?? 0) <= 0;

  /* ================================================================
     CART
  ================================================================= */

  const currentCartItem = cart.find((item) => item.product.id === productId);

  const currentQuantity = currentCartItem?.quantity ?? 0;
  const isInCart = currentQuantity > 0;

  const badgeText = product.badge ?? defaultBadges[index % defaultBadges.length];

  const featureIcons = [Flower2, Leaf, Clock3];

  const noteParts = (product.notes ?? "")
    .split(/[•|,]/)
    .map((item) => item.trim())
    .filter(Boolean);

  const featureNames =
    noteParts.length > 0 ? noteParts.slice(0, 3) : ["Premium Quality", "Long Lasting", "Luxury"];

  /* ================================================================
     ADD TO CART
  ================================================================= */

  const handleAddToCart = () => {
    /* ============================================
       IMPORTANT:
       OUT OF STOCK PRODUCT CART MEIN ADD NAHI HOGA
    ============================================ */

    if (isOutOfStock) {
      return;
    }

    addToCart({
      id: productId,
      name: product.name ?? "",
      price: product.price ?? "",
      notes: product.notes ?? "",
      image: product.image ?? "",
    });

    setAdded(true);

    onAdded({
      name: product.name,
      image: product.image,
      quantity: currentQuantity + 1,
    });

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
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

      {/* ============================================================
          IMAGE
      ============================================================ */}

      <div
        className="
          relative z-10 aspect-square w-full shrink-0 overflow-hidden
          border-b border-[#d4af37]/15
          bg-[radial-gradient(circle_at_center,#1b160c_0%,#0b0906_42%,#030303_100%)]
        "
      >
        {/* Central glow */}

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[45%] w-[45%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/10 blur-[45px] transition-all duration-700 group-hover:h-[55%] group-hover:w-[55%] group-hover:bg-[#d4af37]/15 sm:blur-[60px]" />

        {/* Bottom glow */}

        <div className="pointer-events-none absolute bottom-0 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-full bg-[#f5d76e]/[0.06] blur-[35px]" />

        {/* Product Image */}

        {product.image ? (
          <motion.img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            whileHover={{
              scale: isOutOfStock ? 1 : 1.045,
            }}
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`
              relative z-10 block h-full w-full
              object-contain object-center
              drop-shadow-[0_20px_28px_rgba(0,0,0,0.85)]
              transition-all duration-500
              ${isOutOfStock ? "grayscale-[0.25] opacity-55" : ""}
            `}
          />
        ) : (
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            <ShoppingBag className="h-10 w-10 text-[#d4af37]/50 sm:h-14 sm:w-14" />
          </div>
        )}

        {/* Image glass */}

        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.06] via-transparent to-black/35" />

        {/* ============================================================
            DISCOUNT
        ============================================================ */}

        {product.discount !== undefined && (
          <div
            className={`
              absolute left-3 top-3 z-30 flex h-11 w-11
              flex-col items-center justify-center rounded-xl
              border border-[#d4af37]/70 bg-black/80
              shadow-[0_8px_25px_rgba(0,0,0,0.5)]
              backdrop-blur-md
              sm:left-4 sm:top-4 sm:h-14 sm:w-14 sm:rounded-2xl
              ${isOutOfStock ? "opacity-50" : ""}
            `}
          >
            <span className="font-display text-[13px] font-bold leading-none text-[#f7df7d] sm:text-[17px]">
              {product.discount}%
            </span>

            <span className="mt-1 text-[5px] font-bold uppercase tracking-[0.15em] text-white/65 sm:text-[7px]">
              OFF
            </span>
          </div>
        )}

        {/* Premium badge */}

        <div
          className={`
            absolute right-3 top-3 z-30 flex h-12 w-12
            flex-col items-center justify-center rounded-xl
            border border-[#d4af37]/60 bg-black/80 px-1
            shadow-[0_8px_25px_rgba(0,0,0,0.5)]
            backdrop-blur-md
            sm:right-4 sm:top-4 sm:h-14 sm:w-14 sm:rounded-2xl
            ${isOutOfStock ? "opacity-50" : ""}
          `}
        >
          <Crown className="mb-1 h-3.5 w-3.5 text-[#f5d76e] sm:h-4 sm:w-4" />

          <span className="max-w-[42px] text-center text-[5px] font-bold uppercase leading-tight tracking-[0.04em] text-white/80 sm:max-w-[48px] sm:text-[6px]">
            {badgeText}
          </span>
        </div>

        {/* Wishlist */}

        <button
          type="button"
          aria-label={
            liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`
          }
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

        {/* ============================================================
            OUT OF STOCK OVERLAY
        ============================================================ */}

        {isOutOfStock && (
          <div
            className="
              absolute inset-0 z-40
              flex items-center justify-center
              bg-black/45
              backdrop-blur-[1.5px]
            "
          >
            <div
              className="
                flex items-center gap-2
                rounded-full
                border border-red-500/40
                bg-black/90
                px-4 py-2.5
                shadow-[0_8px_30px_rgba(0,0,0,0.6)]
                sm:px-5 sm:py-3
              "
            >
              <X
                className="
                  h-3.5 w-3.5
                  text-red-400
                  sm:h-4 sm:w-4
                "
              />

              <span
                className="
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-red-400
                  sm:text-[10px]
                "
              >
                Out of Stock
              </span>
            </div>
          </div>
        )}

        {/* Bottom image accent */}

        <div className="absolute bottom-0 left-1/2 z-30 h-[2px] w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent opacity-70" />
      </div>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      <div className="relative z-10 flex flex-1 flex-col p-3.5 sm:p-5 lg:p-6">
        {/* Name */}

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
          {product.name}
        </h3>

        {/* Notes */}

        <p className="mt-2 line-clamp-2 min-h-[30px] text-[9px] font-medium uppercase leading-[1.5] tracking-[0.12em] text-[#d4af37]/70 sm:text-[10px] sm:tracking-[0.16em]">
          {product.notes || "Premium Luxury Fragrance"}
        </p>

        {/* Rating */}

        <ProductRating
          {...(product.rating !== undefined && { rating: product.rating })}
          {...(product.reviews !== undefined && { reviews: product.reviews })}
        />

        {/* Features */}

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

        {/* Price */}

        <div className="mt-4 border-t border-[#d4af37]/10 pt-3.5 sm:mt-5 sm:pt-4">
          <div className="flex items-end justify-between gap-2">
            <div className="flex min-w-0 items-baseline gap-2">
              {product.mrp && (
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
                  {product.mrp}
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
                {product.price}
              </span>
            </div>

            {product.discount !== undefined && (
              <span
                className={`
                  shrink-0 rounded-full
                  border border-[#d4af37]/35
                  bg-[#d4af37]/[0.05]
                  px-2 py-1
                  text-[6px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#f5d76e]
                  sm:px-2.5 sm:text-[8px]
                  ${isOutOfStock ? "opacity-50" : ""}
                `}
              >
                {product.discount}% OFF
              </span>
            )}
          </div>

          {product.discount !== undefined && (
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

          {/* ============================================================
              ADD TO CART
          ============================================================ */}

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
                    bg-[#171414]
                    text-red-400
                    shadow-none
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
            {/* Shine only when available */}

            {!isOutOfStock && !added && !isInCart && (
              <span className="pointer-events-none absolute inset-y-0 -left-14 w-8 skew-x-[-20deg] bg-white/40 transition-all duration-700 group-hover/cart:left-[120%]" />
            )}

            {/* ======================================================
                OUT OF STOCK
            ====================================================== */}

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

/* ================================================================
   COMING SOON
================================================================ */

function ComingSoon({ title }: { title?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65 }}
      className="relative z-10 mx-auto mt-8 w-full max-w-[900px] sm:mt-12"
    >
      <div className="relative overflow-hidden rounded-[24px] border border-[#d4af37]/25 bg-gradient-to-b from-[#17140e] via-[#090908] to-[#020202] px-5 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.75)] sm:rounded-[30px] sm:px-12 sm:py-16 lg:px-20 lg:py-20">
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#f5d76e] to-transparent" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/[0.07] blur-[80px]" />

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[22px] border border-[#d4af37]/40 bg-gradient-to-br from-[#d4af37]/15 via-[#0a0907] to-black shadow-[0_0_45px_rgba(212,175,55,0.14)] sm:h-24 sm:w-24 sm:rounded-[26px]">
          <div className="absolute inset-2 rounded-[17px] border border-[#d4af37]/10" />

          <Clock3 className="relative h-9 w-9 text-[#d4af37] sm:h-10 sm:w-10" />
        </div>

        <p className="relative mt-6 text-[8px] font-semibold uppercase tracking-[0.3em] text-[#d4af37] sm:text-xs">
          Al Misbah Perfumes
        </p>

        <h2 className="relative mt-2 font-display text-3xl font-medium tracking-wide text-white sm:text-5xl">
          Coming Soon
        </h2>

        <div className="relative mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent sm:w-28" />

        <p className="relative mx-auto mt-6 max-w-[600px] text-[11px] leading-6 text-white/50 sm:text-base sm:leading-8">
          Our exclusive <span className="font-medium text-[#d4af37]">{title ?? "collection"}</span>{" "}
          is currently being crafted to absolute perfection.
          <br className="hidden sm:block" />
          Prepare to experience a new dimension of luxury oriental fragrance.
        </p>

        <div className="relative mx-auto mt-8 inline-flex max-w-full items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37]/[0.05] px-4 py-2.5 sm:px-5">
          <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.9)]" />

          <span className="truncate text-[7px] font-semibold uppercase tracking-[0.12em] text-white/70 sm:text-[10px] sm:tracking-[0.18em]">
            In Production — Arriving Soon
          </span>
        </div>
      </div>
    </motion.section>
  );
}

/* ================================================================
   EMPTY STATE
================================================================ */

function EmptyState({ searchQuery, onClear }: { searchQuery: string; onClear: () => void }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="relative z-10 mx-auto mt-10 w-full max-w-[760px] sm:mt-14"
    >
      <div className="relative overflow-hidden rounded-[24px] border border-[#d4af37]/20 bg-gradient-to-b from-[#15130e] via-[#090908] to-[#030303] px-5 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.65)] sm:rounded-[30px] sm:px-12 sm:py-16">
        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4af37]/[0.06] blur-[75px]" />

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/30 bg-gradient-to-br from-[#d4af37]/10 via-black to-black shadow-[0_0_40px_rgba(212,175,55,0.1)] sm:h-24 sm:w-24">
          <div className="absolute inset-2 rounded-full border border-[#d4af37]/10" />

          <Search className="relative h-7 w-7 text-[#d4af37] sm:h-9 sm:w-9" strokeWidth={1.5} />
        </div>

        <p className="relative mt-6 text-[8px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]/80 sm:text-xs">
          Al Misbah Perfumes
        </p>

        <h2 className="relative mt-2 font-display text-3xl font-medium tracking-wide text-white sm:text-5xl">
          No Fragrance Found
        </h2>

        <div className="relative mx-auto mt-5 h-px w-20 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent sm:w-28" />

        <p className="relative mx-auto mt-5 max-w-[520px] text-[11px] leading-6 text-white/50 sm:text-base sm:leading-8">
          {searchQuery.trim() ? (
            <>
              We couldn't find a fragrance matching{" "}
              <span className="font-medium text-[#d4af37]">"{searchQuery.trim()}"</span>.
            </>
          ) : (
            "There are no fragrances available in this collection yet."
          )}
        </p>

        {searchQuery.trim() && (
          <button
            type="button"
            onClick={onClear}
            className="mt-7 inline-flex items-center justify-center rounded-full border border-[#d4af37]/50 bg-[#d4af37]/[0.05] px-6 py-3 text-[8px] font-semibold uppercase tracking-[0.14em] text-[#d4af37] transition hover:border-[#d4af37] hover:bg-[#d4af37]/10 sm:px-8 sm:py-3.5 sm:text-[10px]"
          >
            Clear Search
          </button>
        )}

        <div className="relative mx-auto mt-8 flex items-center justify-center gap-3 opacity-40">
          <span className="h-px w-8 bg-[#d4af37]/40 sm:w-10" />
          <span className="h-1 w-1 rotate-45 bg-[#d4af37]" />
          <span className="h-px w-8 bg-[#d4af37]/40 sm:w-10" />
        </div>
      </div>
    </motion.section>
  );
}

/* ================================================================
   PAGINATION
================================================================ */

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}) {
  if (totalPages <= 1) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10 mx-auto mt-9 flex w-fit max-w-[calc(100%-24px)] items-center gap-1.5 rounded-full border border-[#d4af37]/20 bg-[#080807]/90 p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.5)] backdrop-blur-md sm:mt-12 sm:gap-2 sm:p-2"
    >
      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:bg-[#d4af37]/10 hover:text-[#f5d76e] disabled:cursor-not-allowed disabled:opacity-20 sm:h-10 sm:w-auto sm:px-3"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />

        <span className="hidden text-[10px] font-semibold uppercase tracking-wider sm:ml-1 sm:inline">
          Prev
        </span>
      </button>

      <div className="flex h-9 min-w-[58px] items-center justify-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/[0.05] px-3 text-[10px] tracking-wider text-white/40 sm:h-10 sm:min-w-[70px] sm:text-xs">
        <strong className="text-[#d4af37]">{currentPage}</strong>

        <span className="mx-1 opacity-30">/</span>

        <strong className="text-white/75">{totalPages}</strong>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="flex h-9 w-9 items-center justify-center rounded-full text-white/60 transition hover:bg-[#d4af37]/10 hover:text-[#f5d76e] disabled:cursor-not-allowed disabled:opacity-20 sm:h-10 sm:w-auto sm:px-3"
      >
        <span className="hidden text-[10px] font-semibold uppercase tracking-wider sm:mr-1 sm:inline">
          Next
        </span>

        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </motion.div>
  );
}

/* ================================================================
   MAIN SERIES PAGE
================================================================ */

function SeriesPage() {
  const { seriesName } = Route.useParams();

  const info = seriesMap[seriesName];

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [cartNotification, setCartNotification] = useState<CartNotification | null>(null);

  const itemsPerPage = 8;

  /* ================================================================
     FILTER
  ================================================================= */

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      if (product.series !== seriesName) {
        return false;
      }

      if (!query) {
        return true;
      }

      const productName = product.name?.toLowerCase() ?? "";

      const productNotes = product.notes?.toLowerCase() ?? "";

      return productName.includes(query) || productNotes.includes(query);
    });
  }, [seriesName, searchQuery]);

  /* ================================================================
     PAGINATION
  ================================================================= */

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  /* ================================================================
     SEARCH
  ================================================================= */

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  /* ================================================================
     CART
  ================================================================= */

  const handleAddedToCart = (notification: CartNotification) => {
    setCartNotification(notification);
  };

  useEffect(() => {
    if (!cartNotification) return;

    const timeout = window.setTimeout(() => {
      setCartNotification(null);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [cartNotification]);

  /* ================================================================
     PAGE
  ================================================================= */

  const navigate = useNavigate();

  return (
    <>
      <AddToCartNotification
        notification={cartNotification}
        onClose={() => setCartNotification(null)}
      />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="
          relative min-h-screen w-full overflow-x-hidden
          bg-black
          px-3 py-5
          sm:px-5 sm:py-8
          md:px-7 md:py-10
          lg:px-10 lg:py-12
          xl:px-12 xl:py-14
          2xl:px-14 2xl:py-16
        "
      >
        {/* ==========================================================
            BACKGROUND
        ========================================================== */}

        <div className="pointer-events-none absolute left-1/2 top-0 z-0 h-[300px] w-[95%] -translate-x-1/2 rounded-full bg-[#d4af37]/[0.035] blur-[90px] sm:h-[450px] sm:w-[80%] sm:blur-[110px]" />

        <div className="pointer-events-none absolute bottom-[10%] left-[-15%] h-[300px] w-[300px] rounded-full bg-[#d4af37]/[0.018] blur-[100px]" />

        <div className="pointer-events-none absolute right-[-15%] top-[35%] h-[300px] w-[300px] rounded-full bg-[#d4af37]/[0.018] blur-[100px]" />

        <div className="relative z-10 mx-auto w-full max-w-[1500px]">
          {/* ========================================================
              HEADER
          ======================================================== */}

          <div className="relative mb-8 sm:mb-10 lg:mb-12">
            {/* Back */}

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="z-50 flex justify-start pointer-events-auto lg:absolute lg:left-0 lg:top-0"
            >
              <button
                type="button"
                onClick={() => {
                  navigate({ to: "/" });

                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                }}
                className="
                  group inline-flex items-center gap-2
                  rounded-full border border-white/10
                  bg-white/[0.035]
                  px-3.5 py-2.5
                  text-[7px] font-semibold uppercase
                  tracking-[0.2em] text-zinc-300
                  backdrop-blur-md
                  transition-all duration-300
                  hover:border-[#d4af37]/40
                  hover:bg-[#d4af37]/5
                  hover:text-[#f3e5ab]
                  active:scale-[0.97]
                  sm:px-5 sm:text-[9px]
                  pointer-events-auto
                "
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />

                <span>Back to Home</span>
              </button>
            </motion.div>

            {/* Header */}

            <motion.header
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="mt-7 w-full text-center lg:mt-0 lg:pt-1"
            >
              {/* Arabic */}

              <p className="font-display text-2xl leading-none text-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.2)] sm:text-3xl lg:text-[44px]">
                {info?.arabic ?? "المصباح"}
              </p>

              {/* Collection label */}

              <div className="mx-auto mt-3 flex items-center justify-center gap-2 sm:mt-4">
                <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#d4af37]/60 sm:w-14" />

                <span className="text-[6px] font-semibold uppercase tracking-[0.25em] text-[#d4af37]/70 sm:text-[8px] sm:tracking-[0.38em]">
                  Al Misbah Collection
                </span>

                <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#d4af37]/60 sm:w-14" />
              </div>

              {/* Title */}

              <h1 className="mx-auto mt-3 max-w-[1000px] break-words px-2 font-display text-[34px] font-medium leading-[1.05] tracking-[-0.025em] text-[#f8f1df] sm:mt-4 sm:text-5xl md:text-6xl lg:text-[68px]">
                {info?.title ?? "Collection Not Found"}
              </h1>

              {/* Divider */}

              <div className="mx-auto mt-5 flex items-center justify-center gap-2 sm:mt-6">
                <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#d4af37]/70 sm:w-20 lg:w-28" />

                <Sparkles className="h-3.5 w-3.5 text-[#d4af37] sm:h-4 sm:w-4" />

                <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#d4af37]/70 sm:w-20 lg:w-28" />
              </div>

              {/* Description */}

              <p className="mx-auto mt-4 max-w-[700px] px-4 text-[11px] leading-6 text-white/45 sm:mt-5 sm:text-sm sm:leading-7 lg:text-base">
                {info?.blurb ??
                  "This collection is not part of our current catalogue. Explore our other series from the menu above."}
              </p>
            </motion.header>
          </div>

          {/* ========================================================
              COMING SOON
          ======================================================== */}

          {info?.comingSoon === true ? (
            <ComingSoon title={info.title} />
          ) : (
            <>
              {/* ======================================================
                  SEARCH
              ====================================================== */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.18,
                }}
                className="relative z-10 mx-auto mt-8 w-full max-w-[720px] sm:mt-10 lg:mt-12"
              >
                <div className="group relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-[#d4af37]/60 transition-colors group-focus-within:text-[#d4af37] sm:left-5 sm:h-5 sm:w-5" />

                  <input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search your signature fragrance..."
                    aria-label="Search fragrances"
                    autoComplete="off"
                    className="
                      h-12 w-full rounded-full
                      border border-[#d4af37]/20
                      bg-gradient-to-r from-[#0b0a08] via-[#11100d] to-[#0b0a08]
                      pl-11 pr-5
                      text-xs font-medium tracking-wide
                      text-white
                      placeholder:text-white/25
                      shadow-[0_15px_45px_rgba(0,0,0,0.45)]
                      outline-none backdrop-blur-md
                      transition-all duration-300
                      hover:border-[#d4af37]/40
                      focus:border-[#d4af37]/70
                      focus:shadow-[0_0_40px_rgba(212,175,55,0.1)]
                      sm:h-[54px]
                      sm:pl-13 sm:pr-6 sm:text-sm
                      md:text-base
                    "
                  />

                  <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent shadow-[0_0_12px_rgba(212,175,55,0.7)] transition-transform duration-500 group-focus-within:scale-x-100" />
                </div>
              </motion.div>

              {/* ======================================================
                  RESULT COUNT
              ====================================================== */}

              {filteredItems.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative z-10 mx-auto mt-5 flex items-center justify-center gap-2"
                >
                  <span className="h-px w-5 bg-[#d4af37]/25 sm:w-10" />

                  <span className="text-[6px] font-medium uppercase tracking-[0.16em] text-white/35 sm:text-[8px] sm:tracking-[0.2em]">
                    {filteredItems.length} Fragrance
                    {filteredItems.length !== 1 ? "s" : ""} Available
                  </span>

                  <span className="h-px w-5 bg-[#d4af37]/25 sm:w-10" />
                </motion.div>
              )}

              {/* ======================================================
                  PRODUCTS
              ====================================================== */}

              {paginatedItems.length > 0 ? (
                <>
                  <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.055,
                        },
                      },
                    }}
                    className="
                      relative z-10 mt-6 grid w-full
                      grid-cols-2 gap-3
                      sm:mt-8 sm:grid-cols-2 sm:gap-5
                      md:grid-cols-3 md:gap-6
                      lg:mt-10 lg:grid-cols-3 lg:gap-7
                      xl:grid-cols-4 xl:gap-7
                      2xl:gap-8
                    "
                  >
                    {paginatedItems.map((product, index) => (
                      <SeriesProductCard
                        key={product.id ?? product.name}
                        product={product as SeriesProduct}
                        index={index}
                        onAdded={handleAddedToCart}
                      />
                    ))}
                  </motion.div>

                  {/* Pagination */}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevious={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                    onNext={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                  />
                </>
              ) : (
                <EmptyState
                  searchQuery={searchQuery}
                  onClear={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                />
              )}
            </>
          )}
        </div>
      </motion.main>
    </>
  );
}
