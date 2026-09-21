'use server'

import { createClient } from '@/lib/supabase/server'
import { WebsiteSchema, WebsiteConfig } from '@/lib/validations/section'

export async function saveProjectContent(projectId: string, payload: unknown) {
  // 1. Validate payload using Zod (Security Principle: Never trust client data)
  const result = WebsiteSchema.safeParse(payload)
  if (!result.success) {
    return { error: 'Invalid project data structure' }
  }
  
  const data: WebsiteConfig = result.data
  const supabase = createClient()

  // 2. Fetch the default page for this project
  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id')
    .eq('project_id', projectId)
    .limit(1)

  if (pagesError) return { error: 'Failed to fetch project pages' }

  let pageId = pages?.[0]?.id

  // If no page exists, create one (MVP assumption: 1 project = 1 page)
  if (!pageId) {
    const { data: newPage, error: createError } = await supabase
      .from('pages')
      .insert({
        project_id: projectId,
        title: 'Home',
        slug: 'home'
      })
      .select('id')
      .single()

    if (createError) return { error: 'Failed to create default page' }
    pageId = newPage.id
  }

  // 3. Update the Project name based on AI output
  await supabase
    .from('projects')
    .update({ name: data.site.name || 'My Website' })
    .eq('id', projectId)

  // 4. Relational Sync (Frontend-first reconciliation approach)
  // Instead of a complex diffing algorithm, for MVP we delete old sections and insert the new order.
  // In an interview: "To optimize frontend speed and MVP velocity, I used a replace strategy. 
  // In a V2, I'd implement a delta-sync to minimize DB write payload."
  await supabase.from('sections').delete().eq('page_id', pageId)

  const insertPayload = data.sections.map((section, index) => ({
    page_id: pageId,
    type: section.type,
    sort_order: index,
    content_json: section.content
  }))

  if (insertPayload.length > 0) {
    const { error: insertError } = await supabase.from('sections').insert(insertPayload)
    if (insertError) return { error: 'Failed to save sections' }
  }

  return { success: true }
}

export async function getProjectContent(projectId: string) {
  const supabase = createClient()

  const { data: project, error: projError } = await supabase
    .from('projects')
    .select('name')
    .eq('id', projectId)
    .single()

  if (projError || !project) return { error: 'Project not found' }

  const { data: pages, error: pagesError } = await supabase
    .from('pages')
    .select('id')
    .eq('project_id', projectId)
    .limit(1)

  if (pagesError || !pages || pages.length === 0) {
    return { data: null } // No content yet
  }

  const { data: sections, error: sectionsError } = await supabase
    .from('sections')
    .select('type, content_json, sort_order')
    .eq('page_id', pages[0].id)
    .order('sort_order', { ascending: true })

  if (sectionsError) return { error: 'Failed to load sections' }

  // Reconstruct the WebsiteConfig shape required by the Frontend Editor
  const websiteConfig: Partial<WebsiteConfig> = {
    site: {
      name: project.name,
      theme: { style: 'modern', primaryColor: '#000000' } // Default theme for MVP
    },
    sections: sections.map(s => ({
      type: s.type,
      content: s.content_json
    })) as WebsiteConfig['sections']
  }

  return { data: websiteConfig }
}

export async function createProjectFromGeneration(payload: unknown) {
  const result = WebsiteSchema.safeParse(payload)
  if (!result.success) return { error: 'Invalid generation data' }
  const data: WebsiteConfig = result.data

  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  // 1. Get user's first workspace (MVP approach)
  const { data: members, error: memberErr } = await supabase
    .from('workspace_members')
    .select('workspace_id')
    .eq('user_id', user.id)
    .limit(1)

  if (memberErr || !members || members.length === 0) {
    return { error: 'No workspace found. Please contact support.' }
  }
  const workspaceId = members[0].workspace_id

  // 2. Create Project
  const { data: project, error: projErr } = await supabase
    .from('projects')
    .insert({
      workspace_id: workspaceId,
      name: data.site.name || 'Generated Website'
    })
    .select('id')
    .single()

  if (projErr || !project) return { error: 'Failed to create project' }

  // 3. Create Page
  const { data: page, error: pageErr } = await supabase
    .from('pages')
    .insert({ project_id: project.id, title: 'Home', slug: 'home' })
    .select('id')
    .single()
    
  if (pageErr || !page) return { error: 'Failed to create page' }

  // 4. Create Sections
  const insertPayload = data.sections.map((section, index) => ({
    page_id: page.id,
    type: section.type,
    sort_order: index,
    content_json: section.content
  }))

  if (insertPayload.length > 0) {
    const { error: insertErr } = await supabase.from('sections').insert(insertPayload)
    if (insertErr) return { error: 'Failed to save sections' }
  }

  return { success: true, projectId: project.id }
}
