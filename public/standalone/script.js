/* ============ Astro Sadhna — vanilla JS app ============ */

// ---------- WhatsApp ----------
const WHATSAPP_NUMBER = "917247836664";
const WHATSAPP_DISPLAY = "+91 72478 36664";
const DEFAULT_MSG = "Hello, I need guidance regarding my problem";
const waLink = (msg = DEFAULT_MSG) =>
  `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(msg)}`;

// ---------- i18n ----------
const DICT = {
  "nav.services": { en: "Services", hi: "Sewayein" },
  "nav.about": { en: "About", hi: "Hamare Baare Mein" },
  "nav.reviews": { en: "Reviews", hi: "Reviews" },
  "nav.why": { en: "Why Us", hi: "Kyun Hum" },
  "nav.shop": { en: "Shop", hi: "Dukaan" },
  "nav.consult": { en: "Consult Now", hi: "Abhi Baat Karein" },
  "shop.eyebrow": { en: "Our Shop", hi: "Hamari Dukaan" },
  "shop.title.1": { en: "Sacred", hi: "Pavitra" },
  "shop.title.highlight": { en: "Products", hi: "Vastuein" },
  "shop.back": { en: "Back to Home", hi: "Mukhya Page par Jaayein" },
  "tagline": { en: "Spiritual Guidance", hi: "Aadhyatmik Margdarshan" },
  "hero.badge": { en: "Trusted by 1000+ seekers worldwide", hi: "1000+ logon ka bharosa, duniya bhar mein" },
  "hero.title.1": { en: "Find Solutions to Your", hi: "Apni" },
  "hero.title.highlight": { en: "Life Problems", hi: "Zindagi ki Problems" },
  "hero.title.2": { en: "with Astro Sadhna", hi: "ka Samadhan paayein Astro Sadhna ke saath" },
  "hero.subtitle": { en: "Get expert guidance for business, marriage, career, and personal life — rooted in ancient Vedic wisdom and delivered with modern clarity.", hi: "Business, shaadi, career, aur personal life ke liye expert guidance paayein — prachin Vedic gyaan se judi, modern soch ke saath." },
  "hero.cta.primary": { en: "Consult Now on WhatsApp", hi: "Abhi WhatsApp par Baat Karein" },
  "hero.cta.secondary": { en: "Explore Services", hi: "Sewayein Dekhein" },
  "hero.trust.confidential": { en: "100% Confidential", hi: "100% Gupt" },
  "hero.trust.rating": { en: "4.6/5 Rating", hi: "4.6/5 Rating" },
  "hero.trust.online": { en: "Astrologers online", hi: "Jyotishi online hain" },
  "services.eyebrow": { en: "Our Services", hi: "Hamari Sewayein" },
  "services.title.1": { en: "Guidance for Every", hi: "Har" },
  "services.title.highlight": { en: "Life Path", hi: "Jeevan Path" },
  "services.title.2": { en: "", hi: "ke liye Margdarshan" },
  "services.subtitle": { en: "Personalised consultations rooted in authentic Vedic astrology — no scripts, just truthful answers.", hi: "Vedic jyotish par aadharit personal consultations — koi script nahi, sirf sacche jawab." },
  "services.consult": { en: "Consult now", hi: "Abhi Baat Karein" },
  "service.business.title": { en: "Business Problems", hi: "Business ki Problems" },
  "service.business.desc": { en: "Overcome stagnation, attract growth, and align your venture with cosmic timing for sustainable success.", hi: "Ruke hue kaam ko aage badhayein, growth laayein, aur apne business ko sahi samay ke saath align karein." },
  "service.marriage.title": { en: "Marriage & Relationship", hi: "Shaadi & Rishtey" },
  "service.marriage.desc": { en: "Resolve conflicts, find compatible partners, and strengthen bonds through Kundali matching and remedies.", hi: "Jhagde sulgayein, sahi partner dhundein, aur Kundali milan & upayon se rishtey mazboot karein." },
  "service.career.title": { en: "Career Guidance", hi: "Career Margdarshan" },
  "service.career.desc": { en: "Discover your true calling, navigate career shifts, and unlock professional milestones with clarity.", hi: "Apni asli kaabiliyat pehchanein, career change samjhein, aur professional success spasht roop se paayein." },
  "service.health.title": { en: "Health & Life Issues", hi: "Sehat & Jeevan Samasyaayein" },
  "service.health.desc": { en: "Identify planetary influences affecting wellness and receive personalised spiritual remedies for healing.", hi: "Sehat par grahon ka asar samjhein aur personal aadhyatmik upay paayein swasth jeevan ke liye." },
  "about.eyebrow": { en: "About Astro Sadhna", hi: "Astro Sadhna ke Baare Mein" },
  "about.title.1": { en: "Where Ancient Wisdom Meets", hi: "Jahan Prachin Gyaan Milta Hai" },
  "about.title.highlight": { en: "Modern Lives", hi: "Aaj ki Zindagi Se" },
  "about.p1": { en: "Astro Sadhna is a sanctuary for those seeking honest, compassionate, and accurate astrological guidance. Founded on the timeless principles of Vedic Jyotish, we blend deep scriptural knowledge with practical, present-day insight.", hi: "Astro Sadhna un logon ke liye ek sthan hai jo sacchi, dayalu, aur sateek jyotish guidance dhundh rahe hain." },
  "about.p2": { en: "Every consultation is private, judgement-free, and tailored to your unique birth chart — because no two souls walk the same path. Our mission is simple: bring you clarity, peace, and direction.", hi: "Har consultation private hota hai, bina judgement ke, aur aapki khud ki kundali ke hisaab se diya jaata hai." },
  "about.stat.seekers": { en: "Happy Seekers", hi: "Khush Logon ne Liya Sahara" },
  "about.stat.experience": { en: "Years Experience", hi: "Saal ka Anubhav" },
  "about.stat.accuracy": { en: "Accuracy Rate", hi: "Sateekta Dar" },
  "about.sacred": { en: "Sacred Practice", hi: "Pavitra Sadhna" },
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
  "testimonials.eyebrow": { en: "Testimonials", hi: "Logon ke Anubhav" },
  "testimonials.title.1": { en: "Stories of", hi: "Badlaav ki" },
  "testimonials.title.highlight": { en: "Transformation", hi: "Kahaniyan" },
  "testimonials.subtitle": { en: "Real journeys from people who found clarity, peace, and direction with Astro Sadhna.", hi: "Un logon ke asli safar jinhone Astro Sadhna ke saath spashtata, shanti, aur disha paayi." },
  "review.priya.text": { en: "I was stuck in a difficult marriage situation for years. The remedies suggested by Astro Sadhna brought peace and understanding back into our home within weeks.", hi: "Main saalon se ek mushkil shaadi mein phasi hui thi. Astro Sadhna ke upayon se kuch hi hafton mein shanti aa gayi." },
  "review.rahul.text": { en: "Honest, kind, and incredibly accurate. My business turned around after following the guidance — sales tripled in six months.", hi: "Sacche, dayalu, aur bahut sateek. Mera business hi badal gaya — 6 mahine mein sales 3 guna ho gayi." },
  "review.ananya.text": { en: "I had lost direction in my career. The reading was so detailed it felt like they knew my entire life. Today I'm in my dream role with clarity.", hi: "Maine apne career mein disha kho di thi. Aaj main apne dream role mein hoon." },
  "review.suresh.text": { en: "What I love most is the warmth — no fear-mongering, no pressure. Just genuine guidance and powerful, simple remedies that actually work.", hi: "Sabse acchi baat hai unka apnapan — koi dar nahi, sirf sacha margdarshan." },
  "review.meera.text": { en: "Available on WhatsApp whenever I needed reassurance. The personal touch and accuracy of predictions have made me a believer for life.", hi: "Jab bhi mujhe sahara chahiye tha, WhatsApp par mil jaate the." },
  "cta.badge": { en: "Limited slots available today", hi: "Aaj kuch hi slots khali hain" },
  "cta.title": { en: "Don't Let Confusion Steal Another Day", hi: "Confusion ko apna ek aur din mat lene dijiye" },
  "cta.subtitle": { en: "Your answer is one message away. Connect with our trusted astrologers right now and step into clarity.", hi: "Aapka jawab ek message door hai. Abhi judiye." },
  "cta.button": { en: "Consult Now on WhatsApp", hi: "Abhi WhatsApp par Baat Karein" },
  "cta.note": { en: "Confidential · 24/7 · Trusted by thousands", hi: "Gupt · 24/7 · Hazaaron ka bharosa" },
  "footer.about": { en: "A trusted sanctuary for honest, compassionate Vedic astrology — bringing clarity to business, marriage, career, and life decisions.", hi: "Sacchi, dayalu Vedic jyotish ka vishwasniya sthan." },
  "footer.quicklinks": { en: "Quick Links", hi: "Quick Links" },
  "footer.contact": { en: "Contact", hi: "Sampark" },
  "footer.location": { en: "Available worldwide via WhatsApp", hi: "WhatsApp par duniya bhar mein uplabdh" },
  "footer.rights": { en: "All rights reserved.", hi: "Sab adhikar surakshit." },
  "footer.crafted": { en: "Crafted with devotion · ॐ शान्ति", hi: "Shradha se banaya gaya · ॐ शान्ति" },
};

