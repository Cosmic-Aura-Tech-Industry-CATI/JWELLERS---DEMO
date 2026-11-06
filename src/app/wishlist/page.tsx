"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { mockProducts } from "@/data/mockProducts";
import { Heart, ChevronRight, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, moveToCart, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1, undefined, undefined, false);
    });
    clearWishlist();
  };

  const suggestions = mockProducts.slice(0, 4);

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
          <span className="text-[#24211E] font-medium uppercase tracking-wider text-[11px]">
            Your Private Wishlist &bull; {wishlist.length} {wishlist.length === 1 ? "Piece" : "Pieces"}
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-1 space-y-14">
        {/* Page Title & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-[#E8E1D7]">
          <div className="text-center sm:text-left space-y-1">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Personal Salon Vault
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E]">
              Your Saved Heirlooms
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#706860]">
              Review, compare, and transfer your curated fine jewellery pieces directly into your bag.
            </p>
          </div>

          {wishlist.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={clearWishlist}
                className="text-xs font-sans text-[#706860] hover:text-red-700 transition-colors cursor-pointer"
              >
                Clear All
              </button>
              <Button
                variant="primary"
                onClick={handleMoveAllToCart}
                icon={<ShoppingBag className="w-4 h-4 text-[#C5A46D]" />}
              >
                Move All to Bag
              </Button>
            </div>
          )}
        </div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="space-y-16">
            <div className="text-center py-16 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-4 max-w-lg mx-auto p-8 shadow-[0_4px_24px_rgba(36,33,30,0.03)]">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] border border-[#E8E1D7] flex items-center justify-center text-[#C5A46D]">
                <Heart className="w-8 h-8 stroke-1" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D]">
                  No Pieces Saved
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#24211E]">
                  Your Wishlist is Currently Empty
                </h3>
                <p className="font-sans text-xs text-[#706860] leading-relaxed max-w-sm mx-auto">
                  Click the heart icon on any solitaire ring, necklace, or bracelet to save it here for private viewing and comparison.
                </p>
              </div>
              <div className="pt-2">
                <Link href="/collections/all">
                  <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                    Explore Fine Jewellery
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recommendations below Empty Wishlist */}
            <section className="space-y-6 pt-4">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
                  Collector Favorites
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#24211E]">
                  Creations to Inspire Your Vault
                </h2>
                <p className="text-xs font-sans text-[#706860]">
                  Handcrafted solitaires and certified diamonds ready for immediate dispatch.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {suggestions.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Wishlist Items Grid with Move-to-Cart Action */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#C5A46D] hover:shadow-[0_8px_30px_rgba(36,33,30,0.06)]"
              >
                <div>
                  {/* Image Container with 4:5 aspect ratio */}
                  <Link
                    href={`/product/${product.slug}`}
                    className="relative aspect-[4/5] block bg-[#FAF8F5] overflow-hidden"
                  >
                    <Image
                      src={product.primaryImage}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    />

                    {/* Top Corner Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                      {product.badge && (
                        <span className="px-2 py-0.5 text-[9px] font-sans font-semibold uppercase tracking-wider bg-[#24211E] text-[#F8F5EF] rounded-[2px]">
                          {product.badge}
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-[9px] font-sans font-medium uppercase tracking-wider bg-[#FFFFFF]/90 text-[#24211E] border border-[#E8E1D7] rounded-[2px]">
                        {product.karat}
                      </span>
                    </div>

                    {/* Remove Wishlist Button in Top Right */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(product.id);
                      }}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E8E1D7] flex items-center justify-center text-[#24211E] hover:text-red-700 transition-colors shadow-xs cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </Link>

                  {/* Content Info */}
                  <div className="p-4 space-y-1.5">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#C5A46D] block">
                      {product.purity} &bull; {product.category}
                    </span>

                    <Link
                      href={`/product/${product.slug}`}
                      className="block font-serif text-base text-[#24211E] group-hover:text-[#C5A46D] transition-colors line-clamp-1"
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-baseline gap-2 pt-1">
                      <span className="font-sans font-semibold text-sm text-[#24211E]">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                      {product.originalPrice && (
                        <span className="font-sans text-xs text-[#A69A89] line-through">
                          ₹{product.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      {product.discountPercentage && (
                        <span className="text-[10px] font-sans font-semibold text-[#C5A46D]">
                          ({product.discountPercentage}% OFF)
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Move to Cart Action Button */}
                <div className="p-4 pt-0 border-t border-[#F1EAE0] mt-3">
                  <button
                    onClick={() => moveToCart(product, 1)}
                    className="w-full py-2.5 px-3 bg-[#24211E] hover:bg-[#38332E] text-[#F8F5EF] text-xs font-sans font-medium uppercase tracking-[0.14em] rounded-[2px] transition-colors flex items-center justify-center gap-2 cursor-pointer mt-3"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Move to Shopping Bag</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
