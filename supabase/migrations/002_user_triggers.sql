-- Create workspace and profile on user signup
create or replace function public.handle_new_user() 
returns trigger as $$ 
declare 
  new_workspace_id uuid; 
begin 
  -- 1. Create Profile
  insert into public.profiles (id, full_name, avatar_url) 
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url'); 
  
  -- 2. Create Default Workspace
  insert into public.workspaces (name) 
  values ('Personal Workspace') 
  returning id into new_workspace_id; 
  
  -- 3. Assign Owner Role
  insert into public.workspace_members (workspace_id, user_id, role) 
  values (new_workspace_id, new.id, 'owner'); 
  
  return new; 
end; 
$$ language plpgsql security definer;

-- Bind the trigger
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created 
  after insert on auth.users 
  for each row execute procedure public.handle_new_user();
