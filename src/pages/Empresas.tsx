import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Building, 
  ArrowRight,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Zap,
  Target
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Reduce tiempo de contratación",
    description: "Accede a candidatos pre-validados con perfiles optimizados que se ajustan a tus necesidades.",
  },
  {
    icon: Shield,
    title: "Candidatos verificados",
    description: "Cada perfil ha sido analizado por IA para garantizar la calidad de la información.",
  },
  {
    icon: TrendingUp,
    title: "Mejores matches",
    description: "Nuestro algoritmo conecta tu oferta con los candidatos más relevantes.",
  },
  {
    icon: Zap,
    title: "Proceso ágil",
    description: "Simplifica tu pipeline de reclutamiento con herramientas inteligentes.",
  },
];

const features = [
  "Acceso a base de talento verificado",
  "Filtros avanzados por habilidades",
  "Perfiles optimizados y completos",
  "Métricas de compatibilidad",
  "Comunicación directa con candidatos",
  "Dashboard de seguimiento",
];

export default function Empresas() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding gradient-hero">
        <div className="container-levely">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Building className="w-4 h-4" />
                Para empresas
              </div>
              
              <h1 className="headline-xl mb-6">
                Encuentra el{" "}
                <span className="text-gradient">talento ideal</span>{" "}
                más rápido
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8">
                Accede a una base de candidatos con perfiles optimizados y validados por IA. 
                Reduce costos y tiempo en tu proceso de contratación.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="xl">
                  Publicar vacante
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Hablar con ventas
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-elevated text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">-40%</p>
                <p className="text-sm text-muted-foreground">Tiempo de contratación</p>
              </div>
              <div className="card-elevated text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">+2K</p>
                <p className="text-sm text-muted-foreground">Candidatos activos</p>
              </div>
              <div className="card-elevated text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">95%</p>
                <p className="text-sm text-muted-foreground">Satisfacción</p>
              </div>
              <div className="card-elevated text-center">
                <p className="text-4xl font-extrabold text-accent mb-2">24h</p>
                <p className="text-sm text-muted-foreground">Primeros matches</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-levely">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="headline-lg">¿Por qué Levely para empresas?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Optimiza tu proceso de reclutamiento con tecnología
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-4 p-6 rounded-2xl border border-border bg-card hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-secondary/30">
        <div className="container-levely">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="headline-lg mb-6">
                Todo lo que necesitas para reclutar mejor
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Herramientas diseñadas para simplificar cada etapa del proceso de contratación.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-elevated">
              <div className="flex items-center gap-4 pb-4 border-b border-border mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="font-semibold">Match Score</p>
                  <p className="text-sm text-muted-foreground">Compatibilidad candidato-puesto</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {["Desarrollo Frontend", "Marketing Digital", "Data Science"].map((role, i) => (
                  <div key={role} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-accent" />
                      </div>
                      <span className="font-medium">{role}</span>
                    </div>
                    <span className="text-sm font-bold text-accent">
                      {[12, 8, 15][i]} matches
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-levely">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="headline-lg mb-6">
              Comienza a reclutar de forma inteligente
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Agenda una demo con nuestro equipo y descubre cómo Levely 
              puede transformar tu proceso de contratación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl">
                Agendar demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                Ver planes empresariales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
