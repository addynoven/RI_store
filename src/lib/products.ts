// Centralized product data - in production, this would come from a database
// This allows sharing product data across search, shop, category, and product detail pages

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviews: number;
  itemsLeft: number;
  image: string;
  description?: string;
  tags?: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "twist-rows-bracelet",
    title: "Twist Rows Bracelet",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 71.99,
    originalPrice: 81.99,
    discountPercentage: 12,
    rating: 4.5,
    reviews: 84,
    itemsLeft: 84,
    image: "https://picsum.photos/seed/twist-bracelet/400/400?grayscale",
    description: "Elegant twisted design bracelet in sterling silver.",
    tags: ["bracelet", "silver", "twist"],
  },
  {
    id: "p2",
    slug: "sterling-silver-offspring-open-earhoops",
    title: "Sterling Silver Offspring Open Earhoops",
    category: "Earrings",
    categorySlug: "earrings",
    price: 86.77,
    originalPrice: 123.55,
    discountPercentage: 30,
    rating: 4.7,
    reviews: 31,
    itemsLeft: 31,
    image: "https://picsum.photos/seed/earhoops/400/400?grayscale",
    description: "Modern open hoop earrings in sterling silver.",
    tags: ["earrings", "hoops", "silver"],
  },
  {
    id: "p3",
    slug: "sterling-silver-mercy-open-bangle-medium",
    title: "Sterling Silver Mercy Open Bangle Medium",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 59.85,
    originalPrice: 77.75,
    discountPercentage: 23,
    rating: 4.3,
    reviews: 30,
    itemsLeft: 30,
    image: "https://picsum.photos/seed/mercy-bangle/400/400?grayscale",
    description: "Sleek open bangle design.",
    tags: ["bracelet", "bangle", "silver"],
  },
  {
    id: "p4",
    slug: "sterling-silver-heart-locket-necklace",
    title: "Sterling Silver Heart Locket Necklace",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 43.99,
    originalPrice: 52.25,
    discountPercentage: 16,
    rating: 4.8,
    reviews: 28,
    itemsLeft: 28,
    image: "https://picsum.photos/seed/heart-locket/400/400?grayscale",
    description: "Classic heart locket that opens for photos.",
    tags: ["necklace", "locket", "heart", "silver"],
  },
  {
    id: "p5",
    slug: "sterling-silver-5mm-torque-bangle",
    title: "Sterling Silver 5mm Torque Bangle",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 44.19,
    originalPrice: 59.89,
    discountPercentage: 26,
    rating: 4.4,
    reviews: 21,
    itemsLeft: 21,
    image: "https://picsum.photos/seed/torque-bangle/400/400?grayscale",
    description: "Minimalist torque bangle in sterling silver.",
    tags: ["bracelet", "bangle", "torque", "silver"],
  },
  {
    id: "p6",
    slug: "sterling-silver-4mm-ball-stud-earrings",
    title: "Sterling Silver 4mm Ball Stud Earrings",
    category: "Earrings",
    categorySlug: "earrings",
    price: 195.29,
    originalPrice: 266.88,
    discountPercentage: 27,
    rating: 4.9,
    reviews: 23,
    itemsLeft: 23,
    image: "https://picsum.photos/seed/ball-studs/400/400?grayscale",
    description: "Classic ball stud earrings.",
    tags: ["earrings", "studs", "silver"],
  },
  {
    id: "p7",
    slug: "silver-mens-open-cuff-bangle",
    title: "Silver Mens Open Cuff Bangle Goldsmiths",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 81.45,
    originalPrice: 120.99,
    discountPercentage: 33,
    rating: 4.6,
    reviews: 56,
    itemsLeft: 56,
    image: "https://picsum.photos/seed/mens-cuff/400/400?grayscale",
    description: "Bold open cuff bangle for men.",
    tags: ["bracelet", "cuff", "mens", "silver"],
  },
  {
    id: "p8",
    slug: "diamond-pendant-necklace-18k",
    title: "Diamond Pendant Necklace 18K Gold",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 450.00,
    rating: 4.9,
    reviews: 7,
    itemsLeft: 8,
    image: "https://picsum.photos/seed/diamond-pendant/400/400?grayscale",
    description: "Luxurious 18K gold pendant with diamond.",
    tags: ["necklace", "diamond", "gold", "luxury"],
  },
  {
    id: "p9",
    slug: "pearl-drop-necklace",
    title: "Pearl Drop Necklace",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 89.99,
    rating: 4.2,
    reviews: 8,
    itemsLeft: 42,
    image: "https://picsum.photos/seed/pearl-drop/400/400?grayscale",
    description: "Elegant pearl drop on silver chain.",
    tags: ["necklace", "pearl", "elegant"],
  },
  {
    id: "p10",
    slug: "gold-chain-layered-set",
    title: "Gold Chain Layered Set",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 129.99,
    originalPrice: 159.99,
    discountPercentage: 19,
    rating: 4.5,
    reviews: 15,
    itemsLeft: 34,
    image: "https://picsum.photos/seed/gold-layered/400/400?grayscale",
    description: "Trendy layered chain set in gold tone.",
    tags: ["necklace", "gold", "layered", "set"],
  },
  {
    id: "p11",
    slug: "birthstone-charm-necklace",
    title: "Birthstone Charm Necklace",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 78.50,
    originalPrice: 98.00,
    discountPercentage: 20,
    rating: 4.1,
    reviews: 4,
    itemsLeft: 52,
    image: "https://picsum.photos/seed/birthstone/400/400?grayscale",
    description: "Personalized birthstone charm necklace.",
    tags: ["necklace", "birthstone", "personalized"],
  },
  {
    id: "p12",
    slug: "rose-gold-hoop-earrings",
    title: "Rose Gold Hoop Earrings",
    category: "Earrings",
    categorySlug: "earrings",
    price: 65.00,
    rating: 4.6,
    reviews: 19,
    itemsLeft: 38,
    image: "https://picsum.photos/seed/rose-hoops/400/400?grayscale",
    description: "Classic hoops in beautiful rose gold.",
    tags: ["earrings", "hoops", "rose gold"],
  },
  {
    id: "p13",
    slug: "diamond-tennis-bracelet",
    title: "Diamond Tennis Bracelet",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 899.99,
    originalPrice: 1199.99,
    discountPercentage: 25,
    rating: 5.0,
    reviews: 3,
    itemsLeft: 5,
    image: "https://picsum.photos/seed/tennis-bracelet/400/400?grayscale",
    description: "Luxurious diamond tennis bracelet.",
    tags: ["bracelet", "diamond", "tennis", "luxury"],
  },
  {
    id: "p14",
    slug: "minimalist-bar-necklace",
    title: "Minimalist Bar Necklace",
    category: "Necklaces",
    categorySlug: "necklaces",
    price: 45.00,
    rating: 4.3,
    reviews: 22,
    itemsLeft: 67,
    image: "https://picsum.photos/seed/bar-necklace/400/400?grayscale",
    description: "Simple and elegant bar pendant.",
    tags: ["necklace", "minimalist", "bar"],
  },
  {
    id: "p15",
    slug: "sapphire-drop-earrings",
    title: "Sapphire Drop Earrings",
    category: "Earrings",
    categorySlug: "earrings",
    price: 275.00,
    originalPrice: 350.00,
    discountPercentage: 21,
    rating: 4.8,
    reviews: 11,
    itemsLeft: 12,
    image: "https://picsum.photos/seed/sapphire-drops/400/400?grayscale",
    description: "Stunning sapphire drop earrings.",
    tags: ["earrings", "sapphire", "drop", "gemstone"],
  },
  {
    id: "p16",
    slug: "infinity-symbol-bracelet",
    title: "Infinity Symbol Bracelet",
    category: "Bracelets",
    categorySlug: "bracelets",
    price: 55.00,
    rating: 4.4,
    reviews: 29,
    itemsLeft: 45,
    image: "https://picsum.photos/seed/infinity-bracelet/400/400?grayscale",
    description: "Delicate infinity symbol bracelet.",
    tags: ["bracelet", "infinity", "symbol"],
  },
];

