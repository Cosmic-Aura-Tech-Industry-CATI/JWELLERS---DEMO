"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";
import { Product } from "@/types/product";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularSearches = [
  "Solitaire Ring",
  "Emerald Choker",
  "Stackable Bands",
  "Tennis Bracelet",
  "Polki Earrings",
  "Men's Gold Kada",
  "22KT BIS Hallmarked",
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  // Derive results directly via useMemo without cascading setState in an effect
  const results: Product[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();
    return mockProducts.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.metal.toLowerCase().includes(q) ||
        p.purity.toLowerCase().includes(q) ||
        p.karat.toLowerCase().includes(q) ||
        (p.subtitle && p.subtitle.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleClose();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectPopular = (term: string) => {
    setQuery(term);
    handleClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211E]/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Top Search Modal Box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search Fine Jewellery"
        className="relative w-full bg-[#FAF8F5] border-b border-[#E8E1D7] shadow-2xl z-10 max-h-[85vh] flex flex-col animate-in slide-in-from-top duration-300"
      >
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 space-y-6">
          {/* Top Form Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D7]">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#A69A89]">
              Search Auravia Vault
            </span>
            <button
              onClick={handleClose}
              aria-label="Close search"
              className="p-1 text-[#706860] hover:text-[#24211E] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <Search className="w-6 h-6 text-[#C5A46D] absolute left-0" />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by jewellery category, metal, diamond spec, or occasion..."
              className="w-full pl-10 pr-10 py-3 bg-transparent font-serif text-xl sm:text-2xl text-[#24211E] placeholder:text-[#A69A89] border-b border-[#C5A46D] outline-none focus:border-[#24211E] transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-0 p-1 text-[#A69A89] hover:text-[#24211E]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Popular Search Suggestions (when query is empty) */}
          {!query && (
            <div className="space-y-3 pt-2">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" /> Popular Searches
              </span>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => handleSelectPopular(term)}
                    className="px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-[0.14em] bg-[#FFFFFF] border border-[#E8E1D7] text-[#24211E] rounded-[2px] hover:border-[#C5A46D] hover:text-[#C5A46D] transition-colors cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Live Search Results */}
          {query && (
            <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
              <div className="flex items-center justify-between text-xs font-sans text-[#706860]">
                <span>{results.length} results found for &ldquo;{query}&rdquo;</span>
                {results.length > 0 && (
                  <button
                    onClick={handleSearchSubmit}
                    className="text-[#C5A46D] font-medium hover:underline inline-flex items-center gap-1"
                  >
                    <span>View all matching results</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <p className="font-serif text-xl text-[#24211E]">
                    No pieces matched your search
                  </p>
                  <p className="font-sans text-xs text-[#706860]">
                    Try searching for &ldquo;Solitaire&rdquo;, &ldquo;18KT Gold&rdquo;, or &ldquo;Emerald&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={handleClose}
                      className="flex items-center gap-3 p-2 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[2px] hover:border-[#C5A46D] transition-all group"
                    >
                      <div className="relative w-14 h-16 bg-[#FAF8F5] rounded-[2px] overflow-hidden flex-shrink-0">
                        <Image
                          src={product.primaryImage}
                          alt={product.name}
                          fill
                          sizes="60px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.16em] text-[#C5A46D] block">
                          {product.karat} • {product.metal}
                        </span>
                        <h4 className="font-serif text-sm text-[#24211E] truncate group-hover:text-[#C5A46D] transition-colors">
                          {product.name}
                        </h4>
                        <span className="font-sans text-xs font-semibold text-[#24211E]">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
