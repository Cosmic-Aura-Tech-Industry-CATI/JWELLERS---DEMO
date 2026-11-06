"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface CollectionHeaderProps {
  slug: string;
  searchQuery?: string;
}

const categoryNavChips = [
  { id: "all", label: "Shop All", href: "/collections/all" },
  { id: "earrings", label: "Earrings", href: "/collections/earrings" },
  { id: "rings", label: "Rings & Solitaires", href: "/collections/rings" },
  { id: "necklaces", label: "Necklaces", href: "/collections/necklaces" },
  { id: "bracelets", label: "Bracelets", href: "/collections/bracelets" },
  { id: "pendants", label: "Pendants", href: "/collections/pendants" },
  { id: "mens", label: "Men's Sovereign", href: "/collections/mens" },
  { id: "gifts", label: "Curated Gifts", href: "/collections/gifts" },
  { id: "new-arrivals", label: "New Arrivals", href: "/collections/new-arrivals" },
];

const categoryMeta: Record<string, { title: string; subtitle: string }> = {
  all: {
    title: "The High Jewellery Vault",
    subtitle:
      "Explore certified solitaires, 18KT everyday fine jewellery, and 22KT royal heirlooms crafted by master artisans.",
  },
  earrings: {
    title: "Fine Earrings & Jhumkas",
    subtitle:
      "From brilliant solitaire diamond studs to traditional uncut polki chandbalis and everyday gold huggies.",
  },
  rings: {
    title: "Solitaires & Stackable Bands",
    subtitle:
      "IGI certified natural diamond rings, contoured tri-color stacking bands, and statement cocktail rings.",
  },
  necklaces: {
    title: "Necklaces & Heritage Chokers",
    subtitle:
      "Royal 22KT Kundan choker suites, Zambian emerald accents, and everyday floating solitaire chains.",
  },
  bracelets: {
    title: "Bracelets & Royal Kadas",
    subtitle:
      "Continuous round brilliant tennis strands, hand-carved gold kadas, and minimalist everyday cuffs.",
  },
  pendants: {
    title: "Solitaire & Heritage Pendants",
    subtitle:
      "Sacred motifs and delicate solitaire drops designed for timeless grace and effortless layering.",
  },
  mens: {
    title: "Men's Sovereign Collection",
    subtitle:
      "Solid 22KT traditional kadas, brushed onyx signet rings, and precision-engineered platinum cufflinks.",
  },
  gifts: {
    title: "Curated Luxury Keepsakes",
    subtitle:
      "Anniversary solitaires and celebratory sets delivered in velvet presentation boxes with bespoke wax-sealed notes.",
  },
  "new-arrivals": {
    title: "New Seasonal Arrivals",
    subtitle:
      "The newest contemporary silhouettes, limited-edition bridal suites, and modern stacking collections.",
  },
};

export const CollectionHeader: React.FC<CollectionHeaderProps> = ({
  slug,
  searchQuery,
}) => {
  const meta = categoryMeta[slug] || {
    title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} Vault`,
    subtitle: "Discover certified fine jewellery handcrafted with BIS hallmarking.",
  };

  return (
    <div className="border-b border-[#E8E1D7] bg-[#FFFFFF]">
      {/* 1. Breadcrumbs */}
      <div className="py-3 px-4 sm:px-6 lg:px-8 border-b border-[#F1EAE0]">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-sans text-[#706860] overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-[#C5A46D] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89] flex-shrink-0" />
          <Link
            href="/collections/all"
            className="hover:text-[#C5A46D] transition-colors"
          >
            Collections
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89] flex-shrink-0" />
          <span className="text-[#24211E] font-medium uppercase tracking-wider text-[11px]">
            {slug.replace("-", " ")}
          </span>
          {searchQuery && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-[#A69A89] flex-shrink-0" />
              <span className="text-[#C5A46D] italic">
                &ldquo;{searchQuery}&rdquo;
              </span>
            </>
          )}
        </div>
      </div>

      {/* 2. Category Title & Short Luxury Description */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 text-center">
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              {searchQuery ? "Search Results" : "Auravia Collection Vault"}
            </span>
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#24211E] tracking-tight">
            {searchQuery ? `Pieces matching “${searchQuery}”` : meta.title}
          </h1>

          <p className="font-sans text-xs sm:text-sm font-light text-[#706860] leading-relaxed max-w-2xl mx-auto">
            {meta.subtitle}
          </p>
        </div>

        {/* 3. Category Navigation Chips */}
        <div className="mt-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryNavChips.map((chip) => {
            const isActive = slug === chip.id;
            return (
              <Link
                key={chip.id}
                href={chip.href}
                className={`
                  px-3.5 py-1.5 text-xs font-sans font-medium uppercase tracking-[0.16em] rounded-[2px] whitespace-nowrap transition-all duration-200 border
                  ${
                    isActive
                      ? "bg-[#24211E] text-[#F8F5EF] border-[#24211E]"
                      : "bg-[#FAF8F5] text-[#706860] border-[#E8E1D7] hover:border-[#C5A46D] hover:text-[#24211E]"
                  }
                `}
              >
                {chip.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
