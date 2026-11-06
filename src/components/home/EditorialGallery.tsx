"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface GalleryItem {
  id: string;
  image: string;
  tag: string;
  piece: string;
  href: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    image: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80",
    tag: "#EverydayStack",
    piece: "Celeste Trio 18KT Bands",
    href: "/collections/rings?style=stacks",
  },
  {
    id: "gal-2",
    image: "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=600&q=80",
    tag: "#DiamondLines",
    piece: "Mira Tennis Bracelet",
    href: "/collections/bracelets?style=tennis",
  },
  {
    id: "gal-3",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    tag: "#RoyalPolki",
    piece: "Vanya Uncut Polki Drops",
    href: "/collections/earrings?style=drops",
  },
  {
    id: "gal-4",
    image: "https://images.unsplash.com/photo-1611591475876-efef464309e4?auto=format&fit=crop&w=600&q=80",
    tag: "#SovereignGold",
    piece: "Imperial 22KT Kada",
    href: "/collections/mens",
  },
  {
    id: "gal-5",
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=600&q=80",
    tag: "#SolitaireGrace",
    piece: "Aura Solitaire Ring",
    href: "/collections/rings?style=solitaire",
  },
  {
    id: "gal-6",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    tag: "#EmeraldSuite",
    piece: "Sylvan Zambian Emerald",
    href: "/collections/necklaces?gem=emerald",
  },
];

export const EditorialGallery: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8E1D7]">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <InstagramIcon className="w-4 h-4 text-[#C5A46D]" />
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">
              @AURAVIA.JEWELLERY
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#24211E] tracking-tight">
            The Living <span className="italic font-normal text-[#C5A46D]">Lookbook</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#706860] mt-1 font-light">
            Tag #AuraviaHeirlooms on Instagram to be featured in our seasonal salon gallery.
          </p>
        </div>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-sans font-medium uppercase tracking-[0.18em] text-[#24211E] hover:text-[#C5A46D] transition-colors py-2 border-b border-[#24211E] hover:border-[#C5A46D]"
        >
          <span>Follow @auravia.jewellery</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {galleryItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="group relative aspect-square w-full overflow-hidden bg-[#FAF8F5] border border-[#E8E1D7] rounded-[2px]"
          >
            <Image
              src={item.image}
              alt={item.piece}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-[#24211E]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-[#F8F5EF]">
              <div className="flex justify-between items-center text-[10px] font-sans tracking-wider text-[#C5A46D]">
                <span>{item.tag}</span>
                <InstagramIcon className="w-3.5 h-3.5" />
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-serif block line-clamp-1">
                  {item.piece}
                </span>
                <span className="text-[9px] font-sans uppercase tracking-[0.16em] text-[#A69A89] flex items-center gap-1">
                  Shop Piece <ArrowUpRight className="w-2.5 h-2.5 text-[#C5A46D]" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
