import HeroSection from "@/components/ui/HeroSection";
import StorySection from "@/components/ui/StorySection";
import ServicesSection from "@/components/ui/ServicesSection";
import PortfolioSection from "@/components/ui/PortfolioSection";
import WorkflowSection from "@/components/ui/WorkflowSection";
import TestimonialsSection from "@/components/ui/TestimonialsSection";
import NewsSection from "@/components/ui/NewsSection";
import ContactSection from "@/components/ui/ContactSection";
import FAQSection from "@/components/ui/FAQSection";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <ServicesSection />
      <PortfolioSection />
      <WorkflowSection />
      <TestimonialsSection />
      <NewsSection />
      <ContactSection />
      <FAQSection />
      <Footer />
    </main>
  );
}