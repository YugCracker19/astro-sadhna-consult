import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";
import { buildWhatsAppLink, WHATSAPP_DISPLAY } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";

const Footer = () => {
  const { tr } = useLang();
  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-20 pointer-events-none" />
      <div className="container mx-auto py-14 md:py-16 relative">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent">
                <Sparkles className="w-5 h-5 text-white" />
              </span>
              <div>
                <div className="font-display text-2xl font-bold">Astro Sadhna</div>
                <div className="text-xs uppercase tracking-[0.2em] text-accent">{tr("tagline")}</div>
              </div>
            </div>
            <p className="text-background/70 max-w-md text-sm leading-relaxed mb-6">
              {tr("footer.about")}
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" aria-label="social" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-[#25D366] hover:border-[#25D366] transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-accent">{tr("footer.quicklinks")}</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#services" className="hover:text-primary transition-colors">{tr("nav.services")}</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">{tr("nav.about")}</a></li>
              <li><a href="#testimonials" className="hover:text-primary transition-colors">{tr("nav.reviews")}</a></li>
              <li><a href="#why" className="hover:text-primary transition-colors">{tr("nav.why")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold mb-4 text-accent">{tr("footer.contact")}</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{WHATSAPP_DISPLAY}</a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <a href="mailto:hello@astrosadhna.com" className="hover:text-primary transition-colors">hello@astrosadhna.com</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                <span>{tr("footer.location")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-background/50">
          <p>© {new Date().getFullYear()} Astro Sadhna. {tr("footer.rights")}</p>
          <p>{tr("footer.crafted")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
