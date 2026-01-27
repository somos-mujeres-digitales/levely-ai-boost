import { Link } from "react-router-dom";
import { useOpportunities, useProfile, usePlan, useUsageStats } from "@/hooks/useUserData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, MapPin, Calendar, Briefcase, GraduationCap, Building2, ArrowRight, Lock } from "lucide-react";

export function TopMatchesCard() {
  const { data: opportunities, isLoading } = useOpportunities();
  const { data: profile } = useProfile();
  const { data: plan } = usePlan(profile?.plan_id ?? null);
  const { data: usageStats } = useUsageStats();

  const maxOpportunities = plan?.max_opportunities || 5;
  const opportunitiesViewed = usageStats?.opportunities_viewed || 0;
  const isAtLimit = opportunitiesViewed >= maxOpportunities;
  const isStarter = plan?.name === "Starter";

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "trabajo":
        return <Briefcase className="h-3.5 w-3.5" />;
      case "beca":
        return <GraduationCap className="h-3.5 w-3.5" />;
      case "pasantia":
        return <Building2 className="h-3.5 w-3.5" />;
      default:
        return <Briefcase className="h-3.5 w-3.5" />;
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

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
        <div className="h-32 bg-secondary rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-lime/30 transition-colors">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-lime" />
          <h3 className="font-semibold uppercase tracking-wide text-sm">
            Top Matches
          </h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {opportunitiesViewed}/{maxOpportunities} oportunidades
        </span>
      </div>

      {/* Limit Warning Banner */}
      {isAtLimit && isStarter && (
        <div className="mb-4 p-4 rounded-xl bg-coral/10 border border-coral/30">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="h-4 w-4 text-coral" />
            <span className="font-semibold text-coral">Has llegado a tu límite</span>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Desbloquea 5 oportunidades más con Pro y accede al Radar de Oportunidades.
          </p>
          <Button variant="default" size="sm" className="bg-coral hover:bg-coral/90" asChild>
            <Link to="/dashboard/creditos">
              Mejorar a Pro
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}

      {opportunities && opportunities.length > 0 ? (
        <div className="space-y-3">
          {opportunities.slice(0, isAtLimit ? 0 : 3).map((opp) => (
            <div 
              key={opp.id} 
              className="p-4 rounded-xl bg-secondary/50 border border-border hover:border-lime/30 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <h4 className="font-medium text-sm">{opp.title}</h4>
                  {opp.company && (
                    <p className="text-xs text-muted-foreground">{opp.company}</p>
                  )}
                </div>
                {opp.match_score && (
                  <Badge variant="outline" className="shrink-0 text-lime border-lime/30">
                    {opp.match_score}% match
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className={`text-xs ${getTypeBadgeColor(opp.type)}`}>
                  {getTypeIcon(opp.type)}
                  <span className="ml-1 capitalize">{opp.type}</span>
                </Badge>
                {opp.is_remote && (
                  <Badge variant="outline" className="text-xs">Remoto</Badge>
                )}
                {opp.country && (
                  <Badge variant="outline" className="text-xs">
                    <MapPin className="h-3 w-3 mr-1" />
                    {opp.country}
                  </Badge>
                )}
                {opp.deadline && (
                  <Badge variant="outline" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(opp.deadline).toLocaleDateString("es-PE", { month: "short", day: "numeric" })}
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-sm text-muted-foreground italic mb-4">
            No hay oportunidades emparejadas aún.
          </p>
          <Button variant="outline" size="sm" className="border-lime/50 text-lime hover:bg-lime/10" asChild>
            <Link to="/dashboard/oportunidades">
              Generar mis oportunidades
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}

      {opportunities && opportunities.length > 0 && !isAtLimit && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full text-lime hover:bg-lime/10" asChild>
            <Link to="/dashboard/oportunidades">
              Ver todas las oportunidades
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
