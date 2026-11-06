import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, AlertCircle } from "lucide-react";
import { brandTokens } from "@/lib/design-tokens";

export const metadata: Metadata = {
  title: "Terms & Conditions | Maison Auravia Haute Joaillerie",
  description:
    "Review the terms of sale, bullion pricing benchmarks, and BIS hallmarking guarantees of Maison Auravia.",
};

export default function TermsAndConditionsPage() {
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
          <span className="text-[#24211E] font-medium">Terms &amp; Conditions</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Legal Governance
            </span>
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E]">
            Terms of Sale &amp; Service
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#706860] max-w-xl mx-auto">
            These terms govern acquisitions, valuations, hallmarking assurances, and salon services provided by {brandTokens.identity.legalName}.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-4 bg-[#FAF8F5] border border-[#C5A46D]/60 rounded-[3px] flex items-start gap-3 text-xs font-sans text-[#706860]">
          <AlertCircle className="w-4 h-4 text-[#C5A46D] mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-[#24211E] uppercase text-[10px] block font-semibold">
              Demonstration Terms Document:
            </strong>
            The provisions below illustrate the commercial conditions and consumer protections standard for luxury jewellery in India. This web application is a frontend demonstration without binding financial obligations.
          </div>
        </div>

        {/* Terms Body */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] p-6 sm:p-10 space-y-8 shadow-[0_4px_24px_rgba(36,33,30,0.03)] text-xs sm:text-sm font-sans text-[#4D4742] leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#24211E]">
              1. Purity &amp; BIS Hallmarking Guarantee
            </h3>
            <p>
              All gold items sold on Auravia conform to the Bureau of Indian Standards (BIS) Hallmarking regulations under the BIS Act. Every piece features a laser-inscribed 6-digit alphanumeric HUID code, the BIS logo, and the fineness mark (750 for 18KT, 916 for 22KT, and 585 for 14KT).
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              2. Transparent Bullion Pricing &amp; Market Benchmarks
            </h3>
            <p>
              Gold pricing across our collections is calculated transparently based on daily market bullion rates published by the India Bullion and Jewellers Association (IBJA). Due to the hand-forged nature of fine jewellery, gross weight and net metal weight may vary by up to ±3% upon final finishing; any material difference is adjusted in client favor.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              3. Diamond Grading &amp; Authenticity Certificates
            </h3>
            <p>
              Natural diamonds set in Auravia jewellery are sourced ethically from Kimberley Process-compliant suppliers. Solitaires and focal diamonds are accompanied by third-party certificates from SGL or IGI outlining exact 4Cs metrics (Carat, Clarity, Cut, and Color).
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              4. Insured Courier Handover &amp; Acceptance
            </h3>
            <p>
              Maison Auravia assumes total transit liability until physical handover to the recipient. Upon delivery, the customer is required to examine the steel-reinforced parcel for any signs of tampering prior to providing the OTP to the security courier.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              5. Intellectual Property
            </h3>
            <p>
              All proprietary product designs, hallmarks, editorial brand photography, and typography displayed on this platform are the exclusive intellectual property of Maison Auravia.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              6. Jurisdiction
            </h3>
            <p>
              Any disputes or legal inquiries arising out of salon transactions shall be subject to the exclusive jurisdiction of the competent courts in Mumbai, Maharashtra, India.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
