import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  PackageCheck,
  Clock,
  ChevronRight,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Insured Shipping & Returns Policy | Maison Auravia",
  description:
    "Learn about our tamper-proof insured courier delivery, 15-day return policy, and lifetime exchange terms across India.",
};

export default function ShippingAndReturnsPage() {
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
          <span className="text-[#24211E] font-medium">Shipping &amp; Returns</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 space-y-14">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Trust &amp; Assurance
            </span>
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E]">
            Insured Shipping &amp; Returns
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#706860] max-w-xl mx-auto">
            Every precious creation from Maison Auravia journeys to your doorstep in tamper-proof, steel-reinforced security packaging with 100% transit insurance.
          </p>
        </div>

        {/* Demo Notice Alert */}
        <div className="p-4 bg-[#FAF8F5] border border-[#C5A46D]/60 rounded-[3px] flex items-start gap-3 text-xs font-sans text-[#706860]">
          <AlertCircle className="w-4 h-4 text-[#C5A46D] mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-[#24211E] uppercase text-[10px] block font-semibold">
              Demonstration Policy Document:
            </strong>
            The delivery parameters and return protocols described below model an authentic luxury jewellery operation in India for demo validation.
          </div>
        </div>

        {/* Highlight Stats Ribbon */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-1.5 text-center">
            <Truck className="w-6 h-6 text-[#C5A46D] mx-auto" />
            <h4 className="font-serif text-base text-[#24211E]">100% Insured Transit</h4>
            <p className="text-[11px] font-sans text-[#706860]">
              Dispatched via specialized BVC Logistics &amp; Blue Dart Apex.
            </p>
          </div>

          <div className="p-5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-1.5 text-center">
            <Clock className="w-6 h-6 text-[#C5A46D] mx-auto" />
            <h4 className="font-serif text-base text-[#24211E]">2&ndash;3 Business Days</h4>
            <p className="text-[11px] font-sans text-[#706860]">
              Express doorstep courier to all Indian metro cities.
            </p>
          </div>

          <div className="p-5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-1.5 text-center">
            <RotateCcw className="w-6 h-6 text-[#C5A46D] mx-auto" />
            <h4 className="font-serif text-base text-[#24211E]">15-Day Easy Returns</h4>
            <p className="text-[11px] font-sans text-[#706860]">
              Complimentary insured doorstep pickup with full exchange.
            </p>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] p-6 sm:p-10 space-y-10 shadow-[0_4px_24px_rgba(36,33,30,0.03)] text-xs sm:text-sm font-sans text-[#4D4742] leading-relaxed">
          {/* Section 1 */}
          <div className="space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl text-[#24211E] flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-[#C5A46D]" />
              1. Packaging &amp; Discreet Courier Security
            </h3>
            <p>
              To safeguard your heirloom and guarantee total discretion, all parcels arrive in an unbranded, steel-reinforced security outer box with zero reference to &ldquo;jewellery&rdquo; or &ldquo;gold&rdquo; on the exterior label. Inside, your piece is nestled within our signature Auravia velvet keepsake box, accompanied by its BIS hallmarking card and SGL/IGI gemological certificate.
            </p>
            <p>
              Delivery requires the recipient to verify an OTP sent to the registered mobile number and sign upon physical handover.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-3 pt-6 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#24211E] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#C5A46D]" />
              2. Shipping Charges &amp; Delivery Timelines
            </h3>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li>
                <strong>Complimentary Insured Shipping:</strong> Available on all orders of ₹50,000 or greater.
              </li>
              <li>
                <strong>Standard Insured Shipping:</strong> ₹500 flat fee for orders under ₹50,000.
              </li>
              <li>
                <strong>Ready to Ship Pieces:</strong> Dispatched within 24–48 hours; delivery in 2–3 business days across metros and 3–5 business days for tier-2/tier-3 cities.
              </li>
              <li>
                <strong>Made-to-Order &amp; Custom Rings:</strong> Artisanal crafting, gem-setting, and BIS HUID certification requires 10–14 business days prior to dispatch.
              </li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="space-y-3 pt-6 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#24211E] flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-[#C5A46D]" />
              3. 15-Day Return &amp; Exchange Policy
            </h3>
            <p>
              We want every collector to feel utterly delighted with their acquisition. If you wish to return or exchange a piece:
            </p>
            <ol className="list-decimal list-inside space-y-1.5 pl-1">
              <li>Initiate a return request within 15 calendar days of receipt by emailing concierge@auravia.com.</li>
              <li>The piece must be unworn, undamaged, and complete with its original tamper-proof security tags, Auravia keepsake box, and laboratory certificates.</li>
              <li>Our dedicated high-security courier will collect the package from your doorstep under sealed camera verification.</li>
              <li>Upon quality inspection at our Mumbai atelier, your refund or exchange credit is issued within 3 business days.</li>
            </ol>
            <p className="text-[11px] text-[#706860] italic">
              Note: Personalized engraving and custom bridal bespoke commissions are non-returnable but qualify for lifetime buyback.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3 pt-6 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl sm:text-2xl text-[#24211E] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C5A46D]" />
              4. Lifetime Buyback &amp; Exchange Terms
            </h3>
            <p>
              Auravia values the timeless equity of your heirlooms. All our jewellery is backed by our lifetime exchange commitment across our salons:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-1">
              <li><strong>18KT &amp; 22KT Gold:</strong> Credited at 100% of the prevailing IBJA benchmark gold rate.</li>
              <li><strong>Natural Diamonds:</strong> Credited at 90% of prevailing market evaluation.</li>
              <li><strong>Making Charges &amp; Taxes:</strong> Non-refundable in accordance with Indian bullion standards.</li>
            </ul>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="p-8 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[3px] text-center space-y-4">
          <h3 className="font-serif text-2xl text-[#24211E]">
            Have a Specific Delivery Question?
          </h3>
          <p className="font-sans text-xs sm:text-sm text-[#706860] max-w-md mx-auto">
            Our logistics team can coordinate private salon collections or express timing for festive ceremonies and anniversaries.
          </p>
          <div className="pt-2 flex justify-center">
            <Link href="/contact">
              <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
                Contact Logistics Concierge
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
