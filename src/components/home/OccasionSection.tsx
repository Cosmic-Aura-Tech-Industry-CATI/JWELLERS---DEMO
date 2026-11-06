"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface OccasionItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  image: string;
  badge: string;
}

const occasions: OccasionItem[] = [
  {
    id: "everyday",
    title: "Everyday Fine Wear",
    subtitle: "Lightweight 18KT gold bands, minimalist chains, and featherweight huggies.",
    href: "/collections/rings?style=stacks",
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80",
    badge: "Daily Luxury",
  },
  {
    id: "gifting",
    title: "Curated Gifting",
    subtitle: "Solitaire pendants and matching suites delivered in luxury velvet keepsake boxes.",
    href: "/collections/gifts",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80",
    badge: "Keepsakes",
  },
  {
    id: "wedding",
    title: "Wedding & Heirlooms",
    subtitle: "Majestic 22KT Kundan chokers, certified Polki sets, and heritage bridal jewelry.",
    href: "/collections/necklaces?style=heritage",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80",
    badge: "Bridal Suites",
  },
  {
    id: "party",
    title: "Cocktail & Party Wear",
    subtitle: "Brilliant diamond tennis bracelets, emerald collars, and statement solitaires.",
    href: "/collections/bracelets?style=tennis",
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80",
    badge: "Evening Glamour",
  },
];

export const OccasionSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E1D7]">
      <SectionHeading
        eyebrow="Styling by Moment"
        title="Curated for Every"
        italicWord="Occasion"
        description="Whether elevating everyday rituals or celebrating lifetime milestones, explore pieces tailored for every chapter."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {occasions.map((occ) => (
          <Link
            key={occ.id}
            href={occ.href}
            className="group relative flex flex-col bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] overflow-hidden transition-all duration-300 hover:border-[#C5A46D] hover:shadow-[0_8px_24px_rgba(36,33,30,0.06)]"
          >
            {/* Image container with 4:5 aspect ratio */}
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FAF8F5]">
              <Image
                src={occ.image}
                alt={occ.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24211E]/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              <div className="absolute top-3 left-3">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.16em] px-2 py-0.5 bg-[#FFFFFF]/90 backdrop-blur-xs text-[#24211E] border border-[#E8E1D7] rounded-[2px]">
                  {occ.badge}
                </span>
              </div>
            </div>

            {/* Description & Action */}
            <div className="p-5 flex flex-col justify-between flex-grow bg-[#FFFFFF] border-t border-[#F1EAE0] space-y-3">
              <div className="space-y-1">
                <h3 className="font-serif text-xl font-normal text-[#24211E] group-hover:text-[#C5A46D] transition-colors">
                  {occ.title}
                </h3>
                <p className="font-sans text-xs text-[#706860] leading-relaxed line-clamp-2">
                  {occ.subtitle}
                </p>
              </div>

              <div className="pt-2 flex items-center text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#24211E] group-hover:text-[#C5A46D]">
                <span>Discover Edit</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-1 text-[#C5A46D]" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
