import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  ArrowRight,
  Calendar,
  Users,
  Zap,
  CheckCircle2,
  Award,
  Target,
  BookOpen,
  MessageCircle
} from "lucide-react";

const programWeeks = [
  {
    week: "Semana 1",
    title: "Autoconocimiento y Posicionamiento",
    items: [
      "Identificación de fortalezas y áreas de desarrollo",
      "Definición de objetivos profesionales",
      "Análisis de mercado laboral",
    ],
  },
  {
    week: "Semana 2",
    title: "Perfil Profesional",
    items: [
      "Optimización de CV con IA",
      "Creación de LinkedIn estratégico",
      "Desarrollo de marca personal",
    ],
  },
  {
    week: "Semana 3",
    title: "Estrategia de Búsqueda",
    items: [
      "Técnicas de networking efectivo",
      "Preparación para entrevistas",
      "Simulaciones y feedback",
    ],
  },
  {
    week: "Semana 4",
    title: "Acción y Lanzamiento",
    items: [
      "Aplicación estratégica a oportunidades",
      "Seguimiento y negociación",
      "Plan de desarrollo continuo",
    ],
  },
];

const benefits = [
  {
    icon: Users,
    title: "Mentoría 1:1",
    description: "Sesiones individuales con mentores expertos en tu área.",
  },
  {
    icon: Zap,
    title: "Herramientas IA",
    description: "Acceso completo a todas las herramientas de optimización.",
  },
  {
    icon: BookOpen,
    title: "Material exclusivo",
    description: "Guías, templates y recursos diseñados por expertos.",
  },
  {
    icon: MessageCircle,
    title: "Comunidad",
    description: "Acceso a una red de profesionales en crecimiento.",
  },
];

export default function CareerAccelerator() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-[#19282D] text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-coral/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-coral/20 rounded-full blur-3xl" />
        </div>

        <div className="container-levely relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/20 text-coral text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Programa Premium
            </div>
            
            <h1 className="headline-xl mb-6">
              Career Accelerator
            </h1>
            
            <p className="text-xl text-white/80 mb-8">
              Un programa intensivo de 4 semanas para acelerar tu crecimiento profesional 
              con mentores expertos, herramientas de IA y una metodología probada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="xl"
                className="bg-coral text-white hover:bg-coral/90"
              >
                Reservar plaza
                <ArrowRight className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/90">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Inicio: 15 de Febrero 2025</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-coral" />
                <span>4 semanas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-coral" />
                <span>Grupos reducidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-coral" />
                <span>Certificación</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program structure */}
      <section className="section-padding bg-secondary dark:bg-[#19282D]">
        <div className="container-levely">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="headline-lg">Estructura del programa</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Un recorrido diseñado para maximizar tu empleabilidad
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {programWeeks.map((week) => (
              <div
                key={week.week}
                className="bg-card p-6 sm:p-8 rounded-2xl border border-coral/10 hover:border-coral/30 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-sm font-bold text-coral mb-2 block">
                  {week.week}
                </span>
                <h3 className="text-xl font-bold mb-4">{week.title}</h3>
                <ul className="space-y-3">
                  {week.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-coral mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-background">
        <div className="container-levely">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="headline-lg">¿Qué incluye?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Todo lo que necesitas para acelerar tu carrera
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-coral/50 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-coral/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating number */}
                <span className="absolute top-4 right-4 text-6xl font-bold text-coral/10 group-hover:text-coral/20 transition-colors">
                  0{index + 1}
                </span>
                
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-coral to-coral/80 flex items-center justify-center mb-5 shadow-lg shadow-coral/20 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary dark:bg-[#19282D]">
        <div className="container-levely">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 mb-6">
              <Target className="w-4 h-4 text-coral" />
              <span className="text-sm font-medium text-coral">Próxima cohorte</span>
            </div>
            <h2 className="headline-lg mb-6">
              ¿Listo para acelerar tu carrera?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Las plazas son limitadas. Reserva tu lugar en la próxima cohorte 
              y comienza tu transformación profesional.
            </p>
            <Button size="xl" className="bg-coral text-white hover:bg-coral/90">
              Reservar mi plaza
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
