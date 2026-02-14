
ALTER TABLE public.academy_experts
  ADD COLUMN IF NOT EXISTS email text,
  ADD COLUMN IF NOT EXISTS linkedin_url text,
  ADD COLUMN IF NOT EXISTS bio text,
  ADD COLUMN IF NOT EXISTS specialties text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS industries text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS languages text[] DEFAULT '{}';
