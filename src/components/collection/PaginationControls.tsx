"use client";

import React from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PaginationControlsProps {
  totalItems: number;
  visibleCount: number;
  onLoadMore: () => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  totalItems,
  visibleCount,
  onLoadMore,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalItems <= 0) return null;

  const hasMore = visibleCount < totalItems;
  const progressPercent = Math.min(100, (visibleCount / totalItems) * 100);

  return (
    <div className="mt-14 pt-8 border-t border-[#E8E1D7] flex flex-col items-center justify-center space-y-6">
      {/* Progress Counter */}
      <div className="w-full max-w-xs text-center space-y-2">
        <span className="text-xs font-sans text-[#706860]">
          Showing <strong>{Math.min(visibleCount, totalItems)}</strong> of{" "}
          <strong>{totalItems}</strong> creations
        </span>
        <div className="w-full h-1 bg-[#E8E1D7] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A46D] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <Button
          variant="secondary"
          size="md"
          onClick={onLoadMore}
          icon={<ArrowDown className="w-3.5 h-3.5" />}
        >
          Load More Creations
        </Button>
      )}

      {/* Discrete Page Number Controls */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1.5 pt-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            aria-label="Previous page"
            className="w-8 h-8 rounded-[2px] border border-[#E8E1D7] bg-[#FFFFFF] flex items-center justify-center text-[#24211E] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C5A46D]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            const isCurrent = page === currentPage;
            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`
                  w-8 h-8 rounded-[2px] text-xs font-sans font-medium transition-colors
                  ${
                    isCurrent
                      ? "bg-[#24211E] text-[#F8F5EF] border border-[#24211E]"
                      : "bg-[#FFFFFF] text-[#24211E] border border-[#E8E1D7] hover:border-[#C5A46D]"
                  }
                `}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            aria-label="Next page"
            className="w-8 h-8 rounded-[2px] border border-[#E8E1D7] bg-[#FFFFFF] flex items-center justify-center text-[#24211E] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#C5A46D]"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
