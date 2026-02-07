import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lock, 
  Sparkles, 
  TrendingUp, 
  Target, 
  FileText, 
  Lightbulb, 
  Briefcase,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Download,
  Map,
} from "lucide-react";

interface AnalysisPreviewProps {
  analysis: {
    id: string;
    employability_score: number;
    preview_insight: string;
    preview_growth_area: string;
    preview_opportunity: {
      title: string;
      company: string;
      match_score: number;
      location: string;
    };
    status: string;
  };
  onUnlock: () => void;
}

export function AnalysisPreview({ analysis, onUnlock }: AnalysisPreviewProps) {
  const isUnlocked = analysis.status === "unlocked";

  return (
    <div className="space-y-8">
      {/* Header with score */}
      <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-lime/20 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-lime" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Score de Empleabilidad</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-lime">{analysis.employability_score}</span>
                <span className="text-xl text-muted-foreground">/100</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-lime border-lime/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Análisis IA completado
            </Badge>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6">
          <div className="h-4 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-lime to-lime/70 rounded-full transition-all"
              style={{ width: `${analysis.employability_score}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Bajo</span>
            <span>Promedio</span>
            <span>Excelente</span>
          </div>
        </div>
      </div>

      {/* Free preview cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Insight card */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue/20 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-blue" />
            </div>
            <h3 className="font-semibold">Insight de tu perfil</h3>
          </div>
          <p className="text-muted-foreground">
            {analysis.preview_insight}
          </p>
        </div>

        {/* Growth area card */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-coral/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-coral" />
            </div>
            <h3 className="font-semibold">Área de mejora</h3>
          </div>
          <p className="text-muted-foreground">
            {analysis.preview_growth_area}
          </p>
        </div>
      </div>

      {/* Opportunity preview */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-lime/20 flex items-center justify-center">
            <Briefcase className="w-5 h-5 text-lime" />
          </div>
          <h3 className="font-semibold">Oportunidad sugerida</h3>
        </div>
        <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
          <div>
            <p className="font-semibold">{analysis.preview_opportunity.title}</p>
            <p className="text-sm text-muted-foreground">{analysis.preview_opportunity.company} • {analysis.preview_opportunity.location}</p>
          </div>
          <Badge className="bg-lime/20 text-lime border-0">
            {analysis.preview_opportunity.match_score}% match
          </Badge>
        </div>
      </div>

      {/* Locked premium features */}
      {!isUnlocked && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Funciones Premium</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Locked: Detailed feedback */}
            <div className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Contenido premium</p>
                </div>
              </div>
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">Feedback Detallado</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Análisis completo de cada sección de tu CV...
                </p>
              </div>
            </div>

            {/* Locked: Full radar */}
            <div className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Contenido premium</p>
                </div>
              </div>
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">Radar de Oportunidades</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  5 oportunidades personalizadas...
                </p>
              </div>
            </div>

            {/* Locked: Roadmap */}
            <div className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Contenido premium</p>
                </div>
              </div>
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Map className="w-5 h-5" />
                  <span className="font-medium">Roadmap Profesional</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Plan de desarrollo personalizado...
                </p>
              </div>
            </div>

            {/* Locked: CV Versions */}
            <div className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Contenido premium</p>
                </div>
              </div>
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-medium">CV Optimizado</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Hasta 3 versiones optimizadas...
                </p>
              </div>
            </div>

            {/* Locked: Download */}
            <div className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Contenido premium</p>
                </div>
              </div>
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Download className="w-5 h-5" />
                  <span className="font-medium">Descargas</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  PDF y Word optimizados...
                </p>
              </div>
            </div>

            {/* Locked: Recommendations */}
            <div className="relative bg-card border border-border rounded-2xl p-6 overflow-hidden">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Contenido premium</p>
                </div>
              </div>
              <div className="blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">Recomendaciones</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Sugerencias personalizadas...
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UX Message */}
      {!isUnlocked && (
        <div className="bg-lime/10 border border-lime/30 rounded-2xl p-6 text-center">
          <Sparkles className="w-8 h-8 mx-auto text-lime mb-3" />
          <p className="text-lg font-medium mb-2">
            Tu CV fue analizado con IA
          </p>
          <p className="text-muted-foreground mb-4">
            Desbloquea el reporte completo para mejorar tu perfil profesional.
          </p>
          <Button variant="lime" size="lg" onClick={onUnlock}>
            Desbloquear Reporte Completo
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
