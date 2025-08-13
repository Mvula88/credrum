import { supabase } from "./client"
import { Database } from "@/types/database.types"

type Tables = Database["public"]["Tables"]

export const db = {
  profiles: {
    async get(userId: string) {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error) throw error
      return data
    },

    async update(userId: string, updates: Tables["profiles"]["Update"]) {
      const { data, error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", userId)
        .select()
        .single()

      if (error) throw error
      return data
    },
  },

  workspaces: {
    async list(userId: string) {
      const { data, error } = await supabase
        .from("workspaces")
        .select(
          `
          *,
          workspace_members!inner(role)
        `
        )
        .eq("workspace_members.user_id", userId)

      if (error) throw error
      return data
    },

    async get(workspaceId: string) {
      const { data, error } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", workspaceId)
        .single()

      if (error) throw error
      return data
    },

    async create(workspace: Tables["workspaces"]["Insert"]) {
      const { data, error } = await supabase.from("workspaces").insert(workspace).select().single()

      if (error) throw error

      // Add owner as a member
      const { error: memberError } = await supabase.from("workspace_members").insert({
        workspace_id: data.id,
        user_id: workspace.owner_id,
        role: "owner",
      })

      if (memberError) throw memberError

      return data
    },

    async update(workspaceId: string, updates: Tables["workspaces"]["Update"]) {
      const { data, error } = await supabase
        .from("workspaces")
        .update(updates)
        .eq("id", workspaceId)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async delete(workspaceId: string) {
      const { error } = await supabase.from("workspaces").delete().eq("id", workspaceId)

      if (error) throw error
    },
  },

  projects: {
    async list(workspaceId: string) {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },

    async get(projectId: string) {
      const { data, error } = await supabase
        .from("projects")
        .select(
          `
          *,
          components(count),
          pages(count),
          deployments(count)
        `
        )
        .eq("id", projectId)
        .single()

      if (error) throw error
      return data
    },

    async create(project: Tables["projects"]["Insert"]) {
      const { data, error } = await supabase.from("projects").insert(project).select().single()

      if (error) throw error
      return data
    },

    async update(projectId: string, updates: Tables["projects"]["Update"]) {
      const { data, error } = await supabase
        .from("projects")
        .update(updates)
        .eq("id", projectId)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async delete(projectId: string) {
      const { error } = await supabase.from("projects").delete().eq("id", projectId)

      if (error) throw error
    },
  },

  components: {
    async list(projectId: string) {
      const { data, error } = await supabase
        .from("components")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },

    async get(componentId: string) {
      const { data, error } = await supabase
        .from("components")
        .select("*")
        .eq("id", componentId)
        .single()

      if (error) throw error
      return data
    },

    async create(component: Tables["components"]["Insert"]) {
      const { data, error } = await supabase.from("components").insert(component).select().single()

      if (error) throw error
      return data
    },

    async update(componentId: string, updates: Tables["components"]["Update"]) {
      const { data, error } = await supabase
        .from("components")
        .update(updates)
        .eq("id", componentId)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async delete(componentId: string) {
      const { error } = await supabase.from("components").delete().eq("id", componentId)

      if (error) throw error
    },
  },

  pages: {
    async list(projectId: string) {
      const { data, error } = await supabase
        .from("pages")
        .select(
          `
          *,
          component_usage(
            id,
            position,
            props,
            component:components(*)
          )
        `
        )
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },

    async get(pageId: string) {
      const { data, error } = await supabase
        .from("pages")
        .select(
          `
          *,
          component_usage(
            id,
            position,
            props,
            component:components(*)
          )
        `
        )
        .eq("id", pageId)
        .single()

      if (error) throw error
      return data
    },

    async create(page: Tables["pages"]["Insert"]) {
      const { data, error } = await supabase.from("pages").insert(page).select().single()

      if (error) throw error
      return data
    },

    async update(pageId: string, updates: Tables["pages"]["Update"]) {
      const { data, error } = await supabase
        .from("pages")
        .update(updates)
        .eq("id", pageId)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async delete(pageId: string) {
      const { error } = await supabase.from("pages").delete().eq("id", pageId)

      if (error) throw error
    },
  },

  deployments: {
    async list(projectId: string) {
      const { data, error } = await supabase
        .from("deployments")
        .select(
          `
          *,
          user:profiles(name, email, image)
        `
        )
        .eq("project_id", projectId)
        .order("created_at", { ascending: false })

      if (error) throw error
      return data
    },

    async create(deployment: Tables["deployments"]["Insert"]) {
      const { data, error } = await supabase
        .from("deployments")
        .insert(deployment)
        .select()
        .single()

      if (error) throw error
      return data
    },

    async update(deploymentId: string, updates: Tables["deployments"]["Update"]) {
      const { data, error } = await supabase
        .from("deployments")
        .update(updates)
        .eq("id", deploymentId)
        .select()
        .single()

      if (error) throw error
      return data
    },
  },
}
