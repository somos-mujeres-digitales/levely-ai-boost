import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface CVAnalysis {
  id: string;
  user_id: string;
  cv_id: string | null;
  status: "processing" | "preview_available" | "locked" | "unlocked";
  employability_score: number | null;
  preview_insight: string | null;
  preview_growth_area: string | null;
  preview_opportunity: {
    title: string;
    company: string;
    match_score: number;
    location: string;
  } | null;
  full_feedback: Record<string, string> | null;
  recommendations: string[] | null;
  opportunities: Array<{
    title: string;
    company: string;
    match_score: number;
  }> | null;
  roadmap: {
    short_term: string[];
    mid_term: string[];
    long_term: string[];
  } | null;
  optimized_versions: any[] | null;
  created_at: string;
  updated_at: string;
}

export function useCVAnalysis(analysisId: string | null) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["cv_analysis", analysisId],
    queryFn: async () => {
      if (!analysisId || !user) return null;
      
      const { data, error } = await supabase
        .from("cv_analyses")
        .select("*")
        .eq("id", analysisId)
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) throw error;
      
      return data as CVAnalysis | null;
    },
    enabled: !!analysisId && !!user,
  });
}

export function useLatestCVAnalysis() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["latest_cv_analysis", user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from("cv_analyses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      
      return data as CVAnalysis | null;
    },
    enabled: !!user,
  });
}

export function useCVAnalyses() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["cv_analyses", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("cv_analyses")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      return data as CVAnalysis[];
    },
    enabled: !!user,
  });
}
