import { SectionRenderer } from '@/components/website/SectionRenderer'
import { WebsiteSchema } from '@/lib/validations/section'

export const metadata = {
  title: 'Preview - Launchify AI',
}

const mockWebsiteJson = {
  site: {
    name: "Coffee House",
    theme: {
      style: "modern",
      primaryColor: "#000000"
    }
  },
  sections: [
    {
      type: "hero",
      content: {
        headline: "Experience the Best Coffee in Town",
        subheadline: "Artisanal blends, roasted locally and served with passion.",
        primaryButtonText: "View Menu",
        secondaryButtonText: "Our Story"
      }
    },
    {
      type: "about",
      content: {
        title: "Why Choose Us",
        description: "We source only the top 1% of Arabica beans from sustainable farms around the world.",
        features: [
          {
            title: "Ethically Sourced",
            description: "Direct trade relationships with farmers."
          },
          {
            title: "Expert Baristas",
            description: "Trained in the art of the perfect pour."
          },
          {
            title: "Cozy Atmosphere",
            description: "A perfect place to work, relax, or meet friends."
          }
        ]
      }
    },
    {
      type: "faq",
      content: {
        title: "Frequently Asked Questions",
        questions: [
          {
            question: "Do you offer vegan options?",
            answer: "Yes, we have oat, almond, and soy milk available."
          },
          {
            question: "Is there free Wi-Fi?",
            answer: "Absolutely! Fast and free Wi-Fi for all customers."
          }
        ]
      }
    }
  ]
}

export default function PreviewPage() {
  // 1. Validate the mock JSON using our Zod schema to guarantee type safety
  // In a real flow, this JSON comes from the Gemini API and is parsed here.
  const parsed = WebsiteSchema.safeParse(mockWebsiteJson)

  if (!parsed.success) {
    return (
      <div className="p-8">
        <h2 className="text-red-500 font-bold text-xl mb-4">Failed to parse Website JSON</h2>
        <pre className="bg-muted p-4 rounded-md overflow-auto text-sm">
          {JSON.stringify(parsed.error.format(), null, 2)}
        </pre>
      </div>
    )
  }

  const website = parsed.data

  return (
    <div className="flex flex-col min-h-screen border rounded-xl overflow-hidden shadow-sm bg-background">
      <div className="bg-muted p-2 border-b flex items-center justify-between">
        <span className="text-sm font-medium ml-2 text-muted-foreground">Preview Mode: {website.site.name}</span>
      </div>
      
      {/* 2. Dynamically render the validated sections */}
      <div className="flex-1 overflow-y-auto">
        <SectionRenderer sections={website.sections} />
      </div>
    </div>
  )
}
