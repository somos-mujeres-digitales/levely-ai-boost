import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useCVs, useProfile, usePlan, useUsageStats } from "@/hooks/useUserData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Plus, CheckCircle2, Clock, MoreVertical, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CVs() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: cvs, isLoading } = useCVs();
  const { data: profile } = useProfile();
  const { data: plan } = usePlan(profile?.plan_id ?? null);
  const { data: usageStats } = useUsageStats();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const maxCVs = plan?.max_cvs || 3;
  const cvsCreated = usageStats?.cvs_created || 0;
  const isAtLimit = cvsCreated >= maxCVs;

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
            <h1 className="text-2xl font-bold mb-1">Mis CVs</h1>
            <p className="text-muted-foreground">
              Gestiona y optimiza tus currículums
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              {cvsCreated}/{maxCVs} creados
            </Badge>
            <Button 
              variant="accent" 
              disabled={isAtLimit}
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear CV
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
                  Mejora a Pro para crear más CVs
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

        {/* CVs Grid */}
        {cvs && cvs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cvs.map((cv) => (
              <div 
                key={cv.id} 
                className="bg-card border border-border rounded-xl p-5 hover:border-lime/30 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-secondary">
                    <FileText className="h-6 w-6 text-lime" />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-secondary">
                        <MoreVertical className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Descargar PDF</DropdownMenuItem>
                      <DropdownMenuItem>Descargar Word</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <h3 className="font-semibold mb-2">{cv.title}</h3>
                <div className="flex items-center gap-2 mb-3">
                  {cv.is_optimized ? (
                    <Badge variant="outline" className="text-xs text-lime border-lime/30">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Optimizado
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      Pendiente
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Actualizado: {new Date(cv.updated_at).toLocaleDateString("es-PE", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  })}
                </p>
              </div>
            ))}

            {/* Create New Card */}
            {!isAtLimit && (
              <button className="border-2 border-dashed border-border rounded-xl p-5 hover:border-lime/50 transition-all flex flex-col items-center justify-center min-h-[180px] text-muted-foreground hover:text-foreground">
                <Plus className="h-8 w-8 mb-2" />
                <span className="font-medium">Crear nuevo CV</span>
              </button>
            )}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No tienes CVs creados</h3>
            <p className="text-muted-foreground mb-6">
              Crea tu primer CV optimizado con inteligencia artificial
            </p>
            <Button variant="accent">
              <Plus className="h-4 w-4 mr-2" />
              Crear mi primer CV
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
