import { Sparkles, Users, Award } from "lucide-react";
import { useLang } from "@/lib/i18n";
import CountUp from "@/components/CountUp";

const About = () => {
  const { tr } = useLang();
  const STATS = [
    { icon: Users, end: 20, suffix: "K+", labelKey: "about.stat.seekers" as const },
    { icon: Award, end: 15, suffix: "+", labelKey: "about.stat.experience" as const },
    { icon: Sparkles, end: 98, suffix: "%", labelKey: "about.stat.accuracy" as const },
  ];


  return (
    <section id="about" className="py-20 md:py-28 relative bg-gradient-to-b from-secondary/40 via-background to-background">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary/20 via-accent/15 to-transparent p-1 relative overflow-hidden shadow-[var(--shadow-glow)]">
              <div className="w-full h-full rounded-3xl bg-card relative overflow-hidden flex items-center justify-center text-9xl">
                🧘
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-5 text-center">
                  <div className="font-display text-xl md:text-2xl font-semibold text-gradient">Guruji</div>
                  <div className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-muted-foreground mt-1">{tr("about.sacred")}</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-accent/30 blur-2xl animate-glow-pulse" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-primary/30 blur-2xl animate-glow-pulse" />
          </div>

          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3">{tr("about.eyebrow")}</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {tr("about.title.1")} <span className="animate-shimmer-text">{tr("about.title.highlight")}</span>
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {tr("about.p1")}
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {tr("about.p2")}
            </p>

            <div className="grid grid-cols-3 gap-4">
              {STATS.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.labelKey} className="text-center p-4 rounded-2xl bg-card border border-border/60 shadow-sm hover:border-primary/40 hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1">
                    <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="font-display text-2xl md:text-3xl font-bold text-gradient">
                      <CountUp end={s.end} suffix={s.suffix} />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{tr(s.labelKey)}</div>
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
