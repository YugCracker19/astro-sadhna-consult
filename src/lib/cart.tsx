import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type Product = {
  id: string;
  name: string;
  nameHi: string;
  price: number; // INR
  category: string;
  emoji: string;
  description: string;
  descriptionHi: string;
};

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE_KEY = "astro-cart-v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const add = (p: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === p.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === p.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { product: p, qty }];
    });
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((i) => i.product.id !== id));

  const setQty = (id: string, qty: number) =>
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );

  const clear = () => setItems([]);

  const { count, total } = useMemo(() => {
    let c = 0;
    let t = 0;
    items.forEach((i) => {
      c += i.qty;
      t += i.qty * i.product.price;
    });
    return { count: c, total: t };
  }, [items]);

  return (
    <Ctx.Provider
      value={{
        items,
        add,
        remove,
        setQty,
        clear,
        count,
        total,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

// Initial product catalog. Guruji can extend later.
export const PRODUCTS: Product[] = [
  {
    id: "rudraksha-5mukhi",
    name: "5 Mukhi Rudraksha Mala",
    nameHi: "5 Mukhi Rudraksha Mala",
    price: 1499,
    category: "Rudraksha",
    emoji: "📿",
    description: "Energised 108-bead mala for peace, focus and protection.",
    descriptionHi: "Shanti, dhyaan aur raksha ke liye 108 dane wali abhimantrit mala.",
  },
  {
    id: "yellow-sapphire",
    name: "Yellow Sapphire (Pukhraj)",
    nameHi: "Pukhraj Ratn",
    price: 5999,
    category: "Gemstones",
    emoji: "💛",
    description: "Certified natural Pukhraj for wisdom, wealth and Guru blessings.",
    descriptionHi: "Buddhi, dhan aur Guru kripa ke liye prakritik prammanit Pukhraj.",
  },
  {
    id: "red-coral",
    name: "Red Coral (Moonga)",
    nameHi: "Moonga Ratn",
    price: 3499,
    category: "Gemstones",
    emoji: "❤️",
    description: "Natural moonga to strengthen Mangal and bring courage.",
    descriptionHi: "Mangal mazboot karne aur saahas badhane ke liye prakritik moonga.",
  },
  {
    id: "shree-yantra",
    name: "Shree Yantra (Brass)",
    nameHi: "Shree Yantra (Pital)",
    price: 999,
    category: "Yantras",
    emoji: "🔱",
    description: "Energised brass Shree Yantra for prosperity and abundance.",
    descriptionHi: "Samriddhi aur dhan ke liye abhimantrit pital ka Shree Yantra.",
  },
  {
    id: "mahalakshmi-yantra",
    name: "Mahalakshmi Yantra",
    nameHi: "Mahalakshmi Yantra",
    price: 799,
    category: "Yantras",
    emoji: "🪔",
    description: "For wealth flow, business growth and household prosperity.",
    descriptionHi: "Dhan, business growth aur ghar ki samriddhi ke liye.",
  },
  {
    id: "puja-kit",
    name: "Daily Puja Kit",
    nameHi: "Daily Puja Kit",
    price: 599,
    category: "Essentials",
    emoji: "🕉️",
    description: "Complete kit with kapoor, agarbatti, roli, chawal and diya.",
    descriptionHi: "Kapoor, agarbatti, roli, chawal aur diya — sab kuch ek saath.",
  },
  {
    id: "kaal-sarp-dosh",
    name: "Kaal Sarp Dosh Nivaran",
    nameHi: "Kaal Sarp Dosh Nivaran",
    price: 2100,
    category: "Remedies",
    emoji: "🐍",
    description: "Special puja samagri & yantra to reduce Kaal Sarp dosh effects.",
    descriptionHi: "Kaal Sarp dosh ka asar kam karne ke liye vishesh samagri & yantra.",
  },
  {
    id: "navagraha-yantra",
    name: "Navagraha Yantra",
    nameHi: "Navagraha Yantra",
    price: 1299,
    category: "Yantras",
    emoji: "🌌",
    description: "Balance all nine planets in your life for overall harmony.",
    descriptionHi: "Jeevan mein navo grahon ko santulit karke samrasta laayein.",
  },
];
