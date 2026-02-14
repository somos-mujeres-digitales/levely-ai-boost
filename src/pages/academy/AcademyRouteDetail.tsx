import { useParams } from "react-router-dom";
import { AcademyLayout } from "@/components/academy/AcademyLayout";
import {
  useAcademyRoute,
  useAcademyModules,
  useAcademyLessons,
  useUserProgress,
  useAllLessonsForRoute,
  useMarkLessonComplete,
} from "@/hooks/useAcademyData";
import { Progress } from "@/components/ui/progress";
import { Clock, Play, FileText, Check, ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

function ModuleSection({ module, routeId }: { module: any; routeId: string }) {
  const [open, setOpen] = useState(true);
  const { data: lessons } = useAcademyLessons(module.id);
  const { data: progress } = useUserProgress(routeId);
  const markComplete = useMarkLessonComplete();

  const completedIds = new Set(progress?.filter((p: any) => p.completed).map((p: any) => p.lesson_id));

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "hsl(168 22% 16%)", border: "1px solid hsl(168 15% 22%)" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <div>
          <h3 className="text-base font-semibold text-white">{module.title}</h3>
          {module.description && <p className="text-xs text-white/40 mt-0.5">{module.description}</p>}
        </div>
        {open ? <ChevronDown className="h-4 w-4 text-white/40" /> : <ChevronRight className="h-4 w-4 text-white/40" />}
      </button>
      {open && lessons && (
        <div className="border-t" style={{ borderColor: "hsl(168 15% 22%)" }}>
          {lessons.map((lesson: any) => {
            const done = completedIds.has(lesson.id);
            return (
              <div
                key={lesson.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
                style={{ borderBottom: "1px solid hsl(168 15% 20%)" }}
              >
                <div className="flex items-center gap-3">
                  {lesson.type === "video" ? (
                    <Play className="h-4 w-4 text-white/30" />
                  ) : (
                    <FileText className="h-4 w-4 text-white/30" />
                  )}
                  <span className={`text-sm ${done ? "text-white/40 line-through" : "text-white/80"}`}>
                    {lesson.title}
                  </span>
                  {lesson.duration_minutes > 0 && (
                    <span className="text-[10px] text-white/25">{lesson.duration_minutes} min</span>
                  )}
                </div>
                <button
                  onClick={() => markComplete.mutate({ lessonId: lesson.id, routeId })}
                  disabled={done}
                  className="p-1.5 rounded-md transition-all"
                  style={
                    done
                      ? { background: "#CAF374", color: "hsl(168 28% 12%)" }
                      : { background: "hsl(168 15% 24%)", color: "rgba(255,255,255,0.4)" }
                  }
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function AcademyRouteDetail() {
  const { routeId } = useParams();
  const { data: route } = useAcademyRoute(routeId);
  const { data: modules } = useAcademyModules(routeId);
  const { data: progress } = useUserProgress(routeId);
  const { data: allLessons } = useAllLessonsForRoute(routeId);

  const total = allLessons?.length || 1;
  const completed = progress?.filter((p: any) => p.completed).length || 0;
  const pct = Math.round((completed / total) * 100);

  if (!route) {
    return (
      <AcademyLayout>
        <div className="text-center py-20 text-white/30">Cargando ruta...</div>
      </AcademyLayout>
    );
  }

  return (
    <AcademyLayout>
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <span
                className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: "#CAF374" }}
              >
                {route.level === "intro" ? "Intro" : "Intermedio"}
              </span>
              <h1 className="text-2xl font-bold text-white mt-2">{route.title}</h1>
              <p className="text-white/50 text-sm mt-2">{route.description}</p>
              <div className="flex items-center gap-5 mt-4 text-xs text-white/40">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{route.duration_hours}h</span>
                <span>{route.modules_count} módulos</span>
              </div>
            </div>

            {/* Modules */}
            <div className="space-y-4">
              {modules?.map((mod: any) => (
                <ModuleSection key={mod.id} module={mod} routeId={route.id} />
              ))}
              {(!modules || modules.length === 0) && (
                <div className="text-center py-12 text-white/30 text-sm">
                  Contenido próximamente disponible.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{ background: "hsl(168 22% 16%)", border: "1px solid hsl(168 15% 22%)" }}
            >
              <h3 className="text-sm font-semibold text-white/70 mb-3">Tu progreso</h3>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold" style={{ color: "#CAF374" }}>{pct}%</span>
                <span className="text-xs text-white/30 pb-1">{completed}/{total} completados</span>
              </div>
              <Progress value={pct} className="h-2" style={{ background: "hsl(168 15% 24%)" }} />
            </div>
          </div>
        </div>
      </div>
    </AcademyLayout>
  );
}
