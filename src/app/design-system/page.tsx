import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, ArrowRight, LayoutTemplate } from "lucide-react"

export const metadata = {
  title: "Design System - Launchify AI",
}

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-16 px-4 max-w-5xl space-y-20 relative">
      {/* Ambient background for the page */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-2">
          <Sparkles className="mr-2 h-4 w-4" />
          Standardized UI
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Design System</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          The foundational UI components, tokens, and typography for Launchify AI. This ensures a consistent, high-end &quot;VIP Pro&quot; SaaS aesthetic across the entire application.
        </p>
      </div>

      {/* Colors Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight border-b border-border/50 pb-4">1. Color Tokens (Semantic)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          <ColorCard name="Primary" bgClass="bg-primary" textClass="text-primary-foreground" />
          <ColorCard name="Secondary" bgClass="bg-secondary" textClass="text-secondary-foreground" />
          <ColorCard name="Destructive" bgClass="bg-destructive" textClass="text-destructive-foreground" />
          <ColorCard name="Muted" bgClass="bg-muted" textClass="text-muted-foreground" />
          <ColorCard name="Accent" bgClass="bg-accent" textClass="text-accent-foreground" />
          <ColorCard name="Card" bgClass="bg-card" textClass="text-card-foreground" border />
          <ColorCard name="Background" bgClass="bg-background" textClass="text-foreground" border />
          <ColorCard name="Border" bgClass="bg-border" textClass="text-foreground" border />
        </div>
      </section>

      {/* Typography Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight border-b border-border/50 pb-4">2. Typography Hierarchy</h2>
        <div className="space-y-10 bg-card border rounded-3xl p-8 shadow-sm">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Heading 1</h1>
            <p className="text-sm text-muted-foreground mt-2 font-mono bg-muted/50 inline-block px-2 py-1 rounded">text-4xl font-extrabold tracking-tight lg:text-5xl</p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
            <p className="text-sm text-muted-foreground mt-2 font-mono bg-muted/50 inline-block px-2 py-1 rounded">text-3xl font-semibold tracking-tight</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">Heading 3</h3>
            <p className="text-sm text-muted-foreground mt-2 font-mono bg-muted/50 inline-block px-2 py-1 rounded">text-2xl font-semibold tracking-tight</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold tracking-tight">Heading 4</h4>
            <p className="text-sm text-muted-foreground mt-2 font-mono bg-muted/50 inline-block px-2 py-1 rounded">text-xl font-semibold tracking-tight</p>
          </div>
          <div className="pt-4 border-t border-border/50">
            <p className="leading-7 [&:not(:first-child)]:mt-6 max-w-3xl">
              <span className="font-semibold">Paragraph:</span> The quick brown fox jumps over the lazy dog. Launchify AI helps you build professional landing pages in seconds using generative AI and structural constraints.
            </p>
            <p className="text-sm text-muted-foreground mt-3 font-mono bg-muted/50 inline-block px-2 py-1 rounded">leading-7 [&:not(:first-child)]:mt-6</p>
          </div>
        </div>
      </section>

      {/* Components Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-semibold tracking-tight border-b border-border/50 pb-4">3. UI Components</h2>

        <div className="grid md:grid-cols-2 gap-12 pt-4">
          {/* Buttons */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Buttons</h3>
            <div className="flex flex-wrap gap-4 items-center p-6 border rounded-3xl bg-card/50">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              
              {/* Premium Button */}
              <div className="w-full pt-4 mt-2 border-t border-border/50 flex flex-col gap-2">
                <span className="text-sm text-muted-foreground mb-2">Premium / CTA Variants</span>
                <Button className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all bg-gradient-to-r from-primary to-purple-600 border-0 group w-fit">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>

          {/* Inputs & Forms */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Inputs & Forms</h3>
            <div className="space-y-6 p-6 border rounded-3xl bg-card/50">
              <div className="space-y-2">
                <Label htmlFor="email">Standard Input</Label>
                <Input id="email" type="email" placeholder="hello@launchify.ai" className="h-11 rounded-xl bg-background/50 focus-visible:ring-primary/50 transition-all" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="error" className="text-destructive">Error State</Label>
                <Input id="error" className="border-destructive focus-visible:ring-destructive h-11 rounded-xl bg-destructive/5" defaultValue="invalid@email" />
                <p className="text-sm text-destructive font-medium">Please enter a valid email address.</p>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="space-y-6 md:col-span-2">
            <h3 className="text-xl font-semibold">Cards & Containers</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Standard Card */}
              <Card className="rounded-3xl border-border/50 shadow-sm">
                <CardHeader>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>Default static container.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Used for settings, forms, and static data display without interaction.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full rounded-xl">Action</Button>
                </CardFooter>
              </Card>

              {/* Interactive VIP Pro Card */}
              <Card className="flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border-primary/10 hover:border-primary/30 overflow-hidden bg-background/50 backdrop-blur-sm rounded-3xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <LayoutTemplate className="w-5 h-5" />
                    </div>
                    <span className="truncate font-bold">Interactive Card</span>
                  </CardTitle>
                  <CardDescription className="pt-2 font-medium">
                    Hover to see elevation & effects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Used on the Dashboard for clickable project items to provide a highly tactile feel.</p>
                </CardContent>
                <CardFooter className="mt-auto pt-6">
                  <Button variant="secondary" className="w-full font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 rounded-xl h-10">
                    Open Project
                    <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Button>
                </CardFooter>
              </Card>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ColorCard({ name, bgClass, textClass, border = false }: { name: string, bgClass: string, textClass: string, border?: boolean }) {
  return (
    <div className={`p-5 rounded-2xl flex flex-col justify-between h-28 shadow-sm transition-transform hover:scale-105 ${bgClass} ${textClass} ${border ? 'border border-border/50' : ''}`}>
      <span className="font-semibold tracking-tight">{name}</span>
      <span className="text-xs opacity-80 font-mono mt-auto">{bgClass.replace('bg-', '')}</span>
    </div>
  )
}
