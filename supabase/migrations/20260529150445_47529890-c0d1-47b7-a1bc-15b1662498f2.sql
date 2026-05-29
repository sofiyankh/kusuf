-- Enum
CREATE TYPE public.app_role AS ENUM ('admin', 'customer');
CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'name', ''), NEW.email);
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT,
  category TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  original_price NUMERIC(10,2),
  image TEXT,
  description TEXT,
  description_ar TEXT,
  ingredients TEXT[] DEFAULT ARRAY[]::TEXT[],
  rating NUMERIC(3,2) DEFAULT 0,
  reviews INTEGER DEFAULT 0,
  stock INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  is_new BOOLEAN DEFAULT false,
  discount INTEGER,
  variants JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE TYPE payment_method AS ENUM ('cash_on_delivery');

CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_number TEXT UNIQUE,
  customer_phone TEXT,
  payment_method payment_method NOT NULL DEFAULT 'cash_on_delivery',
  internal_notes TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount NUMERIC(10,2) NOT NULL,
  status public.order_status NOT NULL DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE SEQUENCE public.order_number_seq START 1000;

CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.order_number IS NULL THEN
    NEW.order_number := 'Kusuf-' || to_char(now(), 'YYMMDD') || '-' || nextval('public.order_number_seq');
  END IF;
  RETURN NEW;
END $$;

CREATE TRIGGER trg_orders_number BEFORE INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.generate_order_number();

CREATE TRIGGER products_updated_at BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER orders_updated_at BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.carts (
  user_id UUID PRIMARY KEY,
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.carts ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  product_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, product_id)
);
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  label TEXT,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  zip TEXT,
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_addresses_updated BEFORE UPDATE ON public.addresses
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TYPE notification_type AS ENUM ('order_placed','order_status','low_stock','new_offer','new_user','system');
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  for_admin BOOLEAN NOT NULL DEFAULT false,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  link TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_notif_user ON public.notifications (user_id, read, created_at DESC);
CREATE INDEX idx_notif_admin ON public.notifications (for_admin, read, created_at DESC);

CREATE TABLE public.offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ar TEXT,
  description TEXT,
  description_ar TEXT,
  discount_pct INTEGER NOT NULL CHECK (discount_pct >= 0 AND discount_pct <= 100),
  category TEXT,
  banner_image TEXT,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_offers_updated BEFORE UPDATE ON public.offers
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  user_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  approved BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.order_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  changed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_osh_order ON public.order_status_history (order_id, created_at DESC);

CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  active BOOLEAN NOT NULL DEFAULT true,
  unsubscribe_token UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Profiles self select" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Profiles self update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Roles self select" ON public.user_roles FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Roles admin insert" ON public.user_roles FOR INSERT WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Roles admin delete" ON public.user_roles FOR DELETE USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Anyone view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins insert products" ON public.products FOR INSERT WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update products" ON public.products FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete products" ON public.products FOR DELETE USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Users view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users create own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins update orders" ON public.orders FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins delete orders" ON public.orders FOR DELETE USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Users manage own cart" ON public.carts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own wishlist" ON public.wishlists FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage own addresses" ON public.addresses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Notif view" ON public.notifications FOR SELECT USING (auth.uid() = user_id OR (for_admin AND public.has_role(auth.uid(),'admin')));
CREATE POLICY "Notif update" ON public.notifications FOR UPDATE USING (auth.uid() = user_id OR (for_admin AND public.has_role(auth.uid(),'admin')));
CREATE POLICY "Notif delete" ON public.notifications FOR DELETE USING (public.has_role(auth.uid(),'admin') OR auth.uid() = user_id);

CREATE POLICY "Offers anyone view active" ON public.offers FOR SELECT USING (active = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Offers admin insert" ON public.offers FOR INSERT WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Offers admin update" ON public.offers FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Offers admin delete" ON public.offers FOR DELETE USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Reviews anyone view approved" ON public.reviews FOR SELECT USING (approved = true OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Reviews self insert" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Reviews self update" ON public.reviews FOR UPDATE USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "Reviews delete" ON public.reviews FOR DELETE USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "OSH owners view" ON public.order_status_history FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid())
  OR public.has_role(auth.uid(),'admin')
);
CREATE POLICY "OSH admin insert" ON public.order_status_history FOR INSERT WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Contact anyone insert" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact admin select" ON public.contact_messages FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Contact admin update" ON public.contact_messages FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Contact admin delete" ON public.contact_messages FOR DELETE USING (public.has_role(auth.uid(),'admin'));

