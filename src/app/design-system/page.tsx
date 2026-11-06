"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, Copy } from "lucide-react";

export default function DesignSystemTokensPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const palette = [
    {
      name: "Warm Ivory",
      hex: "#F8F5EF",
      role: "Primary Canvas & Editorial Background",
      textColor: "text-[#24211E]",
      border: "border-[#E8E1D7]",
    },
    {
      name: "Pure White",
      hex: "#FFFFFF",
      role: "Product Card Surfaces & Elevated Modals",
      textColor: "text-[#24211E]",
      border: "border-[#E8E1D7]",
    },
    {
      name: "Champagne Gold",
      hex: "#C5A46D",
      role: "Restrained Metallic Accents & Highlights",
      textColor: "text-[#FFFFFF]",
      border: "border-[#C5A46D]",
    },
    {
      name: "Deep Charcoal",
      hex: "#24211E",
      role: "High-Contrast Headlines & Primary Buttons",
      textColor: "text-[#F8F5EF]",
      border: "border-[#24211E]",
    },
    {
      name: "Muted Taupe",
      hex: "#A69A89",
      role: "Editorial Eyebrows, Metadata & Strikethroughs",
      textColor: "text-[#FFFFFF]",
      border: "border-[#A69A89]",
    },
    {
      name: "Light Border",
      hex: "#E8E1D7",
      role: "Hairline Structural Dividers & Outlines",
      textColor: "text-[#24211E]",
      border: "border-[#D4CABE]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E]">
      <Header />

      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#E8E1D7]">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4 max-w-3xl">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.28em] text-[#C5A46D]">
              AURAVIA DESIGN SYSTEM &bull; LIVING TOKEN SPECIFICATION
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#24211E] tracking-tight">
              Design Tokens &amp; Component Standards
            </h1>
            <p className="font-sans text-sm sm:text-base font-light text-[#706860] leading-relaxed">
              Complete specification for typography hierarchy, 6-tone color architecture, 2-6px corner radii, and restrained gold accents.
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Colors */}
        <section className="space-y-6">
          <SectionHeading
            eyebrow="Color Architecture"
            title="Core Visual Tokens"
            align="left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {palette.map((item) => (
              <div
                key={item.name}
                className={`p-6 rounded-[3px] bg-[#FFFFFF] border ${item.border} space-y-4`}
              >
                <div
                  className="w-full h-20 rounded-[2px] flex items-end justify-between p-3"
                  style={{ backgroundColor: item.hex }}
                >
                  <span className={`text-xs font-mono font-semibold uppercase ${item.textColor}`}>
                    {item.hex}
                  </span>
                  <button
                    onClick={() => copyToClipboard(item.hex)}
                    className="p-1 rounded bg-black/10 hover:bg-black/20 text-current transition-colors"
                  >
                    {copiedHex === item.hex ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-[#24211E]">{item.name}</h3>
                  <p className="text-xs font-sans text-[#706860] mt-0.5">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6 pt-8 border-t border-[#E8E1D7]">
          <SectionHeading eyebrow="Tactile Controls" title="Buttons & Badges" align="left" />
          <div className="p-6 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary Charcoal</Button>
              <Button variant="secondary">Secondary White</Button>
              <Button variant="gold">Champagne Gold</Button>
              <Button variant="outline">Thin Outline</Button>
              <Button variant="ghost">Understated Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#F1EAE0]">
              <Badge variant="hallmark">BIS 916 Hallmarked</Badge>
              <Badge variant="gold">18KT BIS Certified</Badge>
              <Badge variant="subtle">IGI Natural Diamond</Badge>
              <Badge variant="editorial">Maison Exclusive</Badge>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
