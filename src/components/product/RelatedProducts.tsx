"use client";

import React, { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/ui/ProductCard";
import { mockProducts } from "@/data/mockProducts";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface RelatedProductsProps {
  currentProduct: Product;
}

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  currentProduct,
}) => {
  // 1. Related pieces from same category or styling stack
  const related = mockProducts
    .filter(
      (p) =>
        p.id !== currentProduct.id &&
        (p.category === currentProduct.category || p.style === currentProduct.style)
    )
    .slice(0, 4);

  // 2. Track & retrieve recently viewed products from localStorage with lazy initializer
  const [recentlyViewed] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("auravia_recently_viewed");
      const slugs: string[] = stored ? JSON.parse(stored) : [];
      return slugs
        .filter((s) => s !== currentProduct.slug && s !== currentProduct.id)
        .map((s) => mockProducts.find((p) => p.slug === s || p.id === s))
        .filter((p): p is Product => Boolean(p))
        .slice(0, 4);
    } catch {
      return [];
    }
  });

  // Persist current product slug to history
  useEffect(() => {
    try {
      const stored = localStorage.getItem("auravia_recently_viewed");
      let slugs: string[] = stored ? JSON.parse(stored) : [];
      slugs = [
        currentProduct.slug,
        ...slugs.filter((s) => s !== currentProduct.slug),
      ].slice(0, 8);
      localStorage.setItem("auravia_recently_viewed", JSON.stringify(slugs));
    } catch {
      // ignore
    }
  }, [currentProduct.slug]);

  return (
    <div className="space-y-20 pt-16 border-t border-[#E8E1D7] mt-16">
      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <SectionHeading
            eyebrow="Pair With This Piece"
            title="Complete Your"
            italicWord="Ensemble"
            description="Explore coordinating pieces curated by our stylists to complement this silhouette."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed Products */}
      {recentlyViewed.length > 0 && (
        <section>
          <SectionHeading
            eyebrow="Your Salon History"
            title="Recently Viewed"
            italicWord="Vault"
            description="Revisit pieces you explored during your salon visit."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentlyViewed.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
