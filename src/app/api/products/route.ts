import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const bestSellers = searchParams.get("bestSellers");
  const featured = searchParams.get("featured");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  try {
    const whereClause: Prisma.ProductWhereInput = {};

    if (category) {
      whereClause.category = {
        slug: category
      };
    }
    
    if (bestSellers === "true") {
       whereClause.rating = {
         gte: 4.5
       }
    }

    if (featured === "true") {
      whereClause.isFeatured = true;
    }

    // Get total count for pagination info
    const total = await prisma.product.count({ where: whereClause });

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: Math.min(limit, 100), // Cap at 100 max
      skip: offset,
    });

    return NextResponse.json({
      success: true,
      data: products,
      count: products.length,
      total,
      hasMore: offset + products.length < total,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      title, 
      description, 
      price, 
      image, 
      categoryId, 
      itemsLeft,
      isFeatured,
      isNew 
    } = body;

    if (!title || !price || !image) {
       return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = slugify(title);

    // Check if slug exists
    const existingProduct = await prisma.product.findUnique({
      where: { slug }
    });
    
    let finalSlug = slug;
    if (existingProduct) {
      finalSlug = `${slug}-${Date.now()}`;
    }

    const product = await prisma.product.create({
      data: {
        title,
        slug: finalSlug,
        description,
        price: parseFloat(price.toString()),
        image,
        images: [image], // Initialize with main image
        itemsLeft: itemsLeft ? parseInt(itemsLeft.toString()) : 0,
        isFeatured: isFeatured || false,
        isNew: isNew || true,
        categoryId // Optional
      }
    });

    return NextResponse.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    );
  }
}
