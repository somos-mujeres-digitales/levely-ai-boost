
-- Create academy_events table
CREATE TABLE public.academy_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL DEFAULT 'webinar', -- webinar, workshop, masterclass, networking
  speaker_name TEXT,
  speaker_role TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  duration_minutes INT DEFAULT 60,
  cover_image TEXT,
  meeting_url TEXT,
  is_recorded BOOLEAN DEFAULT false,
  recording_url TEXT,
  max_attendees INT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published events"
  ON public.academy_events FOR SELECT
  USING (is_published = true);

-- Create academy_memberships table for $49/year subscriptions
CREATE TABLE public.academy_memberships (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plan TEXT NOT NULL DEFAULT 'annual', -- annual
  status TEXT NOT NULL DEFAULT 'active', -- active, expired, cancelled
  price_usd NUMERIC NOT NULL DEFAULT 49,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + interval '1 year'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_memberships ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own membership"
  ON public.academy_memberships FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own membership"
  ON public.academy_memberships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create event registrations table
CREATE TABLE public.academy_event_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  event_id UUID NOT NULL REFERENCES public.academy_events(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, event_id)
);

ALTER TABLE public.academy_event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own registrations"
  ON public.academy_event_registrations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON public.academy_event_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);
