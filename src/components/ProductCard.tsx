// import { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";

// import { ShoppingBag, Check, X, ArrowRight, Sparkles } from "lucide-react";

// import { Link } from "@tanstack/react-router";

// import { useCart } from "@/context/cartContext";

// import { AnimatePresence, motion } from "framer-motion";

// interface Product {
//   id?: string | number;

//   name: string;

//   price: string;

//   notes?: string;

//   image?: string;

//   rating?: number;

//   reviews?: number;

//   discount?: number;

//   mrp?: string;

//   // =========================================================
//   // STOCK
//   // =========================================================
//   stock?: number;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const { addToCart, cart } = useCart();

//   const [added, setAdded] = useState(false);

//   const [showCartMessage, setShowCartMessage] = useState(false);

//   const [mounted, setMounted] = useState(false);

//   const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const popupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const productId = product.id ?? product.name;

//   // =========================================================
//   // STOCK
//   //
//   // stock undefined = 0
//   // stock 0 = OUT OF STOCK
//   // stock 1+ = AVAILABLE
//   // =========================================================

//   const isOutOfStock = (product.stock ?? 0) <= 0;

//   // =========================================================
//   // CART
//   // =========================================================

//   const isInCart = cart.some((item) => item.product.id === productId);

//   const currentCartItem = cart.find((item) => item.product.id === productId);

//   const currentQuantity = currentCartItem?.quantity ?? 1;

//   // =========================================================
//   // PORTAL MOUNT
//   // =========================================================

//   useEffect(() => {
//     setMounted(true);

//     return () => {
//       if (addedTimer.current) {
//         clearTimeout(addedTimer.current);
//       }

//       if (popupTimer.current) {
//         clearTimeout(popupTimer.current);
//       }
//     };
//   }, []);

//   // =========================================================
//   // ADD TO CART
//   // =========================================================

//   const handleAddToCart = () => {
//     // IMPORTANT:
//     // OUT OF STOCK PRODUCT CANNOT BE ADDED
//     if (isOutOfStock) {
//       return;
//     }

//     addToCart({
//       id: productId,
//       name: product.name ?? "",
//       price: product.price ?? "",
//       notes: product.notes ?? "",
//       image: product.image ?? "",
//     });

//     setAdded(true);

//     setShowCartMessage(true);

//     if (addedTimer.current) {
//       clearTimeout(addedTimer.current);
//     }

//     if (popupTimer.current) {
//       clearTimeout(popupTimer.current);
//     }

//     addedTimer.current = setTimeout(() => {
//       setAdded(false);
//     }, 1600);

//     popupTimer.current = setTimeout(() => {
//       setShowCartMessage(false);
//     }, 5000);
//   };

//   // =========================================================
//   // CLOSE NOTIFICATION
//   // =========================================================

//   const closeCartMessage = () => {
//     setShowCartMessage(false);

//     if (popupTimer.current) {
//       clearTimeout(popupTimer.current);
//     }
//   };

//   // =========================================================
//   // RATING
//   // =========================================================

//   const rating = product.rating ?? 0;

//   const fullStars = Math.floor(rating);

//   const hasHalfStar = rating % 1 >= 0.5;

//   // =========================================================
//   // PREMIUM CART NOTIFICATION
//   // =========================================================

//   const cartNotification =
//     mounted && showCartMessage
//       ? createPortal(
//           <AnimatePresence>
//             <>
//               {/* ==================================================
//                   MOBILE BACKDROP
//               ================================================== */}

//               <motion.div
//                 initial={{
//                   opacity: 0,
//                 }}
//                 animate={{
//                   opacity: 1,
//                 }}
//                 exit={{
//                   opacity: 0,
//                 }}
//                 transition={{
//                   duration: 0.2,
//                 }}
//                 onClick={closeCartMessage}
//                 className="
//                   fixed
//                   inset-0
//                   z-[999998]

//                   bg-black/55
//                   backdrop-blur-[4px]

//                   sm:hidden
//                 "
//               />

//               {/* ==================================================
//                   FIXED NOTIFICATION
//               ================================================== */}

//               <motion.div
//                 initial={{
//                   opacity: 0,
//                   y: 35,
//                   scale: 0.96,
//                 }}
//                 animate={{
//                   opacity: 1,
//                   y: 0,
//                   scale: 1,
//                 }}
//                 exit={{
//                   opacity: 0,
//                   y: 25,
//                   scale: 0.96,
//                 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 380,
//                   damping: 28,
//                   mass: 0.7,
//                 }}
//                 role="status"
//                 aria-live="polite"
//                 className="
//                   fixed

//                   bottom-[14px]
//                   left-[12px]
//                   right-[12px]

//                   z-[999999]

//                   sm:bottom-5
//                   sm:left-auto
//                   sm:right-5
//                   sm:w-[390px]

//                   md:bottom-6
//                   md:right-6
//                   md:w-[410px]

//                   lg:w-[420px]

//                   pointer-events-auto
//                 "
//               >
//                 <div
//                   className="
//                     relative
//                     overflow-hidden

//                     rounded-[22px]

//                     border
//                     border-[#d4af37]/50

//                     bg-[#070707]

//                     shadow-[0_25px_90px_rgba(0,0,0,0.9),0_0_45px_rgba(212,175,55,0.14)]

//                     ring-1
//                     ring-inset
//                     ring-white/[0.035]
//                   "
//                 >
//                   {/* TOP GOLD LINE */}

//                   <div
//                     className="
//                       pointer-events-none
//                       absolute
//                       left-0
//                       right-0
//                       top-0
//                       h-[2px]

//                       bg-gradient-to-r
//                       from-transparent
//                       via-[#f8df7b]
//                       to-transparent
//                     "
//                   />

//                   {/* AMBIENT GLOW */}

//                   <div
//                     className="
//                       pointer-events-none
//                       absolute
//                       -right-20
//                       -top-24

//                       h-56
//                       w-56

//                       rounded-full

//                       bg-[#d4af37]/10
//                       blur-[75px]
//                     "
//                   />

//                   <div
//                     className="
//                       pointer-events-none
//                       absolute
//                       -bottom-24
//                       -left-20

//                       h-48
//                       w-48

//                       rounded-full

//                       bg-[#d4af37]/[0.07]
//                       blur-[70px]
//                     "
//                   />

//                   {/* CLOSE */}

//                   <button
//                     type="button"
//                     onClick={closeCartMessage}
//                     aria-label="Close notification"
//                     className="
//                       absolute
//                       right-3
//                       top-3
//                       z-50

//                       flex
//                       h-8
//                       w-8

//                       items-center
//                       justify-center

//                       rounded-full

//                       border
//                       border-white/10

//                       bg-white/[0.035]

//                       text-zinc-500

//                       transition-all
//                       duration-300

//                       hover:border-[#d4af37]/50
//                       hover:bg-[#d4af37]/10
//                       hover:text-[#d4af37]

//                       active:scale-90
//                     "
//                   >
//                     <X className="h-3.5 w-3.5" />
//                   </button>

//                   {/* PRODUCT TOP */}

//                   <div
//                     className="
//                       relative

//                       flex
//                       items-center
//                       gap-3.5

