import { z } from 'zod'

export const GenerateWebsiteParamsSchema = z.object({
  businessName: z.string().min(1, 'Business name is required'),
  businessType: z.string().min(1, 'Business type is required'),
  audience: z.string().min(1, 'Target audience is required'),
  goal: z.string().min(1, 'Goal is required'),
  tone: z.string().min(1, 'Brand tone is required'),
  style: z.string().min(1, 'Visual style is required'),
  primaryColor: z.string().regex(/^#([0-9A-F]{3}){1,2}$/i, 'Must be a valid hex color'),
})

export type GenerateWebsiteParams = z.infer<typeof GenerateWebsiteParamsSchema>
