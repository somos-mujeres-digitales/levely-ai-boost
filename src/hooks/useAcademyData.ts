import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useAcademyRoutes(category?: string) {
  return useQuery({
    queryKey: ["academy_routes", category],
    queryFn: async () => {
      let query = supabase
        .from("academy_routes")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false });
      if (category && category !== "all") {
        query = query.eq("category", category);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useAcademyRoute(routeId: string | undefined) {
  return useQuery({
    queryKey: ["academy_route", routeId],
    queryFn: async () => {
      if (!routeId) return null;
      const { data, error } = await supabase
        .from("academy_routes")
        .select("*")
        .eq("id", routeId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!routeId,
  });
}

export function useAcademyModules(routeId: string | undefined) {
  return useQuery({
    queryKey: ["academy_modules", routeId],
    queryFn: async () => {
      if (!routeId) return [];
      const { data, error } = await supabase
        .from("academy_modules")
        .select("*")
        .eq("route_id", routeId)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: !!routeId,
  });
}

export function useAcademyLessons(moduleId: string | undefined) {
  return useQuery({
    queryKey: ["academy_lessons", moduleId],
    queryFn: async () => {
      if (!moduleId) return [];
      const { data, error } = await supabase
        .from("academy_lessons")
        .select("*")
        .eq("module_id", moduleId)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: !!moduleId,
  });
}

export function useAllLessonsForRoute(routeId: string | undefined) {
  return useQuery({
    queryKey: ["academy_all_lessons", routeId],
    queryFn: async () => {
      if (!routeId) return [];
      const { data: modules } = await supabase
        .from("academy_modules")
        .select("id")
        .eq("route_id", routeId);
      if (!modules?.length) return [];
      const moduleIds = modules.map((m) => m.id);
      const { data, error } = await supabase
        .from("academy_lessons")
        .select("*")
        .in("module_id", moduleIds)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    enabled: !!routeId,
  });
}

export function useUserProgress(routeId?: string) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["academy_progress", user?.id, routeId],
    queryFn: async () => {
      if (!user) return [];
      let query = supabase
        .from("academy_user_progress")
        .select("*")
        .eq("user_id", user.id);
      if (routeId) query = query.eq("route_id", routeId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useActiveRoutes() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["academy_active_routes", user?.id],
    queryFn: async () => {
      if (!user) return [];
      // Get distinct route_ids from progress
      const { data: progress } = await supabase
        .from("academy_user_progress")
        .select("route_id")
        .eq("user_id", user.id);
      if (!progress?.length) return [];
      const routeIds = [...new Set(progress.map((p) => p.route_id))];
      const { data, error } = await supabase
        .from("academy_routes")
        .select("*")
        .in("id", routeIds);
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useMarkLessonComplete() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ lessonId, routeId }: { lessonId: string; routeId: string }) => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("academy_user_progress").upsert(
        {
          user_id: user.id,
          route_id: routeId,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "user_id,lesson_id" }
      );
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["academy_progress"] });
      queryClient.invalidateQueries({ queryKey: ["academy_active_routes"] });
    },
  });
}

export function useAcademyResources(category?: string) {
  return useQuery({
    queryKey: ["academy_resources", category],
    queryFn: async () => {
      let query = supabase.from("academy_resources").select("*").order("created_at", { ascending: false });
      if (category && category !== "all") query = query.eq("category", category);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
}

export function useAcademyExperts() {
  return useQuery({
    queryKey: ["academy_experts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("academy_experts").select("*");
      if (error) throw error;
      return data;
    },
  });
}
