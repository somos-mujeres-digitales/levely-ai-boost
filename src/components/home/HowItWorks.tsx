import { Upload, Zap, Target } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Sube tu CV",
    description: "Carga tu currículum actual y nuestro sistema lo analizará en segundos.",
  },
  {
    icon: Zap,
    step: "02",
    title: "Recibe análisis IA",
    description: "Obtén recomendaciones personalizadas para optimizar cada sección de tu perfil.",
  },
  {
    icon: Target,
    step: "03",
    title: "Accede a oportunidades",
    description: "Conecta con prácticas, trabajos y becas alineados a tu perfil optimizado.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-levely">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="headline-lg">Cómo funciona Levely</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tres pasos simples para transformar tu perfil profesional
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-border" />
              )}
              
              <div className="card-elevated transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center mb-6 group-hover:bg-blue/20 transition-colors">
                  <item.icon className="w-6 h-6 text-blue" />
                </div>

                {/* Step number */}
                <span className="text-sm font-bold text-blue mb-2 block">
                  Paso {item.step}
                </span>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
