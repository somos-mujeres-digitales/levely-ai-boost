import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  "Análisis completo de tu CV actual",
  "Sugerencias de mejora por sección",
  "Detección de keywords para ATS",
  "Recomendaciones de formato",
];

export function CVBuilderPreview() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="container-levely">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              Producto principal
            </div>
            
            <h2 className="headline-lg mb-6">
              CV Builder con IA
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8">
              Analiza y optimiza tu currículum con inteligencia artificial. 
              Recibe feedback instantáneo y recomendaciones personalizadas 
              para destacar ante reclutadores.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/cv-builder">
              <Button variant="accent" size="lg">
                Probar CV Builder
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="card-elevated p-8 lg:p-10">
              {/* Mock CV analysis UI */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">mi-cv.pdf</p>
                      <p className="text-sm text-muted-foreground">Analizando...</p>
                    </div>
                  </div>
                  <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Puntuación general</span>
                      <span className="text-sm font-bold text-accent">85/100</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full w-[85%] bg-accent rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">Experiencia</p>
                      <p className="text-lg font-bold">Excelente</p>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground mb-1">Keywords</p>
                      <p className="text-lg font-bold">12 detectadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm font-medium shadow-lg animate-float">
              ✨ IA activa
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
