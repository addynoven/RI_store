"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, ShoppingBag, Heart, Phone, ChevronDown, RefreshCw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { siteConfig } from "@/lib/config";
import MiniProductCard from "./MiniProductCard";

const BEST_SELLERS = [
  { title: "Twist Rows Bracelet", category: "BRACELETS", price: 71.99, originalPrice: 81.99, itemsLeft: 84 },
  { title: "Sterling Silver Offspring Open Earhoops", category: "DROP AND DANGLE", price: 86.77, originalPrice: 123.55, itemsLeft: 31 },
  { title: "Sterling Silver Mercy Open Bangle Medium", category: "BRACELETS", price: 59.85, originalPrice: 77.75, itemsLeft: 30 },
  { title: "Sterling Silver Heart Locket Necklace", category: "DIAMOND NECKLACES", price: 43.99, originalPrice: 52.25, itemsLeft: 28 },
  { title: "Sterling Silver 5mm Torque Bangle", category: "BRACELETS", price: 44.19, originalPrice: 59.89, itemsLeft: 21 },
  { title: "Sterling Silver 4mm Ball Stud Earrings", category: "EARRINGS", price: 195.29, originalPrice: 266.88, itemsLeft: 23 },
  { title: "Silver Mens Open Cuff Bangle Goldsmiths", category: "BRACELETS", price: 81.45, originalPrice: 120.99, itemsLeft: 56 },
];

