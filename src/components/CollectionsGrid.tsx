"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  description?: string | null;
  _count?: { products: number };
}

export default function CollectionsGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data.slice(0, 4)); // Show max 4 categories
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
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

  if (categories.length === 0) return null;

  // Get first category for large card, rest for smaller cards
  const mainCategory = categories[0];
  const secondaryCategories = categories.slice(1, 4);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Browse Collections</h2>
        <p className="text-sm text-gray-500 mt-2">Explore our curated jewelry collections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[500px]">
        
        {/* Left Column - Large Card */}
        <Link 
          href={`/category/${mainCategory.slug}`}
          className="relative h-[350px] lg:h-full overflow-hidden group"
        >
          <img 
            src={mainCategory.image || `https://images.meesho.com/images/products/15293867/f67ec_512.jpg`}
            alt={mainCategory.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

          <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-end">
            <div className="max-w-sm space-y-3">
              <span className="text-xs font-medium uppercase tracking-widest text-amber-300">
                {mainCategory._count?.products || 0} Products
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white">{mainCategory.name}</h2>
              <p className="text-sm text-white/80 leading-relaxed">
                {mainCategory.description || "Explore our beautiful collection"}
              </p>
              
              <div className="pt-4">
                <span className="inline-block border-b border-white pb-1 text-xs font-bold uppercase tracking-widest text-white group-hover:text-amber-200 group-hover:border-amber-200 transition-colors">
                  Shop Collection
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Right Column - Grid of smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {secondaryCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="relative overflow-hidden group h-[200px] lg:h-auto"
            >
              <img 
                src={cat.image || `https://images.meesho.com/images/products/8321101/8v5o6_512.jpg`}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              
              <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                <div className="space-y-2">
                  <h3 className="text-xl font-serif text-white">{cat.name}</h3>
                  <p className="text-xs text-white/70">
                    {cat._count?.products || 0} Products
                  </p>
                  <span className="inline-block border-b border-white/70 pb-1 text-[10px] font-bold uppercase tracking-widest text-white/90 group-hover:text-amber-200 group-hover:border-amber-200 transition-colors">
                    Shop Now
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
