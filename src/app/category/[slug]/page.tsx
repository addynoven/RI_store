"use client";

import { use, useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * itemsPerPage;
        
        // Fetch products with limit and offset
        const productsRes = await fetch(`/api/products?category=${slug}&limit=${itemsPerPage}&offset=${offset}`);
        const productsData = await productsRes.json();
        
        if (productsData.success) {
          setProducts(productsData.data);
          setTotalProducts(productsData.total || productsData.count);
          
          // Get category info from the first product if available
          if (productsData.data.length > 0 && productsData.data[0].category) {
            setCategory(productsData.data[0].category);
          }
        }
        
        // If we didn't get category from products, fetch categories to find this one
        if (!category) {
          const categoriesRes = await fetch("/api/categories");
          const categoriesData = await categoriesRes.json();
          if (categoriesData.success) {
            const found = categoriesData.data.find((c: Category) => c.slug === slug);
            if (found) setCategory(found);
          }
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          {/* Products */}
          <div className="flex-1">
            {/* Header: Count & Limit Selector */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                Found <span className="font-medium text-gray-900">{totalProducts}</span> products
              </p>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show:</span>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={(val) => {
                    setItemsPerPage(Number(val));
                    setCurrentPage(1); // Reset to page 1 on limit change
                  }}
                >
                  <SelectTrigger className="w-[80px] h-8 text-xs">
                    <SelectValue placeholder="20" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                
                {/* Server-Side Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500">No products found for this selection.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
