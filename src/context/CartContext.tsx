"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, CartItem } from "@/types/product";
import { mockProducts } from "@/data/mockProducts";
import { useToast } from "./ToastContext";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
    selectedMetal?: string,
    openDrawer?: boolean
  ) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  freeShippingThreshold: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 50000;

const defaultInitialCart: CartItem[] = [
  {
    product: mockProducts[0],
    quantity: 1,
    selectedSize: "14 (Standard)",
    selectedMetal: "18KT Yellow Gold",
  },
];

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { showToast } = useToast();

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("auravia_cart");
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore fallback
      }
    }
    return defaultInitialCart;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync to localStorage on cart change
  useEffect(() => {
    try {
      localStorage.setItem("auravia_cart", JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const addToCart = useCallback(
    (
      product: Product,
      quantity = 1,
      selectedSize?: string,
      selectedMetal?: string,
      openDrawer = true
    ) => {
      setCart((prev) => {
        // Check if item already exists by product.id
        const existingIndex = prev.findIndex((item) => item.product.id === product.id);

        if (existingIndex > -1) {
          // Update quantity of existing item without creating duplicates
          const updated = [...prev];
          const currentItem = updated[existingIndex];
          updated[existingIndex] = {
            ...currentItem,
            quantity: currentItem.quantity + quantity,
            // Keep or update variant info if supplied
            selectedSize: selectedSize || currentItem.selectedSize || "Standard",
            selectedMetal: selectedMetal || currentItem.selectedMetal || product.material,
          };
          return updated;
        }

        // Add new cart entry
        return [
          ...prev,
          {
            product,
            quantity,
            selectedSize: selectedSize || "Standard",
            selectedMetal: selectedMetal || product.material,
          },
        ];
      });

      if (openDrawer) {
        setIsCartOpen(true);
      }

      showToast(
        `Added "${product.name}" (${quantity} ${quantity === 1 ? "piece" : "pieces"}) to your shopping bag.`,
        "cart"
      );
    },
    [showToast]
  );

  const removeFromCart = useCallback(
    (productId: string) => {
      setCart((prev) => {
        const target = prev.find((item) => item.product.id === productId);
        if (target) {
          showToast(`Removed "${target.product.name}" from your bag.`, "info");
        }
        return prev.filter((item) => item.product.id !== productId);
      });
    },
    [showToast]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    },
    [removeFromCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    showToast("Shopping bag cleared.", "info");
  }, [showToast]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
