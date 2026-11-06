import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ChevronRight, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Maison Auravia Haute Joaillerie",
  description:
    "Review how Maison Auravia protects your personal data, client confidentiality, and session preferences.",
};

export default function PrivacyPolicyPage() {
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
          <span className="text-[#24211E] font-medium">Privacy Policy</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Legal &amp; Client Rights
            </span>
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E]">
            Client Privacy Policy
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#706860] max-w-xl mx-auto">
            Maison Auravia is dedicated to preserving the absolute discretion, privacy, and security of our esteemed collectors and clients.
          </p>
        </div>

        {/* Demo Notice */}
        <div className="p-4 bg-[#FAF8F5] border border-[#C5A46D]/60 rounded-[3px] flex items-start gap-3 text-xs font-sans text-[#706860]">
          <AlertCircle className="w-4 h-4 text-[#C5A46D] mt-0.5 flex-shrink-0" />
          <div>
            <strong className="text-[#24211E] uppercase text-[10px] block font-semibold">
              Demonstration Privacy Notice:
            </strong>
            This document outlines client data handling protocols typical for Indian fine jewellery e-commerce. In this demonstration application, no client data is transmitted to remote analytics or third-party ad networks.
          </div>
        </div>

        {/* Policy Body */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] p-6 sm:p-10 space-y-8 shadow-[0_4px_24px_rgba(36,33,30,0.03)] text-xs sm:text-sm font-sans text-[#4D4742] leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-serif text-xl text-[#24211E]">
              1. Information We Collect
            </h3>
            <p>
              When you browse our collections, schedule a private salon appointment, or simulate placing an order, we may collect the following details:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Full name, telephone number, and electronic mail address.</li>
              <li>Shipping address, postal PIN code, and landmark information for insured doorstep delivery.</li>
              <li>Jewellery preferences, ring sizing history, and wishlist selections stored in browser storage.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              2. Use of Your Information
            </h3>
            <p>
              Client information is utilized exclusively for:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Processing, verifying, and dispatching high-value jewellery orders.</li>
              <li>Coordinating OTP-verified, tamper-proof courier handovers.</li>
              <li>Issuing lifetime authenticity, BIS hallmarking, and gemological certification documents.</li>
              <li>Responding to private styling inquiries and concierge appointments.</li>
            </ul>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              3. Security &amp; Data Confidentiality
            </h3>
            <p>
              We implement industry-standard 256-bit SSL encryption across all digital salon touchpoints. We do not store sensitive payment credentials (such as credit card numbers or UPI PINs) on our internal servers.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              4. Local Storage &amp; Cookies
            </h3>
            <p>
              Our website uses browser `localStorage` to preserve your active shopping bag items and private wishlist selections across visits. These preferences remain entirely on your personal device.
            </p>
          </div>

          <div className="space-y-2 pt-4 border-t border-[#F1EAE0]">
            <h3 className="font-serif text-xl text-[#24211E]">
              5. Contacting the Data Protection Officer
            </h3>
            <p>
              For questions regarding client data policies or to request deletion of your salon profile, please reach out to our privacy desk at <strong>privacy@auravia.com</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
