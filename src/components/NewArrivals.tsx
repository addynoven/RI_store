import Link from "next/link";

const NEW_ARRIVAL_PRODUCTS = [
  {
    id: 1,
    title: "9ct White Gold 0.01cttw Diamond Flower Stud Earrings",
    category: "EARRINGS",
    price: 157.88,
    originalPrice: 285.30,
    rating: 3.50,
    reviews: 2,
    discountPercentage: 31,
    description: "These dazzling earrings feature Sterling Silver pave hoops with three 18K Yellow gold amulet accents.",
    image: "https://picsum.photos/seed/earring-new-1/400/400?grayscale",
    countdown: { days: 50, hours: 18, minutes: 22, seconds: 3 },
  },
  {
    id: 2,
    title: "Platinum 2.00ct Round Solitaire Engagement Ring",
    category: "RINGS",
    price: 723.50,
    originalPrice: 819.29,
    rating: 3.00,
    reviews: 3,
    discountPercentage: 12,
    description: "It consists of brilliant-cut diamonds totalling 1.00 carats, elegantly positioned in the shape of a claw.",
    image: "https://picsum.photos/seed/ring-new-1/400/400?grayscale",
    countdown: { days: 49, hours: 18, minutes: 22, seconds: 3 },
  },
];

export default function NewArrivals() {
  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex items-baseline gap-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">New Arrivals</h2>
        <p className="text-sm text-gray-400">
          Lorem ipsum groupie heteroek. Multin suprant Tintingate. Telagt osänings.
        </p>
      </div>

      {/* Products Grid - Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {NEW_ARRIVAL_PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="border border-red-200 bg-white p-6 flex gap-6 group hover:shadow-lg transition-shadow"
          >
            {/* Product Image */}
            <div className="relative w-1/3 aspect-square bg-[#f8f8f8] flex-shrink-0 overflow-hidden">
              {/* Discount Badge */}
              {product.discountPercentage && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1">
                    {product.discountPercentage}%
                  </span>
                </div>
              )}
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover mix-blend-multiply"
              />
            </div>

            {/* Product Details */}
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                {product.category}
              </span>
              
              <h3 className="text-base font-medium text-gray-900 mb-2 leading-tight group-hover:text-red-500 transition-colors">
                {product.title}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-red-500 font-bold text-lg">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 text-sm line-through">${product.originalPrice.toFixed(2)}</span>
                )}
              </div>

              <div className="flex items-center gap-1 text-sm mb-3">
                <svg className="w-4 h-4 fill-black text-black" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                <span className="text-gray-900 font-medium">{product.rating.toFixed(2)}</span>
                <span className="text-gray-400">{product.reviews} Reviews</span>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {product.description}
              </p>

              {/* Countdown Timer */}
              <div className="mt-auto flex items-center gap-2">
                <div className="flex gap-1 text-sm font-mono">
                  <span className="bg-gray-100 px-2 py-1 text-gray-900">{product.countdown.days}</span>
                  <span className="py-1">:</span>
                  <span className="bg-gray-100 px-2 py-1 text-gray-900">{product.countdown.hours}</span>
                  <span className="py-1">:</span>
                  <span className="bg-gray-100 px-2 py-1 text-gray-900">{product.countdown.minutes}</span>
                  <span className="py-1">:</span>
                  <span className="bg-gray-100 px-2 py-1 text-gray-900">{product.countdown.seconds}</span>
                </div>
                <span className="text-xs text-red-500">Campaign expiration date</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
