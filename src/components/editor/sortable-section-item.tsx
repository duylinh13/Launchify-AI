'use client'

import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { ChevronRight, GripVertical } from 'lucide-react'

interface SortableSectionItemProps {
  id: string
  index: number
  type: string
  title: string
  onClick: () => void
}

export function SortableSectionItem({ id, type, title, onClick }: SortableSectionItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`w-full flex items-center justify-between p-3 rounded-md border bg-card hover:border-primary/50 transition-colors text-left group ${
        isDragging ? 'border-primary ring-1 ring-primary' : 'border-border'
      }`}
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground hover:text-foreground shrink-0"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="w-4 h-4" />
        </button>
        <div className="overflow-hidden cursor-pointer" onClick={onClick}>
          <div className="text-sm font-medium capitalize truncate">{type}</div>
          <div className="text-xs text-muted-foreground truncate">{title}</div>
        </div>
      </div>
      <button 
        className="text-muted-foreground hover:text-foreground shrink-0 p-1"
        onClick={onClick}
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}
