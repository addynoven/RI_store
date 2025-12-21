"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { Heart, ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === "unauthenticated") {
    router.push("/login?callbackUrl=/account/wishlist");
    return null;
  }

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.image,
      originalPrice: item.originalPrice,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">My Wishlist</h1>
          <Breadcrumb items={[{ label: "Account", href: "/account" }, { label: "Wishlist" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <Link href="/account" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-4 h-4" />
            Back to Account
          </Link>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-sm text-red-500 hover:underline"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-6 p-4 border border-gray-100 hover:border-gray-200 transition-colors">
                {/* Image */}
                <Link href={`/shop/${item.slug}`} className="w-24 h-24 bg-[#f8f8f8] shrink-0 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover mix-blend-multiply" />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/shop/${item.slug}`} className="hover:text-red-500 transition-colors">
                    <h3 className="font-medium text-gray-900 truncate">{item.title}</h3>
                  </Link>
                  {item.category && (
                    <p className="text-xs text-gray-400 uppercase tracking-wider mt-1">{item.category}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-red-500 font-bold">${item.price.toFixed(2)}</span>
                    {item.originalPrice && (
                      <span className="text-gray-400 text-sm line-through">${item.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className="bg-gray-900 hover:bg-gray-800"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Save items you love by clicking the heart icon.</p>
            <Link href="/shop">
              <Button className="bg-gray-900 hover:bg-gray-800">Browse Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

