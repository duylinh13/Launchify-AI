import { describe, it, expect } from 'vitest'
import { WebsiteSchema } from './section'

describe('WebsiteSchema Validation', () => {
  it('TC-04: Should reject payload missing site name', () => {
    const invalidPayload = {
      site: {
        theme: { style: 'modern', primaryColor: '#000000' }
      },
      sections: []
    }
    const result = WebsiteSchema.safeParse(invalidPayload)
    expect(result.success).toBe(false)
  })

  it('TC-05: Should parse valid payload with multiple sections', () => {
    const validPayload = {
      site: {
        name: 'My Store',
        theme: { style: 'minimal', primaryColor: '#ffffff' }
      },
      sections: [
        {
          type: 'hero',
          content: { headline: 'Welcome', subheadline: 'To my store' }
        },
        {
          type: 'faq',
          content: { title: 'Questions', questions: [{ question: 'Q1', answer: 'A1' }] }
        }
      ]
    }
    const result = WebsiteSchema.safeParse(validPayload)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.sections.length).toBe(2)
      expect(result.data.sections[0].type).toBe('hero')
    }
  })

  it('TC-06: Should discriminate types and reject invalid content for a specific section', () => {
    const invalidHeroPayload = {
      site: {
        name: 'My Store',
        theme: { style: 'minimal', primaryColor: '#ffffff' }
      },
      sections: [
        {
          type: 'hero',
          // Missing 'headline' which is required for hero
          content: { subheadline: 'To my store' }
        }
      ]
    }
    const result = WebsiteSchema.safeParse(invalidHeroPayload)
    expect(result.success).toBe(false)
  })
})
