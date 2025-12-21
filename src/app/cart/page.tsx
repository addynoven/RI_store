"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTax, getTotal, getItemCount } = useCart();
  const [promoCode, setPromoCode] = useState("");
  
  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const shipping = subtotal >= 130 ? 0 : 9.99;
  const finalTotal = total + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-[#f8f8f8] py-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Shopping Cart</h1>
            <Breadcrumb items={[{ label: "Cart" }]} />
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-24 h-24 text-gray-200 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added any items yet.</p>
          <Link href="/shop">
            <Button className="bg-gray-900 hover:bg-gray-800">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#f8f8f8] py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Shopping Cart</h1>
          <Breadcrumb items={[{ label: "Cart" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-100 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Cart Items */}
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div key={item.id} className="py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product */}
                  <div className="md:col-span-6 flex gap-4">
                    <div className="w-24 h-24 bg-[#f8f8f8] overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">{item.category}</span>
                      <h3 className="text-sm font-medium text-gray-900 hover:text-red-500 transition-colors cursor-pointer">
                        {item.title}
                      </h3>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600 mt-2 md:hidden"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="md:col-span-2 text-center">
                    <span className="md:hidden text-gray-400 text-sm mr-2">Price:</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="md:col-span-2 flex justify-center">
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 text-center text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-50 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="md:col-span-2 flex items-center justify-end gap-4">
                    <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="hidden md:block text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Link href="/shop" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f8f8f8] p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal ({getItemCount()} items)</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (8%)</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 130 && (
                <p className="text-xs text-gray-500 mt-4 p-3 bg-white border border-gray-100">
                  Add <span className="font-bold text-gray-900">${(130 - subtotal).toFixed(2)}</span> more to qualify for FREE shipping!
                </p>
              )}

              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mt-6">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Promo Code</label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              {/* Checkout Button */}
              <Link href="/checkout" className="block mt-6">
                <Button className="w-full bg-gray-900 hover:bg-gray-800 py-6">
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              {/* Payment Methods */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-400 mb-2">We accept</p>
                <div className="flex justify-center gap-2">
                  <img src="https://img.icons8.com/color/32/visa.png" alt="Visa" className="h-6" />
                  <img src="https://img.icons8.com/color/32/mastercard.png" alt="Mastercard" className="h-6" />
                  <img src="https://img.icons8.com/color/32/amex.png" alt="Amex" className="h-6" />
                  <img src="https://img.icons8.com/color/32/paypal.png" alt="PayPal" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
