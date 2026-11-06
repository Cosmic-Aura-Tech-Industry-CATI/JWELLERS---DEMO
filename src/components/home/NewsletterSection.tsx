"use client";

import React, { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setIsSubscribed(true);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#24211E] text-[#F8F5EF] border-t border-[#3D3833]">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF]/10 border border-[#C5A46D]/40 rounded-[2px]">
          <Mail className="w-3.5 h-3.5 text-[#C5A46D]" />
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
            Maison Invitation
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F8F5EF] tracking-tight leading-[1.12]">
          Private Previews &amp;{" "}
          <span className="italic font-normal text-[#C5A46D]">Chronicles</span>
        </h2>

        <p className="font-sans text-xs sm:text-sm font-light text-[#E8E1D7] max-w-xl mx-auto leading-relaxed">
          Be the first to preview limited-edition bridal suites, curated stack launches, and receive
          exclusive invitations to our private salon trunk shows across India.
        </p>

        {isSubscribed ? (
          <div className="p-4 bg-[#FFFFFF]/10 border border-[#C5A46D] rounded-[3px] max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-sans text-[#F8F5EF]">
            <CheckCircle2 className="w-4 h-4 text-[#C5A46D]" />
            <span>Thank you for subscribing. An invitation has been sent to your inbox.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto pt-2"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full sm:flex-1 h-12 px-4 bg-[#FFFFFF] text-[#24211E] placeholder:text-[#A69A89] text-xs font-sans border border-[#E8E1D7] rounded-[3px] focus:outline-none focus:border-[#C5A46D]"
            />
            <Button
              type="submit"
              variant="gold"
              size="md"
              className="w-full sm:w-auto h-12"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Subscribe
            </Button>
          </form>
        )}

        <div className="flex items-center justify-center gap-4 text-[11px] font-sans text-[#A69A89]">
          <span>&bull; Strict Discretion</span>
          <span>&bull; Zero Spam</span>
          <span>&bull; Unsubscribe Anytime</span>
        </div>
      </div>
    </section>
  );
};
