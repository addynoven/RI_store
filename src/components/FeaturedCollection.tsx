import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function FeaturedCollection() {
  return (
    <section className="container mx-auto px-4 py-8 mb-20">
      
      {/* 1. Top Banners Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Banner 1 */}
        <div className="h-[250px] relative overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/sparkle-banner/600/300"
              alt="Unleash Your Inner Sparkle"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 h-full flex items-center px-8 sm:px-12">
              <div className="max-w-[60%] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Cyber Monday Sale</span>
                  <h3 className="text-xl md:text-2xl font-serif text-white font-medium leading-tight">Unleash Your Inner Sparkle</h3>
                  <p className="text-xs text-white/80 mb-3">Exquisite Jewelry for the Extraordinary You...</p>
                  <div className="flex gap-2 items-center text-sm">
                      <span className="font-bold text-red-400">$95.67</span>
                      <span className="text-white/60 line-through text-xs">$115.67</span>
                  </div>
              </div>
            </div>
        </div>

        {/* Banner 2 */}
        <div className="h-[250px] relative overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/dazzle-banner/600/300"
              alt="Dare to Dazzle Differently"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="relative z-10 h-full flex items-center px-8 sm:px-12">
              <div className="max-w-[60%] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Cyber Monday Sale</span>
                  <h3 className="text-xl md:text-2xl font-serif text-white font-medium leading-tight">Dare to Dazzle Differently</h3>
                  <p className="text-xs text-white/80 mb-3">Beautiful pieces to pass down for generations...</p>
                  <div className="flex gap-2 items-center text-sm">
                      <span className="font-bold text-red-400">$196.45</span>
                      <span className="text-white/60 line-through text-xs">$265.77</span>
                  </div>
              </div>
            </div>
        </div>
      </div>

      {/* 2. Bottom Grid (Product - Banner - Product) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Product */}
        <div className="lg:col-span-1">
             <ProductCard 
                title="9ct Yellow Gold Pendant With Fresh Water Pearl"
                category="GOLD SET"
                price={200.19}
                originalPrice={219.99}
                rating={4.5}
                reviews={3}
                itemsLeft={45}
                discountPercentage={18}
            />
            {/* Extra "Add to Cart" textual link below card as seen in screenshot */}
            <div className="mt-2 text-xs font-bold text-red-500 uppercase tracking-widest cursor-pointer hover:underline">
                Add to Cart
            </div>
        </div>

        {/* Center Banner */}
        <div className="lg:col-span-2 relative h-[500px] lg:h-auto overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/discover-elegance/800/800"
              alt="Discover Elegance"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30"></div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-8">
              <div className="text-white space-y-4">
                  <h2 className="text-4xl font-serif tracking-wide drop-shadow-md">Discover Elegance</h2>
                  <p className="text-sm font-sans tracking-wide opacity-90 pb-4">Thoughtfully designed jewelry to wear everyday</p>
                  <Link 
                      href="/shop" 
                      className="inline-block border-b border-white pb-1 text-xs font-bold uppercase tracking-widest hover:text-gray-200 hover:border-gray-200 transition-colors"
                  >
                      Shop Collection
                  </Link>
              </div>
            </div>
        </div>

        {/* Right Product */}
        <div className="lg:col-span-1">
             <ProductCard 
                title="9ct White Gold Diamond And 6.5-7mm Fresh Water Pearl"
                category="CHARM NECKLACES"
                price={200.19}
                originalPrice={219.99}
                rating={3.67}
                reviews={8}
                itemsLeft={23}
                discountPercentage={10}
            />
        </div>

      </div>
    </section>
  );
}
