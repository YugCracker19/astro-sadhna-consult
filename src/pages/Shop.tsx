import { Link } from "react-router-dom";
import { ShoppingBag, Sparkles, ArrowLeft, Gem, Flame, Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";

const PLACEHOLDER_CATEGORIES = [
  { icon: Gem, en: "Gemstones & Rudraksha", hi: "Ratn & Rudraksha" },
  { icon: Flame, en: "Yantras & Idols", hi: "Yantra & Murtiyaan" },
  { icon: Star, en: "Spiritual Essentials", hi: "Aadhyatmik Saamagri" },
];

const Shop = () => {
  const { lang, tr } = useLang();

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28">
        <div className="absolute inset-0 starfield opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-[var(--gradient-radial)] pointer-events-none" />

        <div className="container mx-auto relative">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> {tr("shop.back")}
          </Link>

          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3 inline-flex items-center gap-2 justify-center">
              <ShoppingBag className="w-4 h-4" /> {tr("shop.eyebrow")}
            </p>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
              {tr("shop.title.1")}{" "}
              <span className="text-gradient">{tr("shop.title.highlight")}</span>
              <br />
              <span className="text-gold">{tr("shop.title.2")}</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {tr("shop.subtitle")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLACEHOLDER_CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="card-spiritual group flex flex-col items-center text-center"
                >
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2">
                    {lang === "hi" ? c.hi : c.en}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {lang === "hi" ? "Jald hi uplabdh" : "Coming soon"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <a
              href={buildWhatsAppLink("Hello, please notify me when shop products are available")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow inline-flex items-center gap-2 text-primary-foreground text-sm md:text-base font-semibold px-7 py-3.5 rounded-full"
            >
              <Sparkles className="w-4 h-4" /> {tr("shop.notify")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Shop;
