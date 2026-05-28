import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import ZodiacWheel from "@/components/ZodiacWheel";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const Hero = () => {
  return (
    <section id="top" className="relative pt-28 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      {/* Background ornaments */}
      <div className="absolute inset-0 starfield opacity-60 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px]" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[140px]" />

      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-soft border border-accent/30 text-accent-foreground text-xs md:text-sm font-medium mb-6 animate-fade-in">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              Trusted by 50,000+ seekers worldwide
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 animate-fade-in-up">
              Find Solutions to Your{" "}
              <span className="text-gradient">Life Problems</span>{" "}
              with Astro Sadhna
            </h1>

            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              Get expert guidance for business, marriage, career, and personal life — rooted in ancient Vedic wisdom and delivered with modern clarity.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glow text-primary-foreground font-semibold px-7 py-4 rounded-full inline-flex items-center gap-2 text-base"
              >
                Consult Now on WhatsApp
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#services"
                className="text-foreground/80 font-medium px-6 py-4 inline-flex items-center gap-2 hover:text-primary transition-colors"
              >
                Explore Services
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs md:text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> 100% Confidential</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 fill-accent text-accent" /> 4.9/5 Rating</div>
              <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Astrologers online</div>
            </div>
          </div>

          {/* Zodiac wheel */}
          <div className="relative animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <ZodiacWheel />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
