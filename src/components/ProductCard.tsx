// import { useState } from "react";

// // Product interface/type define kar lete hain (agar pehle se nahi hai)
// interface Product {
//   id?: string | number;
//   name: string;
//   price: string;
//   notes?: string;
//   image?: string;
// }

// interface ProductCardProps {
//   product: Product;
// }

// export function ProductCard({ product }: ProductCardProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   // Apna WhatsApp number yahan dalein (Country code 91 ke sath, bina '+' ke)
//   const whatsappNumber = "919082412834"; 

//   // WhatsApp message jisme product ka naam aur price hoga
//   const whatsappMessage = encodeURIComponent(
//     `Hi, I want to inquire about ${product.name} priced at ${product.price}.`
//   );

//   return (
//     <>
//       {/* Product Card UI */}
//       <div className="space-y-3 p-5 border border-border rounded-sm bg-background">
//         {/* Product Image */}
//         {product.image && (
//           <div className="aspect-square overflow-hidden rounded-sm bg-muted">
//             <img 
//               src={product.image} 
//               alt={product.name} 
//               className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
//             />
//           </div>
//         )}

//         <h3 className="font-display text-2xl leading-none text-foreground">{product.name}</h3>
//         <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{product.notes}</p>
        
//         <div className="flex items-center justify-between gap-3 pt-1">
//           <span className="font-display text-xl text-gold">{product.price}</span>
          
//           <button
//             type="button"
//             onClick={() => setIsOpen(true)}
//             className="rounded-sm border border-gold px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gilded hover:text-primary-foreground"
//           >
//             Inquire / Buy
//           </button>
//         </div>
//       </div>

//       {/* Popup / Modal */}
//    {isOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
//           <div className="relative w-full max-w-lg rounded-lg bg-background p-6 border border-gold/30 shadow-xl space-y-5">
            
//             {/* Modal Header */}
//             <div className="flex justify-between items-start">
//               <h4 className="font-display text-3xl text-foreground">Confirm Inquiry</h4>
//               <button 
//                 onClick={() => setIsOpen(false)}
//                 className="text-muted-foreground hover:text-foreground text-2xl font-bold"
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Product Summary inside Popup (Image + Info) */}
//             <div className="py-4 border-y border-border flex items-center gap-5">
//               {product.image && (
//                 <img 
//                   src={product.image} 
//                   alt={product.name} 
//                   className="h-24 w-24 rounded-sm object-cover border border-gold/20 flex-shrink-0"
//                 />
//               )}
//               <div className="space-y-1.5">
//                 <p className="font-display text-2xl text-gold">{product.name}</p>
//                 <p className="text-base text-muted-foreground">{product.notes}</p>
//                 <p className="font-display text-xl text-foreground pt-1">Price: {product.price}</p>
//               </div>
//             </div>

//             <p className="text-base text-muted-foreground">
//               Clicking below will open WhatsApp to connect directly with us regarding this product.
//             </p>

//             {/* Modal Actions */}
//             <div className="flex gap-3 pt-2">
//               <button
//                 type="button"
//                 onClick={() => setIsOpen(false)}
//                 className="flex-1 rounded-sm border border-border px-4 py-3 text-sm uppercase tracking-[0.15em] text-muted-foreground hover:bg-muted"
//               >
//                 Cancel
//               </button>

//               <a
//                 href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={() => setIsOpen(false)}
//                 className="flex-1 rounded-sm bg-gold text-primary-foreground text-center px-4 py-3 text-sm uppercase tracking-[0.15em] font-medium transition-colors hover:bg-gilded flex items-center justify-center"
//               >
//                 Proceed to WhatsApp
//               </a>
//             </div>

//           </div>
//         </div>
//     )}
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const whatsappNumber = "919082412834"; 
  const whatsappMessage = encodeURIComponent(
    `Hi, I want to inquire about ${product.name} priced at ${product.price}.`
  );

  return (
    <>
      {/* Product Card UI */}
      <div className="space-y-3 p-5 border border-border rounded-sm bg-background">
        {product.image && (
          <div className="aspect-square overflow-hidden rounded-sm bg-muted">
            <img 
              src={product.image} 
              alt={product.name} 
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <h3 className="font-display text-2xl leading-none text-foreground">{product.name}</h3>
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{product.notes}</p>
        
        <div className="flex items-center justify-between gap-3 pt-1">
          <span className="font-display text-xl text-gold">{product.price}</span>
          
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="rounded-sm border border-gold px-4 py-2 text-[0.7rem] uppercase tracking-[0.2em] text-gold transition-colors duration-300 hover:bg-gilded hover:text-primary-foreground"
          >
            Inquire / Buy
          </button>
        </div>
      </div>

      {/* Popup / Modal rendered via Portal to escape parent container constraints */}
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-lg bg-background p-6 border border-gold/30 shadow-xl space-y-5">
            
            {/* Modal Header */}
            <div className="flex justify-between items-start">
              <h4 className="font-display text-3xl text-foreground">Confirm Inquiry</h4>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            {/* Product Summary inside Popup (Image + Info) */}
            <div className="py-4 border-y border-border flex items-center gap-5">
              {product.image && (
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-24 w-24 rounded-sm object-cover border border-gold/20 flex-shrink-0"
                />
              )}
              <div className="space-y-1.5">
                <p className="font-display text-2xl text-gold">{product.name}</p>
                <p className="text-base text-muted-foreground">{product.notes}</p>
                <p className="font-display text-xl text-foreground pt-1">Price: {product.price}</p>
              </div>
            </div>

            <p className="text-base text-muted-foreground">
              Clicking below will open WhatsApp to connect directly with us regarding this product.
            </p>

            {/* Modal Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-sm border border-border px-4 py-3 text-sm uppercase tracking-[0.15em] text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="flex-1 rounded-sm bg-gold text-primary-foreground text-center px-4 py-3 text-sm uppercase tracking-[0.15em] font-medium transition-colors hover:bg-gilded flex items-center justify-center"
              >
                Proceed to WhatsApp
              </a>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}