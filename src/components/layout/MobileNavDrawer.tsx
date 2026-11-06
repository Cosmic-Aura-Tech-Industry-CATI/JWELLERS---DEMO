"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { X, ChevronDown, ChevronRight, Heart, User, ShieldCheck, PhoneCall } from "lucide-react";
import { navigationItems } from "@/data/navigationData";
import { useWishlist } from "@/context/WishlistContext";
import { brandTokens } from "@/lib/design-tokens";

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({
  isOpen,
  onClose,
  onOpenSearch,
}) => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { wishlistCount } = useWishlist();

  // Handle escape key & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const toggleAccordion = (id: string) => {
    setExpandedItem((prev) => (prev === id ? null : id));
  };

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211E]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
        className="relative w-full max-w-xs sm:max-w-sm bg-[#FAF8F5] text-[#24211E] h-full shadow-2xl flex flex-col z-10 border-r border-[#E8E1D7] overflow-x-hidden animate-in slide-in-from-left duration-300"
      >
        {/* Top Header */}
        <div className="p-4 border-b border-[#E8E1D7] flex items-center justify-between bg-[#FFFFFF]">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.2em] font-light text-[#24211E]">
              {brandTokens.identity.name}
            </span>
            <span className="text-[9px] font-sans uppercase tracking-[0.22em] text-[#A69A89]">
              Haute Joaillerie
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 text-[#706860] hover:text-[#24211E] transition-colors rounded-[2px] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search trigger inside mobile menu */}
        <div className="p-4 border-b border-[#E8E1D7] bg-[#FFFFFF]">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full h-10 px-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[3px] text-xs font-sans text-[#A69A89] flex items-center justify-between"
          >
            <span>Search vault, metals, styles...</span>
            <span className="text-[10px] uppercase font-semibold text-[#C5A46D]">Search</span>
          </button>
        </div>

        {/* Nav Items List */}
        <div className="flex-1 overflow-y-auto px-4 py-2 divide-y divide-[#F1EAE0]">
          {navigationItems.map((item) => {
            const hasSub = item.hasMegaMenu && item.megaMenu;
            const isExpanded = expandedItem === item.id;

            return (
              <div key={item.id} className="py-1">
                {hasSub ? (
                  <div>
                    <button
                      onClick={() => toggleAccordion(item.id)}
                      className="w-full flex items-center justify-between py-3.5 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#24211E] hover:text-[#C5A46D] transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.badge && (
                          <span className="text-[9px] font-sans font-semibold uppercase tracking-wider px-1.5 py-0.2 bg-[#F6F1E7] text-[#9A7D4C] border border-[#C5A46D]/30 rounded-[2px]">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#A69A89] transition-transform duration-200 ${
                          isExpanded ? "rotate-180 text-[#C5A46D]" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Content */}
                    {isExpanded && (
                      <div className="pb-3 pl-3 space-y-4 animate-in fade-in duration-200">
                        {/* Direct link to main category page */}
                        <Link
                          href={item.href}
                          onClick={handleLinkClick}
                          className="flex items-center justify-between text-xs font-sans font-semibold text-[#C5A46D] uppercase tracking-wider py-1 border-b border-[#F1EAE0]"
                        >
                          <span>Explore All {item.label}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>

                        {/* Subcategory Groups */}
                        {item.megaMenu?.columns.map((col, idx) => (
                          <div key={idx} className="space-y-2">
                            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#A69A89]">
                              {col.title}
                            </span>
                            <ul className="space-y-2">
                              {col.items.map((subItem) => (
                                <li key={subItem.name}>
                                  <Link
                                    href={subItem.href}
                                    onClick={handleLinkClick}
                                    className="flex items-center justify-between text-xs font-sans text-[#4D4742] hover:text-[#C5A46D] transition-colors py-1"
                                  >
                                    <span>{subItem.name}</span>
                                    {subItem.badge && (
                                      <span className="text-[9px] font-sans font-medium text-[#C5A46D]">
                                        {subItem.badge}
                                      </span>
                                    )}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={handleLinkClick}
                    className="flex items-center justify-between py-3.5 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#24211E] hover:text-[#C5A46D] transition-colors"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] font-sans font-semibold uppercase tracking-wider px-1.5 py-0.2 bg-[#F6F1E7] text-[#9A7D4C] border border-[#C5A46D]/30 rounded-[2px]">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Drawer Actions */}
        <div className="p-4 bg-[#FFFFFF] border-t border-[#E8E1D7] space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/wishlist"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 h-10 px-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans font-medium uppercase tracking-wider text-[#24211E] hover:border-[#C5A46D]"
            >
              <Heart className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Wishlist ({wishlistCount})</span>
            </Link>

            <Link
              href="/account"
              onClick={handleLinkClick}
              className="flex items-center justify-center gap-2 h-10 px-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans font-medium uppercase tracking-wider text-[#24211E] hover:border-[#C5A46D]"
            >
              <User className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Account</span>
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-between text-[10px] font-sans uppercase tracking-[0.16em] text-[#A69A89]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D]" /> BIS 916 Stamped
            </span>
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A46D]" /> Concierge Support
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
