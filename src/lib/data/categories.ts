import { Category } from "../types";

export const categories: Category[] = [
  {
    id: "cat_001",
    name: "Bracelets",
    slug: "bracelets",
    productCount: 16,
    image: "https://picsum.photos/seed/bracelets/300/300",
  },
  {
    id: "cat_002",
    name: "Earrings",
    slug: "earrings",
    productCount: 16,
    image: "https://picsum.photos/seed/earrings/300/300",
  },
  {
    id: "cat_003",
    name: "Gold Set",
    slug: "gold-set",
    productCount: 4,
    image: "https://picsum.photos/seed/gold-set/300/300",
  },
  {
    id: "cat_004",
    name: "Necklaces",
    slug: "necklaces",
    productCount: 12,
    image: "https://picsum.photos/seed/necklaces/300/300",
  },
  {
    id: "cat_005",
    name: "Rings",
    slug: "rings",
    productCount: 13,
    image: "https://picsum.photos/seed/rings/300/300",
  },
  {
    id: "cat_006",
    name: "Silver Set",
    slug: "silver-set",
    productCount: 3,
    image: "https://picsum.photos/seed/silver-set/300/300",
  },
];

export const getCategories = () => categories;

export const getCategoryBySlug = (slug: string) => 
  categories.find(c => c.slug === slug);
