"use client";

import React, { useEffect } from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isRing = category === "rings" || category === "stacks";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211E]/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sizing & Fit Guide"
        className="relative w-full max-w-lg bg-[#FAF8F5] border border-[#E8E1D7] rounded-[3px] shadow-2xl p-6 sm:p-8 space-y-6 z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#E8E1D7]">
          <div className="flex items-center gap-2">
            <Ruler className="w-4 h-4 text-[#C5A46D]" />
            <h3 className="font-serif text-xl font-normal text-[#24211E]">
              {isRing ? "Maison Ring Sizing Guide" : "Length & Dimension Guide"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close size guide"
            className="p-1 text-[#706860] hover:text-[#24211E] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isRing ? (
          <div className="space-y-4">
            <p className="font-sans text-xs text-[#706860] leading-relaxed">
              Standard Indian (BIS) ring sizes correspond to inner diameter measurements in millimeters.
              If between sizes, we recommend ordering the larger size.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans border border-[#E8E1D7] bg-[#FFFFFF]">
                <thead className="bg-[#FAF8F5] border-b border-[#E8E1D7] text-[#24211E] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">India / Asia</th>
                    <th className="py-2.5 px-3">Inner Diameter</th>
                    <th className="py-2.5 px-3">Circumference</th>
                    <th className="py-2.5 px-3">US / Canada</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1EAE0] text-[#4D4742]">
                  <tr>
                    <td className="py-2 px-3 font-semibold text-[#24211E]">Size 10</td>
                    <td className="py-2 px-3">15.9 mm</td>
                    <td className="py-2 px-3">50.0 mm</td>
                    <td className="py-2 px-3">5.25</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-[#24211E]">Size 12</td>
                    <td className="py-2 px-3">16.5 mm</td>
                    <td className="py-2 px-3">51.9 mm</td>
                    <td className="py-2 px-3">6.0</td>
                  </tr>
                  <tr className="bg-[#F7F2E8]/40">
                    <td className="py-2 px-3 font-semibold text-[#24211E]">Size 14 (Standard)</td>
                    <td className="py-2 px-3">17.2 mm</td>
                    <td className="py-2 px-3">54.0 mm</td>
                    <td className="py-2 px-3">6.75</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-[#24211E]">Size 16</td>
                    <td className="py-2 px-3">17.8 mm</td>
                    <td className="py-2 px-3">56.0 mm</td>
                    <td className="py-2 px-3">7.5</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-[#24211E]">Size 18</td>
                    <td className="py-2 px-3">18.5 mm</td>
                    <td className="py-2 px-3">58.0 mm</td>
                    <td className="py-2 px-3">8.25</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold text-[#24211E]">Size 20</td>
                    <td className="py-2 px-3">19.1 mm</td>
                    <td className="py-2 px-3">60.0 mm</td>
                    <td className="py-2 px-3">9.0</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px] text-[11px] font-sans text-[#706860] space-y-1">
              <p className="font-semibold text-[#24211E]">Complimentary Resizing Policy</p>
              <p>
                Auravia provides one complimentary ring resize within 30 days of receipt on all solitaire and gold bands.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs font-sans text-[#706860] leading-relaxed">
            <p>
              Necklace lengths are measured from clasp to end ring:
            </p>
            <ul className="space-y-2 list-disc list-inside text-[#24211E]">
              <li><strong>16 Inches (Choker / Collar):</strong> Rests snugly around the base of the throat.</li>
              <li><strong>18 Inches (Princess / Standard):</strong> Sits elegantly below the collarbone, ideal for solitaires.</li>
              <li><strong>20–22 Inches (Matinee):</strong> Ideal for low necklines and layered necklace stacks.</li>
            </ul>
          </div>
        )}

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#24211E] text-[#F8F5EF] text-xs font-sans uppercase tracking-widest rounded-[2px] hover:bg-[#38332E] cursor-pointer"
          >
            I Understand My Fit
          </button>
        </div>
      </div>
    </div>
  );
};
