"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/config";

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface CartItemForPayment {
  id: string;
  quantity: number;
}

interface RazorpayOptions {
  items: CartItemForPayment[]; // Send cart items, not amount!
  currency?: string;
  name?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  onSuccess?: (response: RazorpayResponse, calculatedTotal: CalculatedTotal) => void;
  onError?: (error: any) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface CalculatedTotal {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  totalINR: number;
}

export function useRazorpay() {
  const [loading, setLoading] = useState(false);

  const loadScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async ({
    items, // Cart items - amount will be calculated on server
    currency = "INR",
    name = siteConfig.name,
    description = "Order Payment",
    prefill = {},
    onSuccess,
    onError,
  }: RazorpayOptions) => {
    setLoading(true);

    try {
      // Load Razorpay script
      const isLoaded = await loadScript();
      if (!isLoaded) {
        throw new Error("Failed to load Razorpay SDK");
      }

      // Create order via API - send items, backend calculates amount!
      const response = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          items: items.map(item => ({ id: item.id, quantity: item.quantity })),
          currency 
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || "Failed to create order");
      }

      // Open Razorpay checkout with server-calculated amount
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount, // From server!
        currency: data.order.currency,
        name,
        description,
        order_id: data.order.id,
        prefill,
        theme: {
          color: "#1a1a1a",
        },
        handler: async (response: RazorpayResponse) => {
          // Verify payment
          const verifyResponse = await fetch("/api/razorpay/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(response),
          });

          const verifyData = await verifyResponse.json();
          
          if (verifyData.success) {
            onSuccess?.(response, data.calculatedTotal);
          } else {
            onError?.(new Error("Payment verification failed"));
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", (response: any) => {
        onError?.(response.error);
      });
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return { initiatePayment, loading };
}

