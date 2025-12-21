"use client";

import { useState, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Grid3X3, LayoutList, SlidersHorizontal, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRODUCTS, CATEGORIES, PRICE_RANGES, filterProducts } from "@/lib/products";

const ITEMS_PER_PAGE = 9;

export default function ShopPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "newest">("newest");
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);

  // Apply filters instantly (no API call needed - client-side)
  const filteredProducts = useMemo(() => {
    return filterProducts({
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      minPrice: selectedPriceRange?.min,
      maxPrice: selectedPriceRange?.max,
      sortBy,
    });
  }, [selectedCategories, selectedPriceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  const handleCategoryToggle = (slug: string) => {
    setSelectedCategories(prev => 
      prev.includes(slug) 
        ? prev.filter(c => c !== slug)
        : [...prev, slug]
    );
    setCurrentPage(1);
  };

  const handlePriceRangeSelect = (range: { min: number; max: number } | null) => {
    setSelectedPriceRange(range);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedPriceRange(null);
    setCurrentPage(1);
  };

  const activeFilterCount = selectedCategories.length + (selectedPriceRange ? 1 : 0);

  // Filter Sidebar Component
  const FilterSidebar = () => (
    <div className="w-64 space-y-8">
      {/* Clear Filters */}
      {activeFilterCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="text-sm text-red-500 hover:underline"
        >
          Clear all filters ({activeFilterCount})
        </button>
      )}

      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryToggle(category.slug)}
              className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-md transition-colors ${
                selectedCategories.includes(category.slug)
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <span className="text-sm">{category.name}</span>
              <span className="text-xs opacity-60">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map((range, index) => (
            <button
              key={index}
              onClick={() => handlePriceRangeSelect(
                selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                  ? null
                  : range
              )}
              className={`flex items-center justify-between w-full text-left py-2 px-3 rounded-md transition-colors ${
                selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max
                  ? "bg-gray-900 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <span className="text-sm">{range.label}</span>
              {selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max && (
                <Check className="w-4 h-4" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Shop</h1>
          <Breadcrumb items={[{ label: "Shop" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex gap-8">
          
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          {/* Mobile Filter Button */}
          <Button
            variant="outline"
            className="lg:hidden fixed bottom-6 right-6 z-50 shadow-lg"
            onClick={() => setShowFilters(true)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowFilters(false)} />
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Filters</h3>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <FilterSidebar />
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
              <p className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">{paginatedProducts.length}</span> of{" "}
                <span className="font-medium text-gray-900">{filteredProducts.length}</span> products
              </p>
              
              <div className="flex items-center gap-4">
                <Select 
                  value={sortBy} 
                  onValueChange={(value) => {
                    setSortBy(value as typeof sortBy);
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Best Rating</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex items-center gap-1 border border-gray-200 rounded-md p-1">
                  <button className="p-1.5 rounded bg-gray-100">
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded hover:bg-gray-50">
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Tags */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map(slug => {
                  const cat = CATEGORIES.find(c => c.slug === slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => handleCategoryToggle(slug)}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
                    >
                      {cat?.name}
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
                {selectedPriceRange && (
                  <button
                    onClick={() => handlePriceRangeSelect(null)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-sm rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {PRICE_RANGES.find(r => r.min === selectedPriceRange.min)?.label}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    slug={product.slug}
                    title={product.title}
                    category={product.category}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    rating={product.rating}
                    reviews={product.reviews}
                    itemsLeft={product.itemsLeft}
                    discountPercentage={product.discountPercentage}
                    image={product.image}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 mb-4">No products match your filters.</p>
                <Button onClick={clearAllFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > ITEMS_PER_PAGE && (
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
      </div>
    </div>
  );
}

