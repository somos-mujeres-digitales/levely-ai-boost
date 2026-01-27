import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { useOpportunities, useProfile, usePlan, useUsageStats } from "@/hooks/useUserData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, GraduationCap, Building2, MapPin, Calendar, Lock, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Oportunidades() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { data: opportunities, isLoading } = useOpportunities();
  const { data: profile } = useProfile();
  const { data: plan } = usePlan(profile?.plan_id ?? null);
  const { data: usageStats } = useUsageStats();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const maxOpportunities = plan?.max_opportunities || 5;
  const opportunitiesViewed = usageStats?.opportunities_viewed || 0;
  const isAtLimit = opportunitiesViewed >= maxOpportunities;
  const isStarter = plan?.name === "Starter";

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trabajo":
        return <Briefcase className="h-4 w-4" />;
      case "beca":
        return <GraduationCap className="h-4 w-4" />;
      case "pasantia":
        return <Building2 className="h-4 w-4" />;
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "trabajo":
        return "bg-blue/20 text-blue border-blue/30";
      case "beca":
        return "bg-coral/20 text-coral border-coral/30";
      case "pasantia":
        return "bg-lime/20 text-lime border-lime/30";
      default:
        return "bg-secondary";
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
            <h1 className="text-2xl font-bold mb-1">Oportunidades</h1>
            <p className="text-muted-foreground">
              Trabajos, becas y pasantías personalizadas para tu perfil
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            {opportunitiesViewed}/{maxOpportunities} usadas
          </Badge>
        </div>

        {/* Limit Warning */}
        {isAtLimit && isStarter && (
          <div className="mb-6 p-6 rounded-2xl bg-coral/10 border border-coral/30">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="h-5 w-5 text-coral" />
              <span className="font-bold text-lg text-coral">Has llegado a tu límite</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Desbloquea 5 oportunidades más con Pro y accede al Radar de Oportunidades para recibir alertas en tiempo real.
            </p>
            <Button className="bg-coral hover:bg-coral/90" asChild>
              <Link to="/dashboard/creditos">
                <Sparkles className="h-4 w-4 mr-2" />
                Mejorar a Pro
              </Link>
            </Button>
          </div>
        )}

        {/* Opportunities Grid */}
        {opportunities && opportunities.length > 0 ? (
          <div className="grid gap-4">
            {opportunities.map((opp, index) => {
              const isLocked = isAtLimit && index >= (maxOpportunities - opportunitiesViewed);
              
              return (
                <div 
                  key={opp.id} 
                  className={`p-5 rounded-xl border transition-all ${
                    isLocked 
                      ? "bg-secondary/30 border-border opacity-60" 
                      : "bg-card border-border hover:border-lime/30 cursor-pointer"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{opp.title}</h3>
                        {opp.match_score && (
                          <Badge variant="outline" className="text-lime border-lime/30">
                            {opp.match_score}% match
                          </Badge>
                        )}
                        {isLocked && (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      {opp.company && (
                        <p className="text-muted-foreground mb-3">{opp.company}</p>
                      )}
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className={getTypeBadgeColor(opp.type)}>
                          {getTypeIcon(opp.type)}
                          <span className="ml-1.5 capitalize">{opp.type}</span>
                        </Badge>
                        {opp.is_remote && (
                          <Badge variant="outline">Remoto</Badge>
                        )}
                        {opp.country && (
                          <Badge variant="outline">
                            <MapPin className="h-3 w-3 mr-1" />
                            {opp.country}
                          </Badge>
                        )}
                        {opp.deadline && (
                          <Badge variant="outline">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(opp.deadline).toLocaleDateString("es-PE", { 
                              month: "long", 
                              day: "numeric" 
                            })}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {!isLocked && (
                      <Button variant="outline" size="sm" className="shrink-0">
                        Ver detalles
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-card border border-border rounded-2xl">
            <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No hay oportunidades aún</h3>
            <p className="text-muted-foreground mb-6">
              Sube tu CV y completa tu perfil para recibir oportunidades personalizadas
            </p>
            <Button variant="accent" asChild>
              <Link to="/dashboard/cvs">
                Subir mi CV
              </Link>
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
