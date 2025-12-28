/**
 * Categories Service
 * Server-side data fetching for categories using Prisma
 */

import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export type CategoryWithCount = Prisma.CategoryGetPayload<{
  include: { _count: { select: { products: true } } };
}>;

/**
 * Get all categories with product counts
 */
export async function getCategories(): Promise<CategoryWithCount[]> {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { name: "asc" },
  });
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(
  slug: string
): Promise<CategoryWithCount | null> {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
}

/**
 * Get all category slugs (for static generation)
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  const categories = await prisma.category.findMany({
    select: { slug: true },
  });
  return categories.map((c) => c.slug);
}
