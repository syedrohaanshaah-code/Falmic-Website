import ServiceHero from "@/components/services/ServiceHero";
import ServicesListSection from "@/components/services/ServicesListSection";
import TestimonialsSection from "@/components/Home/TestimonialsSection";
import WorkflowSection from "@/components/Home/WorkflowSection";
import ContactSection from "@/components/Home/ContactSection";

export default function ServicesPage() {
  return (
    <main>
      <ServiceHero />
      <ServicesListSection />
      <TestimonialsSection />
      <WorkflowSection />
      <ContactSection />
    </main>
  );
}