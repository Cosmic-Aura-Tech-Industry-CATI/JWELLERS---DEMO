"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface CategoryTile {
  name: string;
  slug: string;
  count: string;
  image: string;
  aspect: string;
}

const categories: CategoryTile[] = [
  {
    name: "Fine Earrings",
    slug: "earrings",
    count: "36 Creations",
    image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Solitaires & Rings",
    slug: "rings",
    count: "42 Creations",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Necklaces & Chokers",
    slug: "necklaces",
    count: "28 Creations",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Bracelets & Kadas",
    slug: "bracelets",
    count: "24 Creations",
    image: "https://images.unsplash.com/photo-1611591475876-efef464309e4?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Diamond Pendants",
    slug: "pendants",
    count: "19 Creations",
    image: "https://images.unsplash.com/photo-1590548784585-643d2b9f2925?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[4/5]",
  },
  {
    name: "Men's Sovereign",
    slug: "mens",
    count: "15 Creations",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=800&q=80",
    aspect: "aspect-[4/5]",
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="The Silhouettes"
        title="Curated by Category"
        italicWord="Vault"
        description="Explore fine jewellery silhouettes handcrafted in BIS hallmarked gold and certified solitaires."
        actionHref="/collections/all"
        actionText="View Complete Vault"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/collections/${cat.slug}`}
            className="group relative flex flex-col overflow-hidden bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] transition-all duration-300 hover:border-[#C5A46D] hover:shadow-[0_8px_24px_rgba(36,33,30,0.06)]"
          >
            {/* Image Container with Consistent 4:5 aspect ratio */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5]">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />

              {/* Discreet top-right diagonal arrow on hover */}
              <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-[2px] bg-[#FFFFFF]/90 backdrop-blur-xs border border-[#E8E1D7] flex items-center justify-center text-[#24211E] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A46D]" />
              </div>
            </div>

            {/* Label Container */}
            <div className="p-3.5 text-center bg-[#FFFFFF] border-t border-[#F1EAE0] flex flex-col justify-center flex-grow">
              <h3 className="font-serif text-sm sm:text-base font-normal text-[#24211E] group-hover:text-[#C5A46D] transition-colors leading-snug">
                {cat.name}
              </h3>
              <span className="text-[10px] font-sans uppercase tracking-[0.16em] text-[#A69A89] mt-0.5">
                {cat.count}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
