"use client";

import React, { useState } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { mockProducts } from "@/data/mockProducts";

const filterTabs = [
  { id: "all", label: "All Bestsellers" },
  { id: "rings", label: "Solitaire Rings" },
  { id: "earrings", label: "Earrings" },
  { id: "necklaces", label: "Necklaces" },
  { id: "bracelets", label: "Bracelets" },
];

export const BestsellersSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  const bestsellers = mockProducts.filter((p) => {
    if (activeTab === "all") return p.badge === "Bestseller" || p.rating && p.rating >= 4.9;
    return p.category === activeTab;
  });

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E1D7]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#A69A89]">
              Most Coveted Pieces
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E] tracking-tight">
            The Bestsellers <span className="italic font-normal text-[#C5A46D]">Edit</span>
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 border border-[#E8E1D7] p-1 rounded-[3px] bg-[#FFFFFF] self-start md:self-auto">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  px-3.5 py-1.5 text-xs font-sans font-medium uppercase tracking-[0.14em] rounded-[2px] transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-[#24211E] text-[#F8F5EF]"
                      : "text-[#706860] hover:text-[#24211E] hover:bg-[#FAF8F5]"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid (4 columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {bestsellers.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