//                       px-4
//                       pb-4
//                       pt-5

//                       sm:gap-4
//                       sm:px-5
//                     "
//                   >
//                     {/* PRODUCT IMAGE */}

//                     <div
//                       className="
//                         relative
//                         h-[68px]
//                         w-[68px]
//                         shrink-0

//                         overflow-hidden

//                         rounded-[17px]

//                         border
//                         border-[#d4af37]/45

//                         bg-[#111]

//                         shadow-[0_0_28px_rgba(212,175,55,0.12)]

//                         sm:h-[76px]
//                         sm:w-[76px]
//                       "
//                     >
//                       {product.image ? (
//                         <motion.img
//                           initial={{
//                             opacity: 0,
//                             scale: 1.1,
//                           }}
//                           animate={{
//                             opacity: 1,
//                             scale: 1,
//                           }}
//                           transition={{
//                             duration: 0.45,
//                           }}
//                           src={product.image}
//                           alt={product.name}
//                           className="
//                             h-full
//                             w-full
//                             object-cover
//                           "
//                         />
//                       ) : (
//                         <div
//                           className="
//                             flex
//                             h-full
//                             w-full
//                             items-center
//                             justify-center
//                           "
//                         >
//                           <ShoppingBag
//                             className="
//                               h-6
//                               w-6
//                               text-[#d4af37]
//                             "
//                           />
//                         </div>
//                       )}

//                       {/* IMAGE GLOSS */}

//                       <div
//                         className="
//                           pointer-events-none
//                           absolute
//                           inset-0

//                           bg-gradient-to-br
//                           from-white/10
//                           via-transparent
//                           to-black/30
//                         "
//                       />

//                       {/* CHECK */}

//                       <motion.div
//                         initial={{
//                           scale: 0,
//                           rotate: -35,
//                         }}
//                         animate={{
//                           scale: 1,
//                           rotate: 0,
//                         }}
//                         transition={{
//                           delay: 0.08,
//                           type: "spring",
//                           stiffness: 420,
//                           damping: 15,
//                         }}
//                         className="
//                           absolute
//                           -bottom-1
//                           -right-1

//                           flex
//                           h-6
//                           w-6

//                           items-center
//                           justify-center

//                           rounded-full

//                           border-2
//                           border-[#070707]

//                           bg-gradient-to-br
//                           from-[#f7df7d]
//                           via-[#d4af37]
//                           to-[#9d7c18]

//                           shadow-[0_0_18px_rgba(212,175,55,0.45)]
//                         "
//                       >
//                         <Check
//                           className="
//                             h-3
//                             w-3
//                             text-black
//                           "
//                           strokeWidth={3}
//                         />
//                       </motion.div>
//                     </div>

//                     {/* PRODUCT INFO */}

//                     <div
//                       className="
//                         min-w-0
//                         flex-1
//                         pr-7
//                       "
//                     >
//                       <motion.div
//                         initial={{
//                           opacity: 0,
//                           x: -7,
//                         }}
//                         animate={{
//                           opacity: 1,
//                           x: 0,
//                         }}
//                         transition={{
//                           delay: 0.06,
//                         }}
//                         className="
//                           flex
//                           items-center
//                           gap-1.5

//                           text-[9px]
//                           font-bold
//                           uppercase
//                           tracking-[0.2em]

//                           text-[#d4af37]

//                           sm:text-[10px]
//                         "
//                       >
//                         <Sparkles className="h-3 w-3" />
//                         Added To Your Bag
//                       </motion.div>

//                       <motion.h4
//                         initial={{
//                           opacity: 0,
//                           y: 5,
//                         }}
//                         animate={{
//                           opacity: 1,
//                           y: 0,
//                         }}
//                         transition={{
//                           delay: 0.1,
//                         }}
//                         className="
//                           mt-1.5

//                           truncate

//                           font-display
//                           text-[16px]
//                           font-semibold
//                           leading-tight

//                           text-white

//                           sm:text-[18px]
//                         "
//                       >
//                         {product.name}
//                       </motion.h4>

//                       <motion.div
//                         initial={{
//                           opacity: 0,
//                         }}
//                         animate={{
//                           opacity: 1,
//                         }}
//                         transition={{
//                           delay: 0.15,
//                         }}
//                         className="
//                           mt-2

//                           flex
//                           items-center
//                           gap-2
//                         "
//                       >
//                         <span
//                           className="
//                             text-[13px]
//                             font-extrabold

//                             text-[#d4af37]

//                             sm:text-sm
//                           "
//                         >
//                           {product.price}
//                         </span>

//                         <span className="text-zinc-700">•</span>

//                         <span
//                           className="
//                             rounded-full

//                             bg-white/[0.06]

//                             px-2
//                             py-0.5

//                             text-[9px]
//                             font-semibold
//                             uppercase
//                             tracking-[0.08em]

//                             text-zinc-400
//                           "
//                         >
//                           Qty {currentQuantity}
//                         </span>
//                       </motion.div>
//                     </div>
//                   </div>

//                   {/* DIVIDER */}

//                   <div
//                     className="
//                       mx-4
//                       h-px

//                       bg-gradient-to-r
//                       from-transparent
//                       via-white/10
//                       to-transparent

//                       sm:mx-5
//                     "
//                   />

//                   {/* MESSAGE */}

//                   <div
//                     className="
//                       relative

//                       px-4
//                       pb-4
//                       pt-3.5

//                       sm:px-5
//                       sm:pb-5
//                     "
//                   >
//                     <div
//                       className="
//                         flex
//                         items-center
//                         gap-2.5
//                       "
//                     >
//                       <div
//                         className="
//                           flex
//                           h-7
//                           w-7
//                           shrink-0

//                           items-center
//                           justify-center

//                           rounded-full

//                           border
//                           border-[#d4af37]/20

//                           bg-[#d4af37]/10
//                         "
//                       >
//                         <Check
//                           className="
//                             h-3.5
//                             w-3.5
//                             text-[#d4af37]
//                           "
//                           strokeWidth={2.5}
//                         />
//                       </div>

//                       <div className="min-w-0 flex-1">
//                         <p
//                           className="
//                             text-[11px]
//                             font-medium
//                             leading-relaxed

//                             text-zinc-300

//                             sm:text-xs
//                           "
//                         >
//                           Your fragrance has been added to your collection.
//                         </p>

//                         <p
//                           className="
//                             mt-0.5

//                             text-[9px]
//                             uppercase
//                             tracking-[0.12em]

//                             text-zinc-600
//                           "
//                         >
//                           Ready for checkout
//                         </p>
//                       </div>
//                     </div>

//                     {/* BUTTONS */}

//                     <div
//                       className="
//                         mt-4

//                         grid
//                         grid-cols-2

//                         gap-2.5
//                       "
//                     >
//                       <button
//                         type="button"
//                         onClick={closeCartMessage}
//                         className="
//                           flex
//                           min-h-[43px]

//                           items-center
//                           justify-center

//                           rounded-xl

//                           border
//                           border-white/10

//                           bg-white/[0.035]

//                           px-3

//                           text-[9px]
//                           font-bold
//                           uppercase
//                           tracking-[0.1em]

