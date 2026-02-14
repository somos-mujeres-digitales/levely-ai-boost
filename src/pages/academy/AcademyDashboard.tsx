import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useProfile } from "@/hooks/useUserData";
import { useAcademyRoutes, useActiveRoutes, useUserProgress } from "@/hooks/useAcademyData";
import { useAllLessonsForRoute } from "@/hooks/useAcademyData";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, BarChart3, Play, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";

function ActiveRouteCard({ route }: { route: any }) {
  const { data: progress } = useUserProgress(route.id);
  const { data: allLessons } = useAllLessonsForRoute(route.id);

  const total = allLessons?.length || 1;
  const completed = progress?.filter((p: any) => p.completed).length || 0;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.01] bg-card border border-border">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{route.title}</h3>
          <p className="text-sm text-foreground/50 mt-1">{route.description}</p>
        </div>
        <span className="text-2xl font-bold text-accent">{pct}%</span>
      </div>
      <Progress value={pct} className="h-2 mb-4 bg-muted" />
      <Link
        to={`/academy/routes/${route.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80 text-accent"
      >
        <Play className="h-4 w-4" /> Continuar
      </Link>
    </div>
  );
}

function RouteExploreCard({ route }: { route: any }) {
  return (
    <Link
      to={`/academy/routes/${route.id}`}
      className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] group bg-card border border-border"
    >
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-foreground/40" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
          {route.level === "intro" ? "Intro" : "Intermedio"}
        </span>
      </div>
      <h3 className="text-base font-semibold text-foreground mb-2 group-hover:opacity-90">{route.title}</h3>
      <p className="text-xs text-foreground/45 mb-4 line-clamp-2">{route.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-foreground/40 text-xs">
          <Clock className="h-3.5 w-3.5" />
          {route.duration_hours}h
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-foreground/50 group-hover:text-foreground/70 transition-colors">
          Iniciar <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export default function AcademyDashboard() {
  const { data: profile } = useProfile();
  const { data: activeRoutes } = useActiveRoutes();
  const { data: allRoutes } = useAcademyRoutes();

  const firstName = profile?.full_name?.split(" ")[0] || "Explorador";

  return (
    <AcademyLayout>
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Bienvenida, {firstName} 👋
          </h1>
          <p className="text-foreground/50 mt-1">Continúa tu transformación profesional.</p>
        </div>

        {/* Active Routes */}
        {activeRoutes && activeRoutes.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground/80 mb-4">Tus rutas activas</h2>
            <div className="space-y-4">
              {activeRoutes.map((r: any) => (
                <ActiveRouteCard key={r.id} route={r} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {(!activeRoutes || activeRoutes.length === 0) && (
          <div className="rounded-2xl p-8 text-center bg-card border border-border">
            <BarChart3 className="h-10 w-10 mx-auto mb-3 text-foreground/20" />
            <p className="text-foreground/50 text-sm">Aún no has iniciado ninguna ruta.</p>
            <p className="text-foreground/30 text-xs mt-1">Explora las rutas disponibles para comenzar.</p>
          </div>
        )}

        {/* Explore Routes */}
        <section>
          <h2 className="text-lg font-semibold text-foreground/80 mb-4">Explora nuevas rutas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {allRoutes?.map((r: any) => (
              <RouteExploreCard key={r.id} route={r} />
            ))}
          </div>
        </section>
      </div>
    </AcademyLayout>
  );
}
