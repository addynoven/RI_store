"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

// Types matching API response
export interface ProductData {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  discountPercentage?: number | null;
  rating: number;
  reviewsCount: number;
  itemsLeft: number;
  image: string;
  images: string[];
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  _count?: { products: number };
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "rating";

export interface ProductFilters {
  categories?: string[];      // Category slugs
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  featured?: boolean;
  bestSellers?: boolean;
}

export interface UseProductsOptions {
  initialLimit?: number;
  category?: string;          // Single category filter (for category pages)
  filters?: ProductFilters;
  sort?: SortOption;
  enabled?: boolean;          // Whether to fetch (useful for search)
}

export interface UseProductsReturn {
  // Data
  products: ProductData[];
  categories: CategoryData[];
  totalProducts: number;
  totalPages: number;
  
  // Pagination
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (limit: number) => void;
  
  // Filters
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  updateFilter: <K extends keyof ProductFilters>(key: K, value: ProductFilters[K]) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  
  // Sort
  sort: SortOption;
  setSort: (sort: SortOption) => void;
  
  // State
  loading: boolean;
  error: string | null;
  
  // Actions
  refresh: () => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsReturn {
  const {
    initialLimit = 20,
    category,
    filters: initialFilters = {},
    sort: initialSort = "newest",
    enabled = true,
  } = options;

  // State
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialLimit);
  const [filters, setFiltersState] = useState<ProductFilters>(initialFilters);
  const [sort, setSort] = useState<SortOption>(initialSort);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Computed
  const totalPages = useMemo(() => 
    Math.ceil(totalProducts / itemsPerPage), 
    [totalProducts, itemsPerPage]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.categories && filters.categories.length > 0) count += filters.categories.length;
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) count += 1;
    if (filters.search) count += 1;
    if (filters.featured) count += 1;
    if (filters.bestSellers) count += 1;
    return count;
  }, [filters]);

  // Build query string
  const buildQueryString = useCallback(() => {
    const params = new URLSearchParams();
    
    // Pagination
    params.set("limit", itemsPerPage.toString());
    params.set("offset", ((currentPage - 1) * itemsPerPage).toString());
    
    // Category (from prop or filters)
    if (category) {
      params.set("category", category);
    } else if (filters.categories && filters.categories.length === 1) {
      params.set("category", filters.categories[0]);
    }
    
    // Price range
    if (filters.minPrice !== undefined) {
      params.set("minPrice", filters.minPrice.toString());
    }
    if (filters.maxPrice !== undefined) {
      params.set("maxPrice", filters.maxPrice.toString());
    }
    
    // Search
    if (filters.search) {
      params.set("search", filters.search);
    }
    
    // Sort
    if (sort !== "newest") {
      params.set("sort", sort);
    }
    
    // Other flags
    if (filters.featured) {
      params.set("featured", "true");
    }
    if (filters.bestSellers) {
      params.set("bestSellers", "true");
    }
    
    return params.toString();
  }, [category, currentPage, itemsPerPage, filters, sort]);

  // Fetch data
  const fetchData = useCallback(async () => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const queryString = buildQueryString();
      
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`/api/products?${queryString}`),
        fetch("/api/categories"),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      if (productsData.success) {
        setProducts(productsData.data);
        setTotalProducts(productsData.total || productsData.count || 0);
      } else {
        setError(productsData.error || "Failed to fetch products");
      }

      if (categoriesData.success) {
        setCategories(categoriesData.data);
      }
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [enabled, buildQueryString]);

  // Fetch on mount and when dependencies change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Reset to page 1 when filters/sort change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sort, category]);

  // Filter helpers
  const setFilters = useCallback((newFilters: ProductFilters) => {
    setFiltersState(newFilters);
  }, []);

  const updateFilter = useCallback(<K extends keyof ProductFilters>(
    key: K, 
    value: ProductFilters[K]
  ) => {
    setFiltersState(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFiltersState({});
  }, []);

  // Page change with scroll to top
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleItemsPerPageChange = useCallback((limit: number) => {
    setItemsPerPage(limit);
    setCurrentPage(1);
  }, []);

  return {
    // Data
    products,
    categories,
    totalProducts,
    totalPages,
    
    // Pagination
    currentPage,
    itemsPerPage,
    setCurrentPage: handlePageChange,
    setItemsPerPage: handleItemsPerPageChange,
    
    // Filters
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    activeFilterCount,
    
    // Sort
    sort,
    setSort,
    
    // State
    loading,
    error,
    
    // Actions
    refresh: fetchData,
  };
}
