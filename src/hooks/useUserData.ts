import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  plan_id: string | null;
  credits: number;
  employability_score: number | null;
  industry: string | null;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  max_cvs: number;
  max_opportunities: number;
  max_evaluations: number;
  has_radar_pro: boolean;
  has_community: boolean;
}

export interface UsageStats {
  cvs_created: number;
  evaluations_used: number;
  opportunities_viewed: number;
}

export interface Evaluation {
  id: string;
  score: number | null;
  status: string;
  feedback: any;
  growth_areas: any;
  created_at: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string | null;
  type: string;
  location: string | null;
  is_remote: boolean;
  country: string | null;
  deadline: string | null;
  match_score: number | null;
  is_viewed: boolean;
}

export interface CV {
  id: string;
  title: string;
  is_optimized: boolean;
  created_at: string;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Profile | null;
    },
    enabled: !!user,
  });
}

export function usePlan(planId: string | null) {
  return useQuery({
    queryKey: ["plan", planId],
    queryFn: async () => {
      if (!planId) return null;
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .eq("id", planId)
        .maybeSingle();
      
      if (error) throw error;
      return data as Plan | null;
    },
    enabled: !!planId,
  });
}

export function usePlans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("plans")
        .select("*")
        .order("price", { ascending: true });
      
      if (error) throw error;
      return data as Plan[];
    },
  });
}

export function useUsageStats() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["usage_stats", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("usage_stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as UsageStats | null;
    },
    enabled: !!user,
  });
}

export function useEvaluations() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["evaluations", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("evaluations")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Evaluation[];
    },
    enabled: !!user,
  });
}

export function useOpportunities() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["opportunities", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as Opportunity[];
    },
    enabled: !!user,
  });
}

export function useCVs() {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ["cvs", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("cvs")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data as CV[];
    },
    enabled: !!user,
  });
}
