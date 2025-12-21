import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCard";
import { Truck, ShieldCheck, Headset, CreditCard } from "lucide-react";

const BRACELETS = [
    { id: 1, title: "Twist Rows Bracelet", category: "BRACELETS", price: 71.99, originalPrice: 81.99, rating: 4.33, reviews: 3, itemsLeft: 84, discount: 13 },
    { id: 2, title: "Sterling Silver Mercy Open Bangle Medium", category: "BRACELETS", price: 59.85, originalPrice: 77.75, rating: 4.0, reviews: 3, itemsLeft: 30, discount: 24 },
    { id: 3, title: "Sterling Silver 5mm Torque Bangle", category: "BRACELETS", price: 44.19, originalPrice: 59.89, rating: 4.67, reviews: 3, itemsLeft: 21, discount: 27 },
    { id: 4, title: "Silver Torque Wave Bangle S Design", category: "BRACELETS", price: 99.99, rating: 4.0, reviews: 3, itemsLeft: 39 },
    { id: 5, title: "Silver Mens Open Cuff Bangle Goldsmiths", category: "BRACELETS", price: 81.45, originalPrice: 120.99, rating: 3.33, reviews: 3, itemsLeft: 56, discount: 33 },
];

const EARRINGS = [
    { id: 1, title: "Sterling Silver Offspring Open Earhoops", category: "EARRINGS", price: 86.77, originalPrice: 123.55, rating: 4.5, reviews: 4, itemsLeft: 31, discount: 30 },
    { id: 2, title: "Sterling Silver 4mm Ball Stud Earrings", category: "EARRINGS", price: 195.29, originalPrice: 266.88, rating: 4.2, reviews: 6, itemsLeft: 23, discount: 27 },
    { id: 3, title: "Diamond Hoop Earrings 14K Gold", category: "EARRINGS", price: 299.99, originalPrice: 399.99, rating: 5.0, reviews: 8, itemsLeft: 12, discount: 25 },
    { id: 4, title: "Pearl Drop Earrings Sterling Silver", category: "EARRINGS", price: 89.99, rating: 4.3, reviews: 5, itemsLeft: 45 },
    { id: 5, title: "Crystal Chandelier Earrings", category: "EARRINGS", price: 156.50, originalPrice: 189.99, rating: 4.1, reviews: 3, itemsLeft: 28, discount: 18 },
];

const NECKLACES = [
    { id: 1, title: "Sterling Silver Heart Locket Necklace", category: "NECKLACES", price: 43.99, originalPrice: 52.25, rating: 4.8, reviews: 5, itemsLeft: 28, discount: 16 },
    { id: 2, title: "9ct White Gold Diamond Pearl Necklace", category: "NECKLACES", price: 200.19, originalPrice: 219.99, rating: 3.67, reviews: 8, itemsLeft: 23, discount: 10 },
    { id: 3, title: "Gold Chain Layered Necklace Set", category: "NECKLACES", price: 129.99, originalPrice: 159.99, rating: 4.5, reviews: 12, itemsLeft: 34, discount: 19 },
    { id: 4, title: "Diamond Pendant Necklace 18K", category: "NECKLACES", price: 450.00, rating: 4.9, reviews: 7, itemsLeft: 8 },
    { id: 5, title: "Birthstone Charm Necklace", category: "NECKLACES", price: 78.50, originalPrice: 98.00, rating: 4.2, reviews: 4, itemsLeft: 52, discount: 20 },
];

const RINGS = [
    { id: 1, title: "Diamond Solitaire Engagement Ring", category: "RINGS", price: 1299.99, originalPrice: 1599.99, rating: 5.0, reviews: 12, itemsLeft: 8, discount: 19 },
    { id: 2, title: "Sterling Silver Infinity Band Ring", category: "RINGS", price: 89.99, rating: 4.3, reviews: 7, itemsLeft: 62 },
    { id: 3, title: "Platinum Wedding Band Classic", category: "RINGS", price: 599.99, originalPrice: 749.99, rating: 4.8, reviews: 15, itemsLeft: 18, discount: 20 },
    { id: 4, title: "Rose Gold Stackable Ring Set", category: "RINGS", price: 145.00, originalPrice: 175.00, rating: 4.4, reviews: 9, itemsLeft: 41, discount: 17 },
    { id: 5, title: "Sapphire Halo Engagement Ring", category: "RINGS", price: 899.00, rating: 4.7, reviews: 6, itemsLeft: 5 },
];

function ProductCarousel({ products }: { products: typeof BRACELETS }) {
  return (
    <Carousel 
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/4 xl:basis-1/5">
            <ProductCard 
              title={product.title}
              category={product.category}
              price={product.price}
              originalPrice={product.originalPrice}
              discountPercentage={product.discount}
              rating={product.rating}
              reviews={product.reviews}
              itemsLeft={product.itemsLeft}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}

export default function SalesSection() {
  return (
    <section className="bg-white py-10 border-b border-gray-100">
       
       {/* 1. Features Bar */}
       <div className="container mx-auto px-4 mb-16">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
                <Truck className="w-10 h-10 text-gray-300" strokeWidth={1} />
                <div>
                    <h4 className="font-bold text-sm text-gray-900">Free Shipping</h4>
                    <p className="text-xs text-gray-500">Free shipping for orders over $130</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <ShieldCheck className="w-10 h-10 text-gray-300" strokeWidth={1} />
                 <div>
                    <h4 className="font-bold text-sm text-gray-900">Money Guarantee</h4>
                    <p className="text-xs text-gray-500">Within 30 days for an exchange</p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <Headset className="w-10 h-10 text-gray-300" strokeWidth={1} />
                 <div>
                    <h4 className="font-bold text-sm text-gray-900">Online Support</h4>
                    <p className="text-xs text-gray-500">24 hours a day, 7 days a week</p>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <CreditCard className="w-10 h-10 text-gray-300" strokeWidth={1} />
                 <div>
                    <h4 className="font-bold text-sm text-gray-900">Flexible Payment</h4>
                    <p className="text-xs text-gray-500">Pay with multiple Credit Cards</p>
                </div>
            </div>
         </div>
       </div>

       {/* 2. Sales Title & Tabs */}
       <div className="container mx-auto px-4">
         <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold font-sans text-gray-900">Don&apos;t miss this weeks sales</h2>
            <p className="text-sm text-gray-500 font-light max-w-2xl mx-auto">
                Our jewelry is made by the finest artists and carefully selected to reflect your style and personality
            </p>
         </div>

         <Tabs defaultValue="bracelets" className="w-full">
            <div className="flex justify-center mb-8">
                <TabsList className="bg-transparent border-b border-transparent h-auto p-0 gap-8">
                    {["Bracelets", "Earrings", "Necklaces", "Rings"].map((tab) => (
                        <TabsTrigger 
                            key={tab} 
                            value={tab.toLowerCase()}
                            className="bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-400 data-[state=active]:text-black data-[state=active]:font-bold data-[state=active]:border-b-2 data-[state=active]:border-black rounded-none px-0 pb-2 text-base transition-all"
                        >
                            {tab}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            <TabsContent value="bracelets" className="mt-0">
              <ProductCarousel products={BRACELETS} />
            </TabsContent>
            
            <TabsContent value="earrings" className="mt-0">
              <ProductCarousel products={EARRINGS} />
            </TabsContent>
            
            <TabsContent value="necklaces" className="mt-0">
              <ProductCarousel products={NECKLACES} />
            </TabsContent>
            
            <TabsContent value="rings" className="mt-0">
              <ProductCarousel products={RINGS} />
            </TabsContent>
         </Tabs>
       </div>
    </section>
  );
}
