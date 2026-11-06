"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { NavigationItem } from "@/data/navigationData";
import { Badge } from "@/components/ui/Badge";

interface MegaMenuProps {
  item: NavigationItem;
  isOpen: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ item, isOpen, onClose }) => {
  if (!isOpen || !item.megaMenu) return null;

  const { columns, feature } = item.megaMenu;

  return (
    <div
      role="region"
      aria-label={`${item.label} navigation menu`}
      className="absolute top-full left-0 w-full bg-[#FFFFFF] border-b border-[#E8E1D7] shadow-[0_12px_32px_rgba(36,33,30,0.06)] z-40 transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-1"
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Subcategory Columns */}
          <div className="col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col, index) => (
              <div key={index} className="space-y-3">
                <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.24em] text-[#C5A46D] block pb-1 border-b border-[#F1EAE0]">
                  {col.title}
                </span>
                <ul className="space-y-2.5">
                  {col.items.map((subItem) => (
                    <li key={subItem.name}>
                      <Link
                        href={subItem.href}
                        onClick={onClose}
                        className="group flex items-center justify-between text-xs font-sans text-[#4D4742] hover:text-[#C5A46D] transition-colors py-0.5"
                      >
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          {subItem.name}
                        </span>
                        {subItem.badge && (
                          <span className="text-[9px] font-sans font-semibold uppercase tracking-wider px-1.5 py-0.2 bg-[#F6F1E7] text-[#9A7D4C] border border-[#C5A46D]/30 rounded-[2px]">
                            {subItem.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Quick Hallmarking Assurance link in the menu */}
            <div className="space-y-3 p-4 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] self-start">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#24211E]">
                Certified Authenticity
              </span>
              <p className="text-[11px] font-sans text-[#706860] leading-relaxed">
                All gold pieces carry 6-digit BIS Hallmarking with HUID. Diamonds are laser-inscribed and IGI certified.
              </p>
              <Link
                href="/collections/all?certified=true"
                onClick={onClose}
                className="inline-flex items-center text-[11px] font-sans font-medium text-[#C5A46D] uppercase tracking-wider hover:underline"
              >
                <span>View Certified Vault</span>
                <ArrowRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
          </div>

          {/* Feature Promotion Vitrine */}
          {feature && (
            <div className="col-span-4 pl-6 border-l border-[#E8E1D7]">
              <Link
                href={feature.href}
                onClick={onClose}
                className="group block relative overflow-hidden rounded-[2px] border border-[#E8E1D7] bg-[#FAF8F5] transition-all hover:border-[#C5A46D]/70"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    sizes="400px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {feature.badge && (
                    <div className="absolute top-2.5 left-2.5">
                      <Badge variant="hallmark" size="sm">
                        {feature.badge}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-1 bg-[#FFFFFF]">
                  <h4 className="font-serif text-lg font-normal text-[#24211E] group-hover:text-[#C5A46D] transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-xs font-sans text-[#706860] line-clamp-2 leading-relaxed">
                    {feature.tagline}
                  </p>
                  <div className="pt-2 flex items-center text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#24211E] group-hover:text-[#C5A46D]">
                    <span>Discover Edition</span>
                    <ArrowRight className="w-3 h-3 ml-1.5 transition-transform group-hover:translate-x-1 text-[#C5A46D]" />
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
