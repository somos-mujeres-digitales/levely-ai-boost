import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useAcademyMembership } from "@/hooks/useAcademyData";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Calendar, Users, BookOpen, Video, ArrowRight, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const features = [
  { icon: BookOpen, text: "Acceso ilimitado a todas las rutas" },
  { icon: Video, text: "Masterclasses y workshops en vivo" },
  { icon: Users, text: "Comunidad privada de profesionales" },
  { icon: Calendar, text: "Eventos exclusivos mensuales" },
  { icon: Sparkles, text: "Recursos y plantillas descargables" },
  { icon: Zap, text: "Roadmap personalizado de carrera" },
];

export default function AcademyPricing() {
  const { user } = useAuth();
  const { data: membership, isLoading } = useAcademyMembership();
  const queryClient = useQueryClient();

  const isActive = membership?.status === "active";

  const handleSubscribe = async () => {
    if (!user) {
      toast.error("Inicia sesión para suscribirte");
      return;
    }
    // Simulated purchase
    const { error } = await supabase.from("academy_memberships").insert({
      user_id: user.id,
      plan: "annual",
      status: "active",
      price_usd: 49,
    });
    if (error) {
      toast.error("Error al procesar. Intenta de nuevo.");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["academy_membership"] });
    toast.success("¡Bienvenido a Academy Pro! 🎉");
  };

  return (
    <AcademyLayout>
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Hero */}
        <div className="text-center space-y-4 pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" /> Academy Pro
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Invierte en tu transformación
          </h1>
          <p className="text-foreground/50 max-w-lg mx-auto">
            Accede a todo el contenido, eventos en vivo y comunidad por un precio accesible.
          </p>
        </div>

        {/* Pricing card */}
        <div className="max-w-md mx-auto">
          <div className="rounded-3xl border-2 border-accent/30 bg-card p-8 relative overflow-hidden">
            {/* Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold uppercase tracking-wider">
              Más popular
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-bold text-foreground mb-1">Plan Anual</h3>
              <p className="text-sm text-foreground/40">Todo lo que necesitas para crecer</p>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-5xl font-black text-foreground">$49</span>
              <span className="text-foreground/40 text-sm">/año</span>
            </div>
            <p className="text-xs text-foreground/30 mb-8">
              Solo $4.08/mes · Menos que un café semanal ☕
            </p>

            <div className="space-y-3 mb-8">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-accent" />
                  </div>
                  <span className="text-sm text-foreground/70">{f.text}</span>
                </div>
              ))}
            </div>

            {isActive ? (
              <div className="text-center">
                <div className="px-6 py-3 rounded-full bg-accent/10 text-accent font-semibold text-sm">
                  ✓ Tienes acceso activo
                </div>
                <p className="text-xs text-foreground/30 mt-2">
                  Expira: {membership?.expires_at ? new Date(membership.expires_at).toLocaleDateString() : "—"}
                </p>
              </div>
            ) : (
              <Button
                variant="accent"
                size="lg"
                className="w-full"
                onClick={handleSubscribe}
                disabled={isLoading}
              >
                Comenzar ahora <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Social proof */}
        <div className="text-center space-y-2 pb-8">
          <p className="text-sm text-foreground/40">
            +200 profesionales ya están transformando su carrera
          </p>
          <p className="text-xs text-foreground/25">
            Garantía de 7 días · Cancela cuando quieras
          </p>
        </div>
      </div>
    </AcademyLayout>
  );
}
