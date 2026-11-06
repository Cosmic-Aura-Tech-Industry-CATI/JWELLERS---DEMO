"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, X, ShoppingBag, Heart } from "lucide-react";

export interface Toast {
  id: string;
  message: string;
  type?: "success" | "cart" | "wishlist" | "info";
}

interface ToastContextType {
  showToast: (message: string, type?: Toast["type"]) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: Toast["type"] = "success") => {
      const id = `${Date.now()}-${Math.random()}`;
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    []
  );

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Accessible Live Region for Screen Readers & Visual Feedback */}
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full px-4 sm:px-0 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-[#FFFFFF] border border-[#C5A46D]/60 rounded-[3px] p-3.5 shadow-[0_8px_30px_rgba(36,33,30,0.12)] flex items-start justify-between gap-3 animate-in slide-in-from-bottom duration-300 transition-all"
          >
            <div className="flex items-start gap-2.5">
              {toast.type === "cart" ? (
                <ShoppingBag className="w-4 h-4 text-[#C5A46D] mt-0.5 flex-shrink-0" />
              ) : toast.type === "wishlist" ? (
                <Heart className="w-4 h-4 fill-[#C5A46D] text-[#C5A46D] mt-0.5 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
              )}
              <div className="space-y-0.5">
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C5A46D] block">
                  Maison Auravia Notice
                </span>
                <p className="text-xs font-sans text-[#24211E] font-medium leading-snug">
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
              className="text-[#A69A89] hover:text-[#24211E] p-0.5 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
