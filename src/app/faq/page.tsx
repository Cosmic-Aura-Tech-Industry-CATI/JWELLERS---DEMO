"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import {
  ChevronDown,
  Search,
  X,
  ChevronRight,
  HelpCircle,
  Phone,
} from "lucide-react";

interface FAQItem {
  id: string;
  category: "hallmarking" | "shipping" | "returns" | "sizing" | "care";
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // Category 1: Hallmarking & Certification
  {
    id: "faq-1",
    category: "hallmarking",
    question: "What is BIS 6-Digit Alphanumeric HUID Hallmarking?",
    answer:
      "Every piece of gold jewellery crafted by Maison Auravia is laser-inscribed with a unique 6-digit alphanumeric Hallmarking Unique Identification (HUID) code certified by the Bureau of Indian Standards (BIS). You can verify its exact purity, karigari date, and hallmarking center using the official BIS Care mobile app.",
  },
  {
    id: "faq-2",
    category: "hallmarking",
    question: "Do you sell natural earth-mined or lab-grown diamonds?",
    answer:
      "Auravia exclusively crafts with 100% natural, ethically sourced earth-mined diamonds. Every solitaire and diamond creation above 0.30 carats is accompanied by an individual certificate card from world-renowned gemological laboratories such as SGL (Solitaire Gemological Laboratories) or IGI (International Gemological Institute).",
  },
  {
    id: "faq-3",
    category: "hallmarking",
    question: "What is the difference between 18KT, 22KT and 14KT gold?",
    answer:
      "22KT gold contains 91.6% pure gold and is traditional for heavier bridal necklaces and classic bangles. 18KT gold contains 75% pure gold alloyed with precious metals, making it significantly more durable and ideal for diamond solitaire rings and daily wear. 14KT gold provides maximum tensile durability for delicate stackable bands.",
  },

  // Category 2: Shipping & Transit
  {
    id: "faq-4",
    category: "shipping",
    question: "How is high-value jewellery safely shipped to my home?",
    answer:
      "All orders are dispatched in discreet, steel-reinforced security boxes with tamper-evident seals via specialized high-value couriers (BVC Logistics and Blue Dart Apex). Transit is 100% insured by Auravia up to the point of OTP verification and physical signature at your doorstep.",
  },
  {
    id: "faq-5",
    category: "shipping",
    question: "What are the estimated delivery timelines across India?",
    answer:
      "Pieces marked 'Ready to Ship' are dispatched within 24 to 48 hours and arrive in metro cities within 2 to 3 business days (3 to 5 business days for other regions). Bespoke bridal pieces and made-to-order creations take 10 to 14 business days for artisanal crafting and hallmarking.",
  },
  {
    id: "faq-6",
    category: "shipping",
    question: "Is there a shipping charge for orders?",
    answer:
      "We provide complimentary fully-insured express shipping on all orders valued at ₹50,000 or above. For orders under ₹50,000, a nominal logistics and transit insurance fee of ₹500 is applied.",
  },

  // Category 3: Returns & Lifetime Buyback
  {
    id: "faq-7",
    category: "returns",
    question: "What is your 15-day return and exchange policy?",
    answer:
      "If you are not entirely enchanted with your purchase, standard pieces in their original, unworn condition with security tags and certificates intact can be returned or exchanged within 15 days of delivery. We arrange complimentary, insured doorstep return pickup.",
  },
  {
    id: "faq-8",
    category: "returns",
    question: "What is Auravia's Lifetime Buyback & Exchange policy?",
    answer:
      "We offer a transparent lifetime buyback and upgrade policy across our salons. Gold value is calculated at 100% of the prevailing IBJA market benchmark rate at the time of exchange. Natural diamonds are credited at 90% of prevailing value.",
  },

