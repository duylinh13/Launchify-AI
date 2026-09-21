import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Dashboard - Launchify AI',
}

export default async function DashboardPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div className="mt-4">
        <p className="text-muted-foreground">
          Welcome back! Your email is {user.email}.
        </p>
        
        {/* Placeholder for future workspaces/projects list */}
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Your Projects</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              You haven&apos;t created any projects yet.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
