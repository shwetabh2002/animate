import { Navbar } from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { Interstitial3DSection } from "@/components/home/Interstitial3DSection";
import { PhilosophyBand } from "@/components/home/PhilosophyBand";
import { SeriesSection } from "@/components/home/SeriesSection";
import { LayersSection } from "@/components/home/LayersSection";
import { FireStandardsSection } from "@/components/home/FireStandardsSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsSection />
        <Interstitial3DSection />
        <PhilosophyBand />
        <SeriesSection />
        <LayersSection />
        <FireStandardsSection />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
