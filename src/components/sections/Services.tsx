import { Briefcase, Heart, GraduationCap, Activity, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";

const Services = () => {
  const { tr } = useLang();
  const SERVICES = [
    {
      icon: Briefcase,
      titleKey: "service.business.title" as const,
      descKey: "service.business.desc" as const,
      msg: "Hello, I need astrological guidance for my business problems",
    },
    {
      icon: Heart,
      titleKey: "service.marriage.title" as const,
      descKey: "service.marriage.desc" as const,
      msg: "Hello, I need guidance about my marriage and relationship",
    },
    {
      icon: GraduationCap,
      titleKey: "service.career.title" as const,
      descKey: "service.career.desc" as const,
      msg: "Hello, I need career guidance from an astrologer",
    },
    {
      icon: Activity,
      titleKey: "service.health.title" as const,
      descKey: "service.health.desc" as const,
      msg: "Hello, I need help with health and life issues",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3">{tr("services.eyebrow")}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            {tr("services.title.1")} <span className="text-gradient">{tr("services.title.highlight")}</span> {tr("services.title.2")}
          </h2>
          <p className="text-muted-foreground">
            {tr("services.subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => {
            const Icon = s.icon;
            return (
              <a
                key={s.titleKey}
                href={buildWhatsAppLink(s.msg)}
                target="_blank"
                rel="noopener noreferrer"
                className="card-spiritual group flex flex-col"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center mb-5 transition-transform group-hover:scale-110 group-hover:rotate-3">
                  <div className="absolute inset-0 rounded-xl bg-primary/0 group-hover:bg-primary/10 transition-colors" />
                  <Icon className="w-7 h-7 text-primary relative" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-2 text-foreground">{tr(s.titleKey)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{tr(s.descKey)}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary opacity-80 group-hover:opacity-100 group-hover:gap-2.5 transition-all">
                  {tr("services.consult")} <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
