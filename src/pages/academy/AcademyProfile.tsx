import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useProfile } from "@/hooks/useUserData";
import { useActiveRoutes, useUserProgress } from "@/hooks/useAcademyData";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, BookOpen, Clock } from "lucide-react";

export default function AcademyProfile() {
  const { data: profile } = useProfile();
  const { data: activeRoutes } = useActiveRoutes();
  const { data: allProgress } = useUserProgress();

  const completedCount = allProgress?.filter((p: any) => p.completed).length || 0;
  const totalRoutes = activeRoutes?.length || 0;
  const completedRoutes = 0;

  const initials = profile?.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <AcademyLayout>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="rounded-2xl p-8 flex items-center gap-6 bg-card border border-border">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-2xl font-bold bg-accent text-accent-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{profile?.full_name || "Explorador"}</h1>
            <p className="text-foreground/40 text-sm mt-1">{profile?.industry || "Explorando rutas profesionales"}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: BookOpen, label: "Rutas activas", value: totalRoutes },
            { icon: Trophy, label: "Lecciones completadas", value: completedCount },
            { icon: Clock, label: "Rutas completadas", value: completedRoutes },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-5 text-center bg-card border border-border">
              <stat.icon className="h-5 w-5 mx-auto mb-2 text-foreground/30" />
              <p className="text-2xl font-bold text-accent">{stat.value}</p>
              <p className="text-[10px] text-foreground/40 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Routes */}
        <div>
          <h2 className="text-lg font-semibold text-foreground/80 mb-4">Rutas en progreso</h2>
          {activeRoutes && activeRoutes.length > 0 ? (
            <div className="space-y-3">
              {activeRoutes.map((route: any) => (
                <div key={route.id} className="rounded-xl p-5 flex items-center justify-between bg-card border border-border">
                  <span className="text-sm font-medium text-foreground">{route.title}</span>
                  <span className="text-xs text-foreground/40">{route.level}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-foreground/30">Aún no has iniciado ninguna ruta.</p>
          )}
        </div>
      </div>
    </AcademyLayout>
  );
}
