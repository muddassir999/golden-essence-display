import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export interface CartProduct {
  id?: string | number;
  name: string;
  price: string;
  notes?: string;
  image?: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string | number | undefined) => void;
  increaseQuantity: (productId: string | number | undefined) => void;
  decreaseQuantity: (productId: string | number | undefined) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("al-misbah-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
        localStorage.removeItem("al-misbah-cart");
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("al-misbah-cart", JSON.stringify(cart));
  }, [cart]);

  // Add product
  const addToCart = (product: CartProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id
      );

      // Product already exists
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // New product
      return [
        ...prevCart,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove product completely
  const removeFromCart = (productId: string | number | undefined) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId)
    );
  };

  // Increase quantity
  const increaseQuantity = (productId: string | number | undefined) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (productId: string | number | undefined) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Total quantity
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price
  const cartTotal = cart.reduce((total, item) => {
    const numericPrice =
      Number(item.product.price.replace(/[^\d.]/g, "")) || 0;

    return total + numericPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};