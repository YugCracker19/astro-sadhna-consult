import { Zap, ShieldCheck, UserCheck, Clock } from "lucide-react";

const FEATURES = [
  { icon: Zap, title: "Quick Response", desc: "Connect within minutes via WhatsApp — no waiting, no delays." },
  { icon: ShieldCheck, title: "Trusted Astrologers", desc: "Decades of authentic Vedic experience and verified credentials." },
  { icon: UserCheck, title: "Personalized Solutions", desc: "Every remedy tailored to your unique birth chart and life context." },
  { icon: Clock, title: "24/7 Availability", desc: "Day or night — guidance is just a message away, whenever you need it." },
];

const WhyChooseUs = () => {
  return (
    <section id="why" className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/40">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3">Why Choose Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Built on <span className="text-gradient">Trust & Tradition</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="text-center p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-[var(--shadow-glow)] hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
                <div className="relative inline-flex mb-5">
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl" />
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
