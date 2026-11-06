"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { Product } from "@/types/product";
import { ProductGallery } from "./ProductGallery";
import { ProductInfo } from "./ProductInfo";
import { RelatedProducts } from "./RelatedProducts";

interface ProductPageClientProps {
  product: Product;
}

export const ProductPageClient: React.FC<ProductPageClientProps> = ({
  product,
}) => {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E] flex flex-col selection:bg-[#C5A46D]/20 selection:text-[#24211E]">
      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8E1D7] bg-[#FFFFFF] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-sans text-[#706860] overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#C5A46D] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89] flex-shrink-0" />
          <Link href="/collections/all" className="hover:text-[#C5A46D] transition-colors">
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89] flex-shrink-0" />
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-[#C5A46D] transition-colors capitalize"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89] flex-shrink-0" />
          <span className="text-[#24211E] font-medium truncate max-w-xs sm:max-w-sm">
            {product.name}
          </span>
        </div>
      </div>

      {/* Main PDP Stage */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1">
        {/* Two-Column Master Vitrine Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Product Image Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Title, Pricing, Actions, Accordions */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Bottom Recommendations: Related & Recently Viewed */}
        <RelatedProducts currentProduct={product} />
      </main>

      {/* Trust Assurance Ribbon */}
      <div className="border-t border-[#E8E1D7] bg-[#FFFFFF] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-[#706860]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C5A46D]" /> BIS 6-Digit HUID Hallmarked
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/60" />
          <span>100% Certified Natural Diamonds</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/60" />
          <span>Insured Transit</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/60" />
          <span>Lifetime Exchange Guarantee</span>
        </div>
      </div>
    </div>
  );
};
