import { useState } from "react";
import { AcademyLayout } from "@/components/academy/AcademyLayout";
import { useAcademyResources } from "@/hooks/useAcademyData";
import { FileText, Download } from "lucide-react";

const categories = [
  { value: "all", label: "Todos" },
  { value: "plantillas", label: "Plantillas" },
  { value: "checklists", label: "Checklists" },
  { value: "roadmaps", label: "Roadmaps" },
];

export default function AcademyResources() {
  const [category, setCategory] = useState("all");
  const { data: resources } = useAcademyResources(category);

  return (
    <AcademyLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Recursos</h1>
          <p className="text-white/50 text-sm mt-1">Plantillas, checklists y roadmaps descargables.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200"
              style={
                category === cat.value
                  ? { background: "#CAF374", color: "hsl(168 28% 12%)" }
                  : { background: "hsl(168 22% 18%)", color: "rgba(255,255,255,0.6)", border: "1px solid hsl(168 15% 22%)" }
              }
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources?.map((resource: any) => (
            <div
              key={resource.id}
              className="rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] group"
              style={{ background: "hsl(168 22% 16%)", border: "1px solid hsl(168 15% 22%)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ background: "hsl(168 15% 24%)" }}>
                  <FileText className="h-5 w-5 text-white/40" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
                  {resource.file_type}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-1">{resource.title}</h3>
              <p className="text-xs text-white/40 mb-4">{resource.description}</p>
              <button
                className="flex items-center gap-2 text-xs font-semibold transition-colors"
                style={{ color: "#CAF374" }}
              >
                <Download className="h-3.5 w-3.5" /> Descargar
              </button>
            </div>
          ))}
        </div>
      </div>
    </AcademyLayout>
  );
}
