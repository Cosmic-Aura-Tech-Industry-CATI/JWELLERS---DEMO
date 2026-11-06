"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, Gem } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#24211E] text-[#F8F5EF]">
      {/* Background Hero Image with subtle editorial dark overlay */}
      <div className="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=85"
          alt="AURAVIA High Jewellery Editorial Showcase"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65 scale-102 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark Gradient Vignette for high readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#24211E]/95 via-[#24211E]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24211E] via-transparent to-black/30" />

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 w-full z-10">
          <div className="max-w-2xl space-y-6">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-[#FFFFFF]/10 backdrop-blur-md border border-[#C5A46D]/40 rounded-[2px]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span className="text-[10px] sm:text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
                Haute Joaillerie &bull; Festive Edition 2026
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#F8F5EF] leading-[1.08]">
              Pure Gold. <br />
              <span className="italic font-normal text-[#C5A46D]">
                Certified Solitaires.
              </span>{" "}
              <br />
              Modern Heritage.
            </h1>

            {/* Supporting Text */}
            <p className="font-sans text-sm sm:text-base font-light text-[#E8E1D7] leading-relaxed max-w-xl">
              Handcrafted with 18KT & 22KT BIS hallmarked gold and conflict-free natural diamonds.
              Created for the modern woman who embraces everyday luxury and ceremonial grandeur.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link href="/collections/all">
                <Button
                  variant="gold"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop Collection
                </Button>
              </Link>
              <Link href="/collections/rings?style=stacks">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#FAF8F5] text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#24211E]"
                >
                  Explore Stacks
                </Button>
              </Link>
            </div>

            {/* Bottom Trust Pillars */}
            <div className="pt-6 border-t border-white/15 flex flex-wrap items-center gap-6 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] text-[#A69A89]">
              <span className="flex items-center gap-1.5 text-[#F8F5EF]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" /> BIS 6-Digit HUID
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C5A46D]" />
              <span className="flex items-center gap-1.5 text-[#F8F5EF]">
                <Gem className="w-3.5 h-3.5 text-[#C5A46D]" /> 100% Natural Diamonds
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C5A46D]" />
              <span>Complimentary Insured Courier</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
