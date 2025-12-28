"use client";

import { useEffect, useState } from "react";
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
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNewArrivals() {
      try {
        const res = await fetch("/api/products?limit=4");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch new arrivals:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNewArrivals();
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

  if (products.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">New Arrivals</h2>
        <p className="text-sm text-gray-500 mt-2">
          Fresh additions to our collection
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
