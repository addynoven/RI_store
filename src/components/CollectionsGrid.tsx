import Link from "next/link";

export default function CollectionsGrid() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-auto lg:h-[650px]">
        
        {/* Left Column - Large Card */}
        <div className="relative h-[500px] lg:h-full overflow-hidden group">
             {/* Background Image */}
             <img 
               src="https://picsum.photos/seed/love-letter/800/1000"
               alt="Love Letter Collection"
               className="absolute inset-0 w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-black/20"></div>

             <div className="relative z-10 h-full p-8 md:p-12 flex flex-col justify-start">
               <div className="max-w-sm space-y-4">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80">Cyber Monday Sale</span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-white">Love Letter Collection</h2>
                  <p className="text-sm text-white/80 leading-relaxed">
                      You&apos;re the one who makes your jewelry shine. So wear it with style—and love...
                  </p>
                  
                  <div className="pt-4">
                      <Link href="/shop" className="inline-block border-b border-white pb-1 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 hover:border-white/80 transition-colors">
                          Shop Collection
                      </Link>
                  </div>
               </div>

               {/* Timer at Bottom */}
               <div className="mt-auto pt-10">
                  <p className="text-xs text-white/60 mb-2">The campaign is over.</p>
                  <div className="flex gap-2 text-lg font-mono font-medium text-white">
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1">50</div>
                      <span className="py-1">:</span>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1">19</div>
                      <span className="py-1">:</span>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1">04</div>
                      <span className="py-1">:</span>
                      <div className="bg-white/20 backdrop-blur-sm px-3 py-1">20</div>
                  </div>
               </div>
             </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 h-full">
            
            {/* Top - Wide Card */}
            <div className="relative flex-1 overflow-hidden group">
                 {/* Background Image */}
                 <img 
                   src="https://picsum.photos/seed/essentials/800/500"
                   alt="The Essentials Collection"
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-black/20"></div>

                 <div className="relative z-10 h-full p-8 md:p-10 flex flex-col justify-center">
                   <div className="max-w-xs space-y-3">
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/80">Cyber Monday Sale</span>
                      <h2 className="text-2xl sm:text-3xl font-serif text-white">The Essentials Collection</h2>
                      <p className="text-sm text-white/80">
                          Beautiful pieces to pass down for generations...
                      </p>
                      <div className="pt-2">
                          <Link href="/shop" className="inline-block border-b border-white pb-1 text-xs font-bold uppercase tracking-widest text-white hover:text-white/80 hover:border-white/80 transition-colors">
                              Shop Collection
                          </Link>
                      </div>
                  </div>
                 </div>
            </div>

            {/* Bottom - Two Boxes */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Earrings Layout */}
                <div className="relative overflow-hidden group">
                     <img 
                       src="https://picsum.photos/seed/earrings-cat/400/400"
                       alt="Earrings"
                       className="absolute inset-0 w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-black/30"></div>
                     
                     <div className="relative z-10 h-full p-8 flex flex-col justify-center">
                       <div className="space-y-3">
                          <h3 className="text-xl font-serif text-white">Earrings</h3>
                          <p className="text-xs text-white/80 leading-relaxed max-w-[150px]">
                              Be the kind of woman that others wish they were...
                          </p>
                           <div className="pt-2">
                              <Link href="/shop" className="inline-block border-b border-white pb-1 text-[10px] font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors">
                                  Shop Collection
                              </Link>
                          </div>
                       </div>
                     </div>
                </div>

                {/* Rings Layout */}
                 <div className="relative overflow-hidden group">
                     <img 
                       src="https://picsum.photos/seed/rings-cat/400/400"
                       alt="Rings"
                       className="absolute inset-0 w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-black/30"></div>

                     <div className="relative z-10 h-full p-8 flex flex-col justify-center">
                       <div className="space-y-3">
                          <h3 className="text-xl font-serif text-white">Rings</h3>
                          <p className="text-xs text-white/80 leading-relaxed max-w-[150px]">
                              The diamonds are real, but the magic is in your eyes...
                          </p>
                           <div className="pt-2">
                              <Link href="/shop" className="inline-block border-b border-white pb-1 text-[10px] font-bold uppercase tracking-widest text-white hover:text-white/80 transition-colors">
                                  Shop Collection
                              </Link>
                          </div>
                       </div>
                     </div>
                </div>

            </div>
        </div>

      </div>
    </section>
  );
}
