import Breadcrumb from "@/components/Breadcrumb";
import { Award, Heart, Gem, Users } from "lucide-react";
import { siteConfig } from "@/lib/config";

const VALUES = [
  {
    icon: Gem,
    title: "Quality Craftsmanship",
    description: "Every piece is handcrafted by skilled artisans using only the finest materials.",
  },
  {
    icon: Heart,
    title: "Passion for Design",
    description: "We pour our hearts into creating timeless pieces that tell a story.",
  },
  {
    icon: Award,
    title: "Ethical Sourcing",
    description: "All our materials are responsibly sourced with full traceability.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority, from selection to delivery.",
  },
];

const TEAM = [
  { name: "Sarah Johnson", role: "Founder & CEO", image: "https://picsum.photos/seed/team-1/300/300" },
  { name: "Michael Chen", role: "Head Designer", image: "https://picsum.photos/seed/team-2/300/300" },
  { name: "Emily Davis", role: "Master Jeweler", image: "https://picsum.photos/seed/team-3/300/300" },
  { name: "James Wilson", role: "Customer Experience", image: "https://picsum.photos/seed/team-4/300/300" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="https://picsum.photos/seed/about-hero/1920/800"
          alt={`About ${siteConfig.name}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Story</h1>
          <p className="text-lg max-w-2xl px-4">Crafting timeless elegance since 2010</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <Breadcrumb items={[{ label: "About Us" }]} />
      </div>

      {/* Story Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              Where Artistry Meets Elegance
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2010, {siteConfig.name} began with a simple vision: to create jewelry that
                captures life&apos;s most precious moments. What started as a small atelier in
                New York has grown into a globally recognized brand, yet we&apos;ve never lost
                sight of our founding principles.
              </p>
              <p>
                Each piece in our collection is meticulously handcrafted by master artisans who
                have dedicated their lives to the art of jewelry making. We source only the
                finest materials – ethically mined gemstones, recycled precious metals, and
                conflict-free diamonds.
              </p>
              <p>
                Our commitment to excellence extends beyond our jewelry. We believe in building
                lasting relationships with our customers, ensuring that every interaction with
                {siteConfig.name} is as memorable as the pieces you wear.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://picsum.photos/seed/about-story/600/800"
              alt="Our workshop"
              className="w-full h-[500px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#f8f8f8] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="w-8 h-8 text-gray-900" strokeWidth={1} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-serif font-bold text-gray-900 text-center mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h3 className="font-bold text-gray-900">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-serif font-bold mb-2">14+</p>
              <p className="text-gray-400">Years of Excellence</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold mb-2">50K+</p>
              <p className="text-gray-400">Happy Customers</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold mb-2">1000+</p>
              <p className="text-gray-400">Unique Designs</p>
            </div>
            <div>
              <p className="text-4xl font-serif font-bold mb-2">25+</p>
              <p className="text-gray-400">Master Artisans</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
