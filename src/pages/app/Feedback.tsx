import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useEvaluations, useProfile, usePlan, useUsageStats } from "@/hooks/useUserData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, CheckCircle2, Clock, AlertCircle, Lock, Sparkles, ArrowRight } from "lucide-react";

export default function Feedback() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: evaluations, isLoading } = useEvaluations();
  const { data: profile } = useProfile();
  const { data: plan } = usePlan(profile?.plan_id ?? null);
  const { data: usageStats } = useUsageStats();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const maxEvaluations = plan?.max_evaluations || 3;
  const evaluationsUsed = usageStats?.evaluations_used || 0;
  const isAtLimit = evaluationsUsed >= maxEvaluations;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-lime" />;
      case "pending":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completado";
      case "pending":
        return "En proceso";
      case "failed":
        return "Error";
      default:
        return status;
    }
  };

  if (loading || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Mis Evaluaciones</h1>
            <p className="text-muted-foreground">
              Análisis y feedback de tus CVs
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              {evaluationsUsed}/{maxEvaluations} usadas
            </Badge>
            <Button 
              variant="accent" 
              disabled={isAtLimit}
            >
              <Zap className="h-4 w-4 mr-2" />
              Nueva Evaluación
            </Button>
          </div>
        </div>

        {/* Limit Warning */}
        {isAtLimit && (
          <div className="mb-6 p-5 rounded-xl bg-coral/10 border border-coral/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-coral" />
              <div>
                <span className="font-semibold text-coral">Límite alcanzado</span>
                <p className="text-sm text-muted-foreground">
                  Mejora a Pro para obtener más evaluaciones y re-análisis
                </p>
              </div>
            </div>
            <Button size="sm" className="bg-coral hover:bg-coral/90" asChild>
              <Link to="/dashboard/creditos">
                <Sparkles className="h-4 w-4 mr-2" />
                Mejorar a Pro
              </Link>
            </Button>
          </div>
        )}

        {/* Evaluations List */}
        {evaluations && evaluations.length > 0 ? (
          <div className="space-y-4">
            {evaluations.map((evaluation) => (
              <div 
                key={evaluation.id} 
                className="bg-card border border-border rounded-xl p-5 hover:border-lime/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-secondary">
                      <MessageSquare className="h-5 w-5 text-lime" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">Evaluación de CV</h3>
                        <Badge variant="outline" className="text-xs">
                          {getStatusIcon(evaluation.status)}
                          <span className="ml-1">{getStatusText(evaluation.status)}</span>
                        </Badge>
                      </div>
                      {evaluation.score !== null && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl font-bold text-lime">{evaluation.score}%</span>
                          <span className="text-sm text-muted-foreground">Score de empleabilidad</span>
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {new Date(evaluation.created_at).toLocaleDateString("es-PE", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>
                  {evaluation.status === "completed" && (
                    <Button variant="outline" size="sm">
                      Ver detalles
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No tienes evaluaciones</h3>
            <p className="text-muted-foreground mb-6">
              Sube un CV para recibir tu primera evaluación con IA
            </p>
            <Button variant="accent" asChild>
              <Link to="/dashboard/cvs">
                <Zap className="h-4 w-4 mr-2" />
                Evaluar mi CV
              </Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
