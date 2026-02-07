import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  CheckCircle2, 
  Sparkles, 
  Loader2, 
  CreditCard,
  Shield,
  Zap,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PaywallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  analysisId: string;
}

const starterFeatures = [
  "Feedback completo del CV",
  "Hasta 3 versiones optimizadas",
  "Radar personalizado (5 oportunidades)",
  "Roadmap profesional",
  "Descarga en PDF y Word",
  "8 créditos IA incluidos",
];

const proFeatures = [
  "Todo lo del plan Starter",
  "Radar hasta 10 oportunidades",
  "Recomendaciones por versión",
  "20 créditos IA incluidos",
  "Prioridad en matching",
];

export function PaywallModal({ open, onOpenChange, analysisId }: PaywallModalProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"starter" | "pro">("starter");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState<"select" | "checkout" | "success">("select");

  const handlePurchase = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión");
      return;
    }

    setIsProcessing(true);
    setPaymentStep("checkout");

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const creditsToAdd = selectedPlan === "starter" ? 8 : 20;
      const amount = selectedPlan === "starter" ? 9.90 : 19.90;

      // Create purchase record
      const { error: purchaseError } = await supabase
        .from("purchases")
        .insert({
          user_id: user.id,
          plan_name: selectedPlan,
          amount: amount,
          credits_added: creditsToAdd,
          status: "completed",
          analysis_id: analysisId,
        });

      if (purchaseError) throw purchaseError;

      // Update analysis status to unlocked
      const { error: analysisError } = await supabase
        .from("cv_analyses")
        .update({ status: "unlocked" })
        .eq("id", analysisId);

      if (analysisError) throw analysisError;

      // Update user's credits and plan
      const { data: profile } = await supabase
        .from("profiles")
        .select("credits")
        .eq("user_id", user.id)
        .single();

      const currentCredits = profile?.credits || 0;

      // Get the plan id for the selected plan
      const { data: planData } = await supabase
        .from("plans")
        .select("id")
        .eq("name", selectedPlan === "starter" ? "Starter" : "Pro")
        .single();

      await supabase
        .from("profiles")
        .update({ 
          credits: currentCredits + creditsToAdd,
          plan_id: planData?.id,
        })
        .eq("user_id", user.id);

      setPaymentStep("success");
      toast.success("¡Tu Career Intelligence Report está listo!");

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        onOpenChange(false);
        navigate("/dashboard");
      }, 2000);

    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Error al procesar el pago. Intenta nuevamente.");
      setPaymentStep("select");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        {paymentStep === "success" ? (
          <div className="py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-lime" />
            </div>
            <h2 className="text-2xl font-bold mb-2">¡Pago exitoso!</h2>
            <p className="text-muted-foreground mb-4">
              Tu Career Intelligence Report está listo.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirigiendo al dashboard...
            </p>
          </div>
        ) : paymentStep === "checkout" ? (
          <div className="py-8 text-center">
            <Loader2 className="w-16 h-16 mx-auto text-lime mb-6 animate-spin" />
            <h2 className="text-xl font-bold mb-2">Procesando pago...</h2>
            <p className="text-muted-foreground">
              Por favor espera mientras procesamos tu transacción.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Pago seguro y encriptado</span>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-2xl">
                Desbloquea tu Career Intelligence Report
              </DialogTitle>
            </DialogHeader>

            <div className="grid md:grid-cols-2 gap-4 mt-6">
              {/* Starter Plan */}
              <div 
                className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                  selectedPlan === "starter" 
                    ? "border-lime bg-lime/5" 
                    : "border-border hover:border-lime/50"
                }`}
                onClick={() => setSelectedPlan("starter")}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Starter</h3>
                  {selectedPlan === "starter" && (
                    <CheckCircle2 className="w-5 h-5 text-lime" />
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">S/ 9.90</span>
                  <span className="text-muted-foreground ml-2">pago único</span>
                </div>
                <ul className="space-y-2">
                  {starterFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-lime mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pro Plan */}
              <div 
                className={`relative rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                  selectedPlan === "pro" 
                    ? "border-lime bg-lime/5" 
                    : "border-border hover:border-lime/50"
                }`}
                onClick={() => setSelectedPlan("pro")}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-coral text-white text-xs font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Más popular
                </div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Pro</h3>
                  {selectedPlan === "pro" && (
                    <CheckCircle2 className="w-5 h-5 text-lime" />
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-3xl font-bold">S/ 19.90</span>
                  <span className="text-muted-foreground ml-2">pago único</span>
                </div>
                <ul className="space-y-2">
                  {proFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-lime mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <Button 
                variant="lime" 
                size="lg" 
                className="w-full"
                onClick={handlePurchase}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pagar S/ {selectedPlan === "starter" ? "9.90" : "19.90"}
                  </>
                )}
              </Button>

              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  No es suscripción. No se renueva automáticamente.
                  <br />
                  Pagas solo cuando lo necesitas.
                </p>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Acceso inmediato</span>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
