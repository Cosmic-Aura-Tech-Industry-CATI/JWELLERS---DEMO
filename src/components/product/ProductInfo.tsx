"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Star,
  Check,
  Truck,
  MapPin,
  ChevronDown,
  Ruler,
} from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { SizeGuideModal } from "./SizeGuideModal";

interface ProductInfoProps {
  product: Product;
}

const metals = [
  { id: "18kt-yellow", label: "18KT Yellow Gold", colour: "#D4AF37" },
  { id: "18kt-rose", label: "18KT Rose Gold", colour: "#E0A899" },
  { id: "18kt-white", label: "18KT White Gold", colour: "#E2E8F0" },
  { id: "platinum", label: "950 Platinum", colour: "#CBD5E1" },
];

const ringSizes = ["10", "12", "14 (Standard)", "16", "18", "20"];
const chainLengths = ["16 Inches", "18 Inches (Standard)", "20 Inches"];

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isWishlisted = isInWishlist(product.id);

  // Purchasing State
  const [quantity, setQuantity] = useState(1);
  const [selectedMetal, setSelectedMetal] = useState(metals[0].label);
  const [selectedSize, setSelectedSize] = useState(
    product.category === "rings" || product.category === "stacks"
      ? "14 (Standard)"
      : "18 Inches (Standard)"
  );
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);

  // Accordion State
  const [openAccordion, setOpenAccordion] = useState<string>("specifications");

  // Simulated Pincode Checker State
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid?: boolean;
    message?: string;
  }>({ checked: false });

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price * quantity);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(product.originalPrice * quantity)
    : null;

  const discountPercent =
    product.discountPercentage ||
    (product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        )
      : null);

  const handleAddToCart = () => {
    addToCart(product, quantity, `${selectedMetal} • Size ${selectedSize}`);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, `${selectedMetal} • Size ${selectedSize}`);
    router.push("/cart");
  };

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length < 6) {
      setPincodeStatus({
        checked: true,
        valid: false,
        message: "Please enter a valid 6-digit Indian postal PIN code.",
      });
      return;
    }
    setPincodeStatus({
      checked: true,
      valid: true,
      message: `Express Insured Courier Available for ${pincode} • Estimated Delivery by Wednesday, Oct 28.`,
    });
  };

  const isRingOrStack = product.category === "rings" || product.category === "stacks";
  const isNecklaceOrPendant = product.category === "necklaces" || product.category === "pendants";

  return (
    <div className="space-y-6">
      {/* 1. Category Eyebrow & Live Availability */}
      <div className="flex items-center justify-between pb-1 border-b border-[#F1EAE0]">
        <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.22em] text-[#C5A46D]">
          {product.purity} &bull; {product.category}
        </span>

        <span className="inline-flex items-center gap-1.5 text-xs font-sans text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-[2px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-medium text-[11px] uppercase tracking-wider">
            {product.availability === "ready-to-ship"
              ? "Ready to Ship"
              : product.availability === "in-stock"
              ? "In Stock"
              : "Made to Order"}
          </span>
        </span>
      </div>

      {/* 2. Product Name & Subtitle */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E] tracking-tight leading-[1.12]">
          {product.name}
        </h1>
        {product.subtitle && (
          <p className="font-sans text-xs sm:text-sm text-[#706860] leading-relaxed">
            {product.subtitle}
          </p>
        )}
      </div>

      {/* 3. Rating & Review Count */}
      <div className="flex items-center gap-3 text-xs font-sans">
        <div className="flex items-center gap-1 text-[#24211E] font-medium">
          <Star className="w-3.5 h-3.5 fill-[#C5A46D] text-[#C5A46D]" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
        <span className="w-1 h-1 rounded-full bg-[#C5A46D]" />
        <span className="text-[#706860]">
          Based on <strong>{product.reviewCount}</strong> collector reviews
        </span>
      </div>

      {/* 4. Pricing Block */}
      <div className="p-4 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-1">
        <div className="flex items-baseline gap-3">
          <span className="font-sans text-2xl sm:text-3xl font-semibold text-[#24211E] tracking-tight">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="font-sans text-sm line-through text-[#A69A89]">
              {formattedOriginalPrice}
            </span>
          )}
          {discountPercent && (
            <span className="px-2 py-0.5 bg-[#24211E] text-[#F8F5EF] text-[10px] font-sans font-semibold uppercase tracking-wider rounded-[2px]">
              {discountPercent}% OFF
            </span>
          )}
        </div>
        <p className="text-[11px] font-sans text-[#706860] pt-1">
          Price inclusive of all taxes, hallmarking fees &amp; transit insurance.
        </p>
      </div>

      {/* 5. Product Options (Metal & Size) */}
      <div className="space-y-4 pt-2">
        {/* Metal Selector */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-sans">
            <span className="font-semibold uppercase tracking-wider text-[#24211E]">
              Selected Metal: <span className="font-normal text-[#706860]">{selectedMetal}</span>
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {metals.map((m) => {
              const isSelected = selectedMetal === m.label;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMetal(m.label)}
                  className={`
                    p-2.5 rounded-[2px] border text-xs font-sans text-left transition-all cursor-pointer flex items-center gap-2
                    ${
                      isSelected
                        ? "border-[#24211E] bg-[#FFFFFF] ring-1 ring-[#24211E]"
                        : "border-[#E8E1D7] bg-[#FAF8F5] hover:border-[#A69A89]"
                    }
                  `}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/10 flex-shrink-0"
                    style={{ backgroundColor: m.colour }}
                  />
                  <span className="truncate">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Size / Length Selector */}
        {(isRingOrStack || isNecklaceOrPendant) && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-semibold uppercase tracking-wider text-[#24211E]">
                {isRingOrStack ? "Ring Size (Indian BIS):" : "Chain Length:"}
              </span>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="text-[#C5A46D] hover:underline flex items-center gap-1 text-[11px] uppercase font-medium cursor-pointer"
              >
                <Ruler className="w-3 h-3" /> Size Guide
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {(isRingOrStack ? ringSizes : chainLengths).map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      px-3.5 py-1.5 text-xs font-sans rounded-[2px] border transition-all cursor-pointer
                      ${
                        isSelected
                          ? "bg-[#24211E] text-[#F8F5EF] border-[#24211E]"
                          : "bg-[#FFFFFF] text-[#4D4742] border-[#E8E1D7] hover:border-[#C5A46D]"
                      }
                    `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 6. Quantity Selector & CTAs */}
      <div className="space-y-3 pt-3 border-t border-[#F1EAE0]">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[#E8E1D7] rounded-[2px] bg-[#FFFFFF] h-12 flex-shrink-0">
            <button
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="w-8 sm:w-10 h-full flex items-center justify-center text-base font-sans text-[#706860] hover:text-[#24211E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            >
              &minus;
            </button>
            <span className="w-7 sm:w-10 text-center font-sans font-semibold text-xs sm:text-sm text-[#24211E]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((prev) => prev + 1)}
              aria-label="Increase quantity"
              className="w-8 sm:w-10 h-full flex items-center justify-center text-base font-sans text-[#706860] hover:text-[#24211E] cursor-pointer"
            >
              &#43;
            </button>
          </div>

          {/* Add to Bag Button */}
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            className="flex-1 h-12 text-xs sm:text-sm font-sans uppercase tracking-[0.12em]"
            icon={
              addedFeedback ? (
                <Check className="w-4 h-4 text-[#C5A46D]" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )
            }
          >
            <span className="truncate">
              {addedFeedback ? "Added to Bag" : "Add to Bag"}
            </span>
          </Button>

          {/* Wishlist Toggle Button */}
          <button
            onClick={() => toggleWishlist(product)}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="w-12 h-12 rounded-[2px] bg-[#FFFFFF] border border-[#E8E1D7] flex items-center justify-center text-[#24211E] hover:border-[#C5A46D] transition-colors cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 transition-transform ${
                isWishlisted
                  ? "fill-[#C5A46D] text-[#C5A46D] scale-110"
                  : "text-[#24211E]"
              }`}
            />
          </button>
        </div>

        {/* Buy Now Button */}
        <Button
          variant="gold"
          size="lg"
          fullWidth
          onClick={handleBuyNow}
          className="h-12"
        >
          Buy Now &bull; {formattedPrice}
        </Button>

        {addedFeedback && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-[2px] text-xs font-sans text-emerald-800 flex items-center justify-between animate-in fade-in">
            <span>Piece added to your shopping bag. Free insured shipping applied.</span>
            <button
              onClick={() => router.push("/cart")}
              className="font-semibold underline ml-2"
            >
              View Bag
            </button>
          </div>
        )}
      </div>

      {/* 7. Delivery Pincode Check UI (Simulated Demo Clearly Marked) */}
      <div className="p-4 bg-[#FFFFFF] border border-[#E8E1D7] rounded-[3px] space-y-2.5">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="font-semibold text-[#24211E] flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Truck className="w-3.5 h-3.5 text-[#C5A46D]" /> Check Estimated Delivery
          </span>
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#A69A89]">
            Demo Simulated Service
          </span>
        </div>

        <form onSubmit={handlePincodeCheck} className="flex gap-2">
          <div className="relative flex-1">
            <MapPin className="w-3.5 h-3.5 text-[#A69A89] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit Indian PIN code"
              className="w-full h-10 pl-9 pr-3 text-xs font-sans bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] outline-none focus:border-[#C5A46D]"
            />
          </div>
          <button
            type="submit"
            className="h-10 px-5 bg-[#24211E] text-[#F8F5EF] text-xs font-sans font-medium uppercase tracking-wider rounded-[2px] hover:bg-[#38332E] cursor-pointer"
          >
            Check
          </button>
        </form>

        {pincodeStatus.checked && (
          <p
            className={`text-xs font-sans pt-1 ${
              pincodeStatus.valid ? "text-emerald-700 font-medium" : "text-red-600"
            }`}
          >
            {pincodeStatus.message}
          </p>
        )}
      </div>

      {/* 8. Expandable Product Information Sections (Accordions) */}
      <div className="border-t border-[#E8E1D7] pt-2 divide-y divide-[#E8E1D7]">
        {/* Section A: Specifications */}
        <div>
          <button
            onClick={() =>
              setOpenAccordion(
                openAccordion === "specifications" ? "" : "specifications"
              )
            }
            className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#24211E] hover:text-[#C5A46D] transition-colors cursor-pointer"
          >
            <span>Material &amp; Certified Specifications</span>
            <ChevronDown
              className={`w-4 h-4 text-[#A69A89] transition-transform ${
                openAccordion === "specifications" ? "rotate-180 text-[#C5A46D]" : ""
              }`}
            />
          </button>

          {openAccordion === "specifications" && (
            <div className="pb-5 space-y-2 text-xs font-sans text-[#4D4742]">
              <div className="grid grid-cols-2 gap-2 bg-[#FAF8F5] p-3 border border-[#E8E1D7] rounded-[2px]">
                <div>
                  <span className="text-[#A69A89] uppercase text-[10px] block">
                    Gold Purity
                  </span>
                  <span className="font-semibold text-[#24211E]">{product.purity}</span>
                </div>
                <div>
                  <span className="text-[#A69A89] uppercase text-[10px] block">
                    Gross Weight
                  </span>
                  <span className="font-semibold text-[#24211E]">
                    {product.grossWeight || "3.42 g"}
                  </span>
                </div>
                <div>
                  <span className="text-[#A69A89] uppercase text-[10px] block">
                    Diamond Grading
                  </span>
                  <span className="font-semibold text-[#24211E]">
                    {product.diamondSpec || "Natural VVS-EF Diamond"}
                  </span>
                </div>
                <div>
                  <span className="text-[#A69A89] uppercase text-[10px] block">
                    Dimensions
                  </span>
                  <span className="font-semibold text-[#24211E]">
                    {isRingOrStack
                      ? "1.8mm band • 5.2mm setting"
                      : isNecklaceOrPendant
                      ? "16mm × 11mm • 1.2mm chain"
                      : product.category === "bracelets"
                      ? "165mm inner circ • 3.2mm width"
                      : "14mm × 8.5mm motif"}
                  </span>
                </div>
                <div className="col-span-2 pt-1 border-t border-[#E8E1D7]">
                  <span className="text-[#A69A89] uppercase text-[10px] block">
                    Authentication &amp; Hallmarking
                  </span>
                  <span className="font-semibold text-[#24211E] text-[11px]">
                    BIS 6-Digit Alphanumeric HUID Laser Inscription &bull; SGL / IGI Natural Diamond Card
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section B: Artisanal Description & Story */}
        <div>
          <button
            onClick={() =>
              setOpenAccordion(
                openAccordion === "description" ? "" : "description"
              )
            }
            className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#24211E] hover:text-[#C5A46D] transition-colors cursor-pointer"
          >
            <span>The Artisanal Story</span>
            <ChevronDown
              className={`w-4 h-4 text-[#A69A89] transition-transform ${
                openAccordion === "description" ? "rotate-180 text-[#C5A46D]" : ""
              }`}
            />
          </button>

          {openAccordion === "description" && (
            <div className="pb-5 space-y-2 text-xs font-sans text-[#706860] leading-relaxed">
              <p>
                Handcrafted at our specialized Mumbai and Jaipur salons. Each prong is precision
                tuned by master karigars to maximize light refraction through natural brilliant
                diamonds. Designed for ergonomic comfort during daily wear or celebratory rituals.
              </p>
            </div>
          )}
        </div>

        {/* Section C: Care & Longevity */}
        <div>
          <button
            onClick={() =>
              setOpenAccordion(openAccordion === "care" ? "" : "care")
            }
            className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#24211E] hover:text-[#C5A46D] transition-colors cursor-pointer"
          >
            <span>Jewellery Care &amp; Longevity</span>
            <ChevronDown
              className={`w-4 h-4 text-[#A69A89] transition-transform ${
                openAccordion === "care" ? "rotate-180 text-[#C5A46D]" : ""
              }`}
            />
          </button>

          {openAccordion === "care" && (
            <div className="pb-5 space-y-2 text-xs font-sans text-[#706860] leading-relaxed">
              <ul className="list-disc list-inside space-y-1">
                <li>Store individually inside the provided Auravia velvet keepsake box.</li>
                <li>Avoid direct contact with perfumes, chlorine, and harsh sanitizers.</li>
                <li>Clean gently with a soft microfibre cloth and warm soapy water.</li>
                <li>Enjoy complimentary lifetime ultrasonic cleaning at our Mumbai atelier.</li>
              </ul>
            </div>
          )}
        </div>

        {/* Section D: Shipping & Assurances */}
        <div>
          <button
            onClick={() =>
              setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")
            }
            className="w-full py-4 flex items-center justify-between text-left font-serif text-lg text-[#24211E] hover:text-[#C5A46D] transition-colors cursor-pointer"
          >
            <span>Insured Shipping &amp; 15-Day Returns</span>
            <ChevronDown
              className={`w-4 h-4 text-[#A69A89] transition-transform ${
                openAccordion === "shipping" ? "rotate-180 text-[#C5A46D]" : ""
              }`}
            />
          </button>

          {openAccordion === "shipping" && (
            <div className="pb-5 space-y-2 text-xs font-sans text-[#706860] leading-relaxed">
              <p>
                <strong>Complimentary Doorstep Transit:</strong> All orders are dispatched in
                tamper-proof steel-reinforced security boxes with full insurance coverage.
              </p>
              <p>
                <strong>15-Day Easy Returns:</strong> You may exchange or return any standard piece
                within 15 days of receipt. Complimentary doorstep return pickup is provided.
              </p>
              <p className="text-[10px] text-[#A69A89] italic">
                Demo Notice: Business terms reflect simulated e-commerce policies.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sizing Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};
