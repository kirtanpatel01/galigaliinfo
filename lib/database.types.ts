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
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      ads: {
        Row: {
          clicks: number | null
          created_at: string
          id: number
          image: string | null
          product_id: number
          user_id: string
          views: number | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string
          id?: number
          image?: string | null
          product_id: number
          user_id: string
          views?: number | null
        }
        Update: {
          clicks?: number | null
          created_at?: string
          id?: number
          image?: string | null
          product_id?: number
          user_id?: string
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ads_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      offers: {
        Row: {
          amount: number | null
          created_at: string
          description: string
          expiry: string | null
          id: number
          percentage: number | null
          price: number | null
          product_id: number
          qty: number | null
          type: string
          user_id: string
        }
        Insert: {
          amount?: number | null
          created_at?: string
          description: string
          expiry?: string | null
          id?: number
          percentage?: number | null
          price?: number | null
          product_id: number
          qty?: number | null
          type: string
          user_id?: string
        }
        Update: {
          amount?: number | null
          created_at?: string
          description?: string
          expiry?: string | null
          id?: number
          percentage?: number | null
          price?: number | null
          product_id?: number
          qty?: number | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "offers_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      order_items: {
        Row: {
          created_at: string
          id: number
          line_total: number
          name: string
          order_id: number | null
          price: number
          product_id: number
          qty: number
          qty_unit: string
        }
        Insert: {
          created_at?: string
          id?: number
          line_total: number
          name: string
          order_id?: number | null
          price: number
          product_id: number
          qty: number
          qty_unit: string
        }
        Update: {
          created_at?: string
          id?: number
          line_total?: number
          name?: string
          order_id?: number | null
          price?: number
          product_id?: number
          qty?: number
          qty_unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "self_pickup_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string
          customer_id: string
          id: number
          no_of_products: number
          shop_id: string
          status: string
          total_amount: number
        }
        Insert: {
          created_at?: string
          customer_id: string
          id?: number
          no_of_products: number
          shop_id: string
          status?: string
          total_amount: number
        }
        Update: {
          created_at?: string
          customer_id?: string
          id?: number
          no_of_products?: number
          shop_id?: string
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_profile_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string
          description: string
          id: number
          images: string[]
          isHidden: boolean | null
          name: string
          price: number | null
          qty: number | null
          qty_available: number | null
          qty_unit: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          description: string
          id?: number
          images: string[]
          isHidden?: boolean | null
          name: string
          price?: number | null
          qty?: number | null
          qty_available?: number | null
          qty_unit?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: number
          images?: string[]
          isHidden?: boolean | null
          name?: string
          price?: number | null
          qty?: number | null
          qty_available?: number | null
          qty_unit?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profile: {
        Row: {
          address: string | null
          avatar: string | null
          city: string | null
          country: string | null
          created_at: string
          fullName: string | null
          id: number
          phone: number | null
          pincode: number | null
          role: string | null
          shopName: string | null
          shopPhoto: string | null
          state: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          address?: string | null
          avatar?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          fullName?: string | null
          id?: number
          phone?: number | null
          pincode?: number | null
          role?: string | null
          shopName?: string | null
          shopPhoto?: string | null
          state?: string | null
          user_id?: string
          username?: string | null
        }
        Update: {
          address?: string | null
          avatar?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          fullName?: string | null
          id?: number
          phone?: number | null
          pincode?: number | null
          role?: string | null
          shopName?: string | null
          shopPhoto?: string | null
          state?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          content: string
          created_at: string
          id: number
          product_id: number
          rating: number | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: number
          product_id: number
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: number
          product_id?: number
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      self_pickup_orders: {
        Row: {
          created_at: string | null
          customer_id: string | null
          customer_name: string | null
          id: number | null
          no_of_products: number | null
          shop_id: string | null
          shop_name: string | null
          status: string | null
          total_amount: number | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_customer_profile_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Functions: {
      create_product_with_offers: {
        Args: {
          p_description: string
          p_images: string[]
          p_name: string
          p_offers: Json
          p_price: number
          p_qty: number
          p_qty_available: number
          p_qty_unit: string
          p_user_id: string
        }
        Returns: Json
      }
      debug_check: {
        Args: { row_id: string; uid: string }
        Returns: boolean
      }
      get_uid: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      increment_ad_click: {
        Args: { ad_id: number }
        Returns: undefined
      }
      increment_ad_view: {
        Args: { ad_id: number }
        Returns: undefined
      }
      place_order: {
        Args: { p_customer_id: string; p_products: Json; p_shop_id: string }
        Returns: number
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
