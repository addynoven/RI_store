"use client";

import { useProducts, UseProductsOptions, SortOption, ProductFilters } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Grid3X3,
  LayoutList,
  SlidersHorizontal,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { useState } from "react";

// Price ranges for filter
const PRICE_RANGES = [
  { label: "Under ₹100", min: 0, max: 100 },
  { label: "₹100 - ₹200", min: 100, max: 200 },
  { label: "₹200 - ₹500", min: 200, max: 500 },
  { label: "₹500 - ₹1000", min: 500, max: 1000 },
  { label: "Over ₹1000", min: 1000, max: undefined },
];

const ITEMS_PER_PAGE_OPTIONS = [20, 50, 100];

interface ProductGridProps {
  // Hook options
  category?: string;
  initialFilters?: ProductFilters;
  initialSort?: SortOption;
  initialLimit?: number;
  
  // Display options
  showFilters?: boolean;
  showSort?: boolean;
  showPagination?: boolean;
  showItemsPerPage?: boolean;
  showViewToggle?: boolean;
  gridCols?: 3 | 4;
  
  // Header customization
  headerContent?: React.ReactNode;
  emptyMessage?: string;
}

export default function ProductGrid({
  category,
  initialFilters,
  initialSort = "newest",
  initialLimit = 20,
  showFilters = true,
  showSort = true,
  showPagination = true,
  showItemsPerPage = true,
  showViewToggle = false,
  gridCols = 3,
  headerContent,
  emptyMessage = "No products found.",
}: ProductGridProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const {
    products,
    categories,
    totalProducts,
    totalPages,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    filters,
    updateFilter,
    clearFilters,
    activeFilterCount,
    sort,
    setSort,
    loading,
  } = useProducts({
    category,
    filters: initialFilters,
    sort: initialSort,
    initialLimit,
  });

  // Handle category filter toggle
  const handleCategoryToggle = (slug: string) => {
    const currentCategories = filters.categories || [];
    const newCategories = currentCategories.includes(slug)
      ? currentCategories.filter((c) => c !== slug)
      : [...currentCategories, slug];
    updateFilter("categories", newCategories.length > 0 ? newCategories : undefined);
  };

  // Handle price range selection
  const handlePriceRangeSelect = (min: number, max?: number) => {
    const isSelected = filters.minPrice === min && filters.maxPrice === max;
    if (isSelected) {
      updateFilter("minPrice", undefined);
      updateFilter("maxPrice", undefined);
    } else {
      updateFilter("minPrice", min);
      updateFilter("maxPrice", max);
    }
  };

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="w-64 space-y-8">
      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}

      {/* Categories - only show if not in category page */}
      {!category && categories.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
            Categories
          </h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategoryToggle(cat.slug)}
                className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-md transition-colors ${
                  filters.categories?.includes(cat.slug)
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <span className="text-sm">{cat.name}</span>
                <span className="text-xs opacity-60">
                  ({cat._count?.products ?? 0})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
          Price Range
        </h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => {
            const isSelected =
              filters.minPrice === range.min && filters.maxPrice === range.max;
            return (
              <button
                key={index}
                onClick={() => handlePriceRangeSelect(range.min, range.max)}
                className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-md transition-colors ${
                  isSelected
                    ? "bg-gray-900 text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <span className="text-sm">{range.label}</span>
                {isSelected && <Check className="w-4 h-4" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const gridColsClass = gridCols === 4 
    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className="flex gap-8">
      {/* Sidebar Filters - Desktop */}
      {showFilters && (
        <div className="hidden lg:block flex-shrink-0">
          <FilterSidebar />
        </div>
      )}

      {/* Mobile Filter Button */}
      {showFilters && (
        <Button
          variant="outline"
          className="lg:hidden fixed bottom-6 right-6 z-50 shadow-lg"
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      )}

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Filters</h3>
              <button onClick={() => setShowMobileFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="flex-1">
        {/* Header content (optional) */}
        {headerContent}

        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium text-gray-900">{products.length}</span>{" "}
            of <span className="font-medium text-gray-900">{totalProducts}</span>{" "}
            products
          </p>

          <div className="flex items-center gap-4">
            {/* Items per page */}
            {showItemsPerPage && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">Show:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(val) => setItemsPerPage(Number(val))}
                >
                  <SelectTrigger className="w-[70px] h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Sort dropdown */}
            {showSort && (
              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortOption)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* View toggle */}
            {showViewToggle && (
              <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-md p-1">
                <button className="p-1.5 rounded bg-gray-100">
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded hover:bg-gray-50">
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Active Filter Tags */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filters.categories?.map((slug) => {
              const cat = categories.find((c) => c.slug === slug);
              return (
                <button
                  key={slug}
                  onClick={() => handleCategoryToggle(slug)}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
                >
                  {cat?.name || slug}
                  <X className="w-3 h-3" />
                </button>
              );
            })}
            {(filters.minPrice !== undefined || filters.maxPrice !== undefined) && (
              <button
                onClick={() => {
                  updateFilter("minPrice", undefined);
                  updateFilter("maxPrice", undefined);
                }}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
              >
                {PRICE_RANGES.find(
                  (r) => r.min === filters.minPrice && r.max === filters.maxPrice
                )?.label || `₹${filters.minPrice || 0} - ₹${filters.maxPrice || "∞"}`}
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className={`grid ${gridColsClass} gap-6`}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                slug={product.slug}
                title={product.title}
                category={product.category?.name ?? ""}
                price={product.price}
                originalPrice={product.originalPrice ?? undefined}
                rating={product.rating}
                reviews={product.reviewsCount}
                itemsLeft={product.itemsLeft}
                discountPercentage={product.discountPercentage ?? undefined}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">{emptyMessage}</p>
            {activeFilterCount > 0 && (
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
