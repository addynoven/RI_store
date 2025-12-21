import Hero from "@/components/Hero";
import SalesSection from "@/components/SalesSection";
import CollectionsGrid from "@/components/CollectionsGrid";
import NewArrivals from "@/components/NewArrivals";
import FeaturedCollection from "@/components/FeaturedCollection";
import BrandLogos from "@/components/BrandLogos";
import CategoryShowcase from "@/components/CategoryShowcase";
import ShowroomSection from "@/components/ShowroomSection";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Hero />
      <SalesSection />
      <CollectionsGrid />
      <NewArrivals />
      <FeaturedCollection />
      <BrandLogos />
      <CategoryShowcase />
      <ShowroomSection />
    </main>
  );
}
