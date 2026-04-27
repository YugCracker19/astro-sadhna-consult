import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, { en: string; hi: string }>;

export const t: Dict = {
  // Header
  "nav.services": { en: "Services", hi: "Sewayein" },
  "nav.about": { en: "About", hi: "Hamare Baare Mein" },
  "nav.reviews": { en: "Reviews", hi: "Reviews" },
  "nav.why": { en: "Why Us", hi: "Kyun Hum" },
  "nav.consult": { en: "Consult Now", hi: "Abhi Baat Karein" },
  "tagline": { en: "Spiritual Guidance", hi: "Aadhyatmik Margdarshan" },

  // Hero
  "hero.badge": { en: "Trusted by 50,000+ seekers worldwide", hi: "50,000+ logon ka bharosa, duniya bhar mein" },
  "hero.title.1": { en: "Find Solutions to Your", hi: "Apni" },
  "hero.title.highlight": { en: "Life Problems", hi: "Zindagi ki Problems" },
  "hero.title.2": { en: "with Astro Sadhna", hi: "ka Samadhan paayein Astro Sadhna ke saath" },
  "hero.subtitle": {
    en: "Get expert guidance for business, marriage, career, and personal life — rooted in ancient Vedic wisdom and delivered with modern clarity.",
    hi: "Business, shaadi, career, aur personal life ke liye expert guidance paayein — prachin Vedic gyaan se judi, modern soch ke saath.",
  },
  "hero.cta.primary": { en: "Consult Now on WhatsApp", hi: "Abhi WhatsApp par Baat Karein" },
  "hero.cta.secondary": { en: "Explore Services", hi: "Sewayein Dekhein" },
  "hero.trust.confidential": { en: "100% Confidential", hi: "100% Gupt" },
  "hero.trust.rating": { en: "4.9/5 Rating", hi: "4.9/5 Rating" },
  "hero.trust.online": { en: "Astrologers online", hi: "Jyotishi online hain" },

  // Services
  "services.eyebrow": { en: "Our Services", hi: "Hamari Sewayein" },
  "services.title.1": { en: "Guidance for Every", hi: "Har" },
  "services.title.highlight": { en: "Life Path", hi: "Jeevan Path" },
  "services.title.2": { en: "", hi: "ke liye Margdarshan" },
  "services.subtitle": {
    en: "Personalised consultations rooted in authentic Vedic astrology — no scripts, just truthful answers.",
    hi: "Vedic jyotish par aadharit personal consultations — koi script nahi, sirf sacche jawab.",
  },
  "services.consult": { en: "Consult now", hi: "Abhi Baat Karein" },

  "service.business.title": { en: "Business Problems", hi: "Business ki Problems" },
  "service.business.desc": {
    en: "Overcome stagnation, attract growth, and align your venture with cosmic timing for sustainable success.",
    hi: "Ruke hue kaam ko aage badhayein, growth laayein, aur apne business ko sahi samay ke saath align karein.",
  },
  "service.marriage.title": { en: "Marriage & Relationship", hi: "Shaadi & Rishtey" },
  "service.marriage.desc": {
    en: "Resolve conflicts, find compatible partners, and strengthen bonds through Kundali matching and remedies.",
    hi: "Jhagde sulgayein, sahi partner dhundein, aur Kundali milan & upayon se rishtey mazboot karein.",
  },
  "service.career.title": { en: "Career Guidance", hi: "Career Margdarshan" },
  "service.career.desc": {
    en: "Discover your true calling, navigate career shifts, and unlock professional milestones with clarity.",
    hi: "Apni asli kaabiliyat pehchanein, career change samjhein, aur professional success spasht roop se paayein.",
  },
  "service.health.title": { en: "Health & Life Issues", hi: "Sehat & Jeevan Samasyaayein" },
  "service.health.desc": {
    en: "Identify planetary influences affecting wellness and receive personalised spiritual remedies for healing.",
    hi: "Sehat par grahon ka asar samjhein aur personal aadhyatmik upay paayein swasth jeevan ke liye.",
  },

  // About
  "about.eyebrow": { en: "About Astro Sadhna", hi: "Astro Sadhna ke Baare Mein" },
  "about.title.1": { en: "Where Ancient Wisdom Meets", hi: "Jahan Prachin Gyaan Milta Hai" },
  "about.title.highlight": { en: "Modern Lives", hi: "Aaj ki Zindagi Se" },
  "about.p1": {
    en: "Astro Sadhna is a sanctuary for those seeking honest, compassionate, and accurate astrological guidance. Founded on the timeless principles of Vedic Jyotish, we blend deep scriptural knowledge with practical, present-day insight.",
    hi: "Astro Sadhna un logon ke liye ek sthan hai jo sacchi, dayalu, aur sateek jyotish guidance dhundh rahe hain. Vedic Jyotish ke prachin sidhaanton par aadharit, hum gehre shastriya gyaan ko aaj ki samajh ke saath jodte hain.",
  },
  "about.p2": {
    en: "Every consultation is private, judgement-free, and tailored to your unique birth chart — because no two souls walk the same path. Our mission is simple: bring you clarity, peace, and direction.",
    hi: "Har consultation private hota hai, bina judgement ke, aur aapki khud ki kundali ke hisaab se diya jaata hai — kyunki har aatma ka raasta alag hota hai. Hamara mission saaf hai: aapko spashtata, shanti, aur disha dena.",
  },
  "about.stat.seekers": { en: "Happy Seekers", hi: "Khush Logon ne Liya Sahara" },
  "about.stat.experience": { en: "Years Experience", hi: "Saal ka Anubhav" },
  "about.stat.accuracy": { en: "Accuracy Rate", hi: "Sateekta Dar" },
  "about.sacred": { en: "Sacred Practice", hi: "Pavitra Sadhna" },

  // Why Us
  "why.eyebrow": { en: "Why Choose Us", hi: "Hamein Kyun Chunein" },
  "why.title.1": { en: "Built on", hi: "Aadharit hai" },
  "why.title.highlight": { en: "Trust & Tradition", hi: "Bharose & Parampara par" },
  "why.quick.title": { en: "Quick Response", hi: "Turant Jawab" },
  "why.quick.desc": { en: "Connect within minutes via WhatsApp — no waiting, no delays.", hi: "WhatsApp par minutes mein judiye — koi intezaar nahi, koi der nahi." },
  "why.trusted.title": { en: "Trusted Astrologers", hi: "Vishwasniya Jyotishi" },
  "why.trusted.desc": { en: "Decades of authentic Vedic experience and verified credentials.", hi: "Dasakon ka asli Vedic anubhav aur prove ki hui qabiliyat." },
  "why.personal.title": { en: "Personalized Solutions", hi: "Personal Samadhan" },
  "why.personal.desc": { en: "Every remedy tailored to your unique birth chart and life context.", hi: "Har upay aapki kundali aur jeevan ke hisaab se banaya gaya." },
  "why.always.title": { en: "24/7 Availability", hi: "24/7 Uplabdh" },
  "why.always.desc": { en: "Day or night — guidance is just a message away, whenever you need it.", hi: "Din ho ya raat — margdarshan ek message door hai, jab bhi zarurat ho." },

  // Testimonials
  "testimonials.eyebrow": { en: "Testimonials", hi: "Logon ke Anubhav" },
  "testimonials.title.1": { en: "Stories of", hi: "Badlaav ki" },
  "testimonials.title.highlight": { en: "Transformation", hi: "Kahaniyan" },
  "testimonials.subtitle": {
    en: "Real journeys from people who found clarity, peace, and direction with Astro Sadhna.",
    hi: "Un logon ke asli safar jinhone Astro Sadhna ke saath spashtata, shanti, aur disha paayi.",
  },
  "review.priya.text": {
    en: "I was stuck in a difficult marriage situation for years. The remedies suggested by Astro Sadhna brought peace and understanding back into our home within weeks.",
    hi: "Main saalon se ek mushkil shaadi mein phasi hui thi. Astro Sadhna ke upayon se kuch hi hafton mein hamare ghar mein shanti aur samajh wapas aa gayi.",
  },
  "review.rahul.text": {
    en: "Honest, kind, and incredibly accurate. My business turned around after following the guidance — sales tripled in six months. I'm forever grateful.",
    hi: "Sacche, dayalu, aur bahut sateek. Unke margdarshan ke baad mera business hi badal gaya — 6 mahine mein sales 3 guna ho gayi. Main hamesha aabhari rahunga.",
  },
  "review.ananya.text": {
    en: "I had lost direction in my career. The reading was so detailed it felt like they knew my entire life. Today I'm in my dream role with clarity.",
    hi: "Maine apne career mein disha kho di thi. Unki reading itni detailed thi ki lagta tha unhe meri puri zindagi maaloom hai. Aaj main apne dream role mein hoon.",
  },
  "review.suresh.text": {
    en: "What I love most is the warmth — no fear-mongering, no pressure. Just genuine guidance and powerful, simple remedies that actually work.",
    hi: "Sabse acchi baat hai unka apnapan — koi dar nahi, koi pressure nahi. Bas sacha margdarshan aur asaan, asar wale upay jo sach mein kaam karte hain.",
  },
  "review.meera.text": {
    en: "Available on WhatsApp whenever I needed reassurance. The personal touch and accuracy of predictions have made me a believer for life.",
    hi: "Jab bhi mujhe sahara chahiye tha, WhatsApp par mil jaate the. Personal touch aur sateek bhavishyavaani ne mujhe hamesha ke liye believer bana diya.",
  },

  // CTA
  "cta.badge": { en: "Limited slots available today", hi: "Aaj kuch hi slots khali hain" },
  "cta.title": { en: "Don't Let Confusion Steal Another Day", hi: "Confusion ko apna ek aur din mat lene dijiye" },
  "cta.subtitle": {
    en: "Your answer is one message away. Connect with our trusted astrologers right now and step into clarity.",
    hi: "Aapka jawab ek message door hai. Abhi hamare vishwasniya jyotishiyon se judiye aur spashtata mein kadam rakhiye.",
  },
  "cta.button": { en: "Consult Now on WhatsApp", hi: "Abhi WhatsApp par Baat Karein" },
  "cta.note": { en: "Confidential · 24/7 · Trusted by thousands", hi: "Gupt · 24/7 · Hazaaron ka bharosa" },

  // Footer
  "footer.about": {
    en: "A trusted sanctuary for honest, compassionate Vedic astrology — bringing clarity to business, marriage, career, and life decisions.",
    hi: "Sacchi, dayalu Vedic jyotish ka vishwasniya sthan — business, shaadi, career, aur jeevan ke faislon mein spashtata laata hai.",
  },
  "footer.quicklinks": { en: "Quick Links", hi: "Quick Links" },
  "footer.contact": { en: "Contact", hi: "Sampark" },
  "footer.location": { en: "Available worldwide via WhatsApp", hi: "WhatsApp par duniya bhar mein uplabdh" },
  "footer.rights": { en: "All rights reserved.", hi: "Sab adhikar surakshit." },
  "footer.crafted": { en: "Crafted with devotion · ॐ शान्ति", hi: "Shradha se banaya gaya · ॐ शान्ति" },

  // Float
  "float.label": { en: "Chat with us on WhatsApp", hi: "WhatsApp par hum se baat karein" },
  "float.tooltip": { en: "Chat with us", hi: "Hum se baat karein" },
};

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: (key: keyof typeof t) => string;
};

const LangContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return (localStorage.getItem("astro-lang") as Lang) || "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang === "hi" ? "hi" : "en";
    localStorage.setItem("astro-lang", lang);
  }, [lang]);

  const tr = (key: keyof typeof t) => {
    const entry = t[key];
    if (!entry) return String(key);
    return entry[lang] || entry.en;
  };

  return (
    <LangContext.Provider value={{ lang, setLang: setLangState, tr }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
};
