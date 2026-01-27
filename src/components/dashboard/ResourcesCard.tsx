import { Link } from "react-router-dom";
import { useProfile, usePlan, useUsageStats } from "@/hooks/useUserData";
import { Progress } from "@/components/ui/progress";
import { Folder, FileText, MessageSquare, Briefcase, ArrowUpRight } from "lucide-react";

export function ResourcesCard() {
  const { data: profile } = useProfile();
  const { data: plan } = usePlan(profile?.plan_id ?? null);
  const { data: usageStats, isLoading } = useUsageStats();

  const maxCVs = plan?.max_cvs || 3;
  const maxEvaluations = plan?.max_evaluations || 3;
  const maxOpportunities = plan?.max_opportunities || 5;
  
  const cvsCreated = usageStats?.cvs_created || 0;
  const evaluationsUsed = usageStats?.evaluations_used || 0;
  const opportunitiesViewed = usageStats?.opportunities_viewed || 0;

  const resources = [
    {
      label: "Evaluaciones",
      used: evaluationsUsed,
      max: maxEvaluations,
      icon: MessageSquare,
    },
    {
      label: "CVs Creados",
      used: cvsCreated,
      max: maxCVs,
      icon: FileText,
    },
    {
      label: "Oportunidades",
      used: opportunitiesViewed,
      max: maxOpportunities,
      icon: Briefcase,
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
        <div className="h-48 bg-secondary rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-lime/30 transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <Folder className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold uppercase tracking-wide text-sm">
          Recursos
        </h3>
      </div>

      <div className="space-y-5">
        {resources.map((resource) => {
          const percentage = (resource.used / resource.max) * 100;
          const isAtLimit = resource.used >= resource.max;
          
          return (
            <div key={resource.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {resource.label}
                </span>
                <span className={`text-sm font-semibold ${isAtLimit ? "text-coral" : "text-lime"}`}>
                  {resource.used}/{resource.max}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className="h-1.5"
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Link 
          to="/dashboard/creditos"
          className="flex items-center justify-between text-sm text-lime hover:underline"
        >
          <span>Mejorar Plan</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