CREATE POLICY "Newsletter anyone insert" ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
CREATE POLICY "Newsletter admin select" ON public.newsletter_subscribers FOR SELECT USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Newsletter admin update" ON public.newsletter_subscribers FOR UPDATE USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Newsletter admin delete" ON public.newsletter_subscribers FOR DELETE USING (public.has_role(auth.uid(),'admin'));

-- TRIGGERS
CREATE OR REPLACE FUNCTION public.notify_on_new_order()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.notifications (user_id, for_admin, type, title, body, link)
  VALUES (NEW.user_id, false, 'order_placed', 'Order received', 'Order ' || COALESCE(NEW.order_number,'') || ' total ' || NEW.total_amount, '/account?tab=orders');
  INSERT INTO public.notifications (user_id, for_admin, type, title, body, link)
  VALUES (NULL, true, 'order_placed', 'New order', 'New order total ' || NEW.total_amount, '/admin/orders');
  INSERT INTO public.order_status_history (order_id, status, note)
  VALUES (NEW.id, NEW.status::text, 'Order created');
  RETURN NEW;
END $$;
CREATE TRIGGER trg_notify_new_order AFTER INSERT ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.notify_on_new_order();

CREATE OR REPLACE FUNCTION public.notify_on_status_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.notifications (user_id, for_admin, type, title, body, link)
    VALUES (NEW.user_id, false, 'order_status', 'Order status update', 'Order ' || COALESCE(NEW.order_number,'') || ' is now: ' || NEW.status::text, '/account?tab=orders');
    INSERT INTO public.order_status_history (order_id, status, note, changed_by)
    VALUES (NEW.id, NEW.status::text, NULL, auth.uid());
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_notify_status AFTER UPDATE ON public.orders
FOR EACH ROW EXECUTE FUNCTION public.notify_on_status_change();

CREATE OR REPLACE FUNCTION public.notify_low_stock()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.stock IS NOT NULL AND NEW.stock < 5 AND (OLD.stock IS NULL OR OLD.stock >= 5) THEN
    INSERT INTO public.notifications (user_id, for_admin, type, title, body, link)
    VALUES (NULL, true, 'low_stock', 'Low stock alert', 'Product "' || NEW.name || '" has ' || NEW.stock || ' left', '/admin/products');
  END IF;
  RETURN NEW;
END $$;
CREATE TRIGGER trg_low_stock AFTER UPDATE OF stock ON public.products
FOR EACH ROW EXECUTE FUNCTION public.notify_low_stock();

ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_status_history;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;
ALTER TABLE public.orders REPLICA IDENTITY FULL;

CREATE OR REPLACE FUNCTION public.place_order(
  _items jsonb,
  _shipping jsonb,
  _phone text DEFAULT NULL,
  _shipping_fee numeric DEFAULT 7
)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  v_total numeric := 0;
  v_order_id uuid;
  it jsonb;
  prod_id uuid;
  qty int;
  prod record;
  validated_items jsonb := '[]'::jsonb;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  IF _items IS NULL OR jsonb_array_length(_items) = 0 THEN RAISE EXCEPTION 'Cart is empty'; END IF;

  FOR it IN SELECT * FROM jsonb_array_elements(_items) LOOP
    prod_id := (it->>'id')::uuid;
    qty := GREATEST(COALESCE((it->>'quantity')::int, 0), 0);
    IF qty <= 0 THEN CONTINUE; END IF;
    SELECT id, name, name_ar, price, image, stock, in_stock INTO prod FROM public.products WHERE id = prod_id;
    IF NOT FOUND THEN RAISE EXCEPTION 'Product % not found', prod_id; END IF;
    IF prod.in_stock = false OR (prod.stock IS NOT NULL AND prod.stock < qty) THEN RAISE EXCEPTION 'Insufficient stock for product %', prod.name; END IF;
    v_total := v_total + (prod.price * qty);
    validated_items := validated_items || jsonb_build_object('id', prod.id, 'name', COALESCE(prod.name_ar, prod.name), 'price', prod.price, 'quantity', qty, 'image', prod.image);
  END LOOP;
  IF v_total <= 0 THEN RAISE EXCEPTION 'Order total must be greater than zero'; END IF;
  v_total := v_total + COALESCE(_shipping_fee, 0);
  INSERT INTO public.orders (user_id, items, total_amount, shipping_address, customer_phone, status, payment_method)
  VALUES (uid, validated_items, v_total, _shipping, _phone, 'pending', 'cash_on_delivery')
  RETURNING id INTO v_order_id;
  RETURN v_order_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.newsletter_count()
