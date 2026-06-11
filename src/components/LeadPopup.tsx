import { useEffect, useState } from "react";
import { X, Sparkles, MessageCircle } from "lucide-react";
import { z } from "zod";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { useLang } from "@/lib/i18n";
import { useProfile } from "@/lib/profile";
import { toast } from "@/hooks/use-toast";

const SESSION_KEY = "astro-lead-popup-shown";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(60, "Name too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(20, "Phone too long")
    .regex(/^[+\d\s\-()]+$/, "Only digits and + - ( ) allowed"),
});

const LeadPopup = () => {
  const { lang, tr } = useLang();
  const { profile, saveProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Returning user — skip popup, greet once per session
    if (profile) {
      if (!sessionStorage.getItem("astro-welcome-back-shown")) {
        sessionStorage.setItem("astro-welcome-back-shown", "1");
        toast({
          title: lang === "hi" ? `Wapas swagat hai, ${profile.name}!` : `Welcome back, ${profile.name}!`,
          description:
            lang === "hi"
              ? "Aapka profile yaad rakha gaya hai."
              : "Your profile is remembered on this device.",
        });
      }
      return;
    }
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const id = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(id);
  }, [profile, lang]);

  const close = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ name, phone });
    if (!result.success) {
      setError(result.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    // Persist profile so the user is recognized on return visits
    saveProfile({ name: result.data.name, phone: result.data.phone });
    const msg =
      lang === "hi"
        ? `Namaste Guruji, mera naam ${result.data.name} hai. Mera phone number: ${result.data.phone}. Mujhe astrology guidance chahiye.`
        : `Namaste Guruji, my name is ${result.data.name}. My phone number: ${result.data.phone}. I would like astrology guidance.`;
    const link = buildWhatsAppLink(msg);
    close();
    // Use location.href — popup blockers often block window.open() from form submit,
    // especially on mobile. This guarantees navigation to WhatsApp.
    window.location.href = link;
  };

  if (!open) return null;

  const labels = {
    badge: lang === "hi" ? "Free Pehli Salah" : "Free First Guidance",
    title: lang === "hi" ? "Apni Zindagi ki Disha Paayein" : "Get Direction for Your Life",
    subtitle:
      lang === "hi"
        ? "Apna naam aur phone number bhejein — Guruji aapse WhatsApp par sampark karenge."
        : "Share your name and phone — Guruji will reach out to you on WhatsApp.",
    name: lang === "hi" ? "Aapka Naam" : "Your Name",
    namePh: lang === "hi" ? "Jaise: Rahul Sharma" : "e.g. Rahul Sharma",
    phone: lang === "hi" ? "WhatsApp Number" : "WhatsApp Number",
    phonePh: "+91 98xxxxxxxx",
    submit: lang === "hi" ? "WhatsApp par Bhejein" : "Send on WhatsApp",
    skip: lang === "hi" ? "Abhi nahi" : "Maybe later",
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-popup-title"
    >
      <button
        aria-label="Close"
        onClick={close}
        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md animate-scale-in">
        <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-card shadow-[var(--shadow-soft)]">
          {/* Decorative top band */}
          <div
            className="relative h-28 flex items-center justify-center overflow-hidden"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="absolute inset-0 starfield opacity-40 mix-blend-overlay" />
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-48 h-48 bg-accent/30 rounded-full blur-3xl" />
            <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              {labels.badge}
            </div>
            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 md:p-8">
            <h3
              id="lead-popup-title"
              className="font-display text-2xl md:text-3xl font-bold text-foreground leading-tight"
            >
              {labels.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">{labels.subtitle}</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                  {labels.name}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(null);
                  }}
                  placeholder={labels.namePh}
                  maxLength={60}
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/70 mb-1.5">
                  {labels.phone}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError(null);
                  }}
                  placeholder={labels.phonePh}
                  maxLength={20}
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>

              {error && (
                <p className="text-xs font-medium text-destructive">{error}</p>
              )}

              <button
                type="submit"
                className="btn-glow w-full text-primary-foreground font-semibold px-6 py-3.5 rounded-full inline-flex items-center justify-center gap-2 text-base"
              >
                <MessageCircle className="w-5 h-5" fill="currentColor" strokeWidth={0} />
                {labels.submit}
              </button>

              <button
                type="button"
                onClick={close}
                className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                {labels.skip}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadPopup;
