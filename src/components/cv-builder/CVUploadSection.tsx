import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface CVUploadSectionProps {
  onAnalysisComplete: (analysisId: string) => void;
}

export function CVUploadSection({ onAnalysisComplete }: CVUploadSectionProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const simulateAIProcessing = async (cvId: string, userId: string) => {
    const stages = [
      { message: "Parseando contenido del CV...", progress: 20 },
      { message: "Analizando experiencia profesional...", progress: 40 },
      { message: "Calculando score de empleabilidad...", progress: 60 },
      { message: "Identificando habilidades clave...", progress: 80 },
      { message: "Generando insights personalizados...", progress: 95 },
    ];

    for (const stage of stages) {
      setProcessingStage(stage.message);
      setUploadProgress(stage.progress);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Simulate AI analysis results
    const mockAnalysis = {
      employability_score: Math.floor(Math.random() * 20) + 70, // 70-90
      preview_insight: "Tu perfil muestra una sólida trayectoria en desarrollo de software con énfasis en tecnologías modernas.",
      preview_growth_area: "Fortalecer las habilidades de liderazgo y gestión de equipos para roles senior.",
      preview_opportunity: {
        title: "Senior Software Engineer",
        company: "TechCorp Global",
        match_score: 87,
        location: "Remoto",
      },
      full_feedback: {
        experiencia: "Excelente progresión de carrera con logros cuantificables.",
        educacion: "Formación académica sólida y relevante.",
        habilidades: "Buen balance entre habilidades técnicas y blandas.",
        formato: "El formato es profesional pero puede mejorar en estructura.",
      },
      recommendations: [
        "Agregar métricas específicas a tus logros",
        "Incluir certificaciones relevantes",
        "Optimizar palabras clave para ATS",
        "Mejorar el resumen ejecutivo",
      ],
      opportunities: [
        { title: "Senior Software Engineer", company: "TechCorp Global", match_score: 87 },
        { title: "Tech Lead", company: "StartupXYZ", match_score: 82 },
        { title: "Full Stack Developer", company: "Digital Agency", match_score: 79 },
        { title: "Engineering Manager", company: "Enterprise Co", match_score: 75 },
        { title: "Solutions Architect", company: "Cloud Systems", match_score: 72 },
      ],
      roadmap: {
        short_term: ["Completar certificación en cloud", "Liderar un proyecto pequeño"],
        mid_term: ["Transicionar a rol de Tech Lead", "Desarrollar habilidades de mentoría"],
        long_term: ["Posición de Engineering Manager", "Construir red de contactos ejecutivos"],
      },
    };

    // Create the analysis record
    const { data: analysisData, error: analysisError } = await supabase
      .from("cv_analyses")
      .insert({
        user_id: userId,
        cv_id: cvId,
        status: "preview_available",
        employability_score: mockAnalysis.employability_score,
        preview_insight: mockAnalysis.preview_insight,
        preview_growth_area: mockAnalysis.preview_growth_area,
        preview_opportunity: mockAnalysis.preview_opportunity,
        full_feedback: mockAnalysis.full_feedback,
        recommendations: mockAnalysis.recommendations,
        opportunities: mockAnalysis.opportunities,
        roadmap: mockAnalysis.roadmap,
      })
      .select()
      .single();

    if (analysisError) {
      console.error("Error creating analysis:", analysisError);
      throw analysisError;
    }

    setUploadProgress(100);
    setProcessingStage("¡Análisis completado!");
    
    return analysisData.id;
  };

  const handleFileUpload = async (file: File) => {
    if (!user) {
      toast.error("Debes iniciar sesión para analizar tu CV");
      navigate("/auth");
      return;
    }

    if (!file.type.includes("pdf") && !file.type.includes("word") && !file.type.includes("document")) {
      toast.error("Por favor sube un archivo PDF o Word");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("El archivo no debe superar los 10MB");
      return;
    }

    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(5);
    setProcessingStage("Subiendo tu CV...");

    try {
      // Create CV record first
      const { data: cvData, error: cvError } = await supabase
        .from("cvs")
        .insert({
          user_id: user.id,
          title: file.name.replace(/\.[^/.]+$/, ""),
          is_optimized: false,
        })
        .select()
        .single();

      if (cvError) throw cvError;

      setUploadProgress(10);
      
      // Simulate AI processing
      const analysisId = await simulateAIProcessing(cvData.id, user.id);
      
      // Update usage stats
      await supabase
        .from("usage_stats")
        .update({ cvs_created: 1 })
        .eq("user_id", user.id);

      toast.success("¡Tu CV ha sido analizado!");
      onAnalysisComplete(analysisId);
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast.error("Error al procesar tu CV. Intenta nuevamente.");
      setIsUploading(false);
      setUploadProgress(0);
      setProcessingStage(null);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [user]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileUpload(file);
  };

  if (isUploading) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
        <div className="max-w-md mx-auto">
          {uploadProgress < 100 ? (
            <Loader2 className="w-16 h-16 mx-auto text-lime mb-6 animate-spin" />
          ) : (
            <CheckCircle2 className="w-16 h-16 mx-auto text-lime mb-6" />
          )}
          
          <h3 className="text-xl font-bold mb-2">
            {uploadProgress < 100 ? "Analizando tu CV con IA" : "¡Análisis Completado!"}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {processingStage}
          </p>

          {/* Progress bar */}
          <div className="h-3 bg-secondary rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-lime to-lime/70 rounded-full transition-all duration-500"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {uploadProgress}% completado
          </p>

          {uploadedFile && (
            <div className="mt-6 flex items-center justify-center gap-3 p-4 bg-secondary rounded-xl">
              <FileText className="w-5 h-5 text-lime" />
              <span className="text-sm font-medium">{uploadedFile.name}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-card border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer ${
        isDragging 
          ? "border-lime bg-lime/5" 
          : "border-border hover:border-lime/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 rounded-2xl bg-lime/10 flex items-center justify-center mb-6">
          <Upload className="w-10 h-10 text-lime" />
        </div>
        
        <h3 className="text-xl font-bold mb-2">
          Sube tu CV para analizarlo
        </h3>
        
        <p className="text-muted-foreground mb-6 max-w-sm">
          Arrastra y suelta tu CV aquí, o haz clic para seleccionar un archivo
        </p>

        <Button variant="lime" size="lg" className="pointer-events-none">
          <FileText className="w-5 h-5 mr-2" />
          Seleccionar archivo
        </Button>

        <p className="mt-4 text-xs text-muted-foreground">
          Formatos aceptados: PDF, DOC, DOCX (máx. 10MB)
        </p>
      </div>
    </div>
  );
}
