"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import { Truck, ShieldCheck, Headset, CreditCard, Loader2 } from "lucide-react";

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

function ProductCarousel({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        No products in this category
      </div>
    );
  }

  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4 xl:basis-1/5">
            <ProductCard 
              id={product.id}
              slug={product.slug}
              title={product.title}
              category={product.category?.name ?? ""}
              price={product.price}
              originalPrice={product.originalPrice ?? undefined}
              discountPercentage={product.discountPercentage ?? undefined}
              rating={product.rating}
              reviews={product.reviewsCount}
              itemsLeft={product.itemsLeft}
              image={product.image}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}

export default function SalesSection() {
  const [productsByCategory, setProductsByCategory] = useState<Record<string, Product[]>>({});
  const [categories, setCategories] = useState<{name: string; slug: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        
        if (data.success && data.data.length > 0) {
          setCategories(data.data);
          setActiveTab(data.data[0].slug);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchCategories();
  }, []);

  // Fetch products when tab changes
  useEffect(() => {
    if (!activeTab || productsByCategory[activeTab]) return;
    
    async function fetchCategoryProducts() {
      try {
        const res = await fetch(`/api/products?category=${activeTab}&limit=10`);
        const data = await res.json();
        
        if (data.success) {
          setProductsByCategory(prev => ({
            ...prev,
            [activeTab]: data.data
          }));
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }
    
    fetchCategoryProducts();
  }, [activeTab, productsByCategory]);

  const getProductsByCategory = (slug: string) => {
    return productsByCategory[slug] || [];
  };

  return (
    <section className="bg-white py-10 border-b border-gray-100">
       
       {/* 1. Features Bar */}
       <div className="container mx-auto px-4 mb-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
                <Truck className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                <div>
                    <h4 className="font-bold text-sm text-gray-900">Free Shipping</h4>
                    <p className="text-xs text-gray-500">On orders above ₹500</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <ShieldCheck className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                 <div>
                    <h4 className="font-bold text-sm text-gray-900">Quality Guarantee</h4>
                    <p className="text-xs text-gray-500">100% authentic products</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Headset className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                 <div>
                    <h4 className="font-bold text-sm text-gray-900">Customer Support</h4>
                    <p className="text-xs text-gray-500">24/7 dedicated support</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <CreditCard className="w-10 h-10 text-amber-400" strokeWidth={1.5} />
                 <div>
                    <h4 className="font-bold text-sm text-gray-900">Secure Payment</h4>
                    <p className="text-xs text-gray-500">Multiple payment options</p>
                </div>
            </div>
         </div>
       </div>

       {/* 2. Sales Title & Tabs */}
       <div className="container mx-auto px-4">
         <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-gray-900">Shop by Category</h2>
            <p className="text-sm text-gray-500 font-light max-w-2xl mx-auto">
                Explore our carefully curated collection of premium jewelry
            </p>
         </div>

         {loading ? (
           <div className="flex items-center justify-center py-20">
             <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
           </div>
         ) : categories.length > 0 ? (
           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto">
                  <TabsList className="bg-transparent border-b border-transparent h-auto p-0 gap-4 md:gap-8">
                      {categories.slice(0, 5).map((cat) => (
                          <TabsTrigger 
                              key={cat.slug} 
                              value={cat.slug}
                              className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-400 data-[state=active]:text-amber-700 data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-amber-600 rounded-none px-0 pb-2 text-sm md:text-base transition-all whitespace-nowrap"
                          >
                              {cat.name}
                          </TabsTrigger>
                      ))}
                  </TabsList>
              </div>

              {categories.slice(0, 5).map((cat) => (
                <TabsContent key={cat.slug} value={cat.slug} className="mt-0">
                  <ProductCarousel products={getProductsByCategory(cat.slug)} />
                </TabsContent>
              ))}
           </Tabs>
         ) : (
           <div className="text-center py-12 text-gray-500">
             No categories available
           </div>
         )}
       </div>
    </section>
  );
}
