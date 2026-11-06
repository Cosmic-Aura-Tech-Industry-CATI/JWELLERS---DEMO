"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { mockProducts } from "@/data/mockProducts";
import { ProductCard } from "@/components/ui/ProductCard";
import {
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Tag,
  Lock,
  X,
  ShoppingBag,
} from "lucide-react";

export default function CartPage() {
  const {
    cart,
    cartCount,
    subtotal,
    removeFromCart,
    updateQuantity,
    clearCart,
    freeShippingThreshold,
  } = useCart();

  // Coupon state
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountPercent, setAppliedDiscountPercent] = useState<number | null>(null);
  const [couponMessage, setCouponMessage] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);

  // Simulated Checkout Modal State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: "Aaditya Varma",
    phone: "98765 43210",
    email: "aaditya.varma@example.com",
    address: "Penthouse 14B, Altamount Road",
    city: "Mumbai",
    pincode: "400026",
    paymentMethod: "upi",
  });

  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const discountAmount = appliedDiscountPercent
    ? Math.round((subtotal * appliedDiscountPercent) / 100)
    : 0;
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 500;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === "AURAVIA10" || couponCode.toUpperCase() === "WELCOME10") {
      setAppliedDiscountPercent(10);
      setCouponMessage({
        text: "Privilege code applied: 10% Haute Joaillerie discount saved!",
        isError: false,
      });
    } else {
      setCouponMessage({
        text: "Invalid code. Try code 'AURAVIA10' for 10% privilege savings.",
        isError: true,
      });
    }
  };

  const handleSimulateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
    clearCart();
  };

  // Related suggestions: bestsellers excluding items in cart
  const cartIds = new Set(cart.map((item) => item.product.id));
  const relatedSuggestions = mockProducts
    .filter((p) => !cartIds.has(p.id))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E] flex flex-col selection:bg-[#C5A46D]/20 selection:text-[#24211E]">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8E1D7] bg-[#FFFFFF] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-sans text-[#706860]">
          <Link href="/" className="hover:text-[#C5A46D] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89]" />
          <Link href="/collections/all" className="hover:text-[#C5A46D] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89]" />
          <span className="text-[#24211E] font-medium">Shopping Bag &bull; {cartCount} items</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 space-y-16">
        {cart.length === 0 && !orderPlaced ? (
          /* Empty Bag State with Product Suggestions */
          <div className="space-y-14">
            <div className="max-w-md mx-auto text-center space-y-6 py-14 px-6 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_4px_24px_rgba(36,33,30,0.03)]">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] border border-[#E8E1D7] flex items-center justify-center text-[#C5A46D]">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
                  Maison Auravia Bag
                </span>
                <h1 className="font-serif text-3xl font-light text-[#24211E]">
                  Your Shopping Bag is Empty
                </h1>
                <p className="font-sans text-xs sm:text-sm text-[#706860] leading-relaxed font-light">
                  Discover exceptional solitaire rings, diamond necklaces, and artisanal bracelets handcrafted in 18KT gold.
                </p>
              </div>
              <Link href="/collections/all" className="inline-block">
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore Collections
                </Button>
              </Link>
            </div>

            {/* Curated Recommendations for Empty Bag */}
            <section className="space-y-6 pt-4">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
                  Suggested Heirlooms
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#24211E]">
                  Pieces You May Admire
                </h2>
                <p className="text-xs font-sans text-[#706860]">
                  Explore hallmarked solitaires and certified diamond creations curated for our collectors.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedSuggestions.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        ) : orderPlaced ? (
          /* Order Placed Confirmation (Demo State) */
          <div className="max-w-xl mx-auto space-y-6 py-12 px-8 bg-[#FFFFFF] border border-[#C5A46D]/40 rounded-[3px] shadow-[0_8px_32px_rgba(197,164,109,0.12)] text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
                Order Confirmed (Simulated Demo)
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#24211E]">
                Thank You for Your Patronage
              </h1>
              <p className="font-sans text-xs sm:text-sm text-[#706860] leading-relaxed">
                Order reference <strong className="text-[#24211E]">#AUR-2026-9481</strong> has been successfully registered in our demo system for {checkoutForm.name}.
              </p>
            </div>

            <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-left text-xs font-sans space-y-2">
              <div className="flex justify-between py-1 border-b border-[#E8E1D7]/60">
                <span className="text-[#A69A89]">Shipping To:</span>
                <span className="font-medium text-[#24211E]">{checkoutForm.address}, {checkoutForm.city} ({checkoutForm.pincode})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#E8E1D7]/60">
                <span className="text-[#A69A89]">Estimated Delivery:</span>
                <span className="font-medium text-emerald-700">Wednesday, Oct 28 &bull; Insured Courier</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#A69A89]">Payment Mode:</span>
                <span className="font-medium text-[#24211E] uppercase">{checkoutForm.paymentMethod} (Simulated)</span>
              </div>
            </div>

            <p className="text-[11px] font-sans text-[#A69A89] italic">
              * Notice: This is a frontend demonstration. No actual payment was charged or jewellery dispatched.
            </p>

            <div className="pt-3">
              <Link href="/collections/all">
                <Button variant="primary">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Main Cart Content */
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#E8E1D7] pb-5">
                <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#24211E]">
                  Shopping Bag
                </h1>
                <span className="font-sans text-xs sm:text-sm text-[#706860]">
                  {cartCount} {cartCount === 1 ? "Creation" : "Creations"} reserved in your session
                </span>
              </div>

              {/* Free Shipping Meter */}
              <div className="p-4 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-medium text-[#24211E] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#C5A46D]" />
                    {remainingForFreeShipping === 0
                      ? "Congratulations! You have qualified for Complimentary Insured Express Shipping."
                      : `Add ${formatPrice(remainingForFreeShipping)} more to qualify for Complimentary Insured Shipping.`}
                  </span>
                  <span className="font-semibold text-[#C5A46D]">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#FAF8F5] rounded-full overflow-hidden border border-[#E8E1D7]">
                  <div
                    className="h-full bg-[#C5A46D] transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Two-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Items List */}
                <div className="lg:col-span-8 space-y-4">
                  {cart.map((item) => {
                    const lineTotal = item.product.price * item.quantity;
                    return (
                      <div
                        key={item.product.id}
                        className="p-4 sm:p-5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between transition-all hover:border-[#A69A89]"
                      >
                        {/* Product Thumbnail */}
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="relative w-20 h-24 sm:w-24 sm:h-28 rounded-[2px] overflow-hidden bg-[#FAF8F5] border border-[#E8E1D7] flex-shrink-0"
                        >
                          <Image
                            src={item.product.primaryImage}
                            alt={item.product.name}
                            fill
                            sizes="96px"
                            className="object-cover object-center"
                          />
                        </Link>

                        {/* Product Info */}
                        <div className="flex-1 space-y-1">
                          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D]">
                            {item.product.purity}
                          </span>
                          <Link
                            href={`/product/${item.product.slug}`}
                            className="block font-serif text-lg text-[#24211E] hover:text-[#C5A46D] transition-colors leading-tight"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-xs font-sans text-[#706860]">
                            {item.selectedMetal || item.product.material} &bull; Size {item.selectedSize || "Standard"}
                          </p>
                          <p className="text-xs font-sans font-medium text-[#24211E]">
                            {formatPrice(item.product.price)} each
                          </p>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1EAE0]">
                          {/* Quantity Counter */}
                          <div className="flex items-center border border-[#E8E1D7] rounded-[2px] bg-[#FAF8F5] h-9">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="w-8 h-full flex items-center justify-center text-xs text-[#706860] hover:text-[#24211E] disabled:opacity-30 cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-xs font-sans font-semibold text-[#24211E]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              aria-label="Increase quantity"
                              className="w-8 h-full flex items-center justify-center text-xs text-[#706860] hover:text-[#24211E] cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line Total */}
                          <span className="font-sans font-semibold text-sm sm:text-base text-[#24211E] w-24 text-right">
                            {formatPrice(lineTotal)}
                          </span>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label={`Remove ${item.product.name} from bag`}
                            className="text-[#A69A89] hover:text-red-700 transition-colors p-1 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
                    <Link
                      href="/collections/all"
                      className="text-xs font-sans text-[#C5A46D] hover:underline uppercase tracking-wider font-semibold flex items-center gap-1.5"
                    >
                      &larr; Continue Shopping
                    </Link>

                    <button
                      onClick={clearCart}
                      className="text-xs font-sans text-[#706860] hover:text-red-700 transition-colors cursor-pointer"
                    >
                      Clear All Items
                    </button>
                  </div>
                </div>

                {/* Right Column: Order Summary & Checkout */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="p-6 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_4px_24px_rgba(36,33,30,0.03)] space-y-5">
                    <h2 className="font-serif text-xl font-light text-[#24211E] border-b border-[#F1EAE0] pb-3">
                      Order Summary
                    </h2>

                    {/* Summary Lines */}
                    <div className="space-y-2.5 text-xs font-sans">
                      <div className="flex justify-between text-[#706860]">
                        <span>Subtotal ({cartCount} items)</span>
                        <span className="font-medium text-[#24211E]">{formatPrice(subtotal)}</span>
                      </div>

                      {appliedDiscountPercent && (
                        <div className="flex justify-between text-emerald-700">
                          <span>Privilege Savings ({appliedDiscountPercent}%)</span>
                          <span>-{formatPrice(discountAmount)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-[#706860]">
                        <span>Insured Doorstep Courier</span>
                        <span>
                          {shippingFee === 0 ? (
                            <span className="text-emerald-700 uppercase font-medium text-[11px]">Free</span>
                          ) : (
                            formatPrice(shippingFee)
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between text-[#706860]">
                        <span>Applicable Jewellery GST (3%)</span>
                        <span className="text-[11px] text-[#A69A89]">Included in price</span>
                      </div>

                      <div className="border-t border-[#E8E1D7] pt-3 flex justify-between items-baseline">
                        <span className="text-sm font-semibold uppercase tracking-wider text-[#24211E]">
                          Total Due
                        </span>
                        <span className="text-2xl font-sans font-bold text-[#24211E]">
                          {formatPrice(grandTotal)}
                        </span>
                      </div>
                    </div>

                    {/* Coupon Code Input */}
                    <form onSubmit={handleApplyCoupon} className="space-y-1.5 pt-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="w-3.5 h-3.5 text-[#A69A89] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Promo Code (try AURAVIA10)"
                            className="w-full h-9 pl-9 pr-2 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D] uppercase"
                          />
                        </div>
                        <button
                          type="submit"
                          className="h-9 px-3.5 bg-[#24211E] text-[#F8F5EF] text-xs font-sans font-medium uppercase tracking-wider rounded-[2px] hover:bg-[#38332E] cursor-pointer"
                        >
                          Apply
                        </button>
                      </div>

                      {couponMessage && (
                        <p
                          className={`text-[11px] font-sans ${
                            couponMessage.isError ? "text-red-600" : "text-emerald-700"
                          }`}
                        >
                          {couponMessage.text}
                        </p>
                      )}
                    </form>

                    {/* Checkout CTA */}
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={() => setIsCheckoutModalOpen(true)}
                      icon={<Lock className="w-4 h-4 text-[#C5A46D]" />}
                    >
                      Proceed to Insured Checkout
                    </Button>

                    <Link href="/collections/all" className="block text-center pt-1">
                      <span className="text-xs font-sans text-[#706860] hover:text-[#C5A46D] underline">
                        Continue Browsing Jewels
                      </span>
                    </Link>

                    {/* Trust Assurances */}
                    <div className="pt-3 border-t border-[#F1EAE0] space-y-2 text-[11px] font-sans text-[#706860]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#C5A46D] flex-shrink-0" />
                        <span>BIS Hallmarked Jewellery &bull; SGL Certified Solitaires</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#C5A46D] flex-shrink-0" />
                        <span>Tamper-Proof Steel Reinforced Transit Box</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Product Suggestions (when cart has items) */}
            <section className="space-y-6 pt-10 border-t border-[#E8E1D7]">
              <div className="flex flex-col sm:flex-row justify-between items-baseline gap-2">
                <div>
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D] block">
                    Curated Pairings
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#24211E]">
                    Complete Your Ensemble
                  </h2>
                </div>
                <Link
                  href="/collections/all"
                  className="text-xs font-sans text-[#C5A46D] hover:underline uppercase tracking-wider font-semibold"
                >
                  View All Creations &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedSuggestions.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Simulated Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="max-w-lg w-full bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_16px_48px_rgba(36,33,30,0.18)] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E8E1D7] flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D]">
                  Simulated Demo Checkout
                </span>
                <h3 className="font-serif text-xl text-[#24211E]">
                  Complete Your Fine Jewellery Order
                </h3>
              </div>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-[#706860] hover:text-[#24211E] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSimulateOrder} className="p-5 sm:p-6 space-y-4 overflow-y-auto">
              <div className="p-2.5 bg-[#FAF8F5] border border-[#C5A46D]/40 rounded-[2px] text-xs font-sans text-[#706860] leading-relaxed">
                <strong className="text-[#24211E] uppercase text-[10px] block">Demo Mode Notice:</strong>
                This checkout flow demonstrates the complete customer journey. No real funds will be charged and no real transaction takes place.
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div>
                  <label className="block text-[#4D4742] uppercase text-[10px] font-semibold mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    className="w-full h-10 px-3 border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4D4742] uppercase text-[10px] font-semibold mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.phone}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                      className="w-full h-10 px-3 border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4D4742] uppercase text-[10px] font-semibold mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutForm.email}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                      className="w-full h-10 px-3 border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#4D4742] uppercase text-[10px] font-semibold mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    className="w-full h-10 px-3 border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#4D4742] uppercase text-[10px] font-semibold mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.city}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                      className="w-full h-10 px-3 border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#4D4742] uppercase text-[10px] font-semibold mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={checkoutForm.pincode}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, pincode: e.target.value })}
                      className="w-full h-10 px-3 border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div>
                  <label className="block text-[#4D4742] uppercase text-[10px] font-semibold mb-1.5">
                    Select Simulated Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "upi", label: "Instant UPI" },
                      { id: "cards", label: "Credit / Debit" },
                      { id: "netbanking", label: "Net Banking" },
                    ].map((pm) => (
                      <button
                        type="button"
                        key={pm.id}
                        onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: pm.id })}
                        className={`p-2.5 rounded-[2px] border text-xs font-sans text-center cursor-pointer transition-all ${
                          checkoutForm.paymentMethod === pm.id
                            ? "border-[#24211E] bg-[#FAF8F5] font-semibold"
                            : "border-[#E8E1D7] hover:border-[#A69A89]"
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E8E1D7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#A69A89] block uppercase">Final Amount</span>
                  <span className="font-sans font-bold text-lg text-[#24211E]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
                <Button variant="gold" size="lg" type="submit">
                  Place Demo Order &rarr;
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
