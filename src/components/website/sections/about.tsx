import type { AboutSection } from '@/lib/validations/section'
import { Sparkles } from 'lucide-react'

export function About({ data }: { data: Partial<AboutSection['content']> }) {
  if (!data) return null;

  return (
    <section className="relative w-full py-20 md:py-32 bg-muted/30 overflow-hidden border-y border-border/50">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
            {data.title || ''}
          </h2>
          <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
            {data.description || ''}
          </p>
        </div>

        {data.features && data.features.length > 0 && (
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.features.map((feature, idx) => {
              if (!feature) return null;
              return (
                <div key={idx} className="group relative flex flex-col space-y-4 p-8 rounded-3xl border border-border/50 bg-background/60 backdrop-blur-md hover:bg-background shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform duration-500">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold z-10">{feature.title || ''}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed z-10">
                    {feature.description || ''}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  )
}
