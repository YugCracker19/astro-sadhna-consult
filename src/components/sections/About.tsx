import { Sparkles, Users, Award } from "lucide-react";

const STATS = [
  { icon: Users, value: "50K+", label: "Happy Seekers" },
  { icon: Award, value: "15+", label: "Years Experience" },
  { icon: Sparkles, value: "98%", label: "Accuracy Rate" },
];

const About = () => {
  return (
    <section id="about" className="py-20 md:py-28 relative bg-gradient-to-b from-secondary/40 via-background to-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary/15 via-accent/10 to-transparent p-1 relative overflow-hidden">
              <div className="w-full h-full rounded-3xl bg-card flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 starfield opacity-50" />
                <div className="relative text-center px-8">
                  <div className="text-8xl mb-4" style={{ fontFamily: "serif" }}>ॐ</div>
                  <div className="font-display text-2xl text-gradient font-semibold">Sadhna</div>
                  <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mt-2">Sacred Practice</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-accent/30 blur-2xl animate-glow-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/30 blur-2xl animate-glow-pulse" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3">About Astro Sadhna</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Where Ancient Wisdom Meets <span className="text-gradient">Modern Lives</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Astro Sadhna is a sanctuary for those seeking honest, compassionate, and accurate astrological guidance. Founded on the timeless principles of Vedic Jyotish, we blend deep scriptural knowledge with practical, present-day insight.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Every consultation is private, judgement-free, and tailored to your unique birth chart — because no two souls walk the same path. Our mission is simple: bring you clarity, peace, and direction.
            </p>

            <div className="grid grid-cols-3 gap-4">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="text-center p-4 rounded-2xl bg-card border border-border/60 shadow-sm">
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{s.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
