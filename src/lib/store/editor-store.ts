import { create } from 'zustand'
import { DeepPartial } from 'ai'
import { WebsiteConfig } from '../validations/section'

interface EditorState {
  data: DeepPartial<WebsiteConfig> | null
  activeSectionIndex: number | null
  
  // Actions
  setData: (data: DeepPartial<WebsiteConfig>) => void
  setActiveSection: (index: number | null) => void
  updateSection: (index: number, content: Record<string, unknown>) => void
  reorderSections: (startIndex: number, endIndex: number) => void
}

export const useEditorStore = create<EditorState>((set) => ({
  data: null,
  activeSectionIndex: null,

  setData: (data) => set({ data }),
  
  setActiveSection: (index) => set({ activeSectionIndex: index }),
  
  updateSection: (index, content) => set((state) => {
    if (!state.data || !state.data.sections) return state
    
    const newSections = [...state.data.sections]
    newSections[index] = {
      ...newSections[index],
      // @ts-expect-error - Safe merge for partial union structures
      content: {
        ...newSections[index]?.content,
        ...content
      }
    }
    
    return {
      data: {
        ...state.data,
        sections: newSections
      }
    }
  }),
  
  reorderSections: (startIndex, endIndex) => set((state) => {
    if (!state.data || !state.data.sections) return state
    
    const newSections = [...state.data.sections]
    const [removed] = newSections.splice(startIndex, 1)
    newSections.splice(endIndex, 0, removed)
    
    return {
      data: {
        ...state.data,
        sections: newSections
      }
    }
  })
}))
