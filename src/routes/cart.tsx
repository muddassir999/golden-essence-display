import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Trash2,
  ShoppingBag,
  Minus,
  Plus,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Gem,
} from "lucide-react";
import { useCart } from "@/context/cartContext";
import { motion } from "framer-motion";

export const Route = createFileRoute("/cart")({
  head: () => {
    const title = "Shopping Cart — Al Misbah Perfumes";
    const description =
      "Review your selected fragrances and complete your order via WhatsApp with Al Misbah Perfumes.";

    return {
      meta: [
        { title },
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

  component: CartRoute,
});

const ease = [0.22, 1, 0.36, 1] as const;

function CartRoute() {
  const {
    cart,
    cartCount,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const whatsappNumber = "919372379191";

  // =========================================================
  // WHATSAPP ORDER
  // =========================================================

  const handleWhatsAppOrder = () => {
    if (cart.length === 0) return;

    let message = "Al Misbah Perfumes - Order Inquiry\n\n";

    cart.forEach((item, index) => {
      const price = Number(item.product.price.replace(/[^\d.]/g, "")) || 0;

      const subtotal = price * item.quantity;

      message += `${index + 1}. *${item.product.name}*\n`;
      message += `Quantity: ${item.quantity}\n`;
      message += `Price: ${item.product.price}\n`;
      message += `Subtotal: ₹${subtotal}\n`;

      if (item.product.notes) {
        message += `Notes: ${item.product.notes}\n`;
      }

      message += `\n`;
    });

    message += `--------------------------\n`;
    message += `Total Items: ${cartCount}\n`;
    message += `Product Total: ₹${cartTotal}\n`;
    message += `Courier Charge: Extra\n`;
    message += `Grand Total: ₹${cartTotal} + Courier Charge\n\n`;
    message += "Please confirm the availability, courier charge and final order total.";

    const encodedMessage = encodeURIComponent(message);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.location.href = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
    } else {
      window.open(
        `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
        relative
        min-h-screen
        overflow-x-hidden
        bg-[#050505]
        pb-28
        text-white
        selection:bg-[#d4af37]
        selection:text-black

        sm:pb-24
        lg:pb-20
      "
    >
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="
            absolute
            -left-32
            top-0
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#d4af37]/[0.045]
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            right-[-180px]
            top-[28%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#d4af37]/[0.025]
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            bottom-[-150px]
            left-1/2
            h-[400px]
            w-[700px]
            -translate-x-1/2
            rounded-full
            bg-[#d4af37]/[0.018]
            blur-[130px]
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)]
            [background-size:70px_70px]
          "
        />
      </div>

      {/* =====================================================
          PAGE WRAPPER
      ===================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1500px]
          px-4
          pt-4

          sm:px-6
          sm:pt-7

          md:px-8

          lg:px-12
          lg:pt-10
        "
      >
        {/* ===================================================
            BACK BUTTON
        =================================================== */}

        <motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.6,
    delay: 0.1,
    ease,
  }}
  className="pt-2 sm:pt-3 lg:pt-4"
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

    <span>Back to Home</span>
  </Link>
</motion.div>

        {/* ===================================================
            HEADER
        =================================================== */}

        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease,
          }}
          className="
            mx-auto
            max-w-[1000px]
            translate-y-2
            pb-10
            pt-10
            text-center

            sm:translate-y-1
            sm:pb-14
            sm:pt-12

            lg:-translate-y-14
            lg:pb-16
            lg:pt-14

            xl:-translate-y-18
          "
        >
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4af37]/60 sm:w-14" />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#d4af37]

                sm:text-[10px]
              "
            >
              Your Selected Fragrances
            </span>

            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4af37]/60 sm:w-14" />
          </div>

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease,
            }}
            className="
              font-display
              text-2xl
              leading-none
              text-[#d4af37]

              sm:text-4xl
              lg:text-[44px]
            "
          >
            سلة التسوق
          </motion.p>

          <h1
            className="
              mt-3
              font-display
              text-[38px]
              font-bold
              leading-[0.95]
              tracking-[-0.035em]
              text-white

              sm:mt-4
              sm:text-6xl

              md:text-7xl

              lg:text-[86px]
            "
          >
            Shopping{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#a98524]
                via-[#fff1ad]
                to-[#d4af37]
                bg-clip-text
                text-transparent
              "
            >
              Cart
            </span>
          </h1>

          <div className="mx-auto mt-6 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]/60 sm:w-20" />

            <span className="h-1.5 w-1.5 rotate-45 bg-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.7)]" />

            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]/60 sm:w-20" />
          </div>

          <p
            className="
              mx-auto
              mt-5
              max-w-[650px]
              px-4
              text-[11px]
              leading-5
              text-zinc-400

              sm:mt-6
              sm:px-0
              sm:text-sm
              sm:leading-7
            "
          >
            Review your selected fragrances and complete your order directly through WhatsApp.
          </p>
        </motion.header>

        {/* ===================================================
            EMPTY CART
        =================================================== */}

        {cart.length === 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease,
            }}
            className="
              relative
              mx-auto
              max-w-[850px]
              overflow-hidden
              rounded-[28px]
              border
              border-[#d4af37]/25
              bg-gradient-to-b
              from-[#161616]
              via-[#0d0d0d]
              to-[#080808]
              px-5
              py-16
              text-center
              shadow-[0_30px_100px_rgba(0,0,0,0.7)]

              sm:rounded-[36px]
              sm:px-10
              sm:py-24
            "
          >
            <div
              className="
                absolute
                left-1/2
                top-0
                h-px
                w-1/2
                -translate-x-1/2
                bg-gradient-to-r
                from-transparent
                via-[#d4af37]/70
                to-transparent
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-48
                w-80
                -translate-x-1/2
                rounded-full
                bg-[#d4af37]/[0.07]
                blur-[80px]
              "
            />

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                relative
                mx-auto
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-full
                border
                border-[#d4af37]/30
                bg-[#d4af37]/[0.055]
                shadow-[0_0_60px_rgba(212,175,55,0.08)]
              "
            >
              <div className="absolute inset-2 rounded-full border border-[#d4af37]/10" />

              <ShoppingBag className="h-9 w-9 text-[#d4af37] sm:h-11 sm:w-11" />
            </motion.div>

            <p
              className="
                mt-7
                font-display
                text-2xl
                font-bold
                text-white

                sm:text-4xl
              "
            >
              Your Cart is Empty
            </p>

            <p
              className="
                mx-auto
                mt-3
                max-w-[520px]
                text-xs
                leading-6
                text-zinc-400

                sm:text-sm
                sm:leading-7
              "
            >
              Your next signature fragrance is waiting. Explore our collection of refined oriental
              perfumes and timeless attars.
            </p>

            <Link
              to="/"
              className="
                group
                mt-8
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#d4af37]
                bg-[#d4af37]
                px-6
                py-3.5
                text-[9px]
                font-extrabold
                uppercase
                tracking-[0.2em]
                text-black
                shadow-[0_10px_35px_rgba(212,175,55,0.18)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:bg-[#f2dc79]
                hover:shadow-[0_15px_45px_rgba(212,175,55,0.3)]

                active:scale-95

                sm:px-8
                sm:py-4
                sm:text-[10px]
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
              Explore Fragrances
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.section>
        ) : (
          <>
            <div
              className="
                grid
                grid-cols-1
                items-start
                gap-7

                lg:grid-cols-[minmax(0,1fr)_390px]
                lg:gap-10

                xl:grid-cols-[minmax(0,1fr)_420px]
              "
            >
              {/* =================================================
                  CART ITEMS
              ================================================= */}

              <section>
                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                    border-b
                    border-white/[0.08]
                    pb-4

                    sm:mb-5
                    sm:pb-5
                  "
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d4af37]/25
                        bg-[#d4af37]/[0.06]
                      "
                    >
                      <ShoppingBag className="h-3.5 w-3.5 text-[#d4af37]" />
                    </span>

                    <div>
                      <p
                        className="
                          text-[10px]
                          font-bold
                          uppercase
                          tracking-[0.16em]
                          text-zinc-300

                          sm:text-xs
                        "
                      >
                        {cartCount} {cartCount === 1 ? "Item" : "Items"} in Cart
                      </p>

                      <p className="mt-0.5 text-[9px] text-zinc-500 sm:text-[10px]">
                        Your fragrance selection
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="
                      inline-flex
                      items-center
                      gap-1.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.14em]
                      text-red-400
                      transition-colors
                      duration-300

                      hover:text-red-300

                      sm:text-[10px]
                    "
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear
                  </button>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {cart.map((item, index) => {
                    const price = Number(item.product.price.replace(/[^\d.]/g, "")) || 0;

                    const subtotal = price * item.quantity;

                    return (
                      <motion.article
                        key={item.product.id}
                        initial={{
                          opacity: 0,
                          y: 18,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.06,
                          ease,
                        }}
                        className="
                          group
                          relative
                          overflow-hidden
                          rounded-[22px]
                          border
                          border-white/[0.08]
                          bg-gradient-to-br
                          from-[#151515]
                          via-[#101010]
                          to-[#090909]
                          p-3
                          shadow-[0_12px_40px_rgba(0,0,0,0.45)]
                          transition-all
                          duration-500

                          hover:border-[#d4af37]/30
                          hover:shadow-[0_18px_50px_rgba(0,0,0,0.65)]

                          sm:rounded-[26px]
                          sm:p-4

                          lg:p-5
                        "
                      >
                        <div
                          className="
                            pointer-events-none
                            absolute
                            left-[10%]
                            right-[10%]
                            top-0
                            h-px
                            bg-gradient-to-r
                            from-transparent
                            via-[#d4af37]/40
                            to-transparent
                          "
                        />

                        <div
                          className="
                            pointer-events-none
                            absolute
                            -right-20
                            -top-20
                            h-40
                            w-40
                            rounded-full
                            bg-[#d4af37]/[0.035]
                            blur-[60px]
                            transition-opacity
                            duration-500
                            group-hover:opacity-100
                          "
                        />

                        <div className="relative flex items-center gap-3 sm:gap-5">
                          {item.product.image && (
                            <div className="relative shrink-0">
                              <div
                                className="
                                  absolute
                                  -inset-1
                                  rounded-[16px]
                                  bg-[#d4af37]/20
                                  opacity-30
                                  blur-md
                                  transition-all
                                  duration-500
                                  group-hover:opacity-60
                                "
                              />

                              <div
                                className="
                                  relative
                                  overflow-hidden
                                  rounded-[16px]
                                  border
                                  border-[#d4af37]/25
                                  bg-[#070707]
                                  p-1

                                  sm:rounded-[20px]
                                  sm:p-1.5
                                "
                              >
                                <img
                                  src={item.product.image}
                                  alt={item.product.name}
                                  className="
                                    h-[78px]
                                    w-[78px]
                                    rounded-[12px]
                                    object-cover
                                    transition-transform
                                    duration-700
                                    group-hover:scale-[1.04]

                                    sm:h-32
                                    sm:w-32
                                    sm:rounded-[15px]

                                    lg:h-[138px]
                                    lg:w-[138px]
                                  "
                                />
                              </div>
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p
                                  className="
                                    mb-1
                                    text-[7px]
                                    font-bold
                                    uppercase
                                    tracking-[0.2em]
                                    text-[#d4af37]/70

                                    sm:text-[8px]
                                  "
                                >
                                  Al Misbah
                                </p>

                                <h2
                                  className="
                                    truncate
                                    font-display
                                    text-[15px]
                                    font-bold
                                    leading-tight
                                    tracking-wide
                                    text-white

                                    sm:text-xl

                                    lg:text-[22px]
                                  "
                                >
                                  {item.product.name}
                                </h2>
                              </div>

                              <button
                                type="button"
                                onClick={() => removeFromCart(item.product.id)}
                                className="
                                  hidden
                                  h-9
                                  w-9
                                  shrink-0
                                  items-center
                                  justify-center
                                  rounded-full
                                  border
                                  border-red-500/15
                                  bg-red-950/20
                                  text-red-400
                                  transition-all
                                  duration-300

                                  hover:border-red-500/40
                                  hover:bg-red-500
                                  hover:text-white

                                  sm:flex
                                "
                                aria-label={`Remove ${item.product.name}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="mt-1.5 flex items-center gap-2">
                              <span
                                className="
                                  text-xs
                                  font-bold
                                  text-[#d4af37]

                                  sm:text-sm
                                "
                              >
                                {item.product.price}
                              </span>

                              <span className="h-1 w-1 rounded-full bg-zinc-700" />

                              <span
                                className="
                                  text-[9px]
                                  text-zinc-400

                                  sm:text-[10px]
                                "
                              >
                                Signature Fragrance
                              </span>
                            </div>

                            <div
                              className="
                                mt-4
                                flex
                                items-end
                                justify-between
                                gap-2

                                sm:mt-7
                              "
                            >
                              <div>
                                <p className="mb-1.5 text-[7px] font-bold uppercase tracking-[0.16em] text-zinc-400 sm:text-[8px]">
                                  Quantity
                                </p>

                                <div
                                  className="
                                    inline-flex
                                    items-center
                                    rounded-full
                                    border
                                    border-white/[0.09]
                                    bg-black/70
                                    p-1
                                    shadow-inner
                                  "
                                >
                                  <button
                                    type="button"
                                    onClick={() => decreaseQuantity(item.product.id)}
                                    className="
                                      flex
                                      h-6
                                      w-6
                                      items-center
                                      justify-center
                                      rounded-full
                                      text-zinc-400
                                      transition-all
                                      duration-200

                                      hover:bg-[#d4af37]
                                      hover:text-black

                                      active:scale-90

                                      sm:h-7
                                      sm:w-7
                                    "
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>

                                  <span
                                    className="
                                      min-w-[27px]
                                      text-center
                                      text-[10px]
                                      font-bold
                                      text-white

                                      sm:min-w-[32px]
                                      sm:text-xs
                                    "
                                  >
                                    {item.quantity}
                                  </span>

                                  <button
                                    type="button"
                                    onClick={() => increaseQuantity(item.product.id)}
                                    className="
                                      flex
                                      h-6
                                      w-6
                                      items-center
                                      justify-center
                                      rounded-full
                                      text-zinc-400
                                      transition-all
                                      duration-200

                                      hover:bg-[#d4af37]
                                      hover:text-black

                                      active:scale-90

                                      sm:h-7
                                      sm:w-7
                                    "
                                    aria-label="Increase quantity"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>

                              <div className="text-right">
                                <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-zinc-400 sm:text-[8px]">
                                  Subtotal
                                </p>

                               <p className="text-base font-bold text-white sm:text-xl">
  ₹{subtotal}
</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.product.id)}
                          className="
                            absolute
                            bottom-3
                            left-3
                            flex
                            h-7
                            w-7
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-red-500/15
                            bg-red-950/20
                            text-red-400
                            transition-all
                            duration-300

                            hover:border-red-500/40
                            hover:bg-red-500
                            hover:text-white

                            sm:hidden
                          "
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </motion.article>
                    );
                  })}
                </div>
              </section>

              {/* =================================================
                  DESKTOP SUMMARY
              ================================================= */}

              <motion.aside
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
                  delay: 0.25,
                  ease,
                }}
                className="
                  sticky
                  top-8
                  hidden
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-[#d4af37]/25
                  bg-gradient-to-b
                  from-[#171717]
                  via-[#0e0e0e]
                  to-[#080808]
                  p-6
                  shadow-[0_25px_80px_rgba(0,0,0,0.7)]

                  lg:block
                  lg:p-7

                  xl:p-8
                "
              >
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-20
                    -top-20
                    h-52
                    w-52
                    rounded-full
                    bg-[#d4af37]/[0.07]
                    blur-[80px]
                  "
                />

                <div className="relative">
                  <div className="flex items-center gap-3 border-b border-white/[0.07] pb-6">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#d4af37]/30
                        bg-[#d4af37]/[0.06]
                      "
                    >
                      <Gem className="h-4.5 w-4.5 text-[#d4af37]" />
                    </div>

                    <div>
                      <p
                        className="
                          text-[8px]
                          font-bold
                          uppercase
                          tracking-[0.22em]
                          text-[#d4af37]
                        "
                      >
                        Your Selection
                      </p>

                      <h2
                        className="
                          mt-1
                          font-display
                          text-xl
                          font-bold
                          text-white
                        "
                      >
                        Order Summary
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3 border-b border-white/[0.07] py-6">
                    {cart.map((item) => {
                      const price = Number(item.product.price.replace(/[^\d.]/g, "")) || 0;

                      return (
                        <div
                          key={item.product.id}
                          className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            text-xs
                          "
                        >
                          <div className="min-w-0">
                            <p className="truncate font-medium text-zinc-300">
                              {item.product.name}
                            </p>

                            <p className="mt-0.5 text-[9px] text-zinc-400">
                              Qty {item.quantity} × ₹{price}
                            </p>
                          </div>

                          <span className="shrink-0 font-semibold text-zinc-300">
                            ₹{price * item.quantity}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* =================================================
                      TOTAL DETAILS
                  ================================================= */}

                  <div className="space-y-4 border-b border-white/[0.07] py-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Total Items</span>

                      <span className="font-bold text-white">{cartCount}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">Total Amount</span>

                      <span className="font-bold text-zinc-200">₹{cartTotal}</span>
                    </div>

                    {/* COURIER CHARGE */}

                    <div
                      className="
                        flex
                        items-center
                        justify-between
                        gap-4
                        rounded-xl
                        border
                        border-[#d4af37]/15
                        bg-[#d4af37]/[0.035]
                        px-3
                        py-3
                      "
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.7)]" />

                        <span className="text-sm font-medium text-zinc-300">Courier Charge</span>
                      </div>

                      <span className="text-right text-[10px] font-bold uppercase tracking-[0.08em] text-[#d4af37]">
                        Extra
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-4 text-sm">
                      <span className="text-zinc-400">Shipping</span>

                      <span className="max-w-[170px] text-right text-[10px] font-semibold leading-5 text-zinc-400">
                        Courier charges will be confirmed on WhatsApp
                      </span>
                    </div>
                  </div>

                  {/* =================================================
                      GRAND TOTAL
                  ================================================= */}

                  <div
                    className="
                      my-6
                      rounded-[20px]
                      border
                      border-[#d4af37]/20
                      bg-[#d4af37]/[0.035]
                      p-5
                    "
                  >
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                   Total Amount
                    </p>

                    <div className="mt-1 flex items-end justify-between gap-3">
                      <div>
                        <span className="font-display text-lg font-bold text-white">
                          Your Order
                        </span>

                        <p className="mt-1 text-[9px] font-medium text-zinc-400">
                          + Courier Charge Extra
                        </p>
                      </div>

                      <span className="text-xl font-bold text-[#d4af37]">₹{cartTotal}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="
                      group
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2.5
                      rounded-2xl
                      bg-gradient-to-r
                      from-[#128c4a]
                      via-[#18a960]
                      to-[#128c4a]
                      px-6
                      py-4
                      text-[10px]
                      font-extrabold
                      uppercase
                      tracking-[0.18em]
                      text-white
                      shadow-[0_10px_30px_rgba(22,163,74,0.2)]
                      transition-all
                      duration-300

                      hover:-translate-y-0.5
                      hover:shadow-[0_15px_40px_rgba(22,163,74,0.35)]

                      active:scale-[0.98]
                    "
                  >
                    <MessageCircle className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    Order on WhatsApp
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="
                      mt-3
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      border-red-500/15
                      bg-black/40
                      px-6
                      py-3.5
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-red-400
                      transition-all
                      duration-300

                      hover:border-red-500/35
                      hover:bg-red-500/[0.07]
                    "
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Clear Cart
                  </button>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-center
                      gap-2
                      border-t
                      border-white/[0.06]
                      pt-5
                      text-[8px]
                      uppercase
                      tracking-[0.16em]
                      text-zinc-400
                    "
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-[#d4af37]" />
                    Direct & Secure WhatsApp Checkout
                  </div>
                </div>
              </motion.aside>
            </div>
          </>
        )}
      </div>

      {/* =====================================================
          PREMIUM MOBILE CHECKOUT BAR
      ===================================================== */}

      {cart.length > 0 && (
        <motion.div
          initial={{
            y: 140,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.6,
            ease,
          }}
          className="
            fixed
            bottom-0
            left-0
            right-0
            z-[90]
            border-t
            border-[#d4af37]/25
            bg-[#070707]/96
            px-3
            pb-[calc(0.65rem+env(safe-area-inset-bottom))]
            pt-2.5
            shadow-[0_-25px_70px_rgba(0,0,0,0.9)]
            backdrop-blur-2xl

            lg:hidden
          "
        >
          <div className="mx-auto max-w-2xl">
            {/* =================================================
                MOBILE TOP SUMMARY
            ================================================= */}

            <div className="mb-2.5 flex items-end justify-between gap-3 px-1">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <div
                    className="
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#d4af37]/25
                      bg-[#d4af37]/[0.07]
                    "
                  >
                    <ShoppingBag className="h-2.5 w-2.5 text-[#d4af37]" />
                  </div>

                  <p
                    className="
                      text-[7px]
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-zinc-400
                    "
                  >
                    {cartCount} {cartCount === 1 ? "Item" : "Items"} Selected
                  </p>
                </div>

                <div className="mt-1 flex items-center gap-2">
                  <p
                    className="
                      text-[11px]
                      font-medium
                      text-zinc-300
                    "
                  >
                    Product Total
                  </p>

                  <span className="h-1 w-1 rounded-full bg-[#d4af37]/50" />

                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.12em]
                      text-zinc-400
                    "
                  >
                    Secure Checkout
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right">
                <p
                  className="
                    text-[6px]
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-zinc-400
                  "
                >
               Total Amount
                </p>

              <span className="font-semibold text-[#d4af37]">
  ₹{cartTotal}
</span>
              </div>
            </div>

            {/* =================================================
                PREMIUM COURIER CARD
            ================================================= */}

            <div
              className="
                relative
                mb-2.5
                overflow-hidden
                rounded-2xl
                border
                border-[#d4af37]/20
                bg-gradient-to-r
                from-[#151209]
                via-[#0f0f0d]
                to-[#151209]
                px-3
                py-2.5
                shadow-[0_8px_30px_rgba(0,0,0,0.35)]
              "
            >
              {/* TOP GOLD LINE */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-6
                  right-6
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#d4af37]/70
                  to-transparent
                "
              />

              {/* GOLD GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-[#d4af37]/[0.08]
                  blur-[28px]
                "
              />

              <div className="relative flex items-center justify-between gap-3">
                {/* LEFT */}

                <div className="flex min-w-0 items-center gap-2.5">
                  {/* ICON */}

                  <div
                    className="
                      relative
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#d4af37]/25
                      bg-[#d4af37]/[0.07]
                      shadow-[inset_0_0_15px_rgba(212,175,55,0.04)]
                    "
                  >
                    <div
                      className="
                        absolute
                        inset-1
                        rounded-lg
                        border
                        border-[#d4af37]/10
                      "
                    />

                    <ShieldCheck className="h-4 w-4 text-[#d4af37]" />
                  </div>

                  {/* TEXT */}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p
                        className="
                          text-[8px]
                          font-extrabold
                          uppercase
                          tracking-[0.14em]
                          text-zinc-200
                        "
                      >
                        Courier Charge
                      </p>

                      <span
                        className="
                          rounded-full
                          border
                          border-[#d4af37]/20
                          bg-[#d4af37]/[0.06]
                          px-1.5
                          py-0.5
                          text-[5px]
                          font-bold
                          uppercase
                          tracking-[0.12em]
                          text-[#d4af37]
                        "
                      >
                        Extra
                      </span>
                    </div>

                    <p
                      className="
                        mt-0.5
                        text-[7px]
                        leading-4
                        text-zinc-400
                      "
                    >
                      Final delivery charge confirmed on WhatsApp
                    </p>
                  </div>
                </div>

                {/* RIGHT STATUS */}

                <div
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-[#d4af37]/15
                    bg-black/30
                    px-2
                    py-1.5
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#d4af37]
                      shadow-[0_0_8px_rgba(212,175,55,0.8)]
                    "
                  />

                  <span
                    className="
                      text-[6px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#d4af37]
                    "
                  >
                    Confirm Later
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
                CHECKOUT ACTIONS
            ================================================= */}

            <div className="flex gap-2">
              {/* WHATSAPP BUTTON */}

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="
                  group
                  flex
                  min-h-[46px]
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#128c4a]
                  via-[#18a960]
                  to-[#128c4a]
                  px-3
                  py-3.5
                  text-[9px]
                  font-extrabold
                  uppercase
                  tracking-[0.13em]
                  text-white
                  shadow-[0_6px_25px_rgba(22,163,74,0.22)]
                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_30px_rgba(22,163,74,0.32)]

                  active:scale-[0.97]
                "
              >
                <MessageCircle
                  className="
                    h-4
                    w-4
                    shrink-0
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <span className="truncate">Order on WhatsApp</span>

                <ArrowRight
                  className="
                    hidden
                    h-3
                    w-3
                    shrink-0
                    sm:block
                  "
                />
              </button>

              {/* CLEAR CART */}

              <button
                type="button"
                onClick={clearCart}
                className="
                  flex
                  h-[46px]
                  w-[46px]
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-950/20
                  text-red-400
                  transition-all
                  duration-200

                  hover:border-red-500/40
                  hover:bg-red-500/[0.1]
                  hover:text-red-300

                  active:scale-[0.93]
                "
                aria-label="Clear Cart"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>

            {/* =================================================
                SECURITY FOOTER
            ================================================= */}

            <div
              className="
                mt-2
                flex
                items-center
                justify-center
                gap-1.5
              "
            >
              <ShieldCheck
                className="
                  h-3
                  w-3
                  text-[#d4af37]/70
                "
              />

              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.17em]
                  text-zinc-400
                "
              >
                Direct & Secure WhatsApp Checkout
              </span>

              <span className="h-1 w-1 rounded-full bg-zinc-700" />

              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.12em]
                  text-zinc-400
                "
              >
                No Online Payment
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </motion.main>
  );
}