import { Heart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

// Helper for the small side cards
function SideDealCard({ 
    badge, 
    category, 
    title, 
    price, 
    originalPrice,
    timer 
}: {
    badge: string;
    category: string;
    title: string;
    price: string;
    originalPrice: string;
    timer: string[]; // [DD, HH, MM, SS]
}) {
    return (
        <div className="flex gap-4 p-4 hover:shadow-md transition-shadow bg-white items-center">
            {/* Image Placeholder */}
            <div className="relative w-24 h-24 shrink-0 bg-gray-50 flex items-center justify-center">
                <span className="absolute top-0 left-0 bg-red-100 text-red-500 text-[10px] font-bold px-1.5 py-0.5">
                    {badge}
                </span>
                <div className="text-gray-200">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
            </div>

            <div className="space-y-1 w-full">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider">{category}</span>
                <h4 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2">{title}</h4>
                <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold">{price}</span>
                    <span className="text-xs text-gray-400 line-through">{originalPrice}</span>
                </div>
                
                {/* Timer */}
                <div className="pt-2">
                    <p className="text-[10px] text-gray-400 mb-1">The campaign is over.</p>
                    <div className="flex gap-1 text-xs font-mono text-gray-800">
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded-sm">{timer[0]}</span> :
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded-sm">{timer[1]}</span> :
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded-sm">{timer[2]}</span> :
                        <span className="bg-gray-100 px-1.5 py-0.5 rounded-sm">{timer[3]}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function FlashSalesGrid() {
  return (
    <section className="container mx-auto px-4 py-16 border-b border-gray-100">
        <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif text-gray-900">Don&apos;t miss this week&apos;s sales</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Left Column (List) */}
            <div className="flex flex-col gap-4">
                <SideDealCard 
                    badge="13%" 
                    category="BRACELETS" 
                    title="Twist Rows Bracelet" 
                    price="$71.99" 
                    originalPrice="$81.99" 
                    timer={["48", "19", "03", "28"]} 
                />
                <SideDealCard 
                    badge="30%" 
                    category="DROP AND DANGLE" 
                    title="Sterling Silver Offspring Open Earhoops" 
                    price="$86.77" 
                    originalPrice="$123.55" 
                    timer={["49", "19", "03", "28"]} 
                />
                <SideDealCard 
                    badge="24%" 
                    category="BRACELETS" 
                    title="Sterling Silver Mercy Open Bangle Medium" 
                    price="$59.85" 
                    originalPrice="$77.75" 
                    timer={["50", "19", "03", "28"]} 
                />
            </div>

            {/* Center Column (Featured - Spans 2 cols) */}
            <div className="lg:col-span-2 border border-red-500 p-8 flex flex-col justify-center items-center relative group">
                 <div className="absolute top-4 left-4">
                    <span className="border border-red-400 text-red-500 bg-white text-xs font-bold px-2 py-1">
                        12%
                    </span>
                 </div>

                 {/* Large Image Placeholder */}
                 <div className="w-64 h-64 bg-gray-50 flex items-center justify-center mb-6">
                    <svg className="w-24 h-24 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>

                 <div className="w-full max-w-md space-y-3">
                    <div className="flex justify-between items-start">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">BRACELETS</span>
                        <Heart className="w-5 h-5 text-gray-400 cursor-pointer hover:text-red-500" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900">9ct Yellow Gold Double Square Tube Bangle</h3>
                    
                    <div className="flex items-center gap-3">
                        <span className="text-red-500 font-bold text-xl">$550.20</span>
                        <span className="text-gray-400 text-sm line-through">$619.80</span>
                    </div>

                    {/* Ratings */}
                    <div className="flex items-center gap-1">
                        <div className="flex text-black">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3 h-3 ${i < 4 ? "fill-current" : "text-gray-300 fill-current"}`} viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 font-bold ml-1">3.50</span>
                        <span className="text-[10px] text-gray-400 ml-1">2 Reviews</span>
                    </div>

                    {/* Progress */}
                    <div className="pt-4">
                        <Progress value={20} className="h-1.5 bg-gray-100 [&>div]:bg-red-500" />
                        <p className="text-xs text-gray-500 mt-2">
                             Last <span className="font-bold text-black">7</span> products before the end of the campaign.
                        </p>
                    </div>
                 </div>
            </div>

            {/* Right Column (List) */}
            <div className="flex flex-col gap-4">
                <SideDealCard 
                    badge="8%" 
                    category="COCKTAIL" 
                    title="18ct White Gold 0.50ct Diamond Curved Wedding Ring" 
                    price="$715.99" 
                    originalPrice="$775.99" 
                    timer={["51", "19", "03", "28"]} 
                />
                <SideDealCard 
                    badge="18%" 
                    category="ETERNITY" 
                    title="Platinum 0.10cttw Diamond Eternity Ring" 
                    price="$468.99" 
                    originalPrice="$568.99" 
                    timer={["50", "19", "03", "28"]} 
                />
                <SideDealCard 
                    badge="23%" 
                    category="BRACELETS" 
                    title="18ct White Gold 2cttw Line Bracelet" 
                    price="$697.88" 
                    originalPrice="$897.88" 
                    timer={["49", "19", "03", "28"]} 
                />
            </div>

        </div>
    </section>
  );
}
