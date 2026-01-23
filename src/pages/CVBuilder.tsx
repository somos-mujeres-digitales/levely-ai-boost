import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TestimonialsSection } from "@/components/cv-builder/TestimonialsSection";
import { HowItWorksSection } from "@/components/cv-builder/HowItWorksSection";
import { HotSaleSection } from "@/components/cv-builder/HotSaleSection";
import { VideoDemoSection } from "@/components/cv-builder/VideoDemoSection";
import { FAQSection } from "@/components/cv-builder/FAQSection";
import { HeroCards } from "@/components/cv-builder/HeroCards";
import {
  FileText,
  ArrowRight,
} from "lucide-react";

export default function CVBuilder() {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-secondary/50 via-background to-purple-50/30 dark:from-background dark:via-slate-900 dark:to-slate-800">
        <div className="container-levely">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/30 text-lime-foreground text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                CV Builder con IA
              </div>
              
              <h1 className="headline-xl mb-6">
                Optimiza tu perfil para el mercado global
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
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

            {/* Interactive Hero Cards */}
            <div className="relative lg:pl-8">
              <HeroCards />
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
