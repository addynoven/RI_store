"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";

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
  category?: { name: string; slug: string } | null;
  isFeatured?: boolean;
}

export default function FeaturedCollection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("/api/products?featured=true&limit=8");
        const data = await res.json();
        
        if (data.success) {
          // Take up to 4 featured products
          setProducts(data.data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      </section>
    );
  }

  if (products.length < 2) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Featured Products</h2>
        <p className="text-sm text-gray-500 mt-2">Our best-selling and most popular items</p>
      </div>

      {/* Featured Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
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

      {/* View All Link */}
      <div className="text-center mt-8">
        <Link
          href="/shop"
          className="inline-block border-b-2 border-amber-600 pb-1 text-sm font-bold uppercase tracking-widest text-amber-700 hover:text-amber-800 hover:border-amber-700 transition-colors"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
