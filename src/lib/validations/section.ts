import { z } from 'zod'

export const HeroSectionSchema = z.object({
  type: z.literal('hero'),
  content: z.object({
    headline: z.string(),
    subheadline: z.string().optional(),
    primaryButtonText: z.string().optional(),
    secondaryButtonText: z.string().optional(),
    imageUrl: z.string().optional(),
  }),
})

export const AboutSectionSchema = z.object({
  type: z.literal('about'),
  content: z.object({
    title: z.string(),
    description: z.string(),
    features: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .optional(),
  }),
})

export const FAQSectionSchema = z.object({
  type: z.literal('faq'),
  content: z.object({
    title: z.string(),
    questions: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  }),
})

// Discriminated union for type safety
export const SectionSchema = z.discriminatedUnion('type', [
  HeroSectionSchema,
  AboutSectionSchema,
  FAQSectionSchema,
])

export const WebsiteSchema = z.object({
  site: z.object({
    name: z.string(),
    theme: z.object({
      style: z.string(),
      primaryColor: z.string(),
    }),
  }),
  sections: z.array(SectionSchema),
})

// Export derived TS types
export type Section = z.infer<typeof SectionSchema>
export type HeroSection = z.infer<typeof HeroSectionSchema>
export type AboutSection = z.infer<typeof AboutSectionSchema>
export type FAQSection = z.infer<typeof FAQSectionSchema>
export type WebsiteConfig = z.infer<typeof WebsiteSchema>