let LANG = localStorage.getItem("astro-lang") || "en";
const tr = (k) => (DICT[k] && DICT[k][LANG]) || (DICT[k] && DICT[k].en) || k;

// ---------- Data ----------
const SERVICES = [
  { icon: "briefcase", titleKey: "service.business.title", descKey: "service.business.desc", msg: "Hello, I need astrological guidance for my business problems" },
  { icon: "heart", titleKey: "service.marriage.title", descKey: "service.marriage.desc", msg: "Hello, I need guidance about my marriage and relationship" },
  { icon: "graduation-cap", titleKey: "service.career.title", descKey: "service.career.desc", msg: "Hello, I need career guidance from an astrologer" },
  { icon: "activity", titleKey: "service.health.title", descKey: "service.health.desc", msg: "Hello, I need help with health and life issues" },
];
const STATS = [
  { icon: "users", end: "20K+", labelKey: "about.stat.seekers" },
  { icon: "award", end: "15+", labelKey: "about.stat.experience" },
  { icon: "sparkles", end: "98%", labelKey: "about.stat.accuracy" },
];
const REVIEWS = [
  { name: "Priya Sharma", role: "Mumbai", textKey: "review.priya.text" },
  { name: "Rahul Verma", role: "Delhi", textKey: "review.rahul.text" },
  { name: "Ananya Iyer", role: "Bangalore", textKey: "review.ananya.text" },
  { name: "Suresh Patel", role: "Ahmedabad", textKey: "review.suresh.text" },
  { name: "Meera Nair", role: "Kochi", textKey: "review.meera.text" },
];
const WHY = [
  { icon: "zap", titleKey: "why.quick.title", descKey: "why.quick.desc" },
  { icon: "shield-check", titleKey: "why.trusted.title", descKey: "why.trusted.desc" },
  { icon: "user-check", titleKey: "why.personal.title", descKey: "why.personal.desc" },
  { icon: "clock", titleKey: "why.always.title", descKey: "why.always.desc" },
];
const PRODUCTS = [
  { id: "rudraksha-5mukhi", name: "5 Mukhi Rudraksha Mala", nameHi: "5 Mukhi Rudraksha Mala", price: 1499, category: "Rudraksha", emoji: "📿", description: "Energised 108-bead mala for peace, focus and protection.", descriptionHi: "Shanti aur raksha ke liye 108 dane wali mala." },
  { id: "yellow-sapphire", name: "Yellow Sapphire (Pukhraj)", nameHi: "Pukhraj Ratn", price: 5999, category: "Gemstones", emoji: "💛", description: "Certified natural Pukhraj for wisdom, wealth and Guru blessings.", descriptionHi: "Buddhi aur dhan ke liye prakritik Pukhraj." },
  { id: "red-coral", name: "Red Coral (Moonga)", nameHi: "Moonga Ratn", price: 3499, category: "Gemstones", emoji: "❤️", description: "Natural moonga to strengthen Mangal and bring courage.", descriptionHi: "Mangal mazboot karne ke liye moonga." },
  { id: "shree-yantra", name: "Shree Yantra (Brass)", nameHi: "Shree Yantra (Pital)", price: 999, category: "Yantras", emoji: "🔱", description: "Energised brass Shree Yantra for prosperity and abundance.", descriptionHi: "Samriddhi ke liye pital ka Shree Yantra." },
  { id: "mahalakshmi-yantra", name: "Mahalakshmi Yantra", nameHi: "Mahalakshmi Yantra", price: 799, category: "Yantras", emoji: "🪔", description: "For wealth flow, business growth and household prosperity.", descriptionHi: "Dhan aur samriddhi ke liye." },
  { id: "puja-kit", name: "Daily Puja Kit", nameHi: "Daily Puja Kit", price: 599, category: "Essentials", emoji: "🕉️", description: "Complete kit with kapoor, agarbatti, roli, chawal and diya.", descriptionHi: "Kapoor, agarbatti, roli, chawal aur diya." },
  { id: "kaal-sarp", name: "Kaal Sarp Dosh Nivaran", nameHi: "Kaal Sarp Dosh Nivaran", price: 2100, category: "Remedies", emoji: "🐍", description: "Special puja samagri & yantra to reduce Kaal Sarp dosh effects.", descriptionHi: "Kaal Sarp dosh ka asar kam karne ke liye." },
  { id: "navagraha-yantra", name: "Navagraha Yantra", nameHi: "Navagraha Yantra", price: 1299, category: "Yantras", emoji: "🌌", description: "Balance all nine planets in your life for overall harmony.", descriptionHi: "Navo grahon ko santulit karein." },
];
const formatINR = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

