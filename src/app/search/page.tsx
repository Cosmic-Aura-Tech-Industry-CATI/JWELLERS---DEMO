"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/Button";
import { mockProducts } from "@/data/mockProducts";
import { SortOption } from "@/types/product";
import {
  Search,
  X,
  ChevronRight,
  ArrowUpDown,
  Tag,
} from "lucide-react";

const popularTags = [
  "Solitaire",
  "Diamond",
  "18KT Gold",
  "Rings",
  "Necklaces",
  "Earrings",
  "Bracelets",
  "Pendants",
  "Emerald",
  "Men's",
  "Bestseller",
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || searchParams.get("search") || "";
  const [query, setQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const handleQueryChange = (val: string) => {
    setQuery(val);
  };

  const handleClear = () => {
    setQuery("");
    router.replace("/search");
  };

  const handleTagClick = (tag: string) => {
    setQuery(tag);
    router.replace(`/search?q=${encodeURIComponent(tag)}`);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.replace(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.replace("/search");
    }
  };

  // Comprehensive multi-field matching engine
  const matchedProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockProducts; // Return full collection when search is cleared

    return mockProducts.filter((product) => {
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchSubcategory = product.subcategory.toLowerCase().includes(q);
      const matchMaterial = product.material.toLowerCase().includes(q);
      const matchMetal = product.metal.toLowerCase().includes(q);
      const matchKarat = product.karat.toLowerCase().includes(q);
      const matchPurity = product.purity.toLowerCase().includes(q);
      const matchStyle = product.style.toLowerCase().includes(q);
      const matchColour = product.colour.toLowerCase().includes(q);
      const matchBadge = product.badge ? product.badge.toLowerCase().includes(q) : false;
      const matchDiamond = product.diamondSpec
        ? product.diamondSpec.toLowerCase().includes(q)
        : false;
      const matchSubtitle = product.subtitle
        ? product.subtitle.toLowerCase().includes(q)
        : false;

      // Semantic aliases (e.g. "diamonds" matches "diamond", "men" matches "mens")
      const matchAliases =
        (q.includes("diamond") && (product.diamondSpec || product.name.toLowerCase().includes("diamond"))) ||
        (q.includes("gold") && product.metal.toLowerCase().includes("gold")) ||
        (q.includes("men") && product.category === "mens") ||
        (q.includes("gift") && product.isGiftPick) ||
        (q.includes("new") && product.isNewArrival);

      return (
        matchName ||
        matchCategory ||
        matchSubcategory ||
        matchMaterial ||
        matchMetal ||
        matchKarat ||
        matchPurity ||
        matchStyle ||
        matchColour ||
        matchBadge ||
        matchDiamond ||
        matchSubtitle ||
        matchAliases
      );
    });
  }, [query]);

  // Apply Sorting
  const sortedProducts = useMemo(() => {
    const list = [...matchedProducts];
    switch (sortBy) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating":
        return list.sort((a, b) => b.rating - a.rating);
      case "newest":
        return list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
      default:
        return list;
    }
  }, [matchedProducts, sortBy]);

  const fallbackRecommendations = mockProducts.slice(0, 4);

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
          <span className="text-[#24211E] font-medium">Search Salon</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1 space-y-10">
        {/* Search Header Banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Explore The Vault
            </span>
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E]">
            Search Fine Jewellery
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#706860]">
            Search by precious metal, solitaire cut, karat purity, jewellery style or gifting occasion.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="max-w-3xl mx-auto w-full space-y-4">
          <form
            onSubmit={handleFormSubmit}
            className="relative flex items-center bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_4px_20px_rgba(36,33,30,0.04)] focus-within:border-[#C5A46D] transition-colors"
          >
            <div className="pl-4 text-[#C5A46D] pointer-events-none">
              <Search className="w-5 h-5" />
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Search for solitaire rings, diamond chokers, 18KT gold, bracelets..."
              className="w-full h-14 pl-3 pr-24 font-serif text-base sm:text-lg text-[#24211E] bg-transparent outline-none placeholder:text-[#A69A89] placeholder:font-sans placeholder:text-sm"
            />

            <div className="absolute right-3 flex items-center gap-2">
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="p-1.5 text-[#A69A89] hover:text-[#24211E] transition-colors rounded-full hover:bg-[#FAF8F5] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              <button
                type="submit"
                className="h-9 px-4 bg-[#24211E] hover:bg-[#38332E] text-[#F8F5EF] text-xs font-sans font-medium uppercase tracking-wider rounded-[2px] transition-colors cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Quick Filter Tags / Suggestions */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#A69A89] flex items-center gap-1">
              <Tag className="w-3 h-3 text-[#C5A46D]" /> Popular:
            </span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`px-2.5 py-1 text-xs font-sans rounded-[2px] border transition-colors cursor-pointer ${
                  query.toLowerCase() === tag.toLowerCase()
                    ? "bg-[#24211E] text-[#F8F5EF] border-[#24211E]"
                    : "bg-[#FFFFFF] text-[#4D4742] border-[#E8E1D7] hover:border-[#C5A46D]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Bar (Count, Active Search Filter, Sort By) */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 border-y border-[#E8E1D7]">
          <div className="flex items-center gap-2 text-xs font-sans text-[#706860]">
            <span>
              Showing <strong className="text-[#24211E]">{sortedProducts.length}</strong> {sortedProducts.length === 1 ? "piece" : "pieces"}
            </span>
            {query && (
              <>
                <span>&bull;</span>
                <span className="text-[#24211E]">
                  Filtered by &ldquo;<strong className="text-[#C5A46D]">{query}</strong>&rdquo;
                </span>
                <button
                  onClick={handleClear}
                  className="text-xs text-[#A69A89] hover:text-red-700 underline ml-1 cursor-pointer"
                >
                  (Reset)
                </button>
              </>
            )}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 text-xs font-sans">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#A69A89]" />
            <span className="text-[#706860] uppercase text-[10px] font-semibold tracking-wider">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-8 px-2.5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[2px] text-xs font-sans text-[#24211E] outline-none focus:border-[#C5A46D] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>
        </div>

        {/* Results Grid or Empty State */}
        {sortedProducts.length === 0 ? (
          /* Empty Search State */
          <div className="space-y-16 py-8">
            <div className="max-w-md mx-auto text-center space-y-4 py-12 px-6 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_4px_24px_rgba(36,33,30,0.03)]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF8F5] border border-[#E8E1D7] flex items-center justify-center text-[#A69A89]">
                <Search className="w-7 h-7 text-[#C5A46D]" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D]">
                  Zero Matches
                </span>
                <h3 className="font-serif text-2xl font-light text-[#24211E]">
                  No Creations Found
                </h3>
                <p className="font-sans text-xs text-[#706860] leading-relaxed">
                  We could not find any fine jewellery matching &ldquo;{query}&rdquo;.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                <Button variant="primary" size="sm" onClick={handleClear}>
                  Clear Search Filter
                </Button>
                <Link href="/collections/all">
                  <Button variant="secondary" size="sm">
                    View All Jewels
                  </Button>
                </Link>
              </div>
            </div>

            {/* Recommendations below Empty Search */}
            <section className="space-y-6 pt-4">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
                  Recommended For You
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#24211E]">
                  Explore Our Salon Bestsellers
                </h2>
                <p className="text-xs font-sans text-[#706860]">
                  Handcrafted solitaires and hallmark certified creations ready for immediate delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {fallbackRecommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Matched Results Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function SearchLoading() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E] flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto w-full px-4 py-20 flex-1 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-[#C5A46D] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg text-[#24211E]">Searching Auravia Vault...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchPageContent />
    </Suspense>
  );
}
