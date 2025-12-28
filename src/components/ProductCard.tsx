"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useWishlist } from "@/context/WishlistContext";

interface ProductProps {
  id?: string;
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviews: number;
  itemsLeft?: number;
  totalItems?: number;
  image?: string;
  className?: string;
  slug?: string;
}

// Helper to create slug from title
function createSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function ProductCard({ 
  id,
  title, 
  category, 
  price, 
  originalPrice, 
  discountPercentage, 
  rating, 
  reviews, 
  itemsLeft = 30,
  totalItems = 100,
  className = "",
  slug,
  image
}: ProductProps) {
  const productSlug = slug || createSlug(title);
  const productId = id || productSlug;
  const productImage = image || `https://picsum.photos/seed/${encodeURIComponent(title)}/400/400?grayscale`;
  
  const { isInWishlist, toggleItem } = useWishlist();
  const isWishlisted = isInWishlist(productId);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem({
      id: productId,
      title,
      price,
      originalPrice,
      image: productImage,
      category,
      slug: productSlug,
    });
  };
  
  return (
    <Link href={`/shop/${productSlug}`} className={`group w-full block ${className}`}>
      {/* Image Container */}
      <div className="relative aspect-square bg-[#f8f8f8] mb-4 overflow-hidden border border-gray-100">
        {/* Discount Badge */}
        {discountPercentage && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1">
              {discountPercentage}%
            </span>
          </div>
        )}
        
        {/* Product Image */}
        <img 
          src={productImage}
          alt={title}
          className="w-full h-full object-cover mix-blend-multiply"
        />

        {/* Carousel Arrows (visual only) */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {/* Category + Heart Row */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{category}</span>
          <button 
            onClick={handleWishlistToggle}
            className={`transition-colors ${isWishlisted ? "text-red-500" : "text-gray-300 hover:text-red-500"}`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500" : ""}`} strokeWidth={1.5} />
          </button>
        </div>
        
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 group-hover:text-red-500 transition-colors leading-tight min-h-[40px]">
          {title}
        </h3>

        {/* Price Row */}
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold">₹{price.toFixed(0)}</span>
          {originalPrice && (
            <span className="text-gray-400 text-sm line-through">₹{originalPrice.toFixed(0)}</span>
          )}
        </div>

        {/* Rating Row - Simplified format */}
        <div className="flex items-center gap-1 text-sm">
          <Star className="w-4 h-4 fill-black text-black" />
          <span className="text-gray-900 font-medium">{rating.toFixed(2)}</span>
          <span className="text-gray-400">{reviews} Reviews</span>
        </div>

        {/* Stock Progress */}
        <div className="pt-2">
          <Progress value={(itemsLeft / totalItems) * 100} className="h-1.5 bg-gray-100 [&>div]:bg-red-500" />
          <p className="text-[10px] text-gray-400 mt-1.5">
            <span className="text-gray-900 font-medium">{itemsLeft}</span> products before the end of the campaign.
          </p>
        </div>
      </div>
    </Link>
  );
}

