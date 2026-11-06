import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, icon, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-[#706860]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3.5 pointer-events-none text-[#A69A89] flex items-center">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={`
              w-full h-11 bg-[#FFFFFF] text-[#24211E] placeholder:text-[#A69A89]
              border border-[#E8E1D7] rounded-[3px] text-sm font-sans
              transition-colors duration-200 ease-out outline-none
              focus:border-[#C5A46D] focus:ring-1 focus:ring-[#C5A46D]/20
              disabled:bg-[#FAF8F5] disabled:cursor-not-allowed
              ${icon ? "pl-10 pr-4" : "px-4"}
              ${error ? "border-red-400 focus:border-red-500 focus:ring-red-200" : ""}
              ${className}
            `}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-[11px] font-sans text-red-600 tracking-wide">{error}</p>
        ) : helperText ? (
          <p className="text-[11px] font-sans text-[#A69A89] tracking-wide">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";
