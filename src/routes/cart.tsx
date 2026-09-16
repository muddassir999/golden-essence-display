import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cartContext";
import { motion } from "framer-motion";

export const Route = createFileRoute("/cart")({
  head: () => {
    const title = "Shopping Cart — Al Misbah Perfumes";
    const description =
      "Review your selected fragrances and complete your order via WhatsApp with Al Misbah Perfumes.";

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

  component: CartRoute,
});

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

  // =========================================================
  // WHATSAPP NUMBER
  // +91 93723 79191
  // Country code +91 without + or spaces
  // =========================================================
  const whatsappNumber = "919372379191";

  // =========================================================
  // DIRECT WHATSAPP ORDER
  // NO LOGIN
  // NO AUTHENTICATION
  // NO ACCOUNT CHECK
  // DIRECTLY OPENS WHATSAPP DM
  // =========================================================
const handleWhatsAppOrder = () => {
  if (cart.length === 0) return;

  const whatsappNumber = "919372379191";

  // Clean text message without special characters that cause encoding issues ()
  let message = "Al Misbah Perfumes - Order Inquiry\n\n";

  cart.forEach((item, index) => {
    const price =
      Number(item.product.price.replace(/[^\d.]/g, "")) || 0;

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
  message += `Grand Total: ₹${cartTotal}\n\n`;
  message += `Please confirm the availability and order details.`;

  const encodedMessage = encodeURIComponent(message);

  // Check karein ki user mobile par hai ya desktop par
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // Mobile ke liye direct app trigger karega
    const mobileUrl = `whatsapp://send?phone=${whatsappNumber}&text=${encodedMessage}`;
    window.location.href = mobileUrl;
  } else {
    // Desktop ke liye WhatsApp Web ka direct send URL (yeh intermediate page ko bypass karne ki koshish karta hai agar logged in ho)
    const desktopUrl = `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
    window.open(desktopUrl, "_blank");
  }
};
  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto w-full max-w-[1450px] overflow-x-hidden bg-[#050505] px-3 pb-28 pt-3 text-white selection:bg-[#d4af37] selection:text-black sm:px-6 sm:pb-16 sm:pt-8 md:px-8 md:py-20 lg:px-12 lg:py-24"
    >
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="relative mb-5 sm:mb-10">
        {/* BACK TO HOME */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-4 sm:mb-8"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-[#d4af37]/50 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-md transition-all duration-300 hover:text-black hover:shadow-[0_0_18px_rgba(212,175,55,0.4)] sm:px-5 sm:py-2.5 sm:text-xs sm:tracking-[0.22em]"
          >
            <ArrowLeft className="h-3 w-3 shrink-0 text-black transition-transform duration-300 group-hover:-translate-x-1 sm:h-3.5 sm:w-3.5" />

            <span className="whitespace-nowrap">
              Back to Home
            </span>
          </Link>
        </motion.div>

        {/* MAIN HEADER */}

        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-1 w-full text-center lg:mt-4"
        >
          <p className="font-display text-xl leading-none tracking-wide text-[#d4af37] sm:text-4xl lg:text-[40px]">
            سلة التسوق
          </p>

          <h1 className="mx-auto mt-2 max-w-[1000px] break-words font-display text-2xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5rem]">
            Shopping{" "}
            <span className="bg-gradient-to-r from-[#d4af37] via-[#fff2b2] to-[#d4af37] bg-clip-text text-transparent">
              Cart
            </span>
          </h1>

          <div className="mx-auto mt-2.5 h-[2px] w-16 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent sm:w-48" />

          <p className="mx-auto mt-2.5 max-w-[750px] px-2 text-[11px] leading-4 text-zinc-300 sm:text-base sm:leading-8">
            Review your selected exquisite fragrances and finalize your order
            directly through WhatsApp.
          </p>
        </motion.header>
      </div>

      {/* =========================================================
          EMPTY CART
      ========================================================= */}

      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
          }}
          className="mt-6 rounded-2xl border border-[#d4af37]/40 bg-gradient-to-b from-[#141414] to-[#0a0a0a] px-4 py-14 text-center shadow-[0_0_30px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:rounded-3xl sm:px-6 sm:py-24"
        >
          <ShoppingBag className="mx-auto mb-4 h-12 w-12 animate-pulse text-[#d4af37] sm:mb-6 sm:h-16 sm:w-16" />

          <p className="font-display text-2xl font-bold text-white sm:text-4xl">
            Your Cart is Empty
          </p>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-6 text-zinc-400 sm:text-base sm:leading-7">
            You haven't added any luxury fragrances to your cart yet.
            Explore our royal collections to find your signature scent.
          </p>

          <Link
            to="/"
            className="mt-6 inline-block rounded-full border border-[#d4af37] bg-black px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#d4af37] transition-all duration-300 hover:bg-[#d4af37] hover:text-black sm:mt-8 sm:px-8 sm:py-4 sm:text-xs sm:tracking-[0.25em]"
          >
            Explore Fragrances
          </Link>
        </motion.div>
      ) : (
        <div className="mt-4 grid grid-cols-1 items-start gap-6 lg:grid-cols-3 lg:gap-10">
          {/* =====================================================
              ITEMS LIST
          ===================================================== */}

          <div className="space-y-3.5 lg:col-span-2 sm:space-y-5">
            <div className="flex items-center justify-between border-b border-[#d4af37]/30 px-1 pb-2.5 sm:pb-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#d4af37] sm:text-sm">
                {cartCount}{" "}
                {cartCount === 1 ? "Item" : "Items"} in Cart
              </p>

              <button
                type="button"
                onClick={clearCart}
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-red-400 transition-colors duration-300 hover:text-red-300 hover:underline sm:text-xs"
              >
                Clear Cart
              </button>
            </div>

            {/* PRODUCTS */}

            {cart.map((item) => {
              const price =
                Number(
                  item.product.price.replace(/[^\d.]/g, ""),
                ) || 0;

              const subtotal = price * item.quantity;

              return (
                <motion.div
                  key={item.product.id}
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative flex flex-row items-center gap-3 rounded-xl border border-[#d4af37]/30 bg-gradient-to-r from-[#111] via-[#161616] to-[#111] p-3 shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-300 hover:border-[#d4af37]/70 sm:gap-6 sm:rounded-2xl sm:p-6"
                >
                  {/* PRODUCT IMAGE */}

                  {item.product.image && (
                    <div className="group relative shrink-0">
                      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#d4af37] to-[#8a7323] opacity-25 blur transition duration-300 group-hover:opacity-60 sm:rounded-xl" />

                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="relative h-20 w-20 rounded-lg border border-[#d4af37]/50 bg-black object-cover shadow-md sm:h-36 sm:w-36 sm:rounded-xl"
                      />
                    </div>
                  )}

                  {/* DETAILS */}

                  <div className="flex min-w-0 flex-1 flex-col justify-between space-y-2">
                    <div className="space-y-0.5 sm:space-y-1">
                      <h2 className="truncate font-display text-sm font-bold tracking-wide text-white sm:text-2xl">
                        {item.product.name}
                      </h2>

                      <p className="text-[11px] font-bold tracking-wider text-[#d4af37] sm:text-base">
                        {item.product.price}
                      </p>

                      <p className="text-[10px] text-zinc-300 sm:text-sm">
                        Subtotal:{" "}
                        <span className="text-xs font-extrabold text-white sm:text-base">
                          ₹{subtotal}
                        </span>
                      </p>
                    </div>

                    {/* QUANTITY + REMOVE */}

                    <div className="flex items-center justify-between border-t border-zinc-800/80 pt-1 sm:border-t-0 sm:pt-0">
                      {/* QUANTITY */}

                      <div className="flex items-center rounded-full border border-[#d4af37]/40 bg-black/90 px-2 py-0.5 shadow-inner sm:px-2.5 sm:py-1">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(item.product.id)
                          }
                          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white transition-all hover:bg-[#d4af37] hover:text-black sm:h-7 sm:w-7 sm:text-sm"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>

                        <span className="w-6 text-center text-xs font-bold text-white sm:w-8">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(item.product.id)
                          }
                          className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white transition-all hover:bg-[#d4af37] hover:text-black sm:h-7 sm:w-7 sm:text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* REMOVE */}

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.product.id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-red-500/40 bg-red-950/30 text-red-400 shadow transition-all hover:bg-red-500 hover:text-white sm:h-11 sm:w-11"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* =====================================================
              DESKTOP ORDER SUMMARY
          ===================================================== */}

          <div className="sticky top-4 hidden h-fit rounded-3xl border border-[#d4af37]/40 bg-gradient-to-b from-[#141414] to-[#0a0a0a] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl lg:block">
            <h2 className="mb-6 border-b border-[#d4af37]/30 pb-4 font-display text-2xl font-bold tracking-wide text-white">
              Order Summary
            </h2>

            <div className="space-y-4 border-b border-[#d4af37]/30 pb-6 text-base text-zinc-300">
              <div className="flex justify-between">
                <span>Total Items</span>

                <span className="font-bold text-white">
                  {cartCount}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span className="text-right font-semibold text-[#d4af37]">
                  Calculated on WhatsApp
                </span>
              </div>
            </div>

            <div className="my-6 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-white">
                Grand Total
              </span>

              <span className="font-display text-3xl font-extrabold text-[#d4af37]">
                ₹{cartTotal}
              </span>
            </div>

            <div className="mt-8 space-y-4">
              {/* DIRECT WHATSAPP */}

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 px-6 py-4 text-center text-sm font-extrabold uppercase tracking-[0.2em] text-white shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all duration-300 hover:from-green-500 hover:to-emerald-500 hover:shadow-[0_4px_25px_rgba(16,185,129,0.6)]"
              >
                Order on WhatsApp
              </button>

              <button
                type="button"
                onClick={clearCart}
                className="w-full rounded-2xl border border-red-500/40 bg-black px-6 py-3.5 text-center text-sm font-bold uppercase tracking-[0.2em] text-red-400 transition-all duration-300 hover:bg-red-500/20"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MOBILE STICKY CHECKOUT
      ========================================================= */}

      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 block border-t border-[#d4af37]/40 bg-[#0a0a0a]/95 px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] backdrop-blur-lg lg:hidden">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-300">
              Grand Total ({cartCount} items):
            </span>

            <span className="font-display text-lg font-extrabold text-[#d4af37]">
              ₹{cartTotal}
            </span>
          </div>

          <div className="flex gap-2">
            {/* DIRECT WHATSAPP */}

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="flex-1 rounded-xl bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 py-3 text-center text-xs font-extrabold uppercase tracking-[0.15em] text-white shadow-[0_4px_15px_rgba(16,185,129,0.4)] transition-transform active:scale-95"
            >
              Order on WhatsApp
            </button>

            {/* CLEAR CART */}

            <button
              type="button"
              onClick={clearCart}
              className="rounded-xl border border-red-500/40 bg-black px-3.5 py-3 text-center text-xs font-bold text-red-400 transition-transform active:scale-95"
              aria-label="Clear Cart"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </motion.main>
  );
}