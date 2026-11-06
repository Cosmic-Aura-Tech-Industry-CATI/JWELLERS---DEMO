"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { HeroBanner } from "@/components/home/HeroBanner";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BestsellersSection } from "@/components/home/BestsellersSection";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { OccasionSection } from "@/components/home/OccasionSection";
import { BrandTrustSection } from "@/components/home/BrandTrustSection";
import { CustomerReviews } from "@/components/home/CustomerReviews";
import { EditorialGallery } from "@/components/home/EditorialGallery";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E] flex flex-col selection:bg-[#C5A46D]/20 selection:text-[#24211E]">
      {/* 1. Announcement Bar and Shared Responsive Header */}
      <Header />

      <main className="flex-1">
        {/* 2. Large Editorial Hero Banner */}
        <HeroBanner />

        {/* 3. Shop by Category with Image Tiles */}
        <CategoryGrid />

        {/* 4. Bestsellers Product Carousel / Grid */}
        <BestsellersSection />

        {/* 5. Premium Campaign Banner (Festive / Everyday Suite) */}
        <CampaignBanner />

        {/* 6. New Arrivals Product Grid */}
        <NewArrivalsSection />

        {/* 7. Shop by Occasion (Everyday, Gifting, Wedding, Party) */}
        <OccasionSection />

        {/* 8. Brand Trust Section (Clearly Labeled Benefits) */}
        <BrandTrustSection />

        {/* 9. Customer Review Section (Identified Demo Content) */}
        <CustomerReviews />

        {/* 10. Instagram-Inspired Editorial Gallery */}
        <EditorialGallery />

        {/* 11. Luxury Newsletter Signup UI */}
        <NewsletterSection />
      </main>

      {/* 12. Comprehensive Maison Footer */}
      <Footer />
    </div>
  );
}