//                           text-zinc-300

//                           transition-all
//                           duration-300

//                           hover:border-white/20
//                           hover:bg-white/[0.07]
//                           hover:text-white

//                           active:scale-[0.97]

//                           sm:min-h-[45px]
//                           sm:text-[10px]
//                         "
//                       >
//                         Continue Shopping
//                       </button>

//                       <Link
//                         to="/cart"
//                         onClick={closeCartMessage}
//                         className="
//                           group/view

//                           relative

//                           flex
//                           min-h-[43px]

//                           items-center
//                           justify-center
//                           gap-2

//                           overflow-hidden

//                           rounded-xl

//                           border
//                           border-[#d4af37]

//                           bg-gradient-to-r
//                           from-[#c7a32d]
//                           via-[#f0d36b]
//                           to-[#c7a32d]

//                           px-3

//                           text-[9px]
//                           font-extrabold
//                           uppercase
//                           tracking-[0.1em]

//                           text-black

//                           shadow-[0_6px_24px_rgba(212,175,55,0.2)]

//                           transition-all
//                           duration-300

//                           hover:brightness-105
//                           hover:shadow-[0_8px_32px_rgba(212,175,55,0.35)]

//                           active:scale-[0.97]

//                           sm:min-h-[45px]
//                           sm:text-[10px]
//                         "
//                       >
//                         <span
//                           className="
//                             pointer-events-none

//                             absolute
//                             inset-y-0
//                             -left-16

//                             w-10

//                             skew-x-[-20deg]

//                             bg-white/40

//                             transition-all
//                             duration-700

//                             group-hover/view:left-[120%]
//                           "
//                         />

//                         <span className="relative">View Cart</span>

//                         <ArrowRight
//                           className="
//                             relative

//                             h-3.5
//                             w-3.5

//                             transition-transform
//                             duration-300

//                             group-hover/view:translate-x-1
//                           "
//                         />
//                       </Link>
//                     </div>
//                   </div>

//                   {/* AUTO CLOSE BACKGROUND */}

//                   <div
//                     className="
//                       absolute
//                       bottom-0
//                       left-0
//                       right-0

//                       h-[2px]

//                       bg-white/5
//                     "
//                   />

//                   {/* AUTO CLOSE GOLD PROGRESS */}

//                   <motion.div
//                     initial={{
//                       width: "100%",
//                     }}
//                     animate={{
//                       width: "0%",
//                     }}
//                     transition={{
//                       duration: 5,
//                       ease: "linear",
//                     }}
//                     className="
//                       absolute
//                       bottom-0
//                       left-0

//                       h-[2px]

//                       bg-gradient-to-r
//                       from-[#9d7c18]
//                       via-[#f7df7d]
//                       to-[#d4af37]
//                     "
//                   />
//                 </div>
//               </motion.div>
//             </>
//           </AnimatePresence>,
//           document.body,
//         )
//       : null;

//   return (
//     <>
//       {/* =========================================================
//           CART NOTIFICATION
//       ========================================================= */}

//       {cartNotification}

//       {/* =========================================================
//           PRODUCT CARD
//       ========================================================= */}

//       <article
//         className={`
//     group
//     relative
//     flex
//     h-full
//     min-h-0
//     w-full
//     min-w-0
//     flex-col

//     overflow-hidden
//     rounded-xl

//     border
//     bg-background

//     p-2.5

//     shadow-[0_8px_25px_rgba(0,0,0,0.12)]

//     transition-all
//     duration-500
//     ease-out

//     sm:p-3
//     md:p-3.5
//     lg:p-4
//     xl:p-[18px]

//     ${
//       isOutOfStock
//         ? `
//           border-[#d4af37]/25
//           cursor-default
//         `
//         : `
//           border-[#d4af37]/25

//           hover:-translate-y-1.5
//           hover:border-[#d4af37]/70
//           hover:shadow-[0_18px_45px_rgba(212,175,55,0.18)]
//         `
//     }
//   `}
//       >
//         {/* TOP GLOW */}

//         <div
//           className="
//             pointer-events-none

//             absolute
//             -top-20
//             left-1/2

//             h-32
//             w-32

//             -translate-x-1/2

//             rounded-full

//             bg-[#d4af37]/5

//             blur-3xl

//             transition-all
//             duration-500

//             group-hover:bg-[#d4af37]/10
//           "
//         />

//         {/* ======================================================
//             PRODUCT IMAGE
//         ====================================================== */}

//         <div
//           className="
//             relative
//             aspect-square
//             w-full
//             shrink-0

//             overflow-hidden
//             rounded-lg

//             bg-muted

//             ring-1
//             ring-black/5

//             transition-all
//             duration-500
              
//             group-hover:ring-[#d4af37]/30
//           "
//         >
//           {product.image ? (
//             <img
//               src={product.image}
//               alt={product.name}
//               loading="lazy"
//               decoding="async"
//               className={`
//   block
//   h-full
//   w-full

//   object-contain
//   object-center

//   scale-[1.02]

//   transition-transform
//   duration-700
//   ease-out

//   ${!isOutOfStock ? "group-hover:scale-[1.06]" : ""}
// `}
//             />
//           ) : (
//             <div
//               className="
//                 flex
//                 h-full
//                 w-full

//                 items-center
//                 justify-center

//                 bg-[#111]

//                 px-3

//                 text-center
//                 text-[10px]
//                 uppercase
//                 tracking-[0.14em]

//                 text-muted-foreground
//               "
//             >
//               No Image
//             </div>
//           )}

//           {/* IMAGE SHINE */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-0

//               bg-gradient-to-br
//               from-white/10
//               via-transparent
//               to-black/10

//               opacity-70
//             "
//           />

//           {/* INNER BORDER */}

//           <div
//             className="
//               pointer-events-none
//               absolute
//               inset-0

//               rounded-lg

//               border
//               border-white/10
//             "
//           />

//           {/* ==================================================
//               OUT OF STOCK OVERLAY
//           ================================================== */}

//           {isOutOfStock && (
//             <div
//               className="
//                 absolute
//                 inset-0
//                 z-30

//                 flex
//                 items-center
//                 justify-center

//                 bg-black/45

//                 backdrop-blur-[1px]
//               "
//             >
//               <span
//                 className="
//                   rounded-full

//                   border
//                   border-red-400/40

//                   bg-black/85

//                   px-4
//                   py-2

//                   text-[10px]
//                   font-extrabold
//                   uppercase
//                   tracking-[0.16em]

//                   text-red-400

//                   shadow-[0_0_25px_rgba(239,68,68,0.18)]
//                 "
//               >
//                 Out of Stock
//               </span>
//             </div>
//           )}

//           {/* ==================================================
//               IN CART
//           ================================================== */}

//           {!isOutOfStock && isInCart && (
//             <motion.div
//               initial={{
//                 opacity: 0,
//                 y: -5,
//               }}
//               animate={{
//                 opacity: 1,
//                 y: 0,
//               }}
//               className="
//                   absolute
//                   right-2.5
//                   top-2.5

//                   flex
//                   items-center
//                   gap-1.5

//                   rounded-full

//                   border
//                   border-[#d4af37]/50

//                   bg-black/75

