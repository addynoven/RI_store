import { HeroSlide } from "../types";

export const heroSlides: HeroSlide[] = [
  {
    id: "slide_001",
    title: "Pieces to Keep Forever",
    subtitle: "Jewelry is a lot like love; it's a good idea but expensive",
    image: "https://picsum.photos/seed/hero-slide-1/1920/1080",
    cta: "Shop Collection",
    link: "/shop",
  },
  {
    id: "slide_002",
    title: "Timeless Elegance",
    subtitle: "Discover our exclusive collection of handcrafted jewelry",
    image: "https://picsum.photos/seed/hero-slide-2/1920/1080",
    cta: "Explore Now",
    link: "/shop",
  },
  {
    id: "slide_003",
    title: "Luxury Redefined",
    subtitle: "Where craftsmanship meets contemporary design",
    image: "https://picsum.photos/seed/hero-slide-3/1920/1080",
    cta: "View Collection",
    link: "/shop",
  },
];

export const getHeroSlides = () => heroSlides;
