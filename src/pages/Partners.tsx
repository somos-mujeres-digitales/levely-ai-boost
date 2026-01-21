import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { LogosSection } from "@/components/partners/LogosSection";
import { 
  GraduationCap, 
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Users,
  Award,
  Building2,
  Handshake
} from "lucide-react";

const benefits = [
  {
    icon: BarChart3,
    title: "Mejora los índices de empleabilidad",
    description: "Ayuda a tus estudiantes a destacar en el mercado laboral con herramientas de optimización de CV.",
  },
  {
    icon: Users,
    title: "Seguimiento de estudiantes",
    description: "Dashboard para monitorear el progreso y empleabilidad de tu comunidad estudiantil.",
  },
  {
    icon: Award,
    title: "Certificaciones y badges",
    description: "Ofrece reconocimientos verificables que validan las competencias de tus graduados.",
  },
  {
    icon: Handshake,
    title: "Conexión con empresas",
    description: "Facilita el match entre tus estudiantes y empresas buscando talento.",
  },
];

const partnerTypes = [
  {
    icon: GraduationCap,
    title: "Universidades",
    description: "Mejora las métricas de empleabilidad de tus egresados.",
  },
  {
    icon: Building2,
    title: "Institutos",
    description: "Potencia la inserción laboral de tus estudiantes técnicos.",
  },
  {
    icon: Award,
    title: "Bootcamps",
    description: "Aumenta el value prop de tus programas intensivos.",
  },
];

export default function Partners() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding gradient-hero">
        <div className="container-levely">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              Para instituciones educativas
            </div>
            
            <h1 className="headline-xl mb-6">
              Impulsa la empleabilidad de tus estudiantes
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Únete a la red de instituciones que utilizan Levely para mejorar 
              los resultados de empleabilidad y posicionar a sus graduados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="xl">
                Solicitar demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg">
                Descargar brochure
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <LogosSection />

      {/* Partner types */}
      <section className="section-padding">
        <div className="container-levely">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="headline-lg">¿Para quién es?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Soluciones adaptadas a diferentes tipos de instituciones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {partnerTypes.map((type) => (
              <div
                key={type.title}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <type.icon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                <p className="text-muted-foreground">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-secondary/30">
        <div className="container-levely">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="headline-lg">Beneficios para partners</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Herramientas y métricas para impulsar el éxito de tus estudiantes
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="flex gap-4 p-6 rounded-2xl border border-border bg-card"
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

      {/* CTA */}
      <section className="section-padding">
        <div className="container-levely">
          <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-2xl mx-auto">
              <h2 className="headline-lg mb-6">
                Conviértete en partner de Levely
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Agenda una llamada con nuestro equipo para explorar cómo podemos 
                ayudar a mejorar los resultados de empleabilidad de tu institución.
              </p>
              <Button 
                size="xl"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Agendar llamada
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
