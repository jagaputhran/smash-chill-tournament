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
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          admin_id: string | null
          after_state: Json | null
          before_state: Json | null
          created_at: string
          id: string
          match_id: string | null
          reason: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string
          id?: string
          match_id?: string | null
          reason?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          after_state?: Json | null
          before_state?: Json | null
          created_at?: string
          id?: string
          match_id?: string | null
          reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      game_scores: {
        Row: {
          game_no: number
          id: string
          match_id: string
          team_a_points: number
          team_b_points: number
          updated_at: string
        }
        Insert: {
          game_no: number
          id?: string
          match_id: string
          team_a_points?: number
          team_b_points?: number
          updated_at?: string
        }
        Update: {
          game_no?: number
          id?: string
          match_id?: string
          team_a_points?: number
          team_b_points?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "game_scores_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          id: string
          name: string
          position: number
          tournament_id: string
        }
        Insert: {
          id?: string
          name: string
          position: number
          tournament_id: string
        }
        Update: {
          id?: string
          name?: string
          position?: number
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          bracket_position: number | null
          court: number | null
          created_at: string
          current_game: number
          finalized_at: string | null
          group_id: string | null
          id: string
          loser_next_match_id: string | null
          loser_next_slot: string | null
          match_no: number
          next_match_id: string | null
          next_slot: string | null
          notes: string | null
          reason: string | null
          result_type: string | null
          scheduled_at: string | null
          server_team: string | null
          stage: string
          stage_label: string | null
          status: string
          team_a_id: string | null
          team_b_id: string | null
          tournament_id: string
          updated_at: string
          version: number
          winner_team_id: string | null
        }
        Insert: {
          bracket_position?: number | null
          court?: number | null
          created_at?: string
          current_game?: number
          finalized_at?: string | null
          group_id?: string | null
          id?: string
          loser_next_match_id?: string | null
          loser_next_slot?: string | null
          match_no: number
          next_match_id?: string | null
          next_slot?: string | null
          notes?: string | null
          reason?: string | null
          result_type?: string | null
          scheduled_at?: string | null
          server_team?: string | null
          stage: string
          stage_label?: string | null
          status?: string
          team_a_id?: string | null
          team_b_id?: string | null
          tournament_id: string
          updated_at?: string
          version?: number
          winner_team_id?: string | null
        }
        Update: {
          bracket_position?: number | null
          court?: number | null
          created_at?: string
          current_game?: number
          finalized_at?: string | null
          group_id?: string | null
          id?: string
          loser_next_match_id?: string | null
          loser_next_slot?: string | null
          match_no?: number
          next_match_id?: string | null
          next_slot?: string | null
          notes?: string | null
          reason?: string | null
          result_type?: string | null
          scheduled_at?: string | null
          server_team?: string | null
          stage?: string
          stage_label?: string | null
          status?: string
          team_a_id?: string | null
          team_b_id?: string | null
          tournament_id?: string
          updated_at?: string
          version?: number
          winner_team_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_loser_next_match_id_fkey"
            columns: ["loser_next_match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_next_match_id_fkey"
            columns: ["next_match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_a_id_fkey"
            columns: ["team_a_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_b_id_fkey"
            columns: ["team_b_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_winner_team_id_fkey"
            columns: ["winner_team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          group_id: string | null
          id: string
          name: string
          player1: string | null
          player2: string | null
          seed: number | null
          tournament_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id?: string | null
          id?: string
          name: string
          player1?: string | null
          player2?: string | null
          seed?: number | null
          tournament_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string | null
          id?: string
          name?: string
          player1?: string | null
          player2?: string | null
          seed?: number | null
          tournament_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teams_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teams_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          best_of: number
          cap_points: number
          created_at: string
          event_date: string | null
          expected_teams: number
          fixtures_generated: boolean
          format: string | null
          id: string
          instagram_url: string | null
          name: string
          num_groups: number | null
          points_to_win: number
          qualifiers_per_group: number | null
          setup_complete: boolean
          status: string
          tagline: string
          teams_locked: boolean
          tie_breakers: Json
          updated_at: string
          venue: string | null
          win_by: number
        }
        Insert: {
          best_of?: number
          cap_points?: number
          created_at?: string
          event_date?: string | null
          expected_teams?: number
          fixtures_generated?: boolean
          format?: string | null
          id?: string
          instagram_url?: string | null
          name?: string
          num_groups?: number | null
          points_to_win?: number
          qualifiers_per_group?: number | null
          setup_complete?: boolean
          status?: string
          tagline?: string
          teams_locked?: boolean
          tie_breakers?: Json
          updated_at?: string
          venue?: string | null
          win_by?: number
        }
        Update: {
          best_of?: number
          cap_points?: number
          created_at?: string
          event_date?: string | null
          expected_teams?: number
          fixtures_generated?: boolean
          format?: string | null
          id?: string
          instagram_url?: string | null
          name?: string
          num_groups?: number | null
          points_to_win?: number
          qualifiers_per_group?: number | null
          setup_complete?: boolean
          status?: string
          tagline?: string
          teams_locked?: boolean
          tie_breakers?: Json
          updated_at?: string
          venue?: string | null
          win_by?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin"],
    },
  },
} as const
