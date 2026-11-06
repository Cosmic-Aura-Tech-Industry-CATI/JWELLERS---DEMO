"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Product } from "@/types/product";
import { ZoomIn, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface ProductGalleryProps {
  product: Product;
}

// Category-specific high-resolution macro photography angles for the luxury vitrine
const editorialMacroAngles: Record<string, string[]> = {
  rings: [
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1200&q=85",
  ],
  necklaces: [
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1611591475836-6c174bf940a0?auto=format&fit=crop&w=1200&q=85",
  ],
  earrings: [
    "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=85",
  ],
  bracelets: [
    "https://images.unsplash.com/photo-1611591475836-6c174bf940a0?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1200&q=85",
  ],
  mens: [
    "https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1611591475836-6c174bf940a0?auto=format&fit=crop&w=1200&q=85",
  ],
};

const defaultBackups = [
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=85",
];

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product }) => {
  // Assemble a deduplicated list of up to 4 high-definition photos
  const fallbackList =
    editorialMacroAngles[product.category] || defaultBackups;

  const rawImages = [
    product.primaryImage,
    ...(product.secondaryImage ? [product.secondaryImage] : []),
    ...(product.images || []),
    ...fallbackList,
  ].filter(Boolean);

  // Deduplicate while preserving order
  const galleryImages = Array.from(new Set(rawImages)).slice(0, 4);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mobile Touch Gestures
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, [galleryImages.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 45; // px

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next
      handleNext();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
  };

  return (
    <div
      className="flex flex-col-reverse md:flex-row gap-4 sm:gap-6 items-start outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label="Product image gallery"
    >
      {/* 1. Thumbnail Navigation Strip (Vertical on Desktop, Horizontal Touch-Scroller on Mobile) */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-20 flex-shrink-0 pb-1 md:pb-0 scrollbar-none">
        {galleryImages.map((img, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              onMouseEnter={() => setActiveIndex(idx)}
              aria-label={`Select angle ${idx + 1} of ${galleryImages.length}`}
              className={`
                relative w-16 h-20 sm:w-20 sm:h-24 rounded-[2px] overflow-hidden bg-[#FAF8F5] border transition-all duration-200 flex-shrink-0 cursor-pointer
                ${
                  isActive
                    ? "border-[#C5A46D] ring-2 ring-[#C5A46D]/30"
                    : "border-[#E8E1D7] hover:border-[#A69A89] opacity-80 hover:opacity-100"
                }
              `}
            >
              <Image
                src={img}
                alt={`${product.name} angle ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
            </button>
          );
        })}
      </div>

      {/* 2. Main Large Visual Stage (4:5 Aspect Ratio, Zero Layout Shift) */}
      <div className="flex-1 w-full flex flex-col gap-3">
        <div
          className="relative aspect-[4/5] w-full bg-[#FAF8F5] border border-[#E8E1D7] rounded-[3px] overflow-hidden group select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Visual Image */}
          <Image
            src={galleryImages[activeIndex]}
            alt={`${product.name} detailed view angle ${activeIndex + 1}`}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 768px) 100vw, 55vw"
            onLoad={() => setIsLoaded(true)}
            className={`
              object-cover object-center transition-all duration-500 ease-out
              ${isLoaded ? "opacity-100" : "opacity-0"}
              ${
                isZoomed
                  ? "scale-150 cursor-zoom-out"
                  : "group-hover:scale-105 cursor-zoom-in"
              }
            `}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* Badges on Top Left */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10 pointer-events-none">
            {product.badge && (
              <Badge
                variant={
                  product.badge === "Hallmarked"
                    ? "hallmark"
                    : product.badge === "Bestseller"
                    ? "gold"
                    : "subtle"
                }
                size="sm"
              >
                {product.badge}
              </Badge>
            )}
            <span className="text-[10px] font-sans font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-[#FFFFFF]/95 backdrop-blur-xs text-[#24211E] border border-[#E8E1D7] rounded-[2px] shadow-xs">
              {product.karat} &bull; {product.purity}
            </span>
          </div>

          {/* Navigation Arrows (Prev / Next) */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E8E1D7] text-[#24211E] flex items-center justify-center shadow-xs transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#24211E]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] border border-[#E8E1D7] text-[#24211E] flex items-center justify-center shadow-xs transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-[#24211E]" />
              </button>
            </>
          )}

          {/* Zoom & Inspect Hint */}
          <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E8E1D7] rounded-[2px] flex items-center gap-1.5 text-[10px] font-sans text-[#706860] pointer-events-none">
            <ZoomIn className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>{isZoomed ? "Click to reset" : "Click to zoom"}</span>
          </div>

          {/* Hallmarking Macro Hallmark Seal Watermark Indicator */}
          <div className="absolute bottom-4 left-4 z-10 px-2 py-0.5 bg-[#FAF8F5]/90 backdrop-blur-xs border border-[#E8E1D7]/80 rounded-[2px] flex items-center gap-1 text-[9px] font-sans uppercase tracking-[0.16em] text-[#706860] pointer-events-none">
            <Sparkles className="w-3 h-3 text-[#C5A46D]" />
            <span>BIS Hallmarked Macro</span>
          </div>
        </div>

        {/* 3. Mobile Dot Indicators & Swipe Hint (Visible on small screens) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 py-1">
          {galleryImages.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setActiveIndex(dotIdx)}
              aria-label={`Jump to image ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === dotIdx
                  ? "w-6 bg-[#C5A46D]"
                  : "w-1.5 bg-[#E8E1D7] hover:bg-[#A69A89]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
