import { MessageCircle, Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";

const CTA = () => {
  const { tr } = useLang();
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="container mx-auto">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center" style={{ background: "var(--gradient-primary)" }}>
          <div className="absolute inset-0 starfield opacity-30 mix-blend-overlay" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-white text-xs font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {tr("cta.badge")}
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
              {tr("cta.title")}
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto mb-8">
              {tr("cta.subtitle")}
            </p>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-primary-deep font-bold px-8 py-4 rounded-full text-base shadow-2xl hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" fill="currentColor" strokeWidth={0} />
              {tr("cta.button")}
            </a>
            <p className="text-white/70 text-xs mt-5">{tr("cta.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
