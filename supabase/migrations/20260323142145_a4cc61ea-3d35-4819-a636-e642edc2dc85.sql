
-- Tighten waitlist insert policy to require email
DROP POLICY "Anyone can insert to waitlist" ON public.waitlist;
CREATE POLICY "Anyone can insert to waitlist with email" ON public.waitlist FOR INSERT WITH CHECK (email IS NOT NULL AND email <> '');
