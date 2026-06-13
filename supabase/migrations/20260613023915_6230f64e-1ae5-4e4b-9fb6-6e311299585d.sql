
-- Role enum + user_roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- Products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL,
  emoji TEXT NOT NULL DEFAULT '🕉️',
  description TEXT NOT NULL,
  description_hi TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Active products are publicly readable"
  ON public.products FOR SELECT TO anon, authenticated
  USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_products_updated
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  lang TEXT,
  source TEXT NOT NULL DEFAULT 'popup',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view leads"
  ON public.leads FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete leads"
  ON public.leads FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Orders
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  notes TEXT,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can place an order"
  ON public.orders FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view orders"
  ON public.orders FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete orders"
  ON public.orders FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Seed products
INSERT INTO public.products (slug, name, name_hi, price, category, emoji, description, description_hi, sort_order) VALUES
('rudraksha-5mukhi','5 Mukhi Rudraksha Mala','5 Mukhi Rudraksha Mala',1499,'Rudraksha','📿','Energised 108-bead mala for peace, focus and protection.','Shanti, dhyaan aur raksha ke liye 108 dane wali abhimantrit mala.',10),
('yellow-sapphire','Yellow Sapphire (Pukhraj)','Pukhraj Ratn',5999,'Gemstones','💛','Certified natural Pukhraj for wisdom, wealth and Guru blessings.','Buddhi, dhan aur Guru kripa ke liye prakritik prammanit Pukhraj.',20),
('red-coral','Red Coral (Moonga)','Moonga Ratn',3499,'Gemstones','❤️','Natural moonga to strengthen Mangal and bring courage.','Mangal mazboot karne aur saahas badhane ke liye prakritik moonga.',30),
('shree-yantra','Shree Yantra (Brass)','Shree Yantra (Pital)',999,'Yantras','🔱','Energised brass Shree Yantra for prosperity and abundance.','Samriddhi aur dhan ke liye abhimantrit pital ka Shree Yantra.',40),
('mahalakshmi-yantra','Mahalakshmi Yantra','Mahalakshmi Yantra',799,'Yantras','🪔','For wealth flow, business growth and household prosperity.','Dhan, business growth aur ghar ki samriddhi ke liye.',50),
('puja-kit','Daily Puja Kit','Daily Puja Kit',599,'Essentials','🕉️','Complete kit with kapoor, agarbatti, roli, chawal and diya.','Kapoor, agarbatti, roli, chawal aur diya — sab kuch ek saath.',60),
('kaal-sarp-dosh','Kaal Sarp Dosh Nivaran','Kaal Sarp Dosh Nivaran',2100,'Remedies','🐍','Special puja samagri & yantra to reduce Kaal Sarp dosh effects.','Kaal Sarp dosh ka asar kam karne ke liye vishesh samagri & yantra.',70),
('navagraha-yantra','Navagraha Yantra','Navagraha Yantra',1299,'Yantras','🌌','Balance all nine planets in your life for overall harmony.','Jeevan mein navo grahon ko santulit karke samrasta laayein.',80);

-- Auto-promote the FIRST user who signs up to admin (since there's no admin yet).
-- Once an admin exists, this is a no-op.
CREATE OR REPLACE FUNCTION public.handle_first_user_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user') ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_first_user_admin();
