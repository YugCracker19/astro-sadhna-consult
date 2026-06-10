import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import LeadPopup from "@/components/LeadPopup";
import CursorGlow from "@/components/CursorGlow";
import FloatingSymbols from "@/components/FloatingSymbols";


const Index = () => {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Astro Sadhna",
    description:
      "Premium Vedic astrology consultations on WhatsApp for business, marriage, career, and life guidance.",
    serviceType: "Astrology Consultation",
    areaServed: "Worldwide",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "5200",
    },
  };

  return (
    <main className="min-h-screen bg-background overflow-x-hidden relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <FloatingSymbols count={16} />
      <CursorGlow />
      <Header />

      <Hero />
      <Services />
      <About />
      <Testimonials />
      <WhyChooseUs />
      <CTA />
      <Footer />
      <WhatsAppFloat />
      <LeadPopup />
    </main>
  );
};

export default Index;
