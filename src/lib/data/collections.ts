import { Collection } from "../types";

export const collections: Collection[] = [
  {
    id: "col_001",
    name: "Love Letter Collection",
    slug: "love-letter",
    description: "You're the one who makes your jewelry shine. So wear it with style—and love...",
    image: "https://picsum.photos/seed/love-letter/800/1000",
    saleTag: "Cyber Monday Sale",
    countdown: {
      days: 50,
      hours: 19,
      minutes: 4,
      seconds: 20,
    },
  },
  {
    id: "col_002",
    name: "The Essentials Collection",
    slug: "essentials",
    description: "Beautiful pieces to pass down for generations...",
    image: "https://picsum.photos/seed/essentials/800/500",
    saleTag: "Cyber Monday Sale",
  },
  {
    id: "col_003",
    name: "Unleash Your Inner Sparkle",
    slug: "sparkle",
    description: "Exquisite Jewelry for the Extraordinary You...",
    image: "https://picsum.photos/seed/sparkle-banner/600/300",
    saleTag: "Cyber Monday Sale",
  },
  {
    id: "col_004",
    name: "Dare to Dazzle Differently",
    slug: "dazzle",
    description: "Beautiful pieces to pass down for generations...",
    image: "https://picsum.photos/seed/dazzle-banner/600/300",
    saleTag: "Cyber Monday Sale",
  },
  {
    id: "col_005",
    name: "Discover Elegance",
    slug: "elegance",
    description: "Thoughtfully designed jewelry to wear everyday",
    image: "https://picsum.photos/seed/discover-elegance/800/800",
  },
];

export const getCollections = () => collections;

export const getCollectionBySlug = (slug: string) => 
  collections.find(c => c.slug === slug);
