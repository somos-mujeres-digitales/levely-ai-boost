import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-levely">
        <div className="relative overflow-hidden rounded-3xl gradient-hero border border-border p-8 sm:p-12 lg:p-16 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-2xl mx-auto">
            <h2 className="headline-lg mb-6">
              ¿Listo para impulsar tu carrera?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Únete a miles de profesionales que ya están optimizando su perfil con Levely.
            </p>
            <Button variant="hero" size="xl">
              Empezar ahora
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
