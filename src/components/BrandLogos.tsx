export default function BrandLogos() {
  const brands = [
    "BAUBLEBAR", "ALMASIKA", "MEJURI", "TIFFANY & Co.", 
    "PANDORA", "BVLGARI", "MIKIMOTO", "SWAROVSKI"
  ];

  return (
    <section className="border-t border-b border-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand) => (
                <span key={brand} className="text-xl md:text-2xl font-serif font-bold text-gray-400 hover:text-red-500 cursor-pointer">{brand}</span>
            ))}
        </div>
      </div>
    </section>
  );
}