export default function Header() {
  const router = useRouter();
  const { getItemCount } = useCart();
  const { getItemCount: getWishlistCount } = useWishlist();
  const cartCount = getItemCount();
  const wishlistCount = getWishlistCount();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="w-full font-sans z-50 relative">
      {/* 1. Top Bar - Dark */}
      {siteConfig.header.showTopPromoBar && (
        <div className="bg-[#1a1a1a] text-white text-[10px] sm:text-[11px] font-medium tracking-wider py-2.5 text-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-1 md:gap-8">
              <span className="whitespace-nowrap">UP TO 40% OFF EVERYTHING</span>
              <span className="hidden md:inline text-gray-500">|</span>
              <span className="whitespace-nowrap">30% OFF MOST LOVELED - NEW LINES ADDED</span>
              <span className="hidden md:inline text-gray-500">|</span>
              <span className="whitespace-nowrap">FREE DELIVERY FOR NEXT 3 ORDERS</span>
          </div>
        </div>
      )}

      {/* 2. Promo Bar - Beige/Pink */}
      {siteConfig.header.showCountdownBar && (
        <div className="bg-[#fae8e8] text-[#1a1a1a] text-[11px] font-bold tracking-wider py-2 text-center border-b border-gray-100">
          <div className="container mx-auto px-4 flex justify-center items-center gap-2">
              <span>20% OFF EVERYTHING WITH A MIN. SPEND, SALE ENDS IN:</span>
              <div className="flex gap-1 font-mono text-xs">
                  <span className="bg-white/50 px-1 rounded">50</span> DAYS :
                  <span className="bg-white/50 px-1 rounded">19</span> HRS :
                  <span className="bg-white/50 px-1 rounded">11</span> MINS
              </div>
          </div>
        </div>
      )}

      {/* 3. Service Bar - Dark Gray */}
      {siteConfig.header.showServiceBar && (
        <div className="bg-[#2d2d2d] text-gray-300 text-[10px] py-2">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="flex gap-6 tracking-wider">
                  <Link href="/about" className="hover:text-white transition-colors">ABOUT US</Link>
                  <Link href="/account" className="hover:text-white transition-colors">MY ACCOUNT</Link>
                  <Link href="/account/wishlist" className="hover:text-white transition-colors">WISHLIST</Link>
              </div>
              <div className="flex gap-6 items-center tracking-wider">
                  <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <span>GET SUPPORT - ({siteConfig.contact.phone})</span>
                  </div>
                  <div className="flex gap-4 border-l border-gray-600 pl-4 ml-2">
                      <span className="cursor-pointer hover:text-white flex items-center gap-1">ENGLISH <ChevronDown className="w-2 h-2"/></span>
                      <span className="cursor-pointer hover:text-white flex items-center gap-1">USD <ChevronDown className="w-2 h-2"/></span>
                  </div>
              </div>
          </div>
        </div>
      )}

      {/* 4. Main Header - White */}
      <div className="bg-white py-6 border-b border-gray-100 relative z-20">
        <div className="container mx-auto px-4">
             <div className="flex items-center justify-between gap-8">
                {/* Search */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (searchQuery.trim()) {
                      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                    }
                  }}
                  className="flex-1 flex items-center gap-3 text-gray-400 max-w-sm hidden md:flex"
                >
                    <Search className="w-5 h-5" />
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for the product that suits you..." 
                        className="w-full text-sm outline-none placeholder:text-gray-400 text-gray-900"
                    />
                </form>

                {/* Logo */}
                <div className="flex-1 flex justify-center md:items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        {/* Abstract Icon */}
                        <div className="flex flex-col gap-[2px] w-8 h-8 justify-center">
                            <div className="h-full w-2 bg-black -skew-x-12"></div>
                            <div className="h-full w-2 bg-black -skew-x-12 ml-1"></div>
                            <div className="h-full w-2 bg-black -skew-x-12 ml-1"></div>
                        </div>
                        <span className="text-3xl font-serif font-bold tracking-wide text-black">{siteConfig.name}</span>
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex-1 flex items-center justify-end gap-6 text-gray-700">
                    <Link href="/account" className="hover:text-black hidden sm:block">
                        <User className="w-6 h-6" strokeWidth={1.5} />
                    </Link>
                    <Link href="/account/wishlist" className="hover:text-black relative">
                        <Heart className="w-6 h-6" strokeWidth={1.5} />
                        {wishlistCount > 0 && (
                          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{wishlistCount}</span>
                        )}
                    </Link>
                     <Link href="/shop" className="hover:text-black relative hidden sm:block">
                        <RefreshCw className="w-5 h-5" strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">0</span>
                    </Link>
                    <Link href="/cart" className="hover:text-black relative">
                        <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                    </Link>
                </div>
             </div>
        </div>
      </div>

       {/* 5. Navigation Bar */}
       <div className="bg-white py-4 border-b border-gray-100 hidden lg:block relative z-10">
        <div className="container mx-auto px-4 flex justify-center items-center gap-10 text-xs font-bold tracking-widest text-[#1a1a1a] relative">
            
            {/* Best Seller Mega Menu Dropdown */}
            <div className="group static">
                <Link href="/shop" className="flex items-center gap-1 hover:text-gray-600 border-b-2 border-transparent hover:border-black py-4 -my-4">
                    BEST SELLER <ChevronDown className="w-3 h-3" />
                </Link>
                
                {/* Mega Menu Content */}
                <div className="absolute left-0 top-full w-full bg-white shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top border-t border-gray-100 mt-[1px]">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex items-baseline gap-4 mb-6">
                            <h3 className="text-base font-bold text-gray-900">Which products sold the most this month?</h3>
                            <p className="text-gray-400 font-normal normal-case tracking-normal text-sm">Some of the most in-demand products.</p>
                        </div>

                        <div className="grid grid-cols-7 gap-6">
                            {BEST_SELLERS.map((item, idx) => (
                                <MiniProductCard 
                                    key={idx}
                                    {...item}
                                />
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-100 text-gray-400 font-normal normal-case tracking-normal text-sm">
                            Campaign and non-campaign and best-selling products.
                        </div>
                    </div>
                </div>
            </div>

            <Link href="/" className="flex items-center gap-1 hover:text-gray-600">HOME</Link>
            <Link href="/shop" className="flex items-center gap-1 hover:text-gray-600">SHOP <ChevronDown className="w-3 h-3" /></Link>
            <Link href="/category/earrings" className="hover:text-gray-600">EARRINGS</Link>
            <Link href="/category/necklaces" className="hover:text-gray-600">NECKLACES</Link>
            <Link href="/category/bracelets" className="hover:text-gray-600">BRACELETS</Link>
            <Link href="/contact" className="hover:text-gray-600">CONTACT</Link>
            
            <div className="flex items-center gap-2">
                 <span className="text-red-500">MIDNIGHT SALES</span>
                  <div className="flex gap-1 text-[10px] text-red-500 font-medium">
                    <span className="border border-red-200 px-1 py-0.5 min-w-[20px] text-center">51</span> :
                    <span className="border border-red-200 px-1 py-0.5 min-w-[20px] text-center">19</span> :
                    <span className="border border-red-200 px-1 py-0.5 min-w-[20px] text-center">11</span> :
                    <span className="border border-red-200 px-1 py-0.5 min-w-[20px] text-center">02</span>
                </div>
                 <ChevronDown className="w-3 h-3 text-red-500" />
            </div>
        </div>
       </div>
    </header>
  );
}
