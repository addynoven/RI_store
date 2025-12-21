"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (currentPage > 3) {
        pages.push("...");
      }
      
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (currentPage < totalPages - 2) {
        pages.push("...");
      }
      
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <nav className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 w-9"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {getVisiblePages().map((page, index) => (
        typeof page === "number" ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className={`h-9 w-9 ${currentPage === page ? "bg-gray-900 text-white hover:bg-gray-800" : ""}`}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 text-gray-400">
            {page}
          </span>
        )
      ))}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 w-9"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}
