import React from 'react'
import { EditorClient } from '@/components/editor/editor-client'
import { DeepPartial } from 'ai'
import { WebsiteConfig } from '@/lib/validations/section'

// For now, we mock the initial data.
// In Phase 5 (Integration), this will fetch from Supabase:
// const project = await supabase.from('projects').select('content_json').eq('id', params.id).single()
const MOCK_INITIAL_DATA: DeepPartial<WebsiteConfig> = {
  site: {
    name: 'Acme Corp',
    theme: { style: 'modern', primaryColor: '#0f172a' }
  },
  sections: [
    {
      type: 'hero',
      content: {
        headline: 'Next Generation AI Tool',
        subheadline: 'Build faster and better.',
        ctaText: 'Get Started'
      }
    },
    {
      type: 'about',
      content: {
        title: 'Who We Are',
        description: 'We are a team of passionate engineers building the future of the web.'
      }
    },
    {
      type: 'faq',
      content: {
        title: 'Frequently Asked Questions',
        questions: [
          { question: 'Is it free?', answer: 'Yes, during beta.' }
        ]
      }
    }
  ]
}

export default function EditorPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-14 border-b bg-background flex items-center px-4 justify-between shrink-0">
        <h1 className="text-sm font-semibold">Editing Project: {params.id}</h1>
        {/* Placeholder for Save/Publish buttons */}
        <div className="text-xs text-muted-foreground">Auto-saving...</div>
      </div>
      <EditorClient initialData={MOCK_INITIAL_DATA} />
    </div>
  )
}