RETURNS bigint LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT count(*) FROM public.newsletter_subscribers WHERE active = true;
$$;

-- GRANTS
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_on_new_order() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_on_status_change() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_low_stock() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.generate_order_number() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.place_order(jsonb, jsonb, text, numeric) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.place_order(jsonb, jsonb, text, numeric) TO authenticated;
GRANT EXECUTE ON FUNCTION public.newsletter_count() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;

GRANT SELECT ON public.products TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.carts TO authenticated;
GRANT ALL ON public.carts TO service_role;
GRANT SELECT, INSERT, DELETE ON public.wishlists TO authenticated;
GRANT ALL ON public.wishlists TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.addresses TO authenticated;
GRANT ALL ON public.addresses TO service_role;
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
GRANT SELECT ON public.offers TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.offers TO authenticated;
GRANT ALL ON public.offers TO service_role;
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
GRANT SELECT, INSERT ON public.order_status_history TO authenticated;
GRANT ALL ON public.order_status_history TO service_role;
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;

-- SEED PRODUCTS
INSERT INTO public.products (name, name_ar, category, price, original_price, image, description, description_ar, ingredients, rating, reviews, stock, in_stock, is_new, discount, variants) VALUES
('Shadow Hoodie - Black', 'هودي الخسوف - أسود', 'drops', 145.00, 180.00, '/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg',
 'Heavyweight premium Tunisian cotton hoodie with oversized fit and Kusuf shadow mark.',
 'هودي قطني تونسي فاخر بوزن ثقيل، قصة واسعة وعلامة خسوف Kusuf.',
 ARRAY['100% Tunisian Cotton','Heavyweight 450gsm','Oversized Fit'], 4.9, 42, 50, true, true, 20,
 '[{"id":"v-s","size":"S","stock":10},{"id":"v-m","size":"M","stock":15},{"id":"v-l","size":"L","stock":15},{"id":"v-xl","size":"XL","stock":10}]'::jsonb),
('Essential Tee - Sand', 'تيشيرت أساسي - رملي', 'essentials', 65.00, NULL, '/images/22a9a9710a0a5596583a23521e5fe49d.jpg',
 'Classic fit premium tee in Kusuf signature sand colorway.',
 'تيشيرت بقصة كلاسيكية فاخرة بلون الرمل المميز لـ Kusuf.',
 ARRAY['100% Organic Cotton','Soft Touch','Reinforced Neckline'], 4.8, 128, 200, true, false, NULL,
 '[{"id":"v-s","size":"S","stock":40},{"id":"v-m","size":"M","stock":60},{"id":"v-l","size":"L","stock":60},{"id":"v-xl","size":"XL","stock":40}]'::jsonb),
('Silent Cap - Black', 'قبعة الصمت - أسود', 'essentials', 45.00, NULL, '/images/a583c395a9133f31190311989d79caa9.jpg',
 'Minimalist 6-panel cap with tonal Kusuf embroidery.',
 'قبعة بـ 6 لوحات مع تطريز Kusuf هادئ.',
 ARRAY['Cotton Twill','Adjustable Strap','Tonal Embroidery'], 4.7, 85, 100, true, false, NULL,
 '[{"id":"v-os","size":"OS","stock":100}]'::jsonb),