// ---------- State (theme, cart, profile) ----------
let THEME = localStorage.getItem("astro-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
let CART = JSON.parse(localStorage.getItem("astro-cart-v1") || "[]");
let PROFILE = JSON.parse(localStorage.getItem("astro-profile") || "null");

const saveCart = () => localStorage.setItem("astro-cart-v1", JSON.stringify(CART));
const saveProfile = (p) => { PROFILE = p; localStorage.setItem("astro-profile", JSON.stringify(p)); renderProfileChip(); };
const clearProfile = () => { PROFILE = null; localStorage.removeItem("astro-profile"); renderProfileChip(); };

// ---------- Helpers ----------
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const icons = () => window.lucide && window.lucide.createIcons();
const escapeHtml = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Apply translations to DOM
function applyI18n(root = document) {
  $$("[data-i18n]", root).forEach((el) => { el.textContent = tr(el.dataset.i18n); });
  $$("[data-wa]").forEach((a) => { a.href = waLink(); });
  // header consult btn
  const c = $("#header-consult"); if (c) { c.textContent = tr("nav.consult"); c.href = waLink(); }
}

// Theme
function applyTheme() {
  document.documentElement.classList.toggle("dark", THEME === "dark");
  $(".icon-sun")?.classList.toggle("hidden", THEME === "dark");
  $(".icon-moon")?.classList.toggle("hidden", THEME !== "dark");
  $("#galaxy")?.classList.toggle("hidden", THEME !== "dark");
}
function buildGalaxy() {
  const g = $("#galaxy");
  if (!g || g.children.length) return;
  let html = "";
  for (let i = 0; i < 80; i++) {
    const size = (Math.random() * 2 + 1).toFixed(1);
    html += `<span class="gx-star" style="left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-delay:${Math.random() * 4}s;opacity:${0.3 + Math.random() * 0.7}"></span>`;
  }
  g.innerHTML = html;
}

// Lang buttons
function updateLangBtns() {
  $$(".lang-btn").forEach((b) => {
    const active = b.dataset.lang === LANG;
    b.className = "lang-btn px-2.5 py-1 rounded-full transition-all " + (active ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground/70 hover:text-primary");
  });
}

// Header nav
function buildNav() {
  const items = [
    { label: tr("nav.services"), id: "services" },
    { label: tr("nav.about"), id: "about" },
    { label: tr("nav.reviews"), id: "testimonials" },
    { label: tr("nav.why"), id: "why" },
  ];
  const navD = $("#nav-desktop");
  const navM = $("#nav-mobile");
  navD.innerHTML = items.map(n => `<a href="#/#${n.id}" class="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">${n.label}</a>`).join("") +
    `<a href="#/shop" class="text-sm font-semibold inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"><i data-lucide="shopping-bag" class="w-4 h-4"></i>${tr("nav.shop")}</a>`;
  navM.innerHTML = items.map(n => `<a href="#/#${n.id}" class="px-3 py-3 rounded-lg text-sm font-medium hover:text-primary hover:bg-primary/5">${n.label}</a>`).join("") +
    `<a href="#/shop" class="px-3 py-3 rounded-lg text-sm font-semibold inline-flex items-center gap-2 hover:text-primary"><i data-lucide="shopping-bag" class="w-4 h-4"></i>${tr("nav.shop")}</a>` +
    `<a href="${waLink()}" target="_blank" class="mt-2 btn-glow text-primary-foreground text-sm font-semibold px-4 py-3 rounded-full text-center">${tr("nav.consult")}</a>`;
}

// Profile chip
function renderProfileChip() {
  const chip = $("#profile-chip");
  if (!chip) return;
  if (PROFILE) {
    chip.classList.remove("hidden");
    chip.classList.add("md:inline-flex");
    $("#profile-name").textContent = PROFILE.name.split(" ")[0];
  } else {
    chip.classList.add("hidden");
    chip.classList.remove("md:inline-flex");
  }
}

// Cart
function cartCount() { return CART.reduce((s, i) => s + i.qty, 0); }
function cartTotal() { return CART.reduce((s, i) => s + i.qty * i.product.price, 0); }
function updateCartBadge() {
  const c = cartCount();
  const b = $("#cart-count");
  if (c > 0) { b.textContent = c; b.classList.remove("hidden"); b.classList.add("inline-flex"); }
  else { b.classList.add("hidden"); b.classList.remove("inline-flex"); }
}
function addToCart(p) {
  const ex = CART.find(i => i.product.id === p.id);
  if (ex) ex.qty++; else CART.push({ product: p, qty: 1 });
  saveCart(); updateCartBadge(); if (currentRoute() === "shop") renderShop();
  showToast(LANG === "hi" ? "Cart mein add ho gaya" : "Added to cart", LANG === "hi" ? p.nameHi : p.name);
}
function removeFromCart(id) { CART = CART.filter(i => i.product.id !== id); saveCart(); updateCartBadge(); renderCart(); if (currentRoute() === "shop") renderShop(); }
function setQty(id, q) {
  if (q <= 0) return removeFromCart(id);
  const it = CART.find(i => i.product.id === id); if (it) it.qty = q;
  saveCart(); updateCartBadge(); renderCart();
}
function clearCart() { CART = []; saveCart(); updateCartBadge(); renderCart(); }

let cartStage = "cart";
let coForm = { name: "", phone: "", address: "", notes: "" };

function openCart() { cartStage = "cart"; $("#cart-drawer").classList.remove("hidden"); $("#cart-drawer").classList.add("flex"); renderCart(); }
function closeCart() { $("#cart-drawer").classList.add("hidden"); $("#cart-drawer").classList.remove("flex"); }

function renderCart() {
  const hi = LANG === "hi";
  $("#cart-title").textContent = cartStage === "cart" ? (hi ? "Aapki Cart" : "Your Cart") : (hi ? "Checkout" : "Checkout");
  $("#cart-title-count").textContent = (cartStage === "cart" && cartCount() > 0) ? `(${cartCount()})` : "";
  const body = $("#cart-body");
  const foot = $("#cart-foot");

  if (CART.length === 0) {
    body.innerHTML = `<div class="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
      <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4"><i data-lucide="shopping-bag" class="w-10 h-10 text-primary"></i></div>
      <p class="font-display text-xl font-semibold mb-1">${hi ? "Cart khali hai" : "Your cart is empty"}</p>
      <p class="text-sm text-muted-foreground mb-6">${hi ? "Pavitra vastuein add karein." : "Add some sacred products to begin."}</p>
      <button onclick="closeCart()" class="px-4 py-2 rounded-full border border-border text-sm font-semibold">${hi ? "Shopping jaari rakhein" : "Continue shopping"}</button>
    </div>`;
    foot.innerHTML = "";
  } else if (cartStage === "cart") {
    body.innerHTML = `<div class="px-6 py-4 space-y-4">${CART.map(i => `
      <div class="flex gap-3 p-3 rounded-xl border border-border/60 bg-card">
        <div class="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center text-2xl shrink-0">${i.product.emoji}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-2">
            <p class="font-semibold text-sm leading-snug">${escapeHtml(hi ? i.product.nameHi : i.product.name)}</p>
            <button onclick="removeFromCart('${i.product.id}')" class="text-muted-foreground hover:text-destructive"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
          </div>
          <p class="text-xs text-muted-foreground mb-2">${formatINR(i.product.price)}</p>
          <div class="flex items-center justify-between">
            <div class="inline-flex items-center border border-border rounded-full">
              <button onclick="setQty('${i.product.id}',${i.qty - 1})" class="w-7 h-7 inline-flex items-center justify-center hover:text-primary"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
              <span class="w-7 text-center text-sm font-medium">${i.qty}</span>
              <button onclick="setQty('${i.product.id}',${i.qty + 1})" class="w-7 h-7 inline-flex items-center justify-center hover:text-primary"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
            </div>
            <p class="text-sm font-semibold">${formatINR(i.product.price * i.qty)}</p>
          </div>
        </div>
      </div>`).join("")}</div>`;
    foot.innerHTML = `<div class="px-6 py-4 space-y-3">
      <div class="flex items-center justify-between"><span class="text-sm text-muted-foreground">Total</span><span class="font-display text-2xl font-bold text-primary">${formatINR(cartTotal())}</span></div>
      <button onclick="goCheckout()" class="w-full btn-glow text-primary-foreground font-semibold h-12 rounded-full">${hi ? "Checkout karein" : "Proceed to Checkout"}</button>
      <button onclick="clearCart()" class="w-full text-xs text-muted-foreground hover:text-destructive">${hi ? "Cart khali karein" : "Clear cart"}</button>
    </div>`;
  } else {
    body.innerHTML = `<div class="px-6 py-4 space-y-4">
      <button onclick="cartStage='cart';renderCart()" class="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"><i data-lucide="x" class="w-3 h-3"></i> ${hi ? "Wapas cart" : "Back to cart"}</button>
      ${["name", "phone", "address", "notes"].map(f => {
        const lbl = { name: hi ? "Aapka naam" : "Your name", phone: hi ? "Phone number" : "Phone number", address: hi ? "Shipping address" : "Shipping address", notes: hi ? "Notes (optional)" : "Notes (optional)" }[f];
        const ph = { name: hi ? "Pura naam" : "Full name", phone: "+91 9XXXXXXXXX", address: "House, Street, City, Pincode", notes: hi ? "Koi vishesh request..." : "Any special request..." }[f];
        const big = f === "address" || f === "notes";
        return `<div><label class="text-sm font-medium">${lbl}</label>${big
          ? `<textarea id="co-${f}" rows="${f === 'address' ? 3 : 2}" placeholder="${ph}" class="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary">${escapeHtml(coForm[f])}</textarea>`
          : `<input id="co-${f}" type="${f === 'phone' ? 'tel' : 'text'}" placeholder="${ph}" value="${escapeHtml(coForm[f])}" class="mt-1.5 w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary" />`}</div>`;
      }).join("")}
      <div class="rounded-xl border border-border/60 bg-card p-4 space-y-1.5">
        <p class="text-xs uppercase tracking-wider text-muted-foreground mb-2">${hi ? "Order summary" : "Order summary"}</p>
        ${CART.map(i => `<div class="flex justify-between text-sm"><span class="truncate pr-2">${escapeHtml(hi ? i.product.nameHi : i.product.name)} × ${i.qty}</span><span class="font-medium">${formatINR(i.product.price * i.qty)}</span></div>`).join("")}
        <div class="flex justify-between pt-2 mt-2 border-t border-border/60 font-semibold"><span>Total</span><span class="text-primary">${formatINR(cartTotal())}</span></div>
      </div>
    </div>`;
    foot.innerHTML = `<div class="px-6 py-4">
      <button onclick="placeOrder()" class="w-full btn-glow text-primary-foreground font-semibold h-12 rounded-full inline-flex items-center justify-center gap-2"><i data-lucide="message-circle" class="w-4 h-4"></i> ${hi ? "Order WhatsApp par bhejein" : "Place Order on WhatsApp"}</button>
      <p class="text-[11px] text-muted-foreground text-center mt-2">${hi ? "Order details WhatsApp par bhej diye jaayenge." : "Order details will open in WhatsApp."}</p>
    </div>`;
    // bind form
    ["name", "phone", "address", "notes"].forEach(f => {
      const el = $("#co-" + f); if (el) el.addEventListener("input", e => coForm[f] = e.target.value);
    });
  }
  icons();
}
window.removeFromCart = removeFromCart;
window.setQty = setQty;
window.clearCart = clearCart;
window.closeCart = closeCart;
window.goCheckout = () => { cartStage = "checkout"; renderCart(); };
window.placeOrder = () => {
  const hi = LANG === "hi";
  if (!coForm.name || coForm.name.trim().length < 2) return showToast(hi ? "Galti hui" : "Invalid", "Name too short");
  if (!/^[0-9+\-\s]{7,15}$/.test(coForm.phone)) return showToast(hi ? "Galti hui" : "Invalid", "Enter a valid phone");
  if (!coForm.address || coForm.address.trim().length < 10) return showToast(hi ? "Galti hui" : "Invalid", "Address too short");
  const lines = [
    "*🛕 New Order — Astro Sadhna*", "",
    `*Name:* ${coForm.name}`, `*Phone:* ${coForm.phone}`, `*Address:* ${coForm.address}`,
    coForm.notes ? `*Notes:* ${coForm.notes}` : null, "", "*Order:*",
    ...CART.map((i, idx) => `${idx + 1}. ${i.product.name} × ${i.qty} — ${formatINR(i.product.price * i.qty)}`),
    "", `*Total: ${formatINR(cartTotal())}*`, "", "Please confirm. 🙏",
  ].filter(Boolean).join("\n");
  showToast(hi ? "WhatsApp par bhej rahe hain" : "Sending on WhatsApp", hi ? "Confirm karein." : "Tap send.");
  clearCart(); closeCart(); cartStage = "cart"; coForm = { name: "", phone: "", address: "", notes: "" };
  window.location.href = waLink(lines).replace(DEFAULT_MSG, "").replace("&text=", "&text=" + encodeURIComponent(lines));
  // simpler: directly
  window.location.href = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(lines)}`;
};

// ---------- Routing ----------
function currentRoute() {
  const h = location.hash || "#/";
  if (h.startsWith("#/shop")) return "shop";
  return "home";
}

function renderHome() {
  const app = $("#app");
  app.innerHTML = "";
  app.appendChild($("#tpl-home").content.cloneNode(true));

  // Services
  $("#services-grid").innerHTML = SERVICES.map(s => `
    <a href="${waLink(s.msg)}" target="_blank" rel="noopener noreferrer" class="card-spiritual group flex flex-col">
      <div class="relative w-14 h-14 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110">
        <i data-lucide="${s.icon}" class="w-7 h-7 text-primary"></i>
      </div>
      <h3 class="font-display text-2xl font-semibold mb-2">${tr(s.titleKey)}</h3>
      <p class="text-sm text-muted-foreground leading-relaxed flex-1">${tr(s.descKey)}</p>
      <div class="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">${tr("services.consult")} <i data-lucide="arrow-right" class="w-4 h-4"></i></div>
    </a>`).join("");

  // Stats
  $("#stats-grid").innerHTML = STATS.map(s => `
    <div class="text-center p-4 rounded-2xl bg-card border border-border/60 shadow-sm hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
      <i data-lucide="${s.icon}" class="w-5 h-5 text-primary mx-auto mb-2"></i>
      <div class="font-display text-2xl md:text-3xl font-bold text-gradient">${s.end}</div>
      <div class="text-xs text-muted-foreground mt-1">${tr(s.labelKey)}</div>
    </div>`).join("");

  // Reviews
  const reviewCard = (r) => `
    <div class="card-spiritual relative">
      <i data-lucide="quote" class="absolute top-5 right-5 w-8 h-8 text-primary/15"></i>
      <div class="flex gap-0.5 mb-4">${"★".repeat(5).split("").map(() => `<i data-lucide="star" class="w-4 h-4 fill-accent text-accent"></i>`).join("")}</div>
      <p class="text-foreground/85 leading-relaxed mb-6 text-sm md:text-base">"${tr(r.textKey)}"</p>
      <div class="flex items-center gap-3 pt-4 border-t border-border/60">
        <div class="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">${r.name.charAt(0)}</div>
        <div><div class="font-semibold text-sm">${r.name}</div><div class="text-xs text-muted-foreground">${r.role}</div></div>
      </div>
    </div>`;
  $("#reviews-grid-1").innerHTML = REVIEWS.slice(0, 3).map(reviewCard).join("");
  $("#reviews-grid-2").innerHTML = REVIEWS.slice(3).map(reviewCard).join("");
  $("#marquee").innerHTML = [...REVIEWS, ...REVIEWS, ...REVIEWS].map(r => `
    <div class="flex items-center gap-3 text-sm">
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-semibold">${r.name.charAt(0)}</div>
      <span class="font-semibold">${r.name}</span><span class="text-muted-foreground">· ${r.role}</span>
      <span class="text-primary/40 mx-2">✦</span>
    </div>`).join("");

  // Why
  $("#why-grid").innerHTML = WHY.map(f => `
    <div class="text-center p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:border-primary/30 hover:-translate-y-1 transition-all duration-300">
      <div class="relative inline-flex mb-5">
        <div class="absolute inset-0 bg-primary/30 rounded-full blur-xl"></div>
        <div class="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-glow)]">
          <i data-lucide="${f.icon}" class="w-7 h-7 text-white"></i>
        </div>
      </div>
      <h3 class="font-display text-xl font-semibold mb-2">${tr(f.titleKey)}</h3>
      <p class="text-sm text-muted-foreground leading-relaxed">${tr(f.descKey)}</p>
    </div>`).join("");

  applyI18n(app);
  icons();
}

function renderShop() {
  const app = $("#app");
  app.innerHTML = "";
  app.appendChild($("#tpl-shop").content.cloneNode(true));
  const hi = LANG === "hi";
  $("#shop-subtitle").textContent = hi ? "Guruji dwara chuni hui abhimantrit vastuein — WhatsApp par order karein." : "Hand-picked, energised products curated by Guruji — order over WhatsApp.";
  $("#shop-foot").textContent = hi ? "Sabhi products abhimantrit. Shipping pure Bharat mein uplabdh." : "All products energised and authentic. Shipping across India.";
  const inCart = (id) => CART.some(i => i.product.id === id);
  $("#products-grid").innerHTML = PRODUCTS.map(p => {
    const added = inCart(p.id);
    return `<div class="card-spiritual group flex flex-col">
      <div class="relative aspect-square rounded-xl bg-gradient-to-br from-primary/10 to-accent/15 flex items-center justify-center text-6xl mb-4 overflow-hidden">
        <span class="transition-transform duration-500 group-hover:scale-110">${p.emoji}</span>
        <span class="absolute top-3 left-3 text-[10px] uppercase tracking-wider bg-background/80 backdrop-blur-sm text-foreground/80 px-2 py-1 rounded-full border border-border/60">${p.category}</span>
      </div>
      <h3 class="font-display text-lg font-semibold leading-tight mb-1">${escapeHtml(hi ? p.nameHi : p.name)}</h3>
      <p class="text-xs text-muted-foreground mb-3 flex-1">${escapeHtml(hi ? p.descriptionHi : p.description)}</p>
      <div class="flex items-center justify-between gap-2 mt-2">
        <span class="font-display text-xl font-bold text-primary">${formatINR(p.price)}</span>
        <button data-pid="${p.id}" class="prod-btn inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold ${added ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground hover:bg-primary/90'} transition">
          <i data-lucide="${added ? 'check' : 'plus'}" class="w-4 h-4"></i>${added ? (hi ? 'Dekhein' : 'View') : 'Add'}
        </button>
      </div>
    </div>`;
  }).join("");
  $$(".prod-btn").forEach(b => b.addEventListener("click", () => {
    const p = PRODUCTS.find(x => x.id === b.dataset.pid);
    if (inCart(p.id)) openCart(); else addToCart(p);
  }));
  applyI18n(app);
  icons();
}

function route() {
  const r = currentRoute();
  if (r === "shop") renderShop(); else renderHome();
  // scroll to hash section if present
  if (location.hash.includes("#", 1)) {
    const sec = location.hash.split("#").pop();
    setTimeout(() => document.getElementById(sec)?.scrollIntoView({ behavior: "smooth" }), 100);
  } else {
    window.scrollTo({ top: 0 });
  }
}

// ---------- Toast ----------
let toastT;
function showToast(title, desc) {
  $("#toast-title").textContent = title;
  $("#toast-desc").textContent = desc || "";
  $("#toast").classList.remove("hidden");
  clearTimeout(toastT);
  toastT = setTimeout(() => $("#toast").classList.add("hidden"), 3500);
}

// ---------- Lead popup ----------
function setupLeadPopup() {
  const hi = LANG === "hi";
  $("#lead-badge").textContent = hi ? "Free Pehli Salah" : "Free First Guidance";
  $("#lead-title").textContent = hi ? "Apni Zindagi ki Disha Paayein" : "Get Direction for Your Life";
  $("#lead-subtitle").textContent = hi ? "Apna naam aur phone number bhejein — Guruji aapse WhatsApp par sampark karenge." : "Share your name and phone — Guruji will reach out on WhatsApp.";
  $("#lead-lbl-name").textContent = hi ? "Aapka Naam" : "Your Name";
  $("#lead-lbl-phone").textContent = hi ? "WhatsApp Number" : "WhatsApp Number";
  $("#lead-name").placeholder = hi ? "Jaise: Rahul Sharma" : "e.g. Rahul Sharma";
  $("#lead-submit").textContent = hi ? "WhatsApp par Bhejein" : "Send on WhatsApp";
  $("#lead-skip").textContent = hi ? "Abhi nahi" : "Maybe later";
}
function openLead() { setupLeadPopup(); $("#lead-popup").classList.remove("hidden"); $("#lead-popup").classList.add("flex"); icons(); }
function closeLead() { sessionStorage.setItem("astro-lead-popup-shown", "1"); $("#lead-popup").classList.add("hidden"); $("#lead-popup").classList.remove("flex"); }

// ---------- Header scroll ----------
function onScroll() {
  const h = $("#site-header");
  const onHome = currentRoute() === "home";
  const scrolled = window.scrollY > 20;
  if (scrolled || !onHome) {
    h.className = "fixed top-0 inset-x-0 z-40 transition-all duration-300 bg-background/90 backdrop-blur-lg border-b border-border/50 shadow-sm";
  } else {
    h.className = "fixed top-0 inset-x-0 z-40 transition-all duration-300 bg-transparent";
  }
}

// ---------- Init ----------
function rerenderAll() {
  localStorage.setItem("astro-lang", LANG);
  document.documentElement.lang = LANG;
  buildNav();
  updateLangBtns();
  applyI18n(document);
  route();
  setupLeadPopup();
  icons();
}

document.addEventListener("DOMContentLoaded", () => {
  $("#year").textContent = new Date().getFullYear();
  applyTheme();
  buildGalaxy();
  updateCartBadge();
  renderProfileChip();
  rerenderAll();

  // Events
  $$(".lang-btn").forEach(b => b.addEventListener("click", () => { LANG = b.dataset.lang; rerenderAll(); }));
  $("#theme-toggle").addEventListener("click", () => {
    THEME = THEME === "dark" ? "light" : "dark";
    localStorage.setItem("astro-theme", THEME);
    applyTheme();
  });
  $("#cart-btn").addEventListener("click", openCart);
  $("#cart-close").addEventListener("click", closeCart);
  $("#cart-backdrop").addEventListener("click", closeCart);
  $("#mobile-toggle").addEventListener("click", () => $("#mobile-menu").classList.toggle("hidden"));
  $("#profile-logout")?.addEventListener("click", clearProfile);
  $("#lead-close").addEventListener("click", closeLead);
  $("#lead-backdrop").addEventListener("click", closeLead);
  $("#lead-skip").addEventListener("click", closeLead);
  $("#lead-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = $("#lead-name").value.trim();
    const phone = $("#lead-phone").value.trim();
    if (name.length < 2) { const er = $("#lead-error"); er.textContent = "Please enter your name"; er.classList.remove("hidden"); return; }
    if (!/^[+\d\s\-()]{7,20}$/.test(phone)) { const er = $("#lead-error"); er.textContent = "Please enter a valid phone number"; er.classList.remove("hidden"); return; }
    saveProfile({ name, phone, createdAt: Date.now() });
    const hi = LANG === "hi";
    const msg = hi
      ? `Namaste Guruji, mera naam ${name} hai. Phone: ${phone}. Mujhe astrology guidance chahiye.`
      : `Namaste Guruji, my name is ${name}. Phone: ${phone}. I would like astrology guidance.`;
    closeLead();
    window.location.href = waLink(msg);
  });

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", () => { route(); onScroll(); $("#mobile-menu").classList.add("hidden"); });
  onScroll();

  // Lead popup logic
  if (PROFILE) {
    if (!sessionStorage.getItem("astro-welcome-back-shown")) {
      sessionStorage.setItem("astro-welcome-back-shown", "1");
      const hi = LANG === "hi";
      showToast(hi ? `Wapas swagat hai, ${PROFILE.name}!` : `Welcome back, ${PROFILE.name}!`, hi ? "Aapka profile yaad rakha gaya hai." : "Your profile is remembered on this device.");
    }
  } else if (!sessionStorage.getItem("astro-lead-popup-shown")) {
    setTimeout(openLead, 5000);
  }
});
