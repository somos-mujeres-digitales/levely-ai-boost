import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-levely">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#19282D] via-[#1e3338] to-[#19282D] p-12 sm:p-16 lg:p-20 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-coral/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lime/10 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8">
              <Sparkles className="w-4 h-4 text-lime" />
              <span className="text-sm font-medium text-white/90">Tu futuro empieza hoy</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              El talento que buscas,<br />
              <span className="text-lime">a un click de distancia</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-white/70 max-w-xl mx-auto mb-10">
              Únete a la comunidad de profesionales que están transformando su carrera con inteligencia artificial.
            </p>
            
            <Button 
              size="xl" 
              className="bg-lime text-lime-foreground hover:bg-lime/90 font-bold text-lg px-10"
            >
              Empezar gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
