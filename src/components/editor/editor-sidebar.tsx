'use client'

import React from 'react'
import { useEditorStore } from '@/lib/store/editor-store'
import { DebouncedInput } from './debounced-input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight, Settings2 } from 'lucide-react'

export function EditorSidebar() {
  const { data, activeSectionIndex, setActiveSection, updateSection } = useEditorStore()

  if (!data?.sections) {
    return <div className="p-4 text-sm text-muted-foreground">No sections available.</div>
  }

  // If a section is active, show its edit form
  if (activeSectionIndex !== null && data.sections[activeSectionIndex]) {
    const section = data.sections[activeSectionIndex]
    if (!section) return null

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-background flex items-center justify-between">
          <h3 className="font-semibold capitalize">{section.type || 'Section'}</h3>
          <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
            Back
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4 space-y-6">
          {/* Dynamic forms based on section type */}
          {section.type === 'hero' && (
            <>
              <DebouncedInput 
                label="Headline" 
                initialValue={section.content?.headline || ''}
                onDebounceChange={(val) => updateSection(activeSectionIndex, { headline: val })}
              />
              <DebouncedInput 
                label="Subheadline" 
                initialValue={section.content?.subheadline || ''}
                onDebounceChange={(val) => updateSection(activeSectionIndex, { subheadline: val })}
              />
            </>
          )}
          {section.type === 'about' && (
            <>
              <DebouncedInput 
                label="Title" 
                initialValue={section.content?.title || ''}
                onDebounceChange={(val) => updateSection(activeSectionIndex, { title: val })}
              />
              <DebouncedInput 
                label="Description" 
                initialValue={section.content?.description || ''}
                onDebounceChange={(val) => updateSection(activeSectionIndex, { description: val })}
              />
            </>
          )}
          {section.type === 'faq' && (
            <>
              <DebouncedInput 
                label="Title" 
                initialValue={section.content?.title || ''}
                onDebounceChange={(val) => updateSection(activeSectionIndex, { title: val })}
              />
              {/* Complex array inputs omitted for simplicity in this iteration */}
              <div className="text-xs text-muted-foreground mt-4">
                FAQ question editing will be available soon.
              </div>
            </>
          )}
        </ScrollArea>
      </div>
    )
  }

  // Otherwise, show list of sections
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-background flex items-center gap-2">
        <Settings2 className="w-4 h-4" />
        <h3 className="font-semibold">Page Layout</h3>
      </div>
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {data.sections.map((section, idx) => {
            if (!section) return null
            return (
              <button
                key={idx}
                onClick={() => setActiveSection(idx)}
                className="w-full flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors text-left"
              >
                <div>
                  <div className="text-sm font-medium capitalize">{section.type || 'Unknown'}</div>
                  <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                    {section.content?.headline || section.content?.title || 'No title'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}
