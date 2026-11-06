"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { mockProducts } from "@/data/mockProducts";

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    cart,
    cartCount,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    addToCart,
    subtotal,
    freeShippingThreshold,
  } = useCart();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  const formattedSubtotal = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(subtotal);

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    router.push("/cart");
  };

  // 2 Curated suggestions for drawer
  const suggestions = mockProducts.slice(1, 3);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211E]/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Your Shopping Bag"
        className="relative w-full max-w-md bg-[#FAF8F5] text-[#24211E] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8E1D7] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E8E1D7] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#C5A46D]" />
            <h2 className="font-serif text-xl font-normal text-[#24211E]">
              Your Shopping Bag
            </h2>
            <span className="text-xs font-sans text-[#A69A89]">
              ({cartCount})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close bag"
            className="p-1.5 text-[#706860] hover:text-[#24211E] transition-colors rounded-[2px] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-[#F4EFE6] border-b border-[#E8E1D7] space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="text-[#24211E] font-medium">
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-[#C5A46D] font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Complimentary Insured Delivery Unlocked!
                </span>
              ) : (
                <span>
                  Add{" "}
                  <strong>
                    ₹{amountNeededForFreeShipping.toLocaleString("en-IN")}
                  </strong>{" "}
                  more for Free Insured Courier
                </span>
              )}
            </span>
            <span className="text-[#A69A89] text-[10px] uppercase font-semibold">
              {Math.round(freeShippingProgress)}%
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E8E1D7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C5A46D] transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-5 py-12">
              <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#E8E1D7] flex items-center justify-center text-[#A69A89]">
                <ShoppingBag className="w-8 h-8 stroke-1 text-[#C5A46D]" />
              </div>
              <div className="space-y-1">
                <p className="font-serif text-2xl font-normal text-[#24211E]">
                  Your bag is empty
                </p>
                <p className="font-sans text-xs text-[#706860] max-w-xs">
                  Discover certified diamonds and hallmarked heirloom jewels.
                </p>
              </div>

              {/* Suggestions inside empty drawer */}
              <div className="w-full pt-4 space-y-2.5 text-left border-t border-[#E8E1D7]">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D] flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Recommended Heirlooms
                </span>
                {suggestions.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[2px]"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="relative w-12 h-14 bg-[#FAF8F5] rounded-[2px] overflow-hidden flex-shrink-0">
                        <Image
                          src={p.primaryImage}
                          alt={p.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs text-[#24211E] line-clamp-1">
                          {p.name}
                        </h4>
                        <span className="text-xs font-sans font-semibold text-[#24211E]">
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(p, 1)}
                      className="px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#24211E] text-[#F8F5EF] rounded-[2px] hover:bg-[#38332E] cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/collections/all");
                }}
              >
                Explore Full Collection
              </Button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 p-3 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] transition-all hover:border-[#C5A46D]/50"
              >
                {/* Thumbnail */}
                <Link
                  href={`/product/${item.product.slug}`}
                  onClick={() => setIsCartOpen(false)}
                  className="relative w-20 h-24 bg-[#FAF8F5] rounded-[2px] overflow-hidden flex-shrink-0 border border-[#F1EAE0]"
                >
                  <Image
                    src={item.product.primaryImage}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-start justify-between">
                      <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#A69A89]">
                        {item.product.purity}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={`Remove ${item.product.name}`}
                        className="text-[#A69A89] hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={() => setIsCartOpen(false)}
                      className="font-serif text-sm font-normal text-[#24211E] line-clamp-1 hover:text-[#C5A46D] transition-colors"
                    >
                      {item.product.name}
                    </Link>

                    <p className="text-[11px] font-sans text-[#706860]">
                      {item.selectedMetal || item.product.material} &bull; {item.selectedSize || "Standard"}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-sans text-xs font-semibold text-[#24211E]">
                      ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#E8E1D7] rounded-[2px] bg-[#FAF8F5]">
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 flex items-center justify-center text-[#706860] hover:text-[#24211E] disabled:opacity-30 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-sans font-medium text-[#24211E]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                        aria-label="Increase quantity"
                        className="w-6 h-6 flex items-center justify-center text-[#706860] hover:text-[#24211E] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FFFFFF] border-t border-[#E8E1D7] space-y-4">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex items-center justify-between text-[#706860]">
                <span>Estimated Subtotal</span>
                <span className="font-semibold text-sm text-[#24211E]">
                  {formattedSubtotal}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#706860]">
                <span>Insured Doorstep Shipping</span>
                <span className="text-[#C5A46D] font-medium uppercase text-[10px] tracking-wider">
                  {amountNeededForFreeShipping === 0 ? "Complimentary" : "₹500"}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              size="lg"
              onClick={handleCheckoutClick}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              View Bag &amp; Checkout &bull; {formattedSubtotal}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-sans uppercase tracking-[0.16em] text-[#A69A89] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>100% Insured &bull; BIS 916 Stamped &bull; 15-Day Returns</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
