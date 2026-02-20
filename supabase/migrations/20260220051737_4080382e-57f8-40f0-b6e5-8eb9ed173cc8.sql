
-- Create enums
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.app_rank AS ENUM ('JJC', 'Learner', 'Chairman', 'Odogwu');
CREATE TYPE public.post_category AS ENUM ('Money', 'Hausa', 'Gist');
CREATE TYPE public.coin_source_type AS ENUM ('read', 'like', 'share', 'comment', 'post', 'bonus', 'invite', 'spend');
CREATE TYPE public.activity_type AS ENUM ('view', 'click', 'share', 'comment', 'reaction', 'draft_creation', 'login', 'signup');

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT DEFAULT '',
  location_state TEXT DEFAULT '',
  xp_points INTEGER NOT NULL DEFAULT 0,
  coins INTEGER NOT NULL DEFAULT 0,
  current_rank app_rank NOT NULL DEFAULT 'JJC',
  streak_days INTEGER NOT NULL DEFAULT 0,
  last_login_date DATE DEFAULT CURRENT_DATE,
  posts_read INTEGER NOT NULL DEFAULT 0,
  saved_posts TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Coin ledger table (prevents double spending, all transactions logged)
CREATE TABLE public.coin_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  source_type coin_source_type NOT NULL,
  amount INTEGER NOT NULL,
  post_id TEXT,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coin_ledger ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own ledger" ON public.coin_ledger FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System inserts via function" ON public.coin_ledger FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_coin_ledger_user ON public.coin_ledger(user_id);
CREATE INDEX idx_coin_ledger_idempotency ON public.coin_ledger(idempotency_key);

-- Global coin pool tracking
CREATE TABLE public.coin_pool (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  total_supply INTEGER NOT NULL DEFAULT 1000000,
  remaining INTEGER NOT NULL DEFAULT 1000000,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.coin_pool ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read pool" ON public.coin_pool FOR SELECT USING (true);

INSERT INTO public.coin_pool (id, total_supply, remaining) VALUES (1, 1000000, 1000000);

-- Activity logs
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_type activity_type NOT NULL,
  target_id TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own activity" ON public.activity_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own activity" ON public.activity_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE INDEX idx_activity_user ON public.activity_logs(user_id);

-- Trigger for auto-creating profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || LEFT(NEW.id::text, 8)),
    'https://api.dicebear.com/9.x/adventurer/svg?seed=' || LEFT(NEW.id::text, 8)
  );
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Atomic coin earning function (prevents double-spend)
CREATE OR REPLACE FUNCTION public.earn_coins(
  p_user_id UUID,
  p_source_type coin_source_type,
  p_base_reward INTEGER,
  p_post_id TEXT DEFAULT NULL,
  p_idempotency_key TEXT DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_rank app_rank;
  v_rank_factor INTEGER;
  v_pool_remaining INTEGER;
  v_pool_total INTEGER;
  v_engagement_factor NUMERIC;
  v_raw NUMERIC;
  v_earned INTEGER;
  v_multiplier INTEGER;
BEGIN
  -- Idempotency check
  IF p_idempotency_key IS NOT NULL THEN
    IF EXISTS (SELECT 1 FROM coin_ledger WHERE idempotency_key = p_idempotency_key) THEN
      RETURN 0;
    END IF;
  END IF;

  -- Get user rank
  SELECT current_rank INTO v_user_rank FROM profiles WHERE id = p_user_id;
  IF v_user_rank IS NULL THEN RETURN 0; END IF;

  v_rank_factor := CASE v_user_rank
    WHEN 'JJC' THEN 1
    WHEN 'Learner' THEN 2
    WHEN 'Chairman' THEN 3
    WHEN 'Odogwu' THEN 4
  END;

  -- Lock and read pool
  SELECT remaining, total_supply INTO v_pool_remaining, v_pool_total
  FROM coin_pool WHERE id = 1 FOR UPDATE;

  IF v_pool_remaining <= 0 THEN RETURN 0; END IF;

  -- Engagement factor
  v_engagement_factor := CASE
    WHEN p_source_type IN ('share', 'comment', 'invite') THEN 1.5
    ELSE 1.0
  END;

  -- Dynamic formula
  v_raw := p_base_reward * (1.0 - v_rank_factor::numeric / 5.0) * (v_pool_remaining::numeric / v_pool_total) * v_engagement_factor;
  v_earned := GREATEST(1, LEAST(10, ROUND(v_raw)));
  v_earned := LEAST(v_earned, v_pool_remaining);

  -- 2% hidden drop multiplier
  IF random() < 0.02 THEN
    v_multiplier := floor(random() * 4 + 2)::integer;
    v_earned := LEAST(v_earned * v_multiplier, v_pool_remaining, 50);
  END IF;

  -- Insert ledger entry
  INSERT INTO coin_ledger (user_id, source_type, amount, post_id, idempotency_key)
  VALUES (p_user_id, p_source_type, v_earned, p_post_id, p_idempotency_key);

  -- Update user coins
  UPDATE profiles SET coins = coins + v_earned, updated_at = now() WHERE id = p_user_id;

  -- Deplete global pool
  UPDATE coin_pool SET remaining = remaining - v_earned, updated_at = now() WHERE id = 1;

  RETURN v_earned;
END;
$$;

-- Atomic XP earning function
CREATE OR REPLACE FUNCTION public.add_xp(
  p_user_id UUID,
  p_amount INTEGER
)
RETURNS app_rank
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_xp INTEGER;
  v_new_rank app_rank;
BEGIN
  UPDATE profiles
  SET xp_points = xp_points + p_amount, updated_at = now()
  WHERE id = p_user_id
  RETURNING xp_points INTO v_new_xp;

  v_new_rank := CASE
    WHEN v_new_xp >= 1000 THEN 'Odogwu'
    WHEN v_new_xp >= 500 THEN 'Chairman'
    WHEN v_new_xp >= 100 THEN 'Learner'
    ELSE 'JJC'
  END;

  UPDATE profiles SET current_rank = v_new_rank WHERE id = p_user_id AND current_rank != v_new_rank;

  RETURN v_new_rank;
END;
$$;

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
