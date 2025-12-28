"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Breadcrumb from "@/components/Breadcrumb";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck, Check, Loader2 } from "lucide-react";

interface Product {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  discountPercentage?: number | null;
  rating: number;
  reviewsCount: number;
  itemsLeft: number;
  image: string;
  images: string[];
  tags: string[];
  category?: { id: string; name: string; slug: string } | null;
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        // Fetch all products and find by slug
        const res = await fetch("/api/products");
        const data = await res.json();
        
        if (data.success) {
          const foundProduct = data.data.find((p: Product) => p.slug === slug);
          
          if (foundProduct) {
            setProduct(foundProduct);
            
            // Get related products (same category, different product)
            const related = data.data
              .filter((p: Product) => 
                p.category?.slug === foundProduct.category?.slug && 
                p.id !== foundProduct.id
              )
              .slice(0, 4);
            setRelatedProducts(related);
          }
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
        <Link href="/shop" className="text-red-500 hover:underline">
          Return to shop
        </Link>
      </div>
    );
  }

  // Generate image gallery from product images or create from main image
  const productImages = product.images?.length > 1 
    ? product.images 
    : [
        product.image,
        product.image.replace('?', '-2?'),
        product.image.replace('?', '-3?'),
        product.image.replace('?', '-4?'),
      ];

  const features = [
    "High Quality Materials",
    "Premium Craftsmanship",
    "Elegant Design",
    "Gift Box Included",
    "Easy Returns",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-6">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[
            { label: "Shop", href: "/shop" },
            { label: product.category?.name ?? "Products", href: `/category/${product.category?.slug}` },
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
                src={productImages[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {productImages.slice(0, 4).map((image, index) => (
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
              <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category?.name}</span>
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
              <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-400">({product.reviewsCount} Reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-red-500">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1">
                    -{product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description || "Premium quality jewelry piece crafted with attention to detail. Perfect for any occasion."}
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
              <span>Free shipping on orders over ₹500</span>
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
                Reviews ({product.reviewsCount})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <p className="text-gray-600 leading-relaxed max-w-3xl">
                {product.description || "Premium quality jewelry piece crafted with attention to detail."} 
                Our jewelry is crafted with the finest materials and attention to detail. 
                Each piece undergoes rigorous quality checks to ensure it meets our high standards.
              </p>
            </TabsContent>
            
            <TabsContent value="features" className="mt-6">
              <ul className="space-y-2 max-w-lg">
                {features.map((feature, index) => (
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
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  id={relProduct.id}
                  slug={relProduct.slug}
                  title={relProduct.title}
                  category={relProduct.category?.name ?? ""}
                  price={relProduct.price}
                  originalPrice={relProduct.originalPrice ?? undefined}
                  rating={relProduct.rating}
                  reviews={relProduct.reviewsCount}
                  itemsLeft={relProduct.itemsLeft}
                  discountPercentage={relProduct.discountPercentage ?? undefined}
                  image={relProduct.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
