"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck, Check } from "lucide-react";

// Mock product data - in real app, fetch from API based on slug
const getProduct = (slug: string) => ({
  id: "1",
  slug,
  title: "Sterling Silver Heart Locket Necklace with Diamond Accents",
  category: "Necklaces",
  categorySlug: "necklaces",
  price: 199.99,
  originalPrice: 249.99,
  discountPercentage: 20,
  rating: 4.5,
  reviews: 12,
  itemsLeft: 28,
  totalItems: 100,
  description: "This stunning sterling silver heart locket necklace features delicate diamond accents that catch the light beautifully. The locket opens to reveal space for two cherished photos, making it the perfect gift for a loved one.",
  features: [
    "925 Sterling Silver",
    "Diamond Accents (0.05 ct)",
    "18-inch Chain Length",
    "Lobster Clasp Closure",
    "Opens to hold 2 photos",
    "Gift Box Included",
  ],
  images: [
    `https://picsum.photos/seed/${slug}-1/600/600?grayscale`,
    `https://picsum.photos/seed/${slug}-2/600/600?grayscale`,
    `https://picsum.photos/seed/${slug}-3/600/600?grayscale`,
    `https://picsum.photos/seed/${slug}-4/600/600?grayscale`,
  ],
});

const RELATED_PRODUCTS = [
  { id: "r1", title: "Pearl Drop Necklace", category: "NECKLACES", price: 89.99, rating: 4.2, reviews: 8, itemsLeft: 42 },
  { id: "r2", title: "Gold Chain Layered Set", category: "NECKLACES", price: 129.99, originalPrice: 159.99, rating: 4.5, reviews: 15, itemsLeft: 34, discountPercentage: 19 },
  { id: "r3", title: "Diamond Pendant 18K", category: "NECKLACES", price: 450.00, rating: 4.9, reviews: 7, itemsLeft: 8 },
  { id: "r4", title: "Birthstone Charm Necklace", category: "NECKLACES", price: 78.50, originalPrice: 98.00, rating: 4.1, reviews: 4, itemsLeft: 52, discountPercentage: 20 },
];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProduct(slug);
  const router = useRouter();
  const { addItem } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id + "-" + slug,
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-6">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[
            { label: "Shop", href: "/shop" },
            { label: product.category, href: `/category/${product.categorySlug}` },
            { label: product.title },
          ]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-[#f8f8f8] overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-[#f8f8f8] overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-gray-900" : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mt-1">
                {product.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews} Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-red-500">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button 
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`flex-1 py-6 ${addedToCart ? "bg-green-600 hover:bg-green-600" : "bg-gray-900 hover:bg-gray-800"} text-white`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* View Cart Link */}
            {addedToCart && (
              <div className="bg-green-50 border border-green-200 p-4 flex items-center justify-between">
                <span className="text-green-700 text-sm">Item added to cart!</span>
                <Link href="/cart" className="text-green-700 font-medium text-sm hover:underline">
                  View Cart →
                </Link>
              </div>
            )}

            {/* Quick Info */}
            <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-gray-100">
              <Truck className="w-4 h-4" />
              <span>Free shipping on orders over $130</span>
            </div>

            {/* Share */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-sm text-gray-500">Share:</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="bg-transparent border-b border-gray-100 w-full justify-start h-auto p-0 gap-8">
              <TabsTrigger value="description" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-400 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 pb-3">
                Description
              </TabsTrigger>
              <TabsTrigger value="features" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-400 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 pb-3">
                Features
              </TabsTrigger>
              <TabsTrigger value="reviews" className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-400 data-[state=active]:text-black data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 pb-3">
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {product.description} Our jewelry is crafted with the finest materials and attention to detail. 
                Each piece undergoes rigorous quality checks to ensure it meets our high standards. 
                This necklace comes beautifully packaged in our signature gift box, ready for gifting.
              </p>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <ul className="space-y-2 max-w-lg">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <p className="text-gray-500">Reviews coming soon...</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RELATED_PRODUCTS.map((product) => (
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
        </div>
      </div>
    </div>
  );
}
