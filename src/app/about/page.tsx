import AboutHero from "@/components/About/AboutHero";
import StorySection from "@/components/Home/StorySection";
import WhyTrustUs from "@/components/About/WhyTrustUs";
import TeamSection from "@/components/About/TeamSection";
import Footer from "@/components/Home/Footer";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <StorySection />
      <WhyTrustUs />
      <TeamSection />
      <Footer />
    </main>
  );
}