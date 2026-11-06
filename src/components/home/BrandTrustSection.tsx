"use client";

import React from "react";
import {
  ShieldCheck,
  Gem,
  Truck,
  RotateCcw,
  Lock,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const trustPillars = [
  {
    icon: ShieldCheck,
    title: "100% BIS Hallmarked",
    subtitle: "Bureau of Indian Standards",
    description:
      "Every gram of gold carries the official 6-digit alphanumeric HUID seal, guaranteeing genuine 18KT (750) or 22KT (916) purity.",
  },
  {
    icon: Gem,
    title: "IGI Certified Diamonds",
    subtitle: "Independent Lab Grading",
    description:
      "All natural solitaires and accent diamonds are graded for 4Cs excellence, laser inscribed and accompanied by an official certificate.",
  },
  {
    icon: Truck,
    title: "Insured Doorstep Transit",
    subtitle: "Tamper-Evident Courier",
    description:
      "Complimentary insured shipping across India. Your order travels in sealed, discreet tamper-proof packaging with verified delivery.",
  },
  {
    icon: RotateCcw,
    title: "15-Day Easy Returns",
    subtitle: "Hassle-Free Exchange",
    description:
      "We offer a transparent 15-day return and exchange window with complimentary doorstep pickup for all non-customized creations.",
  },
  {
    icon: Lock,
    title: "256-Bit Encrypted Payments",
    subtitle: "PCI-DSS Verified",
    description:
      "Bank-grade security across all payment channels including UPI, Net Banking, major credit cards, and flexible zero-interest EMI plans.",
  },
  {
    icon: Sparkles,
    title: "Lifetime Jewellery Care",
    subtitle: "Complimentary Spa",
    description:
      "Enjoy complimentary annual ultrasonic cleaning, prong security inspection, and rhodium polishing at any Auravia atelier.",
  },
];

export const BrandTrustSection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] border-y border-[#E8E1D7]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="The Auravia Promise"
          title="Uncompromising Standards of"
          italicWord="Trust"
          description="We uphold centuries of Indian jewellery tradition combined with modern laboratory certification and transparent guarantees."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[3px] space-y-3 transition-all duration-300 hover:border-[#C5A46D]/70 hover:shadow-[0_4px_16px_rgba(36,33,30,0.04)]"
              >
                <div className="w-10 h-10 rounded-[2px] bg-[#FFFFFF] border border-[#E8E1D7] flex items-center justify-center text-[#C5A46D]">
                  <Icon className="w-5 h-5 stroke-[1.5]" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D] block">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-xl font-normal text-[#24211E]">
                    {pillar.title}
                  </h3>
                </div>

                <p className="font-sans text-xs text-[#706860] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
