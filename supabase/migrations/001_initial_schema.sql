-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Workspaces
create table workspaces (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Workspace Members (RBAC)
create type workspace_role as enum ('owner', 'editor', 'viewer');

create table workspace_members (
  workspace_id uuid references workspaces(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  role workspace_role not null default 'viewer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (workspace_id, user_id)
);

-- 4. Projects
create table projects (
  id uuid default uuid_generate_v4() primary key,
  workspace_id uuid references workspaces(id) on delete cascade not null,
  name text not null,
  status text not null default 'draft', -- 'draft', 'published'
  thumbnail text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Pages
create table pages (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  slug text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Sections (The dynamic blocks)
create table sections (
  id uuid default uuid_generate_v4() primary key,
  page_id uuid references pages(id) on delete cascade not null,
  type text not null, -- 'hero', 'about', 'faq'
  sort_order integer not null default 0,
  content_json jsonb not null default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. AI Generations
create table ai_generations (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  prompt text not null,
  provider text not null,
  model text not null,
  status text not null, -- 'success', 'error', 'pending'
  raw_output text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==============================================================================
-- AUTOMATIC UPDATED_AT TRIGGERS
-- ==============================================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_modtime before update on profiles for each row execute procedure update_updated_at_column();
create trigger update_workspaces_modtime before update on workspaces for each row execute procedure update_updated_at_column();
create trigger update_projects_modtime before update on projects for each row execute procedure update_updated_at_column();
create trigger update_pages_modtime before update on pages for each row execute procedure update_updated_at_column();
create trigger update_sections_modtime before update on sections for each row execute procedure update_updated_at_column();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
alter table profiles enable row level security;
alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table projects enable row level security;
alter table pages enable row level security;
alter table sections enable row level security;
alter table ai_generations enable row level security;

-- Profiles: Users can view and edit their own profile
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Workspaces: Users can view workspaces they are members of
create policy "Users can view their workspaces" on workspaces for select
  using (exists (select 1 from workspace_members where workspace_members.workspace_id = workspaces.id and workspace_members.user_id = auth.uid()));

-- Workspaces: Only owners can update workspace details
create policy "Owners can update workspace" on workspaces for update
  using (exists (select 1 from workspace_members where workspace_members.workspace_id = workspaces.id and workspace_members.user_id = auth.uid() and role = 'owner'));

-- Workspace Members: Users can see members of their workspaces
create policy "Users can view members of their workspaces" on workspace_members for select
  using (exists (select 1 from workspace_members wm where wm.workspace_id = workspace_members.workspace_id and wm.user_id = auth.uid()));

-- Projects: Users can view projects in their workspaces
create policy "Users can view projects in their workspaces" on projects for select
  using (exists (select 1 from workspace_members where workspace_members.workspace_id = projects.workspace_id and workspace_members.user_id = auth.uid()));

-- Projects: Owners and Editors can insert/update/delete projects
create policy "Editors and Owners can insert projects" on projects for insert
  with check (exists (select 1 from workspace_members where workspace_members.workspace_id = projects.workspace_id and workspace_members.user_id = auth.uid() and role in ('owner', 'editor')));
create policy "Editors and Owners can update projects" on projects for update
  using (exists (select 1 from workspace_members where workspace_members.workspace_id = projects.workspace_id and workspace_members.user_id = auth.uid() and role in ('owner', 'editor')));
create policy "Editors and Owners can delete projects" on projects for delete
  using (exists (select 1 from workspace_members where workspace_members.workspace_id = projects.workspace_id and workspace_members.user_id = auth.uid() and role in ('owner', 'editor')));

-- Helper Function for nested RLS checks: Check if user has access to a specific project
create or replace function user_has_project_access(p_project_id uuid)
returns boolean as $$
declare
  has_access boolean;
begin
  select exists (
    select 1 
    from projects p
    join workspace_members wm on p.workspace_id = wm.workspace_id
    where p.id = p_project_id and wm.user_id = auth.uid()
  ) into has_access;
  return has_access;
end;
$$ language plpgsql security definer;

-- Pages: Based on project access
create policy "Users can view project pages" on pages for select using (user_has_project_access(project_id));
create policy "Editors can insert pages" on pages for insert with check (user_has_project_access(project_id));
create policy "Editors can update pages" on pages for update using (user_has_project_access(project_id));
create policy "Editors can delete pages" on pages for delete using (user_has_project_access(project_id));

-- Sections: Based on page -> project access
-- Helper Function for nested section RLS
create or replace function user_has_page_access(p_page_id uuid)
returns boolean as $$
declare
  has_access boolean;
begin
  select exists (
    select 1 
    from pages pa
    join projects p on pa.project_id = p.id
    join workspace_members wm on p.workspace_id = wm.workspace_id
    where pa.id = p_page_id and wm.user_id = auth.uid()
  ) into has_access;
  return has_access;
end;
$$ language plpgsql security definer;

create policy "Users can view page sections" on sections for select using (user_has_page_access(page_id));
create policy "Editors can insert sections" on sections for insert with check (user_has_page_access(page_id));
create policy "Editors can update sections" on sections for update using (user_has_page_access(page_id));
create policy "Editors can delete sections" on sections for delete using (user_has_page_access(page_id));

-- AI Generations: Based on project access
create policy "Users can view project ai generations" on ai_generations for select using (user_has_project_access(project_id));
create policy "Editors can insert ai generations" on ai_generations for insert with check (user_has_project_access(project_id));
