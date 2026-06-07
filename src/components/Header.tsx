import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import logo from "@/assets/astro-sadhna-logo.png";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";

const Header = () => {
  const { lang, setLang, tr } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const SECTIONS = [
    { label: tr("nav.services"), id: "services" },
    { label: tr("nav.about"), id: "about" },
    { label: tr("nav.reviews"), id: "testimonials" },
    { label: tr("nav.why"), id: "why" },
  ];

  const goToSection = (id: string) => {
    setMobileOpen(false);
    if (onHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#" + id);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled || !onHome || mobileOpen
          ? "bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-primary/30 shadow-[var(--shadow-glow)]">
            <img src={logo} alt="Astro Sadhna logo" className="w-full h-full object-cover" />
          </span>
          <div className="leading-tight">
            <div className="font-display text-xl md:text-2xl font-bold text-foreground">Astro Sadhna</div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-gold font-medium">{tr("tagline")}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {SECTIONS.map((n) => (
            <button
              key={n.id}
              onClick={() => goToSection(n.id)}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
            >
              {n.label}
            </button>
          ))}
          <Link
            to="/shop"
            className={`text-sm font-semibold inline-flex items-center gap-1.5 transition-colors ${
              location.pathname === "/shop" ? "text-primary" : "text-foreground/80 hover:text-primary"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {tr("nav.shop")}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
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
            className="hidden sm:inline-flex btn-glow text-primary-foreground text-sm font-semibold px-4 md:px-6 py-2.5 rounded-full"
          >
            {tr("nav.consult")}
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 inline-flex items-center justify-center rounded-full border border-border/70 text-foreground hover:text-primary hover:border-primary/40 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="container mx-auto py-4 flex flex-col gap-1">
            {SECTIONS.map((n) => (
              <button
                key={n.id}
                onClick={() => goToSection(n.id)}
                className="text-left px-3 py-3 rounded-lg text-sm font-medium text-foreground/85 hover:text-primary hover:bg-primary/5 transition-colors"
              >
                {n.label}
              </button>
            ))}
            <Link
              to="/shop"
              className="px-3 py-3 rounded-lg text-sm font-semibold text-foreground/85 hover:text-primary hover:bg-primary/5 transition-colors inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              {tr("nav.shop")}
            </Link>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 btn-glow text-primary-foreground text-sm font-semibold px-4 py-3 rounded-full text-center"
            >
              {tr("nav.consult")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
