import type { HeroSection } from '@/lib/validations/section'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function Hero({ data }: { data: Partial<HeroSection['content']> }) {
  if (!data) return null;

  return (
    <section className="relative w-full overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      {/* Premium Background Gradients */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full opacity-50 mix-blend-screen"></div>
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full opacity-50 mix-blend-screen"></div>

      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center max-w-4xl mx-auto space-y-8 text-center animate-in slide-in-from-bottom-6 fade-in duration-1000 fill-mode-both">
          
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Elevating your digital presence
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              {data.headline || ''}
            </h1>
            {data.subheadline && (
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl leading-relaxed">
                {data.subheadline}
              </p>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
            {data.primaryButtonText && (
              <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 group bg-gradient-to-r from-primary to-purple-600 border-0">
                {data.primaryButtonText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            {data.secondaryButtonText && (
              <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base bg-background/50 backdrop-blur-md hover:bg-muted transition-all duration-300">
                {data.secondaryButtonText}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
