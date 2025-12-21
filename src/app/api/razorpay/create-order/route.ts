import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Product prices - In production, fetch from database
// NEVER trust prices from frontend!
const PRODUCT_PRICES: Record<string, number> = {
  // These should come from your database
  "1-sterling-silver-heart-locket-necklace-with-diamond-accents": 199.99,
  "1-twist-rows-bracelet": 71.99,
  "1-sterling-silver-offspring-open-earhoops": 86.77,
  "1-sterling-silver-mercy-open-bangle-medium": 59.85,
  "1-sterling-silver-5mm-torque-bangle": 44.19,
  "1-sterling-silver-4mm-ball-stud-earrings": 195.29,
  "1-silver-mens-open-cuff-bangle-goldsmiths": 81.45,
};

// Default price for products not in our database (for demo)
const DEFAULT_PRICE = 99.99;

// Tax and shipping config
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 130;
const SHIPPING_COST = 9.99;
const USD_TO_INR = 83; // Exchange rate

interface CartItem {
  id: string;
  quantity: number;
}

function calculateOrderTotal(items: CartItem[]): {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  totalINR: number;
} {
  // Calculate subtotal from server-side prices
  let subtotal = 0;
  
  for (const item of items) {
    const price = PRODUCT_PRICES[item.id] || DEFAULT_PRICE;
    subtotal += price * item.quantity;
  }

  const tax = subtotal * TAX_RATE;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + tax + shipping;
  const totalINR = Math.round(total * USD_TO_INR);

  return { subtotal, tax, shipping, total, totalINR };
}

export async function POST(request: NextRequest) {
  try {
    const { items, currency = "INR" } = await request.json();

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Invalid cart items" },
        { status: 400 }
      );
    }

    // Calculate total on server side - NEVER trust frontend amount!
    const { totalINR, subtotal, tax, shipping, total } = calculateOrderTotal(items);

    if (totalINR < 100) {
      return NextResponse.json(
        { success: false, error: "Minimum order amount is ₹100" },
        { status: 400 }
      );
    }

    const options = {
      amount: totalINR * 100, // Razorpay expects amount in paise
      currency,
      receipt: `order_${Date.now()}`,
      notes: {
        subtotal_usd: subtotal.toFixed(2),
        tax_usd: tax.toFixed(2),
        shipping_usd: shipping.toFixed(2),
        total_usd: total.toFixed(2),
        total_inr: totalINR.toString(),
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      success: true,
      order,
      calculatedTotal: {
        subtotal,
        tax,
        shipping,
        total,
        totalINR,
      },
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create order" },
      { status: 500 }
    );
  }
}
