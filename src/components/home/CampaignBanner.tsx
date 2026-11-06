"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const CampaignBanner: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden bg-[#24211E] text-[#F8F5EF] rounded-[4px] border border-[#3D3833]">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Visual Showcase (55% on desktop) */}
          <div className="lg:col-span-7 relative min-h-[420px] sm:min-h-[500px] lg:min-h-[580px] w-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1600&q=85"
              alt="Auravia Festive High Jewellery Campaign"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
            {/* Subtle Gradient blend into the right container */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-transparent via-[#24211E]/40 to-[#24211E]" />

            {/* Floating Editorial Badge */}
            <div className="absolute bottom-6 left-6 p-4 bg-[#24211E]/80 backdrop-blur-md border border-[#C5A46D]/40 rounded-[2px] max-w-xs hidden sm:block">
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#C5A46D] block mb-1">
                Featured Campaign Piece
              </span>
              <p className="font-serif text-sm text-[#F8F5EF]">
                The Rani Royal Meenakari & Zambian Emerald Suite
              </p>
              <span className="text-[11px] font-sans text-[#A69A89] mt-1 block">
                22KT BIS 916 Stamped &bull; 120 Artisan Hours
              </span>
            </div>
          </div>

          {/* Editorial Content (45% on desktop) */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF]/10 border border-[#C5A46D]/40 rounded-[2px]">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
                Maison Festive Edit
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F8F5EF] leading-[1.12] tracking-tight">
              The Imperial <br />
              <span className="italic font-normal text-[#C5A46D]">Heirloom Suite</span>
            </h2>

            <p className="font-sans text-sm sm:text-base font-light text-[#E8E1D7] leading-relaxed">
              Where ancestral Indian craftsmanship converges with modern European micro-pavé
              precision. Handcrafted in 22KT gold with uncut Polki diamonds and deep green
              Zambian emerald drops.
            </p>

            {/* Feature Pills */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs font-sans">
              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[#C5A46D] uppercase text-[10px] tracking-wider font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> BIS 916 Certified
                </span>
                <p className="text-[#A69A89] text-[11px]">
                  Government verified 6-digit hallmark
                </p>
              </div>

              <div className="space-y-1">
                <span className="flex items-center gap-1.5 text-[#C5A46D] uppercase text-[10px] tracking-wider font-semibold">
                  <Clock className="w-3.5 h-3.5" /> Limited Edition
                </span>
                <p className="text-[#A69A89] text-[11px]">
                  Only 12 suites crafted per season
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link href="/collections/necklaces">
                <Button
                  variant="gold"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Campaign
                </Button>
              </Link>
              <Link href="/collections/gifts">
                <Button
                  variant="outline"
                  size="md"
                  className="border-[#E8E1D7] text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#24211E]"
                >
                  Gifting Guide
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
