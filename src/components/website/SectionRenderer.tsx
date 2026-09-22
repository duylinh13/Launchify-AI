import React from 'react'
import type { Section } from '@/lib/validations/section'

// For optimal bundle sizes if these were client components, we'd use next/dynamic here.
// Since these are currently Server Components, standard imports are fine as they don't bloat the client bundle.
import { Hero } from './sections/hero'
import { About } from './sections/about'
import { FAQ } from './sections/faq'
import { Features } from './sections/features'
import { Pricing } from './sections/pricing'
import { Contact } from './sections/contact'

import { DeepPartial } from 'ai'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SectionRegistry: Record<string, React.ComponentType<any>> = {
  hero: Hero,
  about: About,
  features: Features,
  pricing: Pricing,
  faq: FAQ,
  contact: Contact,
}

interface SectionRendererProps {
  sections: DeepPartial<Section>[]
}

export function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <div className="flex flex-col w-full">
      {sections.map((section, index) => {
        if (!section || !section.type) return null

        const Component = SectionRegistry[section.type as string]

        if (!Component) {
          // Normal during streaming when type is partially typed (e.g. "he")
          return null
        }

        // We use the array index as a fallback key, but ideally sections should have stable IDs
        return <Component key={index} data={section.content || {}} />
      })}
    </div>
  )
}
