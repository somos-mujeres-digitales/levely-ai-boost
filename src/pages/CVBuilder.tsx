import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/cv-builder/TestimonialsSection";
import { HowItWorksSection } from "@/components/cv-builder/HowItWorksSection";
import { HotSaleSection } from "@/components/cv-builder/HotSaleSection";
import { VideoDemoSection } from "@/components/cv-builder/VideoDemoSection";
import { FAQSection } from "@/components/cv-builder/FAQSection";
import cvBuilderHeroMockup from "@/assets/cv-builder-hero-abstract.png";
import {
  FileText,
  ArrowRight,
} from "lucide-react";

export default function CVBuilder() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary/30 dark:bg-background">
        <div className="container-levely">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/30 text-lime-foreground text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                CV Builder con IA
              </div>
              
              <h1 className="headline-xl mb-6">
                Optimiza tu perfil para el mercado global
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

            {/* Visual mockup - New innovative image */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={cvBuilderHeroMockup} 
                  alt="CV Builder AI Analysis Dashboard" 
                  className="w-full h-auto"
                />
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-lime/20 via-transparent to-transparent pointer-events-none" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-lime text-lime-foreground text-sm font-semibold shadow-lg">
                ✨ Análisis IA activo
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hot Sale Section */}
      <HotSaleSection />

      {/* Video Demo Section */}
      <VideoDemoSection />

      {/* How it works */}
      <HowItWorksSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ */}
      <FAQSection />
    </Layout>
  );
}
