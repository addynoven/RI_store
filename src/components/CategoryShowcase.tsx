"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  _count?: { products: number };
}

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          setCategories(data.data);
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
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, idx) => (
            <div key={idx} className="relative h-[200px] lg:h-[220px] bg-gray-200 animate-pulse rounded" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.slug}`}
            className="relative group overflow-hidden h-[200px] lg:h-[220px] cursor-pointer"
          >
            {/* Background Image */}
            <img 
              src={cat.image || `https://picsum.photos/seed/${cat.slug}/300/300`}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>

            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <h3 className="text-lg font-bold tracking-wide">{cat.name}</h3>
              <p className="text-[10px] opacity-80 uppercase tracking-widest">
                {cat._count?.products ?? 0} PRODUCTS
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
