import { NextResponse } from "next/server";
import { getHeroSlides } from "@/lib/data/hero-slides";

export async function GET() {
  try {
    const data = getHeroSlides();

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch hero slides" },
      { status: 500 }
    );
  }
}
