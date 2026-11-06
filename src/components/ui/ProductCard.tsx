"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye, Check, Star } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "./Badge";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  className?: string;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  className = "",
  priority = false,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const discountPercent =
    product.discountPercentage ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product, 1);
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      className={`
        group relative flex flex-col bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px]
        overflow-hidden transition-all duration-300 ease-out hover:border-[#C5A46D]/70
        hover:shadow-[0_8px_24px_-4px_rgba(36,33,30,0.06)]
        ${className}
      `}
    >
      {/* Editorial Image Container (Consistent 4:5 Aspect Ratio) */}
      <Link
        href={`/product/${product.slug || product.id}`}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5] block"
      >
        {/* Main Product Image */}
        <Image
          src={product.primaryImage}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={`
            object-cover object-center transition-all duration-700 ease-out
            ${
              product.secondaryImage
                ? "group-hover:opacity-0"
                : "group-hover:scale-105"
            }
          `}
        />

        {/* Secondary Detail Image (on hover if exists) */}
        {product.secondaryImage && (
          <Image
            src={product.secondaryImage}
            alt={`${product.name} alternate angle`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover object-center absolute inset-0 opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
          />
        )}

        {/* Top Badges (Karat, Status, Discount) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <Badge
              variant={
                product.badge === "Hallmarked"
                  ? "hallmark"
                  : product.badge === "Bestseller"
                  ? "gold"
                  : product.badge === "Sale"
                  ? "editorial"
                  : "subtle"
              }
              size="sm"
            >
              {product.badge}
            </Badge>
          )}

          <div className="flex items-center gap-1">
            <span className="text-[10px] font-sans font-semibold tracking-[0.16em] uppercase px-2 py-0.5 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#24211E] border border-[#E8E1D7] rounded-[2px]">
              {product.karat}
            </span>

            {discountPercent && (
              <span className="text-[9px] font-sans font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-[#24211E] text-[#F8F5EF] rounded-[2px]">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-[2px] bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E8E1D7] flex items-center justify-center text-[#24211E] hover:text-[#C5A46D] transition-colors duration-200 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              isWishlisted
                ? "fill-[#C5A46D] text-[#C5A46D] scale-110"
                : "text-[#24211E] hover:scale-110"
            }`}
          />
        </button>

        {/* Quick View trigger on hover */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label="Quick View"
            className="absolute bottom-12 right-3 z-10 w-8 h-8 rounded-[2px] bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E8E1D7] hidden md:flex items-center justify-center text-[#24211E] opacity-0 group-hover:opacity-100 hover:text-[#C5A46D] transition-all duration-300 cursor-pointer"
          >
            <Eye className="w-4 h-4" />
          </button>
        )}

        {/* Desktop Quick Add Bar (Slides up on card hover) */}
        <div className="absolute inset-x-0 bottom-0 p-2.5 z-10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out hidden md:block">
          <button
            onClick={handleQuickAdd}
            className={`
              w-full h-10 px-4 text-xs font-sans font-medium uppercase tracking-[0.18em] rounded-[2px]
              flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer
              ${
                isAdded
                  ? "bg-[#C5A46D] text-[#FFFFFF]"
                  : "bg-[#24211E] text-[#F8F5EF] hover:bg-[#38332E]"
              }
            `}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Information Details */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-[#FFFFFF]">
        <div className="space-y-1">
          {/* Material & Style */}
          <div className="flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.18em] text-[#A69A89]">
            <span>{product.material || product.metal}</span>
            {product.style && (
              <span className="text-[10px] lowercase tracking-normal text-[#706860]">
                {product.style}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={`/product/${product.slug || product.id}`}>
            <h3 className="font-serif text-lg font-normal text-[#24211E] leading-snug line-clamp-1 group-hover:text-[#C5A46D] transition-colors duration-200">
              {product.name}
            </h3>
          </Link>

          {/* Specification / Weight / Diamonds */}
          <div className="flex items-center justify-between text-[11px] font-sans text-[#706860] pt-0.5">
            <span className="truncate">{product.diamondSpec || product.grossWeight}</span>
            {product.rating && (
              <span className="flex items-center gap-1 text-[11px] font-sans text-[#24211E] flex-shrink-0">
                <Star className="w-3 h-3 fill-[#C5A46D] text-[#C5A46D]" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-[#A69A89]">({product.reviewCount})</span>
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Mobile Quick Add */}
        <div className="pt-3 mt-2 border-t border-[#F1EAE0] flex items-center justify-between">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="font-sans text-base font-semibold text-[#24211E] tracking-tight">
              {formattedPrice}
            </span>
            {formattedOriginalPrice && (
              <span className="font-sans text-xs line-through text-[#A69A89]">
                {formattedOriginalPrice}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Icon */}
          <button
            onClick={handleQuickAdd}
            aria-label="Add to cart"
            className="md:hidden w-8 h-8 rounded-[2px] bg-[#FAF8F5] border border-[#E8E1D7] flex items-center justify-center text-[#24211E] active:bg-[#C5A46D] active:text-white"
          >
            {isAdded ? (
              <Check className="w-3.5 h-3.5 text-[#C5A46D]" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
