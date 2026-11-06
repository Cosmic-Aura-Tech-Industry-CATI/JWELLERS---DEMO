"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";
import { AnnouncementBar } from "./AnnouncementBar";
import { MegaMenu } from "./MegaMenu";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { SearchOverlay } from "./SearchOverlay";
import { CartDrawer } from "./CartDrawer";
import { navigationItems } from "@/data/navigationData";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { brandTokens } from "@/lib/design-tokens";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [searchOverlayOpen, setSearchOverlayOpen] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState("");

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const { cartCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  // Sticky header scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (itemId: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMegaMenu(itemId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 200);
  };

  const handleHeaderSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headerSearchQuery.trim()) return;
    router.push(
      `/search?q=${encodeURIComponent(headerSearchQuery.trim())}`
    );
  };

  const activeItem = navigationItems.find((i) => i.id === activeMegaMenu);

  return (
    <>
      {/* 1. Slim Announcement Bar for promotional messaging */}
      <AnnouncementBar />

      {/* 2. Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ease-out bg-[#FAF8F5]/98 backdrop-blur-md border-b border-[#E8E1D7] ${
          isScrolled
            ? "shadow-[0_4px_20px_rgba(36,33,30,0.05)]"
            : ""
        }`}
      >
        {/* DESKTOP TOP BAR (Brand, Search, Account, Wishlist, Bag) */}
        <div className="hidden lg:block border-b border-[#F1EAE0]">
          <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
            {/* Brand Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="group flex flex-col items-start">
                <span className="font-serif text-2xl font-light tracking-[0.24em] text-[#24211E] group-hover:text-[#C5A46D] transition-colors duration-200">
                  {brandTokens.identity.name}
                </span>
                <span className="text-[9px] font-sans font-medium uppercase tracking-[0.3em] text-[#A69A89]">
                  Haute Fine Jewellery
                </span>
              </Link>
            </div>

            {/* Desktop Center: Integrated Luxury Search Field */}
            <div className="flex-1 max-w-md mx-auto">
              <form
                onSubmit={handleHeaderSearchSubmit}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={headerSearchQuery}
                  onChange={(e) => setHeaderSearchQuery(e.target.value)}
                  placeholder="Search solitaire rings, emeralds, 18KT gold..."
                  className="w-full h-10 pl-9 pr-12 text-xs font-sans bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] text-[#24211E] placeholder:text-[#A69A89] transition-colors focus:border-[#C5A46D] focus:ring-1 focus:ring-[#C5A46D]/20 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute left-3 text-[#A69A89] hover:text-[#C5A46D] transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOverlayOpen(true)}
                  className="absolute right-2 px-1.5 py-0.5 text-[9px] font-sans uppercase tracking-widest text-[#A69A89] bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] hover:text-[#24211E]"
                >
                  Filter
                </button>
              </form>
            </div>

            {/* Desktop Right: Account, Wishlist, Cart */}
            <div className="flex items-center space-x-6 text-[#24211E]">
              {/* Account */}
              <Link
                href="/account"
                className="group flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] hover:text-[#C5A46D] transition-colors"
                aria-label="Account Login"
              >
                <User className="w-4 h-4 text-[#24211E] group-hover:text-[#C5A46D] transition-colors" />
                <span className="hidden xl:inline">Account</span>
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="group relative flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] hover:text-[#C5A46D] transition-colors"
                aria-label={`Wishlist with ${wishlistCount} items`}
              >
                <div className="relative">
                  <Heart className="w-4 h-4 text-[#24211E] group-hover:text-[#C5A46D] transition-colors" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#C5A46D] text-[#FFFFFF] text-[9px] font-sans font-semibold flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline">Wishlist</span>
              </Link>

              {/* Cart Bag */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="group relative flex items-center gap-2 text-xs font-sans uppercase tracking-[0.16em] hover:text-[#C5A46D] transition-colors cursor-pointer"
                aria-label={`Shopping bag with ${cartCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#24211E] group-hover:text-[#C5A46D] transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#24211E] text-[#F8F5EF] text-[9px] font-sans font-semibold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="hidden xl:inline">Bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP NAVIGATION BAR (Category links with MegaMenu) */}
        <div
          className="hidden lg:block relative"
          onMouseLeave={handleMouseLeave}
        >
          <div className="max-w-7xl mx-auto px-6">
            <nav
              role="navigation"
              aria-label="Main category navigation"
              className="flex items-center justify-between h-12"
            >
              {navigationItems.map((item) => {
                const isActive = activeMegaMenu === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative h-full flex items-center"
                    onMouseEnter={() => {
                      if (item.hasMegaMenu) {
                        handleMouseEnter(item.id);
                      } else {
                        setActiveMegaMenu(null);
                      }
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`
                        h-full flex items-center gap-1 text-[11px] font-sans font-medium uppercase tracking-[0.2em] transition-colors duration-200 border-b-2
                        ${
                          isActive
                            ? "text-[#C5A46D] border-[#C5A46D]"
                            : "text-[#24211E] border-transparent hover:text-[#C5A46D]"
                        }
                      `}
                    >
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="text-[8px] font-sans font-semibold uppercase tracking-wider px-1 py-0.2 bg-[#F6F1E7] text-[#9A7D4C] border border-[#C5A46D]/30 rounded-[2px]">
                          {item.badge}
                        </span>
                      )}
                      {item.hasMegaMenu && (
                        <ChevronDown
                          className={`w-3 h-3 text-[#A69A89] transition-transform duration-200 ${
                            isActive ? "rotate-180 text-[#C5A46D]" : ""
                          }`}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Desktop MegaMenu dropdown */}
          {activeItem && activeItem.hasMegaMenu && (
            <MegaMenu
              item={activeItem}
              isOpen={Boolean(activeItem)}
              onClose={() => setActiveMegaMenu(null)}
            />
          )}
        </div>

        {/* MOBILE COMPACT HEADER */}
        <div className="lg:hidden px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Hamburger Menu */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="p-2 text-[#24211E] hover:text-[#C5A46D] transition-colors rounded-[2px]"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Centered Brand Logo */}
          <Link href="/" className="flex flex-col items-center">
            <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.22em] text-[#24211E]">
              {brandTokens.identity.name}
            </span>
            <span className="text-[8px] font-sans font-medium uppercase tracking-[0.26em] text-[#A69A89]">
              Haute Joaillerie
            </span>
          </Link>

          {/* Mobile Right: Search & Cart icons */}
          <div className="flex items-center space-x-3 text-[#24211E]">
            <button
              onClick={() => setSearchOverlayOpen(true)}
              aria-label="Open search"
              className="p-2 text-[#24211E] hover:text-[#C5A46D] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Shopping bag with ${cartCount} items`}
              className="relative p-2 text-[#24211E] hover:text-[#C5A46D] transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-4 h-4 px-1 rounded-full bg-[#24211E] text-[#F8F5EF] text-[9px] font-sans font-semibold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Mobile Navigation Drawer */}
      <MobileNavDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        onOpenSearch={() => setSearchOverlayOpen(true)}
      />

      {/* Live Search Panel / Overlay */}
      <SearchOverlay
        isOpen={searchOverlayOpen}
        onClose={() => setSearchOverlayOpen(false)}
      />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />
    </>
  );
};
