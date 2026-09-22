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
    <div className="flex flex-col xl:grid xl:grid-cols-12 gap-8 min-h-[calc(100vh-160px)] xl:h-[calc(100vh-160px)] w-full relative pb-10 xl:pb-0">
      {/* Background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Input Form Column */}
      <div className="xl:col-span-4 h-[600px] xl:h-full shrink-0 flex flex-col min-h-0">
        <Card className="border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white rounded-3xl overflow-hidden flex flex-col h-full relative">
          <CardHeader className="px-8 pt-8 pb-6 bg-white border-b border-slate-100 shrink-0 relative z-10">
            <CardTitle className="text-2xl font-extrabold flex items-center gap-2 text-slate-900">
              <Sparkles className="w-5 h-5 text-primary" />
              Website Architect
            </CardTitle>
            <CardDescription className="text-sm text-slate-500 mt-2 leading-relaxed">
              Detail your vision, and watch our AI instantly construct your high-converting landing page.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 bg-slate-50/40">
            <CardContent className="px-8 pt-8 overflow-y-auto custom-scrollbar flex-1 space-y-6 pb-8">
              <div className="space-y-2">
                <Label htmlFor="businessName" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Briefcase className="w-4 h-4 text-primary/70"/> Business Name</Label>
                <Input id="businessName" name="businessName" value={formData.businessName} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><LayoutDashboard className="w-4 h-4 text-primary/70"/> Business Type</Label>
                <Input id="businessType" name="businessType" value={formData.businessType} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="audience" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Users className="w-4 h-4 text-primary/70"/> Target Audience</Label>
                <Input id="audience" name="audience" value={formData.audience} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Target className="w-4 h-4 text-primary/70"/> Primary Goal</Label>
                <Input id="goal" name="goal" value={formData.goal} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Sparkles className="w-4 h-4 text-primary/70"/> Brand Tone</Label>
                <Input id="tone" name="tone" value={formData.tone} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="style" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Paintbrush className="w-4 h-4 text-primary/70"/> Visual Style</Label>
                <Input id="style" name="style" value={formData.style} onChange={handleChange} required className="h-12 px-4 rounded-xl bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-base shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor" className="flex items-center gap-2 text-sm font-semibold text-slate-600"><Paintbrush className="w-4 h-4 text-primary/70"/> Primary Color (Hex)</Label>
                <div className="flex gap-3 items-center">
                  <div className="relative shrink-0 rounded-xl overflow-hidden shadow-sm border border-slate-200 hover:border-slate-300 transition-colors">
                    <input type="color" id="primaryColorPicker" name="primaryColor" value={formData.primaryColor} onChange={handleChange} className="w-12 h-12 cursor-pointer bg-transparent border-0 p-0 block absolute -top-2 -left-2 scale-150" />
                    <div className="w-12 h-12 pointer-events-none" style={{ backgroundColor: formData.primaryColor }}></div>
                  </div>
                  <Input id="primaryColorText" name="primaryColor" value={formData.primaryColor} onChange={handleChange} required pattern="^#[0-9A-Fa-f]{6}$" className="h-12 px-4 rounded-xl bg-white border-slate-200 hover:border-slate-300 focus-visible:ring-primary/20 focus-visible:border-primary transition-all font-mono text-base shadow-sm w-full uppercase" />
                </div>
              </div>
              
              {error && (
                <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  {error.message}
                </div>
              )}
            </CardContent>
            
            <div className="p-6 px-8 bg-white border-t border-slate-100 shrink-0 z-10">
              <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-2xl text-lg font-semibold shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all hover:-translate-y-0.5 group bg-primary text-primary-foreground border-0">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />}
                {isLoading ? 'Architecting Website...' : 'Generate Website'}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Preview Column (Streaming) */}
      <div className="xl:col-span-8 border rounded-3xl bg-muted/10 overflow-hidden flex flex-col shadow-2xl relative ring-1 ring-border/50 min-h-[600px] xl:min-h-0 h-full">
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
