import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  italicWord?: string;
  description?: string;
  align?: "left" | "center";
  actionHref?: string;
  actionText?: string;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  italicWord,
  description,
  align = "center",
  actionHref,
  actionText,
  className = "",
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={`
        w-full mb-10 md:mb-14
        ${isCenter ? "text-center max-w-2xl mx-auto" : "flex flex-col md:flex-row md:items-end md:justify-between"}
        ${className}
      `}
    >
      <div className={isCenter ? "space-y-3" : "space-y-2 max-w-xl"}>
        {eyebrow && (
          <div className="flex items-center gap-3 justify-center md:justify-start">
            {isCenter && <span className="w-6 h-[1px] bg-[#C5A46D]/60" />}
            <span className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#A69A89]">
              {eyebrow}
            </span>
            {isCenter && <span className="w-6 h-[1px] bg-[#C5A46D]/60" />}
          </div>
        )}

        <h2 className="font-serif text-3xl md:text-5xl font-light text-[#24211E] tracking-tight leading-[1.12]">
          {title}{" "}
          {italicWord && (
            <span className="italic font-normal text-[#C5A46D]">
              {italicWord}
            </span>
          )}
        </h2>

        {description && (
          <p className="font-sans text-sm md:text-base font-light text-[#706860] leading-relaxed pt-1">
            {description}
          </p>
        )}
      </div>

      {actionHref && actionText && (
        <div className={`mt-4 md:mt-0 ${isCenter ? "pt-4" : ""}`}>
          <Link
            href={actionHref}
            className="group inline-flex items-center text-xs font-sans font-medium uppercase tracking-[0.2em] text-[#24211E] hover:text-[#C5A46D] transition-colors duration-200"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 ease-out group-hover:translate-x-1 text-[#C5A46D]" />
          </Link>
        </div>
      )}
    </div>
  );
};