//                   px-2.5
//                   py-1.5

//                   text-[10px]
//                   font-bold
//                   uppercase
//                   tracking-wide

//                   text-[#d4af37]

//                   shadow-lg

//                   backdrop-blur-md

//                   sm:right-3
//                   sm:top-3
//                 "
//             >
//               <Check className="h-3 w-3" />
//               In Cart
//             </motion.div>
//           )}

//           {/* ==================================================
//               DISCOUNT
//           ================================================== */}

//           {!isOutOfStock && product.discount !== undefined && (
//             <div
//               className="
//                   absolute
//                   left-2.5
//                   top-2.5

//                   rounded-full

//                   bg-red-500

//                   px-2.5
//                   py-1

//                   text-[10px]
//                   font-extrabold
//                   tracking-wide

//                   text-white

//                   shadow-lg

//                   sm:left-3
//                   sm:top-3
//                 "
//             >
//               -{product.discount}%
//             </div>
//           )}
//         </div>

//         {/* ======================================================
//             PRODUCT DETAILS
//         ====================================================== */}

//         <div
//           className="
//             flex
//             min-h-0
//             flex-1
//             flex-col

//             pt-3

//             sm:pt-3.5
//             md:pt-3.5
//             lg:pt-4
//           "
//         >
//           {/* NAME */}

//           <h3
//             className="
//               line-clamp-2
//               min-h-[38px]

//               break-words

//               font-display

//               text-[17px]
//               font-semibold
//               leading-[1.18]

//               tracking-[-0.01em]

//               text-foreground

//               transition-colors
//               duration-300

//               group-hover:text-[#d4af37]

//               sm:min-h-[40px]
//               sm:text-[18px]

//               md:min-h-[42px]
//               md:text-[19px]

//               lg:min-h-[44px]
//               lg:text-xl
//             "
//           >
//             {product.name}
//           </h3>

//           {/* RATING */}

//           {product.rating !== undefined && (
//             <div
//               className="
//                 mt-2.5

//                 flex
//                 items-center
//                 gap-2
//               "
//             >
//               <div
//                 className="
//                   flex
//                   items-center

//                   rounded-md

//                   bg-orange-50

//                   px-1.5
//                   py-0.5

//                   dark:bg-orange-500/10
//                 "
//               >
//                 <div
//                   className="
//                     flex
//                     items-center
//                     leading-none
//                   "
//                 >
//                   {Array.from({
//                     length: 5,
//                   }).map((_, i) => {
//                     const isFull = i < fullStars;

//                     const isHalf = i === fullStars && hasHalfStar;

//                     return (
//                       <span
//                         key={i}
//                         className="
//                           relative
//                           inline-block

//                           text-[15px]
//                           leading-none

//                           sm:text-[16px]
//                           md:text-[17px]
//                         "
//                       >
//                         <span className="text-gray-300">★</span>

//                         {(isFull || isHalf) && (
//                           <span
//                             className={`
//                               absolute
//                               inset-0

//                               overflow-hidden

//                               text-orange-500

//                               ${isHalf ? "w-1/2" : "w-full"}
//                             `}
//                           >
//                             ★
//                           </span>
//                         )}
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>

//               {product.reviews !== undefined && (
//                 <span
//                   className="
//                     text-[11px]
//                     font-semibold
//                     tracking-wide

//                     text-muted-foreground

//                     sm:text-xs
//                     md:text-[13px]
//                   "
//                 >
//                   {product.reviews.toLocaleString("en-IN")}
//                 </span>
//               )}
//             </div>
//           )}

//           {/* NOTES */}

//           <div
//             className="
//               mt-2

//               min-h-[27px]

//               sm:min-h-[29px]
//               md:min-h-[31px]
//               lg:min-h-[33px]
//             "
//           >
//             {product.notes ? (
//               <p
//                 className="
//                   line-clamp-2
//                   break-words

//                   text-[10px]
//                   font-medium
//                   leading-[1.45]

//                   uppercase
//                   tracking-[0.06em]

//                   text-muted-foreground

//                   sm:text-[11px]
//                   md:text-xs
//                   lg:text-[12px]

//                   lg:tracking-[0.08em]
//                 "
//               >
//                 {product.notes}
//               </p>
//             ) : null}
//           </div>
//         </div>

//         {/* ======================================================
//             PRICE + CART
//         ====================================================== */}

//         <div
//           className="
//             mt-3
//             w-full

//             border-t
//             border-border/70

//             pt-3

//             sm:mt-3.5
//             sm:pt-3.5

//             md:mt-4
//             md:pt-4
//           "
//         >
//           {/* PRICE */}

//           <div
//             className="
//               flex
//               min-w-0
//               flex-wrap
//               items-center

//               gap-x-2
//               gap-y-1
//             "
//           >
//             {!isOutOfStock && product.discount !== undefined && (
//               <span
//                 className="
//                     shrink-0

//                     rounded-md

//                     bg-red-500/10

//                     px-1.5
//                     py-0.5

//                     text-[12px]
//                     font-extrabold

//                     text-red-500

//                     sm:text-[13px]
//                     md:text-sm
//                   "
//               >
//                 -{product.discount}%
//               </span>
//             )}

//             <span
//               className="
//                 block

//                 text-[21px]
//                 font-extrabold
//                 leading-none

//                 tracking-[-0.02em]

//                 text-[#d4af37]

//                 sm:text-[23px]
//                 md:text-[25px]
//               "
//               title={product.price ?? ""}
//             >
//               {product.price ?? ""}
//             </span>

//             {product.mrp && (
//               <span
//                 className="
//                   block

//                   text-[11px]
//                   font-medium

//                   text-muted-foreground

//                   line-through

//                   sm:text-xs
//                   md:text-[13px]
//                 "
//               >
//                 M.R.P.: {product.mrp}
//               </span>
//             )}
//           </div>

//           {/* SPECIAL PRICE */}

//           {!isOutOfStock && product.discount !== undefined && (
//             <div
//               className="
//                   mt-1

//                   flex
//                   items-center
//                   gap-1.5

//                   text-[9px]
//                   font-medium
//                   uppercase
//                   tracking-[0.12em]

//                   text-muted-foreground
//                 "
//             >
//               <Sparkles
//                 className="
//                     h-2.5
//                     w-2.5

//                     text-[#d4af37]
//                   "
//               />
//               Special Price
//             </div>
//           )}

//           {/* ====================================================
//               STOCK INFO
//           ==================================================== */}

//           {!isOutOfStock && product.stock !== undefined && (
//             <div
//               className="
//                   mt-2

//                   text-[9px]
//                   font-semibold
//                   uppercase
//                   tracking-[0.12em]

//                   text-zinc-500
//                 "
//             >
//               {product.stock <= 5 ? `Only ${product.stock} left` : "In Stock"}
//             </div>
//           )}

//           {/* ====================================================
//               ADD TO CART
//           ==================================================== */}

//           <button
//             type="button"
//             onClick={handleAddToCart}
//             disabled={isOutOfStock}
//             aria-disabled={isOutOfStock}
//             className={`
//               group/cart

//               relative

//               mt-3

//               flex
//               min-h-[42px]
//               w-full

