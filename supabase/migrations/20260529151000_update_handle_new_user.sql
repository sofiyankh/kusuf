
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  role_count int;
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'name', ''), NEW.email);
  
  -- Check if any admin exists
  SELECT count(*) INTO role_count FROM public.user_roles WHERE role = 'admin';
  
  -- First user becomes admin, others are customers
  IF role_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin');
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer');
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.promote_first_admin()
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  role_count int;
  uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'Authentication required'; END IF;
  
  SELECT count(*) INTO role_count FROM public.user_roles WHERE role = 'admin';
  
  IF role_count = 0 THEN
    INSERT INTO public.user_roles (user_id, role) 
    VALUES (uid, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  ELSE
    RAISE EXCEPTION 'Admin already exists';
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.promote_first_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.any_admin_exists()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin');
$$;

GRANT EXECUTE ON FUNCTION public.any_admin_exists() TO authenticated, anon;


