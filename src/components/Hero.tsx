"use client";

import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Pieces to Keep Forever",
    subtitle: "Jewelry is a lot like love; it's a good idea but expensive",
    image: "https://picsum.photos/seed/hero-slide-1/1920/1080",
    cta: "Shop Collection",
    link: "/shop",
  },
  {
    id: 2,
    title: "Timeless Elegance",
    subtitle: "Discover our exclusive collection of handcrafted jewelry",
    image: "https://picsum.photos/seed/hero-slide-2/1920/1080",
    cta: "Explore Now",
    link: "/shop",
  },
  {
    id: 3,
    title: "Luxury Redefined",
    subtitle: "Where craftsmanship meets contemporary design",
    image: "https://picsum.photos/seed/hero-slide-3/1920/1080",
    cta: "View Collection",
    link: "/shop",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[750px] overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full -ml-0">
          {HERO_SLIDES.map((slide) => (
            <CarouselItem key={slide.id} className="h-full pl-0">
              <div className="relative w-full h-[600px] md:h-[750px]">
                {/* Background Image */}
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center text-white space-y-4 pt-20">
                  <h1 className="text-5xl md:text-7xl font-serif tracking-tight drop-shadow-md">
                    {slide.title}
                  </h1>

                  <p className="text-lg md:text-xl font-sans font-light tracking-wide max-w-xl drop-shadow-sm">
                    {slide.subtitle}
                  </p>

                  <div className="pt-8">
                    <Link
                      href={slide.link}
                      className="
                        inline-block 
                        text-sm font-bold uppercase tracking-[0.2em] 
                        text-white 
                        border-b-2 border-white 
                        pb-1
                        hover:text-gray-200 hover:border-gray-200 
                        transition-all
                      "
                    >
                      {slide.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 bg-transparent border-0 text-white/50 hover:text-white hover:bg-transparent h-16 w-16 [&>svg]:w-10 [&>svg]:h-10" />
        <CarouselNext className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 bg-transparent border-0 text-white/50 hover:text-white hover:bg-transparent h-16 w-16 [&>svg]:w-10 [&>svg]:h-10" />
      </Carousel>
    </section>
  );
}
