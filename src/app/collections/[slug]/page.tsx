"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { CollectionHeader } from "@/components/collection/CollectionHeader";
import { FilterSidebar } from "@/components/collection/FilterSidebar";
import { MobileFilterDrawer } from "@/components/collection/MobileFilterDrawer";
import { ActiveFilterBar } from "@/components/collection/ActiveFilterBar";
import { PaginationControls } from "@/components/collection/PaginationControls";
import { mockProducts } from "@/data/mockProducts";
import { FilterState, SortOption } from "@/types/product";
import { Sparkles, ShieldCheck } from "lucide-react";

function CollectionLoading() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#C5A46D] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#A69A89]">
            Accessing Auravia Vault...
          </span>
        </div>
      </div>
    </div>
  );
}

const PAGE_SIZE = 8;

function CollectionPageContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || "all";
  const searchQuery = searchParams.get("search") || "";

  // Mobile Filter Drawer Open/Close State
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  // Pagination / Load More
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    category: slug,
    priceRange: [0, 1000000],
    materials: [],
    colours: [],
    styles: [],
    availabilities: [],
  });

  const handleClearAll = () => {
    setFilters({
      category: slug,
      priceRange: [0, 1000000],
      materials: [],
      colours: [],
      styles: [],
      availabilities: [],
    });
    setVisibleCount(PAGE_SIZE);
    setCurrentPage(1);
  };

  const activeFilterCount =
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0) +
    filters.materials.length +
    filters.colours.length +
    filters.styles.length +
    filters.availabilities.length;

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((p) => {
        // 1. Slug / Category
        if (slug !== "all") {
          if (slug === "new-arrivals") {
            if (!p.isNewArrival) return false;
          } else if (slug === "gifts") {
            if (!p.isGiftPick && p.category !== "gifts") return false;
          } else if (p.category !== slug) {
            return false;
          }
        }

        // 2. Search query match
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matches =
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.metal.toLowerCase().includes(q) ||
            p.material.toLowerCase().includes(q) ||
            p.colour.toLowerCase().includes(q) ||
            p.style.toLowerCase().includes(q) ||
            p.purity.toLowerCase().includes(q) ||
            (p.subtitle && p.subtitle.toLowerCase().includes(q));
          if (!matches) return false;
        }

        // 3. Price range filter
        if (
          p.price < filters.priceRange[0] ||
          p.price > filters.priceRange[1]
        ) {
          return false;
        }

        // 4. Material filter
        if (
          filters.materials.length > 0 &&
          !filters.materials.includes(p.material)
        ) {
          return false;
        }

        // 5. Colour filter
        if (
          filters.colours.length > 0 &&
          !filters.colours.includes(p.colour)
        ) {
          return false;
        }

        // 6. Style filter
        if (
          filters.styles.length > 0 &&
          !filters.styles.includes(p.style)
        ) {
          return false;
        }

        // 7. Availability filter
        if (
          filters.availabilities.length > 0 &&
          !filters.availabilities.includes(p.availability)
        ) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        }
        return 0; // featured default
      });
  }, [slug, searchQuery, filters, sortBy]);

  // Paginated/Sliced subset
  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredProducts.length));
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setVisibleCount(newPage * PAGE_SIZE);
    window.scrollTo({ top: 380, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E] flex flex-col selection:bg-[#C5A46D]/20 selection:text-[#24211E]">
      <Header />

      {/* 1, 2, 3: Breadcrumbs, Category Title, Short Description & Nav Chips */}
      <CollectionHeader slug={slug} searchQuery={searchQuery} />

      {/* Main Browsing Workspace */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14 flex-1">
        <div className="flex gap-8 lg:gap-12 items-start">
          {/* 5. Desktop Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onClearAll={handleClearAll}
            hasActiveFilters={activeFilterCount > 0}
          />

          {/* 4, 6, 7, 8: Product Vitrine Area */}
          <div className="flex-1 min-w-0">
            {/* 4. Product Count, Active Chips, and Sorting Selector */}
            <ActiveFilterBar
              totalCount={mockProducts.length}
              filteredCount={filteredProducts.length}
              filters={filters}
              onFilterChange={setFilters}
              onClearAll={handleClearAll}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onOpenMobileFilters={() => setMobileDrawerOpen(true)}
              activeFilterCount={activeFilterCount}
            />

            {/* 7. Responsive Product Grid */}
            {displayedProducts.length === 0 ? (
              <div className="text-center py-24 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] p-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] border border-[#E8E1D7] flex items-center justify-center text-[#C5A46D]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl text-[#24211E]">
                  No creations match your filters
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#706860] max-w-sm mx-auto">
                  Try adjusting your price range, material purity, or style preferences to discover other pieces.
                </p>
                <button
                  onClick={handleClearAll}
                  className="mt-2 px-6 py-2.5 bg-[#24211E] text-[#F8F5EF] text-xs font-sans uppercase tracking-widest rounded-[2px] cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={idx < 4}
                  />
                ))}
              </div>
            )}

            {/* 8. Pagination or Load More Interaction */}
            {filteredProducts.length > 0 && (
              <PaginationControls
                totalItems={filteredProducts.length}
                visibleCount={visibleCount}
                onLoadMore={handleLoadMore}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                pageSize={PAGE_SIZE}
              />
            )}
          </div>
        </div>
      </main>

      {/* 6. Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
        onClearAll={handleClearAll}
        productCount={filteredProducts.length}
      />

      {/* Assurance Ribbon */}
      <div className="border-t border-[#E8E1D7] bg-[#FFFFFF] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-[11px] font-sans uppercase tracking-[0.2em] text-[#706860]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C5A46D]" /> BIS 6-Digit HUID Stamped
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/60" />
          <span>100% Certified Natural Diamonds</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/60" />
          <span>Complimentary Insured Transit</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]/60" />
          <span>Lifetime Exchange Guarantee</span>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense fallback={<CollectionLoading />}>
      <CollectionPageContent />
    </Suspense>
  );
}
