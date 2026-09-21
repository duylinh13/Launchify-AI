import { google } from '@ai-sdk/google'
import { generateObject, streamObject } from 'ai'
import { WebsiteSchema } from '@/lib/validations/section'

export interface GenerateWebsiteParams {
  businessName: string
  businessType: string
  audience: string
  goal: string
  tone: string
  style: string
  primaryColor: string
}

function buildPrompt(params: GenerateWebsiteParams) {
  return `
You are an expert web designer, conversion rate optimizer, and copywriter.
Your task is to generate a professional, highly converting landing page based on the following business requirements.

BUSINESS DETAILS:
- Name: ${params.businessName}
- Type: ${params.businessType}
- Target Audience: ${params.audience}
- Primary Goal: ${params.goal}
- Brand Tone: ${params.tone}
- Visual Style: ${params.style}
- Primary Color: ${params.primaryColor}

REQUIREMENTS:
1. Generate a complete website structure with appropriate sections.
2. You MUST include at least a "hero", "about", and "faq" section.
3. The copy should be engaging, persuasive, and tailored to the target audience.
4. Keep the design specifications aligned with the requested style.

Respond strictly with valid JSON conforming to the schema.
`
}

/**
 * Standard blocking generation (useful for background jobs or if streaming isn't needed)
 */
export async function generateWebsiteData(params: GenerateWebsiteParams) {
  const { object } = await generateObject({
    model: google('gemini-1.5-pro-latest'),
    schema: WebsiteSchema,
    prompt: buildPrompt(params),
    temperature: 0.7,
  })

  return object
}

/**
 * Streaming generation (useful for showing the user the website building in real-time)
 */
export async function streamWebsiteData(params: GenerateWebsiteParams) {
  const { partialObjectStream } = await streamObject({
    model: google('gemini-1.5-pro-latest'),
    schema: WebsiteSchema,
    prompt: buildPrompt(params),
    temperature: 0.7,
  })

  return partialObjectStream
}
