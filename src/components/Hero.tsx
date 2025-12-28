"use client";

import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Premium Jewelry",
    subtitle: "Handcrafted elegance for every occasion",
    image: "https://images.meesho.com/images/products/15293867/f67ec_512.jpg",
    cta: "Shop Now",
    link: "/shop",
  },
  {
    id: 2,
    title: "Traditional Designs",
    subtitle: "Timeless beauty that celebrates your heritage",
    image: "https://images.meesho.com/images/products/67611182/2yijm_512.jpg",
    cta: "Explore Collection",
    link: "/shop",
  },
  {
    id: 3,
    title: "Affordable Luxury",
    subtitle: "Beautiful jewelry at prices you'll love",
    image: "https://images.meesho.com/images/products/8321101/8v5o6_512.jpg",
    cta: "View Collection",
    link: "/shop",
  },
];

export default function Hero() {
  return (
    <section className="relative w-full h-[500px] md:h-[650px] overflow-hidden bg-gradient-to-br from-amber-50 to-rose-50">
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
              <div className="relative w-full h-[500px] md:h-[650px]">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-amber-800/60 to-transparent z-10"></div>
                
                {/* Background Image */}
                <div className="absolute right-0 top-0 w-full md:w-2/3 h-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Content Overlay */}
                <div className="relative z-20 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
                  <div className="max-w-xl space-y-6">
                    <span className="text-amber-300 text-sm font-medium uppercase tracking-widest">
                      RI Store Collection
                    </span>
                    
                    <h1 className="text-4xl md:text-6xl font-serif text-white leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-lg md:text-xl text-amber-100/90 font-light max-w-md">
                      {slide.subtitle}
                    </p>

                    <div className="pt-4">
                      <Link
                        href={slide.link}
                        className="
                          inline-block 
                          bg-white text-amber-900
                          px-8 py-3
                          text-sm font-bold uppercase tracking-wider
                          hover:bg-amber-100
                          transition-colors
                        "
                      >
                        {slide.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 border-0 text-white hover:bg-white/40 hover:text-white h-12 w-12" />
        <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 border-0 text-white hover:bg-white/40 hover:text-white h-12 w-12" />
      </Carousel>
    </section>
  );
}
