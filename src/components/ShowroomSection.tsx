import Link from "next/link";

export default function ShowroomSection() {
  return (
    <section className="bg-[#fffdf9] py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 max-w-md">
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Visit Us Today</span>
                <h2 className="text-4xl font-serif text-gray-900">Our Showroom</h2>
                
                <p className="text-sm text-gray-500 leading-relaxed">
                    Come visit our exclusive showroom to experience the elegance firsthand. 
                    Our experts are ready to guide you through our collections and help you find 
                    the perfect piece that resonates with your style.
                </p>

                <div className="pt-4 space-y-1">
                    <p className="text-sm font-bold text-gray-900 underline">Opening Hours:</p>
                    <p className="text-sm text-gray-500">10am - 5pm</p>
                    <p className="text-sm text-gray-500">Thursday - Saturday</p>
                </div>

                <div className="pt-6">
                     <Link href="#" className="inline-block border-b border-black pb-1 text-xs font-bold uppercase tracking-widest hover:text-red-500 hover:border-red-500 transition-colors">
                        Book a Visit
                    </Link>
                </div>
            </div>

            {/* Right Image */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden shadow-xl">
                 <img 
                   src="https://picsum.photos/seed/showroom/800/600"
                   alt="Our Showroom"
                   className="w-full h-full object-cover"
                 />
            </div>

        </div>
      </div>
    </section>
  );
}
