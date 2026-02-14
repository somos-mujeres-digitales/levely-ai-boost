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
import { Clock, Play, FileText, Check, ChevronDown, ChevronRight, X } from "lucide-react";
import { useState } from "react";

function VideoPlayer({ url, onClose }: { url: string; onClose: () => void }) {
  // Support YouTube embed URLs
  const getEmbedUrl = (rawUrl: string) => {
    if (rawUrl.includes("youtube.com/watch")) {
      const id = new URL(rawUrl).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (rawUrl.includes("youtu.be/")) {
      const id = rawUrl.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (rawUrl.includes("vimeo.com/")) {
      const id = rawUrl.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${id}?autoplay=1`;
    }
    return rawUrl;
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-card border border-border mb-6 relative">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 text-foreground/60 hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="aspect-video w-full">
        <iframe
          src={getEmbedUrl(url)}
          className="w-full h-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Lesson video"
        />
      </div>
    </div>
  );
}

function ModuleSection({
  module,
  routeId,
  onPlayVideo,
}: {
  module: any;
  routeId: string;
  onPlayVideo: (url: string) => void;
}) {
  const [open, setOpen] = useState(true);
  const { data: lessons } = useAcademyLessons(module.id);
  const { data: progress } = useUserProgress(routeId);
  const markComplete = useMarkLessonComplete();

  const completedIds = new Set(progress?.filter((p: any) => p.completed).map((p: any) => p.lesson_id));

  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-foreground/[0.02] transition-colors"
      >
        <div>
          <h3 className="text-base font-semibold text-foreground">{module.title}</h3>
          {module.description && <p className="text-xs text-foreground/40 mt-0.5">{module.description}</p>}
        </div>
        {open ? <ChevronDown className="h-4 w-4 text-foreground/40" /> : <ChevronRight className="h-4 w-4 text-foreground/40" />}
      </button>
      {open && lessons && (
        <div className="border-t border-border">
          {lessons.map((lesson: any) => {
            const done = completedIds.has(lesson.id);
            return (
              <div
                key={lesson.id}
                className="flex items-center justify-between px-5 py-3.5 hover:bg-foreground/[0.02] transition-colors border-b border-border last:border-b-0"
              >
                <div
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                  onClick={() => {
                    if (lesson.type === "video" && lesson.video_url) {
                      onPlayVideo(lesson.video_url);
                    }
                  }}
                >
                  {lesson.type === "video" ? (
                    <Play className="h-4 w-4 text-foreground/30" />
                  ) : (
                    <FileText className="h-4 w-4 text-foreground/30" />
                  )}
                  <span className={`text-sm ${done ? "text-foreground/40 line-through" : "text-foreground/80"}`}>
                    {lesson.title}
                  </span>
                  {lesson.duration_minutes > 0 && (
                    <span className="text-[10px] text-foreground/25">{lesson.duration_minutes} min</span>
                  )}
                </div>
                <button
                  onClick={() => markComplete.mutate({ lessonId: lesson.id, routeId })}
                  disabled={done}
                  className={`p-1.5 rounded-md transition-all ${
                    done
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground/40 hover:text-foreground/60"
                  }`}
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
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const total = allLessons?.length || 1;
  const completed = progress?.filter((p: any) => p.completed).length || 0;
  const pct = Math.round((completed / total) * 100);

  if (!route) {
    return (
      <AcademyLayout>
        <div className="text-center py-20 text-foreground/30">Cargando ruta...</div>
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
              <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                {route.level === "intro" ? "Intro" : "Intermedio"}
              </span>
              <h1 className="text-2xl font-bold text-foreground mt-2">{route.title}</h1>
              <p className="text-foreground/50 text-sm mt-2">{route.description}</p>
              <div className="flex items-center gap-5 mt-4 text-xs text-foreground/40">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{route.duration_hours}h</span>
                <span>{route.modules_count} módulos</span>
              </div>
            </div>

            {/* Video Player */}
            {activeVideo && (
              <VideoPlayer url={activeVideo} onClose={() => setActiveVideo(null)} />
            )}

            {/* Modules */}
            <div className="space-y-4">
              {modules?.map((mod: any) => (
                <ModuleSection
                  key={mod.id}
                  module={mod}
                  routeId={route.id}
                  onPlayVideo={(url) => setActiveVideo(url)}
                />
              ))}
              {(!modules || modules.length === 0) && (
                <div className="text-center py-12 text-foreground/30 text-sm">
                  Contenido próximamente disponible.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl p-6 sticky top-24 bg-card border border-border">
              <h3 className="text-sm font-semibold text-foreground/70 mb-3">Tu progreso</h3>
              <div className="flex items-end gap-2 mb-3">
                <span className="text-4xl font-bold text-accent">{pct}%</span>
                <span className="text-xs text-foreground/30 pb-1">{completed}/{total} completados</span>
              </div>
              <Progress value={pct} className="h-2 bg-muted" />
            </div>
          </div>
        </div>
      </div>
    </AcademyLayout>
  );
}
