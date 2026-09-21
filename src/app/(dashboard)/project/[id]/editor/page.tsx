import React from 'react'
import { EditorClient } from '@/components/editor/editor-client'
import { getProjectContent } from '@/app/actions/project'
import { redirect } from 'next/navigation'

export default async function EditorPage({ params }: { params: { id: string } }) {
  const { data, error } = await getProjectContent(params.id)

  if (error) {
    // If not found or unauthorized (RLS), kick them out to dashboard
    redirect('/dashboard')
  }

  // If no data exists yet (e.g. blank project), provide a fallback
  const initialData = data || {
    site: { name: 'New Project', theme: { style: 'modern', primaryColor: '#000000' } },
    sections: []
  }

  return (
    <div className="flex flex-col h-full w-full">
      <EditorClient initialData={initialData} projectId={params.id} />
    </div>
  )
}