  // Category 4: Sizing & Customization
  {
    id: "faq-9",
    category: "sizing",
    question: "How do I determine my correct Indian ring or bangle size?",
    answer:
      "We adhere to standard Indian BIS ring sizes (typically 10 through 20 for women). You can consult our on-page interactive Size Guide modal or request a complimentary ring sizer belt mailed to your home prior to placing your order.",
  },
  {
    id: "faq-10",
    category: "sizing",
    question: "Can I resize a ring if it doesn't fit perfectly?",
    answer:
      "Yes! Auravia provides one complimentary ring resizing within 30 days of purchase for all solitaire rings and plain gold bands (up to ±2 sizes). Resizing is handled by our master karigars without compromising diamond prongs or hallmark integrity.",
  },

  // Category 5: Care & Maintenance
  {
    id: "faq-11",
    category: "care",
    question: "How should I clean and store fine diamond jewellery?",
    answer:
      "Store each piece individually in the provided Auravia suede keepsake box to prevent diamonds from scratching softer metals. Clean with lukewarm water, mild non-detergent soap, and a soft microfibre cloth. Avoid wearing your jewellery while swimming or spraying perfumes.",
  },
  {
    id: "faq-12",
    category: "care",
    question: "Does Auravia offer complimentary cleaning services?",
    answer:
      "Yes. Every Auravia client enjoys complimentary lifetime ultrasonic cleaning, diamond prong tightening, and rhodium polishing at our Mumbai flagship salon and Jaipur atelier.",
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(["faq-1", "faq-4", "faq-7"]));

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const filteredFAQs = useMemo(() => {
    return faqData.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

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
          <span className="text-[#24211E] font-medium">Client Concierge FAQ</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Knowledge &amp; Inquiries
            </span>
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E]">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#706860] max-w-xl mx-auto">
            Everything you need to know about our hallmarking standards, certified solitaires, insured doorstep courier, and lifetime buyback.
          </p>
        </div>

        {/* Live Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-[#C5A46D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions (e.g. HUID, returns, resizing, diamond purity)..."
            className="w-full h-12 pl-11 pr-10 text-xs sm:text-sm font-sans bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-xs outline-none focus:border-[#C5A46D] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#A69A89] hover:text-[#24211E] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All Questions" },
            { id: "hallmarking", label: "Hallmark & Diamonds" },
            { id: "shipping", label: "Insured Shipping" },
            { id: "returns", label: "Returns & Buyback" },
            { id: "sizing", label: "Sizing & Fit" },
            { id: "care", label: "Jewellery Care" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-sans rounded-[2px] border transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#24211E] text-[#F8F5EF] border-[#24211E]"
                  : "bg-[#FFFFFF] text-[#4D4742] border-[#E8E1D7] hover:border-[#C5A46D]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Expandable Accordions List */}
        <div className="bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_4px_24px_rgba(36,33,30,0.03)] divide-y divide-[#E8E1D7]">
          {filteredFAQs.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <p className="font-serif text-xl text-[#24211E]">
                No questions matched your search
              </p>
              <p className="font-sans text-xs text-[#706860]">
                Try searching with different terms or select &ldquo;All Questions&rdquo;.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="text-xs text-[#C5A46D] underline font-medium pt-2 cursor-pointer"
              >
                Reset FAQ Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const isOpen = openIds.has(faq.id);
              return (
                <div key={faq.id} className="transition-colors">
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#FAF8F5]/60 transition-colors cursor-pointer"
                  >
                    <span className="font-serif text-base sm:text-lg text-[#24211E] font-normal leading-snug">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#A69A89] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#C5A46D]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm font-sans text-[#706860] leading-relaxed border-t border-[#FAF8F5] animate-in fade-in duration-200"
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still Have Questions Concierge Card */}
        <div className="p-8 bg-[#FAF8F5] border border-[#C5A46D]/50 rounded-[3px] text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#FFFFFF] border border-[#E8E1D7] flex items-center justify-center text-[#C5A46D]">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-serif text-xl sm:text-2xl text-[#24211E]">
              Require Further Assistance?
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#706860] max-w-md mx-auto">
              Our diamond stylists and atelier specialists are available 7 days a week to assist with custom inquiries.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button variant="primary" icon={<Phone className="w-3.5 h-3.5" />}>
                Speak With A Stylist
              </Button>
            </Link>
            <Link href="/collections/all">
              <Button variant="secondary">Explore Vault</Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
