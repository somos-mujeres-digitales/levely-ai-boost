export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      cv_analyses: {
        Row: {
          created_at: string
          cv_id: string | null
          employability_score: number | null
          full_feedback: Json | null
          id: string
          opportunities: Json | null
          optimized_versions: Json | null
          preview_growth_area: string | null
          preview_insight: string | null
          preview_opportunity: Json | null
          recommendations: Json | null
          roadmap: Json | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cv_id?: string | null
          employability_score?: number | null
          full_feedback?: Json | null
          id?: string
          opportunities?: Json | null
          optimized_versions?: Json | null
          preview_growth_area?: string | null
          preview_insight?: string | null
          preview_opportunity?: Json | null
          recommendations?: Json | null
          roadmap?: Json | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cv_id?: string | null
          employability_score?: number | null
          full_feedback?: Json | null
          id?: string
          opportunities?: Json | null
          optimized_versions?: Json | null
          preview_growth_area?: string | null
          preview_insight?: string | null
          preview_opportunity?: Json | null
          recommendations?: Json | null
          roadmap?: Json | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cv_analyses_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "cvs"
            referencedColumns: ["id"]
          },
        ]
      }
      cvs: {
        Row: {
          content: Json | null
          created_at: string
          file_url: string | null
          id: string
          is_optimized: boolean
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content?: Json | null
          created_at?: string
          file_url?: string | null
          id?: string
          is_optimized?: boolean
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: Json | null
          created_at?: string
          file_url?: string | null
          id?: string
          is_optimized?: boolean
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      evaluations: {
        Row: {
          created_at: string
          cv_id: string | null
          feedback: Json | null
          growth_areas: Json | null
          id: string
          score: number | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          cv_id?: string | null
          feedback?: Json | null
          growth_areas?: Json | null
          id?: string
          score?: number | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          cv_id?: string | null
          feedback?: Json | null
          growth_areas?: Json | null
          id?: string
          score?: number | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_cv_id_fkey"
            columns: ["cv_id"]
            isOneToOne: false
            referencedRelation: "cvs"
            referencedColumns: ["id"]
          },
        ]
      }
      opportunities: {
        Row: {
          company: string | null
          country: string | null
          created_at: string
          deadline: string | null
          id: string
          is_remote: boolean
          is_viewed: boolean
          location: string | null
          match_score: number | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          company?: string | null
          country?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          is_remote?: boolean
          is_viewed?: boolean
          location?: string | null
          match_score?: number | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          company?: string | null
          country?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          is_remote?: boolean
          is_viewed?: boolean
          location?: string | null
          match_score?: number | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      plans: {
        Row: {
          created_at: string
          has_community: boolean
          has_radar_pro: boolean
          id: string
          max_cvs: number
          max_evaluations: number
          max_opportunities: number
          name: string
          price: number
        }
        Insert: {
          created_at?: string
          has_community?: boolean
          has_radar_pro?: boolean
          id?: string
          max_cvs?: number
          max_evaluations?: number
          max_opportunities?: number
          name: string
          price: number
        }
        Update: {
          created_at?: string
          has_community?: boolean
          has_radar_pro?: boolean
          id?: string
          max_cvs?: number
          max_evaluations?: number
          max_opportunities?: number
          name?: string
          price?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          credits: number
          employability_score: number | null
          full_name: string | null
          id: string
          industry: string | null
          plan_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          credits?: number
          employability_score?: number | null
          full_name?: string | null
          id?: string
          industry?: string | null
          plan_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          credits?: number
          employability_score?: number | null
          full_name?: string | null
          id?: string
          industry?: string | null
          plan_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "plans"
            referencedColumns: ["id"]
          },
        ]
      }
      purchases: {
        Row: {
          amount: number
          analysis_id: string | null
          created_at: string
          credits_added: number
          id: string
          plan_name: string
          status: string
          user_id: string
        }
        Insert: {
          amount: number
          analysis_id?: string | null
          created_at?: string
          credits_added?: number
          id?: string
          plan_name: string
          status?: string
          user_id: string
        }
        Update: {
          amount?: number
          analysis_id?: string | null
          created_at?: string
          credits_added?: number
          id?: string
          plan_name?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchases_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "cv_analyses"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_stats: {
        Row: {
          cvs_created: number
          evaluations_used: number
          id: string
          opportunities_viewed: number
          updated_at: string
          user_id: string
        }
        Insert: {
          cvs_created?: number
          evaluations_used?: number
          id?: string
          opportunities_viewed?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          cvs_created?: number
          evaluations_used?: number
          id?: string
          opportunities_viewed?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_plan_limits: {
        Args: { p_user_id: string }
        Returns: {
          has_community: boolean
          has_radar_pro: boolean
          max_cvs: number
          max_evaluations: number
          max_opportunities: number
          plan_name: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
