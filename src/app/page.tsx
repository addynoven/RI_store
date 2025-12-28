import Hero from "@/components/Hero";
import SalesSection from "@/components/SalesSection";
import CollectionsGrid from "@/components/CollectionsGrid";
import NewArrivals from "@/components/NewArrivals";
import FeaturedCollection from "@/components/FeaturedCollection";

export default function Home() {
  return (
    <main className="min-h-screen pb-20">
      <Hero />
      <SalesSection />
      <NewArrivals />
      <FeaturedCollection />
      <CollectionsGrid />
    </main>
  );
}
