/**
 * Products Service
 * Server-side data fetching for products using Prisma
 */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export interface ProductFilters {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest";
  search?: string;
  limit?: number;
  skip?: number;
  isFeatured?: boolean;
  isNew?: boolean;
}

/**
 * Get products with filtering, sorting, and pagination
 */
export async function getProducts(filters: ProductFilters = {}): Promise<{
  products: ProductWithCategory[];
  total: number;
}> {
  const where: Prisma.ProductWhereInput = {};

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    where.category = {
      slug: { in: filters.categories },
    };
  }

  // Price filter
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {};
    if (filters.minPrice !== undefined) {
      where.price.gte = filters.minPrice;
    }
    if (filters.maxPrice !== undefined && filters.maxPrice !== Infinity) {
      where.price.lte = filters.maxPrice;
    }
  }

  // Search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    where.OR = [
      { title: { contains: searchTerm, mode: "insensitive" } },
      { description: { contains: searchTerm, mode: "insensitive" } },
      { tags: { hasSome: [searchTerm] } },
    ];
  }

  // Featured/New filters
  if (filters.isFeatured !== undefined) {
    where.isFeatured = filters.isFeatured;
  }
  if (filters.isNew !== undefined) {
    where.isNew = filters.isNew;
  }

  // Sorting
  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  switch (filters.sortBy) {
    case "price-asc":
      orderBy = { price: "asc" };
      break;
    case "price-desc":
      orderBy = { price: "desc" };
      break;
    case "rating":
      orderBy = { rating: "desc" };
      break;
    case "newest":
    default:
      orderBy = { createdAt: "desc" };
      break;
  }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      take: filters.limit,
      skip: filters.skip,
    }),
    prisma.product.count({ where }),
  ]);

  return { products, total };
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(
  slug: string
): Promise<ProductWithCategory | null> {
  return prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });
}

/**
 * Get related products (same category, excluding current product)
 */
export async function getRelatedProducts(
  productId: string,
  categoryId: string | null,
  limit: number = 4
): Promise<ProductWithCategory[]> {
  if (!categoryId) return [];

  return prisma.product.findMany({
    where: {
      categoryId,
      id: { not: productId },
    },
    include: { category: true },
    take: limit,
    orderBy: { rating: "desc" },
  });
}

/**
 * Search products by query string
 */
export async function searchProducts(
  query: string,
  limit: number = 10
): Promise<ProductWithCategory[]> {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase();

  return prisma.product.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm, mode: "insensitive" } },
        { description: { contains: searchTerm, mode: "insensitive" } },
        { tags: { hasSome: [searchTerm] } },
      ],
    },
    include: { category: true },
    take: limit,
    orderBy: { rating: "desc" },
  });
}

/**
 * Get best seller products (high rating)
 */
export async function getBestSellers(
  limit: number = 8
): Promise<ProductWithCategory[]> {
  return prisma.product.findMany({
    where: {
      rating: { gte: 4.0 },
    },
    include: { category: true },
    take: limit,
    orderBy: { rating: "desc" },
  });
}

/**
 * Get new arrivals
 */
export async function getNewArrivals(
  limit: number = 4
): Promise<ProductWithCategory[]> {
  return prisma.product.findMany({
    where: {
      isNew: true,
    },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(
  limit: number = 8
): Promise<ProductWithCategory[]> {
  return prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: { category: true },
    take: limit,
    orderBy: { createdAt: "desc" },
  });
}