('Urban Cargo Pants', 'سروال كارغو حضري', 'drops', 185.00, 220.00, '/images/f812cc870d28da5055fbbb7259ae1ebb.jpg',
 'Technical urban cargo pants with multi-pocket system and adjustable hem.',
 'سروال كارغو حضري تقني مع نظام جيوب متعددة وحاشية قابلة للتعديل.',
 ARRAY['Durable Ripstop','Multi-pocket System','Tapered Fit'], 4.9, 15, 30, true, true, 15,
 '[{"id":"v-s","size":"S","stock":6},{"id":"v-m","size":"M","stock":10},{"id":"v-l","size":"L","stock":10},{"id":"v-xl","size":"XL","stock":4}]'::jsonb),
('Shadow Hoodie - Sand', 'هودي الخسوف - رملي', 'drops', 145.00, 180.00, '/images/598ccfa54b4780d61a0a391d7768e6ea.jpg',
 'Heavyweight premium Tunisian cotton hoodie in sand colorway.',
 'هودي قطني تونسي فاخر بوزن ثقيل بلون رملي.',
 ARRAY['100% Tunisian Cotton','Heavyweight 450gsm','Oversized Fit'], 4.9, 28, 40, true, true, 20,
 '[{"id":"v-s","size":"S","stock":8},{"id":"v-m","size":"M","stock":12},{"id":"v-l","size":"L","stock":12},{"id":"v-xl","size":"XL","stock":8}]'::jsonb),
('Desert Nomad Pants', 'سروال بدوي الصحراء', 'drops', 195.00, NULL, '/images/d81af856f671f045137f4843339c77d3.jpg',
 'Relaxed fit trousers with adjustable drawstrings and side ventilation.',
 'سروال بقصة مريحة مع أربطة قابلة للتعديل وتهوية جانبية.',
 ARRAY['Lightweight Nylon','Water Resistant','Articulated Knees'], 4.8, 12, 25, true, true, NULL,
 '[{"id":"v-s","size":"S","stock":5},{"id":"v-m","size":"M","stock":10},{"id":"v-l","size":"L","stock":10}]'::jsonb),
('Eclipse Windbreaker', 'سترة الكسوف الواقية', 'drops', 210.00, 250.00, '/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg',
 'Reflective windbreaker with Kusuf hidden branding.',
 'سترة واقية عاكسة مع علامة Kusuf المخفية.',
 ARRAY['Reflective Poly','Mesh Lining','Packable Hood'], 4.9, 8, 15, true, true, 16,
 '[{"id":"v-s","size":"S","stock":3},{"id":"v-m","size":"M","stock":5},{"id":"v-l","size":"L","stock":7}]'::jsonb),
('Kusuf Signature Socks', 'جوارب كشوف المميزة', 'essentials', 25.00, NULL, '/images/22a9a9710a0a5596583a23521e5fe49d.jpg',
 'Cushioned crew socks with knit-in Kusuf logo.',
 'جوارب قطنية مبطنة مع شعار Kusuf محبوك.',
 ARRAY['80% Cotton','15% Nylon','5% Spandex'], 4.9, 56, 150, true, false, NULL,
 '[{"id":"v-os","size":"OS","stock":150}]'::jsonb),
('Oversized Crewneck - Charcoal', 'سويتشيرت واسع - فحمي', 'essentials', 95.00, NULL, '/images/598ccfa54b4780d61a0a391d7768e6ea.jpg',
 'Soft-brushed fleece crewneck with dropped shoulders.',
 'سويتشيرت ناعم بأكتاف منسدلة.',
 ARRAY['80% Cotton','20% Polyester','Brushed Fleece'], 4.7, 64, 80, true, false, NULL,
 '[{"id":"v-s","size":"S","stock":15},{"id":"v-m","size":"M","stock":25},{"id":"v-l","size":"L","stock":25},{"id":"v-xl","size":"XL","stock":15}]'::jsonb),
