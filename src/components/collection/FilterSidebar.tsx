"use client";

import React from "react";
import { FilterState } from "@/types/product";
import { Check } from "lucide-react";

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
  hasActiveFilters: boolean;
}

const priceRanges = [
  { label: "All Prices", min: 0, max: 1000000 },
  { label: "Under ₹50,000", min: 0, max: 50000 },
  { label: "₹50,000 – ₹1,00,000", min: 50000, max: 100000 },
  { label: "₹1,00,000 – ₹2,00,000", min: 100000, max: 200000 },
  { label: "Above ₹2,00,000", min: 200000, max: 1000000 },
];

const materials = [
  "18KT Yellow Gold",
  "22KT Pure Gold",
  "14KT Rose Gold",
  "18KT Rose Gold",
  "950 Platinum",
  "18KT Tri-Gold",
];

const colours = ["Yellow Gold", "Rose Gold", "White Gold", "Dual Tone"];

const styles = [
  "Solitaire",
  "Minimalist",
  "Cocktail",
  "Traditional",
  "Stacking",
  "Modern",
];

const availabilities = [
  { id: "ready-to-ship", label: "Ready to Ship" },
  { id: "in-stock", label: "In Stock" },
  { id: "made-to-order", label: "Made to Order" },
];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onClearAll,
  hasActiveFilters,
}) => {
  const toggleMaterial = (mat: string) => {
    const next = filters.materials.includes(mat)
      ? filters.materials.filter((m) => m !== mat)
      : [...filters.materials, mat];
    onFilterChange({ ...filters, materials: next });
  };

  const toggleColour = (col: string) => {
    const next = filters.colours.includes(col)
      ? filters.colours.filter((c) => c !== col)
      : [...filters.colours, col];
    onFilterChange({ ...filters, colours: next });
  };

  const toggleStyle = (st: string) => {
    const next = filters.styles.includes(st)
      ? filters.styles.filter((s) => s !== st)
      : [...filters.styles, st];
    onFilterChange({ ...filters, styles: next });
  };

  const toggleAvailability = (av: string) => {
    const next = filters.availabilities.includes(av)
      ? filters.availabilities.filter((a) => a !== av)
      : [...filters.availabilities, av];
    onFilterChange({ ...filters, availabilities: next });
  };

  const setPriceRange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  return (
    <aside className="w-64 flex-shrink-0 space-y-6 hidden lg:block">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E8E1D7]">
        <h3 className="font-serif text-lg font-normal text-[#24211E]">
          Filter Creations
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onClearAll}
            className="text-[11px] font-sans text-red-600 hover:underline uppercase tracking-wider cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      {/* 1. Price Range */}
      <div className="space-y-3 pb-6 border-b border-[#F1EAE0]">
        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
          Price Range
        </span>
        <div className="space-y-2">
          {priceRanges.map((range) => {
            const isSelected =
              filters.priceRange[0] === range.min &&
              filters.priceRange[1] === range.max;
            return (
              <label
                key={range.label}
                className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] hover:text-[#24211E] cursor-pointer"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={isSelected}
                  onChange={() => setPriceRange(range.min, range.max)}
                  className="w-3.5 h-3.5 text-[#C5A46D] accent-[#C5A46D] border-[#E8E1D7] focus:ring-0 cursor-pointer"
                />
                <span>{range.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 2. Material */}
      <div className="space-y-3 pb-6 border-b border-[#F1EAE0]">
        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
          Material &amp; Karat
        </span>
        <div className="space-y-2">
          {materials.map((mat) => {
            const checked = filters.materials.includes(mat);
            return (
              <label
                key={mat}
                className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] hover:text-[#24211E] cursor-pointer"
              >
                <div
                  onClick={() => toggleMaterial(mat)}
                  className={`
                    w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors
                    ${
                      checked
                        ? "bg-[#24211E] border-[#24211E] text-[#F8F5EF]"
                        : "border-[#E8E1D7] bg-[#FFFFFF]"
                    }
                  `}
                >
                  {checked && <Check className="w-3 h-3 text-[#C5A46D]" />}
                </div>
                <span>{mat}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 3. Colour Tone */}
      <div className="space-y-3 pb-6 border-b border-[#F1EAE0]">
        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
          Colour Tone
        </span>
        <div className="space-y-2">
          {colours.map((col) => {
            const checked = filters.colours.includes(col);
            return (
              <label
                key={col}
                className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] hover:text-[#24211E] cursor-pointer"
              >
                <div
                  onClick={() => toggleColour(col)}
                  className={`
                    w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors
                    ${
                      checked
                        ? "bg-[#24211E] border-[#24211E] text-[#F8F5EF]"
                        : "border-[#E8E1D7] bg-[#FFFFFF]"
                    }
                  `}
                >
                  {checked && <Check className="w-3 h-3 text-[#C5A46D]" />}
                </div>
                <span>{col}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Style */}
      <div className="space-y-3 pb-6 border-b border-[#F1EAE0]">
        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
          Aesthetic Style
        </span>
        <div className="space-y-2">
          {styles.map((st) => {
            const checked = filters.styles.includes(st);
            return (
              <label
                key={st}
                className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] hover:text-[#24211E] cursor-pointer"
              >
                <div
                  onClick={() => toggleStyle(st)}
                  className={`
                    w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors
                    ${
                      checked
                        ? "bg-[#24211E] border-[#24211E] text-[#F8F5EF]"
                        : "border-[#E8E1D7] bg-[#FFFFFF]"
                    }
                  `}
                >
                  {checked && <Check className="w-3 h-3 text-[#C5A46D]" />}
                </div>
                <span>{st}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 5. Availability */}
      <div className="space-y-3">
        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
          Availability
        </span>
        <div className="space-y-2">
          {availabilities.map((av) => {
            const checked = filters.availabilities.includes(av.id);
            return (
              <label
                key={av.id}
                className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] hover:text-[#24211E] cursor-pointer"
              >
                <div
                  onClick={() => toggleAvailability(av.id)}
                  className={`
                    w-4 h-4 rounded-[2px] border flex items-center justify-center transition-colors
                    ${
                      checked
                        ? "bg-[#24211E] border-[#24211E] text-[#F8F5EF]"
                        : "border-[#E8E1D7] bg-[#FFFFFF]"
                    }
                  `}
                >
                  {checked && <Check className="w-3 h-3 text-[#C5A46D]" />}
                </div>
                <span>{av.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
