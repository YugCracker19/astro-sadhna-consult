import { Link } from "react-router-dom";
import { ShoppingBag, ArrowLeft, Plus, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/lib/i18n";
import { PRODUCTS, formatINR, useCart, Product } from "@/lib/cart";

const Shop = () => {
  const { lang, tr } = useLang();
  const { add, open, items } = useCart();
  const { toast } = useToast();
  const hi = lang === "hi";

  const inCart = (id: string) => items.some((i) => i.product.id === id);

  const handleAdd = (p: Product) => {
    add(p);
    toast({
      title: hi ? "Cart mein add ho gaya" : "Added to cart",
      description: hi ? p.nameHi : p.name,
    });
  };

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
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {hi
                ? "Guruji dwara chuni hui abhimantrit vastuein — ghar par paayein, WhatsApp par order karein."
                : "Hand-picked, energised products curated by Guruji — order easily over WhatsApp."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {PRODUCTS.map((p) => {
              const added = inCart(p.id);
              return (
                <div
                  key={p.id}
                  className="card-spiritual group flex flex-col"
                >
                  <div className="relative aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/15 flex items-center justify-center text-6xl mb-4 overflow-hidden">
                    <span className="transition-transform duration-500 group-hover:scale-110">
                      {p.emoji}
                    </span>
                    <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-background/80 backdrop-blur-sm text-foreground/80 px-2 py-1 rounded-full border border-border/60">
                      {p.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-tight mb-1">
                    {hi ? p.nameHi : p.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2 flex-1">
                    {hi ? p.descriptionHi : p.description}
                  </p>
                  <div className="flex items-center justify-between gap-2 mt-2">
                    <span className="font-display text-xl font-bold text-primary">
                      {formatINR(p.price)}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => (added ? open() : handleAdd(p))}
                      className="rounded-full font-semibold"
                      variant={added ? "secondary" : "default"}
                    >
                      {added ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          {hi ? "Dekhein" : "View"}
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 mr-1" />
                          {hi ? "Add" : "Add"}
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-12">
            {hi
              ? "Sabhi products abhimantrit aur authentic hain. Shipping pure Bharat mein uplabdh."
              : "All products are energised and authentic. Shipping available across India."}
          </p>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
};

export default Shop;
