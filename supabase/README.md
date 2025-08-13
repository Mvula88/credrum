# Supabase Database Setup

## Overview

This project uses Supabase as the database and authentication provider. All database schemas are defined as SQL migrations in the `migrations/` directory.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Create a new project
3. Save your project URL and anon key

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_PROJECT_ID=your_project_id
```

### 3. Run Migrations

Execute the SQL migrations in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run each migration file in order:
   - `001_initial_schema.sql` - Creates all tables
   - `002_row_level_security.sql` - Sets up RLS policies
   - `003_auth_trigger.sql` - Creates auth triggers

### 4. Generate TypeScript Types

To generate TypeScript types from your database schema:

```bash
npm run db:types
```

This will create/update `src/types/database.types.ts`

## Database Structure

### Core Tables

- `profiles` - User profiles (extends Supabase auth)
- `workspaces` - Multi-tenant workspaces
- `workspace_members` - Workspace membership and roles
- `projects` - Application projects
- `components` - Reusable UI components
- `pages` - Application pages
- `component_usage` - Component instances on pages
- `databases` - Database configurations
- `tables` - Database table definitions
- `api_routes` - API endpoint definitions
- `api_keys` - Workspace API keys
- `deployments` - Deployment history

### Security

- Row Level Security (RLS) is enabled on all tables
- Policies ensure users can only access data they have permission to view
- Workspace-based multi-tenancy with role-based access control

### Database Utilities

The project includes typed database utilities in `src/lib/db/`:

- `client.ts` - Typed Supabase client
- `queries.ts` - Pre-built query functions for common operations

## Usage Examples

```typescript
import { db } from "@/lib/db/queries"

// Get user's workspaces
const workspaces = await db.workspaces.list(userId)

// Create a new project
const project = await db.projects.create({
  name: "My App",
  slug: "my-app",
  workspace_id: workspaceId,
  creator_id: userId,
})

// Get components for a project
const components = await db.components.list(projectId)
```
