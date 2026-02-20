
-- Tips table
CREATE TABLE public.tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tipper_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id text,
  amount integer NOT NULL CHECK (amount > 0),
  message text DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view tips they sent or received"
ON public.tips FOR SELECT
USING (auth.uid() = tipper_id OR auth.uid() = author_id);

CREATE POLICY "Users can insert tips"
ON public.tips FOR INSERT
WITH CHECK (auth.uid() = tipper_id);

-- Post boosts table
CREATE TABLE public.post_boosts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booster_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id text NOT NULL,
  amount integer NOT NULL CHECK (amount > 0),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.post_boosts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view boosts"
ON public.post_boosts FOR SELECT
USING (true);

CREATE POLICY "Users can insert boosts"
ON public.post_boosts FOR INSERT
WITH CHECK (auth.uid() = booster_id);

-- tip_author function: atomic spend + transfer
CREATE OR REPLACE FUNCTION public.tip_author(
  p_tipper_id uuid,
  p_author_id uuid,
  p_amount integer,
  p_post_id text DEFAULT NULL,
  p_message text DEFAULT ''
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_tipper_coins integer;
BEGIN
  IF p_tipper_id = p_author_id THEN RETURN false; END IF;
  IF p_amount <= 0 THEN RETURN false; END IF;

  -- Lock tipper row
  SELECT coins INTO v_tipper_coins FROM profiles WHERE id = p_tipper_id FOR UPDATE;
  IF v_tipper_coins IS NULL OR v_tipper_coins < p_amount THEN RETURN false; END IF;

  -- Deduct from tipper
  UPDATE profiles SET coins = coins - p_amount, updated_at = now() WHERE id = p_tipper_id;
  -- Credit author
  UPDATE profiles SET coins = coins + p_amount, updated_at = now() WHERE id = p_author_id;

  -- Log in ledger
  INSERT INTO coin_ledger (user_id, source_type, amount, post_id)
  VALUES (p_tipper_id, 'spend', -p_amount, p_post_id);
  INSERT INTO coin_ledger (user_id, source_type, amount, post_id)
  VALUES (p_author_id, 'bonus', p_amount, p_post_id);

  -- Record tip
  INSERT INTO tips (tipper_id, author_id, post_id, amount, message)
  VALUES (p_tipper_id, p_author_id, p_post_id, p_amount, p_message);

  RETURN true;
END;
$$;

-- boost_post function: spend coins to boost visibility
CREATE OR REPLACE FUNCTION public.boost_post(
  p_booster_id uuid,
  p_post_id text,
  p_amount integer
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_coins integer;
BEGIN
  IF p_amount <= 0 THEN RETURN false; END IF;

  SELECT coins INTO v_coins FROM profiles WHERE id = p_booster_id FOR UPDATE;
  IF v_coins IS NULL OR v_coins < p_amount THEN RETURN false; END IF;

  UPDATE profiles SET coins = coins - p_amount, updated_at = now() WHERE id = p_booster_id;

  INSERT INTO coin_ledger (user_id, source_type, amount, post_id)
  VALUES (p_booster_id, 'spend', -p_amount, p_post_id);

  INSERT INTO post_boosts (booster_id, post_id, amount)
  VALUES (p_booster_id, p_post_id, p_amount);

  RETURN true;
END;
$$;
