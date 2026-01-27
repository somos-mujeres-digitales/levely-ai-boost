import { useProfile } from "@/hooks/useUserData";
import { Badge } from "@/components/ui/badge";
import { Target, CheckCircle2 } from "lucide-react";

export function EmployabilityCard() {
  const { data: profile, isLoading } = useProfile();
  
  const score = profile?.employability_score || 0;
  const industry = profile?.industry || "Technology Engineering";
  
  const getStatus = (score: number) => {
    if (score >= 85) return "Altamente Competitivo";
    if (score >= 70) return "Competitivo";
    if (score >= 50) return "En Desarrollo";
    return "Iniciando";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  if (isLoading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 animate-pulse">
        <div className="h-32 bg-secondary rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:border-lime/30 transition-colors">
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-lime" />
        <h3 className="font-semibold uppercase tracking-wide text-sm">
          Índice de Empleabilidad
        </h3>
      </div>

      <div className="flex items-center gap-6">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="hsl(var(--lime))"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold">{score}%</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1">
          <h4 className="text-xl font-bold text-lime uppercase tracking-wide mb-1">
            {getStatus(score)}
          </h4>
          <Badge variant="secondary" className="mb-3">
            {industry}
          </Badge>
          <p className="text-sm text-muted-foreground mb-3">
            Tu perfil está <span className="font-medium text-foreground">{getStatus(score)}</span> en el sector{" "}
            <span className="font-medium text-foreground">{industry}</span>.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              Actualizado
            </Badge>
            <Badge variant="outline" className="text-xs border-lime/50 text-lime">
              Levely AI Verified
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
