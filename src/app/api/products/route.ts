import { NextResponse } from "next/server";
import { getProducts, getBestSellers, getProductsByCategory } from "@/lib/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const bestSellers = searchParams.get("bestSellers");

  try {
    let data;

    if (bestSellers === "true") {
      data = getBestSellers();
    } else if (category) {
      data = getProductsByCategory(category);
    } else {
      data = getProducts();
    }

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
