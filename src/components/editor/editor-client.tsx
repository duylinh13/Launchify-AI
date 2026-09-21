'use client'

import React, { useEffect, useTransition } from 'react'
import { useEditorStore } from '@/lib/store/editor-store'
import { WebsiteConfig } from '@/lib/validations/section'
import { DeepPartial } from 'ai'
import { SectionRenderer } from '@/components/website/SectionRenderer'
import { EditorSidebar } from './editor-sidebar'
import { Button } from '@/components/ui/button'
import { saveProjectContent } from '@/app/actions/project'
import { Loader2, Save } from 'lucide-react'
import { toast } from 'sonner'

interface EditorClientProps {
  initialData: DeepPartial<WebsiteConfig>
  projectId: string
}

export function EditorClient({ initialData, projectId }: EditorClientProps) {
  const { data, setData } = useEditorStore()
  const [isPending, startTransition] = useTransition()

  // Initialize store with server data ONLY once on mount
  useEffect(() => {
    if (initialData) {
      setData(initialData)
    }
  }, [initialData, setData])

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveProjectContent(projectId, data)
      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success('Project saved successfully!')
      }
    })
  }

  if (!data) return <div className="p-8 flex justify-center">Loading editor...</div>

  return (
    <div className="flex flex-col w-full h-[calc(100vh-4rem)] bg-background">
      {/* Save Header Row */}
      <div className="h-14 border-b bg-background flex items-center px-4 justify-between shrink-0 shadow-sm z-10">
        <h1 className="text-sm font-semibold">
          Editing: <span className="font-normal text-muted-foreground">{data.site?.name || 'Untitled'}</span>
        </h1>
        <Button 
          onClick={handleSave} 
          disabled={isPending}
          size="sm"
          className="gap-2"
        >
          {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isPending ? 'Saving...' : 'Save Project'}
        </Button>
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        {/* Left Sidebar (Configuration) */}
        <div className="w-80 border-r bg-muted/30 flex flex-col h-full overflow-hidden shrink-0">
          <EditorSidebar />
        </div>

        {/* Right Preview (Canvas) */}
        <div className="flex-1 overflow-y-auto relative bg-dot-pattern bg-muted/10 p-4 lg:p-8">
          <div className="mx-auto w-full max-w-[1200px] bg-background shadow-2xl rounded-lg overflow-hidden border">
            {data.sections ? (
              // @ts-expect-error - SectionRenderer is built to handle partials
              <SectionRenderer sections={data.sections} />
            ) : (
              <div className="p-12 text-center text-muted-foreground">No sections to display.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
