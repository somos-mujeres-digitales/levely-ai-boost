import { useEvaluations } from "@/hooks/useUserData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";

interface GrowthArea {
  title: string;
  description: string;
  priority: "Alta" | "Media" | "Baja";
}

const defaultGrowthAreas: GrowthArea[] = [
  {
    title: "Skills",
    description: "Considera añadir una sección de 'Habilidades Blandas' para destacar tus capacidades de comunicación, trabajo en equipo y resolución de problemas.",
    priority: "Media",
  },
  {
    title: "Experience",
    description: "Intenta cuantificar más tus logros y el impacto de tu trabajo con métricas específicas (ej. 'mejoré la velocidad de carga en X%').",
    priority: "Media",
  },
];

export function GrowthAreasCard() {
  const { data: evaluations, isLoading } = useEvaluations();
  
  // Get growth areas from the latest evaluation or use defaults
  const latestEvaluation = evaluations?.[0];
  const growthAreas: GrowthArea[] = latestEvaluation?.growth_areas || defaultGrowthAreas;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta":
        return "bg-destructive/20 text-destructive border-destructive/30";
      case "Media":
        return "bg-blue/20 text-blue border-blue/30";
      case "Baja":
        return "bg-lime/20 text-lime border-lime/30";
      default:
        return "bg-secondary text-muted-foreground";
    }
  };

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
        <Search className="h-5 w-5 text-muted-foreground" />
        <h3 className="font-semibold uppercase tracking-wide text-sm">
          Áreas de Crecimiento
        </h3>
      </div>

      <div className="space-y-4">
        {growthAreas.map((area, index) => (
          <div key={index} className="flex gap-3">
            <Badge 
              variant="outline" 
              className={`shrink-0 h-6 px-2.5 text-xs font-medium ${getPriorityColor(area.priority)}`}
            >
              {area.priority}
            </Badge>
            <div className="flex-1">
              <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                {area.title}
              </h4>
              <p className="text-sm text-foreground leading-relaxed">
                {area.description}
              </p>
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0 mt-1 text-lime hover:text-lime/80"
              >
                Aplicar mejora
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {growthAreas.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <p className="text-sm">No hay áreas de mejora identificadas aún.</p>
          <Button variant="outline" size="sm" className="mt-3">
            Evaluar mi perfil
          </Button>
        </div>
      )}
    </div>
  );
}
