import type { AboutSection } from '@/lib/validations/section'

export function About({ data }: { data: Partial<AboutSection['content']> }) {
  if (!data) return null;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              {data.title || ''}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {data.description || ''}
            </p>
          </div>
        </div>
        {data.features && data.features.length > 0 && (
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            {data.features.map((feature, idx) => {
              if (!feature) return null;
              return (
                <div key={idx} className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-card text-card-foreground shadow-sm">
                  <h3 className="text-xl font-bold">{feature.title || ''}</h3>
                  <p className="text-sm text-muted-foreground text-center">
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
