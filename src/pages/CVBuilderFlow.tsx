import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CVUploadSection } from "@/components/cv-builder/CVUploadSection";
import { AnalysisPreview } from "@/components/cv-builder/AnalysisPreview";
import { PaywallModal } from "@/components/cv-builder/PaywallModal";
import { useCVAnalysis, useLatestCVAnalysis } from "@/hooks/useCVAnalysis";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function CVBuilderFlow() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  
  const { data: analysis, isLoading: analysisLoading, refetch } = useCVAnalysis(currentAnalysisId);
  const { data: latestAnalysis } = useLatestCVAnalysis();

  // Check for existing analysis on mount
  useEffect(() => {
    if (latestAnalysis && !currentAnalysisId) {
      // If user has a recent analysis that's not unlocked, show it
      if (latestAnalysis.status !== "unlocked") {
        setCurrentAnalysisId(latestAnalysis.id);
      }
    }
  }, [latestAnalysis, currentAnalysisId]);

  // Redirect to dashboard if analysis is unlocked
  useEffect(() => {
    if (analysis?.status === "unlocked") {
      navigate("/dashboard");
    }
  }, [analysis?.status, navigate]);

  const handleAnalysisComplete = (analysisId: string) => {
    setCurrentAnalysisId(analysisId);
    refetch();
  };

  const handleUnlock = () => {
    setShowPaywall(true);
  };

  const renderContent = () => {
    // If loading auth, show nothing
    if (loading) {
      return (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lime"></div>
        </div>
      );
    }

    // If not logged in, show upload (will redirect to auth on upload)
    if (!user) {
      return (
        <div className="space-y-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/20 text-lime text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Análisis gratuito
            </div>
            <h1 className="headline-lg mb-4">Analiza tu CV con IA</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Sube tu CV y recibe un análisis instantáneo de tu perfil profesional.
              Descubre tu score de empleabilidad y áreas de mejora.
            </p>
          </div>
          <CVUploadSection onAnalysisComplete={handleAnalysisComplete} />
        </div>
      );
    }

    // If we have an analysis in progress or completed
    if (analysis) {
      if (analysis.status === "processing") {
        return (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime mx-auto mb-4"></div>
            <p className="text-lg">Procesando tu CV...</p>
          </div>
        );
      }

      if (analysis.status === "preview_available" || analysis.status === "locked") {
        return (
          <AnalysisPreview 
            analysis={{
              id: analysis.id,
              employability_score: analysis.employability_score || 0,
              preview_insight: analysis.preview_insight || "",
              preview_growth_area: analysis.preview_growth_area || "",
              preview_opportunity: analysis.preview_opportunity || {
                title: "",
                company: "",
                match_score: 0,
                location: "",
              },
              status: analysis.status,
            }}
            onUnlock={handleUnlock}
          />
        );
      }
    }

    // Default: show upload section
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime/20 text-lime text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Análisis gratuito
          </div>
          <h1 className="headline-lg mb-4">Analiza tu CV con IA</h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Sube tu CV y recibe un análisis instantáneo de tu perfil profesional.
            Descubre tu score de empleabilidad y áreas de mejora.
          </p>
        </div>
        <CVUploadSection onAnalysisComplete={handleAnalysisComplete} />
      </div>
    );
  };

  return (
    <Layout>
      <section className="section-padding bg-gradient-to-br from-secondary/50 via-background to-purple-50/30 dark:from-background dark:via-slate-900 dark:to-slate-800 min-h-screen">
        <div className="container-levely max-w-4xl">
          {/* Back link */}
          <div className="mb-8">
            <Link to="/cv-builder" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Volver a CV Builder
            </Link>
          </div>

          {renderContent()}
        </div>
      </section>

      {/* Paywall Modal */}
      {currentAnalysisId && (
        <PaywallModal 
          open={showPaywall} 
          onOpenChange={setShowPaywall}
          analysisId={currentAnalysisId}
        />
      )}
    </Layout>
  );
}
