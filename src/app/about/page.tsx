import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Gem, Award, Heart, ChevronRight, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Maison Auravia | Haute Joaillerie Heritage",
  description:
    "Discover the artisanal heritage, BIS hallmarked gold, and ethically sourced natural diamonds of Maison Auravia.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E] flex flex-col selection:bg-[#C5A46D]/20 selection:text-[#24211E]">
      <Header />

      {/* Breadcrumb Navigation */}
      <div className="border-b border-[#E8E1D7] bg-[#FFFFFF] py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-sans text-[#706860]">
          <Link href="/" className="hover:text-[#C5A46D] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#A69A89]" />
          <span className="text-[#24211E] font-medium">About The Maison</span>
        </div>
      </div>

      <main className="flex-1 space-y-20 pb-20">
        {/* 1. Hero Editorial Section */}
        <section className="relative py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#E8E1D7]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
            <div className="flex items-center justify-center gap-2">
              <span className="w-6 h-[1px] bg-[#C5A46D]" />
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
                Maison de Haute Joaillerie
              </span>
              <span className="w-6 h-[1px] bg-[#C5A46D]" />
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#24211E] tracking-tight leading-[1.15]">
              Crafted for Heirlooms, <br className="hidden sm:inline" />
              <span className="italic font-serif text-[#C5A46D]">Designed for the Everyday</span>
            </h1>

            <p className="font-sans text-sm sm:text-base text-[#706860] leading-relaxed max-w-2xl mx-auto font-light">
              Auravia was founded with a singular conviction: fine jewellery shouldn&apos;t remain locked inside private vaults. We unite centuries of Indian goldsmithing with contemporary editorial silhouettes.
            </p>
          </div>
        </section>

        {/* 2. Visual Storytelling Two-Column Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Editorial Image */}
            <div className="relative aspect-[4/5] rounded-[3px] overflow-hidden border border-[#E8E1D7] shadow-[0_8px_30px_rgba(36,33,30,0.06)]">
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=85"
                alt="Auravia jewelry atelier goldsmithing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-[#FFFFFF]/95 backdrop-blur-xs border border-[#E8E1D7] rounded-[2px]">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D] block">
                  Jaipur &amp; Mumbai Salons
                </span>
                <p className="text-xs font-serif text-[#24211E]">
                  Over 120 master karigars tuning each prong with millimeter precision.
                </p>
              </div>
            </div>

            {/* Narrative Text */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
                  Our Philosophy
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#24211E]">
                  Where Heritage Karigari Meets Contemporary Poise
                </h2>
              </div>

              <p className="font-sans text-sm text-[#706860] leading-relaxed">
                Every Auravia piece begins at our ateliers in Jaipur and Mumbai. We select only 100% natural, conflict-free diamonds with color gradings in the EF spectrum and VVS clarities. Our gold is strictly hallmarked with the Government of India&apos;s 6-digit alphanumeric HUID seal.
              </p>

              <p className="font-sans text-sm text-[#706860] leading-relaxed">
                Whether it is our signature 4-prong solitaire ring, stackable micro-pavé bands, or featherlight Polki chokers, each creation undergoes rigorous comfort-testing so you can wear high jewellery from morning breakfast to celebratory evening galas.
              </p>

              {/* Atelier Statistics */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#E8E1D7]">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-light text-[#24211E] block">
                    100%
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A69A89]">
                    BIS HUID Hallmarked
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-light text-[#24211E] block">
                    VVS-EF
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A69A89]">
                    Natural Diamonds
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-light text-[#24211E] block">
                    15-Day
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A69A89]">
                    Complimentary Returns
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. The Four Pillars of Auravia */}
        <section className="bg-[#FAF8F5] border-y border-[#E8E1D7] py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
                Assurances of Authenticity
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#24211E]">
                The Four Pillars of Auravia
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <ShieldCheck className="w-6 h-6 text-[#C5A46D]" />,
                  title: "BIS 6-Digit HUID Hallmarking",
                  desc: "Every gram of our 18KT and 22KT gold carries an individual laser-inscribed HUID code traceable on the official BIS portal.",
                },
                {
                  icon: <Gem className="w-6 h-6 text-[#C5A46D]" />,
                  title: "Certified Natural Diamonds",
                  desc: "We exclusively set natural earth-mined diamonds certified by international gemological authorities such as SGL and IGI.",
                },
                {
                  icon: <Award className="w-6 h-6 text-[#C5A46D]" />,
                  title: "Lifetime Buyback & Exchange",
                  desc: "Enjoy 100% gold value and 90% diamond value against prevailing benchmark rates anytime at our salons across India.",
                },
                {
                  icon: <Heart className="w-6 h-6 text-[#C5A46D]" />,
                  title: "Complimentary Care",
                  desc: "Complimentary lifetime ultrasonic cleaning, inspection, and ring re-polishing at our Mumbai and Jaipur ateliers.",
                },
              ].map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-3 shadow-xs hover:border-[#C5A46D] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#E8E1D7] flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <h3 className="font-serif text-lg font-normal text-[#24211E]">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-[#706860] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Atelier Visit & Private Appointment CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="p-8 sm:p-12 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-5 shadow-[0_8px_30px_rgba(36,33,30,0.04)]">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Private Consultations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#24211E]">
              Visit Our Flagship Salon in Colaba
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#706860] leading-relaxed max-w-xl mx-auto">
              Schedule an intimate styling session with our diamond gemologists to view solitaires under magnification or design a custom bridal heirloom.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                  Book Private Appointment
                </Button>
              </Link>
              <Link href="/collections/all">
                <Button variant="secondary">
                  Explore The Collection
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
