import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden gradient-hero">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-levely relative">
        <div className="flex flex-col items-center text-center py-20 sm:py-28 lg:py-36">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              Potenciado por IA
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="headline-xl max-w-4xl text-balance animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            Optimiza tu perfil y vuélvete hasta{" "}
            <span className="text-gradient">10× más empleable</span>{" "}
            con IA.
          </h1>

          {/* Subheadline */}
          <p 
            className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl text-balance animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            Accede a prácticas, trabajos y becas con guía inteligente y oportunidades alineadas a tu perfil.
          </p>

          {/* CTA */}
          <div 
            className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl">
              Empezar
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
            <Button variant="outline" size="xl">
              Ver cómo funciona
            </Button>
          </div>

          {/* Social proof */}
          <div 
            className="mt-16 flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-accent/40 border-2 border-background flex items-center justify-center text-xs font-medium"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p>
              <span className="font-semibold text-foreground">+2,000</span> profesionales ya optimizaron su perfil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
