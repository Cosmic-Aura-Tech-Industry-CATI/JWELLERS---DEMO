import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8F5EF] text-[#24211E] flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6 p-8 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_8px_30px_rgba(36,33,30,0.04)]">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF8F5] border border-[#E8E1D7] flex items-center justify-center text-[#C5A46D]">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Piece Not Found
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#24211E]">
              This Creation is Unavailable
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#706860] leading-relaxed font-light">
              The fine jewellery piece you are seeking may have been archived or moved to our private salon vault.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/collections/all">
              <Button variant="primary" fullWidth icon={<ArrowRight className="w-3.5 h-3.5" />}>
                Explore Collection
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" fullWidth>
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
