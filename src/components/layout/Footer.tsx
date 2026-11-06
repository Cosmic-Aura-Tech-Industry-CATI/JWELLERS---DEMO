"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Gem, Phone, Mail, MapPin } from "lucide-react";
import { brandTokens } from "@/lib/design-tokens";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1A18] text-[#F8F5EF] border-t border-[#332F2A]">
      {/* Top Value Assurance Ribbon */}
      <div className="border-b border-[#332F2A] py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#C5A46D] flex-shrink-0" />
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#F8F5EF]">
                BIS 6-Digit Hallmarked
              </p>
              <p className="text-[11px] font-sans text-[#A69A89]">100% Purity Guarantee</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Gem className="w-5 h-5 text-[#C5A46D] flex-shrink-0" />
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#F8F5EF]">
                IGI Certified Solitaires
              </p>
              <p className="text-[11px] font-sans text-[#A69A89]">Laser-Inscribed Diamonds</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <MapPin className="w-5 h-5 text-[#C5A46D] flex-shrink-0" />
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#F8F5EF]">
                Insured Doorstep Courier
              </p>
              <p className="text-[11px] font-sans text-[#A69A89]">Discreet Tamper-Proof Box</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <Phone className="w-5 h-5 text-[#C5A46D] flex-shrink-0" />
            <div>
              <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#F8F5EF]">
                Private Concierge
              </p>
              <p className="text-[11px] font-sans text-[#A69A89]">Dedicated Jewellery Stylists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Navigation Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Atelier */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-light tracking-[0.24em] text-[#F8F5EF]">
                {brandTokens.identity.name}
              </span>
              <span className="block text-[9px] font-sans uppercase tracking-[0.3em] text-[#C5A46D] mt-0.5">
                Maison de Haute Joaillerie
              </span>
            </Link>

            <p className="font-sans text-xs sm:text-sm font-light text-[#A69A89] leading-relaxed max-w-sm">
              Crafting heirloom jewellery that combines centuries of Indian artisanal heritage
              with modern editorial poise. Certified diamonds and hallmarked gold, created to be
              worn, stacked, and passed down.
            </p>

            <div className="pt-2 space-y-1.5 text-xs font-sans text-[#706860]">
              <p className="flex items-center gap-2 text-[#A69A89]">
                <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>Flagship Salon: Colaba, Mumbai &bull; Atelier: Jaipur</span>
              </p>
              <p className="flex items-center gap-2 text-[#A69A89]">
                <Mail className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>concierge@auravia.com</span>
              </p>
              <p className="flex items-center gap-2 text-[#A69A89]">
                <Phone className="w-3.5 h-3.5 text-[#C5A46D]" />
                <span>+91 22 8900 1200 (10 AM &ndash; 8 PM IST)</span>
              </p>
            </div>
          </div>

          {/* Column 2: The Collections */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
              The Vault
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A69A89]">
              <li>
                <Link href="/collections/all" className="hover:text-[#F8F5EF] transition-colors">
                  Shop All Pieces
                </Link>
              </li>
              <li>
                <Link href="/collections/earrings" className="hover:text-[#F8F5EF] transition-colors">
                  Earrings &amp; Jhumkas
                </Link>
              </li>
              <li>
                <Link href="/collections/necklaces" className="hover:text-[#F8F5EF] transition-colors">
                  Necklaces &amp; Chokers
                </Link>
              </li>
              <li>
                <Link href="/collections/rings" className="hover:text-[#F8F5EF] transition-colors">
                  Solitaires &amp; Bands
                </Link>
              </li>
              <li>
                <Link href="/collections/bracelets" className="hover:text-[#F8F5EF] transition-colors">
                  Tennis Bracelets &amp; Kadas
                </Link>
              </li>
              <li>
                <Link href="/collections/pendants" className="hover:text-[#F8F5EF] transition-colors">
                  Diamond Pendants
                </Link>
              </li>
              <li>
                <Link href="/collections/mens" className="hover:text-[#F8F5EF] transition-colors">
                  Men&apos;s Sovereign Gold
                </Link>
              </li>
              <li>
                <Link href="/collections/new-arrivals" className="hover:text-[#F8F5EF] transition-colors">
                  New Seasonal Drops
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A69A89]">
              <li>
                <Link href="/account" className="hover:text-[#F8F5EF] transition-colors">
                  Collector Account &amp; Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#F8F5EF] transition-colors">
                  Your Saved Wishlist
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F8F5EF] transition-colors">
                  Book Salon Appointment
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F8F5EF] transition-colors">
                  Ring Sizing &amp; Fit Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F8F5EF] transition-colors">
                  Verify BIS Hallmark (HUID)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F8F5EF] transition-colors">
                  About Maison Auravia
                </Link>
              </li>
              <li>
                <Link href="/collections/gifts" className="hover:text-[#F8F5EF] transition-colors">
                  Curated Gift Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Policies & Assurances */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
              Policies &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs font-sans text-[#A69A89]">
              <li>
                <Link href="/shipping-and-returns" className="hover:text-[#F8F5EF] transition-colors">
                  15-Day Easy Returns
                </Link>
              </li>
              <li>
                <Link href="/shipping-and-returns" className="hover:text-[#F8F5EF] transition-colors">
                  Lifetime Buyback &amp; Exchange
                </Link>
              </li>
              <li>
                <Link href="/shipping-and-returns" className="hover:text-[#F8F5EF] transition-colors">
                  Insured Doorstep Transit
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F8F5EF] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#F8F5EF] transition-colors">
                  Terms of Sale &amp; Service
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F8F5EF] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-12 mt-12 border-t border-[#332F2A] flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-sans text-[#706860]">
          <div>
            &copy; {brandTokens.identity.establishedYear} {brandTokens.identity.legalName}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-sans uppercase tracking-widest text-[#A69A89]">
            <span className="px-2 py-1 bg-[#24211E] border border-[#3D3833] rounded-[2px]">
              UPI / NetBanking
            </span>
            <span className="px-2 py-1 bg-[#24211E] border border-[#3D3833] rounded-[2px]">
              Visa &bull; Mastercard
            </span>
            <span className="px-2 py-1 bg-[#24211E] border border-[#3D3833] rounded-[2px]">
              American Express
            </span>
            <span className="px-2 py-1 bg-[#24211E] border border-[#3D3833] rounded-[2px] text-[#C5A46D]">
              256-Bit Encrypted
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