//               items-center
//               justify-center
//               gap-2

//               overflow-hidden

//               rounded-lg

//               border

//               px-3
//               py-2.5

//               text-[10px]
//               font-bold
//               uppercase
//               tracking-[0.08em]

//               transition-all
//               duration-300

//               focus-visible:outline-none
//               focus-visible:ring-2
//               focus-visible:ring-[#d4af37]
//               focus-visible:ring-offset-2

//               sm:min-h-[44px]
//               sm:text-[11px]

//               md:min-h-[46px]
//               md:text-xs

//               lg:min-h-[47px]

//               ${
//                 isOutOfStock
//                   ? `
//                     cursor-not-allowed

//                     border-zinc-700

//                     bg-zinc-800

//                     text-zinc-500

//                     shadow-none
//                   `
//                   : added
//                     ? `
//                     border-green-500/60

//                     bg-green-500/10

//                     text-green-400

//                     shadow-[0_0_18px_rgba(34,197,94,0.10)]
//                   `
//                     : `
//                     border-[#d4af37]/80

//                     bg-gradient-to-r
//                     from-[#d4af37]
//                     via-[#e8c65b]
//                     to-[#d4af37]

//                     text-black

//                     shadow-[0_5px_18px_rgba(212,175,55,0.18)]

//                     hover:shadow-[0_8px_28px_rgba(212,175,55,0.32)]

//                     hover:brightness-105

//                     active:scale-[0.97]
//                   `
//               }
//             `}
//           >
//             {/* SHINE */}

//             {!added && !isOutOfStock && (
//               <span
//                 className="
//                     pointer-events-none

//                     absolute
//                     inset-y-0
//                     -left-16

//                     w-10

//                     skew-x-[-20deg]

//                     bg-white/30

//                     transition-all
//                     duration-700

//                     group-hover/cart:left-[115%]
//                   "
//               />
//             )}

//             {/* OUT OF STOCK */}

//             {isOutOfStock ? (
//               <>
//                 <span
//                   className="
//                     h-2
//                     w-2

//                     rounded-full

//                     bg-red-500

//                     shadow-[0_0_10px_rgba(239,68,68,0.45)]
//                   "
//                 />
//                 Out of Stock
//               </>
//             ) : added ? (
//               <>
//                 <motion.span
//                   initial={{
//                     scale: 0.5,
//                     opacity: 0,
//                   }}
//                   animate={{
//                     scale: 1,
//                     opacity: 1,
//                   }}
//                 >
//                   <Check className="h-4 w-4" />
//                 </motion.span>
//                 Added
//               </>
//             ) : (
//               <>
//                 <ShoppingBag className="h-4 w-4" />
//                 Add to Cart
//                 <ArrowRight
//                   className="
//                     h-3.5
//                     w-3.5

//                     transition-transform
//                     duration-300

//                     group-hover/cart:translate-x-1
//                   "
//                 />
//               </>
//             )}
//           </button>
//         </div>

//         {/* ======================================================
//             BOTTOM GOLD LINE
//         ====================================================== */}

//         <div
//           className="
//             pointer-events-none

//             absolute
//             bottom-0
//             left-1/2

//             h-[2px]
//             w-0

//             -translate-x-1/2

//             bg-gradient-to-r
//             from-transparent
//             via-[#d4af37]
//             to-transparent

//             opacity-0

//             transition-all
//             duration-500

//             group-hover:w-3/4
//             group-hover:opacity-100
//           "
//         />
//       </article>
//     </>
//   );
// }
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  ShoppingBag,
  Check,
  X,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { Link } from "@tanstack/react-router";

import { useCart } from "@/context/cartContext";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

interface Product {
  id?: string | number;

  name: string;

  price: string;

  notes?: string;

  image?: string;

  rating?: number;

  reviews?: number;

  discount?: number;

  mrp?: string;

  // =========================================================
  // STOCK
  // =========================================================
  stock?: number;
}

interface ProductCardProps {
  product: Product;
}

