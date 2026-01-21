import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "S/ 9.90",
    credits: "3 créditos",
    popular: false,
    cta: "Empezar",
  },
  {
    name: "Pro",
    price: "S/ 19.90",
    credits: "10 créditos",
    popular: true,
    cta: "Comprar créditos",
  },
  {
    name: "Advanced",
    price: "S/ 49.00",
    credits: "25 créditos",
    popular: false,
    cta: "Comprar créditos",
  },
];

export function CVBuilderPricing() {
  return (
    <section className="section-padding bg-[#F5F5F0]">
      <div className="container-levely">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="headline-lg">Precios del CV Builder</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Compra créditos y analiza tu CV cuando lo necesites
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-accent text-accent-foreground scale-105 shadow-2xl"
                  : "bg-white border border-lime/20 hover:border-lime/40 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-lime text-lime-foreground text-xs font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Más popular
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                </div>
                <p className={`text-sm mb-6 ${plan.popular ? "text-accent-foreground/70" : "text-muted-foreground"}`}>
                  {plan.credits}
                </p>

                <Button
                  variant={plan.popular ? "secondary" : "lime"}
                  className={`w-full ${plan.popular ? "bg-accent-foreground text-accent hover:bg-accent-foreground/90" : ""}`}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Credits explanation */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 border border-lime/20 text-center">
            <h3 className="text-lg font-bold mb-4">¿Cómo funcionan los créditos?</h3>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>
                Los créditos se utilizan solo cuando usas una herramienta.
                No es una suscripción y no se renueva automáticamente.
              </p>
              <p>
                Por ejemplo, puedes usar tus créditos para analizar tu CV.
                Si necesitas otro análisis, simplemente compras más créditos.
              </p>
              <p className="font-medium text-foreground">
                Pagas únicamente por lo que usas, cuando lo necesitas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
