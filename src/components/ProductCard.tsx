import { useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Check,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/context/cartContext";
import { AnimatePresence, motion } from "framer-motion";

interface Product {
  id?: string | number;
  name: string;
  price: string;
  notes?: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cart } = useCart();

  const [added, setAdded] = useState(false);
  const [showCartMessage, setShowCartMessage] = useState(false);

  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const popupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productId = product.id ?? product.name;

  const isInCart = cart.some(
    (item) => item.product.id === productId,
  );

  // ============================================================
  // CLEANUP TIMERS
  // ============================================================

  useEffect(() => {
    return () => {
      if (addedTimer.current) {
        clearTimeout(addedTimer.current);
      }

      if (popupTimer.current) {
        clearTimeout(popupTimer.current);
      }
    };
  }, []);

  // ============================================================
  // ADD TO CART
  // ============================================================

  const handleAddToCart = () => {
    addToCart({
      id: productId,
      name: product.name ?? "",
      price: product.price ?? "",
      notes: product.notes ?? "",
      image: product.image ?? "",
    });

    // Button animation
    setAdded(true);

    // Show popup
    setShowCartMessage(true);

    // Clear previous timers
    if (addedTimer.current) {
      clearTimeout(addedTimer.current);
    }

    if (popupTimer.current) {
      clearTimeout(popupTimer.current);
    }

    // Reset button
    addedTimer.current = setTimeout(() => {
      setAdded(false);
    }, 1600);

    // Close popup
    popupTimer.current = setTimeout(() => {
      setShowCartMessage(false);
    }, 5000);
  };

  // ============================================================
  // CLOSE POPUP
  // ============================================================

  const closeCartMessage = () => {
    setShowCartMessage(false);

    if (popupTimer.current) {
      clearTimeout(popupTimer.current);
    }
  };

  // ============================================================
  // CURRENT QUANTITY
  // ============================================================

  const currentCartItem = cart.find(
    (item) => item.product.id === productId,
  );

  const currentQuantity = currentCartItem?.quantity ?? 1;

  return (
    <>
      {/* ========================================================
          LUXURY ADD TO CART POPUP
      ======================================================== */}

      <AnimatePresence>
        {showCartMessage && (
          <>
            {/* MOBILE BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="
                fixed
                inset-0
                z-[99998]
                bg-black/20
                backdrop-blur-[2px]
                sm:hidden
              "
              onClick={closeCartMessage}
            />

            {/* POPUP */}

            <motion.div
              initial={{
                opacity: 0,
                y: 100,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 80,
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 25,
                mass: 0.8,
              }}
              className="
                fixed
                inset-x-3
                bottom-3
                z-[99999]
                sm:left-auto
                sm:right-5
                sm:inset-x-auto
                sm:bottom-5
                sm:w-[410px]
                md:right-7
                md:bottom-7
              "
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[22px]
                  border
                  border-[#d4af37]/40
                  bg-[#080808]
                  shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_45px_rgba(212,175,55,0.12)]
                "
              >
                {/* =================================================
                    GOLD BORDER GLOW
                ================================================= */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    rounded-[22px]
                    ring-1
                    ring-inset
                    ring-[#d4af37]/10
                  "
                />

                {/* =================================================
                    TOP GOLD LINE
                ================================================= */}

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

                {/* =================================================
                    GOLD LIGHT
                ================================================= */}

                <motion.div
                  animate={{
                    opacity: [0.25, 0.5, 0.25],
                    scale: [1, 1.12, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    -right-16
                    -top-16
                    h-40
                    w-40
                    rounded-full
                    bg-[#d4af37]/10
                    blur-[55px]
                  "
                />

                {/* =================================================
                    CLOSE BUTTON
                ================================================= */}

                <button
                  type="button"
                  onClick={closeCartMessage}
                  aria-label="Close"
                  className="
                    absolute
                    right-3
                    top-3
                    z-20
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-zinc-500
                    transition-all
                    duration-200
                    hover:border-[#d4af37]/50
                    hover:bg-[#d4af37]/10
                    hover:text-[#d4af37]
                    active:scale-90
                  "
                >
                  <X className="h-3.5 w-3.5" />
                </button>

                {/* =================================================
                    HEADER
                ================================================= */}

                <div
                  className="
                    relative
                    flex
                    items-center
                    gap-3.5
                    px-4
                    pb-3
                    pt-5
                    sm:gap-4
                    sm:px-5
                    sm:pb-4
                    sm:pt-5
                  "
                >
                  {/* PRODUCT IMAGE */}

                  <div
                    className="
                      relative
                      h-[68px]
                      w-[68px]
                      shrink-0
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#d4af37]/45
                      bg-[#121212]
                      shadow-[0_0_25px_rgba(212,175,55,0.12)]
                      sm:h-[74px]
                      sm:w-[74px]
                    "
                  >
                    {product.image ? (
                      <motion.img
                        initial={{ scale: 1.08 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.7 }}
                        src={product.image}
                        alt={product.name}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                        "
                      >
                        <ShoppingBag className="h-6 w-6 text-[#d4af37]" />
                      </div>
                    )}

                    {/* CHECK BADGE */}

                    <motion.div
                      initial={{
                        scale: 0,
                        rotate: -45,
                      }}
                      animate={{
                        scale: 1,
                        rotate: 0,
                      }}
                      transition={{
                        delay: 0.15,
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                      className="
                        absolute
                        -bottom-1
                        -right-1
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-full
                        border-2
                        border-[#080808]
                        bg-[#d4af37]
                        shadow-[0_0_15px_rgba(212,175,55,0.35)]
                      "
                    >
                      <Check
                        className="h-3.5 w-3.5 text-black"
                        strokeWidth={3}
                      />
                    </motion.div>
                  </div>

                  {/* TEXT */}

                  <div className="min-w-0 flex-1 pr-7">
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.2em]
                        text-[#d4af37]
                        sm:text-[10px]
                      "
                    >
                      <Sparkles className="h-3 w-3" />

                      Added to Cart
                    </div>

                    <h4
                      className="
                        mt-1.5
                        truncate
                        font-display
                        text-[16px]
                        font-medium
                        leading-tight
                        text-white
                        sm:text-lg
                      "
                    >
                      {product.name}
                    </h4>

                    <div className="mt-1.5 flex items-center gap-2">
                      <span
                        className="
                          text-[11px]
                          font-medium
                          text-[#d4af37]
                        "
                      >
                        {product.price}
                      </span>

                      <span className="text-zinc-700">•</span>

                      <span
                        className="
                          text-[10px]
                          uppercase
                          tracking-wide
                          text-zinc-500
                        "
                      >
                        Qty {currentQuantity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* =================================================
                    DIVIDER
                ================================================= */}

                <div
                  className="
                    mx-4
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/10
                    to-transparent
                    sm:mx-5
                  "
                />

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div
                  className="
                    px-4
                    pb-4
                    pt-3.5
                    sm:px-5
                    sm:pb-5
                    sm:pt-4
                  "
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="
                        flex
                        h-6
                        w-6
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-[#d4af37]/10
                      "
                    >
                      <Check
                        className="h-3.5 w-3.5 text-[#d4af37]"
                        strokeWidth={2.5}
                      />
                    </div>

                    <p
                      className="
                        text-[10px]
                        leading-relaxed
                        text-zinc-400
                        sm:text-[11px]
                      "
                    >
                      Your fragrance has been added to your collection.
                    </p>
                  </div>

                  {/* =================================================
                      BUTTONS
                  ================================================= */}

                  <div
                    className="
                      mt-3.5
                      grid
                      grid-cols-2
                      gap-2.5
                    "
                  >
                    {/* CONTINUE */}

                    <button
                      type="button"
                      onClick={closeCartMessage}
                      className="
                        flex
                        min-h-[42px]
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-3
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.13em]
                        text-zinc-300
                        transition-all
                        duration-300
                        hover:border-white/20
                        hover:bg-white/[0.06]
                        hover:text-white
                        active:scale-[0.97]
                        sm:text-[10px]
                      "
                    >
                      Continue Shopping
                    </button>

                    {/* CART */}

                    <Link
                      to="/cart"
                      onClick={closeCartMessage}
                      className="
                        flex
                        min-h-[42px]
                        items-center
                        justify-center
                        gap-2
                        rounded-xl
                        border
                        border-[#d4af37]
                        bg-gradient-to-r
                        from-[#d4af37]
                        to-[#f0d36a]
                        px-3
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.13em]
                        text-black
                        shadow-[0_0_22px_rgba(212,175,55,0.18)]
                        transition-all
                        duration-300
                        hover:shadow-[0_0_30px_rgba(212,175,55,0.32)]
                        active:scale-[0.97]
                        sm:text-[10px]
                      "
                    >
                      View Cart

                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* =================================================
                    AUTO CLOSE PROGRESS
                ================================================= */}

                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{
                    duration: 5,
                    ease: "linear",
                  }}
                  className="
                    absolute
                    bottom-0
                    left-0
                    h-[2px]
                    bg-gradient-to-r
                    from-[#d4af37]
                    via-[#f5dc7b]
                    to-[#d4af37]
                  "
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* =========================================================
          PRODUCT CARD
      ========================================================= */}

      <article
        className="
          group
          flex
          h-full
          min-h-0
          w-full
          min-w-0
          flex-col
          overflow-hidden
          rounded-md
          border
          border-[#d4af37]/25
          bg-background
          p-2.5
          shadow-[0_6px_20px_rgba(0,0,0,0.12)]
          transition-all
          duration-300
          ease-out
          hover:-translate-y-1
          hover:border-[#d4af37]/70
          hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)]
          sm:p-3
          md:p-3.5
          lg:p-4
          xl:p-[18px]
        "
      >
        {/* PRODUCT IMAGE */}

        <div
          className="
            relative
            aspect-square
            w-full
            shrink-0
            overflow-hidden
            rounded-sm
            bg-muted
          "
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className="
                block
                h-full
                w-full
                object-cover
                scale-[1.04]
                transition-transform
                duration-500
                ease-out
                group-hover:scale-[1.09]
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-[#111]
                px-3
                text-center
                text-[9px]
                uppercase
                tracking-[0.14em]
                text-muted-foreground
              "
            >
              No Image
            </div>
          )}

          {/* OVERLAY */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/0
              transition-colors
              duration-300
              group-hover:bg-black/10
            "
          />

          {/* INNER BORDER */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-sm
              border
              border-white/5
            "
          />

          {/* IN CART */}

          {isInCart && (
            <div
              className="
                absolute
                right-2
                top-2
                flex
                items-center
                gap-1
                rounded-full
                border
                border-[#d4af37]/50
                bg-black/75
                px-2.5
                py-1
                text-[9px]
                font-semibold
                uppercase
                tracking-wide
                text-[#d4af37]
                backdrop-blur-sm
                sm:right-3
                sm:top-3
              "
            >
              <Check className="h-3 w-3" />

              In Cart
            </div>
          )}
        </div>

        {/* PRODUCT DETAILS */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col
            pt-2.5
            sm:pt-3
            md:pt-3
            lg:pt-3
          "
        >
          <h3
            className="
              line-clamp-2
              min-h-[30px]
              break-words
              font-display
              text-[14px]
              font-medium
              leading-[1.2]
              text-foreground
              transition-colors
              duration-300
              group-hover:text-[#d4af37]
              sm:min-h-[34px]
              sm:text-[15px]
              md:min-h-[36px]
              md:text-base
              lg:min-h-[38px]
              lg:text-[16px]
              xl:text-lg
            "
          >
            {product.name}
          </h3>

          <div
            className="
              mt-1
              min-h-[24px]
              sm:min-h-[26px]
              md:min-h-[28px]
              lg:min-h-[30px]
            "
          >
            {product.notes ? (
              <p
                className="
                  line-clamp-2
                  break-words
                  text-[8px]
                  leading-[1.35]
                  uppercase
                  tracking-[0.05em]
                  text-muted-foreground
                  sm:text-[9px]
                  md:text-[9px]
                  lg:text-[10px]
                  lg:tracking-[0.08em]
                "
              >
                {product.notes}
              </p>
            ) : null}
          </div>
        </div>

        {/* PRICE + ADD TO CART */}

        <div
          className="
            mt-2.5
            w-full
            border-t
            border-border
            pt-2.5
            sm:mt-3
            sm:pt-3
            md:mt-3
            md:pt-3
            lg:mt-3
            lg:pt-3
          "
        >
          <div
            className="
              flex
              min-h-[22px]
              min-w-0
              items-center
            "
          >
            <span
              className="
                block
                max-w-full
                truncate
                text-sm
                font-normal
                leading-normal
                text-gold
                sm:text-base
                md:text-base
                lg:text-base
                xl:text-base
              "
              title={product.price ?? ""}
            >
              {product.price ?? ""}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`
              mt-2
              flex
              min-h-[36px]
              w-full
              items-center
              justify-center
              gap-2
              rounded-sm
              border
              px-2
              py-1.5
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.05em]
              transition-all
              duration-300
              active:scale-[0.98]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-gold
              focus-visible:ring-offset-2
              sm:min-h-[38px]
              sm:text-[9px]
              md:min-h-[39px]
              md:text-[10px]
              lg:min-h-[40px]
              lg:text-[11px]
              xl:min-h-[41px]
              xl:text-xs

              ${
                added
                  ? `
                    border-green-500
                    bg-green-500/10
                    text-green-400
                  `
                  : `
                    border-gold
                    bg-transparent
                    text-gold
                    hover:bg-gilded
                    hover:text-primary-foreground
                    hover:shadow-[0_0_18px_rgba(212,175,55,0.25)]
                  `
              }
            `}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </article>
    </>
  );
}
