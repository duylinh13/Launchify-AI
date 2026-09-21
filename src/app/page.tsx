import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-background p-4 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="mr-2 h-4 w-4" />
          Launchify AI 2.0 is here
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 text-balance">
          Build Your Dream Website in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Seconds</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          The AI-powered Website & Landing Page Builder. Generate, edit, and publish stunning business websites without writing a single line of code.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link href="/signup" className={cn(buttonVariants({ size: "lg" }), "rounded-full px-8 h-12 text-base font-semibold group shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all")}>
            Start Building Free
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-8 h-12 text-base font-semibold bg-background/50 backdrop-blur-md border-border/50 hover:bg-muted/50 transition-all")}>
            Log In
          </Link>
        </div>
      </div>
      
      {/* Footer Link */}
      <div className="absolute bottom-6 text-sm text-muted-foreground animate-in fade-in duration-1000 delay-500">
        <Link href="/design-system" className="hover:text-primary transition-colors hover:underline underline-offset-4">
          View Design System
        </Link>
      </div>
    </div>
  )
}
