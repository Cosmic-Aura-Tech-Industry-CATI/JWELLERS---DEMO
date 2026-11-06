"use client";

import React from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { FilterState, SortOption } from "@/types/product";

interface ActiveFilterBarProps {
  totalCount: number;
  filteredCount: number;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onOpenMobileFilters: () => void;
  activeFilterCount: number;
}

export const ActiveFilterBar: React.FC<ActiveFilterBarProps> = ({
  totalCount,
  filteredCount,
  filters,
  onFilterChange,
  onClearAll,
  sortBy,
  onSortChange,
  onOpenMobileFilters,
  activeFilterCount,
}) => {
  const removeMaterial = (mat: string) => {
    onFilterChange({
      ...filters,
      materials: filters.materials.filter((m) => m !== mat),
    });
  };

  const removeColour = (col: string) => {
    onFilterChange({
      ...filters,
      colours: filters.colours.filter((c) => c !== col),
    });
  };

  const removeStyle = (st: string) => {
    onFilterChange({
      ...filters,
      styles: filters.styles.filter((s) => s !== st),
    });
  };

  const removeAvailability = (av: string) => {
    onFilterChange({
      ...filters,
      availabilities: filters.availabilities.filter((a) => a !== av),
    });
  };

  const resetPrice = () => {
    onFilterChange({
      ...filters,
      priceRange: [0, 1000000],
    });
  };

  const isPriceFiltered =
    filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000;

  return (
    <div className="space-y-4 mb-8">
      {/* Top Bar with Mobile Filter Button, Count, and Sort */}
      <div className="p-3.5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] flex flex-wrap items-center justify-between gap-4">
        {/* Left: Mobile Filter Button & Count */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileFilters}
            className="lg:hidden h-9 px-3.5 bg-[#24211E] text-[#F8F5EF] text-xs font-sans font-medium uppercase tracking-wider rounded-[2px] flex items-center gap-2 cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5 text-[#C5A46D]" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#C5A46D] text-[#FFFFFF] text-[9px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          <span className="text-xs font-sans text-[#706860]">
            Showing <strong>{filteredCount}</strong> of {totalCount} creations
          </span>
        </div>

        {/* Right: Sorting Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs font-sans text-[#A69A89] uppercase tracking-wider hidden sm:inline">
            Sort by:
          </label>
          <div className="relative">
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-9 pl-3 pr-8 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-[#24211E] appearance-none outline-none focus:border-[#C5A46D] cursor-pointer"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#A69A89] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.16em] text-[#A69A89] mr-1">
            Active:
          </span>

          {isPriceFiltered && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans text-[#24211E]">
              <span>
                ₹{filters.priceRange[0].toLocaleString("en-IN")} &ndash; ₹
                {filters.priceRange[1].toLocaleString("en-IN")}
              </span>
              <button
                onClick={resetPrice}
                aria-label="Remove price filter"
                className="text-[#A69A89] hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.materials.map((mat) => (
            <span
              key={mat}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans text-[#24211E]"
            >
              <span>{mat}</span>
              <button
                onClick={() => removeMaterial(mat)}
                aria-label={`Remove ${mat} filter`}
                className="text-[#A69A89] hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.colours.map((col) => (
            <span
              key={col}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans text-[#24211E]"
            >
              <span>{col}</span>
              <button
                onClick={() => removeColour(col)}
                aria-label={`Remove ${col} filter`}
                className="text-[#A69A89] hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.styles.map((st) => (
            <span
              key={st}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans text-[#24211E]"
            >
              <span>{st}</span>
              <button
                onClick={() => removeStyle(st)}
                aria-label={`Remove ${st} filter`}
                className="text-[#A69A89] hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          {filters.availabilities.map((av) => (
            <span
              key={av}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans text-[#24211E] capitalize"
            >
              <span>{av.replace("-", " ")}</span>
              <button
                onClick={() => removeAvailability(av)}
                aria-label={`Remove ${av} filter`}
                className="text-[#A69A89] hover:text-red-600"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={onClearAll}
            className="text-xs font-sans text-red-600 hover:underline uppercase tracking-wider ml-2 cursor-pointer"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};
