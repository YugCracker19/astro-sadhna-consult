import { Star, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Priya Sharma",
    role: "Mumbai",
    text: "I was stuck in a difficult marriage situation for years. The remedies suggested by Astro Sadhna brought peace and understanding back into our home within weeks.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "Delhi",
    text: "Honest, kind, and incredibly accurate. My business turned around after following the guidance — sales tripled in six months. I'm forever grateful.",
    rating: 5,
  },
  {
    name: "Ananya Iyer",
    role: "Bangalore",
    text: "I had lost direction in my career. The reading was so detailed it felt like they knew my entire life. Today I'm in my dream role with clarity.",
    rating: 5,
  },
  {
    name: "Suresh Patel",
    role: "Ahmedabad",
    text: "What I love most is the warmth — no fear-mongering, no pressure. Just genuine guidance and powerful, simple remedies that actually work.",
    rating: 5,
  },
  {
    name: "Meera Nair",
    role: "Kochi",
    text: "Available on WhatsApp whenever I needed reassurance. The personal touch and accuracy of predictions have made me a believer for life.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 starfield opacity-40 pointer-events-none" />
      <div className="container mx-auto relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Stories of <span className="text-gradient">Transformation</span>
          </h2>
          <p className="text-muted-foreground">
            Real journeys from people who found clarity, peace, and direction with Astro Sadhna.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {REVIEWS.slice(3).map((r) => (
            <ReviewCard key={r.name} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ name, role, text, rating }: { name: string; role: string; text: string; rating: number }) => (
  <div className="card-spiritual relative">
    <Quote className="absolute top-5 right-5 w-8 h-8 text-primary/15" />
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
      ))}
    </div>
    <p className="text-foreground/85 leading-relaxed mb-6 text-sm md:text-base">"{text}"</p>
    <div className="flex items-center gap-3 pt-4 border-t border-border/60">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
        {name.charAt(0)}
      </div>
      <div>
        <div className="font-semibold text-foreground text-sm">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </div>
  </div>
);

export default Testimonials;
