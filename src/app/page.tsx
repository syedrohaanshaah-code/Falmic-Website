import HeroSection from "@/components/Home/HeroSection";
import StorySection from "@/components/Home/StorySection";
import ServicesSection from "@/components/Home/ServicesSection";
import PortfolioSection from "@/components/Home/PortfolioSection";
import WorkflowSection from "@/components/Home/WorkflowSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import NewsSection from "@/components/Home/NewsSection";
import ContactSection from "@/components/Home/ContactSection";
import FAQSection from "@/components/Home/FAQSection";
import Footer from "@/components/Home/Footer";

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