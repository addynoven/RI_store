"use client";

import { use } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductFilters from "@/components/ProductFilters";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";

// Category info - in real app, fetch from API
const CATEGORIES: Record<string, { name: string; description: string; image: string }> = {
  bracelets: {
    name: "Bracelets",
    description: "Discover our stunning collection of bracelets, from delicate chains to bold statement pieces.",
    image: "https://picsum.photos/seed/cat-bracelets/1920/400",
  },
  earrings: {
    name: "Earrings",
    description: "Find the perfect pair of earrings to complement any outfit, from studs to chandeliers.",
    image: "https://picsum.photos/seed/cat-earrings/1920/400",
  },
  necklaces: {
    name: "Necklaces",
    description: "Explore our necklace collection featuring pendants, chains, and layered styles.",
    image: "https://picsum.photos/seed/cat-necklaces/1920/400",
  },
  rings: {
    name: "Rings",
    description: "From engagement rings to everyday bands, find your perfect ring here.",
    image: "https://picsum.photos/seed/cat-rings/1920/400",
  },
  "gold-set": {
    name: "Gold Set",
    description: "Luxurious gold jewelry sets for special occasions.",
    image: "https://picsum.photos/seed/cat-gold/1920/400",
  },
  "silver-set": {
    name: "Silver Set",
    description: "Elegant silver jewelry sets perfect for any style.",
    image: "https://picsum.photos/seed/cat-silver/1920/400",
  },
};

