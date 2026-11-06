"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  Package,
  MapPin,
  ChevronRight,
  Sparkles,
  LogOut,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function AccountPage() {
  const { showToast } = useToast();

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "register">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<"orders" | "addresses" | "preferences">("orders");

  // Form State
  const [loginEmail, setLoginEmail] = useState("aaditya.varma@example.com");
  const [loginPassword, setLoginPassword] = useState("••••••••••••");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const handleSimulatedSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignedIn(true);
    showToast("Signed in successfully to your Auravia Collector Account.", "success");
  };

  const handleSimulatedRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSignedIn(true);
    showToast("Collector account created successfully in demo mode.", "success");
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    showToast("Signed out of your salon profile.", "info");
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
          <span className="text-[#24211E] font-medium">Collector Account</span>
        </div>
      </div>

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 lg:py-16 flex-1 space-y-10">
        {/* Demo Notice Banner */}
        <div className="p-4 bg-[#FAF8F5] border border-[#C5A46D]/60 rounded-[3px] flex items-start gap-3 text-xs font-sans text-[#706860] shadow-xs">
          <AlertCircle className="w-4 h-4 text-[#C5A46D] mt-0.5 flex-shrink-0" />
          <div className="space-y-0.5">
            <strong className="text-[#24211E] uppercase text-[10px] block font-semibold">
              Demonstration Authentication Interface:
            </strong>
            <p>
              This account portal is an interactive frontend simulation for demonstrating customer profile workflows. No credentials are transmitted to or stored on a remote server. You can sign in using sample values.
            </p>
          </div>
        </div>

        {isSignedIn ? (
          /* ============================================================ */
          /* LOGGED IN CLIENT DASHBOARD                                   */
          /* ============================================================ */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Profile Overview Card */}
            <div className="p-6 sm:p-8 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_4px_24px_rgba(36,33,30,0.03)] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#C5A46D]/60 flex items-center justify-center font-serif text-2xl text-[#C5A46D] shadow-xs">
                  AV
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h2 className="font-serif text-2xl text-[#24211E]">Aaditya Varma</h2>
                    <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#C5A46D] border border-[#C5A46D]/40 text-[10px] font-sans font-semibold uppercase tracking-wider rounded-[2px]">
                      Privilege Solitaire
                    </span>
                  </div>
                  <p className="text-xs font-sans text-[#706860]">
                    aaditya.varma@example.com &bull; Member since 2024
                  </p>
                  <p className="text-[11px] font-sans text-[#A69A89]">
                    Assigned Salon: Colaba Causeway, Mumbai
                  </p>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="px-3.5 py-1.5 text-xs font-sans text-[#706860] hover:text-[#24211E] border border-[#E8E1D7] hover:border-[#C5A46D] rounded-[2px] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex border-b border-[#E8E1D7] gap-8 text-xs font-sans font-semibold uppercase tracking-wider text-[#706860]">
              <button
                onClick={() => setActiveTab("orders")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                  activeTab === "orders"
                    ? "border-[#24211E] text-[#24211E]"
                    : "border-transparent hover:text-[#24211E]"
                }`}
              >
                <Package className="w-4 h-4 text-[#C5A46D]" />
                <span>Orders &amp; Heirlooms (2)</span>
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                  activeTab === "addresses"
                    ? "border-[#24211E] text-[#24211E]"
                    : "border-transparent hover:text-[#24211E]"
                }`}
              >
                <MapPin className="w-4 h-4 text-[#C5A46D]" />
                <span>Saved Addresses (2)</span>
              </button>

              <button
                onClick={() => setActiveTab("preferences")}
                className={`pb-3 transition-colors cursor-pointer border-b-2 -mb-[2px] flex items-center gap-1.5 ${
                  activeTab === "preferences"
                    ? "border-[#24211E] text-[#24211E]"
                    : "border-transparent hover:text-[#24211E]"
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#C5A46D]" />
                <span>Jewellery Sizing &amp; Fit</span>
              </button>
            </div>

            {/* Tab 1: Orders */}
            {activeTab === "orders" && (
              <div className="space-y-4">
                {/* Order 1: In Transit */}
                <div className="p-5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F1EAE0] text-xs font-sans">
                    <div>
                      <span className="text-[#A69A89]">Order Reference:</span>
                      <strong className="text-[#24211E] ml-1.5">#AUR-2026-9481</strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                      <span className="text-emerald-700 font-semibold uppercase text-[10px] tracking-wider">
                        Insured Transit &bull; Dispatched
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-20 rounded-[2px] overflow-hidden bg-[#FAF8F5] border border-[#E8E1D7]">
                        <Image
                          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=85"
                          alt="Aura Solitaire Diamond Ring"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-0.5 text-xs font-sans">
                        <span className="text-[10px] uppercase font-semibold text-[#C5A46D] tracking-wider">
                          18KT BIS Hallmarked
                        </span>
                        <h4 className="font-serif text-base text-[#24211E]">
                          Aura Solitaire Diamond Ring
                        </h4>
                        <p className="text-[#706860]">
                          18KT Yellow Gold &bull; Indian BIS Size 14 &bull; 0.52 ct VVS-EF
                        </p>
                        <span className="font-semibold text-[#24211E] block pt-1">
                          ₹68,500
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-xs font-sans space-y-1 w-full sm:w-auto">
                      <p className="text-[#706860]">Estimated Delivery:</p>
                      <p className="font-semibold text-[#24211E]">Wednesday, Oct 28</p>
                      <span className="text-[10px] text-[#A69A89] block">
                        Carrier: Blue Dart Apex (OTP Handover)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order 2: Delivered */}
                <div className="p-5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-4 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F1EAE0] text-xs font-sans">
                    <div>
                      <span className="text-[#A69A89]">Order Reference:</span>
                      <strong className="text-[#24211E] ml-1.5">#AUR-2026-8120</strong>
                    </div>
                    <span className="text-[#706860] uppercase text-[10px] tracking-wider flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Delivered on Oct 12, 2026
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="flex gap-3 items-center">
                      <div className="relative w-16 h-20 rounded-[2px] overflow-hidden bg-[#FAF8F5] border border-[#E8E1D7]">
                        <Image
                          src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=85"
                          alt="Celeste Trio Stackable Rings"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-0.5 text-xs font-sans">
                        <span className="text-[10px] uppercase font-semibold text-[#C5A46D] tracking-wider">
                          18KT Tri-Gold
                        </span>
                        <h4 className="font-serif text-base text-[#24211E]">
                          Celeste Trio Stackable Rings
                        </h4>
                        <p className="text-[#706860]">
                          Tri-Tone Gold &bull; Size 14 &bull; SGL Certified
                        </p>
                        <span className="font-semibold text-[#24211E] block pt-1">
                          ₹49,500
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast("Simulated invoice PDF generated.", "info")}
                        className="px-3 py-1.5 text-xs font-sans text-[#24211E] border border-[#E8E1D7] hover:border-[#C5A46D] rounded-[2px] transition-colors cursor-pointer"
                      >
                        View Tax Invoice
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Addresses */}
            {activeTab === "addresses" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 bg-[#FFFFFF] border border-[#C5A46D] rounded-[3px] space-y-2">
                  <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#C5A46D] text-[10px] font-sans font-semibold uppercase tracking-wider rounded-[2px] inline-block">
                    Primary Delivery Address
                  </span>
                  <h4 className="font-serif text-base text-[#24211E]">Penthouse Residence</h4>
                  <p className="text-xs font-sans text-[#706860] leading-relaxed">
                    Aaditya Varma<br />
                    Flat 14B, Altamount Heights, Altamount Road<br />
                    Cumballa Hill, Mumbai, Maharashtra 400026<br />
                    Phone: +91 98765 43210
                  </p>
                </div>

                <div className="p-5 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-2">
                  <span className="px-2 py-0.5 bg-[#FAF8F5] text-[#706860] text-[10px] font-sans font-semibold uppercase tracking-wider rounded-[2px] inline-block">
                    Office / Studio
                  </span>
                  <h4 className="font-serif text-base text-[#24211E]">Corporate Chamber</h4>
                  <p className="text-xs font-sans text-[#706860] leading-relaxed">
                    Aaditya Varma<br />
                    Level 8, Maker Chambers IV, Nariman Point<br />
                    Mumbai, Maharashtra 400021<br />
                    Phone: +91 22 8900 1200
                  </p>
                </div>
              </div>
            )}

            {/* Tab 3: Preferences */}
            {activeTab === "preferences" && (
              <div className="p-6 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-4">
                <h3 className="font-serif text-xl text-[#24211E]">
                  Your Fine Jewellery Profile
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-sans">
                  <div className="p-3 bg-[#FAF8F5] rounded-[2px] border border-[#E8E1D7]">
                    <span className="text-[#A69A89] block text-[10px] uppercase">Ring Size (BIS)</span>
                    <strong className="text-base font-serif text-[#24211E]">Size 14</strong>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-[2px] border border-[#E8E1D7]">
                    <span className="text-[#A69A89] block text-[10px] uppercase">Preferred Metal</span>
                    <strong className="text-base font-serif text-[#24211E]">18KT Yellow Gold</strong>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-[2px] border border-[#E8E1D7]">
                    <span className="text-[#A69A89] block text-[10px] uppercase">Bangle Circumference</span>
                    <strong className="text-base font-serif text-[#24211E]">2.6 Standard</strong>
                  </div>
                  <div className="p-3 bg-[#FAF8F5] rounded-[2px] border border-[#E8E1D7]">
                    <span className="text-[#A69A89] block text-[10px] uppercase">Solitaire Cut</span>
                    <strong className="text-base font-serif text-[#24211E]">Round Brilliant VVS1</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ============================================================ */
          /* SIGN IN / REGISTRATION INTERFACE                             */
          /* ============================================================ */
          <div className="max-w-md mx-auto bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] shadow-[0_8px_30px_rgba(36,33,30,0.04)] overflow-hidden">
            {/* Top Toggle Header */}
            <div className="grid grid-cols-2 border-b border-[#E8E1D7] text-xs font-sans font-semibold uppercase tracking-wider text-center">
              <button
                onClick={() => setAuthMode("signin")}
                className={`py-3.5 transition-colors cursor-pointer ${
                  authMode === "signin"
                    ? "bg-[#FFFFFF] text-[#24211E] border-b-2 border-[#24211E]"
                    : "bg-[#FAF8F5] text-[#A69A89] hover:text-[#24211E]"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode("register")}
                className={`py-3.5 transition-colors cursor-pointer ${
                  authMode === "register"
                    ? "bg-[#FFFFFF] text-[#24211E] border-b-2 border-[#24211E]"
                    : "bg-[#FAF8F5] text-[#A69A89] hover:text-[#24211E]"
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {authMode === "signin" ? (
                /* Sign In Form */
                <form onSubmit={handleSimulatedSignIn} className="space-y-4">
                  <div className="text-center space-y-1 pb-1">
                    <h2 className="font-serif text-2xl text-[#24211E]">
                      Welcome to Maison Auravia
                    </h2>
                    <p className="text-xs font-sans text-[#706860]">
                      Sign in to view your orders, insured certificates, and wishlist.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#A69A89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="yourname@example.com"
                        className="w-full h-10 pl-9 pr-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[11px] font-sans">
                      <label className="font-semibold uppercase tracking-wider text-[#24211E]">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast("Simulated password reset email sent.", "info")}
                        className="text-[#C5A46D] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#A69A89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full h-10 pl-9 pr-9 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A69A89] hover:text-[#24211E] cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button variant="primary" fullWidth size="lg" type="submit">
                      Sign In (Simulated Demo)
                    </Button>
                  </div>
                </form>
              ) : (
                /* Registration Form */
                <form onSubmit={handleSimulatedRegister} className="space-y-4">
                  <div className="text-center space-y-1 pb-1">
                    <h2 className="font-serif text-2xl text-[#24211E]">
                      Join The Auravia Circle
                    </h2>
                    <p className="text-xs font-sans text-[#706860]">
                      Register for private salon viewings, early drop previews, and priority courier tracking.
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="e.g. Radhika Merchant"
                      className="w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="radhika@example.com"
                      className="w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Mobile Number (For Courier OTP) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[11px] font-sans font-semibold uppercase tracking-wider text-[#24211E]">
                      Create Password *
                    </label>
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full h-10 px-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
                    />
                  </div>

                  <div className="pt-2">
                    <Button variant="primary" fullWidth size="lg" type="submit">
                      Create Collector Account (Demo)
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
