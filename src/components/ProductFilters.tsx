"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface FilterGroup {
  name: string;
  options: { label: string; value: string; count?: number }[];
}

const CATEGORIES: FilterGroup = {
  name: "Categories",
  options: [
    { label: "Bracelets", value: "bracelets", count: 16 },
    { label: "Earrings", value: "earrings", count: 16 },
    { label: "Necklaces", value: "necklaces", count: 12 },
    { label: "Rings", value: "rings", count: 13 },
    { label: "Gold Set", value: "gold-set", count: 4 },
    { label: "Silver Set", value: "silver-set", count: 3 },
  ],
};

interface ProductFiltersProps {
  onFilterChange?: (filters: Record<string, string[]>) => void;
  onPriceChange?: (range: [number, number]) => void;
  onClearFilters?: () => void;
}

export default function ProductFilters({ 
  onFilterChange, 
  onPriceChange,
  onClearFilters 
}: ProductFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    rating: false,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (value: string, checked: boolean) => {
    const newSelected = checked 
      ? [...selectedCategories, value]
      : selectedCategories.filter(v => v !== value);
    setSelectedCategories(newSelected);
    onFilterChange?.({ categories: newSelected });
  };

  const handlePriceChange = (value: number[]) => {
    const range: [number, number] = [value[0], value[1]];
    setPriceRange(range);
    onPriceChange?.(range);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2000]);
    onClearFilters?.();
  };

  return (
    <aside className="w-full lg:w-64 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        {selectedCategories.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearAll}
            className="text-red-500 hover:text-red-600 h-auto p-0"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="border-b border-gray-100 pb-6">
        <button 
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Categories</span>
          {expandedSections.categories ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.categories && (
          <div className="space-y-3">
            {CATEGORIES.options.map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <Checkbox 
                  checked={selectedCategories.includes(option.value)}
                  onCheckedChange={(checked) => handleCategoryChange(option.value, checked as boolean)}
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors flex-1">
                  {option.label}
                </span>
                {option.count && (
                  <span className="text-xs text-gray-400">({option.count})</span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border-b border-gray-100 pb-6">
        <button 
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Price Range</span>
          {expandedSections.price ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.price && (
          <div className="space-y-4">
            <Slider
              defaultValue={[0, 2000]}
              max={2000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              className="[&>span:first-child]:bg-gray-200 [&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-red-500 [&>span:first-child>span]:bg-red-500"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">${priceRange[0]}</span>
              <span className="text-gray-600">${priceRange[1]}</span>
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="pb-6">
        <button 
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full mb-4"
        >
          <span className="text-sm font-bold uppercase tracking-wider text-gray-900">Rating</span>
          {expandedSections.rating ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        {expandedSections.rating && (
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((stars) => (
              <label key={stars} className="flex items-center gap-3 cursor-pointer group">
                <Checkbox />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className={`w-4 h-4 ${i < stars ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`} 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-400">& Up</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
