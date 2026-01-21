import { Brain, TrendingUp, Users, Shield, Clock, Award } from "lucide-react";

const benefits = [
  {
    icon: Brain,
    title: "Análisis con IA avanzada",
    description: "Nuestra IA evalúa tu perfil y te da feedback actionable para destacar.",
  },
  {
    icon: TrendingUp,
    title: "Mejora tu empleabilidad",
    description: "Aumenta tus chances de conseguir entrevistas con un CV optimizado.",
  },
  {
    icon: Users,
    title: "Oportunidades personalizadas",
    description: "Recibe recomendaciones de trabajos y becas alineadas a tu perfil.",
  },
  {
    icon: Shield,
    title: "Datos seguros",
    description: "Tu información está protegida con los más altos estándares de seguridad.",
  },
  {
    icon: Clock,
    title: "Resultados en minutos",
    description: "Obtén tu análisis completo y recomendaciones en menos de 5 minutos.",
  },
  {
    icon: Award,
    title: "Validación profesional",
    description: "Metodología respaldada por expertos en recursos humanos y reclutamiento.",
  },
];

export function BenefitsSection() {
  return (
    <section className="section-padding">
      <div className="container-levely">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="headline-lg">
            Por qué elegir{" "}
            <span className="text-gradient">Levely</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Herramientas diseñadas para impulsar tu carrera profesional
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="p-6 rounded-2xl border border-border bg-card hover:border-blue/30 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center mb-4 group-hover:bg-blue/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-blue" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
