import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Why Us", href: "#why" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-medium">Spiritual Guidance</div>
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

        <a
          href={buildWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glow text-primary-foreground text-sm font-semibold px-4 md:px-6 py-2.5 rounded-full"
        >
          Consult Now
        </a>
      </div>
    </header>
  );
};

export default Header;