// Categories for filter
export const CATEGORIES = [
  { name: "Necklaces", slug: "necklaces", count: PRODUCTS.filter(p => p.categorySlug === "necklaces").length },
  { name: "Earrings", slug: "earrings", count: PRODUCTS.filter(p => p.categorySlug === "earrings").length },
  { name: "Bracelets", slug: "bracelets", count: PRODUCTS.filter(p => p.categorySlug === "bracelets").length },
];

// Price ranges for filter
export const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $500", min: 200, max: 500 },
  { label: "Over $500", min: 500, max: Infinity },
];

// Search function
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];
  
  return PRODUCTS.filter(product => 
    product.title.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.tags?.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    product.description?.toLowerCase().includes(lowerQuery)
  );
}

// Filter function
export function filterProducts(options: {
  categories?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price-asc" | "price-desc" | "rating" | "newest";
  searchQuery?: string;
}): Product[] {
  let filtered = [...PRODUCTS];

  // Search filter
  if (options.searchQuery) {
    const query = options.searchQuery.toLowerCase();
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query) ||
      p.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Category filter
  if (options.categories && options.categories.length > 0) {
    filtered = filtered.filter(p => options.categories!.includes(p.categorySlug));
  }

  // Price filter
  if (options.minPrice !== undefined) {
    filtered = filtered.filter(p => p.price >= options.minPrice!);
  }
  if (options.maxPrice !== undefined && options.maxPrice !== Infinity) {
    filtered = filtered.filter(p => p.price <= options.maxPrice!);
  }

  // Sorting
  switch (options.sortBy) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
    default:
      // Keep original order (newest first)
      break;
  }

  return filtered;
}

// Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

// Get products by category
export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter(p => p.categorySlug === categorySlug);
}
