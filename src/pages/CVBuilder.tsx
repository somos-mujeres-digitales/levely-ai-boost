import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/cv-builder/TestimonialsSection";
import { CVBuilderPricing } from "@/components/cv-builder/PricingSection";
import { 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Upload,
  BarChart3,
  Target,
  Lightbulb,
  Shield,
  Zap
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Análisis completo",
    description: "Evaluamos cada sección de tu CV con IA avanzada para identificar fortalezas y áreas de mejora.",
  },
  {
    icon: Lightbulb,
    title: "Sugerencias inteligentes",
    description: "Recibe recomendaciones específicas para mejorar tu redacción, formato y keywords.",
  },
  {
    icon: Target,
    title: "Optimización ATS",
    description: "Asegura que tu CV pase los filtros automáticos que usan las empresas.",
  },
  {
    icon: Zap,
    title: "Resultados instantáneos",
    description: "Obtén tu análisis completo en menos de 60 segundos.",
  },
];

const steps = [
  {
    step: "01",
    title: "Sube tu CV",
    description: "Carga tu currículum en formato PDF o Word.",
  },
  {
    step: "02",
    title: "Análisis IA",
    description: "Nuestra IA evalúa estructura, contenido y palabras clave.",
  },
  {
    step: "03",
    title: "Recibe feedback",
    description: "Obtén recomendaciones detalladas por sección.",
  },
  {
    step: "04",
    title: "Mejora y destaca",
    description: "Implementa los cambios y aumenta tu empleabilidad.",
  },
];

export default function CVBuilder() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-[#F5F5F0]">
        <div className="container-levely">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/30 text-accent text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                CV Builder con IA
              </div>
              
              <h1 className="headline-xl mb-6">
                Convierte tu CV en una herramienta de empleabilidad real.
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8">
                Recibe análisis con IA, recomendaciones claras y oportunidades 
                alineadas a tu perfil profesional.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="lime" size="xl">
                  Analizar mi CV
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Ver ejemplo
                </Button>
              </div>
            </div>

            {/* Visual mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-lime/20">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <div className="w-14 h-14 rounded-xl bg-lime/30 flex items-center justify-center">
                      <Upload className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Sube tu CV</p>
                      <p className="text-sm text-muted-foreground">PDF, Word o texto</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-lime/10 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-sm">Experiencia laboral optimizada</span>
                    </div>
                    <div className="p-4 rounded-xl bg-lime/10 flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-sm">Keywords para tu industria</span>
                    </div>
                    <div className="p-4 rounded-xl bg-lime/10 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                      <span className="text-sm">Analizando habilidades...</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-lime text-lime-foreground text-sm font-semibold shadow-lg">
                ✨ Análisis IA activo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-white">
        <div className="container-levely">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="headline-lg">Cómo funciona el CV Builder</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Cuatro pasos simples para optimizar tu currículum
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-lime/30" />
                )}
                <div className="bg-[#F5F5F0] rounded-2xl p-6 h-full border border-lime/10 hover:border-lime/30 transition-colors">
                  <span className="text-3xl font-extrabold text-lime mb-4 block">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-[#F5F5F0]">
        <div className="container-levely">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="headline-lg">Características del análisis</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Todo lo que necesitas para crear un CV que destaque
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 rounded-2xl border border-lime/20 bg-white hover:border-lime/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-lime/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section-padding bg-white">
        <div className="container-levely">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/20 mb-6">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">Seguridad garantizada</span>
            </div>
            <h2 className="headline-md mb-6">
              Tu información está protegida
            </h2>
            <p className="text-muted-foreground mb-8">
              Utilizamos encriptación de nivel bancario para proteger tus datos. 
              Tu CV solo se procesa para el análisis y nunca se comparte con terceros.
            </p>
            <Button variant="lime" size="lg">
              Comenzar análisis gratuito
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Pricing */}
      <CVBuilderPricing />
    </Layout>
  );
}
