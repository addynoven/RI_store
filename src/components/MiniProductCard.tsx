import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface MiniProductCardProps {
  title: string;
  category: string;
  price: number;
  originalPrice?: number;
  itemsLeft?: number;
  totalItems?: number;
}

function createSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default function MiniProductCard({ 
  title, 
  category, 
  price, 
  originalPrice, 
  itemsLeft = 30,
  totalItems = 100
}: MiniProductCardProps) {
  const slug = createSlug(title);
  
  return (
    <Link href={`/shop/${slug}`} className="group w-full block">
      {/* Image Container */}
      <div className="relative aspect-square bg-[#f5f5f5] mb-3 overflow-hidden">
        {/* Product Image */}
        <img 
          src={`https://picsum.photos/seed/${encodeURIComponent(title)}/300/300`}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Hover Action - Only visible on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/80">
             <span className="bg-white border border-gray-300 text-gray-900 px-4 py-2 text-[10px] font-bold uppercase tracking-wider">
                Quick View
             </span>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <span className="text-[10px] text-gray-400 uppercase tracking-wider">{category}</span>
        
        <h4 className="text-xs font-medium text-gray-900 group-hover:text-red-500 transition-colors leading-tight line-clamp-2 min-h-[32px]">
            {title}
        </h4>

        <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold text-sm">${price.toFixed(2)}</span>
            {originalPrice && (
                <span className="text-gray-400 text-xs line-through">${originalPrice.toFixed(2)}</span>
            )}
        </div>

        {/* Ratings placeholder - showing stars */}
        <div className="flex items-center gap-1 pt-1">
             <div className="flex">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-2.5 h-2.5 text-gray-300 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                ))}
            </div>
            <span className="text-[10px] text-gray-400">0 Reviews</span>
        </div>

        {/* Stock Progress */}
        <div className="pt-2">
            <Progress value={(itemsLeft / totalItems) * 100} className="h-1 bg-gray-100 [&>div]:bg-red-500" />
            <p className="text-[10px] text-gray-500 mt-1">
                Last <span className="font-bold text-gray-900">{itemsLeft}</span> products before the end of the campaign.
            </p>
        </div>
      </div>
    </Link>
  );
}
