import { useState } from "react";
import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useAcademyRoutes } from "@/hooks/useAcademyData";
import { Link } from "react-router-dom";
import { Clock, ArrowRight, BookOpen } from "lucide-react";

const categories = [
  { value: "all", label: "Todas" },
  { value: "empleabilidad", label: "Empleabilidad" },
  { value: "becas internacionales", label: "Becas" },
  { value: "ia", label: "IA" },
  { value: "marca profesional", label: "Marca profesional" },
  { value: "emprendimiento", label: "Emprendimiento" },
];

export default function AcademyRoutes() {
  const [category, setCategory] = useState("all");
  const { data: routes, isLoading } = useAcademyRoutes(category);

  return (
    <AcademyLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rutas</h1>
          <p className="text-foreground/50 text-sm mt-1">Encuentra la ruta que transformará tu carrera.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                category === cat.value
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground/60 border border-border hover:text-foreground/80"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-foreground/30">Cargando rutas...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {routes?.map((route: any) => (
              <Link
                key={route.id}
                to={`/academy/routes/${route.id}`}
                className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] group bg-card border border-border"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="h-4 w-4 text-foreground/30" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
                    {route.level === "intro" ? "Intro" : "Intermedio"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{route.title}</h3>
                <p className="text-sm text-foreground/40 mb-5 line-clamp-2">{route.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-foreground/40">
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{route.duration_hours}h</span>
                    <span>{route.modules_count} módulos</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-foreground/40 group-hover:text-foreground/70 transition-colors">
                    Ver <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AcademyLayout>
  );
}
