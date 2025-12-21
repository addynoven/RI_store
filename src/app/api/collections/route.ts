import { NextResponse } from "next/server";
import { getCollections } from "@/lib/data/collections";

export async function GET() {
  try {
    const data = getCollections();

    return NextResponse.json({
      success: true,
      data,
      count: data.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch collections" },
      { status: 500 }
    );
  }
}
