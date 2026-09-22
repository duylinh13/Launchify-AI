'use client'

import { useState, useTransition } from 'react'
import { experimental_useObject as useObject } from '@ai-sdk/react'
import { WebsiteSchema } from '@/lib/validations/section'
import { SectionRenderer } from '@/components/website/SectionRenderer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createProjectFromGeneration } from '@/app/actions/project'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Loader2, Globe, Sparkles, Paintbrush, Target, Briefcase, Users, LayoutDashboard } from 'lucide-react'

export function GenerateForm() {
  const router = useRouter()
  const [isSaving, startTransition] = useTransition()
  const [formData, setFormData] = useState({
    businessName: 'Coffee House',
    businessType: 'Coffee Shop',
    audience: 'Students and young professionals',
    goal: 'Increase foot traffic and online orders',
    tone: 'Warm, modern, and inviting',
    style: 'Minimal',
    primaryColor: '#6366f1',
  })

  // useObject handles the streaming JSON and partial parsing
  const { object, submit, isLoading, error } = useObject({
    api: '/api/generate',
    schema: WebsiteSchema,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit(formData)
  }

  const handleSaveToProject = () => {
    if (!object) return
    startTransition(async () => {
      const result = await createProjectFromGeneration(object)
      if (result.error) {
        toast.error(result.error)
      } else if (result.projectId) {
        toast.success('Website saved successfully!')
        router.push(`/project/${result.projectId}/editor`)
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const isFinished = !isLoading && object?.sections && object.sections.length > 0;

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 h-[calc(100vh-100px)] w-full relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Input Form Column */}
      <div className="lg:col-span-4 h-full shrink-0 flex flex-col min-h-0">
        <Card className="border-primary/10 shadow-2xl shadow-primary/10 bg-background/60 backdrop-blur-2xl rounded-3xl overflow-hidden flex flex-col h-full ring-1 ring-white/10 relative">
          <CardHeader className="bg-gradient-to-br from-primary/10 to-transparent border-b border-primary/5 pb-6 shrink-0">
            <CardTitle className="text-2xl font-extrabold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Website Architect
            </CardTitle>
            <CardDescription className="text-sm">
              Detail your vision, and watch our AI instantly construct your high-converting landing page.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
            <CardContent className="px-8 pt-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 pb-8">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Briefcase className="w-4 h-4 text-primary/70"/> Business Name</Label>
                <Input id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-background/40 border-border/50 focus-visible:ring-primary/50 focus-visible:bg-background/80 transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><LayoutDashboard className="w-4 h-4 text-primary/70"/> Business Type</Label>
                <Input id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-background/40 border-border/50 focus-visible:ring-primary/50 focus-visible:bg-background/80 transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Users className="w-4 h-4 text-primary/70"/> Target Audience</Label>
                <Input id="audience" name="audience" value={formData.audience} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-background/40 border-border/50 focus-visible:ring-primary/50 focus-visible:bg-background/80 transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Target className="w-4 h-4 text-primary/70"/> Primary Goal</Label>
                <Input id="goal" name="goal" value={formData.goal} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-background/40 border-border/50 focus-visible:ring-primary/50 focus-visible:bg-background/80 transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Sparkles className="w-4 h-4 text-primary/70"/> Brand Tone</Label>
                <Input id="tone" name="tone" value={formData.tone} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-background/40 border-border/50 focus-visible:ring-primary/50 focus-visible:bg-background/80 transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="style" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Paintbrush className="w-4 h-4 text-primary/70"/> Visual Style</Label>
                <Input id="style" name="style" value={formData.style} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-background/40 border-border/50 focus-visible:ring-primary/50 focus-visible:bg-background/80 transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2 pb-2">
                <Label htmlFor="primaryColor" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground"><Paintbrush className="w-4 h-4 text-primary/70"/> Primary Color (Hex)</Label>
                <div className="flex gap-3">
                  <Input type="color" id="primaryColorPicker" name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="w-16 h-12 p-1.5 rounded-xl cursor-pointer bg-background/40 border-border/50 shadow-sm" />
                  <Input type="text" id="primaryColor" name="primaryColor" value={formData.primaryColor} onChange={handleChange} required className="h-12 px-4 flex-1 rounded-xl font-mono bg-background/40 border-border/50 focus-visible:ring-primary/50 uppercase text-base shadow-sm" />
                </div>
              </div>
              
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  {error.message}
                </div>
              )}
            </CardContent>
            
            <div className="p-4 bg-background/90 backdrop-blur-xl border-t border-border/50 shrink-0 z-10 shadow-[0_-10px_40px_-10px_rgba(0,0,0,0.1)]">
              <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-full text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 border-0 group">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />}
                {isLoading ? 'Architecting Website...' : 'Generate Website'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Preview Column (Streaming) */}
      <div className="lg:col-span-8 border rounded-3xl bg-muted/10 overflow-hidden flex flex-col shadow-2xl relative ring-1 ring-border/50 h-full">
        {/* Browser Mockup Header */}
        <div className="bg-background/80 backdrop-blur-md p-3 border-b flex justify-between items-center h-14 shrink-0 absolute top-0 left-0 right-0 z-20">
          <div className="flex gap-2 items-center pl-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm" />
          </div>
          
          <div className="px-4 py-1.5 rounded-full bg-muted/80 text-xs text-muted-foreground font-medium flex items-center gap-2 max-w-sm w-full justify-center shadow-inner">
            <Globe className="w-3.5 h-3.5" />
            {formData.businessName ? formData.businessName.toLowerCase().replace(/\s+/g, '-') + '.com' : 'preview.com'}
          </div>
          
          <div className="flex items-center pr-2 min-w-[120px] justify-end">
            {isLoading && <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500 animate-pulse flex items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin text-primary"/> Generating...</span>}
            {isFinished && (
              <Button size="sm" onClick={handleSaveToProject} disabled={isSaving} className="gap-2 rounded-full h-8 px-4 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                {isSaving ? 'Saving...' : 'Save & Edit'}
              </Button>
            )}
          </div>
        </div>
        
        {/* Render Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pt-14 bg-background w-full h-full">
          {object?.sections ? (
            <div className="animate-in fade-in duration-1000 w-full">
              {/* Safely filter out partial streaming sections that don't have enough data to render yet */}
              <SectionRenderer sections={(object.sections.filter(s => s && s.type && s.content) as any) || []} />
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center animate-in fade-in duration-500">
              <div className="w-24 h-24 mb-6 rounded-full bg-primary/5 flex items-center justify-center ring-8 ring-primary/5">
                {isLoading ? (
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                ) : (
                  <Globe className="w-10 h-10 text-primary/40" />
                )}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {isLoading ? 'Architecting your site...' : 'Ready to build'}
              </h3>
              <p className="max-w-sm text-sm">
                {isLoading 
                  ? 'Our AI is currently analyzing your business requirements and designing the perfect layout.' 
                  : 'Fill out the specifications on the left and click Generate to see your website come to life in real-time.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
