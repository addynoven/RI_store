"use client";

import { use, useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGrid from "@/components/ProductGrid";

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [category, setCategory] = useState<Category | null>(null);

  // Fetch category info for the banner
  useEffect(() => {
    async function fetchCategory() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (data.success) {
          const found = data.data.find((c: Category) => c.slug === slug);
          if (found) setCategory(found);
        }
      } catch (error) {
        console.error("Failed to fetch category:", error);
      }
    }
    fetchCategory();
  }, [slug]);

  const categoryName = category?.name || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  const categoryDescription = category?.description || `Explore our ${categoryName.toLowerCase()} collection.`;
  const categoryImage = category?.image || `https://picsum.photos/seed/cat-${slug}/1920/400`;

  return (
    <div className="min-h-screen bg-white">
      {/* Category Banner */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={categoryImage}
          alt={categoryName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{categoryName}</h1>
          <p className="text-lg max-w-2xl px-4">{categoryDescription}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={[
          { label: "Shop", href: "/shop" },
          { label: categoryName },
        ]} />
      </div>

      <div className="container mx-auto px-4 pb-16">
        <ProductGrid 
          category={slug}
          showFilters={true}
          showSort={true}
          showPagination={true}
          showItemsPerPage={true}
          gridCols={4}
          initialLimit={20}
        />
      </div>
    </div>
  );
}
