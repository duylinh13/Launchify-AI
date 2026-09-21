'use client'

import { useState } from 'react'
import { experimental_useObject as useObject } from 'ai/react'
import { WebsiteSchema, type WebsiteConfig } from '@/lib/validations/section'
import { SectionRenderer } from '@/components/website/SectionRenderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function GenerateForm() {
  const [formData, setFormData] = useState({
    businessName: 'Coffee House',
    businessType: 'Coffee Shop',
    audience: 'Students and young professionals',
    goal: 'Increase foot traffic and online orders',
    tone: 'Warm, modern, and inviting',
    style: 'Minimal',
    primaryColor: '#000000',
  })

  // useObject handles the streaming JSON and partial parsing
  const { object, submit, isLoading, error } = useObject<WebsiteConfig>({
    api: '/api/generate',
    schema: WebsiteSchema,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
      {/* Input Form Column */}
      <div className="overflow-y-auto pr-4">
        <Card>
          <CardHeader>
            <CardTitle>Describe Your Business</CardTitle>
            <CardDescription>
              Provide details and our AI will generate a tailored website instantly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Input id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input id="audience" name="audience" value={formData.audience} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal">Primary Goal</Label>
                <Input id="goal" name="goal" value={formData.goal} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone">Brand Tone</Label>
                <Input id="tone" name="tone" value={formData.tone} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="style">Visual Style</Label>
                <Input id="style" name="style" value={formData.style} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color (Hex)</Label>
                <Input id="primaryColor" name="primaryColor" value={formData.primaryColor} onChange={handleChange} required />
              </div>
              
              {error && (
                <div className="text-sm text-red-500 font-medium">
                  {error.message}
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Generating Website...' : 'Generate Website'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Preview Column (Streaming) */}
      <div className="border rounded-xl bg-muted/10 overflow-hidden flex flex-col shadow-sm">
        <div className="bg-muted p-3 border-b flex justify-between items-center">
          <span className="text-sm font-semibold text-muted-foreground">Live Preview</span>
          {isLoading && <span className="text-xs text-primary animate-pulse">Streaming...</span>}
        </div>
        <div className="flex-1 overflow-y-auto bg-background">
          {/* We only render sections if the partial object has them */}
          {object?.sections ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <SectionRenderer sections={object.sections as any} />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground p-8 text-center">
              {isLoading ? 'AI is thinking...' : 'Fill out the form and hit Generate to see your website.'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
