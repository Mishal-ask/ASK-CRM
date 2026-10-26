export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// This checked-in baseline mirrors the committed public-schema migrations.
// Regenerate it from the linked hosted project with `npm run db:typegen` after
// applying migrations or changing the database through the Supabase Dashboard.
export type Database = {
  public: {
    Tables: {
      payment_orders: {
        Row: {
          amount: number;
          created_at: string;
          currency: string;
          metadata: Json;
          order_id: string;
          order_name: string;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          amount: number;
          created_at?: string;
          currency?: string;
          metadata: Json;
          order_id: string;
          order_name: string;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          amount?: number;
          created_at?: string;
          currency?: string;
          metadata?: Json;
          order_id?: string;
          order_name?: string;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      payments: {
        Row: {
          approved_at: string;
          created_at: string;
          currency: string;
          metadata: Json;
          order_id: string;
          order_name: string;
          payment_id: number;
          payment_key: string;
          receipt_url: string;
          requested_at: string;
          status: string;
          total_amount: number;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          approved_at: string;
          created_at?: string;
          currency?: string;
          metadata: Json;
          order_id: string;
          order_name: string;
          payment_id?: never;
          payment_key: string;
          receipt_url: string;
          requested_at: string;
          status: string;
          total_amount: number;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          approved_at?: string;
          created_at?: string;
          currency?: string;
          metadata?: Json;
          order_id?: string;
          order_name?: string;
          payment_id?: never;
          payment_key?: string;
          receipt_url?: string;
          requested_at?: string;
          status?: string;
          total_amount?: number;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          marketing_consent: boolean;
          name: string;
          profile_id: string;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          marketing_consent?: boolean;
          name: string;
          profile_id: string;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          marketing_consent?: boolean;
          name?: string;
          profile_id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends (PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer Row;
    }
    ? Row
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer Row;
      }
      ? Row
      : never
    : never;
