import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useAcademyRoutes, useActiveRoutes, useUserProgress, useAllLessonsForRoute } from "@/hooks/useAcademyData";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, ArrowRight, Sparkles, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

function RoadmapRouteCard({ route, index, isActive }: { route: any; index: number; isActive: boolean }) {
  const { data: progress } = useUserProgress(route.id);
  const { data: allLessons } = useAllLessonsForRoute(route.id);

  const total = allLessons?.length || 1;
  const completed = progress?.filter((p: any) => p.completed).length || 0;
  const pct = Math.round((completed / total) * 100);
  const isCompleted = pct === 100;
  const isStarted = completed > 0;

  return (
    <div className="relative">
      {/* Connector line */}
      {index > 0 && (
        <div className="absolute -top-6 left-8 w-0.5 h-6 bg-border" />
      )}

      <Link
        to={`/academy/routes/${route.id}`}
        className={`block rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.01] ${
          isCompleted
            ? "bg-accent/5 border-accent/20"
            : isStarted
            ? "bg-card border-accent/30"
            : "bg-card border-border"
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Status icon */}
          <div className="flex-shrink-0 mt-1">
            {isCompleted ? (
              <CheckCircle2 className="h-6 w-6 text-accent" />
            ) : isStarted ? (
              <div className="relative">
                <Circle className="h-6 w-6 text-accent/40" />
                <Sparkles className="h-3 w-3 text-accent absolute -top-0.5 -right-0.5" />
              </div>
            ) : (
              <Circle className="h-6 w-6 text-foreground/20" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">
                Fase {index + 1}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                {route.level === "intro" ? "Intro" : "Intermedio"}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">{route.title}</h3>
            <p className="text-sm text-foreground/40 line-clamp-2 mb-3">{route.description}</p>

            {isStarted && (
              <div className="flex items-center gap-3">
                <Progress value={pct} className="h-1.5 flex-1 bg-muted max-w-48" />
                <span className="text-xs font-semibold text-foreground/50">{pct}%</span>
              </div>
            )}
          </div>

          {/* Action */}
          <div className="flex-shrink-0 self-center">
            {isCompleted ? (
              <span className="text-xs font-semibold text-accent">Completada ✓</span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-medium text-foreground/40 hover:text-foreground/70 transition-colors">
                {isStarted ? "Continuar" : "Iniciar"} <ArrowRight className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function AcademyRoadmap() {
  const { data: allRoutes } = useAcademyRoutes();
  const { data: activeRoutes } = useActiveRoutes();

  const activeIds = new Set(activeRoutes?.map((r: any) => r.id) || []);

  // Suggested learning order
  const orderedCategories = ["ia", "empleabilidad", "marca profesional", "becas internacionales", "emprendimiento"];
  const sortedRoutes = allRoutes?.slice().sort((a: any, b: any) => {
    const aIdx = orderedCategories.indexOf(a.category);
    const bIdx = orderedCategories.indexOf(b.category);
    return (aIdx === -1 ? 99 : aIdx) - (bIdx === -1 ? 99 : bIdx);
  });

  return (
    <AcademyLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Tu Roadmap</h1>
          <p className="text-foreground/50 text-sm mt-1">
            Tu camino de transformación profesional paso a paso.
          </p>
        </div>

        {/* Progress overview */}
        <div className="rounded-2xl p-6 bg-card border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground/60">Progreso general</span>
            <span className="text-sm font-bold text-accent">
              {activeRoutes?.length || 0} / {allRoutes?.length || 0} rutas iniciadas
            </span>
          </div>
          <Progress
            value={((activeRoutes?.length || 0) / Math.max(allRoutes?.length || 1, 1)) * 100}
            className="h-2 bg-muted"
          />
        </div>

        {/* Roadmap timeline */}
        <div className="space-y-6">
          {sortedRoutes?.map((route: any, i: number) => (
            <RoadmapRouteCard
              key={route.id}
              route={route}
              index={i}
              isActive={activeIds.has(route.id)}
            />
          ))}
        </div>
      </div>
    </AcademyLayout>
  );
}
