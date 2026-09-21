'use client'

import React, { useEffect } from 'react'
import { useEditorStore } from '@/lib/store/editor-store'
import { WebsiteConfig } from '@/lib/validations/section'
import { DeepPartial } from 'ai'
import { SectionRenderer } from '@/components/website/SectionRenderer'
import { EditorSidebar } from './editor-sidebar'

interface EditorClientProps {
  initialData: DeepPartial<WebsiteConfig>
}

export function EditorClient({ initialData }: EditorClientProps) {
  const { data, setData } = useEditorStore()

  // Initialize store on mount
  useEffect(() => {
    setData(initialData)
  }, [initialData, setData])

  if (!data) return <div className="p-8 flex justify-center">Loading editor...</div>

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
      {/* Left Sidebar (Configuration) */}
      <div className="w-80 border-r bg-muted/30 flex flex-col h-full overflow-hidden">
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
  )
}
