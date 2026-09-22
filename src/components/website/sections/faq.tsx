import type { FAQSection } from '@/lib/validations/section'
import { HelpCircle } from 'lucide-react'

export function FAQ({ data }: { data: Partial<FAQSection['content']> }) {
  if (!data) return null;

  return (
    <section className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl text-primary mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {data.title || 'Frequently Asked Questions'}
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground mt-4">
            Everything you need to know about our product and billing.
          </p>
        </div>

        <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
          {data.questions && data.questions.map((faq, idx) => {
            if (!faq) return null;
            return (
              <div key={idx} className="group relative p-8 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>
                <h3 className="text-xl font-bold mb-3">{faq.question || ''}</h3>
                <p className="text-muted-foreground leading-relaxed">{faq.answer || ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
