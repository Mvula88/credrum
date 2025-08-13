export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          name: string | null
          image: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          image?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workspaces: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          logo: string | null
          owner_id: string
          plan: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          logo?: string | null
          owner_id: string
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          logo?: string | null
          owner_id?: string
          plan?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      workspace_members: {
        Row: {
          id: string
          user_id: string
          workspace_id: string
          role: string
          joined_at: string
        }
        Insert: {
          id?: string
          user_id: string
          workspace_id: string
          role?: string
          joined_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          workspace_id?: string
          role?: string
          joined_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          type: string
          framework: string
          status: string
          workspace_id: string
          creator_id: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          type?: string
          framework?: string
          status?: string
          workspace_id: string
          creator_id: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          type?: string
          framework?: string
          status?: string
          workspace_id?: string
          creator_id?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      components: {
        Row: {
          id: string
          name: string
          type: string
          category: string
          project_id: string
          creator_id: string
          code: string
          styles: string | null
          props: Json | null
          state: Json | null
          is_global: boolean
          version: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: string
          category: string
          project_id: string
          creator_id: string
          code: string
          styles?: string | null
          props?: Json | null
          state?: Json | null
          is_global?: boolean
          version?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          category?: string
          project_id?: string
          creator_id?: string
          code?: string
          styles?: string | null
          props?: Json | null
          state?: Json | null
          is_global?: boolean
          version?: number
          created_at?: string
          updated_at?: string
        }
      }
      pages: {
        Row: {
          id: string
          name: string
          path: string
          project_id: string
          layout: Json | null
          meta: Json | null
          is_home: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          path: string
          project_id: string
          layout?: Json | null
          meta?: Json | null
          is_home?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          path?: string
          project_id?: string
          layout?: Json | null
          meta?: Json | null
          is_home?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      component_usage: {
        Row: {
          id: string
          component_id: string
          page_id: string
          position: Json
          props: Json | null
        }
        Insert: {
          id?: string
          component_id: string
          page_id: string
          position: Json
          props?: Json | null
        }
        Update: {
          id?: string
          component_id?: string
          page_id?: string
          position?: Json
          props?: Json | null
        }
      }
      databases: {
        Row: {
          id: string
          name: string
          type: string
          project_id: string
          connection_string: string | null
          schema: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type?: string
          project_id: string
          connection_string?: string | null
          schema?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: string
          project_id?: string
          connection_string?: string | null
          schema?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      tables: {
        Row: {
          id: string
          name: string
          database_id: string
          columns: Json
          indexes: Json | null
          relations: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          database_id: string
          columns: Json
          indexes?: Json | null
          relations?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          database_id?: string
          columns?: Json
          indexes?: Json | null
          relations?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      api_routes: {
        Row: {
          id: string
          path: string
          method: string
          project_id: string
          handler: string
          middleware: Json | null
          auth: boolean
          rate_limit: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          path: string
          method: string
          project_id: string
          handler: string
          middleware?: Json | null
          auth?: boolean
          rate_limit?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          path?: string
          method?: string
          project_id?: string
          handler?: string
          middleware?: Json | null
          auth?: boolean
          rate_limit?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          name: string
          key: string
          workspace_id: string
          permissions: Json | null
          last_used: string | null
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          key: string
          workspace_id: string
          permissions?: Json | null
          last_used?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          key?: string
          workspace_id?: string
          permissions?: Json | null
          last_used?: string | null
          expires_at?: string | null
          created_at?: string
        }
      }
      deployments: {
        Row: {
          id: string
          project_id: string
          user_id: string
          provider: string
          url: string | null
          status: string
          build_log: string | null
          environment: Json | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          project_id: string
          user_id: string
          provider: string
          url?: string | null
          status: string
          build_log?: string | null
          environment?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          user_id?: string
          provider?: string
          url?: string | null
          status?: string
          build_log?: string | null
          environment?: Json | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
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
  }
}
