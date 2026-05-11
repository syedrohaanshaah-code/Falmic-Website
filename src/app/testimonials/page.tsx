import TestimonialsHero from "@/components/Testimonials/TestimonialsHero";
import StatsBar from "@/components/Testimonials/StatsBar";
import TestimonialsGrid from "@/components/Testimonials/TestimonialsGrid";
import VideoTestimonialCTA from "@/components/Testimonials/VideoTestimonialCTA";
import TestimonialsCTA from "@/components/Testimonials/TestimonialsCTA";
import Footer from "@/components/Home/Footer";
export default function TestimonialsPage() {
  return (
    <main>
      <TestimonialsHero />
      <StatsBar />
      <TestimonialsGrid />
      <VideoTestimonialCTA />
      <TestimonialsCTA />
      <Footer />
    </main>
  );
}