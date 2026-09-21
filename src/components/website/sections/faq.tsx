import type { FAQSection } from '@/lib/validations/section'

export function FAQ({ data }: { data: Partial<FAQSection['content']> }) {
  if (!data) return null;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
          {data.title || ''}
        </h2>
        <div className="mx-auto max-w-3xl space-y-6">
          {data.questions && data.questions.map((faq, idx) => {
            if (!faq) return null;
            return (
              <div key={idx} className="space-y-2 border-b pb-4">
                <h3 className="text-xl font-bold">{faq.question || ''}</h3>
                <p className="text-muted-foreground">{faq.answer || ''}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
