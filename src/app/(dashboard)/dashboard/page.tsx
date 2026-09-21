import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Plus, LayoutTemplate, ArrowRight, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Dashboard - Launchify AI',
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch the user's projects (RLS will automatically scope this to their workspaces)
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, name, status, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch projects:', error)
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] w-full">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background pointer-events-none -z-10" />

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-extrabold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Welcome back, {user.email?.split('@')[0]}
          </p>
        </div>
        <Link href="/generate">
          <Button className="gap-2 rounded-full h-11 px-6 shadow-md hover:shadow-lg transition-all group bg-primary">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            Create New Project
          </Button>
        </Link>
      </div>
      
      {projects && projects.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map(project => (
            <Card key={project.id} className="flex flex-col group hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border-primary/10 hover:border-primary/30 overflow-hidden bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <LayoutTemplate className="w-5 h-5" />
                  </div>
                  <span className="truncate font-bold">{project.name}</span>
                </CardTitle>
                <CardDescription className="pt-2 font-medium">
                  Created {new Date(project.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-6">
                <Link href={`/project/${project.id}/editor`} className="w-full">
                  <Button variant="secondary" className="w-full font-semibold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 rounded-xl h-10">
                    Open Editor
                    <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-primary/20 bg-primary/5 p-16 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="p-4 rounded-full bg-primary/10 text-primary mb-6 ring-8 ring-primary/5">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-3">No projects yet</h3>
            <p className="text-muted-foreground mb-8 max-w-md text-lg">
              You haven&apos;t created any websites. Let our AI build your first professional site in seconds.
            </p>
            <Link href="/generate">
              <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Generate First Website
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
