-- Create cv_analyses table for tracking CV analysis status and results
CREATE TABLE public.cv_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  cv_id UUID REFERENCES public.cvs(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'processing' CHECK (status IN ('processing', 'preview_available', 'locked', 'unlocked')),
  employability_score INTEGER,
  preview_insight TEXT,
  preview_growth_area TEXT,
  preview_opportunity JSONB,
  full_feedback JSONB,
  recommendations JSONB,
  opportunities JSONB,
  roadmap JSONB,
  optimized_versions JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cv_analyses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own analyses"
ON public.cv_analyses
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analyses"
ON public.cv_analyses
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own analyses"
ON public.cv_analyses
FOR UPDATE
USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE TRIGGER update_cv_analyses_updated_at
BEFORE UPDATE ON public.cv_analyses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create purchases table for tracking payments
CREATE TABLE public.purchases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  credits_added INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  analysis_id UUID REFERENCES public.cv_analyses(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on purchases
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;

-- Create policies for purchases
CREATE POLICY "Users can view their own purchases"
ON public.purchases
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own purchases"
ON public.purchases
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own purchases"
ON public.purchases
FOR UPDATE
USING (auth.uid() = user_id);