-- Create plans table
CREATE TABLE public.plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  max_cvs INTEGER NOT NULL DEFAULT 3,
  max_opportunities INTEGER NOT NULL DEFAULT 5,
  max_evaluations INTEGER NOT NULL DEFAULT 3,
  has_radar_pro BOOLEAN NOT NULL DEFAULT false,
  has_community BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert default plans
INSERT INTO public.plans (name, price, max_cvs, max_opportunities, max_evaluations, has_radar_pro, has_community) VALUES
  ('Starter', 9.90, 3, 5, 3, false, false),
  ('Pro', 19.90, 10, 10, 10, true, true);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  plan_id UUID REFERENCES public.plans(id),
  credits INTEGER NOT NULL DEFAULT 0,
  employability_score INTEGER DEFAULT 0,
  industry TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create CVs table
CREATE TABLE public.cvs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  content JSONB,
  file_url TEXT,
  is_optimized BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create evaluations table
CREATE TABLE public.evaluations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  cv_id UUID REFERENCES public.cvs(id) ON DELETE CASCADE,
  score INTEGER,
  status TEXT NOT NULL DEFAULT 'pending',
  feedback JSONB,
  growth_areas JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create opportunities table
CREATE TABLE public.opportunities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  company TEXT,
  type TEXT NOT NULL, -- 'trabajo', 'beca', 'pasantia'
  location TEXT,
  is_remote BOOLEAN NOT NULL DEFAULT false,
  country TEXT,
  deadline DATE,
  match_score INTEGER,
  is_viewed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create usage_stats table
CREATE TABLE public.usage_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  cvs_created INTEGER NOT NULL DEFAULT 0,
  evaluations_used INTEGER NOT NULL DEFAULT 0,
  opportunities_viewed INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_stats ENABLE ROW LEVEL SECURITY;

-- Plans: everyone can read
CREATE POLICY "Plans are viewable by everyone" ON public.plans FOR SELECT USING (true);

-- Profiles: users can manage their own
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- CVs: users can manage their own
CREATE POLICY "Users can view own cvs" ON public.cvs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cvs" ON public.cvs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cvs" ON public.cvs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cvs" ON public.cvs FOR DELETE USING (auth.uid() = user_id);

-- Evaluations: users can manage their own
CREATE POLICY "Users can view own evaluations" ON public.evaluations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own evaluations" ON public.evaluations FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Opportunities: users can manage their own
CREATE POLICY "Users can view own opportunities" ON public.opportunities FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own opportunities" ON public.opportunities FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own opportunities" ON public.opportunities FOR UPDATE USING (auth.uid() = user_id);

-- Usage stats: users can manage their own
CREATE POLICY "Users can view own usage" ON public.usage_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own usage" ON public.usage_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own usage" ON public.usage_stats FOR UPDATE USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  starter_plan_id UUID;
BEGIN
  -- Get starter plan ID
  SELECT id INTO starter_plan_id FROM public.plans WHERE name = 'Starter' LIMIT 1;
  
  -- Create profile
  INSERT INTO public.profiles (user_id, full_name, plan_id, credits)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', 'Explorador'), starter_plan_id, 0);
  
  -- Create usage stats
  INSERT INTO public.usage_stats (user_id) VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to get user plan limits
CREATE OR REPLACE FUNCTION public.get_user_plan_limits(p_user_id UUID)
RETURNS TABLE(
  plan_name TEXT,
  max_cvs INTEGER,
  max_opportunities INTEGER,
  max_evaluations INTEGER,
  has_radar_pro BOOLEAN,
  has_community BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    pl.name,
    pl.max_cvs,
    pl.max_opportunities,
    pl.max_evaluations,
    pl.has_radar_pro,
    pl.has_community
  FROM public.profiles pr
  JOIN public.plans pl ON pr.plan_id = pl.id
  WHERE pr.user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_cvs_updated_at BEFORE UPDATE ON public.cvs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_usage_stats_updated_at BEFORE UPDATE ON public.usage_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();