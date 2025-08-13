-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.components ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.component_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.databases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deployments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Workspaces policies
CREATE POLICY "Users can view workspaces they belong to" ON public.workspaces
    FOR SELECT USING (
        auth.uid() = owner_id OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_members.workspace_id = workspaces.id
            AND workspace_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create workspaces" ON public.workspaces
    FOR INSERT WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Workspace owners can update their workspaces" ON public.workspaces
    FOR UPDATE USING (auth.uid() = owner_id);

CREATE POLICY "Workspace owners can delete their workspaces" ON public.workspaces
    FOR DELETE USING (auth.uid() = owner_id);

-- Workspace members policies
CREATE POLICY "Workspace members can view members of their workspaces" ON public.workspace_members
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members wm
            WHERE wm.workspace_id = workspace_members.workspace_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace owners and admins can add members" ON public.workspace_members
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.workspace_members wm
            WHERE wm.workspace_id = workspace_members.workspace_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin')
        ) OR
        EXISTS (
            SELECT 1 FROM public.workspaces w
            WHERE w.id = workspace_members.workspace_id
            AND w.owner_id = auth.uid()
        )
    );

CREATE POLICY "Workspace owners and admins can update members" ON public.workspace_members
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members wm
            WHERE wm.workspace_id = workspace_members.workspace_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Workspace owners and admins can remove members" ON public.workspace_members
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members wm
            WHERE wm.workspace_id = workspace_members.workspace_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin')
        ) OR
        workspace_members.user_id = auth.uid() -- Users can remove themselves
    );

-- Projects policies
CREATE POLICY "Users can view projects in their workspaces" ON public.projects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_members.workspace_id = projects.workspace_id
            AND workspace_members.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can create projects" ON public.projects
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_members.workspace_id = projects.workspace_id
            AND workspace_members.user_id = auth.uid()
            AND workspace_members.role IN ('owner', 'admin', 'member')
        )
    );

CREATE POLICY "Project creators and workspace admins can update projects" ON public.projects
    FOR UPDATE USING (
        auth.uid() = creator_id OR
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_members.workspace_id = projects.workspace_id
            AND workspace_members.user_id = auth.uid()
            AND workspace_members.role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Workspace owners and admins can delete projects" ON public.projects
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_members.workspace_id = projects.workspace_id
            AND workspace_members.user_id = auth.uid()
            AND workspace_members.role IN ('owner', 'admin')
        )
    );

-- Components policies
CREATE POLICY "Users can view components in their projects" ON public.components
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = components.project_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can create components" ON public.components
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = components.project_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin', 'member')
        )
    );

CREATE POLICY "Component creators and workspace admins can update components" ON public.components
    FOR UPDATE USING (
        auth.uid() = creator_id OR
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = components.project_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Workspace admins can delete components" ON public.components
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = components.project_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin')
        )
    );

-- Pages policies (similar pattern for remaining tables)
CREATE POLICY "Users can view pages in their projects" ON public.pages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = pages.project_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can manage pages" ON public.pages
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = pages.project_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin', 'member')
        )
    );

-- Component usage policies
CREATE POLICY "Users can view component usage in their projects" ON public.component_usage
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.pages p
            JOIN public.projects pr ON pr.id = p.project_id
            JOIN public.workspace_members wm ON wm.workspace_id = pr.workspace_id
            WHERE p.id = component_usage.page_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can manage component usage" ON public.component_usage
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.pages p
            JOIN public.projects pr ON pr.id = p.project_id
            JOIN public.workspace_members wm ON wm.workspace_id = pr.workspace_id
            WHERE p.id = component_usage.page_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin', 'member')
        )
    );

-- Databases policies
CREATE POLICY "Users can view databases in their projects" ON public.databases
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = databases.project_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can manage databases" ON public.databases
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = databases.project_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin', 'member')
        )
    );

-- Tables policies
CREATE POLICY "Users can view tables in their databases" ON public.tables
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.databases d
            JOIN public.projects p ON p.id = d.project_id
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE d.id = tables.database_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can manage tables" ON public.tables
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.databases d
            JOIN public.projects p ON p.id = d.project_id
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE d.id = tables.database_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin', 'member')
        )
    );

-- API Routes policies
CREATE POLICY "Users can view API routes in their projects" ON public.api_routes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = api_routes.project_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can manage API routes" ON public.api_routes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = api_routes.project_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin', 'member')
        )
    );

-- API Keys policies
CREATE POLICY "Users can view API keys in their workspaces" ON public.api_keys
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_members.workspace_id = api_keys.workspace_id
            AND workspace_members.user_id = auth.uid()
            AND workspace_members.role IN ('owner', 'admin')
        )
    );

CREATE POLICY "Workspace admins can manage API keys" ON public.api_keys
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.workspace_members
            WHERE workspace_members.workspace_id = api_keys.workspace_id
            AND workspace_members.user_id = auth.uid()
            AND workspace_members.role IN ('owner', 'admin')
        )
    );

-- Deployments policies
CREATE POLICY "Users can view deployments in their projects" ON public.deployments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = deployments.project_id
            AND wm.user_id = auth.uid()
        )
    );

CREATE POLICY "Workspace members can create deployments" ON public.deployments
    FOR INSERT WITH CHECK (
        auth.uid() = user_id AND
        EXISTS (
            SELECT 1 FROM public.projects p
            JOIN public.workspace_members wm ON wm.workspace_id = p.workspace_id
            WHERE p.id = deployments.project_id
            AND wm.user_id = auth.uid()
            AND wm.role IN ('owner', 'admin', 'member')
        )
    );

CREATE POLICY "Deployment creators can update their deployments" ON public.deployments
    FOR UPDATE USING (auth.uid() = user_id);