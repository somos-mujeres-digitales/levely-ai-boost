import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket, Calendar, Users, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const highlights = [
  { icon: Calendar, text: "4 semanas intensivas" },
  { icon: Users, text: "Mentoría 1:1" },
  { icon: Zap, text: "Herramientas IA" },
];

export function CareerAcceleratorTeaser() {
  return (
    <section className="section-padding">
      <div className="container-levely">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <Rocket className="w-6 h-6 text-accent-foreground" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-foreground/70">
                Programa Premium
              </span>
            </div>

            <h2 className="headline-lg max-w-2xl mb-6">
              Career Accelerator
            </h2>

            <p className="text-lg text-primary-foreground/80 max-w-xl mb-8">
              Un programa intensivo de 4 semanas diseñado para acelerar tu crecimiento profesional 
              con mentores expertos y herramientas de IA.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              {highlights.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>

            <Link to="/career-accelerator">
              <Button
                variant="secondary"
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Conocer más
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