// Mock products by category
const PRODUCTS_BY_CATEGORY: Record<string, Array<{ id: string; title: string; category: string; price: number; originalPrice?: number; rating: number; reviews: number; itemsLeft: number; discountPercentage?: number }>> = {
  bracelets: [
    { id: "1", title: "Twist Rows Bracelet", category: "BRACELETS", price: 71.99, originalPrice: 81.99, rating: 4.33, reviews: 3, itemsLeft: 84, discountPercentage: 13 },
    { id: "2", title: "Sterling Silver Mercy Open Bangle Medium", category: "BRACELETS", price: 59.85, originalPrice: 77.75, rating: 4.0, reviews: 3, itemsLeft: 30, discountPercentage: 24 },
    { id: "3", title: "Sterling Silver 5mm Torque Bangle", category: "BRACELETS", price: 44.19, originalPrice: 59.89, rating: 4.67, reviews: 3, itemsLeft: 21, discountPercentage: 27 },
    { id: "4", title: "Silver Torque Wave Bangle S Design", category: "BRACELETS", price: 99.99, rating: 4.0, reviews: 3, itemsLeft: 39 },
    { id: "5", title: "Silver Mens Open Cuff Bangle Goldsmiths", category: "BRACELETS", price: 81.45, originalPrice: 120.99, rating: 3.33, reviews: 3, itemsLeft: 56, discountPercentage: 33 },
    { id: "6", title: "Diamond Tennis Bracelet 14K", category: "BRACELETS", price: 899.99, originalPrice: 1199.99, rating: 5.0, reviews: 8, itemsLeft: 5, discountPercentage: 25 },
  ],
  earrings: [
    { id: "1", title: "Sterling Silver Offspring Open Earhoops", category: "EARRINGS", price: 86.77, originalPrice: 123.55, rating: 4.5, reviews: 4, itemsLeft: 31, discountPercentage: 30 },
    { id: "2", title: "Sterling Silver 4mm Ball Stud Earrings", category: "EARRINGS", price: 195.29, originalPrice: 266.88, rating: 4.2, reviews: 6, itemsLeft: 23, discountPercentage: 27 },
    { id: "3", title: "Diamond Hoop Earrings 14K Gold", category: "EARRINGS", price: 299.99, originalPrice: 399.99, rating: 5.0, reviews: 8, itemsLeft: 12, discountPercentage: 25 },
    { id: "4", title: "Pearl Drop Earrings Sterling Silver", category: "EARRINGS", price: 89.99, rating: 4.3, reviews: 5, itemsLeft: 45 },
    { id: "5", title: "Crystal Chandelier Earrings", category: "EARRINGS", price: 156.50, originalPrice: 189.99, rating: 4.1, reviews: 3, itemsLeft: 28, discountPercentage: 18 },
  ],
  necklaces: [
    { id: "1", title: "Sterling Silver Heart Locket Necklace", category: "NECKLACES", price: 43.99, originalPrice: 52.25, rating: 4.8, reviews: 5, itemsLeft: 28, discountPercentage: 16 },
    { id: "2", title: "9ct White Gold Diamond Pearl Necklace", category: "NECKLACES", price: 200.19, originalPrice: 219.99, rating: 3.67, reviews: 8, itemsLeft: 23, discountPercentage: 10 },
    { id: "3", title: "Gold Chain Layered Necklace Set", category: "NECKLACES", price: 129.99, originalPrice: 159.99, rating: 4.5, reviews: 12, itemsLeft: 34, discountPercentage: 19 },
    { id: "4", title: "Diamond Pendant Necklace 18K", category: "NECKLACES", price: 450.00, rating: 4.9, reviews: 7, itemsLeft: 8 },
  ],
  rings: [
    { id: "1", title: "Diamond Solitaire Engagement Ring", category: "RINGS", price: 1299.99, originalPrice: 1599.99, rating: 5.0, reviews: 12, itemsLeft: 8, discountPercentage: 19 },
    { id: "2", title: "Sterling Silver Infinity Band Ring", category: "RINGS", price: 89.99, rating: 4.3, reviews: 7, itemsLeft: 62 },
    { id: "3", title: "Platinum Wedding Band Classic", category: "RINGS", price: 599.99, originalPrice: 749.99, rating: 4.8, reviews: 15, itemsLeft: 18, discountPercentage: 20 },
    { id: "4", title: "Rose Gold Stackable Ring Set", category: "RINGS", price: 145.00, originalPrice: 175.00, rating: 4.4, reviews: 9, itemsLeft: 41, discountPercentage: 17 },
  ],
  "gold-set": [
    { id: "1", title: "9ct Yellow Gold Pendant Set", category: "GOLD SET", price: 350.00, originalPrice: 420.00, rating: 4.7, reviews: 6, itemsLeft: 12, discountPercentage: 17 },
    { id: "2", title: "18K Gold Bridal Jewelry Set", category: "GOLD SET", price: 2499.99, rating: 5.0, reviews: 3, itemsLeft: 4 },
  ],
  "silver-set": [
    { id: "1", title: "Sterling Silver Wedding Set", category: "SILVER SET", price: 299.99, originalPrice: 399.99, rating: 4.5, reviews: 8, itemsLeft: 15, discountPercentage: 25 },
    { id: "2", title: "Silver Pearl Jewelry Set", category: "SILVER SET", price: 189.99, rating: 4.2, reviews: 5, itemsLeft: 22 },
  ],
};

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [currentPage, setCurrentPage] = useState(1);
  
  const category = CATEGORIES[slug] || { name: "Category", description: "", image: "" };
  const products = PRODUCTS_BY_CATEGORY[slug] || [];
  const totalPages = Math.ceil(products.length / 6);

  return (
    <div className="min-h-screen bg-white">
      {/* Category Banner */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{category.name}</h1>
          <p className="text-lg max-w-2xl px-4">{category.description}</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={[
          { label: "Shop", href: "/shop" },
          { label: category.name },
        ]} />
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <ProductFilters />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-medium text-gray-900">{products.length}</span> products found
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  category={product.category}
                  price={product.price}
                  originalPrice={product.originalPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  itemsLeft={product.itemsLeft}
                  discountPercentage={product.discountPercentage}
                />
              ))}
            </div>

            {totalPages > 1 && (
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