export function ProductCard({
  product,
}: ProductCardProps) {
  const {
    addToCart,
    cart,
  } = useCart();

  const [added, setAdded] =
    useState(false);

  const [showCartMessage, setShowCartMessage] =
    useState(false);

  const [mounted, setMounted] =
    useState(false);

  const addedTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const popupTimer =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  const productId =
    product.id ?? product.name;

  // =========================================================
  // STOCK
  //
  // undefined = OUT OF STOCK
  // 0         = OUT OF STOCK
  // 1+        = AVAILABLE
  // =========================================================

  const isOutOfStock =
    (product.stock ?? 0) <= 0;

  // =========================================================
  // CART
  // =========================================================

  const isInCart = cart.some(
    (item) =>
      item.product.id === productId,
  );

  const currentCartItem = cart.find(
    (item) =>
      item.product.id === productId,
  );

  const currentQuantity =
    currentCartItem?.quantity ?? 1;

  // =========================================================
  // PORTAL MOUNT
  // =========================================================

  useEffect(() => {
    setMounted(true);

    return () => {
      if (addedTimer.current) {
        clearTimeout(
          addedTimer.current,
        );
      }

      if (popupTimer.current) {
        clearTimeout(
          popupTimer.current,
        );
      }
    };
  }, []);

  // =========================================================
  // ADD TO CART
  // =========================================================

  const handleAddToCart = () => {
    // OUT OF STOCK = CANNOT ADD
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

    setShowCartMessage(true);

    if (addedTimer.current) {
      clearTimeout(
        addedTimer.current,
      );
    }

    if (popupTimer.current) {
      clearTimeout(
        popupTimer.current,
      );
    }

    addedTimer.current =
      setTimeout(() => {
        setAdded(false);
      }, 1600);

    popupTimer.current =
      setTimeout(() => {
        setShowCartMessage(false);
      }, 5000);
  };

  // =========================================================
  // CLOSE NOTIFICATION
  // =========================================================

  const closeCartMessage = () => {
    setShowCartMessage(false);

    if (popupTimer.current) {
      clearTimeout(
        popupTimer.current,
      );
    }
  };

  // =========================================================
  // RATING
  // =========================================================

  const rating =
    product.rating ?? 0;

  const fullStars =
    Math.floor(rating);

  const hasHalfStar =
    rating % 1 >= 0.5;

  // =========================================================
  // PREMIUM CART NOTIFICATION
  // =========================================================

  const cartNotification =
    mounted && showCartMessage
      ? createPortal(
          <AnimatePresence>
            <>
              {/* ==================================================
                  MOBILE BACKDROP
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                }}
                onClick={
                  closeCartMessage
                }
                className="
                  fixed
                  inset-0
                  z-[999998]

                  bg-black/55
                  backdrop-blur-[4px]

                  sm:hidden
                "
              />

              {/* ==================================================
                  FIXED NOTIFICATION
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 35,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 25,
                  scale: 0.96,
                }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 28,
                  mass: 0.7,
                }}
                role="status"
                aria-live="polite"
                className="
                  fixed

                  bottom-[14px]
                  left-[12px]
                  right-[12px]

                  z-[999999]

                  sm:bottom-5
                  sm:left-auto
                  sm:right-5
                  sm:w-[390px]

                  md:bottom-6
                  md:right-6
                  md:w-[410px]

                  lg:w-[420px]

                  pointer-events-auto
                "
              >
                <div
                  className="
                    relative
                    overflow-hidden

                    rounded-[22px]

                    border
                    border-[#d4af37]/50

                    bg-[#070707]

                    shadow-[0_25px_90px_rgba(0,0,0,0.9),0_0_45px_rgba(212,175,55,0.14)]

                    ring-1
                    ring-inset
                    ring-white/[0.035]
                  "
                >
                  {/* TOP GOLD LINE */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      left-0
                      right-0
                      top-0
                      h-[2px]

                      bg-gradient-to-r
                      from-transparent
                      via-[#f8df7b]
                      to-transparent
                    "
                  />

                  {/* AMBIENT GLOW */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -right-20
                      -top-24

                      h-56
                      w-56

                      rounded-full

                      bg-[#d4af37]/10
                      blur-[75px]
                    "
                  />

                  <div
                    className="
                      pointer-events-none
                      absolute
                      -bottom-24
                      -left-20

                      h-48
                      w-48

                      rounded-full

                      bg-[#d4af37]/[0.07]
                      blur-[70px]
                    "
                  />

                  {/* CLOSE */}

                  <button
                    type="button"
                    onClick={
                      closeCartMessage
                    }
                    aria-label="Close notification"
                    className="
                      absolute
                      right-3
                      top-3
                      z-50

                      flex
                      h-8
                      w-8

                      items-center
                      justify-center

                      rounded-full

                      border
                      border-white/10

                      bg-white/[0.035]

                      text-zinc-500

                      transition-all
                      duration-300

                      hover:border-[#d4af37]/50
                      hover:bg-[#d4af37]/10
                      hover:text-[#d4af37]

                      active:scale-90
                    "
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  {/* PRODUCT TOP */}

                  <div
                    className="
                      relative

                      flex
                      items-center
                      gap-3.5

                      px-4
                      pb-4
                      pt-5

                      sm:gap-4
                      sm:px-5
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

                        rounded-[17px]

                        border
                        border-[#d4af37]/45

                        bg-[#111]

                        shadow-[0_0_28px_rgba(212,175,55,0.12)]

                        sm:h-[76px]
                        sm:w-[76px]
                      "
                    >
                      {product.image ? (
                        <motion.img
                          initial={{
                            opacity: 0,
                            scale: 1.1,
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          transition={{
                            duration: 0.45,
                          }}
                          src={
                            product.image
                          }
                          alt={
                            product.name
                          }
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
                          <ShoppingBag
                            className="
                              h-6
                              w-6
                              text-[#d4af37]
                            "
                          />
                        </div>
                      )}

                      {/* IMAGE GLOSS */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-0

                          bg-gradient-to-br
                          from-white/10
                          via-transparent
                          to-black/30
                        "
                      />

                      {/* CHECK */}

                      <motion.div
                        initial={{
                          scale: 0,
                          rotate: -35,
                        }}
                        animate={{
                          scale: 1,
                          rotate: 0,
                        }}
                        transition={{
                          delay: 0.08,
                          type: "spring",
                          stiffness: 420,
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
                          border-[#070707]

                          bg-gradient-to-br
                          from-[#f7df7d]
                          via-[#d4af37]
                          to-[#9d7c18]

                          shadow-[0_0_18px_rgba(212,175,55,0.45)]
                        "
                      >
                        <Check
                          className="
                            h-3
                            w-3
                            text-black
                          "
                          strokeWidth={3}
                        />
                      </motion.div>
                    </div>

                    {/* PRODUCT INFO */}

                    <div
                      className="
                        min-w-0
                        flex-1
                        pr-7
                      "
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          x: -7,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: 0.06,
                        }}
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

                        Added To Your Bag
                      </motion.div>

                      <motion.h4
                        initial={{
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: 0.1,
                        }}
                        className="
                          mt-1.5

                          truncate

                          font-display
                          text-[16px]
                          font-semibold
                          leading-tight

                          text-white

                          sm:text-[18px]
                        "
                      >
                        {product.name}
                      </motion.h4>

                      <motion.div
                        initial={{
                          opacity: 0,
                        }}
                        animate={{
                          opacity: 1,
                        }}
                        transition={{
                          delay: 0.15,
                        }}
                        className="
                          mt-2

                          flex
                          items-center
                          gap-2
                        "
                      >
                        <span
                          className="
                            text-[13px]
                            font-extrabold

                            text-[#d4af37]

                            sm:text-sm
                          "
                        >
                          {product.price}
                        </span>

                        <span className="text-zinc-700">
                          •
                        </span>

                        <span
                          className="
                            rounded-full

                            bg-white/[0.06]

                            px-2
                            py-0.5

                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[0.08em]

                            text-zinc-400
                          "
                        >
                          Qty{" "}
                          {currentQuantity}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* DIVIDER */}

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

                  {/* MESSAGE */}

                  <div
                    className="
                      relative

                      px-4
                      pb-4
                      pt-3.5

                      sm:px-5
                      sm:pb-5
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        gap-2.5
                      "
                    >
                      <div
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0

                          items-center
                          justify-center

                          rounded-full

                          border
                          border-[#d4af37]/20

                          bg-[#d4af37]/10
                        "
                      >
                        <Check
                          className="
                            h-3.5
                            w-3.5
                            text-[#d4af37]
                          "
                          strokeWidth={2.5}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            text-[11px]
                            font-medium
                            leading-relaxed

                            text-zinc-300

                            sm:text-xs
                          "
                        >
                          Your fragrance has
                          been added to your
                          collection.
                        </p>

                        <p
                          className="
                            mt-0.5

                            text-[9px]
                            uppercase
                            tracking-[0.12em]

                            text-zinc-600
                          "
                        >
                          Ready for checkout
                        </p>
                      </div>
                    </div>

                    {/* BUTTONS */}

                    <div
                      className="
                        mt-4

                        grid
                        grid-cols-2

                        gap-2.5
                      "
                    >
                      <button
                        type="button"
                        onClick={
                          closeCartMessage
                        }
                        className="
                          flex
                          min-h-[43px]

                          items-center
                          justify-center

                          rounded-xl

                          border
                          border-white/10

                          bg-white/[0.035]

                          px-3

                          text-[9px]
                          font-bold
                          uppercase
                          tracking-[0.1em]

                          text-zinc-300

                          transition-all
                          duration-300

                          hover:border-white/20
                          hover:bg-white/[0.07]
                          hover:text-white

                          active:scale-[0.97]

                          sm:min-h-[45px]
                          sm:text-[10px]
                        "
                      >
                        Continue Shopping
                      </button>

                      <Link
                        to="/cart"
                        onClick={
                          closeCartMessage
                        }
                        className="
                          group/view

                          relative

                          flex
                          min-h-[43px]

                          items-center
                          justify-center
                          gap-2

                          overflow-hidden

                          rounded-xl

                          border
                          border-[#d4af37]

                          bg-gradient-to-r
                          from-[#c7a32d]
                          via-[#f0d36b]
                          to-[#c7a32d]

                          px-3

                          text-[9px]
                          font-extrabold
                          uppercase
                          tracking-[0.1em]

                          text-black

                          shadow-[0_6px_24px_rgba(212,175,55,0.2)]

                          transition-all
                          duration-300

                          hover:brightness-105
                          hover:shadow-[0_8px_32px_rgba(212,175,55,0.35)]

                          active:scale-[0.97]

                          sm:min-h-[45px]
                          sm:text-[10px]
                        "
                      >
                        <span
                          className="
                            pointer-events-none

                            absolute
                            inset-y-0
                            -left-16

                            w-10

                            skew-x-[-20deg]

                            bg-white/40

                            transition-all
                            duration-700

                            group-hover/view:left-[120%]
                          "
                        />

                        <span className="relative">
                          View Cart
                        </span>

                        <ArrowRight
                          className="
                            relative

                            h-3.5
                            w-3.5

                            transition-transform
                            duration-300

                            group-hover/view:translate-x-1
                          "
                        />
                      </Link>
                    </div>
                  </div>

                  {/* AUTO CLOSE */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      right-0

                      h-[2px]

                      bg-white/5
                    "
                  />

                  <motion.div
                    initial={{
                      width: "100%",
                    }}
                    animate={{
                      width: "0%",
                    }}
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
                      from-[#9d7c18]
                      via-[#f7df7d]
                      to-[#d4af37]
                    "
                  />
                </div>
              </motion.div>
            </>
          </AnimatePresence>,
          document.body,
        )
      : null;

  // =========================================================
  // CARD
  // =========================================================

  return (
    <>
      {cartNotification}

      <article
        className={`
          group
          relative
          flex
          h-full
          min-h-0
          w-full
          min-w-0
          flex-col

          overflow-hidden
          rounded-xl

          bg-background

          p-2.5

          shadow-[0_8px_25px_rgba(0,0,0,0.12)]

          transition-all
          duration-500
          ease-out

          sm:p-3
          md:p-3.5
          lg:p-4
          xl:p-[18px]

          ${
            isOutOfStock
              ? `
                border
                border-[#d4af37]/25
                cursor-default
              `
              : `
                border
                border-[#d4af37]/25

                hover:-translate-y-1.5
                hover:border-[#d4af37]/70
                hover:shadow-[0_18px_45px_rgba(212,175,55,0.18)]
              `
          }
        `}
      >
        {/* ======================================================
            TOP GLOW
        ====================================================== */}

        <div
          className={`
            pointer-events-none

            absolute
            -top-20
            left-1/2

            h-32
            w-32

            -translate-x-1/2

            rounded-full

            bg-[#d4af37]/5

            blur-3xl

            transition-all
            duration-500

            ${
              !isOutOfStock
                ? "group-hover:bg-[#d4af37]/10"
                : ""
            }
          `}
        />

        {/* ======================================================
            PRODUCT IMAGE
        ====================================================== */}

        <div
          className={`
            relative
            aspect-square
            w-full
            shrink-0

            overflow-hidden
            rounded-lg

            bg-muted

            ring-1
            ring-black/5

            transition-all
            duration-500

            ${
              !isOutOfStock
                ? "group-hover:ring-[#d4af37]/30"
                : ""
            }
          `}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              className={`
                block
                h-full
                w-full

                object-contain
                object-center

                scale-[1.02]

                transition-transform
                duration-700
                ease-out

                ${
                  !isOutOfStock
                    ? "group-hover:scale-[1.06]"
                    : ""
                }
              `}
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
                text-[10px]
                uppercase
                tracking-[0.14em]

                text-muted-foreground
              "
            >
              No Image
            </div>
          )}

          {/* IMAGE SHINE */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0

              bg-gradient-to-br
              from-white/10
              via-transparent
              to-black/10

              opacity-70
            "
          />

          {/* INNER BORDER */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0

              rounded-lg

              border
              border-white/10
            "
          />

          {/* ==================================================
              OUT OF STOCK OVERLAY
          ================================================== */}

          {isOutOfStock && (
           <div
  className="
    pointer-events-none
    absolute
    inset-0
    z-30

    flex
    items-center
    justify-center

    bg-black/45

    backdrop-blur-[1px]
  "
>
  <span
    className="
      flex
      items-center
      justify-center
      gap-2

      rounded-full

      border
      border-red-400/40

      bg-black/85

      px-4
      py-2

      text-[10px]
      font-extrabold
      uppercase
      tracking-[0.16em]

      text-white

      shadow-[0_0_25px_rgba(239,68,68,0.18)]
    "
  >
    <span
      className="
        text-[13px]
        font-black
        leading-none
        text-red-400
      "
    >
      ×
    </span>

    <span>
      OUT OF STOCK
    </span>
  </span>
</div>
          )}

          {/* ==================================================
              IN CART
          ================================================== */}

          {!isOutOfStock &&
            isInCart && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  absolute
                  right-2.5
                  top-2.5

                  flex
                  items-center
                  gap-1.5

                  rounded-full

                  border
                  border-[#d4af37]/50

                  bg-black/75

                  px-2.5
                  py-1.5

                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wide

                  text-[#d4af37]

                  shadow-lg

                  backdrop-blur-md

                  sm:right-3
                  sm:top-3
                "
              >
                <Check className="h-3 w-3" />

                In Cart
              </motion.div>
            )}

          {/* ==================================================
              DISCOUNT
          ================================================== */}

          {!isOutOfStock &&
            product.discount !== undefined && (
              <div
                className="
                  absolute
                  left-2.5
                  top-2.5

                  rounded-full

                  bg-red-500

                  px-2.5
                  py-1

                  text-[10px]
                  font-extrabold
                  tracking-wide

                  text-white

                  shadow-lg

                  sm:left-3
                  sm:top-3
                "
              >
                -{product.discount}%
              </div>
            )}
        </div>

        {/* ======================================================
            PRODUCT DETAILS
        ====================================================== */}

        <div
          className="
            flex
            min-h-0
            flex-1
            flex-col

            pt-3

            sm:pt-3.5
            md:pt-3.5
            lg:pt-4
          "
        >
          {/* NAME */}

          <h3
            className={`
              line-clamp-2
              min-h-[38px]

              break-words

              font-display

              text-[17px]
              font-semibold
              leading-[1.18]

              tracking-[-0.01em]

              text-foreground

              transition-colors
              duration-300

              sm:min-h-[40px]
              sm:text-[18px]

              md:min-h-[42px]
              md:text-[19px]

              lg:min-h-[44px]
              lg:text-xl

              ${
                !isOutOfStock
                  ? "group-hover:text-[#d4af37]"
                  : ""
              }
            `}
          >
            {product.name}
          </h3>

          {/* RATING */}

          {product.rating !== undefined && (
            <div
              className="
                mt-2.5

                flex
                items-center
                gap-2
              "
            >
              <div
                className="
                  flex
                  items-center

                  rounded-md

                  bg-orange-50

                  px-1.5
                  py-0.5

                  dark:bg-orange-500/10
                "
              >
                <div
                  className="
                    flex
                    items-center
                    leading-none
                  "
                >
                  {Array.from({
                    length: 5,
                  }).map((_, i) => {
                    const isFull =
                      i < fullStars;

                    const isHalf =
                      i === fullStars &&
                      hasHalfStar;

                    return (
                      <span
                        key={i}
                        className="
                          relative
                          inline-block

                          text-[15px]
                          leading-none

                          sm:text-[16px]
                          md:text-[17px]
                        "
                      >
                        <span className="text-gray-300">
                          ★
                        </span>

                        {(isFull ||
                          isHalf) && (
                          <span
                            className={`
                              absolute
                              inset-0

                              overflow-hidden

                              text-orange-500

                              ${
                                isHalf
                                  ? "w-1/2"
                                  : "w-full"
                              }
                            `}
                          >
                            ★
                          </span>
                        )}
                      </span>
                    );
                  })}
                </div>
              </div>

              {product.reviews !==
                undefined && (
                <span
                  className="
                    text-[11px]
                    font-semibold
                    tracking-wide

                    text-muted-foreground

                    sm:text-xs
                    md:text-[13px]
                  "
                >
                  {product.reviews.toLocaleString(
                    "en-IN",
                  )}
                </span>
              )}
            </div>
          )}

          {/* NOTES */}

          <div
            className="
              mt-2

              min-h-[27px]

              sm:min-h-[29px]
              md:min-h-[31px]
              lg:min-h-[33px]
            "
          >
            {product.notes ? (
              <p
                className="
                  line-clamp-2
                  break-words

                  text-[10px]
                  font-medium
                  leading-[1.45]

                  uppercase
                  tracking-[0.06em]

                  text-muted-foreground

                  sm:text-[11px]
                  md:text-xs
                  lg:text-[12px]

                  lg:tracking-[0.08em]
                "
              >
                {product.notes}
              </p>
            ) : null}
          </div>
        </div>

        {/* ======================================================
            PRICE + CART
        ====================================================== */}

        <div
          className="
            mt-3
            w-full

            border-t
            border-border/70

            pt-3

            sm:mt-3.5
            sm:pt-3.5

            md:mt-4
            md:pt-4
          "
        >
          {/* PRICE */}

          <div
            className="
              flex
              min-w-0
              flex-wrap
              items-center

              gap-x-2
              gap-y-1
            "
          >
            {!isOutOfStock &&
              product.discount !==
                undefined && (
                <span
                  className="
                    shrink-0

                    rounded-md

                    bg-red-500/10

                    px-1.5
                    py-0.5

                    text-[12px]
                    font-extrabold

                    text-red-500

                    sm:text-[13px]
                    md:text-sm
                  "
                >
                  -{product.discount}%
                </span>
              )}

            <span
              className="
                block

                text-[21px]
                font-extrabold
                leading-none

                tracking-[-0.02em]

                text-[#d4af37]

                sm:text-[23px]
                md:text-[25px]
              "
              title={
                product.price ?? ""
              }
            >
              {product.price ?? ""}
            </span>

            {product.mrp && (
              <span
                className="
                  block

                  text-[11px]
                  font-medium

                  text-muted-foreground

                  line-through

                  sm:text-xs
                  md:text-[13px]
                "
              >
                M.R.P.: {product.mrp}
              </span>
            )}
          </div>

          {/* SPECIAL PRICE */}

          {!isOutOfStock &&
            product.discount !==
              undefined && (
              <div
                className="
                  mt-1

                  flex
                  items-center
                  gap-1.5

                  text-[9px]
                  font-medium
                  uppercase
                  tracking-[0.12em]

                  text-muted-foreground
                "
              >
                <Sparkles
                  className="
                    h-2.5
                    w-2.5

                    text-[#d4af37]
                  "
                />

                Special Price
              </div>
            )}

          {/* ====================================================
              STOCK INFO
          ==================================================== */}

          {!isOutOfStock &&
            product.stock !==
              undefined && (
              <div
                className="
                  mt-2

                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]

                  text-zinc-500
                "
              >
                {product.stock <= 5
                  ? `Only ${product.stock} left`
                  : "In Stock"}
              </div>
            )}

          {/* ====================================================
              ADD TO CART
          ==================================================== */}

          <button
            type="button"
            onClick={
              handleAddToCart
            }
            disabled={isOutOfStock}
            aria-disabled={
              isOutOfStock
            }
            className={`
              group/cart

              relative

              mt-3

              flex
              min-h-[42px]
              w-full

              items-center
              justify-center
              gap-2

              overflow-hidden

              rounded-lg

              border

              px-3
              py-2.5

              text-[10px]
              font-bold
              uppercase
              tracking-[0.08em]

              transition-all
              duration-300

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#d4af37]
              focus-visible:ring-offset-2

              sm:min-h-[44px]
              sm:text-[11px]

              md:min-h-[46px]
              md:text-xs

              lg:min-h-[47px]

              ${
                isOutOfStock
                  ? `
                    cursor-not-allowed

                    border-red-500/55

                    bg-[#242528]

                    text-gray-400

                    shadow-none
                  `
                  : added
                    ? `
                      border-green-500/60

                      bg-green-500/10

                      text-green-400

                      shadow-[0_0_18px_rgba(34,197,94,0.10)]
                    `
                    : `
                      border-[#d4af37]/80

                      bg-gradient-to-r
                      from-[#d4af37]
                      via-[#e8c65b]
                      to-[#d4af37]

                      text-black

                      shadow-[0_5px_18px_rgba(212,175,55,0.18)]

                      hover:shadow-[0_8px_28px_rgba(212,175,55,0.32)]

                      hover:brightness-105

                      active:scale-[0.97]
                    `
              }
            `}
          >
            {/* SHINE */}

            {!added &&
              !isOutOfStock && (
                <span
                  className="
                    pointer-events-none

                    absolute
                    inset-y-0
                    -left-16

                    w-10

                    skew-x-[-20deg]

                    bg-white/30

                    transition-all
                    duration-700

                    group-hover/cart:left-[115%]
                  "
                />
              )}

            {/* OUT OF STOCK */}

            {isOutOfStock ? (
             <>
    <span
      className="
        text-[13px]
        font-black
        leading-none
        text-red-400
        drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]
      "
    >
      ×
    </span>

    <span>Out of Stock</span>
  </>
            ) : added ? (
              <>
                <motion.span
                  initial={{
                    scale: 0.5,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                >
                  <Check className="h-4 w-4" />
                </motion.span>

                Added
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />

                Add to Cart

                <ArrowRight
                  className="
                    h-3.5
                    w-3.5

                    transition-transform
                    duration-300

                    group-hover/cart:translate-x-1
                  "
                />
              </>
            )}
          </button>
        </div>

        {/* ======================================================
            BOTTOM GOLD LINE
            ONLY AVAILABLE PRODUCTS
        ====================================================== */}

        {!isOutOfStock && (
          <div
            className="
              pointer-events-none

              absolute
              bottom-0
              left-1/2

              h-[2px]
              w-0

              -translate-x-1/2

              bg-gradient-to-r
              from-transparent
              via-[#d4af37]
              to-transparent

              opacity-0

              transition-all
              duration-500

              group-hover:w-3/4
              group-hover:opacity-100
            "
          />
        )}
      </article>
    </>
  );
}