"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ChevronRight,
  Send,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Private Salon Appointment",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Please provide your full name.";
    if (!formData.email.trim()) {
      errs.email = "Please provide your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      errs.message = "Message must be at least 15 characters long.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

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
          <span className="text-[#24211E] font-medium">Contact Concierge</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 space-y-16">
        {/* Page Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              Client Care &amp; Salons
            </span>
            <span className="w-6 h-[1px] bg-[#C5A46D]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E]">
            Connect With Our Ateliers
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#706860]">
            Whether scheduling an intimate diamond viewing, inquiring about bespoke bridal commissions, or checking delivery, our concierge is at your service.
          </p>
        </div>

        {/* Two-Column Grid: Left Salon Details, Right Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Channels & Salon Addresses (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-6 shadow-xs">
              <h3 className="font-serif text-xl font-normal text-[#24211E] border-b border-[#F1EAE0] pb-3">
                Flagship Salons &amp; Contact
              </h3>

              <div className="space-y-5 text-xs font-sans">
                {/* Mumbai Salon */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#24211E] font-semibold uppercase tracking-wider text-[11px]">
                    <MapPin className="w-4 h-4 text-[#C5A46D]" />
                    <span>Mumbai Flagship Salon</span>
                  </div>
                  <p className="text-[#706860] pl-6 leading-relaxed">
                    Maison Auravia, Colaba Causeway, Near Gateway of India, Mumbai 400001
                  </p>
                </div>

                {/* Jaipur Atelier */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#24211E] font-semibold uppercase tracking-wider text-[11px]">
                    <MapPin className="w-4 h-4 text-[#C5A46D]" />
                    <span>Jaipur Gemology Atelier</span>
                  </div>
                  <p className="text-[#706860] pl-6 leading-relaxed">
                    Heritage Goldsmiths Enclave, Johari Bazaar, Jaipur 302003
                  </p>
                </div>

                {/* Telephone */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#24211E] font-semibold uppercase tracking-wider text-[11px]">
                    <Phone className="w-4 h-4 text-[#C5A46D]" />
                    <span>Telephone Concierge</span>
                  </div>
                  <p className="text-[#706860] pl-6">
                    +91 22 8900 1200 &bull; +91 98200 45678 (WhatsApp Concierge)
                  </p>
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#24211E] font-semibold uppercase tracking-wider text-[11px]">
                    <Mail className="w-4 h-4 text-[#C5A46D]" />
                    <span>Electronic Correspondence</span>
                  </div>
                  <p className="text-[#706860] pl-6">
                    concierge@auravia.com &bull; appointments@auravia.com
                  </p>
                </div>

                {/* Hours */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[#24211E] font-semibold uppercase tracking-wider text-[11px]">
                    <Clock className="w-4 h-4 text-[#C5A46D]" />
                    <span>Salon Operating Hours</span>
                  </div>
                  <p className="text-[#706860] pl-6 leading-relaxed">
                    Monday to Sunday: 10:00 AM &ndash; 8:00 PM IST (By appointment or walk-in)
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Assurance Box */}
            <div className="p-5 bg-[#FAF8F5] border border-[#C5A46D]/40 rounded-[3px] space-y-2 text-xs font-sans text-[#706860]">
              <span className="font-semibold text-[#24211E] uppercase text-[10px] tracking-wider block">
                Complimentary Solitaire Consultation
              </span>
              <p>
                Each appointment includes a private viewing under a 10x gemological loupe and complimentary ultrasonic cleaning of your existing jewels.
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form with Validation & Success State (7 Cols) */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              /* Success State */
              <div className="p-8 sm:p-12 bg-[#FFFFFF] border border-[#C5A46D]/50 rounded-[3px] shadow-[0_8px_32px_rgba(197,164,109,0.12)] text-center space-y-5 animate-in fade-in">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
                    Inquiry Registered (Demo Mode)
                  </span>
                  <h2 className="font-serif text-3xl font-light text-[#24211E]">
                    Thank You, {formData.name}
                  </h2>
                  <p className="font-sans text-xs sm:text-sm text-[#706860] leading-relaxed max-w-md mx-auto">
                    Your inquiry regarding <strong className="text-[#24211E]">&ldquo;{formData.subject}&rdquo;</strong> has been recorded in our simulated client system.
                  </p>
                </div>

                <div className="p-4 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-xs font-sans text-[#706860] max-w-sm mx-auto space-y-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-[#A69A89]">Reference ID:</span>
                    <span className="font-medium text-[#24211E]">#CON-2026-7814</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A69A89]">Follow-up Email:</span>
                    <span className="font-medium text-[#24211E]">{formData.email}</span>
                  </div>
                </div>

                <p className="text-[11px] font-sans text-[#A69A89] italic">
                  * Notice: This is a frontend demonstration. In a production environment, our senior diamond stylist would connect with you within 24 hours.
                </p>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "Private Salon Appointment",
                        message: "",
                      });
                    }}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              /* Contact Form */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_4px_24px_rgba(36,33,30,0.03)] space-y-5"
              >
                <div className="border-b border-[#F1EAE0] pb-3 flex items-center justify-between">
                  <h3 className="font-serif text-xl font-normal text-[#24211E]">
                    Send an Inquiry to the Concierge
                  </h3>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#A69A89]">
                    Simulated Demo Portal
                  </span>
                </div>

                {/* Notice Banner */}
                <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-[11px] font-sans text-[#706860]">
                  Please enter your contact details. Frontend validation ensures clean data entry; this demo simulation does not dispatch emails to an external mailbox.
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Radhika Merchant"
                      className={`w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border rounded-[2px] outline-none transition-colors ${
                        errors.name ? "border-red-500" : "border-[#E8E1D7] focus:border-[#C5A46D]"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[10px] font-sans text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="radhika@example.com"
                      className={`w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border rounded-[2px] outline-none transition-colors ${
                        errors.email ? "border-red-500" : "border-[#E8E1D7] focus:border-[#C5A46D]"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[10px] font-sans text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Inquiry Subject *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D] cursor-pointer"
                    >
                      <option value="Private Salon Appointment">Private Salon Appointment</option>
                      <option value="Custom Bridal Bespoke">Custom Bridal Bespoke</option>
                      <option value="Solitaire Gemology Query">Solitaire Gemology Query</option>
                      <option value="Order & Transit Status">Order &amp; Transit Status</option>
                      <option value="Lifetime Buyback & Resizing">Lifetime Buyback &amp; Resizing</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                    Your Message / Styling Request *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the pieces you are interested in or your preferred date for a private salon consultation..."
                    className={`w-full p-3 text-xs font-sans bg-[#FAF8F5] border rounded-[2px] outline-none transition-colors ${
                      errors.message ? "border-red-500" : "border-[#E8E1D7] focus:border-[#C5A46D]"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[10px] font-sans text-red-600">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    icon={<Send className="w-4 h-4 text-[#C5A46D]" />}
                  >
                    Submit Inquiry (Simulated Demo)
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
