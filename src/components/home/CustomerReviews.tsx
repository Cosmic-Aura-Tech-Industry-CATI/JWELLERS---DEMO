"use client";

import React from "react";
import { Star, CheckCircle, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  product: string;
  verified: boolean;
}

const demoReviews: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Ananya Roy",
    location: "South Mumbai",
    rating: 5,
    date: "October 2026",
    title: "The solitaire sparkle is breathtaking",
    content:
      "I ordered the Aura Solitaire Ring for our 10th anniversary. The diamond arrived with an official IGI certificate and 6-digit BIS Hallmark clearly engraved. The velvet keepsake presentation box is truly luxury class.",
    product: "Aura Solitaire Diamond Ring (18KT)",
    verified: true,
  },
  {
    id: "rev-2",
    author: "Meera Kulkarni",
    location: "New Delhi",
    rating: 5,
    date: "September 2026",
    title: "Perfect everyday fine jewellery",
    content:
      "I stack the Celeste trio rings daily with my watch. They have a solid weight without feeling bulky, and the pavé setting doesn't snag on silk dupattas. Customer concierge on WhatsApp was extremely helpful.",
    product: "Celeste Trio Stackable Bands (18KT)",
    verified: true,
  },
  {
    id: "rev-3",
    author: "Aditya & Priyanka Verma",
    location: "Bengaluru",
    rating: 5,
    date: "October 2026",
    title: "Authentic bridal heirlooms",
    content:
      "We purchased the Sylvan Emerald Necklace for our reception. The deep green Zambian emeralds framed by certified natural diamonds drew endless compliments. Seamless insured delivery directly to our hotel.",
    product: "Sylvan Emerald & Pavé Necklace",
    verified: true,
  },
];

export const CustomerReviews: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Demonstration Feedback"
        title="Stories from the"
        italicWord="Collectors"
        description="Read firsthand experiences from patrons across India who celebrate life's finest milestones with Auravia creations."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {demoReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] flex flex-col justify-between space-y-4 transition-all duration-300 hover:border-[#C5A46D]/60 hover:shadow-[0_8px_24px_rgba(36,33,30,0.04)]"
          >
            <div className="space-y-3">
              {/* Star Rating & Quote mark */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#C5A46D]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A46D]" />
                  ))}
                </div>
                <Quote className="w-5 h-5 text-[#E8E1D7]" />
              </div>

              {/* Title & Content */}
              <h4 className="font-serif text-lg font-normal text-[#24211E]">
                &ldquo;{review.title}&rdquo;
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#706860] leading-relaxed font-light">
                {review.content}
              </p>
            </div>

            {/* Author & Product Info */}
            <div className="pt-4 border-t border-[#F1EAE0] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-serif text-sm font-medium text-[#24211E]">
                  {review.author}
                </span>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium text-[#C5A46D] uppercase tracking-wider">
                    <CheckCircle className="w-3 h-3" /> Verified Buyer
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] font-sans text-[#A69A89]">
                <span>{review.location}</span>
                <span>{review.date}</span>
              </div>
              <p className="text-[10px] font-sans text-[#706860] italic pt-1 truncate">
                Purchased: {review.product}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Clearly labeled demo indicator */}
      <div className="mt-8 text-center">
        <span className="text-[10px] font-sans uppercase tracking-[0.2em] px-3 py-1 bg-[#FAF8F5] border border-[#E8E1D7] text-[#A69A89] rounded-[2px]">
          Demo Notice: Customer reviews shown are sample demonstration content for UI/UX showcase purposes.
        </span>
      </div>
    </section>
  );
};
