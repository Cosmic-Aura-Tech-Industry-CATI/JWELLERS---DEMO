"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mockProducts";
import { useCart } from "./CartContext";
import { useToast } from "./ToastContext";

interface WishlistContextType {
  wishlist: Product[];
  wishlistCount: number;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  moveToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const defaultInitialWishlist: Product[] = [mockProducts[4], mockProducts[8]];

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("auravia_wishlist");
        if (stored) return JSON.parse(stored);
      } catch {
        // fallback
      }
    }
    return defaultInitialWishlist;
  });

  useEffect(() => {
    try {
      localStorage.setItem("auravia_wishlist", JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          showToast(`Removed "${product.name}" from your wishlist.`, "info");
          return prev.filter((item) => item.id !== product.id);
        } else {
          showToast(`Saved "${product.name}" to your wishlist.`, "wishlist");
          return [...prev, product];
        }
      });
    },
    [showToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setWishlist((prev) => {
        const target = prev.find((item) => item.id === productId);
        if (target) {
          showToast(`Removed "${target.name}" from your wishlist.`, "info");
        }
        return prev.filter((item) => item.id !== productId);
      });
    },
    [showToast]
  );

  const moveToCart = useCallback(
    (product: Product, quantity = 1, selectedSize?: string) => {
      // 1. Add item to cart
      addToCart(product, quantity, selectedSize, product.material, true);
      // 2. Remove item from wishlist
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      // 3. Accessible toast feedback
      showToast(`Moved "${product.name}" to your shopping bag.`, "cart");
    },
    [addToCart, showToast]
  );

  const clearWishlist = useCallback(() => {
    setWishlist([]);
    showToast("Wishlist cleared.", "info");
  }, [showToast]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCart,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
