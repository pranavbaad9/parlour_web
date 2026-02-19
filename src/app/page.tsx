import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import TattooSection from "@/components/home/TattooSection";
import Gallery from "@/components/home/Gallery";
import Reviews from "@/components/home/Reviews";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <TattooSection />
      <Gallery />
      <Reviews />
      <Contact />
    </div>
  );
}
