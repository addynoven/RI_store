import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Pagination
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");
  
  // Filters
  const category = searchParams.get("category");
  const bestSellers = searchParams.get("bestSellers");
  const featured = searchParams.get("featured");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");
  
  // Sorting
  const sort = searchParams.get("sort"); // newest, price-asc, price-desc, rating

  try {
    const whereClause: Prisma.ProductWhereInput = {};

    // Category filter
    if (category) {
      whereClause.category = {
        slug: category
      };
    }
    
    // Best sellers filter
    if (bestSellers === "true") {
      whereClause.rating = {
        gte: 4.5
      };
    }

    // Featured filter
    if (featured === "true") {
      whereClause.isFeatured = true;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) {
        whereClause.price.gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        whereClause.price.lte = parseFloat(maxPrice);
      }
    }

    // Search filter (title, description, tags)
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    // Build orderBy based on sort param
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    switch (sort) {
      case "price-asc":
        orderBy = { price: 'asc' };
        break;
      case "price-desc":
        orderBy = { price: 'desc' };
        break;
      case "rating":
        orderBy = { rating: 'desc' };
        break;
      case "newest":
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Get total count for pagination info
    const total = await prisma.product.count({ where: whereClause });

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy,
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
