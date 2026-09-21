import { google } from '@ai-sdk/google'
import { streamObject } from 'ai'
import { WebsiteSchema } from '@/lib/validations/section'
import { GenerateWebsiteParamsSchema } from '@/lib/validations/generate'
import { createClient } from '@/lib/supabase/server'

// Allow streaming responses up to 60 seconds
export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const body = await req.json()
    const parsed = GenerateWebsiteParamsSchema.safeParse(body)
    
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Invalid parameters', details: parsed.error.flatten() }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const params = parsed.data

    const prompt = `
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
`

    const result = await streamObject({
      model: google('gemini-1.5-pro-latest'),
      schema: WebsiteSchema,
      prompt,
      temperature: 0.7,
    })

    return result.toTextStreamResponse()
  } catch (error) {
    console.error('AI Generation Error:', error)
    return new Response(JSON.stringify({ error: 'Failed to generate website' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
