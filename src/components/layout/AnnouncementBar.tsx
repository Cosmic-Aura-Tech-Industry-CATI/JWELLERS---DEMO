"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ShieldCheck, Sparkles, Truck, ChevronRight } from "lucide-react";

const announcements = [
  {
    icon: <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" />,
    text: "100% BIS Hallmarked Pure Gold • IGI Certified Diamonds",
    linkText: "Verify Hallmark",
    href: "/faq",
  },
  {
    icon: <Truck className="w-3.5 h-3.5 text-[#C5A46D]" />,
    text: "Complimentary Insured Doorstep Transit on Orders Above ₹50,000",
    linkText: "Shipping Details",
    href: "/shipping-and-returns",
  },
  {
    icon: <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />,
    text: "The Festive Edit: Enjoy 10% Off on Curated Stacks & Sets",
    linkText: "Shop Stacks",
    href: "/collections/rings?style=stacks",
  },
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[currentIndex];

  return (
    <div
      role="region"
      aria-label="Promotional announcements"
      className="bg-[#24211E] text-[#F8F5EF] border-b border-[#3D3833] py-2 px-4 transition-all duration-300 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] font-sans tracking-[0.16em]">
        {/* Left Trust Item (Desktop only) */}
        <div className="hidden lg:flex items-center gap-2 text-[#A69A89]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A46D]" />
          <span className="uppercase">Maison de Haute Joaillerie</span>
        </div>

        {/* Center Dynamic Announcement (Smooth transition) */}
        <div className="flex-1 flex items-center justify-center gap-2 text-center overflow-hidden">
          <span className="inline-flex items-center flex-shrink-0">{current.icon}</span>
          <span className="font-normal text-[#F8F5EF] truncate">
            {current.text}
          </span>
          <Link
            href={current.href}
            className="hidden sm:inline-flex items-center font-medium text-[#C5A46D] hover:underline ml-1 uppercase text-[10px] tracking-[0.18em]"
          >
            <span>{current.linkText}</span>
            <ChevronRight className="w-3 h-3 ml-0.5" />
          </Link>
        </div>

        {/* Right Gold Rate / Currency Info (Desktop only) */}
        <div className="hidden lg:flex items-center gap-4 text-[#A69A89] text-[10px] uppercase tracking-[0.18em]">
          <span>INR (₹)</span>
          <span className="w-1 h-1 rounded-full bg-[#C5A46D]/50" />
          <span className="text-[#C5A46D]">Live 22KT Rate: ₹7,850/g</span>
        </div>
      </div>
    </div>
  );
};
