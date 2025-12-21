export default function CategoryShowcase() {
  const categories = [
    { name: "Bracelets", count: "16 PRODUCTS", seed: "bracelets" },
    { name: "Earrings", count: "16 PRODUCTS", seed: "earrings" },
    { name: "Gold Set", count: "4 PRODUCTS", seed: "gold-set" },
    { name: "Necklaces", count: "12 PRODUCTS", seed: "necklaces" },
    { name: "Rings", count: "13 PRODUCTS", seed: "rings" },
    { name: "Silver Set", count: "3 PRODUCTS", seed: "silver-set" },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
            <div key={idx} className="relative group overflow-hidden h-[200px] lg:h-[220px] cursor-pointer">
                {/* Background Image */}
                <img 
                  src={`https://picsum.photos/seed/${cat.seed}/300/300`}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>

                <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                    <h3 className="text-lg font-bold tracking-wide">{cat.name}</h3>
                    <p className="text-[10px] opacity-80 uppercase tracking-widest">{cat.count}</p>
                </div>
            </div>
        ))}
      </div>
    </section>
  );
}
