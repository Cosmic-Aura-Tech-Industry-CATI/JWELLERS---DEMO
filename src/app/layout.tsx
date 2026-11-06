import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURAVIA | Haute Fine Jewellery & Heirlooms",
  description:
    "Refined Indian jewellery aesthetics meet modern luxury. Discover BIS hallmarked gold, IGI certified diamonds, and stackable fine jewellery.",
};

import { AppProviders } from "@/components/providers/AppProviders";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#F8F5EF] text-[#24211E] font-sans selection:bg-[#C5A46D]/20 selection:text-[#24211E]">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
