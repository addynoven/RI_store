"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useRazorpay } from "@/hooks/useRazorpay";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, CreditCard, MapPin, Package, Loader2 } from "lucide-react";
import { siteConfig } from "@/lib/config";

type Step = "shipping" | "payment" | "review";

export default function CheckoutPage() {
  const { items, getSubtotal, getTax, getTotal, getItemCount, clearCart } = useCart();
  const { initiatePayment, loading: paymentLoading } = useRazorpay();
  const [currentStep, setCurrentStep] = useState<Step>("shipping");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "India",
  });

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = subtotal >= siteConfig.shipping.freeShippingThreshold ? 0 : siteConfig.shipping.standardCost;
  const total = subtotal + tax + shipping;

  // Convert to INR (assuming USD prices, multiply by ~83)
  const totalINR = Math.round(total * 83);

  const steps = [
    { id: "shipping", label: "Shipping", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Complete", icon: Package },
  ];

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep("payment");
  };

  const handlePayWithRazorpay = () => {
    // Send cart items to server - amount will be calculated on backend!
    initiatePayment({
      items: items.map(item => ({ id: item.id, quantity: item.quantity })),
      currency: "INR",
      name: siteConfig.name,
      description: `Order of ${getItemCount()} items`,
      prefill: {
        name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        email: shippingInfo.email,
        contact: shippingInfo.phone,
      },
      onSuccess: (response, calculatedTotal) => {
        setOrderId(response.razorpay_payment_id);
        setOrderPlaced(true);
        setCurrentStep("review");
        clearCart();
        // calculatedTotal contains the server-verified amount
        console.log("Server-calculated total:", calculatedTotal);
      },
      onError: (error) => {
        console.error("Payment failed:", error);
        alert("Payment failed. Please try again.");
      },
    });
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20 text-center max-w-lg">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-500 mb-2">Thank you for your purchase.</p>
          <p className="text-gray-500 mb-8">Order confirmation has been sent to {shippingInfo.email}.</p>
          <p className="text-sm text-gray-400 mb-2">Payment ID: {orderId}</p>
          <p className="text-sm text-gray-400 mb-8">Order #{orderId.slice(-8).toUpperCase()}</p>
          <Link href="/shop">
            <Button className="bg-gray-900 hover:bg-gray-800">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Link href="/shop">
            <Button className="bg-gray-900 hover:bg-gray-800">Go to Shop</Button>
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
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-3">Checkout</h1>
          <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = 
                (currentStep === "payment" && step.id === "shipping") ||
                (currentStep === "review" && (step.id === "shipping" || step.id === "payment"));
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isActive ? "bg-gray-900 text-white" : 
                    isCompleted ? "bg-green-100 text-green-600" : 
                    "bg-gray-100 text-gray-400"
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    <span className="text-sm font-medium">{step.label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${isCompleted ? "bg-green-300" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            {currentStep === "shipping" && (
              <form onSubmit={handleShippingSubmit} className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      required
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      required
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip">PIN Code *</Label>
                    <Input
                      id="zip"
                      required
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full md:w-auto bg-gray-900 hover:bg-gray-800 py-6 px-8">
                  Continue to Payment
                </Button>
              </form>
            )}

            {currentStep === "payment" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment</h2>
                
                {/* Shipping Summary */}
                <div className="p-6 border border-gray-200 rounded-lg space-y-2">
                  <h3 className="font-medium text-gray-900">Shipping To:</h3>
                  <p className="text-gray-600">
                    {shippingInfo.firstName} {shippingInfo.lastName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
                  </p>
                  <button 
                    onClick={() => setCurrentStep("shipping")}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Payment Options */}
                <div className="p-6 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-4">Pay with Razorpay</h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Complete your payment securely using UPI, Cards, Net Banking, Wallets & more.
                  </p>
                  
                  <div className="flex gap-4 mb-6">
                    <img src="https://img.icons8.com/color/48/visa.png" alt="Visa" className="h-8" />
                    <img src="https://img.icons8.com/color/48/mastercard.png" alt="Mastercard" className="h-8" />
                    <img src="https://razorpay.com/assets/razorpay-glyph.svg" alt="Razorpay" className="h-8" />
                  </div>

                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
                    <p className="text-sm text-green-700">
                      🔒 Your payment is secured with 256-bit encryption
                    </p>
                  </div>

                  <Button 
                    onClick={handlePayWithRazorpay}
                    disabled={paymentLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
                  >
                    {paymentLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>Pay ₹{totalINR.toLocaleString()}</>
                    )}
                  </Button>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setCurrentStep("shipping")}>
                    Back
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#f8f8f8] p-6 sticky top-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 text-sm mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="text-gray-500">{item.title.slice(0, 25)}... x{item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal (USD)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total (USD)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>≈ INR</span>
                  <span>₹{totalINR.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

