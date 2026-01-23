import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroBgLight from "@/assets/hero-bg-light.png";
import heroBgDark from "@/assets/hero-bg-dark.png";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background images for light/dark mode */}
      <div className="absolute inset-0">
        <img
          src={heroBgLight}
          alt=""
          className="absolute inset-0 w-full h-full object-cover dark:opacity-0 opacity-100 transition-opacity duration-500"
        />
        <img
          src={heroBgDark}
          alt=""
          className="absolute inset-0 w-full h-full object-cover dark:opacity-100 opacity-0 transition-opacity duration-500"
        />
      </div>

      <div className="container-levely relative z-10">
        <div className="flex flex-col items-center text-center py-20 sm:py-28 lg:py-36">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue/10 border border-blue/20 mb-8 animate-fade-up backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue" />
            <span className="text-sm font-medium text-foreground">
              Potenciado por IA
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="headline-xl max-w-4xl text-balance animate-fade-up text-[#1b292d] dark:text-white"
            style={{ animationDelay: "0.1s" }}
          >
            Convierte tu perfil en oportunidades reales
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
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button variant="hero" size="xl">
              Empezar
              <ArrowRight className="w-5 h-5 ml-1" />
            </Button>
          </div>

          {/* Social proof */}
          <div 
            className="mt-16 flex flex-col sm:flex-row items-center gap-6 text-sm text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex -space-x-2">
              {[
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Usuario ${i + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p>
              <span className="font-semibold text-foreground">+500</span> profesionales ya optimizaron su perfil
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
