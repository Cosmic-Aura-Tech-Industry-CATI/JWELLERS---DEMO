import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "hallmark" | "gold" | "subtle" | "outline" | "editorial";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "subtle",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] tracking-[0.14em]",
    md: "px-2.5 py-1 text-[11px] tracking-[0.18em]",
  };

  const variantStyles = {
    hallmark:
      "bg-[#24211E] text-[#F8F5EF] border border-[#24211E] font-medium",
    gold:
      "bg-[#F7F2E8] text-[#9A7D4C] border border-[#C5A46D]/40 font-semibold",
    subtle:
      "bg-[#FFFFFF] text-[#4D4742] border border-[#E8E1D7] font-medium",
    outline:
      "bg-transparent text-[#706860] border border-[#E8E1D7] font-medium",
    editorial:
      "bg-[#FAF8F5] text-[#24211E] border-b border-[#C5A46D] font-serif tracking-[0.12em] normal-case text-xs",
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center font-sans uppercase rounded-[2px] select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
};
