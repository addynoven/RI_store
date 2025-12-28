"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  title: string;
  price: number;
  originalPrice?: number | null;
  discountPercentage?: number | null;
  rating: number;
  reviewsCount: number;
  itemsLeft: number;
  image: string;
  tags: string[];
  category?: { name: string; slug: string } | null;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all products on mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setAllProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Search when query or products change
  useEffect(() => {
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      const found = allProducts.filter(product => 
        product.title.toLowerCase().includes(lowerQuery) ||
        product.category?.name.toLowerCase().includes(lowerQuery) ||
        product.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
      setResults(found);
    } else {
      setResults([]);
    }
  }, [query, allProducts]);

  // Update URL when query changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
      } else {
        router.replace("/search", { scroll: false });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Search</h1>
          <Breadcrumb items={[{ label: "Search" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Search Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for jewelry..."
              className="pl-12 pr-12 py-6 text-lg border-gray-300 focus:border-gray-900"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Quick suggestions */}
          {!query && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Necklaces", "Bangles", "Earrings", "Mangalsutra", "Gold", "Anklets"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm text-gray-700 rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {query.trim() && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {results.length === 0 ? (
                  "No products found"
                ) : (
                  <>Found <span className="font-bold">{results.length}</span> products for &quot;{query}&quot;</>
                )}
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {results.map((product) => (
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
                <p className="text-gray-500 mb-4">No products match your search.</p>
                <p className="text-sm text-gray-400 mb-6">Try different keywords or browse our categories</p>
                <Link href="/shop">
                  <Button className="bg-gray-900 hover:bg-gray-800">Browse All Products</Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Show all products if no query */}
        {!query.trim() && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">All Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {allProducts.slice(0, 8).map((product) => (
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
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <div className="bg-[#f8f8f8] py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Search</h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-10 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
