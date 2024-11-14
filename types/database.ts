export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      budgets: {
        Row: {
          amount: number
          created_at: string
          currency_id: string
          description: string
          end_date: string
          id: string
          start_date: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency_id?: string
          description: string
          end_date: string
          id?: string
          start_date: string
          user_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency_id?: string
          description?: string
          end_date?: string
          id?: string
          start_date?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "budgets_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budgets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          created_at: string
          id: string
          iso2_code: string
          iso3_code: string
          locale: string
        }
        Insert: {
          created_at?: string
          id?: string
          iso2_code: string
          iso3_code: string
          locale: string
        }
        Update: {
          created_at?: string
          id?: string
          iso2_code?: string
          iso3_code?: string
          locale?: string
        }
        Relationships: []
      }
      saving_accounts: {
        Row: {
          balance: number
          created_at: string
          currency_id: string
          description: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          balance: number
          created_at?: string
          currency_id?: string
          description: string
          id?: string
          name: string
          user_id?: string
        }
        Update: {
          balance?: number
          created_at?: string
          currency_id?: string
          description?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saving_accounts_currency_id_fkey"
            columns: ["currency_id"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saving_accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      savings_goals: {
        Row: {
          amount_saved: number | null
          created_at: string
          description: string | null
          id: string
          limit_date: string
          name: string
          target_amount: number
          user_id: string
        }
        Insert: {
          amount_saved?: number | null
          created_at?: string
          description?: string | null
          id?: string
          limit_date: string
          name: string
          target_amount: number
          user_id?: string
        }
        Update: {
          amount_saved?: number | null
          created_at?: string
          description?: string | null
          id?: string
          limit_date?: string
          name?: string
          target_amount?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savings_goals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      savings_goals_progress: {
        Row: {
          amount: number
          created_at: string
          id: string
          saving_goal_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          saving_goal_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          saving_goal_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "savings_goals_progress_saving_goal_id_fkey"
            columns: ["saving_goal_id"]
            isOneToOne: false
            referencedRelation: "savings_goals"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          account_id: string
          amount: number
          created_at: string
          description: string
          id: string
        }
        Insert: {
          account_id?: string
          amount: number
          created_at?: string
          description: string
          id?: string
        }
        Update: {
          account_id?: string
          amount?: number
          created_at?: string
          description?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "saving_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string
          created_at: string
          first_name: string
          id: string
          last_name: string
        }
        Insert: {
          avatar_url: string
          created_at?: string
          first_name: string
          id?: string
          last_name: string
        }
        Update: {
          avatar_url?: string
          created_at?: string
          first_name?: string
          id?: string
          last_name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
