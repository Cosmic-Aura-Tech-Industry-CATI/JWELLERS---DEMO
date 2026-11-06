/**
 * AURAVIA Fine Jewellery - Design System Tokens
 * Source of truth for colors, typography, radii, shadows, and spacing.
 */

export const brandTokens = {
  identity: {
    name: "AURAVIA",
    legalName: "Auravia Fine Jewellery Maison",
    tagline: "Haute Fine Jewellery & Heirlooms",
    descriptor: "Certified Diamonds • 18KT & 22KT BIS Hallmarked Gold",
    establishedYear: 2024,
  },
  colors: {
    // Core Visual Palette (User Specified)
    warmIvory: "#F8F5EF",
    pureWhite: "#FFFFFF",
    champagneGold: "#C5A46D",
    deepCharcoal: "#24211E",
    mutedTaupe: "#A69A89",
    lightBorder: "#E8E1D7",

    // Harmonious Extensions
    gold: {
      default: "#C5A46D",
      hover: "#B39059",
      light: "#D9BE91",
      subtle: "#F7F2E8",
      accent: "rgba(197, 164, 109, 0.15)",
    },
    charcoal: {
      default: "#24211E",
      muted: "#4D4742",
      soft: "#706860",
      faded: "#8C837A",
    },
    taupe: {
      default: "#A69A89",
      light: "#C4B9AA",
      dark: "#8C8070",
    },
    border: {
      default: "#E8E1D7",
      subtle: "#F1EAE0",
      strong: "#D4CABE",
    },
    ivory: {
      default: "#F8F5EF",
      warm: "#F4EFE6",
      light: "#FCFAF6",
    },
  },
  typography: {
    fonts: {
      serif: 'var(--font-serif), "Cormorant Garamond", Georgia, serif',
      sans: 'var(--font-sans), "Plus Jakarta Sans", system-ui, sans-serif',
    },
    scales: {
      display: "text-4xl md:text-6xl lg:text-7xl font-serif font-light tracking-tight",
      h1: "text-3xl md:text-5xl font-serif font-normal tracking-tight",
      h2: "text-2xl md:text-3xl font-serif font-normal",
      h3: "text-xl md:text-2xl font-serif font-normal",
      h4: "text-lg md:text-xl font-serif font-medium",
      bodyLarge: "text-base md:text-lg font-sans font-light leading-relaxed",
      body: "text-sm md:text-base font-sans font-normal leading-relaxed text-[#4D4742]",
      bodySmall: "text-xs md:text-sm font-sans font-normal text-[#706860]",
      eyebrow: "text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#A69A89]",
      price: "text-base md:text-lg font-sans font-semibold tracking-tight text-[#24211E]",
      priceStrike: "text-xs md:text-sm font-sans font-normal line-through text-[#A69A89]",
    },
  },
  radii: {
    none: "rounded-none",
    xs: "rounded-[2px]",
    sm: "rounded-[4px]",
    md: "rounded-[6px]",
  },
  shadows: {
    subtle: "shadow-[0_1px_3px_rgba(36,33,30,0.03),0_4px_12px_rgba(36,33,30,0.02)]",
    card: "shadow-[0_2px_8px_rgba(36,33,30,0.04),0_6px_20px_rgba(36,33,30,0.03)]",
    hover: "shadow-[0_8px_24px_-4px_rgba(36,33,30,0.06),0_2px_6px_-1px_rgba(36,33,30,0.03)]",
  },
  transitions: {
    default: "transition-all duration-300 ease-out",
    smooth: "transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)",
  },
} as const;
