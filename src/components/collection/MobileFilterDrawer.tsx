"use client";

import React, { useEffect } from "react";
import { X, Check } from "lucide-react";
import { FilterState } from "@/types/product";
import { Button } from "@/components/ui/Button";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
  productCount: number;
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

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearAll,
  productCount,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211E]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filter Creations"
        className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF8F5] text-[#24211E] h-full shadow-2xl flex flex-col z-10 border-r border-[#E8E1D7] overflow-x-hidden animate-in slide-in-from-left duration-300"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#E8E1D7] bg-[#FFFFFF] flex items-center justify-between">
          <h3 className="font-serif text-lg font-normal text-[#24211E]">
            Filter Creations
          </h3>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-[#706860] hover:text-[#24211E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Price Range */}
          <div className="space-y-3 pb-5 border-b border-[#E8E1D7]">
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
                    className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] py-1 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="mobilePriceRange"
                      checked={isSelected}
                      onChange={() => setPriceRange(range.min, range.max)}
                      className="w-4 h-4 text-[#C5A46D] accent-[#C5A46D]"
                    />
                    <span>{range.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Material */}
          <div className="space-y-3 pb-5 border-b border-[#E8E1D7]">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
              Material &amp; Karat
            </span>
            <div className="space-y-2">
              {materials.map((mat) => {
                const checked = filters.materials.includes(mat);
                return (
                  <label
                    key={mat}
                    onClick={() => toggleMaterial(mat)}
                    className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] py-1 cursor-pointer"
                  >
                    <div
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

          {/* Colour */}
          <div className="space-y-3 pb-5 border-b border-[#E8E1D7]">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
              Colour Tone
            </span>
            <div className="space-y-2">
              {colours.map((col) => {
                const checked = filters.colours.includes(col);
                return (
                  <label
                    key={col}
                    onClick={() => toggleColour(col)}
                    className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] py-1 cursor-pointer"
                  >
                    <div
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

          {/* Style */}
          <div className="space-y-3 pb-5 border-b border-[#E8E1D7]">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89] block">
              Style
            </span>
            <div className="space-y-2">
              {styles.map((st) => {
                const checked = filters.styles.includes(st);
                return (
                  <label
                    key={st}
                    onClick={() => toggleStyle(st)}
                    className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] py-1 cursor-pointer"
                  >
                    <div
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

          {/* Availability */}
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
                    onClick={() => toggleAvailability(av.id)}
                    className="flex items-center gap-2.5 text-xs font-sans text-[#4D4742] py-1 cursor-pointer"
                  >
                    <div
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
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#E8E1D7] space-y-2">
          <Button variant="primary" fullWidth onClick={onClose}>
            View {productCount} Creations
          </Button>
          <button
            onClick={onClearAll}
            className="w-full text-center text-xs font-sans uppercase tracking-wider text-red-600 hover:underline py-1.5 cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};
