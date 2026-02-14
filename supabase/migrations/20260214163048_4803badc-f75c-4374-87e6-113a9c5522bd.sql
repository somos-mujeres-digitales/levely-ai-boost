
-- Academy Routes (learning paths)
CREATE TABLE public.academy_routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'empleabilidad',
  level TEXT NOT NULL DEFAULT 'intro',
  duration_hours NUMERIC NOT NULL DEFAULT 0,
  modules_count INTEGER NOT NULL DEFAULT 0,
  cover_image TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_routes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Routes are viewable by authenticated users" ON public.academy_routes FOR SELECT TO authenticated USING (true);

-- Academy Modules
CREATE TABLE public.academy_modules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route_id UUID NOT NULL REFERENCES public.academy_routes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Modules are viewable by authenticated users" ON public.academy_modules FOR SELECT TO authenticated USING (true);

-- Academy Lessons (videos, resources within modules)
CREATE TABLE public.academy_lessons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID NOT NULL REFERENCES public.academy_modules(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'video', -- video, resource, checklist
  video_url TEXT,
  resource_url TEXT,
  duration_minutes INTEGER DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_lessons ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Lessons are viewable by authenticated users" ON public.academy_lessons FOR SELECT TO authenticated USING (true);

-- User Progress
CREATE TABLE public.academy_user_progress (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  route_id UUID NOT NULL REFERENCES public.academy_routes(id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES public.academy_lessons(id) ON DELETE CASCADE,
  completed BOOLEAN NOT NULL DEFAULT false,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, lesson_id)
);

ALTER TABLE public.academy_user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own progress" ON public.academy_user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.academy_user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.academy_user_progress FOR UPDATE USING (auth.uid() = user_id);

-- Academy Resources (downloadable library)
CREATE TABLE public.academy_resources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL DEFAULT 'plantillas',
  file_url TEXT,
  file_type TEXT DEFAULT 'pdf',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Resources are viewable by authenticated users" ON public.academy_resources FOR SELECT TO authenticated USING (true);

-- Academy Experts
CREATE TABLE public.academy_experts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  specialty TEXT,
  photo_url TEXT,
  route_ids UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.academy_experts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Experts are viewable by authenticated users" ON public.academy_experts FOR SELECT TO authenticated USING (true);

-- Seed example routes
INSERT INTO public.academy_routes (title, description, category, level, duration_hours, modules_count, is_published) VALUES
('Primer empleo en UX', 'Aprende todo lo que necesitas para conseguir tu primer empleo en diseño UX, desde portafolio hasta entrevistas.', 'empleabilidad', 'intro', 8, 4, true),
('Primer empleo en Producto', 'Descubre cómo entrar al mundo del Product Management desde cero con una ruta clara y práctica.', 'empleabilidad', 'intro', 10, 5, true),
('Primer empleo en Data', 'Domina las herramientas y habilidades clave para iniciar tu carrera en datos y analytics.', 'empleabilidad', 'intro', 12, 5, true),
('Construye tu Marca Profesional', 'Posiciónate como un profesional destacado con estrategias de personal branding efectivas.', 'marca profesional', 'intermedio', 6, 3, true),
('Mi experiencia como Becaria Chevening', 'Una ruta personal sobre cómo aplicar y ganar una beca internacional transformacional.', 'becas internacionales', 'intro', 4, 3, true),
('Aprende IA para tu carrera', 'Integra herramientas de inteligencia artificial en tu día a día profesional.', 'ia', 'intro', 7, 4, true);

-- Seed modules for "Primer empleo en UX"
INSERT INTO public.academy_modules (route_id, title, description, sort_order)
SELECT r.id, m.title, m.description, m.sort_order
FROM public.academy_routes r,
(VALUES
  ('Fundamentos de UX', 'Entiende los principios del diseño centrado en el usuario', 1),
  ('Construye tu portafolio', 'Crea un portafolio que destaque ante reclutadores', 2),
  ('Preparación para entrevistas', 'Domina las entrevistas técnicas y de cultura', 3),
  ('Tu primer mes en el trabajo', 'Navega los primeros 30 días con confianza', 4)
) AS m(title, description, sort_order)
WHERE r.title = 'Primer empleo en UX';

-- Seed lessons for first module
INSERT INTO public.academy_lessons (module_id, title, type, duration_minutes, sort_order)
SELECT m.id, l.title, l.type, l.duration, l.sort_order
FROM public.academy_modules m,
(VALUES
  ('¿Qué es UX Design?', 'video', 15, 1),
  ('Design Thinking en acción', 'video', 20, 2),
  ('Herramientas esenciales', 'video', 12, 3),
  ('Checklist: Tu setup de UX', 'resource', 0, 4)
) AS l(title, type, duration, sort_order)
WHERE m.title = 'Fundamentos de UX';

-- Seed experts
INSERT INTO public.academy_experts (name, role, specialty) VALUES
('María García', 'Lead UX Designer @ Google', 'UX Design'),
('Carlos Mendoza', 'Product Manager @ Rappi', 'Product Management'),
('Ana Torres', 'Data Lead @ Mercado Libre', 'Data & Analytics'),
('Diego Ruiz', 'Chevening Scholar', 'Becas Internacionales'),
('Laura Chen', 'AI Engineer @ OpenAI', 'Inteligencia Artificial');

-- Seed resources
INSERT INTO public.academy_resources (title, description, category, file_type) VALUES
('Plantilla de CV para UX', 'CV optimizado para roles de diseño', 'plantillas', 'pdf'),
('Checklist de entrevistas', 'Lista de verificación pre-entrevista', 'checklists', 'pdf'),
('Roadmap Data Analyst', 'Ruta visual para ser Data Analyst', 'roadmaps', 'pdf'),
('Guía de Personal Branding', 'Paso a paso para construir tu marca', 'plantillas', 'pdf'),
('Template de Application para Becas', 'Formato de aplicación optimizado', 'plantillas', 'pdf');
