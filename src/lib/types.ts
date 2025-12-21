// Product Types
export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviews: number;
  itemsLeft: number;
  totalItems: number;
  image: string;
  images?: string[];
  description?: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  createdAt: string;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  image: string;
}

// Hero Slide Types
export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  cta: string;
  link: string;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  saleTag?: string;
  countdown?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
}

// Brand Types
export interface Brand {
  id: string;
  name: string;
  logo?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}
