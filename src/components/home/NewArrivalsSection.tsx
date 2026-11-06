"use client";

import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ui/ProductCard";
import { mockProducts } from "@/data/mockProducts";

export const NewArrivalsSection: React.FC = () => {
  // Filter products that are marked as new arrivals or have the New badge
  const newArrivals = mockProducts.filter(
    (p) => p.isNewArrival || p.badge === "New" || p.category === "stacks"
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E1D7]">
      <SectionHeading
        eyebrow="Fresh from the Atelier"
        title="Contemporary New"
        italicWord="Arrivals"
        description="Discover our newest silhouettes: stackable contoured bands, luminous polki drops, and delicate daily gold chains."
        actionHref="/collections/new-arrivals"
        actionText="View All New Pieces"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {newArrivals.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};
