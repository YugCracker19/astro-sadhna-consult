import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";

const Header = () => {
  const { lang, setLang, tr } = useLang();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV = [
    { label: tr("nav.services"), href: "#services" },
    { label: tr("nav.about"), href: "#about" },
    { label: tr("nav.reviews"), href: "#testimonials" },
    { label: tr("nav.why"), href: "#why" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-lg border-b border-border/50 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent shadow-[var(--shadow-glow)]">
            <Sparkles className="w-5 h-5 text-white" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl md:text-2xl font-bold text-foreground">Astro Sadhna</div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-medium">{tr("tagline")}</div>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Language toggle */}
          <div className="flex items-center rounded-full border border-border/70 bg-background/60 backdrop-blur-sm p-0.5 text-xs font-semibold">
            <button
              onClick={() => setLang("en")}
              aria-label="English"
              className={`px-2.5 py-1 rounded-full transition-all ${lang === "en" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-primary"}`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("hi")}
              aria-label="Hinglish"
              className={`px-2.5 py-1 rounded-full transition-all ${lang === "hi" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-primary"}`}
            >
              HI
            </button>
          </div>

          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-glow text-primary-foreground text-sm font-semibold px-4 md:px-6 py-2.5 rounded-full"
          >
            {tr("nav.consult")}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
