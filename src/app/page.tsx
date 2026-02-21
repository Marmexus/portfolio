import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TechGrid from "@/components/TechGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import ProjectsGallery from "@/components/ProjectsGallery";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AboutSection from "@/components/AboutSection";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <TechGrid />
      <ExperienceTimeline />
      <ProjectsGallery />
      <ContactSection />
      <Footer />
    </main>
  );
}