('Relaxed Denim Jacket', 'جاكيت جينز واسع', 'drops', 220.00, 260.00, '/images/f812cc870d28da5055fbbb7259ae1ebb.jpg',
 'Vintage-washed denim jacket with boxy silhouette and metal hardware.',
 'جاكيت جينز بغسلة كلاسيكية وقصة عريضة.',
 ARRAY['100% Cotton Denim','14oz','Metal Buttons'], 4.8, 21, 35, true, true, 15,
 '[{"id":"v-s","size":"S","stock":8},{"id":"v-m","size":"M","stock":12},{"id":"v-l","size":"L","stock":10},{"id":"v-xl","size":"XL","stock":5}]'::jsonb),
('Pleated Wide Trousers', 'سروال واسع بطيات', 'essentials', 130.00, NULL, '/images/d81af856f671f045137f4843339c77d3.jpg',
 'Tailored wide-leg trousers with double pleat front.',
 'سروال مفصل بساق واسعة وطيات أمامية.',
 ARRAY['Wool Blend','Lined Pockets','Hidden Zip'], 4.6, 18, 40, true, false, NULL,
 '[{"id":"v-s","size":"S","stock":10},{"id":"v-m","size":"M","stock":15},{"id":"v-l","size":"L","stock":10},{"id":"v-xl","size":"XL","stock":5}]'::jsonb),
('Knit Beanie - Cream', 'قبعة محبوكة - كريمي', 'essentials', 35.00, NULL, '/images/22a9a9710a0a5596583a23521e5fe49d.jpg',
 'Chunky ribbed beanie in soft merino wool.',
 'قبعة محبوكة من الصوف الميرينو الناعم.',
 ARRAY['Merino Wool','Ribbed Knit','One Size'], 4.9, 47, 120, true, false, NULL,
 '[{"id":"v-os","size":"OS","stock":120}]'::jsonb),
('Mock-Neck Long Sleeve', 'تيشيرت رقبة عالية بأكمام طويلة', 'essentials', 75.00, NULL, '/images/a583c395a9133f31190311989d79caa9.jpg',
 'Layering long sleeve with mock neck in supima cotton.',
 'تيشيرت أساسي بأكمام طويلة ورقبة عالية.',
 ARRAY['Supima Cotton','Slim Fit','Mock Neck'], 4.5, 33, 90, true, false, NULL,
 '[{"id":"v-s","size":"S","stock":20},{"id":"v-m","size":"M","stock":30},{"id":"v-l","size":"L","stock":25},{"id":"v-xl","size":"XL","stock":15}]'::jsonb),
('Tech Shell Anorak', 'سترة شيل تقنية', 'drops', 285.00, 340.00, '/images/fe2af5f55dc10e6438411c2ba8b3dc45.jpg',
 'Half-zip technical anorak with kangaroo pocket and packable hood.',
 'أنوراك تقني بسحاب نصفي وجيب كنغر.',
 ARRAY['Recycled Nylon','Waterproof Seams','Packable Hood'], 5.0, 9, 18, true, true, 16,
 '[{"id":"v-s","size":"S","stock":4},{"id":"v-m","size":"M","stock":6},{"id":"v-l","size":"L","stock":5},{"id":"v-xl","size":"XL","stock":3}]'::jsonb),
('Boxy Graphic Tee', 'تيشيرت بطباعة عريضة', 'essentials', 55.00, NULL, '/images/22a9a9710a0a5596583a23521e5fe49d.jpg',
 'Heavyweight boxy tee with screen-printed Kusuf logo.',
 'تيشيرت ثقيل بقصة عريضة وطباعة Kusuf.',
 ARRAY['240gsm Cotton','Boxy Fit','Screen Print'], 4.6, 92, 150, true, true, NULL,
 '[{"id":"v-s","size":"S","stock":30},{"id":"v-m","size":"M","stock":50},{"id":"v-l","size":"L","stock":45},{"id":"v-xl","size":"XL","stock":25}]'::jsonb),
('Canvas Tote Bag', 'حقيبة كانفاس', 'essentials', 40.00, NULL, '/images/598ccfa54b4780d61a0a391d7768e6ea.jpg',
 'Heavy-duty canvas tote with reinforced straps.',
 'حقيبة قماشية متينة بأشرطة معززة.',
 ARRAY['Heavyweight Canvas','Reinforced Straps','Inner Pocket'], 4.8, 110, 200, true, false, NULL,
 '[{"id":"v-os","size":"OS","stock":200}]'::jsonb);
