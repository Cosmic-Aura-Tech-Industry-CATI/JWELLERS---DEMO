import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      icon,
      iconPosition = "right",
      isLoading = false,
      children,
      className = "",
      disabled,
      ...props
    },
    ref
  ) => {
    // Restrained, elegant luxury sizing
    const sizeStyles = {
      sm: "h-9 px-4 text-[11px] tracking-[0.16em]",
      md: "h-11 px-6 text-xs tracking-[0.18em]",
      lg: "h-13 px-8 text-xs tracking-[0.22em]",
    };

    // Sophisticated editorial luxury variants
    const variantStyles = {
      primary:
        "bg-[#24211E] text-[#F8F5EF] border border-[#24211E] hover:bg-[#38332E] hover:border-[#38332E] active:bg-[#1A1816]",
      secondary:
        "bg-[#FFFFFF] text-[#24211E] border border-[#E8E1D7] hover:bg-[#FAF8F5] hover:border-[#C5A46D]/60 active:bg-[#F2ECE2]",
      gold:
        "bg-[#C5A46D] text-[#FFFFFF] border border-[#C5A46D] hover:bg-[#B39059] hover:border-[#B39059] active:bg-[#A38048]",
      outline:
        "bg-transparent text-[#24211E] border border-[#24211E] hover:bg-[#24211E] hover:text-[#F8F5EF] active:bg-[#38332E]",
      ghost:
        "bg-transparent text-[#24211E] border border-transparent hover:text-[#C5A46D] hover:bg-[#FAF8F5]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-sans font-medium uppercase transition-all duration-300 ease-out select-none
          rounded-[3px] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${fullWidth ? "w-full" : "w-auto"}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : icon && iconPosition === "left" ? (
          <span className="mr-2 inline-flex items-center">{icon}</span>
        ) : null}

        <span>{children}</span>

        {!isLoading && icon && iconPosition === "right" ? (
          <span className="ml-2 inline-flex items-center">{icon}</span>
        ) : null}
      </button>
    );
  }
);

Button.displayName = "Button";
