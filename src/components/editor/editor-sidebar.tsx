'use client'

import React from 'react'
import { useEditorStore } from '@/lib/store/editor-store'
import { DebouncedInput } from './debounced-input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings2 } from 'lucide-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortableSectionItem } from './sortable-section-item'

export function EditorSidebar() {
  const { data, activeSectionIndex, setActiveSection, updateSection, reorderSections } = useEditorStore()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = data?.sections?.findIndex((_, idx) => `section-${idx}` === active.id) ?? -1
      const newIndex = data?.sections?.findIndex((_, idx) => `section-${idx}` === over.id) ?? -1
      
      if (oldIndex !== -1 && newIndex !== -1) {
        reorderSections(oldIndex, newIndex)
      }
    }
  }

  if (!data?.sections) {
    return <div className="p-4 text-sm text-muted-foreground">No sections available.</div>
  }

  // If a section is active, show its edit form
  if (activeSectionIndex !== null && data.sections[activeSectionIndex]) {
    const section = data.sections[activeSectionIndex]
    if (!section) return null

    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b bg-background flex items-center justify-between shrink-0">
          <h3 className="font-semibold capitalize">{section.type || 'Section'}</h3>
          <Button variant="ghost" size="sm" onClick={() => setActiveSection(null)}>
            Back
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4 space-y-6">
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
              <div className="text-xs text-muted-foreground mt-4">
                FAQ question editing will be available soon.
              </div>
            </>
          )}
        </ScrollArea>
      </div>
    )
  }

  const items = data.sections.map((_, idx) => `section-${idx}`)

  // Otherwise, show list of sections
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b bg-background flex items-center gap-2 shrink-0">
        <Settings2 className="w-4 h-4" />
        <h3 className="font-semibold">Page Layout</h3>
      </div>
      <ScrollArea className="flex-1 p-4">
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext 
            items={items}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {data.sections.map((section, idx) => {
                if (!section) return null
                return (
                  <SortableSectionItem
                    key={`section-${idx}`}
                    id={`section-${idx}`}
                    index={idx}
                    type={section.type || 'Unknown'}
                    title={section.content?.headline || section.content?.title || 'No title'}
                    onClick={() => setActiveSection(idx)}
                  />
                )
              })}
            </div>
          </SortableContext>
        </DndContext>
      </ScrollArea>
    </div>
  )
}
